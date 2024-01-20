import React, { useEffect } from "react";

const SignupStep3 = ({ formData, updateForm }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    updateForm({
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };

  useEffect(() => {
    document.body.classList.add("login-body");

    return () => {
      document.body.classList.remove("login-body");
    };
  }, []);

  return (
    <div>
      <label>Country</label>
      <input
        type="text"
        name="country"
        value={formData.address.country}
        onChange={handleChange}
      />
      <label>City</label>
      <input
        type="text"
        name="city"
        value={formData.address.city}
        onChange={handleChange}
      />
    </div>
  );
};

export default SignupStep3;
