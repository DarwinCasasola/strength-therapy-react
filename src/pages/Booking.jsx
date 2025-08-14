// src/pages/Booking.jsx
import { Box, TextField, MenuItem, Button, Typography, Snackbar, Alert } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import services from "../data/services.json";
import { useBooking } from "../context/BookingContext.jsx";

export default function Booking() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { booking, updateBooking, resetBooking } = useBooking();
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state?.presetService) updateBooking({ service: state.presetService });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const validate = () => {
    const e = {};
    if (booking.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) e.email = "Enter a valid email.";
    if (!booking.service) e.service = "Select a service.";
    if (!booking.date) e.date = "Choose a date.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    // TODO: POST to your backend later
    setOpen(true);
    setTimeout(() => {
      resetBooking();
      navigate("/");
    }, 1200);
  };

  return (
    <Box className="container">
      <Typography variant="h4" gutterBottom>Book a Session</Typography>
      <form onSubmit={onSubmit} className="card">
        <TextField
          label="Full Name"
          value={booking.name}
          onChange={(e) => updateBooking({ name: e.target.value })}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          type="email"
          label="Email"
          value={booking.email}
          onChange={(e) => updateBooking({ email: e.target.value })}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          select
          label="Service"
          value={booking.service}
          onChange={(e) => updateBooking({ service: e.target.value })}
          error={!!errors.service}
          helperText={errors.service}
          fullWidth
          margin="normal"
          required
        >
          {services.map((s) => (
            <MenuItem key={s.title} value={s.title}>{s.title}</MenuItem>
          ))}
        </TextField>
        <TextField
          type="date"
          label="Preferred Date"
          value={booking.date}
          onChange={(e) => updateBooking({ date: e.target.value })}
          error={!!errors.date}
          helperText={errors.date}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          multiline
          rows={3}
          label="Notes"
          value={booking.notes}
          onChange={(e) => updateBooking({ notes: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained">Confirm Booking</Button>
      </form>

      <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
        <Alert severity="success" onClose={() => setOpen(false)}>Booking received!</Alert>
      </Snackbar>
    </Box>
  );
}
