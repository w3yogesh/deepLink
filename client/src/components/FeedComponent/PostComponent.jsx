import React, { useState } from 'react';
import "../../styles/PostComponent.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImageIcon } from '../MySVGIcons';
const PostComponent = (props) => {
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState('');
  const user =  props.senderId;
 

  const handlePostBodyChange = (e) => {
    setContent(e.target.value);
  };

  const handleFileChange = (event) => {
    const newPhoto = event.target.files[0];
    setPhoto(newPhoto);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if(content){
      data.append('content', content);
    }
    if (photo) {
      data.append('image', photo);
    }
    data.append('user', user);
    if (content.length > 0 || photo) {
      try {
        const response = await axios.post("http://localhost:4000/createPost", data);
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
          placeholder="What are you thinking about?"
        />
         <div className='post-add-action'>
            <div className='post-image-button'>
            <input
              type="file"
              id="photo"
              name="file"
              accept="image/*"
              onChange={(event) => handleFileChange(event)}
            />
             <div className="post-add-btn"> <ImageIcon/>
            Photo</div></div>
            <div className='post-button' onClick={handlePostSubmit}>Post</div>
         </div>
        
      </div>
      <ToastContainer />
    </div>
  );
};

export default PostComponent;
