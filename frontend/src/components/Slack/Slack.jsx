import React, { useState } from 'react';
import './slack.css';
import { FiPlus, FiImage, FiSmile, FiVideo, FiPhone, FiSearch, FiMoreHorizontal } from 'react-icons/fi';
import { IoSend } from 'react-icons/io5';
import { TbFileSmile } from "react-icons/tb";
import { GoPlusCircle } from "react-icons/go";
import { FiPlusCircle } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { HiMicrophone } from "react-icons/hi2";
import { HiOutlineMicrophone } from "react-icons/hi";
import { SiSlack } from "react-icons/si";
import { BsThreeDots } from "react-icons/bs";

const Slack = ({ 
  senderName, 
  receiverNames, 
  receiverImages, 
  receiverStatuses = [],
  messages, 
  selectedDevice = 'desktop', 
  chatType = 'single', 
  groupName = '', 
  groupImage = '', 
  darkMode = false, 
  showHeader = true, 
  showFooter = true,
  forceDateDisplay = false,
  globalDateSettings = {
    showDate: true,
    showTime: true,
    showYear: true,
    format: 'short'
  }
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const isMessageFromSender = (message) => {
    if (message.type) {
      return message.type === 'sender';
    }
    if (message.sender) {
      return message.sender === senderName;
    }
    return true;
  };

  const getFirstReceiverName = () => {
    if (receiverNames && receiverNames.length > 0 && receiverNames[0].trim()) {
      return receiverNames[0];
    }
    return 'Teammate';
  };

  const getFirstReceiverImage = () => {
    if (receiverImages && receiverImages.length > 0 && receiverImages[0]) {
      return receiverImages[0];
    }
    return null;
  };

  const getFirstReceiverStatus = () => {
    if (receiverStatuses && receiverStatuses.length > 0 && receiverStatuses[0]) {
      return receiverStatuses[0];
    }
    return 'Active';
  };

  const formatDate = (date, settings) => {
    if (!date) return '';
    
    const messageDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const isToday = messageDate.toDateString() === today.toDateString();
    const isYesterday = messageDate.toDateString() === yesterday.toDateString();
    
    let dateString = '';
    
    if (settings.showDate || forceDateDisplay || globalDateSettings.showDate) {
      if (isToday) {
        dateString = 'Today';
      } else if (isYesterday) {
        dateString = 'Yesterday';
      } else {
        const options = { 
          month: globalDateSettings.format === 'short' ? 'short' : 'long', 
          day: 'numeric' 
        };
        if (globalDateSettings.showYear || settings.showYear) {
          options.year = 'numeric';
        }
        dateString = messageDate.toLocaleDateString('en-US', options);
      }
    }
    
    if (settings.showTime || globalDateSettings.showTime) {
      const timeString = messageDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      });
      dateString = dateString ? `${dateString} at ${timeString}` : timeString;
    }
    
    return dateString;
  };

  const shouldShowDate = (message, index) => {
    if (!messages || messages.length === 0) return false;
    if (index === 0) return true;
    
    const currentMessage = messages[index];
    const previousMessage = messages[index - 1];
    
    if (!currentMessage.date || !previousMessage.date) return false;
    
    const currentDate = new Date(currentMessage.date);
    const previousDate = new Date(previousMessage.date);
    
    return currentDate.toDateString() !== previousDate.toDateString() || 
           forceDateDisplay || 
           currentMessage.dateDisplaySettings?.showDate;
  };

  return (
    <div className={`slack ${darkMode ? 'slack--dark' : ''} slack--${selectedDevice}`}>
      <div className="slackContainer">
        {showHeader && (
          <div className="slackHeader">
            <div className="slackHeaderContainer">
              <div className="slackHeaderLeft">
                {chatType === 'group' ? (
                  <>
                    {groupImage ? (
                      <img src={groupImage} alt="Channel" className="slackHeaderAvatar slackGroupAvatar" />
                    ) : (
                      <div className="slackHeaderAvatar slackGroupAvatar slackDefaultAvatar">
                        <span>#</span>
                      </div>
                    )}
                    <div className="slackHeaderInfo">
                      <h3 className="slackHeaderName">#{groupName || 'general'}</h3>
                      <p className="slackHeaderStatus">
                        {receiverNames.filter(name => name.trim()).length} members
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {getFirstReceiverImage() ? (
                      <img src={getFirstReceiverImage()} alt={getFirstReceiverName()} className="slackHeaderAvatar" />
                    ) : (
                      <div className="slackHeaderAvatar slackDefaultAvatar">
                        <FiUser size={20} />
                      </div>
                    )}
                    <div className="slackHeaderInfo">
                      <h3 className="slackHeaderName">{getFirstReceiverName()}</h3>
                      <p className="slackHeaderStatus">{getFirstReceiverStatus()}</p>
                    </div>
                  </>
                )}
              </div>
              <div className="slackHeaderRight">
                <button className="slackHeaderButton">
                  <FiPhone size={18} />
                </button>
                <button className="slackHeaderButton">
                  <FiVideo size={18} />
                </button>
                <button className="slackHeaderButton">
                  <BsThreeDots size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="slackMessages">
          <div className="slackMessagesContainer">
            {messages && messages.length > 0 ? (
              messages.map((message, index) => (
                <div key={message.id || index}>
                  {shouldShowDate(message, index) && (
                    <div className="slackDateSeparator">
                      <span className="slackDateText">
                        {formatDate(message.date, message.dateDisplaySettings || {})}
                      </span>
                    </div>
                  )}
                  <div className={`slackMessage ${isMessageFromSender(message) ? 'slackMessage--sender' : 'slackMessage--receiver'}`}>
                    <div className="slackMessageAvatar">
                      {isMessageFromSender(message) ? (
                        <div className="slackMessageAvatarImage">
                          {senderName.charAt(0).toUpperCase()}
                        </div>
                      ) : (
                        getFirstReceiverImage() ? (
                          <img src={getFirstReceiverImage()} alt={getFirstReceiverName()} className="slackMessageAvatarImage" />
                        ) : (
                          <div className="slackMessageAvatarImage">
                            {getFirstReceiverName().charAt(0).toUpperCase()}
                          </div>
                        )
                      )}
                    </div>
                    <div className="slackMessageContent">
                      <div className="slackMessageHeader">
                        <span className="slackMessageSender">
                          {isMessageFromSender(message) ? senderName : (message.sender || getFirstReceiverName())}
                        </span>
                        <span className="slackMessageTime">
                          {new Date(message.date).toLocaleTimeString('en-US', { 
                            hour: 'numeric', 
                            minute: '2-digit', 
                            hour12: true 
                          })}
                        </span>
                      </div>
                      {message.images && message.images.length > 0 && (
                        <div className="slackMessageImages">
                          {message.images.map((img, imgIndex) => (
                            <img
                              key={imgIndex}
                              src={img}
                              alt="Attachment"
                              className="slackMessageImage"
                              onClick={() => handleImageClick(img)}
                            />
                          ))}
                        </div>
                      )}
                      {message.text && (
                        <div className="slackMessageText">
                          {message.text}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="slackEmptyState">
                <SiSlack size={48} className="slackEmptyIcon" />
                <p>This is the beginning of your conversation</p>
              </div>
            )}
          </div>
        </div>

        {showFooter && (
          <div className="slackInput">
            <div className="slackInputContainer">
              <div className="slackInputBox">
                <button className="slackInputButton slackInputAttach">
                  <FiPlus size={20} />
                </button>
                <input
                  type="text"
                  placeholder={`Message ${chatType === 'group' ? `#${groupName || 'general'}` : getFirstReceiverName()}`}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="slackInputField"
                />
                <button className="slackInputButton slackInputEmoji">
                  <FiSmile size={20} />
                </button>
                <button 
                  className="slackInputSend"
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                >
                  <IoSend size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedImage && (
        <div className="slackImageModal" onClick={closeImageModal}>
          <div className="slackImageModalContent" onClick={e => e.stopPropagation()}>
            <button className="slackImageModalClose" onClick={closeImageModal}>
              <IoCloseOutline size={24} />
            </button>
            <img src={selectedImage} alt="Expanded view" className="slackImageModalImage" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Slack;
