import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { glossaryPlugin } from './glossary-plugin.mjs'

export default withMermaid(
  defineConfig({
    lang: 'zh-CN',
    title: 'AI 编程专家实战视频研究',
    description: '资深工程师实战 Codex / Claude Code / Grok 的高质量视频清单与深度分析',
    cleanUrls: true,
    lastUpdated: false,
    themeConfig: {
      nav: [
        { text: '总清单', link: '/' },
        { text: '总结', link: '/00-summary' },
        { text: '术语表', link: '/glossary' },
        {
          text: '按工具',
          items: [
            { text: 'Claude Code（01–06）', link: '/01-claude-code-one-year' },
            { text: 'Codex（07–11）', link: '/07-harness-engineering' },
            { text: 'Grok（12–15）', link: '/12-forrestknight-grok-4-5' }
          ]
        }
      ],
      search: {
        provider: 'local',
        options: {
          translations: {
            button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
            modal: {
              noResultsText: '没有找到结果',
              resetButtonTitle: '清除',
              footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
            }
          }
        }
      },
      sidebar: [
        {
          text: '术语表',
          items: [
            { text: '📖 术语表（小白词典）', link: '/glossary' },
            { text: '核心概念', link: '/glossary#agent' },
            { text: '规则文件与扩展', link: '/glossary#claude-md' },
            { text: '工作流与方法论', link: '/glossary#plan-mode' },
            { text: '运行方式与权限', link: '/glossary#auto-mode' },
            { text: '软件工程基础', link: '/glossary#ci-cd' },
            { text: '工具与模型', link: '/glossary#claude-code' }
          ]
        },
        {
          text: '总览',
          items: [
            { text: '首页 · 总清单', link: '/' },
            { text: '00 · 总结与最佳实践', link: '/00-summary' }
          ]
        },
        {
          text: 'Claude Code',
          items: [
            { text: '01 · Claude Code 一周年：验证与 Routines', link: '/01-claude-code-one-year' },
            { text: '02 · Claude Code 团队工作流', link: '/02-claude-code-team-workflows' },
            { text: '03 · How we Claude Code', link: '/03-how-we-claude-code' },
            { text: '04 · No Vibes Allowed：RPI', link: '/04-no-vibes-allowed-rpi' },
            { text: '05 · IndyDevDan：Builder/Validator 团队', link: '/05-indydevdan-task-system' },
            { text: '06 · Field Guide to Fable', link: '/06-field-guide-to-fable' }
          ]
        },
        {
          text: 'Codex',
          items: [
            { text: '07 · Harness Engineering', link: '/07-harness-engineering' },
            { text: '08 · Codex Masterclass', link: '/08-codex-masterclass' },
            { text: '09 · How Codex Works', link: '/09-how-codex-works' },
            { text: '10 · How OpenAI Uses Codex', link: '/10-how-openai-uses-codex' },
            { text: '11 · Peter Steinberger：OpenClaw', link: '/11-peter-steinberger-openclaw' }
          ]
        },
        {
          text: 'Grok',
          items: [
            { text: '12 · ForrestKnight：Grok 4.5', link: '/12-forrestknight-grok-4-5' },
            { text: '13 · Bijan Bowen：Grok Build 实测', link: '/13-bijan-bowen-grok-build' },
            { text: '14 · OrcDev：Skills 驱动 UI', link: '/14-orcdev-grok-build-skills' },
            { text: '15 · Arcade：57 子代理与 /goal', link: '/15-arcade-grok-build-57-agents' }
          ]
        }
      ],
      outline: { level: [2, 3], label: '本页目录' },
      docFooter: { prev: '上一篇', next: '下一篇' },
      darkModeSwitchLabel: '主题',
      sidebarMenuLabel: '菜单',
      returnToTopLabel: '回到顶部'
    },
    markdown: {
      config: (md) => { md.use(glossaryPlugin) }
    },
    mermaid: {},
    vite: {
      optimizeDeps: { include: ['mermaid'] },
      build: { chunkSizeWarningLimit: 4000 }
    }
  })
)
