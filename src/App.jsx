import React, { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
  Stack,
  Avatar,
} from "@mui/material";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import theme from "./theme";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentList from "./components/AppointmentList";

const initialAppointments = [
  {
    id: 1,
    patientName: "John Doe",
    phoneNumber: "1234567890",
    email: "john@example.com",
    doctor: "Dr. Rao – Cardiology",
    department: "Cardiology",
    date: "2024-02-15",
    time: "10:00",
    visitType: "New",
    symptoms: "Chest pain and shortness of breath",
    status: "Booked",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    phoneNumber: "9876543210",
    email: "jane.smith@email.com",
    doctor: "Dr. Meera – Dermatology",
    department: "Dermatology",
    date: "2024-02-16",
    time: "14:30",
    visitType: "Follow-up",
    symptoms: "Skin rash follow-up examination",
    status: "Booked",
  },
];

function App() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const addAppointment = (appointmentData) => {
    const newAppointment = {
      id: Date.now(),
      status: "Booked",
      ...appointmentData,
    };
    setAppointments((prev) => [newAppointment, ...prev]);
    setSnackbar({
      open: true,
      message: "Appointment booked successfully!",
      severity: "success",
    });
  };

  const cancelAppointment = (id) => {
    setAppointments((prev) => prev.filter((app) => app.id !== id));
    setSnackbar({
      open: true,
      message: "Appointment cancelled!",
      severity: "info",
    });
  };

  const updateAppointment = (id, updatedData) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...updatedData } : app)),
    );
    setSnackbar({
      open: true,
      message: "Appointment updated successfully!",
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Top identity bar */}
      <Box sx={{ bgcolor: "primary.dark", color: "#fff", py: 2 }}>
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
              <LocalHospitalRoundedIcon fontSize="small" />
            </Avatar>
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ color: "primary.light", lineHeight: 1 }}
              >
                Outpatient Scheduling Desk
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Sora", sans-serif',
                  fontWeight: 700,
                  fontSize: "1.15rem",
                }}
              >
                Aarogya Clinic
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Hero */}
      <Box sx={{ bgcolor: "primary.main", color: "#fff", pt: 5, pb: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" gutterBottom>
            Book and manage patient visits
          </Typography>
          <Typography sx={{ maxWidth: 560, opacity: 0.9 }}>
            One desk for scheduling across Cardiology, Dermatology, Pediatrics
            and General Medicine — from a new booking to same-day changes.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -5, pb: 6 }}>
        <AppointmentForm onSubmit={addAppointment} />

        <Box sx={{ mt: 6 }}>
          <Stack
            direction="row"
            alignItems="baseline"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Typography variant="h5">Upcoming appointments</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {appointments.length} scheduled
            </Typography>
          </Stack>
          <AppointmentList
            appointments={appointments}
            onCancel={cancelAppointment}
            onUpdate={updateAppointment}
          />
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default App;
