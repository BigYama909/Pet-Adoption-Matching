import React from 'react';
import styles from './PetProfile.module.css'; // Import custom CSS styles

// Define the PetProfile component that accepts pet details as props
const PetProfile = ({ pet }) => {
    if (!pet) {
        return <div className={styles.noPetSelected}>No Pet Selected</div>;
    }

    return (
        <div className={styles.petProfileContainer}>
            <h2>{pet.name} ({pet.type})</h2>
            {/* Conditionally render the pet image if available */}
            {pet.images && pet.images.length > 0 && (
                <img src={pet.images[0]} alt={`Pet ${pet.name}`} className={styles.petImage} />
            )}
            <div className={styles.petDetails}>
                <p><strong>Location:</strong> {pet.location}</p>
                <p><strong>Breed:</strong> {pet.breed}</p>
                <p><strong>Age:</strong> {pet.age}</p>
                <p><strong>Size:</strong> {pet.size}</p>
                <p><strong>Description:</strong> {pet.description}</p>
            </div>
        </div>
    );
};

export default PetProfile;
