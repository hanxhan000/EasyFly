import React from 'react';
import { useGameStore } from '../stores/gameStore';

export default function MainMenu({ onStartGame, onShowLeaderboard }) {
  console.log('[MainMenu] 渲染主菜单');
  const { orientation } = useGameStore();
  const isLandscape = orientation === 'landscape';
  const containerClass = isLandscape ? 'flex-row gap-8' : 'flex-col gap-6';
  const logoSizeClass = isLandscape ? 'text-6xl' : 'text-7xl';
  const buttonWidthClass = isLandscape ? 'w-[220px] max-w-[80vw]' : 'w-[260px] max-w-[90vw]';
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'transparent' }}>
      <div className={`text-center flex ${containerClass} items-center px-4`}>        
        {/* 左侧区域：Logo与说明 */}
        <div className="mb-8">
          <h1 className={`${logoSizeClass} font-bold mb-4`} 
              style={{ 
                color: '#4A90E2',
                textShadow: '4px 4px 8px rgba(0,0,0,0.3), 0 0 20px rgba(74,144,226,0.5)'
              }}>
            EasyFly
          </h1>
          <p className="text-white text-xl" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            ✈️ 简约飞行躲避游戏
          </p>
        </div>
        
        {/* 右侧区域：按钮 */}
        <div className={`space-y-4 flex flex-col items-center ${isLandscape ? 'mt-0' : ''}`}>
          <button
            onClick={onStartGame}
            className={`text-xl px-8 py-4 ${buttonWidthClass} rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95`}
            style={{
              background: 'linear-gradient(to right, #4A90E2, #357ABD)',
              color: 'white'
            }}
          >
            🎮 开始游戏
          </button>
          
          <button
            onClick={onShowLeaderboard}
            className={`text-lg px-8 py-3 ${buttonWidthClass} rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95`}
            style={{
              backgroundColor: 'white',
              color: '#4A90E2'
            }}
          >
            🏆 排行榜
          </button>
        </div>
      </div>
      
      {/* 说明 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-sm" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
        <p>PC端: 按住鼠标左键或空格键向上飞</p>
        <p>移动端: 按住屏幕向上飞，松开下落</p>
      </div>
    </div>
  );
}
