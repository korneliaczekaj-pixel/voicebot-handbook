// Generator podrecznika: pliki .md z folderu zrodla/ -> public/index.html
// Uruchomienie: node build.js   (opcjonalnie: ARTIFACT_OUT=sciezka node build.js)
'use strict';
const fs = require('fs');
const path = require('path');

const preferredDir = path.join(__dirname, 'zrodla');
const DIR = fs.existsSync(preferredDir) ? preferredDir : __dirname;
const OUT = path.join(__dirname, 'public', 'index.html');

const FILES = [];
for (let i = 1; i <= 19; i++) FILES.push({ file: `Voicebot_Specialist_Handbook_czesc_${i}.md`, num: String(i), kind: 'part' });
FILES.push({ file: 'Voicebot_Specialist_Handbook_bibliografia.md', num: 'B', kind: 'biblio', title: 'Bibliografia, zrodla i mapa wykorzystania' });
FILES.push({ file: 'Voicebot_Specialist_Handbook_audyt_poprawnosci.md', num: 'A', kind: 'audit', title: 'Audyt poprawnosci merytorycznej' });

const OMOW_FILE = 'Voicebot_Specialist_Handbook_omowienia_do_czytania.md';

const NAV_TITLE_OVERRIDES = {
  '1': 'Wprowadzenie i barge-in',
};

// ---------- pomocnicze ----------
function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
const usedIds = new Map();
function slug(s, prefix) {
  let base = s.toLowerCase()
    .replace(/[ąàá]/g, 'a').replace(/[ćč]/g, 'c').replace(/[ęèé]/g, 'e').replace(/ł/g, 'l')
    .replace(/[ńñ]/g, 'n').replace(/[óò]/g, 'o').replace(/ś/g, 's').replace(/[żź]/g, 'z')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
  let id = prefix + '-' + (base || 'x');
  const n = usedIds.get(id) || 0;
  usedIds.set(id, n + 1);
  return n ? `${id}-${n}` : id;
}
function inline(s) {
  let t = esc(s);
  t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  t = t.replace(/(^|[^"'>=\w])(https?:\/\/[^\s<]+?)([.,;)]?)(?=\s|$)/gm,
    (m, pre, url, tail) => `${pre}<a href="${url}" target="_blank" rel="noopener">${url}</a>${tail}`);
  return t;
}

// ---------- tokenizacja markdownu ----------
function tokenize(lines) {
  const toks = [];
  let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (/^\s*$/.test(l) || /^---\s*$/.test(l)) { i++; continue; }
    const h = l.match(/^(#{1,6})\s+(.*)$/);
    if (h) { toks.push({ type: 'h', level: h[1].length, text: h[2].trim() }); i++; continue; }
    if (/^```/.test(l)) {
      const buf = []; i++;
      while (i < lines.length && !/^```/.test(lines[i])) { buf.push(lines[i]); i++; }
      i++; toks.push({ type: 'code', lines: buf }); continue;
    }
    if (/^\|/.test(l.trim())) {
      const buf = [];
      while (i < lines.length && /^\|/.test(lines[i].trim())) { buf.push(lines[i].trim()); i++; }
      toks.push({ type: 'table', lines: buf }); continue;
    }
    if (/^\s*([-*]|\d+[.)])\s+/.test(l)) {
      const buf = [];
      while (i < lines.length && /^\s*([-*]|\d+[.)])\s+/.test(lines[i])) { buf.push(lines[i]); i++; }
      toks.push({ type: 'list', lines: buf }); continue;
    }
    if (/^>\s?/.test(l)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^>\s?/, '')); i++; }
      toks.push({ type: 'quote', lines: buf }); continue;
    }
    const buf = [];
    while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^(#{1,6}\s|```|>\s?)/.test(lines[i])
      && !/^\s*([-*]|\d+[.)])\s+/.test(lines[i]) && !/^\|/.test(lines[i].trim()) && !/^---\s*$/.test(lines[i])) {
      buf.push(lines[i]); i++;
    }
    if (buf.length) toks.push({ type: 'p', lines: buf }); else i++;
  }
  return toks;
}

