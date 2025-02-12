import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextField, Autocomplete, Container, Grid, Box } from "@mui/material";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import { Navbar } from "../Navbar";
import { BookingForm } from "./BookingForm";
import { HeroSection } from "./HeroSection";

const HomePage = () => (
  <Box sx={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
    <HeroSection />
    <BookingForm />
  </Box>
);

export default HomePage;
