import React, { useState, useEffect } from "react";

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

const PostCard = ({ postObj }) => {

  const [likes, setLikes] = useState(postObj.likes.length)
  const [likeColor, setLikeColor] = useState('blue')
  const [comments, setComments] = useState(postObj.comments)
  const [newComment, setNewComment] = useState("")
  const [showComment, setShowComment] = useState(false)

  useEffect(() => {
    setLikes(postObj.likes.length);
    setComments(postObj.comments);
    if (postObj.likes.includes("u6")) setLikeColor('red')
    else  setLikeColor('blue')
  }, []);

  const handleLikes = () => {
    if (likeColor === 'red') {
      const index = postObj.likes.indexOf("u6");
      postObj.likes.splice(index, 1);
      setLikes(likes - 1);
      setLikeColor('blue')
    } else {
      setLikes(likes + 1);
      postObj.likes.push("u6")
      setLikeColor('red')
    }
  };

  const handleAddComment = () => {
    setShowComment(true);
  };

  const handleNewComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, { user: "u6", content: newComment }]);
      setNewComment("");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "0px auto", marginTop: "15px" }}>
      <Card>
        <CardHeader title={postObj.title} />
        <CardMedia
          component="img"
          alt={'image not load'}
          height="200"
          image={postObj.imageSrc}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {postObj.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button startIcon={<FavoriteIcon style={{ color: likeColor }}/>} onClick={handleLikes}>
            {likes} Likes
          </Button>
          {showComment && (
            <Button startIcon={<CloseIcon />} onClick={()=>{setShowComment(false)}}>
              close Comments
            </Button>
          )}
          {!showComment && (
            <Button startIcon={<CommentIcon />} onClick={handleAddComment}>
              Add Comment
            </Button>
          )}
        </CardActions>
        {showComment && (
          <>
            <Typography variant="h6" gutterBottom>
              Comments
            </Typography>
            {comments.map((comment, index) => (
              <div key={index}>
                <Typography variant="body2" gutterBottom>
                  {comment.user}: {comment.content}
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
              onClick={handleNewComment}
              variant="contained"
              color="primary"
            >
              Add Comment
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default PostCard;
