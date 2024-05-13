import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../Header/index";
import styles from './UserProfile.module.css';  
import petsData from "../Pet_Gallery/pets.json"; 
import jsPDF from 'jspdf'; // npm install react-router-dom jspdf


// Construct the User Profile with inputtable information
const UserProfile = () => {
    const [user, setUser] = useState(() => {
        const savedPreferences = JSON.parse(localStorage.getItem('petPreferences') || '{}'); // Fetch initial preferences if available
        return {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            petType: savedPreferences.petType || '', 
            petSize: savedPreferences.petSize || '', 
            petBreed: savedPreferences.petBreed || '',
            age: savedPreferences.age || ''
        };
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
        async function fetchUserData() {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
    
            try {
                const response = await fetch('https://pet-adoption-matching.onrender.com/api/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const userData = await response.json();
                setUser({ ...user, ...userData });
                if (userData.petType) {
                    updateBreedOptions(userData.petType);
                }
            } catch (error) {
                console.error('Error:', error);
                navigate('/login');
            }
        }
    
        fetchUserData();
    }, [navigate]);

    // Capitalize the Letters in Pet Preference
    const capitalizeFirstLetter = (string) => {
        return string ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() : '';
    };
    
    // Add Selection of Pet Breeds depending on Pet Type
    const updateBreedOptions = (petType) => {
        const breeds = {
            dog: ['French Bulldog', 'Labrador Retriever', 'Golden Retriever', 'German Shepherd', 'Bulldog', 'Poodle', 'Siberian Husky', 'Yorkshire Terrier'],
            cat: ['Domestic Short Hair', 'Siamese', 'Maine Coon', 'Ragdoll', 'Bengal', 'Persian', 'Abyssinian', 'Sphinx']
        };
        setBreedOptions(breeds[petType.toLowerCase()] || []);
    };

    
    // Changing the selection of Breeds depending on Pet Type
    const handleChange = async (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
        if (['petType', 'petSize', 'petBreed', 'age'].includes(name)) {
            await savePreferencesToBackend({ ...user, [name]: value });
        }
        if (name === 'petType') {
            updateBreedOptions(value);
        }
    };
    // Send the preferences to the backend database
    const savePreferencesToBackend = async (preferences) => {
        try {
            const response = await fetch('https://pet-adoption-matching.onrender.com/api/users/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(preferences)
            });
            if (!response.ok) {
                throw new Error('Failed to save preferences');
            }
            console.log('Preferences updated successfully!');
    
            // Also update local storage with the latest preferences
            localStorage.setItem('petPreferences', JSON.stringify({
                petType: preferences.petType,
                petSize: preferences.petSize,
                petBreed: preferences.petBreed,
                age : preferences.age
            }));
        } catch (error) {
            console.error('Error updating preferences:', error);
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
            const response = await fetch('https://pet-adoption-matching.onrender.com/api/users/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(user) // This sends the entire user object
            });
            if (!response.ok) {
                throw new Error('Failed to update user data');
            }
            console.log('User data updated successfully!');
            setEditMode(false); // Exit edit mode on successful save
        } catch (error) {
            console.error('Error updating user data:', error);
            alert('Failed to update user data.');
        }
    };
    
    const favoritePets = useMemo(() => {
        return petsData.filter(pet => favorites.includes(pet.id)).slice(0, 10);
    }, [favorites, petsData]);
    

    // Sharing Profile on Twitter
    const handleShare = () => {
        const favoritePetsNames = favorites.map(id => {
            const pet = petsData.find(pet => pet.id === id);
            return pet ? pet.name : '';
        }).join(', ');

        const websiteLink = "https://pet-adoption-matching-frontend.onrender.com/";  // Replace with your actual website link

        const shareMessage = `Check out ${capitalizeFirstLetter(user.firstName)}'s pet preferences and favorite pets:\n` +
                             `Preferences - Type: ${capitalizeFirstLetter(user.petType)}, Size: ${capitalizeFirstLetter(user.petSize)}, Breed: ${user.petBreed}, Age: ${capitalizeFirstLetter(user.age)}.\n` +
                             `Favorites - ${favoritePetsNames}.\n` +
                             `Check out the pets at ${websiteLink}.`;

        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`;
        window.open(twitterUrl, '_blank');
    };

    // Save and Download a pdf file of Favorited Pets
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
                    <input type="text" name="firstName" placeholder="First Name" value={user.firstName} onChange={handleChange} />
                    <input type="text" name="lastName" placeholder="Last Name" value={user.lastName} onChange={handleChange} />
                    <input type="email" name="email" value={user.email} readOnly />
                    <input type="tel" name="phone" placeholder="Phone Number" value={user.phone} onChange={handleChange} />
                    <editsavebutton onClick={handleSave} className={styles.editButton}>
                        Save Changes
                    </editsavebutton>
                    <button onClick={() => setEditMode(false)} className={styles.editButton}>
                        Cancel
                    </button>
                </div>
            ) : (
                <div>
                    <p className={styles.info}><strong>First Name:</strong> {capitalizeFirstLetter(user.firstName)}</p>
                    <p className={styles.info}><strong>Last Name:</strong> {capitalizeFirstLetter(user.lastName)}</p>
                    <p className={styles.info}><strong>Email:</strong> {user.email}</p>
                    <p className={styles.info}><strong>Phone:</strong> {user.phone}</p>
                    <button onClick={() => setEditMode(true)} className={styles.editButton}>
                        Edit Profile
                    </button>
                    
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
                                <option key={breed} value={breed}>{capitalizeFirstLetter(breed)}</option>
                            ))}
                        </select>
                        <select name="age" value={user.age} onChange={handleChange}>  
                            <option value="">Select Age</option>
                            <option value="baby">Baby</option>
                            <option value="young">Young</option>
                            <option value="adult">Adult</option>
                        </select>
                        <button onClick={() => {
                            handleSave();
                            setEditPetPreferences(false);
                        }}className={styles.editButton}>Save Pet Preferences</button>
                    </div>
                ) : (
                    <div>
                        <p><strong>Type:</strong> {capitalizeFirstLetter(user.petType)}</p>
                        <p><strong>Size:</strong> {capitalizeFirstLetter(user.petSize)}</p>
                        <p><strong>Breed:</strong> {capitalizeFirstLetter(user.petBreed)}</p>
                        <p><strong>Age:</strong> {capitalizeFirstLetter(user.age)}</p>
                        <button onClick={() => setEditPetPreferences(true)} className={styles.editButton}>
                        Edit Pet Preferences
                        </button>
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
                <button onClick={handleShare} className={styles.shareButton}>Share on Twitter</button>
                <button onClick={handleDownloadPdf} className={styles.downloadButton}>Save and Download Favorites</button>
            </div>
        </>
    );
    
};

export default UserProfile;
