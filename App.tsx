import React, { useState } from 'react';
import { Background } from './components/Background';
import { LandingPage } from './components/LandingPage';
import { InteractionPage } from './components/InteractionPage';
import { ResultPage } from './components/ResultPage';
import { FRUITS_DATA } from './constants';
import { AppView, BufunaFruit } from './types';

function App() {
  const [view, setView] = useState<AppView>('landing');
  const [selectedFruit, setSelectedFruit] = useState<BufunaFruit | null>(null);

  // Transition to Interaction Page
  const handleStart = () => {
    setView('interacting');
  };

  // Logic when fruit is successfully pulled
  const handleFruitPulled = () => {
    // 1. Show Opening Animation State (optional, keeping it simple with direct transition for now, or short delay)
    setView('opening');
    
    // 2. Randomly select a fruit
    const randomIndex = Math.floor(Math.random() * FRUITS_DATA.length);
    setSelectedFruit(FRUITS_DATA[randomIndex]);

    // 3. Short delay to simulate "Opening" the fruit
    setTimeout(() => {
      setView('result');
    }, 1500); 
  };

  const handleReplay = () => {
    setSelectedFruit(null);
    setView('landing'); // Or go straight to 'interacting'
  };

  return (
    <Background opacity={1}>
      <div className="w-full h-full absolute inset-0 max-w-md mx-auto overflow-hidden">
        
        {view === 'landing' && (
          <LandingPage onStart={handleStart} />
        )}

        {view === 'interacting' && (
          <InteractionPage onSuccess={handleFruitPulled} />
        )}

        {view === 'opening' && (
          <div className="flex flex-col items-center justify-center h-full animate-pulse">
            <div className="text-6xl mb-4">✨</div>
            <p className="text-white text-xl font-serif">果实打开中...</p>
          </div>
        )}

        {view === 'result' && selectedFruit && (
          <ResultPage fruit={selectedFruit} onReplay={handleReplay} />
        )}
        
      </div>
    </Background>
  );
}

export default App;