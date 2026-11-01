# monorepo 里的 AI 审查：先找对指南，再审代码

<div class="meta-tags"><span class="tool-tag tool-general">通用（不限工具）</span></div>

<div class="hook">

**一句话看懂**：在一个很多团队共用的大 monorepo 里，把所有团队的审查指南一次塞给 AI 审查器，它会对你没碰过的代码发表意见。Atlassian 的 Jira 团队把审查拆成两个代理：第一个只负责“改动文件 → 适用的指南文件”的匹配，写进一个产物文件；第二个只读这份短名单去审 diff。评论值不值得读，最后取决于指南文件写得好不好。

</div>

## 读完你能带走的 7 条收获

1. **“选哪份指南”和“按指南审代码”是两件事**：一个代理同时做，选错文档时评论就会跑题（见 3.1）。
2. **匹配代理的 prompt 主要写“不准做什么”和“何时停”**：否则它会顺手开始审查，甚至写脚本、建文件，最后一条评论都没留（见 3.2）。
3. **PR 编号只能来自流水线变量**：指令里残留一个示例 PR 编号，代理可能就去审那个 PR（见 3.2）。
4. **审查代理只留关键问题和真实担忧**：不夸、不挑刺、不复述 diff；不建文件、不推提交（见 3.3）。
5. **两个代理用一个产物文件交接，匹配结果要“乏味”**：只列路径和指南名，多写观察会被下游当成既定结论（见 3.4、3.5）。
6. **评论质量的功夫在指南文件，不在 prompt**：模糊的指南产出模糊的评论；评论错了就改指南，一个月后再重写 prompt（见 3.5）。
7. **先手动跑，再开自动触发，批准权留给人**：只有一份贡献指南的仓库不需要匹配这一步（见 3.6）。

