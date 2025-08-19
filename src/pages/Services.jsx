// src/pages/Services.jsx
import { Box, Typography, Card } from "@mui/material";
import ServiceCard from "../components/ServiceCard.jsx";
import services from "../data/services.json";

export default function Services() {
  const videos = [
    { src: "/assets/golf-training.MP4",    caption: "Golf Performance Drill",     ratio: "9 / 16" },
    { src: "/assets/stretching.MP4",       caption: "Strengthening Drill",        ratio: "9 / 16" },
    { src: "/assets/group-training1.mp4",  caption: "Golf Stretching Drill",      ratio: "9 / 16" },
  ];

  return (
    <Box sx={{ mx: "auto", maxWidth: 1280, px: 2, pb: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Our Services
      </Typography>

      {/* FORCE 1/2/3 columns regardless of legacy CSS */}
      <Box
        sx={{
          mt: 1, mb: 8,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
          gap: 4,
          alignItems: "stretch",
        }}
      >
        {services.map((s) => (
          <Box key={s.title} sx={{ display: "flex" }}>
            <ServiceCard {...s} />
          </Box>
        ))}
      </Box>

      <Typography variant="h4" align="center" gutterBottom>
        In Action: Video & Photo Highlights
      </Typography>

      <Box
        sx={{
          mt: 2,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          gap: 4,
          alignItems: "stretch",
        }}
      >
        {videos.map((v) => (
          <Card
            key={v.src}
            elevation={0}
            sx={{
              p: 2,
              width: "100%",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
              outline: "1px solid rgba(211,47,47,0.6)",
              outlineOffset: "-1px",
              borderRadius: 2,
              transition: "transform .18s ease, box-shadow .18s ease",
              "@media (hover:hover)": {
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                },
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: v.ratio,
                overflow: "hidden",
                borderRadius: 1,
              }}
            >
              <video
                src={v.src}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
            <Typography align="center" sx={{ mt: 1.5, opacity: 0.9 }}>
              {v.caption}
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
