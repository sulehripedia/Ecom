import './Play.css';
import PlayFun from '../components/PlayFun';
const Play = () => {
    return(
        <>
        <div>
         <div className="about-header-div">
              <h1 className="about-heading">Play.</h1>  
              </div>  
               <div className="hw-subtitle-wrapper">
              <p className="hw-description play-text">A collection of tools, sections, and digital experiments I've built practical, fun, & occasionally a little unconventional.</p>
            </div>
        </div>
        <PlayFun />
        
        </>
    );
};

export default Play;