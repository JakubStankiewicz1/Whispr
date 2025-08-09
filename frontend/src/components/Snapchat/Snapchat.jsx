import React, { useState } from 'react';
import './snapchat.css';
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
import { FaSnapchat } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

const Snapchat = ({ 
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
    return 'Friend';
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
    <div className={`snapchat ${darkMode ? 'snapchat--dark' : ''} snapchat--${selectedDevice}`}>
      <div className="snapchatContainer">
        {showHeader && (
          <div className="snapchatHeader">
            <div className="snapchatHeaderContainer">
              <div className="snapchatHeaderLeft">
                {chatType === 'group' ? (
                  <>
                    {groupImage ? (
                      <img src={groupImage} alt="Group" className="snapchatHeaderAvatar snapchatGroupAvatar" />
                    ) : (
                      <div className="snapchatHeaderAvatar snapchatGroupAvatar snapchatDefaultAvatar">
                        <FiUser size={20} />
                      </div>
                    )}
                    <div className="snapchatHeaderInfo">
                      <h3 className="snapchatHeaderName">{groupName || 'Group Chat'}</h3>
                      <p className="snapchatHeaderStatus">
                        {receiverNames.filter(name => name.trim()).length} friends
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {getFirstReceiverImage() ? (
                      <img src={getFirstReceiverImage()} alt={getFirstReceiverName()} className="snapchatHeaderAvatar" />
                    ) : (
                      <div className="snapchatHeaderAvatar snapchatDefaultAvatar">
                        <FiUser size={20} />
                      </div>
                    )}
                    <div className="snapchatHeaderInfo">
                      <h3 className="snapchatHeaderName">{getFirstReceiverName()}</h3>
                      <p className="snapchatHeaderStatus">{getFirstReceiverStatus()}</p>
                    </div>
                  </>
                )}
              </div>
              <div className="snapchatHeaderRight">
                <button className="snapchatHeaderButton">
                  <FiPhone size={18} />
                </button>
                <button className="snapchatHeaderButton">
                  <FiVideo size={18} />
                </button>
                <button className="snapchatHeaderButton">
                  <BsThreeDots size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="snapchatMessages">
          <div className="snapchatMessagesContainer">
            {messages && messages.length > 0 ? (
              messages.map((message, index) => (
                <div key={message.id || index}>
                  {shouldShowDate(message, index) && (
                    <div className="snapchatDateSeparator">
                      <span className="snapchatDateText">
                        {formatDate(message.date, message.dateDisplaySettings || {})}
                      </span>
                    </div>
                  )}
                  <div className={`snapchatMessage ${isMessageFromSender(message) ? 'snapchatMessage--sender' : 'snapchatMessage--receiver'}`}>
                    {!isMessageFromSender(message) && chatType === 'group' && (
                      <div className="snapchatMessageSenderName">
                        {message.sender || getFirstReceiverName()}
                      </div>
                    )}
                    {message.images && message.images.length > 0 && (
                      <div className="snapchatMessageImages">
                        {message.images.map((img, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={img}
                            alt="Snap"
                            className="snapchatMessageImage"
                            onClick={() => handleImageClick(img)}
                          />
                        ))}
                      </div>
                    )}
                    {message.text && (
                      <div className="snapchatMessageBubble">
                        <p className="snapchatMessageText">{message.text}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="snapchatEmptyState">
                <FaSnapchat size={48} className="snapchatEmptyIcon" />
                <p>Say hello to your friend!</p>
              </div>
            )}
          </div>
        </div>

        {showFooter && (
          <div className="snapchatInput">
            <div className="snapchatInputContainer">
              <div className="snapchatInputBox">
                <button className="snapchatInputButton snapchatInputAttach">
                  <FiImage size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Chat"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="snapchatInputField"
                />
                <button className="snapchatInputButton snapchatInputEmoji">
                  <FiSmile size={20} />
                </button>
                <button 
                  className="snapchatInputSend"
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
        <div className="snapchatImageModal" onClick={closeImageModal}>
          <div className="snapchatImageModalContent" onClick={e => e.stopPropagation()}>
            <button className="snapchatImageModalClose" onClick={closeImageModal}>
              <IoCloseOutline size={24} />
            </button>
            <img src={selectedImage} alt="Expanded snap" className="snapchatImageModalImage" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Snapchat;