---
layout: home
title: AI 编程代理实战知识库
hero:
  name: AI 编程代理实战知识库
  text: 资深工程师怎么用 Claude Code、Codex、Cursor、Grok 写软件
  tagline: 63 份真实存在的演讲、工程博客、官方文档和指南，每份配一篇深度拆解；按 AI 代理开发任务的八个阶段组织，配阶段指南、模式库和学习路径。小白友好，术语可一键查。
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
  - icon: 🧱
    title: 打地基 · 上下文与规范
    details: 让代理每次开工都拿到对的上下文：规则文件、Skills、团队规范，以及能被自动验证的代码库。
    link: /guide/foundation
    linkText: 阅读阶段指南
  - icon: 📝
    title: 做规划 · 需求澄清与任务拆解
    details: 动手前把需求问清楚、把任务拆好：让代理采访你、找出未知、研究→计划→实施、plan mode。
    link: /guide/planning
    linkText: 阅读阶段指南
  - icon: 🚀
    title: 去执行 · 从单代理到多代理
    details: 让代理把活干完：真实项目里的单代理用法，到子代理、并行 worktree、代理团队和长时自主任务。
    link: /guide/execution
    linkText: 阅读阶段指南
  - icon: ✅
    title: 验收这一次的产出 · 测试、审查与完成标准
    details: 确认代理这一次真的做完、做对：测试驱动、代理手动测试、人工与对抗式审查、AI 审查器和独立的完成标准。
    link: /guide/review
    linkText: 阅读阶段指南
  - icon: 📏
    title: 评测代理本身与给动作把关 · 评测、分类器与分数噪声
    details: 不只看一次产出，而是系统地评测代理和它的配置：评测零件与 pass@k、给 Skill 写评测、评测分数里的噪声，以及给代理动作把关的权限分类器。
    link: /guide/evals
    linkText: 阅读阶段指南
  - icon: ⚙️
    title: 接进 PR 与 CI · 触发、审查与流水线
    details: 让代理脱离聊天框、接进团队流水线：定时与事件触发、无人值守的规则、PR 审查机器人和 CI 自动修复。
    link: /guide/ci
    linkText: 阅读阶段指南
  - icon: ☁️
    title: 云端与后台运行环境 · 代理在哪里跑
    details: 让代理离开你的笔记本：云端会话、托管 VM、自托管执行机器和沙箱机队，以及背后的持久化与安全布局。
    link: /guide/cloud
    linkText: 阅读阶段指南
  - icon: 🧠
    title: 看原理 · Harness 与内部机制
    details: 理解代理外壳怎么工作：上下文、权限、循环和“做与查分离”背后的设计。
    link: /guide/harness
    linkText: 阅读阶段指南
---

## 这是什么

**分类原则：按一个 AI 代理开发任务从开始到上线的顺序分组。** 八个阶段依次是：打地基（上下文与规范）→ 做规划 → 去执行 → 验收这一次的产出 → 评测代理本身与给动作把关 → 接进 PR 与 CI → 云端与后台运行环境，最后是看原理（Harness 与内部机制）。每份资料只放在它主要贡献所在的那个阶段。

一个持续更新的中文知识库，主题是**怎样用编码代理（coding agent）把软件做好**。内容分三层：

| 层次 | 是什么 | 从哪进 |
|---|---|---|
| 单篇资料 | 每份视频 / 文章一篇拆解，开头一份收获清单，再分 5 节：基本信息、这篇在回答什么、怎么做、结果与局限、结论 | 左侧边栏，或[全部资料](/all) |
| 阶段指南 | 每个阶段一页，把多份资料串起来回答几个核心问题，并标出来源之间的分歧 | 左侧边栏每组第一项 |
| 工具页面 | [学习路径](/paths)、[模式库](/patterns)（29 个做法）、[术语表](/glossary)、[更新日志](/changelog)；另有[总结](/00-summary) | 顶部导航 |

整理开始于 2026-10-08，最近一次更新：2026-10-19（见[更新日志](/changelog)）。工具和资料类型标在每篇文章的标题下方。

::: tip 阅读小功能
- **术语一点就懂**：文章里带品牌色点状下划线的词，鼠标悬停能看到一句话解释，点击跳到[术语表](/glossary)。
- **英文原话悬停看翻译**：原话、prompt 和配置保留英文原样，带灰色虚线下划线和“译”角标；悬停、键盘聚焦或手机点按会弹出中文翻译。
- **原始来源一键直达**：视频资料在“基本信息”最上方内嵌 YouTube 播放器；文章、官方文档和指南则放一张来源卡片（标题、作者、日期、链接）。
- **小节级引用**：阶段指南和模式库里的 `#16 §3.5` 这类链接，会直接跳到原文对应小节。
:::

