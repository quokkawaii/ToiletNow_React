import { useEffect } from "react";
import * as kakaoMapUtil from "./kakaoMaputil";

// 초기 맵생성과 마커 찍기, 기능이라 분리 해야됨
// 임시 값을 넣어놨음
// useEffect안에서 비동기 코드 못돌려서 해결방법 찾아야할듯
// 37.7484 127.0382 => 내 위치
const initMap = async () => {
  let { lat, lng } = await kakaoMapUtil.currLocation();

  const map: kakao.maps.Map = kakaoMapUtil.createkakaoMap(lat, lng);

  // 마커 찍기 (현재 위치)
  kakaoMapUtil.createMarker(map, lat, lng, "위치가 이상해");
  console.log(lat, lng);

  // 마커 찍기 (주변 위치)
  kakaoMapUtil.sampleLocations.forEach((location) => {
    kakaoMapUtil.createMarker(map, location.lat, location.lng, location.title);
  });
};

export default function Map() {
  useEffect(() => {
    kakao.maps.load(() => {
      // 초기 맵 생성
      initMap();
    });
  }, []);

  return (
    <div
      id="map"
      className="shadow-sm rounded mx-auto"
      style={{ width: "500px", height: "500px" }}
    ></div>
  );
}
