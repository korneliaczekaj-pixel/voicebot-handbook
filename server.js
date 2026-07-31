// Serwer statyczny z logowaniem haslem + czat "zapytaj podrecznik" (Claude API).
// Zmienne srodowiskowe (Railway -> Variables):
//   APP_PASSWORD      - haslo dostepu do strony (bez niej strona jest otwarta)
//   ANTHROPIC_API_KEY - klucz Claude API (bez niego czat zwraca komunikat o braku konfiguracji)
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

let Anthropic = null;
try { Anthropic = require('@anthropic-ai/sdk'); } catch (e) { /* brak node_modules - strona dziala, czat nie */ }

const PUB = path.join(__dirname, 'public');
const PASS = process.env.APP_PASSWORD || '';
const TOKEN = PASS ? crypto.createHash('sha256').update('vh1|' + PASS).digest('hex') : '';
const COOKIE = 'vh_auth';

const anthropic = (Anthropic && process.env.ANTHROPIC_API_KEY) ? new Anthropic() : null;

// indeks fragmentow podrecznika (generowany przez build.js)
let FRAGMENTY = [];
try {
  FRAGMENTY = JSON.parse(fs.readFileSync(path.join(__dirname, 'dane', 'fragmenty.json'), 'utf8'));
} catch (e) { console.error('Brak dane/fragmenty.json - uruchom: npm run build'); }

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.pdf': 'application/pdf',
  '.md': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

