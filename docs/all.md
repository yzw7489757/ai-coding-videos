# 📚 全部资料

<div class="hook">

**分类原则：按一个 AI 代理开发任务从开始到上线的顺序分组。** 知识库收录的全部 79 份资料分在 9 个阶段里，每份只放在它主要贡献所在的那个阶段；阶段内按原始发布日期从新到旧排列（持续更新的文档排在末尾）。每条标出资料类型（视频 / 文章 / 官方文档 / 指南）和所用工具。

</div>

::: tip 快速跳转
[打地基 · 上下文与规范](#domain-foundation) → [做规划 · 需求澄清与任务拆解](#domain-planning) → [单代理推进与一人多线 · 一个人怎么驾驭代理](#domain-solo) → [多代理协作与大任务拆分 · 分工、协调与长时运行](#domain-multi) → [验收这一次的产出 · 测试、审查与完成标准](#domain-review) → [评测代理本身与给动作把关 · 评测、分类器与分数噪声](#domain-evals) → [接进 PR 与 CI · 触发、审查与流水线](#domain-ci) → [云端与后台运行环境 · 代理在哪里跑](#domain-cloud) → [看原理 · Harness 与内部机制](#domain-harness)

想按评分挑着读：看下面的[评分总表](#scores)，可以按综合、实用性或深度排序。
:::

## 评分总表 {#scores}

每篇资料按**综合、实用性、深度**三项打分，也显示在文章标题下方。

<ScoreTable />

## 打地基 · 上下文与规范 {#domain-foundation}

**这一组放什么**：让代理每次开工都拿到对的上下文：规则文件、Skills、团队规范，以及能被自动验证的代码库。

📘 **先读阶段指南**：[打地基 · 上下文与规范](/guide/foundation)

### 为代理重做源代码管理 {#item-49}

- **[Redesigning source control at Anthropic](https://www.anthropic.com/engineering/redesigning-source-control)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-general">通用（不限工具）</span>
  - 作者 / 来源：Nick G. 与源代码管理团队 ／ Anthropic Engineering ｜ 发布：2026-10-13 ｜ 工具：通用（Anthropic 自研 Scion）
  - 看点：每日合并量 5 个月涨 12 倍后，7 人团队用 5 个月做出自研版本控制 Scion 并迁移；服务端承担历史与合并、客户端按需取文件；基础设施小 200 倍；工程师的工作变成对 Claude 说“不”。
  - 🆕 收录于 2026-10-14 ｜ 👉 [阅读分析](/49-anthropic-scion-source-control)

### Grok Build 的跨会话记忆 {#item-46}

- **[Memory in Grok Build](https://x.ai/news/grok-build-memory)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-grokbuild">Grok Build</span>
  - 作者 / 来源：xAI ／ x.ai 官方新闻 ｜ 发布：2026-09-16 ｜ 工具：Grok Build CLI（`/memory`、`/dream`）
  - 看点：回合结束后在后台记下约定、决定和项目事实，按主题整理成 markdown；不记任务状态、未定结论、密钥和仓库已有内容；当前指令优先。发布说明很短，没有数据。
  - 🆕 收录于 2026-10-13 ｜ 👉 [阅读分析](/46-grok-build-memory)

### Claude Code mods：可编程的扩展 {#item-52}

- **[Customize Claude Code with mods in TypeScript](https://claude.com/resources/articles/claude-code-mods)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Anthropic ／ claude.com 产品文章 ｜ 发布：2026-10-01 ｜ 工具：Claude Code CLI 与桌面应用、`/plugin`
  - 看点：mods 是挂在事件上的 TypeScript 函数，能在事件前后、代替或包住它运行，改写 prompt、拦截工具调用、替换 `/diff`；多个 mod 按加载顺序叠成洋葱；不在沙箱里，团队靠插件白名单和最先加载的 `sec-default` 管控。公告类短文，没有 API 和数据。
  - 🆕 收录于 2026-10-15 ｜ 👉 [阅读分析](/52-claude-code-mods)

### 把开发环境做成给代理用的产品 {#item-37}

- **[How we set up our cloud agent environment](https://cursor.com/blog/cloud-agent-environment)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-cursor">Cursor</span>
  - 作者 / 来源：Mathew Hogan、Arvind Saripalli ／ Cursor 博客 ｜ 发布：2026-07-30 ｜ 工具：Cursor Cloud Agents、anydev、Cursor Cloud MCP、Cloud Doctor
  - 看点：开发环境是用户为代理的产品；Skills 救不了太绕的命令，用统一 CLI `anydev` + supervisor 收起来；Cloud MCP 让代理自查环境，Cloud Doctor 读 trace 自动修；云端代理写的合并 PR 从约十分之一涨到一半以上。
  - 🆕 收录于 2026-10-12 ｜ 👉 [阅读分析](/37-cursor-cloud-agent-environment)

### 用 Skills 约束 UI 风格 {#item-14}

- **[I Put Grok Build to the Test](https://www.youtube.com/watch?v=W8wECVc3z6E)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-grokbuild">Grok Build</span>
  - 讲者 / 频道：OrcDev ｜ 发布：2026-05-19 ｜ 工具：Grok Build + Grok 4.3
  - 看点：复用项目已有的设计 skills，一份计划式 prompt 在 2 分 55 秒内生成风格一致的完整页面。
  - 👉 [阅读分析](/14-orcdev-grok-build-skills)

### 把团队规范变成 lint 和测试 {#item-07}

- **[Harness Engineering: How to Build Software When Humans Steer, Agents Execute — Ryan Lopopolo, OpenAI](https://www.youtube.com/watch?v=am_oeAoUhew)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-codex">Codex</span>
  - 讲者 / 频道：Ryan Lopopolo（OpenAI）／ AI Engineer ｜ 发布：2026-04-16 ｜ 工具：Codex
  - 看点：禁止团队碰编辑器；750 包仓库、文件行数测试、带修复指引的 lint、按 persona 的 CI reviewer、每周 Garbage Collection Day。
  - 👉 [阅读分析](/07-harness-engineering)

### 让代码库为代理做好准备 {#item-26}

- **[Making Codebases Agent Ready](https://www.youtube.com/watch?v=ShuJ_CN6zr4)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-general">通用（不限工具）</span>
  - 作者 / 来源：Eno Reyes（Factory）／ AI Engineer ｜ 发布：2025-12-22 ｜ 工具：与工具无关；提到 Factory Droid、AGENTS.md
  - 看点：限制代理的是代码库的自动化验证，不是模型；给代码库的 8 根验证支柱打分；先把单任务做到接近 100%，再谈并行。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/26-factory-agent-ready-codebases)

### 别造代理，写 Skills {#item-21}

- **[Don't Build Agents, Build Skills Instead](https://www.youtube.com/watch?v=CEvIs9y1uog)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Barry Zhang、Mahesh Murag（Anthropic）／ AI Engineer ｜ 发布：2025-12-08 ｜ 工具：Claude Code、Claude Agent SDK、Agent Skills、MCP
  - 看点：Skills 就是一个文件夹：SKILL.md + 脚本和资料；三层渐进加载；MCP 管“能连到什么”，Skills 管“知道怎么做”。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/21-anthropic-agent-skills-talk)

### CLAUDE.md 怎么写：少即是多 {#item-20}

- **[Writing a good CLAUDE.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Kyle ／ HumanLayer 博客 ｜ 发布：2025-11-25 ｜ 工具：Claude Code（同样适用于 AGENTS.md）
  - 看点：抓包发现 CLAUDE.md 被注入时带着“可能与任务无关”的提醒；指令有预算；只写 WHAT / WHY / HOW，细节拆到 agent_docs/，风格交给 linter。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/20-humanlayer-writing-good-claude-md)

### Hooks：让规则一定会执行 {#item-28}

- **[Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide)** <span class="type-tag type-docs">官方文档</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Anthropic ／ Claude Code 官方文档 ｜ 发布：持续更新（抓取于 2026-10-09） ｜ 工具：Claude Code hooks（`settings.json`、`/hooks`）；对照 Gemini CLI hooks（Google Developers Blog，2026-01-28）
  - 看点：PostToolUse 自动格式化、PreToolUse + 退出码 2 拦截敏感文件、压缩后重新注入约定、Stop prompt / agent hook；PreToolUse 的 deny 在跳过权限模式下仍生效。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/28-claude-code-hooks-guide)

## 做规划 · 需求澄清与任务拆解 {#domain-planning}

**这一组放什么**：动手前把需求问清楚、把任务拆好：让代理采访你、找出未知、研究→计划→实施、plan mode。

📘 **先读阶段指南**：[做规划 · 需求澄清与任务拆解](/guide/planning)

### 把审查挪到计划：五步规格驱动 {#item-64}

- **[Spec-driven development: how we review plans, not pull requests](https://www.giantswarm.io/blog/spec-driven-development)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-general">通用（不限工具）</span>
  - 作者 / 来源：Dominik Schmidle ／ Giant Swarm 博客（首发 LinkedIn，2026-09-29） ｜ 发布：2026-10-13 ｜ 工具：开源的 spec-driven-development skills（`/plan`、`/grill-me`、`/to-spec`、`/ground-truth`、`/contrarian`、`/to-website`）
  - 看点：PR 一年三倍、审不过来，于是人只审计划的 PR；规格里每条关于现有代码的说法对照真实代码核对，反方一步只许 BUILD / SIMPLIFY / KILL；“含可争议决策才写计划”；多数代码 PR 不经人读 diff，前提是测试门和本地环境。一家公司自述，例子来自虚构示例计划。
  - 🆕 收录于 2026-10-19 ｜ 👉 [阅读分析](/64-giant-swarm-spec-driven-development)


### 计划切成带程序验收的短会话 {#item-68}

- **[From a plan to unattended agent runs](https://www.sglavoie.com/posts/from-plan-to-unattended-agent-runs/)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-general">通用（不限工具）</span>
  - 作者 / 来源：Sébastien Lavoie ／ 个人博客 ｜ 发布：2026-10-09 ｜ 工具：自研 `asl`（可挂 Claude Code / Codex / Copilot CLI）
  - 看点：决策完备检验；计划切成短会话，每会话挂程序跑的完成合约与 baseline；全新上下文 + handoff；固定理由暂停；提示是建议、守卫才强制。文首注明初稿由 AI 根据笔记写成、作者审过。18 万 / 27 万行等为自报。
  - 🆕 收录于 2026-10-19 ｜ 👉 [阅读分析](/68-plan-to-unattended-agent-runs)

### 找出未知，给上下文做减法 {#item-06}

- **[Field Guide to Fable — Thariq Shihipar, Anthropic](https://www.youtube.com/watch?v=9fubhllmsBU)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 讲者 / 频道：Thariq Shihipar（Anthropic）／ AI Engineer ｜ 发布：2026-07-06 ｜ 工具：Claude Code
  - 看点：Claude Code 删掉 80% system prompt；blind spot pass、HTML 原型、访谈、实现笔记、让模型 quiz 你。
  - 👉 [阅读分析](/06-field-guide-to-fable)

### 访谈式需求与可验证组件 {#item-03}

- **[How we Claude Code](https://www.youtube.com/watch?v=IlqJqcl8ONE)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 讲者 / 频道：Arno（Anthropic Applied AI）／ Claude ｜ 发布：2026-05-22 ｜ 工具：Claude Code（AskUserQuestion、Auto mode）、Playwright MCP
  - 看点：让 Claude 采访你写 spec → 四套 HTML 设计 → 组件输出 `data-verify-*` 契约供代理 / CI 运行时核验。
  - 👉 [阅读分析](/03-how-we-claude-code)

### Grok Build 实测：从计划到执行 {#item-13}

- **[Grok Build + Grok 4.3 FULL Test – xAI's Claude Code & Codex Competitor!](https://www.youtube.com/watch?v=X6SubdG4NuU)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-grokbuild">Grok Build</span>
  - 讲者 / 频道：Bijan Bowen ｜ 发布：2026-05-15 ｜ 工具：Grok Build + Grok 4.3
  - 看点：plan mode 的可交互计划（含 non-goals 与成功指标）、截图反馈、无头浏览器自测，以及越界行为等问题。
  - 👉 [阅读分析](/13-bijan-bowen-grok-build)

### Codex 跑 25 小时的四份 Markdown {#item-61}

- **[Run long horizon tasks with Codex](https://developers.openai.com/blog/run-long-horizon-tasks-with-codex)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-codex">Codex</span>
  - 作者 / 来源：Derrick Choi ／ OpenAI Developers 博客 ｜ 发布：2026-02-23 ｜ 工具：Codex、GPT-5.3-Codex（Extra High）；配套仓库 derrickchoi-openai/design-desk
  - 看点：空仓库从零做设计工具，约 25 小时、13M token、3 万行；prompt.md 冻结目标并要求先写计划，plans.md 每个里程碑带验收标准和验证命令，implement.md 是执行规则，documentation.md 是审计日志；四份文件原文在公开仓库里。单次自报实验，质量未独立评估。
  - 🆕 收录于 2026-10-19 ｜ 👉 [阅读分析](/61-codex-long-horizon-tasks)

### Conductor：把计划写进仓库 {#item-29}

- **[Conductor: Introducing context-driven development for Gemini CLI](https://developers.googleblog.com/conductor-introducing-context-driven-development-for-gemini-cli/)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-gemini">Gemini CLI</span>
  - 作者 / 来源：Keith Ballinger、Jay Kornder、Sherzat Aitbayev ／ Google Developers Blog ｜ 发布：2025-12-17（后续更新 2026-02-13） ｜ 工具：Gemini CLI + Conductor 扩展
  - 看点：setup 写下产品、技术栈和流程；每个需求生成 spec.md 和 plan.md，人审后执行并逐项打勾；后来加入对照计划和规范的自动审查。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/29-gemini-cli-conductor)

### RPI：研究、计划、实施 {#item-04}

- **[No Vibes Allowed: Solving Hard Problems in Complex Codebases – Dex Horthy, HumanLayer](https://www.youtube.com/watch?v=rmvDxxNubIg)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 讲者 / 频道：Dex Horthy（HumanLayer）／ AI Engineer ｜ 发布：2025-12-02 ｜ 工具：Claude Code（子代理、slash commands）
  - 看点：Research → Plan → Implement 与“频繁有意压缩”，把上下文控制在“smart zone”；附 HumanLayer 开源命令原文。
  - 👉 [阅读分析](/04-no-vibes-allowed-rpi)

<a id="domain-execution"></a>

## 单代理推进与一人多线 · 一个人怎么驾驭代理 {#domain-solo}

**这一组放什么**：一个人用好一个主代理：起步建立判断、让代理边做边检查自己、多份工作目录并行推进，以及什么时候派子代理。

📘 **先读阶段指南**：[单代理推进与一人多线 · 一个人怎么驾驭代理](/guide/solo)

### Codex 应用实战：从上下文到自动化 {#item-42}

- **[Cooking with Codex — Charlie Guo & Gabriel Chua, OpenAI](https://www.youtube.com/watch?v=FwiS44-xyYw)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-codex">Codex</span>
  - 作者 / 来源：Charlie Guo、Gabriel Chua ／ AI Engineer ｜ 发布：2026-10-06 ｜ 工具：Codex 应用、Computer Use、`/goal`、子代理、hooks、自动化
  - 看点：六步导览：上下文、Computer Use 三种方式怎么选、`/goal` 完成标准要可验证、子代理 vs 线程交接、侧线程结论要回传、两种自动化。
  - 🆕 收录于 2026-10-13 ｜ 👉 [阅读分析](/42-openai-cooking-with-codex)

### effort 档位：低档迭代高档验证 {#item-72}

- **[Using Claude Code: Spending your effort](https://claude.dev/blog/spending-your-effort/)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Thariq Shihipar ／ claude.dev 博客 ｜ 发布：2026-09-25 ｜ 工具：Claude Code（`/effort`）、Opus 5.5、Fable 5.1、Terminal-Bench 3.0
  - 看点：effort 调的是验证、边界测试和自主判断的多少；四步循环：采访补 spec → low 实现 → 人审方向 → high 验证；高档减少漏边界的失败、修不了方法错；安全 64% → 87%、硬件 34% → 75%（内部运行、每题 5 次）。
  - 🆕 收录于 2026-10-20 ｜ 👉 [阅读分析](/72-claude-code-spending-effort)

### 一个任务花多少钱：轮数与缓存 {#item-78}

- **[What a task costs on Opus 5.5](https://claude.dev/blog/what-a-task-costs-on-opus-5-5/)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Addy Osmani ／ claude.dev 博客（Playbooks） ｜ 发布：2026-09-25 ｜ 工具：Claude Code（`/usage`、`/effort`、`/model`、`/compact`、`/rewind`、`CLAUDE_CODE_SUBAGENT_MODEL`）、Opus 5.5、Fable 5.1、Sonnet、Haiku
  - 看点：成本按任务算：轮数、缓存读取、输出、模型四项；每轮重发整段对话；同样 2.8M 输入命中 0% $11.20、90% $1.62；先加检查再提 effort、xhigh 失败两次再换模型；查找子代理下放小模型；六种会让缓存重写的操作；休息前压缩。数字多为示意，同时在介绍新模型降价。
  - 🆕 收录于 2026-10-21 ｜ 👉 [阅读分析](/78-claude-code-task-cost)

### 手机当 Codex 控制台 {#item-79}

- **[Mastering remote engineering work from your phone](https://developers.openai.com/blog/mastering-codex-remote-for-engineering)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-codex">Codex</span>
  - 作者 / 来源：Thomas Ricouard ／ OpenAI Developers 博客 ｜ 发布：2026-06-23 ｜ 工具：ChatGPT 手机端 Remote + Codex 主机；`/plan`、`/goal`、`/side`、`/review`、`/status`、`/compact`、`/fork`
  - 看点：手机是控制平面，人只做解阻塞的决定；开工前选好主机、分支、worktree；跟进默认排队、插话要刻意；side chat 与 fork 的区别；Plan 管路径、Goal 管结果；只批最窄的权限；五个移动端工作流。产品团队成员的功能指南，没有效果数据。
  - 🆕 收录于 2026-10-21 ｜ 👉 [阅读分析](/79-codex-remote-phone-control-plane)

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

### 一个人用 Codex 建 OpenClaw {#item-11}

- **[Builders Unscripted: Ep. 1 - Peter Steinberger, Creator of OpenClaw](https://www.youtube.com/watch?v=9jgcT0Fqt7U)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-codex">Codex</span>
  - 讲者 / 频道：Peter Steinberger，主持 Romain Huet ／ OpenAI ｜ 发布：2026-02-24 ｜ 工具：Codex（早期 Claude Code）
  - 看点：“Do you have any questions?”、10 个 checkout 并行、外部 PR 先让代理解释意图再决定方案。
  - 👉 [阅读分析](/11-peter-steinberger-openclaw)

### 从怀疑到离不开：六步采用 AI {#item-27}

- **[My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-general">通用（不限工具）</span>
  - 作者 / 来源：Mitchell Hashimoto ／ mitchellh.com ｜ 发布：2026-02-05 ｜ 工具：与工具无关；提到 Claude Code、Amp、Gemini
  - 看点：六步：扔掉聊天框 → 重做自己的活 → 下班前 30 分钟 → 外包稳赢的任务 → 改造 harness → 始终有一个代理在跑。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/27-mitchellh-ai-adoption-journey)

## 多代理协作与大任务拆分 · 分工、协调与长时运行 {#domain-multi}

**这一组放什么**：多个代理围绕同一个目标：什么时候该用、怎么分工和协调、互相依赖的大迁移怎么拆，以及长时自主任务。

📘 **先读阶段指南**：[多代理协作与大任务拆分 · 分工、协调与长时运行](/guide/multi)；另有[专题：长时自主任务](/guide/long-running)

### 3315 次启动：失败在缝合处 {#item-80}

- **[Multi-agent orchestration: what broke in 3,315 agent runs](https://madsalt.tech/blog/multi-agent-orchestration-what-broke/)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Denys Zaichenko ／ madsalt.tech ｜ 发布：2026-10-19 ｜ 工具：Claude Code 主会话 + 子代理；165 hooks；git worktree；Opus / Sonnet / Fable
  - 看点：3,315 次启动的事故几乎都在缝合处（并行覆盖翻译目录、清理删工作、代理改门禁）；Markdown 是建议、hook 是硬规则；六件先装；30 天约 160 亿 token、API 折算 ≥$3,350。单人上限五并行，被挡启动未入账。
  - 🆕 收录于 2026-10-22 ｜ 👉 [阅读分析](/80-madsalt-multi-agent-orchestration-3315)

### 多代理团队值不值：受控实验 {#item-76}

- **[Scaling agent teams: reach the frontier at 30% of the cost](https://cohere.com/blog/lessons-from-scaling-teams-of-frontier-coding-agents)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-general">通用（不限工具）</span>
  - 作者 / 来源：Keenan Samway、Daniel D'souza、Nouha Dziri ／ Cohere 研究博客 ｜ 发布：2026-10-14 ｜ 工具：自建极简领队 + 工人 harness；GPT-5.6 Luna / Terra / Sol，另测 Claude Opus 4.7 / 4.8、Haiku 4.5、Gemini Flash；ProgramBench、Commit0-Lite
  - 看点：一次只改一个变量的对照实验：团队比单代理多 5–10 个点、贵 4–7 倍；只委派规划追平全委派、成本减半；Sol 领队 + 16 个 Luna 规划工人 $155 对全强队 $510；实现工人越多每人的活越薄；`send_message` 84% 是向上汇报；不同模型愿不愿意委派差别很大。只在基准上，部分配置单次运行。
  - 🆕 收录于 2026-10-21 ｜ 👉 [阅读分析](/76-cohere-agent-teams-cost)

### 十个仓库的 .NET 迁移 {#item-74}

- **[How to coordinate AI agents in a multi-repository .NET migration (case study)](https://www.blocshop.io/blog/how-to-coordinate-ai-agents-in-a-multi-repository-net-migration-case-study)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-general">通用（不限工具）</span>
  - 作者 / 来源：Blocshop 公司博客（无个人署名，匿名案例） ｜ 发布：2026-09-30 ｜ 工具：未写明实际代理，OpenCode 仅作参照；git worktree、迁移 skills、Context7
  - 看点：10 个仓库 66 个项目；人定目标、贵模型主代理管依赖图、便宜工人做有边界调查；派活单六要素；按名字比失败测试；只读调查并行、写操作集中；worktree 不是沙箱；decimal 精度、OAuth、原生打包、工件选择四个陷阱。没有成本和对照数据，结尾推广外包服务。
  - 🆕 收录于 2026-10-20 ｜ 👉 [阅读分析](/74-blocshop-dotnet-multi-repo-migration)

### Grok Build Workflows：后台扇出脚本 {#item-65}

- **[Workflows in Grok Build](https://x.ai/news/workflows)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-grokbuild">Grok Build</span>
  - 作者 / 来源：xAI 新闻页（未署个人名；页面标题写作 SpaceXSI） ｜ 发布：2026-07-23 ｜ 工具：Grok Build、`/workflows`、`/deep-research`
  - 看点：能拆成独立块、最后要一份报告的任务，让 Grok 写成分阶段扇出脚本在后台跑；默认 128 个代理、最多 1,024；可内建“怀疑者”核验；存进 `.grok/workflows/` 变成带参数的命令。约 480 词的产品公告，没有效果和成本数据。
  - 🆕 收录于 2026-10-19 ｜ 👉 [阅读分析](/65-grok-build-workflows)

### 16 个代理并行写 C 编译器 {#item-17}

- **[Building a C compiler with a team of parallel Claudes](https://www.anthropic.com/engineering/building-c-compiler)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Nicholas Carlini（Anthropic）／ Anthropic Engineering 博客 ｜ 发布：2026-02-05 ｜ 工具：Claude Code（`claude -p`）、Claude Opus 4.6、Docker、git
  - 看点：16 个代理、无编排者，靠死循环脚本 + 共享 git + 锁文件协作；用 GCC 当 Oracle 拆分内核 bug；近 2,000 个会话、略低于 $20,000。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/17-anthropic-c-compiler-agent-teams)

### Builder + Validator 代理团队 {#item-05}

- **[Claude Code Task System: ANTI-HYPE Agentic Coding (Advanced)](https://www.youtube.com/watch?v=4_2j5wgt_ds)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 讲者 / 频道：IndyDevDan ｜ 发布：2026-02-02 ｜ 工具：Claude Code（Task 系统、Hooks、子代理）
  - 看点：Task 系统补上共同任务、依赖和完成通知；模板元提示词 + Stop hook 保证计划格式；builder 一次一个任务带 lint 自检、validator 配置上只读。任务简单，讲者自认验证太浅。2026-10-15 取得完整字幕后重写。
  - 👉 [阅读分析](/05-indydevdan-task-system)

### 数百个代理协作写浏览器 {#item-18}

- **[Scaling long-running autonomous coding](https://cursor.com/blog/scaling-agents)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-cursor">Cursor</span>
  - 作者 / 来源：Wilson Lin ／ Cursor 博客 ｜ 发布：2026-01-14 ｜ 工具：Cursor 自研多代理 harness；GPT-5.2、GPT-5.1-Codex、Opus 4.5
  - 看点：扁平协作 + 锁在数百代理时失败，改成 Planner / Worker / Judge 分层；按角色选模型；integrator 角色反成瓶颈。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/18-cursor-scaling-long-running-agents)

### 大型重构拆给并行代理 {#item-30}

- **[Automating Large Scale Refactors with Parallel Agents - Robert Brennan, OpenHands](https://www.youtube.com/watch?v=rcsliSIy_YU)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-openhands">OpenHands</span>
  - 讲者 / 频道：Robert Brennan（OpenHands）／ AI Engineer ｜ 发布：2026-01-08 ｜ 工具：OpenHands、Agent SDK、Refactor SDK
  - 看点：代理一次做不完大迁移；迁移分支 + 背景说明 + 3–5 个并行代理 + 每个 PR 人审；拆任务的四条标准；按依赖图分批、验证器 + 修复器；Redux 迁 Zustand 的临时脚手架；代理间共享上下文的四种做法；后半场用 SDK 批量修漏洞的动手练习。2026-10-15 取得完整字幕后按全长重写。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/30-openhands-parallel-refactors)

### 长任务的功能清单与进度文件 {#item-73}

- **[Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Justin Young（Anthropic）／ Anthropic Engineering 博客 ｜ 发布：2025-11-26 ｜ 工具：Claude Agent SDK、Opus 4.5、Puppeteer MCP、git
  - 看点：两种失败（一口吃成胖子、过早宣布完工）；第一个会话只搭环境：200+ 条全标未通过的 JSON 功能清单、`init.sh`、进度文件、初始提交；之后每个会话先找方位、跑基础端到端测试、只做一个功能、收尾提交。#16 的前作；没有量化结果。
  - 🆕 收录于 2026-10-20 ｜ 👉 [阅读分析](/73-anthropic-effective-harnesses-long-running)

<a id="domain-verification"></a>

## 验收这一次的产出 · 测试、审查与完成标准 {#domain-review}

**这一组放什么**：确认代理这一次真的做完、做对：测试驱动、代理手动测试、人工与对抗式审查、AI 审查器和独立的完成标准。

📘 **先读阶段指南**：[验收这一次的产出 · 测试、审查与完成标准](/guide/review)

### 代码审查的七层把关 {#item-60}

- **[How the Claude Code team does code review](https://claude.dev/blog/solving-code-review-at-anthropic/)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Addy Osmani、Morgan Westlee Lunt、Qing Wang ／ claude.dev 博客 ｜ 发布：2026-10-15 ｜ 工具：Claude Code、Code Review for Claude Code、`/code-review`、`/security-review`、merge queue、feature flag
  - 看点：要省的是人的时间，回滚率和事故率当护栏；七层把关；人工批准按改动风险 0 / 1 / 2 人，代理批准不算、批准绑定 commit；REVIEW.md 写法；一个 PR 一夜被审 50 多轮后设三轮上限。PR 翻倍、回滚降 40% 为团队自报。
  - 🆕 收录于 2026-10-19 ｜ 👉 [阅读分析](/60-claude-code-team-code-review)

### 规则要按效果写成 hook {#item-81}

- **[Harness Engineering: What I learned from 24,000 prompts building production apps](https://aditlal.dev/harness-engineering/)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Adit Lal ｜ 发布：2026-10-10 ｜ 工具：Claude Code hooks；Codex 第二审查；Slack 机器人；GitHub Actions
  - 看点：CLAUDE.md 点名命令挡不住 Gradle 先卸载；同提示审查 21/45 对 14/45；开 PR 绑第二模型；28 项勾选里 3 项没实现；缓存读约 240:1。单人 Android 经验。
  - 🆕 收录于 2026-10-22 ｜ 👉 [阅读分析](/81-aditlal-harness-engineering-24000)

### 57 个子代理与对抗式验证 {#item-15}

- **[@space-xai Grok Build Spawned 57 Agents in 3 Minutes. Here's Why I Wasn't Worried.](https://www.youtube.com/watch?v=1NwO2dPzwRM)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-grokbuild">Grok Build</span>
  - 讲者 / 频道：Thierry Damiba ／ Arcade ｜ 发布：2026-09-09 ｜ 工具：Grok Build + Grok 4.5（plan mode、subagents、`/goal`）
  - 看点：57 个并行子代理审查文件；`/goal` 声称完成后，skeptic 验证代理发现真实问题并只复查 delta。（字幕质量差，结合简介 + 官方文档分析）
  - 👉 [阅读分析](/15-arcade-grok-build-57-agents)

### 先建完成标准，再让代理做大任务 {#item-59}

- **[What it Takes for Coding Agents to Complete Large Software Tasks](https://factory.com/news/what-it-takes-for-coding-agents-to-complete-large-software-tasks)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-factory">Factory Droid</span>
  - 作者 / 来源：Factory Research、Theo Luan ／ Factory 新闻 ｜ 发布：2026-08-27 ｜ 工具：Factory Droid；Fable 5、Kimi K3、GPT-5.6-sol（部分 Opus 替代）；ProgramBench
  - 看点：同一模型从零复刻 gdal，单代理自认为做完时只到 36%，“验证者先建完成标准 + 实现者看不到用例”的三角色系统到 90%；24 个任务三个模型中位数都提升，也有下降格；gdal 花了 14 倍额度、13 倍时间，每格只跑一次。
  - 🆕 收录于 2026-10-16 ｜ 👉 [阅读分析](/59-factory-large-software-tasks)

### 把审查规则写进 AGENTS.md {#item-75}

- **[Custom Code Review rules for Codex](https://developers.openai.com/blog/custom-code-review-rules-for-codex)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-codex">Codex</span>
  - 作者 / 来源：Hari Srikanth ／ OpenAI Developers 博客 ｜ 发布：2026-07-20 ｜ 工具：Codex Code Review、`@codex review`、`AGENTS.md`
  - 看点：把审查者反复说的不变量写成按目录生效的 Code Review Rules；真实例子 `rawResponseItem/completed`；评测覆盖 / 克制 / 保留 / 可操作四维，主套件 98% vs 基线 58.3%；规则写法五条；三个 PR 测一条规则。厂商功能文，评测细节不全。
  - 🆕 收录于 2026-10-20 ｜ 👉 [阅读分析](/75-codex-custom-code-review-rules)

### 测试全绿也要读代码 {#item-12}

- **[Coding with Grok 4.5 is surprisingly good…](https://www.youtube.com/watch?v=5J6HCDEkg64)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-grok45">Cursor + Grok 4.5</span>
  - 讲者 / 频道：ForrestKnight ｜ 发布：2026-07-10 ｜ 工具：Cursor + Grok 4.5
  - 看点：24 个测试全绿、Clippy 无警告，逐行审查仍发现字符串比较版本号、重复造轮子；对比 Fable 5 / Opus 4.8。
  - 👉 [阅读分析](/12-forrestknight-grok-4-5)


### 验证栈：轨迹打分加 PR 真跑 {#item-71}

- **[The Verification Stack](https://www.openhands.dev/blog/the-verification-stack)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-openhands">OpenHands</span>
  - 作者 / 来源：Xingyao Wang、Calvin Smith ／ OpenHands 博客 ｜ 发布：2026-06-22 ｜ 工具：OpenHands Critic、code review skill、QA agent、`/iterate`、Automations
  - 看点：推送前 critic 看轨迹；PR 上结构化审查（可按仓定制）+ QA 真跑；iterate 开 draft 修到绿。自报六个月：约 90% PR 用自动审查、合并时间降 58%、覆盖率近 +25%；精确率把无建议算完美。
  - 🆕 收录于 2026-10-19 ｜ 👉 [阅读分析](/71-openhands-verification-stack)

### Devin 用 Computer Use 自测 {#item-32}

- **[Verifying Agentic Development at Scale](https://cognition.com/blog/testing-development)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-devin">Devin</span>
  - 作者 / 来源：Ido Pesok ／ Cognition 博客 ｜ 发布：2026-05-29 ｜ 工具：Devin（云端虚拟机、Computer Use、测试模式）
  - 看点：异步触发的会话已超过交互式；测试计划基于源码；操作前先写预期；登录写成确定性脚本放进测试技能；交回截图报告和分章节录屏。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/32-cognition-verifying-agentic-development)

### 测试驱动与代理手动测试 {#item-25}

- **[Agentic Engineering Patterns（测试与 QA 章节）](https://simonwillison.net/guides/agentic-engineering-patterns/)** <span class="type-tag type-guide">指南</span> <span class="tool-tag tool-general">通用（不限工具）</span>
  - 作者 / 来源：Simon Willison ／ simonwillison.net ｜ 发布：2026-02-23 起连载 ｜ 工具：与工具无关；提到 Claude Code、Codex、Showboat、Rodney
  - 看点：“Use red/green TDD”“First run the tests”；测试通过后让代理手动测试并留下 Showboat 记录；别把没审过的代码丢给同事。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/25-simonw-agentic-engineering-testing-patterns)

### AI 代码审查：精确率优先 {#item-31}

- **[A Practical Approach to Verifying Code at Scale](https://alignment.openai.com/scaling-code-verification/)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-codex">Codex</span>
  - 作者 / 来源：Maja Trębacz 等（OpenAI，与 Codex 团队合作）／ OpenAI Alignment Research Blog ｜ 发布：2025-12-01 ｜ 工具：Codex Code Review、`/review`
  - 看点：精确率比召回率重要；审查者要能读整个仓库、运行代码；训练用的检查器和交给人用的审查器要分开；作者对 52.7% 的评论用代码修改回应。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/31-openai-verifying-code-at-scale)

## 评测代理本身与给动作把关 · 评测、分类器与分数噪声 {#domain-evals}

**这一组放什么**：不只看一次产出，而是系统地评测代理和它的配置：评测零件与 pass@k、给 Skill 写评测、评测分数里的噪声，以及给代理动作把关的权限分类器。

📘 **先读阶段指南**：[评测代理本身与给动作把关 · 评测、分类器与分数噪声](/guide/evals)


### 按执行轨迹打分的四条评测教训 {#item-69}

- **[Four evaluation engineering lessons learned from building agent plugins](https://cloud.google.com/blog/topics/developers-practitioners/four-eval-engineering-lessons)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-general">通用（不限工具）</span>
  - 作者 / 来源：Casey West ／ Google Cloud Developers & Practitioners ｜ 发布：2026-10-17 ｜ 工具：Google Cloud Developer 插件作试验田
  - 看点：LLM 裁判只看总结会把做对的代理判失败；遥测保留 turn 结构；live 与 plan-only 并排（约一半重要发现来自两者差）；golden sets 压整栈。短文，数字自报，文末带产品入口。
  - 🆕 收录于 2026-10-19 ｜ 👉 [阅读分析](/69-google-eval-engineering-lessons)

### 给 Skills 做评测：会被找到吗 {#item-77}

- **[Your skills need an evaluation mechanism](https://expo.dev/blog/your-skills-need-an-evaluation-mechanism)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Aditya Shukla、Kartik Gupta、David Tingle（Georgian AI Lab）与 Kudo Chien、Brent Vatne、David Mokos（Expo）／ Expo 博客 ｜ 发布：2026-10-08 ｜ 工具：Expo 的 Claude Code / Codex 插件；Claude Code（`sonnet-5-high`）；Codex CLI 的 Skill 目录；Expo CI/CD Workflows
  - 看点：用不点名 Skill 的 PRD 跑代理、读轨迹，分触发、吸收、App 行为三层评测；PR 加 eval 标签对比 main；Skill 几乎不被加载，加入口路由 Skill 后从 9% 到 55%，相关召回 2% → 18%；Codex 的 Skill 目录占上下文 2%，超出就截描述、丢 Skill。10 个 PRD×3 次，吸收和行为层无数据。
  - 🆕 收录于 2026-10-21 ｜ 👉 [阅读分析](/77-expo-skill-evals)

### 评测设计与爬分不自欺 {#item-62}

- **[Automating eval design and hillclimbing with Claude](https://claude.dev/blog/automating-eval-design-and-hillclimbing/)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Lance Martin ／ claude.dev 博客 Playbooks ｜ 发布：2026-09-28 ｜ 工具：Claude Code 内置 claude-api skill 的 `/claude-api build-eval`、`/claude-api hillclimb`
  - 看点：好评测四特征，别只挑当前模型做错的题；评分器先验证（跑两次、先人工看）；随机拆训练集和留出集、一次一个补丁、不涨就回滚；从不涨的题多半是题错了。客服基准留出集 78.6% → 90.5%、成本约五分之一（留出集仅 14 单）。
  - 🆕 收录于 2026-10-19 ｜ 👉 [阅读分析](/62-claude-eval-design-hillclimbing)

### 行为规格只给裁判看 {#item-83}

- **[How Basis builds long-horizon accounting agents with Cursor](https://cursor.com/blog/basis)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-cursor">Cursor</span>
  - 作者 / 来源：Cursor Team（引言 Mitch Troyanovsky / Basis） ｜ 发布：2026-09-04 ｜ 工具：Cursor 改规格与上下文；Basis 运行时；Braintrust 行为规格格式
  - 看点：长程会计任务上结果评测有盲区；behavior spec 不给代理、裁判 true/false/NA；规格与运行时分离。Form 1065 约人 30–40h / 代理 6–7h（口述）。客户故事，无规格样例。
  - 🆕 收录于 2026-10-22 ｜ 👉 [阅读分析](/83-cursor-basis-behavior-specs)

### Auto-review：分类器与评测 {#item-39}

- **[Governing agent autonomy with Auto-review](https://cursor.com/blog/agent-autonomy-auto-review)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-cursor">Cursor</span>
  - 作者 / 来源：David Gomes、Travis McPeak ／ Cursor 博客 ｜ 发布：2026-06-11 ｜ 工具：Cursor 桌面应用本地代理、Auto-review
  - 看点：审批太多也不安全；小模型分类器结合用户意图判断风险，拦截时把理由还给主代理；评测：12 小时会话 → 6,122 条标注 + 合成用例，跑生产同一链路，重复跑找翻转；拦截约 4%，约 7% 对话被打断。
  - 🆕 收录于 2026-10-12 ｜ 👉 [阅读分析](/39-cursor-auto-review-classifier)

### auto mode：两段式权限分类器 {#item-56}

- **[How we built Claude Code auto mode: a safer way to skip permissions](https://www.anthropic.com/engineering/claude-code-auto-mode)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：John Hughes ／ Anthropic Engineering ｜ 发布：2026-03-25 ｜ 工具：Claude Code auto mode
  - 看点：用户对 93% 的权限提示都点批准；三层权限，进入时丢弃宽泛允许规则；分类器只看用户消息和工具调用，单 token 快速过滤后再推理复核；误报 0.4%，对真实过度主动动作漏 17%；连续 3 次或累计 20 次拒绝交给人。
  - 🆕 收录于 2026-10-15 ｜ 👉 [阅读分析](/56-anthropic-claude-code-auto-mode)

### 评测分数里的基础设施噪声 {#item-50}

- **[Quantifying infrastructure noise in agentic coding evals](https://www.anthropic.com/engineering/infrastructure-noise)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-general">通用（不限工具）</span>
  - 作者 / 来源：Gian Segato ／ Anthropic Engineering ｜ 发布：2026-02-05 ｜ 工具：通用（Terminal-Bench 2.0、SWE-bench）
  - 看点：只改容器资源，Terminal-Bench 2.0 分数差 6 个百分点；3x 以内修的是稳定性，再往上是在帮代理解题；配置未对齐时低于 3 个百分点的差距要存疑。
  - 🆕 收录于 2026-10-14 ｜ 👉 [阅读分析](/50-anthropic-infrastructure-noise)

### 给 Skill 写评测 {#item-47}

- **[Testing Agent Skills Systematically with Evals](https://developers.openai.com/blog/eval-skills)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-codex">Codex</span>
  - 作者 / 来源：OpenAI Developers 博客（未署个人作者） ｜ 发布：2026-01-22 ｜ 工具：Codex
  - 看点：prompt → 被记录的运行 → 几条检查 → 分数；10–20 条 prompt 含反例；`codex exec --json` 做确定性检查，`--output-schema` 做风格评分；完整脚本可照做。
  - 🆕 收录于 2026-10-14 ｜ 👉 [阅读分析](/47-openai-eval-skills)

### Agent Evals 入门 {#item-19}

- **[Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-general">通用（不限工具）</span>
  - 作者 / 来源：Mikaela Grace 等（Anthropic）／ Anthropic Engineering 博客 ｜ 发布：2026-01-09 ｜ 工具：与工具无关
  - 看点：评测的零件（Task / Trial / Grader）、三种评分器怎么搭配、能力评测与回归评测、pass@k 与 pass^k，以及从 0 到 1 的路线图。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/19-anthropic-demystifying-agent-evals)

## 接进 PR 与 CI · 触发、审查与流水线 {#domain-ci}

**这一组放什么**：让代理脱离聊天框、接进团队流水线：定时与事件触发、无人值守的规则、PR 审查机器人和 CI 自动修复。

📘 **先读阶段指南**：[接进 PR 与 CI · 触发、审查与流水线](/guide/ci)

### 让代理批量开维护 PR {#item-63}

- **[Maintaining software with the GPT-6 family](https://developers.openai.com/blog/maintaining-software-with-the-gpt-6-family)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-codex">Codex</span>
  - 作者 / 来源：Rodrigo Roim ／ OpenAI Developers 博客 ｜ 发布：2026-10-14 ｜ 工具：Codex；GPT-6 Astra、GPT-6.1 Sol；Statsig、Slack、生产性能剖析
  - 看点：短 prompt + 安全边界 + 证据，一处清理一个小 draft PR；审查意见写回下一版全库 `/goal` prompt；5 人两周合并 1,400 多个 PR、删 80 多万行；同一任务便宜模型 92% 发现、14% 成本；CI 中位耗时约 10 → 4.5 分钟；6 段 prompt 原文。团队自报，模型对比只跑一次。
  - 🆕 收录于 2026-10-19 ｜ 👉 [阅读分析](/63-openai-gpt-6-software-maintenance)

### 定时代理自动化的六条规则 {#item-41}

- **[Building effective agent automations](https://claude.dev/blog/building-effective-agent-automations/)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Lance Martin、CJ Avilla ／ claude.dev 博客（Anthropic） ｜ 发布：2026-10-08 ｜ 工具：Claude Managed Agents、`ant` CLI、GitHub MCP、Slack
  - 看点：定时简报代理的参考实现：按书签读、读失败要明说、发帖前复查、确认送达再记账、每次重读偏好、只读权限 + 花费上限；附原文配置。
  - 🆕 收录于 2026-10-13 ｜ 👉 [阅读分析](/41-anthropic-agent-automations)

### 把 agent evals 接进 CI {#item-57}

- **[Continuous evals in CI](https://academy.claude.com/courses/ai-native-sdlc-playbook/continuous-evals-in-ci)** <span class="type-tag type-guide">指南</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Anthropic ／ Claude Academy《The AI-native SDLC playbook》中的一课 ｜ 发布：2026-08-21（取自 playbook 总览页） ｜ 工具：Claude Code（`claude -p`）、GitHub Actions、git worktree、jq
  - 看点：CLAUDE.md、skills、hooks 一改就在 CI 里用旧代码套新配置重做 20–50 个真实任务；eval JSON、workflow、`check.sh`、行为检查脚本全文；评测文件先拷走、越界改动即失败、不要加 `--bare`；演示删掉一行规则后被拦下。场景是课程构造的，没有成本数据。
  - 🆕 收录于 2026-10-16 ｜ 👉 [阅读分析](/57-claude-continuous-evals-in-ci)

### OpenAI 用 Codex 守住 PR 质量 {#item-10}

- **[OpenAI @ Replay 2026 | How OpenAI Uses Codex to Change How We Build](https://www.youtube.com/watch?v=NjaX4qt-O1Y)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-codex">Codex</span>
  - 讲者 / 频道：Dominik Kundel（OpenAI）／ Temporal ｜ 发布：2026-05-28 ｜ 工具：Codex（GitHub Code Review、babysitting skill、`/goal`）
  - 看点：context → validation → verification 飞轮；100% PR 经 Codex review；PR 看护 skill 盯 CI；手机上完成“修复→预览→合并”。
  - 👉 [阅读分析](/10-how-openai-uses-codex)

### 用 Skills 维护开源仓库 {#item-55}

- **[Using skills to accelerate OSS maintenance](https://developers.openai.com/blog/skills-agents-sdk)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-codex">Codex</span>
  - 作者 / 来源：OpenAI ／ OpenAI 开发者博客 ｜ 发布：2026-03-09 ｜ 工具：Codex、Codex GitHub Action、Docs MCP
  - 看点：Agents SDK 两个仓库的 11 个 Skill；AGENTS.md 用 if/then 规定何时必须用；description 是路由合约；脚本管确定步骤、模型管判断；发版评审默认放行、阻止必附清单；公开仓库上 CI 的安全清单。PR 合并数 316 → 457 同期也受 Codex 自动审查影响。
  - 🆕 收录于 2026-10-15 ｜ 👉 [阅读分析](/55-openai-skills-oss-maintenance)

### Cognition 把 Devin 接进日常 {#item-67}

- **[How Cognition Uses Devin to Build Devin](https://cognition.com/blog/how-cognition-uses-devin-to-build-devin)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-devin">Devin</span>
  - 作者 / 来源：The Cognition Team ／ Cognition 博客（厂商自述） ｜ 发布：2026-02-27 ｜ 工具：Devin、Devin Review、DANA、DeepWiki、Playbooks、Session Insights；Slack、Linear、Datadog、Sentry
  - 看点：一周合并 659 个 Devin PR（2025 年最好一周 154）；Bug 标签触发分诊、PR 事件触发审查和自动修、每日审计最近 24 小时合并、只读数据库副本调试、API 接 Sentry 与部署失败；Playbook 六要素。厂商讲自家产品，数字自报，没有失败案例。
  - 🆕 收录于 2026-10-19 ｜ 👉 [阅读分析](/67-cognition-devin-builds-devin)

### Bugbot：用解决率迭代审查机器人 {#item-33}

- **[Building a better Bugbot](https://cursor.com/blog/building-bugbot)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-cursor">Cursor</span>
  - 作者 / 来源：Jon Kaplan ／ Cursor 博客 ｜ 发布：2026-01-15 ｜ 工具：Cursor Bugbot、Bugbot rules、Bugbot Autofix
  - 看点：8 次并行审查 + 多数投票 + 验证模型；用“解决率”衡量并做了 40 次实验（52% → 70% 以上）；代理式架构后提示词从克制改为激进。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/33-cursor-building-bugbot)

### CI 挂了让 Codex 自动修 {#item-22}

- **[Non-interactive mode / Codex GitHub Action](https://developers.openai.com/codex/noninteractive)** <span class="type-tag type-docs">官方文档</span> <span class="tool-tag tool-codex">Codex</span>
  - 作者 / 来源：OpenAI ／ Codex 官方文档 ｜ 发布：持续更新（抓取于 2026-10-09） ｜ 工具：Codex CLI（`codex exec`）、`openai/codex-action@v1`、GitHub Actions
  - 看点：`codex exec` 的管道、JSONL、结构化输出；CI 失败自动修复的两段式布局：只读 job 拿密钥生成补丁，无密钥 job 开 PR。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/22-openai-codex-ci-autofix)

### Grok Build 跑进脚本和 CI {#item-34}

- **[Hooks](https://docs.x.ai/build/features/hooks)** 等 Grok Build 文档页 <span class="type-tag type-docs">官方文档</span> <span class="tool-tag tool-grokbuild">Grok Build</span>
  - 作者 / 来源：xAI ／ Grok Build 官方文档（Hooks、Headless & Scripting、AGENTS.md、Background Tasks、Worktrees） ｜ 发布：2026-06-10 至 2026-07-21 更新（抓取于 2026-10-09） ｜ 工具：Grok Build CLI
  - 看点：`grok -p` + JSON 输出；兼容 Claude Code / Cursor 的 hook 文件，PreToolUse 是唯一能拦截的事件，出错时故障放行；`/loop` 定时任务；`grok -w` worktree。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/34-grok-build-headless-hooks)

## 云端与后台运行环境 · 代理在哪里跑 {#domain-cloud}

**这一组放什么**：让代理离开你的笔记本：云端会话、托管 VM、自托管执行机器和沙箱机队，以及背后的持久化与安全布局。

📘 **先读阶段指南**：[云端与后台运行环境 · 代理在哪里跑](/guide/cloud)

### 自托管并行迁八个应用 {#item-82}

- **[Navan cuts a month-long migration down to a week, without freezing the codebase](https://cursor.com/blog/navan)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-cursor">Cursor</span>
  - 作者 / 来源：Cursor Team（引言 Rahul Popuri、Elton Yang / Navan） ｜ 发布：2026-10-16 ｜ 工具：Cursor Cloud Agents 自托管；内部 MCP；浏览器验证
  - 看点：Spring Boot 4 迁移 8 应用 + 15 库约一周 vs 两年前一个多月；GitHub 可托管侧、内部 MCP+浏览器自托管侧；约 200 人用 Cloud Agents。厂商客户故事，数字不可核对。
  - 🆕 收录于 2026-10-22 ｜ 👉 [阅读分析](/82-cursor-navan-cloud-agents-migration)

### OpenCompute：给代理按需发电脑 {#item-53}

- **[Introducing OpenCompute](https://factory.com/news/opencompute)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-factory">Factory Droid</span>
  - 作者 / 来源：Walker Hildebrand、Sherry Bai ／ Factory 新闻 ｜ 发布：2026-10-14 ｜ 工具：Factory Droid、Missions、Remote Control
  - 看点：一台远程机器不等于一支机队；在各家沙箱之上做通用生命周期，意图写进 Postgres 再由 reconciler 调和；每个平台一个 gRPC driver，用必选和可选能力档位的一致性测试约束；只向外连。首个客户的 driver 由代理按“合约 + 一致性测试”写成。private preview，无性能数据。
  - 🆕 收录于 2026-10-15 ｜ 👉 [阅读分析](/53-factory-opencompute)


### Air 云端沙箱：每任务新 VM {#item-70}

- **[How Cloud-Based Agent Sandboxing Works in Air](https://blog.jetbrains.com/air/2026/10/cloud-agent-sandboxing/)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-jetbrains">JetBrains Air</span>
  - 作者 / 来源：Dennis Ushakov ／ JetBrains Blog · Air ｜ 发布：2026-10-14 ｜ 工具：JetBrains Air（组织用户预览）
  - 看点：五种跑法的默认隔离对照；本地隔离靠客户端；Air = 每任务新 VM + 容器 + 出站白名单（默认源码托管与包仓库）；密钥加密注入、任务跟开发者本人仓库权限。知识库首篇 JetBrains；无逃逸测试数据。
  - 🆕 收录于 2026-10-19 ｜ 👉 [阅读分析](/70-jetbrains-air-cloud-sandboxing)

### Claude Code 云端会话实战 {#item-48}

- **[Claude Code in the cloud: a field guide to cloud sessions](https://claude.dev/blog/claude-code-in-the-cloud/)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Addy Osmani ／ claude.dev 博客 ｜ 发布：2026-10-06 ｜ 工具：Claude Code
  - 看点：一个任务一台 VM：三个会话 87 秒修完三个问题；什么时候留在本地；七种云端用法（并行、反复验证、teleport、Auto-fix、routines、跑不可信代码）；GitHub 权限排错表。
  - 🆕 收录于 2026-10-14 ｜ 👉 [阅读分析](/48-claude-code-cloud-sessions)

### Projects：一个协调代理管一群子代理 {#item-58}

- **[Introducing Projects](https://cursor.com/blog/projects)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-cursor">Cursor</span>
  - 作者 / 来源：Alexi Robbins、Fredrika Lindh ／ Cursor 博客 ｜ 发布：2026-09-10 ｜ 工具：Cursor Projects（beta）、云端与本地代理、Slack
  - 看点：协调代理只派活不写代码，所以随时响应；默认云端、共享上下文文件跨机器同步、订阅 Slack / 定时 / PR；功能、迁移、园艺三种用法；同一错误两次就加 lint 规则。产品发布文，30% / 6 倍 PR 为厂商自报。
  - 🆕 收录于 2026-10-16 ｜ 👉 [阅读分析](/58-cursor-projects)

### Claude Code 团队的工作流 {#item-02}

- **[How the Claude Code team uses Claude Code](https://www.youtube.com/watch?v=S-sYlFiGFv8)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 讲者 / 频道：Thariq Shihipar、Sid Bidasaria、Robert Boyce（Anthropic）／ Claude ｜ 发布：2026-09-02 ｜ 工具：Claude Code、Claude Tag
  - 看点：70–80% 工作经由 Slack 原生的 Claude Tag；给目标而非任务；扇出找 bug + 对抗式复审的 workflow。
  - 👉 [阅读分析](/02-claude-code-team-workflows)

### 云端代理跑在自己的机器上 {#item-51}

- **[Run cloud agents on machines you manage](https://cursor.com/blog/self-hosted-machines)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-cursor">Cursor</span>
  - 作者 / 来源：Jack Pertschuk ／ Cursor 博客 ｜ 发布：2026-09-02 ｜ 工具：Cursor
  - 看点：执行搬进你的网络、推理留在 Cursor：worker 出站长连接接收工具调用；pool 按队列扩容、空闲休眠、一池多仓库；工具输出仍会回到 Cursor。
  - 🆕 收录于 2026-10-14 ｜ 👉 [阅读分析](/51-cursor-self-hosted-machines)

### Claude Code 一周年：验证与 Routines {#item-01}

- **[Reflecting on a year of Claude Code](https://www.youtube.com/watch?v=Hth_tLaC2j8)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 讲者 / 频道：Boris Cherny、Cat Wu（Anthropic）／ Claude ｜ 发布：2026-06-08 ｜ 工具：Claude Code（Routines、Auto mode、`/loop`、Remote Control）
  - 看点：每次犯错就写进 CLAUDE.md / Skill；验证 = “can the agent run the thing?”；用 routine 自动修 bug、盯 PR。
  - 👉 [阅读分析](/01-claude-code-one-year)

### 云端代理一年的四条教训 {#item-40}

- **[What we’ve learned building cloud agents](https://cursor.com/blog/cloud-agent-lessons)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-cursor">Cursor</span>
  - 作者 / 来源：Josh Ma ／ Cursor 博客 ｜ 发布：2026-06-02 ｜ 工具：Cursor Cloud Agents、Temporal、CI Autofix
  - 看点：完整开发环境是输出质量的最大因素，缺了往往只表现为质量下降；从 work-stealing 迁到 Temporal，可靠性从一个 9 到两个 9 以上；代理循环、机器、对话状态解耦；模型变强后把 harness 逻辑搬进工具。
  - 🆕 收录于 2026-10-12 ｜ 👉 [阅读分析](/40-cursor-cloud-agent-lessons)
## 看原理 · Harness 与内部机制 {#domain-harness}

**这一组放什么**：理解代理外壳怎么工作：上下文、权限、循环和“做与查分离”背后的设计。

📘 **先读阶段指南**：[看原理 · Harness 与内部机制](/guide/harness)

### 在 Codex harness 上做自己的客户端 {#item-43}

- **[Building on the Codex Harness — Dominik Kundel, OpenAI](https://www.youtube.com/watch?v=9WiBJRO84yY)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-codex">Codex</span>
  - 作者 / 来源：Dominik Kundel ／ AI Engineer ｜ 发布：2026-10-09 ｜ 工具：Codex app server、Python SDK
  - 看点：app server 是包住 Codex harness 的开源 JSON-RPC 协议；120 多种消息；和 ACP、codex exec 的区别；三条建议：自己打包 harness、工具标 deferred、用 developer instructions 追加。
  - 🆕 收录于 2026-10-13 ｜ 👉 [阅读分析](/43-codex-app-server)

### 长任务的 token 省在哪 {#item-54}

- **[Improved token efficiency for longer agent runs](https://cursor.com/blog/improved-token-efficiency)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-cursor">Cursor</span>
  - 作者 / 来源：Jediah Katz、Connor O’Keefe、Calvin Yee ／ Cursor 研究博客 ｜ 发布：2026-09-23 ｜ 工具：Cursor 代理 harness
  - 看点：系统提示删约 66%；低频工具按需加载，静态工具描述 token 降 60%；缓存断点放在稳定前缀后，冷缓存未命中降 20%；行号每十行一个；少推子代理。合计降 7% token 成本，靠线上 A/B 确认质量。几个百分比口径不同，不能相加。
  - 🆕 收录于 2026-10-15 ｜ 👉 [阅读分析](/54-cursor-token-efficiency)

### Codex Harness 内部机制 {#item-09}

- **[How Codex Works — Dominik Kundel, OpenAI](https://www.youtube.com/watch?v=shRR1e2HXMk)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-codex">Codex</span>
  - 讲者 / 频道：Dominik Kundel（OpenAI）／ AI Engineer ｜ 发布：2026-08-10 ｜ 工具：Codex harness（开源）、Responses API
  - 看点：deferred tools、skills 占 2% 上下文上限、只读 Auto Review 子代理、`/goal` continuation prompt、服务端 compaction。
  - 👉 [阅读分析](/09-how-codex-works)

### 源码解剖 11 个代理外壳 {#item-66}

- **[Harness Engineering: Anatomy, Architecture, and Evolution of Coding Agents -- A Source-Code Study of Eleven Systems](https://arxiv.org/abs/2609.00006)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-general">通用（不限工具）</span>
  - 作者 / 来源：Paul Barbaste、Tristan Darrigol、Germain Vu、Tom Wiltberger ／ arXiv（cs.SE，83 页论文，4 月版的扩充第二版） ｜ 发布：2026-07-15 ｜ 工具：Claude Code、Codex CLI、Gemini CLI、OpenHands、Aider 等 11 个系统
  - 看点：外壳的七个子系统及各自最小和最大实现；循环复杂度不预测成绩；11 个系统都不用通用代理框架、不给代码做向量检索；Skills 9/11 超过 MCP 8/11；一个季度里趋同变模仿；18 条设计建议和 90 行脚手架。只读源码不跑分，Claude Code 依据流传快照；arXiv 编号与提交日期不合常规。
  - 🆕 收录于 2026-10-19 ｜ 👉 [阅读分析](/66-harness-engineering-eleven-systems)

### Managed Agents：大脑与双手解耦 {#item-45}

- **[Scaling Managed Agents: Decoupling the brain from the hands](https://www.anthropic.com/engineering/managed-agents)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Lance Martin、Gabe Cemaj、Michael Cohen ／ Anthropic Engineering 博客 ｜ 发布：2026-04-08 ｜ 工具：Claude Managed Agents
  - 看点：把代理拆成 session、harness、sandbox 三个接口；容器和 harness 都可丢弃；凭据不进沙箱；session 是窗口外的上下文对象；p50 TTFT 降约 60%、p95 降超 90%。
  - 🆕 收录于 2026-10-13 ｜ 👉 [阅读分析](/45-anthropic-managed-agents)

### Planner / Generator / Evaluator 长时 harness {#item-16}

- **[Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Prithvi Rajasekaran（Anthropic Labs）／ Anthropic Engineering 博客 ｜ 发布：2026-03-24 ｜ 工具：Claude Agent SDK、Claude Opus 4.5 / 4.6、Playwright MCP
  - 看点：Planner 扩写规格、Generator 实现、Evaluator 用浏览器实测打分；单代理 20 分钟 / $9 做出的游戏是坏的，完整 harness 6 小时 / $200 能玩；模型升级后逐个拆脚手架。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/16-anthropic-harness-design-long-running-apps)

### 多代理 harness 的五次改版 {#item-38}

- **[Towards self-driving codebases](https://cursor.com/blog/self-driving-codebases)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-cursor">Cursor</span>
  - 作者 / 来源：Wilson Lin ／ Cursor 博客 ｜ 发布：2026-02-05 ｜ 工具：Cursor 自研 Rust 多代理 harness
  - 看点：#18 的续篇：锁 → Planner/Executor/Judge → 持续执行者（角色太多崩溃）→ 递归 Planner + Worker 交接报告；峰值约每小时 1,000 次提交；接受小而稳定的错误率；约束优于指令、给数字范围。
  - 🆕 收录于 2026-10-12 ｜ 👉 [阅读分析](/38-cursor-self-driving-codebases)

### Ralph 循环：为什么每轮重开 {#item-24}

- **[Ralph Wiggum (and why Claude Code's implementation isn't it)](https://www.youtube.com/watch?v=O2bBWDoxO4s)** <span class="type-tag type-video">视频</span> <span class="tool-tag tool-claude">Claude Code</span>
  - 作者 / 来源：Geoffrey Huntley、Dex Horthy ／ Geoffrey Huntley（直播录像） ｜ 发布：2026-01-04 ｜ 工具：Claude Code、官方 Ralph Wiggum 插件、bash、tmux
  - 看点：Ralph 最纯粹的形式是一行 bash；每轮全新上下文、一轮一个目标；与官方插件（Stop hook、同一会话）的差别。
  - 🆕 收录于 2026-10-09 ｜ 👉 [阅读分析](/24-huntley-horthy-ralph-loop)

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

### Architect / Editor：推理与编辑分开 {#item-44}

- **[Separating code reasoning and editing](https://aider.chat/2024/09/26/architect.html)** <span class="type-tag type-article">文章</span> <span class="tool-tag tool-aider">Aider</span>
  - 作者 / 来源：Paul Gauthier ／ Aider 博客 ｜ 发布：2024-09-26 ｜ 工具：Aider `--architect`
  - 看点：一个模型想方案、另一个模型写格式正确的编辑；o1-preview + DeepSeek / o1-mini 达 85%，多数模型和自己搭档也提高；发布已两年，模型已过时。
  - 🆕 收录于 2026-10-13 ｜ 👉 [阅读分析](/44-aider-architect-editor)

## 覆盖情况与已知缺口（如实说明） {#coverage}

按阶段（按发布日期从新到旧）：打地基 10 篇（#49、#52、#46、#37、#14、#07、#26、#21、#20、#28）；做规划 8 篇（#64、#68、#06、#03、#13、#61、#29、#04）；单代理推进与一人多线 8 篇（#42、#72、#78、#79、#08、#23、#11、#27）；多代理协作与大任务拆分 9 篇（#80、#76、#74、#65、#17、#05、#18、#30、#73）；验收这一次的产出 10 篇（#60、#81、#15、#59、#75、#12、#71、#32、#25、#31）；评测代理本身与给动作把关 9 篇（#69、#77、#62、#83、#39、#56、#50、#47、#19）；接进 PR 与 CI 9 篇（#63、#41、#57、#10、#55、#67、#33、#22、#34）；云端与后台运行环境 9 篇（#82、#53、#70、#48、#58、#02、#51、#01、#40）；看原理 11 篇（#43、#54、#09、#66、#45、#16、#38、#24、#35、#36、#44）。

**阶段拆分（2026-10-19，已确认）**：按下面建议②把“去执行”拆成“单代理推进与一人多线”（`solo`）和“多代理协作与大任务拆分”（`multi`）两个相邻阶段，各 5 篇；边界：主角是“一个人 + 一个主代理”、任务彼此独立、协调靠人（子代理只是主代理的工具）的归前者，多个代理围绕同一个目标分工、认领、交接或长时间运行的归后者。#08 虽然演示了 20 个子代理，但子代理由主代理切片派发、结果交回主代理，归前者。旧地址 `/guide/execution` 改为指向两个新指南的入口页，长时任务专题归入后者；“看原理”按建议①暂不拆。现在 71 份资料分 9 个阶段，最多 11 篇（看原理）、最少 5 篇。无阶段超过 10 篇检查线。

**容量检查（2026-10-19，第八批 #64–#67 后）**：看原理到 11 篇，打地基、去执行各 10 篇，接进 PR 与 CI 9 篇，四个阶段超过 8 篇检查线。逐篇复核归类：#64 的主要贡献是“计划怎么被审查”，归做规划（与 #60 的分歧放在规划指南）；#65 讲把大任务扇出给并行代理，归去执行；#66 是 11 个外壳的源码解剖，归看原理；#67 讲把代理接进工单、PR 和告警等团队事件流，归接进 PR 与 CI。**拆分建议（只是建议，未执行，等用户确认）**：①看原理（11 篇）可按“外壳的哪一层”拆成“循环与上下文”（#24、#09、#54、#36、#35、#44、#66）和“多代理与外部接口”（#16、#38、#45、#43），但这会引入第二条分类轴，更稳妥的做法是先把 #66 当作本阶段的总索引、暂不拆；②去执行（10 篇，已于 2026-10-19 确认并执行，见上条）可按任务顺序拆成“单代理与一人多线程”（#27、#11、#42、#23、#08）和“多代理协作与大任务拆分”（#05、#17、#18、#30、#65）；③打地基（10 篇）可拆成“规则与上下文文件”（#20、#21、#26、#46、#14、#07）和“开发环境与扩展机制”（#28、#37、#49、#52）；④接进 PR 与 CI（9 篇）刚过线，边界仍清楚，暂不拆。

**容量检查（2026-10-21，第十一批 #76–#79 后）**：现在 79 份资料分 9 个阶段：看原理 11 篇（用户 2026-10-19 决定暂不拆，本批没有往里加）；打地基 10 篇（到线未超过）；验收这一次的产出、接进 PR 与 CI 各 9 篇；做规划、单代理推进与一人多线、多代理协作与大任务拆分、评测代理本身与给动作把关、云端与后台运行环境各 8 篇。除看原理外没有阶段超过 10 篇，本批不提新的拆分建议。逐篇复核归类：#76 讲多个代理围绕同一目标怎么分工、领队和工人怎么配，归多代理；#77 讲怎么系统评测 Skill 会不会被找到、有没有被用上，归评测（它也讲 Skill 怎么组织，但主要贡献是评测方法）；#78 讲一个人怎么控制单个会话的成本、子代理选什么模型，归单代理；#79 讲人不在电脑前时怎么驾驭在开发机上跑的代理，主角是“一个人 + 一个主代理”，归单代理（它也涉及代理在哪台机器跑，但不讲执行环境本身，所以不归云端）。

**容量检查（2026-10-20，第十批 #72–#75 后）**：现在 75 份资料分 9 个阶段：看原理 11 篇（用户 2026-10-19 决定暂不拆，维持上面建议①的方案：先把 #66 当总索引）；打地基 10 篇（到线未超过）；验收这一次的产出、接进 PR 与 CI 各 9 篇；做规划、云端与后台运行环境各 8 篇；多代理协作与大任务拆分、评测各 7 篇；单代理推进与一人多线 6 篇。除看原理外没有阶段超过 10 篇，本批不提新的拆分建议。逐篇复核归类：#72 讲一个人怎么决定自己在环里盯多久、什么时候开高档验证，归单代理；#73 是跨几十个会话的长时任务接力，与长时任务专题同组，归多代理（它的后继 #16 因讲 harness 结构归看原理）；#74 是主代理和多个工人围绕同一迁移目标、按依赖图协调，归多代理；#75 讲 AI 审查器读什么规则、规则怎么测，归验收。

**容量检查（2026-10-19，第八批 #60–#63 后）**：接进 PR 与 CI 到 8 篇，打地基、看原理各 10 篇，其余阶段 6–7 篇。逐篇复核归类：#60 的核心论点是“这一次的改动怎么审”，归验收这一次的产出（其中 merge queue、CI 部分在 CI 指南用 xref 引用）；#61 的主要贡献是长任务的规格和里程碑计划怎么写，归做规划（长时运行的对照放进长时任务专题）；#62 是评测与爬分方法，归评测代理本身；#63 讲让代理批量开维护 PR、给 CI 提速，按内容也可放去执行，但去执行已有 9 篇，且主线是“维护 PR 怎么进流水线”，归接进 PR 与 CI。

**阶段拆分（2026-10-16，已确认）**：按下面的建议把“做验证”拆成“验收这一次的产出”（`review`）和“评测代理本身与给动作把关”（`evals`）两个相邻阶段，分别 6 篇和 5 篇；旧地址 `/guide/verification` 改为指向两个新指南的入口页。现在 59 份资料分 8 个阶段，最多 10 篇、最少 5 篇。

**容量检查（2026-10-16，第七批 #57–#59 后）**：做验证到 11 篇，是唯一明显超过 8 篇检查线的阶段；打地基、看原理各 10 篇。逐篇复核归类：#57 的主要贡献是把评测接进 CI 流水线、挡住合并，归“接进 PR 与 CI”（评测概念仍在做验证，用 xref 互链）；#58 讲协调代理在云端管一群子代理，归“云端与后台运行环境”；#59 讲大任务的完成标准与验证者设计，归做验证。**拆分建议（已于 2026-10-16 确认并执行，见下条）**：做验证可以按“验证的对象”拆成两个相邻阶段，仍只走“任务从开始到上线”这条轴：①“验收这一次的产出”（测试、人工审查、对抗式审查、完成标准）：#59、#15、#12、#32、#25、#31，共 6 篇；②“评测代理本身与给动作把关”（评测、分数可信度、权限分类器）：#19、#47、#50、#39、#56，共 5 篇。这样两个阶段都低于 8 篇；#57 继续留在 CI 阶段。

**阶段拆分（2026-10-15，已确认）**：按上面的建议把“自动化”拆成“接进 PR 与 CI”（`ci`）和“云端与后台运行环境”（`cloud`）两个相邻阶段，各 6 篇；旧地址 `/guide/automation` 改为指向两个新指南的入口页。现在 56 份资料分 7 个阶段，平均 8 篇。

**容量检查（2026-10-15，第六批 #52–#56 后）**：打地基 10 篇、做验证 10 篇、看原理 10 篇、自动化 12 篇，四个阶段都超过 8 篇，自动化明显超出。逐篇复核归类：#52（mods）的主要贡献是让代理每次开工的规则和扩展更可控，和 #28 Hooks 同类，归打地基；#53、#55 讲的分别是后台沙箱机队和把维护流程接进 CI，归自动化；#54 是 harness 怎么组装请求和缓存，归看原理；#56 是给代理的动作把关并公布误报漏报，与 #39 同类，归做验证。**拆分建议**：自动化已达 12 篇，建议按任务顺序拆成两个相邻阶段：“接进 PR 与 CI”（#10、#22、#33、#34、#55、#41）和“云端与后台运行环境”（#01、#02、#40、#48、#51、#53）。这仍是同一条“任务从开始到上线”的轴，只是把“触发与流水线”和“代理在哪里跑”分开。其余三个阶段各 10 篇，边界仍清楚，暂不拆。是否拆分等用户确认后再改 `domains.mjs` 和指南。

**容量检查（2026-10-14，按 AGENTS.md 第 5.1 节第 4 条）**：第五批后打地基 9 篇、做验证 9 篇、自动化 10 篇。逐篇复核后没有改动归类：#49 的主要贡献是让开发基础设施（源代码管理）能承载代理规模，和 #37“把开发环境做成给代理用的产品”同类，归打地基（其中 CI、合并队列部分在自动化指南里用 xref 引用）；#47、#50 的核心论点都是“怎么确认评测结果可信”，归做验证；#48、#51 讲的都是代理在后台 / 云端哪里跑、怎么跑，归自动化。考虑过把 #51 放进打地基（与 #37 同为运行环境），但它讲的是云端代理的执行位置和扩缩，主要服务于后台运行，所以留在自动化。51 份资料分 6 个阶段，平均 8.5 篇，各阶段的边界仍然清楚，暂不改阶段名称、不拆分；如果自动化再增加，可考虑按“触发与 CI”和“云端运行环境”拆成两个相邻阶段（仍只按任务顺序这一条轴）。

**容量检查（2026-10-13）**：“去执行”和“看原理”都到了 9 篇。逐篇复核后没有改动归类：#42 主要教的是在 Codex 应用里把活干完（Computer Use、`/goal`、子代理、线程交接），属于去执行；#43、#44、#45 的主要贡献都是 harness 的接口或机制（app server 协议、推理与编辑分离、session / harness / sandbox 解耦），放在其他阶段都会偏。46 份资料分 6 个阶段，平均已接近 8 篇，所以暂不改阶段名称；下一批如果还要往这两个阶段加，应考虑拆分阶段（仍然只按任务顺序这一条轴）。

按类型：视频 23 篇；文章 51 篇（#16–#20、#27、#29、#31、#32、#33、#36、#37–#41、#44–#56、#58–#79；#66 为 arXiv 论文，按文章计）；官方文档 3 篇（#22、#28、#34）；指南 2 篇（#25、#57）。

按工具：

| 工具 | 数量 | 资料 | 说明 |
|---|---|---|---|
| Claude Code | 25 | #01–#06、#16、#17、#20、#21、#23、#24、#28、#41、#45、#48、#52、#56、#57、#60、#62、#72、#73、#77、#78 | 内容最充足，官方团队直接讲内部用法；#28 为官方 hooks 文档；2026-10-19 补上团队代码审查流程（#60）和评测爬分（#62）；2026-10-20 补上 effort 档位（#72）和 #16 的前作（#73）；2026-10-21 补上 Expo 的 Skill 评测（#77，第三方插件作者）和任务成本拆解（#78） |
| Codex | 15 | #07–#11、#22、#31、#42、#43、#47、#55、#61、#63、#75、#79 | 官方工程师讲 harness 与内部流程，#22 为官方文档，#31 为 OpenAI 对齐团队的审查器研究；2026-10-19 补上 25 小时长任务（#61）和维护 PR（#63）；2026-10-20 补上 AGENTS.md 审查规则（#75）；2026-10-21 补上手机端 Remote 使用指南（#79） |
| Grok（Grok Build / Cursor + Grok 4.5） | 7 | #12–#15、#34、#46、#65 | 2026-10-09 第二批补上了 xAI 官方文档（#34）；2026-10-19 收录 xAI 官方产品公告（#65，篇幅很短）；仍缺官方工程演讲，见下 |
| Cursor | 9 | #18、#33、#37–#40、#51、#54、#58 | 公司研究博客；2026-10-16 补上 Projects 协调代理（#58）；2026-10-12 补上云端代理（#37、#40）和 Auto-review 评测（#39）；2026-10-14 补上自托管执行机器（#51）；2026-10-15 补上 harness 省 token（#54） |
| Gemini CLI | 1 | #29 | Google 官方博客；#28 中附有 Gemini CLI hooks 对照 |
| OpenHands | 2 | #30、#71 | 大会研讨会；官方博客（#71 验证栈） |
| Devin | 2 | #32、#67 | Cognition 官方博客；#67 是厂商讲自家团队怎么用 Devin，文中已标明 |
| Amp | 1 | #35 | 大会演讲；演讲后产品有较大变化，文中已注明 |
| Factory Droid | 2 | #53、#59 | Factory 官方新闻与研究文章；#26 的讲者也来自 Factory，但内容不限工具，归“通用” |
| Aider | 1 | #44 | 官方博客，2024-09 发布，时效较差，文中已注明 |
| JetBrains Air | 1 | #70 | JetBrains 官方博客 |
| 通用（不限工具） | 13 | #19、#25、#26、#27、#36、#49、#50、#64、#66、#68、#69、#74、#76 | 方法论、评测、MCP 设计与开发基础设施，适用于任何编码代理；2026-10-19 补上规格驱动的计划审查（#64）、11 个外壳的源码比较（#66）、个人无人值守管线（#68）和 Google Cloud 评测教训（#69）；2026-10-20 补上外包公司的多仓迁移复盘（#74）；2026-10-21 补上 Cohere 的多代理团队受控实验（#76） |

**Grok 的缺口：**
- 2026-10-19 收录了 xAI 官方的 Workflows 产品公告（#65），但它只有约 480 词，讲功能不讲设计取舍，仍不算工程博客。
- 2026-10-09 第二批收录了 xAI 官方 Grok Build 文档（#34：hooks、headless、AGENTS.md、`/loop`、worktree），内容实在、可复制。但 xAI 官方的**工程博客或大会演讲**（讲设计取舍和团队实践）仍未找到。
- 未找到 xAI 官方频道或 AI Engineer 等大会上关于 Grok Build / Grok 编码代理的长篇工程演讲或实战讲解；Grok 官方频道只有 1–2 分钟的产品宣传片（如 “Introducing Grok 4.5”），不符合“内容实战”的标准，没有收录。
- 收录的 4 个 Grok 视频都是第三方实测：#12、#13、#14 有完整字幕；#15 内容最贴近“多代理 + 验证”主题，但自动字幕质量差，因此结合简介和官方文档分析。
- 讲架构设计和长期团队实践的 Grok 内容（类似 #07、#10 那样）目前没有找到。Grok 部分的结论主要是“工具能力 + 个人体验”，可信度低于 Claude / Codex 部分。
- 已排除：James Montemagno 的 *Grok Code Fast 1 in VS Code*（2025-08，超出 12 个月且仅 4 分钟）；若干标题党 / 新闻解读类 Grok 视频。

**其他说明：**
- 2026-10-21 第十一批：#76 Cohere 多代理团队受控实验、#77 Expo 的 Skill 评测、#78 Addy Osmani 拆 Claude Code 任务成本、#79 Thomas Ricouard 手机端 Codex Remote 指南（前一日的备选；功能导览为主，评分已体现）。优先补了单代理、多代理、评测三个较少的阶段（6 → 8、7 → 8、7 → 8）。#77 的基线加载率正文前后写了 9% 和“约 10%”，照录。考虑过但未收录：Jeremy Lewi *Automating repetitive work at OpenAI with Codex*（约 1,000 词，主要介绍作者自己的 Runme，继续留作备选）；Denys Zaichenko *Multi-agent orchestration: what broke in 3,315 agent runs*（madsalt.tech，2026-10-19，个人博客，留作备选）；Cursor *Git at any scale*（Vicent Martí，2026-08-18，讲 Git 托管存储架构，不是代理工作流，不收）；Cursor *Bots for the last mile: Rollouts, Security Review*（2026-09-23，约 550 词的产品公告，不收）。
- 2026-10-20 第十批：#72 Claude Code effort 档位（Thariq Shihipar）、#73 Anthropic 长任务 harness（2025-11，#16 的前作，此前只在 #16 的基本信息里作为前作提到）、#74 Blocshop 十个仓库的 .NET 迁移（无个人署名，作者按公司记）、#75 Codex 审查规则（前一日的备选，核实非重复后录入）。优先补了最少的两个阶段（单代理 5 → 6、多代理 5 → 7）。考虑过但未收录：Thomas Ricouard *Mastering remote engineering work from your phone*（OpenAI，2026-06-23，偏产品功能导览，留作备选）；Jeremy Lewi *Automating repetitive work at OpenAI with Codex*（OpenAI，2026-08-25，约 1,000 词，主要介绍作者自己的 Runme 项目，留作备选）；Florian Bruniaux *Plan-execute: running 20+ agents on a migration*（作者自承 243 文件的例子是虚构的、没有日志）；Matías Romero 的个人工作流短文（约 4 分钟，细节不足）。
- 2026-10-19 第八批（下）：#64 Giant Swarm 规格驱动开发、#65 Grok Build Workflows、#66 Harness Engineering 源码研究、#67 Cognition 用 Devin 开发 Devin。#64 作者署名 Dominik Schmidle，作者页地址是 dominik-kress，按署名写；文章首发 LinkedIn（2026-09-29），published 取公司博客日期 2026-10-13。#66 的 arXiv 编号 2609 与 7 月 15 日提交不合常规，照录；只精读了摘要、七个子系统、13 条观察、效度威胁和 18 条建议。#67 为厂商自述。
- 2026-10-19 第八批（上）：#60 Claude Code 团队代码审查、#61 Codex 25 小时长任务（配套仓库 design-desk 的四份 Markdown 原文可核对）、#62 评测设计与爬分、#63 用 Codex 批量维护。#61 博客说 prompt.md 有“非目标”一节，仓库里的版本没有，文中已注明。
- 2026-10-19 第九批：#68 个人 asl 管线（AI 起草声明）；#69 Google Cloud 四条评测教训；#70 JetBrains Air 云端沙箱（站内首篇 JetBrains）；#71 OpenHands 验证栈。同步 AGENTS.md：核实后直接录入、阶段超 10 篇只给拆分建议。
- 2026-10-16 第七批：#57 补上了长期缺的“把 agent evals 接进 CI”端到端示例（eval JSON、GitHub Actions workflow、`check.sh` 全文），该缺口**已覆盖**；局限是示例场景为课程构造、没有成本数据、每条 eval 只跑一次。#57 课程页本身不显示日期，2026-08-21 取自 playbook 总览页的发布日期。#58 是 Cursor Projects 发布文；#59 是 Factory 的 ProgramBench 实验，单次运行、算力不对等。
- 2026-10-15 第六批：#52 mods、#53 OpenCompute、#54 Cursor 省 token、#55 OpenAI 用 Skills 维护 SDK 仓库、#56 Claude Code auto mode。#55 补上了“把 Skill 接进 CI”的真实仓库做法，但仍不是“把 agent evals 接进 CI”的端到端示例。#55 页面日期 Mar 9, 2026，正文里的 March 6, 2026 是下载量数据截止日。同日 #05、#30 取得完整字幕，按新方法重写（#30 从只覆盖前 35 分钟扩展到全长）。
- 2026-10-14 第五批：#47 补上了一个可照做的评测脚本（但评测对象是 Skill，不是 CI 里的代码评测，仍不算“把 agent evals 接进 CI”的端到端示例）；#50 说明评测分数里混着基础设施噪声；#48、#51 补上 Claude Code 云端会话和 Cursor 自托管执行环境；#49 是 Anthropic 源代码管理重做的一手经验。#51 页面元数据发布日期为 2026-09-02，页面里另有一个 2026-08-13 的时间标记，按元数据记。
- 2026-10-13 第四批补上了 Aider（#44，但是 2024 年的老文章）和 xAI 官方的一篇产品说明（#46，Grok Build 记忆，内容很短）；xAI 官方的**工程博客或大会演讲**仍未找到。#41、#45 来自 Anthropic，#42、#43 来自 OpenAI 的 AI Engineer 演讲（录制于 6–7 月，10 月上传）。
- 2026-10-12 第三批补上了 Cursor 云端代理的专门资料（#37、#40），以及一个把评测接进生产链路的案例（#39，但它评测的是权限分类器，不是 CI 里的代码评测）。**仍未覆盖**（截至第三批）：Aider；“把 agent evals 接进 CI”的端到端配置示例；xAI 官方的 Grok 工程博客或大会演讲。
- Cursor 已有 6 篇，全部来自 Cursor 自己的博客，结论请视为该厂商的经验；#37 和 #40 的 PR 占比（一半以上 vs 超过 40%）是不同时间点的数据。
- 第二批考虑过但未收录：Google Cloud Tech 的 Gemini CLI 直播《Making a list {and checking it twice}: The Gemini CLI workflow》（https://www.youtube.com/watch?v=4U3nfVxlwlM，1 小时直播，内容与 #29 重叠）。
- 时效：#44 发布于 2024-09，是全站最老的资料；#04、#20、#21、#26 发布于 2025 年 11–12 月，#22（持续更新的文档）与 #25（连载指南）以 2026-10-09 抓取的版本为准，其余均为 2026 年发布。
- 按要求排除了以漏洞挖掘 / 攻防安全为主题的资料，只保留软件开发工作流。
- 未收录但可作延伸阅读：Ryan Lopopolo 在 Latent Space 的长访谈 *Extreme Harness Engineering*（https://www.youtube.com/watch?v=CeOXx-XTYek，与 #07 同一讲者，含 Symphony 编排器）；Jason Liu 在 OpenAI DevDay 2026 的 *From Single Player to Multiplayer with Codex*（https://www.youtube.com/watch?v=aDTPTwnrRyA，偏知识工作协作）。
