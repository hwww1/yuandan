import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Share2, Sparkles } from 'lucide-react';

interface GreetingCardProps {
  message: string;
  image: string;
  onRegenerate: () => void;
  loading: boolean;
}

const GreetingCard: React.FC<GreetingCardProps> = ({ message, image, onRegenerate, loading }) => {
  
  const handleShare = async () => {
    // 1. Construct the share URL with the current message encoded
    const url = new URL(window.location.href);
    url.searchParams.set('message', message);
    const shareUrl = url.toString();
    const shareText = `送你一张2025新年好运签：\n\n${message}\n\n👇点击领取你的专属祝福：`;

    // 2. Use native sharing if available (Mobile), otherwise copy to clipboard
    if (navigator.share) {
      try {
        await navigator.share({
          title: '2025 新年祝福',
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for desktop or unsupported browsers
      try {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        alert('链接已复制！快去微信/QQ粘贴发给朋友吧~');
      } catch (err) {
        alert('请手动复制浏览器上方的链接分享给朋友哦');
      }
    }
  };

  return (
    <motion.div 
      className="relative w-full h-full flex items-center justify-center p-0 md:p-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Card Container - Mobile Fullscreen, Desktop Card */}
      <div className="w-full h-full md:max-w-[400px] md:h-[85vh] relative md:rounded-3xl overflow-hidden shadow-2xl bg-black">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
           <AnimatePresenceWrapper image={image} />
          {/* Advanced Gradients for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80"></div>
          <div className="absolute inset-0 backdrop-blur-[1px]"></div>
        </div>

        {/* Content Layer */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-8 pb-12">
          
          {/* Top Bar */}
          <div className="flex justify-between items-center mt-4 opacity-80">
             <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-yellow-200" />
                <span className="text-xs text-yellow-100 tracking-[0.2em] font-light uppercase">LUCKY 2025</span>
             </div>
             <div className="text-xs text-white/50 font-serif-sc">
                {new Date().toLocaleDateString('zh-CN')}
             </div>
          </div>

          {/* Main Message Area */}
          <div className="flex-1 flex flex-col justify-center items-center">
             {loading ? (
               <div className="space-y-4 w-full animate-pulse flex flex-col items-center">
                 <div className="h-px bg-white/30 w-1/3 mb-6"></div>
                 <div className="h-4 bg-white/10 rounded w-3/4"></div>
                 <div className="h-4 bg-white/10 rounded w-1/2"></div>
                 <div className="h-4 bg-white/10 rounded w-2/3"></div>
                 <div className="h-px bg-white/30 w-1/3 mt-6"></div>
               </div>
             ) : (
               <motion.div
                 initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                 animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                 transition={{ delay: 0.2, duration: 0.8 }}
                 className="text-center relative py-10 px-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl"
               >
                 {/* Decorative Quotes */}
                 <span className="absolute top-4 left-4 text-4xl text-white/20 font-serif leading-none">“</span>
                 
                 {message.split('\n').map((line, i) => (
                   <p key={i} className="text-xl md:text-2xl font-serif-sc text-white/95 leading-loose tracking-wide drop-shadow-sm my-1">
                     {line}
                   </p>
                 ))}

                 <span className="absolute bottom-[-10px] right-4 text-4xl text-white/20 font-serif leading-none rotate-180">“</span>
               </motion.div>
             )}
          </div>

          {/* Action Bar */}
          <div className="flex flex-col gap-4 mb-4">
             <div className="flex justify-center gap-4">
                <ActionButton 
                  icon={<RefreshCw size={18} />} 
                  label="再抽一签" 
                  onClick={onRegenerate} 
                  loading={loading}
                />
                <ActionButton 
                  icon={<Share2 size={18} />} 
                  label="送给朋友" 
                  onClick={handleShare} 
                />
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Sub-component for buttons
const ActionButton = ({ icon, label, onClick, loading = false }: any) => (
  <button 
    onClick={onClick}
    disabled={loading}
    className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all active:scale-95 shadow-lg"
  >
    <span className={`${loading ? 'animate-spin' : ''} text-white/90`}>{icon}</span>
    <span className="text-xs font-medium text-white/90 tracking-wide">{label}</span>
  </button>
);

// Wrapper to handle image fading
const AnimatePresenceWrapper = ({ image }: { image: string }) => (
    <img 
      src={image} 
      alt="Background" 
      className="w-full h-full object-cover opacity-90 transition-opacity duration-700"
    />
);

export default GreetingCard;