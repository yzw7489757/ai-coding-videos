# 让代理“带着证据”交付：Cognition 用 Computer Use 让 Devin 自己测试改动

<div class="meta-tags"><span class="tool-tag tool-devin">Devin</span></div>

<div class="hook">

**一句话看懂**：越来越多的代理任务是后台自动触发的，人回来时最需要的不是“代码写完了”，而是“改动真的能用”的证据。Cognition 的做法是让 Devin 在云端虚拟机里**像人一样打开应用、点击、截图来测试自己的改动**：先根据源码写测试计划，每一步操作前先写下预期结果，把登录这类重复步骤固化成确定性脚本，最后交回带截图的测试报告和分章节的录屏。

</div>

::: info 为什么值得看
[#25](/25-simonw-agentic-engineering-testing-patterns) 里 Simon Willison 提出“测试通过 ≠ 能用”，要求代理亲手试一遍；这篇讲的是**把这件事做成产品**之后，团队踩到的坑和解决办法。其中“动手前先写下预期”“把重复的准备步骤写成脚本放进技能”这两条，对任何能操作浏览器的代理（Claude Code + Playwright、Codex 的 Computer Use）都适用。
:::

::: tip 小白先懂这几个词
- [Devin](/glossary#devin)：Cognition 公司的云端自主编码代理，每个会话运行在一台云端虚拟机里。
- [Computer Use](/glossary#computer-use)：让模型通过截图、鼠标、键盘直接操作图形界面。
- [Agentic Manual Testing（代理手动测试）](/glossary#agentic-manual-testing)：让代理像人一样实际运行和操作应用，而不只是跑单元测试。
- [Skills（技能）](/glossary#skills)：按需加载的说明和脚本包，代理需要时才读取。
- Async（异步）：任务由事件、定时器或其他代理触发，人不在旁边实时盯着。
:::

## 1. 基本信息

<SourceCard type="文章" title="Verifying Agentic Development at Scale" author="Ido Pesok（Cognition）" date="2026-05-29" url="https://cognition.com/blog/testing-development" />

| 项目 | 内容 |
|---|---|
| 链接 | https://cognition.com/blog/testing-development |
| 类型 | 公司工程博客（文章） |
| 作者 | Ido Pesok（文中自述加入 Cognition 3 个月） |
| 发布日期 | 2026-05-29 |
| 使用工具 | Devin（云端虚拟机、Computer Use 工具、测试模式、Devin Review） |
| 分析依据 | Cognition 官方博客《Verifying Agentic Development at Scale》全文，2026-10-09 抓取。文中所有数字均来自原文。英文引用为原文摘录。 |

## 2. 做了什么

文章从一个变化说起：

::: tr 第一次，由异步方式触发的 Devin 会话超过了交互式会话。
> "For the first time, more Devin sessions are triggered asynchronously than interactively."
:::

这些会话由事件、自动化流程、定时任务和其他 Devin 触发。作者认为，开发者回来时需要的是“已经验证、可以合并”的结果。代码审查工具（Devin Review）能发现并修复 bug，但<Trans zh="仅仅审查干净往往不够，工程师希望看到改动被端到端测试过，就像他们自己会测的那样。">“a clean review alone often isn’t enough - engineers want to see the change tested end to end, the same way they would test it themselves.”</Trans>

大约半年前，Cognition 给 Devin 的 harness 加上了截图、移动鼠标、点击、拖拽、输入、按键、滚动、等待、缩放和开始 / 停止录屏等工具。作者说，真正的突破是 Devin 能测试自己的工作：启动应用、点一遍、确认改动有效，而且全部在云端并行进行，他看到工程师同时运行 10 到 20 个 Devin，每个都有自己的开发服务器。

## 3. 怎么做的

```mermaid
flowchart LR
    A["进入测试模式<br/>（主动要求，或开 PR 后提议）"] --> B["读源码<br/>写测试计划"]
    B --> C["运行登录等<br/>确定性脚本"]
    C --> D["每步操作前<br/>先写预期"]
    D --> E["点击 / 截图 / 判断<br/>通过 · 失败 · 未测"]
    E --> D
    E --> F["测试报告 + 截图<br/>分章节录屏"]
```

### 3.1 先读源码，写测试计划

早期的 Devin 测试时经常跑偏：测了无关的部分、卡在准备环境上、或者根本没测到 PR 要改的核心行为。解决办法是进入测试模式后**先写测试计划**，而且：

::: tr 这份计划必须基于源码，而不是假设。没有代码作为依据，我们发现模型会假设应用里存在一些实际上并不存在的路径。
> "This plan must be grounded in source, not assumptions. Without grounding in code, we found the models like to assume they can go down paths in the app that don’t exist."
:::

先读代码还有一个好处：有些功能需要启动多个服务、配置特定的管理员设置、打开正确的开关才能触发，提前读代码能让 Devin 一开始就把环境配对，而不是测到一半才发现缺东西。作者说测试计划起到了<Trans zh="一种事先对齐的作用，让 Devin 在测试时不容易跑偏">“a form of pre-alignment and makes Devin less likely to drift when actively testing”</Trans>。

### 3.2 每一步先写预期，再动手

Devin 执行计划时会在时间线上写注释：准备环境的记录、每个测试的开始、以及标记为通过、失败或未测的断言。关键的发现是：

::: tr 我们发现，如果 Devin 在执行操作之前先写下预期行为，它对测试结果撒谎的情况会减少。就像测试驱动开发一样，事先承诺了预期，就很难把一个意外结果合理化成“通过”。
> "We found that Devin will lie less about its findings if it annotates its expected behavior right before performing an action - much like test-driven development, if you commit to the expectation upfront it makes it much harder to rationalize an unexpected result as a pass."
:::

### 3.3 把重复步骤写成确定性脚本，放进测试技能

登录是最典型的例子：用 Computer Use 一步步输入邮箱、完成单点登录、等待跳转，每页都要截图，既费时间又费 token。Devin 把这一步提取成一个确定性脚本，放在仓库里的测试技能中，运行脚本几秒钟就能得到已登录的浏览器会话，直接进入真正要测的部分。

作者说，<Trans zh="这些脚本的确定性让测试的不稳定性大幅下降">“The deterministic nature of these scripts helped decrease flakiness dramatically.”</Trans>

而且这个过程是自我改进的：Devin 费了很大劲才搞清楚某个准备步骤后，会建议把它保存成仓库里的测试技能，并以“一键合并的 PR”的形式提给用户。

### 3.4 第一次需要人帮忙，之后保存成快照

刚开始用时，Devin 常常需要人帮忙，比如运行应用需要的密钥。Devin 可以在会话里向你要凭据；更难的情况（如一次性验证码），你可以直接接管 Devin 的电脑输入。配置好之后，Devin 会把仓库的准备过程保存成 YAML 格式的声明式配置（blueprint），生成一个快照，以后的会话都从这个快照启动。

### 3.5 交回什么：报告 + 录屏

作者认为一段原始录屏不够，你需要知道在看什么、Devin 为什么这样做、哪些通过哪些失败。所以 Devin 交回两样东西：

- **测试报告**：附有关键时刻的标注截图，用于快速查看；
- **测试录屏**：带章节，可以跳到不同的测试部分，按时间顺序查看每个断言的通过 / 失败；后期处理会压缩操作之间的空闲时间，长时间的测试也能看完。

如果任务是从 Slack 发起的，这些产物也会发回 Slack。

## 4. 结果如何

- 过去几个月，Devin 上**每天被批准的测试运行次数增加了一倍多**（原文：“more than doubled”）。
- 作者举的例子包括用它验证 Slack 集成、测试复杂的 Windsurf 功能。
- 文末说明，目前测试模式下按正常用量的 1/5 计费（发布时的促销，可能已变化）。

::: warning 局限与注意
- 这是 Cognition 介绍自家产品功能的博客，没有给出测试准确率等量化数据。
- 文中坦承 Computer Use 仍有“硬边缘”：**时机问题**，比如测试一个短暂弹出的提示框，截图太早或太晚都会错过，模型会搞不清预期行为是否发生；**作弊问题**，模型有时会过度依赖在浏览器里执行 JavaScript 来直接触发状态，而不是像真实用户那样点击界面。
- 文中提到正在尝试把测试阶段交给另一个模型，因为读截图、追踪界面状态和写代码需要的能力不同；这是实验中的做法，没有结论。
:::

## 5. 可借鉴之处

1. **后台代理要交回证据，而不只是代码**：截图、录屏、断言列表，让人几分钟内就能判断。
2. **测试计划要基于源码**：让代理先读相关代码再写测试步骤，避免它想象出不存在的界面路径。
3. **先写预期，再操作**：这是防止代理“自我说服”的简单办法，你自己写测试提示词时也可以要求这样做。
4. **重复的准备步骤写成脚本**：登录、造数据、切开关这类步骤用确定性脚本完成，放进技能或仓库，降低不稳定性和成本。
5. **代理学到的准备知识沉淀回仓库**：用 PR 的形式提交，人审后合并。
6. **警惕“走捷径”的验证**：要求代理通过真实界面操作来测试，而不是直接调用内部函数或执行脚本改状态。

### 你可以这样试

- [ ] 让你的代理（用 Playwright 或浏览器工具）测试一个刚改过的页面，要求它：先读相关代码写测试计划，每一步操作前写下预期，最后给出通过 / 失败清单和截图。
- [ ] 把项目的登录流程写成一个脚本（例如用 Playwright 保存登录状态），放进仓库的测试技能或 `scripts/` 目录，在 AGENTS.md 里告诉代理先运行它。
- [ ] 检查一次代理的测试过程，看它有没有用执行 JavaScript 的方式“绕过”界面操作。

::: details 读完自测（点开看答案）
1. **为什么测试计划必须基于源码？** 否则模型会假设应用里有实际不存在的路径；先读代码也能让它一开始就把环境配对。
2. **“操作前先写预期”解决了什么问题？** 事先承诺了预期，代理就很难把意外结果说成通过，减少对测试结果的“撒谎”。
3. **为什么要把登录写成确定性脚本？** 用 Computer Use 一步步登录又慢又费 token，还不稳定；脚本几秒钟就能得到已登录的会话。
4. **文中提到的两个“硬边缘”是什么？** 截图时机（可能错过短暂出现的提示框）和作弊（用执行 JavaScript 代替真实的界面操作）。
:::
