// src/pages/About.jsx
import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <>
      {/* HERO with same background image as Home */}
      <Box
        id="about-hero"
        sx={{
          position: "relative",
          minHeight: "60vh", // match Home; change to "50vh" if you want it shorter
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
          // If the file name has a space, keep %20. If you rename it to D1STgym-copy.jpg, update path.
          backgroundImage: "url('/assets/D1STgym-copy.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.35)", // overlay for readability
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: 6 }}>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
            About Us
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 900, mx: "auto" }}>
            Learn more about our mission, our approach, and what drives us.
          </Typography>
        </Container>
      </Box>

      {/* Main content (centered, no right column) */}
      <Container sx={{ py: 8, maxWidth: 1000 }}>
        <Typography variant="h4" gutterBottom>
          Strength Therapy by Dr. Cory Ginther, PT, DPT, CSCS
        </Typography>

        <Typography paragraph sx={{ opacity: 0.95, lineHeight: 1.9 }}>
          I am Dr. Cory Ginther PT, DPT, CSCS, and CEO of Strength Therapy. When I created
          Strength Therapy, I had a mission to help athletes of all shapes, sizes, and
          experience levels become their best version of themselves.
        </Typography>

        <Typography paragraph sx={{ opacity: 0.95, lineHeight: 1.9 }}>
          I believe in investing in a community dedicated to helping people unlock their full
          potential. I am a certified trainer and passionate coach who will work closely with
          you to ensure you crush your fitness goals, one step at a time.
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
          onClick={() => navigate("/booking")}
        >
          Book a Session
        </Button>
      </Container>
    </>
  );
}
