import React from 'react';
import './settings.css';
import { FiX } from 'react-icons/fi';

const Settings = ({ darkMode, setDarkMode, showHeader, setShowHeader, showFooter, setShowFooter, onClose }) => {
  return (
    <div className="settings">
      <div className="settingsContainer">
        <div className="settingsHeader">
          <div className="settingsHeaderTop">
            <h3 className="settingsTitle">Preview Settings</h3>
            <button className="settingsCloseButton" onClick={onClose}>
              <FiX className="settingsCloseIcon" />
            </button>
          </div>
          <p className="settingsSubtitle">Customize how the preview looks</p>
        </div>
        
        <div className="settingsList">
          <div className="settingsItem">
            <div className="settingsItemLabel">
              <span className="settingsItemText">Dark Mode</span>
            </div>
            <div className="settingsItemToggle">
              <button 
                className={`toggleSwitch ${darkMode ? 'active' : ''}`}
                onClick={() => setDarkMode(!darkMode)}
              >
                <div className="toggleSwitchKnob"></div>
              </button>
            </div>
          </div>

          <div className="settingsItem">
            <div className="settingsItemLabel">
              <span className="settingsItemText">Show Header</span>
            </div>
            <div className="settingsItemToggle">
              <button 
                className={`toggleSwitch ${showHeader ? 'active' : ''}`}
                onClick={() => setShowHeader(!showHeader)}
              >
                <div className="toggleSwitchKnob"></div>
              </button>
            </div>
          </div>

          <div className="settingsItem">
            <div className="settingsItemLabel">
              <span className="settingsItemText">Show Footer</span>
            </div>
            <div className="settingsItemToggle">
              <button 
                className={`toggleSwitch ${showFooter ? 'active' : ''}`}
                onClick={() => setShowFooter(!showFooter)}
              >
                <div className="toggleSwitchKnob"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings 