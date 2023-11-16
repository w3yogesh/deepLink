import React, { useState, useEffect } from "react";
import PostCard from "../components/FeedComponent/PostCard";
import FeedSidebar from "../components/FeedComponent/FeedSidebar";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import PostComponent from "../components/PostComponent";


import "../styles/Feed/Feed.css";

const Feed = () => {
  const navigate = useNavigate();
  const [allPostObj, setPosts] = useState([]);
  const [userData, setUserData] = useState('');
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  // const allPostObj = [
  //   {
  //     title : 'Post Title',
  //     description : 'Post Description',
  //     imageSrc : 'Post image link',
  //     likes : ['u1', 'u2', 'u5', ],
  //     comments : [
  //       {user : 'u1', content : 'it is user1 comment'},
  //       {user : 'u2', content : 'it is user2 comment'},
  //       {user : 'u3', content : 'it is user3 comment'},
  //     ],
  //   },
  //   {
  //     title : 'Post Title',
  //     description : 'Post Description',
  //     imageSrc : 'Post image link',
  //     likes : ['u1', 'u2', 'u5', ],
  //     comments : [
  //       {user : 'u1', content : 'it is user1 comment'},
  //       {user : 'u2', content : 'it is user2 comment'},
  //       {user : 'u3', content : 'it is user3 comment'},
  //     ],
  //   },
  //   {
  //     title : 'Post Title',
  //     description : 'Post Description',
  //     imageSrc : 'Post image link',
  //     likes : ['u1', 'u2', 'u5', ],
  //     comments : [
  //       {user : 'u1', content : 'it is user1 comment'},
  //       {user : 'u2', content : 'it is user2 comment'},
  //       {user : 'u3', content : 'it is user3 comment'},
  //     ],
  //   },
  // ]
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const auth = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        const { status, user } = auth.data;
        setUserData(user);
        setUserId(user._id);
        setUserName(user.firstName);

        if (!status) {
          setTimeout(() => {
            navigate("/login");
          }, 1);
        } else {
          setUserData(user);
          const response = await axios.get(
            "http://localhost:4000/api/fetchposts"
          );
          const postsData = response.data;
          setPosts(postsData);
          
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [navigate]);
  const reversedPosts = Array.isArray(allPostObj) ? [...allPostObj].reverse() : [];
  return (
    <div>
      <Navbar />

      <div className="feed-wrapper">
        <div className="left-sidebar">
          <FeedSidebar userData={userData} />
        </div>
        <div className="post-container">
        <PostComponent senderId={userId} />
          {reversedPosts.map((post, index) => (
            <div className="post-body" key={index}>
              <PostCard postObj={post} userId={userId} userName={userName} />
            </div>
          ))}
        </div>
        <div className="right-sidebar">
          <p>company post</p>
        </div>
      </div>
    </div>
  );
};

export default Feed;
