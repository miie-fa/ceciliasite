// src/app/layout.tsx
"use client"; // Menandai komponen ini sebagai komponen klien

import { ParallaxProvider } from 'react-scroll-parallax';
import './globals.css'; // Pastikan untuk mengimpor CSS global

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">  
      <body>
        <ParallaxProvider>
          {children}
        </ParallaxProvider>
      </body>
    </html>
  );
}