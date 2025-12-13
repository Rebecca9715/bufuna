import React from 'react';
import { APP_TITLE, APP_SUBTITLE } from '../constants';
import { BufunaGraphic } from './BufunaGraphic';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-between h-full py-12 px-8 animate-fade-in-up relative">
      {/* Top spacing */}
      <div className="flex-1"></div>

      {/* Text Content */}
      <div className="text-center space-y-6 mb-8 relative z-10">
        <h1 className="text-2xl md:text-3xl font-serif font-light leading-relaxed tracking-widest text-white/90 whitespace-pre-line border-l-2 border-earth-gold pl-6 text-left drop-shadow-lg">
          {APP_TITLE}
        </h1>
        
        <p className="text-earth-gold/90 text-lg font-light tracking-wide mt-6 font-serif">
          {APP_SUBTITLE}
        </p>
      </div>

      {/* Hero Visual Decoration */}
      <div className="w-64 h-64 relative mb-12 flex items-center justify-center">
         {/* Glow effect behind */}
         <div className="absolute inset-0 bg-miao-red/30 rounded-full blur-3xl animate-pulse-slow"></div>
         <div className="absolute inset-10 bg-earth-gold/20 rounded-full blur-2xl"></div>
         
         {/* Halo ring */}
         <div className="absolute inset-0 border border-white/10 rounded-full scale-110 opacity-50"></div>
         <div className="absolute inset-0 border border-earth-gold/20 rounded-full scale-125 opacity-30 border-dashed animate-[spin_20s_linear_infinite]"></div>

         {/* The Fruit */}
         <div className="relative w-48 h-48 animate-float drop-shadow-2xl filter saturate-110">
            <BufunaGraphic className="w-full h-full" />
         </div>
      </div>

      {/* Action Button */}
      <div className="w-full max-w-xs pb-16 relative z-10">
        <button
          onClick={onStart}
          className="group w-full relative bg-gradient-to-r from-earth-gold to-yellow-600 text-forest-green font-bold text-lg py-4 px-8 rounded-full shadow-lg transform transition-all active:scale-95 hover:shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 -translate-x-full"></div>
          <span className="relative flex items-center justify-center gap-2">
            开始拔果 <span className="text-xl">➔</span>
          </span>
        </button>
        <p className="text-white/30 text-xs text-center mt-4 tracking-widest uppercase">PENG SHUI · MIAO CULTURE</p>
      </div>
    </div>
  );
};