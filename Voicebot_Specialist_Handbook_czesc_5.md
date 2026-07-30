# Voicebot Specialist Handbook

## Czesc 5: Analiza biznesowa i wybor use case'ow

Wersja robocza: 2026-07-29  
Kontynuacja plikow:

- `Voicebot_Specialist_Handbook_czesc_1.md`
- `Voicebot_Specialist_Handbook_czesc_2.md`
- `Voicebot_Specialist_Handbook_czesc_3.md`
- `Voicebot_Specialist_Handbook_czesc_4.md`

---

# Czesc IV. Analiza biznesowa i wybor use case'ow

## Cel calej czesci

Najwieksze porazki voicebotow rzadko zaczynaja sie od zlego modelu. Czesto zaczynaja sie od zlego wyboru problemu. Firma chce "wdrozyc AI", ale nie wie, ktore rozmowy warto automatyzowac, gdzie sa dane, jaki jest koszt bledu, jakie integracje sa potrzebne i co bedzie oznaczac sukces.

Ta czesc pokazuje, jak przeprowadzic analize biznesowa przed projektowaniem dialogow i architektury.

Po tej czesci czytelnik powinien umiec:

1. Analizowac procesy contact center.
2. Rozpoznac dobry i zly use case dla voicebota.
3. Oceniac automatyzowalnosc procesu.
4. Liczyc potencjalna wartosc biznesowa i ROI.
5. Zidentyfikowac ryzyka operacyjne, prawne, UX i technologiczne.
6. Przygotowac brief projektu voicebota.
7. Zebrac wymagania od interesariuszy.
8. Stworzyc business case i matryce priorytetyzacji use case'ow.

Zrodla wspierajace czesc:

- Dokumentacje platform enterprise, szczegolnie AWS Connect, Google Dialogflow CX i Amazon Lex, jako zrodla dotyczace praktycznych parametrow obslugi, timeoutow, intentow, slotow, integracji i handoff.
- W3C VoiceXML jako zrodlo historycznego myslenia o formularzach, menu, eventach, no-input/no-match i procesach dialogowych.
- Zrodla branzowe i badawcze o przerwaniach oraz psychologii rozmowy jako uzasadnienie, dlaczego biznesowa analiza musi obejmowac emocje, poczucie kontroli i ryzyko frustracji.
- Uzupelnienie eksperckie: matryce decyzyjne, ROI, discovery, warsztaty, analiza danych contact center i brief wdrozeniowy.

---

# Rozdzial 1. Analiza procesow contact center

## 1.1. Cele rozdzialu

Czytelnik nauczy sie:

- rozumiec, jak dziala contact center jako system operacyjny;
- analizowac rozmowy telefoniczne wedlug powodow kontaktu, wolumenow, kosztow i wynikow;
- odrozniac problem klienta od struktury kolejek;
- przygotowac dane potrzebne do wyboru use case'u.

## 1.2. Kluczowe pojecia

| Pojecie | Definicja praktyczna |
|---|---|
| Contact reason | Powod kontaktu klienta, np. status zamowienia, reklamacja, platnosc |
| Call driver | Czynnik generujacy polaczenia, np. opoznienia dostaw |
| Queue | Kolejka obslugi w contact center |
| AHT | Average Handling Time, sredni czas obslugi |
| FCR | First Contact Resolution, rozwiazanie sprawy przy pierwszym kontakcie |
| Repeat contact | Ponowny kontakt w tej samej lub powiazanej sprawie |
| Abandonment | Porzucenie polaczenia przed obsluga |
| Wrap-up code | Kod/etykieta nadawana po rozmowie przez konsultanta |
| After-call work | Praca konsultanta po rozmowie, np. notatka, ticket |

## 1.3. Wyjasnienie eksperckie

Analiza contact center zaczyna sie od prostego pytania:

"Dlaczego ludzie dzwonia?"

Ale dobra analiza idzie dalej:

1. Ile jest rozmow danego typu?
2. Jak dlugo trwaja?
3. Ile razy klient dzwoni ponownie?
4. Jakie dane konsultant musi sprawdzic?
5. Jakie akcje konsultant wykonuje?
6. Jakie sa wyjatki?
7. Gdzie rozmowa sie psuje?
8. Czy klient jest zwykle spokojny, czy zdenerwowany?
9. Czy sprawa wymaga decyzji czlowieka?
10. Czy systemy backendowe wspieraja automatyzacje?

Wazne: kolejka contact center nie zawsze odpowiada prawdziwemu powodowi kontaktu. Kolejka "obsluga klienta" moze zawierac statusy zamowien, zwroty, reklamacje, faktury, pytania o konto i prosby o konsultanta. Voicebot musi byc projektowany wedlug powodow kontaktu, nie tylko wedlug kolejek.

## 1.4. Perspektywa biznesowa

Dane contact center pomagaja oszacowac:

- potencjal automatyzacji;
- wartosc kosztowa;
- wplyw na SLA;
- wplyw na obciazenie konsultantow;
- sezonowosc;
- priorytet wdrozenia;
- ryzyko operacyjne.

Minimalne dane do analizy:

| Dane | Po co sa potrzebne |
|---|---|
| Liczba rozmow per powod kontaktu | Priorytetyzacja wolumenu |
| AHT per powod | Szacunek kosztu |
| Transfer rate | Wykrycie zlozonosci |
| Repeat contact | Ocena realnego rozwiazania sprawy |
| Abandonment | Identyfikacja problemow dostepnosci |
| CSAT/NPS | Ocena doswiadczenia |
| Wrap-up codes | Wstepna klasyfikacja tematow |
| Nagrania/transkrypcje | Realny jezyk klientow |
| After-call work | Potencjal automatyzacji po rozmowie |

## 1.5. Perspektywa uzytkownika

Analiza procesu nie moze patrzec tylko oczami firmy. Powod kontaktu w systemie moze brzmiec "status zamowienia", ale motyw uzytkownika moze byc:

- "paczka nie przyszla, a mialem ja dostac";
- "nie wiem, czy prezent dotrze na czas";
- "kurier twierdzi, ze mnie nie bylo";
- "chce zmienic adres, zanim bedzie za pozno";
- "jestem zdenerwowany, bo to kolejny problem".

Ten sam use case ma rozne warianty emocjonalne. Dobry voicebot musi obslugiwac nie tylko informacyjny status, ale tez korekte, frustracje i eskalacje.

## 1.6. Perspektywa technologiczna

Do analizy automatyzacji trzeba zmapowac:

- skad konsultant bierze dane;
- jakie systemy otwiera;
- czy systemy maja API;
- czy dane sa aktualne;
- jakie sa bledy i braki danych;
- czy trzeba weryfikowac uzytkownika;
- jakie akcje sa zapisywane;
- czy akcje sa odwracalne;
- jakie dane musza trafic do logow, ticketow i CRM.

## 1.7. Dobre praktyki

- Analizuj nagrania i transkrypcje, nie tylko raporty.
- Weryfikuj wrap-up codes, bo konsultanci czesto uzywaja ich niespojnie.
- Patrz na repeat contact, nie tylko AHT.
- Oddziel sprawy informacyjne od transakcyjnych.
- Mapuj emocjonalny kontekst kontaktu.
- Rozmawiaj z konsultantami, nie tylko z menedzerami.
- Sprawdz, co konsultant robi po rozmowie.
- Szukaj procesow, gdzie bot moze wykonac akcje, nie tylko udzielic informacji.

## 1.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Wybieranie use case'u na podstawie opinii sponsora | Automatyzacja nie tego problemu |
| Zaufanie tylko do wrap-up codes | Zly obraz powodow kontaktu |
| Pomijanie repeat contact | Pozorny sukces automatyzacji |
| Brak analizy nagran | Bot nie zna realnego jezyka klientow |
| Pomijanie pracy po rozmowie | Niedoszacowanie wartosci automatyzacji |
| Analiza kolejek zamiast powodow kontaktu | Zly model intencji |

## 1.9. Checklista analizy contact center

