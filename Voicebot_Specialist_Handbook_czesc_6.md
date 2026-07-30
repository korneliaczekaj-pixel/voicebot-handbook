# Voicebot Specialist Handbook

## Czesc 6: Projektowanie dialogow i scenariuszy

Wersja robocza: 2026-07-29  
Kontynuacja plikow:

- `Voicebot_Specialist_Handbook_czesc_1.md`
- `Voicebot_Specialist_Handbook_czesc_2.md`
- `Voicebot_Specialist_Handbook_czesc_3.md`
- `Voicebot_Specialist_Handbook_czesc_4.md`
- `Voicebot_Specialist_Handbook_czesc_5.md`

---

# Czesc V. Projektowanie dialogow i scenariuszy

## Cel calej czesci

Ta czesc pokazuje, jak zamienic use case i wymagania biznesowe w konkretny projekt rozmowy. W praktyce voicebot nie sklada sie tylko z intencji i ladnych promptow. Sklada sie z kontrolowanej struktury dialogu: stanow, slotow, kontekstow, walidacji, potwierdzen, napraw, eskalacji, przerwan i integracji.

Po tej czesci czytelnik powinien umiec:

1. Projektowac intencje, encje, sloty i konteksty.
2. Budowac flow rozmowy dla happy path i unhappy paths.
3. Projektowac fallback path, escalation path i recovery.
4. Dobierac strategie potwierdzen do ryzyka.
5. Obslugiwac korekty, zmiane tematu, multi-intent i przerwania.
6. Tworzyc dialogi informacyjne, transakcyjne, sprzedazowe, windykacyjne, medyczne/rezerwacyjne i ankietowe.
7. Analizowac dobre i zle dialogi.
8. Dokumentowac scenariusz tak, aby mogl byc wdrozony, testowany i optymalizowany.

Zrodla wspierajace czesc:

- W3C VoiceXML 2.0: formularze, pola, gramatyki, menu, no-input, no-match, event handling, mixed initiative.
- Google Dialogflow CX i Amazon Lex: intencje, sloty/parametry, speech settings, interruption handling.
- LiveKit i OpenAI Realtime: realtime turns, interruption handling, cancellation, turn detection.
- Zrodla naukowe o turn-taking i przerwaniach: uzasadnienie projektowania korekt, przerwan, pauz i recovery.
- Uzupelnienie eksperckie: wzorce scenariuszy, strategie repair, matryce potwierdzen, praktyczne dialogi branzowe.

---

# Rozdzial 1. Intencje, encje, sloty i konteksty

## 1.1. Cele rozdzialu

Czytelnik nauczy sie:

- projektowac intencje jako cele uzytkownika, nie tematy firmowe;
- definiowac encje i sloty potrzebne do wykonania procesu;
- rozumiec role kontekstu w interpretacji wypowiedzi;
- unikac modeli intencji, ktore sa trudne do trenowania i utrzymania.

## 1.2. Kluczowe pojecia

| Pojecie | Definicja praktyczna | Typowe nieporozumienie |
|---|---|---|
| Intencja | Cel wypowiedzi uzytkownika, np. "zmien_termin_dostawy" | "Intencja to temat, np. dostawa" |
| Encja | Informacja wyodrebniona z wypowiedzi, np. data, numer, miasto | "Encja zawsze jest slotem" |
| Slot | Pole wymagane do wykonania zadania, np. numer zamowienia | "Slot musi byc podany w pierwszej wypowiedzi" |
| Kontekst | Stan rozmowy, ktory zmienia znaczenie wypowiedzi | "Kazda wypowiedz mozna interpretowac niezaleznie" |
| Utterance | Przykladowa wypowiedz uzytkownika | "Kilka sztucznych przykladow wystarczy" |
| Meta-intencja | Intencja sterujaca rozmowa, np. "konsultant", "powtorz", "anuluj" | "To nie jest prawdziwy use case, wiec nie trzeba jej modelowac" |

## 1.3. Wyjasnienie eksperckie

Intencja powinna odpowiadac temu, co uzytkownik chce osiagnac. Nie powinna byc kopia struktury organizacyjnej ani raportu contact center.

Zle intencje:

- `obsluga_klienta`
- `dostawa`
- `reklamacje`
- `inne`

Dobre intencje:

- `sprawdz_status_zamowienia`
- `zmien_adres_dostawy`
- `anuluj_zamowienie`
- `zloz_reklamacje_dostawy`
- `popros_o_konsultanta`
- `popraw_dane`
- `powtorz_ostatnia_informacje`

Encje i sloty sa powiazane, ale nie identyczne. Encja to cos, co system moze wykryc w wypowiedzi. Slot to informacja potrzebna procesowi.

Przyklad:

Uzytkownik: "Chce przelozyc dostawe na piatek po poludniu."

```text
intent: zmien_termin_dostawy
entities:
  date: piatek
  time_preference: po poludniu
slots:
  order_id: brak
  desired_delivery_date: piatek
  desired_time_window: afternoon
```

Kontekst decyduje, co znaczy krotka wypowiedz. "Tak" po pytaniu o anulowanie ma inny ciezar niz "tak" po pytaniu o wyslanie SMS-a. "Nie" moze oznaczac odmowe, korekte, sprzeciw, frustracje albo prosbe o cofniecie.

## 1.4. Perspektywa biznesowa

Model intencji jest operacyjna mapa procesow. Jesli intencje sa zbyt szerokie, raportowanie nie powie, czego chca klienci. Jesli sa zbyt waskie, model bedzie sie mylil, a utrzymanie stanie sie kosztowne.

Dobra struktura intencji pozwala:

- mierzyc powody kontaktu;
- projektowac handoff do wlasciwych kolejek;
- priorytetyzowac optymalizacje;
- laczyc dialog z procesem;
- rozpoznawac luki produktowe i operacyjne.

## 1.5. Perspektywa uzytkownika

