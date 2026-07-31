import { useNavigate } from 'react-router-dom';
import Registration from '../components/registration/Registration';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Navigation from '../components/navigation/Navigation';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegistrationSuccess = () => {
    alert('Registration successful! Redirecting to login...');
    navigate('/login');
  };

  return (
    <>
      <Header />
      <Navigation />
      <Registration onSuccess={handleRegistrationSuccess} />
      <Footer />
    </>
  );
};

export default RegisterPage;
