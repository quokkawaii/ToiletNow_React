export type Toilet = {
  tid: number; // 화장실 ID (예: 30650)
  tname: string; // 화장실 명칭 (예: "흥산에너지주유소")
  tregion: string; // 동 단위 지역 (예: "신곡동")
  tregion2: string; // 구/시 단위 지역 (예: "의정부시")
  taddr: string; // 상세 주소 (예: "경기 의정부시 금신로 91")
  tlat: number; // 위도 (예: 37.728992904149)
  tlot: number; // 경도 (예: 127.063671245779)
  ttime: string; // 이용 시간 (예: "상시")
  toptime: string | null; // 개방 시간 상세 (null 값이 들어올 수 있음)
  tdiaper: "Y" | "N"; // 기저귀 교환대 유무 (Y/N 리터럴 타입)
  tdisabled: "Y" | "N"; // 장애인용 화장실 유무
  talarm: "Y" | "N"; // 비상벨 유무
  tcctv: "Y" | "N"; // CCTV 유무
  distance: number; // 거리 (예: 0.055165...)
};

// 주변 화장실 정보 가져오기
export async function getToiletByLatLon(lat: number, lng: number) {
  const response = await fetch(
    `http://127.0.0.1:8081/api/toilet/?lat=${lat}&lon=${lng}`,
  );
  const json = await response.json();
  console.log(json);
  
  return json;
}
