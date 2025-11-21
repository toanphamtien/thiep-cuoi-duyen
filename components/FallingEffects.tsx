import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Generates glittering gold particles
const FallingEffects: React.FC = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    const count = 30;
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percent
      delay: Math.random() * 5,
      size: Math.random() * 6 + 2, // 2px to 8px
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: ['0vh', '100vh'],
            opacity: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
          }}
          className="absolute bg-wedding-gold rounded-full shadow-[0_0_8px_2px_rgba(255,215,0,0.6)]"
        />
      ))}
    </div>
  );
};

export default FallingEffects;