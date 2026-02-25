import { useMap } from "../../contexts/MapContext";
import { createMarker } from "../../utils/homeUtil/kakaoMarkerUtil";
import React, { type Dispatch, type SetStateAction } from "react";

export default function MapFilterTag({
  svgClassName,
  path,
  svgTextContent,
  idx,
  isLoading,
  setIsLoading,
}: {
  svgClassName: string;
  path: string;
  svgTextContent: string;
  idx: number;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const { map, markers, setMarkers, toiletRef, switches, toggleSwitch } =
    useMap();

  // 1. 마커 업데이트 로직을 별도 함수로 분리
  const updateMarkers = () => {
    if (!map) return;

    // 1-1. 기존 마커 지우기, 기존 마커는 납두기 (현재 위치)
    if (markers && markers.length > 0) {
      // markers에 담긴 값이 있다면 해당 마커를 지우기
      markers.forEach((marker) => marker.setMap(null));
    }

    // 1-2. 현재 Ref 상태(switches.current)를 기준으로 필터링
    const filterToilet = toiletRef.current.filter((toilet) => {
      const toiletState = switches.current; // Ref이므로 .current 접근
      const { tdiaper, tdisabled, talarm, tcctv } = toilet;

      if (toiletState.기저귀 && tdiaper !== "Y") return false;
      if (toiletState.장애인용 && tdisabled !== "Y") return false;
      if (toiletState.안심 && talarm !== "Y" && tcctv !== "Y") return false;

      return true;
    });
    console.log(switches.current);
    // 1-3. 필터링된 데이터로 새 마커 생성
    const newMarkers = filterToilet.map((toilet) => {
      return createMarker(map, toilet.tlat, toilet.tlot, toilet.tname);
    });

    // 1-4. 상태 업데이트 (화면 그리기)
    setMarkers(newMarkers);
  };

  // 2. 클릭 핸들러
  const onToggle = async (e: React.MouseEvent<HTMLDivElement>) => {
    // 이미 로딩 중(1초 지연 포함)이면 클릭 무시
    if (isLoading) return;

    setIsLoading(true);

    e.stopPropagation();
    // 텍스트 추출 시 currentTarget 내부 구조가 로딩 중일 때 바뀔 수 있으므로
    // props로 전달받은 svgTextContent를 사용하는 것이 더 안전합니다.
    const text = svgTextContent?.trim();

    if (text) {
      // (1) Ref 값 변경
      toggleSwitch(text);

      // (2) 수동으로 마커 업데이트 호출
      updateMarkers();
    }

    // (3) 핵심: 1초(1000ms) 동안 대기한 후 로딩 상태를 해제
    // 이 시간 동안 isLoading이 true이므로 상단에서 클릭이 차단됩니다.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
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
          {isLoading ? (
            // 1. 로딩 중일 때 보여줄 UI
            <span
              className="spinner-border spinner-border-sm me-1"
              role="status"
            />
          ) : (
            // 2. 로딩이 아닐 때 보여줄 UI (여러 요소이므로 <> </>로 감쌈)
            <>
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
            </>
          )}
        </div>
      </label>
    </div>
  );
}
