export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'employee';
  department?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Employee {
  _id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Attendance {
  _id: string;
  employeeId: string;
  timestamp: string;
  isLate: boolean;
  location: [number, number];
  createdAt: string;
  updatedAt: string;
}

export interface QRCode {
  _id: string;
  code: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  todayAttendance: number;
  lateToday: number;
  presentToday: number;
  absentToday: number;
}

export interface RecentAttendance {
  employee: Employee;
  timestamp: string;
  isLate: boolean;
}

export interface SalaryReport {
  employee: Employee;
  totalDays: number;
  presentDays: number;
  lateDays: number;
  absentDays: number;
  salary: number;
  deductions: number;
  netSalary: number;
} 