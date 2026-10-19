# 让代理连续跑 25 小时不跑偏，靠的是什么：Codex 长时任务的四份 Markdown

<div class="meta-tags"><span class="tool-tag tool-codex">Codex</span></div>

<div class="hook">

**一句话看懂**：OpenAI 的 Derrick Choi 给 Codex 一个空仓库和全部权限，让它从零做一个设计工具。Codex 不间断跑了约 25 小时，用了约 1,300 万 token，写了约 3 万行代码。作者说最关键的不是某个巧妙的提示词，而是**持久的项目记忆**：四份 Markdown 文件分别负责冻结目标（prompt.md）、拆成可验收的里程碑（plans.md）、规定怎么干活（implement.md）、记录做到了哪儿（documentation.md）。每个里程碑结束都跑 lint、类型检查和测试，失败了先修再往下走。这四份文件的原文都在公开仓库里，可以照着改。

</div>

## 读完你能带走的 6 条收获

1. **长时任务比的是“能连贯多久”，不是一次有多聪明**：代理要能保持方向、做完大块工作、从错误里恢复而不丢线索（见 3.1）。
2. **连贯靠循环和外化状态**：计划 → 改代码 → 跑工具 → 看结果 → 修 → 更新文档，状态都写在仓库文件里，而不是留在上下文里（见 3.1）。
3. **先冻结目标，再动手**：prompt.md 写清目标、硬约束、交付物和“做完的标准”，并要求在写任何代码之前先产出完整的 plans.md（见 3.2）。
4. **计划要拆成“一轮能做完、能自己验收”的里程碑**：每个里程碑写范围、关键文件、验收标准和验证命令（见 3.3）。
5. **把“怎么干活”单独写成 runbook**：以 plans.md 为准、模糊处自己决定并记下来、小步提交、每个里程碑后跑验证并立刻修（见 3.4）。
6. **documentation.md 是你离开几小时后回来看的那份审计日志**：现在做到哪、做过什么决定、怎么运行和演示、已知问题（见 3.4）。

