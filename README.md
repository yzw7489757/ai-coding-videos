# AI 编程专家实战视频研究 · 文档站

VitePress 1.6 + vitepress-plugin-mermaid 构建的静态站点。线上：https://ai-coding-videos.vercel.app

- 本地开发：`npm install && npm run dev`
- 构建：`npm run build`（先运行 `scripts/gen-glossary.mjs` 生成术语表，再 `vitepress build docs`）→ 输出 `docs/.vitepress/dist`
- 预览：`npm run preview`

## 内容来源

`docs/` 是唯一的内容源（v2 改版后已和最初的 `/workspace/ai-coding-expert-videos/` 分叉）。
⚠️ 不要再运行 `scripts/sync-content.py`，它会用旧版内容覆盖 `docs/`。

## 每周新增文章的约定（必须遵守）

1. **按内容主题分类，不按工具分类**
   - 分类数据只维护在 `docs/.vitepress/domains.mjs`：在最贴切的那**一个**主题的 `items` 里追加 `{ n, slug, text, tool }`。侧边栏、顶部“按主题”菜单都会自动更新。
   - 现有主题：真实项目实战与人工把关 / 需求澄清、规划与上下文管理 / 多代理协作与对抗式验证 / 后台代理、自动化与 CI/CD / Harness 工程与内部机制。尽量保持各组篇数均衡（4–6 组）；某组明显过大时再拆分。
   - 工具只作为元数据标签显示（`tool` 取 `domains.mjs` 里 `tools` 的 key）。文章 H1 下面放一行主题 + 工具标签：
     `<div class="meta-tags"><a class="domain-tag" href="/#domain-<主题id>">图标 主题：主题名</a><span class="tool-tag tool-<tool>">工具：工具名</span></div>`
   - 同时更新首页 `docs/index.md`：对应主题下的清单条目、思维导图（主题 → 目标 → 视频）和特性卡片的 linkText；以及 `docs/00-summary.md` 的“推荐观看顺序”。
   - 文件名编号只用来保持 URL 稳定，新文章顺延编号即可，**不要给旧文章改号**。
2. **基本信息第一项是可播放的视频**：`## 1. 基本信息` 下面第一行写 `<YouTube id="视频ID" title="视频标题" />`（16:9 自适应，youtube-nocookie 域名，懒加载，可全屏），表格里仍保留普通链接。
3. **英文原话用悬停翻译，不再在下方另起一行译文**
   - 行内：`<Trans zh="中文译文">“English original”</Trans>`（引号放在标签里面；译文里的英文双引号写成 `&quot;`）。
   - 整段引用、多行 prompt、代码 / 配置块：用容器包起来，译文写在第一行：
     ```
     ::: tr 中文译文（一整行）
     > "English quote…"
     :::
     ```
     列表项里的容器跟随列表缩进。
   - 不要用 `<Tr>` 这个名字（会和 HTML 的 `<tr>` 冲突），也不要在 markdown-it 里使用 `tr_open` 之类的 token 名。
4. **术语表单向链接**：文章 → 术语表。术语表页面不列“出现在”之类的反向引用。新术语加到 `glossary-data.mjs`，文章里第一次出现时会自动链接；构建日志会列出尚未被任何文章链接的术语，仅供维护参考。
5. 截图：真实视频帧，每篇 2–4 张，见下文“视频截图”。

## 术语表

- `docs/.vitepress/glossary-data.mjs`：术语数据（id、分类、别名、白话解释、展开说明）。
- `docs/.vitepress/glossary-plugin.mjs`：markdown-it 插件。构建时把每篇文章里**第一次出现**的术语链接到 `/glossary#id`，并带悬停提示；跳过标题、代码块、Mermaid、引用块、`::: tr` 翻译块、`<Trans>` 原文、已有链接和引号内的原话。
- `scripts/gen-glossary.mjs`：根据数据生成 `docs/glossary.md`（不要手改，改数据文件后重新构建即可）。

## 悬停翻译与视频播放器

- `docs/.vitepress/theme/Trans.vue`：翻译组件。原文显示灰色虚线下划线和“译”角标；鼠标悬停、键盘聚焦（Tab）或手机点按时弹出译文，Esc 或点别处关闭。弹层 Teleport 到 `body` 并用 fixed 定位，会自动翻到上方 / 夹在视口内，不会被表格或代码块裁切；颜色全部用 VitePress 主题变量，亮 / 暗模式都适用。
- `docs/.vitepress/tr-plugin.mjs`：`::: tr 译文` 块级容器，渲染为 `<Trans block zh="…">`。
- `docs/.vitepress/theme/YouTube.vue`：内嵌播放器。
- 术语链接（品牌色点状下划线、可点击跳转）与翻译（中性色虚线 + “译”角标、不跳转）样式刻意区分，且术语插件不会在翻译原文里插链接，两种提示不会叠在一起。

## 视频截图

- `docs/public/images/<NN>/<秒数>.webp`：全部是用 yt-dlp 下载视频片段、ffmpeg 抽帧得到的真实画面（960px 宽 webp，每张 ≤150KB），没有缩略图替代，也没有合成图。
- `scripts/shots.py`：把文章里的 `@shot NN/SSSS.webp 秒数 说明` 行转成带时间戳链接的 `<figure>`（会从 `/workspace/frames/` 读取原始帧并转码）。

## 样式

`docs/.vitepress/theme/custom.css`：术语链接与提示框（`a.gloss`）、悬停翻译（`.tr-inline` / `.tr-block` / `.tr-pop`）、截图（`figure.shot` / `.shots`）、播放器（`.yt-player`）、主题 / 工具标签（`.meta-tags` / `.tool-tag`）、开篇摘要（`.hook`）。

## 部署

Vercel：Framework = VitePress，Build Command = `npm run build`，Output Directory = `docs/.vitepress/dist`（已写入 `vercel.json`）。命令行：`vercel --prod --yes`。
