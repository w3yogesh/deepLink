import React from "react";
import '../styles/Navbar.css'

export default function Navbar() {
  return (
    <>
      <header className="site-header">
        <div className="navbar-wrapper">
          <div className="navbar">
            <div className="logo-container">
              <h1 className="logo">
                <img
                  src="https://www.deeplink.ai/wp-content/uploads/2020/11/cropped-Logo-Transparent-Noir-Jaune.png"
                  alt="deeplink"
                />
                DeepLink
              </h1>
            </div>
            <div className="nav-wrapper">
              <div className="nav">
                <ul className="nav-menu">
                  <li className="nav-menu-item">Home</li>
                  <li className="nav-menu-item">My Network</li>
                  <li className="nav-menu-item">Jobs</li>
                  <li className="nav-menu-item">Messages</li>
                  <li className="nav-menu-item">Notification</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
