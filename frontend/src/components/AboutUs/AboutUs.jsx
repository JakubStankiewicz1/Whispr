import React from 'react';
import './aboutUs.css';
import { FiX } from "react-icons/fi";

const AboutUs = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <>
      <div className="aboutUsOverlay" onClick={onClose} />
      <div className="aboutUsModal">
        <div className="aboutUsHeader">
          <h2 className="aboutUsTitle">About Whispr</h2>
          <button className="aboutUsCloseButton" onClick={onClose}>
            <FiX className="aboutUsCloseIcon" />
          </button>
        </div>
        <div className="aboutUsContent">
          <p className="aboutUsSubtitle">See what's new and improved in Whispr!</p>
          <div className="aboutUsChangelog">
            <div className="aboutUsVersion">
              <div className="aboutUsVersionHeader">
                <span className="aboutUsVersionNumber">v1.5.0</span>
                <span className="aboutUsVersionDate">Jul 24, 2025</span>
              </div>
              <ul className="aboutUsVersionFeatures">
                <li>Improved image export</li>
                <li>Improved animations</li>
                <li>Improved styles</li>
              </ul>
            </div>
            <div className="aboutUsVersion">
              <div className="aboutUsVersionHeader">
                <span className="aboutUsVersionNumber">v1.4.0</span>
                <span className="aboutUsVersionDate">Jul 21, 2025</span>
              </div>
              <ul className="aboutUsVersionFeatures">
                <li>Improved editor experience</li>
              </ul>
            </div>
            <div className="aboutUsVersion">
              <div className="aboutUsVersionHeader">
                <span className="aboutUsVersionNumber">v1.3.0</span>
                <span className="aboutUsVersionDate">Jul 16, 2025</span>
              </div>
              <ul className="aboutUsVersionFeatures">
                <li>Animated previews</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="aboutUsFooter">
          <p className="aboutUsFooterText">
            Questions or feedback? Email{' '}
            <a href="mailto:maurice@getwhispr.com" className="aboutUsFooterLink">
              maurice@getwhispr.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs; 