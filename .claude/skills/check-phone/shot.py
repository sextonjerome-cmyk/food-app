"""Minimal CDP client: set a phone viewport, run some JS, screenshot. No deps."""
import base64, json, os, socket, ssl, struct, sys, urllib.request, secrets


class WS:
    def __init__(self, url):
        assert url.startswith("ws://")
        rest = url[5:]
        hostport, path = rest.split("/", 1)
        path = "/" + path
        host, port = hostport.split(":")
        self.s = socket.create_connection((host, int(port)))
        key = base64.b64encode(secrets.token_bytes(16)).decode()
        req = (f"GET {path} HTTP/1.1\r\nHost: {hostport}\r\nUpgrade: websocket\r\n"
               f"Connection: Upgrade\r\nSec-WebSocket-Key: {key}\r\n"
               f"Sec-WebSocket-Version: 13\r\n\r\n")
        self.s.sendall(req.encode())
        buf = b""
        while b"\r\n\r\n" not in buf:
            buf += self.s.recv(4096)
        self.buf = buf.split(b"\r\n\r\n", 1)[1]
        self.id = 0

    def _recv(self, n):
        while len(self.buf) < n:
            chunk = self.s.recv(65536)
            if not chunk:
                raise IOError("socket closed")
            self.buf += chunk
        out, self.buf = self.buf[:n], self.buf[n:]
        return out

    def send(self, payload):
        data = payload.encode()
        header = bytes([0x81])
        mask = secrets.token_bytes(4)
        n = len(data)
        if n < 126:
            header += bytes([0x80 | n])
        elif n < 65536:
            header += bytes([0x80 | 126]) + struct.pack(">H", n)
        else:
            header += bytes([0x80 | 127]) + struct.pack(">Q", n)
        masked = bytes(b ^ mask[i % 4] for i, b in enumerate(data))
        self.s.sendall(header + mask + masked)

    def recv(self):
        while True:
            b1, b2 = self._recv(2)
            length = b2 & 0x7F
            if length == 126:
                length = struct.unpack(">H", self._recv(2))[0]
            elif length == 127:
                length = struct.unpack(">Q", self._recv(8))[0]
            data = self._recv(length)
            if b1 & 0x0F in (1, 2):
                return data.decode()

    def cmd(self, method, params=None):
        self.id += 1
        mid = self.id
        self.send(json.dumps({"id": mid, "method": method, "params": params or {}}))
        while True:
            msg = json.loads(self.recv())
            if msg.get("id") == mid:
                if "error" in msg:
                    raise RuntimeError(f"{method}: {msg['error']}")
                return msg.get("result", {})


def target_ws(port=9222):
    pages = json.load(urllib.request.urlopen(f"http://localhost:{port}/json"))
    for p in pages:
        if p.get("type") == "page":
            return p["webSocketDebuggerUrl"]
    raise SystemExit("no page target")


URL = "http://localhost:8777/"


def wait_ready(ws):
    import time
    for _ in range(100):
        r = ws.cmd("Runtime.evaluate",
                   {"expression": "document.readyState + '|' + (window.RECIPES||[]).length",
                    "returnByValue": True})
        v = r.get("result", {}).get("value", "")
        if str(v).startswith("complete"):
            return v
        time.sleep(0.1)
    return "timeout"


def main():
    out = sys.argv[1]
    width, height = int(sys.argv[2]), int(sys.argv[3])
    pre = sys.argv[4] if len(sys.argv) > 4 else ""   # runs before reload
    post = sys.argv[5] if len(sys.argv) > 5 else ""  # runs after reload
    full = "--full" in sys.argv

    ws = WS(target_ws())
    ws.cmd("Page.enable")
    ws.cmd("Runtime.enable")
    ws.cmd("Emulation.setDeviceMetricsOverride", {
        "width": width, "height": height, "deviceScaleFactor": 3, "mobile": True})
    ws.cmd("Emulation.setTouchEmulationEnabled", {"enabled": True})

    if pre:
        r = ws.cmd("Runtime.evaluate", {"expression": pre, "returnByValue": True,
                                        "awaitPromise": True})
        print("PRE:", json.dumps(r.get("result", {}).get("value")))

    ws.cmd("Network.enable")
    ws.cmd("Network.setBypassServiceWorker", {"bypass": True})
    ws.cmd("Network.setCacheDisabled", {"cacheDisabled": True})
    ws.cmd("Page.navigate", {"url": URL})
    print("ready:", wait_ready(ws))

    if post:
        r = ws.cmd("Runtime.evaluate", {"expression": post, "returnByValue": True})
        print("POST:", json.dumps(r.get("result", {}).get("value")))

    shot = ws.cmd("Page.captureScreenshot",
                  {"format": "png", "captureBeyondViewport": full})
    with open(out, "wb") as f:
        f.write(base64.b64decode(shot["data"]))
    print("wrote", out, os.path.getsize(out), "bytes")


if __name__ == "__main__":
    main()
