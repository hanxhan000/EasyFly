import React from 'react';

export default function MainMenu({ onStartGame, onShowLeaderboard }) {
  console.log('[MainMenu] 渲染主菜单');
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'transparent' }}>
      <div className="text-center">
        {/* Logo */}
        <div className="mb-12">
          <h1 className="text-7xl font-bold mb-4" 
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
        
        {/* 按钮 */}
        <div className="space-y-4 flex flex-col items-center">
          <button
            onClick={onStartGame}
            className="text-xl px-12 py-4 w-64 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(to right, #4A90E2, #357ABD)',
              color: 'white'
            }}
          >
            🎮 开始游戏
          </button>
          
          <button
            onClick={onShowLeaderboard}
            className="text-lg px-10 py-3 w-64 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: 'white',
              color: '#4A90E2'
            }}
          >
            🏆 排行榜
          </button>
        </div>
        
        {/* 说明 */}
        <div className="mt-12 text-white text-sm" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          <p>PC端: 按住鼠标左键或空格键向上飞</p>
          <p>移动端: 按住屏幕向上飞，松开下落</p>
        </div>
      </div>
    </div>
  );
}
