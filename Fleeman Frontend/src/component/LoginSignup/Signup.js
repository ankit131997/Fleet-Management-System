import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Client-side validation for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Client-side validation for password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,15}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be 8-15 characters long and include uppercase, lowercase, and special characters.");
      return;
    }

    if (password !== rePassword) {
      setError("Password and re-entered password do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed!");
      }

      setSuccess("Signup successful! Redirecting to login...");
      Toast.fire({
        icon: "success",
        title: "Signed up successfully"
      });
      setTimeout(() => navigate("/login"), 2000);
      
      setEmail("");
      setUsername("");
      setPassword("");
      setRePassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "400px", backgroundColor: "#333333", color: "white", padding: "20px", borderRadius: "8px" }}>
      <h2 className="text-center mb-4">Signup</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="username" className="mt-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="rePassword" className="mt-3">
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            required
          />
        </Form.Group>

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {success && <Alert variant="success" className="mt-3">{success}</Alert>}

        <Button
          variant="primary"
          type="submit"
          className="w-100 mt-4"
          disabled={loading}
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Signup"}
        </Button>
      </Form>
    </Container>
  );
}

export default Signup;