import { useEffect } from "react";
import * as kakaoMapUtil from "../../utils/homeUtil/kakaoMapUtil";
import * as kakaoMarkerUtil from "../../utils/homeUtil/kakaoMarkerUtil";
import { useMap } from "../../contexts/MapContext";
import {
  getToiletByLatLon,
  type Toilet,
} from "../../utils/homeUtil/totiletUtil";

export default function Map() {
  const {
    setMap,
    setMarkers,
    setToilet,
    isLoading,
    setIsLoading,
    setCurrLocMark,
  } = useMap();

  useEffect(() => {
    setIsLoading(true);

    kakao.maps.load(() => {
      const startApp = async () => {
        try {
          const { lat, lng } = await kakaoMapUtil.currLocation(); // 현재 위치 위도경도
          const newMap = kakaoMapUtil.createkakaoMap(lat, lng); // 맵 객체 생성
          setMap(newMap); // 맵 객체 상태 업데이트

          if (newMap == null) return; // 맵이 생성되었을 경우

          // 현재 위치의 마커를 맵에 생성하고 tempMarkers에 저장
          const myMarker = kakaoMarkerUtil.createMarker(
            newMap,
            lat,
            lng,
            "내 위치",
          );
          // 내 위치 마커 객체 업데이트
          setCurrLocMark(myMarker);

          // 맵의 마커들을 담을 변수 : 내 위치와 주변 화장실 정보를 담기 추후 마커 삭제를 위해 필요
          const tempMarkers: kakao.maps.Marker[] = [];

          tempMarkers.push(myMarker);

          // 주변 반경 1km 화장실 정보 가져오기
          const currToilet: Toilet[] = await getToiletByLatLon(lat, lng); // toiletRef의 값 바꾸기

          // 화장실 상태 업데이트
          setToilet(currToilet);

          // 만약 totiletDatas가 array일 경우 (=주변 화장실이 있을경우)
          if (Array.isArray(currToilet)) {
            // 모든 화장실의 값을 맵에 찍어주기 + tempMarkers에 저장
            currToilet.forEach((toilet: Toilet) => {
              const marker = kakaoMarkerUtil.createMarker(
                newMap,
                toilet.tlat,
                toilet.tlot,
                toilet.tname,
              );
              tempMarkers.push(marker);
            });
          }

          // 전역 상태에 모든 마커 저장 (그래야 SearchLocation에서 지움)

          setMarkers(tempMarkers); // 마커들의 정보를 수정하는 setMarkers, markers의 값 수정
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      startApp();
    });
  }, []); // useEffect로 맨 처음 실행되었을때만 맵을 그림

  return (
    <div
      className="position-relative shadow-sm rounded mx-auto w-100"
      style={{ minHeight: "500px" }} // 지도가 들어갈 최소 높이 확보
    >
      {/* 1. 지도를 먼저 렌더링 (항상 존재해야 함) */}
      <div id="map" className="shadow-sm rounded mx-auto"></div>

      {/* 2. isLoading일 때만 그 위에 덮어씌우는 로딩 레이어 */}
      {isLoading && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-white shadow-sm rounded"
          style={{
            zIndex: 10,
            opacity: 0.9,
            left: 0,
            right: 0,
          }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          {/* 텍스트가 세로로 나오지 않도록 w-100과 text-center 추가 */}
          <p className="mt-3 fw-bold text-primary w-100 text-center">
            지도를 불러오고 있습니다...
          </p>
        </div>
      )}
    </div>
  );
}
