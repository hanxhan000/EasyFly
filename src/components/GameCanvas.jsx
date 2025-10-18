import React, { useEffect, useRef, useMemo } from 'react';
import PhaserGame from '../game/PhaserGame';
import { useGameStore } from '../stores/gameStore';

export default function GameCanvas({ phaserGameRef }) {
  const gameRef = useRef(null);
  // 传递Zustand store API（而非一次性快照），避免在Phaser场景中读取到旧值
  const gameStore = useGameStore; // 注意：不调用hook，直接传递store函数本身
  // UI层使用hook读取orientation与操作
  const { orientation, toggleOrientation } = useGameStore();

  // 仅在移动端显示横竖屏切换按钮（更稳健的检测）
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    const touchPoints = navigator.maxTouchPoints && navigator.maxTouchPoints > 0;
    const ua = navigator.userAgent || '';
    const mobileUA = /Android|iPhone|iPod|iPad|Mobile/i.test(ua);
    const narrow = window.innerWidth <= 900; // 视口较窄
    return (touchPoints || coarse || mobileUA) && narrow;
  }, []);
  
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
  
  // 监听orientation变化，移动端才通知Phaser调整尺寸；Web端保持整屏占用
  useEffect(() => {
    if (!isMobile) return;
    if (phaserGameRef.current && phaserGameRef.current.setOrientation) {
      phaserGameRef.current.setOrientation(orientation);
    }
  }, [orientation, isMobile]);
  
  return (
    <div className="relative w-full h-full">
      {/* 外层容器：桌面端增加左右留白，移动端占满宽度 */}
      <div className={isMobile ? 'relative w-full h-screen' : 'relative w-full h-screen max-w-[1200px] mx-auto px-6'}>
        <div 
          ref={gameRef} 
          className="w-full h-full flex items-center justify-center bg-sky-200 relative overflow-hidden"
          style={{
            touchAction: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none'
          }}
        />
        {/* 横竖屏切换按钮：仅移动端显示，并固定定位以保证可见性 */}
        {isMobile && (
          <button
            onClick={toggleOrientation}
            className="fixed top-4 right-4 z-[2000] px-4 py-2 rounded-full shadow-md text-sm md:text-base"
            style={{
              background: 'linear-gradient(to right, #4A90E2, #357ABD)',
              color: 'white',
              pointerEvents: 'auto'
            }}
          >
            {orientation === 'portrait' ? '切到横屏' : '切到竖屏'}
          </button>
        )}
      </div>
    </div>
  );
}
