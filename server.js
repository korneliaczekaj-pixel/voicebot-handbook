// Static server with optional password protection.
// Set APP_PASSWORD in Railway variables to require login.
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PUB = path.join(__dirname, 'public');
const PASS = process.env.APP_PASSWORD || '';
const TOKEN = PASS ? crypto.createHash('sha256').update('vh1|' + PASS).digest('hex') : '';
const COOKIE = 'vh_auth';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.pdf': 'application/pdf',
  '.md': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

function safeEq(a, b) {
  const A = crypto.createHash('sha256').update(String(a)).digest();
  const B = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(A, B);
}

function cookies(req) {
  const out = {};
  (req.headers.cookie || '').split(';').forEach((c) => {
    const i = c.indexOf('=');
    if (i > 0) out[c.slice(0, i).trim()] = c.slice(i + 1).trim();
  });
  return out;
}

function loginPage(err) {
  return `<!doctype html><html lang="pl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Voicebot Specialist Handbook - logowanie</title>
<style>
:root{--bg:#F4F6F8;--surface:#fff;--ink:#212B36;--mut:#5D6C7B;--line:#D8DFE7;--acc:#B26A1B;--err:#A94A44}
@media (prefers-color-scheme:dark){:root{--bg:#12181F;--surface:#1A222C;--ink:#E4EAF1;--mut:#93A1B0;--line:#2A3542;--acc:#E2A24E;--err:#D98079}}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg);color:var(--ink);font:16px/1.6 "Segoe UI",system-ui,sans-serif}
.box{width:min(400px,92vw);background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:34px 32px}
h1{font-family:"Palatino Linotype",Palatino,Georgia,serif;font-size:22px;margin:0 0 4px}
.kick{color:var(--acc);text-transform:uppercase;letter-spacing:.14em;font-size:11.5px;font-weight:600;margin:0 0 14px}
p{color:var(--mut);font-size:14px;margin:0 0 20px}
label{display:block;font-size:13px;font-weight:600;margin-bottom:6px}
input{width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:7px;background:var(--bg);color:var(--ink);font:inherit}
input:focus{outline:2px solid var(--acc);outline-offset:1px;border-color:transparent}
button{width:100%;margin-top:16px;padding:11px;border:0;border-radius:7px;background:var(--acc);color:#fff;font:600 15px "Segoe UI",system-ui,sans-serif;cursor:pointer}
button:hover{filter:brightness(1.07)}
.err{color:var(--err);font-size:13.5px;margin:12px 0 0}
</style></head><body>
<form class="box" method="post" action="/login">
  <p class="kick">Podrecznik zawodowy</p>
  <h1>Voicebot Specialist Handbook</h1>
  <p>Dostep do podrecznika jest chroniony haslem.</p>
  <label for="haslo">Haslo dostepu</label>
  <input id="haslo" name="haslo" type="password" autocomplete="current-password" autofocus required>
  ${err ? '<p class="err">Nieprawidlowe haslo - sprobuj ponownie.</p>' : ''}
  <button type="submit">Wejdz</button>
</form></body></html>`;
}

function setAuthCookie(req, res, value, maxAge) {
  const secure = req.headers['x-forwarded-proto'] === 'https' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`);
}

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);

  if (PASS) {
    if (p === '/login' && req.method === 'POST') {
      let body = '';
      req.on('data', (d) => {
        body += d;
        if (body.length > 4096) req.destroy();
      });
      req.on('end', () => {
        const params = new URLSearchParams(body);
        const given = params.get('haslo') || '';
        if (given && safeEq(given, PASS)) {
          setAuthCookie(req, res, TOKEN, 60 * 60 * 24 * 30);
          res.writeHead(303, { Location: '/' });
          res.end();
        } else {
          res.writeHead(401, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(loginPage(true));
        }
      });
      return;
    }

    if (p === '/wyloguj') {
      setAuthCookie(req, res, 'x', 0);
      res.writeHead(303, { Location: '/' });
      res.end();
      return;
    }

    const authed = TOKEN && cookies(req)[COOKIE] === TOKEN;
    if (!authed) {
      res.writeHead(p === '/login' ? 200 : 401, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(loginPage(false));
      return;
    }
  }

  if (p === '/') p = '/index.html';
  const f = path.normalize(path.join(PUB, p));
  if (!f.startsWith(PUB) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Nie znaleziono');
    return;
  }

  res.writeHead(200, { 'Content-Type': TYPES[path.extname(f).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(process.env.PORT || 3000, () => {
  console.log('Voicebot Handbook dziala na porcie ' + (process.env.PORT || 3000)
    + (PASS ? ' (logowanie WLACZONE)' : ' (bez logowania - ustaw APP_PASSWORD, aby wlaczyc)'));
});
