import React from "react";
import PostCard from "../components/FeedComponent/PostCard";
import Grid from "@mui/material/Grid";

const Feed = () => {

  const allPostObj = [
    {
      title : 'Post Title',
      description : 'Post Description',
      imageSrc : 'Post image link',
      likes : ['u1', 'u2', 'u5', ],
      comments : [
        {user : 'u1', content : 'it is user1 comment'},
        {user : 'u2', content : 'it is user2 comment'},
        {user : 'u3', content : 'it is user3 comment'},
      ],
    },
    {
      title : 'Post Title',
      description : 'Post Description',
      imageSrc : 'Post image link',
      likes : ['u1', 'u2', 'u5', ],
      comments : [
        {user : 'u1', content : 'it is user1 comment'},
        {user : 'u2', content : 'it is user2 comment'},
        {user : 'u3', content : 'it is user3 comment'},
      ],
    },
    {
      title : 'Post Title',
      description : 'Post Description',
      imageSrc : 'Post image link',
      likes : ['u1', 'u2', 'u5', ],
      comments : [
        {user : 'u1', content : 'it is user1 comment'},
        {user : 'u2', content : 'it is user2 comment'},
        {user : 'u3', content : 'it is user3 comment'},
      ],
    },
  ]


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
