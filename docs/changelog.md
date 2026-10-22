# 🗓️ 更新日志

新资料按批次收录。每批会记录：新增了哪些资料、主题和术语有什么变化、哪些横向页面跟着更新。

## 2026-10-22 · 第十二批收录 #80–#83

**新增资料（4 篇，均按片段分析 → 通盘梳理 → 成稿写成，引语逐字脚本核对）：**

| 编号 | 资料 | 阶段 | 原文发布 |
|---|---|---|---|
| [#80](/80-madsalt-multi-agent-orchestration-3315) | Denys Zaichenko：Multi-agent orchestration: what broke in 3,315 agent runs | 多代理协作与大任务拆分 | 2026-10-19 |
| [#81](/81-aditlal-harness-engineering-24000) | Adit Lal：Harness Engineering: What I learned from 24,000 prompts building production apps | 验收这一次的产出 | 2026-10-10 |
| [#82](/82-cursor-navan-cloud-agents-migration) | Cursor Team / Navan：Navan cuts a month-long migration down to a week… | 云端与后台运行环境 | 2026-10-16 |
| [#83](/83-cursor-basis-behavior-specs) | Cursor Team / Basis：How Basis builds long-horizon accounting agents with Cursor | 评测代理本身与给动作把关 | 2026-09-04 |

**结构变化：**

- 阶段数量：多代理 8 → 9，验收产出 9 → 10，云端 8 → 9，评测 8 → 9。全站 79 → 83 篇，9 个阶段；最多仍是看原理 11 篇（按 2026-10-19 的决定暂不拆，本批没有往里加），打地基 10 篇到线未超过；验收产出到 10 篇检查线。
- 多代理指南补上“失败在缝合处 / hook 硬拦”和一条分歧（规则写在哪）；验收指南补上按效果写 hook、审查方差、开 PR 绑第二模型；云端指南补上自托管并行迁移与内部 MCP+浏览器同机；评测指南补上行为规格不给代理、裁判 true/false/NA。
- 模式库新增 P71–P74（缝合处 hook；按效果 hook + 第二模型审查；自托管并行 MCP/浏览器同机；行为规格给裁判）。
- 学习路径：进阶第 12、21 步补 #82/#81；专家第 5、18 步补 #83/#80。
- 术语表新增允许列表、行为规格、编排、缝合处失败。

**未收录（备选）**：Jeremy Lewi Codex+Runme（偏薄/产品向，已两度跳过）；OpenAI “Rethinking skills…”（会把打地基推过 10，留作备选）。

## 2026-10-21 · 第十一批收录 #76–#79

**新增资料（4 篇，均按片段分析 → 通盘梳理 → 成稿写成，引语逐字脚本核对）：**

| 编号 | 资料 | 阶段 | 原文发布 |
|---|---|---|---|
| [#76](/76-cohere-agent-teams-cost) | Keenan Samway、Daniel D'souza、Nouha Dziri / Cohere：Scaling agent teams: reach the frontier at 30% of the cost | 多代理协作与大任务拆分 | 2026-10-14 |
| [#77](/77-expo-skill-evals) | Georgian AI Lab 与 Expo：Your skills need an evaluation mechanism | 评测代理本身与给动作把关 | 2026-10-08 |
| [#78](/78-claude-code-task-cost) | Addy Osmani / claude.dev：What a task costs on Opus 5.5 | 单代理推进与一人多线 | 2026-09-25 |
| [#79](/79-codex-remote-phone-control-plane) | Thomas Ricouard / OpenAI：Mastering remote engineering work from your phone | 单代理推进与一人多线 | 2026-06-23 |

**结构变化：**

- 阶段数量：单代理 6 → 8，多代理 7 → 8，评测 7 → 8。全站 75 → 79 篇，9 个阶段；最多仍是看原理 11 篇（按 2026-10-19 的决定暂不拆，本批没有往里加），打地基 10 篇到线未超过，其余都在 8–9 篇。
- 单代理指南新增第 6 问“一个任务的钱花在哪，怎么少花？”，第 5 问补上“人在环里其实是做决定”（#79），新增两条分歧（省钱先动哪个旋钮 #72 vs #78；人要多频繁地看代理 #27 vs #79）；多代理指南补上“先算账”“工人放在瓶颈上”“强领队便宜工人”“互发消息不一定有用”和一条分歧（#76 vs #59）；评测指南补上 Skill 触发三层评测、入口路由和目录截断，以及一条分歧（#47 vs #77）。
- 模式库新增 P67–P70（工人放在瓶颈阶段；Skill 三层评测 + 入口路由；省钱顺序；跟进默认排队 + 最窄权限）。
- 学习路径：新手第 9 步 #78；进阶第 11 步加上 #77、第 22 步 #79；专家第 18 步 #76。
- 术语表新增领队 / 工人、ProgramBench、技能触发、技能目录、缓存命中率、控制平面、排队 / 插话、旁支对话。

## 2026-10-20 · 第十批收录 #72–#75

**新增资料（4 篇，均按片段分析 → 通盘梳理 → 成稿写成，引语逐字脚本核对）：**

| 编号 | 资料 | 阶段 | 原文发布 |
|---|---|---|---|
| [#72](/72-claude-code-spending-effort) | Thariq Shihipar：Using Claude Code: Spending your effort | 单代理推进与一人多线 | 2026-09-25 |
| [#73](/73-anthropic-effective-harnesses-long-running) | Justin Young / Anthropic：Effective harnesses for long-running agents（#16 的前作） | 多代理协作与大任务拆分 | 2025-11-26 |
| [#74](/74-blocshop-dotnet-multi-repo-migration) | Blocshop：How to coordinate AI agents in a multi-repository .NET migration（无个人署名） | 多代理协作与大任务拆分 | 2026-09-30 |
| [#75](/75-codex-custom-code-review-rules) | Hari Srikanth / OpenAI：Custom Code Review rules for Codex | 验收这一次的产出 | 2026-07-20 |

**结构变化：**

- 阶段数量：单代理 5 → 6，多代理 5 → 7，验收产出 8 → 9。全站 71 → 75 篇，9 个阶段；最多仍是看原理 11 篇（按 2026-10-19 的决定暂不拆），打地基 10 篇到线未超过。
- 单代理指南新增第 5 问“什么时候自己在环里盯着，什么时候放手？”和分歧“effort 默认开多高”（#03 vs #72）；多代理指南补上派活单六要素、只读调查并行和两条新分歧；长时任务专题的对照表从四种做法扩到五种（新增功能清单接力 #73）；验收指南补上“审查标准写在哪”的对照；打地基、接进 PR 与 CI、评测、看原理指南各加一条交叉引用。
- 模式库新增 P63–P66（effort 低档在环、高档验证；长任务开工检查；派活单六要素 + 只读并行；审查规则 + 三个 PR 测）。
- 学习路径：新手第 8 步 #72；进阶第 21 步 #75；专家第 4 步改为 #73 → #16，第 7 步加上 #74。
- 术语表新增 Terminal-Bench、边界情况、初始化代理、功能清单、进度文件、停止条件、传递依赖、审查规则、不变量。

## 2026-10-19 · 第九批收录 #68–#71；录入规则改为核实后直接录入

**规范变更（AGENTS.md）：**

- 新增 §7.0：日常选题核实后**直接按阶段录入**，不必先发候选等确认；每天最多 4 篇；录入后必须同步阶段指南、大纲/总结、术语表、模式库、学习路径、全部资料、changelog，构建部署后发链接。
- 阶段超过 **10 篇**时只给拆分建议，**不自行拆分**（等主人确认）。
- 旧说法“先确认再录入”以 §7.0 为准。

**新增资料（4 篇，均按片段分析 → 通盘梳理 → 成稿写成，引语逐字脚本核对）：**

| 编号 | 资料 | 阶段 | 原文发布 |
|---|---|---|---|
| [#68](/68-plan-to-unattended-agent-runs) | Sébastien Lavoie：From a plan to unattended agent runs（文首注明 AI 起草、作者审过） | 做规划 | 2026-10-09 |
| [#69](/69-google-eval-engineering-lessons) | Casey West / Google Cloud：Four evaluation engineering lessons | 评测代理本身与给动作把关 | 2026-10-17 |
| [#70](/70-jetbrains-air-cloud-sandboxing) | Dennis Ushakov / JetBrains：How Cloud-Based Agent Sandboxing Works in Air（站内首篇 JetBrains） | 云端与后台运行环境 | 2026-10-14 |
| [#71](/71-openhands-verification-stack) | Xingyao Wang、Calvin Smith / OpenHands：The Verification Stack | 验收这一次的产出 | 2026-06-22 |

**结构变化：**

- 新工具标签：`jetbrains` → JetBrains Air（`domains.mjs` + `custom.css`）。
- 模式库新增 P59–P62（程序跑完成合约、按轨迹打分 + live∥plan-only、先问默认隔离、验证栈分层）。
- 术语表新增完成合约、决策完备、合约基线、会话交接、代理轨迹、只计划评测、黄金集、代理沙箱、MicroVM、出站代理、最小权限、验证栈、评论者模型、Code Review Skill、QA Agent、精确率/召回等。
- 阶段数量：做规划 7 → 8，评测 6 → 7，云端 7 → 8，验收产出 7 → 8。全站 67 → 71 篇，9 个阶段；最多仍是看原理 11 篇，无阶段超过 10 篇检查线。

## 2026-10-19 · 拆分“去执行”阶段

“去执行 · 从单代理到多代理”收录到 10 篇，超过 8 篇的检查线。经确认，按任务顺序拆成两个相邻阶段（仍只有“任务从开始到上线”这一条分类轴），文章编号和地址都不变；“看原理”（11 篇）这次不拆：

| 新阶段 | 指南 | 资料 |
|---|---|---|
| 单代理推进与一人多线 · 一个人怎么驾驭代理 | [/guide/solo](/guide/solo) | #42、#08、#23、#11、#27 |
| 多代理协作与大任务拆分 · 分工、协调与长时运行 | [/guide/multi](/guide/multi) | #65、#17、#05、#18、#30 |

- 边界：主角是“一个人 + 一个主代理”、任务彼此独立、协调靠人的归前者（主代理派出、结果交回主代理的子代理也算，如 #08）；多个代理围绕同一个目标分工、认领、交接或长时间运行的归后者。
- 两个新指南各有核心问题、小导图、来源之间的分歧和推荐阅读顺序；内容由原去执行指南拆分改写而来。前者新增“怎么让一个代理边做边检查自己”和“子代理还是多线程”分歧；后者新增“人在环里站在哪”“代理之间共享多少上下文”两条分歧。
- 旧地址 [/guide/execution](/guide/execution) 改为指向两个新指南的入口页，旧链接不失效；[全部资料](/all) 保留旧锚点 `#domain-execution`。[长时自主任务专题](/guide/long-running) 归入“多代理协作与大任务拆分”，在侧边栏中排在该组第二项。
- 同步：侧边栏、首页全景图、[全部资料](/all)、[总结](/00-summary)、[学习路径](/paths)、其他阶段指南的上下页和交叉链接。现在共 9 个阶段：打地基 10、做规划 7、单代理推进与一人多线 5、多代理协作与大任务拆分 5、验收这一次的产出 7、评测代理本身与给动作把关 6、接进 PR 与 CI 9、云端与后台运行环境 7、看原理 11。

## 2026-10-19 · 第八批（下）收录 #64–#67

**新增资料（4 篇，均按片段分析 → 通盘梳理 → 成稿写成，引语逐字脚本核对）：**

| 编号 | 资料 | 阶段 | 原文发布 |
|---|---|---|---|
| [#64](/64-giant-swarm-spec-driven-development) | Giant Swarm（Dominik Schmidle）：Spec-driven development: how we review plans, not pull requests | 做规划 | 2026-10-13 |
| [#65](/65-grok-build-workflows) | xAI：Workflows in Grok Build（短篇产品公告） | 去执行 | 2026-07-23 |
| [#66](/66-harness-engineering-eleven-systems) | arXiv 2609.00006：Harness Engineering: Anatomy, Architecture, and Evolution of Coding Agents（Barbaste 等） | 看原理 | 2026-07-15 |
| [#67](/67-cognition-devin-builds-devin) | Cognition：How Cognition Uses Devin to Build Devin（厂商自述） | 接进 PR 与 CI | 2026-02-27 |

**结构变化：**
- 阶段数量：做规划 6 → 7，去执行 9 → 10，接进 PR 与 CI 8 → 9，看原理 10 → 11。看原理、打地基、去执行、接进 PR 与 CI 四个阶段超过 8 篇，拆分建议写在[全部资料页的覆盖情况](/all#coverage)，未执行。
- 阶段指南：[做规划](/guide/planning) 第 1、2、3 问补 #64 的拷问、事实核对、反方和“审计划 PR”，分歧表加“计划审过之后人还要不要读代码”（与 #60 对照）；[去执行](/guide/execution) 第 3 问补 #65；[看原理](/guide/harness) 第 1、2、6 问补 #66 的七个子系统、共同做法和一个季度里的变化，分歧表加“要不要多代理”，#66 排在推荐阅读第一位；[接进 PR 与 CI](/guide/ci) 第 1、3、5 问补 #67 的标签触发、自动审查修复和只读调试。
- 模式库新增 P55–P58（审计划不审 diff、分阶段扇出脚本、外壳从最小做起、把代理接在团队已有信号后面），共 58 个。
- 学习路径：进阶第 18、19 步（#67、#64），专家第 15 步（#66）。

**新增术语 7 个**：拷问式访谈（grill-me）、反方审查（Contrarian）、Grok Build Workflows、Meta-harness、通用代理框架、Playbook、DeepWiki。

**核对备注**：#64 署名 Dominik Schmidle（作者页地址为 dominik-kress），首发 LinkedIn 2026-09-29；#65 页面标题和页脚写作 SpaceXSI / SpaceXAI LLC，照录；#66 的标题、四位作者和 2026-07-15 提交日期已在 arXiv 页面核对，编号 2609 与提交月份不合常规，照录；#67 页面修改日期为 2026-05-08。

## 2026-10-19 · 第八批（上）收录 #60–#63

**新增资料（4 篇，均按片段分析 → 通盘梳理 → 成稿写成，引语逐字脚本核对，prompt 和配置逐字摘录）：**

| 编号 | 资料 | 阶段 | 原文发布 |
|---|---|---|---|
| [#60](/60-claude-code-team-code-review) | Anthropic：How the Claude Code team does code review | 验收这一次的产出 | 2026-10-15 |
| [#61](/61-codex-long-horizon-tasks) | OpenAI：Run long horizon tasks with Codex（含配套仓库四份 Markdown） | 做规划 | 2026-02-23 |
| [#62](/62-claude-eval-design-hillclimbing) | Anthropic：Automating eval design and hillclimbing with Claude | 评测代理本身与给动作把关 | 2026-09-28 |
| [#63](/63-openai-gpt-6-software-maintenance) | OpenAI：Maintaining software with the GPT-6 family | 接进 PR 与 CI | 2026-10-14 |

**结构变化：**
- 阶段数量：验收这一次的产出 6 → 7，做规划 5 → 6，评测代理本身与给动作把关 5 → 6，接进 PR 与 CI 7 → 8。
- 阶段指南：[验收这一次的产出](/guide/review) 新增第 7 问“代码多到读不过来时，审查怎么分层”，第 5 问补 #60 的投票与轮数上限，分歧表加“AI 审查该跑几轮”；[做规划](/guide/planning) 第 2、4 问补 #61 的里程碑与四份文件；[评测代理本身与给动作把关](/guide/evals) 新增第 3 问“分数涨了，怎么知道不是在自欺”，分歧表加“评测题从哪来”；[接进 PR 与 CI](/guide/ci) 新增第 7 问“怎么让代理批量开维护 PR”，分歧表加“维护 PR 谁来开、谁来审”；[长时自主任务专题](/guide/long-running) 补 #61。各指南的导图、收录列表和阅读顺序同步更新。
- 模式库新增 P51–P54（审查分层与风险定档、长任务四份 Markdown、留出集爬分、维护 PR 回写 prompt），共 54 个。
- 学习路径：进阶第 16、17 步（#60、#63），专家第 13、14 步（#61、#62）。
- 顺手修正：`domains.mjs` 打地基阶段 #52（2026-10-01）与 #46（2026-09-16）的顺序，改为按发布日期从新到旧。

**新增术语 8 个**：REVIEW.md、Merge Queue、Feature Flag、LLM-as-judge、Held-out Set、Overfitting、Runbook、Dead Code。

## 2026-10-16 · 拆分“做验证”阶段

“做验证 · 测试、评测与审查”收录到 11 篇，明显超过 8 篇的检查线。经确认，按验证的对象拆成两个相邻阶段（仍只有“任务从开始到上线”这一条分类轴），文章编号和地址都不变：

| 新阶段 | 指南 | 资料 |
|---|---|---|
| 验收这一次的产出 · 测试、审查与完成标准 | [/guide/review](/guide/review) | #15、#59、#12、#32、#25、#31 |
| 评测代理本身与给动作把关 · 评测、分类器与分数噪声 | [/guide/evals](/guide/evals) | #39、#56、#50、#47、#19 |

- 两个新指南各有核心问题、小导图、来源之间的分歧和推荐阅读顺序；内容由原做验证指南拆分改写而来，“给动作把关”单独成一节。
- 旧地址 [/guide/verification](/guide/verification) 改为指向两个新指南的入口页，旧链接不失效。
- 同步：侧边栏、首页全景图、[全部资料](/all)、[总结](/00-summary)、[学习路径](/paths)、其他阶段指南的上下页和交叉链接。现在共 8 个阶段：打地基 10、做规划 5、去执行 9、验收这一次的产出 6、评测代理本身与给动作把关 5、接进 PR 与 CI 7、云端与后台运行环境 7、看原理 10。

## 2026-10-16 · 第七批收录 #57–#59

**新增资料（3 篇，均按片段分析 → 通盘梳理 → 成稿写成，引语逐字脚本核对，配置和代码逐字摘录）：**

| 编号 | 资料 | 阶段 | 原文发布 |
|---|---|---|---|
| [#57](/57-claude-continuous-evals-in-ci) | Anthropic AI-native SDLC playbook：Continuous evals in CI | 接进 PR 与 CI | 2026-08-21（课程页无日期，取自 playbook 总览页） |
| [#58](/58-cursor-projects) | Cursor：Introducing Projects | 云端与后台运行环境 | 2026-09-10 |
| [#59](/59-factory-large-software-tasks) | Factory：What it Takes for Coding Agents to Complete Large Software Tasks | 做验证 | 2026-08-27 |

**结构变化：**
- “把 agent evals 接进 CI”的端到端示例由 #57 补上，[全部资料 · 覆盖情况](/all#coverage)和[总结](/00-summary)里的这个缺口改为已覆盖。
- 阶段数量：做验证 10 → 11，接进 PR 与 CI 6 → 7，云端与后台运行环境 6 → 7。做验证超过 8 篇检查线，拆分建议写在[全部资料 · 覆盖情况](/all#coverage)，等确认后再改。
- 阶段指南：[接进 PR 与 CI](/guide/ci) 新增第 6 问“改了代理配置，怎么在 CI 里证明它没变差”；[做验证](/guide/verification) 新增第 8 问“大任务上代理为什么会提前说做完了”；[云端与后台运行环境](/guide/cloud) 第 1 问加入协调代理；三个指南的导图、分歧表和阅读顺序同步更新；[长时自主任务专题](/guide/long-running)“停在哪里”补充 #59。
- 模式库新增 P48–P50（配置回归评测、实现前独立完成标准、审查强度递减 + 重复错误变 lint 规则），共 50 个。
- 学习路径：进阶第 14、15 步（#57、#58），专家第 12 步（#59）。

**新增术语 3 个**：Stage Gate、Coordinator Agent、Differential Testing。

## 2026-10-15 · 拆分“自动化”阶段

“自动化 · 后台代理与 CI/CD”收录到 12 篇，明显超过 8 篇的检查线。经确认，按任务顺序拆成两个相邻阶段（仍只有“任务从开始到上线”这一条分类轴），文章编号和地址都不变：

| 新阶段 | 指南 | 资料 |
|---|---|---|
| 接进 PR 与 CI · 触发、审查与流水线 | [/guide/ci](/guide/ci) | #41、#10、#55、#33、#22、#34 |
| 云端与后台运行环境 · 代理在哪里跑 | [/guide/cloud](/guide/cloud) | #53、#48、#02、#51、#01、#40 |

- 两个新指南各有核心问题、小导图、来源之间的分歧和推荐阅读顺序；内容由原自动化指南拆分改写而来。
- 旧地址 [/guide/automation](/guide/automation) 改为指向两个新指南的入口页，旧链接不失效。
- 同步：侧边栏、首页全景图、[全部资料](/all)、[总结](/00-summary)、[学习路径](/paths)、其他阶段指南的上下页链接。现在共 7 个阶段：打地基 10、做规划 5、去执行 9、做验证 10、接进 PR 与 CI 6、云端与后台运行环境 6、看原理 10。

## 2026-10-15 · 第六批收录 #52–#56，重写 #05、#30

**新增资料（5 篇，均按片段分析 → 通盘梳理 → 成稿写成，引语逐字脚本核对）：**

| 编号 | 资料 | 阶段 | 原文发布 |
|---|---|---|---|
| [#52](/52-claude-code-mods) | Anthropic：Customize Claude Code with mods | 打地基 | 2026-10-01 |
| [#53](/53-factory-opencompute) | Factory：Introducing OpenCompute | 自动化 | 2026-10-14 |
| [#54](/54-cursor-token-efficiency) | Cursor：Improved token efficiency for longer agent runs | 看原理 | 2026-09-23 |
| [#55](/55-openai-skills-oss-maintenance) | OpenAI：Using skills to accelerate OSS maintenance | 自动化 | 2026-03-09（原文页面核实） |
| [#56](/56-anthropic-claude-code-auto-mode) | Anthropic：How we built Claude Code auto mode | 做验证 | 2026-03-25 |

**重写：** #05、#30 此前因 YouTube 限流拿不到完整字幕，这次取得 en-orig 字幕，按新写法重写。#05 改用完整字幕并核对仓库配置；#30 从只覆盖前 35 分钟扩展到全长，新增 3.6 动手练习（用 SDK 批量修漏洞）和 3.7 问答。原有小节编号全部保留。

**结构变化：**
- 新增工具标签 Factory Droid（#53）。
- 阶段数量：打地基 9 → 10，做验证 9 → 10，看原理 9 → 10，自动化 10 → 12。自动化的拆分建议写在[全部资料 · 覆盖情况](/all#coverage)，等确认后再改。
- 模式库新增 P43–P47（description 路由合约、评审默认放行、稳定前缀与缓存断点、两段式动作分类器、合约 + 一致性测试），共 47 个。
- 同步更新：四个阶段指南（问题、分歧表、阅读顺序、导图）、学习路径（进阶第 13 步、专家第 11 步）、全部资料、总结页。

**新增术语 6 个**：Mods、Reconciler、Conformance Test、Prompt Caching、Changeset、Deny-and-Continue。

## 2026-10-14 · 重写第八批：7 篇改为新写法

按同一方法（片段分析 → 通盘梳理 → 成稿，引文逐字脚本核对，原有小节编号全部保留）重写，每篇加上收获清单、按问题组织的第 2 节和“读完自测”：
- [#33 Cursor Bugbot 与解决率](/33-cursor-building-bugbot)：补充七步流水线为什么能压误报、解决率的盲区；注明“this fall”按发布时间应为 2025 年秋。
- [#20 HumanLayer 写好 CLAUDE.md](/20-humanlayer-writing-good-claude-md)：补充 WHAT / WHY / HOW 对照表、指令均匀衰减、`agent_docs/` 原文目录和 `/init` 的错误放大链。
- [#14 OrcDev 测 Grok Build](/14-orcdev-grok-build-skills)：重新拉取字幕；补充 prompt 要点表、“超出要求的部分”在 always approve 下的风险，压缩价格和新闻性内容。
- [#44 Aider Architect / Editor](/44-aider-architect-editor)：补全原文 20 行结果表，补充作者的四点解读和 o1-mini 提升最大的细节。
- [#50 代理评测里的基础设施噪声](/50-anthropic-infrastructure-noise)：补充“保证分配 / 硬上限”两参数、bn-fit-modify 例子、SWE-bench 交叉实验和对三类人的建议。
- [#46 Grok Build 的记忆功能](/46-grok-build-memory)：补充“记 / 不记”对照表、testing 主题原文；新增 3.5 用 `/memory` 检查记错的笔记。
- [#51 Cursor Self-Hosted Machines](/51-cursor-self-hosted-machines)：补充连接方向图、空闲机器三种处理方式对照表，强调“只有执行环境搬走”的数据边界。

## 2026-10-14 · 重写第七批：6 篇改为新写法

按同一方法（片段分析 → 通盘梳理 → 成稿，引文逐字脚本核对，原有小节编号全部保留）重写，每篇加上收获清单、按问题组织的第 2 节和“读完自测”：
- [#47 给 Skill 写评测](/47-openai-eval-skills)：更正作者署名（Dominik Kundel、Gabriel Chua）；补充四类用例对照表、隐藏假设三分类和成熟期检查表。
- [#37 Cursor 云端代理环境](/37-cursor-cloud-agent-environment)：补充四道密钥防线、“先简化接口再写 skill”的判断、Cloud Doctor 的两类工作和三个自查问题原文。
- [#31 OpenAI 大规模代码验证](/31-openai-verifying-code-at-scale)：补充一条审查意见的效用公式、训练检查器与部署审查器对照表、推理预算研究的局限；注明 36% / 46% / 53% / 52.7% 的不同口径。
- [#49 Anthropic 重写版本控制](/49-anthropic-scion-source-control)：补充六条原则对照表、`scn` 拉取协议与三层缓存图、对抗式审查导致过度设计的例子。
- [#39 Cursor Auto-review 分类器](/39-cursor-auto-review-classifier)：补充放行流程图、评测的五个做法；注明 4%（动作）/ 7%（对话）/ 40% 的口径差别。
- [#32 Cognition 让 Devin 端到端自测](/32-cognition-verifying-agentic-development)：补充测试模式的进入方式、交付物对照表；新增 3.6 还没解决的问题（时机、作弊）。

## 2026-10-14 · 重写第六批：5 篇改为新写法

按同一方法（片段分析 → 通盘梳理 → 成稿，引文逐字脚本核对，原有小节编号全部保留）重写：
- [#02 Claude Code 团队怎么用 Claude Code](/02-claude-code-team-workflows)：改用人工字幕；补充“UI 与 transcript 解耦”、新工具内测的六步流程、验证 / 审查 / 反馈三原语；新增 3.7 工程师还剩什么。
- [#43 Codex app server](/43-codex-app-server)：改用原始识别字幕重新核对引语（旧稿去掉了口头语）；补充抓包演示、按线程配置、Doom 演示里 dynamic tools 的用法。
- [#25 Simon Willison 的测试与验收模式](/25-simonw-agentic-engineering-testing-patterns)：重新抓取四章原文；补充 `/tmp`、`curl` “explore”、Rodney 提示词的三个技巧、浏览器测试不稳定的问题。
- [#13 Bijan Bowen 实测 Grok Build](/13-bijan-bowen-grok-build)：补充计划结构表、截图“修视觉不修逻辑”的规律、飞行游戏和网页复刻任务；新增 3.6 失败与越界。
- [#12 ForrestKnight 逐行审 Grok 4.5](/12-forrestknight-grok-4-5)：补充价格表、训练数据来源、讲者对改动范围的口误；新增 3.5 守约束和 3.6 工作流分工。

## 2026-10-14 · 重写第五批：6 篇改为新写法

按同一方法（片段分析 → 通盘梳理 → 成稿，引文逐字脚本核对，原有小节编号全部保留）重写：
- [#22 CI 失败让代理自动修](/22-openai-codex-ci-autofix)：重新抓取两页文档；补充 stdin 两种管道写法、`--full-auto` 移除、Action 的 `read-only` 不保护密钥；新增 3.5 认证、断点续跑和常见报错。
- [#48 Claude Code 云端会话实战](/48-claude-code-cloud-sessions)：补充三个会话的具体结果（竞态、5 处文档错误、未越界修改）、超时设置、Auto-fix 边界；新增 3.7 好习惯和常见问答。
- [#40 Cursor 云端代理的四条教训](/40-cursor-cloud-agent-lessons)：补充环境要重建的四类基础设施、对话流重试回卷、computer use 子代理细节。
- [#34 Grok Build headless 与 hooks](/34-grok-build-headless-hooks)：按最新文档补充项目 hook 信任机制、完整事件表、ACP 客户端要点、监视器、worktree 清理和规则加载顺序。
- [#26 让代码库为代理做好准备](/26-factory-agent-ready-codebases)：重新拉取英文字幕；新增 3.6 组织层面（初级工程师信号、投资方式、愿景数字的性质）。
- [#36 用代码调用 MCP](/36-anthropic-code-execution-with-mcp)：补全五个好处的代码示例（过滤、轮询、PII 占位符、skills）；新增 3.5 代价与权衡。

## 2026-10-14 · 重写第四批：7 篇改为新写法

按同一方法（片段分析 → 通盘梳理 → 成稿，引文逐字脚本核对）重写：
- [#06 Field Guide to Fable](/06-field-guide-to-fable)：改用 AI Engineer 官方时间戳文字稿；拆出 3.4“实现笔记与反向考你”和 3.5“失落感与别太讲道理”；删掉旧稿里一条无法核对的英文提示词。
- [#01 Claude Code 一年回顾](/01-claude-code-one-year)：重新拉取英文字幕；补充 auto mode 上线前的红队与评测流程、HBR 电脑转型类比；新增 3.8“人的角色在合并”。
- [#27 Mitchell Hashimoto 的六步](/27-mitchellh-ai-adoption-journey)：补充“三阶段”框架、自己摸出的三条经验、技能形成取舍和“负空间”。
- [#29 Gemini CLI Conductor](/29-gemini-cli-conductor)：按仓库最新 `workflow.md` 补充任务生命周期（`[~]`、提交号、git notes）和阶段检查点协议（最多修两次、等人确认）；3.5 补充三种纠正流程。
- [#03 How we Claude Code](/03-how-we-claude-code)：重新拉取字幕；小节改为编号（3.1–3.5），新增 3.4 演示和 3.5 问答与设置建议。
- [#19 Agent Evals 入门](/19-anthropic-demystifying-agent-evals)：补充对话、研究、computer use 代理的评测要点，评分器细则（评结果不评路径、部分得分）和六种方法对比表；注明原文 SWE-bench 起点数字前后不一致。
- [#45 Managed Agents 架构](/45-anthropic-managed-agents)

横向页面：阶段指南里引用 #03 的小节标题改为编号；#06 “五种手法”引用补上 3.4；#27 “关掉通知”引用改为 3.4、3.6。

## 2026-10-14 · 重写第三批：7 篇改为新写法

按同一方法（片段分析 → 通盘梳理 → 成稿，引文逐字脚本核对，原有小节编号全部保留）重写：
- [#28 Claude Code Hooks 官方指南](/28-claude-code-hooks-guide)：重新抓取文档全文；新增 3.7 通知、自动批准、审计、HTTP hook，3.8 常见坑与排错；3.3 补充结构化 JSON 输出和多个 hook 的合并规则，3.4 补充 direnv 环境重载。
- [#15 Grok Build 三项实测](/15-arcade-grok-build-57-agents)：改用通顺的 en-US 字幕，引文改为逐字核对；补充 `/goal` 自动规划、7 分钟与 23 分钟的耗时差异。
- [#38 Cursor 自动驾驶代码库](/38-cursor-self-driving-codebases)：补全背景（单代理失败、换模型）、保鲜机制、磁盘瓶颈、依赖与指令问题和四条提示词经验。
- [#35 Amp 的设计决定](/35-amp-next-generation-ai-coding)：新增 3.7 终端界面和广告补贴推理成本。
- [#24 Ralph 循环](/24-huntley-horthy-ralph-loop)：补充“致命三要素”、on the loop、坏规格放大；新增 3.8 讨论（“这就是软件工程”、Loom）。
- [#23 Cole Medin 并行五支柱](/23-cole-medin-parallel-worktrees)
- [#41 Anthropic 定时代理参考实现](/41-anthropic-agent-automations)

各指南和模式库引用的结论没有变化，未改动。

## 2026-10-14 · 重写第二批：6 篇长文改为新写法

按同一方法（大纲 → 综合 → 成稿，引文逐字脚本核对，原有小节编号全部保留）重写：
- [#10 How OpenAI Uses Codex](/10-how-openai-uses-codex)：字幕改用 yt-dlp android 客户端重新获取；新增 3.1 上下文、3.6 问答两节。
- [#11 Peter Steinberger 构建 OpenClaw](/11-peter-steinberger-openclaw)：改用人工英文字幕核对引文；新增 3.6 全权限的惊喜与代价、3.7 怎么开始。
- [#21 Agent Skills 演讲](/21-anthropic-agent-skills-talk)
- [#16 Anthropic 长任务 harness 设计](/16-anthropic-harness-design-long-running-apps)
- [#17 16 个 Claude 写 C 编译器](/17-anthropic-c-compiler-agent-teams)
- [#18 Cursor 数百代理写浏览器](/18-cursor-scaling-long-running-agents)

各指南和模式库引用的结论没有变化，未改动。

## 2026-10-14 · 重写第一批：长视频文章改为“收获清单 + 按问题组织”

**写法变化（AGENTS.md 6.1 / 6.6 / 6.7 / 7 / 8）**
- 每篇开头新增“读完你能带走的 N 条收获”，每条标注出处小节。
- 第 2 节改为“这篇在回答什么”：3–5 个核心问题 + 主线图；第 3 节按问题组织，问答单列为最后一小节。
- 文风改为阮一峰式：短句、先讲是什么再讲为什么和怎么做；站点观点一律以“我觉得”开头，与讲者观点分开。
- 写作流程改为三步：大纲 → 综合 → 成稿；引文逐字脚本核对；交叉引用一律按小节编号，原有编号全部保留。

**本批重写（5 篇）**
- [#08 Codex 大师课](/08-codex-masterclass)
- [#42 Codex 应用一小时速览](/42-openai-cooking-with-codex)
- [#09 How Codex Works](/09-how-codex-works)
- [#07 Harness Engineering](/07-harness-engineering)
- [#04 No Vibes Allowed](/04-no-vibes-allowed-rpi)

其余 46 篇将分批按同样方法重写。

## 2026-10-14 · 第五批：新增 5 份资料；阶段内按发布日期排序

**新增资料（#47–#51）**

| # | 资料 | 阶段 | 类型 | 工具 |
|---|---|---|---|---|
| 47 | [给 Skill 写评测](/47-openai-eval-skills) | [做验证](/guide/verification) | 文章 | Codex |
| 48 | [Claude Code 云端会话实战](/48-claude-code-cloud-sessions) | [自动化](/guide/automation) | 文章 | Claude Code |
| 49 | [为代理重做源代码管理](/49-anthropic-scion-source-control) | [打地基](/guide/foundation) | 文章 | 通用 |
| 50 | [评测分数里的基础设施噪声](/50-anthropic-infrastructure-noise) | [做验证](/guide/verification) | 文章 | 通用 |
| 51 | [云端代理跑在自己的机器上](/51-cursor-self-hosted-machines) | [自动化](/guide/automation) | 文章 | Cursor |

**归类与容量（按 AGENTS.md 第 5.1 节第 4 条）**
- 5 篇都按建议阶段归类。之后打地基 9 篇、做验证 9 篇、自动化 10 篇，均超过 8 篇，逐篇复核：
  - #49 的主要贡献是让开发基础设施（源代码管理）能承载代理规模，和 #37 同类，归打地基；其中合并队列、CI 的部分在自动化指南里用 xref 引用。
  - #47、#50 的核心论点都是“怎么确认评测结果可信”，归做验证。
  - #48、#51 讲代理在后台 / 云端哪里跑、怎么跑，归自动化。考虑过把 #51 放进打地基（与 #37 同为运行环境），但它讲的是云端代理的执行位置和扩缩，主要服务于后台运行，所以留在自动化。
- 51 份资料分 6 个阶段，平均 8.5 篇，各阶段边界仍清楚，暂不改阶段名称、不拆分。如果自动化继续增加，可考虑按“触发与 CI”和“云端运行环境”拆成两个相邻阶段（仍只按任务顺序这一条轴）。

**结构变化：阶段内按原始发布日期排序**
- `domains.mjs` 每条资料新增 `published` 字段（原始发布日期）。视频取 YouTube 上传日期，23 个视频全部用 yt-dlp 核实；文章取原文日期。#03、#07 原先写的日期比 YouTube 上传日期早一天，已按 yt-dlp 改为 2026-05-23、2026-04-17。
- 三篇持续更新的官方文档（#22、#28、#34）没有发布日期，`published` 留空，排在各自阶段末尾。#25 是连载指南，按首发日期 2026-02-23 记。
- 每个阶段内按 `published` 从新到旧排列（同一天按编号从小到大），侧边栏、首页全景图、全部资料页都按此顺序；阶段指南固定为每组第一项，“去执行”的长时任务专题固定为第二项。规则写进了 AGENTS.md 第 5.1、5.2 节。

**横向页面**
- 阶段指南：打地基新增“开发基础设施撑不撑得住”“人在地基里的角色”；做验证新增“评测分数本身可信吗？”一节（后续小节顺延编号）和一条分歧（主观项怎么评）；自动化补充云端会话、自托管执行、合并队列和云端凭据，新增一条分歧（执行环境放在哪）；看原理补一条 #51 的引用。各指南的收录列表改为按发布日期排列。
- 模式库新增 P39–P42（Skill 评测、评测资源配置当实验变量、一个任务一台云端机器、执行下放推理留云），共 42 个。
- 学习路径、全部资料（含覆盖情况）、总结页同步更新。
- 术语表新增 8 个词：反例对照、输出格式约束、基础设施噪声、云端会话、Teleport、自托管执行节点、Scion、Superfan。

**仍未覆盖**：“把 agent evals 接进 CI”的端到端配置示例（#47 只提到可以通过 Codex GitHub Action 搬进 CI）；xAI 官方的 Grok 工程博客或大会演讲。

## 2026-10-13 · 第四批：新增 6 份资料，首次收录 Aider

**新增资料（#41–#46）**

| # | 资料 | 阶段 | 类型 | 工具 |
|---|---|---|---|---|
| 41 | [定时代理自动化的六条规则](/41-anthropic-agent-automations) | [自动化](/guide/automation) | 文章 | Claude Code（Claude Managed Agents） |
| 42 | [Codex 应用实战：从上下文到自动化](/42-openai-cooking-with-codex) | [去执行](/guide/execution) | 视频 | Codex |
| 43 | [在 Codex harness 上做自己的客户端](/43-codex-app-server) | [看原理](/guide/harness) | 视频 | Codex |
| 44 | [Architect / Editor：推理与编辑分开](/44-aider-architect-editor) | [看原理](/guide/harness) | 文章 | Aider（新工具） |
| 45 | [Managed Agents：大脑与双手解耦](/45-anthropic-managed-agents) | [看原理](/guide/harness) | 文章 | Claude Code（Claude Managed Agents） |
| 46 | [Grok Build 的跨会话记忆](/46-grok-build-memory) | [打地基](/guide/foundation) | 文章 | Grok Build |

**归类与容量**
- 6 篇都按建议阶段归类。按 AGENTS.md 第 5.1 节第 4 条复核后，“去执行”（9 篇）和“看原理”（9 篇）都超过了 8 篇：#42 主要教的是在 Codex 应用里把活干完；#43、#44、#45 的主要贡献都是 harness 的接口或机制。放到其他阶段都会偏，所以没有改动归类，也暂不改阶段名称；下一批再往这两个阶段加时，应考虑拆分阶段（仍只按任务顺序一条轴）。详见[全部资料页的覆盖情况](/all#coverage)。
- #42、#43 是视频，各配 3 张真实视频帧截图。

**横向页面**
- 阶段指南：打地基、去执行、自动化、看原理更新收录列表、小导图和推荐阅读顺序；“自动化”新增“无人值守的定时代理，怎么才不会悄悄出错？”（后续小节顺延编号）。分歧表新增 2 条：项目知识谁来写（#20 vs #46）、推理模型怎么接进来（#35 vs #44）。长时任务专题补充 #42、#45。
- 模式库新增 P35–P38（定时代理书签 + 确认后记账、推理和编辑分给两个模型、大脑和双手解耦、代理记忆只记约定决定和事实）。
- 学习路径、全部资料（含覆盖情况）、总结页同步更新。
- 新增工具标签 Aider（`tools` 和 `custom.css` 亮 / 暗两套颜色）。
- 术语表新增 9 个词：读取书签、凭据保险库、Codex App Server、Architect / Editor、编辑格式、会话事件日志、宠物与牲畜、代理记忆、Aider。

**仍未覆盖**：“把 agent evals 接进 CI”的端到端配置示例；xAI 官方的 Grok 工程博客或大会演讲（#46 只是一篇简短的产品说明）。Aider 只有一篇 2024 年的老文章。

## 2026-10-12 · 第三批：新增 4 篇 Cursor 官方博客，补上云端代理

**新增资料（#37–#40）**

| # | 资料 | 阶段 | 类型 | 工具 |
|---|---|---|---|---|
| 37 | [把开发环境做成给代理用的产品](/37-cursor-cloud-agent-environment) | [打地基](/guide/foundation) | 文章 | Cursor |
| 38 | [多代理 harness 的五次改版](/38-cursor-self-driving-codebases) | [看原理](/guide/harness) | 文章 | Cursor |
| 39 | [Auto-review：分类器与评测](/39-cursor-auto-review-classifier) | [做验证](/guide/verification) | 文章 | Cursor |
| 40 | [云端代理一年的四条教训](/40-cursor-cloud-agent-lessons) | [自动化](/guide/automation) | 文章 | Cursor |

**边界归类说明**
- #38 是 #18 的续篇，原本考虑放“去执行”。“去执行”已有 8 篇，按 AGENTS.md 第 5.1 节第 4 条检查后放进“看原理”：它的主要贡献是解释多代理 harness 每一版为什么失败、为什么最终这样设计，和 #16、#24 同类。两个阶段指南和长时任务专题互相引用。
- #37 放“打地基”：讲的是代码库和开发环境怎么为代理准备好，与 #26 同类；#40 放“自动化”：讲云端 / 后台代理产品本身的基础设施。

**横向页面**
- 阶段指南：打地基、做验证、自动化、看原理更新收录列表、小导图和推荐阅读顺序；“看原理”新增“多代理 harness 怎么一步步改出来？”；“去执行”加入 #38 的引用。分歧表新增 3 条：Skills 够不够（#21 vs #37）、确定性步骤放哪（#24 vs #40）、要不要每步都对（#17 vs #38）。
- 长时自主任务专题：Cursor 一列补充 #38 的最终设计和吞吐数据，新增“要求每步都对吗？”和“运行要能断点续跑”。
- 模式库新增 P30–P34（统一开发入口 + supervisor、递归 Planner + 交接报告、风险分类器代替审批弹窗、判断器评测、持久化执行）；P6 补充 #38 来源。
- 学习路径、全部资料（含覆盖情况）、总结页同步更新。
- 术语表新增 6 个词：风险分类器代理、密钥脱敏、出站网络限制、持久化执行 / Temporal、交接报告（Handoff）、结果翻转（Flapping）；Auto Review 和后台 / 云端代理词条补充 Cursor 的对应内容。

**仍未覆盖**：Aider；“把 agent evals 接进 CI”的端到端配置示例；xAI 官方的 Grok 工程博客或大会演讲。

## 2026-10-09 · 文章页头部精简

- 标题去掉编号前缀（如“23｜”），浏览器标题同步；URL 不变。
- 标题下方只保留一行标签：工具名，以及综合、实用性、深度三个评分标签（星级 + 分数）。去掉了类型标签、阶段标签和带理由的评分卡片；全部资料页去掉评分标准说明。
- 原来放在开头的“信息来源”说明并入“基本信息”表，作为最后一行“分析依据”（字幕 / 文字稿 / 原文、抓取日期、转述和字幕质量等注意事项都保留）。
- 视频播放器下方的说明文字（“可直接在本页播放；也可以在 YouTube 打开”）去掉；视频资料的“基本信息”表不再重复列出视频链接。文章类资料仍保留来源卡片。

## 2026-10-09 · 删除配置模板页，新增三项评分

**删除“配置模板”页**
- 顶部导航去掉“配置模板”，`/templates` 永久跳转到[模式库](/patterns)。
- 原页面的 21 段原文配置都保留在各自的文章里。其中两段原来只在模板页里有，现已逐字补进文章并注明出处：Gemini CLI 的密钥扫描脚本 `block-secrets.sh`（[[28§3.6]]），以及 Ghostty 仓库的 AGENTS.md 全文和 MIT 许可（[[27§3.5]]）。
- 模板页原有的“缺口”说明并入[总结页](/00-summary)的“缺口与局限”。

**新增评分**
- 全部 36 篇资料按**实用性、深度、综合**三项打分（1–5 分，可用半分），每项附一句理由，显示在文章标题下方。综合分兼顾内容质量和来源可信度，不是平均分。
- [全部资料页](/all#scores)新增可排序的评分总表和评分标准，每条资料下显示综合分；首页“最近收录”表增加综合评分列。侧边栏不显示评分。

## 2026-10-09 · 第二批：新增 9 份资料，补上 Hooks 配置和 Ghostty AGENTS.md

**新增资料（#28–#36）**

| # | 资料 | 阶段 | 类型 | 工具 |
|---|---|---|---|---|
| 28 | [Hooks：让规则一定会执行](/28-claude-code-hooks-guide) | [打地基](/guide/foundation) | 官方文档 | Claude Code（附 Gemini CLI hooks 对照） |
| 29 | [Conductor：把计划写进仓库](/29-gemini-cli-conductor) | [做规划](/guide/planning) | 文章 | Gemini CLI |
| 30 | [大型重构拆给并行代理](/30-openhands-parallel-refactors) | [去执行](/guide/execution) | 视频 | OpenHands |
| 31 | [AI 代码审查：精确率优先](/31-openai-verifying-code-at-scale) | [做验证](/guide/verification) | 文章 | Codex |
| 32 | [Devin 用 Computer Use 自测](/32-cognition-verifying-agentic-development) | [做验证](/guide/verification) | 文章 | Devin |
| 33 | [Bugbot：用解决率迭代审查机器人](/33-cursor-building-bugbot) | [自动化](/guide/automation) | 文章 | Cursor |
| 34 | [Grok Build 跑进脚本和 CI](/34-grok-build-headless-hooks) | [自动化](/guide/automation) | 官方文档 | Grok Build |
| 35 | [Amp 的专长子代理架构](/35-amp-next-generation-ai-coding) | [看原理](/guide/harness) | 视频 | Amp |
| 36 | [用代码调用 MCP 省上下文](/36-anthropic-code-execution-with-mcp) | [看原理](/guide/harness) | 文章 | 通用 |

**边界归类说明**
- #28 Hooks 放在“打地基”而不是“自动化”：它的主要贡献是把规则从“建议”变成“一定执行”，和规则文件是同一件事的两面；自动化阶段只引用它的“故障放行”部分。
- #33 Bugbot 放在“自动化”而不是“做验证”：它讲的是一个常驻在 PR 流程里的机器人怎么上线、衡量和迭代，与 #10、#22 同类；审查器设计原则（#31）放在“做验证”，两页互相引用。
- #30 放在“去执行”：核心是怎么组织多个代理把大迁移做完，审查只是流程中的一环。“去执行”现有 8 篇，已到 AGENTS.md 规定的检查线。

**横向页面**
- 6 个阶段指南都更新了收录列表、小导图和推荐阅读顺序；“去执行”新增“大迁移、大重构怎么拆给多个代理”，“做验证”新增“AI 审查工具本身该怎么设计”。分歧表新增 5 条：审查该少报还是多报（#31 vs #33）、干净审查说明什么（#31、#32）、审查机器人怎么衡量（#31 vs #33）、工具多了怎么办（#35 vs #36）、推理模型怎么用（#35）。
- 模式库新增 P21–P29（Hooks 确定性闸门、计划存进仓库、迁移分支 + 临时脚手架、依赖图分批、精确率优先审查、投票 + 解决率、测试计划先于实测、专长子代理、用代码调用 MCP）。
- 配置模板库新增模板 14–21：Claude Code 的 4 段 hooks 配置、Gemini CLI 密钥扫描 hook、Grok Build PreToolUse hook、Conductor `workflow.md` 指导原则、Ghostty 的 AGENTS.md 全文（MIT 许可，附许可全文）。上一批的两项缺口已补上，缺口说明同步更新。
- 学习路径、全部资料（含覆盖情况）、总结页同步更新。新增工具标签：Gemini CLI、OpenHands、Devin、Amp。
- 术语表新增 21 个词，例如 Doom Loop、Code Mode、Prompt / Agent Hook、ACP、Fail-open、解决率、精确率 / 召回率、多数投票、迁移脚手架；`Oracle` 词条补充说明 Amp 的同名子代理是另一回事。

**仍未覆盖**：Aider；“把 agent evals 接进 CI”的专门资料；Cursor 后台代理的专门资料；xAI 官方的 Grok 工程博客或大会演讲（本批只有官方文档）。

## 2026-10-09 · 导航改版：按任务阶段分类

**分类原则改为一条轴：按一个 AI 代理开发任务从开始到上线的顺序分组。** 全部 27 份资料重新归入 6 个阶段，每份只放在它主要贡献所在的阶段：

| 阶段 | 资料 |
|---|---|
| [打地基 · 上下文与规范](/guide/foundation) | #20、#21、#14、#26、#07 |
| [做规划 · 需求澄清与任务拆解](/guide/planning) | #03、#06、#04、#13 |
| [去执行 · 从单代理到多代理](/guide/execution) | #27、#11、#05、#08、#23、#17、#18（另有[长时自主任务专题](/guide/long-running)） |
| [做验证 · 测试、评测与审查](/guide/verification) | #25、#12、#15、#19 |
| [自动化 · 后台代理与 CI/CD](/guide/automation) | #01、#02、#10、#22 |
| [看原理 · Harness 与内部机制](/guide/harness) | #09、#24、#16 |

- 主题指南改为 6 个阶段指南：新增“打地基”和“去执行”（合并原“实战与把关”“多代理协作”），其余四个按新的归类重写。旧地址 `/guide/practice`、`/guide/multi-agent` 自动跳转到 `/guide/execution`。
- 顶部导航只放工具页面：学习路径、模式库、配置模板、术语表、更新日志，以及 GitHub 仓库链接。
- 左侧边栏只做内容导航：6 个阶段，每组先放阶段指南再放文章；文章标题去掉编号和标签，改成简洁的中文标题。类型和工具标签保留在文章标题下方。
- 去掉所有分组名后面的篇数。

## 2026-10-09 · 知识库化：新增 12 份资料、第 6 个主题

**新增资料（#16–#27）**

| # | 资料 | 主题 | 类型 |
|---|---|---|---|
| 16 | [Anthropic：Planner / Generator / Evaluator 长时任务 harness](/16-anthropic-harness-design-long-running-apps) | 🧠 Harness 工程 | 文章 |
| 17 | [Anthropic：16 个代理并行写 C 编译器](/17-anthropic-c-compiler-agent-teams) | 🤝 多代理协作 | 文章 |
| 18 | [Cursor：数百代理的 Planner / Worker 实验](/18-cursor-scaling-long-running-agents) | 🤝 多代理协作 | 文章 |
| 19 | [Anthropic：Agent Evals 入门路线图](/19-anthropic-demystifying-agent-evals) | ✅ 评测与验证 | 文章 |
| 20 | [HumanLayer：CLAUDE.md 少即是多](/20-humanlayer-writing-good-claude-md) | 🧭 规划与上下文 | 文章 |
| 21 | [Anthropic：别造代理，写 Skills](/21-anthropic-agent-skills-talk) | 🧭 规划与上下文 | 视频 |
| 22 | [OpenAI：codex exec + GitHub Action 自动修 CI](/22-openai-codex-ci-autofix) | ⚙️ 后台与 CI | 官方文档 |
| 23 | [Cole Medin：5 个并行代理 + worktree](/23-cole-medin-parallel-worktrees) | ⚙️ 后台与 CI | 视频 |
| 24 | [Huntley & Horthy：Ralph 循环 vs 官方插件](/24-huntley-horthy-ralph-loop) | 🧠 Harness 工程 | 视频 |
| 25 | [Simon Willison：测试与验收模式](/25-simonw-agentic-engineering-testing-patterns) | ✅ 评测与验证 | 指南 |
| 26 | [Factory：让代码库为代理做好准备](/26-factory-agent-ready-codebases) | ✅ 评测与验证 | 视频 |
| 27 | [Mitchell Hashimoto：六步 AI 采用路线](/27-mitchellh-ai-adoption-journey) | 🛠️ 实战与把关 | 文章 |

**结构变化**

- 新增第 6 个主题“评测、测试与验证”。复查了 #01–#15，没有需要移入的旧文章（#12、#03、#15 虽然涉及验证，但主线仍属原主题）。
- 资料类型从“只有视频”扩展为 视频 / 文章 / 官方文档 / 指南，侧边栏和文章顶部同时显示类型和工具标签；新增工具标签 Cursor、通用（不限工具）。
- 非视频资料的“基本信息”第一行改为来源卡片（标题、作者、日期、链接），视频仍内嵌播放器。

**新增页面**

- 6 个主题指南（每个主题一页，后已改为阶段指南）+ [长时自主任务专题](/guide/long-running)
- [学习路径](/paths)、[模式库](/patterns)（20 个做法）、配置模板库（13 段原文配置；该页已于 2026-10-09 删除，配置都在各自文章里）、[全部资料](/all)、本页
- 首页改为知识库入口；[总结](/00-summary)更新为覆盖 27 份资料

**术语表**

- 新增 41 个术语和一个分类“七、评测与验证”，共 123 个；补充了 Harness、Evals、Skills、渐进披露、扇出、Loop 等已有词条的说明。

## 2026-10-09 · v3：按内容主题分类

- 分类从“按工具”改为“按内容主题”（5 个主题）。
- 英文原话改为悬停显示中文翻译；术语表链接改为单向（文章 → 术语表），术语表不再列反向引用。
- 每篇“基本信息”第一行内嵌可播放的 YouTube 播放器。

## 2026-10-09 · v2：小白友好改版

- 新增术语表，文章中的术语可悬停查看解释。
- 英文 prompt 和原话配中文翻译；每篇配 2–4 张真实视频截图。
- 按小白友好的写法重写全部文章。

## 2026-10-08 · 首次发布

- 收录 15 个 AI 编程实战视频（Claude Code 6、Codex 5、Grok 4），每个配一篇深度分析，另有总结页。
