import Phaser from 'phaser';
import { WALL_CONFIG } from '../utils/constants';

export default class Wall {
  constructor(scene, x, gapY, gapHeight, speed) {
    this.scene = scene;
    this.x = x; // 左边缘x坐标
    this.gapY = gapY;
    this.gapHeight = gapHeight;
    this.speed = speed;
    this.passed = false;
    
    // 随机小山坡风格 (0-3: 草丛, 花朵, 波浪, 圆点)
    this.hillStyle = Phaser.Math.Between(0, 3);
    
    const gameHeight = scene.cameras.main.height;
    
    // 上崖壁高度
    this.topHeight = gapY - gapHeight / 2;
    // 下崖壁y和高度
    this.bottomY = gapY + gapHeight / 2;
    this.bottomHeight = gameHeight - this.bottomY;
    
    // 创建图形和物理体
    this.createWalls();
    
    console.log('[Wall] 创建山坡', {
      x: this.x,
      gapY,
      gapHeight,
      topHeight: this.topHeight,
      bottomY: this.bottomY,
      style: this.hillStyle
    });
  }
  
  createWalls() {
    const x = this.x;
    
    // 上崖壁图形
    this.topGraphics = this.scene.add.graphics();
    this.drawWallGraphics(this.topGraphics, WALL_CONFIG.WIDTH, this.topHeight);
    this.topGraphics.setPosition(x, 0);
    
    // 下崖壁图形
    this.bottomGraphics = this.scene.add.graphics();
    this.drawWallGraphics(this.bottomGraphics, WALL_CONFIG.WIDTH, this.bottomHeight);
    this.bottomGraphics.setPosition(x, this.bottomY);
    
    // 物理体 - 使用Zone(不可见的碰撞区域)
    this.topZone = this.scene.add.zone(
      x + WALL_CONFIG.WIDTH / 2,
      this.topHeight / 2,
      WALL_CONFIG.WIDTH,
      this.topHeight
    );
    this.scene.physics.add.existing(this.topZone);
    this.topZone.body.setImmovable(true);
    this.topZone.body.setAllowGravity(false);
    this.topZone.body.setVelocityX(-this.speed);
    
    this.bottomZone = this.scene.add.zone(
      x + WALL_CONFIG.WIDTH / 2,
      this.bottomY + this.bottomHeight / 2,
      WALL_CONFIG.WIDTH,
      this.bottomHeight
    );
    this.scene.physics.add.existing(this.bottomZone);
    this.bottomZone.body.setImmovable(true);
    this.bottomZone.body.setAllowGravity(false);
    this.bottomZone.body.setVelocityX(-this.speed);
  }
  
  drawWallGraphics(graphics, width, height) {
    graphics.clear();
    
    // 翠绿色小山坡（清新自然系）
    
    // 主体 - 翠绿色渐变
    graphics.fillGradientStyle(
      0x98D98E, 0x88C97E, // 左侧翠绿到右侧深绿
      0x98D98E, 0x88C97E,
      1
    );
    graphics.fillRect(0, 0, width, height);
    
    // 顶部边缘 - 金黄色（草地感）
    graphics.fillStyle(0xF4E285, 1);
    graphics.fillRect(0, 0, width, 5);
    
    // 左侧高光
    graphics.fillStyle(0xB8E9AE, 0.8);
    graphics.fillRect(0, 0, 6, height);
    
    // 右侧阴影
    graphics.fillStyle(0x6BA86B, 0.5);
    graphics.fillRect(width - 6, 0, 6, height);
    
    // 添加装饰（减少数量）
    this.addHillDecorations(graphics, width, height);
  }
  
  addHillDecorations(graphics, width, height) {
    // 增加装饰数量，多种装饰随机出现
    const decorationCount = Phaser.Math.Between(3, 5); // 增加到3-5个
    
    for (let i = 0; i < decorationCount; i++) {
      const x = Phaser.Math.Between(15, width - 15);
      const y = Phaser.Math.Between(5, Math.min(height - 10, 120)); // 扩大范围
      
      // 随机选择装饰类型
      const decorationType = Math.floor(Math.random() * 4);
      
      switch (decorationType) {
        case 0: // 草丛
          this.drawGrass(graphics, x, y);
          break;
        case 1: // 小花
          this.drawFlower(graphics, x, y);
          break;
        case 2: // 小石子
          this.drawStone(graphics, x, y);
          break;
        case 3: // 小果实
          this.drawBerry(graphics, x, y);
          break;
      }
    }
  }
  
  drawGrass(graphics, x, y) {
    // 小草丛（金黄色）
    graphics.lineStyle(2, 0xF4E285, 1);
    for (let i = 0; i < 3; i++) {
      const offset = (i - 1) * 4;
      graphics.beginPath();
      graphics.moveTo(x + offset, y);
      graphics.lineTo(x + offset, y - 8);
      graphics.strokePath();
    }
  }
  
