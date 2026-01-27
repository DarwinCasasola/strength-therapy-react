// src/pages/Contact.jsx
import { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Snackbar,
  Alert,
  Grid,
  Link,
  Paper,
} from "@mui/material";

import services from "../data/services.json";
import { GOOGLE_SHEETS_WEBAPP_URL } from "../config/googleSheets";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email.";
    if (!form.service) e.service = "Select a service.";
    if (!form.date) e.date = "Choose a date.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    // ✅ capture the form element immediately (fixes currentTarget becoming null)
    const formEl = ev.currentTarget;

    if (!validate()) return;

    try {
      setLoading(true);

      const fd = new FormData(formEl); // ✅ use saved form element
      fd.append("formType", "contact");
      fd.append("page", "contact");

      // Blank honeypots (Apps Script checks these)
      fd.append("website", "");
      fd.append("company", "");

      const res = await fetch(GOOGLE_SHEETS_WEBAPP_URL, {
        method: "POST",
        body: fd,
        redirect: "follow",
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setOpenSuccess(true);
        setForm({
          name: "",
          email: "",
          service: "",
          date: "",
          notes: "",
        });
        setErrors({});

        // ✅ safe reset
        if (formEl && typeof formEl.reset === "function") {
          formEl.reset();
        }
      } else {
        throw new Error(data.error || "Contact submission failed.");
      }
    } catch (err) {
      setErrorMsg(err?.message || "Something went wrong.");
      setOpenError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box id="contact" className="container" sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Get in Touch
      </Typography>

      <Grid container spacing={{ xs: 2, md: 4 }} alignItems="stretch">
        {/* Contact Info */}
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <Box sx={{ height: "100%" }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Contact Information
            </Typography>

            <Typography paragraph>
              <strong>Address:</strong> Located inside D1 Fitness, 1300 W.
              Sunset Rd Suite 1920, Henderson, NV 89014
            </Typography>
            <Typography paragraph>
              <strong>Email:</strong>{" "}
              <Link
                href="mailto:cory@strengththerapy.info"
                color="inherit"
                underline="hover"
              >
                cory@strengththerapy.info
              </Link>
            </Typography>
            <Typography paragraph>
              <strong>Phone:</strong>{" "}
              <Link href="tel:+17022907804" color="inherit" underline="hover">
                (702) 290-7804
              </Link>
            </Typography>
          </Box>
        </Grid>

        {/* Booking-style Contact Form */}
        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
          <Paper
            component="form"
            onSubmit={onSubmit}
            elevation={0}
            sx={{
              p: 3,
              height: "100%",
              border: "1px solid",
              borderColor: "primary.main",
              background: "rgba(255,255,255,0.05)",
              borderLeftWidth: 4,
              borderRadius: 2,
              position: "relative",
            }}
          >
            {/* 🔒 DOM-only honeypot (React never reads this) */}
            <input
              type="text"
              name="contact_hp_field_xyz"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
                opacity: 0,
              }}
            />

            <TextField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={onChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              margin="normal"
              required
              autoComplete="name"
            />

            <TextField
              type="email"
              label="Email"
              name="email"
              value={form.email}
              onChange={onChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              margin="normal"
              required
              autoComplete="email"
            />

            <TextField
              select
              label="Service"
              name="service"
              value={form.service}
              onChange={onChange}
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
              name="date"
              value={form.date}
              onChange={onChange}
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
              name="notes"
              value={form.notes}
              onChange={onChange}
              fullWidth
              margin="normal"
              placeholder="Any details you'd like Cory to know?"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? "Sending..." : "Send"}
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Success */}
      <Snackbar
        open={openSuccess}
        autoHideDuration={2500}
        onClose={() => setOpenSuccess(false)}
      >
        <Alert severity="success" onClose={() => setOpenSuccess(false)}>
          Message received!
        </Alert>
      </Snackbar>

      {/* Error */}
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
