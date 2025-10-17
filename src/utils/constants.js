// 游戏配置常量
export const GAME_CONFIG = {
  WIDTH: 800,
  HEIGHT: 600,
  PHYSICS: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  SCALE: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

// 玩家配置
export const PLAYER_CONFIG = {
  X: 100,
  SPEED: 300,
  SIZE: 40
};

// 崖壁配置
export const WALL_CONFIG = {
  WIDTH: 100,
  GAP_HEIGHT: 220, // 增加缺口高度,更容易穿越
  SPEED: 200, // 正常速度
  SPAWN_DISTANCE_MIN: 240, // 最小间距减小，增加随机性
  SPAWN_DISTANCE_MAX: 480, // 最大间距增大，增加随机性
  MIN_GAP_Y: 150,
  MAX_GAP_Y: 450
};

// 难度配置
export const DIFFICULTY_LEVELS = [
  { score: 0, speed: 200, gapHeight: 220, spawnDistanceMin: 240, spawnDistanceMax: 480 },
  { score: 20, speed: 220, gapHeight: 200, spawnDistanceMin: 220, spawnDistanceMax: 460 },
  { score: 40, speed: 240, gapHeight: 190, spawnDistanceMin: 200, spawnDistanceMax: 440 },
  { score: 60, speed: 260, gapHeight: 180, spawnDistanceMin: 180, spawnDistanceMax: 420 },
  { score: 80, speed: 280, gapHeight: 170, spawnDistanceMin: 160, spawnDistanceMax: 400 }
];

// 颜色配置 - 清新自然系
export const COLORS = {
  // 主色调：天空蓝 + 草地绿
  PLAYER: 0xFF9966, // 明亮橙色飞机（突出主角）
  WALL: 0x98D98E, // 翠绿色小山坡
  BACKGROUND_TOP: 0x87CEEB, // 浅蓝天空
  BACKGROUND_BOTTOM: 0xB0D4FF, // 淡紫蓝地平线
  SUN: 0xFFD966, // 柔和金色太阳
  CLOUD: 0xFFFFFF, // 白云
  GRASS: 0xF4E285, // 金黄草色
  BIRD: 0x7B9FAB, // 蓝灰色小鸟
  SCORE_TEXT: '#FFFFFF', // 白色分数
  SCORE_STROKE: '#FF6B35' // 橙色描边
};

// 分数配置
export const SCORE_CONFIG = {
  PASS_BONUS: 1, // 穿越1个山崖得1分
  TIME_BONUS: 0, // 不计时间分
  PERFECT_BONUS: 0
};
