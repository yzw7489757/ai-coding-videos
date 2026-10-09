# 🧾 配置模板库

<div class="hook">

从来源原文里**逐字摘出**的 21 段配置、脚本和提示词。每段都注明来源文章小节和原始出处，抓取日期均为 **2026-10-09**。

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
| 14 | [Claude Code Hooks：改完自动格式化（PostToolUse）](#t14) | [[28§3.2]] |
| 15 | [Claude Code Hooks：拦住对敏感文件的修改（PreToolUse + 退出码 2）](#t15) | [[28§3.3]] |
| 16 | [Claude Code Hooks：压缩后重新注入约定（SessionStart）](#t16) | [[28§3.4]] |
| 17 | [Claude Code Hooks：收工前检查任务和测试（Stop prompt / agent hook）](#t17) | [[28§3.5]] |
| 18 | [Gemini CLI Hooks：写入前扫描密钥（BeforeTool）](#t18) | [[28§3.6]] |
| 19 | [Grok Build Hooks：Bash 前的安全检查（PreToolUse）](#t19) | [[34§3.2]] |
| 20 | [Conductor `workflow.md` 指导原则](#t20) | [[29§3.4]] |
| 21 | [真实项目的 AGENTS.md：Ghostty](#t21) | [[27§3.5]] |

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

## 14. Claude Code Hooks：改完自动格式化（PostToolUse） {#t14}

- **出自**：[[28§3.2]]
- **原始出处**：[Claude Code 文档：Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide)（抓取于 2026-10-09）
- **说明**：放进项目根目录的 `.claude/settings.json`。每次 `Edit` 或 `Write` 之后用 `jq` 取出文件路径交给 Prettier。通过 `Bash` 改的文件匹配不到，见 [[28§3.2]]。

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write"
          }
        ]
      }
    ]
  }
}
```

## 15. Claude Code Hooks：拦住对敏感文件的修改（PreToolUse + 退出码 2） {#t15}

- **出自**：[[28§3.3]]
- **原始出处**：[Claude Code 文档：Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide)（抓取于 2026-10-09）
- **说明**：脚本保存为 `.claude/hooks/protect-files.sh`，需要 `chmod +x`；再在 `.claude/settings.json` 里注册。退出码 2 会拦下动作，stderr 里的文字交给 Claude 作为反馈。

```bash
#!/bin/bash
# protect-files.sh

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Normalize Windows backslash separators so the patterns below match
FILE_PATH="${FILE_PATH//\\//}"

PROTECTED_PATTERNS=(".env" "package-lock.json" ".git/")

for pattern in "${PROTECTED_PATTERNS[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo "Blocked: $FILE_PATH matches protected pattern '$pattern'" >&2
    exit 2
  fi
done

exit 0
```

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/protect-files.sh"
          }
        ]
      }
    ]
  }
}
```

## 16. Claude Code Hooks：压缩后重新注入约定（SessionStart） {#t16}

- **出自**：[[28§3.4]]
- **原始出处**：[Claude Code 文档：Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide)（抓取于 2026-10-09）
- **说明**：`compact` 匹配器只在压缩之后触发。`echo` 的内容是原文示例，换成你自己项目的约定；每次会话开始都需要的内容，文档建议写进 CLAUDE.md。

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "compact",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Reminder: use Bun, not npm. Run bun test before committing. Current sprint: auth refactor.'"
          }
        ]
      }
    ]
  }
}
```

## 17. Claude Code Hooks：收工前检查任务和测试（Stop prompt / agent hook） {#t17}

- **出自**：[[28§3.5]]
- **原始出处**：[Claude Code 文档：Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide)（抓取于 2026-10-09）
- **说明**：三段原文依次是：让模型判断任务是否完成的 prompt hook；派子代理跑测试的 agent hook（文档注明 agent hook 是实验功能）；自写 Stop hook 脚本时防止无限续跑的 `stop_hook_active` 检查。Stop hook 连续拦截 8 次后会被强制放行。

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Check if all tasks are complete. If not, respond with {\"ok\": false, \"reason\": \"what remains to be done\"}."
          }
        ]
      }
    ]
  }
}
```

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "agent",
            "prompt": "Verify that all unit tests pass. Run the test suite and check the results. $ARGUMENTS",
            "timeout": 120
          }
        ]
      }
    ]
  }
}
```

```bash
#!/bin/bash
INPUT=$(cat)
if [ "$(echo "$INPUT" | jq -r '.stop_hook_active')" = "true" ]; then
  exit 0  # Allow Claude to stop
