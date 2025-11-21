
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface EnvelopeProps {
  onOpen: () => void;
  guestName?: string;
}

const Envelope: React.FC<EnvelopeProps> = ({ onOpen, guestName }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    // Wait for animation to complete before triggering parent callback
    setTimeout(() => {
      onOpen();
    }, 1500);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${isOpening ? 'pointer-events-none' : ''}`}>
      
      {/* Left Gate */}
      <motion.div
        initial={{ x: 0 }}
        animate={isOpening ? { x: '-100%' } : { x: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute left-0 top-0 bottom-0 w-1/2 bg-wedding-red border-r border-wedding-gold/50 shadow-2xl z-20 flex items-center justify-end"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')] opacity-20"></div>
        <div className="absolute right-4 top-0 bottom-0 w-2 bg-wedding-gold/20"></div>
      </motion.div>

      {/* Right Gate */}
      <motion.div
        initial={{ x: 0 }}
        animate={isOpening ? { x: '100%' } : { x: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute right-0 top-0 bottom-0 w-1/2 bg-wedding-red border-l border-wedding-gold/50 shadow-2xl z-20"
      >
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')] opacity-20"></div>
         <div className="absolute left-4 top-0 bottom-0 w-2 bg-wedding-gold/20"></div>
      </motion.div>

      {/* Center Latch/Button */}
      <motion.div 
          animate={isOpening ? { opacity: 0, scale: 1.5 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute z-30 flex flex-col items-center justify-center cursor-pointer group w-full" 
          onClick={handleOpen}
      >
          <div 
              className="relative w-32 h-32 bg-red-800 border-4 border-wedding-gold rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(255,215,0,0.6)] group-hover:scale-105 transition-transform duration-300"
          >
              <div className="absolute inset-0 border-2 border-wedding-gold rounded-full m-1 opacity-50"></div>
              <span className="text-6xl font-serif text-wedding-gold select-none">囍</span>
          </div>

          {guestName && (
            <div className="mt-8 px-6 py-2 bg-wedding-cream/90 text-wedding-red border-2 border-wedding-gold rounded-lg shadow-xl transform rotate-1">
              <p className="text-xs font-serif uppercase tracking-wider mb-1 text-gray-600 text-center">Kính mời</p>
              <p className="text-xl font-bold text-center font-serif">{guestName}</p>
            </div>
          )}

          <div className="mt-6 px-8 py-3 bg-wedding-gold text-wedding-red font-bold rounded-full shadow-lg animate-pulse group-hover:animate-none group-hover:bg-white group-hover:text-wedding-red transition-colors uppercase tracking-widest border-2 border-red-800">
              Mở Thiệp
          </div>
      </motion.div>
    </div>
  );
};

export default Envelope;
