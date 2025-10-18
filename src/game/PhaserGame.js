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
        parent: parent,
        width: '100%',
        height: '100%'
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
    
    console.log('[PhaserGame] 游戏实例创建完成');
    
    // 传递gameStore到场景
    this.game.scene.start('GameScene', { gameStore });

    // 初始化尺寸为当前方向
    const initialOrientation = this.gameStore.getState().orientation;
    this.setOrientation(initialOrientation);
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
  
  // 新增：根据方向设置游戏基础尺寸（使用常见纵横比）
  setOrientation(orientation) {
    if (!this.game || !this.game.scale) return;
    const PORTRAIT = { width: 480, height: 840 };
    const LANDSCAPE = { width: 840, height: 480 };
    const target = orientation === 'landscape' ? LANDSCAPE : PORTRAIT;
    
    console.log('[PhaserGame] 设置方向', { orientation, target });
    try {
      this.game.scale.setGameSize(target.width, target.height);
      // 触发一次刷新以通知场景
      this.game.scale.refresh();
    } catch (e) {
      console.warn('[PhaserGame] 设置方向失败', e);
    }
  }
}