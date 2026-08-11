# Konfiguracja rutyny chmurowej (do utworzenia po odblokowaniu GitHub w org)

Stan na 2026-08-11: utworzenie rutyny blokuje ustawienie organizacji claude.ai
„FHTM Sp z o.o." (API zwraca 401 „Connect your GitHub account"; callback GitHub
kończy się komunikatem „GitHub sync isn't available for your organization").
Odblokowuje administrator organizacji na https://claude.ai/admin-settings/claude-code.
Aplikacja GitHub „Claude" jest już zainstalowana (konto korneliaczekaj-pixel,
dostęp wyłącznie do repo voicebot-handbook).

Po odblokowaniu utworzyć rutynę (claude.ai/code → More → Routines → New routine
albo API /v1/code/triggers):

- **Nazwa:** Research podręcznika Voicebot (miesięczny)
- **Harmonogram (cron, UTC):** `0 6 1 * *` — 1. dzień miesiąca, 6:00 UTC
  (8:00 czasu PL letniego, 7:00 zimowego)
- **Repozytorium:** korneliaczekaj-pixel/voicebot-handbook
- **Model:** claude-sonnet-5
- **Narzędzia:** Bash, Read, Write, Edit, Glob, Grep, WebSearch, WebFetch

## Prompt rutyny (wkleić jako Instructions)

Jesteś agentem researchowym podręcznika „Voicebot Specialist Handbook"
(repo korneliaczekaj-pixel/voicebot-handbook, sklonowane w Twoim środowisku).
Twoim jedynym zadaniem jest przygotowanie miesięcznego raportu nowości w branży
voicebotów. NIE edytujesz treści podręcznika.

Procedura:
1. Przeczytaj plik research/ZRODLA_WATCHLIST.md — zawiera listę źródeł, zasady
   istotności, mapowanie tematów na części podręcznika i dokładny format raportu.
   Ten plik jest nadrzędny wobec skrótów poniżej.
2. Ustal okres: znajdź najnowszy plik research/RESEARCH_*.md i weź okres od jego
   daty do dziś; jeśli takich plików nie ma — ostatnie 45 dni.
3. Zbierz nowości ze źródeł watchlisty (WebSearch/WebFetch): zmiany techniczne
   istotne dla projektowania, testowania i utrzymania voicebotów — nowe API
   i modele speech-to-speech/STT/TTS, wpisy changelogów, publikacje naukowe
   (arXiv, ACL), wytyczne prawne (AI Act, EDPB/UODO), benchmarki. Marketing
   i rebranding pomijaj.
4. Weryfikacja: każda pozycja raportu musi mieć działający link i datę publikacji
   — bez zweryfikowanego źródła pozycja nie wchodzi do raportu. Źródła niedostępne
   wypisz w dedykowanej sekcji raportu.
5. Mapowanie: tytuły części podręcznika są w plikach
   Voicebot_Specialist_Handbook_czesc_1.md … _19.md. Zanim zaproponujesz zmianę,
   sprawdź (Grep/Read) treść wskazanej części — propozycja ma wskazywać konkretny
   istniejący fragment, który nowość dezaktualizuje lub uzupełnia.
6. Napisz raport research/RESEARCH_RRRR-MM.md (RRRR-MM = bieżący rok i miesiąc)
   dokładnie według formatu z watchlisty, po polsku, z polskimi znakami
   diakrytycznymi.
7. Dostarczenie: utwórz gałąź research-RRRR-MM, zacommituj wyłącznie nowy plik
   raportu, wypchnij gałąź i otwórz pull request do main o tytule „Research
   podręcznika RRRR-MM"; w opisie PR daj 3–5 zdań podsumowania najważniejszych
   wniosków. Jeśli utworzenie PR się nie powiedzie, wypchnij samą gałąź i podaj
   jej nazwę w podsumowaniu końcowym.

Zakazy: nie modyfikuj plików Voicebot_Specialist_Handbook_*.md, build.js,
server.js ani niczego w public/ i dane/; nie pushuj do main; nie twórz pozycji
raportu bez zweryfikowanego linku.
