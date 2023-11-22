import React, { useState } from 'react';
import "../styles/PostComponent.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyPosts = ({companyId}) => {
  const [content, setContent] = useState('');
  const company = companyId;

  const handlePostBodyChange = (e) => {
    setContent(e.target.value); 
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (content.length > 0) {
      try {
        const response = await axios.post("http://localhost:4000/companypost", { company, content });

        console.log(response);
        toast.success("Post submitted successfully");
      } catch (error) {
        console.log(error);
      }
      setContent('');
    } else {
      toast.error("Error submitting post", {
        position: "top-right",
      });
    }
  };

  return (
    <div className='user-post'>
      <div className='user-post-input'>
        <textarea
          rows="4"
          cols="60"
          name="content"
          value={content}
          onChange={handlePostBodyChange}
          placeholder="What's on your mind?"
        />
        <div className='post-button' onClick={handlePostSubmit}>Post</div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CompanyPosts;
