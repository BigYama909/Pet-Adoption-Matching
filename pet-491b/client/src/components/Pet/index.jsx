import React, { useState, useMemo } from 'react';
// import petsData from './pets.json'; // Import the static list of pets
import styles from "./style.css"; // Import custom CSS styles for the component
import Select from 'react-select'; // Import the react-select library for dropdown components
import { debounce } from 'lodash'; // Import debounce function from lodash to limit function calls

import Header from "../Header/index";
import Footer from "../Footer/index";

import adoptapet from "../../images/adoptapet.jpeg";


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
    // State hooks for managing filter inputs
    const [nameFilter, setNameFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState([]);
    const [breedFilter, setBreedFilter] = useState("");
    const [sizeFilter, setSizeFilter] = useState("");
    const [ageFilter, setAgeFilter] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");



    ///////////////////////////////////////////
    const [pets, setPets] = useState([]);
    const [searchLocation, setSearchLocation] = useState('');
    const [selectedType, setSelectedType] = useState(''); // New state for selected pet type
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
        fetch(`http://localhost:8080/api/pets?location=${encodeURIComponent(searchLocation)}&type=${encodeURIComponent(selectedType)}`)
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

    ///////////////////////////////////////////



    // Use memoized function to debounce setting the name filter to improve performance
    const debouncedSetNameFilter = useMemo(() => debounce(setNameFilter, 300), []);

    

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

    // Component rendering
    return (
        <>
        <Header />
            {/* search bar */}
            <div className={"big_container"}>
            <img className={"homepage_image"} src={adoptapet}></img>
            <div className={"overlay_text"}>
                <p>
                Let's get started. Search pets by types or locations from shelters and
                rescues.
                </p>
                
            </div>
            <div className={"search_bar_container"}>
                <div className={"search_bar"}>
                {/* <input className={"type_search"} type="text" placeholder="Search Dogs, Kittens, etc"></input> */}
                <select
                    className={"type_search"}
                    value={selectedType}
                    onChange={e => setSelectedType(e.target.value)}
                >
                    <option value="">Select Pet Type</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    {/* Add more types as needed */}
                </select>
                <input className={"location_search"} type="text" placeholder="90250, CA, USA" id="searchLocation" value={searchLocation} onChange={handleSearchLocationChange}></input>
                
                    <button className={styles.search_icon} onClick={handleSearch}>
                    <i className={`fas fa-search ${styles.searchIcon}`}></i>
                    Get Started
                    </button>
                
                </div>
            </div>
            </div>
            <div className={styles.under_container}><hr></hr></div>
            {/* search bar ended*/}


            <div className={"container"}>
            {/* Filter bar */}
            <div className={"sidebar"}>
                {/* Reset button to clear all filters */}
                <button className={"resetButton"} onClick={resetFilters}>Reset Filters</button>

                {/* Input for searching pets by name with debounced change handler */}
                <input
                    className={"searchInput"}
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
                    className={"searchInput"}
                    type="text"
                    placeholder="Filter by breed..."
                    value={breedFilter}
                    onChange={e => setBreedFilter(e.target.value)}
                />
                {/* Dropdown for selecting pet size */}
                <select
                    className={"filterSelect"}
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
                    className={"filterSelect"}
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
            </div>
            {/* Filter bar ended*/}            


            {/* Pet container & page's number*/}
            <div className="pet-list-container">
                <div className="vertical-pet-list">
                    {currentPets.length > 0 ? (
                    currentPets.map(pet => (
                        <div key={pet.id} className="pet-card">
                        <h2>{pet.name} ({pet.type})</h2>
                        <div className="image-container">
                            {pet.images && pet.images.length > 0 && (
                            <img src={pet.images[0]} alt={`Pet ${pet.name}`} />
                            )}
                        </div>
                        <p>Location: {pet.location}</p>
                        <p>Breed: {pet.breed}</p>
                        <p>Age: {pet.age}</p>
                        <p>Size: {pet.size}</p>
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
        </div>

        {/* </div> */}
        <Footer />
        </>
    );
};

export default PetGallery;

