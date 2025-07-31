import React, { useState } from 'react';
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
    sender: ''
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
        />
    </div>
  )
}

export default Home