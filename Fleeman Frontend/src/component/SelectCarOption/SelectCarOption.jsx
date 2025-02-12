import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Container,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { cars } from "../../ApiEndPoints";

const SelectCarOption = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  const handleSelect = (car) => {
    setSelectedCar(car);
  };

  const handleContinueBooking = () => {
    if (selectedCar) {
      navigate("/RentalAddons", { state: { selectedCar } }); // Navigate with selectedCar data
    }
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Car Rental Options
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Car Class</TableCell>
                <TableCell>Car Type</TableCell>
                <TableCell>Car Image</TableCell>
                <TableCell>Daily Rate</TableCell>
                <TableCell>Weekly Rate</TableCell>
                <TableCell>Monthly Rate</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.map((car, index) => (
                <TableRow key={index}>
                  <TableCell>{car.class}</TableCell>
                  <TableCell>{car.type}</TableCell>
                  <TableCell>
                    {car.img ? (
                      <img
                        src={car.img}
                        alt={car.class}
                        style={{ width: "50px", height: "50px" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </TableCell>
                  <TableCell>{car.daily}</TableCell>
                  <TableCell>{car.weekly}</TableCell>
                  <TableCell>{car.monthly}</TableCell>
                  <TableCell>{car.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      disabled={car.status !== "Select"}
                      onClick={() => handleSelect(car)}
                    >
                      Select
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {selectedCar && (
          <Box mt={3} textAlign="center">
            <Typography variant="h6">
              Selected Car: {selectedCar.type}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleContinueBooking} // Navigate on click
            >
              Continue Booking
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default SelectCarOption;
