import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from "../components/FeedComponent/PostCard";
import FeedSidebar from "../components/FeedComponent/FeedSidebar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import PostComponent from "../components/PostComponent";


const TimelineUser = ({userId}) => {
    const navigate = useNavigate();
    const [allPostObj, setPosts] = useState([]);
    const [userData, setUserData] = useState('');
    // const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    

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
            // setUserId(user._id);
            setUserName(user.firstName);
    
            if (!status) {
              setTimeout(() => {
                navigate("/login");
              }, 1);
            } else {
              setUserData(user);
              const response = await axios.get(
                `http://localhost:4000/api/fetchpost/${userId}`
              );
              const postsData = response.data;
              setPosts(postsData);
              
            }
          } catch (error) {
            console.log(error);
          }
        };
        fetchPosts();
      }, [userId]);
      const reversedPosts = Array.isArray(allPostObj) ? [...allPostObj].reverse() : [];

  return (
    <div>
       <div className="post-container">
        <PostComponent senderId={userId} />
          {reversedPosts.map((post, index) => (
            <div className="post-body" key={index}>
              <PostCard postObj={post} userId={userId} userName={userName} />
            </div>
          ))}
        </div>
    </div>
  )
}

export default TimelineUser
