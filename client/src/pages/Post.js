import { useEffect, useState } from "react";
import InfoCard from "../component/InfoCard";
import Card from "../component/Card";
import Comment from "../component/Comment";
import AddComment from "../component/AddComment";
import MapComponent from "../component/Map";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../component/Loading";

const Post = ({ setHeaderPageName }) => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [hotels, setHotels] = useState(null);
  const [loading, setLoading] = useState(true);
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : process.env.REACT_APP_API_BASE_URL;

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/hotels/${id}`);
      setHotel(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllHotels = async () => {
    try {
      const response = await axios.get(`${url}/hotels`);
      const dataObject = response.data.data;
      const arrayOfData = Object.keys(dataObject).map((key) => [
        key,
        dataObject[key],
      ]);
      setHotels(arrayOfData);
    } catch (error) {
      console.log(error);
    }
  };

  const loadingHandle = () => {
    if (hotel === null) setLoading(true);
    else if (hotel !== null) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setHeaderPageName("post");
    window.scrollTo(0, 0);
    fetchData();
  }, [id]);

  useEffect(() => {
    fetchAllHotels();
    fetchData();
  }, []);

  const [infoCards, setInfoCards] = useState([]);
  const [comments, setComments] = useState([]);

  const data = { ...hotel };
  const updateHotel = async () => {
    try {
      const response = await axios.put(`${url}/edithotel/${id}`, {
        data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setComments(hotel?.comments);
    setInfoCards(hotel?.info.slice(4, hotel.length));
  }, [hotel]);

  useEffect(() => {
    updateHotel();
    loadingHandle();
  }, [hotel]);

  return (
    <div id="post">
      {loading && <Loading />}
      <div className="sections-container">
        <div className="section1-container">
          <div className="img-container">
            <img src={hotel?.postImg} alt="post-img" />
          </div>
        </div>
        <div className="section2-container">
          <span>
            {hotel?.postinfo.map((info, index) => (
              <p key={index}>{info}</p>
            ))}
          </span>
          <div className="section">
            <h2>{hotel?.info[0].infoTitle}</h2>
            <div className="info-container">
              <p>{hotel?.info[0].content}</p>
              <div className="img-container">
                <img src={hotel?.info[0].img} alt="postImg1" />
              </div>
            </div>
          </div>
        </div>
        <div className="section3-container section s-fix">
          <div className="section-container">
            <h2>{hotel?.info[1]?.infoTitle}</h2>
            <div className="info-container">
              <div className="img-container">
                <img src={hotel?.info[1].img} alt="" />
              </div>
              <p>{hotel?.info[1].content}</p>
            </div>
          </div>
        </div>
        <div className="section4-container s-fix">
          <div className="section">
            <h2>{hotel?.info[2].infoTitle}</h2>
            <div className="info-container">
              <p>{hotel?.info[2].content}</p>
              <div className="img-container">
                <img src={hotel?.info[2].img} alt="postImg1" />
              </div>
            </div>
          </div>
        </div>
        <div className="section5-container section s-fix">
          <div className="section-container">
            <h2>{hotel?.info[3].infoTitle}</h2>
            <div className="info-container">
              <div className="img-container">
                <img src={hotel?.info[3].img} alt="" />
              </div>
              <p>{hotel?.info[3].content}</p>
            </div>
          </div>
        </div>
        <div className="section6-container">
          {infoCards?.map((infoCard, index) => (
            <InfoCard
              key={index}
              title={infoCard.infoTitle}
              text={infoCard.content}
            />
          ))}
        </div>
        <div className="section7-container">
          <h2>Read More</h2>
          <div className="posts-container">
            {hotels?.map((hotelElement) =>
              hotel?.readMorePosts.map((moreHotel) => {
                if (moreHotel === hotelElement[1]?.id)
                  return (
                    <Card
                      key={hotelElement[0]}
                      id={hotelElement[0]}
                      img={hotelElement[1]?.cardImg}
                      title={hotelElement[1].title}
                      city={hotelElement[1].city}
                    />
                  );
              })
            )}
          </div>
        </div>
        <div className="section8-container">
          <h2>Comments:</h2>
          <div className="comments-container">
            {comments?.map((comment, index) => (
              <Comment
                key={index}
                comment={comment}
                setComments={setComments}
                hotel={hotel[0]}
                id={id}
                comments={comments}
                setHotel={setHotel}
              />
            ))}
          </div>
          <AddComment
            comments={comments}
            setComments={setComments}
            commentFunction="add"
            id={id}
            setHotel={setHotel}
            hotel={hotel}
          />
        </div>
        <div className="section9-container">
          <MapComponent hotel={hotel} />
        </div>
      </div>
    </div>
  );
};
export default Post;
