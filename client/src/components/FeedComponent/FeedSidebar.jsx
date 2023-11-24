import React from "react";
import "../../styles/MyProfileComponent/ShortProfile.css";

const FeedSidebar = ({userData}) => {
  return (
    <div className="feed-container">
      <div className="profile-photo">
      <img src={ userData.profileImage ?`http://localhost:4000/fetchProfileImage/${userData.profileImage}` : `/images/user-profile-photo.svg`} alt="User Profile Photo" />
      </div>
      <h1 className="user-name">
        {userData.firstName} {userData.lastName}
      </h1>
      <p className="user-headline">{userData.headline}</p>
     <strong> <p className="user-conections">{userData.connections.length} connections</p></strong>
    </div>
  );
};

export default FeedSidebar;
