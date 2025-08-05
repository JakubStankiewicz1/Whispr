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
          <p className="aboutUsSubtitle">
            Whispr is a powerful messaging mockup tool that helps you create realistic chat conversations for presentations, demos, and design projects. Create authentic-looking messages with custom avatars, timestamps, and multiple messaging platforms.
          </p>
          <div className="aboutUsChangelog">
            <div className="aboutUsVersion">
              <div className="aboutUsVersionHeader">
                <span className="aboutUsVersionNumber">v1.5.0</span>
                <span className="aboutUsVersionDate">Jul 24, 2025</span>
              </div>
              <ul className="aboutUsVersionFeatures">
                <li>Enhanced image export with high-quality screenshots</li>
                <li>Smooth animations and improved user experience</li>
                <li>Refined design with better visual consistency</li>
                <li>New platform support and improved dropdown</li>
              </ul>
            </div>
            <div className="aboutUsVersion">
              <div className="aboutUsVersionHeader">
                <span className="aboutUsVersionNumber">v1.4.0</span>
                <span className="aboutUsVersionDate">Jul 21, 2025</span>
              </div>
              <ul className="aboutUsVersionFeatures">
                <li>Improved message editor with better inline editing</li>
                <li>Enhanced participant management</li>
                <li>Better group chat functionality</li>
              </ul>
            </div>
            <div className="aboutUsVersion">
              <div className="aboutUsVersionHeader">
                <span className="aboutUsVersionNumber">v1.3.0</span>
                <span className="aboutUsVersionDate">Jul 16, 2025</span>
              </div>
              <ul className="aboutUsVersionFeatures">
                <li>Animated message previews</li>
                <li>Real-time chat simulation</li>
                <li>Custom timestamp formatting</li>
              </ul>
            </div>
            <div className="aboutUsVersion">
              <div className="aboutUsVersionHeader">
                <span className="aboutUsVersionNumber">v1.2.0</span>
                <span className="aboutUsVersionDate">Jul 10, 2025</span>
              </div>
              <ul className="aboutUsVersionFeatures">
                <li>Multiple messaging platforms support</li>
                <li>Custom avatar uploads</li>
                <li>Group chat functionality</li>
              </ul>
            </div>
            <div className="aboutUsVersion">
              <div className="aboutUsVersionHeader">
                <span className="aboutUsVersionNumber">v1.1.0</span>
                <span className="aboutUsVersionDate">Jul 5, 2025</span>
              </div>
              <ul className="aboutUsVersionFeatures">
                <li>Basic message creation</li>
                <li>Simple chat interface</li>
                <li>Export functionality</li>
              </ul>
            </div>
            <div className="aboutUsVersion">
              <div className="aboutUsVersionHeader">
                <span className="aboutUsVersionNumber">v1.0.0</span>
                <span className="aboutUsVersionDate">Jul 1, 2025</span>
              </div>
              <ul className="aboutUsVersionFeatures">
                <li>Initial release</li>
                <li>Core messaging mockup features</li>
                <li>Basic UI and interactions</li>
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