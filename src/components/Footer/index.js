import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-website-logo-name">
        <img
          src="https://res.cloudinary.com/dh2scpkcz/image/upload/v1636285476/tastykitcken/Frame_275_fyjda6.png"
          className="footer-logo"
          alt="website-footer-logo"
        />
        <h1 className="footer-heading">Tasty Kitchen </h1>
      </div>

      <p className="footer-description">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="social-media-container">
        <FaPinterestSquare
          className="social-media-icon"
          testid="pintrest-social-icon"
        />
        <FaInstagram
          className="social-media-icon"
          testid="instagram-social-icon"
        />
        <FaTwitter className="social-media-icon" testid="twitter-social-icon" />
        <FaFacebookSquare
          className="social-media-icon"
          testid="facebook-social-icon"
        />
      </div>
    </div>
  )
}
