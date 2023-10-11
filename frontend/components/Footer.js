'use client'
import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-4 pb-1">
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <h3>Links</h3>
            <hr />
            <ul className="list-unstyled ">
              <li>
                <a href="/" className="text-white text-decoration-none">
                <div className="link-hover">
                    Home
                </div>
                </a>
              </li>
              <li>
                <a href="/#About" className="text-white text-decoration-none">
                <div className="link-hover">
                    About Us
                </div>
                </a>
              </li>
              <li>
                <a href="/services" className="text-white text-decoration-none">
                <div className="link-hover">
                    Services
                </div>
                </a>
              </li>
              <li>
                <a href="/careers" className="text-white text-decoration-none">
                <div className="link-hover">
                    Careers
                </div>
                </a>
              </li>
              <li>
                <a href="/policy" className="text-white text-decoration-none link-hover"> 
               <div className="link-hover">
                    Policy
                </div>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mx-3">
            <h3>Contact Info</h3>
            <hr />
            <p> <Image src='/phone.svg' height={20} width={20} /> (123) 456-7890</p>
            <p> <Image src='/mail.svg' height={18} width={18} /> info@clinic.com</p>
            <p> <Image src='/location.svg' height={22} width={22} /> Clinic Address</p>
          </div>
          <div className="col-md-5">
            <h3>Newsletter</h3>
            <hr />
            <p>Subscribe to our newsletter for updates!</p>
            <form>
              <div className="input-group">
              <input
                type="email"
                className="form-control bg-light border-0 rounded me-2"
                placeholder="Email address"
                aria-label="Email address"
                aria-describedby="subscribe-button"
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-light text-dark border-0"
                    type="submit"
                    id="subscribe-button"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
