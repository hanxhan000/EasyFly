import React, { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import { submitScore } from '../utils/api';

export default function GameOver({ onRestart, onMenu }) {
  const { currentScore, highScore, setLeaderboard, orientation } = useGameStore();
  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      const name = playerName.trim() || '匿名玩家';
      
      // 提交到云端排行榜
      const updatedLeaderboard = await submitScore(name, currentScore);
      setLeaderboard(updatedLeaderboard);
      
      console.log('✅ 分数已提交:', name, currentScore);
      setSubmitted(true);
    } catch (error) {
      console.error('提交失败:', error);
      alert('提交失败,请稍后再试');
    } finally {
      setSubmitting(false);
    }
  };
  
  // 容器宽高比例：根据方向与视口自适应，避免移动端遮挡
  const isLandscape = orientation === 'landscape';
  const containerClasses = `bg-white/95 rounded-2xl shadow-2xl ${isLandscape ? 'p-5' : 'p-6'} ` +
    `${isLandscape ? 'max-w-[70vw]' : 'max-w-[90vw]'} ` +
    'w-[clamp(340px,70vw,720px)] max-h-[85vh] overflow-y-auto';
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[3000]" style={{ backgroundColor: 'transparent', pointerEvents: 'auto' }}>
      <div className={containerClasses}>
        <h2 className="text-3xl font-bold text-game-blue mb-4 text-center">游戏结束</h2>
        
        <div className={`mb-4 flex ${isLandscape ? 'flex-row gap-6 items-center justify-between' : 'flex-col gap-2 items-center'}`}>
          <div className="text-center">
            <p className="text-lg text-gray-600">本次得分</p>
            <p className="text-5xl font-extrabold text-game-blue">{currentScore}</p>
          </div>
          <div className="text-center">
            <p className="text-lg text-gray-600">最高纪录</p>
            <p className="text-3xl font-bold text-orange-500">{highScore}</p>
          </div>
        </div>
        
        {!submitted && (
          <form onSubmit={handleSubmit} className="mb-4">
            <label className="block mb-2 text-gray-700">提交到排行榜(可选)</label>
            <div className={`flex ${isLandscape ? 'flex-row gap-3' : 'flex-col gap-3'}`}>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value.slice(0, 10))}
                placeholder="输入昵称(可选)"
                maxLength={10}
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-full focus:border-game-blue focus:outline-none"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-game-blue text-white rounded-full font-semibold hover:bg-game-blue-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ minWidth: 120 }}
              >
                {submitting ? '提交中...' : '提交'}
              </button>
            </div>
          </form>
        )}
        
        {submitted && (
          <div className="mb-6 p-3 bg-green-100 text-green-700 rounded-lg text-center">
            ✓ 已提交到排行榜!
          </div>
        )}
        
        <div className={`flex ${isLandscape ? 'flex-row gap-3' : 'flex-col gap-3'}`}>
          <button
            onClick={onRestart}
            className="flex-1 btn-primary"
          >
            再来一次
          </button>
          <button
            onClick={onMenu}
            className="flex-1 btn-secondary"
          >
            返回菜单
          </button>
        </div>
      </div>
    </div>
  );
}
