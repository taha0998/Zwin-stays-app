import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../component/Card";
import { Link } from "react-router-dom";
import Loading from "../component/Loading";

const Home = ({ setHeaderPageName }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  

  const randomIndex = data ? Math.floor(Math.random() * data.length) : 0;

  const fetchData = async () => {
    const url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:8000"
        : process.env.REACT_APP_API_BASE_URL;

    try {
      const response = await axios.get(`${url}/hotels`);
      
 
      const dataObject = response.data?.data;
      
      if (dataObject && typeof dataObject === 'object') {
        const arrayOfData = Object.keys(dataObject).map((key) => [
          key,
          dataObject[key],
        ]);
        setData(arrayOfData);
      } else {
        console.error('Invalid data structure received from API:', response.data);
        setData([]); 
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      setData([]); 
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
            {!loading && data && data.length > 0 && data[randomIndex] && (
              <Link to={`/post/${data[randomIndex][0]}`}>
                <img src={data[randomIndex][1].cardImg} alt="homeImg" />
              </Link>
            )}
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
            {!loading && data && data.map((hotel) => {
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
