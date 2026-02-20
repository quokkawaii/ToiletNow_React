export default function MapFillterTag({
  svgClassName,
  path,
  svgTextContent,
}: {
  svgClassName: string;
  path: string;
  svgTextContent: string;
}) {
  return (
    <div className="flex-grow-1">
      <input
        type="checkbox"
        className={`btn-check ${svgClassName}`}
        id="btncheck3"
        autoComplete="off"
      />
      <label
        className="btn btn-outline-dark btn-sm rounded-5 w-100 mt-2"
        htmlFor="btncheck3"
      >
        <div className="d-flex align-items-center justify-content-center">
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

// props
// 1. path : svg의 path값
// 2. svgText : svg의 text값
// 이외는 다 같을것으로 보임
