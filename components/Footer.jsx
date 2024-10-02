import React from 'react';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';
import '../src/index.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-icons">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="icon" />
        </a>
        <a href="mailto:loremimpsum@gmail.com">
          <FaEnvelope className="icon" />
        </a>
      </div>
      <p>También puedes contactarnos por <a href="mailto:loremimpsum@gmail.com">loremimpsum@gmail.com</a></p>
      <div className="footer-copy">
        <small>&copy; 2024 Mizzio Coding all rights reserved</small>
      </div>
    </footer>
  );
};

export default Footer;