const AuthPage = () => {
  return (
    <section id="auth-container">
      <div id="login-form-block" class="auth-form active">
        <div class="auth-title">Log in to your account</div>
        <form class="loggin-form">
          <input
            class="email-input"
            placeholder="email or nickname"
            type="text"
          />
          <input
            class="password-input"
            placeholder="password"
            type="password"
          />
          <button class="submit-btn" type="submit">
            Log in
          </button>
        </form>
      </div>
      <div id="register-form-block" class="auth-form">
        <div class="auth-title">Registration</div>
        <form class="register-form">
          <input class="email-input" placeholder="email" type="email" />
          <input class="nickname-input" placeholder="nickname" type="text" />
          <input
            class="password-input"
            placeholder="password"
            type="password"
          />
          <button class="submit-btn" type="submit">
            Sign Up
          </button>
        </form>
      </div>

      <dialog id="login-success-modal" class="modal">
        <div class="modal-content">
          <div class="success-icon">
            <span class="material-symbols-outlined"> check </span>
          </div>
          <h2>Succsesfully!</h2>
          <p>Welcome to fan-site Clann Zú</p>
          <button id="close-modal-btn" class="modal-btn">
            OK
          </button>
        </div>
      </dialog>
    </section>
  );
};

export default AuthPage;
