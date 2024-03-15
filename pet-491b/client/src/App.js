import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import Pet from "./components/Pet";



function App() {
	// determine if a user is authenticated.
	const user = localStorage.getItem("token");

	// Routes 
	return (
		<Routes>
			{user && <Route path="/main" exact element={<Main />} />}
			<Route path="/pet" exact element={<Pet />} />
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/pet" />} />
			<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
		</Routes>
	);
}


export default App;
