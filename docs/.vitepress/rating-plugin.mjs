// markdown-it 插件：把 ratings.mjs 里的评分渲染成静态 HTML。
// - 单篇资料（NN-slug.md）：在标题下方的 meta-tags 之后插入评分卡片（在“一句话看懂”之前）。
// - 全部资料页（all.md）：在每个 `### … {#item-NN}` 标题后插入一行评分。
// 资料缺少评分、或评分超出 1–5 / 不是 0.5 的倍数时，构建直接失败。
import { ratings, scoreKeys, fmtScore } from './ratings.mjs'
import { allItems } from './domains.mjs'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

for (const i of allItems()) {
  const r = ratings[i.n]
  if (!r) throw new Error(`[rating] #${i.n} 没有在 ratings.mjs 里登记评分`)
  for (const [k] of scoreKeys) {
    const v = r[k]
    if (!Array.isArray(v) || typeof v[0] !== 'number' || v[0] < 1 || v[0] > 5 || (v[0] * 2) % 1 !== 0 || !v[1])
      throw new Error(`[rating] #${i.n} 的 ${k} 评分格式不对：应为 [1–5 的 0.5 倍数, '一句话理由']`)
  }
}

export const stars = (x) =>
  `<span class="rating-stars" style="--r:${x}" role="img" aria-label="${fmtScore(x)} / 5"></span>`

export function ratingCard(n) {
  const r = ratings[n]
  const rows = scoreKeys
    .map(([k, label]) => `<div class="rating-row rating-${k}"><span class="rating-label">${label}</span>${stars(r[k][0])}<span class="rating-num">${fmtScore(r[k][0])}</span><span class="rating-why">${esc(r[k][1])}</span></div>`)
    .join('')
  return `<div class="rating-card" data-rating="${n}"><div class="rating-head">本站评分 <a href="/all#rubric">评分标准</a></div>${rows}</div>\n`
}

export function ratingInline(n) {
  const r = ratings[n]
  return `<p class="rating-inline" data-rating="${n}"><span class="rating-label">综合</span>${stars(r.overall[0])}<b>${fmtScore(r.overall[0])}</b><span class="rating-sub">实用性 ${fmtScore(r.use[0])} · 深度 ${fmtScore(r.depth[0])}</span></p>\n`
}

export function ratingPlugin(md) {
  md.core.ruler.push('rating_card', (state) => {
    const rel = (state.env && state.env.relativePath) || ''
    const toks = state.tokens
    const m = rel.match(/^(\d\d)-.*\.md$/)
    if (m && m[1] !== '00') {
      const t = toks.find((t) => t.type === 'html_block' && t.content.includes('class="meta-tags"'))
      if (!t) throw new Error(`[rating] ${rel} 缺少 meta-tags 行，无法插入评分卡片`)
      t.content = t.content.replace(/\n?$/, '\n') + ratingCard(m[1])
      return
    }
    if (rel === 'all.md') {
      for (let k = toks.length - 1; k >= 0; k--) {
        const t = toks[k]
        if (t.type !== 'heading_open' || t.tag !== 'h3') continue
        const id = t.attrGet('id') || ''
        const mm = id.match(/^item-(\d\d)$/)
        if (!mm || !ratings[mm[1]]) continue
        const tok = new state.Token('html_block', '', 0)
        tok.content = ratingInline(mm[1])
        toks.splice(k + 3, 0, tok)
      }
    }
  })
}
