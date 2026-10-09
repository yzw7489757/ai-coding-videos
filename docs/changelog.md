# 🗓️ 更新日志

新资料按批次收录。每批会记录：新增了哪些资料、主题和术语有什么变化、哪些横向页面跟着更新。

## 2026-10-09 · 删除配置模板页，新增三项评分

**删除“配置模板”页**
- 顶部导航去掉“配置模板”，`/templates` 永久跳转到[模式库](/patterns)。
- 原页面的 21 段原文配置都保留在各自的文章里。其中两段原来只在模板页里有，现已逐字补进文章并注明出处：Gemini CLI 的密钥扫描脚本 `block-secrets.sh`（[[28§3.6]]），以及 Ghostty 仓库的 AGENTS.md 全文和 MIT 许可（[[27§3.5]]）。
- 模板页原有的“缺口”说明并入[总结页](/00-summary)的“缺口与局限”。

**新增评分**
- 全部 36 篇资料按**实用性、深度、综合**三项打分（1–5 分，可用半分），每项附一句理由，显示在文章标题下方。综合分兼顾内容质量和来源可信度，不是平均分。
- [全部资料页](/all#scores)新增可排序的评分总表和评分标准，每条资料下显示综合分；首页“最近收录”表增加综合评分列。侧边栏不显示评分。

## 2026-10-09 · 第二批：新增 9 份资料，补上 Hooks 配置和 Ghostty AGENTS.md

**新增资料（#28–#36）**

| # | 资料 | 阶段 | 类型 | 工具 |
|---|---|---|---|---|
| 28 | [Hooks：让规则一定会执行](/28-claude-code-hooks-guide) | [打地基](/guide/foundation) | 官方文档 | Claude Code（附 Gemini CLI hooks 对照） |
| 29 | [Conductor：把计划写进仓库](/29-gemini-cli-conductor) | [做规划](/guide/planning) | 文章 | Gemini CLI |
| 30 | [大型重构拆给并行代理](/30-openhands-parallel-refactors) | [去执行](/guide/execution) | 视频 | OpenHands |
| 31 | [AI 代码审查：精确率优先](/31-openai-verifying-code-at-scale) | [做验证](/guide/verification) | 文章 | Codex |
| 32 | [Devin 用 Computer Use 自测](/32-cognition-verifying-agentic-development) | [做验证](/guide/verification) | 文章 | Devin |
| 33 | [Bugbot：用解决率迭代审查机器人](/33-cursor-building-bugbot) | [自动化](/guide/automation) | 文章 | Cursor |
| 34 | [Grok Build 跑进脚本和 CI](/34-grok-build-headless-hooks) | [自动化](/guide/automation) | 官方文档 | Grok Build |
| 35 | [Amp 的专长子代理架构](/35-amp-next-generation-ai-coding) | [看原理](/guide/harness) | 视频 | Amp |
| 36 | [用代码调用 MCP 省上下文](/36-anthropic-code-execution-with-mcp) | [看原理](/guide/harness) | 文章 | 通用 |

**边界归类说明**
- #28 Hooks 放在“打地基”而不是“自动化”：它的主要贡献是把规则从“建议”变成“一定执行”，和规则文件是同一件事的两面；自动化阶段只引用它的“故障放行”部分。
- #33 Bugbot 放在“自动化”而不是“做验证”：它讲的是一个常驻在 PR 流程里的机器人怎么上线、衡量和迭代，与 #10、#22 同类；审查器设计原则（#31）放在“做验证”，两页互相引用。
- #30 放在“去执行”：核心是怎么组织多个代理把大迁移做完，审查只是流程中的一环。“去执行”现有 8 篇，已到 AGENTS.md 规定的检查线。

**横向页面**
- 6 个阶段指南都更新了收录列表、小导图和推荐阅读顺序；“去执行”新增“大迁移、大重构怎么拆给多个代理”，“做验证”新增“AI 审查工具本身该怎么设计”。分歧表新增 5 条：审查该少报还是多报（#31 vs #33）、干净审查说明什么（#31、#32）、审查机器人怎么衡量（#31 vs #33）、工具多了怎么办（#35 vs #36）、推理模型怎么用（#35）。
- 模式库新增 P21–P29（Hooks 确定性闸门、计划存进仓库、迁移分支 + 临时脚手架、依赖图分批、精确率优先审查、投票 + 解决率、测试计划先于实测、专长子代理、用代码调用 MCP）。
- 配置模板库新增模板 14–21：Claude Code 的 4 段 hooks 配置、Gemini CLI 密钥扫描 hook、Grok Build PreToolUse hook、Conductor `workflow.md` 指导原则、Ghostty 的 AGENTS.md 全文（MIT 许可，附许可全文）。上一批的两项缺口已补上，缺口说明同步更新。
- 学习路径、全部资料（含覆盖情况）、总结页同步更新。新增工具标签：Gemini CLI、OpenHands、Devin、Amp。
- 术语表新增 21 个词，例如 Doom Loop、Code Mode、Prompt / Agent Hook、ACP、Fail-open、解决率、精确率 / 召回率、多数投票、迁移脚手架；`Oracle` 词条补充说明 Amp 的同名子代理是另一回事。

**仍未覆盖**：Aider；“把 agent evals 接进 CI”的专门资料；Cursor 后台代理的专门资料；xAI 官方的 Grok 工程博客或大会演讲（本批只有官方文档）。

## 2026-10-09 · 导航改版：按任务阶段分类

**分类原则改为一条轴：按一个 AI 代理开发任务从开始到上线的顺序分组。** 全部 27 份资料重新归入 6 个阶段，每份只放在它主要贡献所在的阶段：

| 阶段 | 资料 |
|---|---|
| [打地基 · 上下文与规范](/guide/foundation) | #20、#21、#14、#26、#07 |
| [做规划 · 需求澄清与任务拆解](/guide/planning) | #03、#06、#04、#13 |
| [去执行 · 从单代理到多代理](/guide/execution) | #27、#11、#05、#08、#23、#17、#18（另有[长时自主任务专题](/guide/long-running)） |
| [做验证 · 测试、评测与审查](/guide/verification) | #25、#12、#15、#19 |
| [自动化 · 后台代理与 CI/CD](/guide/automation) | #01、#02、#10、#22 |
| [看原理 · Harness 与内部机制](/guide/harness) | #09、#24、#16 |

- 主题指南改为 6 个阶段指南：新增“打地基”和“去执行”（合并原“实战与把关”“多代理协作”），其余四个按新的归类重写。旧地址 `/guide/practice`、`/guide/multi-agent` 自动跳转到 `/guide/execution`。
- 顶部导航只放工具页面：学习路径、模式库、配置模板、术语表、更新日志，以及 GitHub 仓库链接。
- 左侧边栏只做内容导航：6 个阶段，每组先放阶段指南再放文章；文章标题去掉编号和标签，改成简洁的中文标题。类型和工具标签保留在文章标题下方。
- 去掉所有分组名后面的篇数。

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

- 新增第 6 个主题“评测、测试与验证”。复查了 #01–#15，没有需要移入的旧文章（#12、#03、#15 虽然涉及验证，但主线仍属原主题）。
- 资料类型从“只有视频”扩展为 视频 / 文章 / 官方文档 / 指南，侧边栏和文章顶部同时显示类型和工具标签；新增工具标签 Cursor、通用（不限工具）。
- 非视频资料的“基本信息”第一行改为来源卡片（标题、作者、日期、链接），视频仍内嵌播放器。

**新增页面**

- 6 个主题指南（每个主题一页，后已改为阶段指南）+ [长时自主任务专题](/guide/long-running)
- [学习路径](/paths)、[模式库](/patterns)（20 个做法）、配置模板库（13 段原文配置；该页已于 2026-10-09 删除，配置都在各自文章里）、[全部资料](/all)、本页
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
