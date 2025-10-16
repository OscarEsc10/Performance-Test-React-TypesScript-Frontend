import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
});

// Helper to read token from cookie on client
function getTokenFromCookie() {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|; )token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

// Attach Authorization header if token exists (cookie or localStorage)
api.interceptors.request.use((config) => {
  const ls = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const cookieToken = typeof window !== 'undefined' ? getTokenFromCookie() : null;
  const token = ls || cookieToken;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize backend errors and surface meaningful messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || error.message || 'Unexpected error';
    if (status === 404) throw new Error('Resource not found');
    if (status === 403) throw new Error('Forbidden: insufficient permissions');
    if (status === 401) throw new Error('Unauthorized: please login');
    throw new Error(message);
  }
);

export default api;
