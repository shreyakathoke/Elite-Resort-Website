import axios from "axios";

// ✅ Use ENV variable (best practice for Vercel / Railway)
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://resort-production.up.railway.app",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Auto logout if token expired / invalid
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_email");
      localStorage.removeItem("user_role");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;