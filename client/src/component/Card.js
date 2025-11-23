import { Link } from "react-router-dom";
const Card = ({ id, img, title, city }) => {
  return (
    <Link className="card-link" to={`/post/${id}`}>
      <div className="card-container">
        <div className="card-img-container">
          <img src={img} alt="card-img" />
        </div>
        <h3>
          {title}, <span>{city}</span>
        </h3>
      </div>
    </Link>
  );
};

export default Card;
