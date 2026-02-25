import markerImg from "../../assets/images/openMarker.png";

// 마커 찍기
export function createMarker(
  map: kakao.maps.Map,
  lat: number,
  lng: number,
  title: string,
) {
  let markerPosition = new kakao.maps.LatLng(lat, lng);

  // 마커 이미지를 생성합니다
  var markerImage = new kakao.maps.MarkerImage(
    markerImg,
    new kakao.maps.Size(40, 40),
  );

  // 마커를 생성합니다
  let marker = new kakao.maps.Marker({
    map: map, // 마커를 표시할 지도
    position: markerPosition,
    title: title, // 마커에 마우스 호버했을때 title이 나옴
    image: markerImage, // 마커 이미지
    clickable: true, // 클릭이벤트 설정
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  // marker.setMap(map);
  return marker;
}
