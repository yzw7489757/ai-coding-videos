---
layout: home
title: AI 编程代理实战知识库
hero:
  name: AI 编程代理实战知识库
  text: 资深工程师怎么用 Claude Code、Codex、Cursor、Grok 写软件
  tagline: 27 份真实存在的演讲、工程博客、官方文档和指南，每份配一篇深度拆解；再按主题串成指南、模式库和配置模板。小白友好，术语可一键查。
  actions:
    - theme: brand
      text: 按学习路径读
      link: /paths
    - theme: alt
      text: 模式库
      link: /patterns
    - theme: alt
      text: 全部资料
      link: /all
    - theme: alt
      text: 小白先看术语表
      link: /glossary
features:
  - icon: 🛠️
    title: 真实项目实战与人工把关（5）
    details: 一个人维护大型开源项目、新工具上手实测、逐行审查 AI 产出，以及从怀疑到熟练的采用路线。
    link: /guide/practice
    linkText: "主题指南 · #11 #14 #13 #12 #27"
  - icon: 🧭
    title: 需求澄清、规划与上下文管理（5）
    details: 动手前先把需求问清楚；Research → Plan → Implement；规则文件少即是多；Skills 按需加载。
    link: /guide/planning
    linkText: "主题指南 · #03 #06 #04 #20 #21"
  - icon: 🤝
    title: 多代理协作与对抗式验证（5）
    details: 一个写、一个查；按角色配置子代理；从十几个到数百个代理，协调方式怎么变。
    link: /guide/multi-agent
    linkText: "主题指南 · #05 #08 #15 #17 #18"
  - icon: ⚙️
    title: 后台代理、自动化与 CI/CD（5）
    details: Routines 和 /loop 在后台跑；worktree 并行开发；PR 先过代理审查；代理在 CI 里自动修复。
    link: /guide/automation
    linkText: "主题指南 · #01 #02 #10 #22 #23"
  - icon: 🧠
    title: Harness 工程与内部机制（4）
    details: 代理外壳怎么工作；把团队标准写成 lint 和测试；长时任务的循环、上下文与做查分离。
    link: /guide/harness
    linkText: "主题指南 · #09 #07 #16 #24"
  - icon: ✅
    title: 评测、测试与验证（3）
    details: 给代理出考卷（evals）、用测试约束代理、让代码库可被自动验证。
    link: /guide/verification
    linkText: "主题指南 · #19 #25 #26"
---

## 这是什么

一个持续更新的中文知识库，主题是**怎样用编码代理（coding agent）把软件做好**。内容分三层：

| 层次 | 是什么 | 从哪进 |
|---|---|---|
| 单篇资料 | 每份视频 / 文章一篇拆解，固定 5 节：基本信息、做了什么、怎么做的、结果如何、可借鉴之处 | [全部资料（27）](/all) |
| 主题指南 | 每个主题一页，把多份资料串起来回答几个核心问题，并标出来源之间的分歧 | 顶部导航“主题指南” |
| 横向页面 | [学习路径](/paths)、[模式库](/patterns)（20 个做法）、[配置模板库](/templates)（13 段原文配置）、[长时自主任务专题](/guide/long-running)、[总结](/00-summary)、[术语表](/glossary) | 顶部导航 |

整理开始于 2026-10-08，最近一次更新：2026-10-09（见[更新日志](/changelog)）。分类依据是**资料讲的内容**，不是用的工具；工具和资料类型用彩色小标签标出。

::: tip 阅读小功能
- **术语一点就懂**：文章里带品牌色点状下划线的词，鼠标悬停能看到一句话解释，点击跳到[术语表](/glossary)。
- **英文原话悬停看翻译**：原话、prompt 和配置保留英文原样，带灰色虚线下划线和“译”角标；悬停、键盘聚焦或手机点按会弹出中文翻译。
- **原始来源一键直达**：视频资料在“基本信息”最上方内嵌 YouTube 播放器；文章、官方文档和指南则放一张来源卡片（标题、作者、日期、链接）。
- **小节级引用**：指南和模式库里的 `#16 §3.5` 这类链接，会直接跳到原文对应小节。
:::

## 🆕 最近收录（2026-10-09，12 份）

| # | 资料 | 主题 | 类型 / 工具 |
|---|---|---|---|
| 16 | [Anthropic：Planner / Generator / Evaluator 长时任务 harness](/16-anthropic-harness-design-long-running-apps) | [🧠 Harness 工程](/guide/harness) | <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span> |
| 17 | [Anthropic：16 个代理并行写 C 编译器](/17-anthropic-c-compiler-agent-teams) | [🤝 多代理协作](/guide/multi-agent) | <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span> |
| 18 | [Cursor：数百代理的 Planner / Worker 实验](/18-cursor-scaling-long-running-agents) | [🤝 多代理协作](/guide/multi-agent) | <span class="type-tag type-article">文章</span> <span class="tool-tag tool-cursor">Cursor</span> |
| 19 | [Anthropic：Agent Evals 入门路线图](/19-anthropic-demystifying-agent-evals) | [✅ 评测与验证](/guide/verification) | <span class="type-tag type-article">文章</span> <span class="tool-tag tool-general">通用（不限工具）</span> |
| 20 | [HumanLayer：CLAUDE.md 少即是多](/20-humanlayer-writing-good-claude-md) | [🧭 规划与上下文](/guide/planning) | <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span> |
| 21 | [Anthropic：别造代理，写 Skills](/21-anthropic-agent-skills-talk) | [🧭 规划与上下文](/guide/planning) | <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span> |
| 22 | [OpenAI：codex exec + GitHub Action 自动修 CI](/22-openai-codex-ci-autofix) | [⚙️ 后台与 CI](/guide/automation) | <span class="type-tag type-docs">官方文档</span> <span class="tool-tag tool-codex">Codex</span> |
| 23 | [Cole Medin：5 个并行代理 + worktree](/23-cole-medin-parallel-worktrees) | [⚙️ 后台与 CI](/guide/automation) | <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span> |
| 24 | [Huntley & Horthy：Ralph 循环 vs 官方插件](/24-huntley-horthy-ralph-loop) | [🧠 Harness 工程](/guide/harness) | <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span> |
| 25 | [Simon Willison：测试与验收模式](/25-simonw-agentic-engineering-testing-patterns) | [✅ 评测与验证](/guide/verification) | <span class="type-tag type-guide">指南</span> <span class="tool-tag tool-general">通用（不限工具）</span> |
| 26 | [Factory：让代码库为代理做好准备](/26-factory-agent-ready-codebases) | [✅ 评测与验证](/guide/verification) | <span class="type-tag type-video">视频</span> <span class="tool-tag tool-general">通用（不限工具）</span> |
| 27 | [Mitchell Hashimoto：六步 AI 采用路线](/27-mitchellh-ai-adoption-journey) | [🛠️ 实战与把关](/guide/practice) | <span class="type-tag type-article">文章</span> <span class="tool-tag tool-general">通用（不限工具）</span> |

## 知识库全景图

按“主题 → 资料”展示全部 27 份资料。每个主题指南里还有更细的“问题 → 资料”小图。

```mermaid
mindmap
  root((AI 编程代理知识库))
    实战与把关
      11 Steinberger 十个 checkout
      14 OrcDev Skills 管风格
      13 Bijan Grok Build 实测
      12 ForrestKnight 读代码
      27 Mitchell 六步采用
    规划与上下文
      03 访谈式需求
      06 找未知 做减法
      04 RPI 有意压缩
      20 CLAUDE.md 少即是多
      21 Skills 渐进加载
    多代理协作
      05 Builder 加 Validator
      08 子代理切片审查
      15 57 子代理 加 skeptic
      17 16 代理写编译器
      18 数百代理分层
    后台与 CI
      01 Routines 与验证
      02 Slack 派活 扇出审查
      10 PR 审查 CI 看护
      22 codex exec 修 CI
      23 worktree 并行
    Harness 工程
      09 Codex harness 拆解
      07 标准变 lint 和测试
      16 Planner Generator Evaluator
      24 Ralph 循环
    评测与验证
      19 Agent Evals
      25 TDD 与手动测试
      26 8 根验证支柱
```

## 不知道从哪开始？

- **完全新手**：走[🌱 新手路径](/paths#beginner)，第一篇读 [#27 Mitchell Hashimoto 的六步路线](/27-mitchellh-ai-adoption-journey)。
- **想马上抄作业**：去[🧩 模式库](/patterns)和[🧾 配置模板库](/templates)。
- **想看全貌**：读[总结与最佳实践](/00-summary)，或打开[📚 全部资料](/all)按主题浏览。

::: info 资料来源与可信度
所有链接均已核实存在。视频以字幕 / 官方文字稿为主要依据，截图全部来自视频画面；文章和文档以原文全文为依据，抓取日期写在每篇的“信息来源”里。例外和局限都在对应文章中注明，覆盖情况与缺口见[全部资料页末尾](/all#coverage)。
:::
