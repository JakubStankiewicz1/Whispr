import React, { useState, useEffect } from 'react';
import './home.css';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar.jsx';
import RightSidebar from '../../components/RightSidebar/RightSidebar.jsx';

const Home = () => {
  const [senderName, setSenderName] = useState('You');
  const [receiverNames, setReceiverNames] = useState(['Frinted']);
  const [receiverImages, setReceiverImages] = useState(['']);
  const [receiverStatuses, setReceiverStatuses] = useState(['Active now']);
  const [messages, setMessages] = useState([
          {
        id: Date.now() + Math.random(),
        text: "Hello, how are you?",
        type: 'sender',
        sender: 'You',
        images: [],
        date: new Date(),
        dateDisplaySettings: {
          showDate: true,
          showTime: false,
          showYear: true,
          format: 'custom'
        }
      },
          {
        id: Date.now() + Math.random() + 1,
        text: "I'm glad, thank you!",
        type: 'receiver',
        sender: 'Friend',
        images: [],
        date: new Date(),
        dateDisplaySettings: {
          showDate: true,
          showTime: false,
          showYear: true,
          format: 'custom'
        }
      }
  ]);
  const [selectedDevice, setSelectedDevice] = useState('desktop');
  
  // New state for group chat functionality
  const [chatType, setChatType] = useState('single'); // 'single' or 'group'
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState('');

  // Settings state
  const [darkMode, setDarkMode] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [forceDateDisplay, setForceDateDisplay] = useState(false);
  const [globalDateSettings, setGlobalDateSettings] = useState({
    showDate: true,
    showTime: false,
    showYear: true,
    format: 'custom'
  });

  // Aktualizuj początkową wiadomość gdy zmienią się globalne ustawienia
  useEffect(() => {
    setMessages(prev => prev.map((msg, idx) => 
      idx === 0 ? { ...msg, dateDisplaySettings: globalDateSettings } : msg
    ));
  }, [globalDateSettings]);

  // Funkcja do resetowania wszystkich ustawień do domyślnych
  const handleResetToDefaults = () => {
    setSenderName('You');
    setReceiverNames(['Friend']);
    setReceiverImages(['']);
    setReceiverStatuses(['Active now']);
    setMessages([
      {
        id: Date.now() + Math.random(),
        text: "Hello, how are you?",
        type: 'sender',
        sender: 'You',
        images: [],
        date: new Date(),
        dateDisplaySettings: {
          showDate: true,
          showTime: false,
          showYear: true,
          format: 'custom'
        }
      },
      {
        id: Date.now() + Math.random() + 1,
        text: "I'm glad, thank you!",
        type: 'receiver',
        sender: 'Friend',
        images: [],
        date: new Date(),
        dateDisplaySettings: {
          showDate: true,
          showTime: false,
          showYear: true,
          format: 'custom'
        }
      }
    ]);
    setChatType('single');
    setGroupName('');
    setGroupImage('');
    setDarkMode(false);
    setShowHeader(true);
    setShowFooter(true);
    setForceDateDisplay(false);
    setGlobalDateSettings({
      showDate: true,
      showTime: false,
      showYear: true,
      format: 'custom'
    });
  };

  return (
    <div className={`home home--${selectedDevice}`}>
        <LeftSidebar 
          senderName={senderName} 
          setSenderName={setSenderName} 
          messages={messages} 
          setMessages={setMessages} 
          receiverNames={receiverNames} 
          setReceiverNames={setReceiverNames} 
          receiverImages={receiverImages} 
          setReceiverImages={setReceiverImages}
          receiverStatuses={receiverStatuses}
          setReceiverStatuses={setReceiverStatuses}
          chatType={chatType}
          setChatType={setChatType}
          groupName={groupName}
          setGroupName={setGroupName}
          groupImage={groupImage}
          setGroupImage={setGroupImage}
          forceDateDisplay={forceDateDisplay}
          setForceDateDisplay={setForceDateDisplay}
          globalDateSettings={globalDateSettings}
          setGlobalDateSettings={setGlobalDateSettings}
        />
        <RightSidebar 
          senderName={senderName} 
          receiverNames={receiverNames} 
          receiverImages={receiverImages} 
          receiverStatuses={receiverStatuses}
          messages={messages} 
          selectedDevice={selectedDevice} 
          setSelectedDevice={setSelectedDevice}
          chatType={chatType}
          groupName={groupName}
          groupImage={groupImage}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          showHeader={showHeader}
          setShowHeader={setShowHeader}
          showFooter={showFooter}
          setShowFooter={setShowFooter}
          forceDateDisplay={forceDateDisplay}
          globalDateSettings={globalDateSettings}
          onReset={handleResetToDefaults}
        />
    </div>
  )
}

export default Home