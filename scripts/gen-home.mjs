// 生成首页 docs/index.md（每次构建自动运行，不要手改 index.md）
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { domains, toolTag, typeTag, allItems } from '../docs/.vitepress/domains.mjs'
const out = path.join(path.dirname(fileURLToPath(import.meta.url)), '../docs/index.md')
const all = allItems(), total = all.length
const lastAdded = all.map(i=>i.added).filter(Boolean).sort().at(-1)
const recent = all.filter(i=>i.added===lastAdded).sort((a,b)=>a.n.localeCompare(b.n))
let fm = `---
layout: home
title: AI 编程代理实战知识库
hero:
  name: AI 编程代理实战知识库
  text: 资深工程师怎么用 Claude Code、Codex、Cursor、Grok 写软件
  tagline: ${total} 份真实存在的演讲、工程博客、官方文档和指南，每份配一篇深度拆解；再按主题串成指南、模式库和配置模板。小白友好，术语可一键查。
  actions:
    - theme: brand
      text: 按学习路径读
      link: /paths
    - theme: alt
      text: 模式库
      link: /patterns
    - theme: alt
      text: 全部资料
      link: /all
    - theme: alt
      text: 小白先看术语表
      link: /glossary
features:
`
for (const d of domains) fm += `  - icon: ${d.icon}
    title: ${d.name}（${d.items.length}）
    details: ${d.desc}
    link: /guide/${d.id}
    linkText: "主题指南 · ${d.items.map(i=>'#'+i.n).join(' ')}"
`
fm += '---\n'
let mm = ['```mermaid','mindmap','  root((AI 编程代理知识库))']
for (const d of domains){ mm.push(`    ${d.short}`); for (const i of d.items) mm.push(`      ${i.n} ${i.short}`) }
mm.push('```')
const body = `
## 这是什么

一个持续更新的中文知识库，主题是**怎样用编码代理（coding agent）把软件做好**。内容分三层：

| 层次 | 是什么 | 从哪进 |
|---|---|---|
| 单篇资料 | 每份视频 / 文章一篇拆解，固定 5 节：基本信息、做了什么、怎么做的、结果如何、可借鉴之处 | [全部资料（${total}）](/all) |
| 主题指南 | 每个主题一页，把多份资料串起来回答几个核心问题，并标出来源之间的分歧 | 顶部导航“主题指南” |
| 横向页面 | [学习路径](/paths)、[模式库](/patterns)（20 个做法）、[配置模板库](/templates)（13 段原文配置）、[长时自主任务专题](/guide/long-running)、[总结](/00-summary)、[术语表](/glossary) | 顶部导航 |

整理开始于 2026-10-08，最近一次更新：${lastAdded}（见[更新日志](/changelog)）。分类依据是**资料讲的内容**，不是用的工具；工具和资料类型用彩色小标签标出。

::: tip 阅读小功能
- **术语一点就懂**：文章里带品牌色点状下划线的词，鼠标悬停能看到一句话解释，点击跳到[术语表](/glossary)。
- **英文原话悬停看翻译**：原话、prompt 和配置保留英文原样，带灰色虚线下划线和“译”角标；悬停、键盘聚焦或手机点按会弹出中文翻译。
- **原始来源一键直达**：视频资料在“基本信息”最上方内嵌 YouTube 播放器；文章、官方文档和指南则放一张来源卡片（标题、作者、日期、链接）。
- **小节级引用**：指南和模式库里的 \`#16 §3.5\` 这类链接，会直接跳到原文对应小节。
:::

## 🆕 最近收录（${lastAdded}，${recent.length} 份）

| # | 资料 | 主题 | 类型 / 工具 |
|---|---|---|---|
${recent.map(i=>`| ${i.n} | [${i.text}](/${i.slug}) | [${i.domain.icon} ${i.domain.short}](/guide/${i.domain.id}) | ${typeTag(i.type)} ${toolTag(i.tool)} |`).join('\n')}

## 知识库全景图

按“主题 → 资料”展示全部 ${total} 份资料。每个主题指南里还有更细的“问题 → 资料”小图。

${mm.join('\n')}

## 不知道从哪开始？

- **完全新手**：走[🌱 新手路径](/paths#beginner)，第一篇读 [#27 Mitchell Hashimoto 的六步路线](/27-mitchellh-ai-adoption-journey)。
- **想马上抄作业**：去[🧩 模式库](/patterns)和[🧾 配置模板库](/templates)。
- **想看全貌**：读[总结与最佳实践](/00-summary)，或打开[📚 全部资料](/all)按主题浏览。

::: info 资料来源与可信度
所有链接均已核实存在。视频以字幕 / 官方文字稿为主要依据，截图全部来自视频画面；文章和文档以原文全文为依据，抓取日期写在每篇的“信息来源”里。例外和局限都在对应文章中注明，覆盖情况与缺口见[全部资料页末尾](/all#coverage)。
:::
`
fs.writeFileSync(out, fm + body)
console.log(`[home] ${total} items, ${recent.length} recent`)
