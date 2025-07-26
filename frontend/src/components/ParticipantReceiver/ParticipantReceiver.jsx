import React from 'react';
import './participantReceiver.css';
import { FiUser } from "react-icons/fi";

const ParticipantReceiver = ({ value, onChange }) => {
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
                        <input type="text" placeholder='Receiver name' className='participantContainerRightContainerInput' value={value} onChange={onChange} />
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ParticipantReceiver