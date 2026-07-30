# Voicebot Specialist Handbook

## Czesc 17: Case studies

Wersja robocza: 2026-07-29

---

# Czesc XVI. Case studies

## Cel czesci

Case studies pokazuja, jak te same zasady projektowania voicebotow zmieniaja sie w zaleznosci od branzy, emocji uzytkownika, ryzyka prawnego, integracji i metryk sukcesu.

---

## 1. E-commerce: status zamowienia i zmiana adresu

| Element | Opis |
|---|---|
| Problem | Wysoki wolumen pytan o paczki i zmiany adresu |
| Uzytkownik | Klient chce szybko wiedziec, gdzie jest zamowienie |
| Voicebot | Status, ETA, zmiana adresu przed wysylka |
| Architektura | Telefonia -> ASR -> NLU/flow -> OMS API -> TTS |
| Integracje | OMS, CRM, SMS, contact center |
| Ryzyka | Bledny adres, status sporny, frustracja przy opoznieniu |
| Metryki | task completion, repeat contact, address correction success |

Przykladowy dialog:

Bot: "Znalazlem zamowienie. Jest przygotowywane do wysylki. Czy chce pan zmienic adres przed nadaniem?"  
Uzytkownik: "Tak, na Kwiatowa 8."  
Bot: "Mam Kwiatowa 8. Prosze podac jeszcze miasto."

Plan optymalizacji: analiza no-match dla fraz o kurierze, monitorowanie repeat contact po statusie opoznionym.

## 2. Bankowosc: zastrzezenie karty

Problem: klient zgubil karte lub podejrzewa kradziez.  
Voicebot: szybka klasyfikacja, weryfikacja, zastrzezenie przez bezpieczne narzedzie lub natychmiastowy handoff.  
Ryzyka: fraud, zla autoryzacja, zbyt wolny proces.  
Metryki: time to block, false routing, handoff success, security incidents.

Dialog:

Bot: "Czy chce pan zastrzec karte, czy sprawdzic status nowej karty?"  
Uzytkownik: "Zgubilem karte."  
Bot: "Rozumiem. Dla bezpieczenstwa przejde do zastrzezenia. Najpierw potwierdze tozsamosc."

## 3. Ubezpieczenia: status szkody

Problem: klienci pytaja o status i brakujace dokumenty.  
Voicebot: sprawdza status szkody, liste brakow, wysyla link do doslania dokumentow.  
Ryzyka: bot nie moze obiecywac decyzji odszkodowawczej.  
Metryki: status completion, link sent, repeat contact, handoff for dispute.

Dialog:

Uzytkownik: "Czy dostane odszkodowanie?"  
Bot: "Nie moge ocenic decyzji. Mogę sprawdzic aktualny status szkody albo polaczyc z konsultantem."

## 4. Medycyna: rezerwacja wizyty

Problem: rejestracja obciazona potwierdzaniem i przekladaniem wizyt.  
Voicebot: umawia, przeklada, odwoluje wizyty; nie diagnozuje.  
Ryzyka: dane o zdrowiu, pilne objawy, osoby starsze.  
Metryki: booking completion, no-input, handoff for urgent phrases, SMS confirmation.

Dialog:

Bot: "Moge pomoc umowic lub przelozyc wizyte. Jesli to nagla sytuacja zdrowotna, prosze skorzystac z pilnej pomocy medycznej."

## 5. Telekomunikacja: awaria internetu

Problem: duzy wolumen awarii i pytan o faktury.  
Voicebot: klasyfikuje problem, sprawdza awarie lokalna, wykonuje prosta diagnostyke, tworzy ticket.  
Ryzyka: frustracja, wiele wyjatkow, zly endpointing przy opisach.  
Metryki: ticket completeness, outage detection, handoff after frustration.

## 6. Energetyka: odczyt licznika i status zgloszenia

Problem: powtarzalne kontakty o odczyty i status awarii.  
Voicebot: przyjmuje odczyt, sprawdza status, wysyla potwierdzenie.  
Ryzyka: bledne cyfry, numery PPE, reklamacje rachunku.  
Metryki: digit accuracy, reading accepted, repeat contact.

## 7. Administracja publiczna: status sprawy

Problem: obywatele pytaja o status wniosku i wymagane dokumenty.  
Voicebot: informuje o statusie i wymaganiach, nie wydaje decyzji administracyjnej.  
Ryzyka: dostepnosc, jezyk urzedowy, wykluczenie cyfrowe.  
Metryki: status completion, accessibility feedback, handoff.

## 8. Rekrutacja: pre-screening kandydatow

Problem: duzy wolumen kandydatow i umawianie rozmow.  
Voicebot: zbiera dostepnosc, podstawowe wymagania, umawia termin.  
Ryzyka: bias, wrazenie automatycznego odrzucenia, dane osobowe.  
Metryki: scheduling success, candidate drop-off, fairness review.

## 9. Windykacja: informacja i deklaracja

Problem: przypomnienia o platnosci i deklaracje.  
Voicebot: neutralnie informuje, zbiera deklaracje, eskaluje spory.  
Ryzyka: presja, stres, compliance, agresja.  
Metryki: promise-to-pay captured, dispute handoff, complaint rate.

Dialog:

Bot: "Moge podac dostepne opcje platnosci albo polaczyc z konsultantem, jesli kwestionuje pan naleznosc."

## 10. Sprzedaz B2B: kwalifikacja leadow

Problem: wiele zapytan o roznej jakosci.  
Voicebot: kwalifikuje potrzebe, wielkosc firmy, termin, umawia rozmowe.  
Ryzyka: utrata leadow premium, zbyt agresywny ton.  
Metryki: qualified leads, meeting booked, sales acceptance rate.

## 11. Helpdesk IT: ticket i instrukcje

Problem: powtarzalne problemy z haslem, VPN, poczta.  
Voicebot: klasyfikuje, podaje krotkie instrukcje, tworzy ticket, streszcza.  
Ryzyka: hasla, security incidents, zbyt dlugie instrukcje glosowe.  
Metryki: ticket completeness, password reset success, escalation quality.

---

# Porownanie case studies

| Branza | Najlepszy start | Najwieksze ryzyko | Handoff |
|---|---|---|---|
| E-commerce | Status/zmiana adresu | Bledne dane | Status sporny |
| Bank | Zastrzezenie/status | Fraud/compliance | Szybki |
| Ubezpieczenia | Status szkody | Obietnica decyzji | Spory |
| Medycyna | Rezerwacja | Porady zdrowotne | Pilne objawy |
| Telekom | Awaria/status | Frustracja | Po diagnozie |
| Energetyka | Odczyt/status | Cyfry/PPE | Reklamacje |
| Administracja | Status sprawy | Legalizm/dostepnosc | Decyzje |
| Rekrutacja | Umawianie | Bias | Kandydat premium |
| Windykacja | Informacja | Presja/spor | Spory |
| B2B sales | Kwalifikacja | Utrata leadu | High-value |
| Helpdesk | Ticket | Security | Incydent |

---

# Zbiorcza checklista case study

- Czy problem biznesowy jest konkretny?
- Czy kontekst uzytkownika jest opisany?
- Czy zakres bota jest ograniczony?
- Czy architektura i integracje sa jasne?
- Czy ryzyka sa opisane?
- Czy handoff jest zaprojektowany?
- Czy metryki sukcesu sa mierzalne?
- Czy plan optymalizacji istnieje?

---

# Co bedzie w kolejnej czesci

Kolejna czesc: **Egzamin i certyfikacja Voicebot Specialist**.

