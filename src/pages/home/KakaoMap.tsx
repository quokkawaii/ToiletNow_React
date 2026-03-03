import { useEffect } from "react";
import { useMap } from "../../contexts/MapContext";
import CurrLocBtn from "./CurrLocBtn";
import { renderKakaoMap } from "./mapRender";
import Loading from "../../componunts/common/Loading";

export default function KakaoMap() {
  const {
    setMap,
    setMarkers,
    setToilet,
    isLoading,
    setIsLoading,
    setCurrLocMark,
  } = useMap();

  useEffect(() => {
    try {
      setIsLoading(true);

      renderKakaoMap(
        setMap,
        setCurrLocMark,
        setToilet,
        setMarkers,
        setIsLoading,
      );
    } catch (error) {
      console.error(error);
    }
  }, []); // useEffect로 맨 처음 실행되었을때만 맵을 그림

  return (
    <div
      className="position-relative shadow-sm rounded mx-auto w-100"
      style={{ minHeight: "500px" }} // 지도가 들어갈 최소 높이 확보
    >
      {/* 1. 지도를 먼저 렌더링 (항상 존재해야 함) */}
      <div id="map" className="shadow-sm rounded mx-auto"></div>
      <CurrLocBtn />

      {/* 2. isLoading일 때만 그 위에 덮어씌우는 로딩 레이어 */}
      {isLoading && <Loading />}
    </div>
  );
}
