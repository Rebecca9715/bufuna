import React, { useState, useRef, useEffect } from 'react';
import { BufunaGraphic } from './BufunaGraphic';

interface InteractionPageProps {
  onSuccess: () => void;
}

export const InteractionPage: React.FC<InteractionPageProps> = ({ onSuccess }) => {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  
  // Configuration
  const TARGET_DURATION = 2000; // 2 seconds to pull

  const animate = (time: number) => {
    if (!startTimeRef.current) startTimeRef.current = time;
    const elapsed = time - startTimeRef.current;
    
    // Calculate progress percentage
    const newProgress = Math.min((elapsed / TARGET_DURATION) * 100, 100);
    setProgress(newProgress);

    if (newProgress < 100) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      // Complete!
      handleSuccess();
    }
  };

  const handleSuccess = () => {
    setIsHolding(false);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    // Add a small delay for the 100% visual to register
    setTimeout(() => {
        onSuccess();
    }, 200);
  };

  const startHolding = (e: React.TouchEvent | React.MouseEvent) => {
    // Prevent context menu on long press
    e.preventDefault(); 
    setIsHolding(true);
    startTimeRef.current = 0;
    requestRef.current = requestAnimationFrame(animate);
  };

  const stopHolding = () => {
    setIsHolding(false);
    setProgress(0);
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Calculate scale based on progress (breathing effect + growth)
  const scale = 1 + (progress / 100) * 0.2;
  const shakeClass = isHolding && progress > 50 ? 'animate-shake' : '';

  return (
    <div 
      className="flex flex-col items-center justify-center h-full w-full relative touch-none select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Instructions */}
      <div className={`absolute top-24 transition-opacity duration-500 ${isHolding ? 'opacity-0' : 'opacity-100'}`}>
        <p className="text-white/80 text-xl tracking-widest font-serif drop-shadow-md">
          长按果实拔出
        </p>
        <p className="text-white/40 text-xs text-center mt-2">HOLD TO PULL</p>
      </div>

      {/* Progress Ring Background */}
      <div className="relative w-72 h-72 flex items-center justify-center">
        {/* Ring SVGs */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none">
          {/* Track */}
          <circle
            cx="144"
            cy="144"
            r="130"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="2"
            fill="transparent"
          />
          {/* Progress Indicator */}
          <circle
            cx="144"
            cy="144"
            r="130"
            stroke="#C5A065"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 130}
            strokeDashoffset={2 * Math.PI * 130 * (1 - progress / 100)}
            strokeLinecap="round"
            className="transition-all duration-75 ease-linear drop-shadow-[0_0_10px_rgba(197,160,101,0.5)]"
          />
        </svg>

        {/* The Fruit Interaction Target */}
        <div
            className={`w-56 h-56 cursor-pointer relative z-10 transition-transform duration-100 ease-out ${shakeClass}`}
            style={{ transform: `scale(${scale})` }}
            onTouchStart={startHolding}
            onTouchEnd={stopHolding}
            onMouseDown={startHolding}
            onMouseUp={stopHolding}
            onMouseLeave={stopHolding}
        >
            {/* New SVG Graphic */}
            <div className="w-full h-full filter drop-shadow-2xl">
              <BufunaGraphic className="w-full h-full" />
            </div>
            
            {/* Feedback text overlay */}
            {isHolding && (
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <span className="text-white font-bold text-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-widest">
                         {progress > 80 ? '用力!' : '拔...'}
                     </span>
                 </div>
            )}
        </div>
      </div>

      {/* Visual Feedback Particles / Effects */}
      {isHolding && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Outer ripple */}
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
            {/* Inner glow intensity */}
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-earth-gold/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        </div>
      )}

    </div>
  );
};