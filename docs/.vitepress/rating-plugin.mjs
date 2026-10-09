// markdown-it 插件：把 ratings.mjs 里的评分渲染进页面（静态 HTML）。
// - 单篇资料（NN-slug.md）：在标题下方 meta 行的工具标签后面追加三个评分标签：
//   [工具名] [综合 ★★★★☆ 4.5] [实用性 ★★★★★ 5.0] [深度 ★★★☆☆ 3.0]（星级是按分数比例填充的 CSS 星）。不显示理由。
// - 全部资料页（all.md）：在每个 `### … {#item-NN}` 标题后插入同样的三个评分标签。
// 资料缺少评分、或评分超出 1–5 / 不是 0.5 的倍数、或 meta 行的工具和 domains.mjs 不一致时，构建直接失败。
import { ratings, scoreKeys, fmtScore } from './ratings.mjs'
import { allItems, tools } from './domains.mjs'

const items = new Map(allItems().map((i) => [i.n, i]))
for (const i of items.values()) {
  const r = ratings[i.n]
  if (!r) throw new Error(`[rating] #${i.n} 没有在 ratings.mjs 里登记评分`)
  for (const [k] of scoreKeys) {
    const v = r[k]
    if (!Array.isArray(v) || typeof v[0] !== 'number' || v[0] < 1 || v[0] > 5 || (v[0] * 2) % 1 !== 0 || !v[1])
      throw new Error(`[rating] #${i.n} 的 ${k} 评分格式不对：应为 [1–5 的 0.5 倍数, '一句话理由']`)
  }
}

export const stars = (x) =>
  `<span class="rating-stars" style="--r:${x}" aria-hidden="true"></span>`

export const scoreSpans = (n) =>
  scoreKeys
    .map(([k, label]) => {
      const x = ratings[n][k][0]
      return `<span class="score-tag score-${k}" title="${label} ${fmtScore(x)} / 5"><span class="score-label">${label}</span>${stars(x)}<span class="score-num">${fmtScore(x)}</span></span>`
    })
    .join('')

export function ratingPlugin(md) {
  md.core.ruler.push('rating_meta', (state) => {
    const rel = (state.env && state.env.relativePath) || ''
    const toks = state.tokens
    const m = rel.match(/^(\d\d)-.*\.md$/)
    if (m && m[1] !== '00') {
      const item = items.get(m[1])
      if (!item) throw new Error(`[rating] ${rel} 没有在 domains.mjs 里登记`)
      const t = toks.find((t) => t.type === 'html_block' && t.content.includes('class="meta-tags"'))
      if (!t) throw new Error(`[rating] ${rel} 缺少 meta-tags 行`)
      const want = `<span class="tool-tag tool-${item.tool}">${tools[item.tool]}</span>`
      if (!t.content.includes(want)) throw new Error(`[rating] ${rel} 的 meta 行应为：<div class="meta-tags">${want}</div>`)
      t.content = t.content.replace('</div>', `${scoreSpans(m[1])}</div>`)
      return
    }
    if (rel === 'all.md') {
      for (let k = toks.length - 1; k >= 0; k--) {
        const t = toks[k]
        if (t.type !== 'heading_open' || t.tag !== 'h3') continue
        const mm = (t.attrGet('id') || '').match(/^item-(\d\d)$/)
        if (!mm || !ratings[mm[1]]) continue
        const tok = new state.Token('html_block', '', 0)
        tok.content = `<p class="meta-tags meta-inline">${scoreSpans(mm[1])}</p>\n`
        toks.splice(k + 3, 0, tok)
      }
    }
  })
}
