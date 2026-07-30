# Voicebot Specialist Handbook

## Czesc 7: Dane, trening i jakosc rozumienia

Wersja robocza: 2026-07-29  
Kontynuacja plikow:

- `Voicebot_Specialist_Handbook_czesc_1.md`
- `Voicebot_Specialist_Handbook_czesc_2.md`
- `Voicebot_Specialist_Handbook_czesc_3.md`
- `Voicebot_Specialist_Handbook_czesc_4.md`
- `Voicebot_Specialist_Handbook_czesc_5.md`
- `Voicebot_Specialist_Handbook_czesc_6.md`

---

# Czesc VI. Dane, trening i jakosc rozumienia

## Cel calej czesci

Voicebot nie rozumie uzytkownikow dlatego, ze zespol wpisal ladne intencje do dokumentu. Rozumie ich wtedy, gdy ma dobrze zebrane, opisane, przetestowane i stale aktualizowane dane. Dane w voicebotach sa trudniejsze niz w chatbotach, bo mowa przechodzi przez ASR, zawiera pauzy, powtorzenia, poprawki, urwane zdania, emocje, akcenty, szum i bledy transkrypcji.

Ta czesc pokazuje, jak budowac i utrzymywac jakosc rozumienia w voicebocie.

Po tej czesci czytelnik powinien umiec:

1. Zbierac i przygotowywac dane z rozmow.
2. Pracowac z transkrypcjami i nagraniami.
3. Projektowac dane treningowe dla intencji i encji.
4. Tworzyc slowniki, synonimy i dane syntetyczne.
5. Rozpoznawac bledy etykietowania.
6. Analizowac jakosc ASR i jej wplyw na NLU.
7. Testowac NLU przy pomocy confusion matrix, precision, recall i F1.
8. Prowadzic continuous training i analize nierozpoznanych wypowiedzi.

Zrodla wspierajace czesc:

- Dokumentacje Google Dialogflow CX i Amazon Lex: intencje, parametry, sloty, confidence, no-match, speech settings.
- Dokumentacje LiveKit i OpenAI Realtime: streaming ASR, partials, turn detection, interruption handling i logi rozmow realtime.
- Zrodla naukowe o turn-taking i przerwaniach: uzasadnienie, dlaczego dane glosowe musza obejmowac overlap, pauzy, barge-in i false interruptions.
- Uzupelnienie eksperckie: praktyki data labeling, test set design, confusion analysis, continuous improvement i governance danych.

---

# Rozdzial 1. Zbieranie danych i transkrypcje rozmow

## 1.1. Cele rozdzialu

Czytelnik nauczy sie:

- rozumiec, jakie dane sa potrzebne do projektowania i trenowania voicebota;
- odrozniac nagrania, transkrypcje, logi i metadane;
- oceniac jakosc danych z contact center;
- przygotowac dane zgodnie z prywatnoscia i compliance.

## 1.2. Kluczowe pojecia

| Pojecie | Definicja praktyczna |
|---|---|
| Nagranie | Audio rozmowy, zwykle najblizsze realnemu doswiadczeniu uzytkownika |
| Transkrypcja | Tekstowy zapis rozmowy, automatyczny lub manualny |
| Log dialogowy | Zapis zdarzen systemu: intencje, sloty, fallbacki, handoff, API |
| Metadane | Dane opisujace rozmowe, np. kolejka, data, AHT, wynik, segment klienta |
| Redakcja danych | Usuwanie lub maskowanie danych osobowych/wrazliwych |
| Sampling | Dobor probki rozmow do analizy |
| Annotation | Oznaczanie fragmentow danych etykietami |

## 1.3. Wyjasnienie eksperckie

Najlepsze dane do voicebota pochodza z realnych rozmow. Raporty contact center pokazuja wolumeny, ale nie pokazuja jezyka uzytkownikow. Konsultanci moga opisac typowe sprawy, ale nie zawsze pamietaja wszystkie warianty. Dopiero nagrania i transkrypcje pokazuja, jak ludzie naprawde mowia:

- chaotycznie;
- z przerwami;
- niepelnych zdaniach;
- potocznym jezykiem;
- ze skrotami;
- z emocjami;
- w wielu intencjach naraz;
- z poprawkami;
- z osobami trzecimi w tle.

Minimalny pakiet danych do projektu:

1. Nagrania rozmow.
2. Transkrypcje.
3. Powod kontaktu lub wrap-up code.
4. Wynik rozmowy.
5. AHT.
6. Transfer/handoff.
7. Repeat contact, jesli dostepny.
8. Segment klienta, jesli istotny i zgodny z polityka danych.
9. Informacja o zgodach i retencji.

Uwaga praktyczna:

Jesli nie masz transkrypcji, zacznij od probki nagran. Nie projektuj intencji tylko z glow menedzerow i nazw kolejek. To prosta droga do bota, ktory rozumie organizacje, ale nie rozumie klientow.

## 1.4. Perspektywa biznesowa

Dane odpowiadaja na pytania:

- ktore use case'y maja najwiekszy wolumen;
- jak ludzie formuluja potrzeby;
- jakie sa najczestsze wyjatki;
- gdzie konsultant traci czas;
- gdzie uzytkownik sie frustruje;
- ktore sprawy powinny isc do czlowieka;
- jakie sa luki w procesie.

Bez danych biznes nie ma baseline. Bez baseline nie da sie uczciwie powiedziec, czy voicebot poprawil proces.

## 1.5. Perspektywa uzytkownika

Uzytkownik nie mowi tak, jak firma nazywa procesy. Firma mowi "dyspozycja zmiany harmonogramu dostawy". Uzytkownik mowi:

- "nie bedzie mnie jutro";
- "kurier ma przyjechac w zly dzien";
- "przelozcie paczke";
- "chce inna godzine";
- "nie dam rady odebrac".

Analiza danych pomaga projektowac pod jezyk uzytkownika, nie pod jezyk regulaminu.

## 1.6. Perspektywa technologiczna

Dane musza byc przygotowane technicznie:

- format audio;
- jakosc nagran;
- rozdzielenie kanalow, jesli dostepne;
- diarization, czyli kto mowi;
- timestampy;
- anonimizacja;
- eksport transkrypcji;
- powiazanie transkrypcji z metadanymi;
- identyfikator rozmowy;
- wersja modelu lub systemu, jesli dane sa z produkcyjnego bota.

## 1.7. Dobre praktyki

