// 管理员工具：清空排行榜
// 使用方法：在浏览器控制台中运行此文件的代码

import { clearLeaderboard } from './utils/api';

/**
 * 清空排行榜（管理员功能）
 * 在浏览器控制台中运行：
 * window.clearLeaderboard()
 */
window.clearLeaderboard = async function() {
  const confirmed = confirm('⚠️ 确定要清空排行榜吗？此操作不可撤销！');
  
  if (!confirmed) {
    console.log('❌ 操作已取消');
    return;
  }
  
  try {
    const success = await clearLeaderboard();
    if (success) {
      console.log('✅ 排行榜已清空！');
      console.log('📝 刷新页面即可看到空白排行榜');
      
      // 刷新页面
      const refresh = confirm('是否刷新页面查看效果？');
      if (refresh) {
        window.location.reload();
      }
    } else {
      console.error('❌ 清空失败');
    }
  } catch (error) {
    console.error('❌ 清空排行榜时出错:', error);
  }
};

console.log('🔧 管理员工具已加载！');
console.log('💡 在控制台中输入 window.clearLeaderboard() 可清空排行榜');
