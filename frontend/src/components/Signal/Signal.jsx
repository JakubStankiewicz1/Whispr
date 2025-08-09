import React, { useState } from 'react';
import './signal.css';
import { FiPlus, FiImage, FiSmile, FiVideo, FiPhone, FiSearch, FiMoreHorizontal, FiLock } from 'react-icons/fi';
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
import { SiSignal } from "react-icons/si";
import { BsThreeDots } from "react-icons/bs";

const Signal = ({ 
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
    return 'Contact';
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
    return 'Last seen recently';
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
    <div className={`signal ${darkMode ? 'signal--dark' : ''} signal--${selectedDevice}`}>
      <div className="signalContainer">
        {showHeader && (
          <div className="signalHeader">
            <div className="signalHeaderContainer">
              <div className="signalHeaderLeft">
                {chatType === 'group' ? (
                  <>
                    {groupImage ? (
                      <img src={groupImage} alt="Group" className="signalHeaderAvatar signalGroupAvatar" />
                    ) : (
                      <div className="signalHeaderAvatar signalGroupAvatar signalDefaultAvatar">
                        <FiUser size={20} />
                      </div>
                    )}
                    <div className="signalHeaderInfo">
                      <h3 className="signalHeaderName">{groupName || 'Group Chat'}</h3>
                      <div className="signalHeaderEncrypted">
                        <FiLock size={10} />
                        <span>{receiverNames.filter(name => name.trim()).length} members</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {getFirstReceiverImage() ? (
                      <img src={getFirstReceiverImage()} alt={getFirstReceiverName()} className="signalHeaderAvatar" />
                    ) : (
                      <div className="signalHeaderAvatar signalDefaultAvatar">
                        <FiUser size={20} />
                      </div>
                    )}
                    <div className="signalHeaderInfo">
                      <h3 className="signalHeaderName">{getFirstReceiverName()}</h3>
                      <div className="signalHeaderEncrypted">
                        <FiLock size={10} />
                        <span>{getFirstReceiverStatus()}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="signalHeaderRight">
                <button className="signalHeaderButton">
                  <FiPhone size={18} />
                </button>
                <button className="signalHeaderButton">
                  <FiVideo size={18} />
                </button>
                <button className="signalHeaderButton">
                  <BsThreeDots size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="signalMessages">
          <div className="signalMessagesContainer">
            {messages && messages.length > 0 ? (
              messages.map((message, index) => (
                <div key={message.id || index}>
                  {shouldShowDate(message, index) && (
                    <div className="signalDateSeparator">
                      <span className="signalDateText">
                        {formatDate(message.date, message.dateDisplaySettings || {})}
                      </span>
                    </div>
                  )}
                  <div className={`signalMessage ${isMessageFromSender(message) ? 'signalMessage--sender' : 'signalMessage--receiver'}`}>
                    {!isMessageFromSender(message) && chatType === 'group' && (
                      <div className="signalMessageSenderName">
                        {message.sender || getFirstReceiverName()}
                      </div>
                    )}
                    {message.images && message.images.length > 0 && (
                      <div className="signalMessageImages">
                        {message.images.map((img, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={img}
                            alt="Attachment"
                            className="signalMessageImage"
                            onClick={() => handleImageClick(img)}
                          />
                        ))}
                      </div>
                    )}
                    {message.text && (
                      <div className="signalMessageBubble">
                        <p className="signalMessageText">{message.text}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="signalEmptyState">
                <SiSignal size={48} className="signalEmptyIcon" />
                <p>Your conversation is secured with end-to-end encryption</p>
              </div>
            )}
          </div>
        </div>

        {showFooter && (
          <div className="signalInput">
            <div className="signalInputContainer">
              <div className="signalInputBox">
                <button className="signalInputButton signalInputAttach">
                  <FiImage size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Message"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="signalInputField"
                />
                <button className="signalInputButton signalInputEmoji">
                  <FiSmile size={20} />
                </button>
                <button 
                  className="signalInputSend"
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
        <div className="signalImageModal" onClick={closeImageModal}>
          <div className="signalImageModalContent" onClick={e => e.stopPropagation()}>
            <button className="signalImageModalClose" onClick={closeImageModal}>
              <IoCloseOutline size={24} />
            </button>
            <img src={selectedImage} alt="Expanded view" className="signalImageModalImage" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Signal;