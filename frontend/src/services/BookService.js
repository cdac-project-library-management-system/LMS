import axios from "axios";
import { createUrl, getAuthHeaders } from "../config"; // Import config to generate URLs and headers
import {jwtDecode} from "jwt-decode"; // Install with: npm install jwt-decode

const getAllBooks = async () => {
  try {
    const response = await axios.get(createUrl("books"), {
      headers: getAuthHeaders(),
    });
    return response.data.items; // Ensure correct response handling
  } catch (error) {
    throw new Error("Failed to fetch books");
  }
};

// Add book method
const addBook = async (bookData) => {
  try {
    console.log(getAuthHeaders())
    const response = await axios.post(createUrl("books"), bookData, {
      headers: {
        ...getAuthHeaders()
        // "Content-Type": "multipart/form-data", // Ensure to handle file upload
      },
    });

    return response.data; // Assuming response data contains the newly added book or success status
  } catch (error) {
    throw new Error("Failed to add the book");
  }
};

// Get book by ID method
const getBookById = async (bookId) => {
  try {
    const response = await axios.get(createUrl(`books/${bookId}`), {
      headers: getAuthHeaders(),
    });
    return response.data; // Assuming response contains book details
  } catch (error) {
    throw new Error("Failed to fetch book details");
  }
};

const updateBook = async (bookId, updatedData) => {
  try {
    const response = await axios.put(createUrl(`books/${bookId}`), updatedData, {
      headers: getAuthHeaders(),
    });
    return response.data; // Assuming the response contains updated book data
  } catch (error) {
    throw new Error("Failed to update the book");
  }
};

const deleteBook = async (bookId) => {
  try{
    const response = await axios.delete(createUrl(`books/${bookId}`),{
      headers: getAuthHeaders(),
    })
    return response.data;
  }catch(error){
    throw new Error("Failed to delete book")
  }
};

const borrowBook = async (bookId) => {
  try {
    const headers = getAuthHeaders();
    const token = headers.Authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) throw new Error("No token found");

    const decodedToken = jwtDecode(token); // Decode JWT
    const userId = decodedToken.userId; // Assuming JWT has userId field

    const response = await axios.post(
      createUrl("reservations"),
      { userId, bookId },
      { headers }
    );

    return response.data; // Assuming the response indicates success
  } catch (error) {
    throw new Error("Failed to send borrow request");
  }
};

export default {
  getAllBooks,
  addBook,
  getBookById,
  borrowBook,
  updateBook,
  deleteBook
};