Uzytkownik nie zna nazw intencji. Mowi potocznie:

- "gdzie jest moja paczka";
- "kurier nie przyjechal";
- "chce zmienic jutro na piatek";
- "nie, nie ten numer";
- "dajcie czlowieka";
- "ja juz to podawalem".

Bot powinien rozumiec cel mimo roznych sformulowan, ale nie powinien udawac pewnosci, gdy intencje sa podobne. Przy niepewnosci lepsze jest doprecyzowanie:

"Czy chce pan sprawdzic status przesylki, czy zmienic adres dostawy?"

## 1.6. Perspektywa technologiczna

Projekt intencji powinien zawierac:

- nazwe techniczna;
- nazwe biznesowa;
- definicje;
- zakres;
- poza zakresem;
- przyklady pozytywne;
- przyklady negatywne;
- wymagane sloty;
- opcjonalne sloty;
- encje;
- progi confidence;
- disambiguation;
- fallback;
- handoff conditions;
- metryki.

## 1.7. Dobre praktyki

- Projektuj intencje wokol akcji uzytkownika.
- Dodawaj meta-intencje: konsultant, anuluj, powtorz, stop, popraw, nie rozumiem.
- Nie tworz intencji, ktorych nie da sie odroznic w jezyku uzytkownika.
- Dla podobnych tematow rozważ jedna intencje plus slot typu problemu.
- Dokumentuj "poza zakresem" dla kazdej intencji.
- Zbieraj realne wypowiedzi z nagran i transkrypcji.
- Utrzymuj test set niezalezny od training set.

## 1.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Intencje wedlug dzialow firmy | Bot nie rozumie celu uzytkownika |
| Jedna intencja "reklamacja" | Brak akcji i slabe raportowanie |
| Zbyt wiele podobnych intencji | Confusion matrix pelna pomylek |
| Brak intencji korekty | Uzytkownik nie moze naprawic danych |
| Brak intencji konsultanta | Bot walczy z uzytkownikiem |
| Brak negatywnych przykladow | Model lapie wypowiedzi spoza zakresu |

## 1.9. Checklista intencji

- Czy intencja opisuje cel uzytkownika?
- Czy ma jasny zakres i poza zakresem?
- Czy ma przyklady realnych wypowiedzi?
- Czy ma przyklady negatywne?
- Czy wiadomo, jakie sloty sa potrzebne?
- Czy intencja jest odroznialna od innych?
- Czy istnieje strategia niskiego confidence?
- Czy istnieje handoff, jesli intencja jest poza zakresem?

## 1.10. Mini case study

Telekom mial osobne intencje: `brak_internetu`, `wolny_internet`, `problem_wifi`, `awaria_routera`. W praktyce uzytkownicy mowili podobnie: "internet nie dziala", "mam problem z netem", "wszystko mi przerywa". Model mylil intencje. Zespol polaczyl je w `problem_z_internetem`, a typ problemu zbieral jako slot w kolejnym kroku. Rozumienie na starcie wzroslo, a raportowanie nadal bylo mozliwe przez slot `problem_type`.

## 1.11. Cwiczenia

1. Zaprojektuj 12 intencji dla voicebota e-commerce.
2. Dla jednej intencji wpisz zakres i poza zakresem.
3. Wypisz 20 realnych fraz uzytkownika dla "zmiana adresu".
4. Zaprojektuj meta-intencje potrzebne w kazdym voicebocie.

## 1.12. Podsumowanie

Intencje, encje, sloty i konteksty sa fundamentem scenariusza. Dobre intencje sa blisko celu uzytkownika i procesu biznesowego. Zle intencje sa lista tematow, ktora dobrze wyglada w tabeli, ale zle dziala w rozmowie.

---

# Rozdzial 2. Flow, happy path, unhappy paths, fallback path i escalation path

## 2.1. Cele rozdzialu

Czytelnik nauczy sie:

- projektowac flow jako strukture stanow i przejsc;
- rozroznic happy path, unhappy path, fallback path i escalation path;
- dokumentowac warunki przejsc;
- unikac scenariuszy, ktore dzialaja tylko dla idealnego uzytkownika.

## 2.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Flow | Przebieg rozmowy w procesie |
| State | Stan rozmowy, np. "czekamy na numer zamowienia" |
| Transition | Przejscie miedzy stanami |
| Happy path | Idealna sciezka, gdy wszystko idzie zgodnie z planem |
| Unhappy path | Sciezka dla problemow przewidywalnych |
| Fallback path | Sciezka po niezrozumieniu, ciszy lub input poza zakresem |
| Escalation path | Sciezka przekazania do konsultanta lub innego procesu |

## 2.3. Wyjasnienie eksperckie

Happy path jest potrzebny, ale nie wystarcza. Realna rozmowa zawiera:

- brak danych;
- dane bledne;
- korekty;
- cisze;
- odpowiedzi spoza zakresu;
- zmiane celu;
- przerwania;
- timeouty integracji;
- emocje;
- prosbe o konsultanta.

Przyklad flow dla zmiany adresu:

```text
Start
  -> rozpoznaj intencje: zmien_adres_dostawy
  -> zweryfikuj klienta
  -> znajdz zamowienie
  -> sprawdz status zamowienia
      -> jesli wyslane: nie mozna zmienic, zaproponuj kontakt z kurierem/handoff
      -> jesli niewyslane: zbierz nowy adres
  -> waliduj adres
  -> potwierdz adres
  -> zapisz zmiane
  -> potwierdz wynik SMS-em
  -> zakoncz
```

Unhappy paths:

- klient niezweryfikowany;
- wiele zamowien;
- zamowienie juz wyslane;
- adres niepelny;
- integracja nie odpowiada;
- uzytkownik chce konsultanta.

## 2.4. Perspektywa biznesowa

Flow przeklada proces biznesowy na rozmowe. Jesli proces ma reguly, voicebot musi je znac:

- kiedy akcja jest dozwolona;
- kiedy potrzebna jest weryfikacja;
- kiedy trzeba potwierdzic;
- kiedy nie wolno automatyzowac;
- kiedy sprawa trafia do czlowieka.

Brak unhappy paths prowadzi do tego, ze bot dziala w demo, ale nie na produkcji.

## 2.5. Perspektywa uzytkownika

Uzytkownik nie powinien czuc, ze zboczyl ze scenariusza. Nawet jesli nie poda wszystkich danych, bot powinien pomoc:

"Potrzebuje jeszcze numeru domu. Jaki to numer?"

Zamiast:

"Adres niepoprawny. Prosze podac adres."

## 2.6. Perspektywa technologiczna

Flow powinien byc zapisany jako:

- stany;
- warunki wejscia;
- oczekiwane intencje;
- sloty;
- walidacje;
- integracje;
- przejscia;
- zdarzenia awaryjne;
- logi;
- metryki;
- test cases.

## 2.7. Dobre praktyki

- Projektuj happy path, ale testuj unhappy paths.
- Kazdy stan powinien miec wyjscie.
- Kazdy krytyczny slot powinien miec walidacje.
- Kazdy blad integracji powinien miec komunikat i plan.
- Escalation path projektuj od poczatku.
- Nie tworz petli bez limitu.
- Dokumentuj warunki przejsc.

## 2.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Projekt tylko happy path | Bot zawodzi przy pierwszym wyjatku |
| Brak limitu fallbackow | Petle frustracji |
| Brak wyjscia ze stanu | Uzytkownik utknie |
| Brak obslugi integracji | Martwa cisza lub zly komunikat |
| Brak flow dla wielu wynikow | Bot nie wie, ktore zamowienie wybrac |
| Brak escalation path | Automatyzacja blokuje sprawe |

## 2.9. Checklista flow

- Czy flow ma jasno okreslony start i koniec?
- Czy kazdy stan ma expected input?
- Czy kazdy stan ma no-input i no-match?
- Czy kazdy slot ma walidacje?
- Czy istnieja unhappy paths?
- Czy bledy API sa obslugiwane?
- Czy istnieje handoff?
- Czy petle maja limit?
- Czy flow ma test cases?

## 2.10. Mini case study

Voicebot rezerwacyjny mial happy path: uzytkownik podaje date, system rezerwuje termin. Na produkcji 30% rozmow dotyczylo terminow niedostepnych. Bot mowil tylko "termin niedostepny" i wracal do pytania. Po poprawie flow dodano proponowanie dwoch najblizszych terminow, mozliwosc zmiany lokalizacji i handoff dla pilnych spraw. Task completion wzrosl.

## 2.11. Cwiczenia

1. Narysuj flow dla statusu reklamacji.
2. Dodaj trzy unhappy paths.
3. Dodaj fallback path po no-match.
4. Dodaj escalation path po prosbie o konsultanta.

## 2.12. Podsumowanie

Flow to nie liniowy skrypt. To system decyzji. Dobry flow prowadzi uzytkownika przez proces, ale umie tez obslugiwac wyjatki, bledy i emocje bez utraty kontroli.

---

# Rozdzial 3. Repair strategies i confirmation strategies

## 3.1. Cele rozdzialu

Czytelnik nauczy sie:

- projektowac naprawe rozmowy po bledzie;
- dobierac potwierdzenia do ryzyka;
- odrozniac explicit i implicit confirmation;
- zmniejszac frustracje bez utraty kontroli procesu.

## 3.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Repair | Naprawa rozmowy po bledzie, nieporozumieniu lub braku danych |
| Self-repair | Uzytkownik sam poprawia wypowiedz |
| Other-initiated repair | Bot prosi o doprecyzowanie lub poprawke |
| Explicit confirmation | Bot pyta o potwierdzenie, np. "Czy sie zgadza?" |
| Implicit confirmation | Bot potwierdza i idzie dalej |
| Correction loop | Krotka sciezka poprawiania konkretnego slotu |
| Confidence threshold | Prog pewnosci wymagany do decyzji |

## 3.3. Wyjasnienie eksperckie

W rozmowie bledy sa normalne. Problemem nie jest to, ze bot czasem nie zrozumie. Problemem jest to, ze naprawa jest zla.

Zle repair:

Bot: "Nie zrozumialem. Prosze powtorzyc."  
Uzytkownik: "Juz mowilem, Kwiatowa 8."  
Bot: "Nie zrozumialem. Prosze powtorzyc."

Dobre repair:

Bot: "Nie mam pewnosci, czy numer domu to osiem czy osiemnaście. Ktory numer mam wpisac?"

Naprawa powinna zmniejszac przestrzen bledu. Zamiast prosic o powtorzenie wszystkiego, bot powinien wskazac, czego brakuje albo co jest niepewne.

## 3.4. Strategie repair

| Sytuacja | Strategia |
|---|---|
| Brak jednego slotu | Dopytaj tylko o brakujacy slot |
| Niepewna wartosc | Zapytaj o rozroznienie |
| Zle rozpoznana intencja | Disambiguation |
| Brak inputu | Powtorz krotko i daj przyklady |
| No-match | Zawęź opcje |
| Powtarzajacy sie blad | Zmien kanal, DTMF lub handoff |
| Frustracja | Skroc, uznaj problem, eskaluj |
| Korekta uzytkownika | Popraw konkretny slot i potwierdz |

## 3.5. Strategie potwierdzen

| Typ danych/akcji | Zalecana strategia |
|---|---|
| Informacja niskiego ryzyka | Brak potwierdzenia |
| Rozpoznanie intencji | Implicit confirmation |
| Data/godzina | Implicit lub explicit zalezne od skutku |
| Adres | Explicit przed zapisem |
| Numer sprawy | Potwierdzenie grupami lub powtorzenie |
| Platnosc | Explicit, jasne i zapisane |
| Anulowanie | Explicit |
| Zgoda prawna | Explicit lub procedura zgodna z compliance |
| Handoff | Krotkie potwierdzenie celu przekazania |

