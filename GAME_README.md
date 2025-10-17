# 🎮 EasyFly 游戏运行指南

## 快速开始

### 方法1: 使用批处理文件(推荐)
双击运行项目根目录下的 `install-and-run.bat` 文件,它会自动:
1. 安装所有依赖
2. 启动开发服务器
3. 自动打开浏览器

### 方法2: 手动运行

如果遇到PowerShell执行策略问题,请先执行:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

然后运行:
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 方法3: 使用yarn/pnpm
```bash
# 使用yarn
yarn install
yarn dev

# 或使用pnpm
pnpm install
pnpm dev
```

## 游戏说明

### 操作方式
- **PC端**: 鼠标点击并拖动控制飞机上下移动
- **移动端**: 触摸并拖动控制飞机上下移动
- **键盘**(调试): 上下方向键控制飞机

### 游戏目标
- 控制飞机躲避迎面而来的崖壁缺口
- 存活时间越长,分数越高
- 挑战全球Top10排行榜

### 分数规则
- 成功通过一个缺口: +10分
- 每秒存活: +1分
- 从缺口正中通过: +5分额外奖励

## 项目结构

```
src/
├── components/      # React UI组件
├── game/           # Phaser游戏对象
├── scenes/         # Phaser游戏场景
├── stores/         # Zustand状态管理
└── utils/          # 工具函数
```

## 技术栈

- **前端框架**: React 18 + Vite
- **游戏引擎**: Phaser 3
- **UI框架**: TailwindCSS
- **状态管理**: Zustand

## 开发者

Created by hanxhan000 (114579298@qq.com)

## 文档

详细文档请查看 `docs/` 目录:
- 开发框架文档.md
- 功能需求文档.md
- 技术架构文档.md
- 素材说明文档.md

## 常见问题

### Q: PowerShell脚本执行被禁止怎么办?
A: 运行 `install-and-run.bat` 批处理文件,或者修改执行策略

### Q: 如何在手机上测试?
A: 启动开发服务器后,使用手机浏览器访问显示的本地IP地址(如 http://192.168.x.x:5173)

### Q: 游戏画面显示不全?
A: Phaser会自动适配屏幕,刷新页面即可

## License

MIT
