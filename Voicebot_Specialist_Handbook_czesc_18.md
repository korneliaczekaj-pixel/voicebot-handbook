# Voicebot Specialist Handbook

## Czesc 18: Egzamin i certyfikacja Voicebot Specialist

Wersja robocza: 2026-07-29

---

# Czesc XVII. Egzamin i certyfikacja Voicebot Specialist

## Cel czesci

Ta czesc proponuje kompletny system certyfikacji kompetencji Voicebot Specialist. Certyfikacja powinna sprawdzac nie tylko znajomosc definicji, ale zdolnosc projektowania, analizowania danych, testowania, oceny ryzyka i pracy z realnym procesem.

---

# 1. Poziomy certyfikacji

| Poziom | Charakterystyka |
|---|---|
| Foundation | Rozumie podstawy voicebotow, architektury, intencji, flow, QA i metryk |
| Professional | Samodzielnie projektuje use case, scenariusz, testy, metryki i handoff |
| Expert | Projektuje strategie enterprise, governance LLM/RAG, compliance, roadmapy i programy optymalizacji |

## Foundation - zakres

- definicje: voicebot, IVR, chatbot, virtual agent;
- podstawowa architektura;
- ASR, NLU, TTS;
- intencje, encje, sloty;
- podstawy conversation design;
- fallback, no-input, no-match;
- podstawowe metryki.

## Professional - zakres

- discovery i use case;
- matryca automatyzacji;
- scenariusze;
- barge-in i turn-taking;
- integracje;
- LLM/RAG;
- QA/UAT;
- metryki i optymalizacja;
- compliance basics.

## Expert - zakres

- enterprise architecture;
- governance danych i modeli;
- prompt/RAG governance;
- branze regulowane;
- program certyfikacji;
- operating model;
- strategia skalowania;
- audyt i ryzyko.

---

# 2. Format egzaminu

| Element | Foundation | Professional | Expert |
|---|---:|---:|---:|
| Test wiedzy | 60 pytan | 80 pytan | 100 pytan |
| Case analysis | 1 krotki | 2 rozbudowane | 3 strategiczne |
| Zadanie praktyczne | Mini flow | Pelny scenariusz | Program wdrozenia |
| Obrona projektu | Nie | Tak | Tak |
| Portfolio | Opcjonalne | Wymagane | Wymagane |

---

# 3. Przykladowe pytania testowe

1. Czym voicebot rozni sie od IVR?
2. Dlaczego kanal glosowy wymaga krotszych komunikatow niz tekst?
3. Co oznacza no-input?
4. Co oznacza no-match?
5. Kiedy stosowac explicit confirmation?
6. Co to jest barge-in?
7. Czym barge-in rozni sie od interruption handling?
8. Co to jest task completion rate?
9. Dlaczego containment nie wystarcza jako KPI?
10. Kiedy LLM nie powinien odpowiadac?
11. Co to jest RAG?
12. Co to jest prompt injection?
13. Dlaczego trzeba wersjonowac prompt systemowy?
14. Co powinien zawierac context package przy handoff?
15. Co mierzy confusion matrix?

---

# 4. Zadania praktyczne

## Zadanie Foundation

Zaprojektuj prosty flow dla voicebota sprawdzajacego status zamowienia:

- powitanie;
- zebranie numeru;
- odpowiedz statusowa;
- no-input;
- no-match;
- handoff.

## Zadanie Professional

Dostajesz use case: zmiana terminu wizyty medycznej. Przygotuj:

- karte use case'u;
- intencje i sloty;
- scenariusz happy path;
- 5 unhappy paths;
- polityke barge-in;
- plan QA;
- metryki sukcesu;
- ryzyka compliance.

## Zadanie Expert

Firma ubezpieczeniowa chce wdrozyc program voicebotow w 3 krajach. Przygotuj:

- strategie use case'ow;
- architekture hybrydowa;
- governance RAG;
- model operacyjny;
- RACI;
- proces compliance;
- dashboard strategiczny;
- roadmapę 12 miesiecy.

---

# 5. Projekt koncowy

Projekt koncowy powinien zawierac:

1. Brief.
2. Matryce use case'u.
3. Business case.
4. Architekture.
5. Scenariusz dialogowy.
6. Intencje, encje, sloty.
7. Prompt systemowy, jesli LLM.
8. Specyfikacje integracji.
9. Plan QA.
10. Dashboard metryk.
11. Ryzyka compliance.
12. Plan pilota.
13. Backlog optymalizacji.

---

# 6. Rubryka oceny projektu

| Kryterium | Waga | Ocena |
|---|---:|---|
| Dopasowanie use case'u | 15% | Czy use case jest sensowny i mierzalny |
| Conversation design | 20% | Czy dialog jest jasny, odporny na bledy |
| Architektura | 15% | Czy komponenty i integracje sa realistyczne |
| QA | 15% | Czy testy obejmuja ryzyka |
| Metryki | 10% | Czy sukces jest mierzalny |
| Compliance | 10% | Czy ryzyka sa rozpoznane |
| Handoff | 5% | Czy przekazanie jest zaprojektowane |
| Dokumentacja | 10% | Czy material jest wdrozeniowy |

---

# 7. Kryteria zaliczenia

| Poziom | Prog |
|---|---|
| Foundation | 70% testu + poprawny mini flow |
| Professional | 75% testu + projekt praktyczny min. 70% |
| Expert | 80% testu + projekt strategiczny + obrona |

---

# 8. Wymagania portfolio

Portfolio Professional:

- 2 projekty lub symulacje;
- scenariusze dialogowe;
- metryki;
- testy;
- refleksja projektowa.

Portfolio Expert:

- minimum 3 projekty;
- co najmniej 1 projekt z LLM/RAG;
- governance lub roadmapa;
- case z optymalizacja po wdrozeniu;
- analiza ryzyka.

---

# 9. Przykladowy scenariusz egzaminacyjny

Firma e-commerce ma 80 000 rozmow miesiecznie. Najczestsze powody: status zamowienia, zwroty, reklamacje, faktury. Contact center ma wysoki repeat contact dla statusu. API statusu istnieje, API reklamacji jest niedostepne. Zaproponuj MVP voicebota.

Oczekiwana odpowiedz:

- MVP: status zamowienia + podstawowa informacja o zwrocie;
- reklamacje poza zakresem lub ticket/handoff;
- integracja z OMS;
- SMS z linkiem;
- metryki: task completion, repeat contact, fallback, handoff;
- QA: statusy, API timeout, wiele zamowien, no-match, barge-in;
- compliance: informacja o bocie, retencja, minimalizacja.

---

# 10. Podsumowanie

Certyfikacja Voicebot Specialist powinna sprawdzac praktyczne kompetencje. Najlepszy kandydat nie tylko zna definicje, ale potrafi zaprojektowac proces, przewidziec bledy, mierzyc wyniki i powiedziec, kiedy voicebot nie jest dobrym rozwiazaniem.

---

# Co bedzie w kolejnej czesci

Kolejna czesc: **Psychologia rozmowy z voicebotem**.

