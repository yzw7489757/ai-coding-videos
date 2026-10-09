# AGENTS.md · AI 代理与贡献者工作指南

本文件是本仓库**唯一权威**的协作规范，面向 AI 编码代理（Claude Code、Codex、Cursor 等）和人类贡献者。README 只做简介；规范有冲突时以本文件为准。修改规范时请直接改这里。

## 1. 项目是什么

“AI 编程代理实战知识库”：一个中文 VitePress 文档站，收录资深工程师使用 Claude Code、Codex、Cursor、Grok 等编码代理的**真实**演讲、工程博客、官方文档和指南。每份资料配一篇原创深度拆解，再按主题串成主题指南、模式库、配置模板库和学习路径。读者包括新手，行文要通俗。

- 线上：https://ai-coding-videos.vercel.app
- 更新节奏：每周一批新资料。

## 2. 技术栈与版本

| 组件 | 版本 / 说明 |
|---|---|
| Node.js | ≥ 18（当前在 20.19 上构建） |
| VitePress | 1.6.4（Vue 3.5） |
| Mermaid | 11.x，经 `vitepress-plugin-mermaid` 2.0.x 接入 |
| markdown-it | 14.x，自写插件见下文 |
| 部署 | Vercel（项目 `ai-coding-videos`，配置在 `vercel.json`） |

站内搜索用 VitePress 自带的 local search。

## 3. 目录结构

```text
.
├── AGENTS.md                 # 本文件（协作规范）
├── CLAUDE.md                 # 指向本文件
├── README.md                 # 仓库简介
├── package.json / vercel.json
├── scripts/
│   ├── gen-glossary.mjs      # 由 glossary-data.mjs 生成 docs/glossary.md
│   ├── gen-home.mjs          # 由 domains.mjs 生成 docs/index.md（首页）
│   ├── check-links.py        # 检查构建产物的站内链接和锚点
│   ├── shots.py              # 把 @shot 行转成截图 <figure>
│   └── sync-content.py       # ⚠️ 已废弃，禁止运行
└── docs/
    ├── NN-slug.md            # 单篇资料（00-summary 为总结页）
    ├── guide/<主题id>.md     # 主题指南；guide/long-running.md 为跨主题专题
    ├── patterns.md / templates.md / paths.md / all.md / changelog.md
    ├── index.md              # 自动生成，勿手改
    ├── glossary.md           # 自动生成，勿手改
    ├── public/images/<NN>/   # 每篇资料的图片
    └── .vitepress/
        ├── config.mts        # 导航、侧边栏、markdown 插件
        ├── domains.mjs       # 分类数据（唯一数据源）
        ├── glossary-data.mjs # 术语数据
        ├── glossary-plugin.mjs / tr-plugin.mjs / xref-plugin.mjs
        └── theme/            # Trans.vue、YouTube.vue、SourceCard.vue、custom.css、index.ts
```

## 4. 运行、构建、预览、部署

```bash
npm install
npm run dev        # 生成术语表后启动开发服务器
npm run build      # gen-glossary → gen-home → vitepress build，输出 docs/.vitepress/dist
npm run preview    # 预览构建产物
python3 scripts/check-links.py   # 构建后检查站内链接与锚点
```

- 部署：`vercel --prod --yes`（Vercel CLI 需已登录并关联项目；Build Command = `npm run build`，Output = `docs/.vitepress/dist`）。
- 只有**站点内容或构建配置**变化时才需要部署；只改 README / AGENTS.md 不需要。
- `vitepress preview` 会缓存文件列表：重新构建后要重启预览服务器，否则新的带哈希资源会 404。

## 5. 内容模型

### 5.1 `domains.mjs` 是唯一的分类数据源

- 按**内容主题**分类，不按工具。现有 6 个主题：

  | id | 主题 |
  |---|---|
  | `practice` | 🛠️ 真实项目实战与人工把关 |
  | `planning` | 🧭 需求澄清、规划与上下文管理 |
  | `multi-agent` | 🤝 多代理协作与对抗式验证 |
  | `automation` | ⚙️ 后台代理、自动化与 CI/CD |
  | `harness` | 🧠 Harness 工程与内部机制 |
  | `verification` | ✅ 评测、测试与验证 |

- 每份资料只放进最贴切的**一个**主题，在该主题的 `items` 里追加：

  ```js
  { n: '28', slug: '28-xxx', text: '侧边栏标题', short: '导图短标签', tool: 'claude', type: 'article', added: 'YYYY-MM-DD' }
  ```

  | 字段 | 含义 |
  |---|---|
  | `n` | 两位编号，与文件名一致 |
  | `slug` | 文件名（不含 `.md`），即 URL |
  | `text` | 侧边栏标题 |
  | `short` | 首页思维导图的短标签，几个词，**不要用括号** |
  | `tool` | `tools` 的 key：`claude` / `codex` / `grok45` / `grokbuild` / `cursor` / `general`。新工具先在 `tools` 加 key，并在 `custom.css` 加 `.tool-<key>` 亮 / 暗两套颜色 |
  | `type` | `video` / `article` / `docs` / `guide`（视频 / 文章 / 官方文档 / 指南） |
  | `added` | 收录日期。首页“最近收录”自动显示 `added` 最新的一批 |

