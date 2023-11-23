import Navbar from '../components/Navbar';
import '../styles/home.css';
import { Link } from 'react-router-dom';
import React, {useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userAuth = async () => {
      const response = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status } = response.data;
      if (status) {
        navigate("/feed")
      }
    };
    userAuth();
  }, []);

  return (
    <>
       <Navbar/>
        
        

       <div className='container1'>

        <div className='left'>

        <h2 className='head-text'>Lorem ipsum dolor sit amet.lorem5 Lorem ipsum dolor sit amet.</h2>


        <div class="btn-container">
  <div>
   <Link to="/login"><button class="log" >Login</button></Link> 
   <Link to="/signup"><button class="reg">Sign up</button></Link> 
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