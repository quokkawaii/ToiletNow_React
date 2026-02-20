export type Toilet = {
  tlat: number;
  tlot: number;
  tname: string;
};

// 주변 화장실 정보 가져오기
export async function getToiletByLatLon(lat: number, lng: number) {
  const response = await fetch(
    `http://127.0.0.1:8081/api/toilet/?lat=${lat}&lon=${lng}`,
  );
  const json = await response.json();
  return json;
}
