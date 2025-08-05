import React, { useRef, useState, useEffect } from 'react';
import './participantReceiver.css';
import { FiUser } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

const ParticipantReceiver = ({ 
  value, 
  onChange, 
  isCompact = false, 
  receiverImage, 
  setReceiverImage,
  status = 'Active now',
  setStatus,
  showStatus = false
}) => {
  const fileInputRef = useRef(null);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customStatus, setCustomStatus] = useState('');

  const statusOptions = [
    'Active now',
    'Active 1h ago',
    'Active 1d ago',
    'Active 2d ago',
    'Active 1w ago',
    'Offline',
    'Custom'
  ];

  // Zamykanie dropdown po kliknięciu poza nim
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showStatusDropdown && !event.target.closest('.participantReceiverContainerRightContainerStatus')) {
        setShowStatusDropdown(false);
        setShowCustomInput(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showStatusDropdown]);

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

  const handleStatusClick = () => {
    if (showStatus && setStatus) {
      setShowStatusDropdown(!showStatusDropdown);
      setShowCustomInput(false);
    }
  };

  const handleStatusSelect = (newStatus) => {
    if (newStatus === 'Custom') {
      setShowCustomInput(true);
      setCustomStatus('');
    } else {
      if (setStatus) {
        setStatus(newStatus);
      }
      setShowStatusDropdown(false);
      setShowCustomInput(false);
    }
  };

  const handleCustomStatusSubmit = () => {
    if (customStatus.trim() && setStatus) {
      setStatus(customStatus.trim());
      setShowStatusDropdown(false);
      setShowCustomInput(false);
      setCustomStatus('');
    }
  };

  const handleCustomStatusKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCustomStatusSubmit();
    }
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
                        {showStatus && !isCompact && (
                          <div className="participantReceiverContainerRightContainerStatus" onClick={handleStatusClick}>
                            {status}
                            {setStatus && (
                              <div className="participantReceiverContainerRightContainerStatusDropdown">
                                {showStatusDropdown && statusOptions.map((option) => (
                                  <div 
                                    key={option} 
                                    className="participantReceiverContainerRightContainerStatusDropdownItem"
                                    onClick={() => handleStatusSelect(option)}
                                  >
                                    {option}
                                  </div>
                                ))}
                                {showCustomInput && (
                                  <div className="participantReceiverContainerRightContainerStatusDropdownCustom">
                                    <input
                                      type="text"
                                      placeholder="Enter custom status..."
                                      value={customStatus}
                                      onChange={(e) => setCustomStatus(e.target.value)}
                                      onKeyPress={handleCustomStatusKeyPress}
                                      className="participantReceiverContainerRightContainerStatusDropdownCustomInput"
                                      autoFocus
                                    />
                                    <button
                                      onClick={handleCustomStatusSubmit}
                                      className="participantReceiverContainerRightContainerStatusDropdownCustomButton"
                                    >
                                      Save
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
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