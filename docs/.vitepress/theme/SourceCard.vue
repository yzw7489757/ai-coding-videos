<script setup lang="ts">
// 非视频资料（文章 / 官方文档 / 指南）的来源卡片，放在“基本信息”第一行，取代视频播放器。
// 用法：<SourceCard type="文章" title="原标题" author="作者" date="2026-01-01" url="https://…" />
defineProps<{ type: string; title: string; author: string; date: string; url: string }>()
const host = (u: string) => { try { return new URL(u).host.replace(/^www\./, '') } catch { return u } }
</script>

<template>
  <a class="source-card" :href="url" target="_blank" rel="noopener">
    <span class="source-card__type">{{ type }}</span>
    <span class="source-card__title">{{ title }}</span>
    <span class="source-card__meta">{{ author }} · {{ date }}</span>
    <span class="source-card__link">↗ {{ host(url) }} · 阅读原文</span>
  </a>
</template>
