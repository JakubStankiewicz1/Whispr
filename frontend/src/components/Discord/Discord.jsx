import React, { useState } from 'react';
import './discord.css';
import { FiPlus, FiImage, FiSmile, FiVideo, FiPhone, FiSearch } from 'react-icons/fi';
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
import { FaDiscord } from "react-icons/fa";

const Discord = ({ 
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
  const [isRecording, setIsRecording] = useState(false);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // Here you would typically add the message to the messages array
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

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // Here you would implement voice recording functionality
  };

  // Helper function to determine if message is from sender
  const isMessageFromSender = (message) => {
    if (message.type) {
      return message.type === 'sender';
    }
    if (message.sender) {
      return message.sender === senderName;
    }
    return true;
  };

  // Get the first receiver name for the header (single chat)
  const getFirstReceiverName = () => {
    if (receiverNames && receiverNames.length > 0 && receiverNames[0].trim()) {
      return receiverNames[0];
    }
    return 'Receiver';
  };

  // Get the first receiver image for the header (single chat)
  const getFirstReceiverImage = () => {
    if (receiverImages && receiverImages.length > 0 && receiverImages[0]) {
      return receiverImages[0];
    }
    return null;
  };

  // Get the first receiver status for the header (single chat)
  const getFirstReceiverStatus = () => {
    if (receiverStatuses && receiverStatuses.length > 0 && receiverStatuses[0]) {
      return receiverStatuses[0];
    }
    return 'online';
  };

  // Get the first letter of the receiver name for avatar (fallback)
  const getReceiverInitial = () => {
    const name = getFirstReceiverName();
    return name.charAt(0).toUpperCase();
  };

  // Get header name based on chat type
  const getHeaderName = () => {
    if (chatType === 'group' && groupName) {
      return groupName;
    }
    return getFirstReceiverName();
  };

  // Get header image based on chat type
  const getHeaderImage = () => {
    if (chatType === 'group' && groupImage) {
      return groupImage;
    }
    return getFirstReceiverImage();
  };

  // Get header initial based on chat type
  const getHeaderInitial = () => {
    if (chatType === 'group' && groupName) {
      return groupName.charAt(0).toUpperCase();
    }
    return getReceiverInitial();
  };

  // Get header status based on chat type
  const getHeaderStatus = () => {
    if (chatType === 'group') {
      return `${receiverNames ? receiverNames.length : 0} members`;
    }
    return getFirstReceiverStatus();
  };

  // Format message date
  const formatMessageDate = (date, dateDisplaySettings = null) => {
    const settings = dateDisplaySettings || globalDateSettings;
    const messageDate = new Date(date);
    const now = new Date();
    const diffInHours = (now - messageDate) / (1000 * 60 * 60);
    const diffInDays = (now - messageDate) / (1000 * 60 * 60 * 24);

    let formattedDate = '';

    if (settings.showDate) {
      if (diffInDays >= 7) {
        if (settings.showYear) {
          formattedDate = messageDate.toLocaleDateString('en-US', {
            month: settings.format === 'short' ? 'short' : 'long',
            day: 'numeric',
            year: 'numeric'
          });
        } else {
          formattedDate = messageDate.toLocaleDateString('en-US', {
            month: settings.format === 'short' ? 'short' : 'long',
            day: 'numeric'
          });
        }
      } else if (diffInDays >= 1) {
        formattedDate = messageDate.toLocaleDateString('en-US', {
          weekday: settings.format === 'short' ? 'short' : 'long'
        });
      } else if (diffInHours >= 1) {
        formattedDate = `${Math.floor(diffInHours)}h ago`;
      } else {
        const diffInMinutes = (now - messageDate) / (1000 * 60);
        if (diffInMinutes >= 1) {
          formattedDate = `${Math.floor(diffInMinutes)}m ago`;
        } else {
          formattedDate = 'now';
        }
      }
    }

    if (settings.showTime && diffInDays < 7) {
      const timeString = messageDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      formattedDate = formattedDate ? `${formattedDate} • ${timeString}` : timeString;
    }

    return formattedDate;
  };

  // Format message time for Discord
  const formatMessageTime = (date) => {
    const messageDate = new Date(date);
    return messageDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Check if we should show date separator
  const shouldShowDateSeparator = (currentMessage, previousMessage) => {
    if (!currentMessage || !previousMessage) return false;
    
    const currentDate = new Date(currentMessage.date || currentMessage.timestamp);
    const previousDate = new Date(previousMessage.date || previousMessage.timestamp);
    
    return currentDate.toDateString() !== previousDate.toDateString();
  };

  // Get message date for comparison
  const getMessageDate = (message) => {
    return message.date || message.timestamp || new Date();
  };

  return (
    <div className={`discord ${selectedDevice === 'mobile' ? 'discord--mobile' : 'discord--desktop'} ${darkMode ? 'discord--dark' : ''}`}>
      <div className="discordContainer">
        {/* Header */}
        {showHeader && (
          <div className="discordHeader">
            <div className="discordHeaderContainer">
              <div className="discordHeaderLeft">
                <div className="discordHeaderAvatar">
                  {getHeaderImage() ? (
                    <img 
                      src={getHeaderImage()} 
                      alt="Avatar" 
                      className="discordHeaderAvatarImage"
                    />
                  ) : (
                    <span className="discordHeaderAvatarText">{getHeaderInitial()}</span>
                  )}
                </div>
                <div className="discordHeaderInfo">
                  <h3 className="discordHeaderName">{getHeaderName()}</h3>
                  <p className="discordHeaderStatus">{getHeaderStatus()}</p>
                </div>
              </div>
              <div className="discordHeaderRight">
                <button className="discordHeaderButton">
                  <FiSearch className="discordHeaderIcon" />
                </button>
                <button className="discordHeaderButton">
                  <FiPhone className="discordHeaderIcon" />
                </button>
                <button className="discordHeaderButton">
                  <FiVideo className="discordHeaderIcon" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Messages Area */}
        <div className="discordMessages">
          <div className="discordMessagesContainer">
            {messages && messages.length > 0 ? (
              <div className="discordMessagesList">
                {messages.map((message, index) => {
                  const isSender = isMessageFromSender(message);
                  const showDateSeparator = shouldShowDateSeparator(message, messages[index - 1]);
                  
                  return (
                    <React.Fragment key={message.id || index}>
                      {showDateSeparator && (
                        <div className="discordDateSeparator">
                          <span className="discordDateText">
                            {formatMessageDate(getMessageDate(message))}
                          </span>
                        </div>
                      )}
                      <div className={`discordMessage ${isSender ? 'discordMessage--sender' : 'discordMessage--receiver'}`}>
                        {!isSender && (
                          <div className="discordMessageAvatar">
                            {receiverImages && receiverImages[0] ? (
                              <img 
                                src={receiverImages[0]} 
                                alt="Avatar" 
                                className="discordMessageAvatarImage"
                              />
                            ) : (
                              <div className="discordMessageAvatarFallback">
                                <span className="discordMessageAvatarIcon">
                                  {getReceiverInitial()}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="discordMessageContent">
                          {!isSender && (
                            <div className="discordMessageHeader">
                              <span className="discordMessageAuthor">{getFirstReceiverName()}</span>
                              <span className="discordMessageTime">{formatMessageTime(getMessageDate(message))}</span>
                            </div>
                          )}
                          <div className={`discordMessageBubble ${isSender ? 'discordMessageBubble--sender' : 'discordMessageBubble--receiver'}`}>
                            {message.images && message.images.length > 0 && (
                              <div className="discordMessageImages">
                                {message.images.map((image, imgIndex) => (
                                  <div 
                                    key={imgIndex} 
                                    className="discordMessageImageWrapper"
                                    onClick={() => handleImageClick(image)}
                                  >
                                    <img 
                                      src={image} 
                                      alt="Message" 
                                      className="discordMessageImage"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                            {message.text && (
                              <p className="discordMessageText">{message.text}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            ) : (
              <div className="discordEmptyState">
                <FaDiscord className="discordEmptyIcon" />
                <p className="discordEmptyText">Start a conversation</p>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        {showFooter && (
          <div className="discordInput">
            <div className="discordInputContainer">
              <div className="discordInputLeft">
                <button className="discordInputButton" onClick={handleVoiceRecord}>
                  <HiOutlineMicrophone className={`discordInputIcon ${isRecording ? 'recording' : ''}`} />
                </button>
              </div>
              <div className="discordInputCenter">
                <input
                  type="text"
                  className="discordInputField"
                  placeholder="Message @channel"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className="discordInputRight">
                <button className="discordInputButton">
                  <FiImage className="discordInputIcon" />
                </button>
                <button className="discordInputButton">
                  <FiSmile className="discordInputIcon" />
                </button>
                <button className="discordSendButton" onClick={handleSendMessage}>
                  <IoSend className="discordSendIcon" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="discordImageModal" onClick={closeImageModal}>
          <div className="discordImageModalContent" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage} 
              alt="Full size" 
              className="discordImageModalImage"
            />
            <button className="discordImageModalClose" onClick={closeImageModal}>
              <IoCloseOutline className="discordImageModalCloseIcon" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discord;
