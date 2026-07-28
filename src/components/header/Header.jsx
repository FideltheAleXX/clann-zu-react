import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Navbar from '../navbar/Navbar';

const Header = () => {
  const heroAuth = [
    { link: '/login', title: 'Sign In' },
    { link: '/register', title: 'Sign Up' },
  ];

  return (
    <header className={styles.hero}>
      <div className={styles.heroLogo}>
        <Link to="/">
          <img src="./clann-zu-logo.png" alt="clann zu" />
        </Link>
      </div>
      <div className={styles.heroTitle}>Clann Zú fan-site</div>
      <Navbar className={styles.heroAuth} />
    </header>
  );
};

export default Header;
