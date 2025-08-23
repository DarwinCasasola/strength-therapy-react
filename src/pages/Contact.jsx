// src/pages/Contact.jsx
import { Box, Paper, TextField, Button, Typography, Alert } from "@mui/material";
import { useForm, ValidationError } from "@formspree/react";
import { useEffect, useState } from "react";

const FORMSPREE_ID = "mwplbzne"; // <-- your working ID
const ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;

export default function Contact() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (state.succeeded) setMsg({ type: "success", text: "Thanks! Your message has been sent." });
    else if (state.errors?.length) setMsg({ type: "error", text: "Couldn’t send. Please try again." });
  }, [state.succeeded, state.errors]);

  return (
    <Box className="container" sx={{ py: 6, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" align="center" gutterBottom>Get in Touch</Typography>

      <Paper
        component="form"
        onSubmit={handleSubmit}
        action={ENDPOINT}
        method="POST"
        noValidate
        sx={{ p: 3, borderLeft: "4px solid", borderColor: "primary.main" }}
      >
        {/* Optional metadata */}
        <input type="hidden" name="_subject" value="Strength Therapy Lead" />
        <input type="hidden" name="page" value={typeof window !== "undefined" ? window.location.pathname : ""} />

        <TextField
          id="contact-name"
          name="name"
          label="Name (optional)"
          fullWidth
          margin="normal"
          autoComplete="name"
        />
        <TextField
          id="contact-phone"
          name="phone"
          label="Phone (optional)"
          fullWidth
          margin="normal"
          autoComplete="tel"
        />

        <TextField
          id="contact-email"
          name="email"
          type="email"
          label="Your Email"
          fullWidth
          margin="normal"
          required
          autoComplete="email"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />

        <TextField
          id="contact-message"
          name="message"
          label="Your Message"
          fullWidth
          margin="normal"
          required
          multiline
          rows={5}
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />

        <Button type="submit" variant="contained" fullWidth disabled={state.submitting} sx={{ mt: 2 }}>
          {state.submitting ? "Sending…" : "Send Message"}
        </Button>
      </Paper>

      {msg && (
        <Alert sx={{ mt: 2 }} severity={msg.type === "success" ? "success" : "error"}>
          {msg.text}
        </Alert>
      )}
    </Box>
  );
}
