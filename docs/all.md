# 📚 全部资料

<div class="hook">

**分类原则：按一个 AI 代理开发任务从开始到上线的顺序分组。** 知识库收录的全部 36 份资料分在 6 个阶段里，每份只放在它主要贡献所在的那个阶段。每条标出资料类型（视频 / 文章 / 官方文档 / 指南）和所用工具。

</div>

::: tip 快速跳转
[打地基 · 上下文与规范](#domain-foundation) → [做规划 · 需求澄清与任务拆解](#domain-planning) → [去执行 · 从单代理到多代理](#domain-execution) → [做验证 · 测试、评测与审查](#domain-verification) → [自动化 · 后台代理与 CI/CD](#domain-automation) → [看原理 · Harness 与内部机制](#domain-harness)
:::

## 打地基 · 上下文与规范 {#domain-foundation}

**这一组放什么**：让代理每次开工都拿到对的上下文：规则文件、Skills、团队规范，以及能被自动验证的代码库。

📘 **先读阶段指南**：[打地基 · 上下文与规范](/guide/foundation)

### CLAUDE.md 怎么写：少即是多 {#item-20}

- **[Writing a good CLAUDE.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Kyle ／ HumanLayer 博客 ｜ 发布：2025-11-25 ｜ 工具：Claude Code（同样适用于 AGENTS.md）
  - 看点：抓包发现 CLAUDE.md 被注入时带着“可能与任务无关”的提醒；指令有预算；只写 WHAT / WHY / HOW，细节拆到 agent_docs/，风格交给 linter。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/20-humanlayer-writing-good-claude-md)

### 别造代理，写 Skills {#item-21}

- **[Don't Build Agents, Build Skills Instead](https://www.youtube.com/watch?v=CEvIs9y1uog)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Barry Zhang、Mahesh Murag（Anthropic）／ AI Engineer ｜ 发布：2025-12-08 ｜ 工具：Claude Code、Claude Agent SDK、Agent Skills、MCP
  - 看点：Skills 就是一个文件夹：SKILL.md + 脚本和资料；三层渐进加载；MCP 管“能连到什么”，Skills 管“知道怎么做”。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/21-anthropic-agent-skills-talk)

### 用 Skills 约束 UI 风格 {#item-14}

- **[I Put Grok Build to the Test](https://www.youtube.com/watch?v=W8wECVc3z6E)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-grokbuild">Grok Build</span>
  - 讲者 / 频道：OrcDev ｜ 发布：2026-05-19 ｜ 工具：Grok Build + Grok 4.3
  - 看点：复用项目已有的设计 skills，一份计划式 prompt 在 2 分 55 秒内生成风格一致的完整页面。
  - 👉 [阅读分析](/14-orcdev-grok-build-skills)

### 让代码库为代理做好准备 {#item-26}

- **[Making Codebases Agent Ready](https://www.youtube.com/watch?v=ShuJ_CN6zr4)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-general">通用（不限工具）</span>
  - 作者 / 来源：Eno Reyes（Factory）／ AI Engineer ｜ 发布：2025-12-22 ｜ 工具：与工具无关；提到 Factory Droid、AGENTS.md
  - 看点：限制代理的是代码库的自动化验证，不是模型；给代码库的 8 根验证支柱打分；先把单任务做到接近 100%，再谈并行。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/26-factory-agent-ready-codebases)

### 把团队规范变成 lint 和测试 {#item-07}

- **[Harness Engineering: How to Build Software When Humans Steer, Agents Execute — Ryan Lopopolo, OpenAI](https://www.youtube.com/watch?v=am_oeAoUhew)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-codex">Codex</span>
  - 讲者 / 频道：Ryan Lopopolo（OpenAI）／ AI Engineer ｜ 发布：2026-04-16 ｜ 工具：Codex
  - 看点：禁止团队碰编辑器；750 包仓库、文件行数测试、带修复指引的 lint、按 persona 的 CI reviewer、每周 Garbage Collection Day。
  - 👉 [阅读分析](/07-harness-engineering)

### Hooks：让规则一定会执行 {#item-28}

- **[Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide)** <span class="type-tag type-docs">官方文档</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Anthropic ／ Claude Code 官方文档 ｜ 发布：持续更新（抓取于 2026-10-09） ｜ 工具：Claude Code hooks（`settings.json`、`/hooks`）；对照 Gemini CLI hooks（Google Developers Blog，2026-01-28）
  - 看点：PostToolUse 自动格式化、PreToolUse + 退出码 2 拦截敏感文件、压缩后重新注入约定、Stop prompt / agent hook；PreToolUse 的 deny 在跳过权限模式下仍生效。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/28-claude-code-hooks-guide)

## 做规划 · 需求澄清与任务拆解 {#domain-planning}

**这一组放什么**：动手前把需求问清楚、把任务拆好：让代理采访你、找出未知、研究→计划→实施、plan mode。

📘 **先读阶段指南**：[做规划 · 需求澄清与任务拆解](/guide/planning)

### 访谈式需求与可验证组件 {#item-03}

- **[How we Claude Code](https://www.youtube.com/watch?v=IlqJqcl8ONE)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 讲者 / 频道：Arno（Anthropic Applied AI）／ Claude ｜ 发布：2026-05-22 ｜ 工具：Claude Code（AskUserQuestion、Auto mode）、Playwright MCP
  - 看点：让 Claude 采访你写 spec → 四套 HTML 设计 → 组件输出 `data-verify-*` 契约供代理 / CI 运行时核验。
  - 👉 [阅读分析](/03-how-we-claude-code)

### 找出未知，给上下文做减法 {#item-06}

- **[Field Guide to Fable — Thariq Shihipar, Anthropic](https://www.youtube.com/watch?v=9fubhllmsBU)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 讲者 / 频道：Thariq Shihipar（Anthropic）／ AI Engineer ｜ 发布：2026-07-06 ｜ 工具：Claude Code
  - 看点：Claude Code 删掉 80% system prompt；blind spot pass、HTML 原型、访谈、实现笔记、让模型 quiz 你。
  - 👉 [阅读分析](/06-field-guide-to-fable)

### RPI：研究、计划、实施 {#item-04}

- **[No Vibes Allowed: Solving Hard Problems in Complex Codebases – Dex Horthy, HumanLayer](https://www.youtube.com/watch?v=rmvDxxNubIg)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 讲者 / 频道：Dex Horthy（HumanLayer）／ AI Engineer ｜ 发布：2025-12-02 ｜ 工具：Claude Code（子代理、slash commands）
  - 看点：Research → Plan → Implement 与“频繁有意压缩”，把上下文控制在“smart zone”；附 HumanLayer 开源命令原文。
  - 👉 [阅读分析](/04-no-vibes-allowed-rpi)

### Grok Build 实测：从计划到执行 {#item-13}

- **[Grok Build + Grok 4.3 FULL Test – xAI's Claude Code & Codex Competitor!](https://www.youtube.com/watch?v=X6SubdG4NuU)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-grokbuild">Grok Build</span>
  - 讲者 / 频道：Bijan Bowen ｜ 发布：2026-05-15 ｜ 工具：Grok Build + Grok 4.3
  - 看点：plan mode 的可交互计划（含 non-goals 与成功指标）、截图反馈、无头浏览器自测，以及越界行为等问题。
  - 👉 [阅读分析](/13-bijan-bowen-grok-build)

### Conductor：把计划写进仓库 {#item-29}

- **[Conductor: Introducing context-driven development for Gemini CLI](https://developers.googleblog.com/conductor-introducing-context-driven-development-for-gemini-cli/)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-gemini">Gemini CLI</span>
  - 作者 / 来源：Keith Ballinger、Jay Kornder、Sherzat Aitbayev ／ Google Developers Blog ｜ 发布：2025-12-17（后续更新 2026-02-13） ｜ 工具：Gemini CLI + Conductor 扩展
  - 看点：setup 写下产品、技术栈和流程；每个需求生成 spec.md 和 plan.md，人审后执行并逐项打勾；后来加入对照计划和规范的自动审查。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/29-gemini-cli-conductor)

## 去执行 · 从单代理到多代理 {#domain-execution}

**这一组放什么**：让代理把活干完：真实项目里的单代理用法，到子代理、并行 worktree、代理团队和长时自主任务。

📘 **先读阶段指南**：[去执行 · 从单代理到多代理](/guide/execution)；另有[专题：长时自主任务](/guide/long-running)

### 从怀疑到离不开：六步采用 AI {#item-27}

- **[My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-general">通用（不限工具）</span>
  - 作者 / 来源：Mitchell Hashimoto ／ mitchellh.com ｜ 发布：2026-02-05 ｜ 工具：与工具无关；提到 Claude Code、Amp、Gemini
  - 看点：六步：扔掉聊天框 → 重做自己的活 → 下班前 30 分钟 → 外包稳赢的任务 → 改造 harness → 始终有一个代理在跑。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/27-mitchellh-ai-adoption-journey)

### 一个人用 Codex 建 OpenClaw {#item-11}

- **[Builders Unscripted: Ep. 1 - Peter Steinberger, Creator of OpenClaw](https://www.youtube.com/watch?v=9jgcT0Fqt7U)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-codex">Codex</span>
  - 讲者 / 频道：Peter Steinberger，主持 Romain Huet ／ OpenAI ｜ 发布：2026-02-24 ｜ 工具：Codex（早期 Claude Code）
  - 看点：“Do you have any questions?”、10 个 checkout 并行、外部 PR 先让代理解释意图再决定方案。
  - 👉 [阅读分析](/11-peter-steinberger-openclaw)

### Builder + Validator 代理团队 {#item-05}

- **[Claude Code Task System: ANTI-HYPE Agentic Coding (Advanced)](https://www.youtube.com/watch?v=4_2j5wgt_ds)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 讲者 / 频道：IndyDevDan ｜ 发布：2026-02-02 ｜ 工具：Claude Code（Task 系统、Hooks、子代理）
  - 看点：用模板元提示词生成计划，再让 builder / validator 成对的子代理通过 Task 依赖协作、自检。
  - 👉 [阅读分析](/05-indydevdan-task-system)

### Codex 子代理、Hooks 与插件 {#item-08}

- **[OpenAI Codex Masterclass — Vaibhav Srivastav & Katia Gil Guzman](https://www.youtube.com/watch?v=MhHEGMFCEB0)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-codex">Codex</span>
  - 讲者 / 频道：VB、Katia Gil Guzman（OpenAI）／ AI Engineer ｜ 发布：2026-04-29 ｜ 工具：Codex（subagents、Code Review、Plugins、Hooks）
  - 看点：现场让 20 个子代理分片审查 45 个 persona 文件；只读审查 persona、stop hook “再验证一轮”。
  - 👉 [阅读分析](/08-codex-masterclass)

### 5 个并行代理 + worktree {#item-23}

- **[Parallel Claude Code + Git Worktrees](https://www.youtube.com/watch?v=rFGlJ4oIlhw)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Cole Medin ／ Cole Medin ｜ 发布：2026-04-23 ｜ 工具：Claude Code（`claude -w`、自定义命令、子代理）、Codex 插件、GitHub CLI、Neon
  - 看点：issue → worktree → PR 的并行流程；全新会话 + 跨模型审查；自愈层；现场解决端口、依赖、数据库冲突。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/23-cole-medin-parallel-worktrees)

### 16 个代理并行写 C 编译器 {#item-17}

- **[Building a C compiler with a team of parallel Claudes](https://www.anthropic.com/engineering/building-c-compiler)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Nicholas Carlini（Anthropic）／ Anthropic Engineering 博客 ｜ 发布：2026-02-05 ｜ 工具：Claude Code（`claude -p`）、Claude Opus 4.6、Docker、git
  - 看点：16 个代理、无编排者，靠死循环脚本 + 共享 git + 锁文件协作；用 GCC 当 Oracle 拆分内核 bug；近 2,000 个会话、略低于 $20,000。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/17-anthropic-c-compiler-agent-teams)

### 数百个代理协作写浏览器 {#item-18}

- **[Scaling long-running autonomous coding](https://cursor.com/blog/scaling-agents)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-cursor">Cursor</span>
  - 作者 / 来源：Wilson Lin ／ Cursor 博客 ｜ 发布：2026-01-14 ｜ 工具：Cursor 自研多代理 harness；GPT-5.2、GPT-5.1-Codex、Opus 4.5
  - 看点：扁平协作 + 锁在数百代理时失败，改成 Planner / Worker / Judge 分层；按角色选模型；integrator 角色反成瓶颈。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/18-cursor-scaling-long-running-agents)

### 大型重构拆给并行代理 {#item-30}

- **[Automating Large Scale Refactors with Parallel Agents - Robert Brennan, OpenHands](https://www.youtube.com/watch?v=rcsliSIy_YU)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-openhands">OpenHands</span>
  - 讲者 / 频道：Robert Brennan（OpenHands）／ AI Engineer ｜ 发布：2026-01-08 ｜ 工具：OpenHands、Agent SDK、Refactor SDK
  - 看点：代理一次做不完大迁移；迁移分支 + 背景说明 + 3–5 个并行代理 + 每个 PR 人审；拆任务的五条标准；按依赖图分批、验证器 + 修复器；Redux 迁 Zustand 的临时脚手架。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/30-openhands-parallel-refactors)

## 做验证 · 测试、评测与审查 {#domain-verification}

**这一组放什么**：确认代理真的做完、做对：测试驱动、代理手动测试、人工与对抗式审查、系统评测。

📘 **先读阶段指南**：[做验证 · 测试、评测与审查](/guide/verification)

### 测试驱动与代理手动测试 {#item-25}

- **[Agentic Engineering Patterns（测试与 QA 章节）](https://simonwillison.net/guides/agentic-engineering-patterns/)** <span class="type-tag type-guide">指南</span> <span class="tool-tag tool-general">通用（不限工具）</span>
  - 作者 / 来源：Simon Willison ／ simonwillison.net ｜ 发布：2026-02-23 起连载 ｜ 工具：与工具无关；提到 Claude Code、Codex、Showboat、Rodney
  - 看点：“Use red/green TDD”“First run the tests”；测试通过后让代理手动测试并留下 Showboat 记录；别把没审过的代码丢给同事。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/25-simonw-agentic-engineering-testing-patterns)

### 测试全绿也要读代码 {#item-12}

- **[Coding with Grok 4.5 is surprisingly good…](https://www.youtube.com/watch?v=5J6HCDEkg64)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-grok45">Cursor + Grok 4.5</span>
  - 讲者 / 频道：ForrestKnight ｜ 发布：2026-07-10 ｜ 工具：Cursor + Grok 4.5
  - 看点：24 个测试全绿、Clippy 无警告，逐行审查仍发现字符串比较版本号、重复造轮子；对比 Fable 5 / Opus 4.8。
  - 👉 [阅读分析](/12-forrestknight-grok-4-5)

### 57 个子代理与对抗式验证 {#item-15}

- **[@space-xai Grok Build Spawned 57 Agents in 3 Minutes. Here's Why I Wasn't Worried.](https://www.youtube.com/watch?v=1NwO2dPzwRM)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-grokbuild">Grok Build</span>
  - 讲者 / 频道：Thierry Damiba ／ Arcade ｜ 发布：2026-09-09 ｜ 工具：Grok Build + Grok 4.5（plan mode、subagents、`/goal`）
  - 看点：57 个并行子代理审查文件；`/goal` 声称完成后，skeptic 验证代理发现真实问题并只复查 delta。（字幕质量差，结合简介 + 官方文档分析）
  - 👉 [阅读分析](/15-arcade-grok-build-57-agents)

### Agent Evals 入门 {#item-19}

- **[Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-general">通用（不限工具）</span>
  - 作者 / 来源：Mikaela Grace 等（Anthropic）／ Anthropic Engineering 博客 ｜ 发布：2026-01-09 ｜ 工具：与工具无关
  - 看点：评测的零件（Task / Trial / Grader）、三种评分器怎么搭配、能力评测与回归评测、pass@k 与 pass^k，以及从 0 到 1 的路线图。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/19-anthropic-demystifying-agent-evals)

### AI 代码审查：精确率优先 {#item-31}

- **[A Practical Approach to Verifying Code at Scale](https://alignment.openai.com/scaling-code-verification/)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-codex">Codex</span>
  - 作者 / 来源：Maja Trębacz 等（OpenAI，与 Codex 团队合作）／ OpenAI Alignment Research Blog ｜ 发布：2025-12-01 ｜ 工具：Codex Code Review、`/review`
  - 看点：精确率比召回率重要；审查者要能读整个仓库、运行代码；训练用的检查器和交给人用的审查器要分开；作者对 52.7% 的评论用代码修改回应。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/31-openai-verifying-code-at-scale)

### Devin 用 Computer Use 自测 {#item-32}

- **[Verifying Agentic Development at Scale](https://cognition.com/blog/testing-development)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-devin">Devin</span>
  - 作者 / 来源：Ido Pesok ／ Cognition 博客 ｜ 发布：2026-05-29 ｜ 工具：Devin（云端虚拟机、Computer Use、测试模式）
  - 看点：异步触发的会话已超过交互式；测试计划基于源码；操作前先写预期；登录写成确定性脚本放进测试技能；交回截图报告和分章节录屏。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/32-cognition-verifying-agentic-development)

## 自动化 · 后台代理与 CI/CD {#domain-automation}

**这一组放什么**：让代理脱离聊天框：事件触发、后台运行、PR 审查和 CI 自动修复。

📘 **先读阶段指南**：[自动化 · 后台代理与 CI/CD](/guide/automation)

### Claude Code 一周年：验证与 Routines {#item-01}

- **[Reflecting on a year of Claude Code](https://www.youtube.com/watch?v=Hth_tLaC2j8)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 讲者 / 频道：Boris Cherny、Cat Wu（Anthropic）／ Claude ｜ 发布：2026-06-08 ｜ 工具：Claude Code（Routines、Auto mode、`/loop`、Remote Control）
  - 看点：每次犯错就写进 CLAUDE.md / Skill；验证 = “can the agent run the thing?”；用 routine 自动修 bug、盯 PR。
  - 👉 [阅读分析](/01-claude-code-one-year)

### Claude Code 团队的工作流 {#item-02}

- **[How the Claude Code team uses Claude Code](https://www.youtube.com/watch?v=S-sYlFiGFv8)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 讲者 / 频道：Thariq Shihipar、Sid Bidasaria、Robert Boyce（Anthropic）／ Claude ｜ 发布：2026-09-02 ｜ 工具：Claude Code、Claude Tag
  - 看点：70–80% 工作经由 Slack 原生的 Claude Tag；给目标而非任务；扇出找 bug + 对抗式复审的 workflow。
  - 👉 [阅读分析](/02-claude-code-team-workflows)

### OpenAI 用 Codex 守住 PR 质量 {#item-10}

- **[OpenAI @ Replay 2026 | How OpenAI Uses Codex to Change How We Build](https://www.youtube.com/watch?v=NjaX4qt-O1Y)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-codex">Codex</span>
  - 讲者 / 频道：Dominik Kundel（OpenAI）／ Temporal ｜ 发布：2026-05-28 ｜ 工具：Codex（GitHub Code Review、babysitting skill、`/goal`）
  - 看点：context → validation → verification 飞轮；100% PR 经 Codex review；PR 看护 skill 盯 CI；手机上完成“修复→预览→合并”。
  - 👉 [阅读分析](/10-how-openai-uses-codex)

### CI 挂了让 Codex 自动修 {#item-22}

- **[Non-interactive mode / Codex GitHub Action](https://developers.openai.com/codex/noninteractive)** <span class="type-tag type-docs">官方文档</span> <span class="tool-tag tool-codex">Codex</span>
  - 作者 / 来源：OpenAI ／ Codex 官方文档 ｜ 发布：持续更新（抓取于 2026-10-09） ｜ 工具：Codex CLI（`codex exec`）、`openai/codex-action@v1`、GitHub Actions
  - 看点：`codex exec` 的管道、JSONL、结构化输出；CI 失败自动修复的两段式布局：只读 job 拿密钥生成补丁，无密钥 job 开 PR。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/22-openai-codex-ci-autofix)

### Bugbot：用解决率迭代审查机器人 {#item-33}

- **[Building a better Bugbot](https://cursor.com/blog/building-bugbot)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-cursor">Cursor</span>
  - 作者 / 来源：Jon Kaplan ／ Cursor 博客 ｜ 发布：2026-01-15 ｜ 工具：Cursor Bugbot、Bugbot rules、Bugbot Autofix
  - 看点：8 次并行审查 + 多数投票 + 验证模型；用“解决率”衡量并做了 40 次实验（52% → 70% 以上）；代理式架构后提示词从克制改为激进。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/33-cursor-building-bugbot)

### Grok Build 跑进脚本和 CI {#item-34}

- **[Hooks](https://docs.x.ai/build/features/hooks)** 等 Grok Build 文档页 <span class="type-tag type-docs">官方文档</span> <span class="tool-tag tool-grokbuild">Grok Build</span>
  - 作者 / 来源：xAI ／ Grok Build 官方文档（Hooks、Headless & Scripting、AGENTS.md、Background Tasks、Worktrees） ｜ 发布：2026-06-10 至 2026-07-21 更新（抓取于 2026-10-09） ｜ 工具：Grok Build CLI
  - 看点：`grok -p` + JSON 输出；兼容 Claude Code / Cursor 的 hook 文件，PreToolUse 是唯一能拦截的事件，出错时故障放行；`/loop` 定时任务；`grok -w` worktree。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/34-grok-build-headless-hooks)

## 看原理 · Harness 与内部机制 {#domain-harness}

**这一组放什么**：理解代理外壳怎么工作：上下文、权限、循环和“做与查分离”背后的设计。

📘 **先读阶段指南**：[看原理 · Harness 与内部机制](/guide/harness)

### Codex Harness 内部机制 {#item-09}

- **[How Codex Works — Dominik Kundel, OpenAI](https://www.youtube.com/watch?v=shRR1e2HXMk)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-codex">Codex</span>
  - 讲者 / 频道：Dominik Kundel（OpenAI）／ AI Engineer ｜ 发布：2026-08-10 ｜ 工具：Codex harness（开源）、Responses API
  - 看点：deferred tools、skills 占 2% 上下文上限、只读 Auto Review 子代理、`/goal` continuation prompt、服务端 compaction。
  - 👉 [阅读分析](/09-how-codex-works)

### Ralph 循环：为什么每轮重开 {#item-24}

- **[Ralph Wiggum (and why Claude Code's implementation isn't it)](https://www.youtube.com/watch?v=O2bBWDoxO4s)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Geoffrey Huntley、Dex Horthy ／ Geoffrey Huntley（直播录像） ｜ 发布：2026-01-04 ｜ 工具：Claude Code、官方 Ralph Wiggum 插件、bash、tmux
  - 看点：Ralph 最纯粹的形式是一行 bash；每轮全新上下文、一轮一个目标；与官方插件（Stop hook、同一会话）的差别。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/24-huntley-horthy-ralph-loop)

### Planner / Generator / Evaluator 长时 harness {#item-16}

- **[Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Prithvi Rajasekaran（Anthropic Labs）／ Anthropic Engineering 博客 ｜ 发布：2026-03-24 ｜ 工具：Claude Agent SDK、Claude Opus 4.5 / 4.6、Playwright MCP
  - 看点：Planner 扩写规格、Generator 实现、Evaluator 用浏览器实测打分；单代理 20 分钟 / $9 做出的游戏是坏的，完整 harness 6 小时 / $200 能玩；模型升级后逐个拆脚手架。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/16-anthropic-harness-design-long-running-apps)

### Amp 的专长子代理架构 {#item-35}

- **[Amp Code: Next Generation AI Coding – Beyang Liu, Amp Code](https://www.youtube.com/watch?v=gvIAkmZUEZY)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-amp">Amp</span>
  - 讲者 / 频道：Beyang Liu（Sourcegraph）／ AI Engineer ｜ 发布：2025-12-22 ｜ 工具：Amp
  - 看点：代理 = 模型 + 工具 + 循环；精选工具而非大量接 MCP；读太少会陷入 doom loop；Finder / Oracle / Librarian / Kraken 专长子代理；不做模型选择器。附演讲后的产品变化。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/35-amp-next-generation-ai-coding)

### 用代码调用 MCP 省上下文 {#item-36}

- **[Code execution with MCP: Building more efficient agents](https://www.anthropic.com/engineering/code-execution-with-mcp)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-general">通用（不限工具）</span>
  - 作者 / 来源：Adam Jones、Conor Kelly ／ Anthropic Engineering 博客 ｜ 发布：2025-11-04 ｜ 工具：MCP + 代码执行环境（与具体代理无关）
  - 看点：工具定义和中间结果都在吃上下文；把 MCP 服务器包装成文件树里的代码 API，按需加载，示例 token 从 150,000 降到 2,000；渐进披露、结果过滤、隐私脱敏、沉淀成技能；代价是沙箱。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/36-anthropic-code-execution-with-mcp)

## 覆盖情况与已知缺口（如实说明） {#coverage}

按阶段：打地基 6 篇（#20、#21、#14、#26、#07、#28）；做规划 5 篇（#03、#06、#04、#13、#29）；去执行 8 篇（#27、#11、#05、#08、#23、#17、#18、#30）；做验证 6 篇（#25、#12、#15、#19、#31、#32）；自动化 6 篇（#01、#02、#10、#22、#33、#34）；看原理 5 篇（#09、#24、#16、#35、#36）。“去执行”已到 8 篇，下一批新增前需要检查归类是否偏了。

按类型：视频 21 篇；文章 11 篇（#16–#20、#27、#29、#31、#32、#33、#36）；官方文档 3 篇（#22、#28、#34）；指南 1 篇（#25）。

按工具：

| 工具 | 数量 | 资料 | 说明 |
|---|---|---|---|
| Claude Code | 13 | #01–#06、#16、#17、#20、#21、#23、#24、#28 | 内容最充足，官方团队直接讲内部用法；#28 为官方 hooks 文档 |
| Codex | 7 | #07–#11、#22、#31 | 官方工程师讲 harness 与内部流程，#22 为官方文档，#31 为 OpenAI 对齐团队的审查器研究 |
| Grok（Grok Build / Cursor + Grok 4.5） | 5 | #12–#15、#34 | 2026-10-09 第二批补上了 xAI 官方文档（#34）；仍缺官方工程演讲，见下 |
| Cursor | 2 | #18、#33 | 公司研究博客 |
| Gemini CLI | 1 | #29 | Google 官方博客；#28 中附有 Gemini CLI hooks 对照 |
| OpenHands | 1 | #30 | 大会研讨会 |
| Devin | 1 | #32 | Cognition 官方博客 |
| Amp | 1 | #35 | 大会演讲；演讲后产品有较大变化，文中已注明 |
| 通用（不限工具） | 5 | #19、#25、#26、#27、#36 | 方法论、评测与 MCP 设计，适用于任何编码代理 |

**Grok 的缺口：**
- 2026-10-09 第二批收录了 xAI 官方 Grok Build 文档（#34：hooks、headless、AGENTS.md、`/loop`、worktree），内容实在、可复制。但 xAI 官方的**工程博客或大会演讲**（讲设计取舍和团队实践）仍未找到。
- 未找到 xAI 官方频道或 AI Engineer 等大会上关于 Grok Build / Grok 编码代理的长篇工程演讲或实战讲解；Grok 官方频道只有 1–2 分钟的产品宣传片（如 “Introducing Grok 4.5”），不符合“内容实战”的标准，没有收录。
- 收录的 4 个 Grok 视频都是第三方实测：#12、#13、#14 有完整字幕；#15 内容最贴近“多代理 + 验证”主题，但自动字幕质量差，因此结合简介和官方文档分析。
- 讲架构设计和长期团队实践的 Grok 内容（类似 #07、#10 那样）目前没有找到。Grok 部分的结论主要是“工具能力 + 个人体验”，可信度低于 Claude / Codex 部分。
- 已排除：James Montemagno 的 *Grok Code Fast 1 in VS Code*（2025-08，超出 12 个月且仅 4 分钟）；若干标题党 / 新闻解读类 Grok 视频。

**其他说明：**
- 2026-10-09 第二批**仍未覆盖**：Aider（没有找到近 12 个月内够分量的一手资料）；“把 agent evals 接进 CI”的专门资料（评测方法见 #19，但没有可靠的端到端 CI 配置示例）；Cursor 后台代理（Background / Cloud Agents）的专门资料（#33 只提到 Autofix 会启动云端代理）。
- 第二批考虑过但未收录：Google Cloud Tech 的 Gemini CLI 直播《Making a list {and checking it twice}: The Gemini CLI workflow》（https://www.youtube.com/watch?v=4U3nfVxlwlM，1 小时直播，内容与 #29 重叠）。
- 时效：#04、#20、#21、#26 发布于 2025 年 11–12 月，#22（持续更新的文档）与 #25（连载指南）以 2026-10-09 抓取的版本为准，其余均为 2026 年发布。
- 按要求排除了以漏洞挖掘 / 攻防安全为主题的资料，只保留软件开发工作流。
- 未收录但可作延伸阅读：Ryan Lopopolo 在 Latent Space 的长访谈 *Extreme Harness Engineering*（https://www.youtube.com/watch?v=CeOXx-XTYek，与 #07 同一讲者，含 Symphony 编排器）；Jason Liu 在 OpenAI DevDay 2026 的 *From Single Player to Multiplayer with Codex*（https://www.youtube.com/watch?v=aDTPTwnrRyA，偏知识工作协作）。
