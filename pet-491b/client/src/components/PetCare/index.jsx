import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';
import Header from "../Header/index";
import Footer from "../Footer/index";

const YelpSearch = () => {
  const [location, setLocation] = useState('');
  const [term, setTerm] = useState('');
  const [businesses, setBusinesses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const resultsPerPage = 9;

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/yelp/search', {
        params: { location, term: term || 'pet care' }
      });
      // Directly set businesses with response data
      setBusinesses(response.data);
      setTotalPages(Math.ceil(response.data.length / resultsPerPage));
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastBusiness = currentPage * resultsPerPage;
  const indexOfFirstBusiness = indexOfLastBusiness - resultsPerPage;
  const currentBusinesses = businesses.slice(indexOfFirstBusiness, indexOfLastBusiness);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
    <Header />
    <div className="pet-care-container">
      
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

      <div className="horizontal-provider-list">
        {currentBusinesses.length > 0 ? (
          currentBusinesses.map((business, index) => (
            <div key={index} className="provider-card">
              <div className="image-container">
                <img src={business.image_url} alt={business.name} />
              </div>
              <h2>{business.name}</h2>
              <p>{business.address}</p> 
              <p>{business.phone}</p> 
              <div>
                {/* Placeholder for social media icons */}
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
      <div className="pagination">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => changePage(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default YelpSearch;
