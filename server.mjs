import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(fileURLToPath(new URL('./dist/', import.meta.url)));
const index = await readFile(path.join(root, 'index.html'), 'utf8');
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.webp':'image/webp', '.ico':'image/x-icon', '.json':'application/json; charset=utf-8', '.txt':'text/plain; charset=utf-8', '.woff2':'font/woff2' };
const server = createServer(async (req, res) => {
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options','SAMEORIGIN');
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405, {'Allow':'GET, HEAD'}); return res.end(); }
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname === '/healthz') { res.writeHead(200, {'Content-Type':'application/json'}); return res.end(req.method === 'HEAD' ? undefined : '{"status":"ok"}'); }
    const target = path.resolve(root, '.' + pathname);
    if (target !== root && !target.startsWith(root + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
    let info;
    try { info = await stat(target); } catch (error) { if (error.code !== 'ENOENT' && error.code !== 'ENOTDIR') throw error; }
    if (info?.isFile()) {
      res.writeHead(200, {'Content-Type':types[path.extname(target)] || 'application/octet-stream', 'Content-Length':info.size, 'Cache-Control':pathname.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache'});
      if (req.method === 'HEAD') return res.end();
      const stream = createReadStream(target); stream.on('error', () => res.destroy()); stream.pipe(res); return;
    }
    if (path.extname(pathname) || pathname.startsWith('/assets/') || pathname.startsWith('/images/')) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache'});
    res.end(req.method === 'HEAD' ? undefined : index);
  } catch { res.writeHead(400); res.end('Bad request'); }
});
server.listen(Number(process.env.PORT || 3000), '0.0.0.0', () => console.log('MODYOU is listening on port ' + (process.env.PORT || 3000)));
for (const signal of ['SIGTERM','SIGINT']) process.on(signal, () => { server.close(() => process.exit(0)); setTimeout(() => process.exit(1),10000).unref(); });
