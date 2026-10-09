#!/usr/bin/env python3
"""把文章里的 `@shot NN/SSSS.webp 秒数 说明` 行转换为 <figure>，并从 /workspace/frames 生成压缩后的 webp。
截图全部来自 YouTube 原视频的真实帧（yt-dlp 下载 2 秒片段 + ffmpeg 抽帧）。"""
import re, sys, os, glob, subprocess, html
DOCS = os.path.join(os.path.dirname(__file__), '..', 'docs')
FRAMES = '/workspace/frames'
def build_img(vid, sec, out):
    if os.path.exists(out): return True
    cands = glob.glob(f'{FRAMES}/{vid}/[ct]_{sec:05d}.jpg')
    if not cands: print('  MISSING frame', vid, sec); return False
    os.makedirs(os.path.dirname(out), exist_ok=True)
    for q in (72, 60, 50, 40):
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', cands[0], '-vf', 'scale=960:-2', '-c:v', 'libwebp', '-quality', str(q), out], check=True)
        if os.path.getsize(out) <= 150_000: break
    return True
for path in sorted(glob.glob(f'{DOCS}/[0-9][0-9]-*.md')):
    src = open(path, encoding='utf8').read()
    if '@shot ' not in src: continue
    vid = re.search(r'watch\?v=([A-Za-z0-9_-]{11})', src).group(1)
    lines = src.split('\n'); out = []; group = []
    def flush():
        global group
        if not group: return
        figs = []
        for name, sec, cap in group:
            ok = build_img(vid, sec, f'{DOCS}/public/images/{name}')
            ts = f'{sec//60}:{sec%60:02d}' if sec < 3600 else f'{sec//3600}:{sec%3600//60:02d}:{sec%60:02d}'
            figs.append(f'<figure class="shot"><img src="/images/{name}" alt="{html.escape(cap)}" loading="lazy"><figcaption>📷 视频截图 · <a href="https://www.youtube.com/watch?v={vid}&t={sec}s" target="_blank" rel="noopener">{ts}</a> · {html.escape(cap)}</figcaption></figure>')
        out.append('<div class="shots">' + ''.join(figs) + '</div>' if len(figs) > 1 else figs[0])
        group = []
    for ln in lines:
        m = re.match(r'@shot (\S+) (\d+) (.+)$', ln)
        if m: group.append((m.group(1), int(m.group(2)), m.group(3).strip())); continue
        if group and ln.strip() == '' : continue
        flush(); out.append(ln)
    flush()
    # 保证 figure 前后有空行
    txt = '\n'.join(out)
    txt = re.sub(r'\n(<(?:figure|div class="shots")[^\n]*)\n', r'\n\n\1\n\n', txt)
    open(path, 'w', encoding='utf8').write(txt)
    print('converted', os.path.basename(path))
