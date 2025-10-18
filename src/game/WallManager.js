import Wall from './Wall';
import { WALL_CONFIG, DIFFICULTY_LEVELS, SCORE_CONFIG } from '../utils/constants';

export default class WallManager {
  constructor(scene) {
    this.scene = scene;
    this.walls = [];
    this.currentSpeed = WALL_CONFIG.SPEED;
    this.currentGapHeight = WALL_CONFIG.GAP_HEIGHT;
    this.currentSpawnDistanceMin = WALL_CONFIG.SPAWN_DISTANCE_MIN;
    this.currentSpawnDistanceMax = WALL_CONFIG.SPAWN_DISTANCE_MAX;
  }
  
  updateDifficulty(score) {
    // 根据分数调整难度
    for (let i = DIFFICULTY_LEVELS.length - 1; i >= 0; i--) {
      if (score >= DIFFICULTY_LEVELS[i].score) {
        this.currentSpeed = DIFFICULTY_LEVELS[i].speed;
        this.currentGapHeight = DIFFICULTY_LEVELS[i].gapHeight;
        this.currentSpawnDistanceMin = DIFFICULTY_LEVELS[i].spawnDistanceMin;
        this.currentSpawnDistanceMax = DIFFICULTY_LEVELS[i].spawnDistanceMax;
        break;
      }
    }
  }
  
  spawnWall() {
    const gameWidth = this.scene.cameras.main.width;
    const gameHeight = this.scene.cameras.main.height;
    
    // 获取飞机当前位置，如果没有飞机则使用中间位置
    const playerY = this.scene.player ? this.scene.player.y : gameHeight / 2;
    
    // 根据飞机位置智能调整缺口位置
    // 缺口位置倾向于飞机当前高度，但有一定随机性
    const targetGapY = Phaser.Math.Clamp(
      playerY + Phaser.Math.Between(-80, 80), // 在飞机位置上下80px范围随机
      WALL_CONFIG.MIN_GAP_Y,
      WALL_CONFIG.MAX_GAP_Y
    );
    
    const wall = new Wall(
      this.scene,
      gameWidth + WALL_CONFIG.WIDTH,
      targetGapY,
      this.currentGapHeight,
      this.currentSpeed
    );
    
    this.walls.push(wall);
    console.log('[WallManager] 生成崖壁', { 
      x: gameWidth + WALL_CONFIG.WIDTH, 
      gapY: Math.round(targetGapY),
      playerY: Math.round(playerY),
      gapHeight: this.currentGapHeight,
      wallsCount: this.walls.length 
    });
  }
  
  update(deltaTime, score) {
    // 更新难度
    this.updateDifficulty(score);
    
    // 基于距离生成山崖
    const gameWidth = this.scene.cameras.main.width;
    const shouldSpawn = this.shouldSpawnNewWall(gameWidth);
    
    if (shouldSpawn) {
      this.spawnWall();
    }
    
    // 更新所有崖壁
    for (let i = this.walls.length - 1; i >= 0; i--) {
      const wall = this.walls[i];
      wall.update();
      
      // 添加状态监控
      console.log('[WallManager] 山崖状态', {
        index: i,
        wallX: Math.round(wall.x),
        passed: wall.passed,
        offScreen: wall.isOffScreen(),
        canDestroy: wall.canDestroy()
      });
      
      // 只有穿越后且离开屏幕才销毁
      if (wall.canDestroy()) {
        console.log('[WallManager] 🗑️ 销毁山崖', { 
          wallX: Math.round(wall.x),
          passed: wall.passed,
          totalWalls: this.walls.length - 1 
        });
        wall.destroy();
        this.walls.splice(i, 1);
      }
    }
  }
  
  checkCollisions(player) {
    const playerBounds = player.getBounds();
    
    for (const wall of this.walls) {
      // 使用精确的边界检测
      const topBounds = wall.getTopBounds();
      const bottomBounds = wall.getBottomBounds();
      
      if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, topBounds)) {
        console.log('[WallManager] ⛔ 碰撞上崖壁!', {
          playerX: Math.round(player.x),
          playerY: Math.round(player.y),
          wallX: Math.round(wall.x)
        });
        return true;
      }
      
      if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, bottomBounds)) {
        console.log('[WallManager] ⛔ 碰撞下崖壁!', {
          playerX: Math.round(player.x),
          playerY: Math.round(player.y),
          wallX: Math.round(wall.x)
        });
        return true;
      }
    }
    return false;
  }
  
  checkPassed(playerX) {
    console.log('[WallManager] 检查穿越 - 飞机位置:', Math.round(playerX), '山崖数量:', this.walls.length);
    let scoreGained = 0;
    for (const wall of this.walls) {
      if (wall.checkPass(playerX)) {
        scoreGained += SCORE_CONFIG.PASS_BONUS; // 使用配置的分数(1分)
        console.log('[WallManager] 🏆 得分!', { 
          scoreGained, 
          PASS_BONUS: SCORE_CONFIG.PASS_BONUS,
          playerX: Math.round(playerX),
          wallX: Math.round(wall.x)
        });
      }
    }
    console.log('[WallManager] 总得分:', scoreGained);
    return scoreGained;
  }
  
  shouldSpawnNewWall(gameWidth) {
    // 如果没有山崖,生成第1个
    if (this.walls.length === 0) {
      return true;
    }
    
    // 获取最后一个(最右侧的)山崖
    const lastWall = this.walls[this.walls.length - 1];
    const lastWallRightEdge = lastWall.x + WALL_CONFIG.WIDTH;
    
    // 随机生成距离(增加变化性)
    const randomDistance = Phaser.Math.Between(
      this.currentSpawnDistanceMin,
      this.currentSpawnDistanceMax
    );
    
    // 当最后一个山崖离开屏幕右侧一定距离后,生成下一个
    const distanceFromRight = gameWidth - lastWallRightEdge;
    const shouldSpawn = distanceFromRight >= randomDistance;
    
    if (shouldSpawn) {
      console.log('[WallManager] 🎯 达到生成条件', {
        lastWallX: Math.round(lastWall.x),
        distanceFromRight: Math.round(distanceFromRight),
        randomDistance: randomDistance
      });
    }
    
    return shouldSpawn;
  }
  
  reset() {
    for (const wall of this.walls) {
      wall.destroy();
    }
    this.walls = [];
    this.currentSpeed = WALL_CONFIG.SPEED;
    this.currentGapHeight = WALL_CONFIG.GAP_HEIGHT;
    this.currentSpawnDistanceMin = WALL_CONFIG.SPAWN_DISTANCE_MIN;
    this.currentSpawnDistanceMax = WALL_CONFIG.SPAWN_DISTANCE_MAX;
  }
}
