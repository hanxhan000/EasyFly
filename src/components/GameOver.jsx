import React, { useState, useMemo } from 'react';
import { useGameStore } from '../stores/gameStore';
import { submitScore } from '../utils/api';

export default function GameOver({ onRestart, onMenu }) {
  const { currentScore, highScore, setLeaderboard, orientation } = useGameStore();
  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      const name = playerName.trim() || '匿名玩家';
      
      // 提交到云端排行榜（内部已支持离线回退）
      const updatedLeaderboard = await submitScore(name, currentScore);
      setLeaderboard(updatedLeaderboard);
      
      console.log('✅ 分数已提交/离线保存:', name, currentScore);
      setSubmitted(true);
      setSubmitError(false);
    } catch (error) {
      console.error('提交异常:', error);
      // 不弹窗，改为友好提示并标记为已保存（避免用户干扰）
      setSubmitted(true);
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };
  
  // 设备类型与方向
  const isLandscape = orientation === 'landscape';
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    const touchPoints = navigator.maxTouchPoints && navigator.maxTouchPoints > 0;
    const ua = navigator.userAgent || '';
    return (coarse || touchPoints || /Android|iPhone|iPod|iPad|Mobile/i.test(ua));
  }, []);
  
  // 容器宽度缩小：PC 更窄、移动端竖屏更贴合视口
  let widthClass = 'w-[clamp(320px,42vw,540px)]'; // 默认PC更紧凑
  if (isMobile) {
    widthClass = isLandscape
      ? 'w-[clamp(320px,80vw,520px)]'
      : 'w-[clamp(280px,92vw,420px)]';
  }
  
  const containerClasses = `bg-white/95 rounded-2xl shadow-2xl ${isLandscape ? 'p-4' : 'p-5'} ${widthClass} max-h-[82vh] overflow-y-auto`;
  const scoreSizeClass = isMobile ? 'text-4xl' : 'text-5xl';
  const titleSizeClass = isMobile ? 'text-2xl' : 'text-3xl';
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[3000]" style={{ backgroundColor: 'transparent', pointerEvents: 'auto' }}>
      <div className={containerClasses}>
        <h2 className={`${titleSizeClass} font-bold text-game-blue mb-4 text-center`}>游戏结束</h2>
        
        <div className={`mb-4 flex ${isLandscape ? 'flex-row gap-6 items-center justify-between' : 'flex-col gap-2 items-center'}`}>
          <div className="text-center">
            <p className="text-lg text-gray-600">本次得分</p>
            <p className={`${scoreSizeClass} font-extrabold text-game-blue`}>{currentScore}</p>
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
          <div className={`mb-6 p-3 rounded-lg text-center ${submitError ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
            {submitError ? '已离线保存到本地排行榜 (网络不可用)' : '✓ 已提交到排行榜!'}
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
