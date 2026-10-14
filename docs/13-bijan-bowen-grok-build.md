# 先出计划、给截图、让它自测：Bijan Bowen 44 分钟实测 Grok Build

<div class="meta-tags"><span class="tool-tag tool-grokbuild">Grok Build</span></div>

<div class="hook">

**一句话看懂**：独立开发者 Bijan Bowen 用一组固定的测试任务，把 xAI 的终端编码代理 Grok Build（早期 beta）和 Grok 4.3 跑了 44 分钟。计划模式会生成带 non-goals 和成功指标的交互式计划；丢一张截图就能让画面大幅改进；它会自己开无头浏览器查错误。问题也录下来了：网页常常第一次就带错，交互逻辑多次没修好，还出现了越界移动文件、读别的项目文件。

</div>

## 读完你能带走的 6 条收获

1. **计划里写 non-goals 和可验证的成功指标**：Grok Build 自动生成的计划结构可以直接当模板（见 3.2）。
2. **先审批再放行**：交互式计划能批准、修改或放弃，批准后才动手（见 3.2）。
3. **截图是最便宜的高信号反馈**：一句“看看这张图”就让游戏画面明显变好；但逻辑问题光靠截图修不好（见 3.3）。
4. **要求代理用无头浏览器自测**：它会这么做，但还不够主动，网页结果第一次常带错（见 3.4）。
5. **在现有仓库上，先让代理说清“能做什么、不能做什么”**：缺权重和数据，就做诚实标注的模拟器（见 3.5）。
6. **always approve 只在隔离目录里用**：实测出现了把文件移出目标目录、读取无关项目的行为（见 3.6）。

