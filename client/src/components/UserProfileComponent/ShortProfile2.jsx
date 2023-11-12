//SideBar user Profile

import React from 'react'
// import "../../styles/userProfileComponent/ShortProfile2.css"

export const ShortProfile = () => {
  return (
    <>
    <div className="containermain">
    <div className="profile-container left">
            <div className="profile-photo">
              <img
                src="/images/user-profile-photo.svg"
                alt="User Profile Photo"
              />
            </div>
            <h1 className="user-name">Yogesh Kumar Sai</h1>
            <p className="user-headline">
              MCA' 25 @NIT Allahabad | Front-end Developer | SEO Specialist
            </p>
            <p className="user-location">Rajasthan, India</p>
            <p className="user-conections">646 followers * 500+ connections</p>
          </div>
          <div className="buttons-container">
        <button className="connect-button">Connect</button>
        <button className="message-button">Message</button>
      </div>
          </div>
         </>
    
        
  )
}
