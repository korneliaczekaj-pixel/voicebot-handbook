# Rozdział 18. Egzamin i certyfikacja Voicebot Specialist

Kompetencje specjalisty ds. voicebotów obejmują nie tylko znajomość pojęć, lecz także umiejętność zaprojektowania rozmowy, przeanalizowania danych, przygotowania testów, oceny ryzyka i pracy z rzeczywistym procesem. Certyfikacja ma wartość tylko wtedy, gdy sprawdza te umiejętności na zadaniach praktycznych, a nie wyłącznie przez odtwarzanie definicji.

---

## 18.1. Poziomy certyfikacji

| Poziom | Charakterystyka |
|---|---|
| Foundation | Rozumie podstawy voicebotów, architektury, intencji, flow, QA i metryk |
| Professional | Samodzielnie projektuje use case, scenariusz, testy, metryki i handoff |
| Expert | Projektuje strategie enterprise, governance LLM/RAG, compliance, roadmapy i programy optymalizacji |

### 18.1.1. Foundation - zakres

- definicje: voicebot, IVR, chatbot, virtual agent;
- podstawowa architektura;
- ASR, NLU, TTS;
- intencje, encje, sloty;
- podstawy conversation design;
- fallback, no-input, no-match;
- podstawowe metryki.

### 18.1.2. Professional - zakres

- discovery i use case;
- matryca automatyzacji;
- scenariusze;
- barge-in i turn-taking;
- integracje;
- LLM/RAG;
- QA/UAT;
- metryki i optymalizacja;
- compliance basics.

### 18.1.3. Expert - zakres

- enterprise architecture;
- governance danych i modeli;
- prompt/RAG governance;
- branże regulowane;
- program certyfikacji;
- operating model;
- strategia skalowania;
- audyt i ryzyko.

---

## 18.2. Format egzaminu

| Element | Foundation | Professional | Expert |
|---|---:|---:|---:|
| Test wiedzy | 60 pytań | 80 pytań | 100 pytań |
| Case analysis | 1 krótki | 2 rozbudowane | 3 strategiczne |
| Zadanie praktyczne | Mini flow | Pełny scenariusz | Program wdrożenia |
| Obrona projektu | Nie | Tak | Tak |
| Portfolio | Opcjonalne | Wymagane | Wymagane |

---

## 18.3. Przykładowe pytania testowe

1. Czym voicebot różni się od IVR?
2. Dlaczego kanał głosowy wymaga krótszych komunikatów niż tekst?
3. Co oznacza no-input?
4. Co oznacza no-match?
5. Kiedy stosować explicit confirmation?
6. Co to jest barge-in?
7. Czym barge-in różni się od interruption handling?
8. Co to jest task completion rate?
9. Dlaczego containment nie wystarcza jako KPI?
10. Kiedy LLM nie powinien odpowiadać?
11. Co to jest RAG?
12. Co to jest prompt injection?
13. Dlaczego trzeba wersjonować prompt systemowy?
14. Co powinien zawierać context package przy handoff?
15. Co mierzy confusion matrix?

---

## 18.4. Zadania praktyczne

### 18.4.1. Zadanie Foundation

Zaprojektuj prosty flow dla voicebota sprawdzającego status zamówienia:

- powitanie;
- zebranie numeru;
- odpowiedź statusowa;
- no-input;
- no-match;
- handoff.

### 18.4.2. Zadanie Professional

Dostajesz use case: zmiana terminu wizyty medycznej. Przygotuj:

- kartę use case'u;
- intencje i sloty;
- scenariusz happy path;
- 5 unhappy paths;
- politykę barge-in;
- plan QA;
- metryki sukcesu;
- ryzyka compliance.

### 18.4.3. Zadanie Expert

Firma ubezpieczeniowa chce wdrożyć program voicebotów w 3 krajach. Przygotuj:

- strategie use case'ów;
- architekturę hybrydową;
- governance RAG;
- model operacyjny;
- RACI;
- proces compliance;
- dashboard strategiczny;
- roadmapę 12 miesięcy.

---

## 18.5. Projekt końcowy

Projekt końcowy powinien zawierać:

1. Brief.
2. Matrycę use case'u.
3. Business case.
4. Architekturę.
5. Scenariusz dialogowy.
6. Intencje, encje, sloty.
7. Prompt systemowy, jeśli LLM.
8. Specyfikacje integracji.
9. Plan QA.
10. Dashboard metryk.
11. Ryzyka compliance.
12. Plan pilota.
13. Backlog optymalizacji.

---

## 18.6. Rubryka oceny projektu

| Kryterium | Waga | Ocena |
|---|---:|---|
| Dopasowanie use case'u | 15% | Czy use case jest sensowny i mierzalny |
| Conversation design | 20% | Czy dialog jest jasny, odporny na błędy |
| Architektura | 15% | Czy komponenty i integracje są realistyczne |
| QA | 15% | Czy testy obejmują ryzyka |
| Metryki | 10% | Czy sukces jest mierzalny |
| Compliance | 10% | Czy ryzyka są rozpoznane |
| Handoff | 5% | Czy przekazanie jest zaprojektowane |
| Dokumentacja | 10% | Czy materiał jest wdrożeniowy |

---

## 18.7. Kryteria zaliczenia

| Poziom | Prog |
|---|---|
| Foundation | 70% testu + poprawny mini flow |
| Professional | 75% testu + projekt praktyczny min. 70% |
| Expert | 80% testu + projekt strategiczny + obrona |

---

## 18.8. Wymagania portfolio

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
- case z optymalizacją po wdrożeniu;
- analiza ryzyka.

---

## 18.9. Przykładowy scenariusz egzaminacyjny

Firma e-commerce ma 80 000 rozmów miesięcznie. Najczęstsze powody: status zamówienia, zwroty, reklamacje, faktury. Contact center ma wysoki repeat contact dla statusu. API statusu istnieje, API reklamacji jest niedostępne. Zaproponuj MVP voicebota.

Oczekiwana odpowiedź:

- MVP: status zamówienia + podstawowa informacja o zwrocie;
- reklamacje poza zakresem lub ticket/handoff;
- integracja z OMS;
- SMS z linkiem;
- metryki: task completion, repeat contact, fallback, handoff;
- QA: statusy, API timeout, wiele zamówień, no-match, barge-in;
- compliance: informacja o bocie, retencja, minimalizacja.

---

## 18.10. Podsumowanie

Certyfikacja Voicebot Specialist powinna sprawdzać praktyczne kompetencje. Najlepszy kandydat nie tylko zna definicje, ale potrafi zaprojektować proces, przewidzieć błędy, mierzyć wyniki i powiedzieć, kiedy voicebot nie jest dobrym rozwiązaniem.

---
