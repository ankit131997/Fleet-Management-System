import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Hardcoded credentials for testing
    if (username === "user1" && password === "user@154") {
      localStorage.setItem("isAdmin", true);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/"); // Redirect to dashboard after the alert
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials or server error");
      }

      const token = await response.text(); // API returns token as a plain string

      if (token) {
        sessionStorage.setItem("jwtToken", token);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("isLoggedIn", "true");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/"); // Redirect to homepage after the alert
          window.location.reload(); // Force reload to update navbar
        });
      } else {
        throw new Error("Token not received");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "400px", backgroundColor: "#333333", color: "white", padding: "20px", borderRadius: "8px" }}>
      <h2 className="text-center mb-4">Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
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

        <Button variant="primary" type="submit" className="w-100 mt-4">
          Login
        </Button>
      </Form>
      <div className="text-center mt-3">
        <Button variant="link" onClick={() => navigate("/Signup")}>
          Register
        </Button>
      </div>
    </Container>
  );
}

export default Login;