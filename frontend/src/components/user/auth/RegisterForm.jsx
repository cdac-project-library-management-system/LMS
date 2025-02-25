import React, { useState } from 'react';
import { Form, Button, Card, Alert, Spinner, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import AuthService from '../../../services/AuthService';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file)); // Preview image
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const formData = new FormData();
    formData.append('fullName', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phoneNumber', phone);
    formData.append('address', address);
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    setLoading(true);

    try {
      await AuthService.register(formData);
      toast.success('User registered successfully!', { position: 'top-right', autoClose: 3000 }); // Toastify success message
      setTimeout(() => {
        navigate('/login'); // Redirect to login after 3 seconds
      }, 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
      toast.error('Registration failed!', { position: 'top-right', autoClose: 3000 }); // Toastify error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="auth-container d-flex align-items-center justify-content-center">
      <Row className="justify-content-center w-100 mt-5 mb-5">
        <Col md={6} xs={12} className="d-flex justify-content-center">
          <Card className="auth-card w-100 p-4 shadow-lg rounded">
            <Card.Body>
              <h2 className="text-center card-title">Sign Up</h2>
              <p className="text-center text-muted mb-4">Create your account to get started</p>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
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

                <Form.Group controlId="formProfilePic" className="mb-3">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control 
                    type="file" 
                    accept="image/*"
                    onChange={handleProfilePicChange} 
                  />
                  {previewUrl && (
                    <div className="mt-2 text-center">
                      <img src={previewUrl} alt="Profile Preview" className="rounded-circle" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                    </div>
                  )}
                </Form.Group>

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
