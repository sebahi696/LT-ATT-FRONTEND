import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { dashboardService } from '../../services/api';
import type { DashboardStats, RecentAttendance } from '../../types';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    activeEmployees: 0,
    todayAttendance: 0,
    lateToday: 0,
    presentToday: 0,
    absentToday: 0,
  });
  const [recentAttendance, setRecentAttendance] = useState<RecentAttendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch dashboard stats
        const statsResponse = await dashboardService.getStats();
        setStats({
          totalEmployees: statsResponse.totalEmployees,
          activeEmployees: statsResponse.activeEmployees,
          todayAttendance: statsResponse.todayAttendance,
          lateToday: statsResponse.lateToday,
          presentToday: statsResponse.presentToday,
          absentToday: statsResponse.absentToday,
        });

        // Fetch recent attendance
        const attendanceResponse = await dashboardService.getRecentAttendance();
        setRecentAttendance(attendanceResponse);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        setStats({
          totalEmployees: 0,
          activeEmployees: 0,
          todayAttendance: 0,
          lateToday: 0,
          presentToday: 0,
          absentToday: 0,
        });
        setRecentAttendance([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
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
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Total Employees */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <PeopleIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
              <Box>
                <Typography color="textSecondary" variant="subtitle2">
                  Total Employees
                </Typography>
                <Typography variant="h4">{stats.totalEmployees}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Present Today */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <CheckCircleIcon color="success" sx={{ fontSize: 40, mr: 2 }} />
              <Box>
                <Typography color="textSecondary" variant="subtitle2">
                  Present Today
                </Typography>
                <Typography variant="h4">{stats.presentToday}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Late Today */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <WarningIcon color="warning" sx={{ fontSize: 40, mr: 2 }} />
              <Box>
                <Typography color="textSecondary" variant="subtitle2">
                  Late Today
                </Typography>
                <Typography variant="h4">{stats.lateToday}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Absent Today */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <CancelIcon color="error" sx={{ fontSize: 40, mr: 2 }} />
              <Box>
                <Typography color="textSecondary" variant="subtitle2">
                  Absent Today
                </Typography>
                <Typography variant="h4">{stats.absentToday}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Attendance */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Recent Attendance
        </Typography>
        <Paper>
          <Box p={2}>
            {recentAttendance.length > 0 ? (
              recentAttendance.map((record, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  py={1}
                  borderBottom={index < recentAttendance.length - 1 ? 1 : 0}
                  borderColor="divider"
                >
                  <Box>
                    <Typography variant="subtitle1">{record.employee.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {new Date(record.timestamp).toLocaleString()}
                    </Typography>
                  </Box>
                  <Typography
                    variant="subtitle2"
                    color={record.isLate ? 'warning.main' : 'success.main'}
                  >
                    {record.isLate ? 'Late' : 'On Time'}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body1" color="textSecondary" align="center">
                No recent attendance records
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}; 