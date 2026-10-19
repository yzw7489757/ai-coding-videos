# 拆开 11 个编码代理，外壳里到底装了什么：一份源码级的 Harness 解剖

<div class="meta-tags"><span class="tool-tag tool-general">通用（不限工具）</span></div>

<div class="hook">

**一句话看懂**：这是一篇 83 页的 arXiv 论文。四位作者读了 11 个编码代理的源码（Claude Code、Codex CLI、Gemini CLI、Mistral Vibe、OpenHands、Aider、Mini-SWE-Agent、Hermes、Pi、OpenCode、OpenClaw），另外拿 Databricks 的 Omnigent 作对照。他们把“外壳”（harness）拆成七个子系统，给出 13 条观察、29 个设计模式和 18 条设计建议。最出人意料的是两个“缺席”：11 个系统的代理运行时都没用 LangChain 这类通用代理框架，也没有一个用向量检索去找代码。论文不跑分、不排名，只描述和比较它们是怎么搭的。

</div>

## 读完你能带走的 8 条收获

1. **代理 = 模型 + 外壳**：外壳是把模型接到真实世界的运行时，可以拆成七个子系统（见 3.1）。
2. **循环写得多复杂，不决定成绩**：100 行左右的 Mini-SWE-Agent 自报的成绩和大得多的系统在同一区间；大系统的大部分代码花在安全、体验、扩展和客户端上（见 3.2）。
3. **没人用通用代理框架，也没人给代码做向量检索**：循环都是手写的，找代码靠 ripgrep、tree-sitter、glob 和自动发现的 Markdown 上下文文件（见 3.3）。
4. **编辑文件的方式很关键**：强模型用“精确唯一子串替换”，弱一些的模型用模糊匹配级联；不要靠行号（见 3.4）。
5. **上下文工程的前沿从“压缩”转到了“记忆怎么写”**：7/11 用阈值触发的摘要压缩，差别在记忆由谁写、谁审（见 3.4）。
6. **Skills 已经比 MCP 更普及**：9/11 对 8/11；协调者-工人的多代理形态在多个系统里独立出现（见 3.4）。
7. **一个季度里，“趋同”变成了“模仿”**：Codex 原样采用 Claude Code 的 hook 词汇，还做了导入它会话和设置的工具（见 3.5）。
8. **自己做一个外壳，先从小做起**：一个 while 循环、一个 bash 工具，工具超过约 15 个再上延迟加载，能单代理就别多代理（见 3.6）。