// ---------- renderery blokow ----------
function renderTable(tlines) {
  const rows = tlines.map(r => r.replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim()));
  let sep = -1;
  if (rows.length > 1 && rows[1].every(c => /^:?-{2,}:?$/.test(c) || c === '')) sep = 1;
  let html = '<div class="tw"><table>';
  if (sep === 1) {
    html += '<thead><tr>' + rows[0].map(c => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>';
    for (let r = 2; r < rows.length; r++) html += '<tr>' + rows[r].map(c => `<td>${inline(c)}</td>`).join('') + '</tr>';
    html += '</tbody>';
  } else {
    html += '<tbody>' + rows.map(row => '<tr>' + row.map(c => `<td>${inline(c)}</td>`).join('') + '</tr>').join('') + '</tbody>';
  }
  return html + '</table></div>';
}
function renderList(llines) {
  const items = llines.map(l => {
    const m = l.match(/^(\s*)([-*]|\d+[.)])\s+(.*)$/);
    return { indent: m[1].length, ordered: /^\d/.test(m[2]), text: m[3] };
  });
  let html = '', stack = [];
  for (const it of items) {
    const depth = it.indent >= 2 ? 1 : 0;
    while (stack.length > depth + 1) { html += `</li></${stack.pop()}>`; }
    if (stack.length === depth + 1 && stack.length) html += '</li>';
    while (stack.length < depth + 1) {
      const tag = it.ordered ? 'ol' : 'ul';
      html += `<${tag}>`; stack.push(tag);
    }
    html += `<li>${inline(it.text)}`;
  }
  while (stack.length) { html += `</li></${stack.pop()}>`; }
  return html;
}
function renderPara(plines) {
  const isDlg = /^(Bot|Uzytkownik|Użytkownik|Klient|Konsultant|User)\s*[:(]/.test(plines[0]);
  const parts = plines.map(l => {
    const hardBreak = /\s{2,}$/.test(l);
    let t = inline(l.replace(/\s+$/, ''));
    if (isDlg) t = t.replace(/^(Bot|Uzytkownik|Użytkownik|Klient|Konsultant|User)(\s*\([^)]*\))?\s*:/, '<b class="spk">$1$2:</b>');
    return { t, hardBreak };
  });
  let body = '';
  parts.forEach((p, idx) => { body += p.t; if (idx < parts.length - 1) body += (p.hardBreak || isDlg) ? '<br>' : ' '; });
  return isDlg ? `<p class="dlg">${body}</p>` : `<p>${body}</p>`;
}
function renderToks(toks) {
  let html = '';
  for (const t of toks) {
    if (t.type === 'table') html += renderTable(t.lines);
    else if (t.type === 'list') html += renderList(t.lines);
    else if (t.type === 'code') html += `<pre><code>${esc(t.lines.join('\n'))}</code></pre>`;
    else if (t.type === 'quote') html += `<blockquote>${t.lines.map(l => inline(l)).join('<br>')}</blockquote>`;
    else if (t.type === 'p') html += renderPara(t.lines);
  }
  return html;
}

