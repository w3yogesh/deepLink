import '../styles/home.css';



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
       

    </>
  );
};

export default Home;