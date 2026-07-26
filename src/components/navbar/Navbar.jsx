import styles from './Navbar.module.css';
import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Проверка авторизации при загрузке и при изменении localStorage
  useEffect(() => {
    checkAuth();

    // Слушаем изменения в localStorage (для других вкладок)
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'user') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setIsAuthenticated(true);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setIsAuthenticated(false);
        setUser(null);
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  const heroAuth = [
    { link: '/login', title: 'Sign In' },
    { link: '/register', title: 'Sign Up' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navLogo}>
          <Link to="/">MyBlog</Link>
        </div>

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
