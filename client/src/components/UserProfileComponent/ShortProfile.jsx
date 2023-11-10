//SideBar user Profile

import React from 'react'
import "../../styles/userProfileComponent/ShortProfile.css"

export const ShortProfile = () => {
  return (
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
  )
}
