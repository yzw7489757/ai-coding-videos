// 分类原则（唯一的轴）：按一个 AI 代理开发任务从开始到上线的顺序分组。
// 每份资料只放进它“主要贡献”所在的那一个阶段。侧边栏、首页、全部资料页和文章顶部标签都从这里取数据。
// 新资料：在对应阶段追加 { n, slug, text, short, tool, type, added? }；文件名编号只是稳定 URL，不代表分类。
// published：原始发布日期（视频取 YouTube 上传日期，用 yt-dlp 核实；文章取原文日期）。拿不到的（持续更新的官方文档 #22 #28 #34）写 ''，排在本阶段末尾。
// 排序：每个阶段内 items 按 published 从新到旧排列（同一天按编号从小到大），侧边栏、首页、全部资料页都按这个顺序。
// text：侧边栏标题（简洁中文，不带编号和标签）；short：首页思维导图短标签（不要用括号）；added：收录日期。
export const tools = {
  claude: 'Claude Code',
  codex: 'Codex',
  grok45: 'Cursor + Grok 4.5',
  grokbuild: 'Grok Build',
  cursor: 'Cursor',
  gemini: 'Gemini CLI',
  openhands: 'OpenHands',
  devin: 'Devin',
  amp: 'Amp',
  aider: 'Aider',
  factory: 'Factory Droid',
  jetbrains: 'JetBrains Air',
  general: '通用（不限工具）'
}

// 资料类型：视频文章在“基本信息”第一行放 <YouTube>，其余类型放 <SourceCard>
export const types = {
  video: '视频',
  article: '文章',
  docs: '官方文档',
  guide: '指南'
}

