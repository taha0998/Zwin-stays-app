import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../component/Card";
import { Link } from "react-router-dom";
import Loading from "../component/Loading";

const Home = ({ setHeaderPageName }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [randomNumber, setRandomNumber] = useState(0);

  const fetchData = async () => {
    const url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:8000"
        : process.env.REACT_APP_API_BASE_URL;

    try {
      console.log(url)
      const response = await axios.get(`${url}/hotels`);
      
      let dataObject;
      
      if (response.data.data) {
        dataObject = response.data.data;
      } else if (response.data) {
        dataObject = response.data;
      } else {
        throw new Error('Unexpected API response structure');
      }
      
      const arrayOfData = Object.keys(dataObject).map((key) => [
        key,
        dataObject[key],
      ]);
      
      setData(arrayOfData);
      
      if (arrayOfData.length > 0) {
        setRandomNumber(Math.floor(Math.random() * arrayOfData.length));
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching hotels data:', error);
      console.error('Error details:', error.response?.data || error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setHeaderPageName("home");
    fetchData();
  }, []);

  return (
    <div id="home">
      {loading && <Loading />}
      <div className="sections-container">
        <div className="section1-container">
          <div className="img-container">
            {data?.map((hotel) => {
              if (hotel[1].id === randomNumber + 1) {
                return (
                  <Link key={hotel[1].id} to={`/post/${hotel[0]}`}>
                    <img src={hotel[1].cardImg} alt="homeImg" />
                  </Link>
                );
              }
              return null;
            })}
          </div>
          <div className="text-container">
            <p>
              We don't just rate hotels—we live in them. Every trusted riad and
              hotel has been tested by our local team: we slept in its beds,
              tasted mint tea in its courtyard, and checked every detail. No
              algorithms. No paid placements. Only honest opinions from people
              who know the heartbeat of Morocco. Search for your stay with
              confidence
              <span>—where every star is earned, not given.</span>
            </p>
          </div>
        </div>
        <div className="section2-container">
          <div className="cards-container">
            {data?.map((hotel) => {
              return (
                <Card
                  key={hotel[0]}
                  id={hotel[0]}
                  img={hotel[1].cardImg}
                  title={hotel[1].title}
                  city={hotel[1].city}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

