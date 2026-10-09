# AI 编程代理实战知识库 · 文档站

VitePress 1.6 + vitepress-plugin-mermaid 构建的静态站点。线上：https://ai-coding-videos.vercel.app

- 本地开发：`npm install && npm run dev`
- 构建：`npm run build`（先运行 `scripts/gen-glossary.mjs` 生成术语表、`scripts/gen-home.mjs` 生成首页，再 `vitepress build docs`）→ 输出 `docs/.vitepress/dist`
- 预览：`npm run preview`

## 内容来源

`docs/` 是唯一的内容源（v2 改版后已和最初的 `/workspace/ai-coding-expert-videos/` 分叉）。
⚠️ 不要再运行 `scripts/sync-content.py`，它会用旧版内容覆盖 `docs/`。

## 站点结构

| 页面 | 文件 | 维护方式 |
|---|---|---|
| 首页 | `docs/index.md` | **自动生成**（`scripts/gen-home.mjs`，读 `domains.mjs`），不要手改 |
| 单篇资料 | `docs/NN-slug.md` | 手写，固定 5 节 |
| 主题指南 | `docs/guide/<主题id>.md` | 手写，每个主题一页 |
| 长时自主任务专题 | `docs/guide/long-running.md` | 手写 |
| 学习路径 / 模式库 / 配置模板库 | `docs/paths.md` / `docs/patterns.md` / `docs/templates.md` | 手写 |
| 全部资料 | `docs/all.md` | 手写（按主题分组的清单 + 覆盖情况） |
| 总结 / 更新日志 | `docs/00-summary.md` / `docs/changelog.md` | 手写 |
| 术语表 | `docs/glossary.md` | **自动生成**（`scripts/gen-glossary.mjs`），不要手改 |
| 顶部导航、侧边栏 | `docs/.vitepress/config.mts` | 从 `domains.mjs` 自动生成；新增横向页面时才需要改 |

## 每周新增资料的约定（必须遵守）

1. **登记到 `docs/.vitepress/domains.mjs`（唯一的分类数据源）**
   - 按**内容主题**分类，不按工具。在最贴切的那**一个**主题的 `items` 里追加：
     `{ n, slug, text, short, tool, type, added }`
     - `text`：侧边栏标题；`short`：首页思维导图的短标签（几个词，不要用括号）。
     - `tool`：`tools` 里的 key（`claude` / `codex` / `grok45` / `grokbuild` / `cursor` / `general`）。新工具先在 `tools` 里加 key，并在 `custom.css` 里加 `.tool-<key>` 颜色。
     - `type`：`video` / `article` / `docs` / `guide`（视频 / 文章 / 官方文档 / 指南）。
     - `added`：收录日期 `YYYY-MM-DD`。首页“最近收录”自动显示 `added` 最新的那一批。
   - 现有 6 个主题：实战与把关 `practice` / 规划与上下文 `planning` / 多代理协作 `multi-agent` / 后台与 CI `automation` / Harness 工程 `harness` / 评测与验证 `verification`。尽量保持各组篇数均衡；某组明显过大时再拆分（新主题要同时加指南页和导航）。
   - 侧边栏、顶部“主题指南”菜单、首页卡片 / 计数 / 思维导图、文章顶部标签的数据都来自这里。
   - 文件名编号只用来保持 URL 稳定，新资料顺延编号即可，**不要给旧文章改号**。
2. **单篇资料的固定结构**：H1 写成 `# NN｜标题`；H1 下面一行是主题 + 类型 + 工具标签：
   `<div class="meta-tags"><a class="domain-tag" href="/guide/<主题id>">图标 主题：主题名</a><span class="type-tag type-<type>">类型：类型名</span><span class="tool-tag tool-<tool>">工具：工具名</span></div>`
   然后是一句话看懂、“小白先懂这几个词”提示框，以及 5 节：`## 1. 基本信息` / `## 2. 做了什么` / `## 3. 怎么做的`（小节编号 3.1、3.2…）/ `## 4. 结果如何` / `## 5. 可借鉴之处`。小节标题会被其他页面引用，**改标题前先全站搜索 `[[NN§`**。
3. **基本信息第一行是原始来源**
   - 视频：`<YouTube id="视频ID" title="视频标题" />`（16:9 自适应，youtube-nocookie，懒加载，可全屏）。
   - 文章 / 官方文档 / 指南：`<SourceCard type="文章" title="原文标题" author="作者" date="YYYY-MM-DD" url="https://…" />`（标题用原文真实标题，最好用 curl 取 `<title>` 核对）。
   - 表格里仍保留普通链接；“信息来源”里写明抓取方式和日期。
