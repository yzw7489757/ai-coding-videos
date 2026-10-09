// 按“内容主题”分类（不是按工具）。侧边栏、导航和文章顶部标签都从这里取数据。
// 新文章：在合适的主题里追加一项；文件名编号只是稳定 URL，不代表分类。
export const tools = {
  claude: 'Claude Code',
  codex: 'Codex',
  grok45: 'Cursor + Grok 4.5',
  grokbuild: 'Grok Build'
}

export const domains = [
  {
    id: 'practice',
    name: '真实项目实战与人工把关',
    icon: '🛠️',
    desc: '一个人维护大型开源项目、新代理工具上手实测、逐行审查 AI 产出。',
    items: [
      { n: '11', slug: '11-peter-steinberger-openclaw', text: 'Peter Steinberger：用 Codex 建 OpenClaw', tool: 'codex' },
      { n: '14', slug: '14-orcdev-grok-build-skills', text: 'OrcDev：Skills 约束设计的 UI 开发', tool: 'grokbuild' },
      { n: '13', slug: '13-bijan-bowen-grok-build', text: 'Bijan Bowen：Grok Build 完整实测', tool: 'grokbuild' },
      { n: '12', slug: '12-forrestknight-grok-4-5', text: 'ForrestKnight：Grok 4.5 实战与代码审查', tool: 'grok45' }
    ]
  },
  {
    id: 'planning',
    name: '需求澄清、规划与上下文管理',
    icon: '🧭',
    desc: '动手前先把需求问清楚；Research → Plan → Implement；给上下文做减法。',
    items: [
      { n: '03', slug: '03-how-we-claude-code', text: 'How we Claude Code：访谈式需求与可验证组件', tool: 'claude' },
      { n: '06', slug: '06-field-guide-to-fable', text: 'Field Guide to Fable：找出未知、上下文减法', tool: 'claude' },
      { n: '04', slug: '04-no-vibes-allowed-rpi', text: 'No Vibes Allowed：RPI 与有意压缩', tool: 'claude' }
    ]
  },
  {
    id: 'multi-agent',
    name: '多代理协作与对抗式验证',
    icon: '🤝',
    desc: '一个写、一个查；按角色配置子代理；几十个子代理并行后再让怀疑者复核。',
    items: [
      { n: '05', slug: '05-indydevdan-task-system', text: 'IndyDevDan：Builder / Validator 代理团队', tool: 'claude' },
      { n: '08', slug: '08-codex-masterclass', text: 'Codex Masterclass：子代理、Hooks 与插件', tool: 'codex' },
      { n: '15', slug: '15-arcade-grok-build-57-agents', text: 'Arcade：57 个子代理与 /goal 对抗验证', tool: 'grokbuild' }
    ]
  },
  {
    id: 'automation',
    name: '后台代理、自动化与 CI/CD',
    icon: '⚙️',
    desc: 'Routines 和 /loop 在后台跑；在 Slack 里派活；PR 先过代理审查、代理看护 CI。',
    items: [
      { n: '01', slug: '01-claude-code-one-year', text: 'Claude Code 一周年：验证、Routines、Auto mode', tool: 'claude' },
      { n: '02', slug: '02-claude-code-team-workflows', text: 'Claude Code 团队：Claude Tag 与扇出 Workflows', tool: 'claude' },
      { n: '10', slug: '10-how-openai-uses-codex', text: 'How OpenAI Uses Codex：验证飞轮与 PR 看护', tool: 'codex' }
    ]
  },
  {
    id: 'harness',
    name: 'Harness 工程与内部机制',
    icon: '🧠',
    desc: '代理外壳怎么工作；把团队标准写成 lint 和测试，让代理在轨道上跑。',
    items: [
      { n: '09', slug: '09-how-codex-works', text: 'How Codex Works：Harness 内部机制', tool: 'codex' },
      { n: '07', slug: '07-harness-engineering', text: 'Harness Engineering：人掌舵、代理执行', tool: 'codex' }
    ]
  }
]

export const toolTag = (k) => `<span class="tool-tag tool-${k}">${tools[k]}</span>`
export const domainOf = (slug) => domains.find((d) => d.items.some((i) => i.slug === slug))
