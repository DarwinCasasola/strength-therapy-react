// src/pages/Contact.jsx
import { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Link,
  Paper,
} from "@mui/material";

import { GOOGLE_SHEETS_WEBAPP_URL } from "../config/googleSheets";

export default function Contact() {
  const [form, setForm] = useState({ email: "", message: "", name: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [snack, setSnack] = useState({ open: false, type: "success", msg: "" });
  const [loading, setLoading] = useState(false);

  // Honeypot anti-spam field (rename to avoid Chrome autofill)
  const [hp, setHp] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (form.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    // If honeypot is filled, silently succeed (thwarts bots)
    if (hp && hp.trim().length > 0) {
      setSnack({ open: true, type: "success", msg: "Thanks! Your message has been sent." });
      setForm({ email: "", message: "", name: "", phone: "" });
      setErrors({});
      return;
    }

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("formType", "contact");
      fd.append("name", form.name || "");
      fd.append("email", form.email);
      fd.append("phone", form.phone || "");
      fd.append("message", form.message);
      fd.append("page", typeof window !== "undefined" ? window.location.pathname : "");

      // send a blank honeypot field (your Apps Script checks website/company; blank is safe)
      fd.append("website", "");

      const res = await fetch(GOOGLE_SHEETS_WEBAPP_URL, { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setSnack({ open: true, type: "success", msg: "Thanks! Your message has been sent." });
        setForm({ email: "", message: "", name: "", phone: "" });
        setErrors({});
      } else {
        throw new Error(data.error || "Something went wrong sending your message. Please try again.");
      }
    } catch (err) {
      setSnack({
        open: true,
        type: "error",
        msg: err?.message || "Network error. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box id="contact" className="container" sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Get in Touch
      </Typography>

      <Grid container spacing={4} alignItems="stretch">
        {/* Contact Info */}
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <Box sx={{ height: "100%" }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Contact Information
            </Typography>

            <Typography paragraph>
              <strong>Address:</strong> Located inside D1 Fitness, 1300 W. Sunset Rd Suite 1920,
              Henderson, NV 89014
            </Typography>
            <Typography paragraph>
              <strong>Email:</strong>{" "}
              <Link href="mailto:cory@strengththerapy.info" color="inherit" underline="hover">
                cory@strengththerapy.info
              </Link>
            </Typography>
            <Typography paragraph>
              <strong>Phone:</strong>{" "}
              <Link href="tel:+17022907804" color="inherit" underline="hover">
                (702) 290-7804
              </Link>
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                Follow Us
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Link
                  href="https://www.instagram.com/strengththerapypt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  underline="hover"
                >
                  Instagram
                </Link>
                <Link
                  href="https://www.linkedin.com/in/corygintherdpt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  underline="hover"
                >
                  LinkedIn
                </Link>
                <Link
                  href="https://www.mytpi.com/experts/508334"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  underline="hover"
                >
                  MyTPI
                </Link>
                <Link
                  href="https://www.tiktok.com/@corystrengthpt"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  underline="hover"
                >
                  TikTok
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Contact Form */}
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
            {/* Honeypot (renamed to avoid autofill) */}
            <input
              type="text"
              name="hp_field"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-10000px",
                top: "auto",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
            />

            <TextField
              id="contact-name"
              name="name"
              label="Name (optional)"
              value={form.name}
              onChange={onChange}
              fullWidth
              margin="normal"
              autoComplete="name"
            />
            <TextField
              id="contact-phone"
              name="phone"
              label="Phone (optional)"
              value={form.phone}
              onChange={onChange}
              fullWidth
              margin="normal"
              autoComplete="tel"
            />
            <TextField
              id="contact-email"
              name="email"
              label="Your Email"
              type="email"
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
              id="contact-message"
              name="message"
              label="Your Message"
              value={form.message}
              onChange={onChange}
              error={!!errors.message}
              helperText={errors.message}
              fullWidth
              margin="normal"
              multiline
              rows={5}
              required
            />

            <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ mt: 2 }}>
              {loading ? "Sending..." : "Send Message"}
            </Button>

            <Box role="status" aria-live="polite" sx={{ mt: 2, minHeight: 24 }}>
              {snack.open &&
                (snack.type === "success" ? (
                  <Typography>Thanks! I’ll get back to you soon.</Typography>
                ) : (
                  <Typography>Hmm—couldn’t send. Please try again.</Typography>
                ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.type}
          sx={{ width: "100%" }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
