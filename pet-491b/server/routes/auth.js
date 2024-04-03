const router = require("express").Router();
const { User } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const Joi = require("joi");

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Internal Server Error' });
});

// Validate function using Joi to validate the email and password in the request body
const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

// POST route for user login
router.post("/", async (req, res, next) => {
  try {
    // Input validation using Joi
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: "Invalid input data" });

    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send({ message: "Invalid Email or Password" });

    // Compare password using bcrypt
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

    // Check if user is not verified
    if (!user.verified) {
      // Generate or find verification token
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);
      }

      return res.status(400).send({ message: "Email not verified. Check your email for verification instructions." });
    }

    // Generate JWT token and send response
    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Logged in successfully" });
  } catch (error) {
    next(error);
  }
});


//reset password
router.post("/forgot-password", async (req, res, next) => {
  try {
    // Validate the email input
    const { error } = validate({ email: req.body.email });
    if (error) return res.status(400).send({ message: error.details[0].message });

    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send({ message: "User with the provided email not found" });

    // Generate a password reset token and save it
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    // Send an email with the reset link
    const resetUrl = `${process.env.BASE_URL}reset-password/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password Reset", resetUrl);

    res.status(200).send({ message: "Password reset email sent successfully" });
  } catch (error) {
    next(error);
  }
});

// POST route for resetting the password
router.post("/reset-password/:id/:token", async (req, res, next) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });

    // Find the corresponding token
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) return res.status(400).send({ message: "Invalid or expired token" });

    // Update the user's password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashedPassword;
    await user.save();

    // Delete the used token
    await Token.findByIdAndDelete(token._id);

    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
});



module.exports = router;
