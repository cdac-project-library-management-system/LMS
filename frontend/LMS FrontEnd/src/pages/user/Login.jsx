import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import LoginForm from '../../components/user/auth/LoginForm';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setError('');
    try {
      const role = await AuthService.login(email, password); // Get role after login
  
      if (role === 'ROLE_ADMIN') {
        navigate('/admin/Dashboard'); // Redirect admin
      } else if (role === 'ROLE_USER') {
        navigate('/'); // Redirect normal user
      } else {
        setError('Invalid role detected.'); // Handle unknown roles
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed'); // Handle errors
    }
  };

  return (
    <div className="login-page">
      {error && <p className="error">{error}</p>}
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default Login;