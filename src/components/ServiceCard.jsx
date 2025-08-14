// src/components/ServiceCard.jsx
import { Card, CardContent, CardActions, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ServiceCard({ title, description, price }) {
  const navigate = useNavigate();
  return (
    <Card className="card" elevation={0} sx={{ height: "100%", borderLeft: "4px solid", borderColor: "primary.main" }}>
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>{title}</Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>{description}</Typography>
        {price !== undefined && (
          <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 700 }}>${price}</Typography>
        )}
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={() => navigate("/booking", { state: { presetService: title } })}>
          Book {title}
        </Button>
      </CardActions>
    </Card>
  );
}
