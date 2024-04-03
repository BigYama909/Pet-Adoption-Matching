const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();
const YELP_API_KEY = process.env.YELP_API_KEY;

// Middleware to set up headers for Yelp API requests
const yelpApi = axios.create({
  baseURL: 'https://api.yelp.com/v3/',
  headers: {
    Authorization: `Bearer ${YELP_API_KEY}`,
    'Content-type': 'application/json',
  },
});

// Define a route for searching businesses
router.get('/search', async (req, res) => {
  try {
    const { term = 'pet care', location = 'New York', limit = 10 } = req.query;
    const response = await yelpApi.get('businesses/search', {
      params: { term, location, limit },
    });
    // Map through the businesses and extract the required details
    const businesses = response.data.businesses.map(business => ({
      name: business.name,
      address: business.location.address1, 
      phone: business.display_phone,
      image_url: business.image_url,
    }));
    res.json(businesses); // Send back the simplified list of businesses
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
