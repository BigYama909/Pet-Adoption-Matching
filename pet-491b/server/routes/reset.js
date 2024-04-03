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
  });
  return schema.validate(data);
};


//reset password
router.post("/", async (req, res, next) => {
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
// router.post("/reset-password/:id/:token", async (req, res, next) => {
//   try {
//     // Find the user by ID
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).send({ message: "User not found" });

//     // Find the corresponding token
//     const token = await Token.findOne({
//       userId: user._id,
//       token: req.params.token,
//     });

//     if (!token) return res.status(400).send({ message: "Invalid or expired token" });

//     // Update the user's password
//     const salt = await bcrypt.genSalt(Number(process.env.SALT));
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);

//     user.password = hashedPassword;
//     await user.save();

//     // Delete the used token
//     await Token.findByIdAndDelete(token._id);

//     res.status(200).send({ message: "Password reset successfully" });
//   } catch (error) {
//     next(error);
//   }
// });



module.exports = router;
