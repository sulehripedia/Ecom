import Footer from "../components/Footer";
import HeroWithThreads from "../components/HeroWithThread";
import InProgress from "../components/InProgress";
import InProgressWork from "../components/InProgressWork";
import MyWork from "../components/MyWork";
import './TestHome.css';
const TestHome = () => {
  return (
    <>
     <HeroWithThreads/>
     <MyWork/>
     <InProgress />
     <InProgressWork />
     <Footer />
    
    </>
  );
};

export default TestHome;
