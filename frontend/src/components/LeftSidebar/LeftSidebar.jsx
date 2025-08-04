import React, { useState } from 'react';
import './leftSidebar.css';
import { IoIosArrowUp } from "react-icons/io";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { LuUsers } from "react-icons/lu";
import { LuMessagesSquare } from "react-icons/lu";
import { FiCalendar } from "react-icons/fi";
import { FiX } from "react-icons/fi";

import Participant from '../Participant/Participant';
import { FiPlus } from "react-icons/fi";
import ParticipantReceiver from '../ParticipantReceiver/ParticipantReceiver';
import Message from '../Message/Message';
import Group from '../Group/Group';
import AboutUs from '../AboutUs/AboutUs';


const LeftSidebar = ({ 
  senderName, 
  setSenderName, 
  messages, 
  setMessages, 
  receiverNames, 
  setReceiverNames, 
  receiverImages, 
  setReceiverImages, 
  chatType, 
  setChatType, 
  groupName, 
  setGroupName, 
  groupImage, 
  setGroupImage,
  forceDateDisplay,
  setForceDateDisplay,
  globalDateSettings,
  setGlobalDateSettings
}) => {
  // Accordion state (multi-open)
  const [openSections, setOpenSections] = useState({
    participants: false,
    messages: false,
    instructions: false,
    globalDateSettings: false
  });

  // Pop-up state
  const [showAboutPopup, setShowAboutPopup] = useState(false);

  // Receivers state
  const [receivers, setReceivers] = useState([0]);
  
  // Images state
  const [senderImage, setSenderImage] = useState('');

  // Funkcja do obsługi kliknięcia na ikonę info
  const handleInfoClick = () => {
    setShowAboutPopup(true);
  };

  // Funkcja do zamykania pop-up
  const handleClosePopup = () => {
    setShowAboutPopup(false);
  };

  // Funkcje do obliczania liczby uczestników i wiadomości
  const getParticipantsCount = () => {
    let count = 0;
    
    // Dodaj sendera jeśli ma nazwę
    if (senderName && senderName.trim()) {
      count++;
    }
    
    // Dodaj receiverów którzy mają nazwy
    if (receiverNames) {
      count += receiverNames.filter(name => name && name.trim()).length;
    }
    
    return count;
  };

  const getMessagesCount = () => {
    return messages ? messages.length : 0;
  };

  // Funkcje do określania klas CSS dla numerków
  const getParticipantsCountClass = () => {
    const count = getParticipantsCount();
    if (count === 0) return 'count-empty';
    if (count <= 2) return 'count-low';
    if (count <= 5) return 'count-medium';
    return 'count-high';
  };

  const getMessagesCountClass = () => {
    const count = getMessagesCount();
    if (count === 0) return 'count-empty';
    if (count <= 3) return 'count-low';
    if (count <= 8) return 'count-medium';
    return 'count-high';
  };

  const handleRemoveReceiver = (id) => {
    if (receivers.length > 1) {
      const idx = receivers.findIndex(r => r === id);
      setReceivers((prev) => prev.filter((r) => r !== id));
      setReceiverNames((prev) => prev.filter((_, i) => i !== idx));
      setReceiverImages((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  const handleAddMessage = () => {
    // Określamy jaki typ wiadomości powinien być następny
    let nextType = 'sender';
    let nextReceiverIdx = 0;
    
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      
      if (lastMessage.type === 'sender') {
        // Ostatnia wiadomość była od sendera, następna powinna być od pierwszego receivera
        if (receiverNames.length > 0 && receiverNames[0].trim()) {
          nextType = 'receiver';
          nextReceiverIdx = 0;
        }
      } else if (lastMessage.type === 'receiver') {
        // Ostatnia wiadomość była od receivera, sprawdzamy czy to ostatni receiver
        if (lastMessage.receiverIdx < receiverNames.length - 1) {
          // To nie ostatni receiver, następna wiadomość od następnego receivera
          nextType = 'receiver';
          nextReceiverIdx = lastMessage.receiverIdx + 1;
        } else {
          // To ostatni receiver, następna wiadomość od sendera
          nextType = 'sender';
          nextReceiverIdx = 0;
        }
      }
    }
    
    setMessages(prev => [...prev, { 
      id: Date.now() + Math.random(), 
      text: '',
      type: nextType,
      sender: senderName,
      receiverIdx: nextReceiverIdx,
      images: [], // Dodajemy pole images
      date: new Date(), // Dodajemy aktualną datę
      dateDisplaySettings: globalDateSettings || { // Używamy globalnych ustawień
        showDate: true,
        showTime: true,
        showYear: true,
        format: 'short'
      }
    }]);
  };

  const handleRemoveMessage = (messageId) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };
  const handleAccordion = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleAddReceiver = () => {
    setReceivers((prev) => [...prev, Date.now() + Math.random()]);
    setReceiverNames((prev) => [...prev, '']);
    setReceiverImages((prev) => [...prev, '']);
  };

  return (
    <>
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
                        <AiOutlineInfoCircle 
                          className='leftSidebarContainerTopContainerRightContainerOneContainerTwoContainerInfo' 
                          onClick={handleInfoClick}
                          style={{cursor: 'pointer'}}
                        />
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

                







                <div className="leftSidebarContainerBottomContainer">



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
                              <div className={`leftSidebarContainerTopContainerRightContainerTwoContainerOneLeftContainerThreeContainer ${getParticipantsCountClass()}`} title={`${getParticipantsCount()} participant${getParticipantsCount() !== 1 ? 's' : ''}`}>
                                <div className="leftSidebarContainerTopContainerRightContainerTwoContainerOneLeftContainerThreeContainerDiv">
                                  <p className="leftSidebarContainerTopContainerRightContainerTwoContainerOneLeftContainerThreeContainerDivText">
                                    {getParticipantsCount()}
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
                                  <Participant 
                                    senderName={senderName || ''} 
                                    setSenderName={setSenderName} 
                                    senderImage={senderImage || ''}
                                    setSenderImage={setSenderImage}
                                  />
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
                                    <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerTopContainerOne">
                                      <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerTopContainerOneContainer">
                                        <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerTopContainerOneContainerOne">
                                          <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerTopContainerOneContainerOneContainer">
                                            <p className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerTopContainerOneContainerOneContainerText">
                                              Receiver
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

                                    <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivTopContainerTwo">
                                      <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivTopContainerTwoContainer">
                                        <div className="chatTypeToggle">
                                          <button 
                                            className={`toggleButton ${chatType === 'single' ? 'active' : ''}`}
                                            onClick={() => setChatType('single')}
                                          >
                                            Single
                                          </button>
                                          <button 
                                            className={`toggleButton ${chatType === 'group' ? 'active' : ''}`}
                                            onClick={() => setChatType('group')}
                                          >
                                            Group
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Group Section - only show when chatType === 'group' */}
                                {chatType === 'group' && (
                                  <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivGroup">
                                    <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivGroupContainer">
                                      <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivGroupContainerTop">
                                        <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivGroupContainerTopContainer">
                                          <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivGroupContainerTopContainerOne">
                                            <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivGroupContainerTopContainerOneContainer">
                                              <p className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivGroupContainerTopContainerOneContainerText">
                                                Group
                                              </p>
                                            </div>
                                          </div>

                                          <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivGroupContainerTopContainerTwo">
                                            <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivGroupContainerTopContainerTwoContainer">
                                              <AiOutlineInfoCircle className='leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivGroupContainerTopContainerTwoContainerIcon' />
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivGroupContainerBottom">
                                        <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivGroupContainerBottomContainer">
                                          <Group
                                            groupName={groupName || ''}
                                            setGroupName={setGroupName}
                                            groupImage={groupImage || ''}
                                            setGroupImage={setGroupImage}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Middle Part */}
                                <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivMiddle">
                                  <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivMiddleContainer">
                                    {receivers.map((id, idx) => (
                                      <div key={id} style={{marginBottom: '10px', position: 'relative'}}>
                                        <ParticipantReceiver
                                          value={receiverNames[idx] || ''}
                                          onChange={e => {
                                            const val = e.target.value;
                                            setReceiverNames(prev => prev.map((n, i) => i === idx ? val : n));
                                          }}
                                          isCompact={receivers.length > 1}
                                          receiverImage={receiverImages[idx] || ''}
                                          setReceiverImage={(image) => {
                                            setReceiverImages(prev => prev.map((img, i) => i === idx ? image : img));
                                          }}
                                        />
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
                                {chatType === 'group' && (
                                  <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivBottom">
                                    <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivBottomContainer">
                                      <div className="leftSidebarContainerTopContainerRightContainerTwoContainerTwoContainerBottomContainerDivBottomContainerDiv">
                                        <button className="leftSidebarAddButton" onClick={handleAddReceiver}>
                                          <span className="leftSidebarAddButtonIcon"><FiPlus /></span>
                                          <span className="leftSidebarAddButtonText">Add Receiver</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
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














                

                {/* Global Date Settings Accordion */}
                <div className="leftSidebarContainerTopContainerRightContainerFive">
                  <div className="leftSidebarContainerTopContainerRightContainerFiveContainer">
                    <div className="leftSidebarContainerTopContainerRightContainerFiveContainerOne" onClick={() => handleAccordion('globalDateSettings')} style={{cursor:'pointer'}}>
                      <div className="leftSidebarContainerTopContainerRightContainerFiveContainerOneContainer">
                        {/* Left Part */}
                        <div className="leftSidebarContainerTopContainerRightContainerFiveContainerOneContainerLeft">
                          <div className="leftSidebarContainerTopContainerRightContainerFiveContainerOneContainerLeftContainer">
                            <div className="leftSidebarContainerTopContainerRightContainerFiveContainerOneContainerLeftContainerOne">
                              <div className="leftSidebarContainerTopContainerRightContainerFiveContainerOneContainerLeftContainerOneContainer">
                                <FiCalendar className='leftSidebarContainerTopContainerRightContainerFiveContainerOneContainerLeftContainerOneContainerIcon' />
                              </div>
                            </div>
                            <div className="leftSidebarContainerTopContainerRightContainerFiveContainerOneContainerLeftContainerTwo">
                              <div className="leftSidebarContainerTopContainerRightContainerFiveContainerOneContainerLeftContainerTwoContainer">
                                <p className="leftSidebarContainerTopContainerRightContainerFiveContainerOneContainerLeftContainerTwoContainerText">
                                  Global Date Settings
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Right Part */}
                        <div className="leftSidebarContainerTopContainerRightContainerFiveContainerOneContainerRight">
                          <div className="leftSidebarContainerTopContainerRightContainerFiveContainerOneContainerRightContainer">
                            <IoIosArrowUp className='leftSidebarContainerTopContainerRightContainerFiveContainerOneContainerRightContainerIcon' style={{transition:'transform 0.2s', transform: openSections.globalDateSettings ? 'rotate(0deg)' : 'rotate(180deg)'}} />
                          </div>
                        </div>
                      </div>
                    </div>
                    {openSections.globalDateSettings && (
                      <div className="leftSidebarContainerTopContainerRightContainerFiveContainerTwo">
                        <div className="leftSidebarContainerTopContainerRightContainerFiveContainerTwoContainer">
                          {/* Show Date Toggle */}
                          <div className="leftSidebarContainerTopContainerRightContainerFiveContainerTwoContainerItem">
                            <label className="leftSidebarContainerTopContainerRightContainerFiveContainerTwoContainerItemLabel">
                              <input
                                type="checkbox"
                                checked={globalDateSettings.showDate}
                                onChange={(e) => setGlobalDateSettings(prev => ({...prev, showDate: e.target.checked}))}
                                className="leftSidebarContainerTopContainerRightContainerFiveContainerTwoContainerItemCheckbox"
                              />
                              <span className="leftSidebarContainerTopContainerRightContainerFiveContainerTwoContainerItemText">Show Date</span>
                            </label>
                          </div>

                          {/* Show Time Toggle */}
                          <div className="leftSidebarContainerTopContainerRightContainerFiveContainerTwoContainerItem">
                            <label className="leftSidebarContainerTopContainerRightContainerFiveContainerTwoContainerItemLabel">
                              <input
                                type="checkbox"
                                checked={globalDateSettings.showTime}
                                onChange={(e) => setGlobalDateSettings(prev => ({...prev, showTime: e.target.checked}))}
                                className="leftSidebarContainerTopContainerRightContainerFiveContainerTwoContainerItemCheckbox"
                              />
                              <span className="leftSidebarContainerTopContainerRightContainerFiveContainerTwoContainerItemText">Show Time</span>
                            </label>
                          </div>

                          {/* Show Year Toggle */}
                          <div className="leftSidebarContainerTopContainerRightContainerFiveContainerTwoContainerItem">
                            <label className="leftSidebarContainerTopContainerRightContainerFiveContainerTwoContainerItemLabel">
                              <input
                                type="checkbox"
                                checked={globalDateSettings.showYear}
                                onChange={(e) => setGlobalDateSettings(prev => ({...prev, showYear: e.target.checked}))}
                                className="leftSidebarContainerTopContainerRightContainerFiveContainerTwoContainerItemCheckbox"
                              />
                              <span className="leftSidebarContainerTopContainerRightContainerFiveContainerTwoContainerItemText">Show Year</span>
                            </label>
                          </div>

                          {/* Format Selection */}
                          <div className="leftSidebarContainerTopContainerRightContainerFiveContainerTwoContainerItem">
                            <label className="leftSidebarContainerTopContainerRightContainerFiveContainerTwoContainerItemLabel">
                              <span className="leftSidebarContainerTopContainerRightContainerFiveContainerTwoContainerItemText">Format:</span>
                              <select
                                value={globalDateSettings.format}
                                onChange={(e) => setGlobalDateSettings(prev => ({...prev, format: e.target.value}))}
                                className="leftSidebarContainerTopContainerRightContainerFiveContainerTwoContainerItemSelect"
                              >
                                <option value="short">Short (31.07)</option>
                                <option value="long">Long (Thursday, July 31, 2025)</option>
                                <option value="custom">Custom (Jul 31)</option>
                              </select>
                            </label>
                          </div>

                          {/* Preview */}
                          <div className="leftSidebarContainerTopContainerRightContainerFiveContainerTwoContainerPreview">
                            <span className="leftSidebarContainerTopContainerRightContainerFiveContainerTwoContainerPreviewLabel">Preview:</span>
                            <span className="leftSidebarContainerTopContainerRightContainerFiveContainerTwoContainerPreviewText">
                              {(() => {
                                const testDate = new Date();
                                const hours = testDate.getHours().toString().padStart(2, '0');
                                const minutes = testDate.getMinutes().toString().padStart(2, '0');
                                const seconds = testDate.getSeconds().toString().padStart(2, '0');
                                const time = `${hours}:${minutes}:${seconds}`;
                                
                                let formattedDate = '';
                                if (globalDateSettings.showDate) {
                                  if (globalDateSettings.format === 'short') {
                                    formattedDate = testDate.toLocaleDateString('en-GB', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      ...(globalDateSettings.showYear && { year: 'numeric' })
                                    }).replace(/\//g, '.');
                                  } else if (globalDateSettings.format === 'long') {
                                    formattedDate = testDate.toLocaleDateString('en-US', {
                                      weekday: 'long',
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    });
                                  } else {
                                    // Custom format - "Aug 7, 2025"
                                    const month = testDate.toLocaleDateString('en-US', { month: 'short' });
                                    const day = testDate.getDate();
                                    const year = globalDateSettings.showYear ? testDate.getFullYear() : '';
                                    
                                    if (globalDateSettings.showYear) {
                                      formattedDate = `${month} ${day}, ${year}`;
                                    } else {
                                      formattedDate = `${month} ${day}`;
                                    }
                                  }
                                }

                                const formattedTime = globalDateSettings.showTime ? time : '';

                                if (formattedDate && formattedTime) {
                                  return `${formattedDate}, ${formattedTime}`;
                                } else if (formattedDate) {
                                  return formattedDate;
                                } else if (formattedTime) {
                                  return formattedTime;
                                }
                                return 'No date/time shown';
                              })()}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>












                <div className="leftSidebarContainerTopContainerRightContainerDividerThree">
                  <div className="leftSidebarContainerTopContainerRightContainerDividerThreeLine" />
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
                              <div className={`leftSidebarContainerTopContainerRightContainerThreeContainerOneContainerLeftContainerThreeContainer ${getMessagesCountClass()}`} title={`${getMessagesCount()} message${getMessagesCount() !== 1 ? 's' : ''}`}>
                                <div className="leftSidebarContainerTopContainerRightContainerThreeContainerOneContainerLeftContainerThreeContainerDiv">
                                  <p className="leftSidebarContainerTopContainerRightContainerThreeContainerOneContainerLeftContainerThreeContainerDivText">
                                    {getMessagesCount()}
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
                        {/* Usunięto pojedynczy Message, renderujemy tylko te z mapy */}
                        {messages.map((msg, idx) => (
                          <Message
                            key={msg.id}
                            senderName={senderName || ''}
                            receiverNames={receiverNames || []}
                            defaultType={msg.type || 'sender'}
                            defaultReceiverIdx={msg.receiverIdx || 0}
                            value={msg.text || ''}
                            onChange={messageData => {
                              setMessages(prev => prev.map((m, i) => i === idx ? { 
                                ...m, 
                                text: messageData.text,
                                type: messageData.type,
                                sender: messageData.sender,
                                receiverIdx: messageData.receiverIdx,
                                images: messageData.images || [],
                                date: messageData.date,
                                dateDisplaySettings: messageData.dateDisplaySettings, // Dodaję ustawienia formatowania
                                forceDateDisplay: messageData.forceDateDisplay
                              } : m));
                              
                              // Jeśli forceDateDisplay się zmieniło, zaktualizuj globalną opcję
                              if (messageData.forceDateDisplay !== undefined) {
                                setForceDateDisplay(messageData.forceDateDisplay);
                              }
                            }}
                            onRemove={() => handleRemoveMessage(msg.id)}
                            senderImage={senderImage || ''}
                            receiverImages={receiverImages || []}
                            forceDateDisplay={forceDateDisplay}
                            globalDateSettings={globalDateSettings}
                          />
                        ))}
                        
                        {/* Top Part */}
                        <div className="leftSidebarContainerTopContainerRightContainerThreeContainerTwoTop"></div>

                        {/* Bottom Part */}
                        <div className="leftSidebarContainerTopContainerRightContainerThreeContainerTwoBottom">
                          <div className="leftSidebarContainerTopContainerRightContainerThreeContainerTwoBottomContainer">
                            <div className="leftSidebarContainerTopContainerRightContainerThreeContainerTwoBottomContainerButton">
                              <div className="leftSidebarContainerTopContainerRightContainerThreeContainerTwoBottomContainerButtonDiv">
                                {/* Left Part */}
                                <button className="leftSidebarAddButton" onClick={handleAddMessage}>
                                  <span className="leftSidebarAddButtonIcon"><FiPlus /></span>
                                  <span className="leftSidebarAddButtonText">Add Message</span>
                                </button>
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
                                  <div className="leftSidebarDot" />
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
                                  {/* <LuDot className='leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerLeftContainerIcon' /> */}
                                  <div className="leftSidebarDot" />
                                  {/* <div className="leftSidebarDot" /> */}
                                  {/* <div className="leftSidebarDot" /> */}
                                  {/* <div className="leftSidebarDot" /> */}
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
                                  {/* <LuDot className='leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerLeftContainerIcon' /> */}
                                  <div className="leftSidebarDot" />
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
                                  {/* <LuDot className='leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerLeftContainerIcon' /> */}
                                  <div className="leftSidebarDot" />
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
                                  {/* <LuDot className='leftSidebarContainerTopContainerRightContainerFourContainerTwoContainerElementContainerLeftContainerIcon' /> */}
                                  <div className="leftSidebarDot" />
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

      {/* Line */}
      <div className="leftSidebarDivier">
        <div className="leftSidebarDivierContainer">
          <div className="leftSidebarDivierContainerLine" />
        </div>
      </div>

      {/* Settings Panel */}
      {/* Removed settings panel as per edit hint */}
    </div>

    <AboutUs open={showAboutPopup} onClose={handleClosePopup} />
  </>
  )
}

export default LeftSidebar