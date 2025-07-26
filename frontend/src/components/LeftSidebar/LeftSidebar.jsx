import React, { useState } from 'react';
import './leftSidebar.css';
import { IoIosArrowUp } from "react-icons/io";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { LuUsers } from "react-icons/lu";
import { LuMessagesSquare } from "react-icons/lu";

import Participant from '../Participant/Participant';
import { FiPlus, FiX } from "react-icons/fi";
import ParticipantReceiver from '../ParticipantReceiver/ParticipantReceiver';
import Message from '../Message/Message';
import { LuDot } from "react-icons/lu";


const LeftSidebar = () => {
  // Accordion state (multi-open)
  const [openSections, setOpenSections] = useState({
    participants: false,
    messages: false,
    instructions: false
  });

  // Receivers state
  const [receivers, setReceivers] = useState([0]);
  const handleRemoveReceiver = (id) => {
    if (receivers.length > 1) {
      setReceivers((prev) => prev.filter((r) => r !== id));
    }
  };

  const handleAccordion = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleAddReceiver = () => {
    setReceivers((prev) => [...prev, Date.now() + Math.random()]);
  };

  return (
    <div className='leftSidebar'>
      <div className="leftSidebarContainer">
        {/* Top Part */}
        <div className="leftSidebarContainerTop">
          <div className="leftSidebarContainerTopContainer">
            {/* Left Part */}
            <div className="leftSidebarContainerTopContainerLeft">
              <div className="leftSidebarContainerTopContainerLeftContainer">
                <p className="leftSidebarContainerTopContainerLeftContainerText">
                  Whispr
                </p>
              </div>
            </div>

            {/* Right Part */}
            <div className="leftSidebarContainerTopContainerRight">
              <div className="leftSidebarContainerTopContainerRightContainer">
                <div className="leftSidebarContainerTopContainerRightContainerOne">
                  <div className="leftSidebarContainerTopContainerRightContainerOneContainer">

                    <div className="leftSidebarContainerTopContainerRightContainerOneContainerButton">
                      <div className="leftSidebarContainerTopContainerRightContainerOneContainerButtonOne">
                        <div className="leftSidebarContainerTopContainerRightContainerOneContainerButtonOneIcon">
                          ✨
                        </div>
                      </div>

                      <div className="leftSidebarContainerTopContainerRightContainerOneContainerButtonTwo">
                        <p className="leftSidebarContainerTopContainerRightContainerOneContainerButtonTwoText">
                          Go Premium
                        </p>
                      </div>
                    </div>

                    <div className="leftSidebarContainerTopContainerRightContainerOneContainerOne">
                      <div className="leftSidebarContainerTopContainerRightContainerOneContainerOneContainer">
                        <div className="leftSidebarContainerTopContainerRightContainerOneContainerOneContainerDiv">
                          <p className="leftSidebarContainerTopContainerRightContainerOneContainerOneContainerDivText">
                            Sign in
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="leftSidebarContainerTopContainerRightContainerOneContainerTwo">
                      <div className="leftSidebarContainerTopContainerRightContainerOneContainerTwoContainer">
                        <AiOutlineInfoCircle className='leftSidebarContainerTopContainerRightContainerOneContainerTwoContainerInfo' />
                      </div>
                    </div>


                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>


        <div className="leftSidebarContainerTopContainerRightContainerDivider">
          <div className="leftSidebarContainerTopContainerRightContainerDividerLine" />
        </div>

        {/* Bottom Part */}
        <div className="leftSidebarContainerBottom">

                











                {/* Participants Accordion */}
                <div className="leftSidebarContainerTopContainerRightContainerTwo">
                  <div className="leftSidebarContainerTopContainerRightContainerTwoContainer">
                    <div className="leftSidebarContainerTopContainerRightContainerTwoContainerOne" onClick={() => handleAccordion('participants')} style={{cursor:'pointer'}}>
                      <div className="leftSidebarContainerTopContainerRightContainerTwoContainerOneContainer">
                        {/* Left Part */}
                        <div className="leftSidebarContainerTopContainerRightContainerTwoContainerOneLeft">
                          <div className="leftSidebarContainerTopContainerRightContainerTwoContainerOneLeftContainer">
                            <div className="leftSidebarContainerTopContainerRightContainerTwoContainerOneLeftContainerOne">
                              <div className="leftSidebarContainerTopContainerRightContainerTwoContainerOneLeftContainerOneContainer">
                                <LuUsers className='leftSidebarContainerTopContainerRightContainerTwoContainerOneLeftContainerOneContainerIcon' />
                              </div>
                            </div>
                            <div className="leftSidebarContainerTopContainerRightContainerTwoContainerOneLeftContainerTwo">
                              <div className="leftSidebarContainerTopContainerRightContainerTwoContainerOneLeftContainerTwoContainer">
                                <p className="leftSidebarContainerTopContainerRightContainerTwoContainerOneLeftContainerTwoContainerText">
                                  Participants
                                </p>
                              </div>
                            </div>
                            <div className="leftSidebarContainerTopContainerRightContainerTwoContainerOneLeftContainerThree">
                              <div className="leftSidebarContainerTopContainerRightContainerTwoContainerOneLeftContainerThreeContainer">
                                <div className="leftSidebarContainerTopContainerRightContainerTwoContainerOneLeftContainerThreeContainerDiv">
                                  <p className="leftSidebarContainerTopContainerRightContainerTwoContainerOneLeftContainerThreeContainerDivText">
                                    2
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Right Part */}
                        <div className="leftSidebarContainerTopContainerRightContainerTwoContainerOneContainerRight">
                          <div className="leftSidebarContainerTopContainerRightContainerTwoContainerOneContainerContainer">
                            <IoIosArrowUp className='leftSidebarContainerTopContainerRightContainerTwoContainerOneContainerContainerIcon' style={{transition:'transform 0.2s', transform: openSections.participants ? 'rotate(0deg)' : 'rotate(180deg)'}} />
                          </div>
                        </div>
                      </div>
                    </div>
                    {openSections.participants && (
                      <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwo">
                        <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainer">
                          {/* Top Part */}
                          <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerTop">
                            <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerTopContainer">
                              <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerTopContainerOne">
                                <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerTopContainerOneContainer">
                                  <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerTopContainerOneContainerOne">
                                    <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerTopContainerOneContainerOneContainer">
                                      <p className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerTopContainerOneContainerOneContainerText">
                                        Sender
                                      </p>
                                    </div>
                                  </div>

                                  <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerTopContainerOneContainerTwo">
                                    <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerTopContainerOneContainerTwoContainer">
                                      <AiOutlineInfoCircle className='leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerTopContainerOneContainerTwoContainerIcon' />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerTopContainerTwo">
                                <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerTopContainerTwoContainer">
                                  <Participant />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Bottom Part */}
                          <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottom">
                            <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainer">
                              <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDiv">
                                {/* Top Part */}
                                <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivTop">
                                  <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivTopContainer">
                                    <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivTopContainerOne">
                                      <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivTopContainerOneContainer">
                                        <p className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivTopContainerOneContainerText">
                                          Receiver
                                        </p>
                                      </div>
                                    </div>

                                    <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivTopContainerTwo">
                                      <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivTopContainerTwoContainer">
                                        <AiOutlineInfoCircle className='leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivTopContainerTwoContainerIcon' />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Middle Part */}
                                <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivMiddle">
                                  <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivMiddleContainer">
                                    {receivers.map((id, idx) => (
                                      <div key={id} style={{marginBottom: '10px', position: 'relative'}}>
                                        <ParticipantReceiver />
                                        {receivers.length > 1 && (
                                          <button
                                            onClick={() => handleRemoveReceiver(id)}
                                            style={{
                                              position: 'absolute',
                                              top: '50%',
                                              right: '18px',
                                              transform: 'translateY(-50%)',
                                              background: 'none',
                                              border: 'none',
                                              cursor: 'pointer',
                                              padding: 0,
                                              color: '#F43F5E',
                                              fontSize: 20,
                                              zIndex: 2,
                                              display: 'flex',
                                              alignItems: 'center',
                                              transition: 'color 0.15s'
                                            }}
                                            title="Remove receiver"
                                            onMouseOver={e => e.currentTarget.style.color = '#dc2626'}
                                            onMouseOut={e => e.currentTarget.style.color = '#F43F5E'}
                                          >
                                            <FiX />
                                          </button>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Bottom Part */}
                                <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivBottom">
                                  <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivBottomContainer">
                                    <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivBottomContainerDiv">
                                      <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivBottomContainerDivButton" onClick={handleAddReceiver} style={{cursor:'pointer'}}>
                                        <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivBottomContainerDivButtonContainer">
                                          <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivBottomContainerDivButtonContainerOne">
                                            <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivBottomContainerDivButtonContainerOneContainer">
                                              <FiPlus className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivBottomContainerDivButtonContainerOneContainerIcon" />
                                            </div>
                                          </div>

                                          <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivBottomContainerDivButtonContainerTwo">
                                            <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivBottomContainerDivButtonContainerTwoContainer">
                                              <p className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivBottomContainerDivButtonContainerTwoContainerText">
                                                Add Receiver
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>













                <div className="leftSidebarContainerTopContainerRightContainerDividerTwo">
                  <div className="leftSidebarContainerTopContainerRightContainerDividerTwoLine" />
                </div>





                {/* Messages Accordion */}
                <div className="leftSidebarContainerTopContainerRightContainerThree">
                  <div className="leftSidebarContainerTopContainerRightContainerThreeContainer">
                    <div className="leftSidebarContainerTopContainerRightContainerThreeContainerOne" onClick={() => handleAccordion('messages')} style={{cursor:'pointer'}}>
                      <div className="leftSidebarContainerTopContainerRightContainerThreeContainerOneContainer">
                        {/* Left Part */}
                        <div className="leftSidebarContainerTopContainerRightContainerThreeContainerOneContainerLeft">
                          <div className="leftSidebarContainerTopContainerRightContainerThreeContainerOneContainerLeftContainer">
                            <div className="leftSidebarContainerTopContainerRightContainerThreeContainerOneContainerLeftContainerOne">
                              <div className="leftSidebarContainerTopContainerRightContainerThreeContainerOneContainerLeftContainerOneContainer">
                                <LuMessagesSquare className='leftSidebarContainerTopContainerRightContainerThreeContainerOneContainerLeftContainerOneContainerIcon' />
                              </div>
                            </div>
                            <div className="leftSidebarContainerTopContainerRightContainerThreeContainerOneContainerLeftContainerTwo">
                              <div className="leftSidebarContainerTopContainerRightContainerThreeContainerOneContainerLeftContainerTwoContainer">
                                <p className="leftSidebarContainerTopContainerRightContainerThreeContainerOneContainerLeftContainerTwoContainerText">
                                  Messages
                                </p>
                              </div>
                            </div>
                            <div className="leftSidebarContainerTopContainerRightContainerThreeContainerOneContainerLeftContainerThree">
                              <div className="leftSidebarContainerTopContainerRightContainerThreeContainerOneContainerLeftContainerThreeContainer">
                                <div className="leftSidebarContainerTopContainerRightContainerThreeContainerOneContainerLeftContainerThreeContainerDiv">
                                  <p className="leftSidebarContainerTopContainerRightContainerThreeContainerOneContainerLeftContainerThreeContainerDivText">
                                    2
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Right Part */}
                        <div className="leftSidebarContainerTopContainerRightContainerThreeContainerOneContainerRight">
                          <div className="leftSidebarContainerTopContainerRightContainerThreeContainerOneContainerRightContainer">
                            <IoIosArrowUp className='leftSidebarContainerTopContainerRightContainerThreeContainerOneContainerRightContainerIcon' style={{transition:'transform 0.2s', transform: openSections.messages ? 'rotate(0deg)' : 'rotate(180deg)'}} />
                          </div>
                        </div>
                      </div>
                    </div>
                    {openSections.messages && (
                      <div className="leftSidebarContainerTopContainerRightContainerThreeContainerTwo">
                        <Message />
                        
                        {/* Top Part */}
                        <div className="leftSidebarContainerTopContainerRightContainerThreeContainerTwoTop"></div>

                        {/* Bottom Part */}
                        <div className="leftSidebarContainerTopContainerRightContainerThreeContainerTwoBottom">
                          <div className="leftSidebarContainerTopContainerRightContainerThreeContainerTwoBottomContainer">
                            <div className="leftSidebarContainerTopContainerRightContainerThreeContainerTwoBottomContainerButton">
                              <div className="leftSidebarContainerTopContainerRightContainerThreeContainerTwoBottomContainerButtonDiv">
                                {/* Left Part */}
                                <div className="leftSidebarContainerTopContainerRightContainerThreeContainerTwoBottomContainerButtonDivLeft">
                                  <div className="leftSidebarContainerTopContainerRightContainerThreeContainerTwoBottomContainerButtonDivLeftContainer">
                                    <FiPlus className='leftSidebarContainerTopContainerRightContainerThreeContainerTwoBottomContainerButtonDivLeftContainerIcon' />
                                  </div>
                                </div>

                                {/* Right Part */}
                                <div className="leftSidebarContainerTopContainerRightContainerThreeContainerTwoBottomContainerButtonDivRight">
                                  <div className="leftSidebarContainerTopContainerRightContainerThreeContainerTwoBottomContainerButtonDivRightContainer">
                                    <p className="leftSidebarContainerTopContainerRightContainerThreeContainerTwoBottomContainerButtonDivRightContainerText">
                                      Add Message
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>




                <div className="leftSidebarContainerTopContainerRightContainerDividerTwo">
                  <div className="leftSidebarContainerTopContainerRightContainerDividerTwoLine" />
                </div>







                {/* Instructions Accordion */}
                <div className="leftSidebarContainerTopContainerRightContainerFour">
                  <div className="leftSidebarContainerTopContainerRightContainerFourContainer">
                    <div className="leftSidebarContainerTopContainerRightContainerFourContainerOne" onClick={() => handleAccordion('instructions')} style={{cursor:'pointer'}}>
                      <div className="leftSidebarContainerTopContainerRightContainerFourContainerOneContainer">
                        {/* Left Part */}
                        <div className="leftSidebarContainerTopContainerRightContainerFourContainerOneContainerLeft">
                          <div className="leftSidebarContainerTopContainerRightContainerFourContainerOneContainerLeftContainer">
                            <div className="leftSidebarContainerTopContainerRightContainerFourContainerOneContainerLeftContainerOne">
                              <div className="leftSidebarContainerTopContainerRightContainerFourContainerOneContainerLeftContainerOneContainer">
                                <AiOutlineInfoCircle className='leftSidebarContainerTopContainerRightContainerFourContainerOneContainerLeftContainerOneContainerIcon' />
                              </div>
                            </div>
                            <div className="leftSidebarContainerTopContainerRightContainerFourContainerOneContainerLeftContainerTwo">
                              <div className="leftSidebarContainerTopContainerRightContainerFourContainerOneContainerLeftContainerTwoContainer">
                                <p className="leftSidebarContainerTopContainerRightContainerFourContainerOneContainerLeftContainerTwoContainerText">
                                  Instructions
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Right Part */}
                        <div className="leftSidebarContainerTopContainerRightContainerFourContainerOneContainerRight">
                          <div className="leftSidebarContainerTopContainerRightContainerFourContainerOneContainerRightContainer">
                            <IoIosArrowUp className='leftSidebarContainerTopContainerRightContainerFourContainerOneContainerRightContainerIcon' style={{transition:'transform 0.2s', transform: openSections.instructions ? 'rotate(0deg)' : 'rotate(180deg)'}} />
                          </div>
                        </div>
                      </div>
                    </div>
                    {openSections.instructions && (
                      <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwo">
                        <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainer">





                          <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElement">
                            <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainer">
                              {/* Left Part */}
                              <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerLeft">
                                <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerLeftContainer">
                                  <LuDot className='leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerLeftContainerIcon' />
                                </div>
                              </div>


                              {/* Right Part */}
                              <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerRight">
                                <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerRightContainer">
                                  <p className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerRightContainerText">
                                    Click "Add Message" to create a new message
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>




                          <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElement">
                            <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainer">
                              {/* Left Part */}
                              <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerLeft">
                                <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerLeftContainer">
                                  <LuDot className='leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerLeftContainerIcon' />
                                </div>
                              </div>


                              {/* Right Part */}
                              <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerRight">
                                <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerRightContainer">
                                  <p className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerRightContainerText">
                                    Click on any message text to edit it inline
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>







                          <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElement">
                            <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainer">
                              {/* Left Part */}
                              <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerLeft">
                                <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerLeftContainer">
                                  <LuDot className='leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerLeftContainerIcon' />
                                </div>
                              </div>


                              {/* Right Part */}
                              <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerRight">
                                <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerRightContainer">
                                  <p className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerRightContainerText">
                                    Click on avatars to cycle through users
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>








                          <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElement">
                            <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainer">
                              {/* Left Part */}
                              <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerLeft">
                                <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerLeftContainer">
                                  <LuDot className='leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerLeftContainerIcon' />
                                </div>
                              </div>


                              {/* Right Part */}
                              <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerRight">
                                <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerRightContainer">
                                  <p className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerRightContainerText">
                                    Click on timestamps to change them
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>








                          <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElement">
                            <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainer">
                              {/* Left Part */}
                              <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerLeft">
                                <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerLeftContainer">
                                  <LuDot className='leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerLeftContainerIcon' />
                                </div>
                              </div>


                              {/* Right Part */}
                              <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerRight">
                                <div className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerRightContainer">
                                  <p className="leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerRightContainerText">
                                    Changes are saved automatically
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>





                        </div>
                      </div>
                    )}
                  </div>
                </div>


        </div>
      </div>
    </div>
  )
}

export default LeftSidebar