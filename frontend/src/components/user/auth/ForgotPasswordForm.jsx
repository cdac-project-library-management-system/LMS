import React, { useState } from "react";
import { Form, Button, Card, Alert, Spinner, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../styles/user/Auth.module.css";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Simulating an API call
    setTimeout(() => {
      setLoading(false);
      setSuccess("Password reset link sent to your email!");
    }, 3000);
  };

  return (
    <Container fluid className="auth-container d-flex align-items-center justify-content-center">
      <Row className="justify-content-center w-100 mt-5 mb-5">
        <Col md={6} xs={12} className="d-flex justify-content-center">
          <Card className="auth-card w-100 p-4 shadow-lg rounded">
            <Card.Body>
              <h2 className="text-center card-title text-primary">Forgot Password</h2>
              <p className="text-center text-muted mb-4">
                Enter your email to receive a password reset link
              </p>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : "Send Reset Link"}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <Link to="/login" className="text-primary">Back to Login</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPasswordForm;