- Zbieraj probke z roznych dni, godzin, kolejek i segmentow.
- Nie opieraj sie tylko na najlepszych lub najczystszych rozmowach.
- Uwzglednij rozmowy zakonczone sukcesem i porazka.
- Zachowaj zwiazek miedzy transkrypcja, audio i wynikiem.
- Maskuj dane osobowe przed szeroka analiza.
- Zapisuj, skad pochodza dane i z jakiego okresu.
- Oddziel dane do treningu, walidacji i testow.

## 1.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Projektowanie na podstawie 20 recznie wybranych rozmow | Dane sa niereprezentatywne |
| Brak nagran, tylko wrap-up codes | Brak realnego jezyka klientow |
| Pomieszanie danych treningowych i testowych | Wyniki testow sa sztucznie wysokie |
| Brak anonimizacji | Ryzyko prywatnosci |
| Brak danych o wyniku rozmowy | Nie wiadomo, ktore frazy prowadza do sukcesu |
| Brak timestampow | Trudno analizowac przerwania i timing |

## 1.9. Checklista danych startowych

- Czy mamy nagrania?
- Czy mamy transkrypcje?
- Czy mamy metadane rozmow?
- Czy znamy wynik rozmowy?
- Czy mamy dane o transferach i repeat contact?
- Czy dane sa z reprezentatywnego okresu?
- Czy dane sa zgodne z polityka prywatnosci?
- Czy dane osobowe sa maskowane?
- Czy mamy podzial train/validation/test?
- Czy mozemy wrocic z transkrypcji do audio przy analizie bledow?

## 1.10. Mini case study

Firma kurierska chciala trenowac intencje na podstawie kategorii z CRM. Kategoria "dostawa" obejmowala status, zmiane adresu, zmiane terminu, skarge na kuriera i pytania o odbior osobisty. Po analizie 500 transkrypcji zespół rozbil temat na cele uzytkownika. Model intencji stal sie stabilniejszy, a flow przestalo wrzucac wszystkie sprawy do jednego worka.

## 1.11. Cwiczenia

1. Zaprojektuj plan probkowania 1000 rozmow z contact center.
2. Wypisz metadane, ktore chcesz miec przy kazdej rozmowie.
3. Opisz, jak zamaskujesz dane osobowe.
4. Wskaz, jakie rozmowy musza wejsc do probki, aby nie byla zbyt "ladna".

## 1.12. Podsumowanie

Jakosc voicebota zaczyna sie od jakosci danych. Dobre dane sa reprezentatywne, powiazane z wynikiem rozmowy, bezpiecznie przetworzone i zachowuja kontakt z realnym audio. Bez tego projektowanie rozumienia jest zgadywaniem.

---

# Rozdzial 2. Dane treningowe, frazy uzytkownikow i klasy intencji

## 2.1. Cele rozdzialu

Czytelnik nauczy sie:

- budowac zestawy fraz treningowych;
- odrozniac frazy realne od sztucznych;
- projektowac klasy intencji;
- unikac nierownowagi i zbyt podobnych intencji.

## 2.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Training utterance | Fraza uzytkownika uzywana do trenowania lub konfiguracji rozpoznawania intencji |
| Intent class | Klasa intencji, do ktorej przypisuje sie wypowiedzi |
| Positive example | Fraza nalezaca do intencji |
| Negative example | Fraza nienalezaca do intencji, ale podobna lub ryzykowna |
| Class imbalance | Nierowna liczba przykladow miedzy klasami |
| Ambiguous utterance | Wypowiedz mozliwa do przypisania do wiecej niz jednej intencji |

## 2.3. Wyjasnienie eksperckie

Dane treningowe powinny odzwierciedlac realny sposob mowienia. Dla intencji `sprawdz_status_zamowienia` przyklady moga wygladac tak:

- "gdzie jest moje zamowienie";
- "co z moja paczka";
- "kiedy bedzie dostawa";
- "czy zamowienie juz wyszlo";
- "nie dostalem paczki";
- "kurier mial byc wczoraj";
- "chce sprawdzic status";
- "mam numer zamowienia i chce wiedziec, gdzie jest".

Nie wystarczy wpisac:

- "sprawdz status zamowienia";
- "status zamowienia";
- "chce status".

Takie frazy sa zbyt czyste. Prawdziwi uzytkownicy mowia kontekstowo i emocjonalnie.

## 2.4. Perspektywa biznesowa

Klasy intencji decyduja o:

- raportowaniu powodow kontaktu;
- routingu;
- automatyzacji;
- backlogu optymalizacji;
- priorytetach biznesowych.

Jesli dane treningowe sa zle, dashboard moze klamac. Bot moze raportowac "status", gdy w rzeczywistosci klient sklada skarge na opoznienie.

## 2.5. Perspektywa uzytkownika

Uzytkownik nie powinien dopasowywac jezyka do modelu. Model powinien uwzgledniac:

- frazy potoczne;
- skroty;
- emocje;
- niedopowiedzenia;
- wypowiedzi z danymi;
- wypowiedzi bez danych;
- prosby posrednie;
- negacje i korekty.

Przyklad:

"No wlasnie o to chodzi, ze znowu nie przyjechal" moze oznaczac problem z dostawa, ale wymaga kontekstu. Bez kontekstu to moze byc trudne do jednoznacznej klasyfikacji.

## 2.6. Perspektywa technologiczna

Dataset intencji powinien miec:

- unikalny identyfikator frazy;
- tekst frazy;
- intencje;
- zrodlo: realna/syntetyczna;
- jezyk;
- kanal;
- data dodania;
- etykietujacy;
- confidence/zgoda etykietujacych;
- notatki;
- wersja datasetu.

Przydatna tabela:

| utterance_id | text | intent | source | notes |
|---|---|---|---|---|
| u001 | gdzie jest moja paczka | sprawdz_status_zamowienia | real | czesta fraza |
| u002 | kurier nie przyjechal | problem_z_dostawa | real | moze mylic sie ze statusem |
| u003 | chce zmienic adres | zmien_adres_dostawy | real | jasna intencja |

## 2.7. Dobre praktyki

- Zaczynaj od realnych fraz.
- Dodawaj sztuczne frazy tylko jako uzupelnienie.
- Zbieraj przyklady negatywne dla podobnych intencji.
- Nie tworz intencji bez wystarczajacych danych.
- Pilnuj balansu klas.
- Oznaczaj frazy wieloznaczne.
- Regularnie przegladaj confusion matrix.
- Wersjonuj dataset.

