import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
      <div className='footer'>
        <div className="footer-content">
  
          {/* Info Columns Container */}
          <div className="footer-info">
            <div className="footer-col">
              <h2>Address</h2>
              <p>
                Maynooth University<br />
                Maynooth
                Ireland, County Kildare
              </p>
            </div>
  
            <div className="footer-col">
              <h2>Opening Hours</h2>
              <p>Mon - Sun: 10AM - 8PM</p>
            </div>
  
            <div className="footer-col">
              <h2>Contact Us</h2>
              <p>
                123-456-7890<br />
                info@mysite.com
              </p>
            </div>
          </div>
        </div>
  
        <p className="footer-bottom">© 2035 by Chomp™</p>
      </div>
    );
  };
  
  export default Footer;
  