  drawFlower(graphics, x, y) {
    // 小花朵（橙色系）
    const colors = [0xFF9966, 0xFFCC66, 0xFFEE99];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // 花瓣
    graphics.fillStyle(color, 0.9);
    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 / 5) * i;
      const px = x + Math.cos(angle) * 4;
      const py = y + Math.sin(angle) * 4;
      graphics.fillCircle(px, py, 3);
    }
    
    // 花心
    graphics.fillStyle(0xFFD966, 1);
    graphics.fillCircle(x, y, 2);
  }
  
  drawStone(graphics, x, y) {
    // 小石子（灰色系）
    const stoneColor = [0x808080, 0x696969, 0xA9A9A9][Math.floor(Math.random() * 3)];
    
    // 主体石头（椭圆形）
    graphics.fillStyle(stoneColor, 0.8);
    graphics.fillEllipse(x, y, 6, 5);
    
    // 高光
    graphics.fillStyle(0xC0C0C0, 0.5);
    graphics.fillCircle(x - 1, y - 1, 2);
  }
  
  drawBerry(graphics, x, y) {
    // 小果实（红色系）
    const berryColors = [0xFF6B6B, 0xFF4757, 0xFF6348];
    const color = berryColors[Math.floor(Math.random() * berryColors.length)];
    
    // 果实主体
    graphics.fillStyle(color, 0.9);
    graphics.fillCircle(x, y, 3);
    
    // 高光
    graphics.fillStyle(0xFFFFFF, 0.7);
    graphics.fillCircle(x - 1, y - 1, 1.5);
    
    // 小叶子
    graphics.fillStyle(0x4CAF50, 1);
    graphics.fillTriangle(
      x, y - 3,
      x - 2, y - 5,
      x + 1, y - 4
    );
  }
  
  drawWave(graphics, x, y, width) {
    // 波浪纹理
    graphics.lineStyle(2, 0xFFB300, 0.3);
    graphics.beginPath();
    graphics.moveTo(5, y);
    
    for (let i = 0; i < width; i += 10) {
      const waveY = y + Math.sin(i * 0.5) * 3;
      graphics.lineTo(i, waveY);
    }
    graphics.strokePath();
  }
  
  drawDots(graphics, x, y) {
    // 小圆点装饰 (深绿色)
    graphics.fillStyle(0x5A9F5A, 0.5);
    graphics.fillCircle(x, y, 4);
    graphics.fillCircle(x + 8, y - 4, 3);
    graphics.fillCircle(x - 6, y + 3, 3);
  }
  
  update() {
    // 从物理Zone同步x坐标到图形
    if (this.topZone && this.topZone.body) {
      // Zone的x是中心点,转换为左边缘
      this.x = this.topZone.x - WALL_CONFIG.WIDTH / 2;
      
      // 同步图形位置
      this.topGraphics.x = this.x;
      this.bottomGraphics.x = this.x;
    }
  }
  
  isOffScreen() {
    // 完全离开左侧屏幕时才销毁
    return this.x + WALL_CONFIG.WIDTH < 0;
  }
  
  canDestroy() {
    // 优化销毁条件：
    // 1. 如果已穿越且完全离开屏幕，则销毁
    // 2. 如果未穿越但完全离开屏幕（异常情况），也应销毁
    const offScreen = this.isOffScreen();
    const canDestroy = this.passed || offScreen;
    
    if (canDestroy) {
      console.log('[Wall] ✅ 可以销毁', { 
        wallX: Math.round(this.x), 
        passed: this.passed, 
        offScreen 
      });
    }
    
    return canDestroy;
  }
  
  checkPass(playerX) {
    // 飞机中心点穿过山崖右边缘时计分
    const wallRightEdge = this.x + WALL_CONFIG.WIDTH;
    console.log('[Wall] 检查穿越 - 飞机:', Math.round(playerX), '山崖右边缘:', Math.round(wallRightEdge), '已穿越:', this.passed);
    
    // 添加额外的安全检查
    if (!this.passed && playerX > wallRightEdge) {
      this.passed = true;
      console.log('[Wall] ✅ 穿越成功!', { 
        playerX: Math.round(playerX), 
        wallRight: Math.round(wallRightEdge), 
        wallLeft: Math.round(this.x) 
      });
      
      // 开始淡出效果
      this.startFadeOut();
      
      return true;
    }
    
    // 如果已经穿越但仍在检查，记录日志
    if (this.passed && playerX > wallRightEdge) {
      console.log('[Wall] ⚠️ 已穿越的山崖再次被检查', {
        playerX: Math.round(playerX),
        wallRight: Math.round(wallRightEdge)
      });
    }
    
    return false;
  }
  
  startFadeOut() {
    // 淡出动画: 从 alpha=1 到 alpha=0
    if (this.scene && this.topGraphics && this.bottomGraphics) {
      this.scene.tweens.add({
        targets: [this.topGraphics, this.bottomGraphics],
        alpha: 0,
        duration: 1000, // 1秒淡出
        ease: 'Power2'
      });
      console.log('[Wall] 🌫️ 开始淡出动画');
    }
  }
  
  destroy() {
    if (this.topGraphics) this.topGraphics.destroy();
    if (this.bottomGraphics) this.bottomGraphics.destroy();
    if (this.topZone) this.topZone.destroy();
    if (this.bottomZone) this.bottomZone.destroy();
  }
  
  getTopZone() {
    return this.topZone;
  }
  
  getBottomZone() {
    return this.bottomZone;
  }
  
  // 获取精确的碰撞边界
  getTopBounds() {
    return new Phaser.Geom.Rectangle(
      this.x,
      0,
      WALL_CONFIG.WIDTH,
      this.topHeight
    );
  }
  
  getBottomBounds() {
    return new Phaser.Geom.Rectangle(
      this.x,
      this.bottomY,
      WALL_CONFIG.WIDTH,
      this.bottomHeight
    );
  }
}
