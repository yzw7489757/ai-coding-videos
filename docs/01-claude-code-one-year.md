# 一年后，Claude Code 团队自己怎么用 Claude Code

<div class="meta-tags"><span class="tool-tag tool-claude">Claude Code</span></div>

<div class="hook">

**一句话看懂**：一年前，Claude Code 只适合“很简单的工程任务”；一年后，它的作者们同时跑着几十上百个代理，自己几乎不再盯着任何一个。Boris Cherny 和 Cat Wu 讲了中间发生的变化：让代理把错误写进文件、让它自己把应用跑起来验证、把它挂到工单流上、把权限交给分类器，以及上下文越给越少。

</div>

## 读完你能带走的 7 条收获

1. **代理犯错时，别纠正它，让它写进 CLAUDE.md 或 skill。** 教训落了盘，代理才能一直跑下去（见 3.1）。
2. **对代理来说，验证不是单元测试，而是“它能不能把东西跑起来”。** 给它一个启动应用、点界面的 skill，比多写测试更关键（见 3.2）。
3. **Routines 是把代理挂到事件流上。** 一个 routine 专找 5 小时没人回的 bug report 去修，人只合并容易验证的（见 3.3）。
4. **新模型不再需要单独的规划步骤，权限弹窗也可以交给分类器。** 人对 99% 都点“是”的弹窗早就麻木了（见 3.4）。
5. **下一步是和 loop 说话，而不是和代理说话**（见 3.5）。
6. **几百个代理靠的是界面：agent view、自动 worktree、手机远程控制**（见 3.6）。
7. **上下文极简：最少的系统提示词、最少的工具，再给它自己拉上下文的途径。** 给多了像微操（见 3.7）。

