import React, { useState, useEffect, useRef } from 'react';
import './rightNavigationBar.css';
import { FiSettings, FiBarChart2, FiPlay, FiDownload, FiChevronDown, FiMonitor, FiPhone, FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import { BsMessenger } from 'react-icons/bs';
import Settings from '../Settings/Settings';
import { LuSmartphone } from "react-icons/lu";
import { FaDiscord, FaInstagram, FaReddit, FaSnapchat, FaTelegram, FaTiktok, FaWeixin, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { SiSignal, SiSlack, SiTinder } from 'react-icons/si';
import { IoLogoIonitron } from 'react-icons/io5';
import { GoPlus } from "react-icons/go";

const RightNavigationBar = ({ selectedDevice, setSelectedDevice, darkMode, setDarkMode, showHeader, setShowHeader, showFooter, setShowFooter, onReset }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('Messenger');
  const dropdownRef = useRef(null);

  // Platform data
  const platforms = [
    { name: 'Discord', icon: FaDiscord, color: '#5865F2' },
    { name: 'Instagram', icon: FaInstagram, color: '#E4405F' },
    { name: 'Messenger', icon: BsMessenger, color: '#0084FF' },
    { name: 'Reddit', icon: FaReddit, color: '#FF4500' },
    { name: 'Signal', icon: SiSignal, color: '#3A76F0' },
    { name: 'Slack', icon: SiSlack, color: '#4A154B' },
    { name: 'Snapchat', icon: FaSnapchat, color: '#FFFC00' },
    { name: 'Telegram', icon: FaTelegram, color: '#0088CC' },
    { name: 'TikTok', icon: FaTiktok, color: '#000000' },
    { name: 'Tinder', icon: SiTinder, color: '#FF6B6B' },
    { name: 'WeChat', icon: FaWeixin, color: '#07C160' },
    { name: 'WhatsApp', icon: FaWhatsapp, color: '#25D366' },
    { name: 'X (Twitter)', icon: FaXTwitter, color: '#000000' }
  ];

  // Funkcja do pobierania screenshotu
  const handleDownloadScreenshot = async () => {
    if (isDownloading) return; // Zapobiegaj wielokrotnym kliknięciom
    
    setIsDownloading(true);
    
    try {
      // Znajdź element messenger
      const messengerElement = document.querySelector('.messenger');
      if (!messengerElement) {
        alert('Messenger element not found. Please try again.');
        return;
      }

      // Użyj html2canvas do zrobienia screenshotu
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(messengerElement, {
        backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
        scale: 2, // Wyższa jakość
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: messengerElement.offsetWidth,
        height: messengerElement.offsetHeight
      });

      // Konwertuj canvas na blob
      canvas.toBlob((blob) => {
        if (blob) {
          // Utwórz link do pobrania
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `whispr-messenger-${selectedDevice}-${new Date().toISOString().slice(0, 10)}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        } else {
          alert('Failed to generate screenshot. Please try again.');
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error taking screenshot:', error);
      alert('Failed to take screenshot. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Sprawdź czy kliknięcie było poza dropdown i poza RightNavigationBar
      const navigationBar = document.querySelector('.rightNavigationBar');
      const dropdown = dropdownRef.current;
      
      if (dropdown && navigationBar) {
        // Jeśli kliknięcie było poza dropdown i poza całą nawigacją
        if (!dropdown.contains(event.target) && !navigationBar.contains(event.target)) {
          setShowPlatformDropdown(false);
        }
      }
    };

    if (showPlatformDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPlatformDropdown]);

  const handlePlatformClick = () => {
    setShowPlatformDropdown(!showPlatformDropdown);
  };

  const handleResetClick = () => {
    setShowResetConfirm(true);
  };

  const handleConfirmReset = () => {
    if (onReset) {
      onReset();
    }
    setShowResetConfirm(false);
  };

  const handleCancelReset = () => {
    setShowResetConfirm(false);
  };

  const handlePlatformSelect = (platformName) => {
    setSelectedPlatform(platformName);
    setShowPlatformDropdown(false);
  };

  return (
    <div className="rightNavigationBar">
      <div className="rightNavigationBarContainer">

        {/* Left Section */}
        <div className="rightNavigationBarLeft">
          <div className="rightNavigationBarLogo" onClick={handlePlatformClick}>

            {(() => {
              const platform = platforms.find(p => p.name === selectedPlatform);
              const IconComponent = platform ? platform.icon : BsMessenger;
              return <IconComponent className="rightNavigationBarLogoIcon" style={{ color: platform ? platform.color : '#0084FF' }} />;
            })()}
            <span className="rightNavigationBarLogoText">{selectedPlatform}</span>
            <FiChevronDown className={`rightNavigationBarDropdown ${showPlatformDropdown ? 'rotated' : ''}`} />
          </div>

          {/* Platform Dropdown */}
          {showPlatformDropdown && (
            <div className="platformDropdown" ref={dropdownRef}>
              <div className="platformDropdownContent">
                {platforms.map((platform, index) => (
                  <div key={index} className="platformItem" onClick={() => handlePlatformSelect(platform.name)}>
                    <div className="platformItemContainer">
                      <div className="platformIcon">
                        <platform.icon style={{ color: platform.color }} className="platformIconSvg" />
                      </div>
                      <span className="platformName">{platform.name}</span>
                      {/* {platform.name === selectedPlatform && (
                        <div className="platformCheckmark">✓</div>
                      )} */}
                    </div>
                  </div>
                ))}
                <div className="platformItem addPlatform">
                  <div className="platformItemContainer">
                    <div className="platformIcon addPlatformIcon">
                      <FiPlus className="platformIconSvg" />
                    </div>
                    <span className="platformName">Add platform</span>
                  </div>
                </div>
              </div>
            </div>
          )}
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
          <button className="rightNavigationBarActionButton" onClick={() => setShowSettings(!showSettings)} data-tooltip="settings">
            <FiSettings className="rightNavigationBarActionIcon" />
          </button>
          <button className="rightNavigationBarActionButton" data-tooltip="analytics">
            <FiBarChart2 className="rightNavigationBarActionIcon" />
          </button>
          <button className="rightNavigationBarActionButton" data-tooltip="preview">
            <FiPlay className="rightNavigationBarActionIcon" />
          </button>
          <button className="rightNavigationBarActionButton" onClick={handleDownloadScreenshot} data-tooltip="export" disabled={isDownloading}>
            <FiDownload className={`rightNavigationBarActionIcon ${isDownloading ? 'downloading' : ''}`} />
          </button>
          <button 
            className="rightNavigationBarActionButton" 
            onClick={handleResetClick}
            data-tooltip="reset"
          >
            <FiTrash2 className="rightNavigationBarActionIcon" data-icon="trash" />
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

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <>
          <div className="resetConfirmOverlay" onClick={handleCancelReset} />
          <div className="resetConfirmModal">
            <div className="resetConfirmHeader">
              <h3>Reset to Defaults</h3>
              <button className="resetConfirmClose" onClick={handleCancelReset}>
                <FiX />
              </button>
            </div>
            <div className="resetConfirmContent">
              <p>Are you sure you want to reset all messages and settings to their default values?</p>
              <p>This action cannot be undone.</p>
            </div>
            <div className="resetConfirmFooter">
              <button className="resetConfirmCancel" onClick={handleCancelReset}>
                Cancel
              </button>
              <button className="resetConfirmConfirm" onClick={handleConfirmReset}>
                Reset
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default RightNavigationBar