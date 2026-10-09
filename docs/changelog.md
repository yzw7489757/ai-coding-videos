# 🗓️ 更新日志

新资料按批次收录。每批会记录：新增了哪些资料、主题和术语有什么变化、哪些横向页面跟着更新。

## 2026-10-09 · 知识库化：新增 12 份资料、第 6 个主题

**新增资料（#16–#27）**

| # | 资料 | 主题 | 类型 |
|---|---|---|---|
| 16 | [Anthropic：Planner / Generator / Evaluator 长时任务 harness](/16-anthropic-harness-design-long-running-apps) | 🧠 Harness 工程 | 文章 |
| 17 | [Anthropic：16 个代理并行写 C 编译器](/17-anthropic-c-compiler-agent-teams) | 🤝 多代理协作 | 文章 |
| 18 | [Cursor：数百代理的 Planner / Worker 实验](/18-cursor-scaling-long-running-agents) | 🤝 多代理协作 | 文章 |
| 19 | [Anthropic：Agent Evals 入门路线图](/19-anthropic-demystifying-agent-evals) | ✅ 评测与验证 | 文章 |
| 20 | [HumanLayer：CLAUDE.md 少即是多](/20-humanlayer-writing-good-claude-md) | 🧭 规划与上下文 | 文章 |
| 21 | [Anthropic：别造代理，写 Skills](/21-anthropic-agent-skills-talk) | 🧭 规划与上下文 | 视频 |
| 22 | [OpenAI：codex exec + GitHub Action 自动修 CI](/22-openai-codex-ci-autofix) | ⚙️ 后台与 CI | 官方文档 |
| 23 | [Cole Medin：5 个并行代理 + worktree](/23-cole-medin-parallel-worktrees) | ⚙️ 后台与 CI | 视频 |
| 24 | [Huntley & Horthy：Ralph 循环 vs 官方插件](/24-huntley-horthy-ralph-loop) | 🧠 Harness 工程 | 视频 |
| 25 | [Simon Willison：测试与验收模式](/25-simonw-agentic-engineering-testing-patterns) | ✅ 评测与验证 | 指南 |
| 26 | [Factory：让代码库为代理做好准备](/26-factory-agent-ready-codebases) | ✅ 评测与验证 | 视频 |
| 27 | [Mitchell Hashimoto：六步 AI 采用路线](/27-mitchellh-ai-adoption-journey) | 🛠️ 实战与把关 | 文章 |

**结构变化**

- 新增第 6 个主题 [✅ 评测、测试与验证](/guide/verification)。复查了 #01–#15，没有需要移入的旧文章（#12、#03、#15 虽然涉及验证，但主线仍属原主题）。
- 资料类型从“只有视频”扩展为 视频 / 文章 / 官方文档 / 指南，侧边栏和文章顶部同时显示类型和工具标签；新增工具标签 Cursor、通用（不限工具）。
- 非视频资料的“基本信息”第一行改为来源卡片（标题、作者、日期、链接），视频仍内嵌播放器。

**新增页面**

- 6 个[主题指南](/guide/practice)（每个主题一页）+ [长时自主任务专题](/guide/long-running)
- [学习路径](/paths)、[模式库](/patterns)（20 个做法）、[配置模板库](/templates)（13 段原文配置）、[全部资料](/all)、本页
- 首页改为知识库入口；[总结](/00-summary)更新为覆盖 27 份资料

**术语表**

- 新增 41 个术语和一个分类“七、评测与验证”，共 123 个；补充了 Harness、Evals、Skills、渐进披露、扇出、Loop 等已有词条的说明。

## 2026-10-09 · v3：按内容主题分类

- 分类从“按工具”改为“按内容主题”（5 个主题）。
- 英文原话改为悬停显示中文翻译；术语表链接改为单向（文章 → 术语表），术语表不再列反向引用。
- 每篇“基本信息”第一行内嵌可播放的 YouTube 播放器。

## 2026-10-09 · v2：小白友好改版

- 新增术语表，文章中的术语可悬停查看解释。
- 英文 prompt 和原话配中文翻译；每篇配 2–4 张真实视频截图。
- 按小白友好的写法重写全部文章。

## 2026-10-08 · 首次发布

- 收录 15 个 AI 编程实战视频（Claude Code 6、Codex 5、Grok 4），每个配一篇深度分析，另有总结页。
