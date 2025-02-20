import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./component/HomePage/HomePage";
import AdminLogin from "./component/LoginSignup/AdminLogin";
import Selectlocation from "./component/SelectLocation/Selectlocation";
import SelectCarOption from "./component/SelectCarOption/SelectCarOption";
import Login from "./component/LoginSignup/Login";
import Signup from "./component/LoginSignup/Signup";
import AdminDashboard from "./component/HomePage/AdminDashboard";
import NavBar from "./component/Navbar";
import RentalAddons from "./component/SelectLocation/RentalAddons";
import RentalForm from "./component/SelectCarOption/RentalForm";
import MembershipRegistration from "./component/Membarship/MembershipRegistration";
import StaffBookingForm from "./component/LoginSignup/StaffBookingForm";
import StaffHandOver from "./component/LoginSignup/StaffHandOver";
import { BookingForm } from "./component/HomePage/BookingForm";
import ReviewDetails from "./component/SelectCarOption/ReviewDetails";
import ModifyCancelBooking from "./component/Membarship/ModifyCancelBooking";
import ConfirmationBooking from "./component/SelectCarOption/ConfirmationBooking";



function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/selectLocation" element={<Selectlocation />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/SelectCarOption" element={<SelectCarOption />} />
        <Route path="/RentalAddons" element={<RentalAddons />} />
        <Route path="/RentalForm" element={<RentalForm />} />
        <Route path="/ReviewDetails" element={<ReviewDetails />} />

        <Route path="/membership" element={<MembershipRegistration />} />
        <Route  path="/booking" element={<StaffBookingForm />}  />
        <Route path="/handover" element={<StaffHandOver />} />
        <Route path ="modify-booking"  element={<ModifyCancelBooking/>}   />
        <Route path="/confirmation-booking" element={<ConfirmationBooking/>} />

        

      </Routes>
    </Router>
  );
}

export default App;
