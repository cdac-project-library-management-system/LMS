import axios from "axios";
import { createUrl, getAuthHeaders } from "../config";

// Create a new fine
const createFine = async (fineData) => {
  try {
    const response = await axios.post(createUrl("fines"), fineData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to create fine");
  }
};

// Update an existing fine
const updateFine = async (fineId, fineData) => {
  try {
    const response = await axios.put(createUrl(`fines/${fineId}`), fineData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update fine");
  }
};

// Get fine by its ID
const getFineById = async (fineId) => {
  try {
    const response = await axios.get(createUrl(`fines/${fineId}`), {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch fine by ID");
  }
};

// Get fine by associated borrow record ID
const getFineByBorrowRecord = async (borrowRecordId) => {
  try {
    const response = await axios.get(createUrl(`fines/borrowRecord/${borrowRecordId}`), {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch fine by borrow record ID");
  }
};

// Get all fines (paginated)
const getAllFines = async (page = 0, size = 10) => {
  try {
    const response = await axios.get(createUrl(`fines?page=${page}&size=${size}`), {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch all fines");
  }
};

// Get fines for the current user (paginated)
const getUserFines = async (page = 0, size = 10) => {
  try {
    const response = await axios.get(createUrl(`fines/me?page=${page}&size=${size}`), {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user fines");
  }
};

const FineService = {
  createFine,
  updateFine,
  getFineById,
  getFineByBorrowRecord,
  getAllFines,
  getUserFines,
};

export default FineService;
