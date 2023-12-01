// Import the necessary libraries 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();
const port = 3000;

// Connect to MongoDb server using Mongoose
mongoose.connect('mongodb+srv://admin:1234@pet-adoption.eekmuf4.mongodb.net/petadoption?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Handle MongoDb connection erros
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// Indicate the connection is successful
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema for the 'dogs' collection
const dogSchema = new mongoose.Schema({
  name: String,
  age: Number,
  color: String,
});

//Create a Dog model based on the schema
const Dog = mongoose.model('dogs', dogSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/add', async (req, res) => {
  const { name, age, color } = req.body;
  const newDog = new Dog({ name, age, color });
  await newDog.save();
  res.redirect('/');
});

app.post('/retrieve', async (req, res) => {
  const { dogName } = req.body;
  const query = { name: dogName };
  const result = await Dog.findOne(query);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
