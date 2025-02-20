import React, { useState } from "react";
import { Box, TextField, Select, MenuItem, Button, Typography, Grid, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RentalForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        addressLine1: "",
        addressLine2: "",
        email: "",
        city: "",
        pincode: "",
        phoneNumber: "",
        mobileNumber: "",
        creditCardType: "",
        creditCardNumber: "",
        drivingLicenseNumber: "",
        idpNumber: "",
        issuedByDL: "",
        validThroughDL: "",
        passportNumber: "",
        passportValidThrough: "",
        passportIssuedBy: "",
        passportValidFrom: "",
        passportIssueDate: "",
        dateOfBirth: "",
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCancel = () => {
        alert("Booking Canceled");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://localhost:7223/api/Customer/addCustomer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            setMessage("Rental data saved successfully!");
            navigate("/ReviewDetails", { state: { formData } });

        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f0f2f5", padding: 3 }}>
            <Box sx={{ width: "100%", maxWidth: 600, padding: 4, boxShadow: 3, borderRadius: 2, backgroundColor: "#fff" }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ color: "#1976d2" }}>Rental Form</Typography>
                {message && <Typography color="error" align="center">{message}</Typography>}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {Object.keys(formData).map((key) => (
                            <Grid item xs={12} sm={key.includes("Name") || key.includes("Number") ? 6 : 12} key={key}>
                                {key === "creditCardType" ? (
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Credit Card Type</InputLabel>
                                        <Select
                                            label="Credit Card Type"
                                            name={key}
                                            value={formData[key]}
                                            onChange={handleChange}
                                            required
                                        >
                                            <MenuItem value="Visa">Visa</MenuItem>
                                            <MenuItem value="MasterCard">MasterCard</MenuItem>
                                            <MenuItem value="American Express">American Express</MenuItem>
                                            <MenuItem value="Discover">Discover</MenuItem>
                                        </Select>
                                    </FormControl>
                                ) : (
                                    <TextField 
                                        fullWidth 
                                        label={key.replace(/([A-Z])/g, ' $1').trim()} 
                                        name={key} 
                                        value={formData[key]} 
                                        onChange={handleChange} 
                                        required={!(key.includes("addressLine2") || key.includes("creditCardType"))}
                                        size="small" 
                                        type={key.includes("date") ? "date" : "text"}
                                        InputLabelProps={key.includes("date") ? { shrink: true } : {}}
                                    />
                                )}
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                        <Button type="submit" variant="contained" color="primary">Continue Booking</Button>
                        <Button type="button" variant="outlined" color="error" onClick={handleCancel}>Cancel</Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default RentalForm;
