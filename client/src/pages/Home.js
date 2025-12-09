import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../component/Card";
import { Link } from "react-router-dom";
import Loading from "../component/Loading";

const Home = ({ setHeaderPageName }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const randomNUmber = Math.floor(Math.random() * data?.length);

  const fetchData = async () => {
    const url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:8000"
        : process.env.REACT_APP_API_BASE_URL;

    try {
      const response = await axios.get(`${url}/hotels`);
      const dataObject = response.data.data;
      const arrayOfData = Object.keys(dataObject)?.map((key) => [
        key,
        dataObject[key],
      ]);
      setData(arrayOfData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const loadingHandle = () => {
    if (data === null) setLoading(true);
    else if (data !== null) {
      setLoading(false);
    }
  };
  useEffect(() => {
    setHeaderPageName("home");
    fetchData();
  }, []);
  useEffect(() => {
    loadingHandle();
  }, [data]);

  return (
    <div id="home">
      {loading && <Loading />}
      <div className="sections-container">
        <div className="section1-container">
          <div className="img-container">
            {data?.map((hotel) => {
              if (hotel[1].id === randomNUmber + 1)
                return (
                  <Link key={hotel[1].id} to={`/post/${hotel[0]}`}>
                    <img src={hotel[1].cardImg} alt="homeImg" />
                  </Link>
                );
            })}
          </div>
          <div className="text-container">
            <p>
              We don’t just rate hotels—we live in them. Every trusted riad and
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

