// markdown-it 插件：`::: tr 中文译文` … `:::` 容器。
// 把整块原文（引用块、代码块等）包进 <Trans block zh="…">，悬停 / 聚焦 / 点按时弹出中文翻译。
// 行内原文直接在 Markdown 里写 <Trans zh="中文">“English”</Trans>。
const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function trPlugin(md) {
  md.block.ruler.before('fence', 'trans_container', (state, startLine, endLine, silent) => {
    const start = state.bMarks[startLine] + state.tShift[startLine]
    const m = state.src.slice(start, state.eMarks[startLine]).match(/^:::\s*tr\s+(.+?)\s*$/)
    if (!m || state.sCount[startLine] - state.blkIndent >= 4) return false
    if (silent) return true
    let next = startLine
    let found = false
    while (++next < endLine) {
      const p = state.bMarks[next] + state.tShift[next]
      const max = state.eMarks[next]
      if (p < max && state.sCount[next] < state.blkIndent) break
      if (/^:::\s*$/.test(state.src.slice(p, max)) && state.sCount[next] - state.blkIndent < 4) { found = true; break }
    }
    const oldParent = state.parentType
    const oldMax = state.lineMax
    state.parentType = 'container'
    state.lineMax = next
    let t = state.push('trans_open', 'Trans', 1)
    t.block = true; t.info = m[1]; t.map = [startLine, next]
    state.md.block.tokenize(state, startLine + 1, next)
    t = state.push('trans_close', 'Trans', -1)
    t.block = true
    state.parentType = oldParent
    state.lineMax = oldMax
    state.line = next + (found ? 1 : 0)
    return true
  }, { alt: ['paragraph', 'reference', 'blockquote', 'list'] })
  md.renderer.rules.trans_open = (tokens, idx) => `<Trans block zh="${attr(tokens[idx].info)}">\n`
  md.renderer.rules.trans_close = () => '</Trans>\n'
}
