import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import PetProfile from "../PetProfile/PetProfile";
import styles from "./Matching.module.css";
import Header from "../Header/index";

Modal.setAppElement('#root');

const Matching = () => {
    const [pets, setPets] = useState([]);
    const [filteredPets, setFilteredPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPet, setSelectedPet] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userPreferences, setUserPreferences] = useState({}); // State to hold user preferences

    // Open and close modal functions
    const openModal = (pet) => {
        setSelectedPet(pet);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get('https://pet-adoption-matching.onrender.com/api/pets');
                console.log("Fetched pets:", response.data);  // Debug: log fetched data
                setPets(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch pets:", error);
                setError('Failed to fetch pets');
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    useEffect(() => {
        // Retrieve user preferences from local storage
        const preferences = JSON.parse(localStorage.getItem('petPreferences') || '{}');
    setUserPreferences(preferences); // Set user preferences in state

    const applyFilters = (pets) => {
        return pets.filter(pet =>
            (!preferences.petType || pet.type.toLowerCase() === preferences.petType.toLowerCase()) &&
            (!preferences.petSize || pet.size.toLowerCase() === preferences.petSize.toLowerCase()) &&
            (!preferences.petBreed || pet.breed.toLowerCase() === preferences.petBreed.toLowerCase()) &&
            (!preferences.petAge || pet.age.toLowerCase() === preferences.age.toLowerCase())
        );
    };
    setFilteredPets(applyFilters(pets));
}, [pets]);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Header />
            <div className={styles.matcherContainer}>
                <h1>Matched Pets</h1>
                <div className={styles.preferences}>
                    <h2>Your Preferences</h2>
                    <p>Type: {userPreferences.petType || "Any"}</p>
                    <p>Size: {userPreferences.petSize || "Any"}</p>
                    <p>Breed: {userPreferences.petBreed || "Any"}</p>
                    <p>Age: {userPreferences.age || "Any"}</p>
                </div>
                {filteredPets.length > 0 ? (
                    filteredPets.map(pet => (
                        <div key={pet.id} className={styles.petCard} onClick={() => openModal(pet)}>
                            <h3>{pet.name}</h3>
                            <p>Type: {pet.type}</p>
                            <p>Breed: {pet.breed}</p>
                            <p>Size: {pet.size}</p>
                            <p>Age: {pet.age}</p>
                            <p>Location: {pet.location}</p>
                            {pet.images[0] && <img src={pet.images[0]} alt={pet.name} style={{width: "100px"}} />}
                            <p>{pet.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No pets match your preferences.</p>
                )}

                {/* Modal for displaying pet profile */}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Pet Profile"
                    className="Modal"
                    overlayClassName="Overlay"
                >
                    <PetProfile pet={selectedPet} />
                    <button onClick={closeModal}>Close</button>
                </Modal>  
            </div>
        </>
    );
};

export default Matching;
