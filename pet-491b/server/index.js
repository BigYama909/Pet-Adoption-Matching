// require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const petRoutes = require("./routes/pets");
const petCareRoutes = require("./routes/petCare");
const resetRoutes = require("./routes/forgetPass");


// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/yelp", petCareRoutes);
app.use("/api/resetpass", resetRoutes);

app.post('/api/predict', async (req, res) => {
    try {
        const pythonServerResponse = await axios.post('http://localhost:5000/predict', req.body);
        res.json(pythonServerResponse.data);
    } catch (error) {
        console.error('Error calling Python server:', error);
        res.status(500).send('Error processing your request');
    }
});



const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
