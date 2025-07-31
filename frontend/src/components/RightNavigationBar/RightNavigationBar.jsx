import React, { useState, useEffect } from 'react';
import './rightNavigationBar.css';
import { FiSettings, FiBarChart2, FiPlay, FiDownload, FiChevronDown, FiMonitor, FiPhone } from 'react-icons/fi';
import { BsMessenger } from 'react-icons/bs';
import Settings from '../Settings/Settings';
import { LuSmartphone } from "react-icons/lu";

const RightNavigationBar = ({ selectedDevice, setSelectedDevice, darkMode, setDarkMode, showHeader, setShowHeader, showFooter, setShowFooter }) => {
  const [showSettings, setShowSettings] = useState(false);

  // Close settings when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const settingsPanel = document.querySelector('.settingsPanel');
      const settingsButton = document.querySelector('.rightNavigationBarActionButton');
      
      if (showSettings && settingsPanel && settingsButton) {
        if (!settingsPanel.contains(event.target) && !settingsButton.contains(event.target)) {
          setShowSettings(false);
        }
      }
    };

    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettings]);

  return (
    <div className="rightNavigationBar">
      <div className="rightNavigationBarContainer">





        {/* Left Section */}
        <div className="rightNavigationBarLeft">
          <div className="rightNavigationBarLogo">
            <BsMessenger className="rightNavigationBarLogoIcon" />
            <span className="rightNavigationBarLogoText">Messenger</span>
            <FiChevronDown className="rightNavigationBarDropdown" />
          </div>
        </div>






        {/* Separator */}
        <div className="rightNavigationBarSeparator" />

        {/* Device Toggle */}
        <div className="rightNavigationBarDeviceToggle">
          <button 
            className={`rightNavigationBarDeviceButton rightNavigationBarDeviceButtonOne ${selectedDevice === 'desktop' ? 'active' : ''}`}
            onClick={() => setSelectedDevice('desktop')}
          >
            <FiMonitor className="rightNavigationBarDeviceIcon" />
          </button>
          <button 
            className={`rightNavigationBarDeviceButton rightNavigationBarDeviceButtonTwo ${selectedDevice === 'mobile' ? 'active' : ''}`}
            onClick={() => setSelectedDevice('mobile')}
          >
            <LuSmartphone className="rightNavigationBarDeviceIcon" />
          </button>
        </div>

        {/* Separator */}
        <div className="rightNavigationBarSeparator" />

        {/* Action Icons */}
        <div className="rightNavigationBarActions">
          <button className="rightNavigationBarActionButton" onClick={() => setShowSettings(!showSettings)}>
            <FiSettings className="rightNavigationBarActionIcon" />
          </button>
          <button className="rightNavigationBarActionButton">
            <FiBarChart2 className="rightNavigationBarActionIcon" />
          </button>
          <button className="rightNavigationBarActionButton">
            <FiPlay className="rightNavigationBarActionIcon" />
          </button>
          <button className="rightNavigationBarActionButton">
            <FiDownload className="rightNavigationBarActionIcon" />
          </button>
        </div>




        {/* NEW Label */}
        {/* <div className="rightNavigationBarNewLabel">
          <span className="rightNavigationBarNewText">NEW</span>
        </div> */}



      </div>

      {/* Settings Panel */}
      {showSettings && (
        <>
          <div className="settingsOverlay" onClick={() => setShowSettings(false)} />
          <div className="settingsPanel">
            <Settings 
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              showHeader={showHeader}
              setShowHeader={setShowHeader}
              showFooter={showFooter}
              setShowFooter={setShowFooter}
              onClose={() => setShowSettings(false)}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default RightNavigationBar