export default function Signup() {
  return (
    <div className="signup-wrapper">

      {/* 회원가입 카드 */}
      <div className="signup-card">

        {/* 회원가입 콘텐츠 */}
        <main className="signup-content">
          {/* 제목 */}
          <h2 className="page-title">회원가입</h2>
          <p className="guide-text">정보를 입력해서 회원가입을 진행해 주세요.</p>

          {/* 구글 가입 */}
          <button type="button" className="google-btn googleLoginBtn">
            <img src="../../assets/images/google_logo.png" alt="Google 아이콘" />
            Google로 가입하기
          </button>

          {/* 구분선 */}
          <div className="divider-text">Or</div>

          {/* 회원가입 폼 */}
          <form id="signupForm">
            <div className="input-group">
              <input type="text" id="uName" placeholder="이름" required />
            </div>

            <div className="input-group">
              <input type="email" id="uEmail" placeholder="이메일 (abc@naver.com)" required />
              <button type="button" id="checkEmailBtn" className="inner-btn">중복체크</button>
            </div>

            <div className="input-group">
              <input type="password" id="uPassword" placeholder="비밀번호 (문자+숫자+특수문자 조합)" required />
              <img src="../../assets/images/eye_hide.png" className="toggle-eye" data-target="uPassword" alt="보기/숨기기" />
            </div>

            <div className="input-group">
              <input type="password" id="uPasswordConfirm" placeholder="비밀번호 확인" required />
              <img src="../../assets/images/eye_hide.png" className="toggle-eye" data-target="uPasswordConfirm" alt="보기/숨기기" />
            </div>
            <p id="pwMatchMsg" className="status-msg"></p>

            <div className="terms-area">
              <label className="checkbox-container">
                <input type="checkbox" id="termsCheckbox" />
                {/* htmlFor="termsCheckbox" */}
                <span >서비스 이용약관 및 개인정보 처리방침에 동의합니다.</span>
                <a href="../terms/terms.html">약관 보기</a>
              </label>
            </div>

            <button type="submit" className="btn-submit">회원가입</button>
          </form>

          {/* 로그인 바로가기 */}
          <div className="login-prompt">
            계정이 이미 있으신가요?
            <a href="../login/login.html">
              로그인
            </a>
          </div>
        </main>

      </div> {/* 회원가입 카드 끝 */}

    </div>
  )
}