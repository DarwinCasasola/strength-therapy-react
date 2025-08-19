// src/components/Navbar.jsx
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { NavLink, Link, useNavigate } from "react-router-dom";

const linkSx = ({ isActive }) => ({
  mx: 1,
  textDecoration: "none",
  color: "text.primary",
  opacity: isActive ? 1 : 0.85,
  borderBottom: "2px solid",
  borderColor: isActive ? "primary.main" : "transparent",
  pb: 0.5,
});

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backgroundColor: "#000",                // solid black bar
        borderBottom: "1px solid",
        borderColor: "primary.main",            // thin red line
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        {/* Logo + Brand (clickable to "/") */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            textDecoration: "none",
            color: "text.primary",
          }}
        >
          <Box
            component="img"
            src="/assets/IMG_0542.JPEG"
            alt="Strength Therapy logo"
            loading="eager"
            sx={{
              height: { xs: 36, sm: 44 },       // adjust logo size here
              width: "auto",
              display: "block",
              borderRadius: 1,                  // remove if you want sharp corners
            }}
          />
          {/* Hide text on very small screens to keep the bar clean */}
          <Box
            component="span"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.5,
              display: { xs: "none", sm: "inline" },
            }}
          >
            Strength Therapy
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Nav links + CTA */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box component={NavLink} to="/" end sx={linkSx}>
            Home
          </Box>
          <Box component={NavLink} to="/about" sx={linkSx}>
            About
          </Box>
          <Box component={NavLink} to="/services" sx={linkSx}>
            Services
          </Box>
          <Box component={NavLink} to="/contact" sx={linkSx}>
            Contact
          </Box>
          <Button variant="contained" sx={{ ml: 2 }} onClick={() => navigate("/booking")}>
            Book Session
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
