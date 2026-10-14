---
layout: home
title: AI 编程代理实战知识库
hero:
  name: AI 编程代理实战知识库
  text: 资深工程师怎么用 Claude Code、Codex、Cursor、Grok 写软件
  tagline: 51 份真实存在的演讲、工程博客、官方文档和指南，每份配一篇深度拆解；按 AI 代理开发任务的六个阶段组织，配阶段指南、模式库和学习路径。小白友好，术语可一键查。
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
    title: 做验证 · 测试、评测与审查
    details: 确认代理真的做完、做对：测试驱动、代理手动测试、人工与对抗式审查、系统评测。
    link: /guide/verification
    linkText: 阅读阶段指南
  - icon: ⚙️
    title: 自动化 · 后台代理与 CI/CD
    details: 让代理脱离聊天框：事件触发、后台运行、PR 审查和 CI 自动修复。
    link: /guide/automation
    linkText: 阅读阶段指南
  - icon: 🧠
    title: 看原理 · Harness 与内部机制
    details: 理解代理外壳怎么工作：上下文、权限、循环和“做与查分离”背后的设计。
    link: /guide/harness
    linkText: 阅读阶段指南
---

## 这是什么

**分类原则：按一个 AI 代理开发任务从开始到上线的顺序分组。** 六个阶段依次是：打地基（上下文与规范）→ 做规划 → 去执行 → 做验证 → 自动化，最后是看原理（Harness 与内部机制）。每份资料只放在它主要贡献所在的那个阶段。

一个持续更新的中文知识库，主题是**怎样用编码代理（coding agent）把软件做好**。内容分三层：

| 层次 | 是什么 | 从哪进 |
|---|---|---|
| 单篇资料 | 每份视频 / 文章一篇拆解，开头一份收获清单，再分 5 节：基本信息、这篇在回答什么、怎么做、结果与局限、结论 | 左侧边栏，或[全部资料](/all) |
| 阶段指南 | 每个阶段一页，把多份资料串起来回答几个核心问题，并标出来源之间的分歧 | 左侧边栏每组第一项 |
| 工具页面 | [学习路径](/paths)、[模式库](/patterns)（29 个做法）、[术语表](/glossary)、[更新日志](/changelog)；另有[总结](/00-summary) | 顶部导航 |

整理开始于 2026-10-08，最近一次更新：2026-10-14（见[更新日志](/changelog)）。工具和资料类型标在每篇文章的标题下方。

::: tip 阅读小功能
- **术语一点就懂**：文章里带品牌色点状下划线的词，鼠标悬停能看到一句话解释，点击跳到[术语表](/glossary)。
- **英文原话悬停看翻译**：原话、prompt 和配置保留英文原样，带灰色虚线下划线和“译”角标；悬停、键盘聚焦或手机点按会弹出中文翻译。
- **原始来源一键直达**：视频资料在“基本信息”最上方内嵌 YouTube 播放器；文章、官方文档和指南则放一张来源卡片（标题、作者、日期、链接）。
- **小节级引用**：阶段指南和模式库里的 `#16 §3.5` 这类链接，会直接跳到原文对应小节。
:::

## 🆕 最近收录（2026-10-14，5 份）

| # | 资料 | 阶段 | 类型 / 工具 | 综合评分 |
|---|---|---|---|---|
| 47 | [给 Skill 写评测](/47-openai-eval-skills) | [做验证 · 测试、评测与审查](/guide/verification) | <span class="type-tag type-article">文章</span> <span class="tool-tag tool-codex">Codex</span> | <span class="rating-stars" style="--r:4" aria-hidden="true"></span> **4.0** |
| 48 | [Claude Code 云端会话实战](/48-claude-code-cloud-sessions) | [自动化 · 后台代理与 CI/CD](/guide/automation) | <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span> | <span class="rating-stars" style="--r:3.5" aria-hidden="true"></span> **3.5** |
| 49 | [为代理重做源代码管理](/49-anthropic-scion-source-control) | [打地基 · 上下文与规范](/guide/foundation) | <span class="type-tag type-article">文章</span> <span class="tool-tag tool-general">通用（不限工具）</span> | <span class="rating-stars" style="--r:4" aria-hidden="true"></span> **4.0** |
| 50 | [评测分数里的基础设施噪声](/50-anthropic-infrastructure-noise) | [做验证 · 测试、评测与审查](/guide/verification) | <span class="type-tag type-article">文章</span> <span class="tool-tag tool-general">通用（不限工具）</span> | <span class="rating-stars" style="--r:4.5" aria-hidden="true"></span> **4.5** |
| 51 | [云端代理跑在自己的机器上](/51-cursor-self-hosted-machines) | [自动化 · 后台代理与 CI/CD](/guide/automation) | <span class="type-tag type-article">文章</span> <span class="tool-tag tool-cursor">Cursor</span> | <span class="rating-stars" style="--r:2.5" aria-hidden="true"></span> **2.5** |

