import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from "@mui/material";
import Swal from "sweetalert2";

const ModifyCancelBooking = () => {
  const [bookingId, setBookingId] = useState("");
  const [isModify, setIsModify] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newHub, setNewHub] = useState("");
  const [cancelReason, setCancelReason] = useState("");

  // Handle Modify Checkbox Change
  const handleModifyChange = (event) => {
    setIsModify(event.target.checked);
    if (event.target.checked) setIsCancel(false); // Ensure only one option is selected
  };

  // Handle Cancel Checkbox Change
  const handleCancelChange = (event) => {
    setIsCancel(event.target.checked);
    if (event.target.checked) setIsModify(false);
  };

  // Handle Form Submission
  const handleSubmit = () => {
    if (!bookingId.trim()) {
      Swal.fire({
        title: "Error",
        text: "Please enter a valid Booking ID.",
        icon: "error",
      });
      return;
    }

    if (isModify && (!newDate || !newHub)) {
      Swal.fire({
        title: "Error",
        text: "Please provide the new booking date and hub.",
        icon: "error",
      });
      return;
    }

    if (isCancel && !cancelReason.trim()) {
      Swal.fire({
        title: "Error",
        text: "Please provide a reason for cancellation.",
        icon: "error",
      });
      return;
    }

    if (isModify) {
      console.log("Modifying Booking:", { bookingId, newDate, newHub });
      Swal.fire({
        title: "Booking Updated Successfully",
        text: `Booking ${bookingId} has been updated.`,
        icon: "success",
      }).then(() => {
        window.location.href = "http://localhost:3000"; // Redirect to homepage
      });
    } else if (isCancel) {
      console.log("Canceling Booking:", { bookingId, cancelReason });
      Swal.fire({
        title: "Booking Cancelled",
        text: `Booking ${bookingId} has been cancelled.`,
        icon: "success",
      }).then(() => {
        window.location.href = "http://localhost:3000"; // Redirect to homepage
      });
    }
  };

  // Reset Form Fields
  const handleReset = () => {
    setBookingId("");
    setIsModify(false);
    setIsCancel(false);
    setNewDate("");
    setNewHub("");
    setCancelReason("");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 4, boxShadow: 3, borderRadius: 2, backgroundColor: "white" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Modify or Cancel Booking
        </Typography>

        {/* Booking ID Input */}
        <TextField
          label="Booking ID"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          fullWidth
          required
          sx={{ mt: 2 }}
        />

        {/* Modify and Cancel Checkboxes */}
        <FormControlLabel
          control={<Checkbox checked={isModify} onChange={handleModifyChange} />}
          label="Modify Booking"
        />
        <FormControlLabel
          control={<Checkbox checked={isCancel} onChange={handleCancelChange} />}
          label="Cancel Booking"
        />

        {/* Modify Section */}
        {isModify && (
          <Box sx={{ mt: 3 }}>
            <TextField
              label="New Booking Date"
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
              sx={{ mt: 2 }}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>New Hub</InputLabel>
              <Select value={newHub} onChange={(e) => setNewHub(e.target.value)} required>
                <MenuItem value="Hub1">Hub1</MenuItem>
                <MenuItem value="Hub2">Hub2</MenuItem>
                <MenuItem value="Hub3">Hub3</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}

        {/* Cancel Section */}
        {isCancel && (
          <TextField
            label="Reason for Cancellation"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            fullWidth
            multiline
            rows={4}
            required
            sx={{ mt: 2 }}
          />
        )}

        {/* Action Buttons */}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ModifyCancelBooking;
