import React, { useState, useEffect } from 'react';
import './styles.css'; // Import the CSS file

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');

  useEffect(() => {
    // Fetch data from backend API endpoint with the searchLocation parameter
    fetch(`http://localhost:8080/api/pets?location=${searchLocation}`)  // Update the URL based on your backend setup
      .then(response => response.json())
      .then(data => setPets(data))
      .catch(error => console.error(error));
  }, [searchLocation]);

  const [expandedPetId, setExpandedPetId] = useState(null);

  const handleToggleDescription = (petId) => {
    setExpandedPetId(expandedPetId === petId ? null : petId);
  };

  const handleSearchLocationChange = (event) => {
    setSearchLocation(event.target.value);
  };

  return (
    <div className="pet-list-container">
      <h1>Pet List</h1>
      <div className="search-bar">
        <label htmlFor="searchLocation">Search Location:</label>
        <input
          type="text"
          id="searchLocation"
          value={searchLocation}
          onChange={handleSearchLocationChange}
        />
      </div>
      {searchLocation && (
        <p className="search-location-indicator">
          Showing results for: <strong>{searchLocation}</strong>
        </p>
      )}
      <div className="horizontal-pet-list">
        {pets.map(pet => (
          <div key={pet.id} className="pet-card">
            <h2>{pet.name}</h2>
            <p>Location: {pet.location}</p>
            <div className="image-container">
              {pet.images.length > 0 && (
                <img src={pet.images[0]} alt={`Pet ${pet.id}`} />
              )}
            </div>
            <button onClick={() => handleToggleDescription(pet.id)}>
              {expandedPetId === pet.id ? 'Hide Description' : 'Show Description'}
            </button>
            {expandedPetId === pet.id && (
              <p>{pet.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetList;