- 侧边栏、顶部“主题指南”菜单、首页卡片、计数、思维导图和文章顶部标签的数据都来自这里。各主题篇数尽量均衡；某组明显过大时再拆分，新主题要同时新增指南页（导航由 `config.mts` 从 `domains.mjs` 生成）。

### 5.2 编号与 URL

- 新资料顺延编号。编号只用来保持 URL 稳定，不代表分类。
- **不要给旧文章改号或改 slug**。

### 5.3 图片

- 放在 `docs/public/images/<NN>/`，正文引用 `/images/<NN>/文件名`。
- 视频截图必须是**真实视频帧**：用 yt-dlp 下载片段、ffmpeg 抽帧，960px 宽 webp，每张 ≤150KB，每篇 2–4 张。不用缩略图替代，不用合成图或 AI 生成图。
- `scripts/shots.py` 把 `@shot NN/SSSS.webp 秒数 说明` 行转成带 YouTube 时间戳链接的 `<figure class="shot">`。
- 文章类资料可以没有截图。

### 5.4 生成文件（不要手改）

- `docs/index.md`：由 `scripts/gen-home.mjs` 根据 `domains.mjs` 生成，每次构建自动运行。要改首页文案就改脚本。
- `docs/glossary.md`：由 `scripts/gen-glossary.mjs` 根据 `glossary-data.mjs` 生成。

## 6. 写作规范

### 6.1 单篇资料结构

```markdown
# NN｜中文标题
<div class="meta-tags"><a class="domain-tag" href="/guide/<主题id>">图标 主题：主题名</a><span class="type-tag type-<type>">类型：类型名</span><span class="tool-tag tool-<tool>">工具：工具名</span></div>

<div class="hook">**一句话看懂**：……</div>
（可选）为什么值得看
::: tip 小白先懂这几个词   ← 列 4–7 个术语，能链接术语表的就写成链接
> 信息来源：……（抓取方式和日期）

## 1. 基本信息
## 2. 做了什么
## 3. 怎么做的        ← 小节编号 3.1、3.2……
## 4. 结果如何        ← 含“局限与注意”
## 5. 可借鉴之处      ← 末尾“你可以这样试”
```

- 小节标题会被其他页面用 xref 引用。**改标题前先全站搜索 `[[NN§`**，改完构建一次确认。

### 6.2 基本信息第一行：原始来源

- 视频：`<YouTube id="视频ID" title="视频标题" />`（youtube-nocookie、16:9、懒加载、可全屏）。
- 文章 / 官方文档 / 指南：`<SourceCard type="文章" title="原文标题" author="作者" date="YYYY-MM-DD" url="https://…" />`。标题用原文真实标题，最好用 curl 取 `<title>` 核对。
- 下方表格仍保留普通链接。

### 6.3 英文原话：悬停翻译

- 行内：`<Trans zh="中文译文">“English original”</Trans>`。引号放在标签里面；译文里的英文双引号写成 `&quot;`。
- 整段引用、多行 prompt、代码 / 配置块用容器，译文写在第一行：

  ````markdown
  ::: tr 中文译文（一整行）
  > "English quote…"
  :::
  ````

  列表项里的容器跟随列表缩进。
- ⚠️ **命名冲突**：组件不能叫 `Tr`（会和 HTML 的 `<tr>` 冲突）；markdown-it 里不要用 `tr_open` / `tr_close` 这类 token 名（会和表格行冲突）。现用名是 `Trans` 和 `trans_open` / `trans_close`。
- 不要在原文下方另起一行写译文。

### 6.4 术语表：单向链接

- 术语数据只维护在 `docs/.vitepress/glossary-data.mjs`（id、分类、别名、白话解释、展开说明）。
- `glossary-plugin.mjs` 在构建时把单篇资料、主题指南、模式库、学习路径和首页里**第一次出现**的术语链接到 `/glossary#id`。它会跳过标题、代码块、Mermaid、引用块、`::: tr`、`<Trans>` 原文、已有链接和引号内原话。
- 只做文章 → 术语表的单向链接。术语表**不列“出现在”**这类反向引用。
- 别名不要用太泛的词（如单独的 “port”“漂移”），否则会误链到旧文章。
- 构建日志会列出未被任何页面链接的术语，仅供参考。

### 6.5 Mermaid

