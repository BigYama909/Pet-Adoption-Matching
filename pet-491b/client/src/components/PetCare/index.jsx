import React, { useState } from 'react';
import axios from 'axios';

const YelpSearch = () => {
  const [location, setLocation] = useState('');
  const [term, setTerm] = useState('');
  const [businesses, setBusinesses] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/yelp/search', {
        params: { location, term: term || 'pet care' } // Default term is 'pet care'
      });
      setBusinesses(response.data.businesses);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Add any additional error handling here
    }
  };

  return (
    <div>
      <h1>Find Pet Care Services</h1>
      <div>
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
      <div>
        {businesses.length > 0 ? (
          <ul>
            {businesses.map((business) => (
              <li key={business.id}>
                <h3>{business.name}</h3>
                <p>{business.location.address1}, {business.location.city}</p>
                <p>{business.phone}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default YelpSearch;
