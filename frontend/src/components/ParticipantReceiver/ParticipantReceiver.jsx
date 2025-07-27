import React from 'react';
import './participantReceiver.css';
import { FiUser } from "react-icons/fi";

const ParticipantReceiver = ({ value, onChange, isCompact = false }) => {
  return (
    <div className='participantReceiver'>
            <div className={`participantReceiverContainer ${isCompact ? 'participantReceiverContainerCompact' : ''}`}>
                {/* Left Part */}
                <div className="participantReceiverContainerLeft">
                    <div className="participantReceiverContainerLeftContainer">
                        <div className="participantReceiverContainerLeftContainerDiv">
                            <FiUser className='participantReceiverContainerLeftContainerDivIcon' />
                        </div>
                    </div>
                </div>
    
                {/* Right Part */}
                <div className={`participantReceiverContainerRight ${isCompact ? 'participantReceiverContainerRightCompact' : ''}`}>
                    <div className="participantReceiverContainerRightContainer">
                        <input 
                          type="text" 
                          placeholder='Receiver name' 
                          className={`participantReceiverContainerRightContainerInput ${isCompact ? 'participantReceiverContainerRightContainerInputCompact' : ''}`}
                          value={value} 
                          onChange={onChange} 
                        />
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ParticipantReceiver