::: tip 小白先懂这几个词
- [Long-running Agent（长时运行代理）](/glossary#long-running-agent)：一次跑几个小时甚至几天的代理任务。
- [Spec（规格说明）](/glossary#spec)：动手前写下“要做成什么样”的文档。
- [Plan Mode（计划模式）](/glossary#plan-mode)：先出计划、确认后再改代码。
- [Runbook（操作手册）](/glossary#runbook)：一步一步写清“该怎么做”的执行说明。
- [Drift（漂移）](/glossary#drift)：代理在长任务里慢慢偏离最初的目标。
- [Reasoning Effort（推理强度）](/glossary#reasoning-effort)：让模型想得多一点还是少一点的档位。
:::

## 1. 基本信息

<SourceCard type="文章" title="Run long horizon tasks with Codex" author="Derrick Choi" date="2026-02-23" url="https://developers.openai.com/blog/run-long-horizon-tasks-with-codex" />

| 项目 | 内容 |
|---|---|
| 链接 | https://developers.openai.com/blog/run-long-horizon-tasks-with-codex |
| 类型 | OpenAI Developers 博客（正文约 1,430 词，14 张截图） |
| 作者 | Derrick Choi（OpenAI） |
| 发布日期 | 2026-02-23（页面显示 Feb 23, 2026） |
| 使用工具 | Codex（CLI 与 Codex app）、GPT-5.3-Codex，推理强度 “Extra High” |
| 配套仓库 | [derrickchoi-openai/design-desk](https://github.com/derrickchoi-openai/design-desk)，`docs/` 下有 `prompt.md`、`plans.md`、`implement.md`、`documentation.md` |
| 分析依据 | 博客全文，以及配套仓库里四份 Markdown 的原文，都在 2026-10-19 用 curl 抓取，引语逐字核对。博客里会话统计、验证命令、lint 修复都只有截图，正文没有数字以外的细节；25 小时、13M token、3 万行是作者自报的单次实验。“我觉得”开头的段落是本站评论。 |

## 2. 这篇在回答什么

假设你要让代理从零做一个类似 Figma 的设计工具：画布、图层、属性面板、多人协作、版本历史、导出代码。这不是改一个函数，而是几十个互相依赖的功能，要连续做很多个小时。

最常见的失败不是代理写不出代码，而是做着做着就偏了：忘了最初的约束，在两种方案之间来回摇摆，或者做出一个“看起来很厉害但是不对”的东西。

作者想测的正是这个上限。他给 Codex 一个空仓库、全部权限和一个任务，然后让它自己跑：

<Trans zh="Codex 不间断地跑了大约 25 小时，用了大约 1,300 万 token，生成了大约 3 万行代码。">“Codex ran for about 25 hours uninterrupted, used about 13M tokens, and generated about 30k lines of code.”</Trans>

他也提醒，这是一次实验，不是生产环境的上线。全文回答四个问题：

1. 长时任务到底难在哪？（3.1）
2. 动手之前，目标怎么写才不会跑偏？（3.2）
3. 计划怎么拆，才能让代理自己验收？（3.3）
4. 执行时遵守什么规则，人怎么知道它做到哪了？（3.4）

最后看结果说明了什么、没说明什么（3.5）。

```mermaid
flowchart LR
  P["prompt.md<br/>冻结目标与完成标准"] --> L["plans.md<br/>里程碑 + 验收 + 验证命令"]
  L --> I["implement.md<br/>执行规则（runbook）"]
  I --> LOOP["改代码 → lint / 类型 / 测试 → 失败先修"]
  LOOP -->|下一个里程碑| L
  LOOP --> D["documentation.md<br/>状态、决策、怎么运行"]
  D -.->|人隔几小时回来看| H["人在里程碑处纠偏"]
```

## 3. 怎么做

### 3.1 真正变化的是“时间跨度”

作者认为，现在编码代理的变化不只是“模型变聪明了”，而是能连贯工作的时间变长了：

<Trans zh="实际的变化是，代理能保持连贯更久，端到端完成更大块的工作，并且能从错误中恢复而不丢掉线索。">“The practical change is that agents can stay coherent for longer, complete larger chunks of work end-to-end, and recover from errors without losing the thread.”</Trans>

他引用了 METR 的时间跨度研究作为背景：前沿代理以约 50% 和 80% 的可靠性能完成的软件任务长度增长很快，大约每 7 个月翻一倍。他还提到 GPT-5.3-Codex 在两方面更适合代理工作：多步执行（计划 → 实现 → 验证 → 修复）更好；中途更容易纠偏，纠偏不会抹掉已有进展。

**为什么能连贯？** 作者的解释是，长时工作靠的不是一个巨大的提示词，而是模型所在的那个循环。Codex 的循环大致是：计划、改代码、跑工具（测试、构建、lint）、观察结果、修复失败、更新文档和状态，然后重复。这个循环给了代理三样东西：

- **真实的反馈**：报错、diff、日志。
- **外化的状态**：仓库、文件、文档、worktree、输出，都在磁盘上，不依赖上下文记住。
- **随时间的可控性**：人可以根据结果纠偏。

他也顺带说明了为什么 Codex 模型在 Codex 自己的界面上比在普通聊天窗口里表现更好：harness 会提供结构化的上下文（仓库元数据、文件树、diff、命令输出），并强制执行一套有纪律的 “done when”（何时算做完）流程。

我觉得“外化状态”是这一节真正的要点，后面四份文件都是它的具体落地。站内 [[24]] 的 Ralph 循环每一轮都重开会话、只靠磁盘上的文件接续，[[16]] 用文件在 planner 和 generator 之间交接，思路相同：上下文会满、会被压缩，文件不会。

### 3.2 prompt.md：先把目标冻结

作者选设计工具做实验，是因为它是一道“没法糊弄”的题：UI、数据模型、编辑操作和大量边界情况混在一起。原文说：

<Trans zh="你糊弄不过去。如果架构错了，它很快就会坏。">“You can’t bluff it. If the architecture is wrong, it breaks quickly.”</Trans>

他说最重要的技巧是持久的项目记忆：

<Trans zh="我把规格、计划、约束和状态写在 Codex 可以反复回看的 Markdown 文件里。这防止了漂移，也让“做完”有一个稳定的定义。">“I wrote the spec, plan, constraints, and status in markdown files that Codex could revisit repeatedly. That prevented drift and kept a stable definition of “done.””</Trans>

第一份是 prompt.md，博客里给它的用途是：

<Trans zh="冻结目标，免得代理“做出一个令人印象深刻但是错误的东西”。">“Freeze the target so the agent doesn’t “build something impressive but wrong.””</Trans>

博客列的关键章节是：目标与非目标、硬约束（性能、确定性、体验、平台）、交付物、“做完的标准”（检查项和演示流程）。

仓库里的 prompt.md 原文比这个列表更具体。它开头给代理一个身份和任务：

::: tr 你是 Codex，担任资深 staff 工程师和技术负责人。从零构建一个精致的、可在本地运行的“Design Desk”网页应用。
> "You are Codex acting as a senior staff engineer and tech lead. Build a polished, locally runnable “Design Desk” web app from scratch."
:::

接着分几块：核心目标（要让非工程师和工程师都觉得厉害，并且明说 “You will run for hours: plan first, then implement milestone by milestone.”，即你会跑好几个小时，先计划，再一个里程碑一个里程碑地实现）；硬约束（一条命令启动、TypeScript + React + Vite + Tailwind、只用开源依赖、完全本地运行、本地 WebSocket 协作服务器、每个里程碑都要有验证步骤）；交付物；从 A 到 K 共 11 块的产品规格（画布编辑器、图层、属性面板、组件、原型、评论、多人协作、版本历史、回放、导出、工程质量）。

最关键的是最后的流程要求。它规定**先计划、后搭架子、再实现**，而且在写代码之前必须先写出 plans.md：

::: tr 先写好 `plans.md`，包含完整计划、风险清单、演示脚本和架构概览。在 `plans.md` 存在并且前后一致之前，不要开始写代码。
> "First, create `plans.md` with the complete plan, risk register, demo script, and architecture overview. Do NOT start coding until `plans.md` exists and is coherent."
:::

流程要求里还写了：计划至少 14 个里程碑；每个里程碑都要有范围、关键文件 / 模块、验收标准和验证命令；要有风险清单、一段 3 分钟的非工程师演示脚本、一节架构概览（场景图数据模型、选择与变换、渲染方式及理由、操作模型、回放、同步、导出）。遇到复杂度取舍时，先按下面这条选，再把取舍和决定记进 `plans.md`：

::: tr 正确性和确定性优先于多做功能。
> "Prefer correctness and determinism over extra features."
:::

注意一个小出入：博客说 prompt.md 里有“目标与非目标”，但仓库里的这份 prompt.md 没有单独的非目标一节，约束主要通过硬要求和“正确性优先”来表达。

我觉得这份 prompt.md 最值得学的不是功能清单，而是两条元规则：“先写 plans.md 再写代码”和“正确性优先于多做功能”。前一条把规划变成了一个可检查的交付物；后一条给了代理一个在长任务里自己做取舍的依据，这正是没人盯着时最需要的东西。

### 3.3 plans.md：把开放的工作拆成可验收的里程碑

博客给 plans.md 的用途是：

<Trans zh="把开放式的工作变成一串代理能完成并验证的检查点。">“Turn open-ended work into a sequence of checkpoints the agent can finish and verify.”</Trans>

博客列出的要点有五条：里程碑小到一轮循环能做完；每个里程碑有验收标准和验证命令；停下来修的规则（验证失败就先修，再往下走）；决策记录，避免来回摇摆；代码库的目标架构。

仓库里的 plans.md 是 Codex 自己写、自己维护的，有 24 个里程碑，每个都打了勾。拿第 4 个里程碑（核心数据模型）为例，它的结构是这样的（原文摘录，2026-10-19 抓取）：

::: tr 里程碑 04：核心数据模型（场景图、ID、规范化序列化）。验收标准：文档往返序列化后语义不变；规范化 JSON 输出在多次运行间稳定；需要的地方 ID 是确定的（比如初始 / 演示内容）。验证命令：先单独跑 canonical 测试，再跑 lint、类型检查和全部测试。
```text
### Milestone 04 - Core data model: scene graph, IDs, canonical serialization [x]
Acceptance criteria:
- Document round-trips without semantic changes.
- Canonical JSON output is stable across runs.
- IDs are deterministic where required (e.g., starter/demo content).

Verification commands:
- `npm run test -- canonical`
- `npm run lint && npm run typecheck && npm run test`
```
:::

（原文这个里程碑还有 Scope 和 Key files/modules 两段，这里省略。）

plans.md 的开头还有一个“随时保持准确”的验证清单：每个里程碑后都要跑 `npm run lint`、`npm run typecheck`、`npm run test`；最后一个里程碑的退出条件再加上 `npm run dev`、`npm run build` 和一条导出命令。文件后半部分是风险清单（渲染、变换数学、实时同步、回放确定性、导出）、演示脚本、架构概览，以及按里程碑记录的“实现笔记和决策日志”。比如第 1 个里程碑记了一条：Tailwind CSS v4 在这个环境里没有暴露预期的 CLI，所以固定用了 3.4.17。

作者还提到，Codex 后来加了原生的 plan mode，在 Codex app、CLI 和 IDE 插件里用 `/plan` 打开，先把大任务拆成可审阅的步骤，必要时会追问。

我觉得“每个里程碑自带验证命令”是这份计划和普通 TODO 清单的根本区别。TODO 清单只告诉代理做什么；这里还告诉它怎么证明做完了。站内 [[29]] 的 Conductor 和 [[04]] 的 RPI 都强调把计划写进仓库，这篇补上的是：计划的每一步都要能被机器检查。

### 3.4 implement.md 和 documentation.md：执行规则与审计日志

**implement.md 是 runbook。** 博客的说法是，它告诉 Codex 具体怎么干活：按计划走，diff 限定范围，跑验证，更新文档。仓库里的原文开头就是一条“不可商量”的约束：

::: tr 不要在一个里程碑结束后停下来问我问题或等我确认。一直推进 `plans.md` 里的每一个里程碑，直到整个项目完成并全部验证通过。
> "Do not stop after a milestone to ask me questions or wait for confirmation."
:::

执行规则（原文要点）：

- 把 `plans.md` 当作唯一事实来源；有任何模糊的地方，自己做一个合理的决定，并且在写代码之前把它记进 `plans.md`。
- 小步、可审阅地提交，不要把无关的改动捆在一起。
- 每个里程碑之后：跑验证命令（lint、类型检查、单元测试、快照和集成检查），立刻修掉所有失败，增补覆盖这个里程碑核心行为的测试，提交信息里写上里程碑名称。
- 任何时候发现 bug：先写一个能复现它的失败测试，修 bug，确认测试通过，再在 `plans.md` 的 “Implementation Notes” 下记一条短说明。

它还列了完成标准，原文写的是 “do not stop until all are true”（全部为真之前不要停）：所有里程碑都实现并打勾；`npm run dev` 能用且默认加载演示文件；两个标签页里多人协作可用；回放模式可用；导出是确定性的并有快照测试证明；测试、lint、类型检查全部通过；`documentation.md` 准确完整。

**documentation.md 是共享记忆和审计日志。** 博客说：

<Trans zh="这是共享记忆和审计日志。靠它，我可以离开好几个小时，回来仍然知道发生了什么。">“This is the shared memory and audit log. It’s how I can step away for hours and still understand what happened.”</Trans>

它的关键章节是：当前里程碑状态（做完了什么、下一步是什么）、做过的决定和原因、怎么运行和演示（命令和快速冒烟测试）、已知问题和后续工作。仓库里这份文件最后还有一节排错，比如端口 5173 被占用时怎么杀掉旧进程。

**验证不是最后才做。** 博客说，每个里程碑之后 Codex 都会跑验证命令、修掉失败再继续，并用截图展示了它在 `npm run lint` 失败后修复问题的过程。原文的说法是：

<Trans zh="Codex 不是写完代码就指望它能用。">“Codex did not just write code and hope it worked.”</Trans>

我觉得把“怎么干活”从“干什么”里拆出来，是这套做法最容易被忽略的一点。plans.md 会随着工作不断被改写，规则如果混在里面，很容易在改写中丢掉；单独的 implement.md 不变，代理每次回来读到的都是同一套纪律。不过“不要停下来问我”这一条只适合实验：在真实项目里，你多半希望代理在关键决策点停下来等你。

### 3.5 做出了什么

作者说，结果不完美，也不是生产就绪的，但它是真实的、可测试的。这次的标准不是“能编译”，而是“有没有照指令做，是不是真的能用”。实现的功能包括：

- 画布编辑（框架、组、形状、文字、图片 / 图标、按钮、图表）；
- 实时协作（在线状态、光标、选区，编辑跨标签页同步）；
- 属性面板、图层管理、参考线 / 对齐 / 吸附；
- 历史快照与恢复、回放时间线并能从过去某点分支；
- 原型模式（热点和页面跳转）、评论（固定在画布上的讨论，可解决 / 重开）；
- 导出（保存 / 导入 / 导出，以及用 CLI 导出 JSON 和 React + Tailwind 代码）。

博客最后把成功归结为五样东西的组合：清晰的目标和约束（spec 文件）、带验收标准的里程碑（plans.md）、规定代理怎么干活的 runbook（implement.md）、持续验证（测试 / lint / 类型检查 / 构建）、实时的状态和审计日志（documentation.md）。原文的一句话概括：

<Trans zh="少一些盯着，多一些带护栏的委托。">“less babysitting, more delegation with guardrails.”</Trans>

文章结尾是 Codex 方向的展望和入门链接，属于产品介绍。

## 4. 结果与局限

- **原文能证明的**：一份公开的、可以照抄的四文件结构；Codex 在这套结构下完成了 24 个里程碑并全部打勾，最终验证清单（dev、build、lint、typecheck、test、export）都标为通过。
- **单次自报**：25 小时、约 1,300 万 token、约 3 万行都是作者一次运行的自报数字，没有重复实验，也没有说中间人工纠偏了几次。
- **质量没有独立评估**：作者明说结果“不完美，也不是生产就绪的”。3 万行和功能清单不等于质量，原文没有缺陷数、测试覆盖率或人工评审结论。
- **截图代替细节**：会话统计、验证命令、lint 修复过程都只在截图里。
- **博客和仓库有小出入**：博客说 prompt.md 有“非目标”，仓库版本没有；博客文件名有时写 Plan.md、有时写 plans.md，仓库里是小写。
- **厂商立场**：作者是 OpenAI 员工，文章同时在介绍 GPT-5.3-Codex 和 Codex app；文中引用的 Cursor 评价也是在夸 OpenAI 模型。
- **适用前提**：“不要停下来问我”和全部权限适合空仓库实验，不适合有生产数据、有队友的真实仓库。

## 5. 结论

让代理跑很久不跑偏，靠的不是一个更长的提示词，而是把目标、计划、规则和状态都写到磁盘上，让代理每一轮都能重新读到，并且每完成一步就用机器检查一次。四份文件各管一件事：prompt.md 管“做成什么样”，plans.md 管“分几步、每步怎么验收”，implement.md 管“怎么干活”，documentation.md 管“做到哪了”。

我觉得这套结构可以直接缩小了用。一个需要几小时的任务，不必写 900 行的计划，但值得保留三个最小元素：一份写清完成标准的目标文件；每一步都带验证命令的计划；一份代理边做边更新的状态日志。

**你可以这样试**

1. 打开 [design-desk 仓库的 docs 目录](https://github.com/derrickchoi-openai/design-desk)，把 prompt.md 的“流程要求”和 implement.md 的“执行规则”拷下来，改成你项目的技术栈和验证命令。
2. 下一个需要超过一小时的任务，先只让代理写 plans.md：每个里程碑写范围、关键文件、验收标准和验证命令，你看过之后再开始实现。
3. 要求代理每完成一个里程碑就更新一份状态文件，你隔一段时间只看这份文件，而不是翻对话记录。

**读完自测**

- 为什么作者说“持久的项目记忆”是最重要的技巧？它解决的是什么问题？
- plans.md 里的一个里程碑，至少要写哪几样东西？
- implement.md 为什么要和 plans.md 分开写？
