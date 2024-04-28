import Header from "../Header/index";
import Footer from "../Footer/index";
import Advice from "../Advice/Advice";
import Quick_FAQ from "../Quick_FAQ/Quick_FAQ.jsx";
import FAQ from "../FAQ/FAQ.jsx";
import SurveyLink from "../Survey/survey.jsx";


function Home() {
  return (
    <>
      <Header />
      <Advice />
      <Quick_FAQ />
      <FAQ />
      <SurveyLink />
      <Footer />
    </>
  );
}
export default Home;
