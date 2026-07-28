import Albums from '../components/albums/Albums';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Navigation from '../components/navigation/Navigation';

const AlbumsPage = () => {
  return (
    <>
      <Header />
      <Navigation />
      <Albums />
      <Footer />
    </>
  );
};

export default AlbumsPage;
