import styles from './Footer.module.css';
import { CiMail } from 'react-icons/ci';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>(c) Olexandr Dzygansky</div>
      <div className={styles.emailWrapper}>
        <a href="mailto:th3alexx@gmail.com">
          <CiMail className={styles.email} size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