- Czy mamy dane o wolumenie rozmow?
- Czy znamy AHT per powod kontaktu?
- Czy mamy repeat contact?
- Czy mamy abandonment?
- Czy mamy CSAT lub inna miare jakosci?
- Czy mamy nagrania lub transkrypcje?
- Czy znamy prace konsultanta po rozmowie?
- Czy znamy systemy, z ktorych korzysta konsultant?
- Czy znamy typowe wyjatki?
- Czy rozmawialismy z konsultantami?

## 1.10. Mini case study

Firma e-commerce wskazala "reklamacje" jako najwiekszy obszar automatyzacji, bo mial najdluzszy AHT. Analiza nagran pokazala jednak, ze "status zamowienia" mial cztery razy wiekszy wolumen i wysoki repeat contact, bo klienci nie ufali informacjom e-mail. Wdrozenie voicebota do statusu i zmiany adresu dalo szybszy efekt niz automatyzacja reklamacji. Reklamacje pozostaly w planie, ale jako drugi etap z czesciowym wsparciem konsultanta.

## 1.11. Cwiczenia

1. Przygotuj liste danych potrzebnych od contact center.
2. Wybierz jedna kolejke i rozbij ja na powody kontaktu.
3. Wskaz trzy miejsca, gdzie wrap-up codes moga klamac.
4. Opisz, co konsultant robi po rozmowie i czy bot moze to zautomatyzowac.

## 1.12. Podsumowanie

Analiza contact center to podstawa dobrego wyboru use case'u. Bez niej projekt voicebota opiera sie na intuicji, a intuicja czesto prowadzi do automatyzacji procesu, ktory jest glosny politycznie, ale nie najwazniejszy operacyjnie.

---

# Rozdzial 2. Jak rozpoznac dobry use case dla voicebota

## 2.1. Cele rozdzialu

Czytelnik nauczy sie:

- rozpoznawac cechy dobrego use case'u;
- odrozniac use case latwy, sredni i ryzykowny;
- oceniac dopasowanie kanalu glosowego;
- unikac automatyzacji procesow, ktore powinny pozostac u czlowieka lub w innym kanale.

## 2.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Use case | Konkretny przypadek uzycia voicebota w okreslonym procesie |
| Candidate use case | Kandydat do automatyzacji |
| MVP use case | Zakres pierwszej wersji wdrozenia |
| Automation fit | Dopasowanie procesu do automatyzacji |
| Voice fit | Dopasowanie procesu do kanalu glosowego |
| Risk profile | Profil ryzyka biznesowego, prawnego, technicznego i UX |

## 2.3. Wyjasnienie eksperckie

Dobry use case dla pierwszego voicebota ma zwykle cechy:

1. Wysoki wolumen.
2. Powtarzalny przebieg.
3. Jasny cel uzytkownika.
4. Niewielka liczba wymaganych danych.
5. Dostepne integracje lub mozliwosc bezpiecznego ticketu.
6. Niski lub kontrolowalny koszt bledu.
7. Mozliwy szybki handoff.
8. Dane historyczne do projektowania i testow.
9. Mierzalny wynik.
10. Akceptowalny poziom emocji.

Nie oznacza to, ze voicebot nie moze kiedys obslugiwac trudnych procesow. Oznacza to, ze pierwszy use case powinien budowac zaufanie i dane, nie testowac granice organizacji.

## 2.4. Klasy use case'ow

| Klasa | Charakterystyka | Przyklady | Rekomendacja |
|---|---|---|---|
| Latwy | Informacyjny, powtarzalny, niski koszt bledu | Status zamowienia, godziny otwarcia, status zgloszenia | Dobry na start |
| Sredni | Transakcyjny, wymaga integracji i walidacji | Zmiana terminu, rezerwacja, reset hasla | Dobry po discovery |
| Trudny | Wiele wyjatkow, emocje, compliance | Reklamacje, windykacja, decyzje finansowe | Ostroznie, czesto hybrydowo |
| Bardzo ryzykowny | Dane wrazliwe, decyzje medyczne/prawne, kryzys | Porady medyczne, decyzje kredytowe, sytuacje zagrozenia | Zwykle nie jako automatyzacja end-to-end |

## 2.5. Perspektywa biznesowa

Dobry use case ma nie tylko potencjal oszczednosci. Ma:

- jasnego wlasciciela;
- zdefiniowany wynik;
- dane do pomiaru przed i po;
- gotowosc operacyjna;
- akceptacje contact center;
- dostepne systemy;
- plan utrzymania.

Use case bez wlasciciela biznesowego szybko zostaje "projektem AI", ktory nikt nie utrzymuje.

## 2.6. Perspektywa uzytkownika

Dla uzytkownika dobry use case to taki, w ktorym voicebot:

- skraca droge;
- nie wymaga czytania ekranu;
- nie zmusza do sluchania wielu opcji;
- nie odbiera kontroli;
- pozwala szybko poprawic;
- daje czlowieka, gdy sprawa jest nietypowa.

Proces moze byc atrakcyjny dla firmy, ale zly dla uzytkownika. Przyklad: dlugie odczytywanie regulaminu glosem, ktore firma chce automatyzowac, ale uzytkownik wolalby dostac link.

## 2.7. Perspektywa technologiczna

Technologicznie dobry use case:

- ma jasne intencje;
- ma encje mozliwe do zebrania glosem;
- ma system zrodlowy;
- ma API lub obejscie procesowe;
- ma jasne bledy integracji;
- ma niezbyt duzo wariantow wyjatkowych;
- ma mozliwy tryb testowy;
- nie wymaga od ASR perfekcyjnego rozpoznania trudnych danych bez fallbacku.

## 2.8. Dobre praktyki

- Zaczynaj od use case'u, ktory ma mierzalny wynik.
- Unikaj na start procesow z wysoka emocjonalnoscia.
- Upewnij sie, ze bot moze realnie wykonac akcje.
- Sprawdz, czy kanal glosowy pomaga uzytkownikowi.
- Uwzglednij handoff od poczatku.
- Wybierz MVP z ograniczonym, ale wartosciowym zakresem.
- Zdefiniuj "poza zakresem".

## 2.9. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| "Najpierw zrobmy najtrudniejszy proces" | Dlugie wdrozenie i duze ryzyko porazki |
| Brak definicji wyniku | Nie wiadomo, czy bot dziala |
| Use case bez integracji | Bot tylko odsyla |
| Proces z wieloma wyjatkami jako MVP | Chaos scenariuszy |
| Brak handoff | Uzytkownik utknie |
| Automatyzacja procesu, ktory lepiej dziala w formularzu | Gorsze UX |

## 2.10. Checklista dobrego use case'u

- Czy problem wystepuje czesto?
- Czy uzytkownik ma jasny cel?
- Czy rozmowa glosowa jest dobrym kanalem?
- Czy proces jest powtarzalny?
- Czy mamy dane historyczne?
- Czy mamy integracje?
- Czy koszt bledu jest akceptowalny?
- Czy jest szybki handoff?
- Czy sukces da sie zmierzyc?
- Czy zakres MVP jest ograniczony?

## 2.11. Mini case study

Siec klinik rozwaza voicebota do "obslugi pacjentow". Po analizie wybrano MVP: potwierdzanie i przekladanie wizyt. Proces ma wysoki wolumen, jasne intencje, integracje z kalendarzem i niski koszt bledu, jesli bot potwierdza termin SMS-em. Pytania medyczne zostaly poza zakresem i trafiaja do czlowieka. To dobry use case, bo laczy wartosc biznesowa i bezpieczny zakres.

## 2.12. Cwiczenia

1. Wybierz trzy kandydaty use case'ow i oznacz je jako latwe/srednie/trudne.
2. Wskaz, ktory najlepiej nadaje sie na MVP.
3. Dla wybranego use case'u opisz zakres i poza zakresem.
4. Wypisz warunki, ktore automatycznie prowadza do konsultanta.

## 2.13. Podsumowanie

Dobry use case nie jest najbardziej efektowny. Jest wystarczajaco wartosciowy, powtarzalny, mierzalny i bezpieczny, aby organizacja mogla nauczyc sie automatyzacji bez niszczenia zaufania klientow.

---

