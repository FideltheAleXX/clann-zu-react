import styles from './Login.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import SuccessModal from '../successModal/SuccessModal';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    loginIdentifier: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(formData);

    if (result.success) {
      setFormData({ loginIdentifier: '', password: '' });
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <div id="login-form-block" className={`${styles.authForm} ${styles.active}`}>
      <div className={styles.authTitle}>Log in to your account</div>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <label htmlFor="loginIdentifier">Email or Nickname:</label>
        <input
          id="loginIdentifier"
          name="loginIdentifier"
          className={styles.emailInput}
          placeholder="Enter email or nickname"
          type="text"
          value={formData.loginIdentifier}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          className={styles.passwordInput}
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {error && <div className={styles.errorMessage}>{error}</div>}

        <button className={styles.submitBtn} type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <SuccessModal
        isOpen={showModal}
        onClose={handleModalClose}
        title="Successfully!"
        message="Welcome to Clann Zu fan-site!"
        buttonText="Go to Home Page"
      />
    </div>
  );
};

export default Login;
