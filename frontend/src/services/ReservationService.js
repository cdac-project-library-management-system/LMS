import axios from "axios";
import { createUrl, getAuthHeaders } from "../config";

// Create a new reservation
const createReservation = async (reservationData) => {
  try {
    const response = await axios.post(createUrl("reservations"), reservationData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to create reservation");
  }
};

// Update an existing reservation
const updateReservation = async (reservationId, updatedData) => {
  try {
    const response = await axios.put(createUrl(`reservations/${reservationId}`), updatedData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update reservation");
  }
};

// Get a reservation by ID
const getReservationById = async (reservationId) => {
  try {
    const response = await axios.get(createUrl(`reservations/${reservationId}`), {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch reservation details");
  }
};

// Get paginated reservations for a specific user
const getReservationsByUser = async (userId, page = 0, size = 10) => {
  try {
    const response = await axios.get(createUrl(`reservations/user/${userId}`), {
      headers: getAuthHeaders(),
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user reservations");
  }
};

// Get paginated list of all reservations
const getAllReservations = async (page = 0, size = 10) => {
  try {
    const response = await axios.get(createUrl("reservations"), {
      headers: getAuthHeaders(),
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch all reservations");
  }
};

const ReservationService = {
  createReservation,
  updateReservation,
  getReservationById,
  getReservationsByUser,
  getAllReservations,
};

export default ReservationService;
