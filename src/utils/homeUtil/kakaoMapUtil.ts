// 현재 위치 위도/ 경도 뽑기
// navigator는 비동기인데 promise가 아니라서 promise로 만들어주고 async/await 해야되네
export function currLocation(): Promise<{ lat: number; lng: number }> {
  return new Promise((reslove, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        reslove({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        reject(alert("위치 권한이 거부되었습니다. 기준점: 서울"));
        searchStation("서울");
      },
    );
  });
}

// 입력받은 구/동 이름으로 가장 가까운 역 뽑기
export function searchStation(
  region: string,
): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    new kakao.maps.services.Geocoder().addressSearch(
      region,
      (result, status) => {
        if (status == kakao.maps.services.Status.OK) {
          console.log(result);
          resolve({
            lat: parseFloat(result[0].y),
            lng: parseFloat(result[0].x),
          }); // 위도, 경도
        } else {
          reject(status);
        }
      },
    );
  });
}

// 위도 경도를 받아서 맵 중심지점, 마커 찍기, kakao.map.Map 객체 리턴해주기?
// 여기서 title도 추가할 수 있는듯함
// 반드시 해당 코드들은  kakao.maps.load(() => {})안에서 실행해야함
export function createkakaoMap(lat: number, lng: number) {
  const container = document.querySelector("#map") as HTMLElement;

  // 값 초기화 안하면 맵 확대/축소시 겹쳐보이는 현상?
  container.innerHTML = "";

  const options = {
    center: new kakao.maps.LatLng(lat, lng),
    level: 3,
  };
  return new kakao.maps.Map(container, options);
}

// 위치 이동
export const moveTo = (map: kakao.maps.Map, lat: number, lon: number) => {
  const locPosition = new kakao.maps.LatLng(lat, lon);
  map.panTo(locPosition);
};
