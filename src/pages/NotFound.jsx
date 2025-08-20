import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Box sx={{ py: 12, textAlign: "center" }}>
      <Typography variant="h2" gutterBottom>404</Typography>
      <Typography sx={{ opacity: .85, mb: 3 }}>Page not found.</Typography>
      <Button variant="contained" onClick={() => navigate("/")}>Go Home</Button>
    </Box>
  );
}
