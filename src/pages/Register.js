import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    
    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        username,
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
      console.error('Registration error:', error);
      setError(
        error.response?.data?.message || 
        'Registration failed. Please try again with different information.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">

      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">Create your account</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-white font-medium mb-2">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Choose a username"
                className="w-full border border-gray-600 rounded-md py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
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
              <label htmlFor="password" className="block text-white font-medium mb-2">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                className="w-full border border-gray-600 rounded-md py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
              />
              <p className="text-xs text-gray-400 mt-1">Must be at least 6 characters</p>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-white font-medium mb-2">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="w-full border border-gray-600 rounded-md py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="mt-2">
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-md transition duration-150 ease-in-out"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-orange-500 hover:text-orange-600 font-medium">
                Log in
              </Link>
            </p>
          </div>
       
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;