Przyklad implicit:

"Sprawdze status zamowienia. Prosze podac numer."

Przyklad explicit:

"Mam zmienic adres na Kwiatowa 8 mieszkania 12. Czy sie zgadza?"

## 3.6. Perspektywa biznesowa

Potwierdzenia maja koszt czasu, ale brak potwierdzen ma koszt bledow. Decyzja zalezy od:

- skutku akcji;
- odwracalnosci;
- ryzyka reklamacji;
- wymogow prawnych;
- pewnosci ASR/NLU;
- wartosci klienta;
- emocjonalnego kontekstu.

## 3.7. Perspektywa uzytkownika

Uzytkownik chce, aby bot:

- nie kazal powtarzac wszystkiego;
- jasno mowil, czego nie zrozumial;
- potwierdzal rzeczy wazne;
- nie potwierdzal kazdej oczywistosci;
- pozwalal poprawic blad.

Zbyt wiele potwierdzen brzmi jak brak kompetencji. Za malo potwierdzen brzmi jak ryzyko.

## 3.8. Perspektywa technologiczna

Repair i confirmation powinny korzystac z:

- ASR confidence;
- NLU confidence;
- slot validation;
- business risk level;
- fallback count;
- user frustration signals;
- transaction boundary;
- audit requirements.

W LLM voicebotach potwierdzenia musza byc kontrolowane przez flow, nie pozostawione stylowi modelu. Model moze sformulowac tekst, ale decyzja "czy potwierdzac" powinna byc deterministyczna.

## 3.9. Dobre praktyki

- Naprawiaj najmniejszy mozliwy fragment.
- Nie resetuj calego flow po bledzie jednego slotu.
- Potwierdzaj dane krytyczne.
- Nie potwierdzaj nadmiarowo danych niskiego ryzyka.
- Przy drugim bledzie zmien strategie.
- Przy trzecim bledzie rozważ handoff.
- Daj mozliwosc "popraw".
- Projektuj potwierdzenia pod TTS, szczegolnie liczby i adresy.

## 3.10. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| "Prosze powtorzyc" bez wskazania problemu | Frustracja |
| Potwierdzanie wszystkiego | Dlugie rozmowy |
| Brak potwierdzenia anulowania | Ryzyko reklamacji |
| Reset flow po korekcie | Uzytkownik traci cierpliwosc |
| Brak walidacji slotu | Bot potwierdza zle dane |
| LLM improwizuje potwierdzenia | Brak audytu i niespójność |

## 3.11. Checklista repair i confirmation

- Czy kazdy krytyczny slot ma strategie repair?
- Czy bot wskazuje, czego nie zrozumial?
- Czy potwierdzamy dane wysokiego ryzyka?
- Czy nie potwierdzamy niepotrzebnie danych niskiego ryzyka?
- Czy korekta dotyczy pojedynczego slotu?
- Czy jest limit prob?
- Czy po wielu bledach jest handoff?
- Czy potwierdzenia sa logowane?

## 3.12. Mini case study

Voicebot przyjmujacy reklamacje pytal o numer faktury. Gdy ASR nie rozpoznawal jednej cyfry, bot prosil o caly numer od nowa. Uzytkownicy sie irytowali. Po poprawie bot powtarzal numer grupami: "Mam FV 247, potem nie mam pewnosci, czy 8 czy 9. Prosze powtorzyc ostatnia cyfre." Czas zbierania danych spadl.

## 3.13. Cwiczenia

1. Zaprojektuj repair dla niepewnego adresu.
2. Wybierz strategie potwierdzenia dla pieciu typow danych.
3. Napisz komunikat po drugiej nieudanej probie.
4. Zaprojektuj korekte jednego slotu bez resetu flow.

## 3.14. Podsumowanie

Naprawa rozmowy jest jednym z najwazniejszych testow jakosci voicebota. Dobry bot nie musi rozumiec wszystkiego od razu. Musi umiec naprawiac szybko, konkretnie i bez obwiniania uzytkownika.

---

# Rozdzial 4. Disambiguation, multi-intent handling, interruptions i zmiana tematu

## 4.1. Cele rozdzialu

Czytelnik nauczy sie:

- projektowac doprecyzowanie przy niejednoznacznosci;
- obslugiwac wypowiedzi z wieloma intencjami;
- reagowac na zmiane tematu;
- projektowac przerwania w kontekscie aktywnego flow.

## 4.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Disambiguation | Doprecyzowanie, gdy system ma kilka mozliwych interpretacji |
| Multi-intent | Wypowiedz z wiecej niz jednym celem |
| Topic shift | Zmiana tematu rozmowy |
| Interruption | Przerwanie aktualnej tury lub flow |
| Context stack | Stos aktywnych tematow/procesow |
| Resume | Powrot do przerwanego procesu |

## 4.3. Wyjasnienie eksperckie

Uzytkownicy nie mowia wedlug jednego flow. Moga powiedziec:

"Chce zmienic adres, ale najpierw sprawdzcie, czy paczka juz wyszla."

To sa dwie intencje:

1. sprawdz status;
2. zmien adres.

Dobre multi-intent handling:

Bot: "Najpierw sprawdze status. Jesli paczka jeszcze nie wyszla, przejdziemy do adresu."

Zle:

Bot rozpoznaje tylko pierwsza intencje i ignoruje druga.

Disambiguation powinno byc krotkie i konkretne. Nie pytaj:

"Nie jestem pewien, o co chodzi."

Pytaj:

"Czy chce pan sprawdzic status przesylki, czy zmienic adres?"

## 4.4. Typy niejednoznacznosci

