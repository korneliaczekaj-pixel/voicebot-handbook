# Voicebot Specialist Handbook

## Czesc 12: Wdrozenie voicebota w organizacji

Wersja robocza: 2026-07-29  
Kontynuacja plikow:

- `Voicebot_Specialist_Handbook_czesc_1.md`
- `Voicebot_Specialist_Handbook_czesc_2.md`
- `Voicebot_Specialist_Handbook_czesc_3.md`
- `Voicebot_Specialist_Handbook_czesc_4.md`
- `Voicebot_Specialist_Handbook_czesc_5.md`
- `Voicebot_Specialist_Handbook_czesc_6.md`
- `Voicebot_Specialist_Handbook_czesc_7.md`
- `Voicebot_Specialist_Handbook_czesc_8.md`
- `Voicebot_Specialist_Handbook_czesc_9.md`
- `Voicebot_Specialist_Handbook_czesc_10.md`
- `Voicebot_Specialist_Handbook_czesc_11.md`

---

# Czesc XI. Wdrozenie voicebota w organizacji

## Cel calej czesci

Wdrozenie voicebota to nie tylko konfiguracja platformy i napisanie scenariusza. To zmiana operacyjna w organizacji: dotyka contact center, IT, danych, procesow, prawnikow, security, analityki, konsultantow i klientow. Udane wdrozenie wymaga discovery, analizy danych, projektowania, integracji, QA, pilota, produkcji, hypercare i utrzymania.

Ta czesc pokazuje pelny cykl wdrozenia voicebota w organizacji.

Po tej czesci czytelnik powinien umiec:

1. Zaplanowac proces wdrozenia od discovery do produkcji.
2. Przeprowadzic audit rozmow i wybor use case'u.
3. Przygotowac prototyp, MVP, pilota i soft launch.
4. Zaprojektowac monitoring, hypercare i utrzymanie.
5. Zrozumiec role i odpowiedzialnosci w zespole.
6. Przygotowac roadmapę rozwoju voicebota.
7. Unikac typowych bledow organizacyjnych.

Zrodla wspierajace czesc:

- Dokumentacje platform enterprise i realtime voice agents jako odniesienie do architektury, integracji, transferow, speech config i monitoringu.
- W3C VoiceXML jako historyczny model aplikacji dialogowych, eventow i formularzy.
- Uzupelnienie eksperckie: enterprise delivery lifecycle, RACI, hypercare, governance, roadmaping i operating model.

---

# Rozdzial 1. Pelny cykl zycia wdrozenia voicebota

## 1.1. Cele rozdzialu

Czytelnik nauczy sie:

- rozumiec etapy wdrozenia voicebota;
- odroznic discovery, MVP, pilot, soft launch i produkcje;
- zaplanowac zaleznosci biznesowe, techniczne i operacyjne;
- okreslic bramki decyzyjne.

## 1.2. Kluczowe pojecia

| Pojecie | Definicja praktyczna |
|---|---|
| Discovery | Etap poznania problemu, danych, procesow, ryzyk i zakresu |
| Audit rozmow | Analiza nagran, transkrypcji, powodow kontaktu i wynikow |
| Prototype | Wczesna wersja do testu koncepcji |
| MVP | Minimalny zakres dajacy realna wartosc i dane |
| Pilot | Ograniczone wdrozenie na czesci ruchu |
| Soft launch | Stopniowe rozszerzanie produkcji |
| Hypercare | Intensywny monitoring i szybkie poprawki po starcie |
| BAU | Business as usual, stabilne utrzymanie po wdrozeniu |

## 1.3. Wyjasnienie eksperckie

Pelny cykl wdrozenia:

```text
1. Discovery
2. Audit rozmow i danych
3. Wybor use case'u
4. Business case i zakres MVP
5. Projekt conversation design i architektury
6. Prototyp
7. Implementacja MVP
8. Testy QA
9. UAT
10. Pilot
11. Soft launch
12. Produkcja
13. Hypercare
14. Utrzymanie
15. Roadmapa rozwoju
```

Kazdy etap ma inne pytanie:

