import React, { useEffect, useRef, useMemo } from 'react';
import PhaserGame from '../game/PhaserGame';
import { useGameStore } from '../stores/gameStore';

export default function GameCanvas({ phaserGameRef }) {
  const gameRef = useRef(null);
  // 传递Zustand store API（而非一次性快照），避免在Phaser场景中读取到旧值
  const gameStore = useGameStore; // 注意：不调用hook，直接传递store函数本身

  // 移动端检测（更稳健）
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
    // 移动端默认强制竖屏布局（仅设置状态，不改变系统旋转）
    if (isMobile) {
      try {
        useGameStore.getState().setOrientation('portrait');
      } catch {}
    }
    
    // 每次mount都创建新的Phaser实例（因为返回菜单时已销毁）
    if (gameRef.current && !phaserGameRef.current) {
      phaserGameRef.current = new PhaserGame(gameRef.current, gameStore);
      // 初始化后通知Phaser按移动端竖屏尺寸计算
      if (isMobile && phaserGameRef.current?.setOrientation) {
        phaserGameRef.current.setOrientation('portrait');
      }
    }
    
    return () => {
      // 不在这里销毁，由handleBackToMenu统一管理
    };
  }, []); // 只在mount时执行一次
  
  return (
    <div className="fixed inset-0">
      <div 
        ref={gameRef} 
        className="w-full h-full relative overflow-hidden"
        style={{
          touchAction: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          background: 'transparent'
        }}
      />
      {/* 移除移动端横竖屏切换按钮：需求为默认竖屏，无按钮 */}
    </div>
  );
}