| Typ | Przyklad | Reakcja |
|---|---|---|
| Podobne intencje | "problem z faktura" | Zapytaj o korekte, platnosc, duplikat albo reklamacje |
| Niepelne dane | "w piatek" | Dopytaj, czy chodzi o termin wizyty czy dostawy |
| Wielu kandydatow | dwa zamowienia | Popros o wybor: "z poniedzialku czy z wczoraj?" |
| Sprzeczne dane | "jutro w zeszly piatek" | Popros o jedna date |
| Zmiana tematu | "a faktura?" | Zapytaj, czy zapisac obecna sprawe i przejsc do faktury |
| Przerwanie korekcyjne | "nie, inny adres" | Popraw slot i wroc do flow |

## 4.5. Perspektywa biznesowa

Multi-intent moze zwiekszyc skutecznosc, ale tez zlozonosc. Warto okreslic:

- ktore intencje mozna laczyc;
- ktore musza byc realizowane po kolei;
- ktore przerywaja aktualny flow;
- ktore wymagaja handoff;
- ktore sa zabronione w danym stanie.

Przyklad: w banku pytanie o saldo i zmiana limitu moga byc w jednej rozmowie, ale zmiana limitu wymaga weryfikacji i explicit confirmation. Nie nalezy wykonywac obu akcji jednym krokiem.

## 4.6. Perspektywa uzytkownika

Uzytkownik chce, aby bot rozumial naturalne laczenie spraw, ale potrzebuje kontroli:

"Moge najpierw sprawdzic status, a potem przejsc do faktury. Zaczynam od statusu."

Taki komunikat informuje o planie i zmniejsza niepewnosc.

## 4.7. Perspektywa technologiczna

Potrzebne mechanizmy:

- ranking intencji;
- confidence per intent;
- reguly priorytetu;
- context stack;
- partial completion;
- resume after interruption;
- state preservation;
- disambiguation prompts;
- logging unresolved ambiguity.

W LLM voicebotach model moze dobrze rozpoznac wiele intencji, ale flow nadal musi decydowac o kolejnosci i bezpieczenstwie.

## 4.8. Dobre praktyki

- Dopytuj wyborami binarnymi lub 2-3 opcjami.
- Nie wypisuj dlugiej listy mozliwych interpretacji.
- Informuj, co zrobisz najpierw.
- Zachowuj stan przerwanego procesu.
- Nie wykonuj wielu akcji krytycznych bez osobnych potwierdzen.
- Loguj zmiany tematu.
- Projektuj resume: "Wrocmy do zmiany adresu."

## 4.9. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Ignorowanie drugiej intencji | Uzytkownik powtarza |
| Wykonywanie wielu akcji bez planu | Ryzyko bledow |
| Dlugie pytania doprecyzowujace | Obciazenie poznawcze |
| Brak context stack | Bot gubi poprzedni cel |
| Brak resume | Uzytkownik musi zaczac od nowa |
| LLM decyduje o kolejnosci bez reguł | Nieprzewidywalnosc |

## 4.10. Checklista

- Czy system moze wykryc wiecej niz jedna intencje?
- Czy wiemy, ktore intencje maja priorytet?
- Czy mamy disambiguation dla podobnych intencji?
- Czy bot potrafi zapamietac przerwany flow?
- Czy bot potrafi wrocic do poprzedniego flow?
- Czy akcje krytyczne maja osobne potwierdzenia?
- Czy zmiana tematu jest logowana?

## 4.11. Mini case study

Klient dzwoni do operatora: "Nie dziala mi internet i chce sprawdzic ostatnia fakture." Pierwsza wersja bota obslugiwala tylko internet i ignorowala fakture. Klienci po diagnozie musieli zaczynac od nowa. Druga wersja tworzyla context stack: najpierw awaria, potem faktura. Bot mowil: "Zajme sie najpierw internetem. Potem moge sprawdzic fakture." Completion dla drugiej sprawy wzrosl.

## 4.12. Cwiczenia

1. Zaprojektuj disambiguation dla "problem z platnoscia".
2. Napisz dialog multi-intent: status zamowienia i faktura.
3. Zaprojektuj resume po przerwaniu flow.
4. Okresl priorytet intencji "konsultant".

## 4.13. Podsumowanie

Prawdziwi uzytkownicy nie trzymaja sie idealnego scenariusza. Dobre dialogi potrafia doprecyzowac, uporzadkowac kilka celow i wrocic do przerwanego procesu bez chaosu.

---

# Rozdzial 5. Dialogi transakcyjne

## 5.1. Cele rozdzialu

Czytelnik nauczy sie:

- projektowac dialogi, ktore wykonują akcje;
- odrozniac zbieranie danych od zatwierdzania transakcji;
- stosowac walidacje, potwierdzenia i granice transakcji;
- minimalizowac ryzyko bledow.

## 5.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Dialog transakcyjny | Rozmowa prowadzaca do wykonania akcji w systemie |
| Transaction boundary | Moment formalnego zatwierdzenia akcji |
| Validation | Sprawdzenie poprawnosci danych |
| Authorization | Sprawdzenie, czy uzytkownik moze wykonac akcje |
| Confirmation | Potwierdzenie przed wykonaniem lub po wykonaniu |
| Rollback | Cofniecie akcji, jesli mozliwe |

## 5.3. Wyjasnienie eksperckie

Dialog transakcyjny ma wysoka stawke, bo bot nie tylko informuje, ale zmienia stan systemu:

- rezerwuje termin;
- zmienia adres;
- anuluje zamowienie;
- tworzy reklamacje;
- resetuje haslo;
- zmienia limit;
- tworzy ticket.

Minimalna struktura:

```text
1. Rozpoznaj intencje.
2. Zweryfikuj uprawnienie.
3. Zbierz wymagane sloty.
4. Zweryfikuj dane.
5. Sprawdz reguly biznesowe.
6. Potwierdz akcje, jesli ryzyko tego wymaga.
7. Wykonaj akcje.
8. Potwierdz wynik.
9. Zapisz log/audyt.
10. Zakoncz lub zaproponuj kolejny krok.
```

