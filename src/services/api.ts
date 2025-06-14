import api from '../api/config';
import { API_URL, API_ENDPOINTS, ERROR_MESSAGES } from '../config';
import type {
  AuthResponse,
  User,
  Employee,
  Department,
  Attendance,
  QRCode,
  DashboardStats,
  RecentAttendance,
  SalaryReport
} from '../types';

// Authentication Service
export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post(API_ENDPOINTS.LOGIN, { email, password });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || ERROR_MESSAGES.DEFAULT);
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.post(API_ENDPOINTS.LOGOUT);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || ERROR_MESSAGES.DEFAULT);
    }
  },
};

// User Service
export const userService = {
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get(API_ENDPOINTS.CURRENT_USER);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || ERROR_MESSAGES.DEFAULT);
    }
  },
};

// Employee Service
export const employeeService = {
  getAll: async (): Promise<Employee[]> => {
    try {
      const response = await api.get(API_ENDPOINTS.EMPLOYEES);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || ERROR_MESSAGES.DEFAULT);
    }
  },

  getById: async (id: string): Promise<Employee> => {
    try {
      const response = await api.get(`${API_ENDPOINTS.EMPLOYEES}/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || ERROR_MESSAGES.DEFAULT);
    }
  },
};

// Department Service
export const departmentService = {
  getAll: async (): Promise<Department[]> => {
    try {
      const response = await api.get(API_ENDPOINTS.DEPARTMENTS);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || ERROR_MESSAGES.DEFAULT);
    }
  },
};

// Attendance Service
export const attendanceService = {
  getHistory: async (): Promise<Attendance[]> => {
    try {
      const response = await api.get(API_ENDPOINTS.ATTENDANCE_HISTORY);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || ERROR_MESSAGES.DEFAULT);
    }
  },

  markAttendance: async (qrCode: string, location: [number, number]): Promise<void> => {
    try {
      await api.post(API_ENDPOINTS.MARK_ATTENDANCE, { qrCode, location });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || ERROR_MESSAGES.DEFAULT);
    }
  },
};

// QR Code Service
export const qrCodeService = {
  generate: async (): Promise<QRCode> => {
    try {
      const response = await api.post(API_ENDPOINTS.GENERATE_QR);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || ERROR_MESSAGES.DEFAULT);
    }
  },
};

// Dashboard Service
export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    try {
      const response = await api.get(API_ENDPOINTS.ATTENDANCE_REPORT);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || ERROR_MESSAGES.DEFAULT);
    }
  },

  getRecentAttendance: async (): Promise<RecentAttendance[]> => {
    try {
      const response = await api.get(API_ENDPOINTS.ATTENDANCE);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || ERROR_MESSAGES.DEFAULT);
    }
  },
};

// Reports Service
export const reportsService = {
  getSalaryReport: async (month: string): Promise<SalaryReport[]> => {
    try {
      const response = await api.get(API_ENDPOINTS.SALARY_REPORT, {
        params: { month }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || ERROR_MESSAGES.DEFAULT);
    }
  },
}; 