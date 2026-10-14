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
      { n: '06', slug: '06-field-guide-to-fable', text: '找出未知，给上下文做减法', short: '找未知 做减法', tool: 'claude', type: 'video', published: '2026-07-06' },
      { n: '03', slug: '03-how-we-claude-code', text: '访谈式需求与可验证组件', short: '访谈式需求', tool: 'claude', type: 'video', published: '2026-05-23' },
      { n: '13', slug: '13-bijan-bowen-grok-build', text: 'Grok Build 实测：从计划到执行', short: 'plan mode 实测', tool: 'grokbuild', type: 'video', published: '2026-05-15' },
      { n: '29', slug: '29-gemini-cli-conductor', text: 'Conductor：把计划写进仓库', short: 'Conductor 上下文驱动', tool: 'gemini', type: 'article', added: '2026-10-09', published: '2025-12-17' },
      { n: '04', slug: '04-no-vibes-allowed-rpi', text: 'RPI：研究、计划、实施', short: 'RPI 有意压缩', tool: 'claude', type: 'video', published: '2025-12-02' }
    ]
  },
  {
    id: 'execution',
    no: '3',
    name: '去执行',
    sub: '从单代理到多代理',
    icon: '🚀',
    desc: '让代理把活干完：真实项目里的单代理用法，到子代理、并行 worktree、代理团队和长时自主任务。',
    items: [
      { n: '42', slug: '42-openai-cooking-with-codex', text: 'Codex 应用实战：从上下文到自动化', short: 'Codex 应用全景', tool: 'codex', type: 'video', added: '2026-10-13', published: '2026-10-06' },
      { n: '08', slug: '08-codex-masterclass', text: 'Codex 子代理、Hooks 与插件', short: '子代理切片审查', tool: 'codex', type: 'video', published: '2026-04-29' },
      { n: '23', slug: '23-cole-medin-parallel-worktrees', text: '5 个并行代理 + worktree', short: 'worktree 并行', tool: 'claude', type: 'video', added: '2026-10-09', published: '2026-04-23' },
      { n: '11', slug: '11-peter-steinberger-openclaw', text: '一个人用 Codex 建 OpenClaw', short: 'Steinberger 十个 checkout', tool: 'codex', type: 'video', published: '2026-02-24' },
      { n: '17', slug: '17-anthropic-c-compiler-agent-teams', text: '16 个代理并行写 C 编译器', short: '16 代理写编译器', tool: 'claude', type: 'article', added: '2026-10-09', published: '2026-02-05' },
      { n: '27', slug: '27-mitchellh-ai-adoption-journey', text: '从怀疑到离不开：六步采用 AI', short: 'Mitchell 六步采用', tool: 'general', type: 'article', added: '2026-10-09', published: '2026-02-05' },
      { n: '05', slug: '05-indydevdan-task-system', text: 'Builder + Validator 代理团队', short: 'Builder 加 Validator', tool: 'claude', type: 'video', published: '2026-02-02' },
      { n: '18', slug: '18-cursor-scaling-long-running-agents', text: '数百个代理协作写浏览器', short: '数百代理分层', tool: 'cursor', type: 'article', added: '2026-10-09', published: '2026-01-14' },
      { n: '30', slug: '30-openhands-parallel-refactors', text: '大型重构拆给并行代理', short: '并行代理做大重构', tool: 'openhands', type: 'video', added: '2026-10-09', published: '2026-01-08' }
    ]
  },
  {
    id: 'verification',
    no: '4',
    name: '做验证',
    sub: '测试、评测与审查',
    icon: '✅',
    desc: '确认代理真的做完、做对：测试驱动、代理手动测试、人工与对抗式审查、系统评测。',
    items: [
      { n: '15', slug: '15-arcade-grok-build-57-agents', text: '57 个子代理与对抗式验证', short: 'skeptic 证伪', tool: 'grokbuild', type: 'video', published: '2026-09-09' },
      { n: '12', slug: '12-forrestknight-grok-4-5', text: '测试全绿也要读代码', short: '测试全绿也要读', tool: 'grok45', type: 'video', published: '2026-07-10' },
      { n: '39', slug: '39-cursor-auto-review-classifier', text: 'Auto-review：分类器与评测', short: '风险分类器与评测', tool: 'cursor', type: 'article', added: '2026-10-12', published: '2026-06-11' },
      { n: '32', slug: '32-cognition-verifying-agentic-development', text: 'Devin 用 Computer Use 自测', short: 'Devin 带证据交付', tool: 'devin', type: 'article', added: '2026-10-09', published: '2026-05-29' },
      { n: '25', slug: '25-simonw-agentic-engineering-testing-patterns', text: '测试驱动与代理手动测试', short: 'TDD 与手动测试', tool: 'general', type: 'guide', added: '2026-10-09', published: '2026-02-23' },
      { n: '50', slug: '50-anthropic-infrastructure-noise', text: '评测分数里的基础设施噪声', short: '评测里的基础设施噪声', tool: 'general', type: 'article', added: '2026-10-14', published: '2026-02-05' },
      { n: '47', slug: '47-openai-eval-skills', text: '给 Skill 写评测', short: 'Skill 评测', tool: 'codex', type: 'article', added: '2026-10-14', published: '2026-01-22' },
      { n: '19', slug: '19-anthropic-demystifying-agent-evals', text: 'Agent Evals 入门', short: 'Agent Evals', tool: 'general', type: 'article', added: '2026-10-09', published: '2026-01-09' },
      { n: '31', slug: '31-openai-verifying-code-at-scale', text: 'AI 代码审查：精确率优先', short: '审查精确率优先', tool: 'codex', type: 'article', added: '2026-10-09', published: '2025-12-01' }
    ]
  },
  {
    id: 'automation',
    no: '5',
    name: '自动化',
    sub: '后台代理与 CI/CD',
    icon: '⚙️',
    desc: '让代理脱离聊天框：事件触发、后台运行、PR 审查和 CI 自动修复。',
    items: [
      { n: '41', slug: '41-anthropic-agent-automations', text: '定时代理自动化的六条规则', short: '定时代理六规则', tool: 'claude', type: 'article', added: '2026-10-13', published: '2026-10-08' },
      { n: '48', slug: '48-claude-code-cloud-sessions', text: 'Claude Code 云端会话实战', short: 'Claude Code 云端会话', tool: 'claude', type: 'article', added: '2026-10-14', published: '2026-10-06' },
      { n: '02', slug: '02-claude-code-team-workflows', text: 'Claude Code 团队的工作流', short: 'Slack 派活 扇出审查', tool: 'claude', type: 'video', published: '2026-09-02' },
      { n: '51', slug: '51-cursor-self-hosted-machines', text: '云端代理跑在自己的机器上', short: '自托管执行机器', tool: 'cursor', type: 'article', added: '2026-10-14', published: '2026-09-02' },
      { n: '01', slug: '01-claude-code-one-year', text: 'Claude Code 一周年：验证与 Routines', short: 'Routines 与验证', tool: 'claude', type: 'video', published: '2026-06-08' },
      { n: '40', slug: '40-cursor-cloud-agent-lessons', text: '云端代理一年的四条教训', short: '云端代理运行层', tool: 'cursor', type: 'article', added: '2026-10-12', published: '2026-06-02' },
      { n: '10', slug: '10-how-openai-uses-codex', text: 'OpenAI 用 Codex 守住 PR 质量', short: 'PR 审查 CI 看护', tool: 'codex', type: 'video', published: '2026-05-28' },
      { n: '33', slug: '33-cursor-building-bugbot', text: 'Bugbot：用解决率迭代审查机器人', short: 'Bugbot 解决率', tool: 'cursor', type: 'article', added: '2026-10-09', published: '2026-01-15' },
      { n: '22', slug: '22-openai-codex-ci-autofix', text: 'CI 挂了让 Codex 自动修', short: 'codex exec 修 CI', tool: 'codex', type: 'docs', added: '2026-10-09', published: '' },
      { n: '34', slug: '34-grok-build-headless-hooks', text: 'Grok Build 跑进脚本和 CI', short: 'Grok Build 无人值守', tool: 'grokbuild', type: 'docs', added: '2026-10-09', published: '' }
    ]
  },
  {
    id: 'harness',
    no: '6',
    name: '看原理',
    sub: 'Harness 与内部机制',
    icon: '🧠',
    desc: '理解代理外壳怎么工作：上下文、权限、循环和“做与查分离”背后的设计。',
    items: [
      { n: '43', slug: '43-codex-app-server', text: '在 Codex harness 上做自己的客户端', short: 'Codex app server', tool: 'codex', type: 'video', added: '2026-10-13', published: '2026-10-09' },
      { n: '09', slug: '09-how-codex-works', text: 'Codex Harness 内部机制', short: 'Codex harness 拆解', tool: 'codex', type: 'video', published: '2026-08-10' },
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
