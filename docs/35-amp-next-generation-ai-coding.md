# 代理只有三根杠杆：Amp 的几个“反着来”的设计决定

<div class="meta-tags"><span class="tool-tag tool-amp">Amp</span></div>

<div class="hook">

**一句话看懂**：Amp 的 Beyang Liu 不说自家代理“更好”，只讲他们哪些地方故意和别人反着来：不大量接 MCP，自己打磨工具；子代理按专长做（搜索、推理、查库、写 codemod）；不给模型选择器，只给“聪明”和“快速”两个顶层代理；编辑器当“阅读器”用。底层只有一个判断：代理就是“模型 + 工具 + 循环”，构建者能调的只有这三根杠杆。

</div>

## 读完你能带走的 6 条收获

1. **代理 = 一个循环 + 工具调用 + 模型。** 效果不好时，先问是哪根杠杆的问题：模型、工具描述，还是迭代方式（见 3.1）。
2. **工具少而精。** MCP 作者不知道你的代理要做什么；不相关的工具会造成“上下文混乱”（见 3.2）。
3. **读太多会耗尽上下文，读太少会陷入“死循环”。** 把搜索交给子代理，是两者之间的折中（见 3.3）。
4. **子代理按专长设计，而不是换个提示词就算一个角色。** 快模型搜代码、推理模型解难题，各配各的工具（见 3.4）。
5. **少给选择，多做优化。** 支持 N 个模型就只能每个都轻度定制；按“异步派活”和“紧盯小改”两种用法各配一个代理（见 3.5）。
6. **瓶颈已经转到审查。** 多开代理前先想想审得过来吗；“先读哪个文件”本身就值得工具帮忙（见 3.6）。

