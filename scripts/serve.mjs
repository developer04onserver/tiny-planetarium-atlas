import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
const root = resolve(process.argv[2] || ".");
const types = { ".html":"text/html; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".css":"text/css; charset=utf-8", ".svg":"image/svg+xml", ".json":"application/json" };
const server = createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url || "/", "http://localhost").pathname);
    const relative = pathname === "/" ? "index.html" : pathname.slice(1);
    const file = resolve(root, relative);
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403); res.end("Forbidden"); return; }
    const info = await stat(file);
    if (!info.isFile()) { res.writeHead(404); res.end("Not found"); return; }
    res.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream", "x-content-type-options":"nosniff" });
    res.end(await readFile(file));
  } catch { res.writeHead(404); res.end("Not found"); }
});
const port = Number(process.env.PORT || 4173);
server.listen(port, "0.0.0.0", () => console.log("Tiny Planetarium: http://localhost:" + port));
