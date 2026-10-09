// 按“内容主题”分类（不是按工具）。侧边栏、导航、全部资料页和文章顶部标签都从这里取数据。
// 新资料：在合适的主题里追加一项 { n, slug, text, short, tool, type, added? }；文件名编号只是稳定 URL，不代表分类。
// short：首页思维导图里的短标签（几个词，不要用括号）；added：收录日期（首页“最近收录”用，只给最新一批写）。
export const tools = {
  claude: 'Claude Code',
  codex: 'Codex',
  grok45: 'Cursor + Grok 4.5',
  grokbuild: 'Grok Build',
  cursor: 'Cursor',
  general: '通用（不限工具）'
}

// 资料类型：视频文章在“基本信息”第一行放 <YouTube>，其余类型放 <SourceCard>
export const types = {
  video: '视频',
  article: '文章',
  docs: '官方文档',
  guide: '指南'
}

export const domains = [
  {
    id: 'practice',
    short: '实战与把关',
    name: '真实项目实战与人工把关',
    icon: '🛠️',
    desc: '一个人维护大型开源项目、新工具上手实测、逐行审查 AI 产出，以及从怀疑到熟练的采用路线。',
    items: [
      { n: '11', slug: '11-peter-steinberger-openclaw', text: 'Peter Steinberger：用 Codex 建 OpenClaw', short: 'Steinberger 十个 checkout', tool: 'codex', type: 'video' },
      { n: '14', slug: '14-orcdev-grok-build-skills', text: 'OrcDev：Skills 约束设计的 UI 开发', short: 'OrcDev Skills 管风格', tool: 'grokbuild', type: 'video' },
      { n: '13', slug: '13-bijan-bowen-grok-build', text: 'Bijan Bowen：Grok Build 完整实测', short: 'Bijan Grok Build 实测', tool: 'grokbuild', type: 'video' },
      { n: '12', slug: '12-forrestknight-grok-4-5', text: 'ForrestKnight：Grok 4.5 实战与代码审查', short: 'ForrestKnight 读代码', tool: 'grok45', type: 'video' },
      { n: '27', slug: '27-mitchellh-ai-adoption-journey', text: 'Mitchell Hashimoto：六步 AI 采用路线', short: 'Mitchell 六步采用', tool: 'general', type: 'article', added: '2026-10-09' }
    ]
  },
  {
    id: 'planning',
    short: '规划与上下文',
    name: '需求澄清、规划与上下文管理',
    icon: '🧭',
    desc: '动手前先把需求问清楚；Research → Plan → Implement；规则文件少即是多；Skills 按需加载。',
    items: [
      { n: '03', slug: '03-how-we-claude-code', text: 'How we Claude Code：访谈式需求与可验证组件', short: '访谈式需求', tool: 'claude', type: 'video' },
      { n: '06', slug: '06-field-guide-to-fable', text: 'Field Guide to Fable：找出未知、上下文减法', short: '找未知 做减法', tool: 'claude', type: 'video' },
      { n: '04', slug: '04-no-vibes-allowed-rpi', text: 'No Vibes Allowed：RPI 与有意压缩', short: 'RPI 有意压缩', tool: 'claude', type: 'video' },
      { n: '20', slug: '20-humanlayer-writing-good-claude-md', text: 'HumanLayer：CLAUDE.md 少即是多', short: 'CLAUDE.md 少即是多', tool: 'claude', type: 'article', added: '2026-10-09' },
      { n: '21', slug: '21-anthropic-agent-skills-talk', text: 'Anthropic：别造代理，写 Skills', short: 'Skills 渐进加载', tool: 'claude', type: 'video', added: '2026-10-09' }
    ]
  },
  {
    id: 'multi-agent',
    short: '多代理协作',
    name: '多代理协作与对抗式验证',
    icon: '🤝',
    desc: '一个写、一个查；按角色配置子代理；从十几个到数百个代理，协调方式怎么变。',
    items: [
      { n: '05', slug: '05-indydevdan-task-system', text: 'IndyDevDan：Builder / Validator 代理团队', short: 'Builder 加 Validator', tool: 'claude', type: 'video' },
      { n: '08', slug: '08-codex-masterclass', text: 'Codex Masterclass：子代理、Hooks 与插件', short: '子代理切片审查', tool: 'codex', type: 'video' },
      { n: '15', slug: '15-arcade-grok-build-57-agents', text: 'Arcade：57 个子代理与 /goal 对抗验证', short: '57 子代理 加 skeptic', tool: 'grokbuild', type: 'video' },
      { n: '17', slug: '17-anthropic-c-compiler-agent-teams', text: 'Anthropic：16 个代理并行写 C 编译器', short: '16 代理写编译器', tool: 'claude', type: 'article', added: '2026-10-09' },
      { n: '18', slug: '18-cursor-scaling-long-running-agents', text: 'Cursor：数百代理的 Planner / Worker 实验', short: '数百代理分层', tool: 'cursor', type: 'article', added: '2026-10-09' }
    ]
  },
  {
    id: 'automation',
    short: '后台与 CI',
    name: '后台代理、自动化与 CI/CD',
    icon: '⚙️',
    desc: 'Routines 和 /loop 在后台跑；worktree 并行开发；PR 先过代理审查；代理在 CI 里自动修复。',
    items: [
      { n: '01', slug: '01-claude-code-one-year', text: 'Claude Code 一周年：验证、Routines、Auto mode', short: 'Routines 与验证', tool: 'claude', type: 'video' },
      { n: '02', slug: '02-claude-code-team-workflows', text: 'Claude Code 团队：Claude Tag 与扇出 Workflows', short: 'Slack 派活 扇出审查', tool: 'claude', type: 'video' },
      { n: '10', slug: '10-how-openai-uses-codex', text: 'How OpenAI Uses Codex：验证飞轮与 PR 看护', short: 'PR 审查 CI 看护', tool: 'codex', type: 'video' },
      { n: '22', slug: '22-openai-codex-ci-autofix', text: 'OpenAI：codex exec + GitHub Action 自动修 CI', short: 'codex exec 修 CI', tool: 'codex', type: 'docs', added: '2026-10-09' },
      { n: '23', slug: '23-cole-medin-parallel-worktrees', text: 'Cole Medin：5 个并行代理 + worktree', short: 'worktree 并行', tool: 'claude', type: 'video', added: '2026-10-09' }
    ]
  },
  {
    id: 'harness',
    short: 'Harness 工程',
    name: 'Harness 工程与内部机制',
    icon: '🧠',
    desc: '代理外壳怎么工作；把团队标准写成 lint 和测试；长时任务的循环、上下文与做查分离。',
    items: [
      { n: '09', slug: '09-how-codex-works', text: 'How Codex Works：Harness 内部机制', short: 'Codex harness 拆解', tool: 'codex', type: 'video' },
      { n: '07', slug: '07-harness-engineering', text: 'Harness Engineering：人掌舵、代理执行', short: '标准变 lint 和测试', tool: 'codex', type: 'video' },
      { n: '16', slug: '16-anthropic-harness-design-long-running-apps', text: 'Anthropic：Planner / Generator / Evaluator 长时任务 harness', short: 'Planner Generator Evaluator', tool: 'claude', type: 'article', added: '2026-10-09' },
      { n: '24', slug: '24-huntley-horthy-ralph-loop', text: 'Huntley & Horthy：Ralph 循环 vs 官方插件', short: 'Ralph 循环', tool: 'claude', type: 'video', added: '2026-10-09' }
    ]
  },
  {
    id: 'verification',
    short: '评测与验证',
    name: '评测、测试与验证',
    icon: '✅',
    desc: '给代理出考卷（evals）、用测试约束代理、让代码库可被自动验证。',
    items: [
      { n: '19', slug: '19-anthropic-demystifying-agent-evals', text: 'Anthropic：Agent Evals 入门路线图', short: 'Agent Evals', tool: 'general', type: 'article', added: '2026-10-09' },
      { n: '25', slug: '25-simonw-agentic-engineering-testing-patterns', text: 'Simon Willison：测试与验收模式', short: 'TDD 与手动测试', tool: 'general', type: 'guide', added: '2026-10-09' },
      { n: '26', slug: '26-factory-agent-ready-codebases', text: 'Factory：让代码库为代理做好准备', short: '8 根验证支柱', tool: 'general', type: 'video', added: '2026-10-09' }
    ]
  }
]

export const toolTag = (k) => `<span class="tool-tag tool-${k}">${tools[k]}</span>`
export const typeTag = (k) => `<span class="type-tag type-${k}">${types[k]}</span>`
export const allItems = () => domains.flatMap((d) => d.items.map((i) => ({ ...i, domain: d })))
export const domainOf = (slug) => domains.find((d) => d.items.some((i) => i.slug === slug))
