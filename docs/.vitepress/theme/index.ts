import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Trans from './Trans.vue'
import YouTube from './YouTube.vue'
import SourceCard from './SourceCard.vue'
import ScoreTable from './ScoreTable.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Trans', Trans)
    app.component('YouTube', YouTube)
    app.component('SourceCard', SourceCard)
    app.component('ScoreTable', ScoreTable)
  }
} satisfies Theme