- Discovery: czy rozumiemy problem?
- Use case: czy warto automatyzowac?
- MVP: jaki najmniejszy zakres ma sens?
- QA: czy system dziala zgodnie z wymaganiami?
- UAT: czy organizacja akceptuje zachowanie?
- Pilot: jak system dziala z realnymi uzytkownikami?
- Produkcja: czy skalujemy bezpiecznie?
- Hypercare: co poprawiamy po starcie?
- Utrzymanie: kto odpowiada za dalsza jakosc?

## 1.4. Perspektywa biznesowa

Wdrozenie powinno miec bramki decyzyjne:

| Etap | Decyzja |
|---|---|
| Po discovery | Czy use case jest wart projektu? |
| Po business case | Czy inwestujemy? |
| Po projekcie MVP | Czy zakres jest zatwierdzony? |
| Po QA | Czy mozemy wejsc w UAT? |
| Po UAT | Czy mozemy wejsc w pilot? |
| Po pilocie | Czy skalujemy, poprawiamy czy zatrzymujemy? |
| Po hypercare | Czy przechodzimy do BAU? |

## 1.5. Perspektywa uzytkownika

Uzytkownik widzi tylko efekt. Nie interesuje go, czy system jest MVP. Dlatego nawet ograniczona wersja musi miec:

- jasny zakres;
- dobry handoff;
- brak petli;
- bezpieczne potwierdzenia;
- komunikaty o ograniczeniach;
- monitoring problemow.

MVP moze miec maly zakres, ale nie moze miec niedojrzalej obslugi bledow.

## 1.6. Perspektywa technologiczna

Najwazniejsze zaleznosci:

- dostep do nagran i danych;
- platforma voicebot/contact center;
- ASR/TTS/LLM;
- integracje API;
- srodowiska testowe;
- security review;
- logging i dashboard;
- transfer do konsultanta;
- release management.

## 1.7. Dobre praktyki

- Nie pomijaj discovery.
- Zakres MVP trzymaj waski, ale kompletny.
- Handoff projektuj od poczatku.
- Testy planuj przed implementacja.
- Pilotuj na ograniczonym ruchu.
- Miej rollback.
- Zaplanuj hypercare.
- Ustal ownera utrzymania przed produkcja.

## 1.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Start od implementacji bez discovery | Zly use case |
| MVP bez integracji | Brak wartosci |
| MVP bez handoff | Ryzyko UX |
| Brak UAT z contact center | Konsultanci nie sa gotowi |
| Pilot na zbyt duzym ruchu | Ryzyko masowych problemow |
| Brak hypercare | Problemy produkcyjne narastaja |
| Brak ownera BAU | Bot starzeje sie |

## 1.9. Checklista cyklu wdrozenia

- Czy mamy discovery?
- Czy mamy audit danych?
- Czy use case przeszedl matryce?
- Czy mamy business case?
- Czy MVP ma scope i out of scope?
- Czy architektura jest zatwierdzona?
- Czy QA ma plan?
- Czy UAT ma kryteria?
- Czy pilot ma rollback?
- Czy hypercare ma ownerow?
- Czy BAU jest zaplanowane?

## 1.10. Mini case study

Firma energetyczna chciala wdrozyc voicebota do wszystkich spraw klienta. Discovery pokazalo, ze najlepszym MVP jest status zgloszenia awarii i odczyt licznika. Reklamacje faktur przesunieto na pozniej. Pilot na 10% ruchu ujawnil problemy z numerami punktow poboru, ktore poprawiono przed skalowaniem. Stopniowe wdrozenie pozwolilo uniknac porazki szerokiego zakresu.

## 1.11. Cwiczenia

1. Rozpisz cykl wdrozenia dla voicebota rezerwacyjnego.
2. Wskaz bramki decyzyjne.
3. Zdefiniuj scope MVP.
4. Zaprojektuj plan hypercare.

## 1.12. Podsumowanie

Wdrozenie voicebota jest procesem produktowo-operacyjnym. Najlepsze projekty ida etapami: najpierw zrozumienie, potem zakres, potem kontrolowane wdrozenie, a dopiero potem skalowanie.

