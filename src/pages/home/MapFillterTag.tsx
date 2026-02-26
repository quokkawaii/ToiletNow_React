import { useMap, type ToiletOption } from "../../contexts/MapContext";
import {
  createMarker,
  cleanMarkers,
} from "../../utils/homeUtil/kakaoMarkerUtil";
import { getFilterToilet } from "../../utils/homeUtil/totiletUtil";

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
  const {
    map,
    markers,
    setMarkers,
    setToiletOption,
    toiletOption,
    toilet,
    isLoading,
    setIsLoading,
    currLocMark,
  } = useMap();

  // 1. 마커 업데이트 로직을 별도 함수로 분리
  const updateMarkers = () => {
    if (map == null) return;

    // 맵에 올라와 있는 마커들 지우기
    if (markers && markers.length > 0) {
      cleanMarkers(markers);
    }

    // 제거한뒤 markers 비워주기
    setMarkers([]);

    // 현재 toiletOption값을 기준으로 화장실 정보 걸러주기
    // 현재 상태값으로 진행해야 안꼬일듯
    const currToiletOption: ToiletOption = toiletOption; // context의 값을 가져오기

    currToiletOption[svgTextContent] = !currToiletOption[svgTextContent]; // 가져온값을 논리부정

    setToiletOption(currToiletOption); // 화장실 옵션의 상태값을 바꾸기

    // 필터된 화장실들을 담을 배열
    const filteredToilet = getFilterToilet(toilet, toiletOption);

    // 필터링된 데이터로 새 마커 생성
    const newMarkers: kakao.maps.Marker[] = filteredToilet.map((fToilet) =>
      createMarker(map, fToilet.tlat, fToilet.tlot, fToilet.tname),
    );

    // 현재 위치가 있을경우 = SearchLocation의 상태가 아닐경우
    // 로직을 짤려했는데 Mapcontext의 currLocMark값이 있는 이상 계속 맵에 표시될듯?
    // 안나와서 출력해주기
    if (currLocMark != null) {
      currLocMark.setMap(map);
      newMarkers.push(currLocMark);
    }

    // 상태 업데이트 (화면 그리기)
    setMarkers(newMarkers);
  };

  // 2. 클릭 핸들러
  const onToggle = async (e: React.MouseEvent<HTMLDivElement>) => {
    // 만약 로딩 중이라면 return 해주기
    if (isLoading) {
      console.log("로딩중 클릭됨");
      return;
    }

    // 로딩 시작
    setIsLoading(true);

    e.stopPropagation();

    updateMarkers();

    await new Promise((resolve) => setTimeout(resolve, 300));

    // 로딩 종료
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
        className={`btn btn-outline-primary btn-sm rounded-5 w-100 mt-2 ${
          isLoading ? "pe-none opacity-50" : ""
        }`}
        htmlFor={"btncheck" + idx}
      >
        <div
          onClick={onToggle}
          className={`d-flex align-items-center justify-content-center`}
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
