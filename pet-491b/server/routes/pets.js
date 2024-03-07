//move this to routes folder
const router = require("express").Router();

const axios = require('axios');
require('dotenv').config();
const PETFINDER_API_KEY = process.env.PETFINDER_API_KEY;
const PETFINDER_API_SECRET = process.env.PETFINDER_API_SECRET;


router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Internal Server Error' });
  });

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });

router.get('/', async (req, res) => {
    try {
        // Fetch data from Petfinder API
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

        const petResponse = await axios.get('https://api.petfinder.com/v2/animals', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        });

        // Extracting relevant information including images
        const pets = petResponse.data.animals.map(pet => ({
        id: pet.id,
        name: pet.name,
        description: pet.description,
        images: pet.photos.map(photo => photo.small), // Adjust the size based on your requirements
        }));

        res.json(pets);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
