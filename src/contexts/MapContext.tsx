import {
  createContext,
  useContext,
  useState,
  useRef,
  type ReactNode,
} from "react";
import { getToiletByLatLon, type Toilet } from "../utils/homeUtil/totiletUtil";

interface MapContextType {
  map: kakao.maps.Map | null;
  initMap: (lat: number, lng: number) => kakao.maps.Map | null;
  markers: kakao.maps.Marker[];
  setMarkers: React.Dispatch<React.SetStateAction<kakao.maps.Marker[]>>;
  // ✨ useRef의 타입을 정의 (current 내부에 Toilet 배열이 들어감)
  toiletRef: React.RefObject<Toilet[]>; // toiletRef: React.MutableRefObject<Toilet[]> 리액트 문법이 수정?
  fetchToilets: (lat: number, lng: number) => Promise<Toilet[]>;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);

  // ✨ useState 대신 useRef 사용 (초기값은 빈 배열)
  const toiletRef = useRef<Toilet[]>([]);

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

  // ✨ fetchToilets: 데이터를 가져와 Ref에 저장만 하고 렌더링은 하지 않음
  const fetchToilets = async (lat: number, lng: number) => {
    const json = await getToiletByLatLon(lat, lng);
    toiletRef.current = json; // .current에 직접 할당 (렌더링 유발 X)
    return json; // 컴포넌트에서 즉시 마커를 생성할 수 있도록 데이터 반환
  };

  return (
    <MapContext.Provider
      value={{ map, initMap, markers, setMarkers, toiletRef, fetchToilets }}
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