## 2.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Same sztuczne frazy | Model nie zna realnego jezyka |
| Zbyt malo przykladow dla rzadkich intencji | Niski recall |
| Brak negatywnych przykladow | Wysoki false positive |
| Zbyt podobne intencje | Confusion |
| Brak wersjonowania danych | Nie wiadomo, co zmienilo jakosc |
| Przepisywanie fraz na ladna polszczyzne | Utrata realnego jezyka uzytkownika |

## 2.9. Checklista datasetu intencji

- Czy frazy sa realne?
- Czy sa warianty potoczne?
- Czy sa frazy emocjonalne?
- Czy sa frazy krotkie i dlugie?
- Czy sa przyklady negatywne?
- Czy klasy sa wzglednie zbalansowane?
- Czy frazy wieloznaczne sa oznaczone?
- Czy dataset ma wersje?
- Czy jest oddzielny test set?

## 2.10. Mini case study

Voicebot bankowy mylil `zastrzez_karte` z `zamow_nowa_karte`, bo dataset zawieral sztuczne frazy typu "chce karte". Po analizie rozmow dodano realne wypowiedzi: "zgubilem karte", "ktos mi ukradl portfel", "chce zablokowac platnosci", "karta nie przyszla". Intencje rozdzielono przez cel: blokada istniejącej karty vs zamowienie/wysylka nowej. False positive dla zastrzegania spadl.

## 2.11. Cwiczenia

1. Zbierz 30 fraz dla intencji "zmien termin wizyty".
2. Dodaj 10 negatywnych przykladow podobnych, ale nienalezacych.
3. Wskaz frazy wieloznaczne.
4. Zaprojektuj format tabeli datasetu.

## 2.12. Podsumowanie

Dane treningowe sa mapa realnego jezyka uzytkownikow. Im bardziej sa sztuczne, tym bardziej bot bedzie dzialal tylko w prezentacji. Dobre dane zawieraja potocznosc, niedoskonalosc i kontekst prawdziwych rozmow.

---

# Rozdzial 3. Encje, slowniki, synonimy i dane syntetyczne

## 3.1. Cele rozdzialu

Czytelnik nauczy sie:

- projektowac encje domenowe;
- tworzyc slowniki i synonimy;
- rozumiec wartosc i ryzyka danych syntetycznych;
- przygotowywac dane dla nazw wlasnych, produktow, kodow i wariantow jezykowych.

## 3.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Entity | Fragment wypowiedzi reprezentujacy dane, np. data, miasto, produkt |
| System entity | Encja wbudowana, np. data, liczba, waluta |
| Custom entity | Encja domenowa, np. nazwa pakietu, typ awarii |
| Synonym | Alternatywne okreslenie tej samej wartosci |
| Canonical value | Ujednolicona wartosc zapisywana w systemie |
| Synthetic data | Dane wygenerowane sztucznie jako uzupelnienie realnych przykladow |
| Gazetteer | Slownik nazw, np. miejsc, produktow, marek |

## 3.3. Wyjasnienie eksperckie

Encje sa potrzebne wtedy, gdy bot musi wyodrebnic dane z wypowiedzi:

- "na piatek" -> data;
- "Kwiatowa osiem" -> adres;
- "VPN" -> usluga IT;
- "pakiet rodzinny" -> produkt;
- "czternasta do szesnastej" -> okno czasowe;
- "Warszawa Mokotow" -> lokalizacja.

Slowniki i synonimy pomagaja normalizowac jezyk:

| Wypowiedz uzytkownika | Wartosc kanoniczna |
|---|---|
| net, internet, wifi | internet_service |
| karta, plastik, debetowka | debit_card |
| lekarz rodzinny, internista, POZ | primary_care |
| faktura, rachunek, rozliczenie | invoice |

Uwaga praktyczna:

Nie kazdy synonim jest bezpieczny. "Internet" i "Wi-Fi" moga znaczyc dla uzytkownika to samo, ale technologicznie moga prowadzic do innych diagnoz. Slownik musi byc konsultowany z ekspertami domenowymi.

## 3.4. Perspektywa biznesowa

Encje i slowniki wplywaja na:

- jakosc raportowania;
- poprawne routing;
- integracje;
- wyszukiwanie w CRM;
- segmentacje problemow;
- analize trendow.

Jesli bot nie normalizuje "net", "wifi" i "internet", raporty beda rozproszone. Jesli normalizuje zbyt agresywnie, moze ukryc roznice wazne dla procesu.

## 3.5. Perspektywa uzytkownika

Uzytkownik uzywa wlasnych slow. Nie mowi "usluga szerokopasmowego dostepu do internetu", tylko "net". Dobry bot powinien rozumiec potoczne synonimy, ale przy ryzyku doprecyzowac:

"Czy chodzi o internet domowy, czy o Wi-Fi w telefonie?"

## 3.6. Perspektywa technologiczna

Dobre encje maja:

- nazwe;
- opis;
- typ;
- wartosci kanoniczne;
- synonimy;
- przyklady;
- reguly walidacji;
- zrodlo prawdy;
- ownera;
- strategie aktualizacji.

Dane syntetyczne sa przydatne do:

- uzupelnienia rzadkich wariantow;
- testowania edge case'ow;
- generowania parafraz;
- pokrycia odmian jezykowych;
- przygotowania testow przed produkcja.

Ryzyka danych syntetycznych:

- brzmia zbyt ladnie;
- powtarzaja styl generatora;
- nie oddaja szumu ASR;
- wprowadzaja nieistniejace frazy;
- zaburzaja rozklad klas;
- tworza falszywe poczucie pokrycia.

## 3.7. Dobre praktyki

- Uzywaj realnych danych jako podstawy.
- Tworz synonimy z konsultantami i ekspertami domenowymi.
- Odróżniaj synonimy potoczne od technicznie rownowaznych.
- Normalizuj do wartosci kanonicznych.
- Testuj encje na transkrypcjach ASR, nie tylko na tekstach manualnych.
- Oznaczaj dane syntetyczne jako syntetyczne.
- Nie mieszaj bez kontroli danych syntetycznych z test setem.

## 3.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Slownik tylko z nazw oficjalnych | Bot nie rozumie potocznego jezyka |
| Zbyt szerokie synonimy | Bledna normalizacja |
| Brak ownera slownika | Slownik starzeje sie |
| Dane syntetyczne jako wiekszosc datasetu | Model uczy sie sztucznego jezyka |
| Brak testow ASR dla encji | Bot nie radzi sobie z wymowa |
| Brak walidacji encji | Zle dane trafiaja do API |

## 3.9. Checklista encji i slownikow

