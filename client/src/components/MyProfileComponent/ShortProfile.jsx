//SideBar user Profile

import React, { useState } from "react";
import "../../styles/MyProfileComponent/ShortProfile.css";

const ShortProfile = ({ userData }) => {
  const [photo, setPhoto] = useState(null);
  
  const city =
    userData && userData.address && userData.address.length > 0
      ? userData.address[0].city
      : null;
  const country =
    userData && userData.address && userData.address.length > 0
      ? userData.address[0].country
      : null;

      const handleFileChange = (event) => {
        setPhoto(event.target.files[0])
      };
      const handleUploadProfile= ()=>{
        const data = new FormData();
        data.append('photo', photo);
        console.log(data);
      }
     

  return (
    <div className="profile-container left">
      <div className="profile-photo">
        <img src="/images/user-profile-photo.svg" alt="User Profile Photo" />
      </div>
      <h1 className="user-name">
        {userData.firstName} {userData.lastName}
      </h1>
      <p className="user-headline">{userData.headline}</p>
      <p className="user-location">
        {city} {country}
      </p>
      <p className="user-conections">646 followers * 500+ connections</p>

      <input type="file"  id="photo"  name='file'
        onChange={(event)=>handleFileChange(event)}/>
         <button onClick={handleUploadProfile}>
        upload
      </button>
    </div>
  );
};
export default ShortProfile;
