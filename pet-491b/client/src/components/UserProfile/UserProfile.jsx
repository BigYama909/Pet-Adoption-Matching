import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "../Header/index";
import styles from './UserProfile.module.css';  
import petsData from "../Pet_Gallery/pets.json"; // Ensure petsData is accessible here as well

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

    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    
    const capitalizeFirstLetter = (string) => {
        if (!string) return string;
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    

    const favoritePets = useMemo(() => petsData.filter(pet => favorites.includes(pet.id)), [favorites]);

    useEffect(() => {
        const userInfo = ['email', 'firstName', 'lastName', 'phone', 'petType', 'petSize', 'petBreed'].reduce((acc, key) => {
            const value = localStorage.getItem(key) || '';
            acc[key] = key === 'petType' || key === 'petSize' ? capitalizeFirstLetter(value) : value;
            return acc;
        }, {});
        
        if (userInfo.email && userInfo.firstName && userInfo.lastName) {
            setUser(userInfo);
        } else {
            navigate('/login'); // Redirect to login if essential data is not found
        }
    }, [navigate]);

    const updateBreedOptions = (petType) => {
        const breeds = {
            dog: ['French Bulldog', 'Labrador Retriever', 'Golden Retriever', 'German Shepherd', 'Bulldog', 'Poodle', 'Siberian Husky', 'Yorkshire Terrier'],
            cat: ['Domestic Shorthair', 'Siamese', 'Maine Coon', 'Ragdoll', 'Bengal', 'Persian', 'Abyssinian', 'Sphinx']
        };
        setBreedOptions(breeds[petType.toLowerCase()] || []);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        if (name === 'petType') {
            updateBreedOptions(value);
        }
    };

    const handleSaveGeneralInfo = () => {
        const keys = ['firstName', 'lastName', 'email', 'phone'];
        keys.forEach(key => {
            localStorage.setItem(key, user[key]);
        });
        setEditGeneralInfo(false);
    };

    const handleSavePetPreferences = () => {
        const keys = ['petType', 'petSize', 'petBreed'];
        keys.forEach(key => {
            localStorage.setItem(key, user[key]);
        });
        setEditPetPreferences(false);
    };

    const handleShare = () => {
        const favoritePetsNames = favorites.map(id => {
            const pet = petsData.find(pet => pet.id === id);
            return pet ? pet.name : '';
        }).join(', ');

        const websiteLink = "http://localhost:3000/home";  // Replace with your actual website link

        const shareMessage = `Check out ${user.firstName}'s pet preferences and favorite pets:\n` +
                             `Preferences - Type: ${user.petType}, Size: ${user.petSize}, Breed: ${user.petBreed}.\n` +
                             `Favorites - ${favoritePetsNames}.\n` +
                             `Check out the pets at ${websiteLink}.`;

        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`;
        window.open(twitterUrl, '_blank');
    };

    return (
        <>
            <Header />  {/* Include the Header component */}
            <div className={styles.profile_container}>
                <h1>User Profile</h1>
                {editGeneralInfo ? (
                    <div className={styles.editForm}>
                        <input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
                        <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
                        <input type="email" name="email" value={user.email} onChange={handleChange} />
                        <input type="tel" name="phone" value={user.phone} onChange={handleChange} />
                        <button onClick={handleSaveGeneralInfo}>Save General Info</button>
                    </div>
                ) : (
                    <div>
                        <p className={styles.info}><strong>First Name:</strong> {user.firstName}</p>
                        <p className={styles.info}><strong>Last Name:</strong> {user.lastName}</p>
                        <p className={styles.info}><strong>Email:</strong> {user.email}</p>
                        <p className={styles.info}><strong>Phone:</strong> {user.phone}</p>
                        <button onClick={() => setEditGeneralInfo(true)}>Edit General Info</button>
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
                        <button onClick={handleSavePetPreferences}>Save Pet Preferences</button>
                    </div>
                ) : (
                    <div>
                        <p className={styles.info}><strong>Pet Type:</strong> {user.petType}</p>
                        <p className={styles.info}><strong>Pet Size:</strong> {user.petSize}</p>
                        <p className={styles.info}><strong>Pet Breed:</strong> {user.petBreed}</p>
                        <button onClick={() => setEditPetPreferences(true)}>Edit Pet Preferences</button>
                    </div>
                )}
                <h2>Favorite Pets</h2>
                <div className={styles.favoritesContainer}>  {/* Class added here */}
                    {favoritePets.length > 0 ? favoritePets.map(pet => (
                        <div key={pet.id} className={styles.favoritePet}>  {/* Additional class for styling each pet */}
                            <img src={pet.image} alt={`Picture of ${pet.name}`} style={{ width: '100px', height: '100px', borderRadius: '50%' }}/>
                            <p>{pet.name} - {pet.type}</p>
                        </div>
                    )) : <p>No favorite pets selected.</p>}
                </div>
                <button onClick={handleShare} className={styles.shareButton}>Share on Twitter</button>
                <button onClick={handleLogout} className={styles.logoutButton}>Log Out</button>
            </div>
        </>
    );
};

export default UserProfile;