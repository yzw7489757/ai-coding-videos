// 生成 docs/glossary.md：按分类列出术语，并自动统计“出现在”哪些文章。
import fs from 'node:fs'
import path from 'node:path'
import MarkdownIt from 'markdown-it'
import { terms, categories } from '../docs/.vitepress/glossary-data.mjs'
import { glossaryPlugin } from '../docs/.vitepress/glossary-plugin.mjs'

const docs = path.resolve('docs')
const files = fs.readdirSync(docs).filter((f) => /^\d\d-.*\.md$/.test(f)).sort()
const hits = new Map() // id -> [file]
const md = new MarkdownIt({ html: true })
md.use(glossaryPlugin, { collect: (rel, used) => { for (const id of used) { if (!hits.has(id)) hits.set(id, []); hits.get(id).push(rel) } } })
const titles = {}
for (const f of files) {
  const src = fs.readFileSync(path.join(docs, f), 'utf8')
  const h1 = (src.match(/^#\s+(.+)$/m) || [, f])[1]
  titles[f] = h1.split('｜')[0].trim()
  const body = src.replace(/^:::.*$/gm, '')
  md.parse(body, { relativePath: f })
}
const shortTitle = (f) => {
  const n = f.slice(0, 2)
  const sidebar = fs.readFileSync(path.join(docs, '.vitepress/config.mts'), 'utf8')
  const m = sidebar.match(new RegExp(`text: '(${n} · [^']+)', link: '/${f.replace(/\.md$/, '')}'`))
  return m ? m[1] : titles[f]
}

let out = `---
outline: [2, 2]
---

# 术语表：小白也能看懂的 AI 编程词典

本站文章里出现的专业词都收在这里，共 **${terms.length}** 个，分 ${categories.length} 类。每个词给出：

- **白话**：一句话说清它是什么；
- **展开**：在本站视频里具体怎么用；
- **出现在**：哪些文章用到了它（文章里第一次出现该词时会自动链接到这里，鼠标悬停可以看到一句话解释）。

::: tip 怎么用这一页
按 <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>F</kbd> 搜词，或用右侧目录跳到分类。看文章时遇到带虚线下划线的词，点一下就会跳到这里。
:::

`
const linksFor = (id) => (hits.get(id) || []).map((f) => `[${shortTitle(f)}](/${f.replace(/\.md$/, '')})`)
out += '## 速查索引\n\n'
for (const c of categories) {
  out += `**${c.name.replace(/^.、/, '')}**：` + terms.filter((t) => t.cat === c.id).map((t) => `[${t.term.split('（')[0]}](#${t.id})`).join(' · ') + '\n\n'
}
for (const c of categories) {
  out += `## ${c.name}\n\n`
  for (const t of terms.filter((t) => t.cat === c.id)) {
    const l = linksFor(t.id)
    out += `### ${t.term} {#${t.id}}\n\n`
    out += `**白话**：${t.short}\n\n`
    out += `${t.detail}\n\n`
    out += `<p class="seen-in"><strong>出现在：</strong>${l.length ? '' : '（本站正文暂未直接使用，作为背景知识收录）'}</p>\n\n`
    if (l.length) out += l.map((x) => `- ${x}`).join('\n') + '\n\n'
  }
}
fs.writeFileSync(path.join(docs, 'glossary.md'), out)
const unused = terms.filter((t) => !hits.has(t.id)).map((t) => t.id)
console.log(`glossary.md: ${terms.length} terms; unused: ${unused.join(', ') || 'none'}`)
