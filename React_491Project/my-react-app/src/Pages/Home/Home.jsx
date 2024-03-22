import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import styles from "./Home.module.css"
import SearchBar from "../../Components/SearchBar/SearchBar";
import PetList from "../../Components/PetList/PetList";
import Advice from "../../Components/Advice/Advice";
import FAQ from "../../Components/FAQ/FAQ.jsx"
function Home() {
  return(
  <>
  <Header/>
  <SearchBar/>
  <PetList />
  <Advice />
  <FAQ />
  <Footer />
  </>
  );
  
}
export default Home;