# Rozdzial 3. Ocena automatyzowalnosci procesu

## 3.1. Cele rozdzialu

Czytelnik nauczy sie:

- oceniac, czy proces nadaje sie do automatyzacji;
- rozkladac proces na kroki i decyzje;
- identyfikowac miejsca wymagajace czlowieka;
- uzywac matrycy automatyzowalnosci.

## 3.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Automatyzowalnosc | Stopien, w jakim proces moze byc wykonany przez system |
| Deterministycznosc | Czy decyzje sa oparte na jasnych regułach |
| Exception rate | Odsetek spraw nietypowych |
| Human judgment | Ocena wymagajaca doswiadczenia, empatii lub odpowiedzialnosci |
| Data availability | Dostepnosc danych potrzebnych do procesu |
| Reversibility | Mozliwosc cofniecia akcji |

## 3.3. Wyjasnienie eksperckie

Proces nadaje sie do automatyzacji, gdy:

- ma powtarzalne kroki;
- decyzje sa oparte na danych i regułach;
- wymagane informacje da sie zebrac glosem;
- dane sa dostepne;
- bledy mozna wykryc lub odwrócić;
- wyjatki mozna przekazac do czlowieka;
- wynik mozna mierzyc.

Proces slabo nadaje sie do automatyzacji, gdy:

- wymaga negocjacji;
- wymaga oceny moralnej/prawnej/medycznej;
- ma duzo wyjatkow;
- dane sa niespojnie zapisane;
- koszt bledu jest wysoki;
- uzytkownik jest zwykle w silnych emocjach;
- proces zmienia sie czesto i nie ma wlasciciela.

## 3.4. Matryca automatyzowalnosci procesu

Skala 1-5, gdzie 5 oznacza najlepsze dopasowanie do automatyzacji.

| Kryterium | 1 punkt | 3 punkty | 5 punktow |
|---|---|---|---|
| Powtarzalnosc | Kazda sprawa inna | Kilka typowych wariantow | Bardzo podobne rozmowy |
| Jasnosc celu | Uzytkownicy nie wiedza, czego chca | Cel czesciowo jasny | Cel latwy do rozpoznania |
| Dane | Brak danych/systemow | Dane sa, ale niespojnie | Dane sa dostepne przez API |
| Reguly | Decyzje uznaniowe | Czesciowo regułowe | Jasne reguly |
| Wyjatki | Wiele wyjatkow | Umiarkowanie | Niewiele |
| Koszt bledu | Wysoki | Sredni | Niski lub odwracalny |
| Kanal glosowy | Glos przeszkadza | Glos wystarcza | Glos jest wygodny |
| Emocje | Wysokie | Srednie | Niskie |
| Handoff | Trudny | Mozliwy | Latwy i szybki |
| Pomiar sukcesu | Niejasny | Czesciowy | Jasny i mierzalny |

Interpretacja:

- 42-50: bardzo dobry kandydat.
- 34-41: dobry kandydat po doprecyzowaniu.
- 25-33: mozliwy pilot, ale z ryzykami.
- 15-24: raczej nie jako MVP.
- Ponizej 15: nie automatyzowac end-to-end.

## 3.5. Perspektywa biznesowa

Automatyzowalnosc nie oznacza, ze 100% spraw obsluzy bot. Dojrzala automatyzacja czesto zaklada:

- 60-80% prostych przypadkow automatycznie;
- 10-30% przypadkow z czesciowa automatyzacja i handoff;
- kilka procent przypadkow od razu do czlowieka.

Pytanie nie brzmi: "Czy bot obsluzy wszystko?". Brzmi: "Ktora czesc procesu mozna bezpiecznie i sensownie przeniesc do automatyzacji?".

## 3.6. Perspektywa uzytkownika

Automatyzacja powinna zmniejszac wysilek uzytkownika. Jesli bot wymaga wiecej krokow niz konsultant lub formularz, use case jest zle zaprojektowany.

Dobry test:

"Czy uzytkownik po rozmowie z botem powie: to bylo szybkie, czy: firma nie chciala ze mna rozmawiac?"

## 3.7. Perspektywa technologiczna

Technologia ocenia automatyzowalnosc przez:

- jak trudne sa dane do rozpoznania przez ASR;
- czy intencje sa rozroznialne;
- czy sloty sa walidowalne;
- czy API wspiera proces;
- czy mozna zachowac stan;
- czy mozna wykonac akcje idempotentnie;
- czy jest sandbox;
- czy monitoring wykryje bledy.

## 3.8. Dobre praktyki

- Oceniaj proces krok po kroku.
- Nie automatyzuj decyzji, jesli mozna automatyzowac przygotowanie danych dla czlowieka.
- Dla ryzykownych procesow stosuj human-in-the-loop.
- Oddziel automatyzacje rozmowy od automatyzacji decyzji.
- Wybieraj zakres MVP jako podzbior procesu.
- Ustal progi confidence i handoff.

## 3.9. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Ocena procesu jako calosci | Pomija czesci, ktore da sie automatyzowac |
| Automatyzacja decyzji uznaniowych | Ryzyko skarg i compliance |
| Brak oceny kosztu bledu | Zbyt ryzykowny zakres |
| Brak handoff dla wyjatkow | Bot blokuje sprawe |
| Zakladanie idealnych danych | Produkcja zaskakuje |

## 3.10. Checklista automatyzowalnosci

- Czy proces ma powtarzalne kroki?
- Czy decyzje sa regułowe?
- Czy potrzebne dane sa dostepne?
- Czy dane mozna zebrac glosem?
- Czy wyjatki sa znane?
- Czy blad jest odwracalny?
- Czy handoff jest mozliwy?
- Czy sukces jest mierzalny?
- Czy istnieje wlasciciel procesu?
- Czy zakres MVP mozna ograniczyc?

## 3.11. Mini case study

Firma leasingowa chce automatyzowac zmiane danych umowy. Pelny proces jest ryzykowny, bo niektore zmiany wymagaja aneksu i oceny prawnej. Analiza automatyzowalnosci dzieli proces: bot moze zebrac typ zmiany, zweryfikowac klienta, sprawdzic wymagane dokumenty i utworzyc ticket. Sama decyzja i aneks pozostaja u konsultanta. Automatyzacja czesciowa daje wartosc bez ryzyka pelnej automatycznej decyzji.

## 3.12. Cwiczenia

1. Ocen jeden proces matryca automatyzowalnosci.
2. Podziel proces na kroki automatyczne i ludzkie.
3. Wskaz koszt bledu dla kazdego kroku.
4. Zaprojektuj human-in-the-loop dla decyzji ryzykownej.

## 3.13. Podsumowanie

Automatyzowalnosc to nie zero-jedynkowa cecha procesu. Najczesciej automatyzuje sie fragmenty: identyfikacje, klasyfikacje, zebranie danych, sprawdzenie statusu, utworzenie ticketu, podsumowanie. Dobra analiza znajduje bezpieczny zakres, nie forsuje pelnej automatyzacji.

---

# Rozdzial 4. Wartosc biznesowa, metryki i ROI

## 4.1. Cele rozdzialu

Czytelnik nauczy sie:

- liczyc potencjalna wartosc voicebota;
- rozumiec metryki biznesowe przed wdrozeniem;
- unikac naiwnych kalkulacji ROI;
- laczyc metryki kosztowe z jakosciowymi.

## 4.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| ROI | Return on Investment, zwrot z inwestycji |
| Cost per contact | Koszt pojedynczego kontaktu |
| Deflection | Przeniesienie kontaktu z konsultanta do automatyzacji |
| Containment | Rozmowa zakonczona bez konsultanta |
| Task completion | Sprawa zakonczona sukcesem |
| Assisted automation | Bot wspiera czlowieka, ale nie obsluguje end-to-end |
| Opportunity cost | Koszt utraconych mozliwosci lub czasu konsultantow |

## 4.3. Wyjasnienie eksperckie

Prosty model ROI:

```text
Wartosc miesieczna =
  liczba rozmow kwalifikujacych sie do automatyzacji
  x oczekiwany task completion
  x koszt rozmowy konsultanta
  - koszt rozmow bota
  - koszt utrzymania
```

