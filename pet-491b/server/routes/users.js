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
