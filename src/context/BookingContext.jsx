// src/context/BookingContext.jsx
import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    notes: "",
  });

  const updateBooking = (patch) =>
    setBooking((prev) => ({ ...prev, ...patch }));

  const resetBooking = () =>
    setBooking({ name: "", email: "", service: "", date: "", notes: "" });

  const value = { booking, updateBooking, resetBooking };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBooking() {
  return useContext(BookingContext);
}
