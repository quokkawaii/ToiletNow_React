import { useEffect } from "react";
import { useMap } from "../MapContext";
import CurrLocBtn from "./CurrLocBtn";
import Loading from "../../componunts/common/Loading";
import { type Toilet } from "../../utils/homeUtil/totiletUtil";
import { currLocation } from "../../utils/homeUtil/kakaoMapUtil";

export default function KakaoMap() {
  const {
    setMarkers,
    isLoading,
    setIsLoading,
    updateMap,
    updateToilet,
    updateCurrLocation,
    updateMarkers,
  } = useMap();

  const kakaoMapStart = () => {
    kakao.maps.load(async () => {
      // 로컬 변수 세팅 시작
      const { lat, lng } = await currLocation(); // 현재 위치의 Lat, Lng
      const currToiletList: Toilet[] | null = await updateToilet(lat, lng); // 화장실 정보 업데이트
      // 로컬 변수 세팅 종료

      // 카카오 맵 객체 생성 시작
      const newMap = updateMap(lat, lng);
      // 카카오 맵 객체 생성 종료

      // 현재 위치 상태 업데이트 시작
      const currMarker: kakao.maps.Marker | null = !newMap
        ? null
        : updateCurrLocation(newMap, lat, lng);
      // 현재 위치 상태 업데이트 종료

      // 모든 마커 상태 업데이트
      if (currToiletList != null && newMap != null) {
        // 귀찮게 계속 null처리 해줘야되네
        const currMarkerList: kakao.maps.Marker[] | null = updateMarkers(
          currToiletList,
          newMap,
        );
        if (currMarkerList != null && currMarker != null) {
          currMarkerList.push(currMarker);
        }
        setMarkers(currMarkerList);
      }

      setIsLoading(false);

      // 모든 마커 상태 업데이트 종료
    });
  };

  useEffect(() => {
    try {
      setIsLoading(true);

      kakaoMapStart();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div
      className="position-relative shadow-sm rounded mx-auto w-100"
      style={{ minHeight: "500px" }} // 지도가 들어갈 최소 높이 확보
    >
      {/* 1. 지도를 먼저 렌더링 (항상 존재해야 함) */}
      <div id="map" className="shadow-sm rounded mx-auto"></div>
      <CurrLocBtn />

      {/* 2. isLoading일 때만 그 위에 덮어씌우는 로딩 레이어 */}
      {isLoading && <Loading />}
    </div>
  );
}
