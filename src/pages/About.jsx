// src/pages/About.jsx
import { Box, Typography } from "@mui/material";

export default function About() {
  return (
    <Box className="container">
      <Typography variant="h4" gutterBottom>About</Typography>

      {/* Replace with your old about.html content as paragraphs */}
      <Typography paragraph>
      Learn more about our mission, our team, and what drives us.
      </Typography>
      <Typography paragraph>
      I am Dr.Cory Ginther PT,DPT, CSCS,and CEO of Strength Therapy. When I created Strength Therapy, I had a mission to help athletes of all shapes, sizes, and experience levels become their best version of themselves. I believe in investing in a community dedicated to helping people unlock their full potential. I am a certified trainer and passionate coach who will work closely with you to ensure you crush your fitness goals, one step at a time.
      </Typography>

      {/* If you had images:
      <img src="/assets/your-photo.jpg" alt="Cory coaching" style={{ maxWidth: "100%", borderRadius: 16 }} />
      */}
    </Box>
  );
}
