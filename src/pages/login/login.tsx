import { Link } from "react-router-dom";

export default function Login() {
  // 폼 제출 핸들러 (예시)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("로그인 로직 실행");
  };

  return (
    <div className="login-wrapper">
      {/* 로그인 카드 */}
      <div className="login-card">
        <h2 className="login-title" style={{ color: "#0088ff" }}>
          로그인
        </h2>

        <p className="sub-text" style={{ color: "#999" }}>
          후기게시판, 문의하기를 이용하시려면 로그인해주세요.
        </p>
      </div>

      {/* Google 계정 연동 버튼 */}
      <button type="button" className="btn-google googleLoginBtn">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
          alt="Google 아이콘"
        />
        Google 계정 연동하기
      </button>

      {/* 구분선 */}
      <div className="divider-text">Or</div>

      {/* 로그인 인풋 */}
      <form id="loginForm" className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            id="userEmail"
            placeholder="example@gmail.com"
            required
          />
        </div>

        <div className="input-group password-container">
          <input
            type="password"
            id="userPw"
            placeholder="비밀번호"
            required
          />
          <img
            src="/assets/images/eye_hide.png"
            alt="비밀번호 숨기기"
            id="togglePw"
          />
        </div>

        <div className="find-password">
          <Link to="/forgot-password">비밀번호를 잊으셨나요?</Link>
        </div>

        <button type="submit" className="btn-login-submit">
          로그인
        </button>
      </form>

      {/* 회원가입 */}
      <div className="auth-links">
        계정이 없으신가요?
        <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
}
