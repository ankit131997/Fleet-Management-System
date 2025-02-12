import React from "react";
import { Container, Box, Typography } from "@mui/material";
//import { Navbar } from "../Navbar";
import Banner from "./Banner";
import { BookingForm } from "./BookingForm";
import { HeroSection } from "./HeroSection";
import { AdminDashboardNavbar } from "./AdminDashboardNavbar";
const AdminDashboard = () => {
  return (
<Box sx={{ minHeight: "100vh", backgroundColor: "#F8F9FA" }}>

      {/* Navbar at the top */}
      {/* <Navbar />  */}

       {/* Navbar at the top */}
       <AdminDashboardNavbar />  

      {/* Admin Dashboard Heading */}
      {/* <Container sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Admin Dashboard
        </Typography>
      </Container> */}



      {/* Sections for Admin Dashboard */}
      <Container sx={{ mt: 4 }}>
        {/* <Banner /> */}
        <HeroSection />
        <BookingForm />
      </Container>
    </Box>
  );
};

export default AdminDashboard;
