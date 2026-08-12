# Rozdział 17. Case studies

Projekt voicebota zmienia się wraz z procesem, branżą i konsekwencjami błędu. Status przesyłki wymaga przede wszystkim aktualnych danych i krótkiej odpowiedzi, zastrzeżenie karty wymaga szybkiej autoryzacji i rygorystycznej obsługi ryzyka, a rejestracja medyczna musi oddzielać zarządzanie terminem od oceny stanu zdrowia. Dlatego każdy przypadek należy analizować przez cel użytkownika, wymagane integracje, poziom ryzyka, warunki przekazania rozmowy oraz miarę rzeczywistego wyniku.

---

## 17.1. E-commerce: status zamówienia i zmiana adresu

| Element | Opis |
|---|---|
| Problem | Wysoki wolumen pytań o paczki i zmiany adresu |
| Użytkownik | Klient chce szybko wiedzieć, gdzie jest zamówienie |
| Voicebot | Status, ETA, zmiana adresu przed wysyłką |
| Architektura | Telefonia -> ASR -> NLU/flow -> OMS API -> TTS |
| Integracje | OMS, CRM, SMS, contact center |
| Ryzyka | Błędny adres, status sporny, frustracja przy opóźnieniu |
| Metryki | task completion, repeat contact, address correction success |

Przykładowy dialog:

Bot: "Znalazłem zamówienie. Jest przygotowywane do wysyłki. Czy chce pan zmienić adres przed nadaniem?"  
Użytkownik: "Tak, na Kwiatowa 8."  
Bot: "Mam Kwiatowa 8. Proszę podać jeszcze miasto."

Plan optymalizacji: analiza no-match dla fraz o kurierze, monitorowanie repeat contact po statusie opóźnionym.

## 17.2. Bankowość: zastrzeżenie karty

Problem: klient zgubił kartę lub podejrzewa kradzież.  
Voicebot: szybka klasyfikacja, weryfikacja, zastrzeżenie przez bezpieczne narzędzie lub natychmiastowy handoff.  
Ryzyka: fraud, zła autoryzacja, zbyt wolny proces.  
Metryki: time to block, false routing, handoff success, security incidents.

Dialog:

Bot: "Czy chce pan zastrzec kartę, czy sprawdzić status nowej karty?"  
Użytkownik: "Zgubiłem kartę."  
Bot: "Rozumiem. Dla bezpieczeństwa przejdę do zastrzeżenia. Najpierw potwierdzę tożsamość."

## 17.3. Ubezpieczenia: status szkody

Problem: klienci pytają o status i brakujące dokumenty.  
Voicebot: sprawdza status szkody, listę braków, wysyła link do dosłania dokumentów.  
Ryzyka: bot nie może obiecywać decyzji odszkodowawczej.  
Metryki: status completion, link sent, repeat contact, handoff for dispute.

Dialog:

Użytkownik: "Czy dostanę odszkodowanie?"  
Bot: "Nie mogę ocenić decyzji. Mogę sprawdzić aktualny status szkody albo połączyć z konsultantem."

## 17.4. Medycyna: rezerwacja wizyty

Problem: rejestracja obciążona potwierdzaniem i przekładaniem wizyt.  
Voicebot: umawia, przekłada, odwołuje wizyty; nie diagnozuje.  
Ryzyka: dane o zdrowiu, pilne objawy, osoby starsze.  
Metryki: booking completion, no-input, handoff for urgent phrases, SMS confirmation.

Dialog:

Bot: "Mogę pomóc umówić lub przełożyć wizytę. Jeśli to nagła sytuacja zdrowotna, proszę skorzystać z pilnej pomocy medycznej."

## 17.5. Telekomunikacja: awaria internetu

Problem: duży wolumen awarii i pytań o faktury.  
Voicebot: klasyfikuje problem, sprawdza awarię lokalną, wykonuje prostą diagnostykę, tworzy ticket.  
Ryzyka: frustracja, wiele wyjątków, zły endpointing przy opisach.  
Metryki: ticket completeness, outage detection, handoff after frustration.

