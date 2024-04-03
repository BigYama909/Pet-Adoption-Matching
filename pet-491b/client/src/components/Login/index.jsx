import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
	// useState hook to manage the state of data
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	// event handler for input changes. It updates the state based on the input field's name and value.
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	// event handler for form submissions. 
	// It sends a POST request to the authentication endpoint with the provided email and password.
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};


	// Render 
	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Sign In to Your Account</h1>
						<h2> Don't have an account?
						<Link to="/signup">
							<button type="button" className={styles.signup_btn}>
							Sign Up
							</button>
						</Link>
						</h2>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.login_btn}>
							Log In
						</button>
						<div>
							<Link to="/forgot">Forgot Password?</Link>
						</div>
					</form>
				</div>
				<div className={styles.right}>
					<h1>Welcome to Pet Adoption Match</h1> 
				</div>
			</div>
		</div>
	);
};

export default Login;
