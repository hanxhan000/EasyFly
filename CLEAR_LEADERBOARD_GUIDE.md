# 🗑️ 清空排行榜指南

## 方法一：浏览器控制台（推荐）

### 步骤
1. **打开游戏**
   - 访问 http://localhost:5175/

2. **打开开发者工具**
   - Windows: 按 `F12` 或 `Ctrl + Shift + I`
   - Mac: 按 `Cmd + Option + I`

3. **切换到Console（控制台）标签**

4. **输入清空命令**
   ```javascript
   window.clearLeaderboard()
   ```

5. **确认操作**
   - 弹出确认对话框：⚠️ 确定要清空排行榜吗？
   - 点击"确定"

6. **查看结果**
   ```
   ✅ 排行榜已清空！
   📝 刷新页面即可看到空白排行榜
   ```

7. **刷新页面**
   - 按 `F5` 或点击浏览器刷新按钮

---

## 方法二：直接操作localStorage

### 步骤
1. 打开浏览器控制台（F12）
2. 输入以下命令：
   ```javascript
   localStorage.removeItem('easyfly_leaderboard')
   ```
3. 刷新页面（F5）

---

## 方法三：清除浏览器缓存

### Chrome浏览器
1. 按 `Ctrl + Shift + Delete`
2. 选择"Cookie及其他网站数据"
3. 时间范围选择"不限时间"
4. 点击"清除数据"

### 注意
⚠️ 此方法会清除所有浏览器数据，包括游戏设置和最高分！

---

## 验证清空成功

### 检查排行榜
1. 进入游戏
2. 点击"排行榜"按钮
3. 应该看到：
   ```
   🏆 排行榜还没有记录
   快来创造第一个记录吧！
   ```

### 检查localStorage
```javascript
// 在控制台输入
localStorage.getItem('easyfly_leaderboard')

// 应该返回
null
```

---

## 常见问题

### Q: 清空后数据还在？
A: 请确保刷新了页面（F5）

### Q: 命令执行报错？
A: 检查是否在正确的页面（localhost:5175）上执行

### Q: 找不到clearLeaderboard函数？
A: 确保游戏已完全加载，或刷新页面重试

### Q: 想恢复数据？
A: 本地存储清空后无法恢复，请谨慎操作

---

## 批处理脚本（Windows）

### 使用方法
双击运行 `clear-leaderboard.bat`

### 脚本内容
```batch
@echo off
echo 正在清空排行榜...
start chrome --new-window http://localhost:5175/?clear-leaderboard
echo 请在浏览器控制台输入: window.clearLeaderboard()
pause
```

---

## 云端版本（生产环境）

### 清空方式
当启用云端存储时（USE_LOCAL_STORAGE = false）：

```javascript
// 需要API Key权限
import { clearLeaderboard } from './utils/api';

clearLeaderboard().then(() => {
  console.log('✅ 云端排行榜已清空');
});
```

### 权限要求
- 需要有效的JSONBin API Key
- 需要Master权限
- 建议只在管理员账号执行

---

## 安全提示

⚠️ **清空操作不可撤销！**

建议清空前：
1. 确认是否真的需要清空
2. 如有重要数据，先导出备份
3. 通知所有玩家即将清空
4. 选择合适的时间（如赛季结束）

---

## 技术细节

### 数据存储位置
```javascript
localStorage.key = 'easyfly_leaderboard'
```

### 数据格式
```javascript
[
  {
    "playerName": "玩家1",
    "score": 100,
    "date": "2025-10-17",
    "timestamp": 1729123456789
  },
  // ... 最多10条
]
```

### 清空逻辑
```javascript
// 本地存储
localStorage.removeItem('easyfly_leaderboard');

// 云端存储
PUT /b/{BIN_ID}
Body: []
```

---

最后更新：2025-10-17  
维护者：AI助手 🤖
