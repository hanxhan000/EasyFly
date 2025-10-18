import React, { useEffect, useRef } from 'react';
import PhaserGame from '../game/PhaserGame';
import { useGameStore } from '../stores/gameStore';

export default function GameCanvas({ phaserGameRef }) {
  const gameRef = useRef(null);
  // 传递Zustand store API（而非一次性快照），避免在Phaser场景中读取到旧值
  const gameStore = useGameStore; // 注意：不调用hook，直接传递store函数本身
  // UI层使用hook读取orientation与操作
  const { orientation, toggleOrientation } = useGameStore();
  
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
  
  // 监听orientation变化，通知Phaser调整尺寸
  useEffect(() => {
    if (phaserGameRef.current && phaserGameRef.current.setOrientation) {
      phaserGameRef.current.setOrientation(orientation);
    }
  }, [orientation]);
  
  return (
    <div className="relative w-full h-full">
      <div 
        ref={gameRef} 
        className="w-full h-screen flex items-center justify-center bg-sky-200 relative overflow-hidden"
        style={{
          touchAction: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none'
        }}
      />
      {/* 横竖屏切换按钮（移动端优先） */}
      <button
        onClick={toggleOrientation}
        className="absolute top-4 right-4 z-50 px-4 py-2 rounded-full shadow-md text-sm md:text-base"
        style={{
          background: 'linear-gradient(to right, #4A90E2, #357ABD)',
          color: 'white'
        }}
      >
        {orientation === 'portrait' ? '切到横屏' : '切到竖屏'}
      </button>
    </div>
  );
}
