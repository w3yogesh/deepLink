import React from "react";
import Navbar from "../components/Navbar";
const UserDetails = () => {
  return (
    <>
        <Navbar/>
      <div className="main-container">
        <div className="user-detail-container">
            <div className="bg-img-container">
                <div className="bg-image">
                    <>IMAGE</>
                </div>
            </div>

            <div className="profile-container">
                <div className="profile-image">
                    <>Profile Image</>
                </div>
                <div className="user-edit-btn">
                    <>Button</>
                </div>
            </div>
            <div className="user-info-container">
                <div className="user-details">
                    <div className="form-container">
                        <form action="">
                            <div className="basic-info-section"><h4>Basic Info</h4>
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" name="firstName" required/>
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" name="lastName" required/>
                                <label htmlFor="Gender">Gender</label>
                                <select>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Transgender">Transgender</option>
                                </select>
                                <label htmlFor="mobile">Mobile Number</label>
                                <input type="text" name="mobile"/>
                            
                                <label htmlFor="Email">Email</label>
                                <input type="email" name="Email" disabled/>
                                <label htmlFor="Username">Username</label>
                                <input type="text" name="username" />

                                <label htmlFor="headline">Headline</label>
                                <input type="text" name="headline" required/>
                            </div>
                            <div>Location
                            <label htmlFor="country">Country/Region</label>
                            <input type="text" name="country" required/>
                            <label htmlFor="City">City</label>
                            <input type="text" name="city" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

      </div>

    </>
  );
};

export default UserDetails;
