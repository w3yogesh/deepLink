//SideBar user Profile

import React, { useState } from "react";

const ShortUserProfile = ({ userData }) => {
  const city =
    userData && userData.address && userData.address.length > 0
      ? userData.address[0].city
      : null;
  const country =
    userData && userData.address && userData.address.length > 0
      ? userData.address[0].country
      : null;
  console.log(userData);
  return (
    <div className="profile-sidebar left">
      <div className="short-profile-view">
        <div className="profile-photo">
          <img src="/images/user-profile-photo.svg" alt="User Profile Photo" />
        </div>
        <div className="profile-meta">
          <h1 className="userName">
            {userData.firstName} {userData.lastName}
          </h1>
          <p className="userHeadline">{userData.headline}</p>
          <p className="userLocation">
            {city}, {country}
          </p>
          <p className="userConections"></p>
        </div>
        <div className="profile-actions">
          <div className="follow-btn primary-button">
            <a href="">Connect</a>
          </div>
          <div className="message-btn secondary-button">
            <a href="">Message</a>
          </div>
        </div>
      </div>
      <div className="profile-skill">
        <h3 className="section-heading">Skills</h3>
        <div className="skills">
          <ul className="skill-list">
            {userData.skill.map((skill, index) => (
              <li className="skill-items" key={index}>
                <div className="skill-name">{skill.skillName}</div>
                <div className="skill-lavel">{skill.skillLevel}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ShortUserProfile;
