import * as React from "react";
import { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Container, Typography, Box, IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";

export const Navbar = () => {
  const [username, setUsername] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For dropdown menu
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null); // For mobile menu
  const navigate = useNavigate();

  // Check if the user is logged in on component mount
  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    const loggedInStatus = sessionStorage.getItem("isLoggedIn") === "true";
    if (storedUsername && loggedInStatus) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("isLoggedIn");
    navigate("/login");
    setUsername(null);
    setIsLoggedIn(false);
    handleCloseMenu(); // Close the dropdown menu
  };

  // Handle dropdown menu open/close
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1e3a8a", boxShadow: "none" }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Brand Name */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "white",
              cursor: "pointer",
              fontFamily: "'Pacifico', cursive",
              letterSpacing: "1px",
              textDecoration: "none",
              flexGrow: 1,
            }}
            component={Link}
            to="/"
          >
            Fleeman
          </Typography>

          {/* Navigation Buttons (Desktop) */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
            <Button component={Link} to="/" color="inherit" sx={{ textTransform: "none", fontWeight: "bold" }}>
              Home
            </Button>
            <Button component={Link} to="/modify-booking" color="inherit" sx={{ textTransform: "none", fontWeight: "bold" }}>
              Modify/Cancel Booking
            </Button>
            <Button component={Link} to="/membership" color="inherit" sx={{ textTransform: "none", fontWeight: "bold" }}>
              Membership
            </Button>
            <Button component={Link} to="/about" color="inherit" sx={{ textTransform: "none", fontWeight: "bold" }}>
              About
            </Button>
            <Button component={Link} to="/customer-care" color="inherit" sx={{ textTransform: "none", fontWeight: "bold" }}>
              Customer Care
            </Button>
          </Box>

          {/* Login/Logout Section (Desktop) */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
            {isLoggedIn ? (
              <>
                <IconButton onClick={handleMenuOpen} color="inherit">
                  <AccountCircle fontSize="large" />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                  sx={{ mt: 1 }}
                >
                  <MenuItem onClick={handleCloseMenu} component={Link} to="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Logout sx={{ mr: 1 }} /> Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" color="inherit" sx={{ textTransform: "none", fontWeight: "bold" }}>
                  User Login
                </Button>
                <Button component={Link} to="/AdminLogin" color="inherit" sx={{ textTransform: "none", fontWeight: "bold" }}>
                  Staff Login
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Menu (Hamburger Icon) */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleMobileMenuOpen} color="inherit">
              <MenuIcon fontSize="large" />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleCloseMenu}
              sx={{ mt: 1 }}
            >
              <MenuItem onClick={handleCloseMenu} component={Link} to="/">
                Home
              </MenuItem>
              <MenuItem onClick={handleCloseMenu} component={Link} to="/modify-booking">
                Modify/Cancel Booking
              </MenuItem>
              <MenuItem onClick={handleCloseMenu} component={Link} to="/membership">
                Membership
              </MenuItem>
              <MenuItem onClick={handleCloseMenu} component={Link} to="/about">
                About
              </MenuItem>
              <MenuItem onClick={handleCloseMenu} component={Link} to="/customer-care">
                Customer Care
              </MenuItem>
              {isLoggedIn ? (
                <MenuItem onClick={handleLogout}>
                  <Logout sx={{ mr: 1 }} /> Logout
                </MenuItem>
              ) : (
                <>
                  <MenuItem onClick={handleCloseMenu} component={Link} to="/login">
                    User Login
                  </MenuItem>
                  <MenuItem onClick={handleCloseMenu} component={Link} to="/AdminLogin">
                    Staff Login
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;