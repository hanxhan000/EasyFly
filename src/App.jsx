import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from './stores/gameStore';
import GameCanvas from './components/GameCanvas';
import MainMenu from './components/MainMenu';
import GameOver from './components/GameOver';
import Leaderboard from './components/Leaderboard';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('menu'); // menu, game, leaderboard
  const gameStore = useGameStore();
  const { isGameOver, resetGame, isPlaying, startGame } = gameStore;
  const phaserGameRef = useRef(null); // 存储Phaser游戏实例引用
  
  console.log('[App] 组件渲染', { currentView, isGameOver, isPlaying });
  
  // 确保初始状态正确
  useEffect(() => {
    console.log('[App] 组件Mount,确保为菜单状态');
    resetGame();
    // 强制设置为菜单
    setCurrentView('menu');
  }, []); // 只在mount时执行一次
  
  useEffect(() => {
    console.log('[App] 状态变化:', { currentView, isGameOver, isPlaying });
  }, [isGameOver, currentView, isPlaying]);
  
  const handleStartGame = () => {
    console.log('[App] 开始游戏');
    
    // 1. 先重置状态
    resetGame();
    
    // 2. 立即启动游戏状态
    startGame();
    
    // 3. 最后切换视图（触发GameCanvas mount）
    setCurrentView('game');
  };
  
  const handleShowLeaderboard = () => {
    console.log('[App] 显示排行榜');
    setCurrentView('leaderboard');
  };
  
  const handleBackToMenu = () => {
    console.log('[App] 返回菜单 - 完全销毁Phaser实例');
    
    // 1. 先重置游戏状态
    resetGame();
    
    // 2. 完全销毁Phaser实例（像重新访问游戏）
    if (phaserGameRef.current) {
      console.log('[App] 销毁Phaser实例');
      if (phaserGameRef.current.destroy) {
        phaserGameRef.current.destroy();
      }
      phaserGameRef.current = null; // 清空引用
    }
    
    // 3. 切换视图
    setCurrentView('menu');
  };
  
  const handleRestart = () => {
    console.log('[App] 重启游戏');
    
    // 1. 重置游戏状态
    resetGame();
    
    // 2. 启动游戏状态
    startGame();
    
    // 3. 重启Phaser场景
    if (phaserGameRef.current && phaserGameRef.current.restart) {
      phaserGameRef.current.restart();
    }
  };
  
  return (
    <div className="w-full h-full min-h-screen overflow-hidden relative flex flex-col">
      
      {/* 游戏画布 */}
      {currentView === 'game' && (
        <div className="w-full h-full flex-1">
          <GameCanvas phaserGameRef={phaserGameRef} />
        </div>
      )}
      
      {/* 主菜单 */}
      {currentView === 'menu' && (
        <MainMenu
          onStartGame={handleStartGame}
          onShowLeaderboard={handleShowLeaderboard}
        />
      )}
      
      {/* 排行榜 */}
      {currentView === 'leaderboard' && (
        <Leaderboard onClose={handleBackToMenu} />
      )}
      
      {/* 游戏结束界面 */}
      {isGameOver && currentView === 'game' && (
        <GameOver
          onRestart={handleRestart}
          onMenu={handleBackToMenu}
        />
      )}
      
      {/* 版权信息 */}
      <div className="fixed bottom-4 right-4 text-white text-sm opacity-50" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
        Made by hanxhan000
      </div>
    </div>
  );
}

export default App;