- Czy encja jest potrzebna do procesu?
- Czy ma wartosci kanoniczne?
- Czy ma potoczne synonimy?
- Czy synonimy sa zatwierdzone przez domenę?
- Czy encja ma walidacje?
- Czy testowano ja na audio/ASR?
- Czy ma ownera?
- Czy dane syntetyczne sa oznaczone?
- Czy syntetyki nie trafily do glownego test setu?

## 3.10. Mini case study

W voicebocie helpdeskowym encja `system` zawierala oficjalne nazwy aplikacji. Uzytkownicy mowili jednak "poczta", "maile", "outlook", "skrzynka". Bot nie rozpoznawal problemow z e-mailem. Po dodaniu synonimow i wartosci kanonicznej `email_service` poprawila sie klasyfikacja, ale zostawiono doprecyzowanie, gdy uzytkownik mowil "konto", bo moglo oznaczac konto pocztowe, bankowe lub systemowe.

## 3.11. Cwiczenia

1. Zbuduj slownik synonimow dla 10 produktow lub spraw.
2. Oznacz, ktore synonimy sa ryzykowne.
3. Wygeneruj 20 syntetycznych fraz i oznacz je jako syntetyczne.
4. Zaprojektuj walidacje dla encji "data wizyty".

## 3.12. Podsumowanie

Encje i slowniki sa miejscem, gdzie jezyk uzytkownika spotyka sie z systemami firmy. Dobre slowniki rozumieja potocznosc, ale nie gubia precyzji biznesowej.

---

# Rozdzial 4. Bledy etykietowania i governance danych

## 4.1. Cele rozdzialu

Czytelnik nauczy sie:

- rozpoznawac typowe bledy labelingu;
- organizowac proces etykietowania;
- mierzyc spojnosc anotatorow;
- utrzymywac dataset jako aktywo produktu.

## 4.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Labeling | Przypisywanie etykiet, np. intencji, encji, emocji |
| Annotation guideline | Instrukcja etykietowania |
| Inter-annotator agreement | Zgodnosc miedzy etykietujacymi |
| Gold set | Zweryfikowany zestaw referencyjny |
| Data drift | Zmiana jezyka, tematow lub rozkladu danych w czasie |
| Taxonomy | Uporzadkowany system kategorii |

## 4.3. Wyjasnienie eksperckie

Etykietowanie nie jest mechaniczna praca administracyjna. To decyzja interpretacyjna. Jesli dwie osoby inaczej rozumieja intencje, dataset bedzie niespojny, a model bedzie trenowany na sprzecznych sygnalach.

Typowe problemy:

- etykiety zbyt szerokie;
- etykiety zbyt podobne;
- brak instrukcji "poza zakresem";
- etykietowanie wedlug slow kluczowych, nie celu;
- ignorowanie kontekstu;
- etykietowanie naprawy jako nowej intencji;
- mieszanie intencji z emocja;
- brak drugiej weryfikacji trudnych przypadkow.

Przyklad:

Uzytkownik: "No super, kolejny raz paczka nie doszla."

Mozliwe etykiety:

- `problem_z_dostawa`;
- sygnal frustracji;
- potencjalnie `sprawdz_status_zamowienia`.

Dobra anotacja moze miec etykiete glowna `problem_z_dostawa` oraz dodatkowy tag `frustration_signal`.

## 4.4. Perspektywa biznesowa

Niespojna taksonomia powoduje:

- slabe modele;
- zle raporty;
- konflikty miedzy dzialami;
- trudne utrzymanie;
- bledne decyzje o priorytetach.

Dataset powinien miec ownera, proces zmian i review. To nie jest jednorazowy plik Excel.

## 4.5. Perspektywa uzytkownika

Zly labeling powoduje, ze bot zle interpretuje cel uzytkownika. Jesli wszystkie negatywne wypowiedzi trafiaja do "reklamacji", bot moze kierowac do procesu reklamacyjnego osoby, ktore chcialy tylko statusu po opoznieniu.

## 4.6. Perspektywa technologiczna

Proces labeling powinien obejmowac:

- annotation guideline;
- przykłady graniczne;
- zasady dla multi-intent;
- zasady dla emocji;
- zasady dla korekt;
- zasady dla "unknown/out of scope";
- review trudnych przypadkow;
- wersjonowanie;
- gold set;
- pomiar agreement.

## 4.7. Dobre praktyki

- Zanim etykietujesz, napisz guideline.
- Dodaj przyklady pozytywne, negatywne i graniczne.
- Etykietuj cel, nie slowo kluczowe.
- Oznaczaj emocje osobno od intencji.
- Oznaczaj multi-intent, nie kasuj drugiego celu.
- Tworz gold set.
- Mierz zgodnosc anotatorow.
- Regularnie przegladaj taxonomy.

## 4.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Brak guideline | Kazdy etykietuje inaczej |
| Etykietowanie po slowach kluczowych | Zle intencje |
| Brak out-of-scope | Model lapie wszystko |
| Brak gold setu | Nie ma punktu odniesienia |
| Brak review trudnych przypadkow | Sprzeczne dane |
| Zmienianie taksonomii bez migracji danych | Chaos wersji |

## 4.9. Checklista labelingu

- Czy istnieje guideline?
- Czy kazda intencja ma zakres i poza zakresem?
- Czy sa przyklady graniczne?
- Czy mamy etykiete out-of-scope?
- Czy emocje sa tagowane osobno?
- Czy multi-intent ma zasady?
- Czy jest gold set?
- Czy mierzymy agreement?
- Czy dataset jest wersjonowany?

## 4.10. Mini case study

W projekcie ubezpieczeniowym anotatorzy etykietowali "chce wiedziec, czy dostane odszkodowanie" raz jako FAQ, raz jako status szkody, raz jako decyzje. Po warsztacie ustalono guideline: pytania o indywidualna decyzje trafiaja do `ocena_indywidualna_poza_zakresem`, a bot moze tylko sprawdzic status lub przekazac do konsultanta. Zmniejszylo to ryzyko, ze bot zacznie udzielac interpretacji poza zakresem.

## 4.11. Cwiczenia

1. Napisz guideline dla trzech intencji.
2. Oznacz 10 fraz granicznych.
3. Zaprojektuj zasade dla multi-intent.
4. Opisz, jak mierzysz zgodnosc anotatorow.

## 4.12. Podsumowanie

Labeling jest fundamentem jakosci rozumienia. Bez jasnych zasad dataset staje sie zbiorem opinii. Z jasnymi zasadami staje sie aktywem, ktore mozna rozwijac, testowac i audytowac.

