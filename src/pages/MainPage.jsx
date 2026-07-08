import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const MainPage = () => {
  return (
    <div>
      <Header />
      <main>
        <img
          className="rounded-img"
          src="./images/clann-zu.jpg"
          alt="clann zu band"
        />
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
