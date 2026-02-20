import HomeBtn from "../../componunts/common/HomeBtn";
import { MapProvider } from "../../contexts/MapContext";
import SearchLocation from "./SearchLocation";
import KakaoMap from "./KakaoMap";
import MapFillter from "./MapFillter";

export default function Home() {
  return (
    <div>
      <HomeBtn></HomeBtn>
      <MapProvider>
        <SearchLocation />
        <MapFillter />
        <KakaoMap />
      </MapProvider>
    </div>
  );
}
