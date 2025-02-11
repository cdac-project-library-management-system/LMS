import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/user';
import LoginForm from '../../components/user/auth/LoginForm';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setError('');
    const response = await login(email, password);
    
    if (response.status === 'error') {
      setError(response.error.response?.data?.message || 'Login failed');
    } else {
      sessionStorage.setItem('token', response.token);
      navigate('/dashboard'); // Redirect after login
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
