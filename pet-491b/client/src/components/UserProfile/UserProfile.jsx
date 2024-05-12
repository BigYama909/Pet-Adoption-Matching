import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../Header/index";
import styles from './UserProfile.module.css';  
import petsData from "../Pet_Gallery/pets.json"; 
import jsPDF from 'jspdf';

// Construct the User Profile with inputtable information
const UserProfile = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        petType: '', 
        petSize: '', 
        petBreed: '' 
    });
    const [editGeneralInfo, setEditGeneralInfo] = useState(false);
    const [editPetPreferences, setEditPetPreferences] = useState(false);
    const [breedOptions, setBreedOptions] = useState([]);
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);

    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    
    // Get the logged in user from local storage
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/users/me', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const userData = await response.json();
                setUser(userData);
                if (userData.petType) {
                    updateBreedOptions(userData.petType);
                }
                // Also update local storage when user data is fetched
                localStorage.setItem('petPreferences', JSON.stringify({
                    petType: userData.petType,
                    petSize: userData.petSize,
                    petBreed: userData.petBreed
                }));
            } catch (error) {
                console.error('Error:', error);
                navigate('/login');
            }
        };
        loadUserData();
    }, [navigate]);

    // Capitalize the Letters in Pet Preference
    const capitalizeFirstLetter = (string) => {
        if (!string) return string;
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    // Add Selection of Pet Breeds
    const updateBreedOptions = (petType) => {
        const breeds = {
            dog: ['French Bulldog', 'Labrador Retriever', 'Golden Retriever', 'German Shepherd', 'Bulldog', 'Poodle', 'Siberian Husky', 'Yorkshire Terrier'],
            cat: ['Domestic Shorthair', 'Siamese', 'Maine Coon', 'Ragdoll', 'Bengal', 'Persian', 'Abyssinian', 'Sphinx']
        };
        setBreedOptions(breeds[petType.toLowerCase()] || []);
    };

    const savePreferences = async () => {
        const preferences = { petType: user.petType, petSize: user.petSize, petBreed: user.petBreed };
        localStorage.setItem('petPreferences', JSON.stringify(preferences));
        // Implement the call to save to backend here if necessary
    };

    
    // Changing the selection of Breeds depending on Pet Type
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
        if (name === 'petType') {
            updateBreedOptions(value);
        }
        if (['petType', 'petSize', 'petBreed'].includes(name)) {
            savePreferences();
        }
    };

    const formatFavoritePetsForSave = (favoritePets) => {
        const favObject = {};
        favoritePets.slice(0, 10).forEach((petId, index) => {
            favObject[`fav${index + 1}`] = petId; // Map each petId to fav1, fav2, etc.
        });
        return favObject;
    };
    


    // Saving General Profile Info
    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/users/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    petType: user.petType,
                    petSize: user.petSize,
                    petBreed: user.petBreed,
                    favoritePets: favorites // Include favorite pets in the update
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to update user data');
            }
    
            console.log('User data and favorites updated successfully!');
            setEditMode(false);
            setEditPetPreferences(false);
        } catch (error) {
            console.error('Error updating user data and favorites:', error);
        }
    };

    const updateFavorites = async () => {
        const formattedFavorites = formatFavoritePetsForSave(favorites);
        const userEmail = user.email;
        try {
            const response = await fetch('http://localhost:8080/api/users/updateFavorites', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure token is correctly retrieved
                },
                body: JSON.stringify({
                    email: userEmail,
                    favoritePets: formattedFavorites
                })
            });
    
            if (!response.ok) {
                throw new Error(`Failed to update favorites: ${response.status}`);
            }
    
            const result = await response.json();
            console.log('Favorites updated:', result);
            alert('Favorites updated successfully!');
        } catch (error) {
            console.error('Error updating favorites:', error);
            alert('Failed to update favorites.');
        }
    };
    
    

    const favoritePets = useMemo(() => {
        return petsData.filter(pet => favorites.includes(pet.id)).slice(0, 10);
    }, [favorites, petsData]);
    

    // Sharing Profile on twitter
    const handleShare = () => {
        const favoritePetsNames = favorites.map(id => {
            const pet = petsData.find(pet => pet.id === id);
            return pet ? pet.name : '';
        }).join(', ');

        const websiteLink = "https://pet-adoption-matching-frontend.onrender.com/";  // Replace with your actual website link

        const shareMessage = `Check out ${user.firstName}'s pet preferences and favorite pets:\n` +
                             `Preferences - Type: ${user.petType}, Size: ${user.petSize}, Breed: ${user.petBreed}.\n` +
                             `Favorites - ${favoritePetsNames}.\n` +
                             `Check out the pets at ${websiteLink}.`;

        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`;
        window.open(twitterUrl, '_blank');
    };

    const handleDownloadPdf = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text(`Favorite Pets of ${user.firstName} ${user.lastName}`, 10, 10);
        let currentHeight = 20;
        favorites.forEach((id, index) => {
            const pet = petsData.find(p => p.id === id);
            if (pet) {
                let img = new Image();
                img.src = pet.image;
                img.onload = () => {
                    doc.addImage(img, 'JPEG', 10, currentHeight, 50, 50);
                    doc.text(`${pet.name} (${pet.type})`, 70, currentHeight + 25);
                    currentHeight += 60;
                    if (index === favorites.length - 1) {
                        doc.save('FavoritePets.pdf');
                    }
                };
                img.onerror = () => {
                    doc.text(`Failed to load image for ${pet.name}`, 10, currentHeight);
                    currentHeight += 20;
                    if (index === favorites.length - 1) {
                        doc.save('FavoritePets.pdf');
                    }
                };
            }
        });
    };

    return (
        <>
            <Header />
            <div className={styles.profile_container}>
                <h1>User Profile</h1>
                {editMode ? (
                    <div className={styles.editForm}>
                        <input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
                        <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
                        <input type="email" name="email" value={user.email} readOnly />
                        <input type="tel" name="phone" value={user.phone} onChange={handleChange} />
                        <button onClick={handleSave}>Save Phone</button>
                    </div>
                ) : (
                    <div>
                        <p className={styles.info}><strong>First Name:</strong> {user.firstName}</p>
                        <p className={styles.info}><strong>Last Name:</strong> {user.lastName}</p>
                        <p className={styles.info}><strong>Email:</strong> {user.email}</p>
                        <p className={styles.info}><strong>Phone:</strong> {user.phone}</p>
                        <button onClick={() => setEditMode(true)}>Edit Phone</button>
                    </div>
                )}
                <h2>Pet Preferences</h2>
                {editPetPreferences ? (
                    <div className={styles.editForm}>
                        <select name="petType" value={user.petType} onChange={handleChange}>
                            <option value="">Select Pet Type</option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                        </select>
                        <select name="petSize" value={user.petSize} onChange={handleChange}>
                            <option value="">Select Pet Size</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                        <select name="petBreed" value={user.petBreed} onChange={handleChange}>
                            <option value="">Select Pet Breed</option>
                            {breedOptions.map(breed => (
                                <option key={breed} value={breed}>{breed}</option>
                            ))}
                        </select>
                        <button onClick={() => {
                            handleSave();
                            setEditPetPreferences(false);
                        }}>Save Pet Preferences</button>
                    </div>
                ) : (
                    <div>
                        <button onClick={() => setEditPetPreferences(true)}>Edit Pet Preferences</button>
                        <p><strong>Type:</strong> {user.petType}</p>
                        <p><strong>Size:</strong> {user.petSize}</p>
                        <p><strong>Breed:</strong> {user.petBreed}</p>
                    </div>
                )}
                <h2>Favorite Pets</h2>
                <div className={styles.favoritesContainer}>
                    {favoritePets.length > 0 ? favoritePets.map(pet => (
                        <div key={pet.id} className={styles.favoritePet}>
                            <img src={pet.image} alt={`Picture of ${pet.name}`} style={{ width: '100px', height: '100px', borderRadius: '50%' }}/>
                            <p>{pet.name} - {pet.type}</p>
                        </div>
                    )) : <p>No favorite pets selected.</p>}
                </div>
                <button onClick={updateFavorites} className={styles.saveFavoritesButton}>Save Favorite Pets</button>
                <button onClick={handleShare} className={styles.shareButton}>Share on Twitter</button>
                <button onClick={handleDownloadPdf} className={styles.downloadButton}>Save and Download Favorites</button>
            </div>
        </>
    );
};

export default UserProfile;