fi
# ... rest of your hook logic
```

## 18. Gemini CLI Hooks：写入前扫描密钥（BeforeTool） {#t18}

- **出自**：[[28§3.6]]
- **原始出处**：[Google Developers Blog：Tailor Gemini CLI to your workflow with hooks](https://developers.googleblog.com/tailor-gemini-cli-to-your-workflow-with-hooks/)（Edi Palencia、Jack Wotherspoon、Abhi Patel，2026-01-28；抓取于 2026-10-09）
- **说明**：脚本保存为 `.gemini/hooks/block-secrets.sh`，配置放进 `.gemini/settings.json`。注意它用 JSON 里的 `"decision": "deny"` 表达拒绝，退出码仍是 0。正则只是示例，覆盖不了所有密钥格式。

```bash
#!/usr/bin/env bash
# Read hook input from stdin
input=$(cat)

# Extract content being written using jq
content=$(echo "$input" | jq -r '.tool_input.content // .tool_input.new_string // ""')

# Check for common secret patterns
if echo "$content" | grep -qE 'api[_-]?key|password|secret|AKIA[0-9A-Z]{16}'; then
  # Return structured denial to the agent
  cat <<EOF
{
  "decision": "deny",
  "reason": "Security Policy: Potential secret detected in content.",
  "systemMessage": "Security scanner blocked operation"
}
EOF
  exit 0
fi

