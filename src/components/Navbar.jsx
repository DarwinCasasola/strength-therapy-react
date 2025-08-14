// src/components/Navbar.jsx
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { NavLink, Link, useNavigate } from "react-router-dom";

const linkSx = ({ isActive }) => ({
  mx: 1,
  textDecoration: "none",
  color: "text.primary",
  opacity: isActive ? 1 : 0.8,
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
        backdropFilter: "blur(6px)",
        borderBottom: "1px solid",
        borderColor: "rgba(255,255,255,0.1)",
      }}
    >
      <Toolbar>
        <Box
          component={Link}
          to="/"
          sx={{
            fontWeight: 800,
            letterSpacing: 0.5,
            mr: 2,
            color: "text.primary",
            textDecoration: "none",
          }}
        >
          Strength Therapy
        </Box>

        <Box sx={{ flexGrow: 1 }} />

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
