import React, { useState } from 'react';
import './styles.css';
import Header from "../Header/index";
import Footer from "../Footer/index";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [petsPerPage] = useState(9);
  const [expandedPetId, setExpandedPetId] = useState(null);

  const handleToggleDescription = (petId) => {
    setExpandedPetId(expandedPetId === petId ? null : petId);
  };

  const handleSearchLocationChange = (event) => {
    setSearchLocation(event.target.value);
  };

  const handleSearch = () => {
    fetch(`http://localhost:8080/api/pets?location=${encodeURIComponent(searchLocation)}`)
      .then(response => response.json())
      .then(data => {
        setPets(data);
        setCurrentPage(1); // Reset to first page with new search
      })
      .catch(error => console.error(error));
  };

  // Calculate total pages and current pets
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet);
  const totalPages = Math.ceil(pets.length / petsPerPage);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
    <Header />
    <div className="pet-list-container">
      <h1>Pet List</h1>
      <div className="search-bar">
        <input
          type="text"
          id="searchLocation"
          placeholder="Enter a location"
          value={searchLocation}
          onChange={handleSearchLocationChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="vertical-pet-list">
        {currentPets.length > 0 ? (
          currentPets.map(pet => (
            <div key={pet.id} className="pet-card">
              <h2>{pet.name}</h2>
              <p>Location: {pet.location}</p>
              <div className="image-container">
                {pet.images && pet.images.length > 0 && (
                  <img src={pet.images[0]} alt={`Pet ${pet.name}`} />
                )}
              </div>
              <button onClick={() => handleToggleDescription(pet.id)}>
                {expandedPetId === pet.id ? 'Hide Description' : 'Show Description'}
              </button>
              {expandedPetId === pet.id && (
                <p className="pet-description">{pet.description}</p>
              )}
            </div>
          ))
        ) : (
          searchLocation && <p>No pets found for the specified location.</p>
        )}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default PetList;
