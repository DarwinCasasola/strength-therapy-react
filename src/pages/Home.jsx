// src/pages/Home.jsx
import { useEffect } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Tips from "../components/Tips";

export default function Home() {
  const navigate = useNavigate();

  // Load Elfsight (reviews) once
  useEffect(() => {
    const id = "elfsight-platform-script";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://static.elfsight.com/platform/platform.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <>
      {/* HERO with background image */}
      <Box
        id="hero"
        sx={{
          position: "relative",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
          // If the file name has a space, keep %20. If you rename to D1STgym-copy.jpg, update path.
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
        <Container
  maxWidth="lg"
  sx={{
    position: "relative",
    zIndex: 1,
    py: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",   // ← centers children horizontally
    textAlign: "center",
  }}
>
  <Box
    component="img"
    src="/assets/Cory.jpeg"
    alt="Cory Ginther"
    sx={{
      width: { xs: 110, md: 140 },
      height: { xs: 110, md: 140 },
      objectFit: "cover",
      borderRadius: "50%",
      border: "4px solid #fff",
      boxShadow: "0 10px 30px rgba(0,0,0,.35)",
      mb: 3,
    }}
  />

  {/* Headline / subhead / CTA */}
  <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
    Golf Performance &amp; Sports Medicine
  </Typography>
  <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 900 }}>
    Enhancing strength, flexibility, and performance — one swing at a time.
  </Typography>
  <Button variant="contained" size="large" sx={{ mt: 3 }} onClick={() => navigate("/booking")}>
    Book a Session
  </Button>
</Container>
      </Box>

      {/* Reviews section (Elfsight) */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          What Our Clients Say
        </Typography>
        <Box
          component="div"
          className="elfsight-app-2d5b9a9f-fdb1-473b-8676-302b086b0c94"
          data-elfsight-app-lazy
          sx={{ mt: 4 }}
        />
      </Container>

      <Container sx={{ py: 8 }}>
  <Typography variant="h4" align="center" gutterBottom>Training Tips</Typography>
  <Tips />
</Container>
    </>
  );
}
