import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './footer.scss';
import {
  faVk,
  faFacebook,
  faTwitter,
  faTelegram,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

const Footer = (): JSX.Element => {
  return (
    <footer className="footer container">
      <div className="social">
        <a href="https://vk.com/" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faVk} />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://web.telegram.org/" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faTelegram} />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </div>
    </footer>
  );
};
export default Footer;