## 5.4. Perspektywa biznesowa

Transakcje daja duza wartosc, bo realnie odciazaja konsultantow. Jednoczesnie wymagaja:

- jasnych reguł;
- odpowiedzialnosci za blad;
- audytu;
- bezpiecznej integracji;
- idempotency;
- potwierdzen;
- procedury awarii.

## 5.5. Perspektywa uzytkownika

Uzytkownik powinien wiedziec:

- co bot zamierza zrobic;
- czy akcja jest odwracalna;
- kiedy zostanie wykonana;
- jak dostanie potwierdzenie;
- co zrobic, jesli wynik jest zly.

Przyklad:

"Moge anulowac to zamowienie. Po anulowaniu nie bedzie mozna go przywrocic. Czy mam anulowac?"

## 5.6. Perspektywa technologiczna

Wymagania:

- identity verification;
- authorization;
- slot validation;
- API idempotency;
- transaction logging;
- error mapping;
- retry policy;
- rollback policy;
- confirmation event;
- audit trail.

## 5.7. Dobre praktyki

- Oddziel intencje od wykonania akcji.
- Potwierdzaj akcje nieodwracalne.
- Dziel dane dlugie na mniejsze sloty.
- Nie wykonuj akcji na podstawie niepewnej transkrypcji.
- Uzywaj idempotency.
- Po wykonaniu wyslij potwierdzenie SMS/e-mail, jesli potrzebne.
- Loguj kto, kiedy i co zatwierdzil.

## 5.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Brak granicy transakcji | Nie wiadomo, czy akcja byla tylko omawiana czy wykonana |
| Brak explicit confirmation | Bledne anulowania/zmiany |
| Brak idempotency | Duplikaty |
| Brak mapowania bledow API | Zly komunikat do uzytkownika |
| Zbyt duzo danych naraz | Bledy ASR i frustracja |

## 5.9. Checklista dialogu transakcyjnego

- Czy uzytkownik jest zweryfikowany?
- Czy bot ma uprawnienie do akcji?
- Czy wszystkie sloty sa zebrane?
- Czy dane sa walidowane?
- Czy akcja wymaga explicit confirmation?
- Czy wiadomo, kiedy akcja jest wykonana?
- Czy API jest idempotentne?
- Czy jest potwierdzenie po wykonaniu?
- Czy jest audyt?
- Czy jest fallback dla bledu API?

## 5.10. Dobry i zly dialog

### Zly

Bot: "Podaj nowy adres."  
Uzytkownik: "Kwiatowa 8."  
Bot: "Adres zmieniony."

Problemy: brak pelnego adresu, brak walidacji, brak potwierdzenia, brak informacji o zamowieniu.

### Dobry

Bot: "Moge zmienic adres dla zamowienia 12345, bo nie zostalo jeszcze wyslane. Jaki ma byc nowy adres?"  
Uzytkownik: "Kwiatowa 8 mieszkania 12, Warszawa."  
Bot: "Mam Kwiatowa 8 mieszkania 12, Warszawa. Czy zmienic adres na ten?"  
Uzytkownik: "Tak."  
Bot: "Gotowe. Adres zostal zmieniony. Potwierdzenie wyslalem SMS-em."

## 5.11. Cwiczenia

1. Zaprojektuj dialog zmiany terminu wizyty.
2. Wskaz transaction boundary.
3. Dodaj explicit confirmation.
4. Dodaj blad API i recovery.

## 5.12. Podsumowanie

Dialog transakcyjny wymaga dyscypliny. Nie wystarczy zrozumiec intencje. Trzeba zweryfikowac, zebrac dane, potwierdzic ryzykowne akcje, wykonac je bezpiecznie i jasno poinformowac o wyniku.

---

# Rozdzial 6. Dialogi informacyjne, sprzedazowe, windykacyjne, medyczne/rezerwacyjne i ankietowe

## 6.1. Cele rozdzialu

Czytelnik nauczy sie:

- dopasowywac strukture dialogu do typu sprawy;
- rozpoznawac specyficzne ryzyka branzowe;
- projektowac komunikaty dla roznych emocji i regulacji;
- tworzyc wzorce dialogowe dla kilku klas use case'ow.

## 6.2. Dialogi informacyjne

Cel: udzielic odpowiedzi lub wskazac dalszy krok.

Dobre dla:

- statusow;
- FAQ;
- godzin otwarcia;
- informacji o procedurze;
- dokumentow wymaganych do sprawy.

Zasady:

- odpowiadaj krotko;
- nie czytaj calej procedury;
- zaproponuj sprawdzenie indywidualnej sprawy, jesli mozliwe;
- wyslij link, jesli informacja jest dluga;
- jasno mow, gdy bot nie moze rozstrzygnac indywidualnej decyzji.

Przyklad:

Bot: "Zwrot zwykle trwa do 14 dni od przyjecia paczki. Moge tez sprawdzic status konkretnego zwrotu. Czy mam to zrobic?"

## 6.3. Dialogi sprzedazowe

Cel: zakwalifikowac potrzebe, udzielic informacji, umowic kontakt lub doprowadzic do bezpiecznej konwersji.

Ryzyka:

- presja;
- manipulacja;
- zbyt dlugie monologi;
- brak zgody na kontakt;
- obietnice poza zakresem;
- ignorowanie "nie".

Zasady:

- barge-in wlaczony;
- latwa rezygnacja;
- jasne warunki;
- brak udawania czlowieka;
- potwierdzenie zgody na kontakt;
- handoff dla zlozonych potrzeb.

Zly dialog:

Bot: "Zanim pan zrezygnuje, prosze wysluchac naszej wyjatkowej oferty..."

Dobry:

