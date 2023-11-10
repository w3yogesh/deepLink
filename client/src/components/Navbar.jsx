import React from "react";
import "../styles/Navbar.css"

export default function Navbar() {
  return (
    <>
      <header className="site-header">
        <div className="navbar-wrapper">
            <div className="logo-container">
                <a href="/">
                <img className="logo"
                  src="https://www.deeplink.ai/wp-content/uploads/2020/11/cropped-Logo-Transparent-Noir-Jaune.png"
                  alt="deeplink"
                />
</a>
            </div>
            <div className="nav-wrapper">
                <ul className="nav-menu">
                  <li className="nav-menu-item"><a href="/">Home</a></li>
                  <li className="nav-menu-item"><a href="/mynetwork">My Network</a></li>
                  <li className="nav-menu-item"><a href="/jobs">Jobs</a></li>
                  <li className="nav-menu-item"><a href="/messaging">Messages</a></li>
                  <li className="nav-menu-item"><a href="/notifications">Notification</a></li>
                </ul>
            </div>
        </div>
      </header>
    </>
  );
}