Ale ten model jest za prosty, jesli nie uwzglednia:

- repeat contact;
- kosztow wdrozenia;
- kosztow integracji;
- kosztow utrzymania bazy wiedzy;
- kosztow optymalizacji;
- kosztow licencji/minut/tokenow;
- kosztow QA;
- wplywu na CSAT;
- wplywu na konsultantow;
- kosztu bledow i reklamacji.

Lepsza kalkulacja rozroznia:

1. Oszczednosc bezposrednia: mniej rozmow u konsultantow.
2. Oszczednosc posrednia: krotsze rozmowy dzieki prekwalifikacji i podsumowaniom.
3. Wartosc jakosciowa: lepsza dostepnosc, mniej porzuconych polaczen.
4. Wartosc danych: lepsze tagowanie powodow kontaktu.
5. Koszty stale i zmienne.
6. Ryzyka i koszt niepowodzenia.

## 4.4. Perspektywa biznesowa

Metryki przed wdrozeniem:

- wolumen rozmow;
- AHT;
- koszt minuty/kontaktu;
- FCR;
- repeat contact;
- abandonment;
- SLA;
- transfer rate;
- CSAT;
- after-call work;
- sezonowosc;
- koszt nadgodzin lub outsourcingu.

Metryki po wdrozeniu:

- task completion rate;
- automation rate;
- containment rate;
- escalation rate;
- fallback rate;
- repeat contact po rozmowie z botem;
- CSAT dla bota;
- koszt rozmowy bota;
- koszt utrzymania;
- liczba ticketow poprawnie utworzonych;
- jakosc handoff.

## 4.5. Perspektywa uzytkownika

ROI nie moze byc osiagany przez pogorszenie doswiadczenia. Jesli bot zatrzymuje klienta, ale nie rozwiazuje sprawy, firma przenosi koszt na uzytkownika.

Dlatego w business case trzeba dodac metryki ochronne:

- repeat contact;
- abandonment po rozmowie z botem;
- prosby o konsultanta;
- negatywne feedbacki;
- skargi;
- czas do rozwiazania sprawy;
- customer effort score.

## 4.6. Perspektywa technologiczna

Koszty technologiczne:

- platforma voicebotowa;
- telefonia/minuty;
- ASR;
- TTS;
- LLM tokeny/audio;
- RAG/hosting bazy wiedzy;
- integracje;
- monitoring;
- storage nagran/transkrypcji;
- QA i testy regresji;
- development i utrzymanie.

W generatywnych voicebotach koszt moze rosnac z dlugoscia wypowiedzi. Conversation design wplywa wiec bezposrednio na koszt.

## 4.7. Dobre praktyki

- Licz ROI konserwatywnie.
- Uzywaj task completion, nie samego containment.
- Uwzgledniaj repeat contact.
- Oddziel deflection od skutecznej automatyzacji.
- Licz koszt utrzymania po wdrozeniu.
- Uwzgledniaj koszty tokenow/minut.
- Dodaj metryki ochronne UX i compliance.
- Porownuj wyniki z baseline sprzed wdrozenia.

## 4.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| ROI oparty na 100% automatyzacji | Nierealne oczekiwania |
| Brak kosztow utrzymania | Niedoszacowanie budzetu |
| Brak repeat contact | Pozorna oszczednosc |
| Brak kosztu integracji | Projekt drozszy niz plan |
| Mierzenie tylko wolumenu bota | Brak informacji o skutecznosci |
| Brak metryk UX | Oszczednosc kosztem klienta |

## 4.9. Praktyczny model business case

| Element | Przyklad |
|---|---|
| Wolumen miesieczny use case'u | 50 000 rozmow |
| Sredni koszt rozmowy konsultanta | 12 zl |
| Realistyczny udzial rozmow kwalifikujacych sie do bota | 70% |
| Oczekiwany task completion bota po optymalizacji | 60% |
| Rozmowy skutecznie zautomatyzowane | 21 000 |
| Potencjal brutto | 252 000 zl |
| Koszt technologii i utrzymania | 80 000 zl |
| Szacowana wartosc netto | 172 000 zl miesiecznie |

Uwaga: to przyklad struktury, nie uniwersalna obietnica. Kazdy projekt wymaga wlasnych danych.

## 4.10. Checklista ROI

- Czy mamy wolumen per use case?
- Czy znamy koszt kontaktu?
- Czy znamy AHT?
- Czy znamy baseline FCR/repeat contact?
- Czy zalozenia task completion sa realistyczne?
- Czy uwzgledniono koszty technologii?
- Czy uwzgledniono koszty utrzymania?
- Czy uwzgledniono koszty integracji?
- Czy mamy metryki ochronne UX?
- Czy business case ma scenariusz pesymistyczny, bazowy i optymistyczny?

## 4.11. Mini case study

Operator telekomunikacyjny zakladal ROI na podstawie 80% containment dla awarii internetu. Pilot pokazal containment 55%, ale konsultanci otrzymywali lepsze podsumowania i mieli krotszy AHT o 90 sekund. Po doliczeniu assisted automation projekt nadal mial dodatni efekt, choc inny niz pierwotnie zakladano. Wniosek: business case powinien uwzgledniac zarowno automatyzacje end-to-end, jak i wsparcie konsultanta.

## 4.12. Cwiczenia

1. Policz prosty ROI dla use case'u statusu zamowienia.
2. Dodaj do kalkulacji repeat contact.
3. Przygotuj trzy scenariusze: pesymistyczny, bazowy, optymistyczny.
4. Wskaz metryki ochronne UX.

## 4.13. Podsumowanie

ROI voicebota nie polega na mnozeniu wolumenu przez koszt konsultanta i wpisaniu wysokiego containment. Dojrzaly business case uwzglednia skutecznosc, jakosc, repeat contact, koszty utrzymania, integracje i ryzyka.

---

# Rozdzial 5. Kiedy nie wdrazac voicebota

## 5.1. Cele rozdzialu

Czytelnik nauczy sie:

- rozpoznawac sytuacje, w ktorych voicebot jest zlym rozwiazaniem;
- argumentowac przeciwko wdrozeniu w sposob profesjonalny;
- proponowac alternatywy: IVR, chatbot, formularz, agent assist, analityka rozmow;
- chronić organizacje przed kosztowna automatyzacja bez wartosci.

## 5.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Poor fit | Slabe dopasowanie procesu do voicebota |
| Premature automation | Automatyzacja przed uporzadkowaniem procesu |
| Process debt | Dlug procesowy: chaos procedur, danych i odpowiedzialnosci |
| Human-in-the-loop | Czlowiek pozostaje w kluczowej decyzji |
| Agent assist | AI wspiera konsultanta zamiast zastapienia rozmowy |

## 5.3. Wyjasnienie eksperckie

Nie nalezy wdrazac voicebota, gdy:

1. Proces nie jest zrozumiany.
2. Nie ma danych o powodach kontaktu.
3. Nie ma wlasciciela procesu.
4. Systemy backendowe sa niedostepne lub niespojnie.
5. Klienci dzwonia w silnym kryzysie.
6. Bledy maja wysoki koszt i brak mozliwosci odwolania.
7. Zakres jest politycznie narzucony, ale niemierzalny.
8. Organizacja nie ma zasobow na utrzymanie.
9. Bot ma ukryc problem operacyjny zamiast go rozwiazac.
10. Inny kanal jest wyraznie lepszy.

Przyklad:

Jesli 40% kontaktow dotyczy blednych faktur spowodowanych problemem w systemie billingowym, voicebot moze tylko taniej obslugiwac skutek. Lepszym projektem moze byc naprawa billingu albo proaktywna komunikacja.

## 5.4. Perspektywa biznesowa

Decyzja "nie wdrazamy voicebota teraz" moze byc bardzo profesjonalna. Moze oznaczac:

- najpierw porzadkujemy dane;
- najpierw wdrazamy tagowanie rozmow;
- najpierw budujemy API;
- najpierw zmniejszamy call drivers;
- najpierw uruchamiamy agent assist;
- najpierw robimy pilota analitycznego.

