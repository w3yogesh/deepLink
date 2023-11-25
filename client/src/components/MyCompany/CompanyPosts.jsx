import React, { useState } from 'react';
import "../../styles/PostComponent.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImageIcon } from '../MySVGIcons';

const CompanyPosts = ({companyId}) => {
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState('');
  const company = companyId;

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
    data.append('company', company);
    if (content.length > 0 || photo) {
      try {
        const response = await axios.post("http://localhost:4000/companypost",data);

        // console.log(response);
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

export default CompanyPosts;
