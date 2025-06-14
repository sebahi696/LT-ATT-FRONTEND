export interface Location {
  latitude: number;
  longitude: number;
}

export interface TimeRecord {
  time: string;
  location?: Location;
}

export interface Attendance {
  _id: string;
  employeeId: string;
  date: string;
  checkIn: TimeRecord;
  checkOut?: TimeRecord;
  status: 'present' | 'absent' | 'late';
  createdAt?: string;
  updatedAt?: string;
}

export interface AttendanceRecord {
  date: string;
  checkIn: TimeRecord;
  checkOut?: TimeRecord;
  status: string;
  location?: Location;
} 