"""Drive Frigo with REAL touch events, the way a finger does. Synthetic .click()
bypasses hit-testing and hid a full-screen overlay bug once already."""
import time
from shot import WS, target_ws, wait_ready, URL

ws = WS(target_ws())
ws.cmd("Page.enable")
ws.cmd("Runtime.enable")
ws.cmd("Emulation.setDeviceMetricsOverride",
       {"width": 412, "height": 915, "deviceScaleFactor": 3, "mobile": True})
ws.cmd("Emulation.setTouchEmulationEnabled", {"enabled": True, "maxTouchPoints": 5})
ws.cmd("Network.enable")
ws.cmd("Network.setBypassServiceWorker", {"bypass": True})
ws.cmd("Network.setCacheDisabled", {"cacheDisabled": True})
ws.cmd("Page.navigate", {"url": URL})
print("ready:", wait_ready(ws))


def js(expr):
    r = ws.cmd("Runtime.evaluate", {"expression": expr, "returnByValue": True})
    return r.get("result", {}).get("value")


def tap(pt):
    x, y = pt
    ws.cmd("Input.dispatchTouchEvent",
           {"type": "touchStart", "touchPoints": [{"x": x, "y": y}]})
    ws.cmd("Input.dispatchTouchEvent", {"type": "touchEnd", "touchPoints": []})
    time.sleep(0.4)


def centre(sel):
    return js("(()=>{const e=document.querySelector(" + repr(sel) + ");"
              "if(!e) return null; const r=e.getBoundingClientRect();"
              "return [Math.round(r.left+r.width/2), Math.round(r.top+r.height/2)];})()")


def matches():
    return js("(document.body.innerText.match(/\\d+ MATCHES?/)||['none'])[0]")


print("\n1. tap the Crockpot filter chip")
print("   before:", matches())
tap(centre('[data-f="appliance"][data-v="crockpot"]'))
print("   after :", matches(),
      "| pressed:", js('document.querySelector(\'[data-f="appliance"][data-v="crockpot"]\')'
                       '.getAttribute("aria-pressed")'))

print("\n2. tap the Fridge tab in the bottom nav")
tap(centre('[data-go="fridge"]'))
print("   screen:", js('document.body.innerText.slice(0,26).replace(/\\n/g," | ")'))

print("\n3. tap an ingredient row to tick it")
tap(centre('[data-item]'))
print("   saved :", js("(()=>{const s=JSON.parse(localStorage.getItem('frigo.v1')||'{}');"
                       "const inv=s.inventory||{};return JSON.stringify(Object.entries(inv)"
                       ".filter(([k,v])=>Object.keys(v||{}).length).map(([k,v])=>k+':'"
                       "+Object.keys(v).length));})()"))

print("\n4. back to Cook, open a recipe")
tap(centre('[data-go="cook"]'))
tap(centre('[data-open]'))
print("   opened:", js('document.body.innerText.slice(0,44).replace(/\\n/g," | ")'))

print("\n5. tap the servings + stepper")
before = js('(document.body.innerText.match(/(\\d+) servings/)||[])[1]')
tap(centre('[data-act="serv+"]'))
after = js('(document.body.innerText.match(/(\\d+) servings/)||[])[1]')
print("   servings:", before, "->", after)

print("\n6. tap a star rating")
tap(centre('[data-rate]'))
print("   ratings:", js("JSON.stringify(JSON.parse(localStorage.getItem('frigo.v1')||'{}')"
                        ".ratings||{})"))

print("\nconsole errors:",
      js("(window.__errs||[]).length === undefined ? 'n/a' : (window.__errs||[]).length"))
