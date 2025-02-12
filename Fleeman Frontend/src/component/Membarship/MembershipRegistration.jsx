import React, { useState, useEffect } from "react";
import {
    Container,
    Box,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Stack,
    Typography,
    Card,
    CardContent,
    useTheme,
    Button,
    Grid,
    TextField,
    MenuItem,
    InputLabel,
    Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MembershipRegistration = () => {
    const theme = useTheme();
    const navigate = useNavigate("");
    //states
    const initialFormState = {
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        city: "",
        zip: "",
        homePhone: "",
        cellPhone: "",
        drivingLicense: "",
        licenseIssuedBy: "",
        licenseValidThru: "",
        passportNo: "",
        passportIssuedBy: "",
        passportValidThru: "",
        birthDate: "",
        preferredCar: "",
      };
    
      const [formData, setFormData] = useState(initialFormState);
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", formData);
      };

    const handleClear = () => {
        setFormData(initialFormState);
      };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom  color={theme.palette.primary.main}> 
                Membership Registration
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6} sx={{ mb: 1, mt: 1 }}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ mb: 1, mt: 1 }}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 1, mt: 1 }}>
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ mb: 1, mt: 1 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ mb: 1, mt: 1 }}>
                        <TextField
                            fullWidth
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ mb: 1, mt: 1 }}>
                        <TextField
                            fullWidth
                            label="ZIP Code"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ mb: 1, mt: 1 }}>
                        <TextField
                            fullWidth
                            label="Home Phone"
                            name="homePhone"
                            value={formData.homePhone}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ mb: 1, mt: 1 }}>
                        <TextField
                            fullWidth
                            label="Cell Phone"
                            name="cellPhone"
                            value={formData.cellPhone}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ mb: 1, mt: 1 }}>
                        <TextField
                            fullWidth
                            label="Driving License"
                            name="drivingLicense"
                            value={formData.drivingLicense}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ mb: 1, mt: 1 }}>
                        <TextField
                            fullWidth
                            label="License Issued By"
                            name="licenseIssuedBy"
                            value={formData.licenseIssuedBy}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ mb: 1, mt: 1 }}>
                        <TextField
                            fullWidth
                            label="License Valid Thru"
                            name="licenseValidThru"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={formData.licenseValidThru}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ mb: 1, mt: 1 }}>
                        <TextField
                            fullWidth
                            label="Passport No."
                            name="passportNo"
                            value={formData.passportNo}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ mb: 1, mt: 1 }}>
                        <TextField
                            fullWidth
                            label="Passport Issued By"
                            name="passportIssuedBy"
                            value={formData.passportIssuedBy}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ mb: 1, mt: 1 }}>
                        <TextField
                            fullWidth
                            label="Passport Valid Thru"
                            name="passportValidThru"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={formData.passportValidThru}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ mb: 1, mt: 1 }}>
                        <TextField
                            fullWidth
                            label="Birth Date"
                            name="birthDate"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={formData.birthDate}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Preferred Car Type</InputLabel>
                            <Select
                                name="preferredCar"
                                value={formData.preferredCar}
                                onChange={handleChange}
                            >
                                <MenuItem value="Sedan">Sedan</MenuItem>
                                <MenuItem value="SUV">SUV</MenuItem>
                                <MenuItem value="Hatchback">Hatchback</MenuItem>
                                <MenuItem value="Luxury">Luxury</MenuItem>
                                <MenuItem value="Convertible">Convertible</MenuItem> 
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="success" sx={{mr:3}}>
                            Submit
                        </Button>
                        <Button type="reset" variant="contained" color="error" onClick={handleClear}>
                            Clear
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default MembershipRegistration;