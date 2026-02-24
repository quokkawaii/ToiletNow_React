import { useMap } from "../../contexts/MapContext";

export default function MapFilterTag({
  svgClassName,
  path,
  svgTextContent,
  idx,
}: {
  svgClassName: string;
  path: string;
  svgTextContent: string;
  idx: number;
}) {
  const { map, markers, setMarkers, toiletRef, switches, toggleSwitch } =
    useMap();

  // 1. 마커 업데이트 로직을 별도 함수로 분리
  const updateMarkers = () => {
    if (!map) return;

    // 1-1. 기존 마커 지우기, 기존 마커는 납두기 (현재 위치)
    if (markers.length > 0) {
      markers.forEach((marker, idx) => {
        if (idx !== 0) marker.setMap(null);
      });
    }

    // 1-2. 현재 Ref 상태(switches.current)를 기준으로 필터링
    const filterToilet = toiletRef.current.filter((toilet) => {
      const s = switches.current!; // Ref이므로 .current 접근
      const { tdiaper, tdisabled, talarm, tcctv } = toilet;

      if (s.기저귀 && tdiaper !== "Y") return false;
      if (s.장애인용 && tdisabled !== "Y") return false;
      if (s.안심 && talarm !== "Y" && tcctv !== "Y") return false;

      return true;
    });

    // 1-3. 필터링된 데이터로 새 마커 생성
    const newMarkers = filterToilet.map((toilet) => {
      return new kakao.maps.Marker({
        position: new kakao.maps.LatLng(toilet.tlat, toilet.tlot),
        title: toilet.tname,
        map: map,
      });
    });

    // 1-4. 상태 업데이트 (화면 그리기)
    setMarkers(newMarkers);
  };

  // 2. 클릭 핸들러
  const onToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const text = e.currentTarget.textContent?.trim();

    if (text) {
      // (1) Ref 값 변경 (리렌더링 X)
      toggleSwitch(text);

      // (2) 수동으로 마커 업데이트 호출
      updateMarkers();
    }
  };

  return (
    <div className="flex-grow-1">
      <input
        type="checkbox"
        className={`btn-check ${svgClassName}`}
        id={"btncheck" + idx}
        autoComplete="off"
        // Ref를 사용하므로 체크박스의 시각적 상태는 HTML 기본 동작(label htmlFor)에 의존
      />
      <label
        className="btn btn-outline-primary btn-sm rounded-5 w-100 mt-2"
        htmlFor={"btncheck" + idx}
      >
        <div
          onClick={onToggle}
          className="d-flex align-items-center justify-content-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-star me-1"
            viewBox="0 0 16 16"
          >
            <path d={path} />
          </svg>
          {svgTextContent}
        </div>
      </label>
    </div>
  );
}