## 17.6. Energetyka: odczyt licznika i status zgłoszenia

Problem: powtarzalne kontakty o odczyty i status awarii.  
Voicebot: przyjmuje odczyt, sprawdza status, wysyła potwierdzenie.  
Ryzyka: błędne cyfry, numery PPE, reklamacje rachunku.  
Metryki: digit accuracy, reading accepted, repeat contact.

## 17.7. Administracja publiczna: status sprawy

Problem: obywatele pytają o status wniosku i wymagane dokumenty.  
Voicebot: informuje o statusie i wymaganiach, nie wydaje decyzji administracyjnej.  
Ryzyka: dostępność, język urzędowy, wykluczenie cyfrowe.  
Metryki: status completion, accessibility feedback, handoff.

## 17.8. Rekrutacja: pre-screening kandydatów

Problem: duży wolumen kandydatów i umawianie rozmów.  
Voicebot: zbiera dostępność, podstawowe wymagania, umawia termin.  
Ryzyka: bias, wrażenie automatycznego odrzucenia, dane osobowe.  
Metryki: scheduling success, candidate drop-off, fairness review.

## 17.9. Windykacja: informacja i deklaracja

Problem: przypomnienia o płatności i deklaracje.  
Voicebot: neutralnie informuje, zbiera deklaracje, eskaluje spory.  
Ryzyka: presja, stres, compliance, agresja.  
Metryki: promise-to-pay captured, dispute handoff, complaint rate.

Dialog:

Bot: "Mogę podać dostępne opcje płatności albo połączyć z konsultantem, jeśli kwestionuje pan należność."

## 17.10. Sprzedaż B2B: kwalifikacja leadów

Problem: wiele zapytań o różnej jakości.  
Voicebot: kwalifikuje potrzebę, wielkość firmy, termin, umawia rozmowę.  
Ryzyka: utrata leadów premium, zbyt agresywny ton.  
Metryki: qualified leads, meeting booked, sales acceptance rate.

## 17.11. Helpdesk IT: ticket i instrukcje

Problem: powtarzalne problemy z hasłem, VPN, poczta.  
Voicebot: klasyfikuje, podaje krótkie instrukcje, tworzy ticket, streszcza.  
Ryzyka: hasła, security incidents, zbyt długie instrukcje głosowe.  
Metryki: ticket completeness, password reset success, escalation quality.

---

## 17.12. Porównanie case studies

| Branża | Najlepszy start | Największe ryzyko | Handoff |
|---|---|---|---|
| E-commerce | Status/zmiana adresu | Błędne dane | Status sporny |
| Bank | Zastrzeżenie/status | Fraud/compliance | Szybki |
| Ubezpieczenia | Status szkody | Obietnica decyzji | Spory |
| Medycyna | Rezerwacja | Porady zdrowotne | Pilne objawy |
| Telekom | Awaria/status | Frustracja | Po diagnozie |
| Energetyka | Odczyt/status | Cyfry/PPE | Reklamacja |
| Administracja | Status sprawy | Legalizm/dostępność | Decyzja |
| Rekrutacja | Umawianie | Bias | Kandydat premium |
| Windykacja | Informacja | Presja/spór | Spory |
| B2B sales | Kwalifikacja | Utrata leadu | High-value |
| Helpdesk | Ticket | Security | Incydent |

---

## 17.13. Zbiorcza checklista case study

- Czy problem biznesowy jest konkretny?
- Czy kontekst użytkownika jest opisany?
- Czy zakres bota jest ograniczony?
- Czy architektura i integracje są jasne?
- Czy ryzyka są opisane?
- Czy handoff jest zaprojektowany?
- Czy metryki sukcesu są mierzalne?
- Czy plan optymalizacji istnieje?

---
