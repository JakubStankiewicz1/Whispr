import React, { useState } from 'react';
import './messenger.css';
import { FiPlus, FiImage, FiSmile } from 'react-icons/fi';
import { IoSend } from 'react-icons/io5';
import { TbFileSmile } from "react-icons/tb";
import { GoPlusCircle } from "react-icons/go";
import { FiPlusCircle } from "react-icons/fi";
import { FiUser } from "react-icons/fi";

const Messenger = ({ senderName, receiverNames, receiverImages, messages, selectedDevice = 'desktop', chatType = 'single', groupName = '', groupImage = '', darkMode = false, showHeader = true, showFooter = true }) => {
  const [inputMessage, setInputMessage] = useState('');

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
                    {chatType === 'group' ? `${receiverNames.filter(name => name.trim()).length} members` : 'Active now'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Message Area */}
        <div className="messengerMessages">
          <div className="messengerMessagesContainer">
            {/* Date Separator */}
            <div className="messengerDateSeparator">
              <span className="messengerDateText">Jul 28, 2025</span>
            </div>

            {/* Messages */}
            <div className="messengerMessagesList">
              {messages && messages.length > 0 && messages.map((msg, idx) => {
                const isFromSender = isMessageFromSender(msg);
                
                // Check if previous message is from the same person
                const prevMessage = idx > 0 ? messages[idx - 1] : null;
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
                  <div key={msg.id} className={`messengerMessage ${isFromSender ? 'messengerMessage--sender' : 'messengerMessage--receiver'}`}>
                    <div className={`messengerMessageBubble ${borderRadiusClass}`}>
                      <span className="messengerMessageText">
                        {String(msg.text || 'test')}
                      </span>
                    </div>
                  </div>
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
    </div>
  )
}

export default Messenger