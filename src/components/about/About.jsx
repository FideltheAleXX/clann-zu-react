import { aboutText } from '../../data/about.js';
import styles from './About.module.css';

const About = () => {
  return <section className={styles.about}>{aboutText}</section>;
};

export default About;