---

# Rozdzial 5. Jakosc ASR: akcenty, halas, tempo i sposob mowienia

## 5.1. Cele rozdzialu

Czytelnik nauczy sie:

- rozumiec czynniki wplywajace na ASR;
- odrozniac blad ASR od bledu NLU;
- projektowac testy ASR dla realnych warunkow;
- przygotowywac dialog odporny na niedoskonala transkrypcje.

## 5.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| ASR error | Blad rozpoznawania mowy |
| WER | Word Error Rate, blad na poziomie slow |
| Entity error | Blad rozpoznania waznej encji, np. numeru lub daty |
| Partial transcript | Czesciowa transkrypcja w trakcie wypowiedzi |
| Final transcript | Ostateczna transkrypcja tury |
| Acoustic condition | Warunki audio: halas, echo, jakosc polaczenia |
| Accent robustness | Odpornosc na akcenty i warianty wymowy |

## 5.3. Wyjasnienie eksperckie

ASR moze zrobic blad nawet wtedy, gdy uzytkownik mowi poprawnie. Powody:

- halas ulicy;
- glosnomowiacy telefon;
- slaby zasieg;
- szybka mowa;
- cicha mowa;
- akcent regionalny;
- wada wymowy;
- obcy jezyk w nazwach;
- cyfry i litery;
- nazwy wlasne;
- emocje;
- barge-in i overlap.

Nie kazdy blad ASR ma ten sam koszt. WER moze byc umiarkowanie wysoki, ale bot nadal dziala, jesli najwazniejsza intencja i encje sa poprawne. Odwrotnie: transkrypcja moze byc prawie idealna, ale jedna zle rozpoznana cyfra moze zepsuc proces.

## 5.4. Perspektywa biznesowa

Jakosc ASR wplywa na:

- udane identyfikacje;
- bledy transakcyjne;
- czas rozmowy;
- frustracje;
- koszt konsultantow;
- wiarygodnosc automatyzacji.

W procesach wysokiego ryzyka trzeba mierzyc nie tylko WER, ale tez critical field accuracy: poprawnosc danych krytycznych.

## 5.5. Perspektywa uzytkownika

Uzytkownik nie powinien placic za blad ASR wysilkiem i poczuciem winy. Komunikaty powinny brzmiec:

"Nie mam pewnosci, czy dobrze uslyszalem. Prosze powtorzyc ostatnie trzy cyfry."

Nie:

"Podal pan niepoprawny numer."

## 5.6. Perspektywa technologiczna

Test ASR powinien obejmowac:

- realne rozmowy telefoniczne;
- rozne urzadzenia;
- rozne poziomy halasu;
- osoby starsze;
- akcenty i gwary;
- szybka i wolna mowe;
- krotkie odpowiedzi;
- dlugie opisy;
- cyfry, daty, kwoty, adresy;
- barge-in;
- osoby trzecie w tle.

Metryki:

- WER;
- intent-impacting ASR errors;
- entity accuracy;
- digit accuracy;
- no-speech false negatives;
- noise false positives;
- endpointing errors;
- repeat rate after ASR error.

## 5.7. Dobre praktyki

- Testuj ASR w kanale produkcyjnym.
- Tworz custom vocabulary.
- Dziel kody i numery na grupy.
- Uzywaj DTMF jako alternatywy dla danych trudnych.
- Potwierdzaj dane krytyczne.
- Analizuj bledy ASR osobno od NLU.
- Mierz wplyw ASR na wynik procesu.
- Nie obwiniaj uzytkownika w komunikatach.

## 5.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Testy tylko na czystych nagraniach | Produkcja wypada gorzej |
| Mierzenie tylko ogolnego WER | Pomijasz dane krytyczne |
| Brak DTMF dla kodow | Duza frustracja |
| Brak slownika nazw | Bot myli produkty i miejscowosci |
| Brak analizy endpointing | ASR wydaje sie winny, ale problemem jest ucinanie |
| Brak testow osob starszych lub akcentow | System dziala nierowno dla grup uzytkownikow |

## 5.9. Checklista ASR QA

- Czy testujemy realny kanal telefoniczny?
- Czy mamy probki z halasem?
- Czy mamy rozne akcenty i tempo mowy?
- Czy testujemy cyfry i kody?
- Czy testujemy nazwy wlasne?
- Czy mierzymy entity accuracy?
- Czy mierzymy digit accuracy?
- Czy analizujemy endpointing?
- Czy mamy alternatywe DTMF?
- Czy komunikaty repair sa przyjazne?

## 5.10. Mini case study

Voicebot medyczny zle rozpoznawal nazwiska pacjentow i nazwy miejscowosci. Zespol przestal probowac "idealnie rozpoznawac nazwisko" jako glowny sposob identyfikacji. Wprowadzono identyfikacje po numerze telefonu i dacie urodzenia, potwierdzenie tylko fragmentow danych oraz mozliwosc DTMF dla kodu SMS. ASR nadal nie byl idealny, ale proces stal sie odporniejszy.

## 5.11. Cwiczenia

1. Zaprojektuj test ASR dla numeru polisy.
2. Wypisz 20 nazw wymagajacych custom vocabulary.
3. Zaprojektuj repair dla zle rozpoznanej daty.
4. Okresl metryke "critical field accuracy" dla wybranego procesu.

## 5.12. Podsumowanie

ASR nigdy nie jest neutralny. Jego bledy trzeba rozumiec, mierzyc i kompensowac projektem dialogu. Dobra jakosc voicebota nie wymaga perfekcyjnego ASR, ale wymaga swiadomej pracy z jego ograniczeniami.

---

# Rozdzial 6. Testowanie NLU: confusion matrix, precision, recall i F1

## 6.1. Cele rozdzialu

Czytelnik nauczy sie:

- oceniac jakosc rozpoznawania intencji;
- interpretowac confusion matrix;
- rozumiec precision, recall i F1;
- zamieniac wyniki testow na decyzje projektowe.

## 6.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Test set | Zestaw danych do niezaleznej oceny modelu |
| Confusion matrix | Tabela pokazujaca, ktore klasy model myli ze soba |
| Precision | Jaki odsetek przewidywan danej intencji byl poprawny |
| Recall | Jaki odsetek prawdziwych przypadkow danej intencji zostal znaleziony |
| F1 | Srednia harmoniczna precision i recall |
| False positive | Model wykryl intencje, ktorej nie bylo |
| False negative | Model nie wykryl intencji, ktora byla |
| Threshold | Prog pewnosci decyzji |

