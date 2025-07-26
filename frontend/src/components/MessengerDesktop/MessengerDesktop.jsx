import React from 'react';
import './messengerDesktop.css';



const MessengerDesktop = ({ senderName, messages }) => {
  return (
    <div className='messengerDesktop'>
        <div className="messengerDesktopContainer">
            {/* Top Part */}
            <div className="messengerDesktopContainerTop">
                <div className="messengerDesktopContainerTopContainer">
                    <div className="messengerDesktopContainerTopContainerDiv">
                        {/* Left Part */}
                        <div className="messengerDesktopContainerTopContainerDivLeft">
                            <div className="messengerDesktopContainerTopContainerDivLeftContainer">
                                <p className="messengerDesktopContainerTopContainerDivLeftContainerText">
                                    t
                                </p>
                            </div>
                        </div>

                        {/* Right Part */}
                        <div className="messengerDesktopContainerTopContainerDivRight">
                            <div className="messengerDesktopContainerTopContainerDivRightContainer">
                                <div className="messengerDesktopContainerTopContainerDivRightContainerOne">
                                    <div className="messengerDesktopContainerTopContainerDivRightContainerOneContainer">
                                        <p className="messengerDesktopContainerTopContainerDivRightContainerOneContainerText">
                                            {senderName || 'test'}
                                        </p>
                                    </div>
                                </div>

                                <div className="messengerDesktopContainerTopContainerDivRightContainerTwo">
                                    <div className="messengerDesktopContainerTopContainerDivRightContainerTwoContainer">
                                        <p className="messengerDesktopContainerTopContainerDivRightContainerTwoContainerText">
                                            Active now
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Part */}
            <div className="messengerDesktopContainerMiddle">
                <div className="messengerDesktopContainerMiddleContainer">
                  {messages && messages.length > 0 && messages.map((msg, idx) => (
                    <div key={msg.id} className="messengerDesktopMessageText">
                      {msg.text}
                    </div>
                  ))}
                </div>
            </div>

            {/* Bottom Part */}
            <div className="messengerDesktopContainerBottom"></div>
        </div>
    </div>
  )
}

export default MessengerDesktop