// ---------- omowienia do czytania (wstep kazdej czesci) ----------
const omow = {};
(function loadOmow() {
  const p = path.join(DIR, OMOW_FILE);
  if (!fs.existsSync(p)) return;
  const raw = fs.readFileSync(p, 'utf8').split(/\r?\n/);
  let cur = null, buf = [];
  const flush = () => { if (cur) omow[cur] = renderToks(tokenize(buf)); buf = []; };
  for (const l of raw) {
    const m = l.match(/^#\s+Czesc\s+(\d+)\./);
    if (m) { flush(); cur = m[1]; continue; }
    if (/^#\s+/.test(l) && !m) { flush(); cur = null; continue; }
    if (cur) buf.push(l);
  }
  flush();
})();

// ---------- klasyfikacja sekcji specjalnych ----------
function calloutClass(title) {
  const t = title.toLowerCase();
  if (/checklist/.test(t)) return 'co-check';
  if (/typowe bledy|typowe błędy/.test(t)) return 'co-err';
  if (/dobre praktyki/.test(t)) return 'co-good';
  if (/mini case|case stud/.test(t)) return 'co-case';
  if (/cwiczeni|ćwiczeni/.test(t)) return 'co-ex';
  if (/podsumowanie/.test(t)) return 'co-sum';
  return null;
}
const CO_LABEL = { 'co-check': 'Checklista', 'co-err': 'Typowe bledy', 'co-good': 'Dobre praktyki', 'co-case': 'Case study', 'co-ex': 'Cwiczenia', 'co-sum': 'Podsumowanie' };

// ---------- przetwarzanie pliku czesci ----------
const dropped = [];
function processFile(meta) {
  const raw = fs.readFileSync(path.join(DIR, meta.file), 'utf8');
  const lines = raw.split(/\r?\n/);
  let i = 0, partTitle = meta.title || null;
  while (i < lines.length) {
    const l = lines[i];
    if (/^# (Voicebot Specialist Handbook|Audyt poprawnosci)/.test(l)) { i++; continue; }
    const m = l.match(/^##\s+(.*)$/);
    if (m && (/^Czesc \d+:/.test(m[1]) || /^Kompletna mapa/.test(m[1]) || /^Bibliografia/.test(m[1])) && !partTitle) {
      partTitle = m[1].replace(/^Czesc \d+:\s*/, ''); i++; continue;
    }
    if (m && /^(Czesc \d+:|Kompletna mapa|Bibliografia)/.test(m[1])) { i++; continue; }
    if (/^(Wersja robocza|Jezyk:|Status:|Kontynuacja plik)/.test(l)) { i++; continue; }
    if (/^-\s+`?Voicebot_Specialist_Handbook/.test(l)) { i++; continue; }
    if (/^\s*$/.test(l) || /^---\s*$/.test(l)) { i++; continue; }
    break;
  }
  let toks = tokenize(lines.slice(i));

  const out = [];
  for (let k = 0; k < toks.length; k++) {
    const t = toks[k];
    if (t.type === 'h' && /kolejn\w* czesci/i.test(t.text)) {
      dropped.push(`${meta.file}: "${t.text}"`);
      let j = k + 1;
      while (j < toks.length && !(toks[j].type === 'h' && toks[j].level <= t.level)) j++;
      k = j - 1; continue;
    }
    if (t.type === 'h' && /^Czesc\s+[IVXL]+\./.test(t.text)) continue;
    out.push(t);
  }
  toks = out;

  const l1count = toks.filter(t => t.type === 'h' && t.level === 1).length;
  const firstL1 = toks.findIndex(t => t.type === 'h' && t.level === 1);
  toks.forEach((t, idx) => {
    if (t.type !== 'h') return;
    t.chapter = t.level === 1 || (t.level === 2 && (l1count < 3 || (firstL1 !== -1 && idx < firstL1)));
  });

  const pid = 'part-' + meta.num.toLowerCase();
  const chapters = [];
  let html = '';
  let openCo = null;
  const closeCo = () => { if (openCo) { html += '</section>'; openCo = null; } };
  for (const t of toks) {
    if (t.type === 'h') {
      if (openCo && t.level <= openCo.level) closeCo();
      if (t.chapter) {
        closeCo();
        const id = slug(t.text, pid);
        chapters.push({ id, title: t.text });
        html += `<h2 class="chapter" id="${id}">${inline(t.text)}</h2>`;
      } else {
        const co = calloutClass(t.text);
        const tag = Math.min(t.level + 1, 5);
        if (co) {
          closeCo();
          openCo = { level: t.level };
          html += `<section class="co ${co}"><span class="co-tag">${CO_LABEL[co]}</span><h${tag}>${inline(t.text)}</h${tag}>`;
        } else {
          html += `<h${tag} id="${slug(t.text, pid)}">${inline(t.text)}</h${tag}>`;
        }
      }
    } else html += renderToks([t]);
  }
  closeCo();
  return { id: pid, num: meta.num, kind: meta.kind, title: partTitle || meta.file, chapters, body: html };
}

const parts = FILES.map(processFile);

// ---------- sklejenie strony ----------
const NUM_LABEL = n => (n === 'B' ? 'Bibliografia' : n === 'A' ? 'Audyt' : `Czesc ${n}`);

const waveSymbol = (() => {
  const heights = [6, 11, 18, 9, 14, 22, 16, 7, 12, 20, 10, 15, 8, 19, 13, 6, 17, 11, 21, 9, 14, 7, 18, 12, 16, 10, 20, 8, 13, 15];
  let bars = '';
  heights.forEach((h, i) => { bars += `<rect x="${i * 6}" y="${(24 - h) / 2}" width="3" height="${h}" rx="1.5"/>`; });
  return `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><symbol id="wv" viewBox="0 0 ${heights.length * 6 - 3} 24">${bars}</symbol></svg>`;
})();

let navHtml = '';
let bodyHtml = '';
let chapterCount = 0;
for (const p of parts) {
  const navTitle = NAV_TITLE_OVERRIDES[p.num] || p.title;
  navHtml += `<details data-part="${p.id}"><summary><a class="pl" href="#${p.id}"><span class="pn">${p.num}</span><span>${esc(navTitle)}</span></a></summary><div class="chl">`;
  navHtml += p.chapters.map(c => `<a href="#${c.id}">${esc(c.title)}</a>`).join('');
  navHtml += '</div></details>';
  chapterCount += p.chapters.length;

  bodyHtml += `<section class="part" id="${p.id}">`;
  bodyHtml += `<header class="popen"><p class="kick">${NUM_LABEL(p.num)}</p><h1>${inline(p.title)}</h1><svg class="wave" aria-hidden="true"><use href="#wv"/></svg></header>`;
  if (omow[p.num]) bodyHtml += `<div class="omow"><span class="co-tag">Omowienie</span>${omow[p.num]}</div>`;
  bodyHtml += p.body;
  bodyHtml += '</section>';
}

const heroCards = parts.map(p =>
  `<a class="card" href="#${p.id}"><span class="pn">${p.num}</span><span>${esc(NAV_TITLE_OVERRIDES[p.num] || p.title)}</span></a>`).join('');

const css = `
:root{
  --bg:#F4F6F8; --surface:#FFFFFF; --ink:#212B36; --mut:#5D6C7B; --line:#D8DFE7;
  --acc:#B26A1B; --acc-soft:#8A5316; --acc2:#3E5C76; --code-bg:#EDF0F4;
  --c-good:#3E7A52; --c-err:#A94A44; --c-check:#3E5C76; --c-case:#6B5B95; --c-ex:#5D6C7B; --c-sum:#B26A1B;
  --sb-bg:#EBEEF2; --shadow:0 1px 3px rgba(33,43,54,.08);
}
@media (prefers-color-scheme: dark){:root{
  --bg:#12181F; --surface:#1A222C; --ink:#E4EAF1; --mut:#93A1B0; --line:#2A3542;
  --acc:#E2A24E; --acc-soft:#E2A24E; --acc2:#84A9C7; --code-bg:#141B23;
  --c-good:#6FB287; --c-err:#D98079; --c-check:#84A9C7; --c-case:#A79BC8; --c-ex:#93A1B0; --c-sum:#E2A24E;
  --sb-bg:#161D26; --shadow:none;
}}
:root[data-theme="dark"]{
  --bg:#12181F; --surface:#1A222C; --ink:#E4EAF1; --mut:#93A1B0; --line:#2A3542;
  --acc:#E2A24E; --acc-soft:#E2A24E; --acc2:#84A9C7; --code-bg:#141B23;
  --c-good:#6FB287; --c-err:#D98079; --c-check:#84A9C7; --c-case:#A79BC8; --c-ex:#93A1B0; --c-sum:#E2A24E;
  --sb-bg:#161D26; --shadow:none;
}
:root[data-theme="light"]{
  --bg:#F4F6F8; --surface:#FFFFFF; --ink:#212B36; --mut:#5D6C7B; --line:#D8DFE7;
  --acc:#B26A1B; --acc-soft:#8A5316; --acc2:#3E5C76; --code-bg:#EDF0F4;
  --c-good:#3E7A52; --c-err:#A94A44; --c-check:#3E5C76; --c-case:#6B5B95; --c-ex:#5D6C7B; --c-sum:#B26A1B;
  --sb-bg:#EBEEF2; --shadow:0 1px 3px rgba(33,43,54,.08);
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
@media (prefers-reduced-motion: no-preference){html{scroll-behavior:smooth}}
body{margin:0;background:var(--bg);color:var(--ink);
  font:16px/1.65 "Segoe UI",system-ui,-apple-system,sans-serif;}
h1,h2,h3,h4,h5,.pn,.kick{font-family:"Palatino Linotype",Palatino,"Book Antiqua",Georgia,serif}
code,pre{font-family:"Cascadia Code",Consolas,"Courier New",monospace}
a{color:var(--acc2)}
a:focus-visible,button:focus-visible,input:focus-visible{outline:2px solid var(--acc);outline-offset:2px}

.layout{display:flex;min-height:100vh}
#sb{width:308px;flex:0 0 308px;background:var(--sb-bg);border-right:1px solid var(--line);
  position:sticky;top:0;height:100vh;overflow-y:auto;padding:20px 14px 40px}
main{flex:1;min-width:0}
.content{max-width:78ch;margin:0 auto;padding:0 40px 120px}

#sb .brand{font-family:"Palatino Linotype",Palatino,Georgia,serif;font-size:17px;font-weight:700;
  margin:0 6px 4px;letter-spacing:.01em}
#sb .brand a{color:var(--ink);text-decoration:none}
#sb .sub{font-size:11.5px;color:var(--mut);margin:0 6px 14px;text-transform:uppercase;letter-spacing:.09em}
#q{width:100%;padding:8px 10px;margin:0 0 14px;border:1px solid var(--line);border-radius:6px;
  background:var(--surface);color:var(--ink);font:inherit;font-size:13.5px}
#sb details{border-bottom:1px solid var(--line)}
#sb summary{display:flex;align-items:center;gap:6px;cursor:pointer;list-style:none;padding:7px 4px}
#sb summary::before{content:"";flex:0 0 7px;height:7px;border-right:1.6px solid var(--mut);
  border-bottom:1.6px solid var(--mut);transform:rotate(-45deg);transition:transform .15s;margin-left:2px}
#sb details[open]>summary::before{transform:rotate(45deg)}
#sb summary::-webkit-details-marker{display:none}
.pl{display:flex;gap:9px;align-items:baseline;text-decoration:none;color:var(--ink);
  font-size:13.5px;font-weight:600;line-height:1.35}
.pl .pn{color:var(--acc);font-size:12.5px;min-width:16px;text-align:right;font-variant-numeric:tabular-nums}
.chl{display:flex;flex-direction:column;padding:2px 0 10px 26px}
.chl a{font-size:12.8px;color:var(--mut);text-decoration:none;padding:3.5px 6px;border-left:2px solid transparent;line-height:1.4}
.chl a:hover{color:var(--ink)}
.chl a.on{color:var(--acc-soft);border-left-color:var(--acc);background:color-mix(in srgb,var(--acc) 8%,transparent)}
#sb .hid{display:none}

.hero{padding:72px 0 40px;border-bottom:1px solid var(--line);margin-bottom:24px}
.hero .kick{color:var(--acc);text-transform:uppercase;letter-spacing:.14em;font-size:13px;margin:0 0 10px}
.hero h1{font-size:44px;line-height:1.12;margin:0 0 14px;text-wrap:balance}
.hero .lede{font-size:17.5px;color:var(--mut);max-width:58ch;margin:0 0 22px}
.hero .meta{font-size:13px;color:var(--mut);display:flex;gap:18px;flex-wrap:wrap;margin-bottom:34px}
.hero .meta b{color:var(--ink);font-variant-numeric:tabular-nums}
.wave{width:190px;height:24px;color:var(--acc);display:block}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px;margin-top:34px}
.card{display:flex;gap:12px;align-items:baseline;padding:13px 15px;background:var(--surface);
  border:1px solid var(--line);border-radius:8px;text-decoration:none;color:var(--ink);
  font-size:13.8px;font-weight:600;line-height:1.4;box-shadow:var(--shadow)}
.card:hover{border-color:var(--acc)}
.card .pn{color:var(--acc);font-size:15px;min-width:18px;text-align:right;font-variant-numeric:tabular-nums}

.popen{padding:84px 0 26px;border-bottom:3px solid var(--acc);margin-bottom:34px}
.kick{color:var(--acc);text-transform:uppercase;letter-spacing:.14em;font-size:12.5px;margin:0 0 8px;font-weight:600}
.popen h1{font-size:33px;line-height:1.15;margin:0 0 18px;text-wrap:balance}
.popen .wave{width:150px;height:20px}

.omow{margin:0 0 40px;padding:22px 26px 18px;background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:var(--shadow)}
.omow .co-tag{color:var(--acc2)}
.omow p{font-family:"Palatino Linotype",Palatino,"Book Antiqua",Georgia,serif;font-size:16.5px;line-height:1.75;margin:10px 0 14px}
.omow p:last-child{margin-bottom:0}

h2.chapter{font-size:25px;line-height:1.2;margin:60px 0 16px;padding-top:18px;border-top:1px solid var(--line);text-wrap:balance}
h3{font-size:19px;margin:34px 0 10px;text-wrap:balance}
h4{font-size:16.5px;margin:26px 0 8px}
h5{font-size:15px;margin:22px 0 6px;color:var(--mut)}
p{margin:0 0 14px}
ul,ol{margin:0 0 16px;padding-left:26px}
li{margin-bottom:5px}
blockquote{margin:0 0 16px;padding:10px 16px;border-left:3px solid var(--acc2);color:var(--mut);background:var(--surface)}
pre{background:var(--code-bg);border:1px solid var(--line);border-radius:8px;padding:14px 16px;
  overflow-x:auto;font-size:13.5px;line-height:1.55;margin:0 0 16px}
code{background:var(--code-bg);padding:1px 5px;border-radius:4px;font-size:.9em}
pre code{background:none;padding:0}

.tw{overflow-x:auto;margin:0 0 20px;border:1px solid var(--line);border-radius:8px;background:var(--surface);box-shadow:var(--shadow)}
table{border-collapse:collapse;width:100%;font-size:14px;line-height:1.5}
th{text-align:left;font-weight:600;border-bottom:2px solid var(--acc);padding:10px 13px;white-space:nowrap}
td{border-top:1px solid var(--line);padding:9px 13px;vertical-align:top;min-width:110px}
tbody tr:nth-child(even){background:color-mix(in srgb,var(--ink) 3%,transparent)}

.co{margin:26px 0;padding:16px 20px 8px;border-radius:8px;border:1px solid var(--line);
  border-left:3px solid var(--co,var(--mut));background:color-mix(in srgb,var(--co,var(--mut)) 6%,var(--surface))}
.co h3,.co h4,.co h5{margin-top:6px}
.co-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
  color:var(--co,var(--mut))}
.co-check{--co:var(--c-check)} .co-err{--co:var(--c-err)} .co-good{--co:var(--c-good)}
.co-case{--co:var(--c-case)} .co-ex{--co:var(--c-ex)} .co-sum{--co:var(--c-sum)}

.dlg{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:12px 16px;line-height:1.8}
.dlg .spk{color:var(--acc-soft)}

#nav-btn{display:none;position:fixed;top:14px;left:14px;z-index:30;background:var(--surface);
  border:1px solid var(--line);border-radius:8px;padding:8px 12px;font:600 13px "Segoe UI",system-ui,sans-serif;
  color:var(--ink);cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.15)}
