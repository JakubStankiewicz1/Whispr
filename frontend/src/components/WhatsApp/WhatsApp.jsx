import React, { useState } from 'react';
import './whatsapp.css';
import { FiPlus, FiImage, FiSmile } from 'react-icons/fi';
import { IoSend } from 'react-icons/io5';
import { TbFileSmile } from "react-icons/tb";
import { GoPlusCircle } from "react-icons/go";
import { FiPlusCircle } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";

const WhatsApp = ({ 
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

  // Get header info based on chat type
  const getHeaderName = () => {
    if (chatType === 'group') {
      return groupName || 'Group Chat';
    }
    return getFirstReceiverName();
  };

  const getHeaderImage = () => {
    if (chatType === 'group') {
      return groupImage || null;
    }
    return getFirstReceiverImage();
  };

  const getHeaderInitial = () => {
    if (chatType === 'group') {
      const name = getHeaderName();
      return name.charAt(0).toUpperCase();
    }
    return getReceiverInitial();
  };

  // Get header status based on chat type
  const getHeaderStatus = () => {
    if (chatType === 'group') {
      return `${receiverNames.filter(name => name.trim()).length} members`;
    }
    return getFirstReceiverStatus();
  };

  // Helper function to format date for display
  const formatMessageDate = (date, dateDisplaySettings = null) => {
    if (!date) return '';
    
    const messageDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const settings = dateDisplaySettings || globalDateSettings;
    
    if (settings) {
      let formattedDate = '';
      let formattedTime = '';

      if (settings.showDate) {
        if (settings.format === 'short') {
          formattedDate = messageDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            ...(settings.showYear && { year: 'numeric' })
          }).replace(/\//g, '.');
        } else if (settings.format === 'long') {
          formattedDate = messageDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        } else {
          const month = messageDate.toLocaleDateString('en-US', { month: 'short' });
          const day = messageDate.getDate();
          const year = settings.showYear ? messageDate.getFullYear() : '';
          
          if (settings.showYear) {
            formattedDate = `${month} ${day}, ${year}`;
          } else {
            formattedDate = `${month} ${day}`;
          }
        }
      }

      if (settings.showTime) {
        const hours = messageDate.getHours().toString().padStart(2, '0');
        const minutes = messageDate.getMinutes().toString().padStart(2, '0');
        const seconds = messageDate.getSeconds().toString().padStart(2, '0');
        formattedTime = `${hours}:${minutes}:${seconds}`;
      }

      if (formattedDate && formattedTime) {
        return `${formattedDate}, ${formattedTime}`;
      } else if (formattedDate) {
        return formattedDate;
      } else if (formattedTime) {
        return formattedTime;
      }

      return '';
    }
    
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    if (messageDate.getFullYear() === today.getFullYear()) {
      return messageDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
    
    return messageDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Helper function to format time for WhatsApp message timestamps
  const formatMessageTime = (date) => {
    if (!date) return '';
    
    const messageDate = new Date(date);
    const hours = messageDate.getHours().toString().padStart(2, '0');
    const minutes = messageDate.getMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes}`;
  };

  // Helper function to check if we need to show date separator
  const shouldShowDateSeparator = (currentMessage, previousMessage) => {
    if (forceDateDisplay) return true;
    
    if (!currentMessage || !previousMessage) return true;
    
    const currentDate = new Date(currentMessage.date || currentMessage.timestamp || Date.now());
    const previousDate = new Date(previousMessage.date || previousMessage.timestamp || Date.now());
    
    return currentDate.toDateString() !== previousDate.toDateString();
  };

  // Helper function to get message date
  const getMessageDate = (message) => {
    return message.date || message.timestamp || new Date();
  };

  const headerImage = getHeaderImage();

  return (
    <div className={`whatsapp whatsapp--${selectedDevice} ${darkMode ? 'whatsapp--dark' : ''}`}>
      <div className="whatsappContainer">
        {/* Header */}
        {showHeader && (
          <div className="whatsappHeader">
            <div className="whatsappHeaderContainer">
              <div className="whatsappHeaderLeft">
                <div className="whatsappHeaderAvatar">
                  {headerImage ? (
                    <img
                      src={headerImage}
                      alt="Profile"
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <span className="whatsappHeaderAvatarText">{getHeaderInitial()}</span>
                  )}
                </div>
                <div className="whatsappHeaderInfo">
                  <h3 className="whatsappHeaderName">
                    {getHeaderName()}
                  </h3>
                  <p className="whatsappHeaderStatus">
                    {getHeaderStatus()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Message Area */}
        <div className="whatsappMessages">
          <div className="whatsappMessagesContainer">
            <div className="whatsappMessagesList">
              {messages && messages.length > 0 && messages.map((msg, idx) => {
                const isFromSender = isMessageFromSender(msg);
                
                const hasContent = (msg.text && msg.text.trim()) || (msg.images && msg.images.length > 0);
                
                if (!hasContent) {
                  return null;
                }
                
                const prevMessage = idx > 0 ? messages[idx - 1] : null;
                const shouldShowSeparator = shouldShowDateSeparator(msg, prevMessage);
                
                const isPrevFromSamePerson = prevMessage && isMessageFromSender(prevMessage) === isFromSender;
                
                const nextMessage = idx < messages.length - 1 ? messages[idx + 1] : null;
                const isNextFromSamePerson = nextMessage && isMessageFromSender(nextMessage) === isFromSender;
                
                let borderRadiusClass = '';
                if (isFromSender) {
                  if (!isPrevFromSamePerson && !isNextFromSamePerson) {
                    borderRadiusClass = 'whatsappMessageBubble--sender-single';
                  } else if (!isPrevFromSamePerson && isNextFromSamePerson) {
                    borderRadiusClass = 'whatsappMessageBubble--sender-first';
                  } else if (isPrevFromSamePerson && !isNextFromSamePerson) {
                    borderRadiusClass = 'whatsappMessageBubble--sender-last';
                  } else {
                    borderRadiusClass = 'whatsappMessageBubble--sender-middle';
                  }
                } else {
                  if (!isPrevFromSamePerson && !isNextFromSamePerson) {
                    borderRadiusClass = 'whatsappMessageBubble--receiver-single';
                  } else if (!isPrevFromSamePerson && isNextFromSamePerson) {
                    borderRadiusClass = 'whatsappMessageBubble--receiver-first';
                  } else if (isPrevFromSamePerson && !isNextFromSamePerson) {
                    borderRadiusClass = 'whatsappMessageBubble--receiver-last';
                  } else {
                    borderRadiusClass = 'whatsappMessageBubble--receiver-middle';
                  }
                }
                
                return (
                  <React.Fragment key={msg.id}>
                    {shouldShowSeparator && (
                      <div className="whatsappDateSeparator">
                        <span className="whatsappDateText">
                          {formatMessageDate(getMessageDate(msg), msg.dateDisplaySettings)}
                        </span>
                      </div>
                    )}
                    
                    <div className={`whatsappMessage ${isFromSender ? 'whatsappMessage--sender' : 'whatsappMessage--receiver'}`}>
                      {!isFromSender && (
                        <div className="whatsappMessageAvatar">
                          {getFirstReceiverImage() ? (
                            <img 
                              src={getFirstReceiverImage()} 
                              alt="User avatar" 
                              className="whatsappMessageAvatarImage"
                            />
                          ) : (
                            <div className="whatsappMessageAvatarFallback">
                              <FiUser className="whatsappMessageAvatarIcon" />
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className={`whatsappMessageBubble ${borderRadiusClass}`}>
                        {msg.images && msg.images.length > 0 && (
                          <div className="whatsappMessageImages">
                            {msg.images.map((image, imgIdx) => (
                              <div key={imgIdx} className="whatsappMessageImageWrapper">
                                <img 
                                  src={image.src} 
                                  alt="Message attachment" 
                                  className="whatsappMessageImage"
                                  onClick={() => handleImageClick(image.src)}
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {msg.text && msg.text.trim() && (
                          <span className="whatsappMessageText">
                            {String(msg.text)}
                          </span>
                        )}
                        
                        {/* WhatsApp Message Timestamp */}
                        <div className="whatsappMessageTimestamp">
                          <span className="whatsappMessageTime">
                            {formatMessageTime(getMessageDate(msg))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* Input Bar */}
        {showFooter && (
          <div className="whatsappInput">
            <div className="whatsappInputContainer">
              <div className="whatsappInputLeft">
                <button className="whatsappInputButton">
                  <FiPlusCircle className="whatsappInputIcon" />
                </button>
                <button className="whatsappInputButton">
                  <FiImage className="whatsappInputIcon" />
                </button>
                <button className="whatsappInputButton">
                  <TbFileSmile className="whatsappInputIcon" />
                </button>
              </div>

              <div className="whatsappInputCenter">
                <textarea
                  className="whatsappInputField"
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows="1"
                />
              </div>

              <div className="whatsappInputRight">
                {inputMessage.trim() ? (
                  <button
                    className="whatsappSendButton"
                    onClick={handleSendMessage}
                  >
                    <IoSend className="whatsappSendIcon" />
                  </button>
                ) : (
                  <button
                    className={`whatsappVoiceButton ${isRecording ? 'recording' : ''}`}
                    onClick={handleVoiceRecord}
                  >
                    <FaMicrophone className="whatsappVoiceIcon" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="whatsappImageModal" onClick={closeImageModal}>
          <div className="whatsappImageModalContent" onClick={(e) => e.stopPropagation()}>
            <button className="whatsappImageModalClose" onClick={closeImageModal}>
              <IoCloseOutline className="whatsappImageModalCloseIcon" />
            </button>
            <img 
              src={selectedImage} 
              alt="Full size image" 
              className="whatsappImageModalImage"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default WhatsApp 