Voicebot nie powinien byc plasterkiem na zly proces, jesli proces wymaga naprawy.

## 5.5. Perspektywa uzytkownika

Uzytkownik odczuwa zly moment wdrozenia jako:

- "firma zaslania sie botem";
- "bot nic nie wie";
- "musze powtarzac dane";
- "nie moge dojsc do czlowieka";
- "system nie rozumie mojej sytuacji".

Wrazliwe use case'y, jak zdrowie, finanse, windykacja czy reklamacje, wymagaja szczegolnej ostroznosci.

## 5.6. Perspektywa technologiczna

Czerwone flagi technologiczne:

- brak API;
- brak stabilnego identyfikatora klienta/sprawy;
- brak transkrypcji;
- brak sandboxa;
- brak mozliwosci handoff;
- brak logow;
- brak zgody na przechowywanie danych;
- brak testow telefonii;
- brak kontroli nad baza wiedzy;
- brak mechanizmow bezpieczeństwa LLM.

## 5.7. Alternatywy dla voicebota

| Problem | Alternatywa |
|---|---|
| Duzy wolumen prostych pytan tekstowych | Chatbot lub lepsze FAQ |
| Klienci szukaja dokumentow | Portal self-service |
| Trzeba zebrac wiele pol | Formularz |
| Konsultanci traca czas na notatki | Agent assist i automatyczne podsumowania |
| Brak wiedzy o powodach kontaktu | Analityka rozmow |
| Zly routing | Nowy IVR lub routing intent-based |
| Problem wynika z awarii procesu | Naprawa procesu i komunikacja proaktywna |

## 5.8. Dobre praktyki

- Miej odwage odradzic voicebota, gdy nie ma dopasowania.
- Proponuj alternatywe, nie samo "nie".
- Oddziel potrzebe automatyzacji od potrzeby analityki.
- Najpierw napraw call drivers, jesli to one generuja ruch.
- Wrazliwe procesy zaczynaj od agent assist lub prekwalifikacji.
- Warunkuj wdrozenie wymaganiami: API, dane, handoff, monitoring.

## 5.9. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Wdrozenie mimo braku danych | Bot projektowany na domyslach |
| Automatyzacja chaosu | Chaos staje sie szybszy |
| Brak alternatywy dla klienta | Frustracja |
| Automatyzacja tylko dla redukcji kosztu | Utrata zaufania |
| Ignorowanie procesu podstawowego | Voicebot obsluguje objawy |

## 5.10. Checklista "nie wdrazac jeszcze"

- Czy brakuje danych o powodach kontaktu?
- Czy proces jest niespojny?
- Czy nie ma API?
- Czy nie ma wlasciciela biznesowego?
- Czy nie ma handoff?
- Czy koszt bledu jest wysoki?
- Czy sprawy sa silnie emocjonalne?
- Czy sukces jest niemierzalny?
- Czy bot ma ukryc problem procesu?
- Czy lepszy bylby inny kanal?

## 5.11. Mini case study

Firma energetyczna chciala voicebota do reklamacji wysokich rachunkow. Analiza pokazala, ze glowna przyczyna kontaktow to nie brak automatyzacji, lecz nieczytelne faktury i opoznione odczyty. Zamiast voicebota end-to-end wdrozono: proaktywne SMS-y, lepsza strone wyjasniajaca fakture, agent assist dla konsultantow i voicebota tylko do statusu zgloszenia. Wolumen reklamacji spadl bez ryzykownej automatyzacji sporow.

## 5.12. Cwiczenia

1. Wybierz proces i znajdz argumenty przeciwko voicebotowi.
2. Zaproponuj alternatywe dla voicebota.
3. Zdefiniuj warunki, po ktorych proces bedzie gotowy.
4. Przygotuj komunikat do sponsora, dlaczego warto zaczac od analityki.

## 5.13. Podsumowanie

Dobry Voicebot Specialist nie jest osoba, ktora zawsze rekomenduje voicebota. Jest osoba, ktora potrafi wskazac, gdzie automatyzacja glosowa ma sens, a gdzie najpierw trzeba uporzadkowac proces, dane lub kanal.

---

# Rozdzial 6. Brief projektu voicebota

## 6.1. Cele rozdzialu

Czytelnik nauczy sie:

- przygotowac profesjonalny brief projektu;
- zebrac minimalny zestaw informacji przed discovery;
- uporzadkowac oczekiwania biznesu, IT, contact center i compliance;
- stworzyc dokument, ktory moze byc punktem startu wyceny, warsztatow i projektu.

## 6.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Brief | Dokument startowy opisujacy problem, cele, zakres i ograniczenia projektu |
| Scope | Zakres projektu |
| Out of scope | Obszary poza zakresem |
| Stakeholder | Interesariusz projektu |
| Success criteria | Kryteria sukcesu |
| Constraint | Ograniczenie, np. prawne, technologiczne, czasowe |

## 6.3. Wyjasnienie eksperckie

Brief nie jest pelna specyfikacja. Jest narzedziem do rozpoczecia rozmowy i wykrycia luk. Dobry brief odpowiada:

- jaki problem biznesowy rozwiazujemy;
- dla kogo;
- w jakim kanale;
- jakich rozmow dotyczy;
- jakie sa wolumeny;
- jakie systemy sa potrzebne;
- jakie sa ograniczenia prawne;
- jak zmierzymy sukces;
- kto podejmuje decyzje;
- jaki jest plan wdrozenia.

## 6.4. Szablon briefu projektu voicebota

```text
1. Informacje podstawowe
- Nazwa projektu:
- Organizacja/jednostka:
- Sponsor biznesowy:
- Product owner:
- Contact center owner:
- IT owner:
- Legal/compliance contact:
- Data/analytics owner:

2. Problem biznesowy
- Jaki problem chcemy rozwiazac?
- Dlaczego teraz?
- Jakie sa obecne skutki problemu?
- Jakie sa alternatywy rozwiazania?

3. Zakres rozmow
- Jakie powody kontaktu obejmuje projekt?
- Jakie powody kontaktu sa poza zakresem?
- Inbound/outbound?
- Jezyki:
- Godziny dzialania:
- Segmenty klientow:

4. Dane i wolumeny
- Miesieczny wolumen rozmow:
- AHT:
- FCR:
- Repeat contact:
- Abandonment:
- CSAT/NPS:
- Dostepne nagrania/transkrypcje:
- Wrap-up codes:

5. Proces
- Obecny przebieg rozmowy:
- Systemy uzywane przez konsultanta:
- Decyzje biznesowe:
- Wyjatki:
- Praca po rozmowie:

6. Technologia
- Platforma contact center:
- Telefonia/SIP/VoIP:
- CRM/ERP/ticketing:
- API dostepne:
- Wymagania ASR/TTS:
- Wymagania LLM/RAG:
- Monitoring/logging:

7. Ryzyka i compliance
- Dane osobowe:
- Dane wrazliwe:
- Nagrywanie:
- Zgody:
- Retencja:
- Branżowe regulacje:
- Ryzyka odpowiedzi AI:

8. Handoff
- Kiedy bot przekazuje do czlowieka?
- Do jakiej kolejki?
- Jakie dane przekazuje?
- Czy konsultant widzi podsumowanie?

9. Kryteria sukcesu
- Metryki biznesowe:
- Metryki UX:
- Metryki techniczne:
- Metryki compliance:
- Minimalne kryteria pilota:

10. Harmonogram i decyzje
- Oczekiwany termin MVP:
- Oczekiwany termin pilota:
- Oczekiwany termin produkcji:
- Zaleznosci:
- Decydenci:
```

## 6.5. Perspektywa biznesowa

Brief zmusza organizacje do konkretu. Zdanie "chcemy automatyzowac obsluge klienta" staje sie:

"Chcemy zautomatyzowac 30% rozmow o status zamowienia i zmiane adresu, ktore maja miesiecznie 40 000 polaczen i sredni AHT 4 minuty, przy zachowaniu repeat contact ponizej baseline."

To jest roznica miedzy haslem a projektem.

