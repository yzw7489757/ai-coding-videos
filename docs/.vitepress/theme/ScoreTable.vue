<script setup lang="ts">
// /all 页的评分总表：默认按阶段顺序，可切换为按某项评分从高到低排序（同分按阶段顺序）。
import { computed, ref } from 'vue'
import { allItems, stageLabel } from '../domains.mjs'
import { ratings, fmtScore } from '../ratings.mjs'

const rows = allItems().map((i, idx) => ({
  idx,
  n: i.n,
  slug: i.slug,
  text: i.text,
  stage: stageLabel(i.domain),
  stageId: i.domain.id,
  use: ratings[i.n].use[0],
  depth: ratings[i.n].depth[0],
  overall: ratings[i.n].overall[0]
}))

const modes = [
  { key: 'stage', label: '按阶段顺序' },
  { key: 'overall', label: '按综合' },
  { key: 'use', label: '按实用性' },
  { key: 'depth', label: '按深度' }
] as const
const mode = ref<(typeof modes)[number]['key']>('stage')

const sorted = computed(() => {
  const k = mode.value
  if (k === 'stage') return rows
  return [...rows].sort((a, b) => b[k] - a[k] || b.overall - a.overall || a.idx - b.idx)
})
</script>

<template>
  <div class="score-table">
    <div class="score-sort" role="group" aria-label="排序方式">
      <span>排序：</span>
      <button
        v-for="m in modes"
        :key="m.key"
        type="button"
        :class="{ active: mode === m.key }"
        :aria-pressed="mode === m.key"
        @click="mode = m.key"
      >{{ m.label }}</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>#</th><th>资料</th><th>阶段</th>
          <th class="num" :class="{ on: mode === 'use' }">实用性</th>
          <th class="num" :class="{ on: mode === 'depth' }">深度</th>
          <th class="num" :class="{ on: mode === 'overall' }">综合</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in sorted" :key="r.n">
          <td>{{ r.n }}</td>
          <td><a :href="`/${r.slug}`">{{ r.text }}</a></td>
          <td><a class="score-stage" :href="`/guide/${r.stageId}`">{{ r.stage.split(' · ')[0] }}</a></td>
          <td class="num">{{ fmtScore(r.use) }}</td>
          <td class="num">{{ fmtScore(r.depth) }}</td>
          <td class="num overall">
            <span class="rating-stars" :style="{ '--r': r.overall }" role="img" :aria-label="`${fmtScore(r.overall)} / 5`"></span>
            <b>{{ fmtScore(r.overall) }}</b>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
