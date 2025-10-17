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
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      scene: [GameScene]
    };
    
    this.game = new Phaser.Game(config);
    this.gameStore = gameStore;
    
    console.log('[PhaserGame] 游戏实例创建完成');
    
    // 传递gameStore到场景
    this.game.scene.start('GameScene', { gameStore });
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
}
