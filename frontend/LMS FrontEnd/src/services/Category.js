import axios from 'axios';
import { createUrl } from '../config';

const API_URL = createUrl('categories'); // Adjust API endpoint as needed

const CategoryService = {
  // Fetch all categories
  getAllCategories: async () => {
    try {
      const token = sessionStorage.getItem('token'); // Get token
      const response = await axios.get(`${API_URL}`,{
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  // Add a new category
  addCategory: async (categoryData) => {
    try {
      const token = sessionStorage.getItem('token'); // Get token
      const response = await axios.post(`${API_URL}`, categoryData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding category:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  // Get a single category by ID
  getCategoryById: async (categoryId) => {
    try {
      const response = await axios.get(`${API_URL}/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  // Update an existing category
  updateCategory: async (categoryId, categoryData) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.put(`${API_URL}/update/${categoryId}`, categoryData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating category:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  // Delete a category
  deleteCategory: async (categoryId) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`${API_URL}/delete/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { success: true, message: "Category deleted successfully" };
    } catch (error) {
      console.error('Error deleting category:', error.response?.data?.message || error.message);
      throw error;
    }
  }
};

export default CategoryService;
