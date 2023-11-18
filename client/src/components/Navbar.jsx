import React from "react";
import "../styles/Navbar.css"
import { HeaderSearch } from "./HeaderSearch";
import {AdminIcon} from "./MySVGIcons"
export default function Navbar() {
  return (
    <>
      <header className="site-header">
        <div className="navbar-wrapper grid-container">
            <div className="logo-container">
                <a href="/">
                <img className="header-logo"
                  src="https://www.deeplink.ai/wp-content/uploads/2020/11/cropped-Logo-Transparent-Noir-Jaune.png"
                  alt="deeplink"
                />
</a>
            </div>
            <HeaderSearch/>
            <div className="nav-wrapper">
                <ul className="nav-menu">
                  <li className="nav-menu-item"><a href="/">Home</a></li>
                  <li className="nav-menu-item"><a href="/mynetwork">My Network</a></li>
                  <li className="nav-menu-item"><a href="/jobs">Jobs</a></li>
                 <li className="nav-menu-item"><a href="/chat">Messages</a></li>
                  <li className="nav-menu-item"><a href="/notifications">Notification</a></li>
                </ul>
            </div>
            <div className="user-menu-icon">
              <div className="user-icon">
                <a href="/myprofile"><AdminIcon/></a>
              </div>
            </div>
        </div>
      </header>
    </>
  );
}