## 6.3. Wyjasnienie eksperckie

Nie wystarczy powiedziec "model ma 90% accuracy". W voicebotach wazne jest, ktore bledy robi.

Przyklad:

- Model myli `sprawdz_status` z `informacja_o_dostawie`: umiarkowany koszt.
- Model myli `anuluj_zamowienie` z `sprawdz_status`: wysoki koszt.
- Model nie rozpoznaje `konsultant`: wysoki koszt UX.

Confusion matrix pokazuje, gdzie model myli klasy.

Przyklad uproszczony:

| Prawdziwa \ Przewidziana | status | zmiana_adresu | anulowanie | konsultant |
|---|---:|---:|---:|---:|
| status | 82 | 5 | 0 | 3 |
| zmiana_adresu | 7 | 70 | 1 | 2 |
| anulowanie | 2 | 1 | 45 | 2 |
| konsultant | 6 | 1 | 0 | 58 |

Wnioski:

- `status` i `zmiana_adresu` czasem sie myla, warto dodac disambiguation.
- `konsultant` ma false negatives, trzeba poprawic, bo uzytkownik moze utknac.
- `anulowanie` ma wysoka stawke, nawet male bledy wymagaja potwierdzen.

## 6.4. Precision i recall praktycznie

Precision odpowiada: gdy model mowi "to jest intencja X", jak czesto ma racje?

Recall odpowiada: z wszystkich prawdziwych przypadkow intencji X, ile model znalazl?

Przyklad:

Intencja `popros_o_konsultanta`:

- Wysoki recall jest krytyczny, bo nie chcemy ignorowac prosb o czlowieka.
- Precision tez wazne, ale false positive moze co najwyzej czesciej eskalowac.

Intencja `anuluj_zamowienie`:

- Precision jest krytyczne, bo nie chcemy blednie rozpoznac anulowania.
- Recall tez wazne, ale mozna dopytac i potwierdzic.

## 6.5. Perspektywa biznesowa

Metryki NLU trzeba interpretowac przez koszt bledu. Nie wszystkie intencje potrzebuja takiego samego progu.

| Intencja | Priorytet |
|---|---|
| Konsultant | Wysoki recall |
| Anulowanie | Wysoki precision + explicit confirmation |
| Status | Balans precision/recall |
| FAQ | Mozliwie wysoki recall, z bezpiecznym fallbackiem |
| Platnosc | Wysoki precision, compliance |

## 6.6. Perspektywa uzytkownika

Uzytkownik odczuwa bledy NLU jako:

- bot idzie zla sciezka;
- bot ignoruje prosbe;
- bot pyta o nieistotne dane;
- bot zmusza do powtarzania;
- bot nie chce polaczyc z czlowiekiem.

Dlatego testy NLU musza obejmowac frazy emocjonalne i meta-intencje, nie tylko glowne use case'y.

## 6.7. Perspektywa technologiczna

Dobre testowanie NLU wymaga:

- zamrozonego test setu;
- danych realnych;
- danych z ASR, nie tylko manualnych transkrypcji;
- metryk per intencja;
- analizy false positives i false negatives;
- progow confidence per intencja;
- testow regresji po kazdej zmianie;
- wersjonowania modelu i datasetu.

## 6.8. Dobre praktyki

- Nie uzywaj tych samych fraz do treningu i testu.
- Raportuj metryki per intencja.
- Analizuj confusion, nie tylko accuracy.
- Ustal progi per intencja.
- Dla intencji wysokiego ryzyka stosuj potwierdzenia i handoff.
- Testuj na transkrypcjach ASR.
- Trzymaj stale testy regresji.

## 6.9. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Jedna ogolna accuracy | Ukrywa ryzykowne bledy |
| Testowanie na training set | Fałszywie dobre wyniki |
| Brak out-of-scope w testach | Bot lapie wszystko |
| Brak testow meta-intencji | Uzytkownik nie moze sterowac rozmowa |
| Ten sam threshold dla wszystkich intencji | Zly balans precision/recall |
| Brak testow regresji | Poprawa jednej intencji psuje inna |

## 6.10. Checklista NLU test

- Czy mamy oddzielny test set?
- Czy test set zawiera realne frazy?
- Czy test set zawiera ASR transcripts?
- Czy sa frazy out-of-scope?
- Czy sa meta-intencje?
- Czy raportujemy precision, recall i F1 per intencja?
- Czy analizujemy confusion matrix?
- Czy mamy progi per intencja?
- Czy mamy testy regresji?

## 6.11. Mini case study

Voicebot e-commerce mial 91% accuracy, ale uzytkownicy skarzyli sie, ze trudno przejsc do konsultanta. Analiza per intencja pokazala, ze `popros_o_konsultanta` miala recall 62%, bo frazy typu "daj kogos normalnego", "operator", "czlowiek", "nie chce bota" nie byly w datasetcie. Po dodaniu fraz i obnizeniu progu dla tej intencji eskalacja zaczela dzialac lepiej.

## 6.12. Cwiczenia

1. Zinterpretuj przykladowa confusion matrix.
2. Wybierz intencje, dla ktorej wazniejszy jest precision.
3. Wybierz intencje, dla ktorej wazniejszy jest recall.
4. Zaprojektuj test set z out-of-scope.

## 6.13. Podsumowanie

Testowanie NLU to nie ranking modelu. To analiza ryzyka bledow. Najwazniejsze pytanie brzmi: ktore pomylki sa akceptowalne, ktore wymagaja doprecyzowania, a ktore musza prowadzic do potwierdzenia lub czlowieka.

---

# Rozdzial 7. Analiza nierozpoznanych wypowiedzi i continuous training

## 7.1. Cele rozdzialu

Czytelnik nauczy sie:

- prowadzic analize no-match i fallbackow;
- wykrywac luki w intencjach;
- budowac backlog optymalizacji;
- utrzymywac voicebota po wdrozeniu.

## 7.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Unrecognized utterance | Wypowiedz nierozpoznana lub zle rozpoznana |
| No-match analysis | Analiza wypowiedzi, ktorych system nie dopasowal |
| Drift | Zmiana jezyka lub tematow w czasie |
| Continuous training | Cykliczne doskonalenie danych i modeli |
| Regression test | Test sprawdzajacy, czy zmiana nie popsula poprzednich zachowan |
| Optimization backlog | Lista zmian oparta na danych produkcyjnych |

## 7.3. Wyjasnienie eksperckie

Po wdrozeniu zaczyna sie prawdziwa nauka. Produkcja ujawnia:

