import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import './message.css';
import { FiUser } from "react-icons/fi";
import { GoArrowSwitch } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";

import { useEffect } from 'react';
const Message = ({ senderName, receiverNames, defaultType = 'sender', _senderNameVersion, value, onChange }) => {
  const [text, setText] = useState(value || "");
  const [focused, setFocused] = useState(false);
  const [type, setType] = useState(defaultType); // 'sender' or 'receiver'
  const [receiverIdx, setReceiverIdx] = useState(0);
  useEffect(() => { setText(value || ""); }, [value, _senderNameVersion]);
  const isActive = focused || text;
  const displayName = type === 'sender' ? senderName : (receiverNames && receiverNames[receiverIdx]) || '';
  const displayRole = type === 'sender' ? 'Sender' : 'Receiver';
  const handleSwitch = () => {
    if (type === 'sender') {
      // Przechodzimy do pierwszego receivera
      setType('receiver');
      setReceiverIdx(0);
    } else {
      // Jesteśmy na receiverze, sprawdzamy czy to ostatni receiver
      if (receiverNames && receiverNames.length > 1) {
        if (receiverIdx < receiverNames.length - 1) {
          // Przechodzimy do następnego receivera
          setReceiverIdx(receiverIdx + 1);
        } else {
          // To ostatni receiver, wracamy do sendera
          setType('sender');
          setReceiverIdx(0);
        }
      } else {
        // Tylko jeden receiver, wracamy do sendera
        setType('sender');
        setReceiverIdx(0);
      }
    }
  };
  return (
    <div className='message'>
        <div className="messageContainer">
            <div className="messageContainerDiv">
                {/* Left Part */}
                <div className="messageContainerDivLeft">
                    <div className="messageContainerDivLeftContainer">
                        <div className="messageContainerDivLeftContainerUser">
                            <FiUser className='messageContainerDivLeftContainerUserIcon' />
                        </div>

                        <div className="messageContainerDivLeftContainerSwitch">
                            <div className="messageContainerDivLeftContainerSwitchContainer" onClick={handleSwitch} style={{cursor:'pointer'}}>
                                <GoArrowSwitch className='messageContainerDivLeftContainerSwitchContainerIcon' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Part */}
                <div className={`messageContainerDivRight${isActive ? ' active' : ''}`}>
                    <div className="messageContainerDivRightContainer">
                        {/* Top Part */}
                        <div className="messageContainerDivRightContainerTop">
                            <div className="messageContainerDivRightContainerTopContainer">
                                {/* Left Part */}
                                <div className="messageContainerDivRightContainerTopContainerLeft">
                                    <div className="messageContainerDivRightContainerTopContainerLeftContainer">
                                        <div className="messageContainerDivRightContainerTopContainerLeftContainerOne">
                                            <div className="messageContainerDivRightContainerTopContainerLeftContainerOneContainer">
                                                <p className="messageContainerDivRightContainerTopContainerLeftContainerOneContainerText">
                                                    {displayName || displayRole}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="messageContainerDivRightContainerTopContainerLeftContainerTwo">
                                            <div className="messageContainerDivRightContainerTopContainerLeftContainerTwoContainer">
                                                date
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Part */}
                                <div className="messageContainerDivRightContainerTopContainerRight">
                                    <div className="messageContainerDivRightContainerTopContainerRightContainer">
                                        <IoCloseOutline className='messageContainerDivRightContainerTopContainerRightContainerIcon' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Part */}
                        <div className="messageContainerDivRightContainerBottom">
                            <div className="messageContainerDivRightContainerBottomContainer">
                                <TextareaAutosize
                                  className='messageContainerDivRightContainerBottomContainerTextarea'
                                  value={text}
                                  onChange={e => {
                                    setText(e.target.value);
                                    if (onChange) onChange(e.target.value);
                                  }}
                                  onFocus={() => setFocused(true)}
                                  onBlur={() => setFocused(false)}
                                  placeholder="Type your message..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Message