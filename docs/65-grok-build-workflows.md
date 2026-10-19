# 一个对话装不下的大任务怎么办：Grok Build 的 Workflows

<div class="meta-tags"><span class="tool-tag tool-grokbuild">Grok Build</span></div>

<div class="hook">

**一句话看懂**：这是 xAI 的一篇很短的产品公告（正文约 480 词）。Grok Build 现在可以自己写一个“编排脚本”：把一个大任务分成几个阶段，每个阶段扇出给很多并行代理，后面安排一个核验阶段，最后汇总成一份报告，全程在后台跑，你的会话可以继续干别的。跑得好的脚本可以存下来，变成团队共享、带参数的 slash 命令。原文只讲了“是什么、什么时候用”，没有效果数据、成本和失败案例，所以本文也写得短。

</div>

## 读完你能带走的 4 条收获

1. **判断标准很简单**：任务能拆成很多独立的块、最后要的是一份清楚的报告，就适合用 workflow（见 3.1）。
2. **每个代理从干净、聚焦的上下文开始**，结果再按阶段往上汇总（见 3.2）。
3. **把核验写进流程**：比如让独立的“怀疑者”在每条发现进入报告前先核实一遍（见 3.2）。
4. **跑通一次就存下来**：放在仓库的 `.grok/workflows/` 里就是团队共享的命令，下次只要 `/pr-review 5137`（见 3.3）。

