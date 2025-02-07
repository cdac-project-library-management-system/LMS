import React, { useState } from 'react';
import { Form, Button, Card, Alert, Spinner, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import '../../../styles/user/Auth.module.css';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      alert('Registration Successful! Redirecting...');
    }, 2000);
  };

  return (
    <Container fluid className="auth-container d-flex align-items-center justify-content-center">
      <Row className="justify-content-center w-100 mt-5 mb-5">
        <Col md={6} xs={12} className="d-flex justify-content-center">
          <Card className="auth-card w-100 p-4 shadow-lg rounded">
            <Card.Body>
              <h2 className="text-center card-title text-primary">Sign Up</h2>
              <p className="text-center text-muted mb-4">Create your account to get started</p>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                {/* Name Field */}
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter your full name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </Form.Group>

                {/* Email Field */}
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

                {/* Phone Number Field */}
                <Form.Group controlId="formPhone" className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter phone number" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    required
                  />
                </Form.Group>

                {/* Date of Birth Field */}
                <Form.Group controlId="formDob" className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control 
                    type="date" 
                    value={dob} 
                    onChange={(e) => setDob(e.target.value)} 
                    required
                  />
                </Form.Group>

                {/* Address Field */}
                <Form.Group controlId="formAddress" className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="Enter your address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    required
                  />
                </Form.Group>

                {/* Gender Field */}
                <Form.Group controlId="formGender" className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control 
                    as="select" 
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)} 
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Control>
                </Form.Group>

                {/* Profile Picture Upload */}
                <Form.Group controlId="formProfilePic" className="mb-3">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control 
                    type="file" 
                    onChange={(e) => setProfilePic(e.target.files[0])} 
                    accept="image/*"
                  />
                </Form.Group>

                {/* Password Field */}
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

                {/* Confirm Password Field */}
                <Form.Group controlId="formConfirmPassword" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup>
                    <Form.Control 
                      type={showConfirmPassword ? 'text' : 'password'} 
                      placeholder="Re-enter password" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      required 
                    />
                    <Button variant="outline-secondary" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                {/* Submit Button */}
                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : 'Register'}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <span>Already have an account? </span>
                <Link to="/login" className="text-primary">Login here</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
