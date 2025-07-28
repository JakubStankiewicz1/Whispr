import React, { useState } from 'react';
import './home.css';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar.jsx';
import RightSidebar from '../../components/RightSidebar/RightSidebar.jsx';

const Home = () => {
  const [senderName, setSenderName] = useState('');
  const [messages, setMessages] = useState([{ id: Date.now() + Math.random(), text: '' }]);
  return (
    <div className='home'>
        <LeftSidebar senderName={senderName} setSenderName={setSenderName} messages={messages} setMessages={setMessages} />
        <RightSidebar senderName={senderName} messages={messages} />
    </div>
  )
}

export default Home