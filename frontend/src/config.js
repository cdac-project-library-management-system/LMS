const config = {
  serverUrl: 'http://localhost:8080', // Ensure this is your correct backend URL
};

// Function to construct API URLs
export const createUrl = (endpoint) => `${config.serverUrl}/${endpoint}`;

// Function to get Authorization headers (for JWT)
export const getAuthHeaders = () => {
  const token = sessionStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default config;
