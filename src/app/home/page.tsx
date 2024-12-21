// app/home/page.tsx
"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './home.module.css';

const HomePage: React.FC = () => {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<string>('#F2D1C9');
  const [colors, setColors] = useState(['#F2E7DC', '#403837', '#A68C8A']);
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.pageContainer}
      style={{ backgroundColor: selectedColor }}
    >
      <div className={styles.contentWrapper}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className={styles.textContainer}
          style={{ color: textColor }}
        >
          Introducing here Cecilia Lieberia from Re:Memories 3rd Generation
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className={styles.imageContainer}
        >
          <Image 
            src="/CeciliaLieberiaIdolForm.png" 
            alt="Cecilia Lieberia" 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.responsiveImage}
            style={{ 
              objectFit: 'contain',
              objectPosition: 'center'
            }}
          />
        </motion.div>
      </div>

      <motion.div 
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={styles.colorToggleButton}
        style={{ opacity: isHovered ? 1 : 0.3 }}
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
            className={styles.colorToggleItem}
            style={{
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

export default HomePage;