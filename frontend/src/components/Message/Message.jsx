import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import './message.css';
import { FiUser } from "react-icons/fi";
import { GoArrowSwitch } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";

const Message = () => {
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
                            <div className="messageContainerDivLeftContainerSwitchContainer">
                                <GoArrowSwitch className='messageContainerDivLeftContainerSwitchContainerIcon' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Part */}
                <div className="messageContainerDivRight">
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
                                                    test
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
                                  minRows={1}
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