import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Trans from './Trans.vue'
import YouTube from './YouTube.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Trans', Trans)
    app.component('YouTube', YouTube)
  }
} satisfies Theme
