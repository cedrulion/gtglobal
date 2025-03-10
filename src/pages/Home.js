import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [longUrl, setLongUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // This would typically redirect to dashboard with the URL to shorten
    window.location.href = `/dashboard?url=${encodeURIComponent(longUrl)}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with navigation */}
      <header className="py-4 px-6 border-b">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-orange-500 font-bold text-3xl">bitly</div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="relative group">
              <button className="flex items-center space-x-1 font-medium">
                <span>Platform</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
            </div>
            <div className="relative group">
              <button className="flex items-center space-x-1 font-medium">
                <span>Solutions</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
            </div>
            <button className="font-medium">Pricing</button>
            <div className="relative group">
              <button className="flex items-center space-x-1 font-medium">
                <span>Resources</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
            </div>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center border rounded-full px-3 py-1">
              <span className="mr-1">EN</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
            <Link to="/login" className="text-blue-600 font-medium">Log in</Link>
            <Link to="/pricing" className="bg-blue-600 text-white font-medium px-4 py-2 rounded-md">Get a Quote</Link>
            <Link to="/register" className="bg-blue-600 text-white font-medium px-4 py-2 rounded-md">Sign up Free</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-5xl font-bold mb-6">Build stronger digital connections</h1>
          <p className="text-xl mb-12 max-w-4xl mx-auto">
            Use our URL shortener, QR Codes, and landing pages to engage your audience and connect them to the right
            information. Build, edit, and track everything inside the Bitly Connections Platform.
          </p>

          {/* URL Shortener Box */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg overflow-hidden">
            <div className="flex">
              <button className="flex-1 bg-white text-black p-4 flex items-center justify-center border-b-2 border-blue-600">
                <div className="p-2 bg-orange-100 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                </div>
                <span className="font-medium">Short link</span>
              </button>
              <button className="flex-1 bg-gray-100 text-black p-4 flex items-center justify-center">
                <div className="p-2 bg-white border rounded-md mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <rect x="7" y="7" width="3" height="3"></rect>
                    <rect x="14" y="7" width="3" height="3"></rect>
                    <rect x="7" y="14" width="3" height="3"></rect>
                    <rect x="14" y="14" width="3" height="3"></rect>
                  </svg>
                </div>
                <span className="font-medium">QR Code</span>
              </button>
            </div>

            {/* URL Input Form */}
            <div className="p-8 bg-white text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Shorten a long link</h2>
              <p className="text-gray-600 mb-6">No credit card required.</p>
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                <input
                  type="url" 
                  placeholder="Paste a long URL" 
                  className="flex-grow border border-gray-300 rounded-md p-3"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  required
                />
                <button type="submit" className="bg-blue-600 text-white font-medium px-6 py-3 rounded-md whitespace-nowrap">
                  Shorten
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;