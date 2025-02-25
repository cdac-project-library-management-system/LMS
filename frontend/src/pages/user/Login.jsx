import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import LoginForm from '../../components/user/auth/LoginForm';
import { getUserInfo } from '../../services/api';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setError('');
    try {
      await AuthService.login(email, password); // Get role after login
      const object = getUserInfo(); 
      // console.log(role); // for debugging
      if (object.role === 'ROLE_ADMIN') {
        navigate('/admin/Dashboard'); // Redirect admin
      } else if (object.role === 'ROLE_USER') {
        navigate('/home'); // Redirect normal user
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