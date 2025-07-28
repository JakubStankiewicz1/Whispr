import React, { useState } from 'react';
import './rightSidebar.css';
import MessengerDesktop from '../MessengerDesktop/MessengerDesktop';
import RightNavigationBar from '../RightNavigationBar/RightNavigationBar';
import { FiSettings, FiBarChart2, FiPlay, FiDownload, FiChevronDown, FiMonitor, FiPhone } from 'react-icons/fi';
import { BsMessenger } from 'react-icons/bs';

const RightSidebar = ({ senderName, messages }) => {
  const [selectedDevice, setSelectedDevice] = useState('desktop');

  return (
    <div className='rightSidebar'>



      {/* <div className="rightSidebarOverlay">
        <div className="rightSidebarOverlayBackground">
          <div className="rightSidebarOverlayWatermark">
            <div className="rightSidebarOverlayWatermarkText">GETMOCKLY.COM</div>
            <a href="#" className="rightSidebarOverlayWatermarkLink">Remove watermark?</a>
          </div>
        </div>
      </div> */}
      


      <div className="rightSidebarContainer">
        <div className="rightSidebarContent">
          <MessengerDesktop senderName={senderName} messages={messages} />
        </div>
      </div>

      {/* Navigation Bar */}
      <RightNavigationBar />
    </div>
  )
}

export default RightSidebar