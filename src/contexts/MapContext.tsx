import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { getMarkerObj, getToiletByLatLon, type Toilet } from "../utils/homeUtil/totiletUtil";
import { createkakaoMap } from "../utils/homeUtil/kakaoMapUtil";
import { createMarker } from "../utils/homeUtil/kakaoMarkerUtil";

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
  // 상태 값 변경 + 리턴 함수 추가 
  updateMap: (lat: number, lng: number) => kakao.maps.Map | null;
  updateToilet: (lat: number, lng: number) => Promise<Toilet[] | null>;
  updateCurrLocation: (map: kakao.maps.Map, lat: number, lng: number) => kakao.maps.Marker | null;
  updateMarkers: (toiletList: Toilet[], map: kakao.maps.Map) => kakao.maps.Marker[];
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

  // 맵 객체 생성과 해당 맵 객체 리턴
  const updateMap = (lat: number, lng: number) => {
    const map: kakao.maps.Map = createkakaoMap(lat, lng); // 맵 객체 생성
    setMap(map);
    return map;
  }

  // 현재 근처 화장실 정보 업데이트와 정보 리턴
  const updateToilet = async (lat: number, lng: number) => {
    const currToilet: Toilet[] = await getToiletByLatLon(lat, lng); // 주변 화장실 정보 api
    setToilet(currToilet);
    return currToilet;
  }

  // 현재 위치 업데이트 (마커)
  const updateCurrLocation = (map: kakao.maps.Map, lat: number, lng: number) => {
    const myMarker: kakao.maps.Marker = createMarker(map, lat, lng, "내 위치");
    setCurrLocMark(myMarker);
    return myMarker;
  }

  // 모든 마커 업데이트
  const updateMarkers = (toiletList: Toilet[], map: kakao.maps.Map) => {
    const currMarkers: kakao.maps.Marker[] = [];

    if (Array.isArray(toiletList)) {
      toiletList.forEach(toilet => {
        const marker = getMarkerObj(toilet, map);
        currMarkers.push(marker);
      });
    }
    return currMarkers;
  }

  const value = {
    map, setMap,
    markers, setMarkers,
    toilet, setToilet,
    toiletOption, setToiletOption,
    currLocMark, setCurrLocMark,
    isLoading, setIsLoading,
    updateMap, updateToilet,
    updateCurrLocation, updateMarkers
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
