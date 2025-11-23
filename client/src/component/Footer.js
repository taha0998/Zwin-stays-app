import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-container">
      <footer>
        <h2>
          Zwin.Stays
        </h2>
        <div className="footer-info-container">
          <Link>Facebook</Link>
          <Link>Instagram</Link>
          <Link>Tiktok</Link>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
