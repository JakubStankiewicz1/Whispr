import React, { useState } from 'react';
import './messengerDesktop.css';
import { FiPlus, FiImage, FiSmile } from 'react-icons/fi';
import { IoSend } from 'react-icons/io5';
import { TbFileSmile } from "react-icons/tb";
import { GoPlusCircle } from "react-icons/go";
import { FiPlusCircle } from "react-icons/fi";

const MessengerDesktop = ({ senderName, messages, selectedDevice = 'desktop' }) => {
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

  return (
    <div className={`messengerDesktop messengerDesktop--${selectedDevice}`}>
      <div className="messengerDesktopContainer">
        {/* Header */}
        <div className="messengerDesktopHeader">
          <div className="messengerDesktopHeaderContainer">
            <div className="messengerDesktopHeaderLeft">
              <div className="messengerDesktopHeaderAvatar">
                <span className="messengerDesktopHeaderAvatarText">t</span>
              </div>
              <div className="messengerDesktopHeaderInfo">
                <h3 className="messengerDesktopHeaderName">
                  {senderName || 'testsf'}
                </h3>
                <p className="messengerDesktopHeaderStatus">Active now</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Area */}
        <div className="messengerDesktopMessages">
          <div className="messengerDesktopMessagesContainer">
            {/* Date Separator */}
            <div className="messengerDesktopDateSeparator">
              <span className="messengerDesktopDateText">Jul 28, 2025</span>
            </div>

            {/* Messages */}
            <div className="messengerDesktopMessagesList">
              {messages && messages.length > 0 && messages.map((msg, idx) => {
                const isFromSender = isMessageFromSender(msg);
                return (
                  <div key={msg.id} className={`messengerDesktopMessage ${isFromSender ? 'messengerDesktopMessage--sender' : 'messengerDesktopMessage--receiver'}`}>
                    <div className={`messengerDesktopMessageBubble ${isFromSender ? 'messengerDesktopMessageBubble--sender' : 'messengerDesktopMessageBubble--receiver'}`}>
                      <span className="messengerDesktopMessageText">
                        {msg.text || 'test'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div className="messengerDesktopInput">
          <div className="messengerDesktopInputContainer">
            <div className="messengerDesktopInputLeft">
              <button className="messengerDesktopInputButton">
                <FiPlusCircle   className="messengerDesktopInputIcon" />
              </button>
              <button className="messengerDesktopInputButton">
                <FiImage className="messengerDesktopInputIcon" />
              </button>
              <button className="messengerDesktopInputButton">
                <TbFileSmile  className="messengerDesktopInputIcon" />
              </button>
            </div>
            
            <div className="messengerDesktopInputCenter">
              <textarea
                className="messengerDesktopInputField"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                rows="1"
              />
            </div>
            
            <div className="messengerDesktopInputRight">
              <button 
                className="messengerDesktopSendButton"
                onClick={handleSendMessage}
              >
                <IoSend className="messengerDesktopSendIcon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessengerDesktop