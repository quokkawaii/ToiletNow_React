import {
  currLocation,
  createkakaoMap,
} from "../../utils/homeUtil/kakaoMapUtil";
import { createMarker } from "../../utils/homeUtil/kakaoMarkerUtil";
import {
  getToiletByLatLon,
  type Toilet,
} from "../../utils/homeUtil/totiletUtil";

// 카카오 맵 렌더

export const renderKakaoMap = (
  setMap: (map: kakao.maps.Map | null) => void,
  setCurrLocMark: (marker: kakao.maps.Marker | null) => void,
  setToilet: (toilets: Toilet[]) => void,
  setMarkers: (markers: kakao.maps.Marker[]) => void,
  setIsLoading: (isLoading: boolean) => void,
) => {
  kakao.maps.load(async () => {
    // 변수 필드 시작
    const { lat, lng } = await currLocation(); // currnet location { lat, lng }
    const currMarkers: kakao.maps.Marker[] = []; // save current Marker state
    // 변수 필드 종료

    // change1 toilet state 시작
    const currToilet: Toilet[] = await getToiletByLatLon(lat, lng); // 주변 화장실 정보 api
    setToilet(currToilet);
    // change1 toilet state 종료

    //  render1 : 카카오맵 객체 생성, 상태 업데이트 시작
    const newMap: kakao.maps.Map = createkakaoMap(lat, lng); // 맵 객체 생성
    setMap(newMap);
    if (newMap == null) return;
    //  render1 : 카카오맵 객체 생성, 상태 업데이트 종료

    // change2 : 현재 위치 상태 업데이트 시작
    const myMarker = createMarker(newMap, lat, lng, "내 위치");
    setCurrLocMark(myMarker);
    // change2 : 현재 위치 상태 업데이트 종료

    // render2 : 현재 마커 상태를 업데이트 시작
    currMarkers.push(myMarker); // 현재 위치 마커 생성
    if (Array.isArray(currToilet))
      currMarkers.push(...getCurrMarkerArr(currToilet, newMap));
    setMarkers(currMarkers);
    // render2 : 현재 마커 상태를 업데이트 종료

    // render3 : 로딩 상태 업데이트 시작
    setIsLoading(false);
    // render3 : 로딩 상태 업데이트 종료
  });
};

// 일단 임시로 여기에 util 함수 생성
const getCurrMarkerArr = (currToilet: Toilet[], map: kakao.maps.Map) => {
  const currMarkers: kakao.maps.Marker[] = [];
  currToilet.forEach((toilet: Toilet) => {
    const marker = createMarker(map, toilet.tlat, toilet.tlot, toilet.tname);
    currMarkers.push(marker);
  });
  return currMarkers;
};
