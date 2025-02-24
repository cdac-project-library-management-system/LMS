import axios from "axios";
import { createUrl, getAuthHeaders } from "../config";

const createBorrowRecord = async (borrowData) => {
  try {
    const response = await axios.post(createUrl("borrowRecords"), borrowData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to create borrow record");
  }
};

const updateBorrowRecord = async (recordId, updatedData) => {
  try {
    const response = await axios.put(createUrl(`borrowRecords/${recordId}`), updatedData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update borrow record");
  }
};

const getBorrowRecordById = async (recordId) => {
  try {
    const response = await axios.get(createUrl(`borrowRecords/${recordId}`), {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch borrow record");
  }
};

const getBorrowRecordsByUser = async (userId, page = 0, size = 10) => {
  try {
    const response = await axios.get(createUrl(`borrowRecords/user/${userId}?page=${page}&size=${size}`), {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch borrow records by user");
  }
};

const getAllBorrowRecords = async (page = 0, size = 10) => {
  try {
    const response = await axios.get(createUrl(`borrowRecords?page=${page}&size=${size}`), {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch all borrow records");
  }
};

const BorrowService = {
  createBorrowRecord,
  updateBorrowRecord,
  getBorrowRecordById,
  getBorrowRecordsByUser,
  getAllBorrowRecords,
};

export default BorrowService;
