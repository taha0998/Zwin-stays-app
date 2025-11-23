import { useState } from "react";
import avatar from "../images/avatar.svg";
import AddComment from "./AddComment";

const Reply = ({ comment, id,commentid, setComments,setHotel, reply }) => {
  const [replySection, setReplySection] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setReplySection((prev) => !prev);
  };
  return (
    <div className="reply-section">
      <div className="comment-container ">
        <div className="avatar-container">
          <img src={avatar} alt="avatar" />
        </div>
        <div className="comment-box-container">
          <p className="comment-text">{reply?.text}</p>
          <div className="comment-info-container">
            <p>like 2</p>
            <p onClick={handleClick}>reply</p>
          </div>
        </div>
      </div>
      {replySection && (
        <AddComment
          comment={comment}
          id={id}
          commentid={commentid}
          setComments={setComments}
          setReplySection={setReplySection}
          commentFunction="reply"
          setHotel={setHotel}
        />
      )}
    </div>
  );
};
export default Reply;
