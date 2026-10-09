import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { glossaryPlugin } from './glossary-plugin.mjs'
import { trPlugin } from './tr-plugin.mjs'
import { domains, toolTag } from './domains.mjs'

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
          text: '按主题',
          items: domains.map((d) => ({ text: `${d.icon} ${d.name}`, link: `/${d.items[0].slug}` }))
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
        ...domains.map((d) => ({
          text: `${d.icon} ${d.name}`,
          collapsed: false,
          items: d.items.map((i) => ({ text: `${i.n} · ${i.text} ${toolTag(i.tool)}`, link: `/${i.slug}` }))
        }))
      ],
      outline: { level: [2, 3], label: '本页目录' },
      docFooter: { prev: '上一篇', next: '下一篇' },
      darkModeSwitchLabel: '主题',
      sidebarMenuLabel: '菜单',
      returnToTopLabel: '回到顶部'
    },
    markdown: {
      config: (md) => {
        md.use(trPlugin)
        md.use(glossaryPlugin)
      }
    },
    mermaid: {},
    vite: {
      optimizeDeps: { include: ['mermaid'] },
      build: { chunkSizeWarningLimit: 4000 }
    }
  })
)
