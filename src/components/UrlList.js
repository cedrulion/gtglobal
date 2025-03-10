import React from 'react';

const UrlList = ({ urls }) => {
  return (
    <div>
      <h2>Your URLs</h2>
      <ul>
        {urls.map((url) => (
          <li key={url._id}>
            <a href={`http://localhost:5000/${url.shortCode}`} target="_blank" rel="noopener noreferrer">
              {url.shortCode}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrlList;