import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { type Toilet } from "../utils/homeUtil/totiletUtil";

export type ToiletOption = {
  별점: boolean;
  기저귀: boolean;
  안심: boolean;
  장애인용: boolean;
  [key: string]: boolean;
};

interface MapContextState {
  map: kakao.maps.Map | null;
  markers: kakao.maps.Marker[];
  toilet: Toilet[]; // 사용자 정의 타입
  toiletOption: ToiletOption; // 사용자 정의 타입
  currLocMark: kakao.maps.Marker | null;
  isLoading: boolean
}

interface MapContextValue extends MapContextState {
  setMap: (map: kakao.maps.Map | null) => void;
  setMarkers: (markers: kakao.maps.Marker[]) => void;
  setToilet: (toilet: Toilet[]) => void;
  setToiletOption: (option: ToiletOption) => void;
  setCurrLocMark: (marker: kakao.maps.Marker | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const MapContext = createContext<MapContextValue | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {

  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);
  const [toilet, setToilet] = useState<Toilet[]>([]);
  const [toiletOption, setToiletOption] = useState<ToiletOption>({
    별점: false,
    기저귀: false,
    안심: false,
    장애인용: false,
  });
  const [currLocMark, setCurrLocMark] = useState<kakao.maps.Marker | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    map, setMap,
    markers, setMarkers,
    toilet, setToilet,
    toiletOption, setToiletOption,
    currLocMark, setCurrLocMark,
    isLoading, setIsLoading
  };

  return (
    <MapContext.Provider value={value}>
      {children}
    </MapContext.Provider>
  );
}

export function useMap() {
  const context = useContext(MapContext);
  if (!context) throw new Error("MapProvider 내에서 사용하세요.");
  return context;
}

// 로딩 화면 만들기
// const [loading, setLoading]