::: tip 小白先懂这几个词
- [CLAUDE.md](/glossary#claude-md)：Claude Code 每次启动都会读的“项目须知”。
- [Skills](/glossary#skills)：教 Agent 做某件事的说明书，需要时才加载。
- [Routines](/glossary#routines)：让 Agent 按时间或事件自动开工。
- [Auto mode](/glossary#auto-mode)：由另一个模型替你判断权限请求安不安全。
- [Worktree](/glossary#worktree)：同一个仓库同时开多个工作目录，方便并行。
:::

## 1. 基本信息

<YouTube id="Hth_tLaC2j8" title="Reflecting on a year of Claude Code" />

| 项目 | 内容 |
|---|---|
| 讲者 / 频道 | Boris Cherny（Head of Claude Code）、Cat Wu（Head of Product, Claude Code）／ 官方频道 **Claude** |
| 发布日期 | 2026-06-08 |
| 时长 | 18:07（两人对谈，没有观众问答） |
| 使用工具 | Claude Code（CLI、Desktop app、agent view、Remote Control、Routines、Auto mode、`/loop`）、computer use |
| 形式 | 对谈 + 经验总结，没有现场编码，也没有任何量化数据 |
| 分析依据 | YouTube 英文字幕全文（2026-10-14 用 yt-dlp 重新拉取并逐字核对）+ 视频简介与官方章节。字幕不标说话人，文中只在上下文能确定时写出讲者名字，其余写“讲者”。英文引号内容是字幕原话；“我觉得”开头的段落是本站评论，不是讲者观点。 |

<figure class="shot"><img src="/images/01/0045.webp" alt="开场对谈：讲到“一年前刚发布时”和现在“一棵由上千个 Agent 组成的树”的对比。" loading="lazy"><figcaption>📷 视频截图 · <a href="https://www.youtube.com/watch?v=Hth_tLaC2j8&t=45s" target="_blank" rel="noopener">0:45</a> · 开场对谈：讲到“一年前刚发布时”和现在“一棵由上千个 Agent 组成的树”的对比。</figcaption></figure>

## 2. 这篇在回答什么

先看一个对比。Claude Code 刚发布时，讲者回忆，在 Slack 上发了个小视频，只有两个人点了表情。当时的评价是“很简单的工程任务还挺好用”，讲者自己吐槽，这是“其实不太行”的委婉说法。

一年后的说法是：

::: tr 现在我手下有成群的代理在干活，我在提示一个代理，或者有个代理在提示别的代理，它又在提示别的代理。像一棵由上千个代理组成的树。
> "now I just have, like, armies of agents that are doing stuff like I'm prompting one agent or I have like an agent that's like prompting agents, that's prompting agents. And it's like a tree of like thousands of agents."
:::

从“盯一个代理”到“管一棵树”，中间不只是模型变强。这期对谈其实回答了五个问题：

```mermaid
flowchart LR
    A["代理怎么<br/>不再犯同样的错"] --> B["代理怎么<br/>自己验证"]
    B --> C["代理怎么<br/>不等人就开工"]
    C --> D["人怎么<br/>不再盯着它"]
    D --> E["上下文<br/>该给多少"]
```

前两个问题是地基：代理不长记性、不能自己验证，就没人敢放手。后三个问题建立在地基上。

## 3. 怎么做

### 3.1 每次犯错，都写进 CLAUDE.md 或 Skill

对谈一开头，讲者就说了他认为最重要的一条：

::: tr 最重要的想法是：每次 Claude 犯错，我都不是告诉它换个做法，而是让它把这条写进 CLAUDE.md，或者做成一个 skill 之类的东西，让它以后换个做法。只要能做到这一点，Claude 就可以一直跑下去。
> "the most important idea when working on this stuff is like, every single time Claude makes a mistake. I don't tell Claude to do it differently, I tell it to write it to the CLAUDE.md, or to like make a skill or or something to do it differently. And if you can do this, then Claude can just like run forever."
:::

为什么这么重要？在对话里纠正，只对这一次会话有效。会话结束，教训就没了；下一次、下一个代理还会犯同样的错。写进文件，所有后来的代理都会读到。

“一直跑下去”这个说法是关键。人一旦需要反复纠正同一个错误，就得一直守在旁边；只有教训能沉淀下来，人才能离开。

我觉得这是全篇最容易照做的一条：下次代理犯错，别说“不对，改成这样”，改说“把这条教训写进 CLAUDE.md，写清楚以后怎么做”。

### 3.2 验证的意思是“代理能不能把东西跑起来”

第二个地基是验证。讲者说，企业客户最常问的就是“怎么让 Claude Code 擅长验证”，而大家普遍理解错了：

::: tr 一说到验证，大家想到的是单元测试、lint 或者类型检查。这些显然很容易自动化，而且本来就已经自动化了。但对代理来说，验证有点不一样，它指的是：代理能不能把这个东西跑起来？
> "whenever we talk about verification, people are thinking like unit tests or they're thinking like lint or like type check. These are the things that are obviously really easy to automate. And these are the things that were already automated. But actually when we talk about verification for agents, it's something slightly different. It's like can the agent run the thing?"
:::

他承认，这需要动点脑子，因为怎么让代理跑起来往往并不直接。他回忆，Opus 4 时第一次让 Claude 写完功能后在 bash 里自测，它打开了一个小的 Claude CLI 测自己的功能，“当时觉得太疯狂了”。现在 iOS 模拟器、Android 模拟器、桌面电脑上都有这种自测循环。

Cat 讲了自己最近做桌面应用的例子：

1. 团队有位工程师写了一个 desktop development skill，教 Claude 怎么启动本地桌面应用。
2. Claude 会真的启动应用，用 [computer use](/glossary#computer-use) 点来点去：她加了新界面，它就点进去触发新界面，还会测边界情况，发现问题就修，修完再查一遍。
3. 它有时会碰到 staging 环境的问题。这时她让 Claude 去读 Slack：staging 现在是不是挂了？是不是别人也遇到了？
4. 排查完以后，再让它更新这个 desktop development skill。

第 4 步就是 3.1 的做法：这次踩的坑，变成下次的说明书。

我觉得这个例子说明了“验证”真正难在哪：不是写断言，而是给代理一个能启动你的产品、看到结果的入口。没有这个入口，代理只能写完就交；有了它，“写、跑、看、修”才能自己转起来。

### 3.3 Routines：把代理挂到事件流上

代理能长记性、能自己验证以后，下一步是让它不等人就开工。讲者说，最让他兴奋的用法是 routines（定时或按事件自动启动的代理任务）。

两个内部的例子：

- 团队里负责 voice mode 的工程师设了一个 routine，监听所有关于 voice mode 的工单、GitHub issue 和 bug report。Claude 会主动做出修复，然后把 PR 发给他。跑通以后，他又给其他没人回应的反馈设了一个。
- 讲者自己发了个小功能，有个边界情况没想到，有人提了 bug。他打算晚上处理，结果自己的 Claude 说：等等，另一个 Claude 已经修好了。原来那位工程师还有一个 routine，<Trans zh="专找 5 小时内没人回应的 bug report，去做出修复，他只合并那些容易验证的">“just looks for bug reports that haven't been responded to in five hours and puts up a fix, and he merges the ones that are easy to verify”</Trans>。

讲者说，当初出 Agent SDK 时，团队也不清楚程序化地用 Claude Code 到底能干什么；routines 是第一个真正明显的用途：

::: tr 它把代码审查全包了，每个 PR 都由它看护。还记得以前你得自己回复代码审查意见、自己修 CI、自己 rebase 吗？我已经很久没干过这些了。
> "it just does like all the code review, it babysits like every PR, you remember back in the day you used to actually have to like respond to code review comments. You used to have to like fix CI. You used to have to rebase. Yeah. Like I haven't done that in a long time."
:::

注意那位工程师的分寸：代理可以对每个 bug 都提修复，但人只合并“容易验证的”。人审的工作量没有消失，只是从“写修复”变成了“挑出能放心合并的修复”。

### 3.4 从 Plan mode 换到 Auto mode

代理不等人就开工了，人还要不要盯着它？被问到同步工作时最常用什么功能，讲者说以前是 plan mode，现在不用了，改用 auto mode：

::: tr 因为新模型其实已经不需要单独的规划步骤了。
> "because the newer models they don't actually need like a planning step anymore."
:::

他的判断是：Opus 4 到 4.5 时规划步骤很重要，从 4.6 开始、到 4.7 肯定不需要了。他也承认有人仍然喜欢计划这份产物。他不用，因为开了 auto mode 以后，Claude 开始干活，他就可以去开下一个 Claude，不用坐在那儿看。

<figure class="shot"><img src="/images/01/0407.webp" alt="6:47 处，话题转到 Auto mode：Boris 说“Instead of plan mode”，新模型已不需要单独的规划步骤。" loading="lazy"><figcaption>📷 视频截图 · <a href="https://www.youtube.com/watch?v=Hth_tLaC2j8&t=407s" target="_blank" rel="noopener">6:47</a> · 6:47 处，话题转到 Auto mode：Boris 说“Instead of plan mode”，新模型已不需要单独的规划步骤。</figcaption></figure>

auto mode 换掉的是最早的权限弹窗：代理每要跑一个工具就问你“可以吗”。一年半前那是最好的办法，因为没有分类器、模型也没现在对齐得好。auto mode 的做法是把权限请求交给另一个模型做安全检查，可疑的直接拒绝，你事后可以再放行。

讲者反而认为这样更安全：

::: tr 这是人性：99% 的请求你都会同意，读着读着眼睛就花了。所以我们觉得 auto mode 比逐条读权限弹窗更安全，因为你只需要注意最重要的事，而不是被一堆 99% 都是“是”的东西刷屏。
> "It's just human nature, when you accept 99% of requests, that your eyes just glaze over when you read it. And so actually, we feel that auto mode is more safe than reading every single permission prompt, because it means that your only paying attention to the most important thing and not like being spammed a bunch of things that are just 99% yes."
:::

上线前他们是这样建立信任的：

1. 收集几千份<Trans zh="完整的代理轨迹和一次权限请求">“an entire agent trajectory and a permission prompt”</Trans>，让 auto mode 判断安不安全，结果很好；
2. 请红队尝试 prompt injection、攻击代码库，用这些做成 evals，确保全部被拒；
3. 再让内部团队攻击一轮，继续改进。

讲者说，这样防的不只是现有的漏洞，还有<Trans zh="我们能构造出的最聪明的攻击">“the most intelligent attacks that we can construct”</Trans>。他也坦白，第一次听到“把权限请求路由给另一个模型”时，他觉得不可能行，结果实测效果非常好。在模型上做产品，很多过去的工程直觉都得扔掉。

我觉得“新模型不需要规划”和“auto mode 更安全”都是在 Anthropic 自家最新模型和分类器上得出的结论。用别的模型、没有类似分类器时，规划和权限白名单仍然有用。这一节更可迁移的是那条观察：弹窗太多，人就不再看了。

### 3.5 Loop：从“和代理说话”到“和 loop 说话”

讲者把一年半里的变化总结成两次跳跃：

1. 以前工程师直接面对源代码。后来跳到：我不写源代码，我和代理说话，代理替我写。
2. 现在正在第二跳：

::: tr 我已经不直接跟代理说话了。我跟 loop 或 routine 说话，再由它替我给 Claude 下指令。
> "I don't talk to an agent anymore. I talk to loop or I talk to a routine and it prompts Claude for me."
:::

Cat 用一个 90 年代《哈佛商业评论》的案例解释组织层面的变化：电脑刚进公司时，大家奇怪生产力为什么没涨。后来发现，不能保留纸质文件柜和纸笔流程、只在旁边放一台电脑；要扔掉文件柜，把电脑放到每个业务流程的中心。

她说 Anthropic 就是这样：新人入职不问人，问 Claude；写代码、代码审查、安全审查都是 Claude，填表用 Co-work。电脑那次转型用了 10 到 15 年，AI 会快得多，<Trans zh="因为我们的工作大多已经数字化了，而 Claude 能用电脑">“because so much of our work is already digitized and Claude can use a computer”</Trans>。

我觉得“和 loop 说话”和“把 Claude 放到中心”说的是同一件事：人不再是每次手动启动代理的那一环，而是去设计让代理自动启动的那套流程。

### 3.6 从一个代理到几百个：界面怎么变

管几百个代理，靠的是界面。Boris 说他以前的做法是：

- 6 个终端 tab，对应同一个仓库的 6 个 git checkout，来回切换。

现在：

- 只开一个 tab，用新出的 agent view；
- 用 Desktop app，它会自动建 [worktree](/glossary#worktree)，不用再折腾 checkout；
- <Trans zh="我现在大概一半的工程工作是在手机上做的">“probably half my engineering now I do on my phone”</Trans>：在电脑上启动任务，用 Remote Control 从手机连进去，边走边看代理进度、再开新代理；和人聊出新想法，当场用 voice mode 开一个代理。

Cat 补了个细节：有段时间她发现 Boris 下班后电脑总是锁屏开着、插着电放在桌上，PR 却一直在合。问他，他说在沙发上写代码。那一周正是 Remote Control 变好用的时候。

### 3.7 上下文极简主义

企业用户另一个常问的问题是：大型企业里，上下文工程怎么做？讲者的回答是，这个问题本身也跟着模型变了：Sonnet 3.5 时代要做提示词工程，Opus 4 时代要做上下文工程，而

::: tr 对今天的模型，这些都不用做了。给它尽可能少的系统提示词、尽可能少的工具，然后让模型自己想办法。你只需要给模型某种自己拉取上下文的途径。我觉得这是最重要的。
> "with the models of today, you don't do any of this. You give it the minimal possible system prompt, the minimal possible tools, and then you let the model figure it out. Like you just have to give the model some way to pull in the context. I think that's the most important thing."
:::

另一位讲者接着说：

::: tr 我是上下文极简主义者。我的基本理念是：只告诉模型它需要知道的，剩下的让它自己搞清楚。上下文给得太多，有点像在微操它。
> "I'm a context minimalist, so my general philosophy is tell the model only what it needs to know and let it figure out the rest of it. I think when you give the model too much context, it's kind of like you're micromanaging it."
:::

模型有时知道更好的路，给它空间更好。团队也在让 harness 变得更精简，给你自己的 prompt 留出空间，模型也更能听你的。

<figure class="shot"><img src="/images/01/0951.webp" alt="15:51 前后，对谈讲到用手机远程控制 Agent、“在沙发上提交 PR”；紧接着进入“上下文极简主义”话题。" loading="lazy"><figcaption>📷 视频截图 · <a href="https://www.youtube.com/watch?v=Hth_tLaC2j8&t=951s" target="_blank" rel="noopener">15:51</a> · 15:51 前后，对谈讲到用手机远程控制 Agent、“在沙发上提交 PR”；紧接着进入“上下文极简主义”话题。</figcaption></figure>

我觉得这一节和 3.1 并不矛盾。3.1 说把教训写进 CLAUDE.md，这里说少给上下文。合起来是：只写模型自己发现不了的东西（踩过的坑、团队约定、外部系统在哪），其余让它自己去代码里找。

### 3.8 人的角色在合并

对谈里还有一条线贯穿始终：写代码的不再只是工程师。

- Claude Code 团队的 PM、DevRel、设计师都写代码。讲者说，第一次看到设计师 Megan 提 PR 时吓了一跳，她说“我就是修个按钮”，代码看着也没问题，现在已经很平常。
- 他们接触的企业里，通常是工程师先用上，旁边的角色看了也来试：设计师直接在应用里做原型和修改，PM 直接改应用，财务在 Claude Code 里做预测，数据科学家人人开着它。
- 反过来，工程师也越来越多地端到端上线产品：想点子、做出来、和法务、市场、安全一起把它推出去。

被问到“未来大家都是 PM 还是都是工程师”时，回答是<Trans zh="两者都是">“Everyone's going to be both.”</Trans>讲者认为，现在 AI 最帮得上的是好奇心强、有产品品味、喜欢端到端负责的人。

## 4. 结果与局限

- **讲者给出的结果**（都是口头陈述）：同时跑一棵“上千个代理”的树；代码审查、看护 PR、修 CI、rebase 基本交给 routines；约一半工程工作在手机上完成；设计、PM、财务、数据科学都在用 Claude Code。
- **没有给出**：合并率、缺陷率、成本、routine 修复的通过比例、auto mode 的误放 / 误拒数据。“thousands”只是口头描述。

::: warning 局限与注意
- 这是官方团队对谈，讲的都是自家产品。Routines、auto mode、agent view、Remote Control 都是 Claude Code 的功能，换工具要自己找对应物。
- “不再需要 plan mode”是基于 Opus 4.6 / 4.7 的个人判断。较弱的模型或复杂需求仍可能需要规划。
- auto mode 的安全性依赖 Anthropic 自己的分类器和红队评测，视频没有公开评测数字。
- 没有可直接复制的配置或 skill 原文。desktop development skill 只讲了作用，没给内容。
- 讲者的团队规模、权限和基础设施（云端、内部 Slack 接入）不是普通团队都有的。
:::

## 5. 结论

这期对谈的主线是：**人要从“盯着代理干活”退到“设计让代理自己跑的系统”。**

退得出来，靠两个地基：代理犯过的错写进文件，不再犯第二次（3.1）；代理能自己把产品跑起来看结果（3.2）。有了这两条，才敢把它挂到工单上自动开工（3.3）、把权限交给分类器（3.4）、和 loop 而不是和代理说话（3.5）。

我觉得普通团队今天就能做的是前两条，它们不依赖任何新功能：一条“犯错就写进 CLAUDE.md”的习惯，一个“怎么把我的应用跑起来”的 skill。后面几条是 Claude Code 的产品功能，值得了解，但要等前两条稳了再上。

### 你可以这样试

- [ ] 下次代理犯错，别直接纠正，改说：“把这条教训写进 CLAUDE.md，写清楚以后该怎么做。”
- [ ] 写一个“怎么把应用跑起来”的 skill：启动命令、端口、测试账号、怎么截图或点界面、staging 出问题去哪确认。
- [ ] 让代理改完一个界面后，按这个 skill 自己启动应用、点一遍，再交给你。
- [ ] 挑一个低风险的事件流（比如超过 N 小时没人回的 bug report），试着让代理自动提修复，你只合并容易验证的。
- [ ] 打开 CLAUDE.md，删掉三条模型自己能从代码里看出来的内容。

::: details 读完自测（点开看答案）
1. **为什么让代理把错误写进 CLAUDE.md，而不是在对话里纠正？** 对话结束教训就丢了；写进文件，下一次、下一个代理都会读到，代理才能一直跑下去。
2. **讲者说的“验证”和单元测试有什么不同？** 单测、lint、类型检查早就自动化了；对代理来说，验证是它能不能把东西真正跑起来，比如启动应用、用 computer use 点界面。
3. **那个“5 小时 routine”做什么？人做什么？** 找 5 小时内没人回应的 bug report 并提修复；人只合并容易验证的。
4. **为什么讲者认为 auto mode 比逐条看权限弹窗更安全？** 人对 99% 都同意的弹窗会麻木；分类器替你过滤，人只关注最重要的少数情况。
5. **上下文极简主义的做法是什么？** 最少的系统提示词、最少的工具，再给模型自己拉取上下文的途径；给多了像微操。
:::
