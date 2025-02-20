import React, { useState, useEffect } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function RentalAddons() {
  const [gps, setGps] = useState(false);
  const [campingKit, setCampingKit] = useState(false);
  const [enableChildSeats, setEnableChildSeats] = useState(false);
  const [childSeats, setChildSeats] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [addons, setAddons] = useState([]); // Added missing state
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch add-ons when the component mounts
    const fetchAddons = async () => {
      try {
        const response = await fetch("http://localhost:8080/addon");
        if (response.ok) {
          const data = await response.json();
          sessionStorage.setItem("addons", JSON.stringify(data));
          setAddons(data);
        } else {
          console.error("Failed to fetch addons");
        }
      } catch (error) {
        console.error("Error fetching addons:", error);
      }
    };

    fetchAddons();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let amount = 0;
    const addOns = [];
    navigate('/RentalForm')
    if (gps) {
      amount += 100;
      addOns.push({
        add_on_name: "GPS",
        add_on_daily_rate: 100,
        rate_valid_until: new Date().toISOString(),
      });
    }
    if (campingKit) {
      amount += 300;
      addOns.push({
        add_on_name: "Camping Kit",
        add_on_daily_rate: 300,
        rate_valid_until: new Date().toISOString(),
      });
    }
    if (enableChildSeats && childSeats > 0) {
      amount += Math.max(0, childSeats - 1) * 200; // Fixed calculation
      addOns.push({
        add_on_name: "Child Seats",
        add_on_daily_rate: Math.max(0, childSeats - 1) * 200,
        rate_valid_until: new Date().toISOString(),
      });
    }
    setTotalAmount(amount);
    sessionStorage.setItem("addons", JSON.stringify(addOns));
    var obj = JSON.parse(sessionStorage.addons);

  };

  const handleCancel = () => {
    setGps(false);
    setCampingKit(false);
    setEnableChildSeats(false);
    setChildSeats(0);
    setTotalAmount(0);
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Rental Add-ons</h2>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="gps">
              <Form.Check
                type="checkbox"
                label="GPS Navigation System - Rs.100/day"
                checked={gps}
                onChange={(e) => setGps(e.target.checked)}
              />
            </Form.Group>

            <Form.Group controlId="campingKit">
              <Form.Check
                type="checkbox"
                label="Camping Kit - Rs.300/day"
                checked={campingKit}
                onChange={(e) => setCampingKit(e.target.checked)}
              />
            </Form.Group>

            <Form.Group controlId="enableChildSeats" className="mt-3">
              <Form.Check
                type="checkbox"
                label="Child Seats - Rs.200/day (1 seat free)"
                checked={enableChildSeats}
                onChange={(e) => setEnableChildSeats(e.target.checked)}
              />
            </Form.Group>

            {enableChildSeats && (
              <Form.Group controlId="childSeats" className="mt-3">
                <Form.Label>Number of Seats</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter number of seats"
                  value={childSeats}
                  onChange={(e) => setChildSeats(parseInt(e.target.value) || 0)}
                  min="0"
                />
              </Form.Group>
            )}

            <div className="d-flex justify-content-between mt-4" style={{ gap: "1rem" }}>
              <Button variant="primary" type="submit">
                Continue Booking
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>

          {/* Display Total Amount */}
          {totalAmount > 0 && (
            <div className="mt-3 text-center">
              <h5>Total Amount: Rs.{totalAmount}</h5>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RentalAddons;
