import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ConfirmationBooking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state?.formData || {};
    const [calculatedAmount, setCalculateAmount] = useState(0);

    var selectedCar = JSON.parse(sessionStorage.getItem("selectedCar")) || {};
    var rentalAddons = JSON.parse(sessionStorage.getItem("addons")) || {};

    const getRandomDate = (daysAhead) => {
        let date = new Date();
        date.setDate(date.getDate() + daysAhead);
        return date.toISOString().split("T")[0];
    };
    
    const getRandomTime = () => {
        const hours = Math.floor(Math.random() * 12) + 8; 
        const minutes = Math.random() < 0.5 ? "00" : "30";
        return `${hours}:${minutes} ${hours >= 12 ? "PM" : "AM"}`;
    };

    formData.pickupDate = formData.pickupDate || getRandomDate(2);
    formData.pickupTime = formData.pickupTime || getRandomTime();
    formData.returnDate = formData.returnDate || getRandomDate(7);
    formData.returnTime = formData.returnTime || getRandomTime();

    const calculateTotalAmount = (car, addons) => {
        let filteredAddOn = addons.map((item) => Number(item.add_on_daily_rate));
        const totalAddOnAmount = filteredAddOn.reduce((acc, curr) => acc + curr, 0);
        setCalculateAmount(Number(car?.daily) + totalAddOnAmount);
    };

    const handleConfirm = async () => {
        try {
            await axios.post("http://localhost:8080/api/email/send", formData);
            Swal.fire({
                title: "Booking Confirmed!",
                text: "Your Confirmation No: 123456",
                icon: "success",
                confirmButtonText: "OK",
                allowOutsideClick: false,
                draggable: true
            }).then(() => navigate("/"));
        } catch (error) {
            console.error("Error sending email:", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to send confirmation email.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    const handleModify = () => {
        navigate("/rental-form", { state: { formData, selectedCar, rentalAddons } });
    };

    useEffect(() => {
        calculateTotalAmount(selectedCar, rentalAddons);
    }, [selectedCar]);

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
                            <Typography variant="h5" sx={{ color: "#1976d2", mt: 2 }}>Total Estimated Amount: Rs.{calculatedAmount}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" sx={{ color: "#1976d2", mt: 2 }}>Pickup Date and Time</Typography>
                            <Typography variant="body1"><strong>Pickup Date:</strong> {formData.pickupDate}</Typography>
                            <Typography variant="body1"><strong>Pickup Time:</strong> {formData.pickupTime}</Typography>
                            <Typography variant="body1"><strong>Return Date:</strong> {formData.returnDate}</Typography>
                            <Typography variant="body1"><strong>Return Time:</strong> {formData.returnTime}</Typography>
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