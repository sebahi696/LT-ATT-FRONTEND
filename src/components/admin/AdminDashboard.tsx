import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import QRGenerator from './QRGenerator';
import AttendanceReports from './AttendanceReports';
import SalaryReports from './SalaryReports';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AdminDashboard: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="admin dashboard tabs">
          <Tab label="QR Generator" {...a11yProps(0)} />
          <Tab label="Attendance Reports" {...a11yProps(1)} />
          <Tab label="Salary Reports" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <QRGenerator />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AttendanceReports />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SalaryReports />
      </TabPanel>
    </Box>
  );
};

export default AdminDashboard; 