import React, { useState } from "react";
import axios from "axios";
import { CancelIcon } from "../MySVGIcons";

const ProfilePopUp = ({ closePopup, userData }) => {
  const [photo, setPhoto] = useState(null);
  const [showSave, setShowSave] = useState(false);

//   const handleError = (err) =>
//   toast.error(err, {
//     position: "bottom-left",
//   });
// const handleSuccess = (msg) =>
//   toast.success(msg, {
//     position: "bottom-left",
//   });

  const handleFileChange = (event) => {
    const newPhoto = event.target.files[0];
    setPhoto(newPhoto);
    setShowSave(!!newPhoto); // Set showSave to true if a new photo is selected
  };

  const handleUploadProfile = async () => {
    const userId = userData._id;
    const data = new FormData();
    data.append("photo", photo);
    data.append("userId", userId);
    const response = await axios.post(
      "http://localhost:4000/uploadUserProfile",
      data
    );
    const {status, message} = response.data;
    if(status){
      console.log(message);
      closePopup();
      window.location.reload();
    }else{
      console.log(message);
    }
    
    // setPhoto(null);
    // setShowSave(false);
  };

  return (
    <div className="profile-popup-model">
      <div className="popup">
        <div className="popup-close-btn" onClick={closePopup}>
          <h4 className="popup-image-heading">Change Photo</h4>
          <CancelIcon />
        </div>
        <div className="popup-content">
          <div className="profile-photo">
            {photo ? (
              <img src={URL.createObjectURL(photo)} alt="Selected" />
            ) : (
              <img
                src={
                  userData.profileImage
                    ? `http://localhost:4000/fetchProfileImage/${userData.profileImage}`
                    : `/images/user-profile-photo.svg`
                }
                alt="User Profile Photo"
              />
            )}
          </div>
        </div>
        <div className="popup-action">
          {!showSave && (
            <input
              type="file"
              id="photo"
              name="file"
              accept="image/*"
              onChange={(event) => handleFileChange(event)}
            />
          )}
          <label
            className={`upload-profile ${
              showSave ? "save-mode" : "upload-mode"
            }`}
            onClick={showSave ? handleUploadProfile : null}
          >
            {showSave ? "Save" : "Upload"}
          </label>
          {/* {showSave && <button onClick={handleUploadProfile}>Save</button>} */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePopUp;