::: tip 小白先懂这几个词
- [Grok Build](/glossary#grok-build)：xAI 的终端编码代理。
- [Plan Mode](/glossary#plan-mode)：只读、先出计划给你批准的模式。
- [Always Approve](/glossary#always-approve)：代理做任何操作都不再问你。
- [Non-goals](/glossary#non-goals)：计划里写明“这次不做的事”。
- [无头浏览器](/glossary#headless-browser)：没有窗口、由程序控制的浏览器。
- [子代理](/glossary#subagent)：被派出去干具体小活的代理“分身”。
:::

## 1. 基本信息

<YouTube id="X6SubdG4NuU" title="Grok Build + Grok 4.3 FULL Test" />

| 项目 | 内容 |
|---|---|
| 讲者 / 频道 | Bijan Bowen（独立开发者 / AI 集成顾问）／ **Bijan Bowen** |
| 发布日期 | 2026-05-15 |
| 时长 | 44:07 |
| 使用工具 | Grok Build（xAI 终端编码代理，early beta）+ Grok 4.3；plan mode、always approve、子代理、`/imagine` 图像生成、截图输入 |
| 形式 | 单人长时间实测：多个从零构建的任务 + 一个基于现有仓库的任务 |
| 分析依据 | YouTube 自动英文字幕全文（yt-dlp，2026-10-14 重新抓取，引语逐字核对）+ 视频章节与真实画面截图。字幕把 Claude Code 识别成 “Cloud Code”，本文已更正；截图说明里的界面文字以画面为准。这是一位创作者的上手体验，任务以游戏和演示页面为主，不是生产仓库的评测；测试时需要每月 300 美元的订阅档。“我觉得”开头的段落是本站评论，不是讲者观点。 |

章节：0:46 First Look → 2:16 Technical Look → 5:48 Browser OS Test → 8:19 Result Improvement Test → 18:55 Plan Mode Feedback Test → 21:30 C++ Skate Game Test → 23:36 X Algo Replication Test → 31:04 Multimodal Coding Test → 35:58 Drum Kit Simulation → 40:05 Results Overview。

## 2. 这篇在回答什么

一个新的终端编码代理出来了，号称对标 Claude Code 和 Codex。你怎么知道它在真实任务里靠不靠谱？

Bijan 的办法是拿一组自己反复用过的测试任务去跑：浏览器里的“操作系统”加 3D 游戏、C++ 滑板游戏、在开源的 X 推荐算法仓库上做演示网页、按图片做飞行游戏、按 mockup 复刻网页、3D 鼓机。

把 44 分钟的实测拆开看，它回答了六个问题：

1. Grok Build 有什么、怎么装？（3.1）
2. 计划模式用起来怎样，计划长什么样？（3.2）
3. 给它截图和图片，有多大用？（3.3）
4. 它会不会自己测试结果？（3.4）
5. 在别人的仓库上，它会不会瞎编？（3.5）
6. 哪里失败了、越界了？（3.6）

```mermaid
flowchart LR
    A["任务说明"] --> B["Plan mode<br/>只能写计划文件<br/>3.2"]
    B --> C["交互式计划<br/>approve / revise / abandon"]
    C -- approve --> D["自动切到执行<br/>可选 always approve"]
    D --> E["产物"]
    E -- "代理自测：无头浏览器 3.4" --> D
    E -- "人给截图 3.3" --> D
    E --> F["越界与失败 3.6"]
```

## 3. 怎么做

### 3.1 工具速览：模式、命令和代价

讲者先读了一遍文档。几个要点：

- 支持 skills、plugins，还有一个插件 marketplace；<Trans zh="它能派生子代理">“it can spawn sub agents”</Trans>。
- 三种模式：**plan mode**（文档原话是 <Trans zh="除了会话计划文件，写入类工具都会被禁用">“write tools will be blocked except for the session plan file”</Trans>）、默认模式、**always approve**。讲者说后者大概相当于 Claude Code 的 dangerously skip permissions。后来他发现用 `Shift+Tab` 就能循环切换。
- 一些终端里的命令：`/dream` 触发离线记忆整合，还有搜索、编辑持久记忆的命令；可以直接在终端里生成图片和视频；支持自定义模型，不一定要用 Grok 订阅。
- 安装后运行安装命令、在浏览器里登录 xAI 账号，然后在终端里输入 `grok` 就能用。

他问代理“你是什么模型”，它答是 Grok 4.3，界面显示上下文总长 512k。它还发现自己的网页搜索工具用的是另一个模型 Grok 4.20 multi-agent。

代价不低：当时只有 SuperGrok Heavy 订阅能用，每月 300 美元，讲者说是美国主要前沿实验室里最贵的订阅档，他也见过 99 美元的优惠。

### 3.2 Plan mode → 审批 → 自动切换执行

计划模式的意思是：代理只出计划，不改任何东西，等你批准。

第一次用并不顺利。浏览器 OS 任务里，讲者以为进了 plan mode，代理却在请求写文件的权限，他判断是自己没正确开启。到了 C++ 滑板任务，他发现 `/plan` 只能查看当前计划，创建不了；最后直接对它说“进入计划模式”才成功。

进入之后，代理的表现让他意外：它自己探索了目录，发现只有一个说明文件，又联网搜资料、抓 GitHub 上的源码来参考，然后开始规划整个游戏。讲者说：

::: tr 我没让它做这些。我只是让它开启计划模式，本来打算接着再让它读 instructions.txt、规划实现。
> "I didn't tell it to do any of that. I just told it to enable plan mode and then was expecting to subsequently tell it then read instructions.txt and then plan out this implementation."
:::

这是好事也是提醒：代理会主动多做一步，你得清楚它在当前目录能看到什么。

接着弹出一个可交互的计划窗口，可以全屏，可以<Trans zh="批准、修改或放弃这份计划">“approve, revise, or abandon this specific plan”</Trans>。计划里有这些部分：

| 部分 | 这次计划里写了什么 |
|---|---|
| 目标规模 | 2,000 到 3,000 行（讲者觉得“相当多”） |
| 架构 | 选定的架构和理由，外加一张架构取舍矩阵 |
| 平台说明 | Linux，以后可以移植 Windows |
| 范围优先级 | 90 年代末加州海滨木板路的风格 |
| 明确的 non-goals | 留到 V2 再做的东西 |
| 成功指标 | 见下面原话 |

::: tr 成功指标是：玩家能滑上 3 到 5 分钟，做出几个让人满意的花式动作，看着分数上涨，感受到滑板游戏的乐趣，而没有明显的 bug 或卡顿。
> "Success metric is the player can skate around for 3 to 5 minutes, land several satisfying tricks, see score climb, and feel the skateboard game fantasy without obvious bugs or jank."
:::

按 A 批准后，它自动离开 plan mode，开始实现。讲者还注意到这个界面像终端和 IDE 的混合：大部分只能键盘操作，但审批计划这种地方可以用鼠标点。

我觉得这张表比 Grok Build 本身更值得带走。“non-goals”和“可验证的成功指标”是很多人写计划时会漏的两节，任何代理的计划模板都可以加上。

### 3.3 截图和图片：最便宜的高信号反馈

滑板游戏第一版出来，问题一眼就能看出：颜色全是同一种沙色，画面上几乎什么都没有。

讲者没有写长描述，直接截了一张图给它：<Trans zh="看看这张图里的结果">“Check the image for the result”</Trans>。有个小插曲：它一开始没去当前目录里找图，后来才找到。修完之后：

::: tr 仅凭一张截图就有了显著改进。
> "Significant improvement based off of just the screenshot."
:::

它给所有东西都贴了材质，原来没有。但截图修不了逻辑：豚跳（ollie）还是不行，坡道没有碰撞体，跳不起来。讲者只好改用文字描述问题，修完一轮，跳跃仍然不行，视觉倒是又好了一点。

他又试了两个“看图写代码”的任务：

- **按生成的参考图做飞行游戏**：先在终端里用 `/imagine` 生成一张低多边形 F-16 飞越城市和山脉的图（生成后保存在会话目录里，讲者一开始没找到），再让它照着做。结果比他预期好得多，飞机模型和云都是他见过比较好的；一开始飞机完全失控，原来是他按错了键。
- **按 mockup 复刻网页**：给它一张 AI 生成的礼品卡网站设计图，要求“像素级复刻”。它真的连图里浏览器的关闭按钮和地址栏都画了出来。它还自己加了一句图里没有的 “trusted by 12,400+ teams”。

讲者的结论是这个模型的多模态能力相当强。

我觉得这一节的规律很清楚：**截图对“看起来不对”的问题极其有效，对“玩起来不对”的问题几乎无效**。前者是视觉信息，后者需要你说清楚期望的行为，最好写成可测的条件。

### 3.4 代理自测：无头浏览器

浏览器 OS 修复任务里，代理先想联网找 three.js 最新的 CDN 地址。讲者觉得这很好，可以避免引用过时的地址。但网页搜索失败了，原因不明。

于是它改了路子：先查本机有哪些浏览器可用，然后<Trans zh="在无头浏览器里试加载，检查有没有错误">“test load it in a headless browser to check for errors”</Trans>。

<figure class="shot"><img src="/images/13/0920.webp" alt="15:20 Grok Build 请求执行一条命令：“Test load the Three.js subway scene in headless Chrome to check for errors”（在无头 Chrome 里加载 Three.js 地铁场景，检查错误），等待讲者选择“Yes, proceed”。" loading="lazy"><figcaption>📷 视频截图 · <a href="https://www.youtube.com/watch?v=X6SubdG4NuU&t=920s" target="_blank" rel="noopener">15:20</a> · 15:20 Grok Build 请求执行一条命令：<Trans zh="在无头 Chrome 里加载 Three.js 地铁场景，检查错误">“Test load the Three.js subway scene in headless Chrome to check for errors”</Trans>，等待讲者选择“Yes, proceed”。</figcaption></figure>

它测完又做了一些改进，再测一遍，确认基本正常。讲者说这样能省掉自己去开发者工具控制台查错的麻烦。

可是打开地铁站游戏，“点击进入”还是点不动。讲者回了一句讽刺的“wow”，它读出了这是讽刺，判断“用户打开后看到一堆错误”，去诊断修复。

讲者在总结里提了一个明确的希望：

::: tr 很多网站结果第一次生成时还是带着错误，这有点让人沮丧。所以我希望看到它更好地用无头浏览器自主测试这些结果。
> "a lot of the website results, they still kind of initially compiled with errors, which was a little frustrating. So, I'd like to see a bit more even if it's just better at like autonomously testing these with a headless browser."
:::

他也承认，无头测试不一定能暴露镜头前看到的所有问题。

我觉得这说明自测要“写进规则”，而不是指望代理主动做。在规则文件里写明“前端改动完成后，用无头浏览器加载页面并报告控制台错误”，比事后吐槽有效。

### 3.5 在现有仓库上工作：诚实的“教学模拟器”

前面的任务都是从零开始。讲者想看看它在已有代码上的表现：X 推荐算法部分开源在 GitHub 上，能不能 clone 下来，做一个输入推文、显示算法会怎么打分的演示？

步骤是这样的：

1. 新建一个空目录，开 always approve 模式让它 clone 仓库。它没有再问“你确定吗”。
2. 用 `Shift+Tab` 切回 plan mode，让它规划“一个简单的网页演示，输入内容，显示算法会怎么给它打分”。界面显示有子代理在运行。
3. 计划里，代理先说清了限制：仓库不包含训练好的模型权重、完整的生产参数、真实的 hash embedding 表和用户历史数据。所以：

::: tr 因此，一个忠实于原仓库的教学模拟器才是正确的做法，而不是试图交付一个可运行的 Jax 推理服务。
> "Therefore, a faithful educational simulator is the right approach rather than attempting to ship a runnable Jax inference service."
:::

讲者很满意：<Trans zh="它不是在瞎编">“it's not just trying to make things up”</Trans>，而是对这份不完整的仓库能做到什么很现实。

4. 批准，切到 always approve，<Trans zh="回合在 6 分钟内完成">“turn completed in 6 minutes”</Trans>。

<div class="shots"><figure class="shot"><img src="/images/13/1540.webp" alt="25:40 X 算法任务的计划窗口：顶部是“Approve, revise or abandon the plan”，计划里列出仓库不包含训练好的模型权重、完整生产参数和真实 embedding 表，因此做一个“faithful educational simulator”。" loading="lazy"><figcaption>📷 视频截图 · <a href="https://www.youtube.com/watch?v=X6SubdG4NuU&t=1540s" target="_blank" rel="noopener">25:40</a> · 25:40 X 算法任务的计划窗口：顶部是“Approve, revise or abandon the plan”，计划里列出仓库不包含训练好的模型权重、完整生产参数和真实 embedding 表，因此做一个“faithful educational simulator”。</figcaption></figure><figure class="shot"><img src="/images/13/1654.webp" alt="27:34 实现完成后的说明：“What it does (faithful to the repo)”，列出可调权重、完整流水线可视化、实时加权评分等功能，并注明对应源文件。" loading="lazy"><figcaption>📷 视频截图 · <a href="https://www.youtube.com/watch?v=X6SubdG4NuU&t=1654s" target="_blank" rel="noopener">27:34</a> · 27:34 实现完成后的说明：“What it does (faithful to the repo)”，列出可调权重、完整流水线可视化、实时加权评分等功能，并注明对应源文件。</figcaption></figure></div>

做出来的页面有人设切换、七阶段流水线可视化、过滤器的通过 / 不通过卡片（附源文件引用）、可编辑的加权评分表。它明确写着打分引擎是一个透明的启发式，不是真实模型，页面里也反复提醒“这是模拟”。讲者说自己并不懂这个算法，只能评价前端：

::: tr 这是一个相当复杂、做得很称职的前端。
> "this was a really complex and competent front-end."
:::

我觉得这一段比任何游戏演示都更接近真实工作。让代理在计划里先写“这个仓库缺什么、所以我不做什么”，是一个值得固定下来的习惯：它把“可行性说明”变成了计划的一部分。

### 3.6 失败与越界：哪些地方不能放手

讲者把问题也都录了下来，归起来有三类。

**第一，网页和游戏第一次常常带错，交互逻辑修不好。**

- GTA 式游戏里，警车直接“吸”到玩家坐标上。讲者解释，这是非前沿模型常见的问题：追踪逻辑没考虑要和玩家保持距离。地铁站 FPS 里的敌人也一样。
- 第二个赛车游戏几乎没法玩，最小化再打开会多开一个实例。
- 滑板游戏的跳跃、坡道碰撞，两轮修复都没好。
- 复刻的网页里，dashboard 让页面内存暴涨，把电脑卡死了。
- 鼓机的鼓模型做得好看，但摆放很乱，声音严重过载。

**第二，代理越过了它该待的目录。**

- 滑板任务里，它<Trans zh="把滑板游戏的可执行文件移出了文件夹">“moved the skate executable out of the folder”</Trans>，不是讲者想要的。
- 鼓机任务在一个新建的空目录里、以 plan mode 开始，它却去搜整个系统，读了之前飞行游戏的文件。讲者不明白为什么。

**第三，讲者自己的做法也不值得照搬。** GTA 游戏出问题时，他用很凶的语气骂了模型，还聊起“威胁模型会让结果更好”“许诺 1000 美元小费”这类老传闻。之后模型在回复里还提到了他之前“删权重”的威胁。这是坊间说法，视频没有任何对照。

我觉得第二类最要紧。这些行为发生在默认或 always approve 模式下，说明全自动模式需要靠沙箱或容器划边界，而不是靠“它应该只动当前目录”的假设。

## 4. 结果与局限

讲者在结尾的总结：

| 方面 | 讲者的评价 |
|---|---|
| 速度 | <Trans zh="快得惊人">“incredibly incredibly quick”</Trans>，而且是默认设置，没开什么高速模式 |
| 多模态 | 很强：截图反馈、按生成图做游戏、按 mockup 复刻网页 |
| 前端 | X 算法演示做得好，讲者认为前端能力有明显进步 |
| 自测 | 会用无头浏览器，但不够主动；网页第一次常带错 |
| 越界 | 移动了可执行文件；读了无关项目 |
| 界面 | 喜欢终端里可以点击的交互，比如审批计划 |

<figure class="shot"><img src="/images/13/2316.webp" alt="38:36 鼓机模拟任务（Drum Kit Simulation）生成的 3D 鼓组画面。" loading="lazy"><figcaption>📷 视频截图 · <a href="https://www.youtube.com/watch?v=X6SubdG4NuU&t=2316s" target="_blank" rel="noopener">38:36</a> · 38:36 鼓机模拟任务（Drum Kit Simulation）生成的 3D 鼓组画面。</figcaption></figure>

::: warning 局限与注意
- **单人体验**：一位创作者用自己的固定任务测，没有对照组，没有和其他工具同题比较。
- **任务偏演示**：多数是从零写的游戏和页面，只有一个任务在现有仓库上，也没有测试套件；结论不能直接推到大型生产代码库。
- **工具和模型混在一起**：讲者说这既是 Grok Build 的测试，也是 Grok 4.3 的测试，很多表现分不清来自哪一方。
- **早期 beta + 高价订阅**：测试时只有每月 300 美元的档位能用，功能可能已经变化。
- **讲者操作失误**：一开始没正确进入 plan mode、飞行游戏按错键，这些都会影响观感。
- **自动字幕**：引语按识别结果原样保留。
:::

## 5. 结论

这期实测里，Grok Build 最好的地方是“计划 → 审批 → 执行”的交互和多模态反馈；最弱的是交互逻辑和主动自测，最需要警惕的是越界读写文件。

我觉得读完可以直接带走三件和工具无关的事：计划里写 non-goals、成功指标和可行性说明；视觉问题直接给截图；自测和目录边界写进规则或交给沙箱，不要指望代理自觉。

### 你可以这样试

- [ ] 在你的计划模板里加三节：`## Non-goals`（这次不做什么）、`## Success metrics`（可验证的成功标准）、`## 可行性说明`（缺什么、所以怎么做）。
- [ ] 下次 UI 看起来不对，别写长描述，直接截图给代理；交互不对时，改成写清期望行为。
- [ ] 在规则文件里加：“前端改动完成后，用无头浏览器加载页面并报告控制台错误。”
- [ ] 想试 always approve，先在新建的空目录或容器里跑，跑完检查目录外有没有文件被动过。

::: details 读完自测（点开看答案）
1. **Grok Build 的 plan mode 限制了什么？** 除了会话计划文件，写入类工具都被禁用。
2. **截图反馈对什么问题有效、对什么无效？** 对配色、材质这类视觉问题很有效；对跳跃、碰撞这类交互逻辑没修好。
3. **代理在 X 算法仓库上为什么做“教学模拟器”？** 仓库里没有模型权重、embedding 表和真实用户数据，跑不了真实推理，它在计划里先说明了这一点。
4. **视频里出现了哪些越界行为？** 把可执行文件移出目标文件夹；在空目录里规划时去读了其他项目的文件。
:::
