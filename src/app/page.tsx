"use client";
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import lottie from 'lottie-web';

const Home: React.FC = () => {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<string>('#F2D1C9');
  const [colors, setColors] = useState(['#FFD1DC', '#FFC0CB', '#FFA07A']);
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const animationContainer = useRef<HTMLDivElement | null>(null);
  const animationInstance = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  useEffect(() => {
    if (animationContainer.current && isClient) {
      animationInstance.current = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/data.json',
      });

      return () => {
        if (animationInstance.current) {
          animationInstance.current.destroy();
        }
      };
    }
  }, [isClient]);

  const handleTextClick = () => {
    router.push('/home');
  };

  if (!isClient) return null;

  return (
    <>
      {/* SVG Filter untuk Efek Difference */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="difference-filter">
          <feColorMatrix 
            type="matrix" 
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0"
          />
          <feBlend mode="difference" in="SourceGraphic" in2="BackgroundImage" />
        </filter>
      </svg>

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
            onClick={handleTextClick}
            style={{
              position: 'absolute',
              color: textColor,
              fontSize: '3rem',
              fontWeight: 'bold',
              textAlign: 'center',
              cursor: 'pointer',
              transformOrigin: 'center',
              width: '120vw',
              height: '120vw',
              maxWidth: '800px',
              maxHeight: '800px',
              filter: 'url(#difference-filter)' // Gunakan filter difference
            }}
          >
            <div 
              ref={animationContainer} 
              style={{ 
                width: '100%', 
                height: '100%'
              }} 
            />
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
          >
            <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
          </motion.svg>
          Click Anywhere to Start
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
    </>
  );
};

export default Home;