import os, sys, base64, subprocess, threading, http.server, functools, socketserver
from playwright.sync_api import sync_playwright
ROOT=os.path.dirname(os.path.abspath(__file__))
jobs=[a.split(':') for a in sys.argv[1:]]  # scene:width:height
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
srv=socketserver.TCPServer(('127.0.0.1',0), functools.partial(Q, directory=ROOT)); port=srv.server_address[1]
threading.Thread(target=srv.serve_forever,daemon=True).start()
with sync_playwright() as p:
    b=p.chromium.launch(args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
    for name,w,h in jobs:
        pg=b.new_page(viewport={'width':400,'height':300})
        errs=[]; pg.on('pageerror',lambda e: errs.append(str(e))); pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None)
        pg.goto(f'http://127.0.0.1:{port}/harness.html?scene={name}&w={w}&h={h}')
        pg.wait_for_function('window.__done || window.__err', timeout=240000) if not errs else None
        d=pg.evaluate('window.__done')
        if not d: print(name,'FAILED',errs); continue
        os.makedirs(os.path.join(ROOT,'out'),exist_ok=True); open(os.path.join(ROOT,'out',f'{name}.png'),'wb').write(base64.b64decode(d.split(',')[1]))
        print(name,'ok',errs[:2]); pg.close()
    b.close()
srv.shutdown()
