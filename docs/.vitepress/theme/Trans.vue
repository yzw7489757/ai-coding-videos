<script setup lang="ts">
// 悬停翻译：原文带虚线下划线，鼠标悬停、键盘聚焦或手机点按时弹出中文译文。
// 弹层 Teleport 到 body 并用 fixed 定位，不会被表格、代码块等容器裁切。
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps<{ zh: string; block?: boolean }>()
const open = ref(false)
const mounted = ref(false)
const trig = ref<HTMLElement | null>(null)
const pop = ref<HTMLElement | null>(null)
const style = ref<Record<string, string>>({})
const side = ref<'top' | 'bottom'>('bottom')
const uid = `tr-pop-${Math.random().toString(36).slice(2, 9)}`
const tag = computed(() => (props.block ? 'div' : 'span'))
let hideTimer: ReturnType<typeof setTimeout> | undefined
let openedAt = 0

function place() {
  const t = trig.value
  const p = pop.value
  if (!t || !p) return
  const vw = document.documentElement.clientWidth
  const vh = window.innerHeight
  const m = 12
  const maxW = Math.min(props.block ? 560 : 380, vw - m * 2)
  p.style.maxWidth = `${maxW}px`
  const rects = Array.from(t.getClientRects())
  const box = t.getBoundingClientRect()
  // 行内原文可能折行：以最后一行为锚点放在下方，空间不够时以第一行为锚点放在上方
  const below = props.block ? box : rects[rects.length - 1] || box
  const above = props.block ? box : rects[0] || box
  const pr = p.getBoundingClientRect()
  let anchor = below
  let top = below.bottom + 8
  side.value = 'bottom'
  if (top + pr.height > vh - m && above.top - 8 - pr.height > m) {
    anchor = above
    top = above.top - 8 - pr.height
    side.value = 'top'
  }
  let left = props.block ? anchor.left : anchor.left + anchor.width / 2 - pr.width / 2
  left = Math.max(m, Math.min(left, vw - pr.width - m))
  style.value = { top: `${Math.round(top)}px`, left: `${Math.round(left)}px`, maxWidth: `${maxW}px` }
}

function show() {
  clearTimeout(hideTimer)
  if (!open.value) {
    open.value = true
    openedAt = Date.now()
    nextTick(place)
  }
}
function hide(delay = 120) {
  clearTimeout(hideTimer)
  hideTimer = setTimeout(() => (open.value = false), delay)
}
function onClick(e: MouseEvent) {
  // 点到原文里的链接时不拦截
  if ((e.target as HTMLElement).closest('a')) return
  // 触屏上 tap 会先触发 mouseenter 再触发 click，刚打开的不要立刻关掉
  if (open.value && Date.now() - openedAt > 400) open.value = false
  else show()
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') { open.value = false; return }
  if ((e.key === 'Enter' || e.key === ' ') && e.target === trig.value) {
    e.preventDefault()
    open.value ? (open.value = false) : show()
  }
}
function onOutside(e: Event) {
  if (!open.value) return
  const n = e.target as Node
  if (trig.value?.contains(n) || pop.value?.contains(n)) return
  open.value = false
}
function onMove() { if (open.value) place() }

onMounted(() => {
  mounted.value = true
  document.addEventListener('pointerdown', onOutside, true)
  window.addEventListener('scroll', onMove, true)
  window.addEventListener('resize', onMove)
})
onBeforeUnmount(() => {
  clearTimeout(hideTimer)
  document.removeEventListener('pointerdown', onOutside, true)
  window.removeEventListener('scroll', onMove, true)
  window.removeEventListener('resize', onMove)
})
</script>

<template>
  <component
    :is="tag"
    ref="trig"
    :class="block ? 'tr-block' : 'tr-inline'"
    :data-open="open ? '' : undefined"
    tabindex="0"
    :aria-description="`中文翻译：${zh}`"
    :aria-describedby="open ? uid : undefined"
    :aria-expanded="open ? 'true' : 'false'"
    @mouseenter="show"
    @mouseleave="hide()"
    @focusin="show"
    @focusout="hide(0)"
    @click="onClick"
    @keydown="onKey"
  >
    <slot />
    <span v-if="block" class="tr-badge" aria-hidden="true">译 · 悬停看翻译</span>
  </component>
  <Teleport v-if="mounted" to="body">
    <div
      v-if="open"
      :id="uid"
      ref="pop"
      class="tr-pop"
      :class="[`tr-pop--${side}`, { 'tr-pop--block': block }]"
      role="tooltip"
      :style="style"
      @mouseenter="show"
      @mouseleave="hide()"
    >
      <span class="tr-pop__label">译</span>{{ zh }}
    </div>
  </Teleport>
</template>
