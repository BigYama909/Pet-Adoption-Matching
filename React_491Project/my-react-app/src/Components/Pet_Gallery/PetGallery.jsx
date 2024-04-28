import React, { useState, useEffect } from 'react';
import petsData from './pets.json';
import styles from './PetGallery.module.css';  // Import the CSS module
import Select from 'react-select'; // Import react-select

const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      margin: '10px',
      padding: '0px', // Padding adjusted to align visually with other inputs
      width: 'calc(100% - 22px)', // Matching width calculation
      border: '1px solid #ccc' ,
      borderColor: state.isFocused ? '#007BFF' : '#ccc', // Dynamic border color based on focus
      borderRadius: '4px',
      boxShadow: state.isFocused ? '0 0 8px rgba(0,123,255,0.2)' : 'inset 0 1px 3px rgba(0,0,0,0.1)', // Box shadow changes on focus
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease' // Smooth transition for focus and hover
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black', // Text color changes when option is selected
      backgroundColor: state.isFocused ? '#007BFF' : state.isSelected ? '#007BFF' : null, // Background color on hover and when selected
    }),
    multiValue: (provided) => ({
      ...provided,
      borderRadius: '4px',
      backgroundColor: '#007BFF', // Style for selected options (tags)
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'white', // Text color for tags
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      ':hover': {
        backgroundColor: '#0056b3', // Darker blue on hover for tag removal
        color: 'white',
      },
    }),
  };

const PetGallery = () => {
    const [pets, setPets] = useState(petsData);
    const [nameFilter, setNameFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState([]); // Updated to support multiple types
    const [breedFilter, setBreedFilter] = useState("");
    const [sizeFilter, setSizeFilter] = useState("");
    const [ageFilter, setAgeFilter] = useState(""); // Now a string to support the slider input

    // Options for the 'type' select input
    const typeOptions = [
        { value: 'Dog', label: 'Dog' },
        { value: 'Cat', label: 'Cat' }
    ];

    useEffect(() => {
        const filteredPets = petsData.filter(pet =>
            pet.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
            (typeFilter.length ? typeFilter.some(option => option.value === pet.type) : true) &&
            (breedFilter ? pet.breed.toLowerCase().includes(breedFilter.toLowerCase()) : true) &&
            (sizeFilter ? pet.size === sizeFilter : true) &&
            (ageFilter ? pet.age <= parseInt(ageFilter, 10) : true) // Adjusted to handle age as a maximum value
        );
        setPets(filteredPets);
    }, [nameFilter, typeFilter, breedFilter, sizeFilter, ageFilter]);

    const resetFilters = () => {
        setNameFilter("");
        setTypeFilter([]);
        setBreedFilter("");
        setSizeFilter("");
        setAgeFilter("");
    };

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <button className={styles.resetButton} onClick={resetFilters}>Reset Filters</button>
                <input
                    className={styles.searchInput}
                    type="text"
                    placeholder="Search by pet name..."
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                />
                <Select
                    isMulti
                    options={typeOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={customSelectStyles}
                    onChange={setTypeFilter}
                    value={typeFilter}
                    placeholder="Select types..."
                />
                <input
                    className={styles.searchInput}
                    type="text"
                    placeholder="Filter by breed..."
                    value={breedFilter}
                    onChange={(e) => setBreedFilter(e.target.value)}
                />
                <select
                    className={styles.filterSelect}
                    value={sizeFilter}
                    onChange={(e) => setSizeFilter(e.target.value)}
                >
                    <option value="">All Sizes</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                </select>
                <label htmlFor="ageRange" className={styles.sliderLabel}>
                    Age: Up to {ageFilter || "Any"}
                </label>
                <input
                    type="range"
                    min="0"
                    max="20"
                    value={ageFilter}
                    onChange={(e) => setAgeFilter(e.target.value)}
                    className={styles.slider}
                    id="ageRange"
                />
            </div>
            <div className={styles.mainContent}>
                <h1 className={styles.galleryTitle}>Available Pets for Adoption</h1>
                <div className={`${styles.galleryContainer} ${pets.length === 0 ? styles.centerContent : ''}`}>
                    {pets.length > 0 ? (
                        pets.map(pet => (
                            <div key={pet.id} className={styles.petCard}>
                                <img src={pet.image} alt={`Picture of ${pet.name}`} className={styles.petImage} />
                                <h2>{pet.name} ({pet.type})</h2>
                                <p>Breed: {pet.breed}</p>
                                <p>Age: {pet.age} years old</p>
                                <p>Size: {pet.size}</p>
                            </div>
                        ))
                    ) : (
                    <div className={styles.noResults}>No pets found matching your criteria.Please try again</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PetGallery;
