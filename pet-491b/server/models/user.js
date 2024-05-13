// mongoose for MongoDB,
// jsonwebtoken for JWT, Joi for input validation 
// joi-password-complexity for password complexity validation.
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

//User schema
const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	verified: { type: Boolean, default: false },
	phone: { type: String, required: false },
	petPreferences: {
        petType: { type: String, required: false },
        petSize: { type: String, required: false },
        petBreed: { type: String, required: false },
		age: {type: String, required: false}
    },
	favoritePets: {
		fav1: { type: String, required: false },
		fav2: { type: String, required: false },
		fav3: { type: String, required: false },
		fav4: { type: String, required: false },
		fav5: { type: String, required: false },
		fav6: { type: String, required: false },
		fav7: { type: String, required: false },
		fav8: { type: String, required: false },
		fav9: { type: String, required: false },
		fav10: { type: String, required: false },
	}
});

// generate a JWT token
userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

// Creates a Mongoose model named User
const User = mongoose.model("user", userSchema);

// validate user input
const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		phone: Joi.string().regex(/^\d{10}$/).label("Phone"),
		favoritePets: Joi.object({
			fav1: Joi.string().allow('', null),
			fav2: Joi.string().allow('', null),
			fav3: Joi.string().allow('', null),
			fav4: Joi.string().allow('', null),
			fav5: Joi.string().allow('', null),
			fav6: Joi.string().allow('', null),
			fav7: Joi.string().allow('', null),
			fav8: Joi.string().allow('', null),
			fav9: Joi.string().allow('', null),
			fav10: Joi.string().allow('', null),
		}).label("Favorite Pets")
	});
	return schema.validate(data);
};

module.exports = { User, validate };
