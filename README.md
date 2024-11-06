# AiLowCode
> 新一代 AI 驱动的低代码开发平台

[![Author](https://img.shields.io/badge/Author-Axelu-orange.svg)](https://ailowcode.app)
[![Version](https://img.shields.io/badge/version-开发中-brightgreen.svg)](https://github.com/ai-lowcode/core/releases/tag/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ai-lowcode/core/blob/master/LICENSE)
[![Blog](https://img.shields.io/badge/Blog-axelu.me-yellow.svg)](https://axelu.me)

[English](./README.en.md) | 简体中文

## 📚 项目简介

AiLowCode 是一个基于人工智能的现代化低代码开发平台，旨在通过 AI 能力提升开发效率。本仓库为项目的前端部分，后端代码请访问 [ai-lowcode/server](https://github.com/ai-lowcode/server)。

### ✨ 特性

- 🛠️ **现代化技术栈**：基于 Vue 3.4、Vite 5.0、Element-Plus、TypeScript
- 📦 **先进的工程化**：采用 monorepo + pnpm + turbo 实现高效的包管理
- 🤖 **AI 驱动**：深度集成 AI 模型，从底层重新设计低代码渲染器
- 🎨 **优雅的架构**：经过精心设计的 hooks、request、styles、types、utils 等模块

## 🚀 快速开始

### 环境要求

- Node.js >= 16
- pnpm >= 8

### 安装依赖

```bash
pnpm install
```

### 初始化 pkg

```bash
pnpm package-init
```

### 启动开发服务器

```bash
pnpm --filter "ai-lowcode-admin" "dev"
```

## 🔧 技术栈

本项目采用以下技术栈：

- [Vue 3](https://v3.vuejs.org/) - 渐进式 JavaScript 框架
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Element-Plus](https://element-plus.org/) - Vue 3 组件库
- [Pinia](https://pinia.vuejs.org/) - Vue 状态管理方案
- [Vue Router](https://router.vuejs.org/) - Vue.js 官方路由

## 📸 界面预览

<details>
<summary>点击查看界面预览</summary>

![界面预览](https://cdn.jsdelivr.net/gh/axelulu/images@master/2024/20241007031408.png)
![设计器](https://cdn.jsdelivr.net/gh/axelulu/images@master/2024/20241007031335.png)
![组件配置](https://cdn.jsdelivr.net/gh/axelulu/images@master/2024/20241007031638.png)
</details>

## 🌍 浏览器支持

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari |
| :---: | :---: | :---: | :---: |
| 最新版本 ✅ | 最新版本 ✅ | 最新版本 ✅ | 最新版本 ✅ |

## 🤝 社区与支持

### 加入交流群

- 微信群：扫描下方二维码

  ![微信群](https://i.imgur.com/tD8L1B2.png)

- QQ群：[718136001](https://qm.qq.com/q/YPjQJoIxqI)
## 参与贡献

我们欢迎您为项目做出贡献！在提交 Pull Request 之前，请：

1. 阅读我们的 [Pull Request 提交规范](./PR_GUIDELINES_ZH.md)
2. 检查现有的 issue 或创建新的 issue
3. 重大更改请先与维护者讨论
4. Fork 仓库并从 `master` 分支创建您的分支
5. 遵循我们的代码规范和测试要求

关于创建 Pull Request 的详细信息，请参考我们的 [PR 模板和规范指南](./PR_GUIDELINES_ZH.md)。

### PR 快速检查清单

- [ ] 遵循 PR 标题格式：`type(scope): description`
- [ ] 完整填写 PR 模板
- [ ] 添加适当的标签
- [ ] 包含新功能的测试
- [ ] 更新相关文档
- [ ] 请求相关团队成员审查

## 📄 开源协议

[MIT](https://github.com/ai-lowcode/core/blob/main/LICENSE) License © 2024 [Axelu](https://github.com/ai-lowcode)
