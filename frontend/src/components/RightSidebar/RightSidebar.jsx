import React from 'react';
import './rightSidebar.css';
import MessengerDesktop from '../MessengerDesktop/MessengerDesktop';
import RightNavigationBar from '../RightNavigationBar/RightNavigationBar';
import { FiSettings, FiBarChart2, FiPlay, FiDownload, FiChevronDown, FiMonitor, FiPhone } from 'react-icons/fi';
import { BsMessenger } from 'react-icons/bs';

const RightSidebar = ({ senderName, receiverNames, receiverImages, messages, selectedDevice, setSelectedDevice }) => {
  return (
    <div className={`rightSidebar rightSidebar--${selectedDevice}`}>
      <div className="rightSidebarContainer">
        <div className="rightSidebarContent">
          <MessengerDesktop senderName={senderName} receiverNames={receiverNames} receiverImages={receiverImages} messages={messages} selectedDevice={selectedDevice} />
        </div>
      </div>
      {/* Navigation Bar */}
      <RightNavigationBar selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
    </div>
  )
}

export default RightSidebar