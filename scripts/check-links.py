# 检查构建产物里的站内链接：页面是否存在、#锚点是否存在。用法：python3 scripts/check-links.py [dist目录]
import re,os,glob,html
from urllib.parse import unquote
import sys
os.chdir(sys.argv[1] if len(sys.argv)>1 else "docs/.vitepress/dist")
ids={}
for f in glob.glob('**/*.html',recursive=True):
    s=open(f).read()
    ids[f]=set(re.findall(r'\sid="([^"]+)"',s))
bad=[];n=0;pages=set()
for f,s_ in ids.items():
    s=open(f).read()
    for h in re.findall(r'href="(/[^"#]*)?#([^"]+)"',s):
        path,anc=h; anc=html.unescape(unquote(anc))
        if path is None or path=='': tgt=f
        else:
            p=path.strip('/').split('?')[0]
            tgt=(p+'.html') if p else 'index.html'
            if p.endswith('.html'): tgt=p
            if not os.path.exists(tgt) and os.path.exists(p+'/index.html'): tgt=p+'/index.html'
        n+=1
        if tgt not in ids: bad.append((f,path,anc,'NOPAGE')); continue
        if anc not in ids[tgt]: bad.append((f,path,anc,'NOID'))
# internal page links
for f in ids:
    s=open(f).read()
    for p in re.findall(r'href="(/[^"#?]*)"',s):
        if p.startswith('/assets') or '.' in p.split('/')[-1]: continue
        q=p.strip('/'); t=(q+'.html') if q else 'index.html'
        if not os.path.exists(t) and not os.path.exists(q+'/index.html'): bad.append((f,p,'','DEADPAGE'))
print('anchor links checked',n,'bad',len(bad))
for b in sorted(set(bad))[:40]: print(b)
sys.exit(1 if bad else 0)
