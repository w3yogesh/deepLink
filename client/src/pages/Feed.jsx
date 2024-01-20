import React, { useState, useEffect } from "react";
import PostCard from "../components/FeedComponent/PostCard";
import FeedSidebar from "../components/FeedComponent/FeedSidebar";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import PostComponent from "../components/FeedComponent/PostComponent";
import { JobSidebar } from "../components/FeedComponent/JobSidebar";
import Loading from "../components/Loading";

import "../styles/Feed/Feed.css";
import CompanyPostCard from "../components/MyCompany/CompanyPostCard";

const Feed = () => {
  const navigate = useNavigate();
  const [allPostObj, setPosts] = useState([]);
  const [companyPost, setCompanyPost] = useState([]);
  const [everyPost, setEveryPost] = useState([]);
  const [userData, setUserData] = useState('');
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const auth = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        const { status, user } = auth.data;
        if (!status) {
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          setUserData(user);
          setUserId(user._id);
          setUserName(user.firstName);
          const response = await axios.get(
            "http://localhost:4000/api/fetchposts"
          );
          // const postsData = response.data;
          // setPosts(postsData);
          setEveryPost(prevEveryPost => [...prevEveryPost, ...response.data]);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCompanyPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/fetchcompanyposts`
        );
        // setCompanyPost(response.data);
        setEveryPost(prevEveryPost => [...prevEveryPost, ...response.data]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
    fetchCompanyPost();
  }, [navigate]);

  if (loading) {
    return <Loading/>;
  } 
  const letestPost = [...everyPost].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const uniqueId = new Set();
  const uniqueLetestPost = letestPost.filter((post) => {
    if (!uniqueId.has(post._id)) {
      uniqueId.add(post._id);
      return true;
    }
    return false;
  });
  return (
    <div>
      <Navbar senderId={userId} />

      <div className="grid-container">
      <div className="feed-wrapper">
        <div className="left-sidebar">
          <FeedSidebar userData={userData} />
        </div>
        <div className="post-container">
        <PostComponent senderId={userId} />
          {uniqueLetestPost.map((post, index) => (
            <div className="post-body" key={index}>
              {post.user !== undefined && (<PostCard postObj={post} userId={userId} userName={userName} />)}
              {post.user === undefined && (<CompanyPostCard postObj={post} userId={userId} userName={userName} />)}
            </div>
          ))}

        </div>
        <div className="right-sidebar">
          {/* <JobSidebar/> */}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Feed;
