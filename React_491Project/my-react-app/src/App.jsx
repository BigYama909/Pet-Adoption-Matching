
//import SearchBar from "./Components/SearchBar/SearchBar.jsx";
import Home from "./Pages/Home/Home.jsx";
import About from "./Pages/About/About.jsx";
import Donate from "./Pages/Donate/Donate.jsx";
import Login from "./Components/Login/index.jsx";
import SignUp from "./Components/Signup/index.jsx"
import { Route, Routes } from "react-router-dom";
import './App.css'
import {useTheme} from "./Components/ThemeContext.jsx"
import {useEffect} from 'react';


function App() {
  const { isNightMode } = useTheme();

  useEffect(() => {
    // Add or remove the .nightMode class on the body tag
    if (isNightMode) {
      document.body.classList.add('nightMode');
    } else {
      document.body.classList.remove('nightMode');
    }
  }, [isNightMode]);
  return (
    <>
      
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>

        
    </>
  );
}

export default App;