---

# Rozdzial 2. Discovery, audit rozmow i analiza danych

## 2.1. Cele rozdzialu

Czytelnik nauczy sie:

- prowadzic discovery;
- organizowac audit rozmow;
- laczyc dane ilosciowe i jakosciowe;
- przygotowac rekomendacje use case'u.

## 2.2. Discovery - pytania podstawowe

Discovery powinno odpowiedziec:

- jaki problem biznesowy rozwiazujemy;
- kto jest uzytkownikiem;
- jakie rozmowy analizujemy;
- jakie sa wolumeny;
- jakie sa koszty;
- jakie systemy sa uzywane;
- jakie sa ryzyka;
- jak mierzymy sukces;
- kto odpowiada za decyzje;
- jakie sa ograniczenia prawne i techniczne.

## 2.3. Audit rozmow

Audit powinien obejmowac:

1. Dane ilosciowe:
   - wolumeny;
   - AHT;
   - FCR;
   - repeat contact;
   - abandonment;
   - transfery;
   - CSAT.

2. Dane jakosciowe:
   - nagrania;
   - transkrypcje;
   - jezyk klientow;
   - emocje;
   - wyjatki;
   - przerwania;
   - momenty frustracji.

3. Dane operacyjne:
   - systemy konsultanta;
   - after-call work;
   - notatki;
   - kody zakonczenia;
   - procedury.

## 2.4. Perspektywa biznesowa

Discovery chroni przed automatyzacja niewlasciwego procesu. Czasem problemem nie jest brak bota, tylko:

- zly routing;
- brak proaktywnej komunikacji;
- nieczytelne faktury;
- opoznienia logistyczne;
- brak self-service;
- niespojny CRM;
- zla taksonomia powodow kontaktu.

Voicebot moze byc rozwiazaniem, ale nie powinien byc zalozeniem.

## 2.5. Perspektywa uzytkownika

Audit rozmow pokazuje:

- czego uzytkownik naprawde chce;
- jak mowi;
- gdzie sie denerwuje;
- kiedy prosi o czlowieka;
- ktore informacje juz podal;
- co musi powtarzac.

Bez sluchania rozmow projekt bedzie organizacyjny, nie uzytkownikowy.

## 2.6. Perspektywa technologiczna

Discovery musi ujawnic:

- czy API istnieja;
- czy dane sa dostepne;
- czy contact center wspiera transfer;
- czy sa nagrania i transkrypcje;
- czy jest zgoda na analize danych;
- czy ASR/TTS obsluguje jezyk i domenę;
- czy sa wymagania security.

## 2.7. Dobre praktyki

- Laczy warsztaty z analiza danych.
- Sluchaj realnych rozmow.
- Nie ufaj bezkrytycznie wrap-up codes.
- Rozmawiaj z konsultantami.
- Dokumentuj luki danych.
- Tworz matryce use case'ow.
- Zakoncz discovery rekomendacja: wdrazac, nie wdrazac, pilot, agent assist, analityka.

## 2.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Discovery jako spotkanie kick-off | Brak realnej analizy |
| Brak nagran | Zly model jezyka |
| Pomijanie konsultantow | Brak wyjatkow |
| Brak IT/security | Nierealny scope |
| Brak rekomendacji no-go | Voicebot forsowany mimo ryzyk |

## 2.9. Checklista discovery

- Czy znamy problem biznesowy?
- Czy mamy dane contact center?
- Czy mamy nagrania/transkrypcje?
- Czy znamy systemy backendowe?
- Czy znamy ryzyka prawne?
- Czy rozmawialismy z konsultantami?
- Czy mamy matryce use case'ow?
- Czy mamy rekomendacje MVP?

## 2.10. Mini case study

W firmie ubezpieczeniowej biznes wskazal "sprzedaz polis" jako use case. Audit rozmow pokazal, ze klienci najczesciej dzwonia po status szkody i liste brakujacych dokumentow. Sprzedaz miala niski wolumen telefoniczny. Rekomendacja discovery przesunela MVP na status szkody, a sprzedaz zostawila jako pozniejszy eksperyment.

