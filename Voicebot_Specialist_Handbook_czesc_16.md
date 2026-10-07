# Rozdział 16. Szablony, narzędzia i dokumenty projektowe

Dokumentacja projektu voicebota łączy decyzje biznesowe, konwersacyjne i techniczne w zestaw artefaktów, które można zweryfikować i utrzymywać. Powinna wskazywać właścicieli decyzji, obsługiwane procesy, dane i integracje, przebieg dialogu, warunki eskalacji, ryzyka, testy oraz metryki. Zakres każdego dokumentu trzeba dopasować do organizacji, branży, procesu i używanej platformy.

---

## 16.1. Brief projektu voicebota

```text
Nazwa projektu:
Sponsor biznesowy:
Product owner:
Contact center owner:
IT owner:
Legal/compliance:
Data/analytics owner:

Problem biznesowy:
Dlaczego teraz:
Zakres:
Poza zakresem:
Użytkownicy:
Kanały:
Języki:
Wolumen:
AHT:
FCR:
Repeat contact:
CSAT/NPS:

Systemy:
Integracje:
Nagrania/transkrypcje:
Ryzyka:
Kryteria sukcesu:
Termin MVP:
```

## 16.2. Karta use case'u

```text
Nazwa use case'u:
Cel użytkownika:
Cel biznesowy:
Powód kontaktu:
Wolumen:
Powtarzalność:
Ryzyko:
Dane wymagane:
Integracje:
Handoff:
Metryki sukcesu:
Out of scope:
Rekomendacja: MVP / później / nie wdrażać
```

## 16.3. Matryca oceny automatyzacji

| Kryterium | Ocena 1-5 | Waga | Wynik | Komentarz |
|---|---:|---:|---:|---|
| Wolumen |  | 3 |  |  |
| Powtarzalność |  | 3 |  |  |
| Jasność celu |  | 2 |  |  |
| Dostępność danych |  | 2 |  |  |
| Dostępność API |  | 3 |  |  |
| Koszt błędu |  | 3 |  |  |
| Emocje |  | 2 |  |  |
| Compliance |  | 3 |  |  |
| Łatwość handoff |  | 3 |  |  |
| Pomiar sukcesu |  | 2 |  |  |

## 16.4. Mapa procesu rozmowy

```text
Start:
Warunki wejścia:
Krok 1:
Krok 2:
Krok 3:
Decyzje:
Wyjątki:
Integracje:
Handoff:
Zakończenie:
Metryki:
```

## 16.5. Szablon scenariusza dialogowego

| Step ID | Stan | Prompt bota | Expected input | Intent/slot | Walidacja | Next step | No-input | No-match | Barge-in | Handoff |
|---|---|---|---|---|---|---|---|---|---|---|

## 16.6. Szablon intencji

```text
Intent ID:
Nazwa biznesowa:
Definicja:
Zakres:
Poza zakresem:
Przykłady pozytywne:
Przykłady negatywne:
Wymagane sloty:
Encje:
Confidence threshold:
Disambiguation:
Fallback:
Handoff:
Metryki:
```

## 16.7. Szablon encji

```text
Entity ID:
Typ:
Opis:
Wartości kanoniczne:
Synonimy:
Przykłady:
Walidacja:
Źródło prawdy:
Owner:
Aktualizacja:
```

## 16.8. Tabela fraz treningowych

| ID | Fraza | Intencja | Encje | Źródło | Real/synthetic | Uwagi | Wersja |
|---|---|---|---|---|---|---|---|

## 16.9. Dokument persony voicebota

```text
Rola bota:
Zakres pomocy:
Czego bot nie robi:
Ton:
Formalność:
Tempo:
Zwroty preferowane:
Zwroty zakazane:
Zasady przepraszania:
Zasady odmowy:
Zasady eskalacji:
Transparentność:
```

## 16.10. Dokument promptu systemowego

```text
Prompt ID:
Wersja:
Model:
Zakres:
Poza zakresem:
Styl głosowy:
Zasady odpowiedzi:
Zasady narzędzi:
Zasady RAG:
Zasady danych:
Zasady odmowy:
Zasady eskalacji:
Testy regresji:
Owner:
```

## 16.11. Specyfikacja integracji

```text
Nazwa integracji:
System:
Owner:
Cel:
Typ: odczyt / zapis / walidacja / akcja / handoff
Endpoint:
Dane wejściowe:
Dane wyjściowe:
Autoryzacja:
Timeout:
Retry:
Idempotency:
Błędy:
Komunikaty użytkownika:
Logi:
Security:
Test cases:
```

## 16.12. Plan testów

```text
Zakres:
Środowisko:
Dane testowe:
Kategorie testów:
Test cases:
Kryteria akceptacji:
Defect severity:
Go/no-go:
Raport:
```

## 16.13. Checklista QA

- Happy path.
- Unhappy paths.
- No-input.
- No-match.
- Fallback.
- Handoff.
- ASR.
- NLU.
- LLM/RAG.
- TTS.
- Integracje.
- Telefonia.
- Barge-in.
- Security.
- Compliance.
- Dashboard.

## 16.14. Checklista przedwdrożeniowa

- Zakres zatwierdzony.
- Legal/compliance zatwierdzone.
- Security zatwierdzone.
- Handoff przetestowany.
- Dashboard działa.
- Alerty działają.
- Runbook gotowy.
- Rollback gotowy.
- Hypercare zaplanowany.

## 16.15. Raport z pilotażu

```text
Zakres pilota:
Okres:
Wolumen:
Task completion:
Containment:
Handoff:
Fallback:
No-input/no-match:
API errors:
CSAT:
Repeat contact:
Incydenty:
Wnioski:
Rekomendacja:
Backlog:
```

## 16.16. Dashboard metryk

| Metryka | Definicja | Źródło | Częstotliwość | Owner | Prog alarmowy |
|---|---|---|---|---|---|

## 16.17. Raport z analizy rozmów

```text
Próbka:
Okres:
Top intencje:
Top fallbacki:
Top no-match:
Frazy frustracji:
Problemy ASR:
Problemy promptów:
Nowe use case'y:
Rekomendacje:
```

## 16.18. Backlog optymalizacji

| ID | Problem | Dane | Hipoteza | Zmiana | Ryzyko | Test regresji | Metryka sukcesu | Priorytet |
|---|---|---|---|---|---|---|---|---|

## 16.19. Dokument handoff do konsultanta

```text
Handoff reason taxonomy:
Kolejki:
Context package:
Podsumowanie:
Sloty:
Dane potwierdzone:
Dane niepewne:
API results:
Transcript link:
Fallback, gdy context push fail:
```

## 16.20. Dokumentacja utrzymaniowa

```text
Ownerzy:
Rytm review:
Dashboardy:
Incident process:
Release process:
Regression tests:
Knowledge base update:
Prompt update:
Dataset update:
Roadmap:
Kontakt awaryjny:
```

---

## 16.21. Zbiorcza checklista dokumentacji

- Czy każdy dokument ma ownera?
- Czy jest wersjonowany?
- Czy jest powiązany z testami?
- Czy zawiera out of scope?
- Czy zawiera ryzyka?
- Czy jest użyteczny dla biznesu, IT, QA i compliance?

---