::: tip 小白先懂这几个词
- [Harness（外壳）](/glossary#harness)：把模型接到工具、文件和人的那层运行时。
- [Meta-harness（元外壳）](/glossary#meta-harness)：自己不改代码、只在上面调度多个外壳的那一层。
- [通用代理框架](/glossary#agentic-framework)：LangChain、LangGraph、AutoGen 这类帮你搭代理的库。
- [Compaction（压缩）](/glossary#compaction)：上下文快满时把旧对话总结成一段摘要。
- [Edit Format（编辑格式）](/glossary#edit-format)：代理用什么格式告诉外壳“改哪几行、怎么改”。
- [Deferred Tools（延迟加载工具）](/glossary#deferred-tools)：工具说明先不全塞进提示词，需要时再搜出来。
- [ACP（Agent Client Protocol）](/glossary#acp)：编辑器和代理之间对话的协议。
:::

## 1. 基本信息

<SourceCard type="论文" title="Harness Engineering: Anatomy, Architecture, and Evolution of Coding Agents -- A Source-Code Study of Eleven Systems" author="Paul Barbaste, Tristan Darrigol, Germain Vu, Tom Wiltberger" date="2026-07-15" url="https://arxiv.org/abs/2609.00006" />

| 项目 | 内容 |
|---|---|
| 链接 | https://arxiv.org/abs/2609.00006 |
| 类型 | arXiv 论文（cs.SE，v1），83 页、7 张图、18 张表。页面注明这是 2026 年 4 月一份研究的第二版，大幅扩充：系统从 8 个增加到 11 个，外加一个元外壳作对照 |
| 作者 | Paul Barbaste（Inclusive Brains、Wavestone AI Lab）、Tristan Darrigol、Germain Vu、Tom Wiltberger（Wavestone AI Lab） |
| 发布日期 | 2026-07-15（arXiv 页面显示 Submitted on 15 Jul 2026） |
| 研究对象 | Claude Code、Codex CLI、Gemini CLI、Mistral Vibe、OpenHands、Aider、Mini-SWE-Agent、Hermes、Pi、OpenCode、OpenClaw；对照：Omnigent（Databricks） |
| 分析依据 | 2026-10-19 核对了 arXiv 页面的标题、作者和日期，与任务给出的一致。全文 PDF 很长，本文只精读了摘要、第 1 节、第 2.3 节的七个子系统表、13 条观察、第 15.6 节“效度威胁”和第 16 节的 18 条建议；各系统的逐章拆解没有逐页读。引语逐字核对。**一个疑点**：arXiv 编号的前四位通常是提交的年月，2609 对应 2026 年 9 月，和页面上 7 月 15 日的提交日期对不上。本站照录，请以 arXiv 页面为准。“我觉得”开头的段落是本站评论。 |

## 2. 这篇在回答什么

站内已经有好几篇讲单个外壳的：[[09]] 拆 Codex，[[45]] 讲 Anthropic 的 Managed Agents，[[44]] 讲 Aider 的 Architect/Editor。但它们都是厂商讲自家的东西。这篇论文换了一个角度：把 11 个系统的源码并排放在一起读，看它们在同一件事上各自怎么选。

论文开篇给了定义：

<Trans zh="代理就是模型加外壳：外壳是一个运行时，它通过循环、工具、上下文管理、安全控制、编排和扩展接口，把 LLM 接到真实世界。">“An agent is a model plus a harness: the runtime that couples an LLM to the world through a loop, tools, context management, safety controls, orchestration, and extension surfaces.”</Trans>

作者也说清楚了这篇论文不做什么：

<Trans zh="它不做基准测试，也不排名；它描述并比较这些系统是怎么搭起来的。">“It does not benchmark or rank; it describes and compares how the systems are built.”</Trans>

因为 4 月那一版已经研究过其中 8 个系统，这次他们把这 8 个重新钉到新版本，于是论文里多了一组“同一批外壳，隔一个季度再读一次源码”的纵向对比。

## 3. 读到了什么

### 3.1 七个子系统

论文说，从 100 行的研究基线到上百万行的生产 CLI，每个系统都要在同样七个子系统上表态，哪怕表态是“故意不做”。下表根据原文 Table 1 整理，只保留最小和最大实现的例子：

| 子系统 | 干什么 | 最小实现 | 最大实现 |
|---|---|---|---|
| 代理循环 | 在推理和执行动作之间来回；管停止条件和失败恢复 | Mini-SWE-Agent：一个线性 while 循环加一个 bash 工具 | OpenHands：基于持久事件日志的事件溯源会话，可并行执行一批动作 |
| 模型接入 | 讲各家模型的协议；拼提示词；管缓存、思考、路由 | Mini-SWE-Agent：一次 LiteLLM 调用、一个 Jinja 模板 | Hermes：五种自有传输、29 个模型商配置；Codex：服务端下发的模型目录 |
| 工具与动作 | 定义并执行代理能做什么，最重要的是改文件 | Mini-SWE-Agent：只有 bash | Claude Code：43 个带类型的工具，支持延迟加载；Codex：工具调用作为 V8 执行的代码 |
| 记忆与上下文 | 分配上下文窗口；跨轮次、跨会话保存知识 | Mini-SWE-Agent：不设上限的线性历史 | Codex：代理自己维护的跨会话记忆流水线；Gemini CLI：基于图的上下文提炼 |
| 安全与权限 | 决定什么直接跑、什么要问、什么禁止；隔离执行 | Mini-SWE-Agent：花费和步数上限 | Codex：策略规则 + LLM 审批 + 三平台 OS 沙箱 |
| 编排 | 派生和协调子代理；连接其他代理 | Aider：没有（设计上就是单代理） | Claude Code：递归组合；Omnigent：跨厂商协调 |
| 扩展 | 让用户和生态加能力：配置、hooks、skills、插件、MCP | Mini-SWE-Agent：Python 协议的结构类型 | Pi：一切皆扩展的运行时；Codex：通过市场分发的插件 |

七个之外还有两个横切面：人和程序驱动外壳的界面层（TUI、CLI 参数、IDE 协议、HTTP 服务、SDK），以及几个子系统共用的会话底座（对话记录、持久化、恢复和分叉）。

### 3.2 循环写多复杂，不决定成绩

第 1 条观察是：11 个系统的代码量相差三个数量级，干的却是差不多的事；而且

<Trans zh="循环的复杂程度并不能预测基准测试的表现。">“loop sophistication does not predict benchmark performance.”</Trans>

Mini-SWE-Agent 用最简单的线性循环，自报的成绩和 OpenHands 的事件溯源会话引擎在同一区间。那大系统的代码都去哪了？

<Trans zh="生产系统的大部分代码处理的是和完成任务无关的问题：安全、用户体验、可扩展性">“Most of the mass in the production systems addresses concerns orthogonal to task completion: safety, user experience, extensibility”</Trans>

原文举例：OpenCode 非测试代码里大约五分之三是 TUI、网页、桌面和 SDK 客户端，不是外壳本身。

论文自己提醒了这里的口径问题：这些基准数字都是各系统自报的，用的模型和日期不同。作者的意思是“地板很低”，不是说两者一样好。

我觉得这条最值得记住。它解释了为什么站内 [[24]] 的 Ralph 循环这种很简单的做法也能跑出东西：完成任务主要靠模型，外壳的大部分代码是为了让人敢用、好用、能接进别的系统。

### 3.3 两个“缺席”

第 9 条观察是论文最有冲击力的结论。论文说，在大约四百万行 Python、TypeScript 和 Rust 代码里，没有一个系统的代理运行时用了通用代理框架（LangChain、LangGraph、AutoGen、CrewAI 等十几个都查过；Gemini CLI 连 Google 自家的两个都没用），而且

<Trans zh="每个循环都是用宿主语言的异步原语手写的">“every loop is hand-rolled in the host language’s async primitives”</Trans>

也没有一个系统用向量嵌入去检索代码。大家靠的是 ripgrep、tree-sitter、glob 和自动发现的 Markdown 上下文文件。对应的建议（第 8 条）说得很直接：

<Trans zh="不要在代码上做 RAG。改用 ripgrep、glob、tree-sitter 符号提取和文件系统遍历。">“Do not build RAG over code. Use ripgrep, glob, tree-sitter symbol extraction, and file-system traversal instead.”</Trans>

给出的理由是：代码有丰富的确定性结构（路径、语言服务器、语法树），语义相似度复制不了；代码每分钟都在变，嵌入会过期。

作者在“效度威胁”一节也承认，框架缺席这个结论是保守的：他们查了依赖清单，在三种语言里搜了 import，三个月里查了两次，但没有追踪内部 fork、动态加载的插件或转译后的发行版。原话是：

<Trans zh="我们会感到意外，但不会震惊。">“We would be surprised, but not shocked.”</Trans>

### 3.4 编辑、记忆、沙箱、扩展、多代理

挑几条和日常使用最相关的观察：

- **编辑策略（第 4 条）**：论文认为改文件的方式是决定改代码准确率最重要的因素之一。Aider 按模型选编辑格式；OpenCode 按模型换整套工具，GPT 系模型拿到 Codex 风格的 patch 格式、没有字符串替换工具。建议（第 5 条）是：前沿模型用精确的唯一子串替换，开源或较弱的模型用模糊匹配级联；不管哪种，都在工具层处理代码漂移，不要靠行号。
- **记忆（第 5 条）**：11 个系统里有 7 个用阈值触发的 LLM 摘要来压缩上下文，做法已经趋同。现在拉开差距的是记忆由谁写：有代理自己维护的（Codex），有人来审的（Gemini CLI 把提取出的记忆放进一个待审收件箱），有模型直接写但有上限的（Hermes）等几种。
- **沙箱（第 6 条）**：OS 级沙箱是代码最贵的能力之一，而且是一种选择，不是规模大了自然就有。Hermes 是最大的系统之一，却没有任何 OS 级隔离，把安全预算花在提示注入扫描这类内容威胁上。
- **扩展（第 8 条）**：实现 SKILL.md 的有 9 个，实现 MCP 的有 8 个，Skills 第一次领先。9 个实现 Skills 的系统里有 8 个按需延迟加载。还出现了供应链：托管的注册表、信任分级、隔离区。
- **多代理（第 7 条）**：协调者派生工人的形态在四个模型厂商自家的系统里，以及 OpenHands、Hermes、OpenCode、OpenClaw 里独立出现。但对应的建议（第 12 条）很克制：先单代理，

<Trans zh="除非你能指出一个具体的广度优先……阶段，在那里并行的上下文隔离明显胜过串行搜索。">“until you can point to a concrete breadth-first … where parallel context isolation clearly beats serial search.”</Trans>

论文引用的理由是：多代理系统用掉的 token 大约是聊天基线的 15 倍，而大多数编码任务里真正能并行的部分比研究任务少。

### 3.5 一个季度里：趋同变成模仿，策略从提示词搬进配置

因为 8 个系统在 4 月和 7 月各读了一次源码，论文能看到它们怎么变。摘要里说，趋同变成了模仿：Codex 原样采用了 Claude Code 的 hook 词汇，还做了一个导入它会话和设置的工具；OpenHands 能读 Claude Code 的插件格式。同时，行为规则从提示词里的文字迁到了配置里。

第 3 条观察给了一个具体例子：4 月时，“不要自主提交代码”这条规则在所有系统里都有；到 7 月，Mistral Vibe 把它反了过来，改成要求提交并加上共同作者标记，Codex 最新一代模型的提示词干脆删掉了这条规则和“别镀金”（不要多做没要求的东西）的指令。论文的解读是

<Trans zh="随着模型把这些规范内化，行为策略在变薄">“behavioral policy thinning as models internalize the norms”</Trans>

论文的总论点是：2026 年上半年，编码外壳完成了从“工具”到“平台”的转向。外壳变成了可导入的 SDK，框架厂商反过来发布外壳；出现了插件市场、迁移工具和企业治理层；还出现了在上面调度多个厂商外壳的元外壳。

### 3.6 18 条建议里，最该先读的几条

第 16 节把观察浓缩成 18 条建议，每条都标了依据和实现它的系统。下面挑出“刚开始自己搭一个”时最相关的：

1. **先写一个线性 while 循环**（第 1 条）。等到你需要三个以上互相独立的轮次策略（轮数上限、花费上限、自动压缩等），再改成中间件流水线。
2. **先只给一个 bash 工具**（第 3 条）：

<Trans zh="先只给一个 bash 工具。只有在观察到具体的失败模式时，才加更多工具。">“Begin with just a bash tool. Add more tools only in response to observed failure modes.”</Trans>

3. **工具超过约 15 个，上延迟加载**（第 4 条）。原文说 Claude Code 的做法让初始提示词缩小约 40%；低于约 15 个时，这层间接不值得。
4. **自动发现分层的 Markdown 上下文文件，也读邻居的文件名**（第 6 条）：比如同时读 AGENTS.md、CLAUDE.md。
5. **压缩：在离窗口上限一个固定余量处触发，保留最近一段原文，摘要增量合并而不是每次重写**（第 7 条）。
6. **安全规则写成数据或策略文件，不写成命令式代码；有 YOLO 模式就在下面留一条底线**（第 11 条）。
7. **Skills 管能力模板，MCP 管外部集成**（第 14 条），装第三方 skill 要当软件包对待。
8. **别给每个 SaaS API 一对一包一个工具**（第 17 条），合并成更少的工具。
9. **别过度设计卡死检测，但要上几个便宜的上限**（第 18 条），比如连续格式错误次数和总耗时。

论文最后附了一个约 90 行的 Python 最小外壳脚手架，说它直接实现了 18 条里的 10 条。作者明确写了这是猜测：他们推测这个脚手架配上前沿模型能追平 Mini-SWE-Agent 的 SWE-Bench 成绩，但没有证明。

## 4. 局限

论文第 15.6 节自己列了效度威胁，本站转述并补充两点：

- **读源码，不跑**：

<Trans zh="分析依据的是读源码，不是运行时测量。">“The analysis rests on source-code reading, not runtime measurement.”</Trans>

  文中的基准数字都来自各系统自己的文档。
- **评分有主观判断**：架构比较背后的打分依赖作者的判断。
- **Claude Code 最难复现**：

<Trans zh="Claude Code 的分析在可复现性上是最弱的一环。">“The Claude Code analysis is the weakest link on reproducibility.”</Trans>

  原文说它依据的是 2026 年 3 月公开流传的一份源码快照，不是官方发布版；其他十个系统都能从公开的 Git 历史重建。
- **与 Anthropic 指南的对应不代表因果**：第 10 条观察说厂商系统的架构和 Anthropic 的 Effective Agents 系列很吻合，作者承认要访谈各厂商工程师才能确认原因。
- **没有统一任务集上的对比**：11 个系统是分别分析的，没有放在同一组任务上跑。
- **本站补充**：系统清单和观察都钉在 2026 年 7 月的版本上，这些产品每月都在变，具体数字（几个系统支持什么）会很快过期；arXiv 编号和提交日期对不上的疑点见基本信息。本文没有逐章读完 83 页。

## 5. 结论

这篇论文给“外壳”画了一张通用的解剖图：七个子系统，每个都有一个最小做法和一个最大做法。它最有用的结论都指向同一个方向：外壳的大部分代码不是为了让任务完成，而是为了安全、体验、扩展和接入；完成任务主要靠模型。所以自己搭的时候，从一个循环、一个 bash 工具开始，遇到具体问题再加东西。

我觉得这篇放在“看原理”阶段，是站内第一份横跨多家产品的源码对比，可以当成其他几篇的索引来读：读 [[09]] 时对照“工具与动作”和“安全与权限”两行，读 [[45§3.6]] 时对照元外壳，读 [[36]] 时对照“扩展”那一行和第 4 条建议。它的数字会过期，但七个子系统这张表不太会。

**你可以这样试**

1. 拿你最常用的代理，对照 3.1 的表格，逐行写下它在每个子系统上的做法，看看哪一行你其实不清楚。
2. 如果你正在给团队搭内部代理，先按 3.6 的第 1、2 条写一个最小版本，记录它在哪些任务上失败，再决定加什么。
3. 数一下你的代理现在加载了多少个工具；超过 15 个的话，试试延迟加载或合并工具。

**读完自测**

- 论文说的两个“缺席”是什么？作者给了哪些理由，又承认了哪些检查盲区？
- 为什么“循环复杂度不预测成绩”这条观察要和“基准数字是自报的”一起读？
- 论文建议什么时候才从单代理改成多代理？
