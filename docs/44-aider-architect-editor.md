# 让一个模型想、另一个模型写：Aider 的 Architect / Editor 双模型模式

<div class="meta-tags"><span class="tool-tag tool-aider">Aider</span></div>

<div class="hook">

**一句话看懂**：编码代理通常要求模型在一次回答里同时做两件事：想清楚怎么改，再按严格的格式写出编辑指令。推理强的模型（当时的 o1）常常想对了、格式却写错。Aider 的办法是拆成两步：**Architect 模型只管描述方案，Editor 模型只管把方案写成格式正确的代码编辑**。在 Aider 的代码编辑基准上，o1-preview 当 Architect、DeepSeek 或 o1-mini 当 Editor 拿到 85% 的最高分；Sonnet、GPT-4o 这些模型和自己配对，也比单独使用分数更高。这是 2024 年的文章，模型早已换代，但“推理和格式分开”的思路今天仍然适用。

</div>

## 读完你能带走的 5 条收获

1. **一次回答同时“解题”和“守格式”，模型的注意力会被分散。** 推理强的模型尤其容易想对了、格式写错（见 3.1）。
2. **拆成两步，两个角色可以用不同模型**：强推理模型当 Architect，Editor 按成本、速度和编辑能力挑（见 3.2）。
3. **同一个模型和自己配对，也可能比单独使用更好**：Sonnet、GPT-4o、GPT-4o-mini 都是这样（见 4）。
4. **最高分不等于最好用**：85% 的组合要输出整份文件，两步都慢，不适合交互；o1-preview + Sonnet（82.7%）才是实用配置（见 4）。
5. **在 Aider 里一条参数就能打开**：`aider --sonnet --architect`（见 3.3）。

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
| 类型 | 开源项目官方博客（文章，约 900 词 + 结果表） |
| 作者 | Paul Gauthier（Aider 作者） |
| 发布日期 | 2024-09-26 |
| 使用工具 | Aider（`--architect` 聊天模式）；o1-preview、o1-mini、Claude 3.5 Sonnet、GPT-4o、GPT-4o-mini、DeepSeek |
| 分析依据 | Aider 官方博客原文全文，2026-10-14 用 curl 重新抓取并逐字核对引语。基准数字和命令为原文逐字摘录。页面本身没有署名，作者记为 Aider 的作者兼维护者 Paul Gauthier（未能在该页面上直接核实）。**注意时效**：发布已超过两年，文中模型都已被替代，`--architect` 的默认模型配置以 Aider 当前文档为准。原文没有给出延迟和成本数字。“我觉得”开头的段落是本站评论。 |

## 2. 这篇在回答什么

假设你换上了一个推理很强的新模型，让代理改代码。它的分析头头是道，可一到输出补丁就出问题：diff 的行号对不上、搜索替换块的格式缺了一行，代理没法把改动应用到文件上。

2024 年 o1 模型刚发布时，Aider 的作者就遇到了这个问题：

<Trans zh="它们推理很强，但常常输出格式不对的代码编辑指令。">“They are strong at reasoning, but often fail to output properly formatted code editing instructions.”</Trans>

这篇文章回答三个问题：

1. 为什么一次回答做两件事会出问题？（3.1）
2. 怎么拆，两个角色怎么选模型？（3.2）
3. 怎么用？（3.3）

结果和数字在第 4 节。

```mermaid
flowchart LR
  T["编码任务"] --> A["Architect<br/>强推理模型<br/>自由描述方案"]
  A --> E["Editor<br/>按成本、速度、编辑能力选<br/>写成格式正确的编辑"]
  E --> F["Aider 应用到源文件"]
```

## 3. 怎么做

### 3.1 问题：一次回答要同时做两件事

Aider 平时的做法是：一次提示词里让模型解释方案，并返回一串格式规范的文件编辑。Aider 所有的编辑格式都要求模型按特定的文本格式返回改动，这样程序才能解析并应用到本地文件。

问题在于这一切发生在一次请求 / 响应里：

<Trans zh="模型要在解决编码问题和遵守编辑格式之间分配注意力。">“the model has to split its attention between solving the coding problem and conforming to the edit format.”</Trans>

打个比方：让一个人一边解数学题，一边用规定的字体、格式誊写在答题卡上。题越难，格式越容易出错；格式要求越严，越难专心解题。

### 3.2 拆成两步、可以用两个模型

Architect / Editor 模式把一次推理拆成两次，可能用两个不同的模型：

1. **Architect**：解决编码问题，用它自己习惯的方式描述方案。
2. **Editor**：把方案变成一串格式正确的代码编辑，不需要怎么思考问题本身。

这样两个角色都能专心：

<Trans zh="可以把 Architect 和 Editor 两个角色分配给各自擅长的 LLM。">“We can assign the Architect and Editor roles to LLMs which are well suited to their needs.”</Trans>

o1-preview 这样的强推理模型适合当 Architect；Editor 则按成本、速度和代码编辑能力挑选。

为什么到 2024 年才值得这么做？作者说，以前把几个旧模型串起来会非常慢，不符合 Aider 交互式结对编程的定位。是前沿模型在速度和成本上的快速改善，让两步调用变得可以接受。