::: tip 小白先懂这几个词
- [Grok Build](/glossary#grok-build)：xAI 出品的终端编码代理。
- [Fan-out（扇出）](/glossary#fan-out)：把一个任务拆开，同时派给很多代理。
- [Grok Build Workflows](/glossary#grok-workflows)：Grok 写好、在后台跑的多阶段扇出脚本。
- [Slash Command（斜杠命令）](/glossary#slash-command)：输入 `/名字` 就能触发的一段预设流程。
- [Adversarial Review（对抗式审查）](/glossary#adversarial-review)：专门找别人结论里的错。
:::

## 1. 基本信息

<SourceCard type="文章" title="Workflows in Grok Build" author="xAI" date="2026-07-23" url="https://x.ai/news/workflows" />

| 项目 | 内容 |
|---|---|
| 链接 | https://x.ai/news/workflows |
| 类型 | x.ai 新闻页的产品公告（正文约 480 词，含一段终端演示动画） |
| 作者 | 未署个人名，页面元数据里的作者是机构。页面标题写作“Workflows in Grok Build \| SpaceXSI”，页脚是“© 2026 SpaceXAI LLC”；本站按域名写作 xAI |
| 发布日期 | 2026-07-23（页面显示 Jul 23, 2026） |
| 使用工具 | Grok Build、`/workflows`、内建的 `/deep-research`；演示里的模型标注为 Grok 4.5 |
| 分析依据 | 原文全文，2026-10-19 用 curl 抓取，引语逐字核对。演示动画只读了页面上的文字，没有看动画本身。文章是产品宣传，没有任何效果数据。“我觉得”开头的段落是本站评论。 |

## 2. 这篇在回答什么

站内 [[15§3.2]] 里，有人用 Grok Build 一次派出 57 个子代理审查 57 个文件，再加一轮对抗式验证。那是在一个对话里手动指挥出来的。这篇公告说的是：这件事现在可以交给 Grok 自己规划、在后台跑，并且存成可复用的命令。

<Trans zh="Grok Build 现在可以运行 workflow：用平实的语言描述一个大任务，Grok 会规划它，在后台把它扇出给数百个并行代理，全部完成后再向你汇报。整个过程中你的会话一直空闲可用。">“Grok Build can now run workflows: describe a large task in plain language, and Grok plans it, fans it out across hundreds of parallel agents in the background, and reports back when everything is done. Your session stays free the whole time.”</Trans>

页面上的演示是审查一个 GitHub PR：一个叫 `pr-review` 的 workflow，分 Context、Review、Verify、Synthesize 四个阶段，预算 128 个代理。演示里的说明文字是“拉取上下文，扇出专长审查者，对发现做对抗式核验，汇总成一份排好序的报告”。

## 3. 怎么用

### 3.1 什么时候用

原文给的例子是：审查一个大 PR 里的每个功能、分诊最近 100 个 issue、在整个代码库里审计某一类 bug。判断标准是：

<Trans zh="如果工作能拆成很多独立的块，并且最后应该落到一份清楚的报告上，就请求一个 workflow。">“If the work splits into many independent pieces and should end in one clear report, ask for a workflow.”</Trans>

原文给了三个可以直接试的说法：

- “use a workflow to review each feature in this PR”
- “triage the last 100 Linear issues and give me a top-10 action list”
- “audit every route handler for missing auth checks, and verify each finding”

### 3.2 它怎么工作

Grok 把任务规划成一个小脚本：有哪些阶段、每个阶段用哪些代理、结果怎么汇总。

<Trans zh="每个代理都从一份干净、聚焦的上下文开始，而计划里可以内建单次处理做不到的检查，比如让独立的怀疑者在每条发现进入最终报告之前先核实它。">“Each agent starts with a clean, focused context, and the plan can build in checks a single pass can't, like independent skeptics verifying every finding before it reaches the final report.”</Trans>

每次运行默认有 128 个代理的预算，大任务最多 1,024 个。进度边跑边保存，暂停再恢复不会重做已经完成的部分。运行 `/workflows` 可以按阶段实时看进度，每个代理的 token 用量也看得到。

### 3.3 保存和复用

脚本不用你写：Grok 根据你的请求编写，发起前先做一次冒烟检查，在两次运行之间改进它。跑得好就留下来：放在仓库 `.grok/workflows/` 里的和团队共享，放在 `~/.grok/workflows/` 里的跟着你个人走。每个保存的 workflow 都变成一个能带参数的 slash 命令：

<Trans zh="所以一旦你留下了上面演示里的 PR 审查，下一次审查只需要 /pr-review 5137。">“so once you keep the PR review from the demo above, the next review is just /pr-review 5137.”</Trans>

Grok Build 还自带一个 `/deep-research`：把研究问题扇出给并行的调查者，对照来源核实每一条说法，返回一份带引用的报告。

## 4. 局限

- **只是公告**：没有效果数据、没有成本、没有失败案例，也没有和“在一个对话里手动派子代理”做比较。
- **成本不清楚**：128 个、最多 1,024 个代理是预算上限，原文没有说一次运行通常花多少 token、多少钱、多长时间。
- **脚本长什么样不清楚**：原文说“你从来不用自己写脚本”，但没有说脚本用什么写、能不能读和改、团队共享时怎么审查。
- **核验阶段的质量没有数据**：“独立怀疑者核实每条发现”是能力描述，没有说误报和漏报的情况。
- **品牌名称**：页面标题和页脚写的是 SpaceXSI / SpaceXAI LLC，和 x.ai 域名、xAI 的叫法不一致，本站照录。

## 5. 结论

我觉得这篇的价值不在功能本身，而在三个可以带到任何代理上的习惯：先判断任务能不能拆成独立的块、最后要不要一份报告；把核验写成流程里的一个阶段，而不是事后想起来再查；跑通一次就存成带参数的命令，让团队下次不用重新描述。这三点在 [[15§3.3]]（对抗式验证）和 [[58§3.1]]（协调者只派活）里都出现过，这篇把它们打包成了一个产品功能。

评分偏低，是因为原文太短：读完你知道它能做什么，但不知道它做得怎么样。

**你可以这样试**

1. 用原文的第三个例子，在自己的仓库上跑一次“审计所有路由处理函数有没有漏掉鉴权检查，并核实每一条发现”，然后人工抽查报告里排前五的发现。
2. 如果结果可用，把它存进 `.grok/workflows/`，在下一次代码审计时直接用命令跑，比较两次报告的差别。

**读完自测**

- 原文给的“什么时候该用 workflow”的判断标准是什么？
- workflow 里的“怀疑者”起什么作用？为什么单次处理做不到？
