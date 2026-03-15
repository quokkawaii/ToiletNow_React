import React, { useState } from "react";

interface TermsProps {
  show: boolean;
  onClose: () => void;
  onAgree: (agreed: boolean) => void;
}

export default function TermOffcanvas({ show, onClose, onAgree }: TermsProps) {
  const [checks, setChecks] = useState({
    term1: false,
    term2: false,
  });

  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setChecks({ term1: isChecked, term2: isChecked });
  };

  const isRequiredDone = checks.term1 && checks.term2;

  return (
    <>
      {/* 백드롭 (배경 레이어) */}
      <div
        className={`offcanvas-backdrop fade ${show ? "show" : "d-none"}`}
        onClick={onClose}
      ></div>

      {/* 오프캔버스 본체: offcanvas-start(왼쪽), 가로 70%, 세로 100% */}
      <div
        className={`offcanvas offcanvas-start ${show ? "show" : ""}`}
        style={{
          width: "70%",
          height: "100vh",
          visibility: show ? "visible" : "hidden",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-bold m-0 text-primary">이용 약관 동의</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>

        <div className="offcanvas-body d-flex flex-column gap-4 py-4">
          {/* 전체 동의 영역 */}
          <div className="p-3 bg-light rounded-3 border">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="all"
                checked={checks.term1 && checks.term2}
                onChange={handleAllCheck}
              />
              <label className="form-check-label fw-bold" htmlFor="all">
                필수 약관에 모두 동의합니다.
              </label>
            </div>
          </div>

          {/* 1. 서비스 이용약관 */}
          <div className="term-section">
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="t1"
                checked={checks.term1}
                onChange={(e) =>
                  setChecks({ ...checks, term1: e.target.checked })
                }
              />
              <label className="form-check-label fw-bold" htmlFor="t1">
                [필수] 서비스 이용약관
              </label>
            </div>
            <div
              className="border rounded p-3 bg-white"
              style={{
                height: "160px",
                overflowY: "auto",
                fontSize: "0.8rem",
                color: "#666",
                lineHeight: "1.5",
              }}
            >
              <strong>제 1 조 (목적)</strong>
              <br />
              본 약관은 'ToiletNow'(이하 "서비스")가 제공하는 위치 기반 화장실
              검색 및 관련 제반 서비스의 이용과 관련하여 회사와 회원과의 권리,
              의무 및 책임사항을 규정함을 목적으로 합니다.
              <br />
              <br />
              <strong>제 2 조 (용어의 정의)</strong>
              <br />
              1. "서비스"란 회사가 운영하는 애플리케이션을 통해 제공되는 정보를
              의미합니다.
              <br />
              2. "회원"이란 본 약관에 동의하고 계정을 생성한 이용자를
              의미합니다.
              <br />
              <br />
              <strong>제 3 조 (약관의 효력)</strong>
              <br />본 약관은 이용자가 동의함과 동시에 효력이 발생하며, 회사는
              관련 법령을 위배하지 않는 범위 내에서 약관을 개정할 수 있습니다.
            </div>
          </div>

          {/* 2. 개인정보 수집 이용 동의 */}
          <div className="term-section">
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="t2"
                checked={checks.term2}
                onChange={(e) =>
                  setChecks({ ...checks, term2: e.target.checked })
                }
              />
              <label className="form-check-label fw-bold" htmlFor="t2">
                [필수] 개인정보 수집 및 이용
              </label>
            </div>
            <div
              className="border rounded p-3 bg-white"
              style={{
                height: "160px",
                overflowY: "auto",
                fontSize: "0.8rem",
                color: "#666",
                lineHeight: "1.5",
              }}
            >
              <strong>1. 수집하는 개인정보 항목</strong>
              <br />
              - 이름, 이메일 주소, 비밀번호, 서비스 이용 기록
              <br />
              <br />
              <strong>2. 개인정보의 수집 및 이용 목적</strong>
              <br />
              - 회원 식별 및 가입 의사 확인
              <br />
              - 공공데이터 기반 맞춤형 정보 제공
              <br />
              - 불만 처리 등 민원 처리 및 고지사항 전달
              <br />
              <br />
              <strong>3. 개인정보의 보유 및 이용 기간</strong>
              <br />- 원칙적으로 회원 탈퇴 시 즉시 파기합니다. 단, 법령에 의해
              보존할 필요가 있는 경우 해당 기간 동안 보관합니다.
            </div>
          </div>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="p-3 border-top mt-auto bg-white">
          <button
            className="btn btn-primary w-100 py-3 fw-bold shadow-sm"
            disabled={!isRequiredDone}
            onClick={() => onAgree(true)}
          >
            동의 완료
          </button>
        </div>
      </div>
    </>
  );
}
