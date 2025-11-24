# Zalith Launcher 2 (ZL2) 官网

基于 Next.js 和 shadcn UI 构建的 Zalith Launcher 2 (ZL2) 官方网站，采用黑白混合主题设计。

## 功能特性

- 🎨 现代化的黑白混合主题设计
- 📱 完全响应式布局
- ⚡ 基于 Next.js 14 和 React 18
- 🎯 使用 shadcn UI 组件库
- 🌙 深色主题优化

## 技术栈

- **框架**: Next.js 14 (App Router)
- **UI 库**: shadcn UI
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **类型**: TypeScript

**ZL2 技术栈**:
- Jetpack Compose
- Material Design 3
- Kotlin
- Android
- PojavLauncher

## 开始使用

### 安装依赖

```bash
yarn install
```

**注意**: 

如果遇到网络连接问题，项目已配置使用国内镜像源（淘宝镜像）。

如果遇到磁盘空间不足的问题，可以尝试：

```bash
# 清理 yarn 缓存
yarn cache clean

# 或者清理全局缓存（如果使用 Yarn 1.x）
yarn cache clean --all

# 然后重新安装
yarn install
```

如果需要手动配置镜像源：

```bash
# 使用淘宝镜像（已配置）
yarn config set registry https://registry.npmmirror.com

# 或使用官方源
yarn config set registry https://registry.yarnpkg.com
```

### 开发模式

```bash
yarn dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
yarn build
```

### 启动生产服务器

```bash
yarn start
```

### 代码检查

```bash
yarn lint
```

## 项目结构

```
.
├── app/              # Next.js App Router 页面
│   ├── layout.tsx   # 根布局
│   ├── page.tsx     # 首页
│   └── globals.css  # 全局样式
├── components/       # React 组件
│   ├── ui/          # shadcn UI 基础组件
│   ├── navbar.tsx   # 导航栏
│   ├── hero.tsx     # 首页 Hero 区域
│   ├── features.tsx # 功能特性
│   ├── about.tsx    # 关于我们
│   └── footer.tsx   # 页脚
├── lib/             # 工具函数
│   └── utils.ts     # 通用工具
└── public/          # 静态资源
    ├── ZL2主页面.svg      # ZL2 主界面预览
    ├── MovTery_head.svg   # 头部图标
    └── zl2_icon.webp      # ZL2 图标
```

## 关于 Zalith Launcher 2 (ZL2)

Zalith Launcher 2 (ZL2) 是一款专为 Android 设备设计的 Minecraft Java 版启动器，基于 PojavLauncher 开发，采用 Jetpack Compose 和 Material Design 3 构建现代化用户界面。

### 主要特点

- **现代化界面设计**: 采用 Jetpack Compose 和 Material Design 3 构建的全新用户界面
- **版本管理**: 支持版本隔离，允许在外部存储目录中设置，提供更好的版本管理体验
- **渲染器支持**: 添加了更多渲染器支持，并支持渲染器插件，提升游戏画面质量和性能
- **内容管理器**: 支持对游戏版本的游戏资源进行管理，方便用户下载和管理 Mods、ModPacks、资源包、存档和光影包

### 相关链接

- [官方网站](https://zalithlauncher.cn) - **唯一官方网站**
- [GitHub 仓库 (ZL2)](https://github.com/ZalithLauncher/ZalithLauncher2)

### 法律声明

"Minecraft" 及 "我的世界" 是 Microsoft Corporation 和 Mojang Synergies AB 的注册商标。
Zalith Launcher 与 Microsoft、Mojang 或网易公司无任何从属或合作关系。

请注意，**zalithlauncher.cn** 是 Zalith Launcher 的唯一官方网站。其他域名（如 zalithlauncher.com）并非官方站点。

## 许可证

本项目采用 GPL-3.0 许可证。

