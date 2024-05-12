const router = require("express").Router();
const { User, validate } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Internal Server Error' });
});

const handleRegistration = async (req, res, next) => {
  try {
    // Validate user input
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    // Check if user with the given email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.status(409).send({ message: "User with given email already exists" });

    // Hash the password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Save the user with hashed password
    const user = await new User({ ...req.body, password: hashPassword }).save();

    // Generate and save verification token, send verification email
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);

    res.status(201).send({ message: "An Email sent to your account, please verify" });
  } catch (error) {
    next(error);
  }
};

const jwt = require('jsonwebtoken');

// Middleware to authenticate and set user on request
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Authentication token required' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ message: 'Invalid or expired token' });
    }
};

router.get('/me', authenticate, async (req, res) => {
  try {
      const user = await User.findById(req.user._id).select('-password'); // Excludes password from the result
      if (!user) {
          return res.status(404).send({ message: 'User not found' });
      }
      res.send(user);
  } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
  }
});

router.put('/update', authenticate, async (req, res) => {
  const { phone, petType, petSize, petBreed } = req.body;
  try {
      const user = await User.findByIdAndUpdate(req.user._id, {
          $set: {
              phone: phone,
              'petPreferences.petType': petType,
              'petPreferences.petSize': petSize,
              'petPreferences.petBreed': petBreed
          }
      }, { new: true }).select('-password');

      if (!user) {
          return res.status(404).send({ message: 'User not found' });
      }
      res.send({ message: 'Profile updated successfully', user });
  } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
  }
});

// Endpoint to update user favorites by email
router.put('/users/updateFavorites', authenticate, async (req, res) => {
  const { email, favorites } = req.body;

  // Validate favorite keys
  const validKeys = new Set(['fav1', 'fav2', 'fav3', 'fav4', 'fav5', 'fav6', 'fav7', 'fav8', 'fav9', 'fav10']);
  const incomingKeys = Object.keys(favorites);
  const isValid = incomingKeys.every(key => validKeys.has(key));

  if (!isValid) {
      return res.status(400).send({ message: 'Invalid favorite keys provided' });
  }

  const updateObject = {};
  const unsetObject = {};

  incomingKeys.forEach(key => {
      if (favorites[key]) {
          updateObject[`favoritePets.${key}`] = favorites[key];
      } else {
          unsetObject[`favoritePets.${key}`] = "";
      }
  });

  const update = {};
  if (Object.keys(updateObject).length > 0) update.$set = updateObject;
  if (Object.keys(unsetObject).length > 0) update.$unset = unsetObject;

  try {
      const user = await User.findOneAndUpdate(
          { email: email },
          update,
          { new: true }
      );
      if (!user) {
          return res.status(404).send({ message: 'User not found' });
      }
      res.status(200).json({ message: 'Favorites updated successfully', user });
  } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Failed to update favorites' });
  }
});






router.post("/", handleRegistration);


router.get("/:id/verify/:token", async (req, res, next) => {
  try {
    // Find user by ID and update verification status
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { verified: true } },
      { new: true }
    );

    if (!user) return res.status(400).send({ message: "Invalid link" });

    // Find the verification token and remove it
    const token = await Token.findOneAndRemove({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) return res.status(400).send({ message: "Invalid link" });

    // Store the user ID in the request object
    req.verifiedUserId = user._id;

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
