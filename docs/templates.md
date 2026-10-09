# 🧾 配置模板库

<div class="hook">

从来源原文里**逐字摘出**的 13 段配置、脚本和提示词。每段都注明来源文章小节和原始出处，抓取日期均为 **2026-10-09**。

</div>

::: warning 收录规则
- 只收录来源里真实存在的内容，不改写、不补全、不自编示例。
- 中文说明为本站所加；代码块内容与原文一致（个别地方去掉了 Markdown 格式符号，会在说明里注明）。
- 原文更新后，以原始出处为准。
- 使用 `--dangerously-skip-permissions`、`danger-full-access` 这类选项前，先读对应文章的安全说明。
:::

| # | 模板 | 来源 |
|---|---|---|
| 1 | [Ralph 最简循环](#t1) | [[24§2]] |
| 2 | [Agent Teams 无限循环脚本](#t2) | [[17§3.1]] |
| 3 | [CLAUDE.md 渐进披露目录（agent_docs/）](#t3) | [[20§3.5]] |
| 4 | [Claude Code 注入 CLAUDE.md 时附带的 system reminder](#t4) | [[20§3.3]] |
| 5 | [`/review-pr` 命令的原则](#t5) | [[23§3.3]] |
| 6 | [worktree 端口分配（assign-port.ts 片段）](#t6) | [[23§3.5]] |
| 7 | [自愈层提示词](#t7) | [[23§3.4]] |
| 8 | [`codex exec` 管道](#t8) | [[22§3.1]] |
| 9 | [Codex CI 自动修复：两段式 workflow 的关键步骤](#t9) | [[22§3.3]] |
| 10 | [Eval 任务定义 YAML](#t10) | [[19§3.3]] |
| 11 | [TDD / 测试提示词](#t11) | [[25§3.1]]、[[25§3.2]] |
| 12 | [Showboat 演示提示词](#t12) | [[25§3.4]] |
| 13 | [Harness 消融原则](#t13) | [[16§3.5]] |

## 1. Ralph 最简循环 {#t1}

- **出自**：[[24§2]]
- **原始出处**：Geoffrey Huntley 博客 [ghuntley.com/ralph](https://ghuntley.com/ralph/)
- **说明**：Huntley 的原话是“Ralph 最纯粹的形式就是一个 Bash 循环”。放开权限无人值守跑之前，先读 [[24§3.1]] 的隔离做法。

```bash
while :; do cat PROMPT.md | claude-code ; done
```

## 2. Agent Teams 无限循环脚本 {#t2}

- **出自**：[[17§3.1]]
- **原始出处**：[Anthropic Engineering：Building a C compiler with a team of parallel Claudes](https://www.anthropic.com/engineering/building-c-compiler)
- **说明**：`claude-opus-X-Y` 是原文里的占位写法。原文强调 `--dangerously-skip-permissions` 要在容器里跑，见 [[17§3.1]]。

```bash
#!/bin/bash

while true; do
    COMMIT=$(git rev-parse --short=6 HEAD)
    LOGFILE="agent_logs/agent_${COMMIT}.log"

    claude --dangerously-skip-permissions \
           -p "$(cat AGENT_PROMPT.md)" \
           --model claude-opus-X-Y &> "$LOGFILE"
done
```

## 3. CLAUDE.md 渐进披露目录（agent_docs/） {#t3}

- **出自**：[[20§3.5]]
- **原始出处**：[HumanLayer：Writing a good CLAUDE.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)
- **说明**：根 CLAUDE.md 里只放这些文件的目录和一句话简介，代理按需读取。

```text
agent_docs/
  |- building_the_project.md
  |- running_tests.md
  |- code_conventions.md
  |- service_architecture.md
  |- database_schema.md
  |- service_communication_patterns.md
```

## 4. Claude Code 注入 CLAUDE.md 时附带的 system reminder {#t4}

- **出自**：[[20§3.3]]
- **原始出处**：HumanLayer 同上文（作者用日志代理抓到的原文）
- **说明**：这不是让你复制的配置，而是解释“为什么规则写多了会被无视”的证据。

```text
<system-reminder>
      IMPORTANT: this context may or may not be relevant to your tasks. 
      You should not respond to this context unless it is highly relevant to your task.
</system-reminder>
```

## 5. `/review-pr` 命令的原则 {#t5}

- **出自**：[[23§3.3]]
- **原始出处**：GitHub 仓库 [coleam00/GitHubIssueTriager](https://github.com/coleam00/GitHubIssueTriager) 的 `.claude/commands/review-pr.md`
- **说明**：完整的子代理分派规则请看 [[23§3.3]] 的步骤列表或原仓库文件。

```markdown
**Principle:** The session that wrote the code should NOT be the session that reviews it. Run this command in a fresh `claude` session so the reviewers aren't primed by the implementer's reasoning. Different model, different blind spots; fresh context, no sycophancy.
```

## 6. worktree 端口分配（assign-port.ts 片段） {#t6}

- **出自**：[[23§3.5]]
- **原始出处**：同一仓库的 `scripts/assign-port.ts`
- **说明**：主目录固定 4000；其他 worktree 用路径的 md5 哈希映射到 4100–4199。片段为原仓库节选。

```ts
const BASE_PORT = 4000;
const WORKTREE_BASE = 4100;
const WORKTREE_RANGE = 100;

export function assignPort(): number {
  const explicit = process.env.PORT;
  if (explicit) return Number(explicit);

  const cwd = process.cwd();
  const leaf = basename(cwd);

  if (leaf === "GitHubIssueTriager") return BASE_PORT;

  const digest = createHash("md5").update(cwd).digest();
  const offset = digest.readUInt32BE(0) % WORKTREE_RANGE;
  return WORKTREE_BASE + offset;
}
```

## 7. 自愈层提示词 {#t7}

- **出自**：[[23§3.4]]
- **原始出处**：Cole Medin 视频字幕（YouTube 自动字幕）
- **说明**：在审查发现 bug 后，对已经有完整审查上下文的代理说这句话。

```text
Hey, issue XYZ came up. What could we fix in our rules, skills, workflows, etc. so that this doesn't happen again?
```

## 8. `codex exec` 管道 {#t8}

- **出自**：[[22§3.1]]
- **原始出处**：[Codex 文档：Non-interactive mode](https://developers.openai.com/codex/noninteractive)

```bash
npm test 2>&1 \
  | codex exec "summarize the failing tests and propose the smallest likely fix" \
  | tee test-summary.md
```

## 9. Codex CI 自动修复：两段式 workflow 的关键步骤 {#t9}

- **出自**：[[22§3.3]]
- **原始出处**：[Codex GitHub Action 文档](https://developers.openai.com/codex/github-action)
- **说明**：原文的两个 job 分别是 `generate_fix`（`contents: read`）和 `open_pr`（有写权限、无 API key）。这里只摘了原文中逐字出现的两个步骤，完整布局见 [[22§3.3]] 的时序图。

第一步：只读 job 里运行 Codex 生成改动

```yaml
      - name: Run Codex
        uses: openai/codex-action@v1
        with:
          openai-api-key: ${{ secrets.OPENAI_API_KEY }}
          prompt: |
            The CI workflow "${{ github.event.workflow_run.name }}" failed for commit
            ${{ github.event.workflow_run.head_sha }}.

            Run `npm test --silent` to reproduce the failure. Identify the minimal
            change needed to make the tests pass, implement only that change, and
            run `npm test --silent` again.

            Do not refactor unrelated files.
```

第二步：把改动导出成补丁 artifact，交给另一个无密钥、有写权限的 job 开 PR

```yaml
      - name: Create patch artifact
        id: diff
        run: |
          git add -N .
          git diff --binary HEAD > codex.patch
          if [ -s codex.patch ]; then
            echo "has_patch=true" >> "$GITHUB_OUTPUT"
          else
            echo "has_patch=false" >> "$GITHUB_OUTPUT"
          fi
```

## 10. Eval 任务定义 YAML {#t10}

- **出自**：[[19§3.3]]
- **原始出处**：[Anthropic Engineering：Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- **说明**：原文说明这是示意配置，用来把所有评分器类型都展示一遍。

```yaml
task:
  id: "fix-auth-bypass_1"
  desc: "Fix authentication bypass when password field is empty and ..."
  graders:
    - type: deterministic_tests
      required: [test_empty_pw_rejected.py, test_null_pw_rejected.py]
    - type: llm_rubric
      rubric: prompts/code_quality.md
    - type: static_analysis
      commands: [ruff, mypy, bandit]
    - type: state_check
      expect:
        security_logs: {event_type: "auth_blocked"}
    - type: tool_calls
      required:
        - {tool: read_file, params: {path: "src/auth/*"}}
        - {tool: edit_file}
        - {tool: run_tests}
  tracked_metrics:
    - type: transcript
      metrics:
        - n_turns
        - n_toolcalls
        - n_total_tokens
    - type: latency
      metrics:
        - time_to_first_token
        - output_tokens_per_sec
        - time_to_last_token
```

## 11. TDD / 测试提示词 {#t11}

- **出自**：[[25§3.1]]、[[25§3.2]]
- **原始出处**：[Simon Willison：Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/)

写新功能时：

```text
Build a Python function to extract headers from a markdown string. Use red/green TDD.
```

在已有项目里开新会话的第一句：

```text
信息来源：Simon Willison 博客上的指南首页、介绍文章（2026-02-23）以及 “Red/green TDD”“First run the tests”“Agentic manual testing”“Anti-patterns: things to avoid” 四章原文（抓取于 2026-10-09）。指南章节会持续更新，引用以抓取时版本为准。英文引用均为原文摘录，中文翻译为本站所加。
```

Python 项目里更具体的写法：

```text
Run "uv run pytest"
```

## 12. Showboat 演示提示词 {#t12}

- **出自**：[[25§3.4]]
- **原始出处**：Simon Willison 同上
- **说明**：原文中命令和文件名带有代码格式，这里去掉了 Markdown 反引号，文字未改。

```text
Run uvx showboat --help and then create a notes/api-demo.md showboat document and use it to test and document that new API.
```

## 13. Harness 消融原则 {#t13}

- **出自**：[[16§3.5]]
- **原始出处**：[Anthropic Engineering：Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps)
- **说明**：这是一条原则而不是配置。做法是模型升级后一次只删一个组件，见[模式 P3](/patterns#p3)。

```text
every component in a harness encodes an assumption about what the model can't do on its own, and those assumptions are worth stress testing, both because they may be incorrect, and because they can quickly go stale as models improve.
```

## 缺口：这些模板本批没有 {#gaps}

::: info 尚未收录
- **Hooks 配置**：本批来源里**没有**可以整段引用的 hooks JSON（例如 `settings.json` 里的 Stop hook 写法）。HumanLayer 只建议用 Stop hook 跑 formatter / linter（[[20§3.6]]），没有给出配置；Ralph 官方插件的 hook 实现也没有逐字引用（[[24§3.4]]）。本站不会自己编写示例冒充引用，后续批次会去找 Claude Code 官方 hooks 文档或公开仓库。
- **Ghostty 的 AGENTS.md**：Mitchell Hashimoto 在文中链接了它（[[27§3.5]]），但本批没有摘录原文。
- 站内旧文章里也有可用的原文配置，例如 Codex 自定义 persona 的 TOML（[[08§3.5]]），暂未汇总进本页。
:::
