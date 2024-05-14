const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.office365.com",
			port: Number(process.env.EMAIL_PORT),
			secure: false,
			auth: {
				user:"petadoptionmatch@outlook.com",
				pass:"Leoyuki100598",
			},
			tls: {
				ciphers: 'SSLv3',
				rejectUnauthorized: false,
			},
			logger: true,
			debug: true, // Enable debug output
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
