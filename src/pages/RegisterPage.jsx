import { Link, useNavigate } from 'react-router-dom';
import Registration from '../components/registration/Registration';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegistrationSuccess = () => {
    alert('Registration successful! Redirecting to login...');
    navigate('/login');
  };

  return (
    <div className="auth-page">
      <h1>Registration</h1>
      <Registration onSuccess={handleRegistrationSuccess} />
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
