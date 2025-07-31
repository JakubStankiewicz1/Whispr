import React, { useRef } from 'react';
import './participant.css';
import { FiUser } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

const Participant = ({ senderName, setSenderName, senderImage, setSenderImage }) => {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSenderImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation(); // Zapobiega otwarciu okna wyboru pliku
    setSenderImage('');
  };

  return (
    <div className='participant'>
        <div className="participantContainer">
            {/* Left Part */}
            <div className="participantContainerLeft">
                <div className="participantContainerLeftContainer">
                    <div className="participantContainerLeftContainerDiv" onClick={handleImageClick} style={{cursor: 'pointer'}}>
                        {senderImage ? (
                          <>
                            <img 
                              src={senderImage} 
                              alt="Sender profile" 
                              className="participantContainerLeftContainerDivImage"
                            />
                            <div className="participantContainerLeftContainerDivRemoveButton" onClick={handleRemoveImage}>
                              <IoCloseOutline className="participantContainerLeftContainerDivRemoveButtonIcon" />
                            </div>
                          </>
                        ) : (
                          <FiUser className='participantContainerLeftContainerDivIcon' />
                        )}
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

export default Participant