import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import Pet from "./components/Pet";
import ForgotPassword from "./components/ForgotPassword";
import PetCare from "./components/PetCare";
import Header from "./components/Header";
import About from "./components/About";



function App() {
	// determine if a user is authenticated.
	const user = localStorage.getItem("token");

	// Routes 
	return (
		<Routes>
			{user && <Route path="/main" exact element={<Main />} />}
			<Route path="/pets" exact element={<Pet />} />
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
			<Route path="/forgot" exact element={<ForgotPassword />} />
			<Route path="/petCare" exact element={<PetCare />} />
			<Route path="/header" exact element={<Header />} />
			<Route path="/about" exact element={<About />} />

		</Routes>
	);
	
}

export default App;
 