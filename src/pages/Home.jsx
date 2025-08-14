// src/pages/Home.jsx
import { useEffect } from "react";
import { Box, Typography, Button, Grid, Card, CardContent, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // Load Elfsight (Google Reviews) widget script once
  useEffect(() => {
    const scriptId = "elfsight-platform-script";
    if (!document.getElementById(scriptId)) {
      const s = document.createElement("script");
      s.src = "https://static.elfsight.com/platform/platform.js";
      s.async = true;
      s.id = scriptId;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Box
        id="hero"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        <Container maxWidth="md">
          <Box
            component="img"
            src="/assets/Cory.jpeg"
            alt="Cory Ginther"
            sx={{
              width: 180,
              height: 180,
              objectFit: "cover",
              borderRadius: "50%",
              mb: 3,
              border: "3px solid",
              borderColor: "primary.main",
            }}
          />
          <Typography variant="h3" component="h1" gutterBottom>
            Golf Performance & Sports Medicine
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Enhancing strength, flexibility, and performance — one swing at a time.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3 }}
            onClick={() => navigate("/booking")}
          >
            Book a Session
          </Button>
        </Container>
      </Box>

      {/* Services Section (teaser) */}
      <Box id="services" sx={{ py: 8 }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Our Services
          </Typography>

          <Grid container spacing={3} sx={{ mt: 1 }}>
            {[
              {
                title: "Golf Performance Training",
                desc: "Improve swing mechanics, core strength, and range of motion.",
              },
              {
                title: "Sports Medicine",
                desc: "Recovery treatments for sports injuries and chronic pain.",
              },
              {
                title: "1-on-1 Coaching",
                desc: "Personalized coaching sessions tailored to your goals.",
              },
            ].map((service) => (
              <Grid item xs={12} sm={6} md={4} key={service.title}>
                <Card
                  className="card"
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderLeft: "4px solid",
                    borderColor: "primary.main",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      {service.title}
                    </Typography>
                    <Typography variant="body2">{service.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Reviews Section */}
      <Box id="reviews" sx={{ py: 8 }}>
        <Container>
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
      </Box>
    </>
  );
}
