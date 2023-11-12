import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';


const PostCard = ({ postObj }) => {
  const [postId, setPostId] = useState("");
  const [userId, setUserId] = useState("");

  const [likes, setLikes] = useState(postObj.likes.length);
  const [likeColor, setLikeColor] = useState("blue");
  const [comments, setComments] = useState(postObj.comments);
  const [newComment, setNewComment] = useState("");
  const [showComment, setShowComment] = useState(false);

  useEffect(() => {
    setUserId("6545fa65389a9cf8a2aa5757");
    setLikes(postObj.likes.length);
    setComments(postObj.comments);
    if (postObj.likes.includes("u6")) setLikeColor("red");
    else setLikeColor("blue");
  }, []);

  const handleLikes = async (postId) => {
    console.log(postObj.comments);
    // const userId='6545fa65389a9cf8a2aa5757';
    if (likeColor === "red") {
      const index = postObj.likes.indexOf("u6");
      postObj.likes.splice(index, 1);
      setLikes(likes - 1);
      setLikeColor("blue");
    } else {
      // console.log(userId);
      const response = await axios.put("http://localhost:4000/api/postLike", {
        userId,
        postId,
      });
      console.log(response.data);
      setLikes(likes + 1);
      postObj.likes.push("u6");
      setLikeColor("red");
    }
  };

  const handleAddComment = async(postObjId) => {
    setShowComment(true);
  };

  const handleNewComment = async (postId) => {
    if (newComment.trim() !== "") {
      const comment = newComment;
      // const userId='6545fa65389a9cf8a2aa5757';

      // console.log(userId);
      const response = await axios.put(
        "http://localhost:4000/api/postComment",
        { userId, postId, comment }
      );

      console.log(response.data);

      setComments([...comments, { user: "u6", content: newComment }]);
      setNewComment("");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "0px auto", marginTop: "15px" }}>
      <Card>
        {/* <CardHeader title={postObj.title} /> */}
        {/* <CardMedia
          component="img"
          alt={'image not load'}
          height="200"
          image={postObj.imageSrc}
        /> */}

        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {postObj.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            startIcon={<FavoriteIcon style={{ color: likeColor }} />}
            onClick={() => handleLikes(postObj._id)}
          >
            {likes} Likes
          </Button>
          {showComment && (
            <Button
              startIcon={<CloseIcon />}
              onClick={() => {
                setShowComment(false);
              }}
            >
              close Comments
            </Button>
          )}
          {!showComment && (
            <Button startIcon={<CommentIcon />} onClick={()=>handleAddComment(postObj._id)}>
              Comment
            </Button>
          )}
        </CardActions>
        {showComment && (
          <>
            <Typography variant="h6" gutterBottom>
              Comments
            </Typography>
            {comments.map((Postcomment, index) => (
              <div key={index}>
                <Typography variant="body2" gutterBottom>
                  {Postcomment.Postcomment.userId.firstName}: {Postcomment.comment}
                </Typography>
              </div>
            ))}
            <TextField
              label="New Comment"
              variant="outlined"
              fullWidth
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
            />
            <Button
              onClick={() => handleNewComment(postObj._id)}
              variant="contained"
              color="primary"
            >
              Comment
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default PostCard;
