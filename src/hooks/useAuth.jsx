import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext(null);

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem('token'),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const syncAuthState = () => {
    const token = localStorage.getItem('token');
    const storedUser = getStoredUser();

    setIsAuthenticated(!!token);
    setUser(storedUser);
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'token' || event.key === 'user') {
        syncAuthState();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const register = async (userData) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/auth/reg`, userData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Registration error:', error);
      const message =
        error.response?.data?.message ||
        'Server error. Please, try again later.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      const { token, user: loggedInUser } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      setIsAuthenticated(true);

      return { success: true, data: response.data };
    } catch (error) {
      console.error('Login error:', error);
      const message =
        error.response?.data?.message ||
        'Server error. Please, try again later.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      loading,
      error,
      register,
      login,
      logout,
    }),
    [user, isAuthenticated, loading, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
