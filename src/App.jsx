import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AlbumsPage from './pages/AlbumsPage';
import PostsPage from './pages/PostsPage';
import AboutPage from './pages/AboutPage';
import MediaPage from './pages/MediaPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OnePostPage from './pages/OnePostPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="albums" element={<AlbumsPage />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="post/:id" element={<OnePostPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="media" element={<MediaPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registration" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
