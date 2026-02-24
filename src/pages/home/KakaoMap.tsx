import { useEffect } from "react";
import * as kakaoMapUtil from "../../utils/homeUtil/kakaoMapUtil";
import * as kakaoMarkerUtil from "../../utils/homeUtil/kakaoMarkerUtil";
import { useMap } from "../../contexts/MapContext";

export default function Map() {
  const { initMap, setMarkers, toiletRef, fetchToilets } = useMap();

  useEffect(() => {
    kakao.maps.load(() => {
      const startApp = async () => {
        try {
          const { lat, lng } = await kakaoMapUtil.currLocation(); // 현재 위치 위도경도
          if (lat == null || lng == null) {
            // await kakaoMapUtil.searchStation("서울");
          }
          const currentMap = initMap(lat, lng); // 해당 값을 중심점으로 맵 생성

          if (currentMap) {
            // 맵이 생성되었을 경우

            // 맵의 마커들을 담을 변수 : 내 위치와 주변 화장실 정보를 담기 추후 마커 삭제를 위해 필요
            const tempMarkers: kakao.maps.Marker[] = [];

            // 현재 위치의 마커를 맵에 생성하고 tempMarkers에 저장
            const myMarker = kakaoMarkerUtil.createMarker(
              currentMap,
              lat,
              lng,
              "내 위치",
            );
            tempMarkers.push(myMarker);

            // 주변 반경 1km 화장실 정보 가져오기
            await fetchToilets(lat, lng); // toiletRef의 값 바꾸기

            // 만약 totiletDatas가 array일 경우 (=주변 화장실이 있을경우)
            if (Array.isArray(toiletRef.current)) {
              // 모든 화장실의 값을 맵에 찍어주기 + tempMarkers에 저장
              toiletRef.current.forEach((toilet: any) => {
                const marker = kakaoMarkerUtil.createMarker(
                  currentMap,
                  toilet.tlat,
                  toilet.tlot,
                  toilet.tname,
                );
                tempMarkers.push(marker);
              });
            }

            // 전역 상태에 모든 마커 저장 (그래야 SearchLocation에서 지움)
            setMarkers(tempMarkers); // 마커들의 정보를 수정하는 setMarkers, markers의 값 수정
          }
        } catch (error) {
          console.error(error);
        }
      };

      startApp();
    });
  }, []); // useEffect로 맨 처음 실행되었을때만 맵을 그림

  return (
    <div
      id="map"
      className="shadow-sm rounded mx-auto"
    ></div>
  );
}
