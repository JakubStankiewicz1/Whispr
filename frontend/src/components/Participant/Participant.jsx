import React from 'react';
import './participant.css';
import { FiUser } from "react-icons/fi";


const Participant = ({ senderName, setSenderName }) => {
  return (
    <div className='participant'>
        <div className="participantContainer">
            {/* Left Part */}
            <div className="participantContainerLeft">
                <div className="participantContainerLeftContainer">
                    <div className="participantContainerLeftContainerDiv">
                        <FiUser className='participantContainerLeftContainerDivIcon' />
                    </div>
                </div>
            </div>

            {/* Right Part */}
            <div className="participantContainerRight">
                <div className="participantContainerRightContainer">
                    <input
                      type="text"
                      placeholder='Sender name'
                      className='participantContainerRightContainerInput'
                      value={senderName}
                      onChange={e => setSenderName(e.target.value)}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Participant