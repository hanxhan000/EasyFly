import Phaser from 'phaser';
import GameScene from '../scenes/GameScene';

export default class PhaserGame {
  constructor(parent, gameStore) {
    console.log('[PhaserGame] 创建游戏实例');
    
    const config = {
      type: Phaser.AUTO,
      parent: parent,
      width: 800,
      height: 600,
      backgroundColor: '#87CEEB',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        fullscreenTarget: parent,
        expandParent: true,
        parent: parent
      },
      scene: [GameScene],
      // 手机端优化
      render: {
        pixelArt: false,
        antialias: true
      },
      // 触摸输入优化
      input: {
        touch: {
          target: parent,
          capture: true
        }
      }
    };
    
    this.game = new Phaser.Game(config);
    this.gameStore = gameStore;
    this.parent = parent;
    // 设备类型判断（更稳健）
    this.isMobile = typeof window !== 'undefined' && (
      (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '')
    );
    
    console.log('[PhaserGame] 游戏实例创建完成');
    
    // 传递gameStore到场景
    this.game.scene.start('GameScene', { gameStore });

    // 移动端按当前方向初始化尺寸；Web端保持容器内自适应
    const initialOrientation = this.gameStore.getState().orientation;
    if (this.isMobile) {
      this.setOrientation(initialOrientation);
    }
  }
  
  destroy() {
    console.log('[PhaserGame] 销毁游戏实例');
    if (this.game) {
      this.game.destroy(true);
      this.game = null;
    }
  }
  
  restart() {
    console.log('[PhaserGame] 重启游戏');
    if (this.game && this.game.scene) {
      const scene = this.game.scene.getScene('GameScene');
      if (scene) {
        // 先清理场景资源
        scene.shutdown();
        // 停止场景
        this.game.scene.stop('GameScene');
        // 延迟重启，确保清理完成
        setTimeout(() => {
          this.game.scene.start('GameScene', { gameStore: this.gameStore });
        }, 100);
      }
    }
  }
  
  // 根据方向设置游戏基础尺寸：根据父容器尺寸动态计算，保持常见纵横比，仅移动端执行
  setOrientation(orientation) {
    if (!this.game || !this.game.scale) return;
    if (!this.isMobile) return; // Web端不强制调整，交给FIT模式
    const rect = this.parent.getBoundingClientRect();
    const parentW = Math.max(1, Math.floor(rect.width));
    const parentH = Math.max(1, Math.floor(rect.height));
    
    // 目标纵横比
    const PORTRAIT_RATIO = 9 / 16;   // 宽/高
    const LANDSCAPE_RATIO = 16 / 9;  // 宽/高
    let gameW, gameH;
    
    if (orientation === 'landscape') {
      // 先按宽度计算
      const targetW = Math.min(parentW, 1280);
      const targetH = Math.round(targetW / LANDSCAPE_RATIO);
      if (targetH > parentH) {
        // 高度受限，改按高度计算
        gameH = parentH;
        gameW = Math.round(gameH * LANDSCAPE_RATIO);
      } else {
        gameW = targetW;
        gameH = targetH;
      }
    } else {
      // portrait
      const targetH = Math.min(parentH, 1024);
      const targetW = Math.round(targetH * PORTRAIT_RATIO);
      if (targetW > parentW) {
        // 宽度受限，改按宽度计算
        gameW = parentW;
        gameH = Math.round(gameW / PORTRAIT_RATIO);
      } else {
        gameW = targetW;
        gameH = targetH;
      }
    }
    
    console.log('[PhaserGame] 设置方向', { orientation, parentW, parentH, gameW, gameH });
    try {
      this.game.scale.setGameSize(gameW, gameH);
      this.game.scale.refresh();
    } catch (e) {
      console.warn('[PhaserGame] 设置方向失败', e);
    }
  }
}