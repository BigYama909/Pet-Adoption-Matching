const express = require("express");
const axios = require('axios');
require('dotenv').config();

const router = express.Router();
const PETFINDER_API_KEY = process.env.PETFINDER_API_KEY;
const PETFINDER_API_SECRET = process.env.PETFINDER_API_SECRET;

// Route to fetch pets, now accepting a location and type parameter
router.get('/', async (req, res) => {
  const location = req.query.location;
  const type = req.query.type;  // Retrieve type from query parameters

  // Check if location is not just an empty string
  if (location && location.trim() === '') {
    return res.status(400).send({ message: 'Location parameter is empty' });
  }

  try {
      // Fetching OAuth token
      const tokenResponse = await axios.post(
          'https://api.petfinder.com/v2/oauth2/token',
          `grant_type=client_credentials&client_id=${PETFINDER_API_KEY}&client_secret=${PETFINDER_API_SECRET}`,
          {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
              },
          }
      );

      const accessToken = tokenResponse.data.access_token;
      
      // Construct the API URL, adding filters as needed
      let petFinderURL = 'https://api.petfinder.com/v2/animals';
      const queryParams = [];
      if (location) {
          queryParams.push(`location=${encodeURIComponent(location)}`);
      }
      if (type) {
          queryParams.push(`type=${encodeURIComponent(type)}`);
      }
      if (queryParams.length) {
          petFinderURL += `?${queryParams.join('&')}`;
      }

      const petResponse = await axios.get(petFinderURL, {
          headers: {
              'Authorization': `Bearer ${accessToken}`,
          },
      });

      // Extracting relevant information
      const pets = petResponse.data.animals.map(pet => ({
          id: pet.id,
          name: pet.name,
          type: pet.type,
          breed: pet.breeds.primary,
          size: pet.size,
          age: pet.age,
          location: pet.contact.address.city,
          description: pet.description,
          images: pet.photos.map(photo => photo.small),
      }));

      res.json(pets);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'An unexpected error occurred' });
});

module.exports = router;
