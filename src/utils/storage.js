// 本地存储工具
const STORAGE_KEYS = {
  HIGH_SCORE: 'easyfly_high_score',
  SOUND_ENABLED: 'easyfly_sound_enabled',
  MUSIC_ENABLED: 'easyfly_music_enabled'
};

export const storage = {
  getHighScore: () => {
    return parseInt(localStorage.getItem(STORAGE_KEYS.HIGH_SCORE) || '0');
  },
  
  setHighScore: (score) => {
    localStorage.setItem(STORAGE_KEYS.HIGH_SCORE, score.toString());
  },
  
  getSoundEnabled: () => {
    const value = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);
    return value === null ? true : value === 'true';
  },
  
  setSoundEnabled: (enabled) => {
    localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, enabled.toString());
  },
  
  getMusicEnabled: () => {
    const value = localStorage.getItem(STORAGE_KEYS.MUSIC_ENABLED);
    return value === null ? true : value === 'true';
  },
  
  setMusicEnabled: (enabled) => {
    localStorage.setItem(STORAGE_KEYS.MUSIC_ENABLED, enabled.toString());
  }
};
