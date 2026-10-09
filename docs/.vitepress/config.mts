import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { glossaryPlugin } from './glossary-plugin.mjs'
import { trPlugin } from './tr-plugin.mjs'
import { xrefPlugin } from './xref-plugin.mjs'
import { domains, stageLabel } from './domains.mjs'

export default withMermaid(
  defineConfig({
    lang: 'zh-CN',
    title: 'AI 编程代理实战知识库',
    head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]],
    description: 'AI 编程代理知识库：按一个 AI 代理开发任务从开始到上线的顺序，整理视频、文章、官方文档与指南的深度拆解',
    cleanUrls: true,
    lastUpdated: false,
    themeConfig: {
      // 顶部导航只放功能性页面；内容导航全部在左侧边栏
      nav: [
        { text: '学习路径', link: '/paths' },
        { text: '模式库', link: '/patterns' },
        { text: '配置模板', link: '/templates' },
        { text: '术语表', link: '/glossary' },
        { text: '更新日志', link: '/changelog' }
      ],
      socialLinks: [{ icon: 'github', link: 'https://github.com/yzw7489757/ai-coding-videos', ariaLabel: 'GitHub 仓库' }],
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
      // 左侧边栏只做内容导航：6 个阶段，每组先放阶段指南，再放文章（所有页面共用同一个侧边栏）
      sidebar: domains.map((d) => ({
        text: stageLabel(d),
        collapsed: false,
        items: [
          { text: '阶段指南', link: `/guide/${d.id}` },
          ...(d.id === 'execution' ? [{ text: '专题：长时自主任务', link: '/guide/long-running' }] : []),
          ...d.items.map((i) => ({ text: i.text, link: `/${i.slug}` }))
        ]
      })),
      outline: { level: [2, 3], label: '本页目录' },
      docFooter: { prev: '上一篇', next: '下一篇' },
      darkModeSwitchLabel: '主题',
      sidebarMenuLabel: '菜单',
      returnToTopLabel: '回到顶部'
    },
    markdown: {
      config: (md) => {
        md.use(xrefPlugin)
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
