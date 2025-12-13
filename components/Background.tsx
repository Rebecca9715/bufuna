import React from 'react';

interface BackgroundProps {
  children: React.ReactNode;
  opacity?: number;
}

export const Background: React.FC<BackgroundProps> = ({ children, opacity = 1 }) => {
  return (
    <div className="relative w-full h-full min-h-screen bg-forest-green overflow-hidden text-white font-sans">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 opacity-40">
        {/* Abstract forest shapes */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-forest-light rounded-full blur-3xl opacity-50 animate-pulse-slow"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-emerald-900 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-earth-gold rounded-full blur-[100px] opacity-20"></div>
      </div>
      
      {/* Texture overlay (noise or pattern simulation) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col" style={{ opacity }}>
        {children}
      </div>
    </div>
  );
};