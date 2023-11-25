import Navbar from "../components/Navbar";
import "../styles/home.css";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HomeImage } from "../components/MySVGIcons";
import "../styles/Navbar.css";


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
        navigate("/feed");
      }
    };
    userAuth();
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="navbar-wrapper grid-container">
          <div className="logo-container">
            <a href="/">
              <img
                className="header-logo"
                src="http://localhost:3000/images/DeepLink_logo.png"
                alt="deeplink"
              />
            </a>
          </div>
          <div className="nav-wrapper">
            <ul className="nav-menu">
              <li className="nav-menu-item">
                <a href="/login">Login</a>
              </li>
              <li className="nav-menu-item">
                <a href="/signup">Signup</a>
              </li>
            </ul>
          </div>
          
        </div>
      </header>
     
  

      <section className="home-main">
        <div className="grid-container">
          <div className="home-wrapper">
            <div className="left">
              <h1>Deep Link</h1>
              <p>
                Welcome to DeepLink, the thriving social network designed
                exclusively for professionals like you.
              </p>
              <div className="home-action">
                <div className="home-login home-btn">
                  <a href="/login" class="log">
                    Login
                  </a>
                </div>
                <div className="home-signup home-btn">
                  <a href="signup" class="reg">
                    Sign up
                  </a>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="home-img">
                <img src="/images/deepLink-home-connect.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about-us">
        <div className="grid-container">
          <div className="about-wrapper">
            <div className="about-left">
              <div className="about-detail">
                <h1>About DeepLink</h1>
                <p>
                  Welcome to DeepLink, where meaningful connections empower
                  professional growth. DeepLink is more than just a social
                  network; it's a dynamic platform designed exclusively for
                  professionals seeking purposeful connections, collaborative
                  opportunities, and a vibrant space for knowledge exchange.
                </p>
              </div>
            </div>
            <div className="about-right">
              <div className="about-img">
                <img src="/images/deeplink_about.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
      <div className="grid-container">
        <div className="feature">
          <div className="feature-wrapper">
            <h1 style={{ textAlign: 'center' }}>Features</h1>
            <div className="feature">
              <div className="feature-left">
                <img src="images/deeplin_elevate.svg" alt="" />
              </div>
              <div className="feature-right">
                <h3>Elevate Your Network</h3>
                <p>DeepLink goes beyond the surface, fostering meaningful connections among professionals from diverse industries. Connect with like-minded individuals, industry leaders, and potential collaborators, expanding your network in ways that truly matter.
</p>
              </div>
            </div>
            <div className="feature">
              <div className="feature2-left">
              <h3>Showcase Your Expertise</h3>
                <p>Your professional journey is unique, and DeepLink provides the platform to showcase your expertise. Build a dynamic profile that highlights your achievements, skills, and ambitions. Let your professional narrative shine and attract opportunities that align with your aspirations.</p>
              </div>
              <div className="feature2-right">
              <img src="images/deeplink_showcase.svg" alt="" />
              </div>
            </div>
          </div>
        </div>

      </div>
      </section>

    </>
  );
};

export default Home;