我觉得这个思路今天依然适用，只是形式变了。很多代理工具让一个模型做计划、另一个模型执行，或者把推理模型做成子代理供主代理调用（[[35§3.4]]），本质上都是把“想”和“按格式写”分开。

### 3.3 怎么用

文章发布时，Aider 的开发版已经内置了 o1-preview、o1-mini、GPT-4o 和 Claude 3.5 Sonnet 的默认配置。原文给的命令：

::: tr 安装 Aider；进入 git 仓库；用 Sonnet 同时当 Architect 和 Editor；或用 OpenAI 模型，以 gpt-4o 当 Editor。
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

`--architect` 是 `--chat-mode architect` 的简写，architect 是 Aider 新增的一种聊天模式。文中的模型都已过时，今天用时以 Aider 当前文档的默认配置为准。

## 4. 结果与局限

原文完整结果表（Aider 代码编辑基准的通过率；“Baseline”指这个模型单独在 Aider 普通 code 模式下的分数）：

| Architect | Editor | 编辑格式 | 通过率 |
|---|---|---|---|
| o1-preview | o1-mini | whole | 85.0% |
| o1-preview | deepseek | whole | 85.0% |
| o1-preview | claude-3-5-sonnet | diff | 82.7% |
| o1-preview | deepseek | diff | 80.5% |
| o1-preview | gpt-4o | diff | 80.5% |
| o1-preview | Baseline | diff | 79.7% |
| claude-3.5-sonnet | claude-3.5-sonnet | diff | 80.5% |
| claude-3.5-sonnet | deepseek | diff | 78.9% |
| claude-3.5-sonnet | deepseek | whole | 78.9% |
| claude-3.5-sonnet | Baseline | diff | 77.4% |
| gpt-4o | gpt-4o | diff | 75.2% |
| gpt-4o | deepseek | diff | 74.4% |
| gpt-4o | deepseek | whole | 73.7% |
| gpt-4o | Baseline | diff | 71.4% |
| o1-mini | deepseek | whole | 71.4% |
| o1-mini | gpt-4o | diff | 70.7% |
| o1-mini | deepseek | diff | 69.2% |
| o1-mini | Baseline | diff | 61.1% |
| gpt-4o-mini | gpt-4o-mini | whole | 60.2% |
| gpt-4o-mini | Baseline | whole | 55.6% |

作者从表里读出四点：

1. **最高分不实用。** o1-preview + DeepSeek 或 o1-mini 拿到 85%，但用的是 whole 格式，Editor 要输出每个文件的完整新版本，两步都很慢，<Trans zh="大概不适合在 Aider 里交互使用">“probably not practical for interactive use with aider.”</Trans>
2. **实用的是第二名。** o1-preview + Sonnet（82.7%），作者说对能同时用两家服务的用户来说完全可行。
3. **自己和自己配对也有用。** Sonnet（77.4% → 80.5%）、GPT-4o（71.4% → 75.2%）、GPT-4o-mini（55.6% → 60.2%）都比单独使用高。
4. **DeepSeek 当 Editor 出奇地好。** 用高效的 diff 格式时，它帮助了除 Sonnet 以外的所有 Architect（Sonnet 自配对 80.5%，配 DeepSeek 只有 78.9%）。

还有一个表里能看到的细节：o1-mini 单独用只有 61.1%，当 Architect 配 DeepSeek（whole）能到 71.4%，提升最大。这和文章的出发点一致：推理模型最吃亏的就是输出格式。

::: warning 局限与注意
- 数据来自 2024 年的模型和单一基准（Aider 自己的代码编辑基准），今天的提升幅度未必一样。
- 原文没有给出两步调用的延迟和成本，只定性地说 whole 格式“慢”。
- 页面没有署名，作者按 Aider 作者记录，未在页面上核实。
- 文章发布时这还是“实验性支持”。
:::

## 5. 结论

这篇文章的核心发现很简单：**让模型一次只做一件事，效果更好**。想方案和写格式正确的编辑，是两种不同的能力；拆开以后，两个角色都能专心，还能各用各的模型。

我觉得即使你不用 Aider，这个思路也值得记住：当一个推理很强的模型总是在输出格式上出错时，与其在提示词里反复强调格式，不如让它只管想，再交给另一个模型写。

### 你可以这样试

- [ ] 如果你用 Aider，挑一个中等难度的任务，分别用普通模式和 `--architect` 模式跑一次，对比结果和耗时。
- [ ] 在你常用的代理里试“先让模型只写方案、不改代码，再让另一个会话按方案改”，看格式错误和返工是否变少。
- [ ] 注意观察耗时：两步调用多花的时间，在你的任务里值不值得。

### 读完自测

1. 为什么推理强的模型反而容易输出格式错误的编辑？
2. Architect 和 Editor 各负责什么？该怎么挑模型？
3. 为什么得分最高的组合反而不是作者推荐的实用配置？
4. 表里哪个模型从双模型模式中提升最大？这说明了什么？
