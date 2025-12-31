import React, { useState, useEffect } from 'react';
import { AppState } from './types';
import { generateNewYearGreeting, generateFestiveImage } from './services/geminiService';
import Envelope from './components/Envelope';
import GreetingCard from './components/GreetingCard';
import MusicPlayer from './components/MusicPlayer';
import Fireworks from './components/Fireworks';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [greeting, setGreeting] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    
    // Check for shared message in URL
    const params = new URLSearchParams(window.location.search);
    const sharedMsg = params.get('message');

    if (sharedMsg) {
      // If sharing, use the shared message directly
      setGreeting(sharedMsg);
      // Still generate a fresh image because images are too big to share via URL
      const img = await generateFestiveImage();
      setImage(img);
    } else {
      // Normal flow: generate both
      const [msg, img] = await Promise.all([
        generateNewYearGreeting(),
        generateFestiveImage()
      ]);
      setGreeting(msg);
      setImage(img);
    }
    
    setLoading(false);
  };

  const handleOpen = () => {
    if (loading && !greeting) return;
    setAppState(AppState.OPENING);
    setTimeout(() => {
      setAppState(AppState.REVEALED);
    }, 800);
  };

  const handleRegenerate = async () => {
    setLoading(true);
    // Clear URL param when regenerating so we don't get stuck on the shared message
    const url = new URL(window.location.href);
    url.searchParams.delete('message');
    window.history.replaceState({}, '', url);

    const msg = await generateNewYearGreeting();
    setGreeting(msg);
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-black overflow-hidden flex flex-col relative font-sans">
      <MusicPlayer />
      <Fireworks />
      
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#2a0808_0%,_#000000_100%)] z-[-1]"></div>

      <AnimatePresence mode='wait'>
        {appState === AppState.IDLE && (
          <motion.div 
            key="envelope"
            exit={{ scale: 1.2, opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex items-center justify-center z-10"
          >
            <Envelope onOpen={handleOpen} loading={loading && !greeting} />
          </motion.div>
        )}

        {appState === AppState.REVEALED && (
          <motion.div 
            key="card"
            className="flex-1 flex items-center justify-center w-full h-full z-10"
          >
            <GreetingCard 
              message={greeting} 
              image={image} 
              onRegenerate={handleRegenerate}
              loading={loading}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;