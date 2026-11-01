# 不敢关掉的对话：把决策锚在一份功能文档里

<div class="meta-tags"><span class="tool-tag tool-general">通用（不限工具）</span></div>

<div class="hook">

**一句话看懂**：多日功能做到第三天，你不敢关掉和 AI 的对话，因为所有决策只存在聊天记录里。Rahul Garg 的办法是把“决定了什么、为什么、否决了什么、还有什么没定、做到哪了”写进一份不到 50 行的功能文档，每次开新会话先加载它。检验标准很简单：关掉会话重开，30 秒能不能对齐。

</div>

## 读完你能带走的 6 条收获

1. **用“关掉重开会不会焦虑”判断上下文放错了地方**：舍不得关会话，说明决策只活在对话里（见 3.1、3.5）。
2. **最先丢的是“为什么”，不是“是什么”**：AI 记得用 PostgreSQL，却忘了为什么不用 MongoDB，于是给出“技术上合规、架构上跑偏”的建议；自动压缩也最容易丢掉理由（见 3.1）。
3. **上下文分两层**：项目级的 priming 文档讲“这个项目怎么运作”，功能级的 feature 文档讲“这件事走到哪、怎么走到的”，开新会话两份一起加载（见 3.2）。
4. **代码只记录结果，记不下被否决的方案**：所以 AI 能读代码也不能替代功能文档；“Rejected Alternative”这一栏最有价值（见 3.2）。
5. **文档只写四块，不到 50 行**：决策表（决策 / 理由 / 否决项）、约束、开放问题、进度清单；在自然停顿点更新，可以让 AI 起草、人来改（见 3.3）。
6. **按规模校准**：一次性问题不用写；单会话轻量记几条；多日功能和多人协作必须写，功能上线后重要决策再“毕业”成正式 ADR（见 3.2、3.4）。

