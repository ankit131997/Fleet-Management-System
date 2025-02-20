import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  TextField,
  Autocomplete,
  Container,
  Grid,
  Box,
  FormHelperText,
  Snackbar,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useNavigate } from "react-router-dom";

export const BookingForm = () => {
  const navigate = useNavigate();
  const [statesData, setStatesData] = React.useState([]);
  const [citiesData, setCitiesData] = React.useState([]);
  const [rentalDate, setRentalDate] = React.useState(dayjs());
  const [rentalTime, setRentalTime] = React.useState(dayjs());
  const [returnDate, setReturnDate] = React.useState(dayjs().add(1, 'day'));
  const [returnTime, setReturnTime] = React.useState(dayjs());
  const [pickupState, setPickupState] = React.useState(null);
  const [pickupCity, setPickupCity] = React.useState("");
  const [pickupAirportCode, setPickupAirportCode] = React.useState("");
  const [pickupHubData, setPickupHubData] = React.useState(null);
  const [returnState, setReturnState] = React.useState(null);
  const [returnCity, setReturnCity] = React.useState("");
  const [returnAirportCode, setReturnAirportCode] = React.useState("");
  const [returnHubData, setReturnHubData] = React.useState(null);
  const [sameLocation, setSameLocation] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [searchOption, setSearchOption] = React.useState("cityState");

  React.useEffect(() => {
    const fetchStatesData = async () => {
      try {
        const response = await fetch("https://localhost:7223/api/State/State");
        const data = await response.json();
        setStatesData(data);
      } catch (error) {
        console.error("Error fetching states data:", error);
      }
    };

    fetchStatesData();
  }, []);

  const fetchCitiesData = async (stateId) => {
    try {
      const response = await fetch(`https://localhost:7223/api/City/state/${stateId}`);
      const data = await response.json();
      const filteredCities = data.filter(city => city.state.stateId === stateId);
      setCitiesData(filteredCities);
    } catch (error) {
      console.error("Error fetching cities data:", error);
    }
  };

  const fetchHubData = async (endpoint, setHubData) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log(data);
      setHubData(data);
      sessionStorage.setItem("hubData", JSON.stringify(data)); // Store hub data in session storage
    } catch (error) {
      console.error("Error fetching hub data:", error);
    }
  };

  const handleSubmit = () => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      setOpenSnackbar(true);
      return;
    }

    let formErrors = {};

    // Pick-Up Location Validation
    if (searchOption === "cityState") {
      if (!pickupState) formErrors.pickupState = "Pick-Up State is required.";
      if (!pickupCity) formErrors.pickupCity = "Pick-Up City is required.";
    } else if (searchOption === "airport" && !pickupAirportCode) {
      formErrors.pickupAirportCode = "Airport Code is required.";
    }

    // Ensure either state and city or airport is selected
    if (searchOption === "cityState" && (!pickupState || !pickupCity)) {
      formErrors.pickupLocation = "Please select both state and city.";
    } else if (searchOption === "airport" && !pickupAirportCode) {
      formErrors.pickupLocation = "Please enter an airport code.";
    }

    // Pick-Up Date & Time Validation
    if (!rentalDate || !rentalTime)
      formErrors.rentalDateTime = "Pick-Up Date & Time are required.";

    // Return Date & Time Validation
    if (!returnDate || !returnTime)
      formErrors.returnDateTime = "Return Date & Time are required.";

    if (sameLocation) {
      // Return Location Validation
      if (searchOption === "cityState") {
        if (!returnState) formErrors.returnState = "Return State is required.";
        if (!returnCity) formErrors.returnCity = "Return City is required.";
      } else if (searchOption === "airport" && !returnAirportCode) {
        formErrors.returnAirportCode = "Airport Code is required.";
      }

      // Ensure either state and city or airport is selected
      if (searchOption === "cityState" && (!returnState || !returnCity)) {
        formErrors.returnLocation = "Please select both state and city.";
      } else if (searchOption === "airport" && !returnAirportCode) {
        formErrors.returnLocation = "Please enter an airport code.";
      }
    }

    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      navigate("/selectLocation");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Box
        sx={{ backgroundColor: "white", boxShadow: 3, borderRadius: 2, p: 3 }}
      >
        <Typography
          variant="h5"
          align="center"
          className="heading"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Book Your Rental Car
        </Typography>
        <Grid container spacing={2}>
          <Grid xs={12} sx={{ mb: 1, mt: 1 }}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                // width: 400,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Google Maps"
                inputProps={{ "aria-label": "search google maps" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                color="primary"
                sx={{ p: "10px" }}
                aria-label="directions"
              >
                <DirectionsIcon />
              </IconButton>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Pick-Up Location
            </Typography>
            <RadioGroup
              row
              value={searchOption}
              onChange={(e) => setSearchOption(e.target.value)}
            >
              <FormControlLabel value="cityState" control={<Radio />} label="City & State" />
              <FormControlLabel value="airport" control={<Radio />} label="Airport Code" />
            </RadioGroup>
            {searchOption === "cityState" && (
              <>
                <Autocomplete
                  value={pickupState}
                  onChange={(event, newValue) => {
                    setPickupState(newValue);
                    setPickupCity("");
                    if (newValue) {
                      fetchCitiesData(newValue.stateId);
                    }
                  }}
                  options={statesData}
                  getOptionLabel={(option) => option.stateName}
                  renderInput={(params) => (
                    <TextField {...params} label="Select State" fullWidth />
                  )}
                />
                {errors.pickupState && (
                  <FormHelperText error>{errors.pickupState}</FormHelperText>
                )}
                <Autocomplete
                  value={pickupCity}
                  onChange={(event, newValue) => {
                    setPickupCity(newValue);
                    if (pickupState && newValue) {
                      fetchHubData(`https://localhost:7223/api/v1/hub?stateName=${pickupState.stateName}&cityName=${newValue}`, setPickupHubData);
                    }
                  }}
                  options={citiesData.map(city => city.cityName)}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField {...params} label="Select City" fullWidth />
                  )}
                  sx={{ mt: 2 }}
                  disabled={!pickupState}
                />
                {errors.pickupCity && (
                  <FormHelperText error>{errors.pickupCity}</FormHelperText>
                )}
              </>
            )}
            {searchOption === "airport" && (
              <TextField
                label="Airport Code"
                fullWidth
                value={pickupAirportCode}
                onChange={(e) => {
                  setPickupAirportCode(e.target.value);
                  fetchHubData(`https://localhost:7223/api/Airport/airport?airportCode=${e.target.value}`, setPickupHubData);
                }}
                sx={{ mt: 2 }}
              />
            )}
            {errors.pickupAirportCode && (
              <FormHelperText error>{errors.pickupAirportCode}</FormHelperText>
            )}
            {errors.pickupLocation && (
              <FormHelperText error>{errors.pickupLocation}</FormHelperText>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Pick-Up Date & Time
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={rentalDate}
                onChange={(newValue) => {
                  setRentalDate(newValue);
                  setReturnDate(newValue.add(1, 'day'));
                }}
                minDate={dayjs()}
                sx={{ width: "100%" }}
              />
              <TimePicker
                value={rentalTime}
                onChange={setRentalTime}
                minTime={dayjs()}
                sx={{ mt: 2, width: "100%" }}
              />
              {errors.rentalDateTime && (
                <FormHelperText error>{errors.rentalDateTime}</FormHelperText>
              )}
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Return Date & Time
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={returnDate}
                onChange={setReturnDate}
                minDate={rentalDate}
                sx={{ width: "100%" }}
              />
              <TimePicker
                value={returnTime}
                onChange={setReturnTime}
                minTime={rentalTime}
                sx={{ mt: 2, width: "100%" }}
              />
              {errors.returnDateTime && (
                <FormHelperText error>{errors.returnDateTime}</FormHelperText>
              )}
            </LocalizationProvider>
          </Grid>

          <Grid
            item
            xs={12}
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ paddingX: 2 }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ flexGrow: 1 }}
            >
              I may drop the car at a different location
            </Typography>
            <Checkbox
              checked={sameLocation}
              onChange={() => setSameLocation(!sameLocation)}
            />
          </Grid>

          {sameLocation && (
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Return Location
              </Typography>
              {searchOption === "cityState" && (
                <>
                  <Autocomplete
                    value={returnState}
                    onChange={(event, newValue) => {
                      setReturnState(newValue);
                      setReturnCity("");
                      if (newValue) {
                        fetchCitiesData(newValue.stateId);
                      }
                    }}
                    options={statesData}
                    getOptionLabel={(option) => option.stateName}
                    renderInput={(params) => (
                      <TextField {...params} label="Select State" fullWidth />
                    )}
                  />
                  {errors.returnState && (
                    <FormHelperText error>{errors.returnState}</FormHelperText>
                  )}
                  <Autocomplete
                    value={returnCity}
                    onChange={(event, newValue) => {
                      setReturnCity(newValue);
                      if (returnState && newValue) {
                        fetchHubData(`http://localhost:8080/api/v1/hub?stateName=${returnState.stateName}&cityName=${newValue}`, setReturnHubData);
                      }
                    }}
                    options={citiesData.map(city => city.cityName)}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField {...params} label="Select City" fullWidth />
                    )}
                    sx={{ mt: 2 }}
                    disabled={!returnState}
                  />
                  {errors.returnCity && (
                    <FormHelperText error>{errors.returnCity}</FormHelperText>
                  )}
                </>
              )}
              {searchOption === "airport" && (
                <TextField
                  label="Airport Code"
                  fullWidth
                  value={returnAirportCode}
                  onChange={(e) => {
                    setReturnAirportCode(e.target.value);
                    fetchHubData(`http://localhost:8080/api/v1/airport?airportCode=${e.target.value}`, setReturnHubData);
                  }}
                  sx={{ mt: 2 }}
                />
              )}
              {errors.returnAirportCode && (
                <FormHelperText error>{errors.returnAirportCode}</FormHelperText>
              )}
              {errors.returnLocation && (
                <FormHelperText error>{errors.returnLocation}</FormHelperText>
              )}
            </Grid>
          )}

          <Grid item xs={12} sx={{ textAlign: "center", mt: 3 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0069D9",
                padding: "12px 24px",
                fontSize: "18px",
                borderRadius: "8px",
              }}
              onClick={handleSubmit}
            >
              Search Rental Cars
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
          Please log in to search for rental cars.
        </Alert>
      </Snackbar>
    </Container>
  );
};
