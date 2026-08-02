import styles from './Navbar.module.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const heroAuth = [
    { link: '/login', title: 'Sign In' },
    { link: '/registration', title: 'Sign Up' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.heroAuthWrapper}>
          {isAuthenticated ? (
            <div className={styles.heroAuth}>
              <div>
                <Link to="/create-post">
                  <button className={styles.heroBtn}>Write post</button>
                </Link>
              </div>
              <div>
                <button className={styles.heroBtn} onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.heroAuth}>
              {heroAuth.map((item, index) => (
                <div key={index}>
                  <NavLink to={item.link}>
                    <button className={styles.heroBtn}>{item.title}</button>
                  </NavLink>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
