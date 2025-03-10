import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('token');

  // Only show this header on pages that are not Home or Dashboard
  // Since those pages have their own header implementations
  if (location.pathname === '/' || location.pathname === '/dashboard') {
    return null;
  }

  return (
    <header className="bg-white shadow-sm py-4 px-6 border-b">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-orange-500 font-bold text-3xl">bitly</Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium">Home</Link>
          {isLoggedIn ? (
            <Link to="/dashboard" className="font-medium">Dashboard</Link>
          ) : null}
          <Link to="/pricing" className="font-medium">Pricing</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          {isLoggedIn ? (
            <button 
              onClick={() => {localStorage.removeItem('token'); window.location.href = '/login';}}
              className="text-blue-600 font-medium"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 font-medium">Log in</Link>
              <Link to="/register" className="bg-blue-600 text-white font-medium px-4 py-2 rounded-md">Sign up Free</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;