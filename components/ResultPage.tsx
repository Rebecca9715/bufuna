import React, { useState } from 'react';
import { BufunaFruit } from '../types';

interface ResultPageProps {
  fruit: BufunaFruit;
  onReplay: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({ fruit, onReplay }) => {
  const [showShareTip, setShowShareTip] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: '拔一颗布福娜',
      text: `我在彭水拔到了一颗「${fruit.type}」\n${fruit.story}\n你会拔到哪一颗？`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        setShowShareTip(true);
        setTimeout(() => setShowShareTip(false), 3000);
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  return (
    <div className="relative w-full h-full overflow-y-auto overflow-x-hidden animate-fade-in-up">
      <div className="min-h-full flex flex-col p-6 pb-12">
        
        {/* Card */}
        <div className="flex-1 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl flex flex-col items-center text-center mt-4">
          
          {/* Fruit Header */}
          <div className="w-32 h-32 -mt-20 mb-6 relative">
             <img 
               src={fruit.imageUrl} 
               alt={fruit.type}
               className="w-full h-full object-cover rounded-full border-4 border-earth-gold shadow-lg"
             />
             <div className="absolute -bottom-2 -right-2 bg-earth-gold text-forest-green text-xs font-bold px-3 py-1 rounded-full">
               彭水好礼
             </div>
          </div>

          {/* Title Type */}
          <h2 className="text-2xl font-serif font-bold text-white mb-2">{fruit.type}</h2>
          
          {/* Tags */}
          <div className="flex gap-2 mb-6 flex-wrap justify-center">
            {fruit.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-forest-light/50 rounded-lg text-xs text-emerald-200 border border-white/10">
                #{tag}
              </span>
            ))}
          </div>

          {/* Story */}
          <div className="relative mb-8 p-6">
            <span className="absolute top-0 left-0 text-4xl text-white/10 font-serif">“</span>
            <p className="text-white/90 leading-relaxed font-light text-lg">
              {fruit.story}
            </p>
            <span className="absolute bottom-0 right-0 text-4xl text-white/10 font-serif">”</span>
          </div>

          <div className="w-full h-px bg-white/10 mb-6"></div>

          {/* Location */}
          <div className="w-full text-left mb-8">
            <p className="text-xs text-white/50 uppercase tracking-widest mb-2">遇见地点</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
                📍
              </div>
              <div>
                <p className="text-white font-medium">{fruit.location}</p>
                <p className="text-earth-gold text-sm cursor-pointer hover:underline">点击查看地图导览 &rarr;</p>
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons (Sticky-ish bottom) */}
        <div className="mt-8 space-y-4 w-full">
          <button 
            onClick={handleShare}
            className="w-full bg-miao-red text-white font-bold py-4 rounded-xl shadow-lg hover:bg-red-800 transition-colors flex items-center justify-center gap-2"
          >
            <span>📤</span> 分享我的布福娜
          </button>
          
          <button 
            onClick={onReplay}
            className="w-full bg-transparent border border-white/30 text-white py-4 rounded-xl hover:bg-white/10 transition-colors"
          >
            🔄 再拔一次
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {showShareTip && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-3 rounded-lg z-50 text-sm backdrop-blur-sm animate-fade-in-up">
          文案已复制，快去分享吧！
        </div>
      )}
    </div>
  );
};