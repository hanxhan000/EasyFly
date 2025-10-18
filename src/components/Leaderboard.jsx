import React, { useEffect, useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import { fetchLeaderboard, formatDate } from '../utils/api';

export default function Leaderboard({ onClose }) {
  const { leaderboard, setLeaderboard } = useGameStore();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 从云端获取排行榜数据
    loadLeaderboard();
  }, []);
  
  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await fetchLeaderboard();
      setLeaderboard(data);
    } catch (error) {
      console.error('加载排行榜失败:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const data = leaderboard.length > 0 ? leaderboard : [];
  const dataTop10 = [...data].sort((a, b) => b.score - a.score).slice(0, 10);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-gray-800">
            🏆 全球Top10
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
          >
            ×
          </button>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-game-blue border-t-transparent"></div>
            <p className="mt-4 text-gray-600">加载中...</p>
          </div>
        ) : dataTop10.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">🏆 排行榜还没有记录</p>
            <p className="text-gray-400 text-sm mt-2">快来创造第一个记录吧！</p>
          </div>
        ) : (
          <div className="space-y-2">
            {dataTop10.map((entry, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-xl transition ${
                  index < 3
                ? 'bg-gradient-to-r from-yellow-50 to-white'
                : 'bg-gray-50 hover:bg-gray-100'
              }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`text-2xl font-bold ${
                    index === 0 ? 'text-yellow-500' :
                    index === 1 ? 'text-gray-400' :
                    index === 2 ? 'text-orange-600' :
                    'text-gray-600'
                  }`}>
                    {index === 0 ? '🥇' :
                     index === 1 ? '🥈' :
                     index === 2 ? '🥉' :
                     index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      {entry.playerName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(entry.date)}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold text-game-blue">
                      {entry.score.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <button
          onClick={onClose}
          className="mt-6 w-full btn-primary"
        >
          返回
        </button>
      </div>
    </div>
  );
}
