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
      {/* <Container> */}
        {/* <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}> */}
          {/* Brand Name */}
          {/* <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "white",
              cursor: "pointer",
              fontFamily: "'Pacifico', cursive",
              letterSpacing: "2px",
              textDecoration: "none",
            }}
            component={Link}
            to="/"
          > */}
            {/* Fleeman */}
          {/* </Typography> */}

          {/* Navigation Buttons
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button component={Link} to="/" color="inherit">Home</Button>
            <Button component={Link} to="/modify-booking" color="inherit">Modify/Cancel Booking</Button>
            <Button component={Link} to="/membership" color="inherit">Membership Registration</Button>
            <Button component={Link} to="/about" color="inherit">About India Drive</Button>
            <Button component={Link} to="/customer-care" color="inherit">Customer Care</Button>
          </Box> */}

          {/* Login/Logout Section
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isLoggedIn ? (
              <>
                <Typography sx={{ color: "white", mr: 2 }}>
                  Welcome, {username}
                </Typography>
                <Button onClick={handleLogout} color="inherit">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" color="inherit">User Login</Button>
                <Button component={Link} to="/admin-login" color="inherit">Admin Login</Button>
              </>
            )}
          </Box> */}
        {/* </Toolbar> */}
      {/* </Container> */}

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
