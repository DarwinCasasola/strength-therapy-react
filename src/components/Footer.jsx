// src/components/Footer.jsx
import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 6, py: 3, borderTop: "1px solid", borderColor: "rgba(255,255,255,0.15)" }}>
      <Container>
        <Typography variant="body2" align="center" sx={{ opacity: 0.85 }}>
          © {new Date().getFullYear()} Strength Therapy by Cory Ginther
        </Typography>
      </Container>
    </Box>
  );
}