::: tip 小白先懂这几个词
- [Amp](/glossary#amp)：Sourcegraph 团队做的编码代理，演讲时有终端和编辑器两种界面。
- [Subagent（子代理）](/glossary#subagent)：主代理派出去的子任务代理，有自己独立的上下文窗口，做完只把结果交回来。
- [Doom Loop（死循环）](/glossary#doom-loop)：代理一开始没收集到足够的上下文，于是不断重复同一个失败的尝试。
- [MCP](/glossary#mcp)：一种让代理接入外部工具和数据的开放协议。
- [Codemod](/glossary#codemod)：批量改写代码的自动化脚本或工具。
- [Context Window（上下文窗口）](/glossary#context-window)：模型一次能“看到”的全部内容的上限。
:::

## 1. 基本信息

<YouTube id="gvIAkmZUEZY" title="Amp Code: Next Generation AI Coding – Beyang Liu, Amp Code" />

| 项目 | 内容 |
|---|---|
| 讲者 / 频道 | Beyang Liu（Sourcegraph 联合创始人兼 CTO，幻灯片署名）／ **AI Engineer** |
| 发布日期 | 2025-12-22（AIE Code 2025 演讲；讲者提到 Gemini 3 “两天前”发布） |
| 时长 | 18:30 |
| 使用工具 | Amp（终端 UI、编辑器扩展、子代理） |
| 分析依据 | AI Engineer 频道发布的 AIE Code 2025 演讲录像。引语依据 ai.engineer 网站提供的带时间戳字幕（只引用讲者原话，不引用页面上的编辑摘要）；2026-10-14 另取 YouTube 英文自动字幕通读全片，补充了终端界面、广告和共享对话等内容。截图为视频真实画面。“我觉得”开头的段落是本站评论。演讲后 Amp 的产品有较大变化，第 4 节据 Amp 官方新闻（2026-02-19、2026-03-30）补充。 |

## 2. 这篇在回答什么

会场里有 20 多家编码代理，凭什么用你这家？

讲者开场就说，他不打算说服你 Amp 更好，那要你自己试；他只想说明 Amp 在用一种“很不一样、很有主见、甚至有点怪”的方式想问题。他把 Amp 定位成一个 <Trans zh="有主见的前沿代理">“opinionated frontier agent”</Trans>，团队想做“活在一年后的代理研究室”。

这场 18 分钟的演讲（AIE Code 2025）按“我们做了哪些反常规的决定”展开。我把它归成四个问题：

1. 构建代理时，到底能调什么？（3.1）
2. 工具和上下文怎么取舍？（3.2、3.3）
3. 子代理和模型怎么组织？（3.4、3.5）
4. 代理写得越来越多，人卡在哪里？（3.6、3.7）

```mermaid
flowchart LR
    L["代理 = 模型 + 工具 + 循环"] --> T["工具：自研、少而精<br/>不大量接 MCP"]
    L --> C["上下文：子代理隔离<br/>避免耗尽和死循环"]
    L --> M["模型：两个顶层代理<br/>不做模型选择器"]
    T & C & M --> R["人的瓶颈：审查<br/>readitor、共享对话"]
```

## 3. 怎么做

### 3.1 代理就是一个循环：你只有三根杠杆

<figure class="shot"><img src="/images/35/0245.webp" alt="4:05 幻灯片 Hello, Agent：一段 runAgent 函数代码，while 循环里调用模型、执行工具调用，再把结果交回模型；链接 ampcode.com/how-to-build-an-agent。" loading="lazy"><figcaption>📷 视频截图 · <a href="https://www.youtube.com/watch?v=gvIAkmZUEZY&t=245s" target="_blank" rel="noopener">4:05</a> · “Hello, Agent”：代理的核心就是一个调用模型和工具的 while 循环。</figcaption></figure>

::: tr 代理的核心是什么？……它就是一个 for 循环，中间是工具调用和一个模型。
> "What is an agent at its core? Well, all an agent is, as I'm sure most of you know, uh, is it's a for loop, uh, with tool calls and a model, uh, in the middle."
:::

这样看的好处是，你能清楚知道作为代理的构建者有哪些杠杆：<Trans zh="你可以换模型，可以改工具描述，可以改模型和这些工具迭代的方式，这些实际上就是你全部的杠杆。">“You can change the choice of model, you can change the tool descriptions, and you can change, uh, how the model iterates with those tools, and those are effectively your levers.”</Trans>

杠杆看起来很少，但讲者的类比是：编程语言说到底也只是 if 和 for 的语法糖，组合起来能产生非常多样的行为。

我觉得这个框架最大的用处是排错：代理表现不好时，先问是模型不行、工具描述不清，还是循环方式（什么时候停、什么时候派子代理）有问题，而不是一上来就换模型。

### 3.2 工具：自己打磨，而不是一股脑接 MCP

Amp 早期的一个决定是：大部分精力放在自己的核心工具集上，而不是大量集成 MCP 服务器。讲者给了两个理由：

1. **代理的关键是闭合反馈回路**，需要专门为此打磨的工具：<Trans zh="MCP 服务器的作者不知道你的代理想做什么，所以他们不会针对你要完成的事去调整工具描述。">“The creator of the MCP server doesn't know what your agent is trying to do, and so they're not gonna tune the tool descriptions to what you're trying to accomplish.”</Trans>
2. **上下文混乱**：上下文里的工具越多，代理要选的东西越多；如果工具和当前任务无关，它就会被搞糊涂。

讲者也承认，这个观点在 2025 年 4 月他们做决定时更有争议，到演讲时已经没那么“反常”了。我觉得它和 Codex 延后加载工具（[[09§3.2]]）、Anthropic 用代码执行代替直接调用 MCP 工具（[[36]]）是同一个方向：工具定义本身就是上下文成本。

### 3.3 工具调用也吃上下文：死循环与子代理

<figure class="shot"><img src="/images/35/0415.webp" alt="6:55 幻灯片 Tools Eat Up Context. How Do We Extend It?：三条上下文用量示意条，分别标注 Out of context、Not enough context → Doom Loop、Subagent。" loading="lazy"><figcaption>📷 视频截图 · <a href="https://www.youtube.com/watch?v=gvIAkmZUEZY&t=415s" target="_blank" rel="noopener">6:55</a> · 工具调用吃掉上下文：读太多会耗尽上下文，读太少会陷入死循环，子代理是第三条路。</figcaption></figure>

讲者描述了每个做代理的人都会遇到的两难：

- 代理先 grep、读很多文件收集上下文，等到真正改代码时上下文已经快用完，只能提前停下；
- 如果提示它少读一点，又会进入另一种失败：

::: tr 这就导致另一种失败模式，我称之为“死循环”模式：它一开始没有收集到足够的上下文，于是搞不清自己要做什么，只能一遍又一遍地重试同样的事情。
> "But then this leads to another failure mode, which I call the doom loop mode, which is it doesn't gather enough context in the beginning, and so it ends up not figuring out what it needs to do and just tr- retries the same thing over and over again."
:::

解决办法是子代理：<Trans zh="子代理相当于普通编程语言里的子程序调用。它能把一个子任务用掉的上下文分离到另一个独立的上下文窗口里。">“subagents are the analog to subroutine calls in regular programming languages. It's how you can factor out the context window used for a subtask into a separate context window”</Trans>，做完只把相关结果交回主代理。这和 [[04§3.3]] 里“子代理用来控制上下文，而不是扮演角色”是同一个观点。

### 3.4 按专长分工的子代理

<figure class="shot"><img src="/images/35/0520.webp" alt="8:40 幻灯片列出四个子代理：Finder 负责代码库搜索，工具为 Read、Grep、Glob；Oracle 负责推理、疑难 bug 和仔细审查，模型从 o3 换到 GPT-5.1；Librarian 负责查依赖库，使用远程仓库搜索 API；Kraken 负责重构，使用 fastmod 等工具。" loading="lazy"><figcaption>📷 视频截图 · <a href="https://www.youtube.com/watch?v=gvIAkmZUEZY&t=520s" target="_blank" rel="noopener">8:40</a> · Amp 的四个子代理及各自的模型和工具（演讲时的配置）。</figcaption></figure>

Amp 没有做“改改系统提示词就是一个新角色”的通用子代理，而是做了几个功能很明确的：

| 子代理 | 用途 | 讲者的说明（据字幕整理） |
|---|---|---|
| `Finder` | 搜索代码库 | 用较小、较快的模型驱动一组受限的工具（读文件、grep、glob），专门快速找到相关上下文 |
| `Oracle` | 深度推理 | Amp 的推理能力放在这里，而不是让用户切换模型；主代理遇到难题时调用它 |
| `Librarian` | 查外部库 | 获取代码库之外的上下文，比如你依赖的库和框架 |
| `Kraken`（实验） | 大规模重构 | 不逐个改文件，而是写 codemod 来批量改 |

关于 `Oracle`，讲者分享了个人体验：遇到不想花一两个小时钻进去的问题，就让主代理去调用它，有时要想好几分钟，<Trans zh="但我觉得大概五次里有四次，它都能神奇地找到根本原因。">“but I think like four, uh, out of five times, it just magically finds, uh, uh, the, the underlying issue.”</Trans>（这是讲者的个人估计，不是测量数据。）

把推理模型放在子代理里的好处是：主代理保持响应快、能灵活使用各种工具，只有在需要调试难题或做细致规划时才“下沉”到推理模型。

### 3.5 不做模型选择器：“聪明”和“快速”两个顶层代理

::: tr 我理解开发者喜欢选择，或者至少喜欢有选择的可能，但选择的问题在于还有“选择的悖论”。
> "I get that, you know, developers like choice, or at least the, the possibility of choice, but the problem with choice is that there's also a paradox of choice."
:::

讲者的理由是架构层面的：如果一个 harness 要支持 N 个模型，每个模型都只能轻度定制，就永远无法针对某个模型做到最好。所以 Amp 只有两个顶层代理：

- **smart**：能调用所有子代理，慢一些，可以交给它更复杂的指令，适合“派出去、做完再审”的异步模式；
- **rush**：用于需要人紧盯、快速做小改动的场景。

演讲时 smart 代理的模型只换过一次，就是两天前换成了 Gemini 3。

```mermaid
flowchart TB
    U["开发者"] --> S["smart 顶层代理<br/>复杂任务，异步审查"]
    U --> R["rush 顶层代理<br/>快速小改，人紧盯"]
    S --> F["Finder<br/>搜代码库"]
    S --> O["Oracle<br/>深度推理"]
    S --> L["Librarian<br/>查外部库"]
    S --> K["Kraken<br/>写 codemod"]
    F & O & L & K -.->|"只交回相关结果"| S
```

### 3.6 瓶颈在审查：“readitor”与共享对话

讲者说，他现在大部分时间其实在做代码审查，这限制了他能同时运行的代理数量。所以 Amp 的编辑器更像一个“阅读器”（他称为 readitor）：

<figure class="shot"><img src="/images/35/0735.webp" alt="12:15 幻灯片 A Read-itor：Amp 编辑器的 AMP: REVIEW 面板，左侧是改动摘要和 14 个改动文件列表，下方 Code Tour 写着 Read files in this order 并按顺序解释每个文件；中间是 diff 和引用查找；右侧是代理对话面板。" loading="lazy"><figcaption>📷 视频截图 · <a href="https://www.youtube.com/watch?v=gvIAkmZUEZY&t=735s" target="_blank" rel="noopener">12:15</a> · 为审查代理产出设计的 diff 视图（演讲时的编辑器版本）。</figcaption></figure>

这个审查界面可以选任意提交范围、逐文件看 diff、直接编辑、跳转到定义；底部有“改动导览”功能，告诉你先读哪些文件，因为<Trans zh="审查一个大改动时，一半的难度在于搞清楚从哪里开始读。">“half the battle when reviewing a large change is figuring out where to start.”</Trans>

另一个早期功能是**和团队共享对话（thread）**：同事可以看到彼此用代理改了多少代码，点进具体对话看别人怎么做；可以分享好用的提示技巧，也可以把卡住的对话发给别人，一起想怎么把代理接到更好的反馈回路上。讲者的理由是，人类开发者还会存在很久，但大家得一起重新学这门手艺。

我觉得“共享对话”比任何提示词教程都有用：看同事一次完整的成功或失败记录，学到的东西最具体。

### 3.7 终端界面和成本：两个容易被忽略的决定

**终端界面从零写。** Amp 的终端 UI 是自己从头写的框架，作者之一是开源终端 Ghostty 的核心贡献者。设计原则是：给用户的信息量要刚好能看懂代理在做什么，而不是把模型生成的每个 token 都倒出来；流式显示 diff，显示它用了哪些命令。CLI 还能连到你的编辑器（Emacs、Neovim、JetBrains）取诊断信息。在功能少的终端里（比如 macOS 自带终端）会优雅降级。

**用广告补贴推理成本。** 讲者观察到，大学里真正用过编码代理的学生比他预想的少得多，主要是因为贵。于是他们在终端和编辑器里放了一个小型广告网络，推广其他开发者工具，用广告收入补贴 rush 代理的推理费用。讲者自己也说，一开始团队觉得“这不可能行得通”。（这个实验后来结束了，见第 4 节。）

演讲最后几分钟介绍了一些用户（Mitchell Hashimoto、Hamel Husain，讲者说明他们与公司无利益关系）和一个开发者社区，属于宣传内容，这里略过。

## 4. 结果与局限

这是产品介绍型演讲，没有给出量化的效果数据。演讲之后 Amp 的产品发生了几处重要变化（据 Amp 官方新闻，2026-10-09 抓取）：

- **2026-02-19**，Amp 发文《The Coding Agent Is Dead》，宣布停用 VS Code 和 Cursor 编辑器扩展（3 月 5 日停用），转向 CLI。文中写道：<Trans zh="对于最新的模型，代理（你包在模型外面的提示词和工具）已经不再是限制因素。">“With the newest models, the agent — the prompts and tools you wrap around a model — is no longer the limiting factor.”</Trans> 也就是说，演讲第 3.6 节展示的编辑器审查界面已经不存在。
- **2026-03-30**，Amp 宣布免费版不再显示广告（演讲中提到的“在终端里放广告来补贴推理成本”的实验已经结束）。

::: warning 局限与注意
- 这是 Amp 团队介绍自家产品的演讲，“`Oracle` 五次里有四次能找到问题”是讲者个人感受。
- 截图和表格里的子代理模型配置是演讲时（2025 年 11 月）的状态，之后很可能已经改变。
- 讲者对 MCP 的看法是“核心能力靠自研工具”，不是说 MCP 没用；他讨论的是投入重点放在哪里。
- Amp 后来自己也承认，随着模型变强，harness 设计的影响在减小。阅读时可以把本文当作“2025 年底代理设计的一种思路”，而不是最终答案。
:::

## 5. 结论

这场演讲的价值不在 Amp 这个产品，而在它把“代理设计”拆得很清楚：**能调的只有模型、工具、循环三根杠杆，每个设计决定都是在这三者之间取舍。** 自研工具是为了少占上下文、贴合反馈回路；子代理是为了隔离上下文、让快模型和推理模型各干各的；不做模型选择器是为了把一个模型调到最好。

而演讲后 Amp 自己的转向（停用编辑器扩展、承认 harness 不再是瓶颈）也提醒我们：这些决定是 2025 年底的最优解，模型变强后要重新检验。

我觉得最值得马上用的是两条：搜索交给只读子代理；关掉和当前任务无关的工具。

**可借鉴之处：**


1. **把代理看成“模型 + 工具 + 循环”**：遇到效果问题时，先想是哪根杠杆出了问题。
2. **工具少而精**：不相关的工具会让代理困惑；自己写的工具描述要针对你的任务。
3. **注意“读太多”和“读太少”两种失败**：前者耗尽上下文，后者陷入死循环；把搜索交给子代理是折中。
4. **子代理按专长设计**：搜索用快模型 + 只读工具，难题交给推理模型，外部库查询单独一个，批量改动用 codemod。
5. **审查是瓶颈**：多开代理之前，先想想你审得过来吗；给自己找一个“先读哪个文件”的顺序。
6. **把好的对话分享给团队**：别人怎么用代理，是学习这门新手艺最直接的材料。

### 你可以这样试

- [ ] 在你常用的代理里定义一个“只读搜索”子代理（只给读文件和搜索工具），让主代理遇到“先找找相关代码”时调用它，比较主对话的上下文用量。
- [ ] 检查你接入的 MCP 服务器，关掉和当前项目无关的，看代理选工具时是否更准确。
- [ ] 下次代理反复重试同一件事时，判断它是不是“上下文不够”，让它先做一次完整的搜索再动手。
- [ ] 把一次用代理解决难题的完整对话分享给同事，请他们指出哪里可以更好。

::: details 读完自测（点开看答案）
1. **讲者说构建代理只有哪三根杠杆？** 模型的选择、工具描述、模型和工具迭代的方式。
2. **什么是“死循环”模式？** 代理一开始没收集到足够的上下文，搞不清要做什么，只能反复重试同样的事情。
3. **为什么 Amp 把推理模型做成子代理（`Oracle`），而不是模型选择器？** 主代理可以保持快速和灵活，只有遇到难题时才调用推理模型；而且不让用户在 N 个模型间选，能针对少数模型深度优化。
4. **演讲后 Amp 有哪两个重要变化？** 停用了编辑器扩展、转向 CLI（2026-02/03）；免费版取消了广告（2026-03-30）。
:::
