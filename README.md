# Voicebot Specialist Handbook

Projekt portfolio poświęcony projektowaniu, testowaniu i rozwijaniu rozwiązań Conversational AI. Łączy **19 rozdziałów** podręcznika z aplikacją do czytania, wyszukiwania i zadawania pytań o jego treść. Materiał uzupełniają bibliografia, audyt redakcyjno-merytoryczny, omówienia rozdziałów oraz szablony dokumentacji.

## Zacznij tutaj

- **Portfolio projektu:** `/` — zakres, wybrane case studies, kompetencje i ograniczenia.
- **Handbook:** `/handbook` — spis treści, wyszukiwarka i czat „Zadaj pytanie”.
- **Kod:** `build.js` generuje stronę handbooka i indeks fragmentów; `server.js` obsługuje strony, logowanie i czat.

Nie podaję w tym repozytorium publicznego adresu instancji Railway. Konfiguracja wdrożenia jest opisana poniżej; dostępność konkretnej instancji trzeba sprawdzić osobno.

## Wybrane case studies projektu

| Obszar | Problem i podejście | Materiał do obejrzenia |
| --- | --- | --- |
| Projektowanie dialogu | Obsługa przerwań, korekt, zmiany tematu, potwierdzeń i przekazania rozmowy do człowieka | Rozdział 6; szablony w rozdziale 16 |
| Asystent oparty na treści | Dotarcie do fragmentów obszernego materiału i podanie linków do sekcji | `build.js`, `dane/fragmenty.json`, `server.js` (`POST /api/chat`) |
| Testowanie i optymalizacja | Scenariusze poza ścieżką idealną, analiza błędów i rozdzielenie metryk jakości | Rozdziały 10–11; szablony w rozdziale 16 |

Są to opisy decyzji i artefaktów w tym repozytorium. Przykłady branżowe z rozdziału 17 to **scenariusze dydaktyczne**, nie udokumentowane wdrożenia u klientów. Projekt nie publikuje wyników produkcyjnych ani danych firmowych.

## Kompetencje pokazane w projekcie

- **Conversation design:** intencje, sloty, fallback, repair, potwierdzenia i handoff (rozdział 6).
- **Voice AI:** turn-taking, barge-in, ASR, TTS i architektura (rozdziały 1–4).
- **QA i analityka:** strategie testowania, analiza transkrypcji i metryki (rozdziały 10–11).
- **Praca produktowa:** wybór zastosowania, wymagania, MVP i wdrożenie (rozdziały 5 i 12).
- **Praca ze źródłami:** bibliografia, audyt, indeks fragmentów i linkowanie odpowiedzi do sekcji.
- **Odpowiedzialne projektowanie:** prywatność, dostępność i ograniczenia systemu (rozdziały 13–14).

## Struktura repozytorium

```text
Voicebot_Specialist_Handbook_czesc_1.md … czesc_19.md   źródła rozdziałów
Voicebot_Specialist_Handbook_bibliografia.md              bibliografia
Voicebot_Specialist_Handbook_audyt_poprawnosci.md          audyt
Voicebot_Specialist_Handbook_omowienia_do_czytania.md      wprowadzenia
portfolio.html                                             źródło strony głównej
build.js                                                   generator HTML i indeksu
server.js                                                  serwer i endpoint czatu
public/portfolio.html                                      wygenerowane portfolio
public/index.html                                          wygenerowany handbook
dane/fragmenty.json                                        wygenerowany indeks
```

Pliki Markdown leżą obecnie w katalogu głównym. Generator obsługuje także katalog `zrodla/`, jeśli zostaną tam przeniesione jako komplet. Po zmianie źródeł uruchom ponownie build i zapisz wygenerowane pliki.

## Uruchomienie lokalne

Wymagany Node.js 18 lub nowszy.

```bash
npm ci
npm run build
npm start
```

Otwórz `http://localhost:3000` (portfolio) lub `http://localhost:3000/handbook`. Strona handbooka jest wygenerowanym HTML, który można otworzyć lokalnie do czytania; czat wymaga serwera. Wyszukiwarka na stronie działa bez klucza modelu.

## Czat „Zadaj pytanie”

`POST /api/chat` dobiera fragmenty z `dane/fragmenty.json`, przekazuje je jako kontekst i zwraca odpowiedź z odsyłaczami do powiązanych sekcji. Priorytet konfiguracji:

1. `ANTHROPIC_API_KEY` — Anthropic (model określony w `server.js`).
2. `GEMINI_API_KEY` — Gemini; opcjonalnie `GEMINI_MODEL`.
3. Bez klucza — tryb testowy pokazujący dopasowane fragmenty, bez generowania odpowiedzi przez model.

Instrukcja dla modelu ogranicza odpowiedź do podanych fragmentów. To założenie implementacji, a nie potwierdzona pomiarami gwarancja poprawności; repozytorium nie zawiera jeszcze zestawu ewaluacyjnego dla czatu. Limit serwera wynosi 10 pytań na minutę na adres IP.

## Railway i dostęp

Projekt można połączyć z repozytorium GitHub w Railway. Serwis uruchamia `npm start`; po zmianie Markdown należy wykonać `npm run build` przed commitem (lub skonfigurować ten krok w procesie budowania). Zmienne środowiskowe ustaw w Railway Variables. Nie zapisuj kluczy ani hasła w repozytorium.

`APP_PASSWORD` jest opcjonalnym, wspólnym hasłem do handbooka i API czatu. **Portfolio pod `/` pozostaje publiczne**. Bez tej zmiennej handbook jest dostępny bez logowania. Sesja używa cookie na 30 dni; `/wyloguj` usuwa sesję. To prosta bramka hasłem, nie system kont ani uprawnień per użytkownik.

## Źródła i ograniczenia

Audyt z 29 lipca 2026 r. jest przeglądem redakcyjno-merytorycznym. Nie jest opinią prawną, recenzją akademicką ani certyfikacją techniczną. Przed użyciem rozdziałów prawnych lub zaleceń dla konkretnej platformy należy ponownie sprawdzić aktualne źródła i dokumentację. Bibliografia znajduje się w osobnym pliku Markdown oraz na końcu handbooka.
