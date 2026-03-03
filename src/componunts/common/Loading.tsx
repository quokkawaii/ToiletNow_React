export default function Loading() {
  return (
    <div
      className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-white shadow-sm rounded"
      style={{
        zIndex: 10,
        opacity: 0.9,
        left: 0,
        right: 0,
      }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      {/* 텍스트가 세로로 나오지 않도록 w-100과 text-center 추가 */}
      <p className="mt-3 fw-bold text-primary w-100 text-center">
        지도를 불러오고 있습니다...
      </p>
    </div>
  );
}
