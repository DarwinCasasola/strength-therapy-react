// src/pages/Booking.jsx
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import services from "../data/services.json";
import { useBooking } from "../context/BookingContext.jsx";
import { GOOGLE_SHEETS_WEBAPP_URL } from "../config/googleSheets";

export default function Booking() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { booking, updateBooking, resetBooking } = useBooking();

  const [errors, setErrors] = useState({});
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (state?.presetService) updateBooking({ service: state.presetService });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const validate = () => {
    const e = {};
    if (booking.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email))
      e.email = "Enter a valid email.";
    if (!booking.service) e.service = "Select a service.";
    if (!booking.date) e.date = "Choose a date.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    try {
      const fd = new FormData();
      fd.append("formType", "booking"); // routes to Bookings tab
      fd.append("name", booking.name);
      fd.append("email", booking.email);
      fd.append("service", booking.service);
      fd.append("date", booking.date);
      fd.append("notes", booking.notes || "");
      fd.append("page", "booking");

      // honeypot (must stay empty)
      fd.append("website", "");

      const res = await fetch(GOOGLE_SHEETS_WEBAPP_URL, {
        method: "POST",
        body: fd,
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setOpenSuccess(true);
        setTimeout(() => {
          resetBooking();
          navigate("/");
        }, 1200);
      } else {
        throw new Error(data.error || "Booking submission failed.");
      }
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong.");
      setOpenError(true);
    }
  };

  return (
    <Box className="container">
      <Typography variant="h4" gutterBottom>
        Book a Session
      </Typography>

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
            <MenuItem key={s.title} value={s.title}>
              {s.title}
            </MenuItem>
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

        <Button type="submit" variant="contained">
          Confirm Booking
        </Button>
      </form>

      {/* Success Snackbar */}
      <Snackbar
        open={openSuccess}
        autoHideDuration={2000}
        onClose={() => setOpenSuccess(false)}
      >
        <Alert severity="success" onClose={() => setOpenSuccess(false)}>
          Booking received!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={openError}
        autoHideDuration={4000}
        onClose={() => setOpenError(false)}
      >
        <Alert severity="error" onClose={() => setOpenError(false)}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
