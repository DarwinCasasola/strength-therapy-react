// src/components/ServiceCard.jsx
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function ServiceCard({ title, description, image, price }) {
  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.10)",
        outline: "1px solid rgba(211,47,47,0.6)",
        outlineOffset: "-1px",
        borderRadius: 2,
        overflow: "hidden",
        transition: "transform .18s ease, box-shadow .18s ease",
        "@media (hover:hover)": {
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          },
        },
      }}
    >
      {/* Always render a uniform image area */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: { xs: "16 / 9", sm: "4 / 3", md: "4 / 5" },
          overflow: "hidden",
          background:
            !image
              ? "linear-gradient(135deg, rgba(211,47,47,.35), rgba(255,255,255,.08))"
              : "transparent",
        }}
      >
        {image && (
          <Box
            component="img"
            src={image}
            alt={title}
            loading="lazy"
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          {description}
        </Typography>
        {price !== undefined && (
          <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 700 }}>
            ${price}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
