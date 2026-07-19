import React, { useState } from "react";
import {
  Card,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Stack,
  Divider,
} from "@mui/material";
import { Edit, Delete, Phone } from "@mui/icons-material";
import EditAppointmentDialog from "./EditAppointmentDialog";

const getDepartmentColor = (department) => {
  const colors = {
    Cardiology: "#C0392B",
    Dermatology: "#2E8B57",
    Pediatrics: "#2C6FB0",
    "General Medicine": "#B8860B",
  };
  return colors[department] || "#10645C";
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (timeString) => {
  return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const PunchHole = ({ top }) => (
  <Box
    sx={{
      position: "absolute",
      top,
      left: -8,
      width: 16,
      height: 16,
      borderRadius: "50%",
      bgcolor: "background.default",
      border: "1px solid",
      borderColor: "divider",
      zIndex: 1,
    }}
  />
);

const AppointmentCard = ({ appointment, onCancel, onUpdate }) => {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const deptColor = getDepartmentColor(appointment.department);

  const handleCancel = () => {
    onCancel(appointment.id);
    setCancelDialogOpen(false);
  };

  const handleUpdate = (updatedData) => {
    onUpdate(appointment.id, updatedData);
    setEditDialogOpen(false);
  };

  return (
    <>
      <Card
        elevation={0}
        sx={{
          height: "100%",
          display: "flex",
          borderRadius: 3,
          overflow: "visible",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: 6,
            bgcolor: deptColor,
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
          }}
        />

        <Box
          sx={{
            flex: 1,
            p: 2.5,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{ mb: 1.5 }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h6" noWrap sx={{ fontSize: "1.05rem" }}>
                {appointment.doctor.split(" – ")[0]}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: deptColor, fontWeight: 600 }}
              >
                {appointment.department}
              </Typography>
            </Box>
            <Chip
              label={appointment.status}
              size="small"
              sx={{
                bgcolor:
                  appointment.status === "Booked"
                    ? "primary.light"
                    : "grey.100",
                color:
                  appointment.status === "Booked"
                    ? "primary.dark"
                    : "text.secondary",
              }}
            />
          </Stack>

          <Stack spacing={0.75} sx={{ mb: 1.5 }}>
            <Typography variant="body2">
              <strong>{appointment.patientName}</strong>
            </Typography>
            <Stack
              direction="row"
              spacing={0.75}
              alignItems="center"
              color="text.secondary"
            >
              <Phone sx={{ fontSize: 15 }} />
              <Typography variant="body2" color="text.secondary">
                {appointment.phoneNumber}
              </Typography>
            </Stack>
            {appointment.email && (
              <Typography variant="body2" color="text.secondary" noWrap>
                {appointment.email}
              </Typography>
            )}
          </Stack>

          <Chip
            label={appointment.visitType}
            size="small"
            variant="outlined"
            color={appointment.visitType === "New" ? "secondary" : "default"}
            sx={{ alignSelf: "flex-start", mb: appointment.symptoms ? 1.5 : 0 }}
          />

          {appointment.symptoms && (
            <Box sx={{ mt: "auto", pt: 1 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                display="block"
              >
                Notes
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.25 }}>
                {appointment.symptoms}
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ position: "relative", display: "flex" }}>
          <PunchHole top={-8} />
          <Box
            sx={{ borderLeft: "2px dashed", borderColor: "divider", my: 2 }}
          />
          <PunchHole top="calc(100% - 8px)" />
        </Box>

        <Box
          sx={{
            width: 128,
            flexShrink: 0,
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            bgcolor: "primary.light",
          }}
        >
          <Box>
            <Typography variant="subtitle2" color="primary.dark">
              Date
            </Typography>
            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: "0.85rem",
                fontWeight: 600,
                mb: 1.5,
              }}
            >
              {formatDate(appointment.date)}
            </Typography>
            <Typography variant="subtitle2" color="primary.dark">
              Time
            </Typography>
            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              {formatTime(appointment.time)}
            </Typography>
          </Box>

          <Divider sx={{ my: 1.5, borderColor: "rgba(16,100,92,0.2)" }} />

          <Stack spacing={0.5}>
            <Button
              size="small"
              startIcon={<Edit sx={{ fontSize: 16 }} />}
              onClick={() => setEditDialogOpen(true)}
              sx={{ justifyContent: "flex-start", minWidth: 0, px: 0.5 }}
            >
              Edit
            </Button>
            <Button
              size="small"
              startIcon={<Delete sx={{ fontSize: 16 }} />}
              color="error"
              onClick={() => setCancelDialogOpen(true)}
              sx={{ justifyContent: "flex-start", minWidth: 0, px: 0.5 }}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Card>

      <Dialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
      >
        <DialogTitle>Cancel Appointment</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel this appointment with{" "}
            {appointment.doctor}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>Keep</Button>
          <Button onClick={handleCancel} color="error" variant="contained">
            Cancel Appointment
          </Button>
        </DialogActions>
      </Dialog>

      <EditAppointmentDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        appointment={appointment}
        onSave={handleUpdate}
      />
    </>
  );
};

export default AppointmentCard;
