import {jwtDecode} from "jwt-decode";

// Function to extract userId and role from JWT token
export function getUserInfo() {
  try {
    const token = sessionStorage.getItem("token"); // Retrieve token from storage
    if (!token) return null;

    const decoded = jwtDecode(token);
    return {
      userId: decoded.userId, // Adjust based on your JWT structure
      role: decoded.role, // Adjust based on your JWT structure
    };
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}