# Allow the operation
echo '{"decision": "allow"}'
exit 0
```

```json
{
  "hooks": {
    "BeforeTool": [
      {
        "matcher": "write_file|replace",
        "hooks": [
          {
            "name": "secret-scanner",
            "type": "command",
            "command": "$GEMINI_PROJECT_DIR/.gemini/hooks/block-secrets.sh",
            "description": "Prevent committing secrets"
          }
        ]
      }
    ]
  }
}
```

## 19. Grok Build Hooks：Bash 前的安全检查（PreToolUse） {#t19}

- **出自**：[[34§3.2]]
- **原始出处**：[xAI Grok Build 文档：Hooks](https://docs.x.ai/build/features/hooks)（页面标注 2026-07-02 更新；抓取于 2026-10-09）
- **说明**：放在 `~/.grok/hooks/*.json` 或 `<project>/.grok/hooks/*.json`；项目 hook 首次运行前要用 `/hooks-trust` 或 `--trust` 授权。`bin/safety-check.sh` 是原文里的占位脚本名，文档没有给出它的内容。第二段是脚本拒绝时输出到 stdout 的格式。超时、崩溃、输出格式错误都会**故障放行**。

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{ "type": "command", "command": "bin/safety-check.sh", "timeout": 10 }]
      }
    ]
  }
}
```

```json
{ "decision": "deny", "reason": "Unsafe command detected" }
```

## 20. Conductor `workflow.md` 指导原则 {#t20}

- **出自**：[[29§3.4]]
- **原始出处**：[gemini-cli-extensions/conductor](https://github.com/gemini-cli-extensions/conductor) 仓库中的 `workflow.md` 模板（Apache-2.0 许可；抓取于 2026-10-09）
- **说明**：Conductor setup 时生成的团队流程文件开头部分。模板后面还有逐个任务的 Red / Green 流程，见仓库原文。

```markdown
## Guiding Principles

1.  **The Plan is the Source of Truth:** All work must be tracked in `plan.md`
2.  **The Tech Stack is Deliberate:** Changes to the tech stack must be
    documented in `tech-stack.md` *before* implementation
3.  **Test-Driven Development:** Write unit tests before implementing
    functionality
4.  **High Code Coverage:** Aim for >80% code coverage for all modules
5.  **User Experience First:** Every decision should prioritize user experience
6.  **Non-Interactive & CI-Aware:** Prefer non-interactive commands. Use
    `CI=true` for watch-mode tools (tests, linters) to ensure single execution.
```

## 21. 真实项目的 AGENTS.md：Ghostty {#t21}

- **出自**：[[27§3.5]]（Mitchell Hashimoto 在文中链接了这个文件）
- **原始出处**：[ghostty-org/ghostty 仓库的 AGENTS.md](https://github.com/ghostty-org/ghostty/blob/main/AGENTS.md)（最近一次修改 2026-04-08，提交 `9897d6c`；抓取于 2026-10-09）
- **说明**：全文 39 行，逐字转载。值得注意的写法：命令写得很具体，并告诉代理“优先跑定向测试，因为全量测试很慢”；目录结构只列三行；最后一节明确禁止代理创建 issue 和 PR。
- **许可**：Ghostty 采用 MIT 许可。Copyright (c) 2024 Mitchell Hashimoto, Ghostty contributors。许可全文见下方折叠块。

````markdown
# Agent Development Guide

A file for [guiding coding agents](https://agents.md/).

## Commands

- **Build:** `zig build`
  - If you're on macOS and don't need to build the macOS app, use
    `-Demit-macos-app=false` to skip building the app bundle and speed up
    compilation.
- **Test (Zig):** `zig build test`
  - Prefer to run targeted tests with `-Dtest-filter` because the full
    test suite is slow to run.
- **Test filter (Zig)**: `zig build test -Dtest-filter=<test name>`
- **Formatting (Zig)**: `zig fmt .`
- **Formatting (Swift)**: `swiftlint lint --strict --fix`
- **Formatting (other)**: `prettier -w .`

## libghostty-vt

- Build: `zig build -Demit-lib-vt`
- Build WASM: `zig build -Demit-lib-vt -Dtarget=wasm32-freestanding -Doptimize=ReleaseSmall`
- Test: `zig build test-lib-vt -Dtest-filter=<filter>`
  - Prefer this when the change is in a libghostty-vt file
- All C enums in `include/ghostty/vt/` must have a `_MAX_VALUE = GHOSTTY_ENUM_MAX_VALUE`
  sentinel as the last entry to force int enum sizing (pre-C23 portability).

## Directory Structure

- Shared Zig core: `src/`
- macOS app: `macos/`
- GTK (Linux and FreeBSD) app: `src/apprt/gtk`

## Issue and PR Guidelines

- Never create an issue.
- Never create a PR.
- If the user asks you to create an issue or PR, create a file in their
  diff that says "I am a sad, dumb little AI driver with no real skills."
````

::: details MIT License（Ghostty）
```text
MIT License

Copyright (c) 2024 Mitchell Hashimoto, Ghostty contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
:::


## 缺口：这些模板本批没有 {#gaps}

::: info 尚未收录
- **已补上（2026-10-09 第二批）**：上一批缺的 Hooks 配置，现已从 Claude Code 官方文档逐字收录（[模板 14–17](#t14)），并附上 Gemini CLI 和 Grok Build 的同类配置（[模板 18](#t18)、[模板 19](#t19)）；Ghostty 的 AGENTS.md 已全文收录（[模板 21](#t21)）。
- **Ralph 官方插件的 hook 实现**：仍没有逐字引用（[[24§3.4]]）。
- **Grok Build 的 `bin/safety-check.sh`**：文档只给了占位脚本名，没有内容，本站不补写。
- **Agent evals 接进 CI 的完整配置**：本批没有找到可以整段引用、来源可靠的示例；评测任务定义见[模板 10](#t10)。
- **Aider 的配置**：本批没有收录 Aider 相关资料。
- 站内旧文章里也有可用的原文配置，例如 Codex 自定义 persona 的 TOML（[[08§3.5]]），暂未汇总进本页。
:::
