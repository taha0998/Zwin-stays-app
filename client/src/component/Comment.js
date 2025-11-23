import { useState } from "react";
import avatar from "../images/avatar.svg";
import AddComment from "./AddComment";
import Reply from "./Reply";

const Comment = ({ comment, setComments, setHotel, id }) => {
  const [replySection, setReplySection] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setReplySection((prev) => !prev);
  };

  return (
    <div className="comment-section-container">
      <div className="comment-container">
        <div className="avatar-container">
          <img src={avatar} alt="avatar" />
        </div>
        <div className="comment-box-container">
          <p className="comment-text">{comment?.text}</p>
          <div className="comment-info-container">
            <p>likes 3</p>
            <p onClick={handleClick}>reply</p>
          </div>
        </div>
      </div>
      {comment.replys?.map((reply, index) => {
        return (
          <Reply
            id={id}
            key={index}
            commentid={comment.id}
            comment={comment}
            setComments={setComments}
            reply={reply}
            setHotel={setHotel}
          />
        );
      })}
      {replySection && (
        <AddComment
          id={id}
          commentid={comment.id}
          comment={comment}
          setComments={setComments}
          setReplySection={setReplySection}
          commentFunction="reply"
          setHotel={setHotel}
        />
      )}
    </div>
  );
};
export default Comment;
