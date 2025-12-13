import React from 'react';

export const BufunaGraphic = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="segmentGrad" cx="40%" cy="30%" r="70%">
        <stop offset="10%" stopColor="#FCA5A5" /> {/* Light Pink Highlight */}
        <stop offset="30%" stopColor="#E11D48" /> {/* Rose Red */}
        <stop offset="90%" stopColor="#881337" /> {/* Dark Red Shadow */}
      </radialGradient>
      <filter id="fruitGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    {/* Stem */}
    <path d="M120 25 Q130 5 145 15 L138 28 Q125 20 115 40 Z" fill="#92400E" stroke="#78350F" strokeWidth="2" />

    {/* Fruit Body - Aggregate Drupelets */}
    <g filter="url(#fruitGlow)">
        {/* Back layer (darker) to fill gaps */}
        <circle cx="100" cy="110" r="82" fill="#881337" />

        {/* Outer Ring Segments */}
        <g fill="url(#segmentGrad)" stroke="#9F1239" strokeWidth="1">
            <circle cx="100" cy="35" r="22" />
            <circle cx="145" cy="50" r="22" />
            <circle cx="170" cy="90" r="22" />
            <circle cx="165" cy="135" r="22" />
            <circle cx="135" cy="170" r="22" />
            <circle cx="90" cy="180" r="22" />
            <circle cx="50" cy="160" r="22" />
            <circle cx="28" cy="120" r="22" />
            <circle cx="30" cy="75" r="22" />
            <circle cx="60" cy="40" r="22" />
        </g>

        {/* Inner Ring Segments */}
        <g fill="url(#segmentGrad)" stroke="#9F1239" strokeWidth="1">
            <circle cx="100" cy="70" r="24" />
            <circle cx="135" cy="90" r="24" />
            <circle cx="130" cy="130" r="24" />
            <circle cx="95" cy="145" r="24" />
            <circle cx="60" cy="125" r="24" />
            <circle cx="65" cy="85" r="24" />
        </g>

        {/* Center Segment */}
        <circle cx="100" cy="108" r="25" fill="url(#segmentGrad)" stroke="#9F1239" strokeWidth="1" />
    </g>

    {/* Light Spots / Eyes on segments (The distinct feature of Bufuna) */}
    <g fill="#FEF3C7" opacity="0.8" style={{ mixBlendMode: 'screen' }}>
        {/* Corresponding to segments above */}
        <ellipse cx="100" cy="108" rx="8" ry="6" transform="rotate(-10 100 108)" />
        
        <ellipse cx="100" cy="70" rx="6" ry="4" />
        <ellipse cx="135" cy="90" rx="6" ry="4" />
        <ellipse cx="130" cy="130" rx="6" ry="4" />
        <ellipse cx="95" cy="145" rx="6" ry="4" />
        <ellipse cx="60" cy="125" rx="6" ry="4" />
        <ellipse cx="65" cy="85" rx="6" ry="4" />

        {/* Outer spots smaller */}
        <circle cx="100" cy="35" r="3" />
        <circle cx="145" cy="50" r="3" />
        <circle cx="170" cy="90" r="3" />
        <circle cx="165" cy="135" r="3" />
        <circle cx="135" cy="170" r="3" />
        <circle cx="90" cy="180" r="3" />
        <circle cx="50" cy="160" r="3" />
        <circle cx="28" cy="120" r="3" />
        <circle cx="30" cy="75" r="3" />
        <circle cx="60" cy="40" r="3" />
    </g>
  </svg>
);