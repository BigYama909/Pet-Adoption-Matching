import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const navigate = useNavigate(); // This hook gives you access to the history instance that you may use to navigate.

	// Check if the user is already logged in
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			navigate('/'); // Redirect to the homepage or dashboard
		}
	}, [navigate]);

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			localStorage.setItem("name", data.name); // Ensure that 'name' and 'email' are being returned in 'res'
			localStorage.setItem("email", data.email);
			console.log("login res: ", res);
			navigate('/'); // Redirect after successful login
		} catch (error) {
			if (error.response && error.response.status >= 400 && error.response.status <= 500) {
				setError(error.response.data.message);
			}
		}
	};

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
							<Link to="/forgot-password">Forgot Password?</Link>
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
