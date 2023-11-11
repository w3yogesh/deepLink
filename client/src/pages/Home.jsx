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
        
        

       <div className='container1'>

        <div className='left'>

        <h2 className='head-text'>Lorem ipsum dolor sit amet.lorem5 Lorem ipsum dolor sit amet.</h2>


        <div class="btn-container">
  <div>
    <button class="log">Login</button>
    <button class="reg">Sign up</button>
    <p>Made with Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem vitae numquam quod at consequatur non soluta magnam fuga aliquid eius.</p>
  </div>
</div>
        </div>

        <div className='right1'>
        </div>


       </div>

        <div className='second-container'>

        <div className='box1'>

        </div>

        <div className="box2">

        </div>

        <div className="box3">

        </div>

        <div className="box4">

        </div>
        
        <div className="box5">

        </div>

        <div className="box6">

        </div>


        </div>

      

    </>
  );
};

export default Home;