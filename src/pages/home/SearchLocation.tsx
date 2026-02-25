import React from "react";
import * as kakaoMapUtil from "../../utils/homeUtil/kakaoMapUtil";
import { useMap } from "../../contexts/MapContext";
import { createMarker } from "../../utils/homeUtil/kakaoMarkerUtil";

export default function SearchLocation() {
  const { map, markers, setMarkers, toiletRef, fetchToilets } = useMap();

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const searchTerm = e.currentTarget.value.trim();
    if (!searchTerm) return;

    try {
      // 1. 검색어로 중심 좌표 구하기 (예: 신곡동 -> 37.xxx, 127.xxx)
      const { lat, lng } = await kakaoMapUtil.searchStation(searchTerm);

      // 2. 해당 좌표 기반 화장실 데이터 가져오기
      await fetchToilets(lat, lng);

      if (!map) return; // map이 없는 경우는 없는데 없애면 에러 터지네

      // 3. [기존 마커 삭제] 중심지점 마커 + 이전에 markers에 저장된 마커 객체들 제거
      if (markers && markers.length > 0) {
        // markers에 담긴 값이 있다면 해당 마커를 지우기
        markers.forEach((marker) => marker.setMap(null));
      }

      // 4. 지도 중심 이동
      // lat, lng는 검색된 지역의 좌표임
      const centerLatLng = new kakao.maps.LatLng(lat, lng);
      // 지도를 새로 그리지않고 중심 지점만 이동하는 방법
      map.setCenter(centerLatLng);

      // 새로운 마커들을 담을 임시 배열
      const tempMarkers: kakao.maps.Marker[] = [];

      // 6. [화장실 마커 생성]
      if (Array.isArray(toiletRef.current) && toiletRef.current.length > 0) {
        toiletRef.current.forEach((toilet: any) => {
          const marker = createMarker(
            map,
            toilet.tlat,
            toilet.tlot,
            toilet.tname,
          );
          tempMarkers.push(marker);
        });
      }

      setMarkers(tempMarkers); // 상태를 업데이트 -> useState에 의해 화면을 다시 그림
    } catch (err) {
      console.error("검색 오류:", err);
      alert("검색 결과가 없거나 서버 응답에 문제가 있습니다.");
    }
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        className="form-control rounded-5 shadow-sm px-4"
        placeholder="지역 검색 (예: 의정부동)"
        onKeyDown={handleSearch}
      />
    </div>
  );
}
