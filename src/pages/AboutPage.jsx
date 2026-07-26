import { aboutText } from '../data/about.js';
import styles from './AboutPage.module.css';
const AboutPage = () => {
  return <section className={styles.about}>{aboutText}</section>;
};

export default AboutPage;
