"""Seed a realistic kitchen, then tap through Cook / Fridge / Recipe and shoot each."""
import base64, json, os, sys, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from shot import WS, target_ws

W, H = 412, 915
THEME = sys.argv[1] if len(sys.argv) > 1 else 'dark'
OUT = sys.argv[2] if len(sys.argv) > 2 else '.'

SEED = {
 'fridge': ['eggs','milk','butter','heavy cream','parmesan','cheddar','dijon mustard',
            'mayonnaise','soy sauce','lemons','garlic','shallots','carrots','celery',
            'chicken thighs','ground beef','scallions'],
 'pantry': ['spaghetti','white rice','olive oil','vegetable oil','onions','potatoes',
            'honey','chicken stock','canned tomatoes','flour','sugar'],
 'spices': ['salt','black pepper','smoked paprika','cumin','chilli flakes','dried thyme',
            'bay leaves','garlic powder'],
 'freezer':['frozen peas','frozen chicken thighs']
}

ws = WS(target_ws())
ws.cmd("Page.enable"); ws.cmd("Runtime.enable"); ws.cmd("Network.enable")
ws.cmd("Emulation.setDeviceMetricsOverride",
       {"width": W, "height": H, "deviceScaleFactor": 3, "mobile": True})
ws.cmd("Emulation.setTouchEmulationEnabled", {"enabled": True})
ws.cmd("Network.setBypassServiceWorker", {"bypass": True})
ws.cmd("Network.setCacheDisabled", {"cacheDisabled": True})

def js(expr, await_p=False):
    r = ws.cmd("Runtime.evaluate", {"expression": expr, "returnByValue": True,
                                    "awaitPromise": await_p})
    return r.get("result", {}).get("value")

def tap(sel):
    pt = js("(()=>{const e=document.querySelector(%s);if(!e)return null;"
            "e.scrollIntoView({block:'center'});const r=e.getBoundingClientRect();"
            "return [Math.round(r.left+r.width/2),Math.round(r.top+r.height/2)];})()" % repr(sel))
    if not pt:
        print("  !! no element", sel); return False
    hit = js("(()=>{const e=document.elementFromPoint(%d,%d);"
             "return e?(e.closest(%s)?'ok':e.tagName+'.'+e.className):'none';})()"
             % (pt[0], pt[1], repr(sel)))
    if hit != 'ok':
        print("  !! %s is covered by %s" % (sel, hit)); return False
    ws.cmd("Input.dispatchTouchEvent", {"type":"touchStart","touchPoints":[{"x":pt[0],"y":pt[1]}]})
    ws.cmd("Input.dispatchTouchEvent", {"type":"touchEnd","touchPoints":[]})
    time.sleep(0.45); return True

def shot(name, full=False):
    d = ws.cmd("Page.captureScreenshot", {"format":"png","captureBeyondViewport":full})
    p = os.path.join(OUT, name)
    open(p, "wb").write(base64.b64decode(d["data"]))
    print("  wrote", p, os.path.getsize(p))

inv = {t: {n: {"have": True, "low": False} for n in names} for t, names in SEED.items()}
state = {"inventory": inv, "prefs": {"servings": 2, "spice": 3, "theme": THEME, "apiKey": ""}}
js("(async()=>{const rs=await navigator.serviceWorker.getRegistrations();"
   "for(const r of rs) await r.unregister();"
   "const ks=await caches.keys(); for(const k of ks) await caches.delete(k);"
   "return 'sw cleared';})()", True)
js("localStorage.setItem('frigo.v1', %s); 'seeded'" % json.dumps(json.dumps(state)))

ws.cmd("Page.navigate", {"url": "http://localhost:8777/"})
for _ in range(120):
    if js("document.readyState") == "complete": break
    time.sleep(0.1)
time.sleep(0.7)
print("theme:", THEME, "| screen width ok:",
      js("document.scrollingElement.scrollWidth === document.scrollingElement.clientWidth"))

print("cook:")
shot("phone-%s-cook.png" % THEME)

print("fridge:")
tap('[data-go="fridge"]')
shot("phone-%s-fridge.png" % THEME)

print("freezer:")
tap('[data-tab="freezer"]')
shot("phone-%s-freezer.png" % THEME)

print("recipe:")
tap('[data-go="cook"]')
tap('[data-open]')
shot("phone-%s-recipe.png" % THEME)

print("small targets:", js(
 "JSON.stringify([...document.querySelectorAll('button,[data-more],[data-item],.tab,input')]"
 ".map(e=>({t:(e.textContent||'').trim().slice(0,18)||e.className,h:Math.round(e.getBoundingClientRect().height)}))"
 ".filter(o=>o.h>0&&o.h<44).slice(0,12))"))
print("sideways scroll:", js("document.scrollingElement.scrollWidth"), "vs",
      js("document.scrollingElement.clientWidth"))
