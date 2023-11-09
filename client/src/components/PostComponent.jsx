import React, { useState } from 'react';
import "../styles/PostComponent.css"
import axios from "axios";

const PostComponent = ({ userId }) => {
  const [postBody, setPostBody] = useState(['']);


  const handlePostBodyChange = (e) => {
    setPostBody(e.target.value);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (postBody.trim() !== '') {
      const newPost = {
        user: userId,
        content: postBody
      };
       console.log(newPost);

      try {
        const response = await axios.post(
          "http://localhost:4000/post",
          {
            newPost
          }
          );
          console.log(response.data);
          // console.log("After Api");
        // const { success, message } = data;
        // if (success) {
        //   console.log("data printed successfully")
        // } else {
        //   console.log(message);
        // }
      } catch (error) {
        console.log(error);
      }
      setPostBody('');
    }
  };

  return (
    <div>
      <div>
        <textarea
          rows="4"
          cols="60"
          name="postBody"
          value={postBody}
          onChange={handlePostBodyChange}
          placeholder="What's on your mind?"
        />
        {/* <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        /> */}
        <button onClick={handlePostSubmit}>Post</button>
      </div> 
    </div>
  );
};

export default PostComponent;
