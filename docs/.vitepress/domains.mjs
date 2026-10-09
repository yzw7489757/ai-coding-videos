// 分类原则（唯一的轴）：按一个 AI 代理开发任务从开始到上线的顺序分组。
// 每份资料只放进它“主要贡献”所在的那一个阶段。侧边栏、首页、全部资料页和文章顶部标签都从这里取数据。
// 新资料：在对应阶段追加 { n, slug, text, short, tool, type, added? }；文件名编号只是稳定 URL，不代表分类。
// text：侧边栏标题（简洁中文，不带编号和标签）；short：首页思维导图短标签（不要用括号）；added：收录日期。
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

// 阶段：id 用于 URL（/guide/<id>），no 表示顺序；label = `${no} ${name} · ${sub}`
export const domains = [
  {
    id: 'foundation',
    no: '1',
    name: '打地基',
    sub: '上下文与规范',
    icon: '🧱',
    desc: '让代理每次开工都拿到对的上下文：规则文件、Skills、团队规范，以及能被自动验证的代码库。',
    items: [
      { n: '20', slug: '20-humanlayer-writing-good-claude-md', text: 'CLAUDE.md 怎么写：少即是多', short: '规则文件少即是多', tool: 'claude', type: 'article', added: '2026-10-09' },
      { n: '21', slug: '21-anthropic-agent-skills-talk', text: '别造代理，写 Skills', short: 'Skills 按需加载', tool: 'claude', type: 'video', added: '2026-10-09' },
      { n: '14', slug: '14-orcdev-grok-build-skills', text: '用 Skills 约束 UI 风格', short: 'Skills 管 UI 风格', tool: 'grokbuild', type: 'video' },
      { n: '26', slug: '26-factory-agent-ready-codebases', text: '让代码库为代理做好准备', short: '8 根验证支柱', tool: 'general', type: 'video', added: '2026-10-09' },
      { n: '07', slug: '07-harness-engineering', text: '把团队规范变成 lint 和测试', short: '规范变 lint 和测试', tool: 'codex', type: 'video' }
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
      { n: '03', slug: '03-how-we-claude-code', text: '访谈式需求与可验证组件', short: '访谈式需求', tool: 'claude', type: 'video' },
      { n: '06', slug: '06-field-guide-to-fable', text: '找出未知，给上下文做减法', short: '找未知 做减法', tool: 'claude', type: 'video' },
      { n: '04', slug: '04-no-vibes-allowed-rpi', text: 'RPI：研究、计划、实施', short: 'RPI 有意压缩', tool: 'claude', type: 'video' },
      { n: '13', slug: '13-bijan-bowen-grok-build', text: 'Grok Build 实测：从计划到执行', short: 'plan mode 实测', tool: 'grokbuild', type: 'video' }
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
      { n: '27', slug: '27-mitchellh-ai-adoption-journey', text: '从怀疑到离不开：六步采用 AI', short: 'Mitchell 六步采用', tool: 'general', type: 'article', added: '2026-10-09' },
      { n: '11', slug: '11-peter-steinberger-openclaw', text: '一个人用 Codex 建 OpenClaw', short: 'Steinberger 十个 checkout', tool: 'codex', type: 'video' },
      { n: '05', slug: '05-indydevdan-task-system', text: 'Builder + Validator 代理团队', short: 'Builder 加 Validator', tool: 'claude', type: 'video' },
      { n: '08', slug: '08-codex-masterclass', text: 'Codex 子代理、Hooks 与插件', short: '子代理切片审查', tool: 'codex', type: 'video' },
      { n: '23', slug: '23-cole-medin-parallel-worktrees', text: '5 个并行代理 + worktree', short: 'worktree 并行', tool: 'claude', type: 'video', added: '2026-10-09' },
      { n: '17', slug: '17-anthropic-c-compiler-agent-teams', text: '16 个代理并行写 C 编译器', short: '16 代理写编译器', tool: 'claude', type: 'article', added: '2026-10-09' },
      { n: '18', slug: '18-cursor-scaling-long-running-agents', text: '数百个代理协作写浏览器', short: '数百代理分层', tool: 'cursor', type: 'article', added: '2026-10-09' }
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
      { n: '25', slug: '25-simonw-agentic-engineering-testing-patterns', text: '测试驱动与代理手动测试', short: 'TDD 与手动测试', tool: 'general', type: 'guide', added: '2026-10-09' },
      { n: '12', slug: '12-forrestknight-grok-4-5', text: '测试全绿也要读代码', short: '测试全绿也要读', tool: 'grok45', type: 'video' },
      { n: '15', slug: '15-arcade-grok-build-57-agents', text: '57 个子代理与对抗式验证', short: 'skeptic 证伪', tool: 'grokbuild', type: 'video' },
      { n: '19', slug: '19-anthropic-demystifying-agent-evals', text: 'Agent Evals 入门', short: 'Agent Evals', tool: 'general', type: 'article', added: '2026-10-09' }
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
      { n: '01', slug: '01-claude-code-one-year', text: 'Claude Code 一周年：验证与 Routines', short: 'Routines 与验证', tool: 'claude', type: 'video' },
      { n: '02', slug: '02-claude-code-team-workflows', text: 'Claude Code 团队的工作流', short: 'Slack 派活 扇出审查', tool: 'claude', type: 'video' },
      { n: '10', slug: '10-how-openai-uses-codex', text: 'OpenAI 用 Codex 守住 PR 质量', short: 'PR 审查 CI 看护', tool: 'codex', type: 'video' },
      { n: '22', slug: '22-openai-codex-ci-autofix', text: 'CI 挂了让 Codex 自动修', short: 'codex exec 修 CI', tool: 'codex', type: 'docs', added: '2026-10-09' }
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
      { n: '09', slug: '09-how-codex-works', text: 'Codex Harness 内部机制', short: 'Codex harness 拆解', tool: 'codex', type: 'video' },
      { n: '24', slug: '24-huntley-horthy-ralph-loop', text: 'Ralph 循环：为什么每轮重开', short: 'Ralph 循环', tool: 'claude', type: 'video', added: '2026-10-09' },
      { n: '16', slug: '16-anthropic-harness-design-long-running-apps', text: 'Planner / Generator / Evaluator 长时 harness', short: 'Planner Generator Evaluator', tool: 'claude', type: 'article', added: '2026-10-09' }
    ]
  }
]

export const stageLabel = (d) => `${d.no} ${d.name} · ${d.sub}`
export const toolTag = (k) => `<span class="tool-tag tool-${k}">${tools[k]}</span>`
export const typeTag = (k) => `<span class="type-tag type-${k}">${types[k]}</span>`
export const allItems = () => domains.flatMap((d) => d.items.map((i) => ({ ...i, domain: d })))
export const domainOf = (slug) => domains.find((d) => d.items.some((i) => i.slug === slug))