## 6.6. Perspektywa uzytkownika

Brief powinien zawierac opis uzytkownika:

- kim jest;
- w jakiej sytuacji dzwoni;
- co juz wie;
- jakie ma emocje;
- jakie ma ograniczenia;
- co bedzie dla niego sukcesem;
- kiedy bedzie chcial czlowieka.

Bez tego projekt latwo staje sie automatyzacja dla firmy, nie dla klienta.

## 6.7. Perspektywa technologiczna

Brief musi ujawnic zaleznosci:

- API, ktorych nie ma;
- dane, ktorych nie wolno przechowywac;
- systemy, ktore nie maja sandboxa;
- contact center, ktore nie wspiera przekazania kontekstu;
- TTS, ktory nie radzi sobie z nazwami;
- brak transkrypcji do treningu.

## 6.8. Dobre praktyki

- Brief wypelniaj z interesariuszami, nie samodzielnie.
- Nie ukrywaj brakow danych.
- Oddziel cele od zalozen.
- Wpisz poza zakresem.
- Wpisz ryzyka.
- Wpisz warunki handoff.
- Wpisz minimalne kryteria pilota.
- Aktualizuj brief po discovery.

## 6.9. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Brief jako prezentacja marketingowa | Brak konkretu do projektu |
| Brak out of scope | Zakres rosnie bez kontroli |
| Brak danych baseline | Nie da sie mierzyc efektu |
| Brak interesariuszy IT/legal | Problemy wychodza za pozno |
| Brak kryteriow sukcesu | Pilot nie ma jasnej oceny |
| Brak ryzyk | Fałszywe poczucie gotowosci |

## 6.10. Checklista briefu

- Czy problem jest konkretny?
- Czy zakres jest jasno opisany?
- Czy out of scope jest opisany?
- Czy mamy baseline danych?
- Czy znamy systemy i integracje?
- Czy znamy ryzyka prawne?
- Czy znamy warunki handoff?
- Czy sukces jest mierzalny?
- Czy jest wlasciciel biznesowy?
- Czy brief zostal zatwierdzony przez kluczowych interesariuszy?

## 6.11. Mini case study

Firma B2B rozpoczela projekt od hasla "voicebot do leadow". Brief ujawnil, ze polaczenia przychodza z trzech zrodel, leady maja rozna wartosc, a zespol sprzedazy nie chce automatycznej kwalifikacji dla najwiekszych kont. Zakres MVP zmieniono: bot kwalifikuje male zapytania, umawia rozmowe i tworzy rekord CRM, ale konta strategiczne ida bezposrednio do handlowca. Brief uratowal projekt przed konfliktem z sales.

## 6.12. Cwiczenia

1. Wypelnij brief dla use case'u statusu zamowienia.
2. Wpisz 5 elementow poza zakresem.
3. Wpisz 5 kryteriow sukcesu pilota.
4. Wskaz interesariuszy, ktorzy musza zatwierdzic brief.

## 6.13. Podsumowanie

Brief jest pierwszym filtrem dojrzalosci projektu. Dobry brief nie rozwiazuje wszystkiego, ale pokazuje, czy organizacja wie, co chce automatyzowac, dlaczego, dla kogo i jak pozna, ze sie udalo.

---

# Rozdzial 7. Zbieranie wymagan i praca z interesariuszami

## 7.1. Cele rozdzialu

Czytelnik nauczy sie:

- identyfikowac interesariuszy projektu voicebota;
- prowadzic warsztaty discovery;
- zbierac wymagania funkcjonalne, niefunkcjonalne i compliance;
- radzic sobie ze sprzecznymi oczekiwaniami.

## 7.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Stakeholder mapping | Mapa interesariuszy |
| Functional requirements | Co system ma robic |
| Non-functional requirements | Jak system ma dzialac, np. latency, bezpieczenstwo |
| Compliance requirements | Wymagania prawne i regulacyjne |
| Acceptance criteria | Warunki akceptacji |
| RACI | Podzial odpowiedzialnosci: Responsible, Accountable, Consulted, Informed |

## 7.3. Wyjasnienie eksperckie

Projekt voicebota dotyka wielu zespolow:

- sponsor biznesowy;
- product owner;
- contact center manager;
- liderzy zespolow konsultantow;
- konsultanci;
- IT;
- solution architect;
- security;
- legal/compliance;
- data protection officer;
- marketing/brand;
- analytics;
- QA;
- operations;
- vendor/platform owner.

Kazdy ma inny punkt widzenia. Sponsor chce efektu. Contact center chce odciazenia. Konsultanci boja sie trudniejszych rozmow po bocie. Legal chce kontroli. IT chce bezpiecznych integracji. UX chce naturalnosci. Voicebot Specialist musi zrobic z tego jeden wykonalny zakres.

## 7.4. Typy wymagan

| Typ | Przyklady |
|---|---|
| Funkcjonalne | Bot sprawdza status, zmienia termin, tworzy ticket |
| Konwersacyjne | Bot obsluguje korekte, no-input, no-match, barge-in |
| Integracyjne | Bot laczy sie z CRM i kalendarzem |
| Bezpieczenstwa | Szyfrowanie, autoryzacja API, maskowanie danych |
| Compliance | Zgody, informacja o bocie, retencja nagran |
| Operacyjne | Godziny dzialania, kolejki handoff, SLA |
| Analityczne | Metryki, dashboardy, eksport danych |
| Jakosciowe | Testy ASR, UAT, testy regresji |
| UX | Ton, persona, dostepnosc, eskalacja |

## 7.5. Perspektywa biznesowa

Najwieksze ryzyko interesariuszy to sprzeczne cele:

- biznes chce wysoki containment;
- CX chce szybki handoff;
- legal chce dlugie komunikaty;
- UX chce krotkie komunikaty;
- IT chce minimalny zakres integracji;
- contact center chce pelny kontekst;
- marketing chce brand voice;
- operations chce stabilnosc.

Rola Voicebot Specialist polega na zamianie sporow w decyzje projektowe z konsekwencjami.

Przyklad:

Legal chce odczytac dlugi disclaimer. UX wskazuje, ze uzytkownicy beda przerywac. Decyzja: skrocic disclaimer do prawnie wymaganego minimum, wyslac pelna tresc SMS/e-mail, ograniczyc barge-in tylko w krytycznej frazie i logowac odtworzenie.

## 7.6. Perspektywa uzytkownika

Wymagania nie moga pochodzic tylko z organizacji. Trzeba uwzglednic:

- realne frazy z rozmow;
- typowe emocje;
- poziom kompetencji cyfrowych;
- dostepnosc;
- potrzebe czlowieka;
- sytuacje, w ktorych uzytkownik nie ma danych pod reka.

## 7.7. Perspektywa technologiczna

Wymagania powinny byc testowalne.

Zle:

"Bot ma szybko odpowiadac."

Lepsze:

"Dla 95% tur bez integracji pierwsze audio odpowiedzi powinno pojawic sie ponizej 1,2 s od konca tury uzytkownika."

Zle:

"Bot ma dobrze rozumiec klientow."

Lepsze:

"Dla intencji status_zamowienia recall na zestawie testowym minimum 90%, a false positive do anulowania zamowienia ponizej 1%."

## 7.8. Dobre praktyki

- Mapuj interesariuszy przed warsztatami.
- Rozmawiaj z konsultantami i sluchaj nagran.
- Zapisuj wymagania jako testowalne zdania.
- Oddziel "must have" od "nice to have".
- Dokumentuj decyzje i kompromisy.
- Ustal wlasciciela kazdego wymagania.
- Uzywaj RACI.
- Wciagnij legal/security wcześnie.

## 7.9. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Warsztaty tylko z managementem | Brak realnego obrazu rozmow |
| Brak legal/security na starcie | Blokady pod koniec |
| Wymagania nietestowalne | Spory przy odbiorze |
| Brak RACI | Decyzje sie rozmywaja |
| Pomijanie konsultantow | Handoff i realne wyjatki sa zle zaprojektowane |
| Brak dokumentacji kompromisow | Powracajace spory |

## 7.10. Checklista wymagan

