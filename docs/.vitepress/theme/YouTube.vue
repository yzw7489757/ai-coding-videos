<script setup lang="ts">
// 可直接播放的 YouTube 播放器：16:9 自适应，隐私增强域名，懒加载。
// 用法：<YouTube id="视频ID" title="视频标题" />，可选 start="秒数"
import { computed } from 'vue'
const props = defineProps<{ id: string; title?: string; start?: string | number }>()
const src = computed(() => {
  const q = new URLSearchParams({ rel: '0', modestbranding: '1' })
  if (props.start) q.set('start', String(props.start))
  return `https://www.youtube-nocookie.com/embed/${props.id}?${q}`
})
</script>

<template>
  <figure class="yt-player">
    <div class="yt-frame">
      <iframe
        :src="src"
        :title="title || 'YouTube 视频播放器'"
        loading="lazy"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      />
    </div>
  </figure>
</template>