每篇的实用性、深度评分见文章标题下方，[全部资料页](/all#scores)可以按评分排序。

## 知识库全景图

按“阶段 → 资料”展示全部 51 份资料，从左到右就是一个任务从开始到上线的顺序。每个阶段指南里还有更细的“问题 → 资料”小图。

- **[打地基 · 上下文与规范](/guide/foundation)**：让代理每次开工都拿到对的上下文：规则文件、Skills、团队规范，以及能被自动验证的代码库。
- **[做规划 · 需求澄清与任务拆解](/guide/planning)**：动手前把需求问清楚、把任务拆好：让代理采访你、找出未知、研究→计划→实施、plan mode。
- **[去执行 · 从单代理到多代理](/guide/execution)**：让代理把活干完：真实项目里的单代理用法，到子代理、并行 worktree、代理团队和长时自主任务。
- **[做验证 · 测试、评测与审查](/guide/verification)**：确认代理真的做完、做对：测试驱动、代理手动测试、人工与对抗式审查、系统评测。
- **[自动化 · 后台代理与 CI/CD](/guide/automation)**：让代理脱离聊天框：事件触发、后台运行、PR 审查和 CI 自动修复。
- **[看原理 · Harness 与内部机制](/guide/harness)**：理解代理外壳怎么工作：上下文、权限、循环和“做与查分离”背后的设计。

```mermaid
flowchart LR
  subgraph S1["打地基"]
    direction TB
    A49["49 代理规模的源码管理"]
    A46["46 Grok Build 记忆"]
    A37["37 代理用的开发环境"]
    A14["14 Skills 管 UI 风格"]
    A07["07 规范变 lint 和测试"]
    A26["26 8 根验证支柱"]
    A21["21 Skills 按需加载"]
    A20["20 规则文件少即是多"]
    A28["28 Hooks 确定性规则"]
    A49 ~~~ A46
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
    A29["29 Conductor 上下文驱动"]
    A04["04 RPI 有意压缩"]
    A06 ~~~ A03
    A03 ~~~ A13
    A13 ~~~ A29
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
  subgraph S4["做验证"]
    direction TB
    A15["15 skeptic 证伪"]
    A12["12 测试全绿也要读"]
    A39["39 风险分类器与评测"]
    A32["32 Devin 带证据交付"]
    A25["25 TDD 与手动测试"]
    A50["50 评测里的基础设施噪声"]
    A47["47 Skill 评测"]
    A19["19 Agent Evals"]
    A31["31 审查精确率优先"]
    A15 ~~~ A12
    A12 ~~~ A39
    A39 ~~~ A32
    A32 ~~~ A25
    A25 ~~~ A50
    A50 ~~~ A47
    A47 ~~~ A19
    A19 ~~~ A31
  end
  subgraph S5["自动化"]
    direction TB
    A41["41 定时代理六规则"]
    A48["48 Claude Code 云端会话"]
    A02["02 Slack 派活 扇出审查"]
    A51["51 自托管执行机器"]
    A01["01 Routines 与验证"]
    A40["40 云端代理运行层"]
    A10["10 PR 审查 CI 看护"]
    A33["33 Bugbot 解决率"]
    A22["22 codex exec 修 CI"]
    A34["34 Grok Build 无人值守"]
    A41 ~~~ A48
    A48 ~~~ A02
    A02 ~~~ A51
    A51 ~~~ A01
    A01 ~~~ A40
    A40 ~~~ A10
    A10 ~~~ A33
    A33 ~~~ A22
    A22 ~~~ A34
  end
  subgraph S6["看原理"]
    direction TB
    A43["43 Codex app server"]
    A09["09 Codex harness 拆解"]
    A45["45 大脑与双手解耦"]
    A16["16 Planner Generator Evaluator"]
    A38["38 递归 Planner 加 handoff"]
    A24["24 Ralph 循环"]
    A35["35 Amp 专长子代理"]
    A36["36 代码调用 MCP"]
    A44["44 Architect Editor 双模型"]
    A43 ~~~ A09
    A09 ~~~ A45
    A45 ~~~ A16
    A16 ~~~ A38
    A38 ~~~ A24
    A24 ~~~ A35
    A35 ~~~ A36
    A36 ~~~ A44
  end
  S1 --> S2 --> S3 --> S4 --> S5 --> S6
```

## 不知道从哪开始？

- **完全新手**：走[🌱 新手路径](/paths#beginner)，第一篇读 [#27 Mitchell Hashimoto 的六步路线](/27-mitchellh-ai-adoption-journey)。
- **想马上抄作业**：去[🧩 模式库](/patterns)，每个做法都链接到原文小节，配置和提示词原文就在文章里。
- **想看全貌**：读[总结与最佳实践](/00-summary)，或打开[📚 全部资料](/all)按阶段浏览。

::: info 资料来源与可信度
所有链接均已核实存在。视频以字幕 / 官方文字稿为主要依据，截图全部来自视频画面；文章和文档以原文全文为依据，抓取日期写在每篇“基本信息”表的“分析依据”一行。例外和局限都在对应文章中注明，覆盖情况与缺口见[全部资料页末尾](/all#coverage)。
:::