#top-btn{position:fixed;bottom:22px;right:22px;background:var(--surface);border:1px solid var(--line);
  border-radius:50%;width:42px;height:42px;font-size:17px;color:var(--acc);cursor:pointer;
  box-shadow:0 2px 8px rgba(0,0,0,.15);opacity:0;pointer-events:none;transition:opacity .2s}
#top-btn.show{opacity:1;pointer-events:auto}

@media (max-width:960px){
  #sb{position:fixed;left:0;top:0;z-index:20;transform:translateX(-100%);transition:transform .2s;width:300px}
  #sb.open{transform:none;box-shadow:0 0 40px rgba(0,0,0,.3)}
  #nav-btn{display:block}
  .content{padding:0 20px 80px}
  .hero{padding-top:70px}
  .hero h1{font-size:32px}
  .popen h1{font-size:26px}
}
@media print{
  #sb,#nav-btn,#top-btn{display:none}
  body{background:#fff;color:#000}
  .content{max-width:none;padding:0}
  .popen{page-break-before:always}
  .tw{overflow:visible;border:none;box-shadow:none}
  a{color:inherit;text-decoration:none}
}
`;

const js = `
(function(){
  var sb=document.getElementById('sb');
  var btn=document.getElementById('nav-btn');
  btn.addEventListener('click',function(){sb.classList.toggle('open')});
  sb.addEventListener('click',function(e){
    if(e.target.closest('a')&&window.innerWidth<=960)sb.classList.remove('open');
  });
  var topBtn=document.getElementById('top-btn');
  topBtn.addEventListener('click',function(){window.scrollTo({top:0})});

  var marks=[].slice.call(document.querySelectorAll('h2.chapter, section.part'));
  var links={};
  [].slice.call(sb.querySelectorAll('a[href^="#"]')).forEach(function(a){links[a.getAttribute('href').slice(1)]=a;});
  var ticking=false;
  function spy(){
    ticking=false;
    var y=window.scrollY+130, cur=null;
    for(var i=0;i<marks.length;i++){if(marks[i].offsetTop<=y)cur=marks[i];else break;}
    sb.querySelectorAll('.chl a.on').forEach(function(a){a.classList.remove('on')});
    if(cur){
      var id=cur.id, a=links[id];
      if(a){
        a.classList.add('on');
        var d=a.closest('details'); if(d&&!d.open)d.open=true;
        var r=a.getBoundingClientRect();
        if(r.top<0||r.bottom>window.innerHeight)a.scrollIntoView({block:'center'});
      }
      topBtn.classList.toggle('show',window.scrollY>600);
    }
  }
  window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(spy);}},{passive:true});
  spy();

  var q=document.getElementById('q');
  var details=[].slice.call(sb.querySelectorAll('details'));
  function norm(s){return s.toLowerCase()
    .replace(/[ąà]/g,'a').replace(/ć/g,'c').replace(/ę/g,'e').replace(/ł/g,'l')
    .replace(/ń/g,'n').replace(/ó/g,'o').replace(/ś/g,'s').replace(/[żź]/g,'z');}
  q.addEventListener('input',function(){
    var v=norm(q.value.trim());
    details.forEach(function(d){
      var as=[].slice.call(d.querySelectorAll('.chl a'));
      if(!v){d.classList.remove('hid');as.forEach(function(a){a.classList.remove('hid')});d.open=false;return;}
      var any=false;
      as.forEach(function(a){
        var hit=norm(a.textContent).indexOf(v)>-1;
        a.classList.toggle('hid',!hit); if(hit)any=true;
      });
      var pHit=norm(d.querySelector('summary').textContent).indexOf(v)>-1;
      if(pHit){as.forEach(function(a){a.classList.remove('hid')});any=true;}
      d.classList.toggle('hid',!any);
      d.open=any;
    });
  });
})();
`;

const today = '2026-07-29';
const core = `
<title>Voicebot Specialist Handbook</title>
${waveSymbol}
<button id="nav-btn" aria-label="Spis tresci">Spis tresci</button>
<div class="layout">
<nav id="sb" aria-label="Spis tresci">
  <p class="brand"><a href="#top">Voicebot Specialist Handbook</a></p>
  <p class="sub">Spis tresci</p>
  <input id="q" type="search" placeholder="Szukaj w spisie tresci..." aria-label="Szukaj">
  ${navHtml}
