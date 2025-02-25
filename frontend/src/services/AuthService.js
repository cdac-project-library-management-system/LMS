import axios from 'axios';
import { createUrl } from '../config';

const API_URL = createUrl('auth');

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });

      if (response.data.token) {
        const token = response.data.token;
        sessionStorage.setItem('token', token);
        return response.data; 
      }

      return null;
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data; 
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  getCurrentToken: () => {
    return sessionStorage.getItem('token');
  },

  logoutUser: async () => {
    try {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      return { success: true, message: "Logged out successfully" };
    } catch (error) {
      console.error("Logout failed:", error);
      return { success: false, message: "Logout failed" };
    }
  }
};

export default AuthService;
