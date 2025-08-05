import React, { useState } from 'react';
import './messenger.css';
import { FiPlus, FiImage, FiSmile } from 'react-icons/fi';
import { IoSend } from 'react-icons/io5';
import { TbFileSmile } from "react-icons/tb";
import { GoPlusCircle } from "react-icons/go";
import { FiPlusCircle } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

const Messenger = ({ 
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
  forceDateDisplay = false, // Nowa opcja wymuszenia wyświetlania daty
  globalDateSettings = { // Globalne ustawienia formatowania dat
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

  // Helper function to determine if message is from sender
  const isMessageFromSender = (message) => {
    // If message has a type property, use it
    if (message.type) {
      return message.type === 'sender';
    }
    // If message has a sender property, use it
    if (message.sender) {
      return message.sender === senderName;
    }
    // Default: assume it's from sender if no specific info
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
    return 'Active now';
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
    
    // Użyj ustawień z wiadomości lub globalnych ustawień
    const settings = dateDisplaySettings || globalDateSettings;
    
    // Jeśli mamy ustawienia formatowania, użyj ich
    if (settings) {
      let formattedDate = '';
      let formattedTime = '';

      // Format date based on settings
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
          // Custom format - "Aug 7, 2025"
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

      // Format time if needed
      if (settings.showTime) {
        // Extract time from the date
        const hours = messageDate.getHours().toString().padStart(2, '0');
        const minutes = messageDate.getMinutes().toString().padStart(2, '0');
        const seconds = messageDate.getSeconds().toString().padStart(2, '0');
        formattedTime = `${hours}:${minutes}:${seconds}`;
      }

      // Combine date and time
      if (formattedDate && formattedTime) {
        return `${formattedDate}, ${formattedTime}`;
      } else if (formattedDate) {
        return formattedDate;
      } else if (formattedTime) {
        return formattedTime;
      }

      return '';
    }
    
    // Fallback do oryginalnej logiki jeśli nie ma ustawień
    // Check if it's today
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    // Check if it's yesterday
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    // Check if it's this year
    if (messageDate.getFullYear() === today.getFullYear()) {
      return messageDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
    
    // Different year
    return messageDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Helper function to check if we need to show date separator
  const shouldShowDateSeparator = (currentMessage, previousMessage) => {
    // Jeśli wymuszenie jest włączone, zawsze pokazuj separator
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
    <div className={`messenger messenger--${selectedDevice} ${darkMode ? 'messenger--dark' : ''}`}>
      <div className="messengerContainer">
        {/* Header */}
        {showHeader && (
          <div className="messengerHeader">
            <div className="messengerHeaderContainer">
              <div className="messengerHeaderLeft">
                <div className="messengerHeaderAvatar">
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
                    <span className="messengerHeaderAvatarText">{getHeaderInitial()}</span>
                  )}
                </div>
                <div className="messengerHeaderInfo">
                  <h3 className="messengerHeaderName">
                    {getHeaderName()}
                  </h3>
                  <p className="messengerHeaderStatus">
                    {getHeaderStatus()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Message Area */}
        <div className="messengerMessages">
          <div className="messengerMessagesContainer">
            {/* Messages with Date Separators */}
            <div className="messengerMessagesList">
              {messages && messages.length > 0 && messages.map((msg, idx) => {
                const isFromSender = isMessageFromSender(msg);
                
                // Sprawdzamy czy wiadomość ma treść (tekst lub obrazy)
                const hasContent = (msg.text && msg.text.trim()) || (msg.images && msg.images.length > 0);
                
                // Jeśli wiadomość nie ma treści, nie wyświetlamy jej
                if (!hasContent) {
                  return null;
                }
                
                // Check if we need to show date separator
                const prevMessage = idx > 0 ? messages[idx - 1] : null;
                const shouldShowSeparator = shouldShowDateSeparator(msg, prevMessage);
                
                // Check if previous message is from the same person
                const isPrevFromSamePerson = prevMessage && isMessageFromSender(prevMessage) === isFromSender;
                
                // Check if next message is from the same person
                const nextMessage = idx < messages.length - 1 ? messages[idx + 1] : null;
                const isNextFromSamePerson = nextMessage && isMessageFromSender(nextMessage) === isFromSender;
                
                // Determine border radius classes
                let borderRadiusClass = '';
                if (isFromSender) {
                  // Sender messages (right side)
                  if (!isPrevFromSamePerson && !isNextFromSamePerson) {
                    // Single message
                    borderRadiusClass = 'messengerMessageBubble--sender-single';
                  } else if (!isPrevFromSamePerson && isNextFromSamePerson) {
                    // First message in group
                    borderRadiusClass = 'messengerMessageBubble--sender-first';
                  } else if (isPrevFromSamePerson && !isNextFromSamePerson) {
                    // Last message in group
                    borderRadiusClass = 'messengerMessageBubble--sender-last';
                  } else {
                    // Middle message in group
                    borderRadiusClass = 'messengerMessageBubble--sender-middle';
                  }
                } else {
                  // Receiver messages (left side)
                  if (!isPrevFromSamePerson && !isNextFromSamePerson) {
                    // Single message
                    borderRadiusClass = 'messengerMessageBubble--receiver-single';
                  } else if (!isPrevFromSamePerson && isNextFromSamePerson) {
                    // First message in group
                    borderRadiusClass = 'messengerMessageBubble--receiver-first';
                  } else if (isPrevFromSamePerson && !isNextFromSamePerson) {
                    // Last message in group
                    borderRadiusClass = 'messengerMessageBubble--receiver-last';
                  } else {
                    // Middle message in group
                    borderRadiusClass = 'messengerMessageBubble--receiver-middle';
                  }
                }
                
                return (
                  <React.Fragment key={msg.id}>
                    {/* Date Separator */}
                    {shouldShowSeparator && (
                      <div className="messengerDateSeparator">
                        <span className="messengerDateText">
                          {formatMessageDate(getMessageDate(msg), msg.dateDisplaySettings)}
                        </span>
                      </div>
                    )}
                    
                    {/* Message */}
                    <div className={`messengerMessage ${isFromSender ? 'messengerMessage--sender' : 'messengerMessage--receiver'}`}>
                      {/* User Avatar for Receiver Messages */}
                      {!isFromSender && (
                        <div className="messengerMessageAvatar">
                          {getFirstReceiverImage() ? (
                            <img 
                              src={getFirstReceiverImage()} 
                              alt="User avatar" 
                              className="messengerMessageAvatarImage"
                            />
                          ) : (
                            <div className="messengerMessageAvatarFallback">
                              <FiUser className="messengerMessageAvatarIcon" />
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className={`messengerMessageBubble ${borderRadiusClass}`}>
                        {/* Message Images */}
                        {msg.images && msg.images.length > 0 && (
                          <div className="messengerMessageImages">
                            {msg.images.map((image, imgIdx) => (
                              <div key={imgIdx} className="messengerMessageImageWrapper">
                                <img 
                                  src={image.src} 
                                  alt="Message attachment" 
                                  className="messengerMessageImage"
                                  onClick={() => handleImageClick(image.src)}
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Message Text */}
                        {msg.text && msg.text.trim() && (
                          <span className="messengerMessageText">
                            {String(msg.text)}
                          </span>
                        )}
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
          <div className="messengerInput">
            <div className="messengerInputContainer">
              <div className="messengerInputLeft">
                <button className="messengerInputButton">
                  <FiPlusCircle   className="messengerInputIcon" />
                </button>
                <button className="messengerInputButton">
                  <FiImage className="messengerInputIcon" />
                </button>
                <button className="messengerInputButton">
                  <TbFileSmile  className="messengerInputIcon" />
                </button>
              </div>

              <div className="messengerInputCenter">
                <textarea
                  className="messengerInputField"
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows="1"
                />
              </div>

              <div className="messengerInputRight">
                <button
                  className="messengerSendButton"
                  onClick={handleSendMessage}
                >
                  <IoSend className="messengerSendIcon" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="messengerImageModal" onClick={closeImageModal}>
          <div className="messengerImageModalContent" onClick={(e) => e.stopPropagation()}>
            <button className="messengerImageModalClose" onClick={closeImageModal}>
              <IoCloseOutline className="messengerImageModalCloseIcon" />
            </button>
            <img 
              src={selectedImage} 
              alt="Full size image" 
              className="messengerImageModalImage"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Messenger