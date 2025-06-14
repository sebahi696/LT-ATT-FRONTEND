export interface Attendance {
  _id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late';
  location?: {
    latitude: number;
    longitude: number;
  };
} 