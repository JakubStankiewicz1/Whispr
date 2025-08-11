import React, { useState, useEffect, useRef, useCallback } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import './message.css';
import { FiUser } from "react-icons/fi";
import { GoArrowSwitch } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";
import { FiImage } from "react-icons/fi";
import { FiSmile } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";

const Message = ({ 
  senderName, 
  receiverNames, 
  defaultType = 'sender', 
  value, 
  onChange, 
  onRemove, // Nowa funkcja do usuwania wiadomości
  defaultReceiverIdx = 0, 
  senderImage, 
  receiverImages = [],
  dateDisplayOptions = {
    showDate: true,
    showTime: true,
    showYear: true,
    format: 'short' // 'short', 'long', 'custom'
  },
  forceDateDisplay = false, // Nowa opcja wymuszenia daty
  globalDateSettings = null // Globalne ustawienia formatowania dat
}) => {
  const [text, setText] = useState(value || "");
  const [focused, setFocused] = useState(false);
  const [type, setType] = useState(defaultType); // 'sender' or 'receiver'
  const [receiverIdx, setReceiverIdx] = useState(defaultReceiverIdx);
  const [images, setImages] = useState([]); // Array of image objects: {id, src, file}
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDateOptions, setShowDateOptions] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('16:09:04');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dateDisplaySettings, setDateDisplaySettings] = useState(dateDisplayOptions);
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const datePickerRef = useRef(null);
  const dateOptionsRef = useRef(null);
  
  // Use ref to store the latest onChange function
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  
  useEffect(() => { 
    setText(value || ""); 
  }, [value]);
  
  // Synchronizuj ustawienia z globalnymi ustawieniami
  useEffect(() => {
    if (globalDateSettings) {
      setDateDisplaySettings(globalDateSettings);
    }
  }, [globalDateSettings]);
  
  // Helper function to call onChange with current data
  const callOnChange = useCallback(() => {
    if (onChangeRef.current) {
      const currentMessageData = {
        text: text,
        type: type,
        sender: type === 'sender' ? (senderName || '') : (receiverNames && receiverNames[receiverIdx]) || '',
        receiverIdx: type === 'receiver' ? receiverIdx : 0,
        images: images, // Add images to message data
        date: selectedDate, // Add selected date to message data
        dateDisplaySettings: dateDisplaySettings, // Add date display settings
        forceDateDisplay: forceDateDisplay // Add forceDateDisplay to message data
      };
      onChangeRef.current(currentMessageData);
    }
  }, [text, type, senderName, receiverNames, receiverIdx, images, selectedDate, dateDisplaySettings, forceDateDisplay]);

  // Call onChange when type or receiverIdx changes (for switch functionality)
  useEffect(() => {
    callOnChange();
  }, [type, receiverIdx, callOnChange]);
  
  const isActive = focused || text || images.length > 0;
  const displayName = type === 'sender' ? (senderName || 'Sender') : (receiverNames && receiverNames[receiverIdx]) || 'Receiver';
  const displayRole = type === 'sender' ? 'Sender' : 'Receiver';
  
  // Get the appropriate image based on type and receiver index
  const getCurrentImage = () => {
    if (type === 'sender') {
      return senderImage || null;
    } else {
      return receiverImages[receiverIdx] || null;
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newImage = {
            id: Date.now() + Math.random(),
            src: event.target.result,
            file: file
          };
          setImages(prev => [...prev, newImage]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  // Handle image removal
  const handleRemoveImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  // Handle image click to open file picker
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Handle emoji picker toggle
  const handleEmojiClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  // Handle emoji selection
  const handleEmojiSelect = (emoji) => {
    setText(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  // Handle click outside emoji picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  // Handle date picker toggle
  const handleDateClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // Handle time change
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  // Update selectedDate when selectedTime changes
  useEffect(() => {
    if (selectedTime && selectedDate) {
      const [hours, minutes] = selectedTime.split(':');
      const newDate = new Date(selectedDate);
      newDate.setHours(parseInt(hours, 10));
      newDate.setMinutes(parseInt(minutes, 10));
      setSelectedDate(newDate);
    }
  }, [selectedTime]);

  // Handle month navigation
  const handleMonthChange = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'next') {
        newDate.setMonth(newDate.getMonth() + 1);
      } else {
        newDate.setMonth(newDate.getMonth() - 1);
      }
      return newDate;
    });
  };

  // Handle save date/time
  const handleSaveDateTime = () => {
    setShowDatePicker(false);
  };

  // Handle cancel date/time
  const handleCancelDateTime = () => {
    setShowDatePicker(false);
  };

  // Handle click outside date picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };

    if (showDatePicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDatePicker]);

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  // Format date based on display settings
  const formatDateWithSettings = (date, time) => {
    if (!dateDisplaySettings.showDate && !dateDisplaySettings.showTime) {
      return '';
    }

    let formattedDate = '';
    let formattedTime = '';

    // Format date
    if (dateDisplaySettings.showDate) {
      if (dateDisplaySettings.format === 'short') {
        formattedDate = date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          ...(dateDisplaySettings.showYear && { year: 'numeric' })
        }).replace(/\//g, '.');
      } else if (dateDisplaySettings.format === 'long') {
        formattedDate = date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } else {
        // Custom format - "Aug 7, 2025"
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const day = date.getDate();
        const year = dateDisplaySettings.showYear ? date.getFullYear() : '';
        
        if (dateDisplaySettings.showYear) {
          formattedDate = `${month} ${day}, ${year}`;
        } else {
          formattedDate = `${month} ${day}`;
        }
      }
    }

    // Format time
    if (dateDisplaySettings.showTime) {
      formattedTime = time;
    }

    // Combine date and time
    if (formattedDate && formattedTime) {
      return `${formattedDate}, ${formattedTime}`;
    } else if (formattedDate) {
      return formattedDate;
    } else if (formattedTime) {
      return formattedTime;
    }

    return '';
  };

  // Handle date options toggle
  const handleDateOptionsClick = () => {
    setShowDateOptions(!showDateOptions);
  };

  // Handle date display setting change
  const handleDateSettingChange = (setting, value) => {
    setDateDisplaySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // Handle click outside date options
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dateOptionsRef.current && !dateOptionsRef.current.contains(event.target)) {
        setShowDateOptions(false);
      }
    };

    if (showDateOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDateOptions]);
  
  const handleSwitch = () => {
    if (type === 'sender') {
      // Przechodzimy do pierwszego receivera
      setType('receiver');
      setReceiverIdx(0);
    } else {
      // Jesteśmy na receiverze, sprawdzamy czy to ostatni receiver
      if (receiverNames && receiverNames.length > 1) {
        if (receiverIdx < receiverNames.length - 1) {
          // Przechodzimy do następnego receivera
          setReceiverIdx(receiverIdx + 1);
        } else {
          // To ostatni receiver, wracamy do sendera
          setType('sender');
          setReceiverIdx(0);
        }
      } else {
        // Tylko jeden receiver, wracamy do sendera
        setType('sender');
        setReceiverIdx(0);
      }
    }
    // Nie wywołujemy callOnChange bezpośrednio - useEffect to zrobi
  };
  
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    // Call onChange immediately for text changes
    if (onChangeRef.current) {
      const currentMessageData = {
        text: newText,
        type: type,
        sender: type === 'sender' ? (senderName || '') : (receiverNames && receiverNames[receiverIdx]) || '',
        receiverIdx: type === 'receiver' ? receiverIdx : 0,
        images: images,
        date: selectedDate,
        dateDisplaySettings: dateDisplaySettings,
        forceDateDisplay: forceDateDisplay
      };
      onChangeRef.current(currentMessageData);
    }
  };

  const handleRemoveMessage = () => {
    if (onRemove) {
      onRemove();
    }
  };
  
  const currentImage = getCurrentImage();
  
  return (
    <div className='message'>
        <div className="messageContainer">
            <div className="messageContainerDiv">
                {/* Left Part */}
                <div className="messageContainerDivLeft">
                    <div className="messageContainerDivLeftContainer">
                        <div className="messageContainerDivLeftContainerUser">
                            {currentImage ? (
                              <img 
                                src={currentImage} 
                                alt="Profile" 
                                className="messageContainerDivLeftContainerUserImage"
                              />
                            ) : (
                              <FiUser className='messageContainerDivLeftContainerUserIcon' />
                            )}
                        </div>

                        <div className="messageContainerDivLeftContainerSwitch">
                            <div className="messageContainerDivLeftContainerSwitchContainer" onClick={handleSwitch} style={{cursor:'pointer'}}>
                                <GoArrowSwitch className='messageContainerDivLeftContainerSwitchContainerIcon' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Part */}
                <div className={`messageContainerDivRight${isActive ? ' active' : ''}`}>
                    <div className="messageContainerDivRightContainer">
                        {/* Top Part */}
                        <div className="messageContainerDivRightContainerTop">
                            <div className="messageContainerDivRightContainerTopContainer">
                                {/* Left Part */}
                                <div className="messageContainerDivRightContainerTopContainerLeft">
                                    <div className="messageContainerDivRightContainerTopContainerLeftContainer">
                                        <div className="messageContainerDivRightContainerTopContainerLeftContainerOne">
                                            <div className="messageContainerDivRightContainerTopContainerLeftContainerOneContainer">
                                                <p className="messageContainerDivRightContainerTopContainerLeftContainerOneContainerText">
                                                    {String(displayName || displayRole)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="messageContainerDivRightContainerTopContainerLeftContainerTwo">
                                            <div className="messageContainerDivRightContainerTopContainerLeftContainerTwoContainer">
                                                <div className="messageDateContainer" onClick={handleDateClick} style={{cursor: 'pointer'}}>
                                                    <FiCalendar className="messageDateIcon" />
                                                    <span className="messageDateText">
                                                        {formatDateWithSettings(selectedDate, selectedTime)}
                                                    </span>
                                                    {/* <button 
                                                        className="messageDateOptionsButton"
                                                        onClick={handleDateOptionsClick}
                                                        title="Date display options"
                                                    >
                                                        <FiSettings className="messageDateOptionsIcon" />
                                                    </button> */}
                                                </div>

                                                <button 
                                                        className="messageDateOptionsButton"
                                                        onClick={handleDateOptionsClick}
                                                        title="Date display options"
                                                    >
                                                        <FiSettings className="messageDateOptionsIcon" />
                                                    </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Part */}
                                <div className="messageContainerDivRightContainerTopContainerRight">
                                    <div className="messageContainerDivRightContainerTopContainerRightContainer">
                                        <IoCloseOutline 
                                            className='messageContainerDivRightContainerTopContainerRightContainerIcon' 
                                            onClick={handleRemoveMessage}
                                            style={{cursor: 'pointer'}}
                                            title="Remove message"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Part */}
                        <div className="messageContainerDivRightContainerBottom">
                            <div className="messageContainerDivRightContainerBottomContainer">
                                {/* Images Section */}
                                {images.length > 0 && (
                                  <div className="messageImagesContainer">
                                    {images.map((image) => (
                                      <div key={image.id} className="messageImageWrapper">
                                        <img 
                                          src={image.src} 
                                          alt="Message attachment" 
                                          className="messageImage"
                                        />
                                        <button 
                                          className="messageImageRemoveButton"
                                          onClick={() => handleRemoveImage(image.id)}
                                          title="Remove image"
                                        >
                                          <IoCloseOutline className="messageImageRemoveButtonIcon" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Text Input Section */}
                                <div className="messageInputSection">
                                  <TextareaAutosize
                                    className='messageContainerDivRightContainerBottomContainerTextarea'
                                    value={text}
                                    onChange={handleTextChange}
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                    placeholder="Type your message..."
                                  />
                                  
                                  {/* Image Upload Button */}
                                  <button 
                                    className="messageImageUploadButton"
                                    onClick={handleImageClick}
                                    title="Add image"
                                  >
                                    <FiImage className="messageImageUploadButtonIcon" />
                                  </button>

                                  {/* Emoji Button */}
                                  <button 
                                    className="messageEmojiButton"
                                    onClick={handleEmojiClick}
                                    title="Add emoji"
                                  >
                                    <FiSmile className="messageEmojiButtonIcon" />
                                  </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          multiple
          style={{ display: 'none' }}
        />

        {/* Emoji Picker Modal */}
        {showEmojiPicker && (
          <div className="messageEmojiPicker" ref={emojiPickerRef}>
            <div className="messageEmojiPickerContent">
              <div className="messageEmojiPickerHeader">
                <h3>Choose Emoji</h3>
                <button 
                  className="messageEmojiPickerClose"
                  onClick={() => setShowEmojiPicker(false)}
                >
                  <IoCloseOutline />
                </button>
              </div>
              <div className="messageEmojiPickerGrid">
                {['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕'].map((emoji, index) => (
                  <button
                    key={index}
                    className="messageEmojiPickerItem"
                    onClick={() => handleEmojiSelect(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Date Picker Modal */}
        {showDatePicker && (
          <div className="messageDatePicker" ref={datePickerRef}>
            <div className="messageDatePickerContent">
              <div className="messageDatePickerHeader">
                <h3>Select Date & Time</h3>
                <button 
                  className="messageDatePickerClose"
                  onClick={() => setShowDatePicker(false)}
                >
                  <IoCloseOutline />
                </button>
              </div>
              
              <div className="messageDatePickerBody">
                {/* Date Section */}
                <div className="messageDatePickerDateSection">
                  <h4>Date</h4>
                  <div className="messageDatePickerCalendar">
                    <div className="messageDatePickerCalendarHeader">
                      <button 
                        className="messageDatePickerCalendarNav"
                        onClick={() => handleMonthChange('prev')}
                      >
                        <IoChevronBack />
                      </button>
                      <span className="messageDatePickerCalendarTitle">
                        {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </span>
                      <button 
                        className="messageDatePickerCalendarNav"
                        onClick={() => handleMonthChange('next')}
                      >
                        <IoChevronForward />
                      </button>
                    </div>
                    
                    <div className="messageDatePickerCalendarDays">
                      <div className="messageDatePickerCalendarDaysHeader">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                          <div key={day} className="messageDatePickerCalendarDayHeader">{day}</div>
                        ))}
                      </div>
                      <div className="messageDatePickerCalendarDaysGrid">
                        {generateCalendarDays().map((date, index) => {
                          const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                          const isSelected = date.toDateString() === selectedDate.toDateString();
                          const isToday = date.toDateString() === new Date().toDateString();
                          
                          return (
                            <button
                              key={index}
                              className={`messageDatePickerCalendarDay ${!isCurrentMonth ? 'other-month' : ''} ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                              onClick={() => handleDateSelect(date)}
                              disabled={!isCurrentMonth}
                            >
                              {date.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time Section */}
                <div className="messageDatePickerTimeSection">
                  <h4>Time</h4>
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={handleTimeChange}
                    className="messageDatePickerTimeInput"
                    step="1"
                  />
                </div>
              </div>

              <div className="messageDatePickerFooter">
                <button 
                  className="messageDatePickerCancel"
                  onClick={handleCancelDateTime}
                >
                  Cancel
                </button>
                <button 
                  className="messageDatePickerSave"
                  onClick={handleSaveDateTime}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Date Options Modal */}
        {showDateOptions && (
          <div className="messageDateOptions" ref={dateOptionsRef}>
            <div className="messageDateOptionsContent">
              <div className="messageDateOptionsHeader">
                <h3>Date Display Options</h3>
                <button 
                  className="messageDateOptionsClose"
                  onClick={() => setShowDateOptions(false)}
                >
                  <IoCloseOutline />
                </button>
              </div>
              
              <div className="messageDateOptionsBody">
                {/* Show Date Toggle */}
                <div className="messageDateOptionsItem">
                  <label className="messageDateOptionsLabel">
                    <input
                      type="checkbox"
                      checked={dateDisplaySettings.showDate}
                      onChange={(e) => handleDateSettingChange('showDate', e.target.checked)}
                      className="messageDateOptionsCheckbox"
                    />
                    <span className="messageDateOptionsText">Show Date</span>
                  </label>
                </div>

                {/* Show Time Toggle */}
                <div className="messageDateOptionsItem">
                  <label className="messageDateOptionsLabel">
                    <input
                      type="checkbox"
                      checked={dateDisplaySettings.showTime}
                      onChange={(e) => handleDateSettingChange('showTime', e.target.checked)}
                      className="messageDateOptionsCheckbox"
                    />
                    <span className="messageDateOptionsText">Show Time</span>
                  </label>
                </div>

                {/* Show Year Toggle */}
                <div className="messageDateOptionsItem">
                  <label className="messageDateOptionsLabel">
                    <input
                      type="checkbox"
                      checked={dateDisplaySettings.showYear}
                      onChange={(e) => handleDateSettingChange('showYear', e.target.checked)}
                      className="messageDateOptionsCheckbox"
                    />
                    <span className="messageDateOptionsText">Show Year</span>
                  </label>
                </div>

                {/* Format Selection */}
                <div className="messageDateOptionsItem">
                  <label className="messageDateOptionsLabel">
                    <span className="messageDateOptionsText">Format:</span>
                    <select
                      value={dateDisplaySettings.format}
                      onChange={(e) => handleDateSettingChange('format', e.target.value)}
                      className="messageDateOptionsSelect"
                    >
                      <option value="short">Short (31.07)</option>
                      <option value="long">Long (Thursday, July 31, 2025)</option>
                      <option value="custom">Custom (Jul 31)</option>
                    </select>
                  </label>
                </div>

                {/* Force Date Display Toggle */}
                <div className="messageDateOptionsItem">
                  <label className="messageDateOptionsLabel">
                    <input
                      type="checkbox"
                      checked={forceDateDisplay}
                      onChange={(e) => {
                        // To będzie przekazywane do parent component
                        if (onChangeRef.current) {
                          const currentMessageData = {
                            text: text,
                            type: type,
                            sender: type === 'sender' ? (senderName || '') : (receiverNames && receiverNames[receiverIdx]) || '',
                            receiverIdx: type === 'receiver' ? receiverIdx : 0,
                            images: images,
                            date: selectedDate,
                            dateDisplaySettings: dateDisplaySettings,
                            forceDateDisplay: e.target.checked
                          };
                          onChangeRef.current(currentMessageData);
                        }
                      }}
                      className="messageDateOptionsCheckbox"
                    />
                    <span className="messageDateOptionsText">Force Date Display (Always show date separators)</span>
                  </label>
                </div>

                {/* Preview */}
                <div className="messageDateOptionsPreview">
                  <span className="messageDateOptionsPreviewLabel">Preview:</span>
                  <span className="messageDateOptionsPreviewText">
                    {formatDateWithSettings(selectedDate, selectedTime) || 'No date/time shown'}
                  </span>
                </div>
              </div>

              <div className="messageDateOptionsFooter">
                <button 
                  className="messageDateOptionsCancel"
                  onClick={() => setShowDateOptions(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default Message