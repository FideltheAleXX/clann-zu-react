import CreatePost from '../components/createPost/CreatePost';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Navigation from '../components/navigation/Navigation';

const CreatePostPage = () => {
  return (
    <>
      <Header />
      <Navigation />
      <CreatePost />
      <Footer />
    </>
  );
};

export default CreatePostPage;
