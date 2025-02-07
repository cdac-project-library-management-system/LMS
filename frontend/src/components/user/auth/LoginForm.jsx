import React, { useState } from 'react';
import { Form, Button, Card, Alert, Spinner, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (err) {
      setError('Invalid credentials, please try again.');
      setLoading(false);
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center align-items-center vh-100">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="login-card">
            <Card.Body>
              <h2 className="text-center card-title">Welcome to Library</h2>
              <p className="text-center text-muted">Sign in as User</p>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                {/* Email */}
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

                {/* Password with Toggle */}
                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="Enter password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                    />
                    <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <Link to="/forgot-password" className="text-secondary-custom">Forgot Password?</Link>
              </div>
              <div className="text-center mt-2">
                <span>New here? </span>
                <Link to="/register" className="text-secondary-custom">Create an Account</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;