## 2.11. Cwiczenia

1. Przygotuj liste pytan discovery.
2. Zaprojektuj probke rozmow do audytu.
3. Wypisz dane ilosciowe i jakosciowe.
4. Przygotuj rekomendacje po discovery dla jednego use case'u.

## 2.12. Podsumowanie

Discovery jest miejscem, w ktorym projekt moze stac sie realny albo pozostac haslem. Dobre discovery konczy sie decyzja i zakresem, nie tylko notatkami ze spotkan.

---

# Rozdzial 3. Projekt, prototyp, MVP i pilot

## 3.1. Cele rozdzialu

Czytelnik nauczy sie:

- odrozniac prototyp, MVP i pilot;
- projektowac minimalny zakres wartosciowy;
- planowac testy i ograniczone wdrozenie;
- przygotowac kryteria sukcesu.

## 3.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Prototyp | Wczesna wersja do sprawdzenia koncepcji |
| MVP | Pierwsza wersja dajaca wartosc uzytkownikom i organizacji |
| Pilot | Kontrolowane wdrozenie na ograniczonym ruchu |
| Scope cut | Swiadome ograniczenie zakresu |
| Pilot cohort | Grupa rozmow/uzytkownikow objeta pilotem |

## 3.3. Wyjasnienie eksperckie

Prototyp odpowiada: "Czy ta rozmowa i koncepcja maja sens?"

MVP odpowiada: "Czy ograniczony zakres moze realnie zalatwic sprawe?"

Pilot odpowiada: "Jak to dziala w realnym ruchu i operacjach?"

MVP nie powinien byc niekompletnym systemem. Powinien byc kompletnym systemem w waskim zakresie.

Przyklad:

Zly MVP:

- status zamowien, reklamacje, zwroty, faktury, platnosci;
- bez integracji;
- bez handoff;
- bez dashboardu.

Dobry MVP:

- status zamowienia i zmiana adresu przed wysylka;
- integracja z OMS;
- handoff z kontekstem;
- metryki task completion, fallback, repeat contact.

## 3.4. Perspektywa biznesowa

MVP powinien miec:

- wartosc;
- niski poziom ryzyka;
- mierzalne wyniki;
- jasny owner;
- ograniczony zakres;
- plan optymalizacji.

Pilot powinien miec:

- okres trwania;
- wolumen/ruch;
- kryteria go/no-go;
- feedback loops;
- rollback;
- komunikacje do konsultantow.

## 3.5. Perspektywa uzytkownika

Uzytkownik nie powinien byc obciazony tym, ze system jest w pilocie. Jesli bot nie moze obsluzyc sprawy, musi szybko i uczciwie przekazac do konsultanta.

## 3.6. Perspektywa technologiczna

MVP technicznie musi miec:

- srodowisko produkcyjne lub produkcyjno-pilotowe;
- monitoring;
- logi;
- handoff;
- integracje krytyczne;
- testy regresji;
- kontrola wersji;
- plan rollback.

## 3.7. Dobre praktyki

- Prototypuj rozmowe przed pelna implementacja.
- MVP ograniczaj zakresem, nie jakoscia.
- Pilotuj na malym, mierzalnym ruchu.
- Miej codzienny przeglad w pierwszych dniach.
- Nie skaluj przed analiza pilota.
- Dokumentuj decyzje scope cut.

## 3.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| MVP jako demo bez wartosci | Brak danych o realnym procesie |
| Zbyt szeroki pilot | Ryzyko skarg |
| Brak rollback | Trudno zatrzymac problem |
| Brak kryteriow sukcesu | Pilot trwa bez decyzji |
| Brak konsultantow w pilocie | Handoff nie dziala operacyjnie |

## 3.9. Checklista MVP/pilota

- Czy MVP ma jasny zakres?
- Czy ma out of scope?
- Czy ma integracje krytyczne?
- Czy ma handoff?
- Czy ma dashboard?
- Czy pilot ma ograniczony ruch?
- Czy ma go/no-go?
- Czy ma rollback?
- Czy contact center jest przygotowane?

