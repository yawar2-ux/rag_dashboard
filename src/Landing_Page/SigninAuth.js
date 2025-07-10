import { useState } from 'react';

// Custom hook for authentication
const useSigninAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const authenticateUser = async (username, password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/rag_doc/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          data: data
        };
      } else {
        return {
          success: false,
          message: data.message || data.detail || 'Invalid credentials'
        };
      }
    } catch (error) {
      console.error('Authentication error:', error);
      return {
        success: false,
        message: 'Connection error. Please check if the server is running.'
      };
    }
  };

  const handleSignIn = async (username, password) => {
    setLoading(true);
    setError('');
    setSuccess('');

    if (!username || !password) {
      setError('Please enter both username and password');
      setLoading(false);
      return;
    }

    try {
      const result = await authenticateUser(username, password);

      if (result.success) {
        setSuccess('Login successful! Redirecting to dashboard...');
        
        // Store user data
        localStorage.setItem('user', JSON.stringify(result.data));
        localStorage.setItem('isAuthenticated', 'true');
        
        // Redirect to dashboard
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
        
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSignIn,
    loading,
    error,
    success,
    setError,
    setSuccess
  };
};

export default useSigninAuth;

