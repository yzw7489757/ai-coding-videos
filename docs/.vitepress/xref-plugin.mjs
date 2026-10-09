// 站内交叉引用：在知识库页面里写 [[17§3.2]]、[[17]]、[[17§3.2|自定义文字]]，
// 构建时解析成指向文章小节的链接，例如 [#17 §3.2](/17-anthropic-c-compiler-agent-teams#_3-2-… "标题")。
// 小节号按标题开头匹配（“3.2”“Phase 3”“5”都可以），找不到会直接让构建失败，避免悄悄出现坏链接。
import fs from 'node:fs'
import path from 'node:path'
import { allItems } from './domains.mjs'

const rControl = /[\u0000-\u001f]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g
const rCombining = /[\u0300-\u036F]/g
// 与 VitePress 默认的标题 slug 规则一致（@mdit-vue/shared slugify）
export const slugify = (s) => s.normalize('NFKD').replace(rCombining, '').replace(rControl, '')
  .replace(rSpecial, '-').replace(/-{2,}/g, '-').replace(/^-+|-+$/g, '').replace(/^(\d)/, '_$1').toLowerCase()

const docsDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
let cache = null
function index() {
  if (cache) return cache
  cache = new Map()
  for (const it of allItems()) {
    const src = fs.readFileSync(path.join(docsDir, `${it.slug}.md`), 'utf8').replace(/```[\s\S]*?```/g, '')
    const heads = []
    for (const m of src.matchAll(/^#{2,3}\s+(.+?)\s*$/gm)) {
      const raw = m[1]
      const custom = raw.match(/\{#([^}]+)\}\s*$/)
      const text = raw.replace(/\{#[^}]+\}\s*$/, '').replace(/`/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/<[^>]+>/g, '').trim()
      heads.push({ text, id: custom ? custom[1] : slugify(text) })
    }
    cache.set(it.n, { it, heads })
  }
  return cache
}

export function resolveXrefs(src, file = '') {
  return src.replace(/\[\[(\d\d)(?:§([^\]|]+))?(?:\|([^\]]+))?\]\]/g, (all, n, sec, label) => {
    const e = index().get(n)
    if (!e) throw new Error(`[xref] ${file}: 未知文章编号 ${all}`)
    const { it, heads } = e
    if (!sec) return `[${label || `#${n} ${it.text}`}](/${it.slug})`
    const key = sec.trim()
    const h = heads.find((x) => x.text === key || x.text.startsWith(key + ' ') || x.text.startsWith(key + '.') || x.text.startsWith(key + '：'))
    if (!h) throw new Error(`[xref] ${file}: #${n} 找不到小节 “${key}”`)
    const title = `${it.text} · ${h.text}`.replace(/"/g, '“')
    return `[${label || `#${n} §${key}`}](/${it.slug}#${h.id} "${title}")`
  })
}

export function xrefPlugin(md) {
  const parse = md.parse.bind(md)
  md.parse = (src, env) => parse(src.includes('[[') ? resolveXrefs(src, env?.relativePath) : src, env)
}
