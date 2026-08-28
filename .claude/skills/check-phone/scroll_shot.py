"""Scroll to a selector on the live page and screenshot the viewport."""
import base64, os, sys, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from shot import WS, target_ws
ws = WS(target_ws()); ws.cmd("Page.enable"); ws.cmd("Runtime.enable")
def js(e):
    return ws.cmd("Runtime.evaluate", {"expression": e, "returnByValue": True}).get("result",{}).get("value")
sel, out = sys.argv[1], sys.argv[2]
print(js("(()=>{const e=document.querySelector(%s);if(!e)return 'MISSING';"
         "e.scrollIntoView({block:'start'});window.scrollBy(0,-90);return 'ok';})()" % repr(sel)))
time.sleep(0.4)
d = ws.cmd("Page.captureScreenshot", {"format":"png"})
open(out,"wb").write(base64.b64decode(d["data"])); print("wrote", out)
