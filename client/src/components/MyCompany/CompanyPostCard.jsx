import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Feed/postCard.css";
import { LikeIcon, CommentIcon, UserIcon } from "../MySVGIcons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from 'react-router-dom';

const CompanyPostCard = ({ postObj, userId, userName }) => {
  const [postId, setPostId] = useState("");
  const [likes, setLikes] = useState(postObj.likes.length);
  const [likeColor, setLikeColor] = useState("blue");
  const [comments, setComments] = useState(postObj.comments);
  const [newComment, setNewComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const { companyId } = useParams();
  useEffect(() => {
    setLikes(postObj.likes.length);
    setComments(postObj.comments);
    if (postObj.likes.find((item) => item.userId === userId))
      setLikeColor("red");
    else setLikeColor("blue");
  }, []);
  const handleLikes = async (postId) => {
    // console.log(postId);
    if (likeColor === "red") {
      const response = await axios.delete(
        `http://localhost:4000/api/removecompanyPostLike/${userId}/${postId}`
      );
      const { status, message } = response.data;
      // console.log(postId);
      if (status) {
        // const index = postObj.likes.indexOf(userId);
        // postObj.likes.splice(index, 1);
        setLikes(likes - 1);
        setLikeColor("blue");
        console.log(message);
      }
      console.log(message);
    } else {
      const response = await axios.put(
        "http://localhost:4000/api/companypostLike",
        {
          userId,
          postId,
        }
      );

      const index = postObj.likes.indexOf(userId);
      const { status, message } = response.data;
      console.log(message);
      if (status) {
        setLikes(likes + 1);
        postObj.likes.push(userId);
        setLikeColor("red");
        console.log(message);
      } else {
        console.log(message);
      }
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/deleteCompanyPost/${companyId}/${postId}`);
      const { status, message } = response.data;

      if (status) {
        toast.success(message);
        // onPostDelete(postId);
        console.log(message);
      } else {
        console.log(message);
      }
    } catch (error) {
      toast.error("You can't delete other's post");
      console.error('Error deleting post:', error);
    }
  };

  const handleAddComment = async (postObjId) => {
    setShowComment(true);
  };
  console.log(postObj);
  const handleNewComment = async (postId) => {
    if (newComment.trim() !== "" && userId) {
      const comment = newComment.trim();
      const response = await axios.put(
        "http://localhost:4000/api/postcompanyComment",
        { userId, postId, comment }
      );
      console.log(response.data);
      setComments([...comments, { user: userName, content: newComment }]);
      setNewComment("");
    }
  };
  const reversedComments = Array.isArray(comments)
    ? [...comments].reverse()
    : [];
  return (
    <div className="post-items">
      <div className="post-meta">
      <a href={`http://localhost:3000/company/${postObj.company._id}`}> 
      {postObj.company.logo ? (<img src={`http://localhost:4000/fetchCompanyImage/${postObj.company.logo}`} alt="user post" />):<UserIcon />}
       <span>{postObj.company.companyName}</span></a>
      </div>
      {postObj.image ? (
        <div className="img-post-content">
          {postObj.content ? (
            <p className="img-post-text">{postObj.content}</p>
          ) : (
            " "
          )}
          <img
            src={`http://localhost:4000/fetchCompanyPostImage/${postObj.image}`}
            alt="user post"
          />
        </div>
      ) : (
        <div className="post-content">
          <p>{postObj.content}</p>
        </div>
      )}
      <div className="post-action">
        <div className="like-btn btn" onClick={() => handleLikes(postObj._id)}>
          <LikeIcon style={{ fill: likeColor === "red" ? "red" : "blue" }} />
          {likes}Likes
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

export default CompanyPostCard;