Bot: "Moge sprawdzic, czy jest dostepna lepsza oferta. Czy chce pan, zebym to zrobil?"

## 6.4. Dialogi windykacyjne

Cel: poinformowac o sprawie, zebrac deklaracje, wyjasnic opcje lub przekazac do czlowieka.

Ryzyka:

- stres finansowy;
- spory;
- compliance;
- agresja;
- wstyd;
- presja.

Zasady:

- ton spokojny i neutralny;
- bez moralizowania;
- szybka eskalacja przy sporze;
- jasne informowanie o opcjach;
- explicit confirmation dla deklaracji;
- unikanie fałszywej empatii.

Przyklad:

Bot: "Moge podac dostepne opcje platnosci albo polaczyc z konsultantem, jesli kwestionuje pan naleznosc. Co wybiera pan teraz?"

## 6.5. Dialogi medyczne i rezerwacyjne

Cel: umowic, przelozyc, potwierdzic wizyte, zebrac administracyjne informacje.

Ryzyka:

- uzytkownik moze traktowac bota jak doradce medycznego;
- sytuacje pilne;
- dane wrazliwe;
- osoby starsze;
- stres.

Zasady:

- nie diagnozuj;
- nie udzielaj porad medycznych poza zatwierdzonym zakresem;
- eskaluj pilne objawy zgodnie z procedura;
- potwierdzaj termin i lokalizacje;
- wysylaj SMS z potwierdzeniem;
- dawaj wolniejsze tempo i proste pytania.

Przyklad:

Bot: "Moge pomoc umowic lub przelozyc wizyte. Jesli to nagla sytuacja zdrowotna, prosze zadzwonic pod numer alarmowy albo skontaktowac sie z dyzurna pomoca medyczna."

## 6.6. Dialogi ankietowe

Cel: zebrac odpowiedzi po kontakcie, zakupie, wizycie lub usludze.

Ryzyka:

- zbyt dluga ankieta;
- brak zgody;
- skale trudne do zapamietania;
- uzytkownik nie wie, ile pytan zostalo;
- niska jakosc danych.

Zasady:

- informuj o liczbie pytan;
- uzywaj prostych skal;
- jedno pytanie naraz;
- pozwol przerwac;
- nie przeciagaj;
- nie lacz ankiety z nachalna sprzedaza.

Przyklad:

Bot: "Mam trzy krotkie pytania po wizycie. Pierwsze: w skali od 1 do 5, jak ocenia pani latwosc umowienia terminu?"

## 6.7. Tabela porownawcza typow dialogow

| Typ dialogu | Priorytet | Glowne ryzyko | Kluczowa praktyka |
|---|---|---|---|
| Informacyjny | Zrozumialosc | Zbyt dluga odpowiedz | Krotko + SMS/link |
| Transakcyjny | Poprawnosc akcji | Bledna zmiana | Walidacja + potwierdzenie |
| Sprzedazowy | Zgoda i kontrola | Presja | Latwe "nie" |
| Windykacyjny | Neutralnosc i compliance | Frustracja/spor | Szybki handoff |
| Medyczny/rezerwacyjny | Bezpieczenstwo | Porada poza zakresem | Jasne granice |
| Ankietowy | Jakosc danych | Zmeczenie | Krotka ankieta |

## 6.8. Checklista branzowa

- Czy typ dialogu ma zdefiniowany cel?
- Czy znamy emocjonalny kontekst?
- Czy znamy ryzyka prawne?
- Czy bot ma granice odpowiedzi?
- Czy handoff jest zaprojektowany?
- Czy komunikaty sa krotsze niz w kanale tekstowym?
- Czy akcje krytyczne sa potwierdzane?
- Czy bot moze bezpiecznie odmowic odpowiedzi?

## 6.9. Mini case study

Firma medyczna chciala dodac do bota rezerwacyjnego odpowiedzi na pytania o objawy. Zespol ograniczyl zakres: bot moze umawiac wizyty, przekladac terminy i informowac o przygotowaniu do badania na podstawie zatwierdzonych instrukcji. Nie interpretuje objawow. Dla fraz typu "silny bol w klatce" uruchamia komunikat awaryjny i eskalacje zgodnie z procedura. Zakres jest mniej efektowny, ale bezpieczny.

## 6.10. Cwiczenia

1. Napisz dialog informacyjny o zwrocie.
2. Napisz dialog sprzedazowy bez presji.
3. Zaprojektuj windykacyjny handoff przy sporze.
4. Zaprojektuj trzy pytania ankietowe w kanale glosowym.

## 6.11. Podsumowanie

Nie istnieje jeden styl dialogu dla wszystkich procesow. Dialog informacyjny, transakcyjny, sprzedazowy, windykacyjny, medyczny i ankietowy maja inne ryzyka, emocje i reguly. Voicebot Specialist musi projektowac pod kontekst, nie pod uniwersalny skrypt.

---

# Rozdzial 7. Kompletny przyklad scenariusza: zmiana terminu dostawy

## 7.1. Cele rozdzialu

Czytelnik zobaczy, jak polaczyc intencje, sloty, flow, potwierdzenia, fallbacki, przerwania, integracje i metryki w jednym scenariuszu.

## 7.2. Specyfikacja wysokiego poziomu

```text
Flow: zmiana_terminu_dostawy
Cel uzytkownika: przelozyc dostawe zamowienia
Cel biznesowy: automatycznie obsluzyc proste zmiany terminu przed wysylka
Zakres: zamowienia niewyslane, klient zweryfikowany, dostepne terminy w API
Poza zakresem: zamowienia wyslane, reklamacje, zmiana produktu, sporne statusy
Integracje: order API, delivery slots API, SMS confirmation
Handoff: zamowienie wyslane, API error, frustracja, prosba o konsultanta
```

## 7.3. Intencje

