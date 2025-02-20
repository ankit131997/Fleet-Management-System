import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Client-side password validation
    if (adminUsername === "admin" && adminPassword === "admin@123") {
      localStorage.setItem("isAdmin", true);
      navigate("/AdminDashboard"); // Redirect to dashboard
    } else {
      setError("Invalid Username or Password!");
    }

    try {
      const response = await fetch("http://localhost:8080/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adminUsername, adminPassword }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials or server error");
      }

      const token = await response.text(); // API returns token as a plain string

      if (token) {
        sessionStorage.setItem("adminJwtToken", token);
        sessionStorage.setItem("adminUsername", adminUsername);
        sessionStorage.setItem("isAdminLoggedIn", "true");
        navigate("/AdminDashboard"); // Redirect to Admin Dashboard
        window.location.reload(); // Force reload to update navbar
      } else {
        throw new Error("Token not received");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center min-vh-100"
      style={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&crop=entropy&fit=crop&w=1600&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          WebkitFilter: 'blur(8px)',
          zIndex: -1
        }}
      ></div>
      <Container
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          padding: '30px',
          borderRadius: '15px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}
      >
        <h2 className="mb-4 text-center" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '700', color: '#333' }}>Admin Login</h2>
        {error && <Alert variant="danger" className="w-100 text-center">{error}</Alert>}
        <Form onSubmit={handleSubmit} className="w-100">
          <Form.Group controlId="adminUsername" className="mb-3">
            <Form.Label style={{ fontWeight: '600', color: '#333' }}>Admin Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter admin username"
              value={adminUsername}
              onChange={(e) => setAdminUsername(e.target.value)}
              required
              style={{ padding: '14px', borderRadius: '10px', border: '1px solid #ccc' }}
            />
          </Form.Group>

          <Form.Group controlId="adminPassword" className="mb-3">
            <Form.Label style={{ fontWeight: '600', color: '#333' }}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
              style={{ padding: '14px', borderRadius: '10px', border: '1px solid #ccc' }}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            style={{ backgroundColor: '#007bff', padding: '14px', borderRadius: '10px', fontSize: '18px' }}
          >
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AdminLogin;
