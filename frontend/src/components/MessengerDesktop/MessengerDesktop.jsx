import React, { useState } from 'react';
import './messengerDesktop.css';
import { FiPlus, FiImage, FiSmile } from 'react-icons/fi';
import { IoSend } from 'react-icons/io5';

const MessengerDesktop = ({ senderName, messages }) => {
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

  return (
    <div className='messengerDesktop'>
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
              {messages && messages.length > 0 && messages.map((msg, idx) => (
                <div key={msg.id} className="messengerDesktopMessage">
                  <div className="messengerDesktopMessageBubble">
                    <span className="messengerDesktopMessageText">
                      {msg.text || 'test'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div className="messengerDesktopInput">
          <div className="messengerDesktopInputContainer">
            <div className="messengerDesktopInputLeft">
              <button className="messengerDesktopInputButton">
                <FiPlus className="messengerDesktopInputIcon" />
              </button>
              <button className="messengerDesktopInputButton">
                <FiImage className="messengerDesktopInputIcon" />
              </button>
              <button className="messengerDesktopInputButton">
                <FiSmile className="messengerDesktopInputIcon" />
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