- Czy mamy mape interesariuszy?
- Czy mamy wlasciciela biznesowego?
- Czy mamy wymagania funkcjonalne?
- Czy mamy wymagania niefunkcjonalne?
- Czy mamy wymagania compliance?
- Czy wymagania sa testowalne?
- Czy mamy priorytety must/should/could?
- Czy mamy RACI?
- Czy decyzje sa zapisane?
- Czy konsultanci byli zaangazowani?

## 7.11. Mini case study

W projekcie bankowym biznes chcial, aby bot automatycznie odpowiadal na pytania o karty. Legal wskazal, ze czesc pytan dotyczy indywidualnej sytuacji klienta i regulacji. IT wskazalo brak API do niektorych limitow. Po warsztatach zakres podzielono: ogolne informacje przez RAG, indywidualne dane po weryfikacji przez API, a sporne lub regulowane interpretacje do konsultanta. Wymagania staly sie jasne i testowalne.

## 7.12. Cwiczenia

1. Zrob mape interesariuszy dla voicebota medycznego.
2. Napisz 5 wymagan testowalnych.
3. Przygotuj RACI dla decyzji o handoff.
4. Opisz konflikt UX vs legal i zaproponuj kompromis.

## 7.13. Podsumowanie

Voicebot jest projektem przekrojowym. Wymagania musza laczyc biznes, UX, technologie, operacje i compliance. Im wczesniej ujawnione zostana konflikty, tym taniej mozna je rozwiazac.

---

# Rozdzial 8. Business case i decyzja o MVP

## 8.1. Cele rozdzialu

Czytelnik nauczy sie:

- przygotowac business case dla voicebota;
- zdecydowac, co powinno wejsc do MVP;
- oddzielic wizje docelowa od pierwszego zakresu;
- zdefiniowac kryteria przejscia z pilota na produkcje.

## 8.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Business case | Uzasadnienie biznesowe inwestycji |
| MVP | Minimum Viable Product, pierwsza wersja dajaca wartosc i dane |
| Pilot | Ograniczone wdrozenie testujace zalozenia |
| Soft launch | Stopniowe udostepnianie produkcyjne |
| Go/no-go criteria | Kryteria decyzji, czy przejsc dalej |
| Roadmap | Plan rozwoju po MVP |

## 8.3. Wyjasnienie eksperckie

Business case powinien zawierac:

1. Problem.
2. Dane baseline.
3. Wybrany use case.
4. Alternatywy.
5. Zakres MVP.
6. Architekture wysokiego poziomu.
7. Wymagane integracje.
8. Ryzyka.
9. Koszty.
10. Spodziewane efekty.
11. Metryki sukcesu.
12. Kryteria pilota i go/no-go.
13. Plan utrzymania.

MVP voicebota nie oznacza "najmniejszy bot". Oznacza najmniejszy zakres, ktory:

- daje realna wartosc;
- moze byc bezpiecznie wdrozony;
- pozwala zebrac dane;
- ma jasny handoff;
- mozna zmierzyc.

## 8.4. Perspektywa biznesowa

MVP powinien byc wybrany tak, aby:

- sponsor widzial efekt;
- contact center odczulo pomoc;
- uzytkownicy mieli dobra sciezke;
- IT moglo dostarczyc integracje;
- legal mogl zatwierdzic ryzyko;
- zespol mogl optymalizowac po wdrozeniu.

Nie warto wkładac do MVP wszystkiego, co mozliwe. Nadmierny zakres opoznia uczenie sie.

## 8.5. Perspektywa uzytkownika

MVP nie moze byc wymowka dla slabego UX. Uzytkownik nie wie, ze to MVP. W pierwszej wersji mozna ograniczyc zakres, ale nie mozna ograniczyc podstaw:

- jasne powitanie;
- dobry fallback;
- handoff;
- potwierdzenia danych;
- brak petli;
- monitoring.

## 8.6. Perspektywa technologiczna

MVP powinno minimalizowac zlozonosc:

- 1-3 glowne intencje;
- ograniczona liczba integracji;
- kontrolowany flow;
- proste, mierzalne metryki;
- jasna architektura fallback;
- sandbox i testy;
- logi gotowe od pierwszego dnia.

## 8.7. Dobre praktyki

- Wybieraj MVP z najwyzszym stosunkiem wartosci do ryzyka.
- Ogranicz zakres domeny.
- Nie ograniczaj mechanizmow bezpieczenstwa i handoff.
- Zdefiniuj go/no-go przed pilotem.
- Ustal baseline przed wdrozeniem.
- Przygotuj plan optymalizacji po 2, 4 i 8 tygodniach.
- Komunikuj MVP jako kontrolowany etap, nie ostateczna jakosc.

## 8.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| MVP bez integracji | Brak realnej wartosci |
| MVP bez handoff | Ryzyko UX |
| MVP ze zbyt szerokim zakresem | Opoznienie i chaos |
| Brak go/no-go | Pilot trwa bez decyzji |
| Brak baseline | Nie da sie udowodnic efektu |
| Brak planu utrzymania | Bot starzeje sie po wdrozeniu |

## 8.9. Szablon business case

```text
1. Executive summary
- Co wdrazamy?
- Jaki problem rozwiazujemy?
- Jaki jest oczekiwany efekt?

2. Baseline
- Wolumen:
- AHT:
- Koszt kontaktu:
- FCR:
- Repeat contact:
- CSAT:
- Abandonment:

3. Wybrany use case
- Zakres:
- Poza zakresem:
- Uzytkownicy:
- Powody kontaktu:
- Handoff:

4. Rozwiazanie
- Architektura wysokiego poziomu:
- Integracje:
- Dane:
- ASR/TTS/NLU/LLM:
- Monitoring:

5. Wartosc
- Oszczednosc bezposrednia:
- Oszczednosc posrednia:
- Wplyw na SLA:
- Wplyw na jakosc:
- Wplyw na konsultantow:

6. Koszty
- Wdrozenie:
- Licencje:
- Minuty/audio/tokeny:
- Integracje:
- Utrzymanie:
- QA:

7. Ryzyka
- Techniczne:
- UX:
- Operacyjne:
- Compliance:
- Reputacyjne:

8. MVP i pilot
- Zakres MVP:
- Zakres pilota:
- Grupa uzytkownikow:
- Czas trwania:
- Kryteria sukcesu:
- Kryteria zatrzymania:

9. Roadmapa
- Etap 1:
- Etap 2:
- Etap 3:

10. Decyzje
- Decydenci:
- Budzet:
- Termin:
- Zaleznosci:
```

## 8.10. Kryteria go/no-go dla pilota

Przykladowe kryteria:

| Obszar | Go | No-go |
|---|---|---|
| Task completion | >= 60% dla MVP | < 40% bez jasnej przyczyny |
| Fallback rate | <= 15-20% | > 30% w kluczowym flow |
| Handoff quality | Konsultant dostaje kontekst | Brak kontekstu lub zle przekazania |
| ASR critical data | Dane krytyczne potwierdzane poprawnie | Czeste bledy bez recovery |
| CSAT | Nie gorszy niz baseline lub w ustalonym progu | Znaczny spadek i skargi |
| Compliance | Brak krytycznych naruszen | Naruszenie polityk lub danych |
| Stability | Brak powtarzalnych awarii | Czeste timeouty/rozlaczenia |

## 8.11. Mini case study

Firma ubezpieczeniowa planowala MVP z piecioma use case'ami. Po business case ograniczono zakres do statusu szkody i doslania dokumentow. To mialo dostepne API, jasny wynik i duzy wolumen. Sprzedaz nowych polis i interpretacje OWU zostaly w roadmapie. Pilot mial jasne kryteria: task completion 55%, poprawne utworzenie linku do doslania dokumentow, handoff z kontekstem i brak krytycznych naruszen compliance.

## 8.12. Cwiczenia

1. Przygotuj business case dla jednego use case'u.
2. Okresl zakres MVP i out of scope.
3. Zdefiniuj 5 kryteriow go/no-go.
4. Przygotuj roadmapę na 3 etapy.

## 8.13. Podsumowanie

