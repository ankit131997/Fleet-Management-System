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
    <Container className="mt-5" style={{ maxWidth: "400px", backgroundColor: "#333333", color: "white", padding: "20px", borderRadius: "8px" }}>
      <h2 className="text-center mb-4">Admin Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="adminUsername">
          <Form.Label>Admin Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter admin username"
            value={adminUsername}
            onChange={(e) => setAdminUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="adminPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-4">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default AdminLogin;