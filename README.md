# AI 编程代理实战知识库

一个中文知识库，主题是“资深工程师怎么用编码代理（Claude Code、Codex、Cursor、Grok 等）把软件做好”。收录真实存在的演讲、工程博客、官方文档和指南，每份资料配一篇原创深度拆解，再按主题串成指南、模式库、配置模板和学习路径。面向新手，术语可悬停查看解释，英文原话可悬停看中文翻译。

🌐 线上站点：**https://ai-coding-videos.vercel.app**

> 📌 **贡献与 AI 代理协作规范见 [AGENTS.md](./AGENTS.md)**

## 内容

| 板块 | 说明 |
|---|---|
| 📚 全部资料 | 27 份资料（视频 19、文章 6、官方文档 1、指南 1），每份一篇固定 5 节的拆解 |
| 📘 主题指南 | 6 个主题各一页：实战与把关、规划与上下文、多代理协作、后台与 CI/CD、Harness 工程、评测与验证；另有“长时自主任务”专题 |
| 🧩 模式库 | 20 个可复用做法，每个链接到原文小节 |
| 🧾 配置模板库 | 13 段从原文逐字摘出的配置、脚本和提示词 |
| 🧭 学习路径 | 新手 / 进阶 / 专家三条阅读路线 |
| 📖 术语表 | 123 个术语的白话解释 |

## 快速开始

```bash
npm install
npm run dev       # 本地开发
npm run build     # 构建到 docs/.vitepress/dist
npm run preview   # 预览构建产物
```

需要 Node.js 18 及以上。技术栈：VitePress 1.6、Mermaid（vitepress-plugin-mermaid）、自写 markdown-it 插件，部署在 Vercel。

## 项目结构

```text
docs/                 站点内容（单篇资料 NN-*.md、guide/ 主题指南、横向页面）
docs/.vitepress/      配置、分类数据 domains.mjs、术语数据、markdown 插件、主题组件
docs/public/images/   每篇资料的真实视频截图
scripts/              生成首页与术语表、检查链接等脚本
AGENTS.md             协作规范（唯一权威）
```

## 更新节奏

每周新增一批资料，同步更新主题指南、模式库和[更新日志](https://ai-coding-videos.vercel.app/changelog)。

## 版权说明

- 站内分析文章是原创评论与整理。
- 被分析的视频、文章和文档版权归原作者和发布方所有，每篇都给出原始链接。
- 截图是视频的真实画面帧，仅用于评论和说明，并附带指向原视频对应时间点的链接。如有版权问题，请提 issue 联系处理。