## 🆕 最近收录（2026-10-19，4 份）

| # | 资料 | 阶段 | 类型 / 工具 | 综合评分 |
|---|---|---|---|---|
| 60 | [代码审查的七层把关](/60-claude-code-team-code-review) | [验收这一次的产出 · 测试、审查与完成标准](/guide/review) | <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span> | <span class="rating-stars" style="--r:4" aria-hidden="true"></span> **4.0** |
| 61 | [Codex 跑 25 小时的四份 Markdown](/61-codex-long-horizon-tasks) | [做规划 · 需求澄清与任务拆解](/guide/planning) | <span class="type-tag type-article">文章</span> <span class="tool-tag tool-codex">Codex</span> | <span class="rating-stars" style="--r:3.5" aria-hidden="true"></span> **3.5** |
| 62 | [评测设计与爬分不自欺](/62-claude-eval-design-hillclimbing) | [评测代理本身与给动作把关 · 评测、分类器与分数噪声](/guide/evals) | <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span> | <span class="rating-stars" style="--r:4" aria-hidden="true"></span> **4.0** |
| 63 | [让代理批量开维护 PR](/63-openai-gpt-6-software-maintenance) | [接进 PR 与 CI · 触发、审查与流水线](/guide/ci) | <span class="type-tag type-article">文章</span> <span class="tool-tag tool-codex">Codex</span> | <span class="rating-stars" style="--r:3.5" aria-hidden="true"></span> **3.5** |

