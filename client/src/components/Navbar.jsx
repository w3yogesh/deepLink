import React, { useState } from "react";
import "../styles/Navbar.css";
import { HeaderSearch } from "./HeaderSearch";
import Notification from "../pages/Notification";
import { AdminIcon } from "./MySVGIcons";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from 'react';
import axios from 'axios';



export default function Navbar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(0);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };



  useEffect(() => {
    const checkUnreadNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:4000/hasUnreadNotifications", { withCredentials: true });
        const unreadCount = response.data;
        setHasUnreadNotifications(unreadCount);
      } catch (error) {
        console.error('Error checking unread notifications:', error);
      }
    };
    checkUnreadNotifications();
  }, []);

console.log(`number of unread : ${hasUnreadNotifications}`);
  const [cookies, removeCookie] = useCookies([]);


  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleNotiToggle = () => {
    setIsNotiOpen(!isNotiOpen);
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
                <a href="/feed">Home</a>
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
              <li className="nav-menu-item" onClick={handleNotiToggle}>
              <a  className={hasUnreadNotifications>0? 'unread' : ''}>
            Notification {hasUnreadNotifications}
          </a>
              </li>
            </ul>
          </div>
          <div className="user-menu-icon">
            <div className="user-icon" onClick={handleDropdownToggle}>
              <AdminIcon />
            </div>
          </div>
          <div className="hamburger-icon" onClick={handleMobileMenuToggle}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
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
        <div className={`drop-menu ${isNotiOpen ? 'show' : ''}`}>
          <Notification/>
        </div>
        </div>
      </header>
     
    </>
  );
}
