import React, { useState } from 'react';
import "../styles/PostComponent.css"
import axios from "axios";

const PostComponent = ({ userEmail }) => {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const [likedPosts, setLikedPosts] = useState([]);

  const handlePostChange = (e) => {
    setNewPostText(e.target.value);
  };


  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPostText.trim() !== '') {
      const now = new Date();
      const timestamp = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const newPost = {
        userEmail: userEmail, // Pass the user's email
        text: newPostText
      };
      // console.log(newPost);


      try {
        const { data } = await axios.post(
          "http://localhost:4000/post",
          {
            newPost
          }
          
        );
        
        console.log("After Api");
        const { success, message } = data;
        if (success) {
          console.log("data printed successfully")
        } else {
          console.log(message);
        }
      } catch (error) {
        console.log(error);
      }
        
        
  
      // Clear the input field
      setNewPostText('');
    }
  };
  
  const handleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      // If the post is already liked, unlike it by removing it from the likedPosts array
      const updatedLikedPosts = likedPosts.filter((id) => id !== postId);
      setLikedPosts(updatedLikedPosts);
  
      // Decrease the like count for the post
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          return { ...post, likes: post.likes - 1 };
        }
        return post;
      });
  
      setPosts(updatedPosts);
    } else {
      // If the post is not liked, like it by adding it to the likedPosts array
      setLikedPosts([...likedPosts, postId]);
  
      // Increase the like count for the post
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      });
  
      setPosts(updatedPosts);
    }
  };
  
  const handleComment = (postId, commentText) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = [...post.comments, commentText];
        return { ...post, comments: updatedComments };
      }
      return post;
    });

    setPosts(updatedPosts);
  };

 

  return (
    <div>
      <div>
        <textarea
          rows="4"
          cols="50"
          value={newPostText}
          onChange={handlePostChange}
          placeholder="What's on your mind?"
        />
        {/* <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        /> */}
        <button onClick={handlePostSubmit}>Post</button>
      </div>

      <div className='post1'>
  {posts.map((post) => (
    <div key={post.id} className="post">
      <p>{post.timestamp}</p>
      {post.text && <p>{post.text}</p>}

      <button onClick={() => handleLike(post.id)}>
        {likedPosts.includes(post.id) ? `Liked (${post.likes})` : `Like (${post.likes})`}
      </button>

      <button
        onClick={() => {
          const commentText = prompt('Enter your comment:');
          if (commentText) handleComment(post.id, commentText);
        }}
      >
        Comment
      </button>

      <div className="comments">
        {post.comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
    </div>
  ))}
</div>

       
    </div>
  );
};

export default PostComponent;