每篇的实用性、深度评分见文章标题下方，[全部资料页](/all#scores)可以按评分排序。

## 知识库全景图

按“阶段 → 资料”展示全部 63 份资料，从左到右就是一个任务从开始到上线的顺序。每个阶段指南里还有更细的“问题 → 资料”小图。

- **[打地基 · 上下文与规范](/guide/foundation)**：让代理每次开工都拿到对的上下文：规则文件、Skills、团队规范，以及能被自动验证的代码库。
- **[做规划 · 需求澄清与任务拆解](/guide/planning)**：动手前把需求问清楚、把任务拆好：让代理采访你、找出未知、研究→计划→实施、plan mode。
- **[去执行 · 从单代理到多代理](/guide/execution)**：让代理把活干完：真实项目里的单代理用法，到子代理、并行 worktree、代理团队和长时自主任务。
- **[验收这一次的产出 · 测试、审查与完成标准](/guide/review)**：确认代理这一次真的做完、做对：测试驱动、代理手动测试、人工与对抗式审查、AI 审查器和独立的完成标准。
- **[评测代理本身与给动作把关 · 评测、分类器与分数噪声](/guide/evals)**：不只看一次产出，而是系统地评测代理和它的配置：评测零件与 pass@k、给 Skill 写评测、评测分数里的噪声，以及给代理动作把关的权限分类器。
- **[接进 PR 与 CI · 触发、审查与流水线](/guide/ci)**：让代理脱离聊天框、接进团队流水线：定时与事件触发、无人值守的规则、PR 审查机器人和 CI 自动修复。
- **[云端与后台运行环境 · 代理在哪里跑](/guide/cloud)**：让代理离开你的笔记本：云端会话、托管 VM、自托管执行机器和沙箱机队，以及背后的持久化与安全布局。
- **[看原理 · Harness 与内部机制](/guide/harness)**：理解代理外壳怎么工作：上下文、权限、循环和“做与查分离”背后的设计。

```mermaid
flowchart LR
  subgraph S1["打地基"]
    direction TB
    A49["49 代理规模的源码管理"]
    A52["52 Claude Code mods"]
    A46["46 Grok Build 记忆"]
    A37["37 代理用的开发环境"]
    A14["14 Skills 管 UI 风格"]
    A07["07 规范变 lint 和测试"]
    A26["26 8 根验证支柱"]
    A21["21 Skills 按需加载"]
    A20["20 规则文件少即是多"]
    A28["28 Hooks 确定性规则"]
    A49 ~~~ A52
    A52 ~~~ A46
    A46 ~~~ A37
    A37 ~~~ A14
    A14 ~~~ A07
    A07 ~~~ A26
    A26 ~~~ A21
    A21 ~~~ A20
    A20 ~~~ A28
  end
  subgraph S2["做规划"]
    direction TB
    A06["06 找未知 做减法"]
    A03["03 访谈式需求"]
    A13["13 plan mode 实测"]
    A61["61 四份 Markdown 长任务"]
    A29["29 Conductor 上下文驱动"]
    A04["04 RPI 有意压缩"]
    A06 ~~~ A03
    A03 ~~~ A13
    A13 ~~~ A61
    A61 ~~~ A29
    A29 ~~~ A04
  end
  subgraph S3["去执行"]
    direction TB
    A42["42 Codex 应用全景"]
    A08["08 子代理切片审查"]
    A23["23 worktree 并行"]
    A11["11 Steinberger 十个 checkout"]
    A17["17 16 代理写编译器"]
    A27["27 Mitchell 六步采用"]
    A05["05 Builder 加 Validator"]
    A18["18 数百代理分层"]
    A30["30 并行代理做大重构"]
    A42 ~~~ A08
    A08 ~~~ A23
    A23 ~~~ A11
    A11 ~~~ A17
    A17 ~~~ A27
    A27 ~~~ A05
    A05 ~~~ A18
    A18 ~~~ A30
  end
  subgraph S4["验收这一次的产出"]
    direction TB
    A60["60 七层审查 按风险定人数"]
    A15["15 skeptic 证伪"]
    A59["59 独立完成标准"]
    A12["12 测试全绿也要读"]
    A32["32 Devin 带证据交付"]
    A25["25 TDD 与手动测试"]
    A31["31 审查精确率优先"]
    A60 ~~~ A15
    A15 ~~~ A59
    A59 ~~~ A12
    A12 ~~~ A32
    A32 ~~~ A25
    A25 ~~~ A31
  end
  subgraph S5["评测代理本身与给动作把关"]
    direction TB
    A62["62 留出集爬分"]
    A39["39 风险分类器与评测"]
    A56["56 两段式权限分类器"]
    A50["50 评测里的基础设施噪声"]
    A47["47 Skill 评测"]
    A19["19 Agent Evals"]
    A62 ~~~ A39
    A39 ~~~ A56
    A56 ~~~ A50
    A50 ~~~ A47
    A47 ~~~ A19
  end
  subgraph S6["接进 PR 与 CI"]
    direction TB
    A63["63 维护 PR 删死代码"]
    A41["41 定时代理六规则"]
    A57["57 配置变更跑评测"]
    A10["10 PR 审查 CI 看护"]
    A55["55 Skills 接进 CI"]
    A33["33 Bugbot 解决率"]
    A22["22 codex exec 修 CI"]
    A34["34 Grok Build 无人值守"]
    A63 ~~~ A41
    A41 ~~~ A57
    A57 ~~~ A10
    A10 ~~~ A55
    A55 ~~~ A33
    A33 ~~~ A22
    A22 ~~~ A34
  end
  subgraph S7["云端与后台运行环境"]
    direction TB
    A53["53 代理沙箱机队"]
    A48["48 Claude Code 云端会话"]
    A58["58 协调代理派活"]
    A02["02 Slack 派活 扇出审查"]
    A51["51 自托管执行机器"]
    A01["01 Routines 与验证"]
    A40["40 云端代理运行层"]
    A53 ~~~ A48
    A48 ~~~ A58
    A58 ~~~ A02
    A02 ~~~ A51
    A51 ~~~ A01
    A01 ~~~ A40
  end
  subgraph S8["看原理"]
    direction TB
    A43["43 Codex app server"]
    A54["54 harness 省 token"]
    A09["09 Codex harness 拆解"]
    A45["45 大脑与双手解耦"]
    A16["16 Planner Generator Evaluator"]
    A38["38 递归 Planner 加 handoff"]
    A24["24 Ralph 循环"]
    A35["35 Amp 专长子代理"]
    A36["36 代码调用 MCP"]
    A44["44 Architect Editor 双模型"]
    A43 ~~~ A54
    A54 ~~~ A09
    A09 ~~~ A45
    A45 ~~~ A16
    A16 ~~~ A38
    A38 ~~~ A24
    A24 ~~~ A35
    A35 ~~~ A36
    A36 ~~~ A44
  end
  S1 --> S2 --> S3 --> S4 --> S5 --> S6 --> S7 --> S8
```

## 不知道从哪开始？

- **完全新手**：走[🌱 新手路径](/paths#beginner)，第一篇读 [#27 Mitchell Hashimoto 的六步路线](/27-mitchellh-ai-adoption-journey)。
- **想马上抄作业**：去[🧩 模式库](/patterns)，每个做法都链接到原文小节，配置和提示词原文就在文章里。
- **想看全貌**：读[总结与最佳实践](/00-summary)，或打开[📚 全部资料](/all)按阶段浏览。

::: info 资料来源与可信度
所有链接均已核实存在。视频以字幕 / 官方文字稿为主要依据，截图全部来自视频画面；文章和文档以原文全文为依据，抓取日期写在每篇“基本信息”表的“分析依据”一行。例外和局限都在对应文章中注明，覆盖情况与缺口见[全部资料页末尾](/all#coverage)。
:::
