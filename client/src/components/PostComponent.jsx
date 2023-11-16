import React, { useState } from 'react';
import "../styles/PostComponent.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostComponent = (props) => {
  const [content, setContent] = useState('');
  const user = props.senderId;

  const handlePostBodyChange = (e) => {
    setContent(e.target.value);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (content.length > 0) {
      try {
        const response = await axios.post("http://localhost:4000/post", { user, content });

        console.log(response.data);
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

export default PostComponent;
