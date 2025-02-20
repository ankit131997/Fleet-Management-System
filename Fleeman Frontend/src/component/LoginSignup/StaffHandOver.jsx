import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Swal from 'sweetalert2'; // Import SweetAlert2

const StaffHandOver = () => {
  const [emailId, setEmailId] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCars, setShowCars] = useState(false);
  const [cars, setCars] = useState([]);

  // Hardcoded data for bookings
  const hardcodedBookings = [
    {
      bookingId: 1,
      firstName: 'Rannu',
      bookingDate: '2024-01-01',
      p_hubId: 1,
      carType: { carTypeId: 1 },
      customer: {
        customerId: 1,
        firstName: 'Rannu',
        lastName: 'PAtel',
        email: 'rannupatel@example.com',
        mobileNumber: '1234567890',
        passportNumber: 'A1234567',
      },
      dailyRate: 50,
      startDate: '2024-01-01',
      endDate: '2024-01-10',
    },
    {
      bookingId: 2,
      firstName: 'Aniket',
      bookingDate: '2024-02-01',
      p_hubId: 2,
      carType: { carTypeId: 2 },
      customer: {
        customerId: 2,
        firstName: 'Aniket',
        lastName: 'Singh',
        email: 'aniket@example.com',
        mobileNumber: '0987654321',
        passportNumber: 'B7654321',
      },
      dailyRate: 60,
      startDate: '2024-02-01',
      endDate: '2024-02-10',
    },
    {
      bookingId: 3,
      firstName: 'ram',
      bookingDate: '2024-03-01',
      p_hubId: 3,
      carType: { carTypeId: 3 },
      customer: {
        customerId: 3,
        firstName: 'ram',
        lastName: 'agrawal',
        email: 'ram@example.com',
        mobileNumber: '1122334455',
        passportNumber: 'C1122334',
      },
    },
  ];

  useEffect(() => {
    // Set the hardcoded bookings when the component mounts
    setBookings(hardcodedBookings);
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/booking/email/${emailId}`);

      if (response.ok) {
        const data = await response.json();
        console.log('API Response - Bookings:', data);
        setBookings(data);
      } else {
        console.error('Failed to fetch bookings:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookingDetails = async (bookingId) => {
    try {
      const response = await fetch(`http://localhost:8080/bookingdetails/booking_id/${bookingId}`);

      if (response.ok) {
        const data = await response.json();
        console.log('API Response - BookingDetails:', data);
        sessionStorage.setItem('bookingDetailsofadon', JSON.stringify(data));

        console.log(sessionStorage.getItem('bookingDetails'));
      } else {
        console.error('Failed to fetch BookingDetails:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching BookingDetails:', error);
    }
  };

  const deleteBooking = async () => {
    try {
      const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails'));
      if (bookingDetails && bookingDetails.bookingId) {
        // Fetch BookingDetails using bookingId from session storage

        const response = await fetch(`http://localhost:8080/api/deletebooking/${bookingDetails.bookingId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log('Booking deleted successfully.');
        } else {
          console.error('Failed to delete booking:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const fetchCars = async (hub, cartype) => {
    try {
      setLoading(true);
      const CarType_ID = cartype;
      const hub_id = hub;
      console.log('hub - ', hub);
      console.log('carTypeId - ', CarType_ID);

      const response = await fetch(`http://localhost:8080/car/${hub_id}/${cartype}`);

      if (response.ok) {
        const data = await response.json();
        console.log('API Response - Cars:', data);
        setCars(data);
        setShowCars(true);
      } else {
        console.error('Failed to fetch cars:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const storeBookingInSessionStorage = (booking) => {
    sessionStorage.setItem('bookingDetails', JSON.stringify(booking));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchBookings();
  };

  const handleBookButtonClick = async (booking) => {
    if (booking.p_hubId && booking.carType && booking.carType.carTypeId) {
      // Show SweetAlert2 confirmation
      Swal.fire({
        title: 'Booking Confirm!',
        icon: 'success',
        draggable: true,
      }).then((result) => {
        if (result.isConfirmed) {
          // Store booking in sessionStorage
          storeBookingInSessionStorage(booking);
          // Fetch cars based on hub and car type
          fetchCars(booking.p_hubId, booking.carType.carTypeId);
          // Redirect to home page after 2 seconds
          setTimeout(() => {
            // window.location.href = '/';
          }, 2000);
        }
      });
    } else {
      console.error('Invalid booking data:', booking);
    }
  };

  const handleSelectButtonClick = async (selectedCar) => {
    try {
      setLoading(true);

      // Store selected car in sessionStorage
      sessionStorage.setItem('selectedCar', JSON.stringify(selectedCar));

      const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails'));
      if (bookingDetails && bookingDetails.bookingId) {
        // Fetch BookingDetails using bookingId from session storage
        await fetchBookingDetails(bookingDetails.bookingId);

        // Update car availability
        const response = await fetch(`http://localhost:8080/car/update/${selectedCar.carId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ is_Available: 'N' }),
        });

        if (response.ok) {
          console.log('Car availability updated successfully.');

          console.log("deleting--- ", bookingDetails.bookingId);
          // Delete booking data from the booking table
          await deleteBooking(bookingDetails.bookingId);

          const updatedCars = cars.map((car) =>
            car.carId === selectedCar.carId ? { ...car, is_Available: 'N' } : car
          );
          setCars(updatedCars);
          createAndSendInvoice();
        } else {
          console.error('Failed to update car availability:', response.statusText);
        }
      } else {
        console.error('Invalid booking data in session storage:', bookingDetails);
      }
    } catch (error) {
      console.error('Error updating car availability:', error);
    } finally {
      setLoading(false);
    }
  };

  function calculateTotalAmount(startDate, endDate, dailyRate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = (end - start) / (1000 * 60 * 60 * 24);
    return days * dailyRate;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('.')[0];
    return formattedDate;
  }

  function createAndSendInvoice() {
    // Retrieve data from sessionStorage
    const selectedCar = JSON.parse(sessionStorage.getItem('selectedCar'));
    const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails'));

    // Ensure selectedCar is retrieved correctly
    if (!selectedCar) {
      console.error('Error: selectedCar is undefined');
      return;
    }

    // Extract relevant information from bookingDetails
    const customer = bookingDetails.customer;
    const rentalAmount = bookingDetails.dailyRate; // Assuming rental amount is based on daily rate
    const totalAmount = calculateTotalAmount(bookingDetails.startDate, bookingDetails.endDate, rentalAmount);
    const totalAddonAmount = 0; // Assuming no addons for now

    // Format dates
    const formattedStartDate = formatDate(bookingDetails.startDate);
    const formattedEndDate = formatDate(bookingDetails.endDate);

    // Get current date and format it
    const formattedCurrentDate = formatDate(new Date().toISOString());

    // Create the invoice object
    const invoice = {
      empName: 'ADMIN',
      cName: `${customer.firstName} ${customer.lastName}`,
      cEmailId: customer.email,
      cMobileNo: customer.mobileNumber,
      cAadharNo: '1234566', // You need to get this information from somewhere
      cPassNo: customer.passportNumber,
      rentalAmount: rentalAmount,
      totalAmount: totalAmount,
      totalAddonAmount: totalAddonAmount,
      rate: rentalAmount,
      startDate: formattedStartDate,
      handoverDate: formattedCurrentDate,
      endDate: formattedEndDate,
      bookid: bookingDetails.bookingId,
      carid: selectedCar.carId, // Ensure selectedCar.carId is not undefined
      customerid: customer.customerId,
      p_hubId: bookingDetails.p_hubId,
      r_hubId: bookingDetails.r_hubId,
      isReturned: 'N', // Assuming the car is returned at the end of the rental period
    };

    console.log('Invoice:', invoice);
    // Send data to server
    fetch('http://localhost:8080/invoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoice),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse response JSON
        } else {
          throw new Error('Failed to send invoice: ' + response.statusText);
        }
      })
      .then((data) => {
        // Assuming the server responds with session data in JSON format
        // Store the session data in the browser's session storage
        sessionStorage.setItem('InvoiceData', JSON.stringify(data));
        console.log('Invoice sent successfully and session data stored:');
        sendInvoiceDetails();
      })
      .catch((error) => {
        console.error('Error sending invoice:', error);
      });
  }

  function sendInvoiceDetails() {
    // Parse the bookingDetails from sessionStorage
    const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetailsofadon'));
    const invoiceData = JSON.parse(sessionStorage.getItem('InvoiceData'));

    // Loop through each addon in the bookingDetails
    bookingDetails.forEach((detail) => {
      // Create the data object
      const data = {
        invoice_id: invoiceData.invoiceId,
        addon_id: detail.addonId,
        amt: detail.addonRate,
      };

      // Send data to server
      fetch('http://localhost:8080/Invoice_details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            console.log('Data sent successfully for addon_id:', detail.addonId);

            // Show SweetAlert2 success notification
            Swal.fire({
              title: 'Handover Successful!',
              icon: 'success',
              draggable: true,
            });

            // Redirect to home after 5 seconds
            setTimeout(function () {
              window.location.href = '/StaffPage';
            }, 5000);
          } else {
            console.error('Failed to send data for addon_id:', detail.addonId, 'Response:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error sending data for addon_id:', detail.addonId, 'Error:', error);
        });
    });
  }

  return (
    <Container
      fluid
      className="p-0"
      style={{
        backgroundImage: 'url("https://images.pexels.com/photos/4467735/pexels-photo-4467735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <div
        className="container mt-0 text-center"
        style={{
          width: '50%',
          margin: '50px auto',
          opacity: 0.9,
          background: 'linear-gradient(45deg, black, transparent)',
          color: 'ButtonHighlight',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <h2>Enter Customer's Email</h2>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Submit
          </button>
        </form>
        {loading && <p>Loading...</p>}

        {bookings.length > 0 && (
          <div>
            <h3>Bookings</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Booking Id</th>
                  <th>First Name</th>
                  <th>Booking Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.bookingId}</td>
                    <td>{booking.firstName}</td>
                    <td>{booking.bookingDate}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => handleBookButtonClick(booking)}
                      >
                        Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showCars && (
          <div>
            <h3>Cars</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Car ID</th>
                  <th>Car Name</th>
                  <th>Car Number</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car.carId}>
                    <td>{car.carId}</td>
                    <td>{car.carName}</td>
                    <td>{car.numberPlate}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleSelectButtonClick(car)}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Container>
  );
};

export default StaffHandOver;