import React, { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Box, Typography, Button } from '@mui/material';

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
}

interface CameraDevice {
  id: string;
  label: string;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onScanError }) => {
  const [scanner, setScanner] = useState<Html5Qrcode | null>(null);
  const [devices, setDevices] = useState<CameraDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>('');

  useEffect(() => {
    const html5Qrcode = new Html5Qrcode("reader");
    setScanner(html5Qrcode);

    return () => {
      if (scanner) {
        scanner.stop().catch(console.error);
      }
    };
  }, []);

  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await Html5Qrcode.getCameras();
        setDevices(devices.map((device: CameraDevice) => ({
          id: device.id,
          label: device.label
        })));
        if (devices.length > 0) {
          setSelectedDevice(devices[0].id);
        }
      } catch (error) {
        console.error('Error getting cameras:', error);
        if (onScanError) {
          onScanError('Failed to access camera devices');
        }
      }
    };

    getDevices();
  }, []);

  const handleDeviceChange = async (deviceId: string) => {
    setSelectedDevice(deviceId);
    if (scanner) {
      try {
        if (scanner.isScanning) {
          await scanner.stop();
        }
        
        const config = {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        };

        await scanner.start(
          deviceId,
          config,
          (decodedText) => onScanSuccess(decodedText),
          (error) => {
            if (onScanError) {
              onScanError(error);
            }
          }
        );
      } catch (error) {
        console.error('Error starting scanner:', error);
        if (onScanError) {
          onScanError('Failed to start QR scanner');
        }
      }
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 500, margin: '0 auto' }}>
      <Typography variant="h6" gutterBottom>
        QR Code Scanner
      </Typography>
      {devices.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Select Camera:
          </Typography>
          {devices.map((device) => (
            <Button
              key={device.id}
              variant={selectedDevice === device.id ? "contained" : "outlined"}
              onClick={() => handleDeviceChange(device.id)}
              sx={{ mr: 1, mb: 1 }}
            >
              {device.label}
            </Button>
          ))}
        </Box>
      )}
      <div id="reader" style={{ width: '100%', minHeight: '300px' }}></div>
    </Box>
  );
}; 