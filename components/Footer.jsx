import React from 'react';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';
import '../src/index.css';

const Footer = () => {

  let year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-icons">
        <a href="https://www.instagram.com/estudioschreiber" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="icon" />
        </a>
        <a href="mailto:ezequielschreiber@gmail.com">
          <FaEnvelope className="icon" />
        </a>
      </div>
      <p>También puedes contactarnos por <a href="mailto:ezequielschreiber@gmail.com">ezequielschreiber@gmail.com</a></p>
      <div className="footer-copy">
        <small>&copy; {year} Mizzio Coding all rights reserved</small>
      </div>
      <script dangerouslySetInnerHTML={{ __html: `gtag('event', 'conversion', {'send_to': 'AW-16754927570/JrJUCPG-y-YZENLPr7U-'});` }} />
    </footer>
  );
};

export default Footer;