import React, { useState } from "react";
import "../styles/Navbar.css";
import { HeaderSearch } from "./HeaderSearch";
import { AdminIcon } from "./MySVGIcons";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";



export default function Navbar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cookies, removeCookie] = useCookies([]);


  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const Logout = () => {
    removeCookie("token");
    navigate("/");
  };

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
          <HeaderSearch />
          <div className="nav-wrapper">
            <ul className="nav-menu">
              <li className="nav-menu-item">
                <a href="/">Home</a>
              </li>
              <li className="nav-menu-item">
                <a href="/mynetwork">My Network</a>
              </li>
              <li className="nav-menu-item">
                <a href="/jobs">Jobs</a>
              </li>
              <li className="nav-menu-item">
                <a href="/chat">Messages</a>
              </li>
              <li className="nav-menu-item">
                <a href="/notifications">Notification</a>
              </li>
            </ul>
          </div>
          <div className="user-menu-icon">
            <div className="user-icon" onClick={handleDropdownToggle}>
              <AdminIcon />
            </div>
          </div>
          
        <div className={`drop-menu ${isDropdownOpen ? 'show' : ''}`}>
          <div className="drop-menu-item">
            <a href="/myprofile">My Profile</a>
          </div>
          <div className="drop-menu-item">
            <a href="/mytimeline">My Timeline</a>
          </div>
          <div className="drop-menu-item">
            <a href="/mycompanies">My Companies</a>
          </div>
          <div className="drop-menu-item">
            <a href="" onClick={Logout}>Logout</a>
          </div>
        </div>
        </div>
      </header>
     
    </>
  );
}
