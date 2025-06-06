# 直播管理后台

## 项目介绍

这是一个直播管理后台系统，用于管理直播预告和直播回放。系统采用前后端分离架构，前端使用Vue.js框架，提供友好的用户界面和交互体验。

## 功能模块

### 已实现功能

1. **直播预告管理**
   - 直播列表展示（包含序号、标题、内容状态、直播状态、直播时间、创建时间等信息）
   - 多条件筛选（支持按标题、内容状态、直播状态、创建时间、直播时间筛选）
   - 直播上下架操作
   - 新增直播预告功能
   - 直播信息编辑（支持编辑标题、直播时间范围、内容状态、直播链接、封面图、直播二维码）

### 待实现功能

1. **直播回放管理**
   - 回放列表展示
   - 回放上下架管理
   - 回放信息编辑

## 技术栈

- 前端：Vue.js + Element UI
- 样式：SCSS
- 构建工具：Vite

## 项目结构

```
├── public/              # 静态资源
├── src/                 # 源代码
│   ├── assets/          # 资源文件（图片、样式等）
│   ├── components/      # 公共组件
│   ├── views/           # 页面组件
│   │   ├── layout/      # 布局组件
│   │   ├── preview/     # 直播预告管理
│   │   └── replay/      # 直播回放管理（待实现）
│   ├── router/          # 路由配置
│   ├── store/           # 状态管理
│   ├── utils/           # 工具函数
│   ├── App.vue          # 根组件
│   └── main.js          # 入口文件
├── .gitignore           # Git忽略文件
├── index.html           # HTML模板
├── package.json         # 项目依赖
├── vite.config.js       # Vite配置
└── README.md            # 项目说明
```

## 使用说明

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 生产环境构建

```bash
npm run build
```

## 功能说明

### 直播预告管理

#### 列表页面

- **筛选功能**：支持按标题、内容状态（上架/下架）、直播状态（未开始/进行中/已结束）、创建时间、直播时间进行筛选
- **列表展示**：展示直播预告的序号、标题、内容状态、直播状态、直播时间、创建时间等信息
- **操作功能**：
  - 新增：点击"新增直播预告"按钮，可以创建新的直播预告
  - 上架/下架：可以对直播预告进行上架或下架操作
  - 编辑：可以编辑直播预告的信息

#### 新增/编辑功能

- **直播时间**：支持选择同一天内的时间范围，包括日期选择和开始时间至结束时间
- **内容信息**：可编辑标题、内容状态（上架/下架）、直播链接
- **媒体资源**：支持上传和管理封面图、直播二维码

## 开发计划

1. 完成直播预告管理模块
2. 实现直播回放管理模块
3. 优化用户界面和交互体验
4. 添加数据统计和分析功能# cx
