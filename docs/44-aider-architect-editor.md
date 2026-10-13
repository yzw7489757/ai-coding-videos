# 让一个模型想、另一个模型改：Aider 的 Architect / Editor 双模型模式

<div class="meta-tags"><span class="tool-tag tool-aider">Aider</span></div>

<div class="hook">

**一句话看懂**：Aider 要求模型在一次回答里既解决编码问题、又输出严格格式的文件编辑指令，模型的注意力被一分为二。Architect / Editor 模式把这件事拆成两次推理：**Architect（架构师）模型只管描述怎么解决，用它习惯的方式写；Editor（编辑者）模型只管把方案变成格式正确的代码编辑**。在 Aider 的代码编辑基准上，o1-preview 当 Architect、DeepSeek 或 o1-mini 当 Editor 拿到 85%，Sonnet、GPT-4o、GPT-4o-mini 和自己搭档也都比单独使用分数更高。

</div>

::: info 为什么值得看
本站一直缺 Aider 的资料。这篇是 2024 年 9 月的老文章，模型都已过时，但它讲清了一个今天仍常见的设计：**推理和输出格式分开，交给不同的模型**。Codex 的 `apply_patch`（[#09](/09-how-codex-works)）、Amp 把推理模型做成子代理（[#35](/35-amp-next-generation-ai-coding)），都可以和它对照着看。文章有完整的基准对照表，数据可以核对。
:::

::: tip 小白先懂这几个词
- [Architect / Editor（架构师 / 编辑者双模型）](/glossary#architect-editor)：一个模型负责想方案，另一个模型负责把方案落成代码编辑。
- [Edit Format（编辑格式）](/glossary#edit-format)：代理要求模型用特定文本格式（整文件、diff 等）输出改动，程序才能自动应用。
- [Benchmark（基准测试）](/glossary#benchmark)：固定的测试集，用来比较不同模型或配置。
- [Reasoning Effort（推理强度）](/glossary#reasoning-effort)：推理模型花多少“思考”在一个问题上。
- [Harness（代理外壳）](/glossary#harness)：包在模型外面、负责提示词和工具的程序。
:::

## 1. 基本信息

<SourceCard type="文章" title="Separating code reasoning and editing" author="Paul Gauthier（Aider）" date="2024-09-26" url="https://aider.chat/2024/09/26/architect.html" />

| 项目 | 内容 |
|---|---|
| 链接 | https://aider.chat/2024/09/26/architect.html |
| 类型 | 开源项目官方博客（文章） |
| 作者 | Paul Gauthier（Aider 作者） |
| 发布日期 | 2024-09-26 |
| 使用工具 | Aider（`--architect` 聊天模式）；o1-preview、o1-mini、Claude 3.5 Sonnet、GPT-4o、GPT-4o-mini、DeepSeek |
| 分析依据 | Aider 官方博客原文全文，2026-10-13 用 curl 抓取。基准数字和命令为原文逐字摘录。页面本身没有署名，作者记为 Aider 的作者兼维护者 Paul Gauthier（未能在该页面上直接核实）。**注意时效**：发布已超过两年，文中模型都已被替代，`--architect` 的默认模型配置以 Aider 当前文档为准。 |

## 2. 做了什么

::: tr 把“代码推理”和“代码编辑”这样拆开，在 aider 的代码编辑基准上取得了 SOTA 结果。
> "Splitting up “code reasoning” and “code editing” in this manner has produced SOTA results on aider’s code editing benchmark."
:::

**动机**：OpenAI 的 o1 模型推理很强，但经常输出格式不对的代码编辑指令。更好的办法是让它随意描述方案，再交给一个更传统的模型去生成编辑指令。作者也说，以前串联两个模型太慢，不符合 Aider “交互式结对编程”的目标；前沿模型变快变便宜之后，这个方案才变得可行。

```mermaid
flowchart LR
    U["用户的编码请求"] --> A["Architect 模型<br/>只想怎么解决<br/>用它习惯的方式描述"]
    A -- "方案描述" --> E["Editor 模型<br/>只管把方案变成<br/>格式正确的文件编辑"]
    E -- "whole / diff 格式" --> F["Aider 把编辑应用到本地文件"]
```

## 3. 怎么做的

### 3.1 问题：一次回答要同时做两件事

Aider 平时让模型在一个提示里解决问题，并返回一系列格式良好的文件编辑。所有编辑格式都要求模型用特定文本格式返回改动，Aider 才能自动应用到本地文件。

::: tr 因为这一切都发生在与 LLM 的一次提示 / 回答往返里，模型必须把注意力分给解决编码问题和遵守编辑格式两件事。
> "Because this all happens in a single prompt/response round trip to the LLM, the model has to split its attention between solving the coding problem and conforming to the edit format."
:::

### 3.2 拆成两步、可以用两个模型

- **Architect**：解决编码问题，<Trans zh="用它自然的方式描述方案">“describe the solution however comes naturally to it”</Trans>。
- **Editor**：把提出的方案变成一系列格式正确的代码编辑，不需要怎么推理问题本身。
- 两个角色可以分给各自合适的模型：强推理模型（如 o1-preview）做 Architect；Editor 按成本、速度和代码编辑能力挑选。

### 3.3 怎么用

原文给出的命令（逐字摘录，2026-10-13 抓取；模型名是 2024 年的）：

::: tr 安装 aider；进入 git 仓库；用 Claude 3.5 Sonnet 同时当 Architect 和 Editor；或用 OpenAI 模型，以 gpt-4o 作为 Editor。
```bash
pip install -U aider-chat

# Change directory into a git repo
cd /to/your/git/repo

# Work with Claude 3.5 Sonnet as the Architect and Editor
export ANTHROPIC_API_KEY=your-key-goes-here
aider --sonnet --architect

# Work with OpenAI models, using gpt-4o as the Editor
export OPENAI_API_KEY=your-key-goes-here
aider --4o --architect
aider --o1-mini --architect
aider --o1-preview --architect
```
:::

`--architect` 是 `--chat-mode architect` 的简写；architect 是 Aider 的一种聊天模式。

## 4. 结果如何

Aider 代码编辑基准的部分结果（原文表格摘录；“基线”为该模型单独使用 Aider 普通 code 模式的分数）：

| Architect | Editor | 编辑格式 | 分数 |
|---|---|---|---|
| o1-preview | o1-mini | whole | 85.0% |
| o1-preview | deepseek | whole | 85.0% |
| o1-preview | claude-3-5-sonnet | diff | 82.7% |
| o1-preview | 基线 | diff | 79.7% |
| claude-3.5-sonnet | claude-3.5-sonnet | diff | 80.5% |
| claude-3.5-sonnet | 基线 | diff | 77.4% |
| gpt-4o | gpt-4o | diff | 75.2% |
| gpt-4o | 基线 | diff | 71.4% |
| o1-mini | deepseek | whole | 71.4% |
| o1-mini | 基线 | diff | 61.1% |
| gpt-4o-mini | gpt-4o-mini | whole | 60.2% |
| gpt-4o-mini | 基线 | whole | 55.6% |

作者的观察：

- 85% 的 SOTA 用的是 “whole” 格式（Editor 要输出每个文件的完整新版本），两步都很慢，<Trans zh="大概不适合在 aider 里交互使用">“probably not practical for interactive use with aider”</Trans>。
- o1-preview + Sonnet 当 Editor 是第二好的结果，对能同时用两家服务的用户来说完全实用。
- 很多模型和自己搭档也有明显提升：Sonnet、GPT-4o、GPT-4o-mini 都更高。
- DeepSeek 当 Editor 出奇地好；用高效的 “diff” 格式时，它帮了除 Sonnet 之外的所有 Architect。

::: warning 局限与注意
- **时效**：2024 年 9 月发布，o1-preview 等模型早已更新换代；今天的推理模型输出编辑格式的能力也强得多，提升幅度不能直接套用。
- 只在 Aider 自己的代码编辑基准上测试，没有真实项目数据；每个配置的运行次数、方差没有给出。
- 两次推理意味着更高的延迟和成本，原文只对 whole 格式说了“慢”，没有给出具体时间或费用。
- 原文标注为“实验性支持”。
:::

## 5. 可借鉴之处

1. **推理和格式化可以分开**：模型被要求同时“想清楚”和“严格按格式输出”时，两件事会互相干扰。
2. **按角色选模型**：贵的强推理模型只负责想方案，便宜快速的模型负责机械地落成编辑。
3. **同一个模型分两步也可能更好**：不换模型，只把一次回答拆成两次，Sonnet、GPT-4o 的分数都提高了。
4. **用基准验证组合**：作者给每种组合都和“单独使用”的基线比较，而不是凭感觉。
5. **注意延迟**：两步串联对交互式工具是真成本，要按场景取舍。

### 你可以这样试

- [ ] 如果你用 Aider，在一个中等难度的改动上分别用普通模式和 `--architect` 跑一次，比较改动质量和耗时。
- [ ] 在别的代理里模拟这个模式：先让模型只写“改动方案”（不写代码），确认后再让它（或另一个更便宜的模型）实施。
- [ ] 遇到模型频繁输出格式错误的补丁时，检查是不是让它在一次回答里做了太多事。

::: details 读完自测（点开看答案）
1. **为什么要把推理和编辑分开？** 一次回答里模型要同时解决问题和遵守编辑格式，注意力被分散；o1 推理强但常输出格式错误的编辑。
2. **Architect 和 Editor 各做什么？** Architect 用自然的方式描述怎么解决；Editor 把方案变成格式正确的代码编辑。
3. **最高分是多少、为什么不实用？** 85%，o1-preview + o1-mini 或 DeepSeek，用 whole 格式，两步都很慢，不适合交互使用。
4. **不换模型也有用吗？** 有：Sonnet、GPT-4o、GPT-4o-mini 和自己搭档时都比单独使用分数更高。
:::