4. **同步更新横向页面**（这一步最容易漏）
   - **主题指南** `docs/guide/<主题id>.md`：把新资料放进相关的“核心问题”下面；如果它和已有资料观点不同，写进“来源之间的分歧”表；更新推荐阅读顺序和小思维导图。
   - **模式库** `docs/patterns.md`：新资料提出了可复用的做法，就加一张卡片（一句话 / 何时用 / 何时别用 / 来源 / 相关）；已有模式多了新来源，就补进“来源”或“相关”。“相关”链接必须打开原文小节核对过再加。
   - **配置模板库** `docs/templates.md`：只收录原文里**逐字存在**的配置、脚本和提示词，注明来源小节、原始出处和抓取日期；没有就写进“缺口”，**不要自己编示例**。
   - **学习路径** `docs/paths.md`、**全部资料** `docs/all.md`（按主题追加条目，更新覆盖情况）、**总结** `docs/00-summary.md`（覆盖行、相关模式、推荐阅读顺序），以及长时任务相关时的 `docs/guide/long-running.md`。
   - **更新日志** `docs/changelog.md`：在最上面加一条，写明日期、新增资料表、结构变化、新增术语数。
5. **小节级交叉引用**：在任何页面里写 `[[16]]`、`[[16§3.5]]` 或 `[[16§3.5|自定义文字]]`，构建时由 `docs/.vitepress/xref-plugin.mjs` 转成指向该文章小节的链接（`§` 后可以写小节编号 `3.5`、`4`，或标题开头文字如 `Phase 1`）。引用了不存在的编号或小节会**直接构建失败**，所以改标题后构建一次就能发现断链。
6. **英文原话用悬停翻译，不再在下方另起一行译文**
   - 行内：`<Trans zh="中文译文">“English original”</Trans>`（引号放在标签里面；译文里的英文双引号写成 `&quot;`）。
   - 整段引用、多行 prompt、代码 / 配置块：用容器包起来，译文写在第一行：
     ```
     ::: tr 中文译文（一整行）
     > "English quote…"
     :::
     ```
     列表项里的容器跟随列表缩进。
   - 不要用 `<Tr>` 这个名字（会和 HTML 的 `<tr>` 冲突），也不要在 markdown-it 里使用 `tr_open` 之类的 token 名。
7. **术语表单向链接**：文章 → 术语表。术语表页面不列“出现在”之类的反向引用。新术语加到 `glossary-data.mjs`（别名不要用太泛的词，否则会误链到旧文章），文章里第一次出现时会自动链接；构建日志会列出尚未被任何页面链接的术语，仅供维护参考。
8. **图片**：放在 `docs/public/images/<NN>/`，正文里写 `/images/<NN>/文件名`。视频截图是真实视频帧，每篇 2–4 张，见下文“视频截图”；文章类资料没有截图也可以。
9. **发布前检查**：`npm run build` 无死链、无 xref 报错；本地预览抽查新文章、对应主题指南和首页。

## 术语表

- `docs/.vitepress/glossary-data.mjs`：术语数据（id、分类、别名、白话解释、展开说明）。
- `docs/.vitepress/glossary-plugin.mjs`：markdown-it 插件。构建时把每篇文章（以及主题指南、模式库、学习路径、首页）里**第一次出现**的术语链接到 `/glossary#id`，并带悬停提示；跳过标题、代码块、Mermaid、引用块、`::: tr` 翻译块、`<Trans>` 原文、已有链接和引号内的原话。
- `scripts/gen-glossary.mjs`：根据数据生成 `docs/glossary.md`（不要手改，改数据文件后重新构建即可）。

## 悬停翻译与视频播放器

- `docs/.vitepress/theme/Trans.vue`：翻译组件。原文显示灰色虚线下划线和“译”角标；鼠标悬停、键盘聚焦（Tab）或手机点按时弹出译文，Esc 或点别处关闭。弹层 Teleport 到 `body` 并用 fixed 定位，会自动翻到上方 / 夹在视口内，不会被表格或代码块裁切；颜色全部用 VitePress 主题变量，亮 / 暗模式都适用。
- `docs/.vitepress/tr-plugin.mjs`：`::: tr 译文` 块级容器，渲染为 `<Trans block zh="…">`。
- `docs/.vitepress/theme/YouTube.vue`：内嵌播放器；`SourceCard.vue`：非视频资料的来源卡片。
- 术语链接（品牌色点状下划线、可点击跳转）与翻译（中性色虚线 + “译”角标、不跳转）样式刻意区分，且术语插件不会在翻译原文里插链接，两种提示不会叠在一起。

## 视频截图

- `docs/public/images/<NN>/<秒数>.webp`：全部是用 yt-dlp 下载视频片段、ffmpeg 抽帧得到的真实画面（960px 宽 webp，每张 ≤150KB），没有缩略图替代，也没有合成图。
- `scripts/shots.py`：把文章里的 `@shot NN/SSSS.webp 秒数 说明` 行转成带时间戳链接的 `<figure>`（会从 `/workspace/frames/` 读取原始帧并转码）。

## 样式

`docs/.vitepress/theme/custom.css`：术语链接与提示框（`a.gloss`）、悬停翻译（`.tr-inline` / `.tr-block` / `.tr-pop`）、截图（`figure.shot` / `.shots`）、播放器（`.yt-player`）、主题 / 类型 / 工具标签（`.meta-tags` / `.type-tag` / `.tool-tag`）、来源卡片（`.source-card`）、开篇摘要（`.hook`）。

## 部署

Vercel：Framework = VitePress，Build Command = `npm run build`，Output Directory = `docs/.vitepress/dist`（已写入 `vercel.json`）。命令行：`vercel --prod --yes`。
