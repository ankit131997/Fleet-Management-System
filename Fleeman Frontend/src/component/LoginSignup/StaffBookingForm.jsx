import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const StaffBookingForm = () => {
    const [formData, setFormData] = useState({
        r_firstName: 'Rannu',
        r_lastName: 'Patel',
        r_addressLine1: '123 Main St',
        r_addressLine2: '',
        r_email: 'rannupatel@example.com',
        r_city: 'Mumbai',
        r_pincode: '440049',
        r_phoneNumber: '1234567890',
        r_mobileNumber: '9876543210',
        r_creditCardType: 'Visa',
        r_creditCardNumber: '**** **** **** 1234',
        r_drivingLicenseNumber: 'DL-12345678',
        r_idpNumber: 'IND-98765432',
        r_issuedByDL: 'India',
        r_validThroughDL: '',
        r_passportNumber: 'P123456789',
        r_passportValidThrough: '',
        r_passportIssuedBy: 'India',
        r_passportValidFrom: '',
        r_passportIssueDate: '',
        r_dateOfBirth: '1990-01-01',
    });

    sessionStorage.setItem('continuekaro', true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const isStaff = sessionStorage.getItem('staff') === 'true';
            if (isStaff) {
                window.location.href = '/ConfirmBooking';
            } else {
                const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
                if (isLoggedIn) {
                    window.location.href = '/ConfirmBooking';
                } else {
                    window.location.href = '/LoginComponent';
                }
            }
            sessionStorage.setItem('customerFormData', JSON.stringify(formData));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container fluid className="p-0" style={{ backgroundImage: `url("https://img.freepik.com/free-vector/carsharing-service-abstract-concept-illustration_335657-1845.jpg?w=740&t=st=1708938791~exp=1708939391~hmac=7663afa8ab3150a9332d4bd94f925e25552ca9fd76f54680c703a8cfa3a31a03")`, backgroundSize: 'cover', minHeight: '100vh' }}>
            <Row>
                <Col md={{ span: 6, offset: 6 }}>
                    <div className="card" style={{ width: '70%', margin: '0 auto', opacity: 0.9, background: 'linear-gradient(30deg, skyblue, transparent)', color: 'black', marginTop: '20px', marginBottom: '20px', fontSize: '18px', border: 'solid' }}>
                        <div className="card-body">
                            <h2 className="mb-4 text-center">Booking Information Page</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="firstName">
                                    <Form.Label>First Name:</Form.Label>
                                    <Form.Control type="text" name="r_firstName" value={formData.r_firstName} onChange={handleChange} disabled />
                                </Form.Group>
                                <Form.Group controlId="lastName">
                                    <Form.Label>Last Name:</Form.Label>
                                    <Form.Control type="text" name="r_lastName" value={formData.r_lastName} onChange={handleChange} disabled />
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control type="email" name="r_email" value={formData.r_email} onChange={handleChange} disabled />
                                </Form.Group>
                                <Form.Group controlId="city">
                                    <Form.Label>City:</Form.Label>
                                    <Form.Control type="text" name="r_city" value={formData.r_city} onChange={handleChange} disabled />
                                </Form.Group>
                                <Form.Group controlId="pincode">
                                    <Form.Label>Pincode:</Form.Label>
                                    <Form.Control type="text" name="r_pincode" value={formData.r_pincode} onChange={handleChange} disabled />
                                </Form.Group>
                                <Form.Group controlId="creditCardType">
                                    <Form.Label>Credit Card Type:</Form.Label>
                                    <Form.Control type="text" name="r_creditCardType" value={formData.r_creditCardType} onChange={handleChange} disabled />
                                </Form.Group>
                                <Form.Group controlId="creditCardNumber">
                                    <Form.Label>Credit Card Number:</Form.Label>
                                    <Form.Control type="text" name="r_creditCardNumber" value={formData.r_creditCardNumber} onChange={handleChange} disabled />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="mt-3 w-100">Continue</Button>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default StaffBookingForm;
