import './App.css';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MainPage from './pages/MainPage';
import AlbumsPage from './pages/AlbumsPage';
import PostsPage from './pages/PostsPage';
import AboutPage from './pages/AboutPage';
import MediaPage from './pages/MediaPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OnePostPage from './pages/OnePostPage';
import CreatePostPage from './pages/CreatePostPage';
import { AuthProvider, useAuth } from './hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="page-transition"
      >
        <div className="page-layout">
          <div className="page-content">
            <Routes location={location}>
              <Route index element={<MainPage />} />
              <Route path="albums" element={<AlbumsPage />} />
              <Route path="posts" element={<PostsPage />} />
              <Route path="post/:id" element={<OnePostPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="media" element={<MediaPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="registration" element={<RegisterPage />} />
              <Route
                path="create-post"
                element={
                  <ProtectedRoute>
                    <CreatePostPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
