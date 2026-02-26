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

// toiletOption = MapContext.tsx에 있음
// 근데 여기 파일까지 export 되는지 몰라서 일단 하나 더 만듬
type ToiletOption = {
  별점: boolean;
  기저귀: boolean;
  안심: boolean;
  장애인용: boolean;
  [key: string]: boolean;
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

// 화장실 필터하기
// 리턴은 필터된 화장실들!
export const getFilterToilet = (
  toilet: Toilet[],
  toiletOption: ToiletOption,
) => {
  const filteredToilet: Toilet[] = toilet.filter((t) => {
    const {
      tdiaper: 기저귀,
      tdisabled: 장애인용,
      talarm: 알람,
      tcctv: 보안,
    } = t;

    // toilet에서 가져온 값 = 'Y', 'N' 둘중 하나임
    // 해당 화장실에서 Y인 값과 toiletOption에서 true인거만 마커 생성

    if (toiletOption.기저귀 && 기저귀 != "Y") return false;
    if (toiletOption.장애인용 && 장애인용 !== "Y") return false;
    if (toiletOption.안심 && 알람 !== "Y" && 보안 !== "Y") return false;
    return true;
  });
  return filteredToilet;
};
