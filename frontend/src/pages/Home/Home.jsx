import React, { useState, useEffect } from 'react';
import './home.css';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar.jsx';
import RightSidebar from '../../components/RightSidebar/RightSidebar.jsx';

const STORAGE_KEY = 'whispr-app-state';

const Home = () => {
  // Funkcja do pobierania stanu z localStorage
  const getInitialState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Odtwórz daty z stringów na obiekty Date
        if (parsed.messages) {
          parsed.messages = parsed.messages.map(msg => ({
            ...msg,
            date: msg.date ? new Date(msg.date) : new Date(),
          }));
        }
        return parsed;
      }
    } catch (e) {}
    return null;
  };

  const initial = getInitialState();

  const [senderName, setSenderName] = useState(initial?.senderName ?? 'You');
  const [receiverNames, setReceiverNames] = useState(initial?.receiverNames ?? ['Friend']);
  const [receiverImages, setReceiverImages] = useState(initial?.receiverImages ?? ['']);
  const [receiverStatuses, setReceiverStatuses] = useState(initial?.receiverStatuses ?? ['Active now']);
  const [messages, setMessages] = useState(initial?.messages ?? [
    {
      id: Date.now() + Math.random(),
      text: "Hello, how are you?",
      type: 'sender',
      sender: 'You',
      images: [],
      date: new Date(),
      dateDisplaySettings: {
        showDate: true,
        showTime: false,
        showYear: true,
        format: 'custom'
      }
    },
    {
      id: Date.now() + Math.random() + 1,
      text: "I'm glad, thank you!",
      type: 'receiver',
      sender: 'Friend',
      images: [],
      date: new Date(),
      dateDisplaySettings: {
        showDate: true,
        showTime: false,
        showYear: true,
        format: 'custom'
      }
    }
  ]);
  const [selectedDevice, setSelectedDevice] = useState(initial?.selectedDevice ?? 'desktop');
  
  // New state for group chat functionality
  const [chatType, setChatType] = useState(initial?.chatType ?? 'single'); // 'single' or 'group'
  const [groupName, setGroupName] = useState(initial?.groupName ?? '');
  const [groupImage, setGroupImage] = useState(initial?.groupImage ?? '');

  // Settings state
  const [darkMode, setDarkMode] = useState(initial?.darkMode ?? false);
  const [showHeader, setShowHeader] = useState(initial?.showHeader ?? true);
  const [showFooter, setShowFooter] = useState(initial?.showFooter ?? true);
  const [forceDateDisplay, setForceDateDisplay] = useState(initial?.forceDateDisplay ?? false);
  const [globalDateSettings, setGlobalDateSettings] = useState(initial?.globalDateSettings ?? {
    showDate: true,
    showTime: false,
    showYear: true,
    format: 'custom'
  });

  // Platform state
  const [selectedPlatform, setSelectedPlatform] = useState(initial?.selectedPlatform ?? 'Messenger');

  // Zapisuj stan do localStorage przy każdej zmianie
  useEffect(() => {
    const stateToSave = {
      senderName,
      receiverNames,
      receiverImages,
      receiverStatuses,
      messages,
      selectedDevice,
      chatType,
      groupName,
      groupImage,
      darkMode,
      showHeader,
      showFooter,
      forceDateDisplay,
      globalDateSettings,
      selectedPlatform,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [senderName, receiverNames, receiverImages, receiverStatuses, messages, selectedDevice, chatType, groupName, groupImage, darkMode, showHeader, showFooter, forceDateDisplay, globalDateSettings, selectedPlatform]);

  // Aktualizuj początkową wiadomość gdy zmienią się globalne ustawienia
  useEffect(() => {
    setMessages(prev => prev.map((msg, idx) => 
      idx === 0 ? { ...msg, dateDisplaySettings: globalDateSettings } : msg
    ));
  }, [globalDateSettings]);

  // Funkcja do resetowania wszystkich ustawień do domyślnych
  const handleResetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSenderName('You');
    setReceiverNames(['Friend']);
    setReceiverImages(['']);
    setReceiverStatuses(['Active now']);
    setMessages([
      {
        id: Date.now() + Math.random(),
        text: "Hello, how are you?",
        type: 'sender',
        sender: 'You',
        images: [],
        date: new Date(),
        dateDisplaySettings: {
          showDate: true,
          showTime: false,
          showYear: true,
          format: 'custom'
        }
      },
      {
        id: Date.now() + Math.random() + 1,
        text: "I'm glad, thank you!",
        type: 'receiver',
        sender: 'Friend',
        images: [],
        date: new Date(),
        dateDisplaySettings: {
          showDate: true,
          showTime: false,
          showYear: true,
          format: 'custom'
        }
      }
    ]);
    setChatType('single');
    setGroupName('');
    setGroupImage('');
    setDarkMode(false);
    setShowHeader(true);
    setShowFooter(true);
    setForceDateDisplay(false);
    setGlobalDateSettings({
      showDate: true,
      showTime: false,
      showYear: true,
      format: 'custom'
    });
    // Nie resetujemy selectedPlatform - zachowujemy aktualnie wybraną platformę
  };

  return (
    <div className={`home home--${selectedDevice}`}>
        <LeftSidebar 
          senderName={senderName} 
          setSenderName={setSenderName} 
          messages={messages} 
          setMessages={setMessages} 
          receiverNames={receiverNames} 
          setReceiverNames={setReceiverNames} 
          receiverImages={receiverImages} 
          setReceiverImages={setReceiverImages}
          receiverStatuses={receiverStatuses}
          setReceiverStatuses={setReceiverStatuses}
          chatType={chatType}
          setChatType={setChatType}
          groupName={groupName}
          setGroupName={setGroupName}
          groupImage={groupImage}
          setGroupImage={setGroupImage}
          forceDateDisplay={forceDateDisplay}
          setForceDateDisplay={setForceDateDisplay}
          globalDateSettings={globalDateSettings}
          setGlobalDateSettings={setGlobalDateSettings}
        />
        <RightSidebar 
          senderName={senderName} 
          receiverNames={receiverNames} 
          receiverImages={receiverImages} 
          receiverStatuses={receiverStatuses}
          messages={messages} 
          selectedDevice={selectedDevice} 
          setSelectedDevice={setSelectedDevice}
          chatType={chatType}
          groupName={groupName}
          groupImage={groupImage}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          showHeader={showHeader}
          setShowHeader={setShowHeader}
          showFooter={showFooter}
          setShowFooter={setShowFooter}
          forceDateDisplay={forceDateDisplay}
          globalDateSettings={globalDateSettings}
          onReset={handleResetToDefaults}
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
        />
    </div>
  )
}

export default Home