## 3.10. Mini case study

Siec przychodni uruchomila pilota voicebota do potwierdzania wizyt outbound. Pilot obejmowal 10% wizyt i godziny pracy rejestracji. Po tygodniu okazalo sie, ze wielu pacjentow mowilo "oddzwonie" zamiast "nie". Dodano osobna intencje i sciezke SMS. Dopiero po tej poprawce zwiekszono ruch.

## 3.11. Cwiczenia

1. Zdefiniuj MVP dla voicebota zwrotow.
2. Zaprojektuj scope cut.
3. Przygotuj pilot cohort.
4. Zdefiniuj kryteria go/no-go.

## 3.12. Podsumowanie

Prototyp, MVP i pilot to trzy rozne narzedzia uczenia sie. Prototyp sprawdza koncepcje, MVP daje ograniczona wartosc, pilot pokazuje realne zachowanie systemu w organizacji.

---

# Rozdzial 4. Soft launch, produkcja, monitoring i hypercare

## 4.1. Cele rozdzialu

Czytelnik nauczy sie:

- planowac stopniowe wejscie na produkcje;
- organizowac monitoring startowy;
- prowadzic hypercare;
- zarzadzac incydentami i rollback.

## 4.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Soft launch | Stopniowe uruchomienie produkcyjne |
| Traffic ramp-up | Zwiekszanie udzialu ruchu |
| Hypercare | Intensywna opieka po uruchomieniu |
| Incident | Zdarzenie wymagajace reakcji |
| Rollback | Cofniecie zmiany lub wylaczenie funkcji |
| Runbook | Instrukcja operacyjna na typowe sytuacje |

## 4.3. Wyjasnienie eksperckie

Soft launch zmniejsza ryzyko. Zamiast wlaczac voicebota dla calego ruchu, organizacja moze:

- zaczac od jednej kolejki;
- zaczac od 5-10% ruchu;
- zaczac od godzin pracy zespolu hypercare;
- zaczac od jednego segmentu;
- zaczac od najprostszego use case'u.

Hypercare powinien obejmowac codzienny przeglad:

- wolumen;
- task completion;
- fallback/no-match;
- handoff;
- API errors;
- abandonment;
- transkrypcje problemowe;
- feedback konsultantow;
- incydenty.

## 4.4. Perspektywa biznesowa

Soft launch pozwala chronić marke i klientow. Nawet dobrze przetestowany system moze napotkac:

- nowe frazy;
- inne warunki audio;
- problemy z integracja;
- nieoczekiwany ruch;
- opor uzytkownikow;
- braki w handoff.

## 4.5. Perspektywa uzytkownika

Podczas soft launch bot musi miec szczegolnie latwy handoff. Gdy system nie ma pewnosci, lepiej przekazac z kontekstem niz testowac cierpliwosc uzytkownika.

## 4.6. Perspektywa technologiczna

Monitoring startowy:

- realtime health;
- API errors;
- latency p95/p99;
- ASR/TTS status;
- LLM/RAG errors;
- transfer success;
- dashboard conversation outcomes;
- alerts.

Runbook powinien mowic:

- kto reaguje;
- kiedy wylaczyc flow;
- kiedy cofnac release;
- jak przekierowac ruch;
- jak komunikowac incydent;
- gdzie sprawdzic logi.

## 4.7. Dobre praktyki

- Uruchamiaj stopniowo.
- Hypercare planuj przed go-live.
- Miej kanal szybkiej komunikacji zespolu.
- Miej runbook.
- Miej rollback.
- Monitoruj pierwsze godziny szczegolnie intensywnie.
- Sluchaj probek rozmow codziennie.
- Zbieraj feedback konsultantow.

## 4.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Big bang launch | Duze ryzyko masowych problemow |
| Brak hypercare | Problemy nie sa szybko naprawiane |
| Brak rollback | Dlugie trwanie incydentu |
| Brak runbook | Chaos odpowiedzialnosci |
| Monitoring tylko techniczny | Problemy UX niewidoczne |

## 4.9. Checklista soft launch

