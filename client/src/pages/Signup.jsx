import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });
  const { email, username, password, confirm_password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

    const handleValidation = ()=>{
      const{username,email,password,confirm_password} = inputValue;
      if(password!==confirm_password){
        toast.error("password and confirm should be same.",
        handleError)
        return false;
      } else if(username.length<4){
        toast.error(
          "Username should be greater than 3 characters.",
          handleError
        );
        return false;
      }else if(password.length<4){
        toast.error(
          "Password should be equal or greater than 8 characters.",
          handleError
        );
        return false;
      }else if (email === "") {
        toast.error("Email is required.", handleError);
        return false;
      }
      return true;
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(handleValidation()){
      try {
        const { data } = await axios.post(
          "http://localhost:4000/signup",
          {
            ...inputValue,
          },
          { withCredentials: true }
        );
        const { success, message } = data;
        if (success) {
          handleSuccess(message);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          handleError(message);
        }
      
      } catch (error) {
        console.log(error);
      }
  }
    setInputValue({
      ...inputValue,
      email: "",
      username: "",
      password: "",
      confirm_password: "",
    });
  };

  return (
    <div className="form_container">
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="email">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            value={confirm_password}
            placeholder="Enter your confirm password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;