import React, { useRef } from 'react';
import './group.css';
import { FiUser } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

const Group = ({ groupName, setGroupName, groupImage, setGroupImage }) => {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setGroupImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setGroupImage('');
  };

  return (
    <div className='group'>
      <div className="groupContainer">
        {/* Left Part */}
        <div className="groupContainerLeft">
          <div className="groupContainerLeftContainer">
            <div className="groupContainerLeftContainerDiv" onClick={handleImageClick} style={{cursor: 'pointer'}}>
              {groupImage ? (
                <>
                  <img 
                    src={groupImage} 
                    alt="Group profile" 
                    className="groupContainerLeftContainerDivImage"
                  />
                  <div className="groupContainerLeftContainerDivRemoveButton" onClick={handleRemoveImage}>
                    <IoCloseOutline className="groupContainerLeftContainerDivRemoveButtonIcon" />
                  </div>
                </>
              ) : (
                <FiUser className='groupContainerLeftContainerDivIcon' />
              )}
            </div>
          </div>
        </div>

        {/* Right Part */}
        <div className="groupContainerRight">
          <div className="groupContainerRightContainer">
            <input
              type="text"
              placeholder='Group name...'
              className='groupContainerRightContainerInput'
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
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

export default Group 