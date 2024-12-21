// app/page.tsx
"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<string>('#F2D1C9');
  const [colors, setColors] = useState(['#F2E7DC', '#403837', '#A68C8A']);
  const [isHovered, setIsHovered] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const texts = ["Welcome to", "Cecilia Lieberia's", "Site"];

  const handleColorToggle = () => {
    const newBaseColor = colors[2];
    const rotatedColors = [
      selectedColor, 
      ...colors.slice(0, 2)
    ];

    setSelectedColor(newBaseColor);
    setColors(rotatedColors);
  };

  const getContrastColor = (backgroundColor: string) => {
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? 'black' : 'white';
  };

  const textColor = useMemo(() => getContrastColor(selectedColor), [selectedColor]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handleTextClick = () => {
    router.push('/home');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ 
        width: '100vw', 
        height: '100vh', 
        backgroundColor: selectedColor,
        transition: 'background-color 0.5s ease',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTextIndex}
          initial={{ 
            opacity: 0, 
            scale: 0.8,
            rotateX: 90 
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotateX: 0,
            transition: { 
              type: "spring", 
              stiffness: 300, 
              damping: 20 
            }
          }}
          exit={{ 
            opacity: 0, 
            scale: 1.2,
            rotateX: -90,
            transition: { duration: 0.3 }
          }}
          onClick={handleTextClick}
          style={{
            position: 'absolute',
            color: textColor,
            fontSize: '3rem',
            fontWeight: 'bold',
            textAlign: 'center',
            cursor: 'pointer',
            transformOrigin: 'center'
          }}
        >
          {texts[currentTextIndex]}
        </motion.div>
      </AnimatePresence>

      <motion.div
        animate={{ 
          opacity: [0.6, 1, 0.6],
          transition: { 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
          }
        }}
        style={{
          position: 'absolute',
          bottom: 100,
          color: textColor,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          letterSpacing: '0.05em',
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }}
      >
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={textColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ x: 0 }}
          animate={{
            x: [0, 10, 0],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
        </motion.svg>
        Click The Animated Text
      </motion.div>

      <motion.div 
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          position: 'absolute',
          bottom: 15,
          right: 15,
          width: 50,
          height: 50,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          opacity: isHovered ? 1 : 0.3,
          transition: 'opacity 0.3s ease'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleColorToggle}
      >
        {colors.map((color, index) => (
          <motion.div
            key={color}
            initial={{ 
              y: index === 2 ? 100 : 0,
              scale: index === 2 ? 1.2 : 1 
            }}
            animate={{ 
              y: isHovered ? 0 : (index === 2 ? 100 : 0),
              scale: isHovered ? 1 : (index === 2 ? 1.2 : 1),
              transition: { 
                duration: 0.3,
                ease: "easeInOut" 
              }
            }}
            style={{
              position: 'absolute',
              width: 30,
              height: 30,
              borderRadius: '50%',
              backgroundColor: color,
              transform: `translateY(${index * 20}px)`,
              opacity: isHovered ? 1 : 0.5
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Home;