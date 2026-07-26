import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import mainFoto from '../assets/clann-zu.jpg';

const MainPage = () => {
  return (
    <div>
      <Header />
      <main>
        <img
          className={StyleSheet.roundedImg}
          src={mainFoto}
          alt="clann zu band"
        />
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