Business case zamienia pomysl na decyzje inwestycyjna. MVP zamienia duza wizje w kontrolowany eksperyment operacyjny. Dobrze zaprojektowany pilot nie ma udowodnic, ze AI jest modne. Ma sprawdzic, czy konkretny proces mozna automatyzowac bezpiecznie i z wartoscia.

---

# Rozdzial 9. Pelna matryca oceny use case'u

## 9.1. Cele rozdzialu

Czytelnik nauczy sie:

- stosowac pelna matryce priorytetyzacji use case'ow;
- porownywac kandydatow w sposob przejrzysty;
- oddzielac wartosc od wykonalnosci i ryzyka;
- przygotowac rekomendacje dla sponsora.

## 9.2. Matryca glowna

Skala 1-5. Wagi mozna dostosowac do organizacji. Wersja ponizej jest rekomendowana dla pierwszych wdrozen enterprise.

| Obszar | Kryterium | Waga | Pytanie |
|---|---|---:|---|
| Wartosc | Wolumen | 3 | Czy sprawa wystepuje czesto? |
| Wartosc | Koszt kontaktu/AHT | 2 | Czy rozmowy sa kosztowne lub dlugie? |
| Wartosc | Wplyw na SLA/abandonment | 2 | Czy automatyzacja poprawi dostepnosc? |
| Wartosc | Wplyw na konsultantow | 2 | Czy odciaza powtarzalna prace? |
| Wartosc | Wartosc danych | 1 | Czy bot poprawi tagowanie i wiedze o klientach? |
| Wykonalnosc | Powtarzalnosc procesu | 3 | Czy rozmowy sa podobne? |
| Wykonalnosc | Jasnosc celu uzytkownika | 2 | Czy intencje sa latwe do rozpoznania? |
| Wykonalnosc | Dostepnosc danych | 2 | Czy mamy nagrania/transkrypcje? |
| Wykonalnosc | Dostepnosc API | 3 | Czy systemy wspieraja automatyzacje? |
| Wykonalnosc | Latwosc testowania | 1 | Czy mozna zbudowac test set i sandbox? |
| UX | Dopasowanie do glosu | 2 | Czy glos jest wygodnym kanalem? |
| UX | Niskie obciazenie poznawcze | 2 | Czy uzytkownik nie musi pamietac zbyt wiele? |
| UX | Emocje | 2 | Czy sprawa zwykle nie jest silnie konfliktowa? |
| UX | Latwosc handoff | 3 | Czy mozna szybko przejsc do czlowieka? |
| Ryzyko | Koszt bledu | 3 | Czy blad ma ograniczone skutki? |
| Ryzyko | Compliance | 3 | Czy ryzyka prawne sa kontrolowalne? |
| Ryzyko | Dane wrazliwe | 2 | Czy nie przetwarzamy nadmiarowo danych wrazliwych? |
| Ryzyko | Zmiennosc procesu | 1 | Czy proces jest stabilny? |
| Operacje | Wlasciciel biznesowy | 2 | Czy jest osoba decyzyjna? |
| Operacje | Gotowosc contact center | 2 | Czy operacje sa gotowe na handoff i zmiany? |

## 9.3. Sposob liczenia

Dla kazdego kryterium:

```text
wynik_kryterium = ocena 1-5 x waga
```

Maksymalny wynik w zaproponowanej matrycy: 215 punktow.

Interpretacja:

- 170-215: bardzo dobry kandydat na MVP lub szybki pilot.
- 135-169: dobry kandydat, wymaga doprecyzowania ryzyk.
- 100-134: kandydat na pozniejszy etap lub ograniczony pilot.
- 70-99: raczej wspierac konsultanta, nie automatyzowac end-to-end.
- Ponizej 70: nie rekomendowac jako voicebot w obecnym stanie.

## 9.4. Progi blokujace

Niezaleznie od wyniku punktowego, use case wymaga zatrzymania lub zmiany zakresu, jesli:

- brak wlasciciela biznesowego;
- brak mozliwosci handoff;
- wysokie ryzyko prawne bez akceptacji compliance;
- brak danych i brak mozliwosci pilota;
- proces wymaga decyzji medycznej/prawnej/finansowej bez czlowieka;
- brak zgody na monitoring i analize rozmow;
- brak stabilnego systemu zrodlowego dla danych krytycznych.

## 9.5. Przykladowa ocena

| Use case | Wynik | Interpretacja |
|---|---:|---|
| Status zamowienia | 186 | Bardzo dobry MVP |
| Zmiana terminu wizyty | 164 | Dobry kandydat po sprawdzeniu integracji |
| Reklamacja faktury | 112 | Raczej etap pozniejszy, czesciowa automatyzacja |
| Porada medyczna | 58 | Nie automatyzowac end-to-end |
| Agent assist dla konsultanta reklamacji | 152 | Dobra alternatywa dla pelnego voicebota |

## 9.6. Jak przedstawic rekomendacje

Dobra rekomendacja dla sponsora powinna miec strukture:

1. Rekomendowany use case.
2. Dlaczego ten.
3. Co jest poza zakresem.
4. Jakie sa wymagane integracje.
5. Jakie sa ryzyka.
6. Jak mierzymy sukces.
7. Co robimy w pilocie.
8. Co zostawiamy na roadmapie.

Przyklad:

"Rekomendujemy MVP dla statusu zamowienia i zmiany adresu przed wysylka. Use case ma wysoki wolumen, powtarzalny przebieg, dostepne API i niski koszt bledu przy potwierdzeniu SMS. Poza zakresem MVP zostaja reklamacje i anulowania po wysylce. Sukces mierzymy przez task completion, repeat contact, fallback rate, handoff quality i CSAT."

## 9.7. Checklista matrycy

- Czy oceniono wszystkie kandydaty ta sama metoda?
- Czy sa dane, czy tylko opinie?
- Czy uwzgledniono ryzyko UX?
- Czy uwzgledniono compliance?
- Czy sa progi blokujace?
- Czy wynik pokazano razem z uzasadnieniem?
- Czy rekomendacja zawiera out of scope?
- Czy jest plan pilota?

## 9.8. Cwiczenia

1. Ocen trzy use case'y pelna matryca.
2. Wskaz progi blokujace.
3. Przygotuj rekomendacje dla sponsora.
4. Zaproponuj alternatywe dla use case'u z niskim wynikiem.

## 9.9. Podsumowanie

Matryca nie podejmuje decyzji za zespol. Pomaga prowadzic rozmowe na podstawie kryteriow, a nie glosnosci interesariuszy. Najlepsza decyzja laczy wartosc, wykonalnosc, UX, ryzyko i gotowosc operacyjna.

---

# 10. Zbiorcza checklista po Czesci IV

- Czy znasz glowne powody kontaktu?
- Czy masz dane baseline: wolumen, AHT, FCR, repeat contact, CSAT?
- Czy analizowales nagrania lub transkrypcje?
- Czy rozmawiales z konsultantami?
- Czy wybrany use case ma jasny cel uzytkownika?
- Czy proces jest powtarzalny?
- Czy kanal glosowy jest dobrym wyborem?
- Czy potrzebne integracje sa dostepne?
- Czy koszt bledu jest kontrolowalny?
- Czy handoff jest mozliwy?
- Czy business case uwzglednia koszty utrzymania?
- Czy ROI uwzglednia repeat contact?
- Czy brief zawiera out of scope?
- Czy wymagania sa testowalne?
- Czy MVP ma jasne kryteria go/no-go?
- Czy use case przeszedl matryce oceny?

---

# 11. Co bedzie w kolejnej czesci

Kolejna czesc powinna opracowac **Czesc V. Projektowanie dialogow i scenariuszy**:

1. Intencje, encje, sloty i konteksty.
2. Flow, happy path, unhappy paths, fallback path i escalation path.
3. Repair strategies i confirmation strategies.
4. Disambiguation, multi-intent handling i interruptions.
5. Dialogi transakcyjne, informacyjne, sprzedazowe, windykacyjne, medyczne/rezerwacyjne i ankietowe.
6. Przyklady dobrych i zlych dialogow z analiza.

