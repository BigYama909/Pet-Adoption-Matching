// Importing necessary components from the Components folder
import LoggedOutHeader from "../../Components/Header/LoggedOutHeader.jsx";
import LoggedInHeader from "../../Components/Header/LoggedInHeader.jsx";
import Footer from "../../Components/Footer/Footer";
import SearchBar from "../../Components/SearchBar/SearchBar";
import PetList from "../../Components/PetList/PetList";
import Advice from "../../Components/Advice/Advice";
import Quick_FAQ from "../../Components/Quick_FAQ/Quick_FAQ.jsx";
import Services from "../../Components/Services/Services.jsx";
import FAQ from "../../Components/FAQ/FAQ.jsx";
import Chat from "../../Components/Chat/Chat.jsx";
import Calculator from "../../Components/Cost_Calculator/Calculator.jsx";
import PetGallery from "../../Components/Pet_Gallery/PetGallery.jsx";
// Defining the Home component that renders the main page of the app
function Home() {
  return (
    <>
      <Chat />
      {/* 
      
      
      */}
      <LoggedInHeader />
      <SearchBar />
      <PetList />
      <Advice />
      <Quick_FAQ />
      <Services />
      <FAQ />
      <Calculator />
      <PetGallery />
      <Footer />
    </>
  );
}
// Exporting the Home component to be used in other parts of the app
export default Home;
