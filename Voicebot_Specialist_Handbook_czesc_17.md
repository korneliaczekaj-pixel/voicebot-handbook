# Voicebot Specialist Handbook

## Część 17: Case studies

Wersja robocza: 2026-07-29

---

# Część XVI. Case studies

## Cel części

Case studies pokazują, jak te same zasady projektowania voicebotów zmieniaja się w zaleznosci od branży, emocji użytkownika, ryzyka prawnego, integracji i metryk sukcesu.

---

## 1. E-commerce: status zamówienia i zmiana adresu

| Element | Opis |
|---|---|
| Problem | Wysoki wolumen pytań o paczki i zmiany adresu |
| Użytkownik | Klient chce szybko wiedzieć, gdzie jest zamówienie |
| Voicebot | Status, ETA, zmiana adresu przed wysyłka |
| Architektura | Telefonia -> ASR -> NLU/flow -> OMS API -> TTS |
| Integracje | OMS, CRM, SMS, contact center |
| Ryzyka | Błędny adres, status sporny, frustracja przy opoznieniu |
| Metryki | task completion, repeat contact, address correction success |

Przykładowy dialog:

Bot: "Znalazlem zamówienie. Jest przygotowywane do wysyłki. Czy chce pan zmienić adres przed nadaniem?"  
Użytkownik: "Tak, na Kwiatowa 8."  
Bot: "Mam Kwiatowa 8. Proszę podac jeszcze miasto."

Plan optymalizacji: analiza no-match dla fraz o kurierze, monitorowanie repeat contact po statusie opoznionym.

## 2. Bankowosc: zastrzezenie karty

Problem: klient zgubil kartę lub podejrzewa kradziez.  
Voicebot: szybka klasyfikacja, weryfikacja, zastrzezenie przez bezpieczne narzędzie lub natychmiastowy handoff.  
Ryzyka: fraud, zła autoryzacja, zbyt wolny proces.  
Metryki: time to block, false routing, handoff success, security incidents.

Dialog:

Bot: "Czy chce pan zastrzec kartę, czy sprawdzić status nowej karty?"  
Użytkownik: "Zgubilem kartę."  
Bot: "Rozumiem. Dla bezpieczeństwa przejde do zastrzezenia. Najpierw potwierdze tozsamosc."

## 3. Ubezpieczenia: status szkody

Problem: klienci pytają o status i brakujace dokumenty.  
Voicebot: sprawdza status szkody, listę brakow, wysyła link do doslania dokumentów.  
Ryzyka: bot nie może obiecywac decyzji odszkodowawczej.  
Metryki: status completion, link sent, repeat contact, handoff for dispute.

Dialog:

Użytkownik: "Czy dostane odszkodowanie?"  
Bot: "Nie mogę ocenić decyzji. Mogę sprawdzić aktualny status szkody albo połączyć z konsultantem."

## 4. Medycyna: rezerwacja wizyty

Problem: rejestracja obciazona potwierdzaniem i przekladaniem wizyt.  
Voicebot: umawia, przeklada, odwoluje wizyty; nie diagnozuje.  
Ryzyka: dane o zdrowiu, pilne objawy, osoby starsze.  
Metryki: booking completion, no-input, handoff for urgent phrases, SMS confirmation.

Dialog:

Bot: "Mogę pomóc umowic lub przelozyc wizyte. Jeśli to nagłą sytuacja zdrowotną, proszę skorzystać z pilnej pomocy medycznej."

## 5. Telekomunikacja: awaria internetu

Problem: duzy wolumen awarii i pytań o faktury.  
Voicebot: klasyfikuje problem, sprawdza awarie lokalna, wykonuje prosta diagnostyke, tworzy ticket.  
Ryzyka: frustracja, wiele wyjątków, zły endpointing przy opisach.  
Metryki: ticket completeness, outage detection, handoff after frustration.

## 6. Energetyka: odczyt licznika i status zgłoszenia

Problem: powtarzalne kontakty o odczyty i status awarii.  
Voicebot: przyjmuje odczyt, sprawdza status, wysyła potwierdzenie.  
Ryzyka: błędne cyfry, numery PPE, reklamację rachunku.  
Metryki: digit accuracy, reading accepted, repeat contact.

## 7. Administracja publiczna: status sprawy

Problem: obywatele pytają o status wniosku i wymagane dokumenty.  
Voicebot: informuje o statusie i wymaganiach, nie wydaje decyzji administracyjnej.  
Ryzyka: dostępność, język urzedowy, wykluczenie cyfrowe.  
Metryki: status completion, accessibility feedback, handoff.

## 8. Rekrutacja: pre-screening kandydatow

Problem: duzy wolumen kandydatow i umawianie rozmów.  
Voicebot: zbiera dostępność, podstawowe wymagania, umawia termin.  
Ryzyka: bias, wrazenie automatycznego odrzucenia, dane osobowe.  
Metryki: scheduling success, candidate drop-off, fairness review.

## 9. Windykacja: informacja i deklaracja

Problem: przypomnienia o płatności i deklaracje.  
Voicebot: neutralnie informuje, zbiera deklaracje, eskaluje spory.  
Ryzyka: presja, stres, compliance, agresja.  
Metryki: promise-to-pay captured, dispute handoff, complaint rate.

Dialog:

Bot: "Mogę podac dostępne opcję płatności albo połączyć z konsultantem, jeśli kwestionuje pan naleznosc."

## 10. Sprzedaż B2B: kwalifikacja leadow

Problem: wiele zapytan o roznej jakości.  
Voicebot: kwalifikuje potrzebe, wielkosc firmy, termin, umawia rozmowę.  
Ryzyka: utrata leadow premium, zbyt agresywny ton.  
Metryki: qualified leads, meeting booked, sales acceptance rate.

## 11. Helpdesk IT: ticket i instrukcje

Problem: powtarzalne problemy z hasłem, VPN, poczta.  
Voicebot: klasyfikuje, podaje krótkie instrukcje, tworzy ticket, streszcza.  
Ryzyka: hasła, security incidents, zbyt długie instrukcje głosowe.  
Metryki: ticket completeness, password reset success, escalation quality.

---

# Porównanie case studies

| Branża | Najlepszy start | Największe ryzyko | Handoff |
|---|---|---|---|
| E-commerce | Status/zmiana adresu | Błędne dane | Status sporny |
| Bank | Zastrzezenie/status | Fraud/compliance | Szybki |
| Ubezpieczenia | Status szkody | Obietnica decyzji | Spory |
| Medycyna | Rezerwacja | Porady zdrowotne | Pilne objawy |
| Telekom | Awaria/status | Frustracja | Po diagnozie |
| Energetyka | Odczyt/status | Cyfry/PPE | Reklamację |
| Administracja | Status sprawy | Legalizm/dostępność | Decyzję |
| Rekrutacja | Umawianie | Bias | Kandydat premium |
| Windykacja | Informacja | Presja/spor | Spory |
| B2B sales | Kwalifikacja | Utrata leadu | High-value |
| Helpdesk | Ticket | Security | Incydent |

---

# Zbiorcza checklista case study

- Czy problem biznesowy jest konkretny?
- Czy kontekst użytkownika jest opisany?
- Czy zakres bota jest ograniczony?
- Czy architektura i integracje są jasne?
- Czy ryzyka są opisane?
- Czy handoff jest zaprojektowany?
- Czy metryki sukcesu są mierzalne?
- Czy plan optymalizacji istnieje?

---

# Co będzie w kolejnej części

Kolejna część: **Egzamin i certyfikacja Voicebot Specialist**.

