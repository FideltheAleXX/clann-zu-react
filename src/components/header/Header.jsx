import { Link, NavLink } from 'react-router';
import styles from './Header.module.css';

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
      <div className={styles.heroAuth}>
        {heroAuth.map((item, index) => (
          <div key={index}>
            <NavLink to={item.link}>
              <button className={styles.heroBtn}>{item.title}</button>
            </NavLink>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
