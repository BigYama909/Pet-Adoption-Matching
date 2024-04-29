import React, { useState, useMemo } from 'react';
import petsData from './pets.json';
import styles from './PetGallery.module.css';
import Select from 'react-select';
import { debounce } from 'lodash';

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

const PetGallery = () => {
    const [nameFilter, setNameFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState([]);
    const [breedFilter, setBreedFilter] = useState("");
    const [sizeFilter, setSizeFilter] = useState("");
    const [ageFilter, setAgeFilter] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const debouncedSetNameFilter = useMemo(() => debounce(setNameFilter, 300), []);

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

    const resetFilters = () => {
        setNameFilter("");
        setTypeFilter([]);
        setBreedFilter("");
        setSizeFilter("");
        setAgeFilter("");
        setSortField("");  // Reset the sort field to default
    setSortOrder("asc");  // Reset the sort order to default (assuming "asc" as default)
    };

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <button className={styles.resetButton} onClick={resetFilters}>Reset Filters</button>
                <input
                    className={styles.searchInput}
                    type="text"
                    placeholder="Search by pet name..."
                    defaultValue={nameFilter}
                    onChange={e => debouncedSetNameFilter(e.target.value)}
                />
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
                <input
                    className={styles.searchInput}
                    type="text"
                    placeholder="Filter by breed..."
                    value={breedFilter}
                    onChange={e => setBreedFilter(e.target.value)}
                />
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
            <div className={styles.mainContent}>
                <h1 className={styles.galleryTitle}>Available Pets for Adoption</h1>
                <div className={`${styles.galleryContainer} ${filteredAndSortedPets.length === 0 ? styles.centerContent : ''}`}>
                    {filteredAndSortedPets.length > 0 ? (
                        filteredAndSortedPets.map(pet => (
                            <div key={pet.id} className={styles.petCard}>
                                <img src={pet.image} alt={`Picture of ${pet.name}`} loading="lazy" className={styles.petImage} />
                                <h2>{pet.name} ({pet.type})</h2>
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

