import React, { useState } from "react";
import { EducationUserProfile } from "./EducationUserProfile";
import { ArrowUp, ArrowDown } from "../MySVGIcons.jsx";
import { ExperienceUserProfile } from "./ExperienceUserProfile.jsx";
import PostComponent from "../FeedComponent/PostComponent.jsx";
import PostCard from "../FeedComponent/PostCard.jsx";

export default function MainUserProfile({ userData,senderId,userName }) {
  const city =
    userData && userData.address && userData.address.length > 0
      ? userData.address[0].city
      : null;
  const country =
    userData && userData.address && userData.address.length > 0
      ? userData.address[0].country
      : null;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExpOpen, setIsExpOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [allPostObj, setAllPostObj] = useState(userData.posts);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleExpdown = () => {
    setIsExpOpen(!isExpOpen);
  };
  const togglePostdown = () => {
    setIsPostOpen(!isPostOpen);
  }
  const reversedPosts = Array.isArray(allPostObj)
    ? [...allPostObj].reverse()
    : [];
console.log(userData);
  return (
    <div className="main-UserProfile">
      <div className="user-about">
        <h3 className="section-heading">Basic Information</h3>
        <div className="user-label">
          <span className="user-label-tag">Name:</span>
          <span className="user-label-value">
            {userData.firstName} {userData.lastName}
          </span>
        </div>
        <div className="user-label">
          <span className="user-label-tag">Email:</span>
          <span className="user-label-value">{userData.email}</span>
        </div>
        <div className="user-label">
          <span className="user-label-tag">Address:</span>
          <span className="user-label-value">
            {city} , {country}
          </span>
        </div>
        {userData.headline && (
          <div className="user-label" style={{ border: 0 }}>
            <span className="user-label-tag">Headline:</span>
            <span className="user-label-value">{userData.headline}</span>
          </div>
        )}
      </div>
      <div className="user-education">
        <div className="education-dropdown" onClick={toggleDropdown}>
          <h3 className="section-heading">Education</h3>
          <span className="arrow">
            {isDropdownOpen ? <ArrowUp /> : <ArrowDown />}
          </span>
        </div>
        {isDropdownOpen && <EducationUserProfile userData={userData} />}
      </div>
      <div className="user-education">
        <div className="education-dropdown" onClick={toggleExpdown}>
          <h3 className="section-heading">Experience</h3>
          <span className="arrow">
            {isExpOpen ? <ArrowUp /> : <ArrowDown />}
          </span>
        </div>
        {isExpOpen && <ExperienceUserProfile userData={userData} />}
      </div>
      <div className="user-education">
        <div className="education-dropdown" onClick={togglePostdown}>
          <h3 className="section-heading">Posts</h3>
          <span className="arrow">
            {isPostOpen ? <ArrowUp /> : <ArrowDown />}
          </span>
        </div>
        {isPostOpen && <div className="post-container">
          {reversedPosts.map((post, index) => (
            <div className="post-body" key={index}>
              <PostCard
                postObj={post}
                userId={senderId}
                userName={userName}
              />
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
}
