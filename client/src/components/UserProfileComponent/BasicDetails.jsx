import { React, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const BasicDetails = ({ userData, setUserData }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
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

  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <>
      <div className="user-details details">
        <div className="edit-details">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="50px"
            height="50px"
            onClick={() => {
              setIsEditMode(!isEditMode);
            }}
          >
            {!isEditMode && <EditIcon />}
            {isEditMode && <SaveIcon />}
          </svg>
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
                    <option value="male">Male</option>
                    <option value="gemale">Female</option>
                    <option value="transgender">Transgender</option>
                  </select>
                </div>
                <div className="form-data">
                  <label htmlFor="mobile">Mobile Number</label>
                  <input
                    type="text"
                    name="mobileNo"
                    value={userData.mobileNo}
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
                    value={userData.userName}
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
                  value={userData.address.country}
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
                  value={userData.address.city}
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
