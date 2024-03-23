import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import styles from "./Home.module.css"
import SearchBar from "../../Components/SearchBar/SearchBar";
import PetList from "../../Components/PetList/PetList";
import Advice from "../../Components/Advice/Advice";
import Quick_FAQ from "../../Components/Quick_FAQ/Quick_FAQ.jsx"
import Services from "../../Components/Services/Services.jsx";
import FAQ from "../../Components/FAQ/FAQ.jsx";
function Home() {
  return(
  <>
  <Header/>
  <SearchBar/>
  <PetList />
  <Advice />
  <Quick_FAQ />
  <Services />
  <FAQ />
  <Footer />
  </>
  );
  
}
export default Home;
