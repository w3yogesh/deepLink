import React, { useState } from 'react';
import "../styles/PostComponent.css"
import axios from "axios";

const PostComponent = (props) => {
  const [content, setContent] = useState(['']);
  const user = props.senderId;

  const handlePostBodyChange = (e) => {
    setContent(e.target.value);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (content.trim() !== '') {
      // const newPost = {
      //   user: userId,
      //   content: postBody
      // };
      
      try {
        const response = await axios.post("http://localhost:4000/post",{user, content,});
          
          console.log(response.data);
        // const { success, message } = data;
        // if (success) {
        //   console.log("data printed successfully")
        // } else {
        //   console.log(message);
        // }
      } catch (error) {
        console.log(error);
      }
      setContent('');
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
        {/* <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        /> */}
        <div className='post-button' onClick={handlePostSubmit}>Post</div>
      </div> 
    </div>
  );
};

export default PostComponent;
