import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Feed/postCard.css";
import { LikeIcon, CommentIcon, UserIcon } from "../MySVGIcons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import {
  MoreIcon,
  Celebrate,
  Support,
  Love,
  Insightful,
  Funny,
} from "../MySVGIcons";

const CompanyPostCard = ({ postObj, userId, userName }) => {
  const [postId, setPostId] = useState("");
  const [likes, setLikes] = useState(postObj.likes.length);
  const [likeColor, setLikeColor] = useState("blue");
  const [show, setShow] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [reactions, setReactions] = useState("Like");
  const [totalComment, setTotalComment] = useState(0);
  const [comments, setComments] = useState(postObj.comments);
  const [newComment, setNewComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const { companyId } = useParams();

  const fun = async () => {
    const isLiked = postObj.likes.find((item) => item.userId === userId);
    if (isLiked) {
      setLikeColor("red");
      const likeId = isLiked._id;
      // console.log(likeId)
      const response = await axios.get(
        `http://localhost:4000/api/fetchlike/${likeId}`
      );
      // console.log(`response` , response.data);
      setReactions(response.data.reaction);
    } else setLikeColor("blue");
  };

  useEffect(() => {
    fun();
    setLikes(postObj.likes.length);
    setComments(postObj.comments);
    setTotalComment(postObj.comments.length);
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

  const handleReactions = async (postId, reactionType) => {
    // no reaction set only set new reaction
    if (likeColor === "blue") {
      const response = await axios.put(
        "http://localhost:4000/api/postReaction",
        {
          userId,
          postId,
          reactionType,
        }
      );
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
    else if (likeColor === "red" && reactionType === reactions) {
      const response = await axios.delete(
        `http://localhost:4000/api/removePostReaction/${userId}/${postId}`
      );
      const { status, message } = response.data;
      // console.log(postId);
      if (status) {
        setLikes(likes - 1);
        setLikeColor("blue");
        setReactions("Like");
        // console.log(`reaction removed`);
      } else {
        console.log(`reaction not removed`);
      }
    }

    // change reaction type
    else {
      const isLiked = postObj.likes.find((item) => item.userId === userId);
      const likeId = isLiked._id;
      const response = await axios.put(
        `http://localhost:4000/api/updateReaction/${likeId}/${reactionType}`
      );
      const { status, message } = response.data;
      // console.log(postId);
      if (status) {
        setReactions(reactionType);
        console.log(`reaction changed`);
      } else {
        console.log(`reaction not changed`);
      }
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/deleteCompanyPost/${companyId}/${postId}`
      );
      const { status, message } = response.data;

      if (status) {
        toast.success(message);
        console.log(message);
      } else {
        console.log(message);
      }
    } catch (error) {
      toast.error("You can't delete other's post");
      console.error("Error deleting post:", error);
    }
  };

  const handleAddComment = async (postObjId) => {
    setShowComment(true);
  };
  // console.log(postObj);
  const handleNewComment = async (postId) => {
    try {
      if (newComment.trim() !== "" && userId) {
        const comment = newComment.trim();
        const response = await axios.put(
          "http://localhost:4000/api/postcompanyComment",
          { userId, postId, comment }
        );
        console.log(response.data);
        setComments([...comments, { user: userName, content: newComment }]);
        setNewComment("");
        setTotalComment(totalComment + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const reversedComments = Array.isArray(comments)
    ? [...comments].reverse()
    : [];
  return (
    <div className="post-items">
      <div className="post-meta">
        <a href={`http://localhost:3000/company/${postObj.company._id}`}>
          {postObj.company.logo ? (
            <img
              src={`http://localhost:4000/fetchCompanyImage/${postObj.company.logo}`}
              alt="user post"
            />
          ) : (
            <UserIcon />
          )}
          <span>{postObj.company.companyName}</span>
        </a>
        {true ? (
          <div className="more-option" onClick={()=>setShow(!show)}>
            <MoreIcon />
            <div className={`more-option-items ${show ? "show" : ""}`}>
              <div
                className="delete-btn btn"
                onClick={() => handleDelete(postObj._id)}
              >
                Delete Post
              </div>
            </div>
          </div>
        ) : null}
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
      {/* <div className="post-action">
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
        <div
          className="delete-btn btn"
          onClick={() => handleDelete(postObj._id)}
        >
          Delete
        </div>
      </div> */}
      <div className="post-action-counts">
        <span>{likes} Likes</span>{" "}
        {totalComment ? <span>{totalComment} Comments</span> : ""}
      </div>
      <div className="post-action">
        <div
          className="like-btn btn"
          onMouseEnter={() => setShowReactions(true)}
          onMouseLeave={() => setShowReactions(false)}
        >
          {reactions === "Like" && (
            <div>
              <LikeIcon
                style={{ fill: likeColor === "red" ? "red" : "blue" }}
              />
              Like
            </div>
          )}
          {reactions === "Love" && (
            <div className="love">
              <Love /> Love
            </div>
          )}
          {reactions === "Congratulation" && (
            <div className="congo">
              <Celebrate /> Congratulation
            </div>
          )}
          {reactions === "Support" && (
            <div className="support">
              <Support /> Support
            </div>
          )}
          {reactions === "Insightful" && (
            <div className="insightful">
              <Insightful /> Insightful
            </div>
          )}
          {reactions === "Funny" && (
            <div className="funny">
              <Funny /> Funny
            </div>
          )}

          {showReactions && (
            <div className="reactions-tooltip">
              <div
                className="reaction-btn like"
                onClick={() => handleReactions(postObj._id, "Like")}
              >
                <LikeIcon />
              </div>
              <div
                className="reaction-btn love"
                onClick={() => handleReactions(postObj._id, "Love")}
              >
                <Love />
              </div>
              <div
                className="reaction-btn congo"
                onClick={() => handleReactions(postObj._id, "Congratulation")}
              >
                <Celebrate />
              </div>
              <div
                className="reaction-btn support"
                onClick={() => handleReactions(postObj._id, "Support")}
              >
                <Support />
              </div>
              <div
                className="reaction-btn insightful"
                onClick={() => handleReactions(postObj._id, "Insightful")}
              >
                <Insightful />
              </div>
              <div
                className="reaction-btn funny"
                onClick={() => handleReactions(postObj._id, "Funny")}
              >
                <Funny />
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
            {totalComment} Comments
          </div>
        ) : (
          <div
            className="comment-button btn"
            onClick={() => handleAddComment(postObj._id)}
          >
            <CommentIcon />
            Comment
          </div>
        )}
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
