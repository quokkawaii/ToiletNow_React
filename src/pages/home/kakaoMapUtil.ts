// 샘플 데이터, 추후 동적인 값 들어오면 삭제하기

export interface SampleLocation {
  title: string;
  lat: number;
  lng: number;
}

export const sampleLocations: SampleLocation[] = [
  {
    title: "의정부역 (1호선)",
    lat: 37.7384, // 기준점보다 약간 남쪽
    lng: 127.0459,
  },
  {
    title: "의정부시청",
    lat: 37.7381,
    lng: 127.0333,
  },
  {
    title: "신세계백화점 의정부점",
    lat: 37.7395,
    lng: 127.0465,
  },
  {
    title: "의정부 로데오거리",
    lat: 37.7416,
    lng: 127.0487,
  },
  {
    title: "경기도청 북부청사",
    lat: 37.7511,
    lng: 127.0714, // 약간 거리가 있지만 주요 관공서
  },
  {
    title: "의정부동 성당",
    lat: 37.7488,
    lng: 127.0401,
  },
  {
    title: "의정부1동 우체국",
    lat: 37.7478,
    lng: 127.0415,
  },
  {
    title: "상우고등학교",
    lat: 37.7465,
    lng: 127.0375,
  },
  {
    title: "의정부초등학교",
    lat: 37.7495,
    lng: 127.0365,
  },
];

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
        reject(alert("위치 권한이 거부되었습니다."));
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
}
