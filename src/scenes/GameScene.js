import Phaser from 'phaser';
import Player from '../game/Player';
import WallManager from '../game/WallManager';
import { PLAYER_CONFIG, SCORE_CONFIG, WALL_CONFIG } from '../utils/constants';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }
  
  init(data) {
    this.gameStore = data.gameStore;
  }
  
  create() {
    console.log('[GameScene] 创建游戏场景');
    
    // 背景
    this.createBackground();
    
    // 创建玩家（使用实际画布高度）
    const actualHeight = this.cameras.main.height;
    this.player = new Player(
      this,
      PLAYER_CONFIG.X,
      actualHeight / 2
    );
    
    console.log('[GameScene] 飞机创建完成');
    
    // 创建崖壁管理器
    this.wallManager = new WallManager(this);
    
    // 分数显示（从 gameStore 读取）
    this.scoreText = this.add.text(
      this.game.config.width / 2,
      50,
      this.gameStore.currentScore.toString(),
      {
        fontSize: '64px',
        fontFamily: 'Poppins',
        color: '#FFFFFF',
        stroke: '#FF6B35',
        strokeThickness: 6
      }
    ).setOrigin(0.5);
    
    // 输入处理
    this.setupInput();
    
    // 游戏状态
    this.isGameActive = true;
    
    console.log('[GameScene] 游戏场景初始化完成');
  }
  
  createBackground() {
    console.log('[GameScene] 创建背景');
    
    // 清新自然系 - 浅蓝到淡紫蓝渐变（使用实际画布尺寸）
    const graphics = this.add.graphics();
    const actualWidth = this.cameras.main.width;
    const actualHeight = this.cameras.main.height;
    graphics.fillGradientStyle(
      0x87CEEB, 0x87CEEB, // 上方浅蓝
      0xB0D4FF, 0xB0D4FF, // 下方淡紫蓝
      1
    );
    graphics.fillRect(0, 0, actualWidth, actualHeight);
    
    // 太阳 (右上角)
    this.createSun();
    
    // 白云 (多层次)
    this.createClouds();
    
    // 小鸟 (飞翔动画)
    this.createBirds();
    
    console.log('[GameScene] 背景创建完成');
  }
  
  createSun() {
    const sun = this.add.graphics();
    const gameWidth = this.cameras.main.width;
    const gameHeight = this.cameras.main.height;
    const sunRadius = 85; // 太阳最大半径（含光晕）
    
    const startX = gameWidth - 100; // 右侧起始位置
    const startY = sunRadius + 20;  // 上方起始位置，确保不超出屏幕
    
    sun.setPosition(startX, startY);
    
    // 储存太阳引用和表情状态
    this.sun = sun;
    this.sunExpression = 'happy'; // 初始表情：happy, wink, smile, excited
    
    // 初始绘制太阳
    this.drawSun();
    
    // 太阳旋转动画
    this.tweens.add({
      targets: sun,
      angle: 360,
      duration: 50000,
      repeat: -1,
      ease: 'Linear'
    });
    
    // 轻微缩放动画
    this.tweens.add({
      targets: sun,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // 水平慢速移动（左右来回，始终在屏幕内）
    this.tweens.add({
      targets: sun,
      x: sunRadius + 20, // 从右侧移动到左侧，留20px边距
      duration: 30000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // 垂直慢速移动（上下来回，始终在屏幕内）
    this.tweens.add({
      targets: sun,
      y: gameHeight - sunRadius - 20, // 从上方移动到下方，留20px边距
      duration: 40000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // 定期改变表情（3-5秒随机切换）
    this.time.addEvent({
      delay: 3000,
      callback: () => {
        if (this.sun && this.sun.active) {
          // 随机选择表情
          const expressions = ['happy', 'wink', 'smile', 'excited'];
          this.sunExpression = expressions[Math.floor(Math.random() * expressions.length)];
          this.drawSun();
        }
      },
      loop: true,
      callbackScope: this
    });
  }
  
  drawSun() {
    if (!this.sun) return;
    
    this.sun.clear();
    
    // 外圈光晕 (更大更柔和)
    this.sun.fillStyle(0xFFE066, 0.25);
    this.sun.fillCircle(0, 0, 70);
    this.sun.fillStyle(0xFFE066, 0.15);
    this.sun.fillCircle(0, 0, 85);
    
    // 主体
    this.sun.fillStyle(0xFFD966, 1); // 柔和金色
    this.sun.fillCircle(0, 0, 50);
    
    // 内圈高光
    this.sun.fillStyle(0xFFEB3B, 0.9);
    this.sun.fillCircle(-8, -8, 12);
    
    // 太阳光芒
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 / 12) * i;
      const x2 = Math.cos(angle) * 50;
      const y2 = Math.sin(angle) * 50;
      
      this.sun.fillStyle(0xFFD966, 0.6);
      this.sun.fillTriangle(
        Math.cos(angle - 0.12) * 38,
        Math.sin(angle - 0.12) * 38,
        Math.cos(angle + 0.12) * 38,
        Math.sin(angle + 0.12) * 38,
        x2, y2
      );
    }
    
    // 根据表情状态绘制不同的脸部
    this.sun.fillStyle(0xFF8C42, 1);
    
    switch (this.sunExpression) {
      case 'happy':
        this.drawSunFaceHappy();
        break;
      case 'wink':
        this.drawSunFaceWink();
        break;
      case 'smile':
        this.drawSunFaceSmile();
        break;
      case 'excited':
        this.drawSunFaceExcited();
        break;
      default:
        this.drawSunFaceHappy();
    }
  }
  
  drawSunFaceHappy() {
    // 开心表情 - 两只圆眼睛 + 弯弯的笑嘴
    this.sun.fillStyle(0xFF8C42, 1);
    
    // 眼睛
    this.sun.fillCircle(-10, -5, 3);
    this.sun.fillCircle(10, -5, 3);
    
    // 眼睛高光
    this.sun.fillStyle(0xFFFFFF, 0.8);
    this.sun.fillCircle(-9, -6, 1.5);
    this.sun.fillCircle(11, -6, 1.5);
    
    // 开心的大笑嘴
    this.sun.lineStyle(3, 0xFF8C42);
    this.sun.beginPath();
    this.sun.arc(0, 5, 12, 0.2, Math.PI - 0.2);
    this.sun.strokePath();
    
    // 脸红
    this.sun.fillStyle(0xFFB4A2, 0.5);
    this.sun.fillCircle(-22, 3, 5);
    this.sun.fillCircle(22, 3, 5);
  }
  
  drawSunFaceWink() {
    // 眨眼表情 - 一只眼睛眨起来 + 俏皮笑嘴
    this.sun.fillStyle(0xFF8C42, 1);
    
    // 左眼（睁开）
    this.sun.fillCircle(-10, -5, 3);
    this.sun.fillStyle(0xFFFFFF, 0.8);
    this.sun.fillCircle(-9, -6, 1.5);
    
    // 右眼（眨眼 - 用弧线表示）
    this.sun.lineStyle(3, 0xFF8C42);
    this.sun.beginPath();
    this.sun.arc(10, -5, 3, 0, Math.PI);
    this.sun.strokePath();
    
    // 俏皮的笑嘴（略微倾斜）
    this.sun.lineStyle(3, 0xFF8C42);
    this.sun.beginPath();
    this.sun.arc(2, 6, 10, 0.3, Math.PI - 0.3);
    this.sun.strokePath();
    
    // 脸红
    this.sun.fillStyle(0xFFB4A2, 0.6);
    this.sun.fillCircle(-22, 3, 6);
    this.sun.fillCircle(22, 3, 6);
  }
  
  drawSunFaceSmile() {
    // 微笑表情 - 眪眯眼 + 温柔笑嘴
    this.sun.fillStyle(0xFF8C42, 1);
    
    // 眪眯眼（用弧线表示）
    this.sun.lineStyle(3, 0xFF8C42);
    this.sun.beginPath();
    this.sun.arc(-10, -5, 4, 0.3, Math.PI - 0.3);
    this.sun.strokePath();
    
    this.sun.beginPath();
    this.sun.arc(10, -5, 4, 0.3, Math.PI - 0.3);
    this.sun.strokePath();
    
    // 温柔的小笑嘴
    this.sun.lineStyle(2.5, 0xFF8C42);
    this.sun.beginPath();
    this.sun.arc(0, 4, 10, 0.4, Math.PI - 0.4);
    this.sun.strokePath();
    
    // 脸红
    this.sun.fillStyle(0xFFB4A2, 0.4);
    this.sun.fillCircle(-22, 3, 5);
    this.sun.fillCircle(22, 3, 5);
  }
  
  drawSunFaceExcited() {
    // 兴奋表情 - 大大的星星眼 + O型嘴
    this.sun.fillStyle(0xFF8C42, 1);
    
    // 星星眼
    this.drawStar(this.sun, -10, -5, 5, 4, 2);
    this.drawStar(this.sun, 10, -5, 5, 4, 2);
    
    // O型惊喜嘴
    this.sun.fillStyle(0xFF8C42, 1);
    this.sun.fillCircle(0, 8, 5);
    this.sun.fillStyle(0xFFD966, 1);
    this.sun.fillCircle(0, 8, 3);
    
    // 脸红（更明显）
    this.sun.fillStyle(0xFFB4A2, 0.7);
    this.sun.fillCircle(-22, 3, 7);
    this.sun.fillCircle(22, 3, 7);
  }
  
  drawStar(graphics, x, y, points, outer, inner) {
    graphics.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outer : inner;
      const angle = (Math.PI / points) * i - Math.PI / 2;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      if (i === 0) {
        graphics.moveTo(px, py);
      } else {
        graphics.lineTo(px, py);
      }
    }
    graphics.closePath();
    graphics.fillPath();
  }
  
  createClouds() {
    // 创建多层云朵,远近不同
    const cloudLayers = [
      { count: 4, y: [60, 140], alpha: 0.5, speed: 30000, size: 1.3 }, // 远处
      { count: 5, y: [120, 240], alpha: 0.75, speed: 20000, size: 1.0 }, // 中层
      { count: 4, y: [180, 300], alpha: 0.95, speed: 14000, size: 0.85 }  // 近处
    ];
    
    cloudLayers.forEach(layer => {
      for (let i = 0; i < layer.count; i++) {
        const cloud = this.add.graphics();
        const x = Phaser.Math.Between(0, this.game.config.width);
        const y = Phaser.Math.Between(layer.y[0], layer.y[1]);
        
        this.drawCloud(cloud, 0, 0, layer.size, layer.alpha);
        cloud.setPosition(x, y);
        
        // 云朵缓慢移动 (循环)
        this.tweens.add({
          targets: cloud,
          x: this.game.config.width + 120,
          duration: layer.speed,
          repeat: -1,
          ease: 'Linear',
          onRepeat: () => {
            cloud.x = -120;
          }
        });
      }
    });
  }
  
  drawCloud(graphics, x, y, scale = 1, alpha = 0.9) {
    graphics.fillStyle(0xFFFFFF, alpha);
    
    // 更大更蓬松的云朵形状
    const s = 40 * scale;
    graphics.fillCircle(x, y, s);
    graphics.fillCircle(x - s * 0.7, y + s * 0.25, s * 0.75);
    graphics.fillCircle(x + s * 0.7, y + s * 0.25, s * 0.75);
    graphics.fillCircle(x - s * 0.4, y - s * 0.3, s * 0.65);
    graphics.fillCircle(x + s * 0.4, y - s * 0.3, s * 0.65);
    graphics.fillCircle(x, y - s * 0.4, s * 0.55);
  }
  
  createBirds() {
    // 创建3-4只随机数量的蓝灰色小鸟
    const birdCount = Phaser.Math.Between(3, 4);
    
    for (let i = 0; i < birdCount; i++) {
      const bird = this.add.graphics();
      const x = Phaser.Math.Between(200, this.game.config.width - 200);
      const y = Phaser.Math.Between(80, 280);
      
      bird.setPosition(x, y);
      bird.setDepth(10); // 确保小鸟在云朵之上
      
      // 小鸟形状 (更大更可爱的V字形)
      this.drawBird(bird, 0, 0, i % 2 === 0);
      
      // 飞翔动画 (上下波动 + 水平移动)
      this.tweens.add({
        targets: bird,
        y: y + Phaser.Math.Between(-40, 40),
        duration: 2500 + i * 600,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
      
      this.tweens.add({
        targets: bird,
        x: this.game.config.width + 80,
        duration: 18000 + i * 4000,
        repeat: -1,
        ease: 'Linear',
        onRepeat: () => {
          bird.x = -80;
          bird.y = Phaser.Math.Between(80, 280);
        }
      });
      
      // 翅膀扇动动画
      this.time.addEvent({
        delay: 250,
        callback: () => {
          if (bird.active) {
            bird.clear();
            this.drawBird(bird, 0, 0, Math.random() > 0.5);
          }
        },
        loop: true
      });
    }
  }
  
  drawBird(graphics, x, y, wingUp = false) {
    // 蓝灰色小鸟设计（融入天空）
    
    // 鸟身体
    graphics.fillStyle(0x7B9FAB, 1); // 蓝灰色
    graphics.fillEllipse(x, y, 12, 9);
    
    // 鸟头
    graphics.fillStyle(0x95B3BF, 1); // 浅蓝灰
    graphics.fillCircle(x + 8, y - 2, 6);
    
    // 嘴巴
    graphics.fillStyle(0xFF9966, 1); // 橙色
    graphics.fillTriangle(
      x + 12, y - 2,
      x + 16, y - 3,
      x + 16, y - 1
    );
    
    // 眼睛
    graphics.fillStyle(0x000000, 1);
    graphics.fillCircle(x + 10, y - 3, 1.5);
    
    // 眼睛高光
    graphics.fillStyle(0xFFFFFF, 0.8);
    graphics.fillCircle(x + 10.5, y - 3.5, 0.8);
    
    // 翅膀
    const wingColor = 0x5A7F8A; // 深蓝灰
    
    graphics.lineStyle(3, wingColor, 1);
    graphics.beginPath();
    graphics.moveTo(x - 8, y);
    graphics.lineTo(x - 2, y - 6 + (wingUp ? -3 : 0));
    graphics.lineTo(x + 4, y);
    graphics.strokePath();
    
    // 尾巴
    graphics.lineStyle(2, wingColor, 1);
    graphics.beginPath();
    graphics.moveTo(x - 10, y + 2);
    graphics.lineTo(x - 14, y + 4);
    graphics.strokePath();
  }
  
  setupInput() {
    // 鼠标/触摸输入 - Flappy Bird风格
    this.input.on('pointerdown', () => {
      if (this.isGameActive) {
        this.player.fly(); // 开始向上飞
      }
    });
    
    this.input.on('pointerup', () => {
      if (this.isGameActive) {
        this.player.stopFly(); // 停止向上,开始下落
      }
    });
    
    // 键盘输入(PC端调试) - 空格键
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    // 空格键按下时向上
    this.spaceKey.on('down', () => {
      if (this.isGameActive) {
        this.player.fly();
      }
    });
    
    // 空格键松开时下落
    this.spaceKey.on('up', () => {
      if (this.isGameActive) {
        this.player.stopFly();
      }
    });
  }
  
  update(time, delta) {
    if (!this.isGameActive) return;
    
    // 更新玩家 - 传入delta
    this.player.update(delta);
    
    // 更新崖壁（使用 gameStore 中的分数）
    this.wallManager.update(delta, this.gameStore.currentScore);
    
    // 检查边界碰撞 (飞机碰到顶部或底部) - 使用实际画布高度
    const gameHeight = this.cameras.main.height;
    if (this.player.y <= this.player.size / 2 || this.player.y >= gameHeight - this.player.size / 2) {
      console.log('[GameScene] ⛔ 飞机碰到边界!', { 
        y: Math.round(this.player.y), 
        top: this.player.size / 2, 
        bottom: gameHeight - this.player.size / 2 
      });
      this.gameOver();
      return;
    }
    
    // 检查山崖碰撞
    if (this.wallManager.checkCollisions(this.player)) {
      this.gameOver();
      return;
    }
    
    // 检查穿越 (只计算穿越山崖个数,不计时间分)
    console.log('[GameScene] 检查穿越 - 飞机位置:', Math.round(this.player.x));
    const passScore = this.wallManager.checkPassed(this.player.x);
    if (passScore > 0) {
      console.log('[GameScene] 🎯 得分!', { passScore });
      // 直接更新 gameStore
      const newScore = this.gameStore.currentScore + passScore;
      this.gameStore.updateScore(newScore);
      
      // 更新显示
      this.scoreText.setText(newScore.toString());
      
      // 分数增加动画
      this.tweens.add({
        targets: this.scoreText,
        scale: 1.2,
        duration: 100,
        yoyo: true,
        ease: 'Quad.easeOut'
      });
      
      // 通过音效
      this.playSound('pass');
    } else {
      console.log('[GameScene] 未得分 - 当前分数:', this.gameStore.currentScore);
    }
  }
  
  playSound(key) {
    // 简单的音效播放(如果有音效资源)
    if (this.sound.get(key)) {
      this.sound.play(key);
    }
  }
  
  gameOver() {
    this.isGameActive = false;
    
    // 屏幕震动效果
    this.cameras.main.shake(200, 0.01);
    
    // 播放碰撞音效
    this.playSound('collision');
    
    // 更新游戏状态
    this.gameStore.endGame();
    
    // 延迟显示结束界面
    this.time.delayedCall(500, () => {
      // 通过React组件显示游戏结束界面
    });
  }
  
  shutdown() {
    console.log('[GameScene] 清理场景资源');
    
    // 清理崖壁管理器
    if (this.wallManager) {
      this.wallManager.reset();
    }
    
    // 清理太阳
    if (this.sun) {
      this.sun.destroy();
      this.sun = null;
    }
    
    // 清理飞机
    if (this.player) {
      this.player.destroy();
      this.player = null;
    }
    
    // 清理所有tween动画
    this.tweens.killAll();
    
    // 清理所有计时器
    this.time.removeAllEvents();
    
    console.log('[GameScene] 资源清理完成');
  }
}
