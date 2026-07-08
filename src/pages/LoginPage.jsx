import { Link } from 'react-router-dom';
import Login from '../components/login/Login';

const LoginPage = () => {
  return (
    <div className="auth-page">
      <h1>Login</h1>
      <LoginForm />
      <p>
        Don't have an account? <Link to="/registration">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;

// <section id="auth-container"></section>
