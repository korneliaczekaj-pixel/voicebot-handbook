# Voicebot Specialist Handbook

## Czesc 16: Szablony, narzedzia i dokumenty projektowe

Wersja robocza: 2026-07-29

---

# Czesc XV. Szablony, narzedzia i dokumenty projektowe

## Cel czesci

Ta czesc zawiera praktyczne szablony do wykorzystania w projektach voicebotow. Kazdy szablon mozna skopiowac do dokumentacji projektu i dostosowac do organizacji, branzy oraz platformy.

---

## 1. Brief projektu voicebota

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
Uzytkownicy:
Kanaly:
Jezyki:
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

## 2. Karta use case'u

```text
Nazwa use case'u:
Cel uzytkownika:
Cel biznesowy:
Powod kontaktu:
Wolumen:
Powtarzalnosc:
Ryzyko:
Dane wymagane:
Integracje:
Handoff:
Metryki sukcesu:
Out of scope:
Rekomendacja: MVP / pozniej / nie wdrazac
```

## 3. Matryca oceny automatyzacji

| Kryterium | Ocena 1-5 | Waga | Wynik | Komentarz |
|---|---:|---:|---:|---|
| Wolumen |  | 3 |  |  |
| Powtarzalnosc |  | 3 |  |  |
| Jasnosc celu |  | 2 |  |  |
| Dostepnosc danych |  | 2 |  |  |
| Dostepnosc API |  | 3 |  |  |
| Koszt bledu |  | 3 |  |  |
| Emocje |  | 2 |  |  |
| Compliance |  | 3 |  |  |
| Latwosc handoff |  | 3 |  |  |
| Pomiar sukcesu |  | 2 |  |  |

## 4. Mapa procesu rozmowy

```text
Start:
Warunki wejscia:
Krok 1:
Krok 2:
Krok 3:
Decyzje:
Wyjatki:
Integracje:
Handoff:
Zakonczenie:
Metryki:
```

## 5. Szablon scenariusza dialogowego

| Step ID | Stan | Prompt bota | Expected input | Intent/slot | Walidacja | Next step | No-input | No-match | Barge-in | Handoff |
|---|---|---|---|---|---|---|---|---|---|---|

## 6. Szablon intencji

```text
Intent ID:
Nazwa biznesowa:
Definicja:
Zakres:
Poza zakresem:
Przyklady pozytywne:
Przyklady negatywne:
Wymagane sloty:
Encje:
Confidence threshold:
Disambiguation:
Fallback:
Handoff:
Metryki:
```

## 7. Szablon encji

```text
Entity ID:
Typ:
Opis:
Wartosci kanoniczne:
Synonimy:
Przyklady:
Walidacja:
Zrodlo prawdy:
Owner:
Aktualizacja:
```

## 8. Tabela fraz treningowych

| ID | Fraza | Intencja | Encje | Zrodlo | Real/synthetic | Uwagi | Wersja |
|---|---|---|---|---|---|---|---|

## 9. Dokument persony voicebota

```text
Rola bota:
Zakres pomocy:
Czego bot nie robi:
Ton:
Formalnosc:
Tempo:
Zwroty preferowane:
Zwroty zakazane:
Zasady przepraszania:
Zasady odmowy:
Zasady eskalacji:
Transparentnosc:
```

## 10. Dokument promptu systemowego

```text
Prompt ID:
Wersja:
Model:
Zakres:
Poza zakresem:
Styl glosowy:
Zasady odpowiedzi:
Zasady narzedzi:
Zasady RAG:
Zasady danych:
Zasady odmowy:
Zasady eskalacji:
Testy regresji:
Owner:
```

## 11. Specyfikacja integracji

```text
Nazwa integracji:
System:
Owner:
Cel:
Typ: odczyt / zapis / walidacja / akcja / handoff
Endpoint:
Dane wejsciowe:
Dane wyjsciowe:
Autoryzacja:
Timeout:
Retry:
Idempotency:
Bledy:
Komunikaty uzytkownika:
Logi:
Security:
Test cases:
```

## 12. Plan testow

```text
Zakres:
Srodowisko:
Dane testowe:
Kategorie testow:
Test cases:
Kryteria akceptacji:
Defect severity:
Go/no-go:
Raport:
```

## 13. Checklista QA

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

## 14. Checklista przedwdrozeniowa

- Zakres zatwierdzony.
- Legal/compliance zatwierdzone.
- Security zatwierdzone.
- Handoff przetestowany.
- Dashboard dziala.
- Alerty dzialaja.
- Runbook gotowy.
- Rollback gotowy.
- Hypercare zaplanowany.

## 15. Raport z pilotazu

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

## 16. Dashboard metryk

| Metryka | Definicja | Zrodlo | Czestotliwosc | Owner | Prog alarmowy |
|---|---|---|---|---|---|

## 17. Raport z analizy rozmow

```text
Probka:
Okres:
Top intencje:
Top fallbacki:
Top no-match:
Frazy frustracji:
Problemy ASR:
Problemy promptow:
Nowe use case'y:
Rekomendacje:
```

## 18. Backlog optymalizacji

| ID | Problem | Dane | Hipoteza | Zmiana | Ryzyko | Test regresji | Metryka sukcesu | Priorytet |
|---|---|---|---|---|---|---|---|---|

## 19. Dokument handoff do konsultanta

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

## 20. Dokumentacja utrzymaniowa

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

# Zbiorcza checklista dokumentacji

- Czy kazdy dokument ma ownera?
- Czy jest wersjonowany?
- Czy jest powiazany z testami?
- Czy zawiera out of scope?
- Czy zawiera ryzyka?
- Czy jest uzyteczny dla biznesu, IT, QA i compliance?

---

# Co bedzie w kolejnej czesci

Kolejna czesc: **Case studies**.

