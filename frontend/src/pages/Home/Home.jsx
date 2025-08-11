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
  
  // Animation state for preview
  const [isAnimating, setIsAnimating] = useState(false);
  const [originalMessages, setOriginalMessages] = useState([]);
  const [animationMessages, setAnimationMessages] = useState([]);

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

  // WAŻNE: Aktualizuj właściwość sender w wiadomościach gdy zmienia się senderName lub receiverNames
  useEffect(() => {
    console.log('🔧 Aktualizowanie sender w wiadomościach...', { senderName, receiverNames });
    setMessages(prev => prev.map(msg => {
      let newSender = msg.sender;
      
      // Aktualizuj sender na podstawie typu wiadomości
      if (msg.type === 'sender') {
        newSender = senderName;
      } else if (msg.type === 'receiver') {
        newSender = receiverNames[0] || 'Friend';
      }
      
      console.log('📝 Aktualizacja wiadomości:', { 
        text: msg.text?.substring(0, 20), 
        oldSender: msg.sender, 
        newSender, 
        type: msg.type 
      });
      
      return { ...msg, sender: newSender };
    }));
  }, [senderName, receiverNames]);

  // Zatrzymaj animację jeśli użytkownik zmienia dane podczas animacji
  useEffect(() => {
    if (isAnimating) {
      setIsAnimating(false);
      setAnimationMessages([]);
      setOriginalMessages([]);
    }
  }, [senderName, receiverNames, messages]); // Nie włączaj isAnimating w dependencies!

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

  // Funkcja do uruchomienia animacji preview
  const handlePreviewStart = async () => {
    if (isAnimating || !messages || messages.length === 0) return;
    
    // Zapisz oryginalne wiadomości - ale tylko te które nie są typu typing lub date-separator
    const originalMessagesFiltered = messages.filter(msg => 
      msg.type !== 'typing' && msg.type !== 'date-separator'
    );
    setOriginalMessages([...originalMessagesFiltered]);
    setIsAnimating(true);
    
    // Sortuj wiadomości po dacie
    const sortedMessages = [...originalMessagesFiltered].sort((a, b) => {
      const dateA = new Date(a.date || a.timestamp || 0);
      const dateB = new Date(b.date || b.timestamp || 0);
      return dateA - dateB;
    });
    
    // Rozpocznij animację z separatorem daty
    setAnimationMessages([]);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (sortedMessages.length > 0) {
      setAnimationMessages([{
        id: 'date-separator-' + Date.now(),
        text: '',
        type: 'date-separator',
        date: sortedMessages[0].date || new Date(),
        dateDisplaySettings: sortedMessages[0].dateDisplaySettings || globalDateSettings
      }]);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Dodawaj wiadomości po kolei
    for (let i = 0; i < sortedMessages.length; i++) {
      const currentMsg = sortedMessages[i];
      
      // WAŻNE: Zawsze sprawdzaj względem aktualnego senderName!
      const isCurrentMsgFromSender = currentMsg.sender === senderName;
      
      // Pokaż kropki oczekiwania przed wiadomością
      setAnimationMessages(prev => [...prev, {
        id: 'typing-' + Date.now() + i,
        text: '...',
        type: 'typing',
        sender: currentMsg.sender, // Zachowaj oryginalnego sendera
        date: new Date()
      }]);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Usuń kropki oczekiwania i dodaj prawdziwą wiadomość
      setAnimationMessages(prev => [
        ...prev.filter(msg => msg.type !== 'typing'),
        {
          ...currentMsg,
          // WAŻNE: Typ bazuje na aktualnym senderName, nie na oryginalnym type
          type: isCurrentMsgFromSender ? 'sender' : 'receiver'
        }
      ]);
      
      // Czekaj 3 sekundy przed następną wiadomością (oprócz ostatniej)
      if (i < sortedMessages.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
    
    // Czekaj 2 sekundy, potem zakończ animację
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Zakończ animację
    setAnimationMessages([]);
    setIsAnimating(false);
    setOriginalMessages([]);
  };

  // Funkcja do zatrzymania animacji (jeśli trwa)
  const stopAnimation = () => {
    if (isAnimating) {
      setAnimationMessages([]);
      setIsAnimating(false);
      setOriginalMessages([]);
    }
  };

  // Zatrzymuj animację gdy zmieniają się kluczowe dane
  useEffect(() => {
    stopAnimation();
  }, [senderName, receiverNames, messages]);

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
          messages={isAnimating ? animationMessages : messages} 
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
          onPreviewStart={handlePreviewStart}
          isAnimating={isAnimating}
        />
    </div>
  )
}

export default Home