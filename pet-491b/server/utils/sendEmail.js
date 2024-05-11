const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			port: Number(process.env.EMAIL_PORT),
			secure: false,
			auth: {
				user:" petadoptionmatch@outlook.com",
				pass: "Leoyuki100598",
			},
		});

		await transporter.sendMail({
			from: "petadoptionmatch@outlook.com",
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};
