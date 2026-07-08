import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

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
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  return { register, login, logout, isAuthenticated, loading, error };
};
