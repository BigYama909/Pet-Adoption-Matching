import React, { useState, useMemo } from 'react';
import petsData from './pets.json'; // Import the static list of pets
import styles from './PetGallery.module.css'; // Import custom CSS styles for the component
import Select from 'react-select'; // Import the react-select library for dropdown components
import { debounce } from 'lodash'; // Import debounce function from lodash to limit function calls
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

// Define custom styles for the react-select dropdown components
const customSelectStyles = {
    control: (provided, state) => ({
        ...provided,
        margin: '10px',
        padding: '0px',
        width: 'calc(100% - 22px)',
        border: '1px solid #ccc',
        borderColor: state.isFocused ? '#007BFF' : '#ccc',
        borderRadius: '4px',
        boxShadow: state.isFocused ? '0 0 8px rgba(0,123,255,0.2)' : 'inset 0 1px 3px rgba(0,0,0,0.1)',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'white' : 'black',
        backgroundColor: state.isFocused ? '#007BFF' : state.isSelected ? '#007BFF' : null,
    }),
    multiValue: (provided) => ({
        ...provided,
        borderRadius: '4px',
        backgroundColor: '#007BFF',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: 'white',
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        ':hover': {
            backgroundColor: '#0056b3',
            color: 'white',
        },
    }),
};

// Define the PetGallery functional component
const PetGallery = () => {
    const [pets, setPets] = useState([]); // Assuming pets state holds your pet data
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });
    // State hooks for managing filter inputs
    const [nameFilter, setNameFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState([]);
    const [breedFilter, setBreedFilter] = useState("");
    const [sizeFilter, setSizeFilter] = useState("");
    const [ageFilter, setAgeFilter] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    // Use memoized function to debounce setting the name filter to improve performance
    const debouncedSetNameFilter = useMemo(() => debounce(setNameFilter, 300), []);

    // useMemo to filter and sort pets based on the active filters and sort settings
    const filteredAndSortedPets = useMemo(() => {
        const filtered = petsData.filter(pet =>
            pet.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
            (typeFilter.length ? typeFilter.some(option => option.value === pet.type) : true) &&
            (breedFilter ? pet.breed.toLowerCase().includes(breedFilter.toLowerCase()) : true) &&
            (sizeFilter ? pet.size === sizeFilter : true) &&
            (ageFilter ? pet.age <= parseInt(ageFilter, 10) : true)
        );

        return filtered.sort((a, b) => {
            if (sortField === "name") {
                return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            } else if (sortField === "age") {
                return sortOrder === "asc" ? a.age - b.age : b.age - a.age;
            }
            return 0;
        });
    }, [nameFilter, typeFilter, breedFilter, sizeFilter, ageFilter, sortField, sortOrder]);

    // Function to reset all filters to their default values
    const resetFilters = () => {
        setNameFilter("");
        setTypeFilter([]);
        setBreedFilter("");
        setSizeFilter("");
        setAgeFilter("");
        setSortField("");
        setSortOrder("asc");
    };
    

    const toggleFavorite = async (petId) => {
        console.log('Before toggle:', favorites);
        const updatedFavorites = favorites.includes(petId)
            ? favorites.filter(id => id !== petId)
            : [...favorites, petId];

        console.log('After toggle:', updatedFavorites);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
        try {
            const userEmail = localStorage.getItem('email');
            const response = await fetch('http://localhost:8080/api/users/updateFavoritesByEmail', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    email: userEmail,
                    favorites: updatedFavorites
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to update favorites');
            }
    
            const result = await response.json();
            console.log('Server response:', result); // Check server response
        } catch (error) {
            console.error('Error updating favorites:', error);
        }
    };

    // Component rendering
    return (
        <div className={styles.container}>
             {/* Sidebar section for filters and controls */}
            <div className={styles.sidebar}>
                {/* Reset button to clear all filters */}
                <button className={styles.resetButton} onClick={resetFilters}>Reset Filters</button>

                {/* Input for searching pets by name with debounced change handler */}
                <input
                    className={styles.searchInput}
                    type="text"
                    placeholder="Search by pet name..."
                    defaultValue={nameFilter}
                    onChange={e => debouncedSetNameFilter(e.target.value)}
                />
                {/* Multi-select dropdown for choosing pet types */}
                <Select
                    isMulti
                    options={[{ value: 'Dog', label: 'Dog' }, { value: 'Cat', label: 'Cat' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={customSelectStyles}
                    onChange={setTypeFilter}
                    value={typeFilter}
                    placeholder="Select types..."
                />
                {/* Input for filtering pets by breed */}
                <input
                    className={styles.searchInput}
                    type="text"
                    placeholder="Filter by breed..."
                    value={breedFilter}
                    onChange={e => setBreedFilter(e.target.value)}
                />
                {/* Dropdown for selecting pet size */}
                <select
                    className={styles.filterSelect}
                    value={sizeFilter}
                    onChange={e => setSizeFilter(e.target.value)}
                >
                    <option value="">All Sizes</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                </select>
                {/* Dropdown for sorting pets either by name or age */}
                <select
                    className={styles.filterSelect}
                    value={sortField + "_" + sortOrder}
                    onChange={(e) => {
                        const [field, order] = e.target.value.split("_");
                        setSortField(field);
                        setSortOrder(order);
                    }}
                >
                    <option value="">Sort by</option>
                    <option value="name_asc">Name (A-Z)</option>
                    <option value="name_desc">Name (Z-A)</option>
                    <option value="age_asc">Age (Ascending)</option>
                    <option value="age_desc">Age (Descending)</option>
                </select>
                {/* Slider for selecting maximum age */}
                <label htmlFor="ageRange" className={styles.sliderLabel}>
                    Age: Up to {ageFilter || "Any"}
                </label>
                <input
                    type="range"
                    min="0"
                    max="20"
                    value={ageFilter}
                    onChange={e => setAgeFilter(e.target.value)}
                    className={styles.slider}
                    id="ageRange"
                />
            </div>
            {/* Main content area where pet cards are displayed */}
            <div className={styles.mainContent}>
                <h1 className={styles.galleryTitle}>Available Pets for Adoption</h1>
                <div className={`${styles.galleryContainer} ${filteredAndSortedPets.length === 0 ? styles.centerContent : ''}`}>
                    {/* Display pet cards or a message if no pets match the filters */}
                    {filteredAndSortedPets.length > 0 ? (
                        filteredAndSortedPets.map(pet => (
                            <div key={pet.id} className={styles.petCard}>
                                <img src={pet.image} alt={`Picture of ${pet.name}`} loading="lazy" className={styles.petImage} />
                                <div className={styles.petInfo}>
                                <h2>{pet.name} ({pet.type})</h2>
                                <FontAwesomeIcon 
                                    icon={faHeart} 
                                    onClick={() => toggleFavorite(pet.id)}
                                    className={favorites.includes(pet.id) ? styles.favorited : styles.notFavorited}
                                    style={{ cursor: 'pointer' }}  // Ensuring it's clear it's clickable
                                />
                            </div>
                                <p>Breed: {pet.breed}</p>
                                <p>Age: {pet.age} years old</p>
                                <p>Size: {pet.size}</p>
                            </div>
                        ))
                    ) : (
                        <div className={styles.noResults}>No pets found matching your criteria. Please try again.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PetGallery;

