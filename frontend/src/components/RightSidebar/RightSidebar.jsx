import React from 'react';
import './rightSidebar.css';
import Messenger from '../Messenger/Messenger';
import RightNavigationBar from '../RightNavigationBar/RightNavigationBar';
import { FiSettings, FiBarChart2, FiPlay, FiDownload, FiChevronDown, FiMonitor, FiPhone } from 'react-icons/fi';
import { BsMessenger } from 'react-icons/bs';

const RightSidebar = ({ 
  senderName, 
  receiverNames, 
  receiverImages, 
  messages, 
  selectedDevice, 
  setSelectedDevice, 
  chatType, 
  groupName, 
  groupImage, 
  darkMode, 
  setDarkMode, 
  showHeader, 
  setShowHeader, 
  showFooter, 
  setShowFooter,
  forceDateDisplay = false, // Nowa opcja wymuszenia daty
  globalDateSettings = { // Globalne ustawienia formatowania dat
    showDate: true,
    showTime: true,
    showYear: true,
    format: 'short'
  },
  onReset = null // Funkcja do resetowania ustawień
}) => {
  return (
    <div className={`rightSidebar rightSidebar--${selectedDevice}`}>
      <div className="rightSidebarContainer">
        <div className="rightSidebarContent">
          <Messenger 
            senderName={senderName} 
            receiverNames={receiverNames} 
            receiverImages={receiverImages} 
            messages={messages} 
            selectedDevice={selectedDevice}
            chatType={chatType}
            groupName={groupName}
            groupImage={groupImage}
            darkMode={darkMode}
            showHeader={showHeader}
            showFooter={showFooter}
            forceDateDisplay={forceDateDisplay}
            globalDateSettings={globalDateSettings}
          />
        </div>
      </div>
      {/* Navigation Bar */}
      <RightNavigationBar 
        selectedDevice={selectedDevice} 
        setSelectedDevice={setSelectedDevice}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        showHeader={showHeader}
        setShowHeader={setShowHeader}
        showFooter={showFooter}
        setShowFooter={setShowFooter}
        onReset={onReset}
      />
    </div>
  )
}

export default RightSidebar