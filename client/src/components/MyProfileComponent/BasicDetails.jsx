import { React, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {EditIcon, SaveIcon} from "../MySVGIcons.jsx";

const BasicDetails = ({ userData, setUserData }) => {

  const prevUserData = userData;


  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'phoneNumber' && (value.length > 10 || !/^\d*$/.test(value))) {
      toast.error("Phone number must be empty or have a length of 10 digits", {
        position: "bottom-left",
      });
      return;
    }

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setUserData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const [isEditMode, setIsEditMode] = useState(false);

  const handleToggleEditMode = async () => {

    if(isEditMode && userData.phoneNumber.length>0 && userData.phoneNumber.length<10) {
      toast.error("Phone number must be empty or have a length of 10 digits", {
        position: "bottom-left",
      });
      return;
    }

    if(isEditMode && userData === prevUserData) {
      toast.error("no data changed", {
        position: "bottom-left",
      });
      setIsEditMode(!isEditMode);
      return;
    }

    setIsEditMode(!isEditMode);
    if (isEditMode) {
      try {
        const response = await axios.put(
          "http://localhost:4000/updateUserProfile",
          {
            userId: userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            gender: userData.gender,
            phoneNumber: userData.phoneNumber,
            headline: userData.headline,
            city: userData.address.city,
            country: userData.address.country,
          }
        );
        //  console.log(userData.address._id);
         console.log(userData);


        if (response.data.success) {
          handleSuccess(response.data.message);
        } else {
          handleError(response.data.message);
        }
      } catch (error) {
        handleError("Server Error retry");
      }
    }
  };

  return (
    <>
      
      <div className="user-details details">
        <div className="edit-details" onClick={handleToggleEditMode}>
         
            {!isEditMode && <EditIcon />}
            {isEditMode && <SaveIcon />}
        </div>
        <div className="form-container">
          <form action="">
            <div className="basic-info-section">
              <h4>Basic Info</h4>
              <div className="form-row">
                <div className="form-data">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    required
                  />
                </div>
                <div className="form-data">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-data">
                  <label htmlFor="Gender">Gender</label>
                  <select
                    name="gender"
                    value={userData.gender}
                    onChange={handleChange}
                    disabled={!isEditMode}
                  >
                    <option value="" disabled selected>
                      -Select Gender-
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="transgender">Transgender</option>
                  </select>
                </div>
                <div className="form-data">
                  <label htmlFor="mobile">Mobile Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                    disabled={!isEditMode}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-data">
                  <label htmlFor="Email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                <div className="form-data">
                  <label htmlFor="Username">Username</label>
                  <input
                    type="text"
                    name="userName"
                    value={userData.username}
                    onChange={handleChange}
                    disabled
                  />
                </div>
              </div>
              <div className="form-row" style={{ display: "contents" }}>
                <label htmlFor="headline">Headline</label>
                <input
                  type="text"
                  name="headline"
                  value={userData.headline}
                  onChange={handleChange}
                  disabled={!isEditMode}
                  required
                />
              </div>
            </div>

            <h4 style={{ marginTop: "30px" }}>Location</h4>
            <div className="form-row">
              <div className="form-data">
                <label htmlFor="country">Country/Region</label>
                <input
                  type="text"
                  name="address.country"
                  value={
                    userData && userData.address && userData.address.length > 0
                      ? userData.address[0].country
                      : null
                  }
                  onChange={handleChange}
                  disabled={!isEditMode}
                  required
                />
              </div>
              <div className="form-data">
                <label htmlFor="City">City</label>
                <input
                  type="text"
                  name="address.city"
                  value={
                    userData && userData.address && userData.address.length > 0
                      ? userData.address[0].city
                      : null
                  }
                  onChange={handleChange}
                  disabled={!isEditMode}
                  required
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BasicDetails;
