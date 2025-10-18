import { create } from 'zustand';
import { storage } from '../utils/storage';

export const useGameStore = create((set, get) => ({
  // 游戏状态
  isPlaying: false,
  isPaused: false,
  isGameOver: false,
  currentScore: 0,
  highScore: storage.getHighScore(),
  // 新增：UI方向（portrait/landscape）
  orientation: 'portrait',
  
  // 设置
  soundEnabled: storage.getSoundEnabled(),
  musicEnabled: storage.getMusicEnabled(),
  
  // 排行榜
  leaderboard: [],
  
  // 方法
  startGame: () => set({ 
    isPlaying: true, 
    isPaused: false, 
    isGameOver: false,
    currentScore: 0 
  }),
  
  pauseGame: () => set({ isPaused: true }),
  
  resumeGame: () => set({ isPaused: false }),
  
  endGame: () => {
    const { currentScore, highScore } = get();
    const newHighScore = Math.max(currentScore, highScore);
    
    if (newHighScore > highScore) {
      storage.setHighScore(newHighScore);
    }
    
    set({ 
      isPlaying: false, 
      isGameOver: true,
      highScore: newHighScore
    });
  },
  
  updateScore: (score) => set({ currentScore: score }),
  
  toggleSound: () => {
    const newValue = !get().soundEnabled;
    storage.setSoundEnabled(newValue);
    set({ soundEnabled: newValue });
  },
  
  toggleMusic: () => {
    const newValue = !get().musicEnabled;
    storage.setMusicEnabled(newValue);
    set({ musicEnabled: newValue });
  },
  
  resetGame: () => set({ 
    isPlaying: false, 
    isPaused: false, 
    isGameOver: false,
    currentScore: 0 
  }),
  
  setLeaderboard: (data) => set({ leaderboard: data }),
  
  // 新增：方向切换
  setOrientation: (o) => set({ orientation: o }),
  toggleOrientation: () => {
    const now = get().orientation;
    set({ orientation: now === 'portrait' ? 'landscape' : 'portrait' });
  }
}));
