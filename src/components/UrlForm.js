import React, { useState } from 'react';

const UrlForm = ({ onShorten }) => {
  const [longUrl, setLongUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onShorten(longUrl);
    setLongUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />
      <button type="submit">Shorten</button>
    </form>
  );
};

export default UrlForm;