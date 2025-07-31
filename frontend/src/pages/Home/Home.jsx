import React, { useState, useEffect } from 'react';
import './home.css';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar.jsx';
import RightSidebar from '../../components/RightSidebar/RightSidebar.jsx';

const Home = () => {
  const [senderName, setSenderName] = useState('');
  const [receiverNames, setReceiverNames] = useState(['']);
  const [receiverImages, setReceiverImages] = useState(['']);
  const [messages, setMessages] = useState([{
    id: Date.now() + Math.random(),
    text: '',
    type: 'sender',
    sender: '',
    images: [],
    date: new Date(),
    dateDisplaySettings: { // Domyślne ustawienia (będą zastąpione przez globalDateSettings)
      showDate: true,
      showTime: true,
      showYear: true,
      format: 'short'
    }
  }]);
  const [selectedDevice, setSelectedDevice] = useState('desktop');
  
  // New state for group chat functionality
  const [chatType, setChatType] = useState('single'); // 'single' or 'group'
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState('');

  // Settings state
  const [darkMode, setDarkMode] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [forceDateDisplay, setForceDateDisplay] = useState(false); // Nowa opcja wymuszenia daty
  const [globalDateSettings, setGlobalDateSettings] = useState({ // Globalne ustawienia formatowania dat
    showDate: true,
    showTime: true,
    showYear: true,
    format: 'short'
  });

  // Aktualizuj początkową wiadomość gdy zmienią się globalne ustawienia
  useEffect(() => {
    setMessages(prev => prev.map((msg, idx) => 
      idx === 0 ? { ...msg, dateDisplaySettings: globalDateSettings } : msg
    ));
  }, [globalDateSettings]);

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
        />
    </div>
  )
}

export default Home