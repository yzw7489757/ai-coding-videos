import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { glossaryPlugin } from './glossary-plugin.mjs'
import { trPlugin } from './tr-plugin.mjs'
import { xrefPlugin } from './xref-plugin.mjs'
import { domains, toolTag, typeTag } from './domains.mjs'

export default withMermaid(
  defineConfig({
    lang: 'zh-CN',
    title: 'AI 编程代理实战知识库',
    head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]],
    description: 'AI 编程代理知识库：按问题领域整理的视频、文章、官方文档与指南的深度拆解',
    cleanUrls: true,
    lastUpdated: false,
    themeConfig: {
      nav: [
        { text: '首页', link: '/' },
        { text: '学习路径', link: '/paths' },
        {
          text: '主题指南',
          items: [
            ...domains.map((d) => ({ text: `${d.icon} ${d.name}`, link: `/guide/${d.id}` })),
            { text: '⏱️ 跨主题专题：长时自主任务', link: '/guide/long-running' }
          ]
        },
        { text: '模式库', link: '/patterns' },
        { text: '配置模板', link: '/templates' },
        { text: '术语表', link: '/glossary' },
        { text: '全部资料', link: '/all' }
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
          text: '知识库',
          items: [
            { text: '🏠 首页', link: '/' },
            { text: '🧭 学习路径', link: '/paths' },
            { text: '📚 全部资料（27）', link: '/all' },
            { text: '🧩 模式库', link: '/patterns' },
            { text: '🧾 配置模板库', link: '/templates' },
            { text: '⏱️ 专题：长时自主任务', link: '/guide/long-running' },
            { text: '00 · 总结与最佳实践', link: '/00-summary' },
            { text: '🗓️ 更新日志', link: '/changelog' }
          ]
        },
        {
          text: '📖 术语表',
          collapsed: true,
          items: [
            { text: '术语表（小白词典）', link: '/glossary' },
            { text: '核心概念', link: '/glossary#agent' },
            { text: '规则文件与扩展', link: '/glossary#claude-md' },
            { text: '工作流与方法论', link: '/glossary#plan-mode' },
            { text: '运行方式与权限', link: '/glossary#auto-mode' },
            { text: '软件工程基础', link: '/glossary#ci-cd' },
            { text: '工具与模型', link: '/glossary#claude-code' },
            { text: '评测与验证', link: '/glossary#eval-task-trial' }
          ]
        },
        ...domains.map((d) => ({
          text: `${d.icon} ${d.name}（${d.items.length}）`,
          collapsed: false,
          items: [
            { text: '📘 主题指南', link: `/guide/${d.id}` },
            ...d.items.map((i) => ({ text: `${i.n} · ${i.text} ${typeTag(i.type)}${toolTag(i.tool)}`, link: `/${i.slug}` }))
          ]
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
