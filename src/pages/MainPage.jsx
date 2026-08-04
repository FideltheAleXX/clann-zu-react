import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Navigation from '../components/navigation/Navigation';
import SEO from '../components/seo/SEO';
import mainFoto from '../assets/clann-zu.jpg';
import styles from './MainPage.module.css';

const MainPage = () => {
  return (
    <>
      <SEO
        title="Clann Zú fan-site"
        description="Clann Zú fan-site for your enjoy."
        name="Clann Zú"
        type="article"
      />
      <Header />
      <Navigation />
      <main className={styles.mainSection}>
        <img
          className={styles.roundedImg}
          src={mainFoto}
          alt="clann zu band"
          loading="eager"
        />
      </main>
      <Footer />
    </>
  );
};

export default MainPage;
