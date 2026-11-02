# 固定模型比外壳：GitHub 如何评 Copilot agentic harness

<div class="meta-tags"><span class="tool-tag tool-general">通用（不限工具）</span></div>

<div class="hook">

**一句话看懂**：GitHub 把 Copilot CLI / 应用 / 代码审查背后的 agentic harness 当成同一块共享组件来迭代。评测时尽量固定模型、题目，并归一上下文窗口、reasoning、工具与 MCP，再和 Claude Code、Codex CLI 对照。正文主张：完成率大致持平，多数配置更省 token；真正可带走的是 Methodology 里的控变量清单与 TerminalBench 上的多跑方差读法——图表里的精确百分点正文几乎不写。

</div>

## 读完你能带走的 6 条收获

1. **比 harness 先锁模型与题**：同模型、同基准任务，再归一上下文窗、reasoning effort、工具选择与 MCP，否则比的是一锅粥（见 3.1）。
2. **完成率持平仍可能有 harness 价值**：作者主张跨外壳差异落在模型随机方差内，同时多数配置 token 更低；多模型灵活性是厂商 harness 不易给的（见 3.2）。
3. **看散点时要看方差椭圆**：TerminalBench 2.0 上每配置至少 5 次，点旁 ±1σ 椭圆；重叠就不要宣布胜利（见 3.3）。
4. **小基准的 “best of 5” 会偏乐观**：Methodology 写明 <100 实例时五跑取最佳；与公开榜（常更高 reasoning）也不可直接比（见 3.4）。
5. **基础设施失败与模型错误要分开处理**：缺数据 / 基建失败重跑到任务齐；模型生成错误保留计入（见 3.4）。
6. **基准只是信号之一**：作者自己把线上指标与线上实验并列；读厂商自报时把方法学权重压过标题百分比（见 4）。

