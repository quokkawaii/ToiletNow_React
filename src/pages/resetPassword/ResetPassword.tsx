export default function ResetPassword() {
  return (
    <div className="reset-container">
      <div className="auth-box">

        <div className="content-area">
          <div className="title-section">
            <h2 className="page-title">비밀번호 변경</h2>
            <p className="page-desc">
              변경할 비밀번호를 입력해 주세요.
            </p>
          </div>

          <form id="resetPwForm" className="input-group">
            <div className="input-wrapper password-container">
              <input type="password" id="currentPassword" placeholder="기존 비밀번호를 입력하세요." required />
              <img src="../../assets/images/eye_hide.png" className="eye-icon" id="toggleCurrentPw" />
            </div>

            <div className="input-wrapper password-container">
              <input type="password" id="newPassword" placeholder="변경할 비밀번호를 입력하세요." required />
              <img src="../../assets/images/eye_hide.png" className="eye-icon" id="toggleNewPw" />
            </div>

            <div className="input-wrapper password-container">
              <input type="password" id="confirmPassword" placeholder="변경할 비밀번호를 확인해주세요." required />
              <img src="../../assets/images/eye_hide.png" className="eye-icon" id="toggleConfirmPw" />
            </div>

            <button type="submit" id="submitBtn" className="btn-primary" disabled>확인</button>
          </form>
        </div>
      </div>
    </div>
  );
}