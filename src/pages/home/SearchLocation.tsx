import React from "react";
import { useMap, type ToiletOption } from "../../contexts/MapContext";
import {
  createMarker,
  cleanMarkers,
} from "../../utils/homeUtil/kakaoMarkerUtil";
import {
  getFilterToilet,
  getToiletByLatLon,
  type Toilet,
} from "../../utils/homeUtil/totiletUtil";
import { searchStation, changeCenter } from "../../utils/homeUtil/kakaoMapUtil";

export default function SearchLocation() {
  const {
    map,
    markers,
    setMarkers,
    setToilet,
    currLocMark,
    setCurrLocMark,
    isLoading,
    setIsLoading,
    toiletOption,
    setToiletOption,
  } = useMap();

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isLoading) return;

    if (e.key !== "Enter") return;

    const searchTerm = e.currentTarget.value.trim();
    if (!searchTerm) return;

    try {
      if (!map) return; // map이 없는 경우는 없는데 없애면 에러 터지네

      setIsLoading(true);

      // 현재 위치 삭제하기
      if (currLocMark) {
        setCurrLocMark(null);
      }

      // 필터를 유지하고 싶은데, 화면에 출력되는건 모든 화장실 정보가 되네

      // 검색어로 중심 좌표 구하기 (예: 신곡동 -> 37.xxx, 127.xxx)
      const { lat, lng } = await searchStation(searchTerm);

      // 해당 좌표 기반 화장실 데이터 가져오기
      const currToilet: Toilet[] = await getToiletByLatLon(lat, lng);

      // 화장실 상태 업데이트
      setToilet(currToilet);

      // 기존 마커들 화면에서 제거
      // if (markers && markers.length > 0) {
      cleanMarkers(markers);
      // 마커 배열 비우기
      setMarkers([]);
      // }

      // 4. 지도 중심 이동
      changeCenter(map, lat, lng);

      const currToiletOption: ToiletOption = toiletOption; // context의 값을 가져오기

      setToiletOption(currToiletOption); // 화장실 옵션의 상태값을 바꾸기

      // 필터된 화장실들을 담을 배열
      const filteredToilet = getFilterToilet(currToilet, toiletOption);

      // 필터링된 데이터로 새 마커 생성
      const newMarkers: kakao.maps.Marker[] = filteredToilet.map((fToilet) =>
        createMarker(map, fToilet.tlat, fToilet.tlot, fToilet.tname),
      );

      setMarkers(newMarkers); // 상태를 업데이트 -> useState에 의해 화면을 다시 그림
      setIsLoading(false);
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
