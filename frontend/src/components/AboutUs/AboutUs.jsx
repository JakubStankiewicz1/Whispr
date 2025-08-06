import React, { useState, useEffect, useRef } from 'react';
import './aboutUs.css';
import { FiX } from "react-icons/fi";

const AboutUs = ({ open, onClose }) => {
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useRef(null);
  const contentRef = useRef(null);

  // Reset timer when user interacts
  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsScrollbarVisible(true);
    
    // Start new timer only if not hovering
    if (!isHovering) {
      timeoutRef.current = setTimeout(() => {
        setIsScrollbarVisible(false);
      }, 3000);
    }
  };

  // Handle mouse enter
  const handleMouseEnter = () => {
    setIsHovering(true);
    setIsScrollbarVisible(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsHovering(false);
    // Start timer when mouse leaves
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsScrollbarVisible(false);
    }, 3000);
  };

  // Handle scroll
  const handleScroll = () => {
    resetTimer();
  };

  // Handle touch/mouse events
  const handleInteraction = () => {
    resetTimer();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Start timer when modal opens
  useEffect(() => {
    if (open) {
      // Initial timer when modal opens
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        if (!isHovering) {
          setIsScrollbarVisible(false);
        }
      }, 3000);
    }
  }, [open]);

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
        <div 
          className={`aboutUsContent ${isScrollbarVisible ? 'scrollbar-visible' : 'scrollbar-hidden'}`}
          ref={contentRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onScroll={handleScroll}
          onTouchStart={handleInteraction}
          onTouchMove={handleInteraction}
          onMouseMove={handleInteraction}
        >
          <p className="aboutUsSubtitle">
            See what's new and improved in Whispr!
          </p>


          {/* <div className="aboutUsChangelog">
            <div className="aboutUsVersion">
              <div className="aboutUsVersionHeader">
                <span className="aboutUsVersionNumber">v1.5.0</span>
                <span className="aboutUsVersionDate">Jul 24, 2025</span>
              </div>
              <p className="aboutUsVersionText">
                Major improvements to styling and animation features that pave the way for video exports!
              </p>
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
          </div> */}
        </div>
        <div className="aboutUsFooter">
          <p className="aboutUsFooterText">
            Questions or feedback? Email{' '}
            <a href="mailto:stankiewicz.kuba152@gmail.com" className="aboutUsFooterLink">
              stankiewicz.kuba152@gmail.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs; 