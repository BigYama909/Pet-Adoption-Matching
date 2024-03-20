
//import SearchBar from "./Components/SearchBar/SearchBar.jsx";
import Home from "./Pages/Home/Home.jsx";
import About from "./Pages/About/About.jsx";
import Donate from "./Pages/Donate/Donate.jsx";
import Login from "./Components/Login/index.jsx";
import { Route, Routes } from "react-router-dom";
import './App.css'

function App() {
 
  return (
    <>
        

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        
    </>
  );
}

export default App;
