import React, { useEffect, useRef } from 'react';
import PhaserGame from '../game/PhaserGame';
import { useGameStore } from '../stores/gameStore';

export default function GameCanvas({ phaserGameRef }) {
  const gameRef = useRef(null);
  const gameStore = useGameStore();
  
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
  
  return (
    <div 
      ref={gameRef} 
      className="w-full h-full flex items-center justify-center"
      style={{ minHeight: '600px' }}
    />
  );
}