| Intencja | Definicja |
|---|---|
| `zmien_termin_dostawy` | Uzytkownik chce przelozyc dostawe |
| `sprawdz_status_zamowienia` | Uzytkownik chce wiedziec, gdzie jest zamowienie |
| `popraw_dane` | Uzytkownik poprawia date, numer, adres |
| `popros_o_konsultanta` | Uzytkownik chce czlowieka |
| `anuluj` | Uzytkownik rezygnuje z procesu |

## 7.4. Sloty

| Slot | Wymagany | Walidacja | Potwierdzenie |
|---|---|---|---|
| `customer_id` | Tak | Weryfikacja po telefonie/innym czynniku | Nie wypowiadac pelnych danych |
| `order_id` | Tak | Order API | Implicit |
| `desired_date` | Tak | Delivery slots API | Explicit przy zapisie |
| `desired_time_window` | Opcjonalny | Dostepnosc | Explicit przy zapisie |

## 7.5. Happy path

```text
Bot: Dzien dobry, jestem automatycznym asystentem firmy X. W czym moge pomoc przy zamowieniu?
User: Chce przelozyc dostawe.
Bot: Jasne. Sprawdze zamowienie. Prosze podac numer zamowienia.
User: 12345.
Bot: Znalazlem zamowienie 12345. Na jaki dzien chce pan przelozyc dostawe?
User: Na piatek.
Bot: W piatek sa dostepne godziny 10-12 albo 14-16. Ktora wybrac?
User: 14-16.
Bot: Mam zmienic dostawe na piatek, miedzy 14 a 16. Czy sie zgadza?
User: Tak.
Bot: Gotowe. Termin dostawy zostal zmieniony. Potwierdzenie wyslalem SMS-em.
```

## 7.6. Unhappy paths

### Zamowienie wyslane

Bot: "To zamowienie jest juz u kuriera, dlatego nie moge zmienic terminu w systemie. Moge podac kontakt do kuriera albo polaczyc z konsultantem."

### Brak dostepnego terminu

Bot: "W piatek nie ma juz wolnych okien dostawy. Najblizsze terminy to sobota 10-12 albo poniedzialek 14-16. Ktory wybiera pan?"

### API timeout

Bot: "Nie moge teraz sprawdzic dostepnych terminow. Moge utworzyc zgloszenie dla konsultanta albo wyslac link do samodzielnej zmiany."

### Korekta

User: "Nie, chodzilo mi o sobote."  
Bot: "Dobrze, sprawdzam sobote."

### Konsultant

User: "Polacz z czlowiekiem."  
Bot: "Jasne. Polacze z konsultantem i przekaze, ze chodzi o zmiane terminu dostawy zamowienia 12345."

## 7.7. Fallbacki

Pierwszy no-match przy dacie:

"Nie mam pewnosci, jaki dzien pan wybral. Prosze powiedziec na przykład: piatek albo poniedzialek."

Drugi no-match:

"Zeby nie przedluzac, moge polaczyc z konsultantem albo wyslac link do zmiany terminu SMS-em."

No-input:

"Prosze powiedziec, na jaki dzien chce pan przelozyc dostawe."

## 7.8. Polityka barge-in

| Prompt | Barge-in | Uzasadnienie |
|---|---|---|
| Powitanie | Tak | Uzytkownik moze od razu powiedziec cel |
| Odczyt dostepnych terminow | Tak | Uzytkownik moze wybrac przed koncem |
| Potwierdzenie finalne | Tak, ale wymaga jasnego "tak/nie" | Uzytkownik moze poprawic date |
| Komunikat po wykonaniu | Tak | Uzytkownik moze zapytac o cos jeszcze |

## 7.9. Metryki

- task completion rate;
- fallback rate przy dacie;
- no-input rate;
- API timeout rate;
- correction rate;
- barge-in recovery success;
- handoff rate;
- repeat contact w ciagu 48h;
- CSAT po zmianie terminu.

## 7.10. QA cases

- happy path;
- data niedostepna;
- zamowienie wyslane;
- wiele zamowien;
- korekta daty;
- przerwanie podczas listy terminow;
- brak inputu;
- no-match;
- prosba o konsultanta;
- API timeout;
- uzytkownik sfrustrowany.

## 7.11. Podsumowanie

Kompletny scenariusz laczy tresc rozmowy z logika biznesowa, integracjami, barge-in, fallbackami, handoff i metrykami. Dopiero taki dokument jest gotowy do wdrozenia.

---

# 8. Zbiorcza checklista po Czesci V

- Czy intencje opisuja cele uzytkownika?
- Czy kazda intencja ma zakres i poza zakresem?
- Czy sloty sa powiazane z realnym procesem?
- Czy kontekst zmienia interpretacje krotkich odpowiedzi?
- Czy flow zawiera happy path i unhappy paths?
- Czy kazdy stan ma wyjscie?
- Czy fallbacki sa specyficzne dla kroku?
- Czy eskalacja jest zaprojektowana od poczatku?
- Czy repair naprawia najmniejszy mozliwy fragment?
- Czy potwierdzenia sa dobrane do ryzyka?
- Czy system obsluguje multi-intent i zmiane tematu?
- Czy przerwania nie resetuja calego flow?
- Czy dialog transakcyjny ma transaction boundary?
- Czy scenariusz zawiera metryki i QA cases?

---

# 9. Co bedzie w kolejnej czesci

Kolejna czesc powinna opracowac **Czesc VI. Dane, trening i jakosc rozumienia**:

1. Zbieranie danych i transkrypcje.
2. Dane treningowe, frazy uzytkownikow, klasy intencji i encje.
3. Slowniki, synonimy, dane syntetyczne i balans danych.
4. Bledy etykietowania.
5. Jakosc ASR: akcenty, halas, tempo, osoby starsze, wady wymowy.
6. Testowanie NLU: confusion matrix, precision, recall, F1.
7. Continuous training i analiza nierozpoznanych wypowiedzi.

