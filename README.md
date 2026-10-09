# AI 编程专家实战视频研究 · 文档站

VitePress 1.6 + vitepress-plugin-mermaid 构建的静态站点。线上：https://ai-coding-videos.vercel.app

- 本地开发：`npm install && npm run dev`
- 构建：`npm run build`（先运行 `scripts/gen-glossary.mjs` 生成术语表，再 `vitepress build docs`）→ 输出 `docs/.vitepress/dist`
- 预览：`npm run preview`

## 内容来源

`docs/` 是唯一的内容源（v2 改版后已和最初的 `/workspace/ai-coding-expert-videos/` 分叉）。
⚠️ 不要再运行 `scripts/sync-content.py`，它会用旧版内容覆盖 `docs/`。

## 术语表

- `docs/.vitepress/glossary-data.mjs`：术语数据（id、分类、别名、白话解释、展开说明）。
- `docs/.vitepress/glossary-plugin.mjs`：markdown-it 插件。构建时把每篇文章里**第一次出现**的术语链接到 `/glossary#id`，并带悬停提示；跳过标题、代码块、Mermaid、引用块、已有链接和引号内的原话。
- `scripts/gen-glossary.mjs`：用同一插件统计“出现在”，生成 `docs/glossary.md`（不要手改，改数据文件后重新构建即可）。

## 视频截图

- `docs/public/images/<NN>/<秒数>.webp`：全部是用 yt-dlp 下载视频片段、ffmpeg 抽帧得到的真实画面（960px 宽 webp，每张 ≤150KB），没有缩略图替代，也没有合成图。
- `scripts/shots.py`：把文章里的 `@shot NN/SSSS.webp 秒数 说明` 行转成带时间戳链接的 `<figure>`（会从 `/workspace/frames/` 读取原始帧并转码）。

## 样式

`docs/.vitepress/theme/custom.css`：术语链接与提示框（`a.gloss`）、译文块（`.tr`）、截图（`figure.shot` / `.shots`）、开篇摘要（`.hook`）。

## 部署

Vercel：Framework = VitePress，Build Command = `npm run build`，Output Directory = `docs/.vitepress/dist`（已写入 `vercel.json`）。命令行：`vercel --prod --yes`。
