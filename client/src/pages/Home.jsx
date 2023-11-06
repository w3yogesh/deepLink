import '../styles/home.css';
import TypingEffect from './TypingEffect'; 



const Home = () => {
  return (
    <>
        <nav id="navbar" className="">
          <div className="nav-wrapper">
          <div className="logo">
              <a href="#home">Logo</a>
          </div>
          <ul id="menu">
              <li><a href="/">Home</a></li>
              <li><a href="/portfolio">portfolio</a></li>
              <li><a href="/signup">Signup</a></li>
              <li><a href="/login">Login</a></li>
          </ul>
          </div>
        </nav>
        
        <div className="job-seeker-homepage">
      <div className="glass-background">
        <div className="content">
          
        <h1> <TypingEffect text="Helping you Land a Job and Live your Dreams." speed={60}/></h1>
       
          <div className="search-box">
            <input type="text" placeholder="Search for jobs" />
            <button>Search</button>
          </div>
          <div className="trust-section">
        <h2>People Who Trust Us</h2>
        
      </div>
        <button className="upload-cv-button">Upload CV</button>
        </div>
      </div>
    </div>

    </>
  );
};

export default Home;