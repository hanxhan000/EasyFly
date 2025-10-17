import React, { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import { submitScore } from '../utils/api';

export default function GameOver({ onRestart, onMenu }) {
  const { currentScore, highScore, setLeaderboard } = useGameStore();
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
  
  const percentile = Math.min(Math.floor((currentScore / 100) * 100), 99);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          游戏结束
        </h2>
        
        <div className="mb-8">
          <div className="text-center mb-4">
            <p className="text-gray-600 mb-2">本局分数</p>
            <p className="text-6xl font-bold text-game-blue">{currentScore}</p>
          </div>
          
          <div className="text-center mb-4">
            <p className="text-gray-600 mb-1">最高分</p>
            <p className="text-3xl font-semibold text-gray-700">{highScore}</p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-500">
              你击败了 <span className="text-game-blue font-semibold">{percentile}%</span> 的玩家
            </p>
          </div>
        </div>
        
        {!submitted && (
          <form onSubmit={handleSubmit} className="mb-6">
            <p className="text-center text-sm text-gray-600 mb-3">
              {currentScore >= 50 ? '🎉 恭喜!分数不错,留下你的大名吧' : '💪 继续加油!留下你的昵称吧'}
            </p>
            <div className="flex gap-2">
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
        
        <div className="flex gap-3">
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
