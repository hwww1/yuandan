import React, { useState, useEffect, useRef } from 'react';
import { Music, Music2 } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio('https://cdn.pixabay.com/audio/2023/01/01/00/03/chinese-new-year-128212.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Auto-play prevented", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button 
      onClick={toggleMusic}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg animate-pulse hover:bg-white/30 transition-all"
    >
      {isPlaying ? <Music2 size={20} /> : <Music size={20} />}
    </button>
  );
};

export default MusicPlayer;