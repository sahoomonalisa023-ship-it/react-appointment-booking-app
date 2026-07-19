import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import EventBusyRoundedIcon from "@mui/icons-material/EventBusyRounded";
import AppointmentCard from "./AppointmentCard";

const AppointmentList = ({ appointments, onCancel, onUpdate }) => {
  if (appointments.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 6,
          px: 3,
          border: "1px dashed",
          borderColor: "divider",
          borderRadius: 3,
          bgcolor: "background.paper",
        }}
      >
        <EventBusyRoundedIcon
          sx={{ fontSize: 32, color: "text.secondary", mb: 1 }}
        />
        <Typography variant="body1" color="text.secondary">
          No appointments booked yet. Schedule your first appointment above.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {appointments.map((appointment) => (
        <Grid item xs={12} sm={6} lg={4} key={appointment.id}>
          <AppointmentCard
            appointment={appointment}
            onCancel={onCancel}
            onUpdate={onUpdate}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default AppointmentList;
