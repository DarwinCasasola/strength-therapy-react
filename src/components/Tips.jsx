// src/components/Tips.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, Typography, CircularProgress } from "@mui/material";

export default function Tips({ limit = 3, url = "/tips.json" }) {
  const [tips, setTips] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setStatus("loading");
        const { data } = await axios.get(url, { headers: { "Cache-Control": "no-cache" } });
        if (!mounted) return;
        setTips(Array.isArray(data) ? data.slice(0, limit) : []);
        setStatus("done");
      } catch {
        setStatus("error");
      }
    })();
    return () => { mounted = false; };
  }, [url, limit]);

  if (status === "loading") return <CircularProgress />;
  if (status === "error")   return <Typography>Couldn’t load tips right now.</Typography>;
  if (!tips.length)         return null;

  return (
    <Box
      sx={{
        mt: 4,
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
        gap: 3,
      }}
    >
      {tips.map(t => (
        <Card
          key={t.id}
          elevation={0}
          sx={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 2,
          }}
        >
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>
              {t.title}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {t.body}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