- Czy startujemy na ograniczonym ruchu?
- Czy contact center jest gotowe?
- Czy handoff dziala?
- Czy dashboardy dzialaja?
- Czy alerty dzialaja?
- Czy mamy runbook?
- Czy mamy rollback?
- Czy hypercare ma harmonogram?
- Czy codziennie analizujemy probki rozmow?

## 4.10. Mini case study

Voicebot e-commerce zostal wlaczony najpierw dla 10% rozmow o statusie zamowienia. W pierwszym dniu wykryto wysoki no-match na fraze "paczka stoi w miejscu". Dodano mapowanie do statusu opoznionej dostawy i skrocony komunikat. Dzieki soft launch problem dotknal ograniczonej liczby klientow.

## 4.11. Cwiczenia

1. Zaprojektuj ramp-up traffic dla 4 tygodni.
2. Przygotuj hypercare daily checklist.
3. Napisz runbook dla awarii API.
4. Okresl warunki rollback.

## 4.12. Podsumowanie

Go-live nie jest koncem projektu. To poczatek realnej nauki. Soft launch i hypercare pozwalaja uczyc sie bez wystawiania calej organizacji na nadmierne ryzyko.

---

# Rozdzial 5. Utrzymanie, BAU i roadmapa rozwoju

## 5.1. Cele rozdzialu

Czytelnik nauczy sie:

- projektowac operating model voicebota po wdrozeniu;
- organizowac utrzymanie i optymalizacje;
- tworzyc roadmapę rozwoju;
- unikac starzenia sie bota.

## 5.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| BAU | Stabilne utrzymanie po wdrozeniu |
| Operating model | Model odpowiedzialnosci, rytmu pracy i decyzji |
| Roadmap | Plan rozwoju funkcji i use case'ow |
| Change management | Zarzadzanie zmianami |
| Release management | Planowanie, testowanie i wdrazanie wersji |
| Continuous improvement | Ciagle doskonalenie |

## 5.3. Wyjasnienie eksperckie

Voicebot wymaga utrzymania, bo zmieniaja sie:

- produkty;
- procedury;
- ceny;
- regulaminy;
- slownictwo klientow;
- wolumeny;
- sezonowosc;
- systemy backendowe;
- polityki compliance;
- modele AI.

BAU powinno obejmowac:

- monitoring metryk;
- analiza transkrypcji;
- optymalizacja promptow;
- aktualizacja datasetow;
- testy regresji;
- aktualizacja bazy wiedzy;
- release notes;
- review compliance;
- feedback contact center.

## 5.4. Perspektywa biznesowa

Roadmapa powinna wynikac z:

- danych produkcyjnych;
- wartosci biznesowej;
- ryzyka;
- gotowosci integracji;
- potrzeb contact center;
- strategii firmy.

Nie kazde pytanie klientow powinno stac sie nowym use case'em. Najpierw trzeba ocenic wolumen, wartosc i ryzyko.

## 5.5. Perspektywa uzytkownika

Utrzymanie widac jako aktualnosc i sprawnosc. Bot, ktory mowi o starej promocji albo nie rozumie nowej procedury, traci zaufanie. Uzytkownik nie odroznia "bot nie zostal zaktualizowany" od "firma nie wie, co robi".

## 5.6. Perspektywa technologiczna

Operating model powinien okreslac:

- ownera produktu;
- ownera conversation design;
- ownera technicznego;
- ownera danych;
- ownera knowledge base;
- proces release;
- proces incydentow;
- testy regresji;
- monitoring;
- SLA utrzymania.

## 5.7. Dobre praktyki

- Ustal BAU przed produkcja.
- Miej regularny rytm przegladu metryk.
- Miej backlog optymalizacji.
- Wersjonuj flow, prompty, modele, RAG.
- Przegladaj baze wiedzy cyklicznie.
- Testuj regresje przed release.
- Roadmapę buduj na danych, nie tylko pomyslach.
- Komunikuj zmiany contact center.

## 5.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Brak ownera po wdrozeniu | Bot sie starzeje |
| Brak release process | Zmiany psuja produkcje |
| Brak update bazy wiedzy | Nieaktualne odpowiedzi |
| Roadmapa z zyczen, nie danych | Slabe priorytety |
| Brak feedbacku konsultantow | Handoff i wyjatki sa ignorowane |

