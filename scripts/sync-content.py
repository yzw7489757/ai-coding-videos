import os, re, shutil
SRC='/workspace/ai-coding-expert-videos'; DST='docs'
slugs={
'00-总结.md':'00-summary.md',
'01-ClaudeCode一周年-验证与Routines.md':'01-claude-code-one-year.md',
'02-ClaudeCode团队工作流-ClaudeTag与Workflows.md':'02-claude-code-team-workflows.md',
'03-HowWeClaudeCode-访谈式需求与可验证组件.md':'03-how-we-claude-code.md',
'04-NoVibesAllowed-研究规划实施RPI.md':'04-no-vibes-allowed-rpi.md',
'05-IndyDevDan-TaskSystem-Builder与Validator团队.md':'05-indydevdan-task-system.md',
'06-FieldGuideToFable-发现未知与上下文减法.md':'06-field-guide-to-fable.md',
'07-HarnessEngineering-人掌舵代理执行.md':'07-harness-engineering.md',
'08-CodexMasterclass-子代理并行审查与Hooks.md':'08-codex-masterclass.md',
'09-HowCodexWorks-Harness内部机制.md':'09-how-codex-works.md',
'10-HowOpenAIUsesCodex-上下文验证与PR看护.md':'10-how-openai-uses-codex.md',
'11-PeterSteinberger-用Codex构建OpenClaw.md':'11-peter-steinberger-openclaw.md',
'12-ForrestKnight-Grok4.5实战代码审查.md':'12-forrestknight-grok-4-5.md',
'13-BijanBowen-GrokBuild完整实测.md':'13-bijan-bowen-grok-build.md',
'14-OrcDev-GrokBuild-Skills驱动的UI开发.md':'14-orcdev-grok-build-skills.md',
'15-Arcade-GrokBuild-57个子代理与Goal对抗验证.md':'15-arcade-grok-build-57-agents.md',
'README.md':'index.md'}
for f in os.listdir(SRC):
    if not f.endswith('.md'): continue
    t=open(os.path.join(SRC,f),encoding='utf-8').read()
    for a,b in slugs.items():
        t=t.replace('](%s)'%a,'](./%s)'%b).replace('](./%s)'%a,'](./%s)'%b)
    open(os.path.join(DST,slugs[f]),'w',encoding='utf-8').write(t)
print('ok')