- nowe frazy;
- nowe problemy;
- sezonowosc;
- bledy ASR;
- nieznane intencje;
- zle fallbacki;
- przerwania w konkretnych promptach;
- miejsca, gdzie uzytkownicy chca czlowieka;
- zmiany produktowe, ktorych bot nie zna.

Proces continuous training:

```text
1. Zbierz logi i transkrypcje.
2. Wyfiltruj no-match, fallback, handoff, niskie confidence, negatywne feedbacki.
3. Grupuj wypowiedzi tematycznie.
4. Oznacz przyczyne: brak intencji, blad ASR, zly prompt, brak integracji, out-of-scope.
5. Zaproponuj zmiane: dane, flow, prompt, integracja, handoff.
6. Dodaj testy regresji.
7. Wdroż zmiane.
8. Monitoruj efekt.
```

## 7.4. Perspektywa biznesowa

Continuous training jest kosztem utrzymania, ale tez zrodlem wartosci. Pokazuje:

- czego klienci zaczeli pytac;
- ktore procesy generuja nowe kontakty;
- gdzie firma ma problem operacyjny;
- jakie nowe use case'y warto dodac;
- ktore obietnice bota nie pokrywaja sie z rzeczywistoscia.

Bot bez utrzymania starzeje sie. Produkty, procedury, ceny, regulaminy i jezyk uzytkownikow sie zmieniaja.

## 7.5. Perspektywa uzytkownika

Uzytkownik oczekuje, ze bot bedzie znal aktualne sprawy. Jesli firma zmienila procedure zwrotow, a bot nadal odpowiada stara wersja, traci zaufanie. Jesli sezonowo pojawia sie nowy temat, np. opoznienia dostaw przed swietami, bot powinien zostac szybko zaktualizowany.

## 7.6. Perspektywa technologiczna

Continuous training wymaga:

- pipeline eksportu danych;
- anonimizacji;
- narzedzia do anotacji;
- wersjonowania datasetow;
- testow automatycznych;
- procesu review;
- release management;
- rollback;
- dashboardu metryk przed/po.

Zmiany nie powinny byc wrzucane bez testow. Dodanie fraz do jednej intencji moze pogorszyc inna.

## 7.7. Kategorie przyczyn no-match

| Przyczyna | Co zrobic |
|---|---|
| Brak intencji | Dodaj intencje lub rozszerz zakres |
| Zbyt podobne intencje | Scal intencje lub dodaj disambiguation |
| Blad ASR | Popraw slownik, dialog, DTMF, ASR config |
| Zly prompt | Przepisz pytanie, podaj przyklady |
| Brak danych/integracji | Dodaj integracje lub handoff |
| Out-of-scope | Dodaj elegancka odmowe i routing |
| Frustracja | Skroc flow, dodaj handoff |
| Zmiana biznesowa | Zaktualizuj baze wiedzy/flow |

## 7.8. Dobre praktyki

- Analizuj no-match regularnie, szczegolnie po starcie.
- Grupuj wypowiedzi, nie poprawiaj pojedynczych przypadkow impulsywnie.
- Dla istotnych lub powtarzalnych bledow dodawaj test regresji.
- Mierz efekt po zmianie.
- Oddziel zmiany danych od zmian flow.
- Utrzymuj changelog modelu i datasetu.
- Wlacz konsultantow w interpretacje trudnych fraz.
- Ustal rytm release, np. tygodniowy lub dwutygodniowy.

## 7.9. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Brak opiekuna po wdrozeniu | Bot przestaje pasowac do rzeczywistosci |
| Dodawanie fraz bez analizy confusion | Poprawa jednego psuje drugie |
| Brak testow regresji | Niespodziewane regresje |
| Poprawianie wszystkiego naraz | Nie wiadomo, co zadzialalo |
| Ignorowanie out-of-scope | Bot probuje odpowiadac na wszystko |
| Brak monitoringu sezonowosci | Bot nie reaguje na zmiany |

## 7.10. Checklista continuous training

- Czy mamy regularny eksport no-match?
- Czy mamy proces anonimizacji?
- Czy mamy narzedzie anotacji?
- Czy mamy review trudnych przypadkow?
- Czy mamy backlog optymalizacji?
- Czy kazda zmiana ma test regresji?
- Czy dataset jest wersjonowany?
- Czy model/flow ma changelog?
- Czy mierzymy efekt po wdrozeniu?
- Czy jest owner utrzymania?

## 7.11. Mini case study

Po wdrozeniu voicebota zwrotowego w e-commerce pojawily sie setki fraz "paczkomat", "kod nadania", "etykieta nie dziala". Bot mial intencje "jak zrobic zwrot", ale nie rozumial problemow z etykieta. Analiza no-match pokazala nowy use case: problemy z nadaniem zwrotu. Zespol dodal intencje, krotki flow diagnostyczny i SMS z nowym linkiem do etykiety. Fallback rate spadl, a konsultanci dostawali mniej prostych spraw.

## 7.12. Cwiczenia

1. Zaprojektuj tygodniowy proces analizy no-match.
2. Stworz kategorie przyczyn fallbackow dla swojego use case'u.
3. Napisz template backlog item dla optymalizacji.
4. Zaprojektuj test regresji dla nowej frazy.

## 7.13. Podsumowanie

Voicebot po wdrozeniu nie jest skonczony. Produkcja jest zrodlem najwazniejszych danych. Continuous training zamienia nieudane rozmowy w konkretne usprawnienia, ale tylko wtedy, gdy proces jest regularny, kontrolowany i testowany.

---

# Rozdzial 8. Dashboard jakosci rozumienia

## 8.1. Cele rozdzialu

Czytelnik nauczy sie:

- projektowac dashboard dla ASR/NLU;
- laczyc metryki techniczne z konwersacyjnymi;
- wykrywac problemy wymagajace optymalizacji;
- raportowac jakosc w sposob zrozumialy dla biznesu i technologii.

## 8.2. Kluczowe metryki

