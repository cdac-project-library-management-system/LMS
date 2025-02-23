import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { createUrl } from '../config';

const API_URL = createUrl('auth');

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });

      if (response.data.token) {
        const token = response.data.token;
        sessionStorage.setItem('token', token); // Store token

        // Decode the JWT token to get user role
        const decodedToken = jwtDecode(token);  
        return decodedToken.authorities;  // Expecting ["ROLE_USER"] or ["ROLE_ADMIN"]
      }

      return null;
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  getCurrentToken: () => {
    return sessionStorage.getItem('token');
  },

  logoutUser: async () => {
    try {
      // Optional: Notify the backend if you later add a logout API
      // await axios.post("/api/auth/logout"); 
  
      // Remove token from localStorage or cookies
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
