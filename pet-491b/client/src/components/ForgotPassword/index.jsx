import { useState } from "react";
import axios from "axios";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleForgotPassword = async () => {
    try {
      const url = "http://localhost:8080/api/reset";
      await axios.post(url, { email });
      setSuccess("Password reset email sent successfully. Check your email for instructions.");
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

  return (
    <div>
      <h2>Forgot Password</h2>
      <p>Enter your email address to receive instructions for resetting your password.</p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {error && <div>{error}</div>}
      {success && <div>{success}</div>}
      <button onClick={handleForgotPassword}>Reset Password</button>
    </div>
  );
};

export default ForgotPassword;


