
// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, createTheme, Container } from "@mui/material";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import Booking from "./pages/Booking.jsx";
import { BookingProvider } from "./context/BookingContext.jsx";
import NotFound from "./pages/NotFound.jsx";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#d32f2f" }, // red accents
    background: {
      default: "#101214", // near-black page bg
      paper: "#1A1D21",   // charcoal card bg
    },
    text: {
      primary: "#EAEAEA",
      secondary: "rgba(234,234,234,0.72)",
    },
    divider: "rgba(255,255,255,0.12)",
  },
  shape: { borderRadius: 14 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.10)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { fontWeight: 700 },
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BookingProvider>
        <Navbar />
        <Container maxWidth='xl' sx={{ py: 3 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path='*' element={<NotFound />} /> {/* catch-all for 404 */}
          </Routes>
        </Container>
        <Footer />
      </BookingProvider>
    </ThemeProvider>
  );
}
