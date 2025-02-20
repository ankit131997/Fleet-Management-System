import React, { useState } from "react";
import { Container, Box, Typography, TextField, Checkbox, FormControlLabel, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ModifyCancelBooking = () => {
  const [bookingId, setBookingId] = useState("");
  const [isModify, setIsModify] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newHub, setNewHub] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const navigate = useNavigate();

  const handleModifyChange = (event) => {
    setIsModify(event.target.checked);
    if (event.target.checked) {
      setIsCancel(false);
    }
  };

  const handleCancelChange = (event) => {
    setIsCancel(event.target.checked);
    if (event.target.checked) {
      setIsModify(false);
    }
  };

  const handleSubmit = () => {
    // Handle the submit logic for modify or cancel booking
    if (isModify) {
      // Logic for modifying the booking
      console.log("Modify Booking:", { bookingId, newDate, newHub });
      Swal.fire({
        title: "Updated Successfully!",
        icon: "success",
        draggable: true
      });
    } else if (isCancel) {
      // Logic for canceling the booking
      console.log("Cancel Booking:", { bookingId, cancelReason });
      Swal.fire({
        title: "Cancelled Successfully!",
        icon: "success",
        draggable: true
      });
    }
    // Navigate back to the dashboard or another page
    navigate("/AdminDashboard");
  };

  const handleReset = () => {
    setBookingId("");
    setIsModify(false);
    setIsCancel(false);
    setNewDate("");
    setNewHub("");
    setCancelReason("");
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Modify/Cancel Booking
        </Typography>
        <TextField
          label="Booking ID"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        <FormControlLabel
          control={<Checkbox checked={isModify} onChange={handleModifyChange} />}
          label="Modify Booking"
        />
        <FormControlLabel
          control={<Checkbox checked={isCancel} onChange={handleCancelChange} />}
          label="Cancel Booking"
        />
        {isModify && (
          <Box sx={{ mt: 2 }}>
            <TextField
              label="New Booking Date"
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ mt: 2 }}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>New Hub</InputLabel>
              <Select
                value={newHub}
                onChange={(e) => setNewHub(e.target.value)}
                label="New Hub"
              >
                <MenuItem value="Hub1">Hub1</MenuItem>
                <MenuItem value="Hub2">Hub2</MenuItem>
                <MenuItem value="Hub3">Hub3</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
        {isCancel && (
          <TextField
            label="Reason for Cancellation"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            fullWidth
            multiline
            rows={4}
            sx={{ mt: 2 }}
          />
        )}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Done
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