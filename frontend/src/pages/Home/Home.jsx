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
  return (
    <div className={`home home--${selectedDevice}`}>
        <LeftSidebar senderName={senderName} setSenderName={setSenderName} messages={messages} setMessages={setMessages} receiverNames={receiverNames} setReceiverNames={setReceiverNames} receiverImages={receiverImages} setReceiverImages={setReceiverImages} />
        <RightSidebar senderName={senderName} receiverNames={receiverNames} receiverImages={receiverImages} messages={messages} selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
    </div>
  )
}

export default Home