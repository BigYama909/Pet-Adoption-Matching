const express = require("express");
const axios = require('axios');
require('dotenv').config();

const router = express.Router();
const PETFINDER_API_KEY = process.env.PETFINDER_API_KEY;
const PETFINDER_API_SECRET = process.env.PETFINDER_API_SECRET;

// Route to fetch pets, now accepting a location parameter
router.get('/', async (req, res) => {
  const location = req.query.location; // Retrieve location from query parameters

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
      
      // Adjusting request to include location if provided
      let petFinderURL = 'https://api.petfinder.com/v2/animals';
      if (location) {
          // Ensure that the location is URL-encoded to prevent URL manipulation and injection
          petFinderURL += `?location=${encodeURIComponent(location)}`;
      }

      const petResponse = await axios.get(petFinderURL, {
          headers: {
              'Authorization': `Bearer ${accessToken}`,
          },
      });

      // Extracting relevant information including location
      const pets = petResponse.data.animals.map(pet => ({
          id: pet.id,
          name: pet.name,
          location: pet.contact.address.city, // Assuming you want the city as the location
          description: pet.description,
          images: pet.photos.map(photo => photo.small), // Adjust the size based on your requirements
      }));

      res.json(pets);
  } catch (error) {
      console.error(error);
      // More specific error handling can be done here based on the error returned
      res.status(500).send('Internal Server Error');
  }
});

// Error handling middleware for catching errors in the route
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'An unexpected error occurred' });
});

module.exports = router;
