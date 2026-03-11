import { MapProvider } from "../../contexts/MapContext";
import SearchLocation from "./SearchLocation";
import KakaoMap from "./KakaoMap";
import MapFillter from "./MapFillter";

export default function Home() {
  return (
    <>
      <MapProvider>
        <SearchLocation />
        <MapFillter />
        <KakaoMap />
      </MapProvider>
    </>
  );
}
