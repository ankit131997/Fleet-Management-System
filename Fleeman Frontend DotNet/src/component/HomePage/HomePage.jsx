import * as React from "react";
import { Box, Container, AppBar, Toolbar, IconButton, Typography, Avatar, Tooltip, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { HeroSection } from "./HeroSection";
import { BookingForm } from "./BookingForm";

const HomePage = () => {
  const isAdminLoggedIn = sessionStorage.getItem("isAdminLoggedIn") === "true";

  return (
    <Box sx={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Fleet Management System
          </Typography>
          {isAdminLoggedIn && (
            <Typography variant="h6" sx={{ mr: 2 }}>
              Admin
            </Typography>
          )}
          <Tooltip title="Account settings">
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <HeroSection />
      <Container sx={{ mt: 4 }}>
        <BookingForm />
      </Container>
      <Box sx={{ mt: 4, textAlign: "center", py: 2, backgroundColor: "#1976d2", color: "#fff" }}>
        <Typography variant="body2">
          © 2023 Fleet Management System. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
