import { useState } from "react";
import { Link } from "react-router-dom";
import { logo2 } from "../../assets/Images";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* 햄버거 버튼 */}
      <button className="btn border-0 p-2" type="button" onClick={toggleMenu}>
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* 오프캔버스 메뉴 */}
      <div
        className={`offcanvas offcanvas-start ${isOpen ? "show" : ""}`}
        style={{ visibility: isOpen ? "visible" : "hidden" }}
        tabIndex={-1} // 아까 발생한 타입 에러 해결: 숫자로 입력
      >
        <div className="offcanvas-header border-bottom">
          {/* 설명 2: Menu 텍스트 대신 이미지 배치 */}
          <button className="offcanvas-title" onClick={toggleMenu}>
            <img src={logo2} alt="logo" style={{ height: "30px" }} />
          </button>
          <button
            type="button"
            className="btn-close text-reset"
            onClick={toggleMenu}
          ></button>
        </div>

        <div className="offcanvas-body p-0">
          <div className="list-group list-group-flush" onClick={toggleMenu}>
            {/* 설명 1: 요청하신 텍스트 문구 및 라우터 설정 */}
            <Link
              to="/login"
              className="list-group-item list-group-item-action py-3"
            >
              로그인 화면
            </Link>
            <Link
              to="/changepassword"
              className="list-group-item list-group-item-action py-3"
            >
              비밀번호 변경
            </Link>
            <Link
              to="/signup"
              className="list-group-item list-group-item-action py-3"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>

      {/* 배경 오버레이 */}
      {isOpen && (
        <div
          className="offcanvas-backdrop fade show"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
}
