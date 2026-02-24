import React from "react";
import * as kakaoMapUtil from "../../utils/homeUtil/kakaoMapUtil";
import { useMap } from "../../contexts/MapContext";
import markerImg from "../../assets/Images/openMarker.png";

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
      const newMarkers: kakao.maps.Marker[] = [];

      // 마커 이미지를 생성합니다    
      var markerImage = new kakao.maps.MarkerImage(
        markerImg,
        new kakao.maps.Size(40, 40)
      );

      // 5. [검색 위치 마커] 검색한 지점(동네 중심)에 마커 하나 생성
      const centerMarker = new kakao.maps.Marker({
        map: map,
        position: centerLatLng,
        title: `${searchTerm} 중심점`,
        // 필요하다면 이미지를 다르게 해서 화장실 마커와 구분할 수 있습니다.
        image: markerImage,
      });
      newMarkers.push(centerMarker);

      // 6. [화장실 마커 생성]
      if (Array.isArray(toiletRef.current) && toiletRef.current.length > 0) {
        toiletRef.current.forEach((toilet: any) => {
          const marker = new kakao.maps.Marker({
            map: map, //이 부분이 맵에 마커 찍는 부분
            position: new kakao.maps.LatLng(toilet.tlat, toilet.tlot),
            title: toilet.tname,
            image: markerImage,
          });
          newMarkers.push(marker);
        });
      } else {
        alert(`${searchTerm} 주변에 화장실 정보가 없습니다.`);
      }

      setMarkers(newMarkers); // 상태를 업데이트 -> useState에 의해 화면을 다시 그림
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
