// src/pages/Services.jsx
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import ServiceCard from "../components/ServiceCard.jsx";
import TikTokEmbed from "../components/TikTokEmbed.jsx";
import services from "../data/services.json";

export default function Services() {
  // Replace these with your real TikTok links (or just numeric IDs)
  const tikToks = [
    "https://www.tiktok.com/@corystrengthpt/video/7512196762442976543?is_from_webapp=1&sender_device=pc&web_id=7496561333434992174",
    "https://www.tiktok.com/@corystrengthpt/video/7505086118073781534?is_from_webapp=1&sender_device=pc&web_id=7496561333434992174",
  ];

  return (
    <Box className="container" sx={{ pb: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Our Services
      </Typography>

      {/* Services cards */}
      <div className="grid grid-3" style={{ marginBottom: 32 }}>
        {services.map((s) => (
          <ServiceCard key={s.title} {...s} />
        ))}
      </div>

      {/* TikTok media section */}
      <Typography variant="h4" align="center" gutterBottom>
        In Action: Video & Photo Highlights
      </Typography>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {tikToks.map((t, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Card
              elevation={0}
              sx={{
                p: 2,
                height: "100%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderLeft: "3px solid",
                borderColor: "primary.main",
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <TikTokEmbed url={t} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
