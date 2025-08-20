import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, Typography, CircularProgress } from "@mui/material";

export default function Tips() {
  const [tips, setTips] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setStatus("loading");
        // JSONPlaceholder demo: fetch 3 “tips”
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=3");
        if (mounted) { setTips(data); setStatus("done"); }
      } catch {
        if (mounted) setStatus("error");
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (status === "loading") return <CircularProgress />;
  if (status === "error") return <Typography>Couldn’t load tips right now.</Typography>;

  return (
    <Box sx={{ mt: 6, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3,1fr)" }, gap: 3 }}>
      {tips.map(t => (
        <Card key={t.id} elevation={0} sx={{ border: "1px solid rgba(255,255,255,.1)", borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>{t.title}</Typography>
            <Typography variant="body2" sx={{ opacity: .9 }}>{t.body}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
