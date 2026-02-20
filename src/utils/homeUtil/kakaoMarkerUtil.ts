// 마커 찍기
export function createMarker(
  map: kakao.maps.Map,
  lat: number,
  lng: number,
  title: string,
) {
  let markerPosition = new kakao.maps.LatLng(lat, lng);

  // 마커를 생성합니다
  let marker = new kakao.maps.Marker({
    position: markerPosition,
    title: title, // 마커에 마우스 호버했을때 title이 나옴
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);
  return marker;
}
