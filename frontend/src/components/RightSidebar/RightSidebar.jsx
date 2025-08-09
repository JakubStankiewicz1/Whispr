import React from 'react';
import './rightSidebar.css';
import Messenger from '../Messenger/Messenger';
import WhatsApp from '../WhatsApp/WhatsApp';
import Telegram from '../Telegram/Telegram';
import Discord from '../Discord/Discord';
import Instagram from '../Instagram/Instagram';
import Twitter from '../Twitter/Twitter';
import TikTok from '../TikTok/TikTok';
import Tinder from '../Tinder/Tinder';
import Snapchat from '../Snapchat/Snapchat';
import Signal from '../Signal/Signal';
import Reddit from '../Reddit/Reddit';
import Slack from '../Slack/Slack';
import WeChat from '../WeChat/WeChat';
import RightNavigationBar from '../RightNavigationBar/RightNavigationBar';
import { FiSettings, FiBarChart2, FiPlay, FiDownload, FiChevronDown, FiMonitor, FiPhone } from 'react-icons/fi';
import { BsMessenger } from 'react-icons/bs';

const RightSidebar = ({ 
  senderName, 
  receiverNames, 
  receiverImages, 
  receiverStatuses = [],
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
  forceDateDisplay = false,
  globalDateSettings = {
    showDate: true,
    showTime: true,
    showYear: true,
    format: 'short'
  },
  onReset = null,
  selectedPlatform = 'Messenger',
  setSelectedPlatform
}) => {
  // Renderuj odpowiedni komponent na podstawie wybranej platformy
  const renderChatComponent = () => {
    const commonProps = {
      senderName,
      receiverNames,
      receiverImages,
      receiverStatuses,
      messages,
      selectedDevice,
      chatType,
      groupName,
      groupImage,
      darkMode,
      showHeader,
      showFooter,
      forceDateDisplay,
      globalDateSettings
    };

    switch (selectedPlatform) {
      case 'WhatsApp':
        return <WhatsApp {...commonProps} />;
      case 'Telegram':
        return <Telegram {...commonProps} />;
      case 'Discord':
        return <Discord {...commonProps} />;
      case 'Instagram':
        return <Instagram {...commonProps} />;
      case 'X (Twitter)':
        return <Twitter {...commonProps} />;
      case 'TikTok':
        return <TikTok {...commonProps} />;
      case 'Tinder':
        return <Tinder {...commonProps} />;
      case 'Snapchat':
        return <Snapchat {...commonProps} />;
      case 'Signal':
        return <Signal {...commonProps} />;
      case 'Reddit':
        return <Reddit {...commonProps} />;
      case 'Slack':
        return <Slack {...commonProps} />;
      case 'WeChat':
        return <WeChat {...commonProps} />;
      case 'Messenger':
      default:
        return <Messenger {...commonProps} />;
    }
  };

  return (
    <div className={`rightSidebar rightSidebar--${selectedDevice}`}>
      <div className="rightSidebarContainer">
        <div className="rightSidebarContent">
          {renderChatComponent()}
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
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
      />
    </div>
  )
}

export default RightSidebar