import api from "./api";

// -------- PUBLIC ROOMS ----------
export const getRooms = () => api.get("/api/rooms");

export const getRoomById = (id) =>
  api.get(`/api/rooms/${id}`);


// -------- AUTH ----------
export const userSignup = (data) =>
  api.post("/api/auth/user/signup", data);

export const userLogin = (data) =>
  api.post("/api/auth/user/login", data);

export const adminLogin = (data) =>
  api.post("/api/auth/admin/login", data);


// -------- CONTACT ----------
export const sendContact = (data) =>
  api.post("/api/contact", data);


// -------- BOOKING ----------
export const bookRoom = (roomId, data) =>
  api.post(`/bookings/rooms/${roomId}`, data);

export const cancelBooking = (id) =>
  api.put(`/bookings/${id}/cancel`);

