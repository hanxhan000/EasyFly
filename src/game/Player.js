import Phaser from 'phaser';
import { PLAYER_CONFIG } from '../utils/constants';

export default class Player extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    
    this.scene = scene;
    this.size = PLAYER_CONFIG.SIZE;
    this.velocity = 0;
    this.gravity = 800; // 正常重力
    this.jumpPower = -350; // 正常上升力
    this.isFlying = false; // 是否正在飞行
    
    // 创建飞机Graphics
    this.graphics = scene.add.graphics();
    this.drawPlayer();
    this.add(this.graphics);
    
    scene.add.existing(this);
    
    // 创建物理体
    scene.physics.world.enable(this);
    this.body.setSize(this.size, this.size * 0.6);
    this.body.setAllowGravity(false); // 使用自定义重力
    
    console.log('[Player] 飞机创建完成', { x, y, size: this.size });
  }
  
  drawPlayer() {
    this.graphics.clear();
    
    // 蓝色可爱飞机设计（翅膀展开）
    const s = this.size;
    
    // === 主机身 (明亮蓝色) ===
    this.graphics.fillStyle(0x60A5FA, 1); // 明亮蓝色
    this.graphics.fillEllipse(0, 0, s * 1.1, s * 0.7);
    
    // === 机头 (圆润短小) ===
    this.graphics.fillStyle(0x60A5FA, 1);
    this.graphics.beginPath();
    this.graphics.moveTo(s * 0.4, 0);
    this.graphics.lineTo(s * 0.55, -s * 0.15);
    this.graphics.lineTo(s * 0.55, s * 0.15);
    this.graphics.closePath();
    this.graphics.fillPath();
    
    // === 主机翼 (更大更展开) ===
    this.graphics.fillStyle(0x3B82F6, 1); // 深蓝色
    
    // 上机翼 (更大更展开)
    this.graphics.fillEllipse(-s * 0.1, -s * 0.45, s * 0.65, s * 0.28);
    
    // 下机翼 (更大更展开)
    this.graphics.fillEllipse(-s * 0.1, s * 0.45, s * 0.65, s * 0.28);
    
    // === 尾翼 (粉红色) ===
    this.graphics.fillStyle(0xFF6B9D, 1); // 粉红色
    
    // 上尾翼
    this.graphics.fillEllipse(-s * 0.45, -s * 0.18, s * 0.3, s * 0.18);
    
    // 下尾翼
    this.graphics.fillEllipse(-s * 0.45, s * 0.18, s * 0.3, s * 0.18);
    
    // === 窗户 (大圆窗) ===
    this.graphics.fillStyle(0xFFFFFF, 0.9);
    this.graphics.fillCircle(s * 0.15, -s * 0.08, s * 0.16);
    
    // 窗户高光
    this.graphics.fillStyle(0xFFFFFF, 0.6);
    this.graphics.fillCircle(s * 0.18, -s * 0.12, s * 0.08);
    
    // === 眼睛 (大大的眼睛) ===
    this.graphics.fillStyle(0x1F2937, 1);
    this.graphics.fillCircle(s * 0.25, -s * 0.1, s * 0.09);
    
    // 眼睛高光
    this.graphics.fillStyle(0xFFFFFF, 1);
    this.graphics.fillCircle(s * 0.28, -s * 0.13, s * 0.04);
    
    // === 微笑嘴 ===
    this.graphics.lineStyle(2, 0xFF6B9D, 1);
    this.graphics.beginPath();
    this.graphics.arc(s * 0.2, s * 0.05, s * 0.12, 0.2, Math.PI - 0.2);
    this.graphics.strokePath();
    
    // === 脸红 ===
    this.graphics.fillStyle(0xFF9AA2, 0.5);
    this.graphics.fillCircle(s * 0.05, s * 0.15, s * 0.12);
    this.graphics.fillCircle(-s * 0.15, s * 0.15, s * 0.1);
    
    // === 金色星星装饰 ===
    this.graphics.fillStyle(0xFFD700, 1);
    this.drawStar(this.graphics, -s * 0.3, -s * 0.05, 5, s * 0.08, s * 0.04);
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
  
  fly() {
    // 按住时向上飞
    this.isFlying = true;
  }
  
  stopFly() {
    // 松开时停止向上
    this.isFlying = false;
  }
  
  update(delta) {
    // 应用重力或飞行力
    if (this.isFlying) {
      this.velocity = this.jumpPower; // 持续向上
    } else {
      this.velocity += this.gravity * (delta / 1000); // 重力下落
    }
    
    // 限制最大速度
    this.velocity = Phaser.Math.Clamp(this.velocity, -500, 500);
    
    // 更新位置 (不限制在屏幕内,由GameScene检测边界碰撞)
    this.y += this.velocity * (delta / 1000);
    
    // 根据速度旋转飞机 (向上时转一点,向下时转一点)
    const tilt = Phaser.Math.Clamp(this.velocity * 0.001, -0.3, 0.5);
    this.rotation = tilt;
  }
  
  getBounds() {
    return new Phaser.Geom.Rectangle(
      this.x - this.size / 2,
      this.y - this.size * 0.3,
      this.size,
      this.size * 0.6
    );
  }
}
