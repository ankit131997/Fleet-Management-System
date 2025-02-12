import React from "react";
import { Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmationBooking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state?.formData || {};
    const selectedCar = location.state?.selectedCar || {};
    const rentalAddons = location.state?.rentalAddons || [];
    const totalAmount = location.state?.totalAmount || 0;

    const handleConfirm = async () => {
        try {
            const response = await fetch("http://localhost:8080/email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email
                })
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            alert("Booking Confirmed! Confirmation No: 123456");
            navigate("/");
        } catch (error) {
            console.error("Error sending email:", error);
            alert("Failed to send confirmation email.");
        }
    };

    const handleModify = () => {
        navigate("/rental-form", { state: { formData, selectedCar, rentalAddons, totalAmount } });
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f0f2f5", padding: 3 }}>
            <Card sx={{ width: "100%", maxWidth: 600, padding: 4, boxShadow: 3, borderRadius: 2, backgroundColor: "#fff" }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ color: "#1976d2" }}>Confirm Booking</Typography>
                <CardContent>
                    <Grid container spacing={2}>
                        {Object.entries(formData).map(([key, value]) => (
                            <Grid item xs={12} key={key}>
                                <Typography variant="body1"><strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}</Typography>
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <Typography variant="h5" sx={{ color: "#1976d2", mt: 2 }}>Selected Car</Typography>
                            <Typography variant="body1"><strong>Type:</strong> {selectedCar.type}</Typography>
                            <Typography variant="body1"><strong>Daily Rate:</strong> {selectedCar.daily}</Typography>
                            <Typography variant="body1"><strong>Weekly Rate:</strong> {selectedCar.weekly}</Typography>
                            <Typography variant="body1"><strong>Monthly Rate:</strong> {selectedCar.monthly}</Typography>
                            <Typography variant="body1"><strong>Status:</strong> {selectedCar.status}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" sx={{ color: "#1976d2", mt: 2 }}>Rental Add-ons</Typography>
                            {rentalAddons.length > 0 ? (
                                rentalAddons.map((addon, index) => (
                                    <Typography variant="body1" key={index}><strong>{addon.add_on_name}:</strong> Rs.{addon.add_on_daily_rate}/day</Typography>
                                ))
                            ) : (
                                <Typography variant="body1">No Add-ons Selected</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" sx={{ color: "#1976d2", mt: 2 }}>Total Estimated Amount: Rs.{totalAmount}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                    <Button variant="contained" color="primary" onClick={handleConfirm}>Confirm</Button>
                    <Button variant="outlined" color="secondary" onClick={handleModify}>Modify</Button>
                </Box>
            </Card>
        </Box>
    );
};

export default ConfirmationBooking;