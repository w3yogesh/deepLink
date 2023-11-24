//SideBar user Profile

import React, { useState } from "react";
import "../../styles/MyProfileComponent/ShortProfile.css";
import { CameraIcon } from "../MySVGIcons";
import ProfilePopUp from "./ProfilePopUp";

const ShortProfile = ({ userData }) => {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const city =
    userData && userData.address && userData.address.length > 0
      ? userData.address[0].city
      : null;
  const country =
    userData && userData.address && userData.address.length > 0
      ? userData.address[0].country
      : null;

  return (
    <>
      <div className="profile-container left">
        <div className="profile-photo">
          <img
            src={
              userData.profileImage
                ? `http://localhost:4000/fetchProfileImage/${userData.profileImage}`
                : `/images/user-profile-photo.png`
            }
            alt="User Profile Photo"
          />
          <div className="profile-upload-icon">
            <div className="photo-icon" onClick={openPopup}>
              <CameraIcon />
            </div>
          </div>
        </div>
        <h1 className="user-name">
          {userData.firstName} {userData.lastName}
        </h1>
        <p className="user-headline">{userData.headline}</p>
        <p className="user-location">
          {city} {country}
        </p>
       <strong> <p className="user-conections">{userData.connections.length} connections</p></strong>
      </div>

      <div>
        {showPopup && (
          <ProfilePopUp closePopup={closePopup} userData={userData} />
        )}
      </div>
    </>
  );
};
export default ShortProfile;
