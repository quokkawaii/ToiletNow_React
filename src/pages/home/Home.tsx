import { MapProvider } from "../../contexts/MapContext";
import SearchLocation from "./SearchLocation";
import KakaoMap from "./KakaoMap";
import MapFillter from "./MapFillter";

export default function Home() {
  return (
    <div className="mt-4">
      <MapProvider>
        <SearchLocation />
        <MapFillter />
        <KakaoMap />
      </MapProvider>
    </div>
  );
}
