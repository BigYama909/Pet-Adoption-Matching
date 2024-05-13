import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import Pet from "./components/Pet";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import PetCare from "./components/PetCare";
import About from "./components/About";
import Home from "./components/Home";
import Policy from "./components/Policy";
import Testing from "./components/TestingLogout";
import Survey from "./components/Survey/survey.jsx";
import Donate from "./components/Donate/Donate.jsx";
import PetTest from "./components/petTest";
import UserProfile from "./components/UserProfile/UserProfile.jsx";
import PetGallery from './components/Pet_Gallery/PetGallery.jsx';
import PetProfile from './components/PetProfile/PetProfile';
import Matching from './components/Matching/Matching.jsx'



 import './App.css'
 import {useTheme} from "./components/ThemeContext.js"
 import {useEffect} from 'react';



function App() {
	// determine if a user is authenticated.
	const user = localStorage.getItem("token");

	// //Nightmode
	 const { isNightMode } = useTheme();
	 useEffect(() => {
		// Add or remove the .nightMode class on the body tag
		if (isNightMode) {
		document.body.classList.add('nightMode');
	 	} else {
		document.body.classList.remove('nightMode');
	 	}
	}, [isNightMode]);


	// Routes 
	return (
		<Routes>
			{user && <Route path="/main" exact element={<Main />} />}
			<Route path="/pets" exact element={<Pet />} />
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Login/>} />
			<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/resetpass/:id/:token" element={<ResetPassword />} />
			<Route path="/petCare" exact element={<PetCare />} />
			<Route path="/about" exact element={<About />} />
			<Route path="/policy" exact element={<Policy />} />
			<Route path="/home" exact element={<Home />} />
			<Route path="/test" exact element={<Testing />} />
			<Route path="/survey" exact element={<Survey />} />
			<Route path="/donate" exact element={<Donate />} />
			<Route path="/pettest" exact element={<PetTest />} />
			<Route path="/userprofile" exact element={<UserProfile />} />
			<Route path="/" element={<PetGallery />} />
        	<Route path="/pet/:name" element={<PetProfile />} />
			<Route path="/matching" element={<Matching />} />
		</Routes>
	);
	
}

export default App;
 