</nav>
<main>
<div class="content" id="top">
  <header class="hero">
    <p class="kick">Podrecznik zawodowy</p>
    <h1>Voicebot Specialist Handbook</h1>
    <p class="lede">Kompletna mapa wiedzy, program nauki i praktyka projektowania voicebotow:
    od architektury, conversation designu i danych, przez LLM, integracje i QA,
    po metryki, compliance i psychologie rozmowy.</p>
    <div class="meta"><span>Wersja robocza: <b>${today}</b></span><span><b>19</b> czesci</span><span><b>${chapterCount}</b> rozdzialow i sekcji</span><span>Bibliografia + audyt zrodel</span></div>
    <svg class="wave" aria-hidden="true"><use href="#wv"/></svg>
    <div class="cards">${heroCards}</div>
  </header>
  ${bodyHtml}
</div>
</main>
</div>
<button id="top-btn" aria-label="Do gory">&#8593;</button>
<script>${js}</script>
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT,
  `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Voicebot Specialist Handbook</title><style>${css}</style></head><body>${core}</body></html>`, 'utf8');
if (process.env.ARTIFACT_OUT) fs.writeFileSync(process.env.ARTIFACT_OUT, `<style>${css}</style>${core}`, 'utf8');

console.log('Czesci:', parts.length, '| rozdzialow w nawigacji:', chapterCount, '| omowien:', Object.keys(omow).length);
dropped.forEach(d => console.log('  pominieto:', d));
console.log('->', OUT, fs.statSync(OUT).size, 'B');
