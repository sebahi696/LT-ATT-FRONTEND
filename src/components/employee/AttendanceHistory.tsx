import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
} from '@mui/material';
import { attendanceService } from '../../services/api';
import type { Attendance } from '../../types';

interface AttendanceRecord {
  date: string;
  time: string;
  status: 'present' | 'late' | 'absent';
  location: string;
}

export const AttendanceHistory: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [stats, setStats] = useState({
    presentDays: 0,
    lateDays: 0,
    totalDays: 0,
  });

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        setError(null);

        const attendanceData = await attendanceService.getHistory();

        // Process the attendance data
        const processedRecords: AttendanceRecord[] = attendanceData.map((record: Attendance) => ({
          date: new Date(record.timestamp).toLocaleDateString(),
          time: new Date(record.timestamp).toLocaleTimeString(),
          status: record.isLate ? 'late' : 'present',
          location: `${record.location[0].toFixed(6)}, ${record.location[1].toFixed(6)}`,
        }));

        // Calculate statistics
        const presentDays = processedRecords.filter((r: AttendanceRecord) => r.status === 'present').length;
        const lateDays = processedRecords.filter((r: AttendanceRecord) => r.status === 'late').length;

        setAttendanceRecords(processedRecords);
        setStats({
          presentDays,
          lateDays,
          totalDays: processedRecords.length,
        });
      } catch (err) {
        setError('Failed to fetch attendance history');
        console.error('Error fetching attendance:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box m={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Attendance History
      </Typography>

      <Box mb={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Summary
          </Typography>
          <Box display="flex" gap={4}>
            <Box>
              <Typography color="textSecondary">Present Days</Typography>
              <Typography variant="h5">{stats.presentDays}</Typography>
            </Box>
            <Box>
              <Typography color="textSecondary">Late Days</Typography>
              <Typography variant="h5">{stats.lateDays}</Typography>
            </Box>
            <Box>
              <Typography color="textSecondary">Total Days</Typography>
              <Typography variant="h5">{stats.totalDays}</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceRecords.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.time}</TableCell>
                <TableCell>
                  <Typography
                    color={record.status === 'present' ? 'success.main' : 'warning.main'}
                  >
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </Typography>
                </TableCell>
                <TableCell>{record.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}; 