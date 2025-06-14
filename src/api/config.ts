import axios from 'axios';
import { ERROR_MESSAGES } from '../config';

const isDevelopment = process.env.NODE_ENV === 'development';
const isNgrok = window.location.hostname.includes('ngrok-free.app');

// Configure the base URL for API requests
const baseURL = isNgrok 
  ? `${window.location.protocol}//${window.location.hostname}`  // Use the same ngrok domain
  : isDevelopment 
    ? 'http://localhost:5001' 
    : 'https://lt-att-backend.onrender.com';

// Create axios instance with default config
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 15000, // 15 second timeout
  withCredentials: true // Enable sending cookies
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = `${token}`;
      config.headers['Authorization'] = `Bearer ${token}`;
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
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Clear invalid token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Add a small delay before redirect to ensure local storage is cleared
      await new Promise(resolve => setTimeout(resolve, 100));
      window.location.href = '/login';
      return Promise.reject(new Error(ERROR_MESSAGES.AUTH_ERROR));
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network Error:', error);
      return Promise.reject(new Error(ERROR_MESSAGES.NETWORK_ERROR));
    }

    // Handle CORS errors
    if (error.message?.includes('Network Error') || error.message?.includes('CORS')) {
      console.error('CORS Error:', error);
      return Promise.reject(new Error('Unable to connect to the server. Please try again later.'));
    }

    // Handle other errors
    const errorMessage = error.response.data?.message || error.response.data?.msg || ERROR_MESSAGES.DEFAULT;
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;

// API Configuration
export const API_BASE_URL = baseURL;

export const getApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`; 