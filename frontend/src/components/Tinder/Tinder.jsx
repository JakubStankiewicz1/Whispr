import React, { useState } from 'react';
import './tinder.css';
import { FiPlus, FiImage, FiSmile, FiVideo, FiPhone, FiSearch, FiMoreHorizontal, FiHeart } from 'react-icons/fi';
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
import { SiTinder } from "react-icons/si";
import { BsThreeDots } from "react-icons/bs";

const Tinder = ({ 
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
    return 'Match';
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
    
    // Show date if it's a different day or if forced
    return currentDate.toDateString() !== previousDate.toDateString() || 
           forceDateDisplay || 
           currentMessage.dateDisplaySettings?.showDate;
  };

  return (
    <div className={`tinder ${darkMode ? 'tinder--dark' : ''} tinder--${selectedDevice}`}>
      <div className="tinderContainer">
        {showHeader && (
          <div className="tinderHeader">
            <div className="tinderHeaderContainer">
              <div className="tinderHeaderLeft">
                {chatType === 'group' ? (
                  <>
                    {groupImage ? (
                      <img src={groupImage} alt="Group" className="tinderHeaderAvatar tinderGroupAvatar" />
                    ) : (
                      <div className="tinderHeaderAvatar tinderGroupAvatar tinderDefaultAvatar">
                        <FiUser size={20} />
                      </div>
                    )}
                    <div className="tinderHeaderInfo">
                      <h3 className="tinderHeaderName">{groupName || 'Group Chat'}</h3>
                      <p className="tinderHeaderStatus">
                        {receiverNames.filter(name => name.trim()).length} participants
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {getFirstReceiverImage() ? (
                      <img src={getFirstReceiverImage()} alt={getFirstReceiverName()} className="tinderHeaderAvatar" />
                    ) : (
                      <div className="tinderHeaderAvatar tinderDefaultAvatar">
                        <FiUser size={20} />
                      </div>
                    )}
                    <div className="tinderHeaderInfo">
                      <h3 className="tinderHeaderName">{getFirstReceiverName()}</h3>
                      <div className="tinderHeaderMatch">
                        <FiHeart size={12} />
                        <span>{getFirstReceiverStatus()}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="tinderHeaderRight">
                <button className="tinderHeaderButton">
                  <FiVideo size={18} />
                </button>
                <button className="tinderHeaderButton">
                  <BsThreeDots size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="tinderMessages">
          <div className="tinderMessagesContainer">
            {messages && messages.length > 0 ? (
              messages.map((message, index) => (
                <div key={message.id || index}>
                  {shouldShowDate(message, index) && (
                    <div className="tinderDateSeparator">
                      <span className="tinderDateText">
                        {formatDate(message.date, message.dateDisplaySettings || {})}
                      </span>
                    </div>
                  )}
                  <div className={`tinderMessage ${isMessageFromSender(message) ? 'tinderMessage--sender' : 'tinderMessage--receiver'}`}>
                    {!isMessageFromSender(message) && chatType === 'group' && (
                      <div className="tinderMessageSenderName">
                        {message.sender || getFirstReceiverName()}
                      </div>
                    )}
                    {message.images && message.images.length > 0 && (
                      <div className="tinderMessageImages">
                        {message.images.map((img, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={img}
                            alt="Message attachment"
                            className="tinderMessageImage"
                            onClick={() => handleImageClick(img)}
                          />
                        ))}
                      </div>
                    )}
                    {message.text && (
                      <div className="tinderMessageBubble">
                        <p className="tinderMessageText">{message.text}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="tinderEmptyState">
                <SiTinder size={48} className="tinderEmptyIcon" />
                <p>It's a match! Start chatting</p>
              </div>
            )}
          </div>
        </div>

        {showFooter && (
          <div className="tinderInput">
            <div className="tinderInputContainer">
              <div className="tinderInputBox">
                <button className="tinderInputButton tinderInputAttach">
                  <FiImage size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Type a message"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="tinderInputField"
                />
                <button className="tinderInputButton tinderInputEmoji">
                  <FiSmile size={20} />
                </button>
                <button 
                  className="tinderInputSend"
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

      {/* Image Modal */}
      {selectedImage && (
        <div className="tinderImageModal" onClick={closeImageModal}>
          <div className="tinderImageModalContent" onClick={e => e.stopPropagation()}>
            <button className="tinderImageModalClose" onClick={closeImageModal}>
              <IoCloseOutline size={24} />
            </button>
            <img src={selectedImage} alt="Expanded view" className="tinderImageModalImage" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tinder;