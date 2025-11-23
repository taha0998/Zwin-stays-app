import { useState } from "react";
import Vector from "../images/Vector.svg";

const InfoCard = ({title, text}) => {
  const [showText, setShowText] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setShowText((prev) => !prev);
  };
  return (
    <div className="close-open-container">
      <h2 onClick={handleClick}>
        <span>{`${title} `}</span>
        <img
          style={{
            transform: showText ? "rotate(90deg)" : "rotate(0deg)",
          }}
          src={Vector}
          alt="close/openSvg"
        />
      </h2>
      {showText && (
        <p>
         {text}
        </p>
      )}
    </div>
  );
};
export default InfoCard;