## 5.9. Checklista BAU

- Czy jest product owner?
- Czy jest owner danych?
- Czy jest owner knowledge base?
- Czy jest rytm review metryk?
- Czy jest backlog optymalizacji?
- Czy sa testy regresji?
- Czy jest release process?
- Czy jest incident process?
- Czy roadmapa jest aktualizowana?

## 5.10. Mini case study

Voicebot zwrotow dzialal dobrze przez trzy miesiace. Firma zmienila polityke zwrotow z 30 na 14 dni, ale baza wiedzy bota nie zostala zaktualizowana. Klienci dostawali bledne informacje. Po incydencie powolano ownera knowledge base i proces zatwierdzania zmian regulaminowych przed publikacja.

## 5.11. Cwiczenia

1. Zaprojektuj operating model dla voicebota e-commerce.
2. Przygotuj miesieczny rytm przegladow.
3. Zdefiniuj release checklist.
4. Zbuduj roadmapę 3 kwartalow.

## 5.12. Podsumowanie

Voicebot nie jest projektem "wdrozyc i zapomniec". Jest produktem, ktory wymaga wlascicieli, rytmu, danych, testow i roadmapy. Bez BAU kazdy dobry bot z czasem staje sie zly.

---

# Rozdzial 6. Role i odpowiedzialnosci w projekcie voicebota

## 6.1. Cele rozdzialu

Czytelnik nauczy sie:

- rozumiec role w projekcie voicebota;
- podzielic odpowiedzialnosci;
- zbudowac RACI;
- unikac luk organizacyjnych.

## 6.2. Role

| Rola | Odpowiedzialnosc |
|---|---|
| Sponsor biznesowy | Budzet, priorytet, decyzje strategiczne |
| Product owner | Zakres, backlog, priorytety, wynik produktu |
| Project manager | Harmonogram, zaleznosci, ryzyka, komunikacja |
| Voicebot Specialist | Projektowanie, koordynacja conversation/process/AI, jakosc |
| Conversation designer | Dialogi, prompt'y, persona, fallbacki, UX glosowy |
| AI/NLP specialist | Intencje, encje, modele, dane, testy NLU |
| LLM/RAG specialist | Prompty, RAG, guardrails, ewaluacja generatywna |
| Developer/backend | Integracje, API, logika, narzedzia |
| Solution architect | Architektura end-to-end, security, skalowanie |
| QA | Testy, regresja, defekty, akceptacja |
| Contact center manager | Operacje, kolejki, konsultanci, handoff |
| Konsultanci | Wiedza procesowa, feedback, testy realnych rozmow |
| Legal/compliance | Zgody, regulacje, ryzyka odpowiedzi |
| Security/DPO | Dane, prywatnosc, dostepy, retencja |
| Data analyst | Dashboardy, metryki, analizy |
| Knowledge owner | Aktualnosc bazy wiedzy |

## 6.3. Wyjasnienie eksperckie

Najczestsza luka: wszyscy mysla, ze ktos inny odpowiada za jakosc po wdrozeniu. Dlatego RACI jest konieczny.

Przykladowe RACI:

| Obszar | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|
| Zakres MVP | PO | Sponsor | CC, IT, Legal | Zespol |
| Dialogi | Conversation Designer | PO | Voicebot Specialist, CC | QA |
| Intencje | AI/NLP | Voicebot Specialist | Conversation Designer | PO |
| Integracje | Developer | Architect | IT owner | PO |
| Compliance | Legal | Sponsor | PO, Security | Zespol |
| QA | QA | PO | Dev, Conversation Designer | Sponsor |
| Handoff | CC Manager | PO | Architect, QA | Konsultanci |
| BAU | PO | Sponsor | Data, CC, IT | Zespol |

## 6.4. Perspektywa biznesowa

Rola sponsora nie konczy sie na budzecie. Sponsor musi podejmowac decyzje, gdy pojawia sie konflikt:

