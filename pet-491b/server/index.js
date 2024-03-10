// require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const resetRoutes = require("./routes/reset");
const petRoutes = require("./routes/pets");
const petCareRoutes = require("./routes/petCare");



// const petRoutes = require('./routes/pets');

//move this to routes folder
// const axios = require('axios');
// require('dotenv').config();
// const PETFINDER_API_KEY = process.env.PETFINDER_API_KEY;
// const PETFINDER_API_SECRET = process.env.PETFINDER_API_SECRET;

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });

// app.get('/api/pets', async (req, res) => {
//     try {
//         // Fetch data from Petfinder API
//         const tokenResponse = await axios.post(
//         'https://api.petfinder.com/v2/oauth2/token',
//         `grant_type=client_credentials&client_id=${PETFINDER_API_KEY}&client_secret=${PETFINDER_API_SECRET}`,
//         {
//             headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             },
//         }
//         );

//         const accessToken = tokenResponse.data.access_token;

//         const petResponse = await axios.get('https://api.petfinder.com/v2/animals', {
//         headers: {
//             'Authorization': `Bearer ${accessToken}`,
//         },
//         });

//         // Extracting relevant information including images
//         const pets = petResponse.data.animals.map(pet => ({
//         id: pet.id,
//         name: pet.name,
//         description: pet.description,
//         images: pet.photos.map(photo => photo.small), // Adjust the size based on your requirements
//         }));

//         res.json(pets);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });
//////////////////////////////

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reset", resetRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/yelp", petCareRoutes);


const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
