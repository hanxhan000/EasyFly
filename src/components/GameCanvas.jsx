import React, { useEffect, useRef, useState } from 'react';
import PhaserGame from '../game/PhaserGame';
import { useGameStore } from '../stores/gameStore';

export default function GameCanvas({ phaserGameRef }) {
  const gameRef = useRef(null);
  const gameStore = useGameStore();
  const [isLandscape, setIsLandscape] = useState(false);
  
  useEffect(() => {
    console.log('[GameCanvas] useEffect 触发', { 
      hasGameRef: !!gameRef.current, 
      hasPhaserGame: !!phaserGameRef.current 
    });
    
    // 每次mount都创建新的Phaser实例（因为返回菜单时已销毁）
    if (gameRef.current && !phaserGameRef.current) {
      console.log('[GameCanvas] 创建Phaser游戏实例');
      phaserGameRef.current = new PhaserGame(gameRef.current, gameStore);
    }
    
    return () => {
      console.log('[GameCanvas] 组件unmount');
      // 不在这里销毁，由handleBackToMenu统一管理
    };
  }, []); // 只在mount时执行一次
  
  const toggleOrientation = () => {
    setIsLandscape(!isLandscape);
    // 这里可以添加实际的屏幕方向切换逻辑
    console.log('[GameCanvas] 切换方向:', isLandscape ? '竖屏' : '横屏');
  };
  
  return (
    <div className="relative w-full h-full">
      <div 
        ref={gameRef} 
        className="w-full h-screen flex items-center justify-center bg-sky-200 relative overflow-hidden"
        style={{
          touchAction: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          zIndex: 10
        }}
      />
      
      {/* 横屏/竖屏切换按钮 */}
      <button
        onClick={toggleOrientation}
        className="fixed top-4 right-4 z-50 bg-white bg-opacity-80 rounded-full p-3 shadow-lg hover:bg-opacity-100 transition-all"
        style={{
          backdropFilter: 'blur(10px)',
          zIndex: 1000
        }}
      >
        {isLandscape ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        )}
      </button>
    </div>
  );
}