- 用 ```` ```mermaid ```` 代码块，图要简单：节点不超过二三十个，太密就拆图。
- flowchart 节点文字含标点、斜杠、括号时用引号包起来：`A["文字（说明）"]`；换行用 `<br/>`。
- mindmap 节点文字**不要用括号和方括号**（会被解析成节点形状），也尽量避免冒号等符号。
- 每个主题指南有一张“问题 → 资料”小导图；首页导图由脚本生成，只到“主题 → 资料”两层。
- 构建后要在浏览器里确认图真的渲染出来（没有 “Syntax error”）。

### 6.6 小节级交叉引用（xref）

- 任何页面里都可以写 `[[16]]`、`[[16§3.5]]` 或 `[[16§3.5|自定义文字]]`。构建时 `xref-plugin.mjs` 把它们转成指向该文章（小节）的链接。
- `§` 后可以写小节编号（`3.5`、`4`），也可以写标题开头的文字（如 `Phase 1`）。
- 引用了不存在的编号或小节会**直接让构建失败**。

### 6.7 文风

- 中文为主，英文专有名词保留原文。面向新手：先说结论，再说为什么，最后说怎么做。
- 句子短，少用形容词和套话，不写营销腔。中英文之间加空格，使用全角中文标点。
- 数字、引语、结论都要能在来源里找到出处。

## 7. 新增一份资料的流程

1. **核实来源存在**：视频查 YouTube 元数据，文章用 curl / 浏览器打开原文。
2. **写文章** `docs/NN-slug.md`，按第 6 节的结构；图片放 `docs/public/images/NN/`。
3. **登记** `domains.mjs`（第 5.1 节字段，`added` 写今天）。
4. **新术语**加到 `glossary-data.mjs`；“小白先懂这几个词”里能链接的就写成链接。
5. **同步横向页面**（最容易漏）：
   - 主题指南 `docs/guide/<主题id>.md`：把新资料放进相关的“核心问题”；观点和已有资料不同时，写进“来源之间的分歧”表；更新推荐阅读顺序和小导图。
   - 模式库 `docs/patterns.md`：有新的可复用做法就加卡片（一句话 / 何时用 / 何时别用 / 来源 / 相关）。“相关”链接必须打开原文小节核对过才加。
   - 配置模板库 `docs/templates.md`：只收原文里**逐字存在**的配置、脚本和提示词，注明来源小节、原始出处和抓取日期；没有就写进“缺口”。
   - 学习路径 `docs/paths.md`：适合时插入对应路径。
   - 全部资料 `docs/all.md`：在对应主题下追加条目，并更新末尾的覆盖情况。
   - 总结 `docs/00-summary.md`：覆盖行、相关模式、推荐阅读顺序和缺口。
   - 长时任务相关时，更新 `docs/guide/long-running.md` 的对照表。
   - 更新日志 `docs/changelog.md`：在最上面加一条，写日期、新增资料表、结构变化和新增术语数。
6. **验证**（第 8 节），然后提交，需要时再部署。

## 8. 验证清单

- [ ] `npm run build` 成功：无死链报错、无 xref 报错。
- [ ] `python3 scripts/check-links.py` 输出 `bad 0`。
- [ ] 浏览器检查（无头 Chrome，例如 puppeteer-core，不加进项目依赖）：
  - 每页 Mermaid 渲染数等于源码里的图数，页面里没有 “Syntax error”；
  - 悬停 `<Trans>` 原文能弹出译文，悬停术语链接有提示；
  - 图片全部加载（滚动到底后检查 `naturalWidth > 0`）；
  - 术语表锚点全部存在；
  - 页面里没有“出现在”，也没有残留的 `[[NN` 原文；
  - 每篇资料“基本信息”第一项是播放器或来源卡片；
  - 控制台没有报错（YouTube 嵌入自身的报错除外）。
- [ ] 抽查新文章、对应主题指南和首页的亮 / 暗模式。

## 9. 来源可信度规则

- **只收录真实存在的资料**：链接必须核实可访问；记录抓取日期。
- **引语只来自原文**：英文引用逐字摘录。字幕质量差或无法逐字核对时，标注“转述”，不要写成原话。
- **数字、结论只写来源给出的**：来源没给的写“未给出”，不推算，不补全。
- **不编造示例**：配置模板库和文章里的代码、prompt、配置必须是原文内容；没有就如实写“缺口”。
- **截图只用真实帧**（第 5.3 节）。
- **范围**：只收软件开发工作流。以漏洞挖掘、攻防安全为主题的资料不收录。
- 分析是本站原创评论；视频和文章版权归原作者，正文中要给出来源链接。

## 10. 不要做的事

- ❌ 运行 `scripts/sync-content.py`：它会用最初的旧版内容覆盖 `docs/`。
- ❌ 手改 `docs/index.md` 或 `docs/glossary.md`（会被脚本覆盖）。
- ❌ 给旧文章改编号或 slug，或改小节标题后不检查 xref。
- ❌ 组件叫 `Tr`，或在 markdown-it 里用 `tr_open` 类 token 名。
- ❌ 在术语表里加反向引用（“出现在”）。
- ❌ 用缩略图、合成图或 AI 生成图冒充视频截图。
- ❌ 自己编写配置 / prompt 示例冒充引用。
- ❌ 提交密钥、`.env*`、`.vercel/`、`node_modules/`、构建产物和缓存。
- ❌ 没有内容变化时反复部署。