::: tip 小白先懂这几个词
- [Context Anchoring（上下文锚定）](/glossary#context-anchoring)：把功能级的决策上下文外置到一份活文档里，每次会话都加载它。
- [上下文窗口](/glossary#context-window)：模型一次能“看见”的 token 上限。
- [Lost in the Middle](/glossary#lost-in-the-middle)：长上下文中间位置的信息更容易被模型忽略的现象。
- [Compaction（上下文压缩）](/glossary#compaction)：上下文快满时工具自动把早期对话压缩成摘要。
- [ADR（架构决策记录）](/glossary#adr)：记录一个架构决策的背景、选择和取舍的短文档。
- [Design-First（五级设计对齐）](/glossary#design-first)：同作者的前一篇方法，先逐级对齐设计再写代码。
:::

## 1. 基本信息

<SourceCard type="文章" title="Context Anchoring" author="Rahul Garg" date="2026-03-17" url="https://martinfowler.com/articles/reduce-friction-ai/context-anchoring.html" />

| 项目 | 内容 |
|---|---|
| 链接 | https://martinfowler.com/articles/reduce-friction-ai/context-anchoring.html |
| 类型 | 文章（martinfowler.com，“Patterns for Reducing Friction in AI-Assisted Development”系列第四篇） |
| 作者 | Rahul Garg（Thoughtworks Principal Engineer） |
| 发布日期 | 2026-03-17（页面“Significant Revisions”只有这一条） |
| 使用工具 | 不限工具；文中提到 Claude 的 project memory、Cursor rules、Copilot workspace indexing 作为对照 |
| 分析依据 | 原文全文（约 2,600 词），2026-11-01 抓取。文中唯一的案例是作者自己的通知服务，“45 分钟”“30 秒”是作者叙述，不是测量。“我觉得”开头的段落是本站评论。 |

## 2. 这篇在回答什么

设想你在和 AI 一起做一个要花三四天的功能。第一天你们讨论了重试要不要包一层抽象，最后决定直接用 BullMQ；第二天定下了只做 email；第三天，会话已经很长，AI 开始建议你加一个 `RetryQueue` 包装类，正是第一天否决掉的那个。

你想开个新会话，但又不敢：前面的讨论全在这个窗口里，关掉就没了。

Garg 把这叫做恶性循环：

::: tr 开发者把对话拖得远超应有的长度，不是因为长会话高效，而是因为关掉会话就意味着失去一切。
> "developers keep conversations running far longer than they should, not because long sessions are productive, but because closing the session means losing everything."
:::

这篇文章回答四个问题：

1. 为什么对话里的决策会褪色，而且先褪色的是理由？
2. 决策应该存到哪里？和项目规则文件有什么不同？
3. 这份文档写什么、什么时候更新？
4. 什么规模的工作才值得这么做？

```mermaid
flowchart LR
  A["设计对话<br/>做出决策"] --> B["写进 feature 文档<br/>决策 理由 否决项"]
  B --> C["约束 开放问题 进度"]
  C --> D["关掉会话"]
  D --> E["新会话加载<br/>priming 文档 + feature 文档"]
  E --> F["30 秒对齐<br/>继续做"]
  F --> A
```

## 3. 怎么做

### 3.1 先认清问题：决策会褪色，理由先没

**是什么**：作者用一个测试来判断你是否已经陷进去：

::: tr 现在就关掉这个对话、开一个新的，我会不会焦虑？
> "could I close this conversation right now and start a new one without anxiety?"
:::

如果这个问题让你不舒服，说明你的上下文被困在一个本来就不是为保存它而设计的媒介里。

**为什么会这样**：作者给了三层原因。

- **窗口填得比想象快**：即使窗口有几十万到上百万 token，代码片段、设计讨论、决策理由、文件内容很快就会把它填满。
- **中间的内容被冷落**：他引用 2023 年 Liu 等人的“Lost in the Middle”研究，模型对长上下文中间位置的信息表现明显更差，最近的 token 和系统指令拿走了不成比例的注意力。
- **自动压缩是黑盒**：有些工具在窗口快满时自动压缩或摘要早期对话，但你看不到哪些被保留、哪些被摘要、哪些被悄悄丢掉。

第三层原因引出了全文最重要的观察：

::: tr 根据我的经验，决策背后的理由比决策本身褪色得更快。
> "In my experience, the reasoning behind decisions degrades faster than the decisions themselves."
:::

他的例子是：AI 可能还记得“我们用 PostgreSQL”，却忘了为什么不选 MongoDB（需要 JSONB、团队有运维经验、多租户需求排除了文档库）。结果它继续遵守这个决定，却提出一个更适合文档库、和 PostgreSQL 关系型优势对着干的 schema。作者称之为<Trans zh="技术上符合已声明的选择，架构上却走偏了。">“Technically compliant with the stated choice, but architecturally misguided.”</Trans>

理由偏偏又是压缩最容易丢的内容，因为它啰嗦、解释性强、依赖上下文。作者的说法是：<Trans zh="“是什么”活下来了，“为什么”没有。">“The what survives; the why does not.”</Trans>

**现有工具为什么不够**：Claude 的 project memory、Cursor 的 rules 文件、Copilot 的 workspace indexing 都是**项目级**的。它们记得项目用 Fastify，不记得昨天那个会话出于什么原因否决了 `RetryQueue` 抽象。

我觉得“理由先丢”这一点比 Lost in the Middle 的引用更有用。它解释了一类很难察觉的错误：AI 没有违背任何一条你说过的规则，却一步步偏离了你做那个决定的初衷。只记结论的规则文件防不住这种偏离。

### 3.2 存到哪里：两层文档，以及为什么代码不够

作者的方案是把决策上下文当作**外部状态**：

::: tr 一份活文档，存在于对话之外，在决策发生时就记录下来，并作为人和 AI 跨会话的权威参考。
> "a living document that exists outside the conversation, captures decisions as they happen, and serves as the authoritative reference for both human and AI across sessions."
:::

它和同系列前一篇的 priming 文档（见“打地基”阶段的规则文件思路）不是一回事：

| | Priming 文档 | Feature 文档 |
|---|---|---|
| 层级 | 项目级 | 功能级 |
| 内容 | 技术栈、架构模式、命名约定、代码示例 | 开发中做出的具体决策、塑造决策的约束、考虑过并否决的方案、还开着的问题、当前进度 |
| 变化频率 | 相对稳定，按季度或重大架构变化更新 | 变化快，可能每个会话都更新 |
| 告诉 AI | <Trans zh="这个项目是这样运作的。">“here is how this project works.”</Trans> | <Trans zh="这件具体的工作我们走到了哪里，又是怎么走到这里的。">“here is where we are on this specific piece of work, and how we got here.”</Trans> |

开新会话时两份一起加载。作者的概括是：<Trans zh="priming 文档提供词汇，feature 文档提供历史。">“The priming document provides the vocabulary. The feature document provides the history.”</Trans>

**“AI 能直接读代码，为什么还要文档？”** 这是作者预料到的反驳。他的回答是：<Trans zh="因为代码记录的是结果，不是推理。">“Because code captures outcomes, not reasoning.”</Trans>一个直接用 BullMQ 处理重试的代码库，看不出 `RetryQueue` 抽象是被提出、讨论后刻意否决的，还是 AI 第一次就这么生成、从没人质疑过。被否决的方案、驱动决策的约束、还没解决的问题，在代码里都看不见。

顺带的好处是省 token：一份 50 行的功能文档，承载了成百上千行实现代码根本表达不了的决策上下文。作者强调省 token 不是写文档的理由，保留推理才是。

**和 ADR 的关系**：Michael Nygard 2011 年提出架构决策记录（ADR），补的正是同一个缺口：代码显示建了什么，不显示否决了什么、受什么约束、接受了什么取舍。作者说功能文档本质上是<Trans zh="一份活的 ADR">“a living ADR”</Trans>，随决策实时演进，而不是事后补写。

- 已经在用 ADR 的团队：功能文档就是进行中的 ADR，功能上线后，重要决策“毕业”成正式 ADR。
- 还没用 ADR 的团队：这是更轻、更迭代的入口。

**多人协作**：几个开发者各自开 AI 会话做同一个功能时，功能文档就是共享记录。没有它，开发者 B 的 AI 可能重新提出开发者 A 已经否决过的抽象。

### 3.3 写什么、什么时候写：一份不到 50 行的模板

作者接着用同系列 Design-First 一文里的通知服务做例子（见 [[108]]）。设计对话结束后，他手里有几条值得保存的决策：重试直接用 BullMQ、不加包装；服务用函数式，不用类；v1 只做 email；用 SendGrid 发送。

这些决策连同理由、当前约束、开放问题和进度，写进了一份不到 50 行的文档。下面是原文给出的完整示例（逐字摘自原文，2026-11-01 抓取）：

```markdown
# Feature: Notification Service v1

## Decisions
| Decision                    | Reason                                  | Rejected Alternative                                |
|-----------------------------+-----------------------------------------+-----------------------------------------------------|
| BullMQ directly, no wrapper | Native retry with backoff is sufficient | RetryQueue abstraction (unnecessary indirection)    |
| Functional services         | Match codebase convention               | Class-based (rejected: convention)                  |
| SendGrid for delivery       | Deliverability + team experience        | SES (cheaper, less reliable), Mailgun (no team exp) |

## Constraints
- Email-only for v1 (no SMS/push)
- All queries include tenantId (multi-tenant)
- Must use existing auth middleware

## Open Questions
- [ ] Rate limiting strategy (awaiting product input)

## State
- [x] Design approved (all 5 levels)
- [x] NotificationHandler + TemplateRenderer implemented
- [ ] DeliveryTracker (next session)
```

中文说明：决策表三列是“决策 / 理由 / 被否决的方案”，例如“直接用 BullMQ、不包装，因为原生带退避的重试已经够用，否决了 RetryQueue 抽象（多余的间接层）”；约束写 v1 只做 email、所有查询带 tenantId、必须用现有鉴权中间件；开放问题是限流策略（等产品输入）；进度清单记录设计已批准、两个组件已实现、DeliveryTracker 留到下个会话。作者对它的定位是：

::: tr 不是正式模板，而是一份工作记录：带理由的决策、AI 必须遵守的当前约束、尚未解决的开放问题，以及一个“做完了什么、还剩什么”的简单清单。
> "Not a formal template, but a working record: decisions with their reasoning, current constraints the AI must respect, open questions that remain unresolved, and a simple checklist of what was done versus what remained."
:::

**效果**：第三次会话开始时，作者没有重建前面 45 分钟的对话（重新解释技术栈、重新确立设计决策、重新说明约束），而是直接把文档发给 AI：

<Trans zh="AI 在三十秒内就完全对齐了。">“The AI had full alignment in thirty seconds.”</Trans>不是因为它记得之前的会话，而是因为决策已经外置成它可以重新读入的形式。<Trans zh="每个新会话都变成了热启动，而不是冷启动。">“Every new session became a warm start rather than a cold one.”</Trans>

**什么时候更新**：在自然的停顿点：一个设计层级结束时、做出重大决策时、开放问题解决时。有时作者自己写，有时让 AI 总结决策和理由，再把总结改进文档。每次只是几行，不是在写文档。

**一个意外收获**：写下“为什么选直接集成 BullMQ 而不是包装”，逼着作者把理由说清楚，偶尔还发现自己的理由没有想象中那么硬。这份文档对 AI 是外部记忆，对他自己是<Trans zh="让自己决策更清晰的强制手段">“a forcing function for clarity in my own decision-making”</Trans>。

我觉得这份模板最值得抄的是“Rejected Alternative”这一列。多数团队的计划文件会写“做什么”，很少写“考虑过但不做什么、为什么”。而 3.1 里那种“AI 又提出被否决的方案”的问题，恰恰只有这一列能防。

### 3.4 什么时候值得：按规模校准

作者明确说，上下文锚定不是处处都需要。它只在功能跨多个会话、丢上下文的风险真实存在、重建成本很高时才有价值：

| 场景 | 需要锚定吗 | 原因 |
|---|---|---|
| 快速提问、单个工具函数 | 不需要 | 对话足够短，褪色无关紧要 |
| 单会话功能（一小时内） | 轻量即可：如果可能回头再做，记下关键决策 | 几条决策和进度要点，够重启就行 |
| 跨会话的多日功能 | 需要：完整的功能文档 | 丢上下文的代价是几小时，不是几分钟 |
| 多个开发者参与的功能 | 需要：共享文档 | 在彼此独立的 AI 会话之间协调决策 |

多日的工作正是“抱着长对话不放”最容易出现的地方，也是外置决策最能打破循环的地方。

### 3.5 一条检验标准：关掉会话，重新开始

文章最后回到开头的测试，并把它变成日常检验：

::: tr 关掉会话，重新开始。如果感觉毫不费力，如果重新开始只花三十秒分享文档，而不是三十分钟重新解释，那么上下文就在它该在的地方。
> "close the session. Start fresh. If that feels effortless — if starting over costs thirty seconds of document-sharing rather than thirty minutes of re-explanation — the context is where it belongs."
:::

作者把这概括为从“聊天驱动开发”转向“文档驱动开发”：对话仍是做决策的**媒介**，文档才是**记录**。和同系列前几篇合起来，是一条三层递进：静态上下文（priming）→ 动态对齐（Design-First）→ 持久决策（anchoring）。

原文侧栏提到，作者的开源框架 Lattice 里有一个 `context-anchoring` 组件会自动创建和更新这份文档。这是作者自己的项目，本站没有核对它的实现。

## 4. 结果与局限

**文中真正给出的证据**

- 一个案例：作者本人的通知服务，三个会话，文档不到 50 行。
- “45 分钟”“30 秒”是作者对这次经历的叙述，没有对照、没有多次测量。
- Lost in the Middle 是引用的外部研究；“理由比决策先褪色”是作者自己的实践观察，文中明说研究没有覆盖这一点。

**局限与注意**

- 没有讨论文档和代码不一致时以谁为准、谁负责修正。
- 多人共享同一份文档时，并发修改、合并冲突怎么处理，文中没讲。
- 文档靠人在停顿点更新，忘了更新就会过期；作者的 Lattice 框架宣称能自动做，但不在本文范围内。
- 侧栏推荐作者自己的开源框架，属于自带立场的内容。

## 5. 结论

AI 对话适合做决策，不适合存决策。多日功能里，把“决定了什么、为什么、否决了什么、还没定什么、做到哪了”写进一份不到 50 行的功能文档，每次新会话和项目规则一起加载。这样你可以随时关掉变长的会话，AI 也不会重新提出你已经否决过的方案。

这和 [[61]] 的四份 Markdown、[[68]] 的 handoff、[[29]] 的 Conductor plan 是同一类“外化记忆”，但更轻，重点放在被否决的方案上。

**你可以这样试**

1. 下次做一个要跨天的功能，在仓库里建 `docs/features/<功能名>.md`，照 3.3 的四段写：决策表（带否决项）、约束、开放问题、进度。
2. 每做完一个设计决定，让 AI 用一行写下“决策 / 理由 / 否决了什么”，你改完再贴进去。
3. 每天收工时故意关掉会话。第二天新开会话，只给它规则文件和这份功能文档，看它多久能接上。
4. 功能上线后，挑出两三条以后还会被问“为什么”的决策，写成正式 ADR。

**读完自测**

1. 作者说的“恶性循环”是什么？用哪个问题检测自己是否陷入其中？
2. 为什么自动压缩特别容易丢掉决策的理由？
3. priming 文档和 feature 文档分别回答什么问题？
4. AI 已经能读代码，为什么还需要功能文档？
5. 一小时内能做完的功能，需要写完整的功能文档吗？
