import { Link } from "react-router-dom";
import LogoHome from "../images/logoHome.svg";
import LogoPOst from "..//images/logoPost.svg";
import { section1Background } from "../helper";

const Header = ({ headerPageName }) => {
  section1Background(headerPageName)
  return (
    <div className="header-container">
      <header>
        <h3>{headerPageName}</h3>
        <Link to={"/"}>
          <div className="logo-container">
            <img
              src={headerPageName === "home" ? LogoHome : LogoPOst}
              alt="logo"
            />
          </div>
        </Link>
        <h3>logout</h3>
      </header>
    </div>
  );
};

export default Header;
