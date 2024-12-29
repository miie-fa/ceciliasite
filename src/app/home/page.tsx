"use client";
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './home.module.css';

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleCardClick = (path: string) => {
    router.push(`/${path.toLowerCase()}`);
  };

  return (
    <div className={styles.pageContainer}>
      {/* Background Image */}
      <Image 
        src="/background-blur.png" 
        alt="Background" 
        fill
        priority
        className={styles.backgroundImage}
        style={{ 
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: -1
        }}
      />

      {/* Content Container */}
      <div className={styles.contentContainer}>
        {/* Card Section */}
        <div className={styles.cardSection}>
          {/* Home Card */}
          <div 
            className={styles.cardWrapper}
            onClick={() => handleCardClick('Home')}
          >
            <Image 
              src="/Home-Card.png" 
              alt="Home Card" 
              width={220}
              height={280} 
              className={styles.card}
            />
          </div>

          {/* About Card */}
          <div 
            className={styles.cardWrapper}
            onClick={() => handleCardClick('About')}
          >
            <Image 
              src="/About-Card.png" 
              alt="About Card" 
              width={220}
              height={280} 
              className={styles.card}
            />
          </div>

          {/* Gallery Card */}
          <div 
            className={styles.cardWrapper}
            onClick={() => handleCardClick('Gallery')}
          >
            <Image 
              src="/Gallery-Card.png" 
              alt="Gallery Card" 
              width={220}
              height={280} 
              className={styles.card}
            />
          </div>
        </div>

        {/* Photo Section */}
        <div className={styles.photoSection}>
          <Image 
            src="/CeciliaLieberiaEmblem.png"
            alt="Large Photo" 
            width={350}
            height={400} 
            className={styles.largePhoto}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;