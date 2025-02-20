import * as React from "react";
import { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Container, Typography, Box, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export const AdminDashboardNavbar = () => {
  const [username, setUsername] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    const loggedInStatus = sessionStorage.getItem("isLoggedIn") === "true";
    if (storedUsername && loggedInStatus) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("isLoggedIn");
    navigate("/login");
    setUsername(null);
    setIsLoggedIn(false);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#333333", width: "100%" }}>
     

      {/* Additional Navigation */}
      <Toolbar sx={{ backgroundColor: "#222", justifyContent: "center", gap: 2 }}>
        <Button component={Link} to="/booking" color="inherit">Booking</Button>
        <Button component={Link} to="/cancellation" color="inherit">Cancellation</Button>
        <Button component={Link} to="/handover" color="inherit">Hand-over</Button>
        <Button component={Link} to="/return" color="inherit">Return</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminDashboardNavbar;