::: tip 小白先懂这几个词
- [Monorepo](/glossary#monorepo)：多个项目或团队共用一个代码仓库。
- [PR Review Bot（PR 审查机器人）](/glossary#pr-review-bot)：在 Pull Request 上自动留言的审查代理。
- [指南匹配器](/glossary#guideline-matcher)：先把改动文件对到适用的审查指南，再交给审查代理的前置步骤。
- [Artifact（产物）](/glossary#artifact)：流水线一步产出、下一步读取的文件。
- [MCP](/glossary#mcp)：让代理调用外部工具和数据的标准协议。
:::

## 1. 基本信息

<SourceCard type="文章" title="How we accelerated code review in a large monorepo using Agentic Pipelines" author="Arthy Vijayaraghavan" date="2026-10-14" url="https://www.atlassian.com/blog/bitbucket/how-we-accelerated-code-review-in-a-large-monorepo-using-agentic-pipelines" />

| 项目 | 内容 |
|---|---|
| 链接 | https://www.atlassian.com/blog/bitbucket/how-we-accelerated-code-review-in-a-large-monorepo-using-agentic-pipelines |
| 类型 | 公司工程博客（Inside Atlassian / Bitbucket） |
| 作者 | Arthy Vijayaraghavan（Atlassian Senior Engineering Manager） |
| 发布日期 | 2026-10-14（页面日期；元数据为 2026-10-14T20:28 UTC，即北京时间 10-15 凌晨） |
| 使用工具 | Bitbucket Agentic Pipelines（beta）、Bitbucket MCP server；代理默认 Rovo Dev，也可设为 Claude 或 Codex |
| 分析依据 | 原文全文（正文约 1,700 词），2026-11-01 抓取。两段 prompt 和 YAML 逐字摘自原文（作者注明 YAML 是简化版）。“7 分钟”是作者明说的单次运行，不是基准。文末有 Bitbucket 产品开通说明，本站一笔带过。“我觉得”开头的段落是本站评论。 |

## 2. 这篇在回答什么

上个季度，Atlassian 的 AI 审查器给一个正在修 CSS bug 的开发者留言，建议他重新考虑组件获取数据的方式。评论写得很好，语气也很笃定，但说的是他根本没碰的代码。

这是一个大 monorepo，很多产品团队共用。每个团队在自己的目录里放着自己的审查指南。人类审查者知道自己负责的区域该打开哪份文档；一个手里拿着全部文档的代理，得在一次处理里既挑对文档、又审好代码。挑错了，评论就跑题。

作者的判断是：

<Trans zh="在 monorepo 里，一条 AI 审查评论只有在引用了适用于被改动代码的规则时才有用。">“In a monorepo, an AI review comment is only useful if it cites a rule that applies to the code being changed.”</Trans>

文章回答四个问题：

1. 为什么一个代理拿着所有指南审查会出问题？
2. 拆成两个代理后，每个代理的 prompt 怎么写？
3. 评论的质量从哪里来？
4. 什么时候值得这么拆，怎么上线？

```mermaid
flowchart LR
  A["PR 推送<br/>目标分支 main"] --> B["步骤 1 匹配代理<br/>改动路径 → 指南文件"]
  B --> C["产物<br/>tmp/pr-analysis.md"]
  C --> D["步骤 2 审查代理<br/>只读列出的指南"]
  D --> E["行内评论<br/>只写关键问题"]
  E --> F["作者和人工审查者<br/>决定改什么"]
  F -. "评论错了" .-> G["改指南文件"]
```

## 3. 怎么做

### 3.1 问题：选文档和审代码是两件事

在这个仓库里，不可能只有一份风格指南。不同团队对自己区域的代码有不同规则，规则按目录划分，而且是有意这么写的。所有这些文档合起来叫“指南”，但对任何一个具体的 PR，大部分文档都无话可说。

把所有指南一次交给代理，得到的就是放之四海而皆准的评论：“加个测试”“改个变量名”“处理一下错误”。作者说它们都不算错，但值不值得去改？

回到 CSS 修复的例子：指南集合里另有一份讲数据获取的文档，跟样式改动毫无关系，但手里同时拿着这两份文档的代理会照样写出关于数据获取的评论。于是人类审查者还得先判断：这条评论是关于代码的，还是关于一份本不该被打开的文档？

于是 Jira 团队做了拆分：

<Trans zh="挑选正确的文档和按文档审查是两件不同的工作，所以我们把它们交给了两个不同的代理。">“Picking the right documents and reviewing against them are two different jobs, so we gave them to two different agents.”</Trans>

Agentic Pipelines 每一步跑一个代理，正好适合这种设计：第一步匹配代理干完活、发布一个文件；下一步审查代理从头开始，手里只有 diff 和匹配代理点名的那几份文档。

作者也提醒了前提：每个目录的指南必须清楚、具体。匹配代理能把改动送到对的文档面前，却没法让一份模糊的文档变得有用。

### 3.2 匹配代理：主要写它不准做什么

匹配代理通过流水线挂上的 Bitbucket MCP server 读 PR，用环境里已有的 PR 编号。它把每个改动路径和覆盖它的指南文件配对，写进 `tmp/pr-analysis.md`。如果 PR 工具拿不到某个文件（指南或改动文件），就直接从检出的仓库副本里读。

作者说，prompt 的大部分篇幅都在讲它**不准**做什么：

::: tr 把一个代理指向一个 PR，它就想去审查；只要 prompt 留了余地，它就会审。措辞再松一点，还可能更糟：代理写了一个脚本、加了几个文件，然后结束这一步，一条评论都没留。所以我们明确告诉它什么时候停。
> "Point an agent at a pull request and it wants to review it, so if the prompt leaves any room, it will. Leave the wording loose and you can get something worse: an agent that writes a script, adds files, and finishes the step without leaving a single comment. So we tell it exactly when to stop."
:::

匹配代理的 prompt（逐字摘自原文，2026-11-01 抓取）：

```text
You match changed files to guideline documents. Matching is the whole job.

Read the pull request with the Bitbucket MCP server.
Use $BITBUCKET_PR_ID. If these instructions mention any other id, ignore it.
Use the repository checkout if a file is not in the pull request tools.

If no changed file is in scope, say so in tmp/pr-analysis.md and stop.

Otherwise list:
- the changed path
- the guideline file that applies

Do not review the code. Do not comment on the pull request.
Do not create any other file.
```

中文说明：你的唯一工作是把改动文件匹配到指南文档；用 Bitbucket MCP server 读 PR，只用 `$BITBUCKET_PR_ID`，指令里提到别的编号一律忽略；PR 工具里没有的文件去仓库检出副本里找；如果没有改动文件在任何指南范围内，就在 `tmp/pr-analysis.md` 里说明并停止；否则列出“改动路径 + 适用的指南文件”；不要审代码，不要在 PR 上评论，不要创建其他文件。

`$BITBUCKET_PR_ID` 那一行是踩坑换来的：

<Trans zh="如果指令里任何地方残留了一个示例 PR 编号，代理可能会去审那个 PR，而不是真正的这个。编号必须来自流水线。">“If a sample pull request ID is left anywhere in the instructions, the agent may review that pull request instead of the real one. The ID has to come from the pipeline.”</Trans>

我觉得这条教训适用于所有接进 CI 的代理：prompt 里的“示例值”对模型来说就是值。PR 编号、分支名、仓库名这类会决定代理操作对象的参数，应该只从流水线变量里来，并在 prompt 里明确“忽略其他来源”。

### 3.3 审查代理：只说值得说的

审查代理读 `tmp/pr-analysis.md`，只打开里面列出的指南文件，然后对 diff 发表评论。团队给它的身份是“这个代码区域的 principal engineer”，因为各区域的指南本身就是本地化的、有点严格的，评论的语气也要配得上。

评论只留给关键问题和真实担忧。夸奖、挑刺、复述 diff 做了什么，一律不上 PR，<Trans zh="因为它们生成起来容易，清理起来烦人。">“because they’re easy to generate and tedious to clear.”</Trans>prompt 还禁止它新建文件和提交代码。评论贴到 PR 上，它的工作就结束了。

审查代理的 prompt（逐字摘自原文）：

```text
You review the current pull request against the guidelines you were given.

Read tmp/pr-analysis.md. Open only the files it names.
Read the diff with the Bitbucket MCP server and $BITBUCKET_PR_ID.
Use the repository checkout if you need a file the pull request tools do not return.

Leave inline comments for critical issues and real concerns.
Skip praise, nitpicks, and summaries of what the code does.

Do not create files. Do not push commits. Do not write a tool that reviews for you.
```

中文说明：按给你的指南审查当前 PR；读 `tmp/pr-analysis.md`，只打开它列出的文件；用 MCP server 和 `$BITBUCKET_PR_ID` 读 diff，拿不到的文件去检出副本里找；只对关键问题和真实担忧留行内评论；跳过夸奖、挑刺和对代码做了什么的总结；不要创建文件，不要推送提交，不要写一个替你审查的工具。

“不要写一个替你审查的工具”这一句，和 3.2 里“代理写了个脚本就结束了”的失败对应。

### 3.4 两步之间：一个产物文件

两个代理之间唯一的交接，是一个流水线产物 `tmp/pr-analysis.md`。指南文件本身留在仓库里。审查步骤开始时，手里有这个产物和仓库检出副本，需要读的只有 diff 和产物点名的文件。

原文给出的简化版流水线（逐字摘录）：

```yaml
# Simplified excerpt. The prompt files live in the repository.
definitions:
  agents:
    match-guidelines:
      prompt: "review-guidelines/match.md"
    review-pull-request:
      prompt: "review-guidelines/review.md"
pipelines:
  custom:
    review-pull-request:
      - step:
          name: Match files to guidelines
          auth:
            system:
              scopes:
                - read:pullrequest:bitbucket
          script:
            - agent: match-guidelines
          artifacts:
            - tmp/pr-analysis.md
      - step:
          name: Comment on critical issues
          auth:
            system:
              scopes:
                - read:pullrequest:bitbucket
          script:
            - agent: review-pull-request
triggers:
  pullrequest-push:
    - condition: BITBUCKET_PR_DESTINATION_BRANCH == "main"
      pipelines:
        - review-pull-request
```

要点：

- 两段 prompt 存在仓库的 `review-guidelines/` 下，流水线只引用文件名。
- 第一步声明 `artifacts: tmp/pr-analysis.md`，第二步才能读到。
- 触发条件是 PR 推送且目标分支为 `main`；作者说这种目标分支条件是“从小处开始”的简单办法。
- 不设 `provider` 时用 Rovo Dev；用自家账号可以把代理的 `provider` 设成 `claude` 或 `codex`，prompt 不用改。
- 两步都只申请 `read:pullrequest:bitbucket` 这一个 scope。作者说在公开的 MCP 工具表里，这个 scope 同时覆盖读 PR 详情和添加行内评论；照抄 YAML 前要先查表，用到的工具需要什么 scope 就加什么。

### 3.5 评论质量从哪里来：指南文件和反馈

结果先说速度：在一个非常大的 PR 上，两步一共约 7 分钟。作者明说<Trans zh="那是单次运行，不是基准测试">“That’s a single run, not a benchmark”</Trans>，但对比很明显：这个仓库里的作者以前要等半天、有时一整天，才能等到第一轮审查。代理并不替代那一轮人工审查，它是在队友打开 PR 之前，先把明显违反指南的地方抓出来。

接着作者说，速度是容易的部分：

::: tr 让评论值得读花了更多功夫，而且大部分功夫花在指南文件上，而不是 prompt 上。模糊的指南产出模糊的评论，不管哪个模型来跑这一步，开发者很快就学会无视它们。
> "Making the comments worth reading took more effort, and a lot of it went into the guideline files rather than the prompts. Vague guidelines produce vague comments, whichever model runs the step, and developers quickly learn to ignore them."
:::

好用的指南，是写清楚“这个团队真正在乎什么”的指南。要做到这一点，得有人指出哪条评论错了、哪条没用：负责该区域的团队和 PR 作者一起读行内评论，评论漏了什么、或者引用了指南里根本没写的规则，就去改指南文件。他们改了好几轮指南。作者还建议：真实 PR 跑一个月左右，prompt 也要重写，把第一版当草稿。

还有一条关于交接的教训：

<Trans zh="还有一个教训：让匹配代理的输出保持乏味。">“One more lesson: keep the matcher’s output dull.”</Trans>它只应该列文件路径和指南名，别的都不要。<Trans zh="如果匹配代理加上自己的观察，审查代理就会把它们当作已经得出的结论。">“If the matcher adds its own observations, the reviewer treats them as conclusions that have already been reached.”</Trans>

最后，作者算了一笔账：如果评论不好，速度没有意义。一个 7 分钟就跑完、但开发者得逐条驳回的审查，花掉的比省下的多。

我觉得“匹配输出要乏味”是一条很通用的多代理交接规则。上游代理写进交接文件的每一句判断，都会被下游当作事实。交接文件只放下游需要的结构化事实，判断留给下游自己做。

### 3.6 什么时候值得拆，怎么上线

**不值得的情况**：如果仓库只有一份贡献指南，跳过匹配代理，它每次都会选同一份文档。只有当不同目录有不同负责人、而且这些负责人已经写下了自己怎么审查时，第二个代理才物有所值。

作者给的三条建议：

1. **先写指南，再写 prompt**：审查代理留下的每一条评论都能追溯到某个指南文件。给每个区域在仓库里一份自己的文件，写进那个团队在审查中真正会争论的情况，而不是通用的最佳实践。
2. **每个代理一个职责，用产物通信**：一个选文档，一个按文档审。匹配代理一开始审查，或者审查代理的 prompt 里被贴进所有指南，你就又回到了“一个代理拿着所有东西”。
3. **先手动跑，批准权留给人**：开自动触发前，先在几个真实 PR 上手动跑；和作者一起读第一批评论，评论漏了就改指南文件。<Trans zh="每次运行结果都有差异，所以批准权留在人手里。">“Runs vary, so approval stays with people.”</Trans>

同样的拆分也适用于更窄的专项检查，比如无障碍：给它单独一步，按需运行。

文末是产品说明：Agentic Pipelines 目前是 Bitbucket Cloud 上的 beta；用 Rovo Dev 需要付费的 Bitbucket Cloud 计划加 Rovo Dev Standard 订阅，用 Claude 或 Codex 则走组织已有的账号计费。作者还提到他们用同样的“窄职责代理 + 人检查结果”模式做漏洞修复、清理过期功能开关和更新文档。

## 4. 结果与局限

**文中真正给出的**

- 一次超大 PR 上两步约 7 分钟（单次运行，作者明说不是基准），对比过去首轮审查等待半天到一天。
- 两段完整 prompt 和一份简化流水线配置。
- 几条具体失败：评论跑题到没改的代码、代理写脚本不留评论、示例 PR 编号导致审错 PR。

**没有给出的**

- 评论的采纳率、误报率、被驳回比例，都没有数据。
- 改指南前后评论质量的对比也没有量化。

**局限与注意**

- 方案绑定 Bitbucket Agentic Pipelines（beta）和 Bitbucket MCP server；在 GitHub 上要自己搭等价的两步和产物传递。
- “不准建文件、不准推提交”主要靠 prompt 约束；硬约束是只给读 PR 和评论的 scope，作者也提醒要按工具表核对 scope。
- 文章发在 Atlassian 产品博客上，文末导向产品开通，带推广成分。

## 5. 结论

在多团队共用的大仓库里，AI 审查的问题往往不是模型不够聪明，而是一次给了它太多不相关的规则。把“选规则”和“按规则审”拆成两个代理，用一个只列路径和指南名的产物文件交接，再给两个代理都写清“不准做什么、什么时候停”。之后真正决定评论质量的，是各团队的指南文件，以及“评论错了就改指南”的反馈循环。

**你可以这样试**

1. 盘点你的仓库：有几份审查指南？分别覆盖哪些目录、谁负责？只有一份就别拆。
2. 把匹配步骤的输出格式定死为“路径 → 指南文件”两列，不允许写任何观察。
3. 两个代理的 prompt 各加一段“不准做什么”和“什么情况下停止”；所有 PR 编号、分支名只从流水线变量里取。
4. 先手动在 5 个真实 PR 上跑，和 PR 作者一起逐条看评论；每条无用评论都追到对应的指南文件去改。
5. 对照 [[75]] 把审查规则写进 AGENTS.md 的做法，以及 [[33]] Bugbot 用解决率迭代审查器的做法，决定你的评论质量用什么指标衡量。

**读完自测**

1. 修 CSS bug 的开发者为什么会收到关于数据获取的评论？
2. 匹配代理的 prompt 为什么主要在写“不准做什么”？
3. 为什么 PR 编号必须来自流水线变量？
4. 匹配代理的输出为什么要“乏味”？
5. 什么样的仓库不需要匹配这一步？
