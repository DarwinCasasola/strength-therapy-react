// src/components/Navbar.jsx
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink, Link, useNavigate } from "react-router-dom";
import InstagramPreview from "./InstagramPreview";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: "Home", path: "/", end: true },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },
  ];

  const handleNavClick = (path) => {
    setMobileOpen(false);
    navigate(path);
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backgroundColor: "#000",
        borderBottom: "1px solid",
        borderColor: "primary.main",
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
              height: { xs: 36, sm: 44 },
              width: "auto",
              display: "block",
              borderRadius: 1,
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

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          {navItems.map((item) => (
            <Box
              key={item.path}
              component={NavLink}
              to={item.path}
              end={item.end}
              sx={linkSx}
            >
              {item.label}
            </Box>
          ))}
          {/* Insert Instagram Preview Component Here */}
          <Button
            variant="contained"
            sx={{ ml: 2 }}
            onClick={() => navigate("/booking")}
          >
            Book Session
          </Button>
        </Box>

        {/* Mobile Hamburger Menu */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerToggle}
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
            backgroundColor: "#1A1D21",
            borderLeft: "1px solid",
            borderColor: "primary.main",
          },
        }}
      >
        <Box sx={{ textAlign: "right", p: 2 }}>
          <IconButton onClick={handleDrawerToggle} color="inherit">
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleNavClick(item.path)}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(211,47,47,0.1)",
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    color: "text.primary",
                    textAlign: "center",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <Box sx={{ width: "100%", p: 2 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleNavClick("/booking")}
              >
                Book Session
              </Button>
            </Box>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}
