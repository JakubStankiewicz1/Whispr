import React, { useState } from 'react';
import './instagram.css';
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
import { FaInstagram } from "react-icons/fa";

const Instagram = ({ 
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
    return 'active now';
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

  // Format message time for Instagram
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
    <div className={`instagram ${selectedDevice === 'mobile' ? 'instagram--mobile' : 'instagram--desktop'} ${darkMode ? 'instagram--dark' : ''}`}>
      <div className="instagramContainer">
        {/* Header */}
        {showHeader && (
          <div className="instagramHeader">
            <div className="instagramHeaderContainer">
              <div className="instagramHeaderLeft">
                <div className="instagramHeaderAvatar">
                  {getHeaderImage() ? (
                    <img 
                      src={getHeaderImage()} 
                      alt="Avatar" 
                      className="instagramHeaderAvatarImage"
                    />
                  ) : (
                    <span className="instagramHeaderAvatarText">{getHeaderInitial()}</span>
                  )}
                </div>
                <div className="instagramHeaderInfo">
                  <h3 className="instagramHeaderName">{getHeaderName()}</h3>
                  <p className="instagramHeaderStatus">{getHeaderStatus()}</p>
                </div>
              </div>
              <div className="instagramHeaderRight">
                <button className="instagramHeaderButton">
                  <FiVideo className="instagramHeaderIcon" />
                </button>
                <button className="instagramHeaderButton">
                  <FiPhone className="instagramHeaderIcon" />
                </button>
                <button className="instagramHeaderButton">
                  <FiSearch className="instagramHeaderIcon" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Messages Area */}
        <div className="instagramMessages">
          <div className="instagramMessagesContainer">
            {messages && messages.length > 0 ? (
              <div className="instagramMessagesList">
                {messages.map((message, index) => {
                  const isSender = isMessageFromSender(message);
                  const showDateSeparator = shouldShowDateSeparator(message, messages[index - 1]);
                  
                  return (
                    <React.Fragment key={message.id || index}>
                      {showDateSeparator && (
                        <div className="instagramDateSeparator">
                          <span className="instagramDateText">
                            {formatMessageDate(getMessageDate(message))}
                          </span>
                        </div>
                      )}
                      <div className={`instagramMessage ${isSender ? 'instagramMessage--sender' : 'instagramMessage--receiver'}`}>
                        {!isSender && (
                          <div className="instagramMessageAvatar">
                            {receiverImages && receiverImages[0] ? (
                              <img 
                                src={receiverImages[0]} 
                                alt="Avatar" 
                                className="instagramMessageAvatarImage"
                              />
                            ) : (
                              <div className="instagramMessageAvatarFallback">
                                <span className="instagramMessageAvatarIcon">
                                  {getReceiverInitial()}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                        <div className={`instagramMessageBubble ${isSender ? 'instagramMessageBubble--sender' : 'instagramMessageBubble--receiver'}`}>
                          {message.images && message.images.length > 0 && (
                            <div className="instagramMessageImages">
                              {message.images.map((image, imgIndex) => (
                                <div 
                                  key={imgIndex} 
                                  className="instagramMessageImageWrapper"
                                  onClick={() => handleImageClick(image)}
                                >
                                  <img 
                                    src={image} 
                                    alt="Message" 
                                    className="instagramMessageImage"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                          {message.text && (
                            <p className="instagramMessageText">{message.text}</p>
                          )}
                          <span className="instagramMessageTimestamp">
                            {formatMessageTime(getMessageDate(message))}
                          </span>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            ) : (
              <div className="instagramEmptyState">
                <FaInstagram className="instagramEmptyIcon" />
                <p className="instagramEmptyText">Start a conversation</p>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        {showFooter && (
          <div className="instagramInput">
            <div className="instagramInputContainer">
              <div className="instagramInputLeft">
                <button className="instagramInputButton" onClick={handleVoiceRecord}>
                  <HiOutlineMicrophone className={`instagramInputIcon ${isRecording ? 'recording' : ''}`} />
                </button>
              </div>
              <div className="instagramInputCenter">
                <input
                  type="text"
                  className="instagramInputField"
                  placeholder="Message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className="instagramInputRight">
                <button className="instagramInputButton">
                  <FiImage className="instagramInputIcon" />
                </button>
                <button className="instagramInputButton">
                  <FiSmile className="instagramInputIcon" />
                </button>
                <button className="instagramSendButton" onClick={handleSendMessage}>
                  <IoSend className="instagramSendIcon" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="instagramImageModal" onClick={closeImageModal}>
          <div className="instagramImageModalContent" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage} 
              alt="Full size" 
              className="instagramImageModalImage"
            />
            <button className="instagramImageModalClose" onClick={closeImageModal}>
              <IoCloseOutline className="instagramImageModalCloseIcon" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instagram;
