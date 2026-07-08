import styles from './Registrtation.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import SuccessModal from '../successModal/SuccessModal';

const Registration = () => {
  const navigate = useNavigate();

  const { register, loading, error } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await register(formData);

    if (result.success) {
      setFormData({ email: '', nickname: '', password: '' });
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/login');
  };

  return (
    <div id="register-form-block" className={styles.authForm}>
      <div className={styles.authTitle}>Registration</div>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          className={styles.emailInput}
          placeholder="email"
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="nickname">Nickname:</label>
        <input
          className={styles.nicknameInput}
          placeholder="Enter a nickname"
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          className={styles.passwordInput}
          placeholder="Enter a password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.submitBtn} type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <SuccessModal
        isOpen={showModal}
        onClose={handleModalClose}
        title="Registration Successful!"
        message="Your account has been created. Welcome!"
        buttonText="Go to Login"
      />
    </div>
  );
};

export default Registration;
