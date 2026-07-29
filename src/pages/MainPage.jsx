import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Navigation from '../components/navigation/Navigation';
import mainFoto from '../assets/clann-zu.jpg';
import styles from './MainPage.module.css';

const MainPage = () => {
  return (
    <div>
      <Header />
      <Navigation />
      <main>
        <img
          className={styles.roundedImg}
          src={mainFoto}
          alt="clann zu band"
          loading="eager"
        />
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
