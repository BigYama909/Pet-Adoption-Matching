import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../images/success.png";
import styles from "./styles.module.css";
import { Fragment } from "react/cjs/react.production.min";


const EmailVerify = () => {
	//useState hook to manage the state of validUrl, which determines whether the email verification URL is valid or not.
	const [validUrl, setValidUrl] = useState(true);
	// useParams is used to get the parameters (id and token) from the URL.
	const param = useParams();

	//used to perform the verification when the component mounts
	useEffect(() => {
		// HTTP GET request to the email verification endpoint.
		const verifyEmailUrl = async () => {
			try {
				const url = `https://pet-adoption-matching.onrender.com/api/users/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

	// Render 
	return (
		<Fragment>
			{validUrl ? (
				<div className={styles.container}>
					<img src={success} alt="success_img" className={styles.success_img} />
					<h1>Email verified successfully</h1>
					<Link to="/login">
						<button className={styles.green_btn}>Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</Fragment>
	);
};

export default EmailVerify;
