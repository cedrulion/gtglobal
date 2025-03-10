import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        
        // Check if there's a pending URL to shorten
        const pendingUrl = sessionStorage.getItem('pendingUrl');
        if (pendingUrl) {
          sessionStorage.removeItem('pendingUrl');
          navigate('/dashboard?url=' + encodeURIComponent(pendingUrl));
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(
        error.response?.data?.message || 
        'Login failed. Please check your credentials and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">

      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">Log in to your account</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-white font-medium mb-2">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-600 rounded-md py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-white font-medium">Password</label>
                <Link to="/forgot-password" className="text-sm text-orange-500 hover:text-orange-600">Forgot password?</Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-600 rounded-md py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-md transition duration-150 ease-in-out"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-orange-500 hover:text-orange-600 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;