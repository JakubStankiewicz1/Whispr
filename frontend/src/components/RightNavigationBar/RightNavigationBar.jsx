import React from 'react';
import './rightNavigationBar.css';
import { BsMessenger } from 'react-icons/bs';
import { FiChevronDown, FiMonitor, FiPhone, FiSettings, FiBarChart2, FiPlay, FiDownload } from 'react-icons/fi';
import { LuSmartphone } from "react-icons/lu";

const RightNavigationBar = ({ selectedDevice, setSelectedDevice }) => {
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
          <button className="rightNavigationBarActionButton">
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
    </div>
  )
}

export default RightNavigationBar