export default function ChangePassword() {
  return (
    <div className="mobile-container">

      <main className="content-area">
        <div className="title-section">
          <h2 className="page-title">비밀번호 변경</h2>
          <p className="page-desc">변경할 비밀번호를 입력해 주세요.</p>
        </div>

        <form id="resetPwForm" className="input-group">
          <div className="input-wrapper">
            <input type="password" id="currentPassword" placeholder="기존 비밀번호를 입력하세요." required />
            <img src="../../assets/images/eye_hide.png" className="eye-icon toggle-eye" id="toggleCurrentPw" />
          </div>

          <div className="input-wrapper">
            <input type="password" id="newPassword" placeholder="변경할 비밀번호를 입력하세요." required />
            <img src="../../assets/images/eye_hide.png" className="eye-icon toggle-eye" id="toggleNewPw" />
          </div>

          <div className="input-wrapper">
            <input type="password" id="confirmPassword" placeholder="변경할 비밀번호를 확인해주세요." required />
            <img src="../../assets/images/eye_hide.png" className="eye-icon toggle-eye" id="toggleConfirmPw" />
          </div>
        </form>

        <button type="button" id="submitBtn" className="btn-primary">확인</button>

      </main>
    </div>
  );
}