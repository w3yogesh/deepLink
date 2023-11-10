import React, { useState,useEffect } from "react";
import PostCard from "../components/FeedComponent/PostCard";
import Grid from "@mui/material/Grid";
import axios from "axios";


const Feed = () => {
  const [allPostObj, setPosts] = useState([]);


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
        const response = await axios.get("http://localhost:4000/api/fetchposts");
        const postsData = response.data;
        setPosts(postsData);
        console.log(postsData);
      } catch (error) {
        console.log(error);
      }
    
    }
    fetchPosts();
    setPosts(allPostObj);
  }, [])
  

  return (
    <div>
      <h1 style={{textAlign : 'center'}}> feed </h1>
      <Grid container spacing={2}>
        {allPostObj.map((post, index) => (
          <Grid item xs={12} key={index}>
            <PostCard postObj={post} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Feed;