// 阶段：id 用于 URL（/guide/<id>），no 表示顺序；label = `${name} · ${sub}`（菜单里不显示序号）
export const domains = [
  {
    id: 'foundation',
    no: '1',
    name: '打地基',
    sub: '上下文与规范',
    icon: '🧱',
    desc: '让代理每次开工都拿到对的上下文：规则文件、Skills、团队规范，以及能被自动验证的代码库。',
    items: [
      { n: '49', slug: '49-anthropic-scion-source-control', text: '为代理重做源代码管理', short: '代理规模的源码管理', tool: 'general', type: 'article', added: '2026-10-14', published: '2026-10-13' },
      { n: '52', slug: '52-claude-code-mods', text: 'Claude Code mods：可编程的扩展', short: 'Claude Code mods', tool: 'claude', type: 'article', added: '2026-10-15', published: '2026-10-01' },
      { n: '46', slug: '46-grok-build-memory', text: 'Grok Build 的跨会话记忆', short: 'Grok Build 记忆', tool: 'grokbuild', type: 'article', added: '2026-10-13', published: '2026-09-16' },
      { n: '37', slug: '37-cursor-cloud-agent-environment', text: '把开发环境做成给代理用的产品', short: '代理用的开发环境', tool: 'cursor', type: 'article', added: '2026-10-12', published: '2026-07-30' },
      { n: '14', slug: '14-orcdev-grok-build-skills', text: '用 Skills 约束 UI 风格', short: 'Skills 管 UI 风格', tool: 'grokbuild', type: 'video', published: '2026-05-19' },
      { n: '07', slug: '07-harness-engineering', text: '把团队规范变成 lint 和测试', short: '规范变 lint 和测试', tool: 'codex', type: 'video', published: '2026-04-17' },
      { n: '26', slug: '26-factory-agent-ready-codebases', text: '让代码库为代理做好准备', short: '8 根验证支柱', tool: 'general', type: 'video', added: '2026-10-09', published: '2025-12-22' },
      { n: '21', slug: '21-anthropic-agent-skills-talk', text: '别造代理，写 Skills', short: 'Skills 按需加载', tool: 'claude', type: 'video', added: '2026-10-09', published: '2025-12-08' },
      { n: '20', slug: '20-humanlayer-writing-good-claude-md', text: 'CLAUDE.md 怎么写：少即是多', short: '规则文件少即是多', tool: 'claude', type: 'article', added: '2026-10-09', published: '2025-11-25' },
      { n: '28', slug: '28-claude-code-hooks-guide', text: 'Hooks：让规则一定会执行', short: 'Hooks 确定性规则', tool: 'claude', type: 'docs', added: '2026-10-09', published: '' }
    ]
  },
  {
    id: 'planning',
    no: '2',
    name: '做规划',
    sub: '需求澄清与任务拆解',
    icon: '📝',
    desc: '动手前把需求问清楚、把任务拆好：让代理采访你、找出未知、研究→计划→实施、plan mode。',
    items: [
      { n: '64', slug: '64-giant-swarm-spec-driven-development', text: '把审查挪到计划：五步规格驱动', short: '审计划不审 diff', tool: 'general', type: 'article', added: '2026-10-19', published: '2026-10-13' },
      { n: '68', slug: '68-plan-to-unattended-agent-runs', text: '计划切成带程序验收的短会话', short: '完成合约短会话', tool: 'general', type: 'article', added: '2026-10-19', published: '2026-10-09' },
      { n: '06', slug: '06-field-guide-to-fable', text: '找出未知，给上下文做减法', short: '找未知 做减法', tool: 'claude', type: 'video', published: '2026-07-06' },
      { n: '03', slug: '03-how-we-claude-code', text: '访谈式需求与可验证组件', short: '访谈式需求', tool: 'claude', type: 'video', published: '2026-05-23' },
      { n: '13', slug: '13-bijan-bowen-grok-build', text: 'Grok Build 实测：从计划到执行', short: 'plan mode 实测', tool: 'grokbuild', type: 'video', published: '2026-05-15' },
      { n: '61', slug: '61-codex-long-horizon-tasks', text: 'Codex 跑 25 小时的四份 Markdown', short: '四份 Markdown 长任务', tool: 'codex', type: 'article', added: '2026-10-19', published: '2026-02-23' },
      { n: '29', slug: '29-gemini-cli-conductor', text: 'Conductor：把计划写进仓库', short: 'Conductor 上下文驱动', tool: 'gemini', type: 'article', added: '2026-10-09', published: '2025-12-17' },
      { n: '04', slug: '04-no-vibes-allowed-rpi', text: 'RPI：研究、计划、实施', short: 'RPI 有意压缩', tool: 'claude', type: 'video', published: '2025-12-02' }
    ]
  },
  {
    id: 'solo',
    no: '3',
    name: '单代理推进与一人多线',
    sub: '一个人怎么驾驭代理',
    icon: '🚀',
    desc: '一个人用好一个主代理：起步建立判断、让代理边做边检查自己、多份工作目录并行推进，以及什么时候派子代理。',
    items: [
      { n: '42', slug: '42-openai-cooking-with-codex', text: 'Codex 应用实战：从上下文到自动化', short: 'Codex 应用全景', tool: 'codex', type: 'video', added: '2026-10-13', published: '2026-10-06' },
      { n: '72', slug: '72-claude-code-spending-effort', text: 'effort 档位：低档迭代高档验证', short: 'effort 低档迭代 高档验证', tool: 'claude', type: 'article', added: '2026-10-20', published: '2026-09-25' },
      { n: '78', slug: '78-claude-code-task-cost', text: '一个任务花多少钱：轮数与缓存', short: '轮数 缓存 先加检查', tool: 'claude', type: 'article', added: '2026-10-21', published: '2026-09-25' },
      { n: '79', slug: '79-codex-remote-phone-control-plane', text: '手机当 Codex 控制台', short: '排队还是插话 最窄权限', tool: 'codex', type: 'article', added: '2026-10-21', published: '2026-06-23' },
      { n: '08', slug: '08-codex-masterclass', text: 'Codex 子代理、Hooks 与插件', short: '子代理切片审查', tool: 'codex', type: 'video', published: '2026-04-29' },
      { n: '23', slug: '23-cole-medin-parallel-worktrees', text: '5 个并行代理 + worktree', short: 'worktree 并行', tool: 'claude', type: 'video', added: '2026-10-09', published: '2026-04-23' },
      { n: '11', slug: '11-peter-steinberger-openclaw', text: '一个人用 Codex 建 OpenClaw', short: 'Steinberger 十个 checkout', tool: 'codex', type: 'video', published: '2026-02-24' },
      { n: '27', slug: '27-mitchellh-ai-adoption-journey', text: '从怀疑到离不开：六步采用 AI', short: 'Mitchell 六步采用', tool: 'general', type: 'article', added: '2026-10-09', published: '2026-02-05' }
    ]
  },
  {
    id: 'multi',
    no: '4',
    name: '多代理协作与大任务拆分',
    sub: '分工、协调与长时运行',
    icon: '🤝',
    desc: '多个代理围绕同一个目标：什么时候该用、怎么分工和协调、互相依赖的大迁移怎么拆，以及长时自主任务。',
    items: [
      { n: '76', slug: '76-cohere-agent-teams-cost', text: '多代理团队值不值：受控实验', short: '工人放在瓶颈上 强领队便宜工人', tool: 'general', type: 'article', added: '2026-10-21', published: '2026-10-14' },
      { n: '74', slug: '74-blocshop-dotnet-multi-repo-migration', text: '十个仓库的 .NET 迁移', short: '主代理管依赖图', tool: 'general', type: 'article', added: '2026-10-20', published: '2026-09-30' },
      { n: '65', slug: '65-grok-build-workflows', text: 'Grok Build Workflows：后台扇出脚本', short: 'Workflows 后台扇出', tool: 'grokbuild', type: 'article', added: '2026-10-19', published: '2026-07-23' },
      { n: '17', slug: '17-anthropic-c-compiler-agent-teams', text: '16 个代理并行写 C 编译器', short: '16 代理写编译器', tool: 'claude', type: 'article', added: '2026-10-09', published: '2026-02-05' },
      { n: '05', slug: '05-indydevdan-task-system', text: 'Builder + Validator 代理团队', short: 'Builder 加 Validator', tool: 'claude', type: 'video', published: '2026-02-02' },
      { n: '18', slug: '18-cursor-scaling-long-running-agents', text: '数百个代理协作写浏览器', short: '数百代理分层', tool: 'cursor', type: 'article', added: '2026-10-09', published: '2026-01-14' },
      { n: '30', slug: '30-openhands-parallel-refactors', text: '大型重构拆给并行代理', short: '并行代理做大重构', tool: 'openhands', type: 'video', added: '2026-10-09', published: '2026-01-08' },
      { n: '73', slug: '73-anthropic-effective-harnesses-long-running', text: '长任务的功能清单与进度文件', short: '功能清单 进度文件', tool: 'claude', type: 'article', added: '2026-10-20', published: '2025-11-26' }
    ]
  },
  {
    id: 'review',
    no: '5',
    name: '验收这一次的产出',
    sub: '测试、审查与完成标准',
    icon: '✅',
    desc: '确认代理这一次真的做完、做对：测试驱动、代理手动测试、人工与对抗式审查、AI 审查器和独立的完成标准。',
    items: [
      { n: '60', slug: '60-claude-code-team-code-review', text: '代码审查的七层把关', short: '七层审查 按风险定人数', tool: 'claude', type: 'article', added: '2026-10-19', published: '2026-10-15' },
      { n: '15', slug: '15-arcade-grok-build-57-agents', text: '57 个子代理与对抗式验证', short: 'skeptic 证伪', tool: 'grokbuild', type: 'video', published: '2026-09-09' },
      { n: '59', slug: '59-factory-large-software-tasks', text: '先建完成标准，再让代理做大任务', short: '独立完成标准', tool: 'factory', type: 'article', added: '2026-10-16', published: '2026-08-27' },
      { n: '75', slug: '75-codex-custom-code-review-rules', text: '把审查规则写进 AGENTS.md', short: 'AGENTS.md 审查规则', tool: 'codex', type: 'article', added: '2026-10-20', published: '2026-07-20' },
      { n: '12', slug: '12-forrestknight-grok-4-5', text: '测试全绿也要读代码', short: '测试全绿也要读', tool: 'grok45', type: 'video', published: '2026-07-10' },
      { n: '71', slug: '71-openhands-verification-stack', text: '验证栈：轨迹打分加 PR 真跑', short: 'critic 加 QA 真跑', tool: 'openhands', type: 'article', added: '2026-10-19', published: '2026-06-22' },
      { n: '32', slug: '32-cognition-verifying-agentic-development', text: 'Devin 用 Computer Use 自测', short: 'Devin 带证据交付', tool: 'devin', type: 'article', added: '2026-10-09', published: '2026-05-29' },
      { n: '25', slug: '25-simonw-agentic-engineering-testing-patterns', text: '测试驱动与代理手动测试', short: 'TDD 与手动测试', tool: 'general', type: 'guide', added: '2026-10-09', published: '2026-02-23' },
      { n: '31', slug: '31-openai-verifying-code-at-scale', text: 'AI 代码审查：精确率优先', short: '审查精确率优先', tool: 'codex', type: 'article', added: '2026-10-09', published: '2025-12-01' }
    ]
  },
  {
    id: 'evals',
    no: '6',
    name: '评测代理本身与给动作把关',
    sub: '评测、分类器与分数噪声',
    icon: '📏',
    desc: '不只看一次产出，而是系统地评测代理和它的配置：评测零件与 pass@k、给 Skill 写评测、评测分数里的噪声，以及给代理动作把关的权限分类器。',
    items: [
      { n: '69', slug: '69-google-eval-engineering-lessons', text: '按执行轨迹打分的四条评测教训', short: '轨迹打分 双条件', tool: 'general', type: 'article', added: '2026-10-19', published: '2026-10-17' },
      { n: '77', slug: '77-expo-skill-evals', text: '给 Skills 做评测：会被找到吗', short: 'Skill 触发 入口路由 目录截断', tool: 'claude', type: 'article', added: '2026-10-21', published: '2026-10-08' },
      { n: '62', slug: '62-claude-eval-design-hillclimbing', text: '评测设计与爬分不自欺', short: '留出集爬分', tool: 'claude', type: 'article', added: '2026-10-19', published: '2026-09-28' },
      { n: '39', slug: '39-cursor-auto-review-classifier', text: 'Auto-review：分类器与评测', short: '风险分类器与评测', tool: 'cursor', type: 'article', added: '2026-10-12', published: '2026-06-11' },
      { n: '56', slug: '56-anthropic-claude-code-auto-mode', text: 'auto mode：两段式权限分类器', short: '两段式权限分类器', tool: 'claude', type: 'article', added: '2026-10-15', published: '2026-03-25' },
      { n: '50', slug: '50-anthropic-infrastructure-noise', text: '评测分数里的基础设施噪声', short: '评测里的基础设施噪声', tool: 'general', type: 'article', added: '2026-10-14', published: '2026-02-05' },
      { n: '47', slug: '47-openai-eval-skills', text: '给 Skill 写评测', short: 'Skill 评测', tool: 'codex', type: 'article', added: '2026-10-14', published: '2026-01-22' },
      { n: '19', slug: '19-anthropic-demystifying-agent-evals', text: 'Agent Evals 入门', short: 'Agent Evals', tool: 'general', type: 'article', added: '2026-10-09', published: '2026-01-09' }
    ]
  },
  {
    id: 'ci',
    no: '7',
    name: '接进 PR 与 CI',
    sub: '触发、审查与流水线',
    icon: '⚙️',
    desc: '让代理脱离聊天框、接进团队流水线：定时与事件触发、无人值守的规则、PR 审查机器人和 CI 自动修复。',
    items: [
      { n: '63', slug: '63-openai-gpt-6-software-maintenance', text: '让代理批量开维护 PR', short: '维护 PR 删死代码', tool: 'codex', type: 'article', added: '2026-10-19', published: '2026-10-14' },
      { n: '41', slug: '41-anthropic-agent-automations', text: '定时代理自动化的六条规则', short: '定时代理六规则', tool: 'claude', type: 'article', added: '2026-10-13', published: '2026-10-08' },
      { n: '57', slug: '57-claude-continuous-evals-in-ci', text: '把 agent evals 接进 CI', short: '配置变更跑评测', tool: 'claude', type: 'guide', added: '2026-10-16', published: '2026-08-21' },
      { n: '10', slug: '10-how-openai-uses-codex', text: 'OpenAI 用 Codex 守住 PR 质量', short: 'PR 审查 CI 看护', tool: 'codex', type: 'video', published: '2026-05-28' },
      { n: '55', slug: '55-openai-skills-oss-maintenance', text: '用 Skills 维护开源仓库', short: 'Skills 接进 CI', tool: 'codex', type: 'article', added: '2026-10-15', published: '2026-03-09' },
      { n: '67', slug: '67-cognition-devin-builds-devin', text: 'Cognition 把 Devin 接进日常', short: '标签与事件触发代理', tool: 'devin', type: 'article', added: '2026-10-19', published: '2026-02-27' },
      { n: '33', slug: '33-cursor-building-bugbot', text: 'Bugbot：用解决率迭代审查机器人', short: 'Bugbot 解决率', tool: 'cursor', type: 'article', added: '2026-10-09', published: '2026-01-15' },
      { n: '22', slug: '22-openai-codex-ci-autofix', text: 'CI 挂了让 Codex 自动修', short: 'codex exec 修 CI', tool: 'codex', type: 'docs', added: '2026-10-09', published: '' },
      { n: '34', slug: '34-grok-build-headless-hooks', text: 'Grok Build 跑进脚本和 CI', short: 'Grok Build 无人值守', tool: 'grokbuild', type: 'docs', added: '2026-10-09', published: '' }
    ]
  },
  {
    id: 'cloud',
    no: '8',
    name: '云端与后台运行环境',
    sub: '代理在哪里跑',
    icon: '☁️',
    desc: '让代理离开你的笔记本：云端会话、托管 VM、自托管执行机器和沙箱机队，以及背后的持久化与安全布局。',
    items: [
      { n: '53', slug: '53-factory-opencompute', text: 'OpenCompute：给代理按需发电脑', short: '代理沙箱机队', tool: 'factory', type: 'article', added: '2026-10-15', published: '2026-10-14' },
      { n: '70', slug: '70-jetbrains-air-cloud-sandboxing', text: 'Air 云端沙箱：每任务新 VM', short: '每任务 VM 出站白名单', tool: 'jetbrains', type: 'article', added: '2026-10-19', published: '2026-10-14' },
      { n: '48', slug: '48-claude-code-cloud-sessions', text: 'Claude Code 云端会话实战', short: 'Claude Code 云端会话', tool: 'claude', type: 'article', added: '2026-10-14', published: '2026-10-06' },
      { n: '58', slug: '58-cursor-projects', text: 'Projects：一个协调代理管一群子代理', short: '协调代理派活', tool: 'cursor', type: 'article', added: '2026-10-16', published: '2026-09-10' },
      { n: '02', slug: '02-claude-code-team-workflows', text: 'Claude Code 团队的工作流', short: 'Slack 派活 扇出审查', tool: 'claude', type: 'video', published: '2026-09-02' },
      { n: '51', slug: '51-cursor-self-hosted-machines', text: '云端代理跑在自己的机器上', short: '自托管执行机器', tool: 'cursor', type: 'article', added: '2026-10-14', published: '2026-09-02' },
      { n: '01', slug: '01-claude-code-one-year', text: 'Claude Code 一周年：验证与 Routines', short: 'Routines 与验证', tool: 'claude', type: 'video', published: '2026-06-08' },
      { n: '40', slug: '40-cursor-cloud-agent-lessons', text: '云端代理一年的四条教训', short: '云端代理运行层', tool: 'cursor', type: 'article', added: '2026-10-12', published: '2026-06-02' }
    ]
  },
  {
    id: 'harness',
    no: '9',
    name: '看原理',
    sub: 'Harness 与内部机制',
    icon: '🧠',
    desc: '理解代理外壳怎么工作：上下文、权限、循环和“做与查分离”背后的设计。',
    items: [
      { n: '43', slug: '43-codex-app-server', text: '在 Codex harness 上做自己的客户端', short: 'Codex app server', tool: 'codex', type: 'video', added: '2026-10-13', published: '2026-10-09' },
      { n: '54', slug: '54-cursor-token-efficiency', text: '长任务的 token 省在哪', short: 'harness 省 token', tool: 'cursor', type: 'article', added: '2026-10-15', published: '2026-09-23' },
      { n: '09', slug: '09-how-codex-works', text: 'Codex Harness 内部机制', short: 'Codex harness 拆解', tool: 'codex', type: 'video', published: '2026-08-10' },
      { n: '66', slug: '66-harness-engineering-eleven-systems', text: '源码解剖 11 个代理外壳', short: '11 个外壳源码解剖', tool: 'general', type: 'article', added: '2026-10-19', published: '2026-07-15' },
      { n: '45', slug: '45-anthropic-managed-agents', text: 'Managed Agents：大脑与双手解耦', short: '大脑与双手解耦', tool: 'claude', type: 'article', added: '2026-10-13', published: '2026-04-08' },
      { n: '16', slug: '16-anthropic-harness-design-long-running-apps', text: 'Planner / Generator / Evaluator 长时 harness', short: 'Planner Generator Evaluator', tool: 'claude', type: 'article', added: '2026-10-09', published: '2026-03-24' },
      { n: '38', slug: '38-cursor-self-driving-codebases', text: '多代理 harness 的五次改版', short: '递归 Planner 加 handoff', tool: 'cursor', type: 'article', added: '2026-10-12', published: '2026-02-05' },
      { n: '24', slug: '24-huntley-horthy-ralph-loop', text: 'Ralph 循环：为什么每轮重开', short: 'Ralph 循环', tool: 'claude', type: 'video', added: '2026-10-09', published: '2026-01-04' },
      { n: '35', slug: '35-amp-next-generation-ai-coding', text: 'Amp 的专长子代理架构', short: 'Amp 专长子代理', tool: 'amp', type: 'video', added: '2026-10-09', published: '2025-12-22' },
      { n: '36', slug: '36-anthropic-code-execution-with-mcp', text: '用代码调用 MCP 省上下文', short: '代码调用 MCP', tool: 'general', type: 'article', added: '2026-10-09', published: '2025-11-04' },
      { n: '44', slug: '44-aider-architect-editor', text: 'Architect / Editor：推理与编辑分开', short: 'Architect Editor 双模型', tool: 'aider', type: 'article', added: '2026-10-13', published: '2024-09-26' }
    ]
  }
]

export const stageLabel = (d) => `${d.name} · ${d.sub}`
export const toolTag = (k) => `<span class="tool-tag tool-${k}">${tools[k]}</span>`
export const typeTag = (k) => `<span class="type-tag type-${k}">${types[k]}</span>`
export const allItems = () => domains.flatMap((d) => d.items.map((i) => ({ ...i, domain: d })))
export const domainOf = (slug) => domains.find((d) => d.items.some((i) => i.slug === slug))
