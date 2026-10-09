// markdown-it 插件：在构建时把每篇文章里“第一次出现”的术语链接到 /glossary#id。
// 跳过：标题、引用块（原文引用）、代码块、Mermaid、HTML 块、已有链接内部、英文引号内的原话。
import { terms } from './glossary-data.mjs'

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const isRegex = (a) => a.includes('(?')
const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const html = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const aliasList = []
const codeMap = new Map()
for (const t of terms) {
  for (const a of t.aliases || []) aliasList.push({ a, t })
  for (const c of t.code || []) codeMap.set(c, t)
}
// 长的写法优先，避免 “system prompt” 被 “prompt” 抢走
aliasList.sort((x, y) => y.a.replace(/\(\?<!\[[^\]]*\]\)/, '').length - x.a.replace(/\(\?<!\[[^\]]*\]\)/, '').length)
const sources = aliasList.map(({ a }) => {
  const body = isRegex(a) ? a : esc(a)
  return /^[A-Za-z0-9]/.test(a) ? `(?<![A-Za-z0-9_\\-/.])${body}(?![A-Za-z0-9_])` : body
})
const big = new RegExp(sources.map((s) => `(${s})`).join('|'), 'g')

function quoteRanges(text) {
  const r = []
  const re = /“[^”]*”|"[^"]*"/g
  let m
  while ((m = re.exec(text))) r.push([m.index, m.index + m[0].length])
  return r
}

function linkHtml(t, inner) {
  return `<a class="gloss" href="/glossary#${t.id}" data-tip="${attr(t.short)}">${inner}</a>`
}

export function glossaryPlugin(md, opts = {}) {
  md.core.ruler.push('glossary_links', (state) => {
    const rel = (state.env && state.env.relativePath) || ''
    if (!/^\d\d-.*\.md$/.test(rel) && rel !== 'index.md') return
    const used = new Set()
    let skipDepth = 0
    const collect = opts.collect
    for (const blk of state.tokens) {
      if (blk.type === 'heading_open' || blk.type === 'blockquote_open') skipDepth++
      if (blk.type === 'heading_close' || blk.type === 'blockquote_close') skipDepth--
      if (blk.type !== 'inline' || skipDepth > 0 || !blk.children) continue
      const out = []
      let linkDepth = 0
      for (const tok of blk.children) {
        if (tok.type === 'link_open') linkDepth++
        if (tok.type === 'link_close') linkDepth--
        if (tok.type === 'html_inline' && /^<a[\s>]/i.test(tok.content)) linkDepth++
        if (tok.type === 'html_inline' && /^<\/a>/i.test(tok.content)) linkDepth--
        if (linkDepth > 0) { out.push(tok); continue }
        if (tok.type === 'code_inline' && codeMap.has(tok.content.trim())) {
          const t = codeMap.get(tok.content.trim())
          if (!used.has(t.id)) {
            used.add(t.id)
            const h = new state.Token('html_inline', '', 0)
            h.content = linkHtml(t, `<code>${html(tok.content)}</code>`)
            out.push(h)
            continue
          }
        }
        if (tok.type !== 'text') { out.push(tok); continue }
        const text = tok.content
        const qr = quoteRanges(text)
        let last = 0, m
        big.lastIndex = 0
        const pieces = []
        while ((m = big.exec(text))) {
          const idx = m.index
          const gi = m.slice(1).findIndex((g) => g !== undefined)
          const t = aliasList[gi].t
          if (used.has(t.id) || qr.some(([s, e]) => idx >= s && idx < e)) continue
          used.add(t.id)
          if (idx > last) pieces.push({ type: 'text', v: text.slice(last, idx) })
          pieces.push({ type: 'link', t, v: m[0] })
          last = idx + m[0].length
        }
        if (!pieces.length) { out.push(tok); continue }
        if (last < text.length) pieces.push({ type: 'text', v: text.slice(last) })
        for (const p of pieces) {
          if (p.type === 'text') {
            const n = new state.Token('text', '', 0); n.content = p.v; out.push(n)
          } else {
            const h = new state.Token('html_inline', '', 0); h.content = linkHtml(p.t, html(p.v)); out.push(h)
          }
        }
      }
      blk.children = out
    }
    if (collect) collect(rel, used)
  })
}
