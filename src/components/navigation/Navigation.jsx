import styles from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const navigation = [
    { link: '/', title: 'Home' },
    { link: './albums', title: 'Albums' },
    { link: './posts', title: 'Blog' },
    { link: './about', title: 'About' },
    { link: './media', title: 'Media' },
  ];
  return (
    <nav>
      <ul className={styles.navbarNav}>
        {navigation.map((nav, index) => {
          return (
            <li key={index} className={styles.navItem}>
              <NavLink className={styles.navLink} to={nav.link} end>
                {nav.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
