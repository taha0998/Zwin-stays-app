import { useState } from "react";
import avatar from "../images/avatar.svg";

const AddComment = ({
  setComments,
  commentid,
  setReplySection,
  commentFunction,
  id,
  setHotel,
  comments,
  hotel,
}) => {
  const [commentText, setCommentText] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setCommentText(value);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const newComment = {
      id: comments.length + 1,
      text: commentText,
      replys: [],
    };
    setHotel((prev) => ({ ...prev, comments: [...prev.comments, newComment] }));
    setComments((prevData) => [...prevData, newComment]);
    setCommentText("");
  };

  const handleReply = (e) => {
    e.preventDefault();
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentid
          ? { ...comment, replys: [...comment?.replys, { text: commentText }] }
          : comment
      )
    );
    setHotel((prev) => ({
      ...prev,
      comments: prev.comments.map((comment) =>
        comment.id === commentid
          ? { ...comment, replys: [...comment?.replys, { text: commentText }] }
          : comment
      ),
    }));
    setCommentText("");
    setReplySection(false);
  };

  return (
    <div className="add-comment-section">
      <div className="avatar-container">
        <img src={avatar} alt="avatar" />
      </div>
      <form onSubmit={commentFunction === "add" ? handleAdd : handleReply}>
        <div className="add-comment-container">
          <input
            type="text"
            placeholder="add a comment"
            name="comment"
            id="comment"
            required
            value={commentText}
            onChange={handleChange}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};
export default AddComment;
