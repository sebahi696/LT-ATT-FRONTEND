import axios from 'axios';

const isDevelopment = process.env.NODE_ENV === 'development';
const isNgrok = window.location.hostname.includes('ngrok-free.app');

// Configure the base URL for API requests
const baseURL = isNgrok 
  ? `${window.location.protocol}//${window.location.hostname}`  // Use the same ngrok domain
  : isDevelopment 
    ? 'http://localhost:5001' 
    : 'https://lt-att-backend.onrender.com';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// API Configuration
const API_BASE_URL = baseURL;

export const getApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`; 