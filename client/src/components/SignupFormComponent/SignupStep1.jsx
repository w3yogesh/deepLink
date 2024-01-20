import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const SignupStep1 = ({ formData, updateForm }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    updateForm({ [name]: value });
  };

  useEffect(() => {
    document.body.classList.add("login-body");

    return () => {
      document.body.classList.remove("login-body");
    };
  }, []);

  return (
    <div>
      <label>Email</label>
      <input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <label>Confirm Password</label>
      <input
        type="password"
        name="confirm_password"
        value={formData.confirm_password}
        onChange={handleChange}
      />
      <span>
        Already have an account? <Link to={"/login"}>Login</Link>
      </span>
    </div>
  );
};

export default SignupStep1;