| Metryka | Co mierzy | Po co |
|---|---|---|
| Intent accuracy | Poprawnosc klasyfikacji intencji | Ogolna jakosc NLU |
| Precision per intent | Trafnosc przewidywan intencji | Ryzyko false positive |
| Recall per intent | Wykrywanie prawdziwych przypadkow | Ryzyko false negative |
| Fallback rate | Odsetek nierozpoznanych sytuacji | Luki danych/flow |
| No-input rate | Brak mowy/inputu | Prompt, audio, UX |
| No-match rate | Input poza oczekiwaniem | NLU, prompt, zakres |
| ASR critical field accuracy | Poprawnosc danych krytycznych | Ryzyko transakcyjne |
| Entity accuracy | Poprawnosc encji | Jakosc slot filling |
| Disambiguation success | Skutecznosc doprecyzowania | Czy bot naprawia niepewnosc |
| Repeat after bot question | Powtorzenia uzytkownika | Slaby prompt lub ASR |
| Handoff after misunderstanding | Eskalacje po niezrozumieniu | Frustracja i ryzyko UX |

## 8.3. Wyjasnienie eksperckie

Dashboard jakosci rozumienia powinien odpowiadac na pytania:

1. Czy bot rozpoznaje glowne intencje?
2. Ktore intencje myli?
3. Ktore sloty sa najtrudniejsze?
4. Gdzie pojawia sie no-input?
5. Gdzie pojawia sie no-match?
6. Czy problemy wynikaja z ASR, NLU, promptu czy procesu?
7. Czy ostatnia zmiana poprawila wynik?
8. Czy jakosc jest stabilna w czasie?

Nie wystarczy pokazac jedna liczbe. Potrzebne sa widoki:

- per intencja;
- per flow;
- per prompt;
- per kanal;
- per segment;
- w czasie;
- przed/po release.

## 8.4. Perspektywa biznesowa

Biznes potrzebuje interpretacji:

Zle:

"NLU F1 wynosi 0,82."

Lepsze:

"Bot dobrze rozpoznaje status zamowienia, ale myli zmiane adresu z reklamacja dostawy. To powoduje 12% dodatkowych handoffow w tym flow. Rekomendujemy scalenie czesci intencji i pytanie doprecyzowujace."

## 8.5. Perspektywa uzytkownika

Dashboard powinien wykrywac miejsca, gdzie uzytkownik cierpi:

- powtarza te sama informacje;
- jest przekierowywany po kilku bledach;
- przerywa botowi;
- milczy po niezrozumialym pytaniu;
- porzuca rozmowe.

Jakość rozumienia nie jest tylko metryka modelu. To odczuwalna jakosc rozmowy.

## 8.6. Perspektywa technologiczna

Dashboard wymaga dobrych logow:

- conversation_id;
- prompt_id;
- ASR final/partial;
- intent prediction;
- confidence;
- expected input;
- actual input;
- slot extraction;
- fallback/no-match/no-input;
- handoff reason;
- release version;
- dataset/model version.

## 8.7. Dobre praktyki

- Pokazuj metryki per intencja i per flow.
- Dodaj trend w czasie.
- Dodaj widok po release.
- Laczy metryki z przykladami transkrypcji.
- Oznaczaj przyczyne problemu po analizie.
- Pokazuj top no-match phrases.
- Pokazuj critical field accuracy dla danych wysokiego ryzyka.
- Dashboard powinien prowadzic do backlogu, nie tylko raportowac.

## 8.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Dashboard tylko dla wolumenu | Brak informacji o jakosci |
| Jedna accuracy dla calego bota | Ukryte problemy intencji krytycznych |
| Brak prompt_id | Nie wiadomo, ktore pytanie generuje blad |
| Brak wersji modelu | Nie wiadomo, co zmienilo wynik |
| Brak przykladow rozmow | Metryki bez interpretacji |
| Brak polaczenia z backlogiem | Raport nie prowadzi do dzialania |

## 8.9. Checklista dashboardu

- Czy widac metryki per intencja?
- Czy widac metryki per flow?
- Czy widac no-input i no-match per prompt?
- Czy widac ASR critical field accuracy?
- Czy widac handoff reasons?
- Czy widac wersje modelu/flow?
- Czy widac trend przed/po release?
- Czy dashboard pokazuje przyklady rozmow?
- Czy wyniki tworza backlog optymalizacji?

## 8.10. Mini case study

Dashboard voicebota rezerwacyjnego pokazywal stabilny task completion, ale wzrost no-input przy pytaniu o lokalizacje. Analiza prompt_id pokazala, ze po zmianie copy bot pytal: "Jaka placowka jest preferowana?", zamiast "W ktorym miescie chce pani wizyte?". Uzytkownicy milczeli, bo pytanie bylo zbyt formalne. Po zmianie promptu no-input spadl.

## 8.11. Cwiczenia

1. Zaprojektuj dashboard jakosci rozumienia dla statusu zamowienia.
2. Wskaz 5 metryk dla ASR.
3. Wskaz 5 metryk dla NLU.
4. Opisz, jak dashboard generuje backlog.

## 8.12. Podsumowanie

Dashboard jakosci rozumienia laczy dane techniczne z doswiadczeniem uzytkownika. Jego celem nie jest dekoracja raportowa, lecz szybkie wykrywanie, gdzie bot nie rozumie ludzi i co trzeba poprawic.

---

# 9. Zbiorcza checklista po Czesci VI

- Czy masz reprezentatywne nagrania i transkrypcje?
- Czy dane sa zgodne z prywatnoscia i retencja?
- Czy masz metadane rozmow i wynik kontaktu?
- Czy dataset ma realne frazy uzytkownikow?
- Czy intencje maja przyklady pozytywne i negatywne?
- Czy encje maja slowniki, synonimy i walidacje?
- Czy dane syntetyczne sa oznaczone?
- Czy istnieje guideline etykietowania?
- Czy jest gold set?
- Czy testujesz ASR w realnym kanale?
- Czy mierzysz critical field accuracy?
- Czy masz confusion matrix dla NLU?
- Czy raportujesz precision, recall i F1 per intencja?
- Czy masz test set oddzielony od treningu?
- Czy analizujesz no-match i fallbacki regularnie?
- Czy kazda optymalizacja ma test regresji?
- Czy dashboard pokazuje jakosc per intencja, flow i prompt?

---

# 10. Co bedzie w kolejnej czesci

Kolejna czesc powinna opracowac **Czesc VII. LLM, RAG i generatywna AI w voicebotach**:

1. Kiedy uzywac LLM w voicebocie, a kiedy nie.
2. Voicebot deterministyczny vs generatywny.
3. Hybryda flow-based + LLM.
4. Prompt systemowy voicebota.
5. Ograniczanie odpowiedzi modelu.
6. RAG i przygotowanie bazy wiedzy.
7. Halucynacje, guardrails, prompt injection.
8. Function calling i narzedzia.
9. Latency, koszty i observability dla LLM voicebotow.
10. Przykladowe prompty systemowe dla kilku typow voicebotow.
