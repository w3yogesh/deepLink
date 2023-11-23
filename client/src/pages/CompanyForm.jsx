import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

export default function CompanyForm() {
  const [photo, setPhoto] = useState(null);
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    companyName: "",
    field: "",
    headquarter: "",
    website: "",
    email: "",
    companySize: "",
    about: "",
  });

  const [myId, setMyId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userAuth = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        const { status, user } = response.data;
        if (status) {
          setMyId(user._id);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error authenticating user:", error.message);
      }
    };
    userAuth();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (photo) {
      data.append("photo", photo);
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/createCompany/${myId}`,
        data
      );
      const{status, message} = response.data;
      if(status){
        toast.success(message, {
          position: "top-right",
        });
      }
      else{
        toast.error(message, {
          position: "top-right",
        });
      }

    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleLogoChange = (event) => {
    const selectedFile = event.target.files[0];
    setPhoto(selectedFile || null);
  };

  return (
    <>
      <Navbar />
      <div className="grid-container">
        <div className="company-form">
          <h3>Create Company</h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-row">
            <div className="form-data">
              <label>Company Name:</label>
              <input type="text" id="companyName" onChange={handleChange} />
            </div>

            <div className="form-data">
              <label>Field:</label>
              <input type="text" id="field" onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-data">
              <label>Headquarter:</label>
              <input
                type="text"
                id="headquarter"
                onChange={async (e) => {
                  const newInputValue = e.target.value;
                  if (newInputValue) {
                    try {
                      const response = await axios.get(
                        `http://api.geonames.org/searchJSON?q=${newInputValue}&maxRows=15&username=jeet24`
                      );
                      const newOptions = response.data.geonames.map(
                        (place) => place.name
                      );
                      setOptions(newOptions);
                    } catch (error) {
                      console.error("Error fetching locations:", error.message);
                    }
                  }
                  handleChange(e);
                }}
              />
            </div>

            <div className="form-data">
              <label>Website of Company:</label>
              <input type="text" id="website" onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-data">
              <label>Email:</label>
              <input type="email" id="email" onChange={handleChange} />
            </div>

            <div className="form-data">
              <label>Company Size:</label>
              <input type="text" id="companySize" onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-data">
              <label>Tell us briefly about your company:</label>
              <textarea id="about" onChange={handleChange} />
            </div>

            <div className="form-data">
              <label>Logo:</label>
              <input
                type="file"
                id="photo"
                name="logo"
                onChange={handleLogoChange}
              />
            </div>
          </div>
          <button className="company-submit" type="submit">
            Submit
          </button>
        </form>
        </div>
      </div>
      <style>{
        `.company-form {
          width: 80%;
          margin: 30px auto;
          padding: 20px;
          border: 1px solid #bbb;
          background: #ffff;
          border-radius: 10px;
      }
      
      button.company-submit {
          display: block;
          width: 20%;
          margin-left: auto;
      }
          
        `
      }</style>
<ToastContainer/>
    </>
  );
}
