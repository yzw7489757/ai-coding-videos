# 📚 全部资料（27）

<div class="hook">

知识库收录的全部 27 份资料，按**内容主题**分成 6 组。每条标出资料类型（视频 / 文章 / 官方文档 / 指南）和所用工具。每组第一行是该主题的指南，适合先读。

</div>

::: tip 快速跳转
[🛠️ 真实项目实战与人工把关（5）](#domain-practice) · [🧭 需求澄清、规划与上下文管理（5）](#domain-planning) · [🤝 多代理协作与对抗式验证（5）](#domain-multi-agent) · [⚙️ 后台代理、自动化与 CI/CD（5）](#domain-automation) · [🧠 Harness 工程与内部机制（4）](#domain-harness) · [✅ 评测、测试与验证（3）](#domain-verification)
:::

## 🛠️ 真实项目实战与人工把关（5） {#domain-practice}

一个人维护大型开源项目、新工具上手实测、逐行审查 AI 产出，以及从怀疑到熟练的采用路线。

📘 **先读主题指南**：[真实项目实战与人工把关](/guide/practice)

### 11 · Peter Steinberger：用 Codex 建 OpenClaw

- **[Builders Unscripted: Ep. 1 - Peter Steinberger, Creator of OpenClaw](https://www.youtube.com/watch?v=9jgcT0Fqt7U)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-codex">Codex</span>
  - 讲者 / 频道：Peter Steinberger，主持 Romain Huet ／ OpenAI ｜ 发布：2026-02-24 ｜ 工具：Codex（早期 Claude Code）
  - 看点：“Do you have any questions?”、10 个 checkout 并行、外部 PR 先让代理解释意图再决定方案。
  - 👉 [阅读分析](/11-peter-steinberger-openclaw)

### 14 · OrcDev：Skills 约束设计的 UI 开发

- **[I Put Grok Build to the Test](https://www.youtube.com/watch?v=W8wECVc3z6E)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-grokbuild">Grok Build</span>
  - 讲者 / 频道：OrcDev ｜ 发布：2026-05-19 ｜ 工具：Grok Build + Grok 4.3
  - 看点：复用项目已有的设计 skills，一份计划式 prompt 在 2 分 55 秒内生成风格一致的完整页面。
  - 👉 [阅读分析](/14-orcdev-grok-build-skills)

### 13 · Bijan Bowen：Grok Build 完整实测

- **[Grok Build + Grok 4.3 FULL Test – xAI's Claude Code & Codex Competitor!](https://www.youtube.com/watch?v=X6SubdG4NuU)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-grokbuild">Grok Build</span>
  - 讲者 / 频道：Bijan Bowen ｜ 发布：2026-05-15 ｜ 工具：Grok Build + Grok 4.3
  - 看点：plan mode 的可交互计划（含 non-goals 与成功指标）、截图反馈、无头浏览器自测，以及越界行为等问题。
  - 👉 [阅读分析](/13-bijan-bowen-grok-build)

### 12 · ForrestKnight：Grok 4.5 实战与代码审查

- **[Coding with Grok 4.5 is surprisingly good…](https://www.youtube.com/watch?v=5J6HCDEkg64)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-grok45">Cursor + Grok 4.5</span>
  - 讲者 / 频道：ForrestKnight ｜ 发布：2026-07-10 ｜ 工具：Cursor + Grok 4.5
  - 看点：24 个测试全绿、Clippy 无警告，逐行审查仍发现字符串比较版本号、重复造轮子；对比 Fable 5 / Opus 4.8。
  - 👉 [阅读分析](/12-forrestknight-grok-4-5)

### 27 · Mitchell Hashimoto：六步 AI 采用路线

- **[My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-general">通用（不限工具）</span>
  - 作者 / 来源：Mitchell Hashimoto ／ mitchellh.com ｜ 发布：2026-02-05 ｜ 工具：与工具无关；提到 Claude Code、Amp、Gemini
  - 看点：六步：扔掉聊天框 → 重做自己的活 → 下班前 30 分钟 → 外包稳赢的任务 → 改造 harness → 始终有一个代理在跑。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/27-mitchellh-ai-adoption-journey)

## 🧭 需求澄清、规划与上下文管理（5） {#domain-planning}

动手前先把需求问清楚；Research → Plan → Implement；规则文件少即是多；Skills 按需加载。

📘 **先读主题指南**：[需求澄清、规划与上下文管理](/guide/planning)

### 03 · How we Claude Code：访谈式需求与可验证组件

- **[How we Claude Code](https://www.youtube.com/watch?v=IlqJqcl8ONE)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 讲者 / 频道：Arno（Anthropic Applied AI）／ Claude ｜ 发布：2026-05-22 ｜ 工具：Claude Code（AskUserQuestion、Auto mode）、Playwright MCP
  - 看点：让 Claude 采访你写 spec → 四套 HTML 设计 → 组件输出 `data-verify-*` 契约供代理 / CI 运行时核验。
  - 👉 [阅读分析](/03-how-we-claude-code)

### 06 · Field Guide to Fable：找出未知、上下文减法

- **[Field Guide to Fable — Thariq Shihipar, Anthropic](https://www.youtube.com/watch?v=9fubhllmsBU)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 讲者 / 频道：Thariq Shihipar（Anthropic）／ AI Engineer ｜ 发布：2026-07-06 ｜ 工具：Claude Code
  - 看点：Claude Code 删掉 80% system prompt；blind spot pass、HTML 原型、访谈、实现笔记、让模型 quiz 你。
  - 👉 [阅读分析](/06-field-guide-to-fable)

### 04 · No Vibes Allowed：RPI 与有意压缩

- **[No Vibes Allowed: Solving Hard Problems in Complex Codebases – Dex Horthy, HumanLayer](https://www.youtube.com/watch?v=rmvDxxNubIg)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 讲者 / 频道：Dex Horthy（HumanLayer）／ AI Engineer ｜ 发布：2025-12-02 ｜ 工具：Claude Code（子代理、slash commands）
  - 看点：Research → Plan → Implement 与“频繁有意压缩”，把上下文控制在“smart zone”；附 HumanLayer 开源命令原文。
  - 👉 [阅读分析](/04-no-vibes-allowed-rpi)

### 20 · HumanLayer：CLAUDE.md 少即是多

- **[Writing a good CLAUDE.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Kyle ／ HumanLayer 博客 ｜ 发布：2025-11-25 ｜ 工具：Claude Code（同样适用于 AGENTS.md）
  - 看点：抓包发现 CLAUDE.md 被注入时带着“可能与任务无关”的提醒；指令有预算；只写 WHAT / WHY / HOW，细节拆到 agent_docs/，风格交给 linter。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/20-humanlayer-writing-good-claude-md)

### 21 · Anthropic：别造代理，写 Skills

- **[Don't Build Agents, Build Skills Instead](https://www.youtube.com/watch?v=CEvIs9y1uog)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Barry Zhang、Mahesh Murag（Anthropic）／ AI Engineer ｜ 发布：2025-12-08 ｜ 工具：Claude Code、Claude Agent SDK、Agent Skills、MCP
  - 看点：Skills 就是一个文件夹：SKILL.md + 脚本和资料；三层渐进加载；MCP 管“能连到什么”，Skills 管“知道怎么做”。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/21-anthropic-agent-skills-talk)

## 🤝 多代理协作与对抗式验证（5） {#domain-multi-agent}

一个写、一个查；按角色配置子代理；从十几个到数百个代理，协调方式怎么变。

📘 **先读主题指南**：[多代理协作与对抗式验证](/guide/multi-agent)

### 05 · IndyDevDan：Builder / Validator 代理团队

- **[Claude Code Task System: ANTI-HYPE Agentic Coding (Advanced)](https://www.youtube.com/watch?v=4_2j5wgt_ds)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 讲者 / 频道：IndyDevDan ｜ 发布：2026-02-02 ｜ 工具：Claude Code（Task 系统、Hooks、子代理）
  - 看点：用模板元提示词生成计划，再让 builder / validator 成对的子代理通过 Task 依赖协作、自检。
  - 👉 [阅读分析](/05-indydevdan-task-system)

### 08 · Codex Masterclass：子代理、Hooks 与插件

- **[OpenAI Codex Masterclass — Vaibhav Srivastav & Katia Gil Guzman](https://www.youtube.com/watch?v=MhHEGMFCEB0)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-codex">Codex</span>
  - 讲者 / 频道：VB、Katia Gil Guzman（OpenAI）／ AI Engineer ｜ 发布：2026-04-29 ｜ 工具：Codex（subagents、Code Review、Plugins、Hooks）
  - 看点：现场让 20 个子代理分片审查 45 个 persona 文件；只读审查 persona、stop hook “再验证一轮”。
  - 👉 [阅读分析](/08-codex-masterclass)

### 15 · Arcade：57 个子代理与 /goal 对抗验证

- **[@space-xai Grok Build Spawned 57 Agents in 3 Minutes. Here's Why I Wasn't Worried.](https://www.youtube.com/watch?v=1NwO2dPzwRM)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-grokbuild">Grok Build</span>
  - 讲者 / 频道：Thierry Damiba ／ Arcade ｜ 发布：2026-09-09 ｜ 工具：Grok Build + Grok 4.5（plan mode、subagents、`/goal`）
  - 看点：57 个并行子代理审查文件；`/goal` 声称完成后，skeptic 验证代理发现真实问题并只复查 delta。（字幕质量差，结合简介 + 官方文档分析）
  - 👉 [阅读分析](/15-arcade-grok-build-57-agents)

### 17 · Anthropic：16 个代理并行写 C 编译器

- **[Building a C compiler with a team of parallel Claudes](https://www.anthropic.com/engineering/building-c-compiler)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Nicholas Carlini（Anthropic）／ Anthropic Engineering 博客 ｜ 发布：2026-02-05 ｜ 工具：Claude Code（`claude -p`）、Claude Opus 4.6、Docker、git
  - 看点：16 个代理、无编排者，靠死循环脚本 + 共享 git + 锁文件协作；用 GCC 当 Oracle 拆分内核 bug；近 2,000 个会话、略低于 $20,000。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/17-anthropic-c-compiler-agent-teams)

### 18 · Cursor：数百代理的 Planner / Worker 实验

- **[Scaling long-running autonomous coding](https://cursor.com/blog/scaling-agents)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-cursor">Cursor</span>
  - 作者 / 来源：Wilson Lin ／ Cursor 博客 ｜ 发布：2026-01-14 ｜ 工具：Cursor 自研多代理 harness；GPT-5.2、GPT-5.1-Codex、Opus 4.5
  - 看点：扁平协作 + 锁在数百代理时失败，改成 Planner / Worker / Judge 分层；按角色选模型；integrator 角色反成瓶颈。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/18-cursor-scaling-long-running-agents)

## ⚙️ 后台代理、自动化与 CI/CD（5） {#domain-automation}

Routines 和 /loop 在后台跑；worktree 并行开发；PR 先过代理审查；代理在 CI 里自动修复。

📘 **先读主题指南**：[后台代理、自动化与 CI/CD](/guide/automation)

### 01 · Claude Code 一周年：验证、Routines、Auto mode

- **[Reflecting on a year of Claude Code](https://www.youtube.com/watch?v=Hth_tLaC2j8)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 讲者 / 频道：Boris Cherny、Cat Wu（Anthropic）／ Claude ｜ 发布：2026-06-08 ｜ 工具：Claude Code（Routines、Auto mode、`/loop`、Remote Control）
  - 看点：每次犯错就写进 CLAUDE.md / Skill；验证 = “can the agent run the thing?”；用 routine 自动修 bug、盯 PR。
  - 👉 [阅读分析](/01-claude-code-one-year)

### 02 · Claude Code 团队：Claude Tag 与扇出 Workflows

- **[How the Claude Code team uses Claude Code](https://www.youtube.com/watch?v=S-sYlFiGFv8)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 讲者 / 频道：Thariq Shihipar、Sid Bidasaria、Robert Boyce（Anthropic）／ Claude ｜ 发布：2026-09-02 ｜ 工具：Claude Code、Claude Tag
  - 看点：70–80% 工作经由 Slack 原生的 Claude Tag；给目标而非任务；扇出找 bug + 对抗式复审的 workflow。
  - 👉 [阅读分析](/02-claude-code-team-workflows)

### 10 · How OpenAI Uses Codex：验证飞轮与 PR 看护

- **[OpenAI @ Replay 2026 | How OpenAI Uses Codex to Change How We Build](https://www.youtube.com/watch?v=NjaX4qt-O1Y)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-codex">Codex</span>
  - 讲者 / 频道：Dominik Kundel（OpenAI）／ Temporal ｜ 发布：2026-05-28 ｜ 工具：Codex（GitHub Code Review、babysitting skill、`/goal`）
  - 看点：context → validation → verification 飞轮；100% PR 经 Codex review；PR 看护 skill 盯 CI；手机上完成“修复→预览→合并”。
  - 👉 [阅读分析](/10-how-openai-uses-codex)

### 22 · OpenAI：codex exec + GitHub Action 自动修 CI

- **[Non-interactive mode / Codex GitHub Action](https://developers.openai.com/codex/noninteractive)** <span class="type-tag type-docs">官方文档</span> <span class="tool-tag tool-codex">Codex</span>
  - 作者 / 来源：OpenAI ／ Codex 官方文档 ｜ 发布：持续更新（抓取于 2026-10-09） ｜ 工具：Codex CLI（`codex exec`）、`openai/codex-action@v1`、GitHub Actions
  - 看点：`codex exec` 的管道、JSONL、结构化输出；CI 失败自动修复的两段式布局：只读 job 拿密钥生成补丁，无密钥 job 开 PR。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/22-openai-codex-ci-autofix)

### 23 · Cole Medin：5 个并行代理 + worktree

- **[Parallel Claude Code + Git Worktrees](https://www.youtube.com/watch?v=rFGlJ4oIlhw)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Cole Medin ／ Cole Medin ｜ 发布：2026-04-23 ｜ 工具：Claude Code（`claude -w`、自定义命令、子代理）、Codex 插件、GitHub CLI、Neon
  - 看点：issue → worktree → PR 的并行流程；全新会话 + 跨模型审查；自愈层；现场解决端口、依赖、数据库冲突。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/23-cole-medin-parallel-worktrees)

## 🧠 Harness 工程与内部机制（4） {#domain-harness}

代理外壳怎么工作；把团队标准写成 lint 和测试；长时任务的循环、上下文与做查分离。

📘 **先读主题指南**：[Harness 工程与内部机制](/guide/harness)

### 09 · How Codex Works：Harness 内部机制

- **[How Codex Works — Dominik Kundel, OpenAI](https://www.youtube.com/watch?v=shRR1e2HXMk)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-codex">Codex</span>
  - 讲者 / 频道：Dominik Kundel（OpenAI）／ AI Engineer ｜ 发布：2026-08-10 ｜ 工具：Codex harness（开源）、Responses API
  - 看点：deferred tools、skills 占 2% 上下文上限、只读 Auto Review 子代理、`/goal` continuation prompt、服务端 compaction。
  - 👉 [阅读分析](/09-how-codex-works)

### 07 · Harness Engineering：人掌舵、代理执行

- **[Harness Engineering: How to Build Software When Humans Steer, Agents Execute — Ryan Lopopolo, OpenAI](https://www.youtube.com/watch?v=am_oeAoUhew)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-codex">Codex</span>
  - 讲者 / 频道：Ryan Lopopolo（OpenAI）／ AI Engineer ｜ 发布：2026-04-16 ｜ 工具：Codex
  - 看点：禁止团队碰编辑器；750 包仓库、文件行数测试、带修复指引的 lint、按 persona 的 CI reviewer、每周 Garbage Collection Day。
  - 👉 [阅读分析](/07-harness-engineering)

### 16 · Anthropic：Planner / Generator / Evaluator 长时任务 harness

- **[Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Prithvi Rajasekaran（Anthropic Labs）／ Anthropic Engineering 博客 ｜ 发布：2026-03-24 ｜ 工具：Claude Agent SDK、Claude Opus 4.5 / 4.6、Playwright MCP
  - 看点：Planner 扩写规格、Generator 实现、Evaluator 用浏览器实测打分；单代理 20 分钟 / $9 做出的游戏是坏的，完整 harness 6 小时 / $200 能玩；模型升级后逐个拆脚手架。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/16-anthropic-harness-design-long-running-apps)

### 24 · Huntley & Horthy：Ralph 循环 vs 官方插件

- **[Ralph Wiggum (and why Claude Code's implementation isn't it)](https://www.youtube.com/watch?v=O2bBWDoxO4s)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Geoffrey Huntley、Dex Horthy ／ Geoffrey Huntley（直播录像） ｜ 发布：2026-01-04 ｜ 工具：Claude Code、官方 Ralph Wiggum 插件、bash、tmux
  - 看点：Ralph 最纯粹的形式是一行 bash；每轮全新上下文、一轮一个目标；与官方插件（Stop hook、同一会话）的差别。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/24-huntley-horthy-ralph-loop)

## ✅ 评测、测试与验证（3） {#domain-verification}

给代理出考卷（evals）、用测试约束代理、让代码库可被自动验证。

📘 **先读主题指南**：[评测、测试与验证](/guide/verification)

### 19 · Anthropic：Agent Evals 入门路线图

- **[Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-general">通用（不限工具）</span>
  - 作者 / 来源：Mikaela Grace 等（Anthropic）／ Anthropic Engineering 博客 ｜ 发布：2026-01-09 ｜ 工具：与工具无关
  - 看点：评测的零件（Task / Trial / Grader）、三种评分器怎么搭配、能力评测与回归评测、pass@k 与 pass^k，以及从 0 到 1 的路线图。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/19-anthropic-demystifying-agent-evals)

### 25 · Simon Willison：测试与验收模式

- **[Agentic Engineering Patterns（测试与 QA 章节）](https://simonwillison.net/guides/agentic-engineering-patterns/)** <span class="type-tag type-guide">指南</span> <span class="tool-tag tool-general">通用（不限工具）</span>
  - 作者 / 来源：Simon Willison ／ simonwillison.net ｜ 发布：2026-02-23 起连载 ｜ 工具：与工具无关；提到 Claude Code、Codex、Showboat、Rodney
  - 看点：“Use red/green TDD”“First run the tests”；测试通过后让代理手动测试并留下 Showboat 记录；别把没审过的代码丢给同事。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/25-simonw-agentic-engineering-testing-patterns)

### 26 · Factory：让代码库为代理做好准备

- **[Making Codebases Agent Ready](https://www.youtube.com/watch?v=ShuJ_CN6zr4)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-general">通用（不限工具）</span>
  - 作者 / 来源：Eno Reyes（Factory）／ AI Engineer ｜ 发布：2025-12-22 ｜ 工具：与工具无关；提到 Factory Droid、AGENTS.md
  - 看点：限制代理的是代码库的自动化验证，不是模型；给代码库的 8 根验证支柱打分；先把单任务做到接近 100%，再谈并行。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/26-factory-agent-ready-codebases)

## 覆盖情况与已知缺口（如实说明） {#coverage}

按主题：实战与把关 5 篇（#11、#14、#13、#12、#27）；规划与上下文 5 篇（#03、#06、#04、#20、#21）；多代理协作 5 篇（#05、#08、#15、#17、#18）；后台与 CI/CD 5 篇（#01、#02、#10、#22、#23）；Harness 工程 4 篇（#09、#07、#16、#24）；评测、测试与验证 3 篇（#19、#25、#26）。

按类型：视频 19 篇；文章 6 篇（#16–#20、#27）；官方文档 1 篇（#22）；指南 1 篇（#25）。

按工具：

| 工具 | 数量 | 资料 | 说明 |
|---|---|---|---|
| Claude Code | 12 | #01–#06、#16、#17、#20、#21、#23、#24 | 内容最充足，官方团队直接讲内部用法；2026-10-09 新增 Anthropic 工程博客 3 篇 |
| Codex | 6 | #07–#11、#22 | 官方工程师讲 harness 与内部流程，#22 为官方文档；#09、#10 为同一讲者的不同演讲 |
| Grok（Grok Build / Cursor + Grok 4.5） | 4 | #12–#15 | **缺口明显**，见下 |
| Cursor | 1 | #18 | 公司研究博客 |
| 通用（不限工具） | 4 | #19、#25、#26、#27 | 方法论与评测，适用于任何编码代理 |

**Grok 的缺口：**
- 未找到 xAI 官方频道或 AI Engineer 等大会上关于 Grok Build / Grok 编码代理的长篇工程演讲或实战讲解；Grok 官方频道只有 1–2 分钟的产品宣传片（如 “Introducing Grok 4.5”），不符合“内容实战”的标准，没有收录。
- 收录的 4 个 Grok 视频都是第三方实测：#12、#13、#14 有完整字幕；#15 内容最贴近“多代理 + 验证”主题，但自动字幕质量差，因此结合简介和官方文档分析。
- 讲架构设计和长期团队实践的 Grok 内容（类似 #07、#10 那样）目前没有找到。Grok 部分的结论主要是“工具能力 + 个人体验”，可信度低于 Claude / Codex 部分。
- 已排除：James Montemagno 的 *Grok Code Fast 1 in VS Code*（2025-08，超出 12 个月且仅 4 分钟）；若干标题党 / 新闻解读类 Grok 视频。

**其他说明：**
- 时效：#04、#20、#21、#26 发布于 2025 年 11–12 月，#22（持续更新的文档）与 #25（连载指南）以 2026-10-09 抓取的版本为准，其余均为 2026 年发布。
- 按要求排除了以漏洞挖掘 / 攻防安全为主题的资料，只保留软件开发工作流。
- 未收录但可作延伸阅读：Ryan Lopopolo 在 Latent Space 的长访谈 *Extreme Harness Engineering*（https://www.youtube.com/watch?v=CeOXx-XTYek，与 #07 同一讲者，含 Symphony 编排器）；Jason Liu 在 OpenAI DevDay 2026 的 *From Single Player to Multiplayer with Codex*（https://www.youtube.com/watch?v=aDTPTwnrRyA，偏知识工作协作）。
