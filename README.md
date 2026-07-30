# Voicebot Specialist Handbook

Podrecznik zawodowy Voicebot Specialist jako strona WWW: 19 czesci + bibliografia + audyt zrodel,
z podlinkowanym spisem tresci, wyszukiwarka i omowieniami do czytania na poczatku kazdej czesci.

## Struktura

- `zrodla/` — pliki zrodlowe Markdown (czesci 1-19, bibliografia, audyt, omowienia)
- `build.js` — generator: sklada wszystkie zrodla w jeden plik `public/index.html`
- `public/index.html` — gotowy podrecznik (samowystarczalny HTML, dziala tez offline)
- `server.js` — minimalny serwer statyczny (zero zaleznosci) dla Railway

## Aktualizacja tresci

1. Podmien / edytuj pliki w `zrodla/`.
2. Zbuduj: `npm run build` (wymaga Node 18+).
3. Commit + push — Railway przebuduje i wdrozy automatycznie.

## Podglad lokalny

```
npm start
```

i otworz http://localhost:3000

## Wdrozenie na Railway

1. Wejdz na https://railway.com i zaloguj sie (np. kontem GitHub).
2. New Project -> Deploy from GitHub repo -> wybierz to repozytorium.
3. Railway wykryje Node (package.json) i uruchomi `npm start`.
4. Variables -> dodaj `APP_PASSWORD` = wybrane haslo dostepu (wlacza logowanie).
5. Settings -> Networking -> Generate Domain — dostaniesz adres strony.

## Czat "Zapytaj podrecznik" (AI)

Przycisk czatu w prawym dolnym rogu strony. Asystent (Claude) odpowiada WYLACZNIE na podstawie
tresci podrecznika i podaje linki do powiazanych sekcji.

Trzy tryby (wybierany automatycznie wg dostepnych zmiennych):
1. ANTHROPIC_API_KEY (platny, najlepsza jakosc) - klucz z https://platform.claude.com, model claude-opus-5.
2. GEMINI_API_KEY (darmowy limit, do testow) - klucz z https://aistudio.google.com, model gemini-2.5-flash (zmiana: GEMINI_MODEL).
3. Bez kluczy - tryb testowy: czat pokazuje najlepiej dopasowane fragmenty podrecznika z linkami.
Klucz Claude ma pierwszenstwo nad Gemini.

Szczegoly techniczne:
- endpoint `POST /api/chat` (za ta sama bramka hasla co strona),
- wyszukiwanie fragmentow: `dane/fragmenty.json` (generowany przez `npm run build`),
- model: `claude-opus-5`; typowy koszt pytania to kilkadziesiat groszy (kilka-kilkanascie tys.
  tokenow wejscia + krotka odpowiedz),
- limit: 10 pytan na minute z jednego adresu IP (ochrona kosztow).

## Logowanie haslem

- Haslo ustawia sie w zmiennej `APP_PASSWORD` (Railway -> Variables). Po ustawieniu kazde wejscie
  na strone wymaga podania hasla; sesja trzyma sie 30 dni (cookie), wylogowanie: `/wyloguj`.
- BEZ ustawionej zmiennej strona dziala bez logowania (wygodne przy podgladzie lokalnym).
- Zmiana hasla = zmiana wartosci `APP_PASSWORD` w Railway (uniewaznia dotychczasowe sesje).

To prosta ochrona wspolnym haslem (bez kont uzytkownikow) — wystarcza, by adres nie byl otwarty
dla kazdego, ale nie zastepuje pelnego systemu uprawnien.
