import React from 'react';
import './rightSidebar.css';
import MessengerDesktop from '../MessengerDesktop/MessengerDesktop';

const RightSidebar = ({ senderName, messages }) => {
  return (
    <div className='rightSidebar'>
        <div className="rightSidebarContainer">
            <MessengerDesktop senderName={senderName} messages={messages} />
        </div>
    </div>
  )
}

export default RightSidebar