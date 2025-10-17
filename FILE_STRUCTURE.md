# EasyFly 项目文件结构

```
Qoder-EasyFly/
│
├── 📁 docs/                          # 项目文档
│   ├── 开发框架文档.md              # 技术栈和开发规范
│   ├── 功能需求文档.md              # 详细功能设计
│   ├── 技术架构文档.md              # 系统架构说明
│   ├── 素材说明文档.md              # 素材生成指南
│   └── 开发计划.md                  # 开发路线图
│
├── 📁 public/                        # 静态资源
│   └── favicon.svg                   # 网站图标
│
├── 📁 src/                          # 源代码
│   │
│   ├── 📁 components/               # React UI组件
│   │   ├── GameCanvas.jsx          # Phaser游戏容器
│   │   ├── GameOver.jsx            # 游戏结束界面
│   │   ├── Leaderboard.jsx         # 排行榜组件
│   │   └── MainMenu.jsx            # 主菜单组件
│   │
│   ├── 📁 game/                    # Phaser游戏对象
│   │   ├── PhaserGame.js           # 游戏初始化
│   │   ├── Player.js               # 飞机类
│   │   ├── Wall.js                 # 崖壁类
│   │   └── WallManager.js          # 崖壁管理器
│   │
│   ├── 📁 scenes/                  # Phaser场景
│   │   └── GameScene.js            # 主游戏场景
│   │
│   ├── 📁 stores/                  # 状态管理
│   │   └── gameStore.js            # Zustand游戏状态
│   │
│   ├── 📁 utils/                   # 工具函数
│   │   ├── constants.js            # 游戏常量
│   │   └── storage.js              # 本地存储
│   │
│   ├── App.jsx                      # 主应用组件
│   ├── main.jsx                     # 应用入口
│   └── index.css                    # 全局样式
│
├── 📄 .gitignore                    # Git忽略配置
├── 📄 index.html                    # HTML模板
├── 📄 package.json                  # 项目依赖
├── 📄 postcss.config.js             # PostCSS配置
├── 📄 tailwind.config.js            # TailwindCSS配置
├── 📄 vite.config.js                # Vite配置
│
├── 📄 README.md                     # 项目概览
├── 📄 GAME_README.md                # 游戏运行指南
├── 📄 PROJECT_SUMMARY.md            # 项目总结
├── 📄 QUICKSTART.md                 # 快速开始
└── 📄 install-and-run.bat           # 一键启动脚本

```

## 📊 文件统计

### 代码文件 (23个)
- React组件: 5个
- Phaser游戏: 5个
- 配置文件: 5个
- 工具/状态: 3个
- 其他: 5个

### 文档文件 (9个)
- 开发文档: 5个
- 说明文档: 4个

### 总计: 32个文件

## 🎯 关键文件说明

### 游戏核心
- **GameScene.js** (171行) - 游戏主逻辑,最重要的文件
- **WallManager.js** (108行) - 崖壁生成和难度管理
- **Player.js** (77行) - 飞机控制和渲染

### UI核心
- **App.jsx** (81行) - 应用路由和状态管理
- **GameOver.jsx** (93行) - 游戏结束界面
- **Leaderboard.jsx** (106行) - 排行榜界面

### 配置核心
- **vite.config.js** - Vite构建配置
- **tailwind.config.js** - 样式配置
- **package.json** - 依赖管理

## 💡 代码特点

### 简洁高效
- 总代码量 ~1200行
- 无冗余代码
- 注释清晰

### 结构清晰
- 组件化设计
- 职责分离
- 易于维护

### 扩展性强
- 模块化架构
- 配置化设计
- 预留扩展接口

## 🚀 快速定位

### 需要修改游戏逻辑?
→ `src/scenes/GameScene.js`

### 需要调整难度?
→ `src/utils/constants.js`

### 需要修改UI?
→ `src/components/`

### 需要修改样式?
→ `src/index.css` + `tailwind.config.js`

### 需要添加功能?
→ `src/game/` + `src/scenes/`
