import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/userService';
import RegisterForm from '../../components/user/auth/RegisterForm';

const Register = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (userData) => {
    setError('');
    const response = await register(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.phone,
      userData.password,
      userData.address,
      userData.enrollment
    );

    if (response.status === 'error') {
      setError(response.error.response?.data?.message || 'Registration failed');
    } else {
      navigate('/login'); // Redirect after successful registration
    }
  };

  return (
    <div className="register-page">
      {error && <p className="error">{error}</p>}
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default Register;
