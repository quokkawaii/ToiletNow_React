import { Link } from "react-router-dom";
import { googleLogo, eyeHide, eyeShow } from "../../assets/Images";
import { useState } from "react";
import TermOffcanvas from "../../componunts/common/TermOffcanvas";
import { requestGet, requestPost } from "../../utils/api/authApiUtil";
import {
  gmailRegex,
  emailRegex,
  passwordRegex,
  nameRegex,
  regexTest,
} from "../../utils/format/validation";

export default function Signup() {
  // 1. 상태 관리 (비밀번호 토글, 약관 노출, 체크박스 동의)

  const [isEyeHide1, setIsEyeHide1] = useState(true);
  const [isEyeHide2, setIsEyeHide2] = useState(true);

  const [showTerms, setShowTerms] = useState(false); // 오프캔버스 show/hide
  const [isAgreed, setIsAgreed] = useState(false); // 메인 체크박스 상태

  // 중복 체크 확인
  const [emailCheck, setEmailCheck] = useState(false);

  // 이름, 이메일, 비밀번호, 비밀번호 확인 value => 추후에 커스텀 훅으로 만들기..
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  // 공통 토글 함수
  const toggleEye = (
    setter: (val: boolean | ((prev: boolean) => boolean)) => void,
  ) => {
    setter((prev) => !prev);
  };

  // 약관 동의 완료 시 호출될 함수
  const handleAgreeComplete = () => {
    setIsAgreed(true); // 체크박스 체크
    setShowTerms(false); // 오프캔버스 닫기
  };

  // 이메일 중복 체크 함수 ( 중복체크 클릭시 )
  const isEmailUnique = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation;

    console.log(email, emailCheck);

    // 만약 gmail.com이 들어갔다면 구글 로그인을 이용하게 안내하기
    if (gmailRegex.test(email)) {
      return alert("구글 이메일은 구글로 가입하기 버튼을 눌러주세요"); // 추후 모달로 변경 (확인모달)
    }

    // 이메일 형식이 아닐때 모달창 생성
    if (!emailRegex.test(email)) {
      return alert("이메일 형식이 어긋났습니다.");
    }

    // 위의 체크들을 통과했다면 중복 체크 시작
    const path = `/common/check-email?uemail=${encodeURIComponent(email)}`;
    const json = await requestGet(path);

    // 사용 가능 모달창 생성
    // data = { uemail : string, "available" : boolean } 자바 코드에서 주는 응답값
    if (json.data.available) {
      alert("사용 가능한 이메일 입니다.");
    } else {
      return alert("이미 가입된 이메일 입니다.");
    }

    // 최종적으로 통과시 true로 변경
    setEmailCheck(true);
  };

  // 이름, 이메일, 비밀번호 조건, 비밀번호와 비밀번호 확인칸 체크 함수 ( 회원 가입 클릭시 )
  const insertUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation;

    // 추후 커스텀훅을 생각해서 문자열 입력시
    // 해당 문자열, 정규식 입력시 해당 문자열 테스트하는 정규식 함수로 만들었음
    // 이름 체크
    if (regexTest(name, nameRegex)) return alert("이름 형식이 잘못되었습니다.");
    // 이메일 체크
    if (regexTest(email, emailRegex))
      return alert("이메일 형식이 잘못되었습니다.");
    // 비밀번호 체크
    if (regexTest(password, passwordRegex))
      return alert("비밀번호 형식이 잘못되었습니다.");
    // 비밀번호와 비밀번호 확인 비교
    if (password != checkPassword) return alert("비밀번호가 똑같지 않습니다.");
    // 통과시 api 호출
    const path = "/common/signup";
    const item = {
      uemail: email,
      uname: name,
      upassword: password,
    };
    const json = await requestPost(item, path);
    // 여기까지 통과시 페이지 이동 + 회원가입 성공 모달 생성
    return json;
  };
  return (
    <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center p-3">
      <div
        className="card border-0 shadow-sm rounded-4 w-100"
        style={{ maxWidth: "450px" }}
      >
        <div className="card-body p-4 p-md-5">
          <h2 className="text-center fw-bold mb-4">회원가입</h2>

          <button className="btn btn-outline-dark w-100 mb-4 d-flex align-items-center justify-content-center gap-2">
            <img src={googleLogo} alt="Google" style={{ width: "18px" }} />
            Google로 가입하기
          </button>

          <div className="divider-text mb-4 text-center text-muted small">
            Or
          </div>

          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="이메일"
                value={email}
                readOnly={emailCheck}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={isEmailUnique}
              >
                중복체크
              </button>
            </div>

            <div className="mb-3 position-relative">
              <input
                type={isEyeHide1 ? "password" : "text"}
                className="form-control pe-5"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <img
                src={isEyeHide1 ? eyeHide : eyeShow}
                className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer"
                style={{ width: "20px", zIndex: 5 }}
                onClick={() => toggleEye(setIsEyeHide1)}
                alt="eye-icon"
              />
            </div>

            <div className="mb-3 position-relative">
              <input
                type={isEyeHide2 ? "password" : "text"}
                className="form-control pe-5"
                placeholder="비밀번호 확인"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
                required
              />
              <img
                src={isEyeHide2 ? eyeHide : eyeShow}
                className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer"
                style={{ width: "20px", zIndex: 5 }}
                onClick={() => toggleEye(setIsEyeHide2)}
                alt="eye-icon"
              />
            </div>

            {/* --- 약관 영역 --- */}
            <div className="mb-4">
              <div className="form-check d-flex align-items-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="mainTerms"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                />
                <label
                  className="form-check-label small ms-2"
                  htmlFor="mainTerms"
                >
                  약관 및 개인정보 처리방침 동의
                </label>
                <span
                  className="ms-auto text-primary small fw-bold cursor-pointer"
                  onClick={() => setShowTerms(true)}
                >
                  보기
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-bold"
              disabled={!isAgreed}
              onClick={insertUser}
            >
              회원가입
            </button>
          </form>

          <div className="text-center mt-4 small">
            이미 계정이 있으신가요?{" "}
            <Link
              to="/login"
              className="text-primary fw-bold text-decoration-none ms-1"
            >
              로그인
            </Link>
          </div>
        </div>
      </div>

      {/* 햄버거 메뉴처럼 관리되는 약관 컴포넌트 */}
      <TermOffcanvas
        show={showTerms}
        onClose={() => setShowTerms(false)}
        onAgree={handleAgreeComplete}
      />
    </div>
  );
}
