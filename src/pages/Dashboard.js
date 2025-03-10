import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [longUrl, setLongUrl] = useState('');
  const [updateUrlId, setUpdateUrlId] = useState(null);
  const [updateLongUrl, setUpdateLongUrl] = useState('');
  const location = useLocation();

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const urlParam = params.get('url');
  if (urlParam) {
    setLongUrl(urlParam);
    handleShorten(urlParam);
  }
  fetchUrls();
}, [location, handleShorten]);

  const fetchUrls = async () => {
    try {
      const response = await fetch('http://localhost:5000/url/urls', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      setUrls(data);
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  };

  const handleShorten = async (url) => {
    try {
      const response = await fetch('http://localhost:5000/url/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ longUrl: url }),
      });
      const data = await response.json();
      setUrls([data, ...urls]);
      setLongUrl('');
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleShorten(longUrl);
  };

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    alert('Copied to clipboard!');
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/url/urls/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ longUrl: updateLongUrl }),
      });
      const data = await response.json();
      setUrls(urls.map(url => (url._id === id ? data : url)));
      setUpdateUrlId(null);
      setUpdateLongUrl('');
    } catch (error) {
      console.error('Error updating URL:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/url/urls/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUrls(urls.filter(url => url._id !== id));
    } catch (error) {
      console.error('Error deleting URL:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-orange-500">
      <header className="bg-gray-800 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-orange-500 font-bold text-2xl hover:text-orange-400 transition-colors">
            bitly
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Welcome, User!</span>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
              }}
              className="text-orange-500 hover:text-orange-400 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-orange-500">Shorten a URL</h2>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input
              type="url"
              placeholder="Paste a long URL"
              className="flex-grow border border-gray-700 rounded-md p-3 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:border-orange-500"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-orange-500 text-white font-medium px-6 py-3 rounded-md hover:bg-orange-600 transition-colors"
            >
              Shorten
            </button>
          </form>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6 text-orange-500">Your shortened URLs</h2>

          {urls.length === 0 ? (
            <p className="text-gray-400">You haven't shortened any URLs yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">
                      Original URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">
                      Short URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">
                      Clicks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {urls.map((url, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 truncate max-w-xs">
                        {url.longUrl}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-500 hover:text-orange-400 transition-colors">
                        <a href={url.longUrl} target="_blank" rel="noopener noreferrer">
                          {url.shortCode}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {url.clicks || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {new Date(url.createdAt || Date.now()).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-4">
                        <button
                          onClick={() => {
                            setUpdateUrlId(url._id);
                            setUpdateLongUrl(url.longUrl);
                          }}
                          className="text-orange-500 hover:text-orange-400 transition-colors"
                        >
                          Edit
                        </button>
                        {updateUrlId === url._id && (
                          <div>
                            <input
                              type="url"
                              value={updateLongUrl}
                              onChange={(e) => setUpdateLongUrl(e.target.value)}
                              required
                              className="border border-gray-700 rounded-md p-1 bg-gray-700 text-gray-300"
                            />
                            <button
                              onClick={() => handleUpdate(url._id)}
                              className="bg-orange-500 text-white font-medium px-2 py-1 rounded-md hover:bg-orange-600 transition-colors"
                            >
                              Update
                            </button>
                          </div>
                        )}
                        <button
                          onClick={() => handleDelete(url._id)}
                          className="text-red-500 hover:text-red-400 transition-colors"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleCopy(`http://localhost:5000/url/${url.shortCode}`)}
                          className="text-orange-500 hover:text-orange-400 transition-colors"
                        >
                          Copy
                        </button>
                        <Link
                          to={`/analytics/${url.shortCode}`}
                          className="text-orange-500 hover:text-orange-400 transition-colors"
                        >
                          Analytics
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;