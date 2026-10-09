// 生成 docs/glossary.md：按分类列出术语。
// 术语表只做单向链接：文章 → 术语表；术语表里不列反向引用。
// 控制台会提示哪些术语还没有在任何文章里被自动链接（只用于维护，不写进页面）。
import fs from 'node:fs'
import path from 'node:path'
import MarkdownIt from 'markdown-it'
import { terms, categories } from '../docs/.vitepress/glossary-data.mjs'
import { glossaryPlugin } from '../docs/.vitepress/glossary-plugin.mjs'
import { trPlugin } from '../docs/.vitepress/tr-plugin.mjs'

const docs = path.resolve('docs')
const files = fs.readdirSync(docs).filter((f) => /^\d\d-.*\.md$/.test(f)).sort()
const hits = new Map() // id -> [file]
const md = new MarkdownIt({ html: true })
md.use(trPlugin)
md.use(glossaryPlugin, { collect: (rel, used) => { for (const id of used) { if (!hits.has(id)) hits.set(id, []); hits.get(id).push(rel) } } })
for (const f of files) {
  const src = fs.readFileSync(path.join(docs, f), 'utf8')
  const body = src.replace(/^\s*:::(?!\s*tr\s).*$/gm, '')
  md.parse(body, { relativePath: f })
  // 手写的 /glossary#id 链接（如“小白先懂这几个词”）也算已链接
  for (const m of src.matchAll(/\/glossary#([a-z0-9-]+)/g)) { if (!hits.has(m[1])) hits.set(m[1], []); hits.get(m[1]).push(f) }
}

let out = `---
outline: [2, 2]
---

# 术语表：小白也能看懂的 AI 编程词典

本站文章里出现的专业词都收在这里，共 **${terms.length}** 个，分 ${categories.length} 类。每个词给出：

- **白话**：一句话说清它是什么；
- **展开**：在本站视频里具体怎么用。

文章里第一次出现某个术语时，会自动链接到这里；鼠标悬停在链接上能先看到一句话解释。

::: tip 怎么用这一页
按 <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>F</kbd> 搜词，或用右侧目录跳到分类。看文章时遇到带品牌色点状下划线的词，点一下就会跳到这里（带灰色虚线下划线和“译”角标的是英文原话，悬停看翻译，不跳转）。
:::

`
out += '## 速查索引\n\n'
for (const c of categories) {
  out += `**${c.name.replace(/^.、/, '')}**：` + terms.filter((t) => t.cat === c.id).map((t) => `[${t.term.split('（')[0]}](#${t.id})`).join(' · ') + '\n\n'
}
for (const c of categories) {
  out += `## ${c.name}\n\n`
  for (const t of terms.filter((t) => t.cat === c.id)) {
    out += `### ${t.term} {#${t.id}}\n\n`
    out += `**白话**：${t.short}\n\n`
    out += `${t.detail}\n\n`
  }
}
fs.writeFileSync(path.join(docs, 'glossary.md'), out)
const unused = terms.filter((t) => !hits.has(t.id)).map((t) => t.id)
console.log(`glossary.md: ${terms.length} terms; not yet linked from any article: ${unused.join(', ') || 'none'}`)
