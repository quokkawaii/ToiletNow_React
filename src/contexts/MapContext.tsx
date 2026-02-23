import {
  createContext,
  useContext,
  useState,
  useRef,
  type ReactNode,
} from "react";
import { getToiletByLatLon, type Toilet } from "../utils/homeUtil/totiletUtil";

export type SwitchState = {
  별점: boolean;
  기저귀: boolean;
  안심: boolean;
  장애인용: boolean;
  [key: string]: boolean;
};

interface MapContextType {
  map: kakao.maps.Map | null;
  initMap: (lat: number, lng: number) => kakao.maps.Map | null;
  markers: kakao.maps.Marker[];
  setMarkers: React.Dispatch<React.SetStateAction<kakao.maps.Marker[]>>;
  toiletRef: React.RefObject<Toilet[]>;
  fetchToilets: (lat: number, lng: number) => Promise<Toilet[]>;
  // ✨ 이제 switches는 RefObject 타입입니다.
  switches: React.RefObject<SwitchState>;
  toggleSwitch: (name: string) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);
  const toiletRef = useRef<Toilet[]>([]);

  // 1. switches를 useRef로 변경 (초기값 설정)
  const switches = useRef<SwitchState>({
    별점: false,
    기저귀: false,
    안심: false,
    장애인용: false,
  });

  // 2. 토글 함수: 이제 UI 리렌더링을 일으키지 않고 값만 즉시 변경합니다.
  const toggleSwitch = (name: string) => {
    if (!switches.current || !(name in switches.current)) {
      console.warn(`[실패] 존재하지 않는 스위치 키: ${name}`);
      return;
    }

    // .current 내부의 값을 직접 변경 (동기적 반영)
    switches.current[name] = !switches.current[name];
    console.log(`[상태 변경] ${name}: ${switches.current[name]}`);
  };

  // 맵 초기화,
  const initMap = (lat: number, lng: number) => {
    const container = document.getElementById("map");
    if (!container) return null;
    if (map) {
      map.setCenter(new kakao.maps.LatLng(lat, lng));
      return map;
    }
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3,
    };
    const newMap = new kakao.maps.Map(container, options);
    setMap(newMap);
    return newMap;
  };

  const fetchToilets = async (lat: number, lng: number) => {
    const json = await getToiletByLatLon(lat, lng);
    toiletRef.current = json;
    return json;
  };

  return (
    <MapContext.Provider
      value={{
        map, // 카카오 맵 객체
        initMap, // 초기 맵, 싱글톤으로 하나만 유지되게
        markers, // 현재 마커 정보
        setMarkers, // 마커 useState하기 => 이것도 나중에 useRef로 바꿔야할듯
        toiletRef, // 현재 화장실 정보
        fetchToilets, // 주변 화장실 정보 가져오기
        switches, // 현재 필터된것들 표시
        toggleSwitch, // 클릭시 해당 필터 toggle
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMap() {
  const context = useContext(MapContext);
  if (!context) throw new Error("MapProvider 내에서 사용하세요.");
  return context;
}
