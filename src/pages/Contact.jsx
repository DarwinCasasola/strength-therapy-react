// src/pages/Contact.jsx
import { useState, useEffect } from "react";
import {
  Box, Grid, TextField, Button, Typography,
  Snackbar, Alert, Link, Paper
} from "@mui/material";
import { useForm, ValidationError } from "@formspree/react";

export default function Contact() {
  const [form, setForm] = useState({ email: "", message: "", name: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [snack, setSnack] = useState({ open: false, type: "success", msg: "" });

  // Hook: pass just the ID (not the full URL)
  const [state, handleSubmit] = useForm("mwplbzne");

  // Show a snackbar on result
  useEffect(() => {
    if (state.succeeded) {
      setSnack({ open: true, type: "success", msg: "Thanks! Your message has been sent." });
      setForm({ email: "", message: "", name: "", phone: "" });
      setErrors({});
    } else if (state.errors && state.errors.length > 0) {
      // Combine error messages from Formspree
      const msg = state.errors.map(e => e.message).join(" ");
      setSnack({ open: true, type: "error", msg: msg || "Couldn’t send. Please try again." });
    }
  }, [state.succeeded, state.errors]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (form.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    // Hand control to Formspree’s handler with the current form element
    handleSubmit(ev);
  };

  return (
    <Box id="contact" className="container" sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Get in Touch
      </Typography>

      <Grid container spacing={4} alignItems="stretch">
        {/* Contact Info */}
        <Grid xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <Box sx={{ height: "100%" }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Contact Information
            </Typography>
            <Typography paragraph>
              <strong>Address:</strong> Located inside D1 Fitness, 1300 W. Sunset Rd Suite 1920, Henderson, NV 89014
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
              <Typography variant="subtitle1" color="primary" gutterBottom>Follow Us</Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Link href="https://www.instagram.com/strengththerapypt/" target="_blank" rel="noopener noreferrer" color="inherit" underline="hover">Instagram</Link>
                <Link href="https://www.linkedin.com/in/corygintherdpt/" target="_blank" rel="noopener noreferrer" color="inherit" underline="hover">LinkedIn</Link>
                <Link href="https://www.mytpi.com/experts/508334" target="_blank" rel="noopener noreferrer" color="inherit" underline="hover">MyTPI</Link>
                <Link href="https://www.tiktok.com/@corystrengthpt" target="_blank" rel="noopener noreferrer" color="inherit" underline="hover">TikTok</Link>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Contact Form */}
        <Grid xs={12} md={6} order={{ xs: 1, md: 2 }}>
          <Paper
            component="form"
            onSubmit={onSubmit}
            noValidate
            elevation={0}
            sx={{
              p: 3,
              height: "100%",
              border: "1px solid",
              borderColor: "primary.main",
              background: "rgba(255,255,255,0.05)",
              borderLeftWidth: 4,
              borderRadius: 2,
            }}
          >
            <TextField
              label="Name (optional)"
              name="name"
              value={form.name}
              onChange={onChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone (optional)"
              name="phone"
              value={form.phone}
              onChange={onChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Your Email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              margin="normal"
              required
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} />

            <TextField
              label="Your Message"
              name="message"
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
            <ValidationError prefix="Message" field="message" errors={state.errors} />

            <Button type="submit" variant="contained" fullWidth disabled={state.submitting} sx={{ mt: 2 }}>
              {state.submitting ? "Sending..." : "Send Message"}
            </Button>

            {/* a11y live region */}
            <div role="status" aria-live="polite" style={{ minHeight: 24, marginTop: 8 }}>
              {state.succeeded && "Thanks! I’ll get back to you soon."}
              {state.errors?.length > 0 && "Hmm—couldn’t send. Please try again."}
            </div>
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