// ---------- pomocnicze ----------
function safeEq(a, b) {
  const A = crypto.createHash('sha256').update(String(a)).digest();
  const B = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(A, B);
}
function cookies(req) {
  const out = {};
  (req.headers.cookie || '').split(';').forEach(c => {
    const i = c.indexOf('=');
    if (i > 0) out[c.slice(0, i).trim()] = c.slice(i + 1).trim();
  });
  return out;
}
function isAuthed(req) {
  if (!PASS) return true;
  return TOKEN && cookies(req)[COOKIE] === TOKEN;
}
function setAuthCookie(req, res, value, maxAge) {
  const secure = (req.headers['x-forwarded-proto'] === 'https') ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`);
}
function json(res, code, obj) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(obj));
}
function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', d => { body += d; if (body.length > limit) { req.destroy(); reject(new Error('za duze')); } });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

// ---------- wyszukiwanie fragmentow ----------
const STOP = new Set(['i', 'w', 'z', 'na', 'do', 'to', 'co', 'jak', 'czy', 'sie', 'nie', 'dla', 'jest', 'sa', 'o', 'a', 'ze', 'po', 'przy', 'od', 'ktory', 'ktora', 'ktore', 'oraz', 'lub', 'albo', 'the', 'of', 'in']);
function norm(s) {
  return s.toLowerCase()
    .replace(/[ąà]/g, 'a').replace(/ć/g, 'c').replace(/ę/g, 'e').replace(/ł/g, 'l')
    .replace(/ń/g, 'n').replace(/ó/g, 'o').replace(/ś/g, 's').replace(/[żź]/g, 'z');
}
const INDEKS = FRAGMENTY.map(f => ({ ...f, nTytul: norm(f.tytul + ' ' + f.czesc), nTekst: norm(f.tekst) }));
function szukaj(pytanie, maxFragmentow, maxZnakow) {
  const terms = [...new Set(norm(pytanie).split(/[^a-z0-9]+/).filter(t => t.length >= 3 && !STOP.has(t)))];
  if (!terms.length) return [];
  const scored = INDEKS.map(f => {
    let s = 0;
    for (const t of terms) {
      if (f.nTytul.includes(t)) s += 6;
      let i = -1, n = 0;
      while ((i = f.nTekst.indexOf(t, i + 1)) !== -1 && n < 12) n++;
      s += n;
    }
    return { f, s };
  }).filter(x => x.s > 0).sort((a, b) => b.s - a.s);
  const out = [];
  let total = 0;
  for (const { f } of scored) {
    if (out.length >= maxFragmentow || total + f.tekst.length > maxZnakow) break;
    out.push(f); total += f.tekst.length;
  }
  return out;
}

// ---------- limit zapytan (ochrona kosztow) ----------
const RATE = new Map(); // ip -> [timestamps]
function rateLimited(req) {
  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '?').split(',')[0].trim();
  const now = Date.now();
  const arr = (RATE.get(ip) || []).filter(t => now - t < 60_000);
  arr.push(now);
  RATE.set(ip, arr);
  if (RATE.size > 5000) RATE.clear();
  return arr.length > 10;
}

// ---------- czat ----------
const SYSTEM = `Jesteś asystentem podręcznika "Voicebot Specialist Handbook" (po polsku, o projektowaniu, wdrażaniu i optymalizacji voicebotów). Rozmawiasz jak kompetentny mentor, który zna podręcznik na wylot.

Zasady:
1. Merytorycznie opierasz się WYŁĄCZNIE na fragmentach podręcznika przekazywanych w tej rozmowie (bieżących i z wcześniejszych tur). Nie dodajesz faktów spoza nich i niczego nie zmyślasz.
2. Odpowiadasz płynną, naturalną polszczyzną, WŁASNYMI SŁOWAMI — parafrazujesz i łączysz treść fragmentów w spójną wypowiedź. Nie przeklejasz surowych fragmentów, nie piszesz "fragment [2] mówi, że...".
3. Rozmowa jest ciągła: pytania często nawiązują do poprzednich odpowiedzi ("a jak to zmierzyć?", "rozwiń drugi punkt", "a w przypadku banku?") — wtedy kontynuujesz wątek, zamiast zaczynać od zera.
4. Długość dopasowujesz do pytania: proste pytanie = kilka zdań; prośba o wyjaśnienie procesu = kroki po kolei, jak przewodnik prowadzący za rękę.
5. Naturalnie, w toku wypowiedzi, wskazujesz gdzie czytać dalej (część i tytuł sekcji podręcznika).
6. Gdy temat ma ciekawy ciąg dalszy, możesz zakończyć jednym krótkim zdaniem podpowiadającym, o co warto dopytać.
7. Jeśli we fragmentach nie ma odpowiedzi, mówisz to wprost i proponujesz najbliższy temat, który podręcznik obejmuje.
8. Pytania niezwiązane z voicebotami/conversational AI grzecznie odsyłasz — odpowiadasz tylko na pytania o treść podręcznika.
9. Formatowanie: zwykły tekst, dozwolone **pogrubienia** i listy z myślnikami. Bez nagłówków i tabel.`;

// darmowy silnik do testow: Google Gemini (klucz z aistudio.google.com, zmienna GEMINI_API_KEY)
const GEMINI_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
async function zapytajGemini(historia, tresc) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/' + GEMINI_MODEL
    + ':generateContent?key=' + encodeURIComponent(GEMINI_KEY);
  const contents = [
    ...historia.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
    { role: 'user', parts: [{ text: tresc }] },
  ];
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM }] },
      contents,
      generationConfig: { maxOutputTokens: 2048 },
    }),
  });
  if (!r.ok) {
    const err = new Error('Gemini HTTP ' + r.status);
    err.status = r.status;
    try { err.detail = (await r.text()).slice(0, 300); } catch (e) { /* ignoruj */ }
    throw err;
  }
  const j = await r.json();
  const cand = (j.candidates || [])[0];
  const odp = cand && cand.content && Array.isArray(cand.content.parts)
    ? cand.content.parts.map(p => p.text || '').join('\n').trim() : '';
  return odp;
}

// tryb testowy bez modelu: pokazuje dopasowane fragmenty podrecznika
function trybTestowy(fragmenty) {
  if (!fragmenty.length) {
    return 'Tryb testowy (bez modelu AI): nie znalazlam w podreczniku fragmentow pasujacych do tego pytania. Sprobuj uzyc innych slow kluczowych.';
  }
  const naj = fragmenty[0];
  const wycinek = naj.tekst.replace(/\s+/g, ' ').trim().slice(0, 600);
  return '**Tryb testowy (bez modelu AI)** — pokazuje fragmenty podrecznika najlepiej pasujace do pytania.\n\n'
    + 'Najtrafniejszy fragment (' + naj.czesc + ' — ' + naj.tytul + '):\n\n' + wycinek + '...\n\n'
    + 'Pelna tresc w podlinkowanych sekcjach ponizej. Aby wlaczyc odpowiedzi AI, ustaw w Railway zmienna GEMINI_API_KEY (darmowy klucz) albo ANTHROPIC_API_KEY.';
}

async function handleChat(req, res) {
  if (!isAuthed(req)) return json(res, 401, { blad: 'Sesja wygasła — odśwież stronę i zaloguj się ponownie.' });
  if (rateLimited(req)) return json(res, 429, { blad: 'Za dużo pytań na raz — odczekaj chwilę i spróbuj ponownie.' });
  if (!INDEKS.length) return json(res, 503, { blad: 'Brak indeksu treści — uruchom npm run build i wdróż ponownie.' });

  let dane;
  try { dane = JSON.parse(await readBody(req, 20_000)); } catch (e) { return json(res, 400, { blad: 'Nieprawidłowe zapytanie.' }); }
  const pytanie = (typeof dane.pytanie === 'string' ? dane.pytanie : '').trim().slice(0, 500);
  if (!pytanie) return json(res, 400, { blad: 'Puste pytanie.' });
  const historia = Array.isArray(dane.historia) ? dane.historia.slice(-12)
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map(m => ({ role: m.role, content: m.content.slice(0, 2000) })) : [];

  // dopytywanie: krotkie pytanie kontynuujace szukamy razem z poprzednim pytaniem,
  // a fragmenty z poprzedniej odpowiedzi (zrodla_kontekstu) wracaja do kontekstu
  const ostatniUser = [...historia].reverse().find(m => m.role === 'user');
  const zapytanieSzukania = pytanie + (ostatniUser ? ' ' + ostatniUser.content.slice(0, 200) : '');
  const poprzednieZrodla = Array.isArray(dane.zrodla_kontekstu)
    ? dane.zrodla_kontekstu.filter(x => typeof x === 'string').slice(0, 4) : [];

  const fragmenty = szukaj(zapytanieSzukania, 6, 12_000);
  const mam = new Set(fragmenty.map(f => f.id + '|' + f.tytul));
  for (const id of poprzednieZrodla) {
    const f = INDEKS.find(x => x.id === id);
    if (f && !mam.has(f.id + '|' + f.tytul)) { fragmenty.push(f); mam.add(f.id + '|' + f.tytul); }
  }
  const kontekst = fragmenty.length
    ? fragmenty.map((f, i) => `[${i + 1}] ${f.czesc} — ${f.tytul}\n${f.tekst}`).join('\n\n---\n\n')
    : '(nie znaleziono pasujacych fragmentow)';
  const tresc = `Fragmenty podrecznika (jedyne zrodlo odpowiedzi):\n\n${kontekst}\n\n===\nPytanie: ${pytanie}`;
  const zrodla = fragmenty.slice(0, 3).map(f => ({ id: f.id, tytul: f.tytul.replace(/ \(cd\.\)$/, ''), czesc: f.czesc }));

  // tryb testowy: bez zadnego klucza czat pokazuje dopasowane fragmenty
  if (!anthropic && !GEMINI_KEY) {
    return json(res, 200, { odpowiedz: trybTestowy(fragmenty), zrodla });
  }

  try {
    let odpowiedz = '';
    if (anthropic) {
      const response = await anthropic.messages.create({
        model: 'claude-opus-5',
        max_tokens: 16000,
        output_config: { effort: 'medium' },
        system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
        messages: [...historia, { role: 'user', content: tresc }],
      });
      if (response.stop_reason === 'refusal') {
        return json(res, 200, { odpowiedz: 'Nie mogę odpowiedzieć na to pytanie. Spróbuj zadać je inaczej albo zapytaj o inną część podręcznika.', zrodla: [] });
      }
      odpowiedz = response.content.filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
    } else {
      odpowiedz = await zapytajGemini(historia, tresc);
    }
    return json(res, 200, { odpowiedz: odpowiedz || 'Nie udało się wygenerować odpowiedzi — spróbuj ponownie.', zrodla });
  } catch (e) {
    if (Anthropic && e instanceof Anthropic.AuthenticationError) {
      return json(res, 502, { blad: 'Klucz ANTHROPIC_API_KEY jest nieprawidłowy lub wygasł — sprawdź zmienną w Railway.' });
    }
    if (Anthropic && e instanceof Anthropic.RateLimitError) {
      return json(res, 502, { blad: 'Limit zapytań do modelu chwilowo wyczerpany — spróbuj za minutę.' });
    }
    if (e && (e.status === 429)) {
      return json(res, 502, { blad: 'Darmowy dzienny limit Gemini wyczerpany — spróbuj jutro albo ustaw ANTHROPIC_API_KEY.' });
    }
    if (e && (e.status === 400 || e.status === 403)) {
      console.error('Blad Gemini:', e.detail || e.message);
      return json(res, 502, { blad: 'Klucz GEMINI_API_KEY wygląda na nieprawidłowy — sprawdź zmienną w Railway.' });
    }
    if (e && e.status === 404) {
      console.error('Blad Gemini:', e.detail || e.message);
      return json(res, 502, { blad: 'Model Gemini niedostępny — ustaw zmienną GEMINI_MODEL (np. gemini-2.0-flash) w Railway.' });
    }
    console.error('Blad czatu:', e && (e.detail || e.message));
    return json(res, 502, { blad: 'Błąd połączenia z modelem — spróbuj ponownie za chwilę.' });
  }
}

// ---------- strona logowania ----------
function loginPage(err) {
  return `<!doctype html><html lang="pl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Voicebot Specialist Handbook — logowanie</title>
<style>
:root{--bg:#F4F6F8;--surface:#fff;--ink:#212B36;--mut:#5D6C7B;--line:#D8DFE7;--acc:#B26A1B;--err:#A94A44}
@media (prefers-color-scheme:dark){:root{--bg:#12181F;--surface:#1A222C;--ink:#E4EAF1;--mut:#93A1B0;--line:#2A3542;--acc:#E2A24E;--err:#D98079}}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
  background:var(--bg);color:var(--ink);font:16px/1.6 "Segoe UI",system-ui,sans-serif}
.box{width:min(400px,92vw);background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:34px 32px}
h1{font-family:"Palatino Linotype",Palatino,Georgia,serif;font-size:22px;margin:0 0 4px}
.kick{color:var(--acc);text-transform:uppercase;letter-spacing:.14em;font-size:11.5px;font-weight:600;margin:0 0 14px}
p{color:var(--mut);font-size:14px;margin:0 0 20px}
label{display:block;font-size:13px;font-weight:600;margin-bottom:6px}
input{width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:7px;background:var(--bg);color:var(--ink);font:inherit}
input:focus{outline:2px solid var(--acc);outline-offset:1px;border-color:transparent}
button{width:100%;margin-top:16px;padding:11px;border:0;border-radius:7px;background:var(--acc);color:#fff;
  font:600 15px "Segoe UI",system-ui,sans-serif;cursor:pointer}
button:hover{filter:brightness(1.07)}
.err{color:var(--err);font-size:13.5px;margin:12px 0 0}
</style></head><body>
<form class="box" method="post" action="/login">
  <p class="kick">Podręcznik zawodowy</p>
  <h1>Voicebot Specialist Handbook</h1>
  <p>Dostęp do podręcznika jest chroniony hasłem.</p>
  <label for="haslo">Hasło dostępu</label>
  <input id="haslo" name="haslo" type="password" autocomplete="current-password" autofocus required>
  ${err ? '<p class="err">Nieprawidłowe hasło — spróbuj ponownie.</p>' : ''}
  <button type="submit">Wejdź</button>
</form></body></html>`;
}

// ---------- serwer ----------
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);

  // API czatu (wlasna odpowiedz 401 zamiast strony logowania)
  if (p === '/api/chat' && req.method === 'POST') { handleChat(req, res); return; }

  if (PASS) {
    if (p === '/login' && req.method === 'POST') {
      readBody(req, 4096).then(body => {
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
      }).catch(() => { res.writeHead(400); res.end(); });
      return;
    }
    if (p === '/wyloguj') {
      setAuthCookie(req, res, 'x', 0);
      res.writeHead(303, { Location: '/' });
      res.end();
      return;
    }
    if (!isAuthed(req)) {
      res.writeHead(p === '/login' ? 200 : 401, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(loginPage(false));
      return;
    }
  }

  // pliki statyczne
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
  console.log('Voicebot Handbook na porcie ' + (process.env.PORT || 3000)
    + (PASS ? ' | logowanie: TAK' : ' | logowanie: NIE (ustaw APP_PASSWORD)')
    + (anthropic ? ' | czat: Claude' : (GEMINI_KEY ? ' | czat: Gemini (' + GEMINI_MODEL + ')' : ' | czat: tryb testowy (fragmenty)')));
});
