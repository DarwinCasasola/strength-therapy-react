// src/components/TikTokEmbed.jsx
import { useEffect } from "react";
import { Box } from "@mui/material";

export default function TikTokEmbed({ url, videoId, width = "100%" }) {
  // derive the numeric video ID from a full TikTok URL if needed
  const idFromUrl =
    videoId ||
    (typeof url === "string" && (url.match(/\/video\/(\d+)/)?.[1] ?? null));

  useEffect(() => {
    if (!idFromUrl) return;

    // load the TikTok embed script once
    const scriptId = "tiktok-embed-js";
    if (!document.getElementById(scriptId)) {
      const s = document.createElement("script");
      s.id = scriptId;
      s.src = "https://www.tiktok.com/embed.js";
      s.async = true;
      document.body.appendChild(s);
    }

    // after route changes, prompt TikTok to (re)scan embeds if available
    const tick = () => {
      // Some versions expose a helper:
      // @ts-ignore
      if (window.tiktokEmbedLoad) window.tiktokEmbedLoad();
    };
    const t = setTimeout(tick, 300);
    return () => clearTimeout(t);
  }, [idFromUrl]);

  if (!idFromUrl) return null;

  return (
    <Box sx={{ width }}>
      {/* Official TikTok embed markup */}
      <blockquote
        className="tiktok-embed"
        cite={`https://www.tiktok.com/@user/video/${idFromUrl}`}
        data-video-id={idFromUrl}
        style={{ width: "100%", maxWidth: "100%" }}
      >
        <section />
      </blockquote>
    </Box>
  );
}
