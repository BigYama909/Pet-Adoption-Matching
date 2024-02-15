import React, { useState, useEffect } from 'react';
import './styles.css';
const PetList = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // Fetch data from your backend API endpoint
    fetch('http://localhost:8080/api/pets')  // Update the URL based on your backend setup
      .then(response => response.json())
      .then(data => setPets(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="pet-list-container">
      <h1>Pet List</h1>
      <ul>
        {pets.map(pet => (
          <li key={pet.id} className="pet-box">
            <h2>{pet.name}</h2>
            <p>{pet.description}</p>
            <div className="image-container">
              {pet.images.map((image, index) => (
                <img key={index} src={image} alt={`Pet ${index}`} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PetList;
