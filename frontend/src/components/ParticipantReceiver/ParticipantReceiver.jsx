import React, { useRef } from 'react';
import './participantReceiver.css';
import { FiUser } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

const ParticipantReceiver = ({ value, onChange, isCompact = false, receiverImage, setReceiverImage }) => {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setReceiverImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation(); // Zapobiega otwarciu okna wyboru pliku
    setReceiverImage('');
  };

  return (
    <div className='participantReceiver'>
            <div className={`participantReceiverContainer ${isCompact ? 'participantReceiverContainerCompact' : ''}`}>
                {/* Left Part */}
                <div className="participantReceiverContainerLeft">
                    <div className="participantReceiverContainerLeftContainer">
                        <div className="participantReceiverContainerLeftContainerDiv" onClick={handleImageClick} style={{cursor: 'pointer'}}>
                            {receiverImage ? (
                              <>
                                <img 
                                  src={receiverImage} 
                                  alt="Receiver profile" 
                                  className="participantReceiverContainerLeftContainerDivImage"
                                />
                                <div className="participantReceiverContainerLeftContainerDivRemoveButton" onClick={handleRemoveImage}>
                                  <IoCloseOutline className="participantReceiverContainerLeftContainerDivRemoveButtonIcon" />
                                </div>
                              </>
                            ) : (
                              <FiUser className='participantReceiverContainerLeftContainerDivIcon' />
                            )}
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

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
        </div>
  )
}

export default ParticipantReceiver