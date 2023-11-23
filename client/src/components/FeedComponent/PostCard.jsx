import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Feed/postCard.css";
import { LikeIcon, CommentIcon, UserIcon } from "../MySVGIcons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostCard = ({ postObj, userId, userName, onPostDelete }) => {
  const [likes, setLikes] = useState(postObj.likes.length);
  const [likeColor, setLikeColor] = useState("blue");
  const [comments, setComments] = useState(postObj.comments);
  const [newComment, setNewComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [reactions, setReactions] = useState("like");

  const fun = async() => {
      const isLiked = postObj.likes.find((item) => item.userId === userId);
      if (isLiked)  {
        setLikeColor("red");
        const likeId = isLiked._id;
        // console.log(likeId)
        const response = await axios.get(`http://localhost:4000/api/fetchlike/${likeId}`)
        // console.log(`response` , response.data);
        setReactions(response.data.reaction);
      }
      else setLikeColor("blue");
  }

  useEffect(() => {
    fun();
    setLikes(postObj.likes.length);
    setComments(postObj.comments);
    if (postObj.likes.find(item => item.userId === userId)) setLikeColor("red");
    else setLikeColor("blue");
  }, [postObj.likes, postObj.comments, userId]);

  const handleLikes = async (postId) => {
    if (likeColor === "red") {
      try {
        const response = await axios.delete(`http://localhost:4000/api/removePostLike/${userId}/${postId}`);
        const { status, message } = response.data;

        if (status) {
          setLikes(likes - 1);
          setLikeColor("blue");
          console.log(message);
        } else {
          console.log(message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      try {
        const response = await axios.put("http://localhost:4000/api/postLike", {
          userId,
          postId,
        });

        const { status, message } = response.data;

        if (status) {
          setLikes(likes + 1);
          setLikeColor("red");
          console.log(message);
        } else {
          console.log(message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleReactions = async(postId, reactionType)=> {
    // no reaction set only set new reaction
    if(likeColor === "blue")  {
      const response = await axios.put("http://localhost:4000/api/postReaction", {
        userId, postId, reactionType,
      });
      const { status, message } = response.data;
      if (status) {
        setLikes(likes + 1);
        postObj.likes.push(userId);
        setLikeColor("red");
        setReactions(reactionType);
        // console.log(message);
      } else {
        console.log(message);
      }
    }

    // remove reaction
    else if(likeColor === "red" && reactionType === reactions) {
      const response = await axios.delete(
        `http://localhost:4000/api/removePostReaction/${userId}/${postId}`
      );
      const { status, message } = response.data;
      // console.log(postId);
      if (status) {
        setLikes(likes - 1);
        setLikeColor("blue");
        setReactions("Like")
        // console.log(`reaction removed`);
      }
      else {
        console.log(`reaction not removed`);
      }
    }

    // change reaction type
    else  {
      const isLiked = postObj.likes.find((item) => item.userId === userId);
      const likeId = isLiked._id;
      const response = await axios.put(`http://localhost:4000/api/updateReaction/${likeId}/${reactionType}`)
      const { status, message } = response.data;
      // console.log(postId);
      if (status) {
        setReactions(reactionType)
        console.log(`reaction changed`);
      }
      else {
        console.log(`reaction not changed`);
      }
    }
  }

  const handleAddComment = async (postObjId) => {
    setShowComment(true);
  };

  const handleNewComment = async (postId) => {
    if (newComment.trim() !== "" && userId) {
      const comment = newComment.trim();
      try {
        const response = await axios.put(
          "http://localhost:4000/api/postComment",
          { userId, postId, comment }
        );
        console.log(response.data);
        setComments([...comments, { user: userName, content: newComment }]);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const reversedComments = Array.isArray(comments)
    ? [...comments].reverse()
    : [];

  return (
    <div className="post-items">
      <div className="post-meta">
        <UserIcon /> <a href={`http://localhost:3000/userprofileview/${postObj.user._id}`}><span>{postObj.user.firstName}</span></a>
      </div>
      {postObj.image ? (
        <div className="img-post-content">
          {postObj.content ? <p className="img-post-text">{postObj.content}</p> : ""}
          <img src={`http://localhost:4000/fetchUserPostImage/${postObj.image}`} alt="user post" />
        </div>
      ) : (
        <div className="post-content">
          <p>{postObj.content}</p>
        </div>
      )}
      <div className="post-action">

        {/* <div className="like-btn btn" onClick={() => handleLikes(postObj._id)}>
          <LikeIcon style={{ fill: likeColor === "red" ? "red" : "blue" }} />
          {likes}Likes
        </div> */}

        <div
          className="like-btn btn"
          onMouseEnter={() => setShowReactions(true)}
          onMouseLeave={() => setShowReactions(false)}
        >
          <LikeIcon style={{ fill: likeColor === "red" ? "red" : "blue" }} />
          {likes} {reactions}
          {showReactions && (
            <div className="reactions-tooltip">
              <div onClick={() => handleReactions(postObj._id, "Like")}>
                👍Like
              </div>
              <div onClick={() => handleReactions(postObj._id, "Love")}>
                ❤️Love
              </div>
              <div onClick={() => handleReactions(postObj._id, "Congo")}>
                🎉Congo
              </div>
            </div>
          )}
        </div>

        {showComment ? (
          <div
            className="comment-button btn"
            onClick={() => setShowComment(false)}
          >
            <CommentIcon />
            Comments
          </div>
        ) : (
          <div
            className="comment-button btn"
            onClick={() => handleAddComment(postObj._id)}
          >
            <CommentIcon />
            Comment{" "}
          </div>
        )}
        <div className="delete-btn btn" onClick={() => handleDelete(postObj._id)}>
          Delete
        </div>
      </div>
      {showComment && (
        <div className="comment-section">
          <h3>Comments</h3>
          <div className="comment-respond">
            <input
              type="text"
              placeholder="New Comment"
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
            />
            <button onClick={() => handleNewComment(postObj._id)}>
              Comment
            </button>
          </div>
          <ol className="comment-list">
            {reversedComments.map((Postcomment, index) => (
              <li className="post-comment" key={index}>
                <div className="comment-author-info">
                  {Postcomment?.userId?.firstName ?? Postcomment.user}
                </div>
                <div className="comment-content">
                  <p>{Postcomment?.comment ?? Postcomment.content}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
       <ToastContainer />
    </div>
  );
};

export default PostCard;
