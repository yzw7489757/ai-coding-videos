// 生成首页 docs/index.md（每次构建自动运行，不要手改 index.md）
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { domains, toolTag, typeTag, allItems, stageLabel } from '../docs/.vitepress/domains.mjs'
import { ratings, fmtScore } from '../docs/.vitepress/ratings.mjs'

const scoreCell = (n) => { const o = ratings[n].overall[0]; return `<span class="rating-stars" style="--r:${o}" aria-hidden="true"></span> **${fmtScore(o)}**` }
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
  tagline: ${total} 份真实存在的演讲、工程博客、官方文档和指南，每份配一篇深度拆解；按 AI 代理开发任务的六个阶段组织，配阶段指南、模式库和学习路径。小白友好，术语可一键查。
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
    title: ${stageLabel(d)}
    details: ${d.desc}
    link: /guide/${d.id}
    linkText: 阅读阶段指南
`
fm += '---\n'
// 全景图：六个阶段从左到右按顺序排列，每个阶段下面竖排该阶段的资料
let mm = ['```mermaid','flowchart LR']
for (const d of domains){
  mm.push(`  subgraph S${d.no}["${d.name}"]`, '    direction TB')
  d.items.forEach((i)=>mm.push(`    A${i.n}["${i.n} ${i.short}"]`))
  for (let k=1;k<d.items.length;k++) mm.push(`    A${d.items[k-1].n} ~~~ A${d.items[k].n}`)
  mm.push('  end')
}
mm.push('  ' + domains.map(d=>`S${d.no}`).join(' --> '))
mm.push('```')
const body = `
## 这是什么

**分类原则：按一个 AI 代理开发任务从开始到上线的顺序分组。** 六个阶段依次是：打地基（上下文与规范）→ 做规划 → 去执行 → 做验证 → 自动化，最后是看原理（Harness 与内部机制）。每份资料只放在它主要贡献所在的那个阶段。

一个持续更新的中文知识库，主题是**怎样用编码代理（coding agent）把软件做好**。内容分三层：

| 层次 | 是什么 | 从哪进 |
|---|---|---|
| 单篇资料 | 每份视频 / 文章一篇拆解，固定 5 节：基本信息、做了什么、怎么做的、结果如何、可借鉴之处 | 左侧边栏，或[全部资料](/all) |
| 阶段指南 | 每个阶段一页，把多份资料串起来回答几个核心问题，并标出来源之间的分歧 | 左侧边栏每组第一项 |
| 工具页面 | [学习路径](/paths)、[模式库](/patterns)（29 个做法）、[术语表](/glossary)、[更新日志](/changelog)；另有[总结](/00-summary) | 顶部导航 |

整理开始于 2026-10-08，最近一次更新：${lastAdded}（见[更新日志](/changelog)）。工具和资料类型标在每篇文章的标题下方。

::: tip 阅读小功能
- **术语一点就懂**：文章里带品牌色点状下划线的词，鼠标悬停能看到一句话解释，点击跳到[术语表](/glossary)。
- **英文原话悬停看翻译**：原话、prompt 和配置保留英文原样，带灰色虚线下划线和“译”角标；悬停、键盘聚焦或手机点按会弹出中文翻译。
- **原始来源一键直达**：视频资料在“基本信息”最上方内嵌 YouTube 播放器；文章、官方文档和指南则放一张来源卡片（标题、作者、日期、链接）。
- **小节级引用**：阶段指南和模式库里的 \`#16 §3.5\` 这类链接，会直接跳到原文对应小节。
:::

## 🆕 最近收录（${lastAdded}，${recent.length} 份）

| # | 资料 | 阶段 | 类型 / 工具 | 综合评分 |
|---|---|---|---|---|
${recent.map(i=>`| ${i.n} | [${i.text}](/${i.slug}) | [${stageLabel(i.domain)}](/guide/${i.domain.id}) | ${typeTag(i.type)} ${toolTag(i.tool)} | ${scoreCell(i.n)} |`).join('\n')}

每篇的实用性、深度评分见文章标题下方，[全部资料页](/all#scores)可以按评分排序。

## 知识库全景图

按“阶段 → 资料”展示全部 ${total} 份资料，从左到右就是一个任务从开始到上线的顺序。每个阶段指南里还有更细的“问题 → 资料”小图。

${domains.map(d=>`- **[${stageLabel(d)}](/guide/${d.id})**：${d.desc}`).join('\n')}

${mm.join('\n')}

## 不知道从哪开始？

- **完全新手**：走[🌱 新手路径](/paths#beginner)，第一篇读 [#27 Mitchell Hashimoto 的六步路线](/27-mitchellh-ai-adoption-journey)。
- **想马上抄作业**：去[🧩 模式库](/patterns)，每个做法都链接到原文小节，配置和提示词原文就在文章里。
- **想看全貌**：读[总结与最佳实践](/00-summary)，或打开[📚 全部资料](/all)按阶段浏览。

::: info 资料来源与可信度
所有链接均已核实存在。视频以字幕 / 官方文字稿为主要依据，截图全部来自视频画面；文章和文档以原文全文为依据，抓取日期写在每篇“基本信息”表的“分析依据”一行。例外和局限都在对应文章中注明，覆盖情况与缺口见[全部资料页末尾](/all#coverage)。
:::
`
fs.writeFileSync(out, fm + body)
console.log(`[home] ${total} items, ${recent.length} recent`)
