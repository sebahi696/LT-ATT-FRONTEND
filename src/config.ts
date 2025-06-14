export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  CURRENT_USER: '/auth/me',
  
  // Employee endpoints
  EMPLOYEES: '/employees',
  EMPLOYEE_PROFILE: '/employees/profile',
  
  // Department endpoints
  DEPARTMENTS: '/departments',
  
  // Attendance endpoints
  ATTENDANCE: '/attendance',
  ATTENDANCE_HISTORY: '/attendance/history',
  MARK_ATTENDANCE: '/attendance/mark',
  
  // QR Code endpoints
  GENERATE_QR: '/qr/generate',
  VALIDATE_QR: '/qr/validate',
  
  // Reports
  ATTENDANCE_REPORT: '/reports/attendance',
  SALARY_REPORT: '/reports/salary'
};

export const ERROR_MESSAGES = {
  DEFAULT: 'An error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Unauthorized access. Please login again.',
  INVALID_QR: 'Invalid QR code.',
  LOCATION_REQUIRED: 'Location access is required for attendance.',
  LOCATION_ERROR: 'Could not get your location. Please enable location services.',
  CAMERA_PERMISSION: 'Camera permission is required for scanning.',
  CAMERA_ERROR: 'Could not access camera. Please check permissions.',
} as const;

export const SUCCESS_MESSAGES = {
  SAVE: 'Attendance marked successfully!',
  LOGIN: 'Logged in successfully!',
  LOGOUT: 'Logged out successfully!',
  UPDATE: 'Updated successfully!',
  DELETE: 'Deleted successfully!',
} as const; 