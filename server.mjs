import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(fileURLToPath(new URL('./dist/', import.meta.url)));
const index = await readFile(path.join(root, 'index.html'), 'utf8');
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.webp':'image/webp', '.ico':'image/x-icon', '.json':'application/json; charset=utf-8', '.xml':'application/xml; charset=utf-8', '.txt':'text/plain; charset=utf-8', '.woff2':'font/woff2', '.mp4':'video/mp4', '.webm':'video/webm', '.mov':'video/quicktime', '.vtt':'text/vtt; charset=utf-8' };
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
      const headers = {'Content-Type':types[path.extname(target)] || 'application/octet-stream', 'Cache-Control':pathname.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache', 'Accept-Ranges':'bytes'};
      let start = 0, end = info.size - 1, status = 200;
      if (req.headers.range && req.method === 'GET') {
        const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
        if (!match || (!match[1] && !match[2])) { res.writeHead(416, {'Content-Range':`bytes */${info.size}`}); return res.end(); }
        if (match[1]) { start = Number(match[1]); end = match[2] ? Math.min(Number(match[2]), end) : end; }
        else { start = Math.max(0, info.size - Number(match[2])); }
        if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= info.size) { res.writeHead(416, {'Content-Range':`bytes */${info.size}`}); return res.end(); }
        status = 206;
        headers['Content-Range'] = `bytes ${start}-${end}/${info.size}`;
      }
      res.writeHead(status, {...headers, 'Content-Length':info.size ? end - start + 1 : 0});
      if (req.method === 'HEAD' || !info.size) return res.end();
      const stream = createReadStream(target, {start, end}); stream.on('error', () => res.destroy()); stream.pipe(res); return;
    }
    if (path.extname(pathname) || pathname.startsWith('/assets/') || pathname.startsWith('/images/')) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache'});
    res.end(req.method === 'HEAD' ? undefined : index);
  } catch { res.writeHead(400); res.end('Bad request'); }
});
server.listen(Number(process.env.PORT || 3000), '0.0.0.0', () => console.log('MODYOU is listening on port ' + (process.env.PORT || 3000)));
for (const signal of ['SIGTERM','SIGINT']) process.on(signal, () => { server.close(() => process.exit(0)); setTimeout(() => process.exit(1),10000).unref(); });
