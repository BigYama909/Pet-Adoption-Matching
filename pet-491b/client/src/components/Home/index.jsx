import Header from "../Header/index";
import Footer from "../Footer/index";
import Advice from "../Advice/Advice";
import Quick_FAQ from "../Quick_FAQ/Quick_FAQ.jsx";
import FAQ from "../FAQ/FAQ.jsx";

import SearchBar from "../SearchBar/SearchBar";
import PetList from "../PetList/PetList";
import Services from "../Services/Services.jsx";
import Chat from "../Chat/Chat.jsx";
import Calculator from "../Cost_Calculator/Calculator.jsx";
import PetGallery from "../Pet_Gallery/PetGallery.jsx";
import SurveyLink from "../Survey/survey.jsx";

function Home() {
  return (
    <>
      <Chat />
      <Header />
      <SearchBar />
      <PetList />
      <Advice />
      <Quick_FAQ />
      <Services />
      <FAQ />
      <Calculator />
      {/* <PetGallery/> */}
      <SurveyLink />
      <Footer />
    </>
  );
}
export default Home;
