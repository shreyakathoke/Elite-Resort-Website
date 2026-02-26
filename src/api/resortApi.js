import api from "./api";
import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://resort-production.up.railway.app";

// -------- PUBLIC ROOMS ----------
export const getRooms = () => api.get("/api/rooms");

export const getRoomById = (id) =>
  api.get(`/api/rooms/${id}`);


// -------- AUTH ----------
export const userSignup = (data) =>
  api.post("/api/auth/register", data);

export const userLogin = (data) =>
  api.post("/api/auth/user/login", data);

export const adminLogin = (data) =>
  api.post("/api/auth/admin/login", data);


// -------- CONTACT ----------
export const sendContact = (data) =>
  api.post("/api/contact", data);

//------Booking------//

// ✅ Create Booking
export const createBooking = (roomId, body) => {
  return api.post(`/bookings/rooms/${roomId}`, body, {
    headers: { "Content-Type": "application/json" },
  });
}

// ✅ Cancel Booking
export function cancelBooking(bookingId) {
  const token = localStorage.getItem("token");

  return axios.delete(`${API_BASE}/api/booking/cancel/${bookingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


// -------- USER PROFILE ---------- //

export const saveUserProfile = (data) => api.post("/api/profile", data);

export const getUserProfile = () => api.get("/api/profile");


// -------- PAYMENTS ----------
export const makePayment = (data) =>
  api.post("/api/payments/pay", data);

export const cancelPayment = (paymentId) =>
  api.put(`/api/payments/${paymentId}/cancel`);

