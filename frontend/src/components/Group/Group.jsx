import React from 'react';
import './group.css';
import { FiUser } from "react-icons/fi";

const Group = ({ groupName, setGroupName, groupImage, setGroupImage }) => {
  const handleImageClick = () => {
    document.getElementById('groupImageInput').click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setGroupImage(e.target.result);
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
        <div className="groupContainerLeftContainer">
          <div className="groupContainerLeftContainerDiv">
            {groupImage ? (
              <div style={{ position: 'relative' }}>
                <img
                  src={groupImage}
                  alt="Group"
                  className="groupContainerLeftContainerDivImage"
                  onClick={handleImageClick}
                />
                <button
                  className="groupContainerLeftContainerDivRemoveButton"
                  onClick={handleRemoveImage}
                >
                  <span className="groupContainerLeftContainerDivRemoveButtonIcon">×</span>
                </button>
              </div>
            ) : (
              <FiUser className='groupContainerLeftContainerDivIcon' onClick={handleImageClick} />
            )}
            <input
              type="file"
              id="groupImageInput"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        <div className="groupContainerRight">
          <div className="groupContainerRightContainer">
            <input
              type="text"
              placeholder="Group name..."
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="groupContainerRightContainerInput"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Group 