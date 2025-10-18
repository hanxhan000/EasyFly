// 云端排行榜API服务
// 使用 JSONPlaceholder 的免费API作为演示 (实际项目中应替换为真实后端)

const API_BASE_URL = 'https://api.jsonbin.io/v3'; // JSONBin 免费云端存储
const BIN_ID = '6794f8e5ad19ca34f8d8c42f'; // 排行榜数据的Bin ID
const API_KEY = '$2a$10$pRRfhsZ8Gs0K.kC4eKJFzOULz8gqXJP6EH0kPq9LkZv4xvQy9p8ha'; // JSONBin API密钥

// 使用云端存储
const USE_LOCAL_STORAGE = false; // 生产环境启用云端排行榜，Web与手机端共享数据
const LEADERBOARD_KEY = 'easyfly_leaderboard';

/**
 * 获取排行榜数据
 */
export async function fetchLeaderboard() {
  try {
    if (USE_LOCAL_STORAGE) {
      // 从本地存储获取
      const data = localStorage.getItem(LEADERBOARD_KEY);
      if (data) {
        return JSON.parse(data);
      }
      return [];
    }
    
    // 从云端获取
    const response = await fetch(`${API_BASE_URL}/b/${BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch leaderboard');
    }
    
    const data = await response.json();
    return data.record || [];
  } catch (error) {
    console.error('获取排行榜失败:', error);
    // 离线/错误回退：尝试读取本地排行榜
    try {
      const local = localStorage.getItem(LEADERBOARD_KEY);
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  }
}

/**
 * 提交分数到排行榜
 * @param {string} playerName - 玩家昵称
 * @param {number} score - 分数
 */
export async function submitScore(playerName, score) {
  // 预构造记录，便于错误回退
  const newEntry = {
    playerName: playerName.trim() || '匿名玩家',
    score,
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    timestamp: Date.now()
  };
  
  try {
    if (USE_LOCAL_STORAGE) {
      // 本地存储模拟
      let leaderboard = await fetchLeaderboard();
      leaderboard.push(newEntry);
      leaderboard.sort((a, b) => b.score - a.score);
      leaderboard = leaderboard.slice(0, 10);
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
      return leaderboard;
    }
    
    // 云端提交
    let leaderboard = await fetchLeaderboard();
    leaderboard.push(newEntry);
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10);
    
    const response = await fetch(`${API_BASE_URL}/b/${BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY
      },
      body: JSON.stringify(leaderboard)
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit score');
    }
    
    return leaderboard;
  } catch (error) {
    console.error('提交分数失败，进行离线回退:', error);
    // 离线/错误回退：写入本地排行榜，避免前端提示失败
    try {
      let localBoard = [];
      const raw = localStorage.getItem(LEADERBOARD_KEY);
      if (raw) localBoard = JSON.parse(raw);
      localBoard.push(newEntry);
      localBoard.sort((a, b) => b.score - a.score);
      localBoard = localBoard.slice(0, 10);
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(localBoard));
      return localBoard;
    } catch (e) {
      console.error('离线回退失败:', e);
      return [];
    }
  }
}

/**
 * 清空排行榜（管理员功能）
 */
export async function clearLeaderboard() {
  try {
    if (USE_LOCAL_STORAGE) {
      localStorage.removeItem(LEADERBOARD_KEY);
      console.log('✅ 排行榜已清空');
      return true;
    }
    
    // 云端清空
    const response = await fetch(`${API_BASE_URL}/b/${BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY
      },
      body: JSON.stringify([])
    });
    
    if (!response.ok) {
      throw new Error('Failed to clear leaderboard');
    }
    
    console.log('✅ 排行榜已清空');
    return true;
  } catch (error) {
    console.error('清空排行榜失败:', error);
    return false;
  }
}

/**
 * 格式化日期显示
 * @param {string} dateString - ISO日期字符串
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return '今天';
  if (diffDays === 1) return '昨天';
  if (diffDays < 7) return `${diffDays}天前`;
  
  // 返回具体日期 MM-DD
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}-${day}`;
}
