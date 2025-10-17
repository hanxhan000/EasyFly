# EasyFly - H5飞行躲避游戏

## 项目简介
EasyFly是一款简约风格的H5飞行躲避游戏,支持PC端和移动端访问。玩家通过控制飞机上下移动来躲避迎面而来的崖壁缺口,挑战更高分数并登上全球排行榜。

## 游戏特色
- 🎮 简约清新的游戏画面
- 📱 完美兼容手机端和PC端
- 🏆 全球Top10排行榜
- ☁️ 云端数据存储
- 🎯 简单易上手的操作方式

## 技术栈
- **前端框架**: React + Vite
- **游戏引擎**: Phaser 3
- **UI框架**: TailwindCSS
- **后端**: Node.js + Express
- **数据库**: MongoDB / Firebase
- **部署**: Vercel / Netlify

## 项目结构
```
EasyFly/
├── docs/                    # 项目文档
│   ├── 开发框架文档.md
│   ├── 功能需求文档.md
│   ├── 技术架构文档.md
│   └── 素材说明文档.md
├── src/                     # 源代码
│   ├── assets/             # 游戏素材
│   │   ├── images/        # 图片资源
│   │   ├── sounds/        # 音效资源
│   │   └── fonts/         # 字体资源
│   ├── scenes/            # 游戏场景
│   │   ├── MainMenu.js   # 主菜单场景
│   │   ├── GamePlay.js   # 游戏场景
│   │   └── GameOver.js   # 游戏结束场景
│   ├── components/        # React组件
│   ├── api/              # API接口
│   └── utils/            # 工具函数
├── server/                # 后端服务
│   ├── routes/           # 路由
│   ├── models/           # 数据模型
│   └── controllers/      # 控制器
└── public/               # 静态资源

```

## 快速开始
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 开发者
Created by hanxhan000