::: tip 小白先懂这几个词
- [Harness（代理外壳）](/glossary#harness)：工具、上下文与工作流的编排层；本文强调它与模型可分开评。
- [pass@k / pass^k](/glossary#pass-at-k)：文中全部指标按 pass@1 报告。
- [SWE-bench](/glossary#swe-bench)：公开编程代理基准；文中用 Verified 与更难的 Pro。
- TerminalBench：偏终端 / CLI 工作流的基准；文中分析的是 2.0，89 题。
- Reasoning effort：厂商 API 里控制“想多久”的档位；本文主比较固定为 medium。
- Rubber Duck：文中示例——跨模型家族互相批评的 harness 级能力。
:::

## 1. 基本信息

<SourceCard type="文章" title="Evaluating performance and efficiency of the GitHub Copilot agentic harness across models and tasks" author="Shibani Basava & Carlos Castro" date="2026-06-25" url="https://github.blog/ai-and-ml/github-copilot/evaluating-performance-and-efficiency-of-the-github-copilot-agentic-harness-across-models-and-tasks/" />

| 项目 | 内容 |
|---|---|
| 链接 | https://github.blog/ai-and-ml/github-copilot/evaluating-performance-and-efficiency-of-the-github-copilot-agentic-harness-across-models-and-tasks/ |
| 类型 | 文章（GitHub Blog） |
| 作者 | Shibani Basava & Carlos Castro |
| 发布日期 | 2026-06-25 |
| 使用工具 | 通用；比较对象为 Copilot CLI vs Claude Code（Sonnet 4.6 / Opus 4.7）与 Codex CLI（GPT‑5.4 / GPT‑5.5） |
| 分析依据 | 原文全文（2026-11-02 抓取；源码含 HTML 实体，引语按正文语义核对）。完成率 / token 的具体百分点多在图中，正文几乎不给可抄数字——本站不补造。厂商自报，见第 4 节。“我觉得”开头为本站评论。 |

## 2. 这篇在回答什么

开篇把分工说死：

::: tr 模型提供原始智力，harness 决定这份智力能被多有效地用上。
> "While the model provides the raw intelligence, the harness shapes how effectively that intelligence is applied."
:::

Copilot 的 agentic harness 是 Copilot SDK 里的共享组件，驱动 CLI、应用、代码审查以及 GitHub / Microsoft 上多种体验——改 harness，所有表面受益。目标画像：快、省 token、对开发者可预期。

文章要回答：

1. 怎样尽量公平地比较“Copilot harness vs 模型厂商自带 harness”？
2. 在固定模型时，他们观察到的完成率与 token 效率关系是什么？
3. 读这些图时，Methodology 里哪些细节会改变结论？

```mermaid
flowchart LR
  A["固定模型"] --> B["固定基准题"]
  B --> C["归一: 窗口 / reasoning<br/>工具 / MCP"]
  C --> D["Copilot CLI vs<br/>Claude Code / Codex CLI"]
  D --> E["完成率 + token / 成本"]
  E --> F["多跑看方差<br/>再下结论"]
```

## 3. 怎么做

### 3.1 控变量：先让比较说得清

公开基准（行业标准）与内部基准（GitHub / Microsoft 大库衍生）一起用，再配线上指标与线上实验。作者写明要尽可能控制变量：同一模型、同一基准任务，并在上下文窗口、reasoning effort、工具选择与 MCP 服务器上归一——原文用的是 <Trans zh="尽可能控制变量">“We control as many variables as possible”</Trans>，以及 <Trans zh="同一模型">“use the same model”</Trans> 与 <Trans zh="在上下文窗口、reasoning efforts、工具选择和 MCP 服务器上归一">“normalized on context window, reasoning efforts, tool selection, and MCP servers”</Trans>。

报告子集用的模型：Claude Sonnet 4.6、Claude Opus 4.7、GPT‑5.4、GPT‑5.5。对照方：前两者对 Claude Code，后两者对 Codex CLI。

基准表：

| 基准 | 领域 | 目的（原文） |
|---|---|---|
| SWE-bench Verified | 500 道经人验证的开源 Python 修 bug | 行业标准 |
| SWE-bench Pro | 更难、多步、更大改动 | 更接近复杂真实工程 |
| SkillsBench | 会不会用 skills 解题 | 扩展性与 skill 触发 |
| TerminalBench | 终端任务 | CLI 工作流 |
| Win-Hill | 内部，Windows 容器 | 跨 OS / 环境是否泛化 |

### 3.2 主张：完成率持平，token 常更低

在模型与任务固定时，作者称 Copilot harness 的任务完成率与模型厂商 harness **大致持平**，同时在多数配置上 token 消耗更低。完成率部分的定性结论是：

::: tr 这些结果反映的是有效持平，因为任一方向的差异都落在模型随机性带来的方差内，使得跨 harness 表现可视为相当。
> "These results reflect effective parity, since the differences in either direction are within the variance due to the stochastic nature of the models, making the cross-harness performance on-par."
:::

多模型（文称 20+ 前沿模型，含 GPT / Claude / Gemini / MAI，以及自备 key 的开源与本地模型）被写成厂商外壳不易提供的能力；举例 Rubber Duck：跨模型家族互相批评。Auto model selection 可按任务意图与模型健康度平衡省 token。

注意：正文**没有**给出“省了百分之几 token”或“完成率具体是多少”的可抄数字——那些在图里。本站只转述文字结论。

### 3.3 TerminalBench：把方差画出来

TerminalBench 2.0 被当作“完成率 + 成本 + 方差”的样例读法。每个点是一种代理×模型配置：纵轴解决率，横轴每题美元成本；阴影椭圆是跑间 ±1σ。作者列三点：

1. 在所评配置上，Copilot 在完成率与每题成本上不差于或优于同模型对照；紫点与对照的椭圆在两轴上几乎都重叠——差异落在跑间方差内；Copilot 未出现“完成率更低”或“成本更靠右”。
2. 每组至少 5 次；椭圆越紧越可复现。
3. 图上可见权衡：GPT 侧偏性价比，Claude Opus 侧偏最高解决率、更贵；一个 harness 同时提供两端，可按任务选。

我觉得这张“椭圆重叠就别宣布胜利”的读法，比任何营销句都更值得学——和 [[50]] 讲的基础设施噪声、[[19]] 的 pass@k 是同一类纪律。

### 3.4 Methodology：比标题百分比更重要

可控可复现的细则：

- 全部跑：**两小时超时**；非交互、单轮；禁用 web 工具；允许全部工具。
- **TerminalBench2 分析**：代理默认设置，reasoning 设为 medium（例：Claude Code 开 tool search；Copilot CLI 用 `github-mcp-server`）。Codex / Claude Code 走 Anthropic / OpenAI 直连。基建或缺失数据重跑，直到 89 题都有结果；**模型生成错误保留、不剔除**。每模型五次独立跑；Copilot 另做两批以便分别对照 Claude Code 与 Codex。
- **所有基准**：代理×模型对归一到相同上下文窗、相同 prompt token 上限、reasoning medium；**无 tool search、无 MCP**；保留各 harness 默认内置工具。基建异常与网络访问效应在跨代理比较中剔除。对较小基准（<100 实例）做五次独立跑，**报告得分最佳的一次**。指标均为 pass@1。
- 这些归一化意味着：**结果与公开榜提交不可直接比**——公开提交通常用更高 reasoning 与其它调参。

## 4. 结果与局限

**文中站住的结果**：控变量框架；“完成率有效持平 + 多数配置更省 token”的定性主张；TB2 多跑与椭圆读法；Methodology 全文级细节。

**局限**：

- **厂商自报**，图未在正文给出可逐字抄写的百分点；外人也难复现 Win-Hill 等内部集。
- <100 题取 **best of 5** 会抬高分数；与“有效持平”叙事叠加时，读者应更信任方差叙述而非峰值。
- TB2 分析与“全基准”设置不完全相同（前者允许 tool search / github-mcp-server，后者关掉）——比不同图时不要混用条件。
- 与 [[123]] 对照：SnowPR 给出大量可核对私有仓数字；本文方法学公开、数字多在图里。两者一内一外，都强调“固定模型再比 harness”。

## 5. 结论

::: tr 基准只是若干信号之一。
> "Benchmarks are just one signal among several."
:::

若你要评估自己的外壳或提示改动：先抄他们的控变量清单，再决定跑几次、报告的是 best 还是均值，最后才看点有没有落到对照的方差椭圆之外。

**你可以这样试**

1. 选 20–50 道固定题，锁一个模型，只改 harness 或只改提示，归一窗口与 reasoning。
2. 每配置至少跑 5 次，同时看均值、最佳与散度——不要只报最佳。
3. 把“基建失败重跑 / 模型错误保留”写进评测 runbook。

**读完自测**

1. 为什么公开榜分数不能和文中表格直接比？
2. best of 5 会怎样影响你对“持平”的解读？
3. 固定模型比较 harness 时，至少要归一哪些变量？
