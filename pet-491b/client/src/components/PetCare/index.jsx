import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; 

const YelpSearch = () => {
  const [location, setLocation] = useState('');
  const [term, setTerm] = useState('');
  const [businesses, setBusinesses] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/yelp/search', {
        params: { location, term: term || 'pet care' }
      });
      setBusinesses(response.data.businesses);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="pet-care-container">
      <nav className="nav-bar">
        {/* Navigation items here */}
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/petCare">Pet care Providers</a>
        <a href="/matching">Matching</a>
        <div className="user-section">
          <i className="heart-icon"></i> {/* Replace with actual icons */}
          <i className="shopping-cart-icon"></i>
          <span>John Doe</span>
        </div>
      </nav>

      <h1>Find Pet Care Services</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search term (e.g., 'dog grooming')"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location (e.g., 'San Francisco')"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="filters">
        <input type="text" placeholder="Filter Search" /> {/* Implement filtering logic */}
        <select name="sort-by" id="sort-by">
          <option value="rating">Sort by: Rating</option>
          <option value="distance">Sort by: Distance</option>
          {/* Add more sorting options as needed */}
        </select>
      </div>

      <div className="horizontal-provider-list">
        {businesses.length > 0 ? (
          businesses.map((business) => (
            <div key={business.id} className="provider-card">
              <div className="image-container">
                <img src={business.image_url} alt="business" />
              </div>
              <h2>{business.name}</h2>
              <p>{business.location.address1}, {business.location.city}</p>
              <div>
                {/* Social media icons */}
                <i className="twitter-icon"></i> {/* Replace with actual icons */}
                <i className="facebook-icon"></i>
                <i className="instagram-icon"></i>
              </div>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>

      <footer className="footer">
        <p>© 2023 Your Company Incorporated. All rights reserved.</p>
        <div>
          {/* Social media links */}
          <a href="http://twitter.com">Twitter</a>
          <a href="http://facebook.com">Facebook</a>
          <a href="http://instagram.com">Instagram</a>
          <a href="http://linkedin.com">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
};

export default YelpSearch;