- containment vs CSAT;
- compliance vs dlugosc komunikatu;
- zakres vs termin;
- automatyzacja vs human handoff;
- koszt vs jakosc.

## 6.5. Perspektywa uzytkownika

Dobre role przekladaja sie na spojnosc doswiadczenia. Gdy legal, UX, contact center i IT nie wspolpracuja, uzytkownik slyszy efekt konfliktu: dlugie komunikaty, zle transfery, brak danych i fallbacki.

## 6.6. Perspektywa technologiczna

Technicznie rola architekta jest kluczowa, bo voicebot dotyka wielu systemow. Ale architektura bez conversation design moze stworzyc szybki system, ktory mowi zle rzeczy. Dlatego role musza byc polaczone.

## 6.7. Dobre praktyki

- Ustal RACI na starcie.
- Zaangazuj legal/security wcześnie.
- Zaangazuj konsultantow w discovery i UAT.
- Ustal ownera knowledge base.
- Ustal ownera metryk.
- Ustal ownera BAU.
- Spotkania optymalizacyjne rob cyklicznie.

## 6.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Brak PO | Zakres plynie |
| Brak legal na starcie | Blokady przed produkcja |
| Brak contact center w projekcie | Handoff nie dziala |
| Brak ownera danych | Dashboardy sa slabe |
| Brak ownera bazy wiedzy | Odpowiedzi sie starzeja |
| Brak BAU owner | Bot zostaje bez opieki |

## 6.9. Checklista rol

- Czy jest sponsor?
- Czy jest PO?
- Czy jest PM?
- Czy jest conversation designer?
- Czy jest AI/NLP owner?
- Czy jest architect?
- Czy jest QA?
- Czy jest contact center owner?
- Czy jest legal/security?
- Czy jest data analyst?
- Czy jest BAU owner?

## 6.10. Mini case study

W projekcie bankowym bot byl technicznie gotowy, ale legal zablokowal produkcje, bo nie zatwierdzono sposobu informowania o automatycznej rozmowie i retencji transkrypcji. Po tym firma dodala legal/compliance do RACI od discovery, a nie dopiero przed go-live.

## 6.11. Cwiczenia

1. Przygotuj RACI dla projektu rezerwacyjnego.
2. Wskaz role potrzebne w UAT.
3. Zdefiniuj ownerow BAU.
4. Opisz konflikt sponsor vs compliance i kto decyduje.

## 6.12. Podsumowanie

Voicebot jest projektem interdyscyplinarnym. Bez jasnych rol odpowiedzialnosc rozmywa sie, a jakosc cierpi. RACI nie jest formalnoscia, tylko narzedziem zarzadzania ryzykiem.

---

# 7. Zbiorcza checklista po Czesci XI

- Czy wdrozenie ma pelny cykl od discovery do BAU?
- Czy wykonano audit rozmow?
- Czy use case zostal wybrany na podstawie danych?
- Czy business case i MVP sa zatwierdzone?
- Czy prototyp sprawdzil koncepcje rozmowy?
- Czy MVP ma waski, ale kompletny zakres?
- Czy pilot ma ograniczony ruch?
- Czy pilot ma go/no-go?
- Czy soft launch ma ramp-up?
- Czy hypercare ma harmonogram i ownerow?
- Czy jest runbook i rollback?
- Czy BAU ma ownera?
- Czy roadmapa wynika z danych?
- Czy RACI obejmuje wszystkie role?
- Czy contact center, legal, security i data sa zaangazowane?

---

# 8. Co bedzie w kolejnej czesci

Kolejna czesc powinna opracowac **Czesc XII. Bezpieczenstwo, prywatnosc, prawo i compliance**:

1. RODO/GDPR, dane osobowe i dane wrazliwe.
2. Zgody, informowanie o rozmowie z botem i nagrywanie.
3. Transkrypcje, retencja, minimalizacja danych i szyfrowanie.
4. Dostep do logow i bezpieczenstwo API.
5. Prompt injection, data leakage i halucynacje jako ryzyko compliance.
6. Audyt, odpowiedzialnosc za decyzje i branze regulowane.

