import React from 'react';
import { motion } from 'framer-motion';

interface EnvelopeProps {
  onOpen: () => void;
  loading: boolean;
}

const Envelope: React.FC<EnvelopeProps> = ({ onOpen, loading }) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative w-[85%] max-w-[320px] aspect-[3/4.5] overflow-hidden rounded-xl shadow-2xl"
      >
        {/* Hongbao Background - Two Tone Red */}
        <div className="absolute inset-0 bg-[#cf3c32]"></div> {/* Darker red bottom */}
        
        {/* Top Curve Part */}
        <div className="absolute top-0 left-0 right-0 h-[65%] bg-[#d95940] rounded-b-[50%] shadow-md z-10 flex flex-col items-center pt-12">
           {/* Avatar/Icon Placeholder */}
           <div className="w-12 h-12 bg-[#ebcd98] rounded-full flex items-center justify-center mb-3 shadow-inner">
              <span className="text-[#d95940] font-bold text-lg">福</span>
           </div>
           
           <h2 className="text-[#ebcd98] text-xl font-medium tracking-wide">2025·乙巳蛇年</h2>
           <p className="text-[#ebcd98]/80 text-sm mt-1">抽取你的新年好运签</p>
           
           <div className="mt-6">
             <h1 className="text-[#ebcd98] text-2xl font-bold tracking-widest">新年快乐</h1>
           </div>
        </div>

        {/* The "Open" Button - Positioned exactly on the curve intersection */}
        <div className="absolute top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onOpen}
            disabled={loading}
            className="group relative w-24 h-24 rounded-full bg-[#ebcd98] shadow-lg flex items-center justify-center border-[4px] border-[#ebcd98]"
          >
             {/* Inner circle for detail */}
             <div className="w-20 h-20 rounded-full border border-[#d95940]/20 flex items-center justify-center">
                <span className={`text-[#333] font-serif font-bold text-3xl ${loading ? 'animate-spin' : ''}`}>
                  {loading ? '⟳' : '开'}
                </span>
             </div>
          </motion.button>
        </div>

        {/* Bottom Area Decoration */}
        <div className="absolute bottom-8 w-full text-center z-0">
           <p className="text-[#ebcd98]/40 text-xs">大吉大利 · 万事顺遂</p>
        </div>

      </motion.div>
    </div>
  );
};

export default Envelope;