"""Real-touch tap a chain of selectors, then scroll to a target and shoot."""
import base64, os, sys, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from shot import WS, target_ws
ws = WS(target_ws()); ws.cmd("Page.enable"); ws.cmd("Runtime.enable")
def js(e):
    return ws.cmd("Runtime.evaluate", {"expression": e, "returnByValue": True}).get("result",{}).get("value")
def tap(sel):
    pt = js("(()=>{const e=document.querySelector(%s);if(!e)return null;"
            "e.scrollIntoView({block:'center'});const r=e.getBoundingClientRect();"
            "return [Math.round(r.left+r.width/2),Math.round(r.top+r.height/2)];})()" % repr(sel))
    if not pt: print("  !! missing", sel); return
    hit = js("(()=>{const e=document.elementFromPoint(%d,%d);return e?(e.closest(%s)?'ok':e.tagName+'.'+e.className):'none';})()" % (pt[0],pt[1],repr(sel)))
    print("  tap", sel, "->", hit)
    ws.cmd("Input.dispatchTouchEvent", {"type":"touchStart","touchPoints":[{"x":pt[0],"y":pt[1]}]})
    ws.cmd("Input.dispatchTouchEvent", {"type":"touchEnd","touchPoints":[]})
    time.sleep(0.45)
*taps, target, out = sys.argv[1:]
for t in taps: tap(t)
print(js("(()=>{const e=document.querySelector(%s);if(!e)return 'MISSING';"
         "e.scrollIntoView({block:'center'});return 'ok';})()" % repr(target)))
time.sleep(0.4)
open(out,"wb").write(base64.b64decode(ws.cmd("Page.captureScreenshot", {"format":"png"})["data"]))
print("wrote", out)
