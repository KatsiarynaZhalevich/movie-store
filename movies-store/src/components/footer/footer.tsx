import React from 'react';
import './footer.scss';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = (): JSX.Element => {
  return (
    <footer className="footer container">
      <div className="social">
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
          <FacebookIcon />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noreferrer">
          <TwitterIcon />
        </a>
        <a href="https://web.telegram.org/" target="_blank" rel="noreferrer">
          <TelegramIcon />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
          <InstagramIcon />
        </a>
        <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
          <YouTubeIcon />
        </a>
      </div>
    </footer>
  );
};
export default Footer;
