//SideBar user Profile

import React, { useState } from 'react'
import "../../styles/userProfileComponent/ShortProfile.css"

const ShortProfile = ({userData, setUserData }) => {
  const city = (userData && userData.address && userData.address.length > 0
    ? userData.address[0].city 
    : '');
  const country = ( (userData && userData.address && userData.address.length > 0
    ? userData.address[0].country
    : ''));

  return (
    <div className="profile-container left">
            <div className="profile-photo">
              <img
                src="/images/user-profile-photo.svg"
                alt="User Profile Photo"
              />
            </div>
            <h1 className="user-name">{userData.firstName} {userData.lastName}</h1>
            <p className="user-headline">{userData.headline}</p>
            <p className="user-location">{city} {country}</p>
            <p className="user-conections">646 followers * 500+ connections</p>
          </div>
  )
}
export default ShortProfile;
