# Voicebot Specialist Handbook

## Część 7: Dane, trening i jakość rozumienia

Wersja robocza: 2026-07-29  
Kontynuacja plików:

- `Voicebot_Specialist_Handbook_czesc_1.md`
- `Voicebot_Specialist_Handbook_czesc_2.md`
- `Voicebot_Specialist_Handbook_czesc_3.md`
- `Voicebot_Specialist_Handbook_czesc_4.md`
- `Voicebot_Specialist_Handbook_czesc_5.md`
- `Voicebot_Specialist_Handbook_czesc_6.md`

---

# Część VI. Dane, trening i jakość rozumienia

## Cel całej części

Voicebot nie rozumie użytkowników dlatego, że zespół wpisal ladne intencje do dokumentu. Rozumie ich wtedy, gdy ma dobrze zebrane, opisane, przetestowane i stałe aktualizowane dane. Dane w voicebotach są trudniejsze niż w chatbotach, bo mowa przechodzi przez ASR, zawiera pauzy, powtórzenia, poprawki, urwane zdania, emocje, akcenty, szum i błędy transkrypcji.

Ta część pokazuje, jak budowac i utrzymywać jakość rozumienia w voicebocie.

Po tej części czytelnik powinien umieć:

1. Zbierac i przygotowywac dane z rozmów.
2. Pracować z transkrypcjami i nagraniami.
3. Projektować dane treningowe dla intencji i encji.
4. Tworzyć słowniki, synonimy i dane syntetyczne.
5. Rozpoznawać błędy etykietowania.
6. Analizowac jakość ASR i jej wpływ na NLU.
7. Testować NLU przy pomocy confusion matrix, precision, recall i F1.
8. Prowadzić continuous training i analizę nierozpoznanych wypowiedzi.

Źródła wspierające część:

- Dokumentacje Google Dialogflow CX i Amazon Lex: intencje, parametry, sloty, confidence, no-match, speech settings.
- Dokumentacje LiveKit i OpenAI Realtime: streaming ASR, partials, turn detection, interruption handling i logi rozmów realtime.
- Źródła naukowe o turn-taking i przerwaniach: uzasadnienie, dlaczego dane głosowe muszą obejmować overlap, pauzy, barge-in i false interruptions.
- Uzupełnienie eksperckie: praktyki data labeling, test set design, confusion analysis, continuous improvement i governance danych.

---

# Rozdział 1. Zbieranie danych i transkrypcje rozmów

## 1.1. Cele rozdziału

Czytelnik nauczy się:

- rozumieć, jakie dane są potrzebne do projektowania i trenowania voicebota;
- odróżniać nagrania, transkrypcje, logi i metadane;
- oceniać jakość danych z contact center;
- przygotować dane zgodnie z prywatnoscia i compliance.

## 1.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja praktyczna |
|---|---|
| Nagranie | Audio rozmowy, zwykle najblizsze realnemu doświadczeniu użytkownika |
| Transkrypcją | Tekstowy zapis rozmowy, automatyczny lub manualny |
| Log dialogowy | Zapis zdarzeń systemu: intencje, sloty, fallbacki, handoff, API |
| Metadane | Dane opisujace rozmowę, np. kolejka, data, AHT, wynik, segment klienta |
| Redakcja danych | Usuwanie lub maskowanie danych osobowych/wrażliwych |
| Sampling | Dobor probki rozmów do analizy |
| Annotation | Oznaczanie fragmentow danych etykietami |

## 1.3. Wyjaśnienie eksperckie

Najlepsze dane do voicebota pochodza z realnych rozmów. Raporty contact center pokazują wolumeny, ale nie pokazują języka użytkowników. Konsultanci mogą opisać typowe sprawy, ale nie zawsze pamiętają wszystkie warianty. Dopiero nagrania i transkrypcje pokazują, jak ludzie naprawde mówią:

- chaotycznie;
- z przerwami;
- niepełnych zdaniach;
- potocznym językiem;
- że skrótami;
- z emocjami;
- w wielu intencjach naraz;
- z poprawkami;
- z osobami trzecimi w tle.

Minimalny pakiet danych do projektu:

1. Nagrania rozmów.
2. Transkrypcje.
3. Powod kontaktu lub wrap-up code.
4. Wynik rozmowy.
5. AHT.
6. Transfer/handoff.
7. Repeat contact, jeśli dostępny.
8. Segment klienta, jeśli istotny i zgodny z polityka danych.
9. Informacja o zgodach i retencji.

Uwaga praktyczna:

Jeśli nie masz transkrypcji, zacznij od probki nagrań. Nie projektuj intencji tylko z glow menedzerow i nazw kolejek. To prosta droga do bota, który rozumie organizacje, ale nie rozumie klientów.

## 1.4. Perspektywa biznesowa

Dane odpowiadają na pytania:

- które use case'y mają największy wolumen;
- jak ludzie formuluja potrzeby;
- jakie są najczestsze wyjatki;
- gdzie konsultant traci czas;
- gdzie użytkownik się frustruje;
- które sprawy powinny isc do człowieka;
- jakie są luki w procesie.

Bez danych biznes nie ma baseline. Bez baseline nie da się uczciwie powiedzieć, czy voicebot poprawil proces.

## 1.5. Perspektywa użytkownika

Użytkownik nie mówi tak, jak firma nazywa procesy. Firma mówi "dyspozycja zmiany harmonogramu dostawy". Użytkownik mówi:

- "nie będzie mnie jutro";
- "kurier ma przyjechać w zły dzien";
- "przelozcie paczkę";
- "chce inna godzinę";
- "nie dam rady odebrac".

Analiza danych pomaga projektować pod język użytkownika, nie pod język regulaminu.

## 1.6. Perspektywa technologiczna

Dane muszą być przygotowane technicznie:

- format audio;
- jakość nagrań;
- rozdzielenie kanałów, jeśli dostępne;
- diarization, czyli kto mówi;
- timestampy;
- anonimizacja;
- eksport transkrypcji;
- powiazanie transkrypcji z metadanymi;
- identyfikator rozmowy;
- wersja modelu lub systemu, jeśli dane są z produkcyjnego bota.

## 1.7. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Zbieraj probke z różnych dni, godzin, kolejek i segmentow.
- Nie opieraj się tylko na najlepszych lub najczystszych rozmowąch.
- Uwzglednij rozmowy zakonczone sukcesem i porażka.
- Zachowaj związek między transkrypcją, audio i wynikiem.
- Maskuj dane osobowe przed szeroka analiza.
- Zapisuj, skad pochodza dane i z jakiego okresu.
- Oddziel dane do treningu, walidacji i testów.

## 1.8. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Projektowanie na podstawie 20 ręcznie wybranych rozmów | Dane są niereprezentatywne |
| Brak nagrań, tylko wrap-up codes | Brak realnego języka klientów |
| Pomieszanie danych treningowych i testowych | Wyniki testów są sztucznie wysokie |
| Brak anonimizacji | Ryzyko prywatności |
| Brak danych o wyniku rozmowy | Nie wiadomo, które frazy prowadza do sukcesu |
| Brak timestampow | Trudno analizować przerwania i timing |

## 1.9. Checklista danych startowych

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy mamy nagrania?
- Czy mamy transkrypcje?
- Czy mamy metadane rozmów?
- Czy znamy wynik rozmowy?
- Czy mamy dane o transferach i repeat contact?
- Czy dane są z reprezentatywnego okresu?
- Czy dane są zgodne z polityka prywatności?
- Czy dane osobowe są maskowane?
- Czy mamy podzial train/validation/test?
- Czy możemy wrócić z transkrypcji do audio przy analizie błędów?

## 1.10. Mini case study

Firma kurierska chciała trenowac intencje na podstawie kategorii z CRM. Kategoria "dostawa" obejmowala status, zmianę adresu, zmianę terminu, skargę na kuriera i pytania o odbiór osobisty. Po analizie 500 transkrypcji zespół rozbił temat na cele użytkownika. Model intencji stał się stabilniejszy, a flow przestało wrzucać wszystkie sprawy do jednego worka.

## 1.11. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Zaprojektuj plan probkowania 1000 rozmów z contact center.
2. Wypisz metadane, które chcesz mieć przy każdej rozmowie.
3. Opisz, jak zamaskujesz dane osobowe.
4. Wskaż, jakie rozmowy muszą wejść do probki, aby nie była zbyt "ladna".

## 1.12. Podsumowanie

Jakość voicebota zaczyna się od jakości danych. Dobre dane są reprezentatywne, powiązane z wynikiem rozmowy, bezpiecznie przetworzone i zachowuja kontakt z realnym audio. Bez tego projektowanie rozumienia jest zgadywaniem.

---

# Rozdział 2. Dane treningowe, frazy użytkowników i klasy intencji

## 2.1. Cele rozdziału

Czytelnik nauczy się:

- budowac zestawy fraz treningowych;
- odróżniać frazy realne od sztucznych;
- projektować klasy intencji;
- unikać nierownowagi i zbyt podobnych intencji.

## 2.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Training utterance | Fraza użytkownika używana do trenowania lub konfiguracji rozpoznawania intencji |
| Intent class | Klasa intencji, do której przypisuje się wypowiedzi |
| Positive example | Fraza nalezaca do intencji |
| Negative example | Fraza nienalezaca do intencji, ale podobną lub ryzykowna |
| Class imbalance | Nierowna liczba przykładów między klasami |
| Ambiguous utterance | Wypowiedź możliwa do przypisania do więcej niż jednej intencji |

## 2.3. Wyjaśnienie eksperckie

Dane treningowe powinny odzwierciedlać realny sposób mówienia. Dla intencji `sprawdz_status_zamowienia` przykłady mogą wyglądac tak:

- "gdzie jest moje zamówienie";
- "co z moja paczka";
- "kiedy będzie dostawa";
- "czy zamówienie już wyszlo";
- "nie dostalem paczki";
- "kurier miał być wczoraj";
- "chce sprawdzić status";
- "mam numer zamówienia i chce wiedzieć, gdzie jest".

Nie wystarczy wpisac:

- "sprawdź status zamówienia";
- "status zamówienia";
- "chce status".

Takie frazy są zbyt czyste. Prawdziwi użytkownicy mówią kontekstowo i emocjonalnie.

## 2.4. Perspektywa biznesowa

Klasy intencji decydują o:

- raportowaniu powodów kontaktu;
- routingu;
- automatyzacji;
- backlogu optymalizacji;
- priorytetach biznesowych.

Jeśli dane treningowe są źle, dashboard może klamac. Bot może raportowac "status", gdy w rzeczywistosci klient składa skargę na opóźnienie.

## 2.5. Perspektywa użytkownika

Użytkownik nie powinien dopasowywac języka do modelu. Model powinien uwzględniać:

- frazy potoczne;
- skróty;
- emocje;
- niedopowiedzenia;
- wypowiedzi z danymi;
- wypowiedzi bez danych;
- prośby posrednie;
- negacje i korekty.

Przykład:

"No właśnie o to chodzi, że znowu nie przyjechał" może oznaczać problem z dostawa, ale wymaga kontekstu. Bez kontekstu to może być trudne do jednoznacznej klasyfikacji.

## 2.6. Perspektywa technologiczna

Dataset intencji powinien mieć:

- unikalny identyfikator frazy;
- tekst frazy;
- intencje;
- źródło: realna/syntetyczna;
- język;
- kanał;
- data dodania;
- etykietujacy;
- confidence/zgoda etykietujacych;
- notatki;
- wersja datasetu.

Przydatna tabela:

| utterance_id | text | intent | source | notes |
|---|---|---|---|---|
| u001 | gdzie jest moja paczka | sprawdz_status_zamowienia | real | czesta fraza |
| u002 | kurier nie przyjechał | problem_z_dostawa | real | może mylić się że statusem |
| u003 | chce zmienić adres | zmień_adres_dostawy | real | jasna intencja |

## 2.7. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Zaczynaj od realnych fraz.
- Dodawaj sztuczne frazy tylko jako uzupełnienie.
- Zbieraj przykłady negatywne dla podobnych intencji.
- Nie tworz intencji bez wystarczajacych danych.
- Pilnuj balansu klas.
- Oznaczaj frazy wieloznaczne.
- Regularnie przegladaj confusion matrix.
- Wersjonuj dataset.

## 2.8. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Same sztuczne frazy | Model nie zna realnego języka |
| Zbyt mało przykładów dla rzadkich intencji | Niski recall |
| Brak negatywnych przykładów | Wysoki false positive |
| Zbyt podobne intencje | Confusion |
| Brak wersjonowania danych | Nie wiadomo, co zmienilo jakość |
| Przepisywanie fraz na ladna polszczyzne | Utrata realnego języka użytkownika |

## 2.9. Checklista datasetu intencji

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy frazy są realne?
- Czy są warianty potoczne?
- Czy są frazy emocjonalne?
- Czy są frazy krótkie i długie?
- Czy są przykłady negatywne?
- Czy klasy są względnie zbalansowane?
- Czy frazy wieloznaczne są oznaczone?
- Czy dataset ma wersje?
- Czy jest oddzielny test set?

## 2.10. Mini case study

Voicebot bankowy mylil `zastrzez_kartę` z `zamow_nowa_kartę`, bo dataset zawieral sztuczne frazy typu "chce kartę". Po analizie rozmów dodano realne wypowiedzi: "zgubilem kartę", "ktos mi ukradl portfel", "chce zablokowac płatności", "karta nie przyszla". Intencje rozdzielono przez cel: blokada istniejącej karty vs zamówienie/wysyłka nowej. False positive dla zastrzegania spadl.

## 2.11. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Zbierz 30 fraz dla intencji "zmień termin wizyty".
2. Dodaj 10 negatywnych przykładów podobnych, ale nienalezacych.
3. Wskaż frazy wieloznaczne.
4. Zaprojektuj format tabeli datasetu.

## 2.12. Podsumowanie

Dane treningowe są mapa realnego języka użytkowników. Im bardziej są sztuczne, tym bardziej bot będzie działał tylko w prezentacji. Dobre dane zawieraja potocznosc, niedoskonalosc i kontekst prawdziwych rozmów.

---

# Rozdział 3. Encje, słowniki, synonimy i dane syntetyczne

## 3.1. Cele rozdziału

Czytelnik nauczy się:

- projektować encje domenowe;
- tworzyć słowniki i synonimy;
- rozumieć wartość i ryzyka danych syntetycznych;
- przygotowywac dane dla nazw własnych, produktow, kodów i wariantów językowych.

## 3.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Entity | Fragment wypowiedzi reprezentujacy dane, np. data, miasto, produkt |
| System entity | Encja wbudowana, np. data, liczba, waluta |
| Custom entity | Encja domenowa, np. nazwa pakietu, typ awarii |
| Synonym | Alternatywne okreslenie tej samej wartości |
| Canonical value | Ujednolicona wartość zapisywana w systemie |
| Synthetic data | Dane wygenerowane sztucznie jako uzupełnienie realnych przykładów |
| Gazetteer | Słownik nazw, np. miejsc, produktow, marek |

## 3.3. Wyjaśnienie eksperckie

Encje są potrzebne wtedy, gdy bot musi wyodrebnic dane z wypowiedzi:

- "na piatek" -> data;
- "Kwiatowa osiem" -> adres;
- "VPN" -> usługa IT;
- "pakiet rodzinny" -> produkt;
- "czternasta do szesnastej" -> okno czasowe;
- "Warszawa Mokotow" -> lokalizacją.

Słowniki i synonimy pomagają normalizowac język:

| Wypowiedź użytkownika | Wartość kanoniczna |
|---|---|
| net, internet, wifi | internet_service |
| karta, plastik, debetowka | debit_card |
| lekarz rodzinny, internista, POZ | primary_care |
| faktura, rachunek, rozliczenie | invoice |

Uwaga praktyczna:

Nie każdy synonim jest bezpieczny. "Internet" i "Wi-Fi" mogą znaczyc dla użytkownika to samo, ale technologicznie mogą prowadzić do innych diagnoz. Słownik musi być konsultowany z ekspertami domenowymi.

## 3.4. Perspektywa biznesowa

Encje i słowniki wpływają na:

- jakość raportowania;
- poprawne routing;
- integracje;
- wyszukiwanie w CRM;
- segmentacje problemow;
- analizę trendow.

Jeśli bot nie normalizuje "net", "wifi" i "internet", raporty będą rozproszone. Jeśli normalizuje zbyt agresywnie, może ukryc różnice ważne dla procesu.

## 3.5. Perspektywa użytkownika

Użytkownik używa własnych słów. Nie mówi "usługa szerokopasmowego dostępu do internetu", tylko "net". Dobry bot powinien rozumieć potoczne synonimy, ale przy ryzyku doprecyzowac:

"Czy chodzi o internet domowy, czy o Wi-Fi w telefonię?"

## 3.6. Perspektywa technologiczna

Dobre encje mają:

- nazwe;
- opis;
- typ;
- wartości kanoniczne;
- synonimy;
- przykłady;
- reguły walidacji;
- źródło prawdy;
- ownera;
- strategie aktualizacji.

Dane syntetyczne są przydatne do:

- uzupełnienia rzadkich wariantów;
- testowania edge case'ów;
- generowania parafraz;
- pokrycia odmian językowych;
- przygotowania testów przed produkcją.

Ryzyka danych syntetycznych:

- brzmią zbyt ladnie;
- powtarzają styl generatora;
- nie oddaja szumu ASR;
- wprowadzaja nieistniejace frazy;
- zaburzaja rozklad klas;
- tworza fałszywe poczucie pokrycia.

## 3.7. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Używaj realnych danych jako podstawy.
- Tworz synonimy z konsultantami i ekspertami domenowymi.
- Odróżniaj synonimy potoczne od technicznie równoważnych.
- Normalizuj do wartości kanonicznych.
- Testuj encje na transkrypcjach ASR, nie tylko na tekstach manualnych.
- Oznaczaj dane syntetyczne jako syntetyczne.
- Nie mieszaj bez kontroli danych syntetycznych z test setem.

## 3.8. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Słownik tylko z nazw oficjalnych | Bot nie rozumie potocznego języka |
| Zbyt szerokie synonimy | Błędna normalizacja |
| Brak ownera słownika | Słownik starzeje się |
| Dane syntetyczne jako większość datasetu | Model uczy się sztucznego języka |
| Brak testów ASR dla encji | Bot nie radzi sobie z wymowa |
| Brak walidacji encji | Źle dane trafiaja do API |

## 3.9. Checklista encji i slownikow

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy encja jest potrzebna do procesu?
- Czy ma wartości kanoniczne?
- Czy ma potoczne synonimy?
- Czy synonimy są zatwierdzone przez domenę?
- Czy encja ma walidacje?
- Czy testowano ja na audio/ASR?
- Czy ma ownera?
- Czy dane syntetyczne są oznaczone?
- Czy syntetyki nie trafily do glownego test setu?

## 3.10. Mini case study

W voicebocie helpdeskowym encja `system` zawierala oficjalne nazwy aplikacji. Użytkownicy mowili jednak "poczta", "maile", "outlook", "skrzynka". Bot nie rozpoznawal problemow z e-mailem. Po dodaniu synonimow i wartości kanonicznej `email_service` poprawila się klasyfikacja, ale zostawiono doprecyzowanie, gdy użytkownik mówił "konto", bo mogło oznaczać konto pocztowe, bankowe lub systemowe.

## 3.11. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Zbuduj słownik synonimow dla 10 produktow lub spraw.
2. Oznacz, które synonimy są ryzykowne.
3. Wygeneruj 20 syntetycznych fraz i oznacz je jako syntetyczne.
4. Zaprojektuj walidacje dla encji "data wizyty".

## 3.12. Podsumowanie

Encje i słowniki są miejscem, gdzie język użytkownika spotyka się z systemami firmy. Dobre słowniki rozumieja potocznosc, ale nie gubia precyzji biznesowej.

---

# Rozdział 4. Błędy etykietowania i governance danych

## 4.1. Cele rozdziału

Czytelnik nauczy się:

- rozpoznawać typowe błędy labelingu;
- organizowac proces etykietowania;
- mierzyć spójność anotatorow;
- utrzymywać dataset jako aktywo produktu.

## 4.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Labeling | Przypisywanie etykiet, np. intencji, encji, emocji |
| Annotation guideline | Instrukcja etykietowania |
| Inter-annotator agreement | Zgodność między etykietujacymi |
| Gold set | Zweryfikowany zestaw referencyjny |
| Data drift | Zmiana języka, tematow lub rozkladu danych w czasie |
| Taxonomy | Uporzadkowany system kategorii |

## 4.3. Wyjaśnienie eksperckie

Etykietowanie nie jest mechaniczna praca administracyjna. To decyzja interpretacyjna. Jeśli dwie osoby inaczej rozumieja intencje, dataset będzie niespojny, a model będzie trenowany na sprzecznych sygnalach.

Typowe problemy:

- etykiety zbyt szerokie;
- etykiety zbyt podobne;
- brak instrukcji "poza zakresem";
- etykietowanie wedlug słów kluczowych, nie celu;
- ignorowanie kontekstu;
- etykietowanie naprawy jako nowej intencji;
- mieszanie intencji z emocja;
- brak drugiej weryfikacji trudnych przypadkow.

Przykład:

Użytkownik: "No super, kolejny raz paczka nie doszla."

Możliwe etykiety:

- `problem_z_dostawa`;
- sygnał frustracji;
- potencjalnie `sprawdz_status_zamowienia`.

Dobra anotacja może mieć etykiete główna `problem_z_dostawa` oraz dodatkowy tag `frustration_signal`.

## 4.4. Perspektywa biznesowa

Niespojna taksonomia powoduje:

- slabe modele;
- źle raporty;
- konflikty między dzialami;
- trudne utrzymanie;
- błędne decyzję o priorytetach.

Dataset powinien mieć ownera, proces zmian i review. To nie jest jednorazowy plik Excel.

## 4.5. Perspektywa użytkownika

Zły labeling powoduje, że bot źle interpretuje cel użytkownika. Jeśli wszystkie negatywne wypowiedzi trafiaja do "reklamacji", bot może kierowac do procesu reklamacyjnego osoby, które chcialy tylko statusu po opoznieniu.

## 4.6. Perspektywa technologiczna

Proces labeling powinien obejmować:

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

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Zanim etykietujesz, napisz guideline.
- Dodaj przykłady pozytywne, negatywne i graniczne.
- Etykietuj cel, nie słowo kluczowe.
- Oznaczaj emocje osobno od intencji.
- Oznaczaj multi-intent, nie kasuj drugiego celu.
- Tworz gold set.
- Mierz zgodność anotatorow.
- Regularnie przegladaj taxonomy.

## 4.8. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Brak guideline | Każdy etykietuje inaczej |
| Etykietowanie po slowach kluczowych | Źle intencje |
| Brak out-of-scope | Model lapie wszystko |
| Brak gold setu | Nie ma punktu odniesienia |
| Brak review trudnych przypadkow | Sprzeczne dane |
| Zmienianie taksonomii bez migracji danych | Chaos wersji |

## 4.9. Checklista labelingu

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy istnieje guideline?
- Czy każda intencja ma zakres i poza zakresem?
- Czy są przykłady graniczne?
- Czy mamy etykiete out-of-scope?
- Czy emocje są tagowane osobno?
- Czy multi-intent ma zasady?
- Czy jest gold set?
- Czy mierzymy agreement?
- Czy dataset jest wersjonowany?

## 4.10. Mini case study

W projekcie ubezpieczeniowym anotatorzy etykietowali "chce wiedzieć, czy dostane odszkodowanie" raz jako FAQ, raz jako status szkody, raz jako decyzję. Po warsztacie ustalono guideline: pytania o indywidualną decyzję trafiaja do `ocena_indywidualna_poza_zakresem`, a bot może tylko sprawdzić status lub przekazać do konsultanta. Zmniejszylo to ryzyko, że bot zacznie udzielac interpretacji poza zakresem.

## 4.11. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Napisz guideline dla trzech intencji.
2. Oznacz 10 fraz granicznych.
3. Zaprojektuj zasade dla multi-intent.
4. Opisz, jak mierzysz zgodność anotatorow.

## 4.12. Podsumowanie

Labeling jest fundamentem jakości rozumienia. Bez jasnych zasad dataset staje się zbiorem opinii. Z jasnymi zasadami staje się aktywem, które można rozwijac, testować i audytowac.

---

# Rozdział 5. Jakość ASR: akcenty, hałas, tempo i sposób mówienia

## 5.1. Cele rozdziału

Czytelnik nauczy się:

- rozumieć czynniki wplywajace na ASR;
- odróżniać błąd ASR od błędu NLU;
- projektować testy ASR dla realnych warunków;
- przygotowywac dialog odporny na niedoskonala transkrypcje.

## 5.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| ASR error | Błąd rozpoznawania mowy |
| WER | Word Error Rate, błąd na poziomie słów |
| Entity error | Błąd rozpoznania waznej encji, np. numeru lub daty |
| Partial transcript | Czesciowa transkrypcją w trakcie wypowiedzi |
| Final transcript | Ostateczna transkrypcją tury |
| Acoustic condition | Warunki audio: hałas, echo, jakość połączenia |
| Accent robustness | Odpornosc na akcenty i warianty wymowy |

## 5.3. Wyjaśnienie eksperckie

ASR może zrobić błąd nawet wtedy, gdy użytkownik mówi poprawnie. Powody:

- hałas ulicy;
- głośnomówiący telefon;
- slaby zasieg;
- szybka mowa;
- cicha mowa;
- akcent regionalny;
- wada wymowy;
- obcy język w nazwach;
- cyfry i litery;
- nazwy własne;
- emocje;
- barge-in i overlap.

Nie każdy błąd ASR ma ten sam koszt. WER może być umiarkowanie wysoki, ale bot nadal działa, jeśli najwazniejsza intencja i encje są poprawne. Odwrotnie: transkrypcją może być prawie idealna, ale jedna źle rozpoznana cyfra może zepsuc proces.

## 5.4. Perspektywa biznesowa

Jakość ASR wpływa na:

- udane identyfikacje;
- błędy transakcyjne;
- czas rozmowy;
- frustrację;
- koszt konsultantów;
- wiarygodnosc automatyzacji.

W procesach wysokiego ryzyka trzeba mierzyć nie tylko WER, ale też critical field accuracy: poprawność danych krytycznych.

## 5.5. Perspektywa użytkownika

Użytkownik nie powinien płacic za błąd ASR wysilkiem i poczuciem winy. Komunikaty powinny brzmieć:

"Nie mam pewności, czy dobrze uslyszalem. Proszę powtórzyć ostatnie trzy cyfry."

Nie:

"Podal pan niepoprawny numer."

## 5.6. Perspektywa technologiczna

Test ASR powinien obejmować:

- realne rozmowy telefoniczne;
- różne urządzenia;
- różne poziomy hałasu;
- osoby starsze;
- akcenty i gwary;
- szybka i wolna mowę;
- krótkie odpowiedzi;
- długie opisy;
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

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Testuj ASR w kanale produkcyjnym.
- Tworz custom vocabulary.
- Dziel kody i numery na grupy.
- Używaj DTMF jako alternatywy dla danych trudnych.
- Potwierdzaj dane krytyczne.
- Analizuj błędy ASR osobno od NLU.
- Mierz wpływ ASR na wynik procesu.
- Nie obwiniaj użytkownika w komunikatach.

## 5.8. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Testy tylko na czystych nagraniach | Produkcja wypada gorzej |
| Mierzenie tylko ogólnego WER | Pomijasz dane krytyczne |
| Brak DTMF dla kodów | Duza frustracja |
| Brak słownika nazw | Bot myli produkty i miejscowosci |
| Brak analizy endpointing | ASR wydaje się winny, ale problemem jest ucinanie |
| Brak testów osób starszych lub akcentow | System działa nierowno dla grup użytkowników |

## 5.9. Checklista ASR QA

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy testujemy realny kanał telefoniczny?
- Czy mamy probki z halasem?
- Czy mamy różne akcenty i tempo mowy?
- Czy testujemy cyfry i kody?
- Czy testujemy nazwy własne?
- Czy mierzymy entity accuracy?
- Czy mierzymy digit accuracy?
- Czy analizujemy endpointing?
- Czy mamy alternatywe DTMF?
- Czy komunikaty repair są przyjazne?

## 5.10. Mini case study

Voicebot medyczny źle rozpoznawal nazwiska pacjentow i nazwy miejscowosci. Zespół przestal próbować "idealnie rozpoznawać nazwisko" jako główny sposób identyfikacji. Wprowadzono identyfikacje po numerze telefonu i dacie urodzenia, potwierdzenie tylko fragmentow danych oraz możliwość DTMF dla kodu SMS. ASR nadal nie był idealny, ale proces stał się odporniejszy.

## 5.11. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Zaprojektuj test ASR dla numeru polisy.
2. Wypisz 20 nazw wymagających custom vocabulary.
3. Zaprojektuj repair dla źle rozpoznanej daty.
4. Okresl metryke "critical field accuracy" dla wybranego procesu.

## 5.12. Podsumowanie

ASR nigdy nie jest neutralny. Jego błędy trzeba rozumieć, mierzyć i kompensowac projektem dialogu. Dobra jakość voicebota nie wymaga perfekcyjnego ASR, ale wymaga swiadomej pracy z jego ograniczeniami.

---

# Rozdział 6. Testowanie NLU: confusion matrix, precision, recall i F1

## 6.1. Cele rozdziału

Czytelnik nauczy się:

- oceniać jakość rozpoznawania intencji;
- interpretować confusion matrix;
- rozumieć precision, recall i F1;
- zamieniać wyniki testów na decyzję projektowe.

## 6.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Test set | Zestaw danych do niezaleznej oceny modelu |
| Confusion matrix | Tabela pokazujaca, które klasy model myli że soba |
| Precision | Jaki odsetek przewidywan danej intencji był poprawny |
| Recall | Jaki odsetek prawdziwych przypadkow danej intencji został znaleziony |
| F1 | Średnia harmoniczna precision i recall |
| False positive | Model wykryl intencje, której nie było |
| False negative | Model nie wykryl intencji, która była |
| Threshold | Prog pewności decyzji |

## 6.3. Wyjaśnienie eksperckie

Nie wystarczy powiedzieć "model ma 90% accuracy". W voicebotach ważne jest, które błędy robi.

Przykład:

- Model myli `sprawdz_status` z `informacja_o_dostawie`: umiarkowany koszt.
- Model myli `anuluj_zamowienie` z `sprawdz_status`: wysoki koszt.
- Model nie rozpoznaje `konsultant`: wysoki koszt UX.

Confusion matrix pokazuje, gdzie model myli klasy.

Przykład uproszczony:

| Prawdziwa \ Przewidziana | status | zmiana_adresu | anulowanie | konsultant |
|---|---:|---:|---:|---:|
| status | 82 | 5 | 0 | 3 |
| zmiana_adresu | 7 | 70 | 1 | 2 |
| anulowanie | 2 | 1 | 45 | 2 |
| konsultant | 6 | 1 | 0 | 58 |

Wnioski:

- `status` i `zmiana_adresu` czasem się myla, warto dodac disambiguation.
- `konsultant` ma false negatives, trzeba poprawić, bo użytkownik może utknac.
- `anulowanie` ma wysoka stawke, nawet male błędy wymagają potwierdzeń.

## 6.4. Precision i recall praktycznie

Precision odpowiada: gdy model mówi "to jest intencja X", jak często ma rację?

Recall odpowiada: z wszystkich prawdziwych przypadkow intencji X, ile model znalazl?

Przykład:

Intencja `popros_o_konsultanta`:

- Wysoki recall jest krytyczny, bo nie chcemy ignorować prosb o człowieka.
- Precision też ważne, ale false positive może co najwyzej częściej eskalować.

Intencja `anuluj_zamowienie`:

- Precision jest krytyczne, bo nie chcemy błędnie rozpoznać anulowania.
- Recall też ważne, ale można dopytać i potwierdzić.

## 6.5. Perspektywa biznesowa

Metryki NLU trzeba interpretować przez koszt błędu. Nie wszystkie intencje potrzebuja takiego samego progu.

| Intencja | Priorytet |
|---|---|
| Konsultant | Wysoki recall |
| Anulowanie | Wysoki precision + explicit confirmation |
| Status | Balans precision/recall |
| FAQ | Mozliwie wysoki recall, z bezpiecznym fallbackiem |
| Płatność | Wysoki precision, compliance |

## 6.6. Perspektywa użytkownika

Użytkownik odczuwa błędy NLU jako:

- bot idzie zła ścieżka;
- bot ignoruje prośbę;
- bot pyta o nieistotne dane;
- bot zmusza do powtarzania;
- bot nie chce połączyć z człowiekiem.

Dlatego testy NLU muszą obejmować frazy emocjonalne i meta-intencje, nie tylko główne use case'y.

## 6.7. Perspektywa technologiczna

Dobre testowanie NLU wymaga:

- zamrozonego test setu;
- danych realnych;
- danych z ASR, nie tylko manualnych transkrypcji;
- metryk per intencja;
- analizy false positives i false negatives;
- progow confidence per intencja;
- testów regresji po każdej zmianie;
- wersjonowania modelu i datasetu.

## 6.8. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Nie używaj tych samych fraz do treningu i testu.
- Raportuj metryki per intencja.
- Analizuj confusion, nie tylko accuracy.
- Ustal progi per intencja.
- Dla intencji wysokiego ryzyka stosuj potwierdzenia i handoff.
- Testuj na transkrypcjach ASR.
- Trzymaj stałe testy regresji.

## 6.9. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Jedna ogólna accuracy | Ukrywa ryzykowne błędy |
| Testowanie na training set | Fałszywie dobre wyniki |
| Brak out-of-scope w testach | Bot lapie wszystko |
| Brak testów meta-intencji | Użytkownik nie może sterowac rozmową |
| Ten sam threshold dla wszystkich intencji | Zły balans precision/recall |
| Brak testów regresji | Poprawa jednej intencji psuje inna |

## 6.10. Checklista NLU test

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy mamy oddzielny test set?
- Czy test set zawiera realne frazy?
- Czy test set zawiera ASR transcripts?
- Czy są frazy out-of-scope?
- Czy są meta-intencje?
- Czy raportujemy precision, recall i F1 per intencja?
- Czy analizujemy confusion matrix?
- Czy mamy progi per intencja?
- Czy mamy testy regresji?

## 6.11. Mini case study

Voicebot e-commerce miał 91% accuracy, ale użytkownicy skarzyli się, że trudno przejść do konsultanta. Analiza per intencja pokazala, że `popros_o_konsultanta` miała recall 62%, bo frazy typu "daj kogos normalnego", "operator", "człowiek", "nie chce bota" nie były w datasetcie. Po dodaniu fraz i obnizeniu progu dla tej intencji eskalacja zaczęła działać lepiej.

## 6.12. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Zinterpretuj przykładowa confusion matrix.
2. Wybierz intencje, dla której ważniejszy jest precision.
3. Wybierz intencje, dla której ważniejszy jest recall.
4. Zaprojektuj test set z out-of-scope.

## 6.13. Podsumowanie

Testowanie NLU to nie ranking modelu. To analiza ryzyka błędów. Najważniejsze pytanie brzmi: które pomylki są akceptowalne, które wymagają doprecyzowania, a które muszą prowadzić do potwierdzenia lub człowieka.

---

# Rozdział 7. Analiza nierozpoznanych wypowiedzi i continuous training

## 7.1. Cele rozdziału

Czytelnik nauczy się:

- prowadzić analizę no-match i fallbackow;
- wykrywać luki w intencjach;
- budowac backlog optymalizacji;
- utrzymywać voicebota po wdrożeniu.

## 7.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Unrecognized utterance | Wypowiedź nierozpoznana lub źle rozpoznana |
| No-match analysis | Analiza wypowiedzi, których system nie dopasowal |
| Drift | Zmiana języka lub tematow w czasie |
| Continuous training | Cykliczne doskonalenie danych i modeli |
| Regression test | Test sprawdzający, czy zmiana nie popsuła poprzednich zachowan |
| Optimization backlog | Lista zmian opartą na danych produkcyjnych |

## 7.3. Wyjaśnienie eksperckie

Po wdrożeniu zaczyna się prawdziwa nauka. Produkcja ujawnia:

- nowe frazy;
- nowe problemy;
- sezonowość;
- błędy ASR;
- nieznane intencje;
- źle fallbacki;
- przerwania w konkretnych promptach;
- miejsca, gdzie użytkownicy chca człowieka;
- zmiany produktowe, których bot nie zna.

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

Continuous training jest kosztem utrzymania, ale też źródłem wartości. Pokazuje:

- czego klienci zaczeli pytać;
- które procesy generuja nowe kontakty;
- gdzie firma ma problem operacyjny;
- jakie nowe use case'y warto dodac;
- które obietnice bota nie pokrywaja się z rzeczywistoscia.

Bot bez utrzymania starzeje się. Produkty, procedury, ceny, regulaminy i język użytkowników się zmieniaja.

## 7.5. Perspektywa użytkownika

Użytkownik oczekuje, że bot będzie znal aktualne sprawy. Jeśli firma zmienila procedure zwrotow, a bot nadal odpowiada stara wersja, traci zaufanie. Jeśli sezonowo pojawia się nowy temat, np. opóźnienia dostaw przed swietami, bot powinien zostać szybko zaktualizowany.

## 7.6. Perspektywa technologiczna

Continuous training wymaga:

- pipeline eksportu danych;
- anonimizacji;
- narzędzia do anotacji;
- wersjonowania datasetow;
- testów automatycznych;
- procesu review;
- release management;
- rollback;
- dashboardu metryk przed/po.

Zmiany nie powinny być wrzucane bez testów. Dodanie fraz do jednej intencji może pogorszyć inna.

## 7.7. Kategorie przyczyn no-match

| Przyczyna | Co zrobić |
|---|---|
| Brak intencji | Dodaj intencje lub rozszerz zakres |
| Zbyt podobne intencje | Scal intencje lub dodaj disambiguation |
| Błąd ASR | Popraw słownik, dialog, DTMF, ASR config |
| Zły prompt | Przepisz pytanie, podaj przykłady |
| Brak danych/integracji | Dodaj integracje lub handoff |
| Out-of-scope | Dodaj elegancka odmowe i routing |
| Frustracja | Skroc flow, dodaj handoff |
| Zmiana biznesowa | Zaktualizuj bazę wiedzy/flow |

## 7.8. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Analizuj no-match regularnie, szczególnie po starcie.
- Grupuj wypowiedzi, nie poprawiaj pojedynczych przypadkow impulsywnie.
- Dla istotnych lub powtarzalnych błędów dodawaj test regresji.
- Mierz efekt po zmianie.
- Oddziel zmiany danych od zmian flow.
- Utrzymuj changelog modelu i datasetu.
- Wlacz konsultantów w interpretacje trudnych fraz.
- Ustal rytm release, np. tygodniowy lub dwutygodniowy.

## 7.9. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Brak opiekuna po wdrożeniu | Bot przestaje pasować do rzeczywistosci |
| Dodawanie fraz bez analizy confusion | Poprawa jednego psuje drugie |
| Brak testów regresji | Niespodziewane regresję |
| Poprawianie wszystkiego naraz | Nie wiadomo, co zadzialalo |
| Ignorowanie out-of-scope | Bot próbuje odpowiadać na wszystko |
| Brak monitoringu sezonowosci | Bot nie reaguje na zmiany |

## 7.10. Checklista continuous training

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy mamy regularny eksport no-match?
- Czy mamy proces anonimizacji?
- Czy mamy narzędzie anotacji?
- Czy mamy review trudnych przypadkow?
- Czy mamy backlog optymalizacji?
- Czy każda zmiana ma test regresji?
- Czy dataset jest wersjonowany?
- Czy model/flow ma changelog?
- Czy mierzymy efekt po wdrożeniu?
- Czy jest owner utrzymania?

## 7.11. Mini case study

Po wdrożeniu voicebota zwrotowego w e-commerce pojawily się setki fraz "paczkomat", "kod nadania", "etykieta nie działa". Bot miał intencje "jak zrobić zwrot", ale nie rozumiał problemow z etykieta. Analiza no-match pokazala nowy use case: problemy z nadaniem zwrotu. Zespół dodal intencje, krótki flow diagnostyczny i SMS z nowym linkiem do etykiety. Fallback rate spadl, a konsultanci dostawali mniej prostych spraw.

## 7.12. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Zaprojektuj tygodniowy proces analizy no-match.
2. Stworz kategorie przyczyn fallbackow dla swojego use case'u.
3. Napisz template backlog item dla optymalizacji.
4. Zaprojektuj test regresji dla nowej frazy.

## 7.13. Podsumowanie

Voicebot po wdrożeniu nie jest skończony. Produkcja jest źródłem najważniejszych danych. Continuous training zamienia nieudane rozmowy w konkretne usprawnienia, ale tylko wtedy, gdy proces jest regularny, kontrolowany i testowany.

---

# Rozdział 8. Dashboard jakości rozumienia

## 8.1. Cele rozdziału

Czytelnik nauczy się:

- projektować dashboard dla ASR/NLU;
- łączyć metryki techniczne z konwersacyjnymi;
- wykrywać problemy wymagające optymalizacji;
- raportowac jakość w sposób zrozumiały dla biznesu i technologii.

## 8.2. Czym jest dashboard jakości rozumienia

Dashboard jakości rozumienia to widok, który pokazuje, jak dobrze voicebot rozumie ludzi. Nie chodzi tylko o to, czy system działa technicznie. Chodzi o to, czy bot poprawnie rozpoznaje intencje, dane, odpowiedzi użytkownika i momenty, w których powinien dopytać albo przekazać rozmowę do człowieka.

W praktyce taki dashboard pomaga odpowiedzieć na pytania:

- czy bot rozumie najważniejsze tematy rozmów;
- gdzie najczęściej się myli;
- które pytania bota powodują ciszę lub niepasujące odpowiedzi;
- które dane są trudne do rozpoznania głosem;
- czy problem leży w ASR, NLU, promptcie, flow czy samym procesie;
- co trzeba poprawić w modelu, danych treningowych albo scenariuszu.

Osoba nietechniczna może myśleć o tym dashboardzie jak o mapie miejsc, w których bot "gubi sens rozmowy". Jeśli użytkownik mówi "chcę zmienić termin dostawy", a bot rozpoznaje reklamację, dashboard powinien pomóc to zauważyć. Jeśli użytkownicy milczą po pytaniu bota, dashboard powinien pokazać, przy którym pytaniu to się dzieje.

Dobry dashboard jakości rozumienia nie pokazuje tylko procentów. Pokazuje też przykłady wypowiedzi. Liczba mówi, że problem istnieje. Transkrypcja pokazuje, jak brzmi problem w prawdziwej rozmowie.

## 8.3. Jak powinien wyglądać taki dashboard

Najprostszy użyteczny dashboard jakości rozumienia powinien mieć pięć części.

Pierwsza część to ogólny stan jakości:

- intent accuracy;
- fallback rate;
- no-match rate;
- no-input rate;
- entity accuracy;
- handoff po niezrozumieniu.

Druga część pokazuje problemy według intencji. Dzięki temu widać, czy bot dobrze rozumie np. status zamówienia, ale źle rozumie zmianę adresu albo reklamację.

Trzecia część pokazuje problemy według promptu. To ważne, bo czasem problem nie jest w modelu, tylko w pytaniu bota. Jeśli bot pyta zbyt formalnie, zbyt długo albo niejasno, użytkownik może milczeć albo odpowiadać inaczej, niż zakładał scenariusz.

Czwarta część pokazuje przykładowe transkrypcje. Przy każdej problematycznej intencji lub frazie warto mieć kilka prawdziwych wypowiedzi użytkowników, oczywiście po anonimizacji danych.

Piąta część pokazuje trend przed i po zmianie. Jeśli dodano nowe frazy treningowe, zmieniono prompt albo wypuszczono nowy model, dashboard powinien pokazać, czy wynik rzeczywiście się poprawił.

## 8.4. Kluczowe metryki

Metryki są użyteczne dopiero wtedy, gdy wiadomo, jaką decyzję pomagają podjąć. Poniższa tabela nie jest listą liczb do raportu, tylko mapą sygnałów: każda metryka powinna prowadzić do pytania, interpretacji i możliwej poprawki.

| Metryka | Co mierzy | Po co |
|---|---|---|
| Intent accuracy | Poprawność klasyfikacji intencji | Ogólna jakość NLU |
| Precision per intent | Trafność przewidywan intencji | Ryzyko false positive |
| Recall per intent | Wykrywanie prawdziwych przypadkow | Ryzyko false negative |
| Fallback rate | Odsetek nierozpoznanych sytuacji | Luki danych/flow |
| No-input rate | Brak mowy/inputu | Prompt, audio, UX |
| No-match rate | Input poza oczekiwaniem | NLU, prompt, zakres |
| ASR critical field accuracy | Poprawność danych krytycznych | Ryzyko transakcyjne |
| Entity accuracy | Poprawność encji | Jakość slot filling |
| Disambiguation success | Skuteczność doprecyzowania | Czy bot naprawia niepewność |
| Repeat after bot question | Powtórzenia użytkownika | Slaby prompt lub ASR |
| Handoff after misunderstanding | Eskalację po niezrozumieniu | Frustracja i ryzyko UX |

## 8.5. Wyjaśnienie eksperckie

Dashboard jakości rozumienia powinien odpowiadać na pytania:

1. Czy bot rozpoznaje główne intencje?
2. Które intencje myli?
3. Które sloty są najtrudniejsze?
4. Gdzie pojawia się no-input?
5. Gdzie pojawia się no-match?
6. Czy problemy wynikaja z ASR, NLU, promptu czy procesu?
7. Czy ostatnia zmiana poprawila wynik?
8. Czy jakość jest stabilna w czasie?

Nie wystarczy pokazać jedna liczbę. Potrzebne są widoki:

- per intencja;
- per flow;
- per prompt;
- per kanał;
- per segment;
- w czasie;
- przed/po release.

## 8.6. Jak interpretować dashboard jakości rozumienia

Dashboard trzeba czytać od ogółu do szczegółu.

Najpierw sprawdzamy, czy problem jest globalny. Jeśli wszystkie intencje nagle mają gorszy wynik, przyczyną może być zmiana ASR, awaria kanału audio, nowa wersja modelu albo problem w danych.

Potem sprawdzamy, czy problem dotyczy konkretnej intencji. Jeśli tylko `zmiana_adresu` ma niski recall, bot może nie mieć wystarczająco dobrych przykładów albo użytkownicy mówią o tej sprawie inaczej niż zakładano.

Następnie sprawdzamy prompt. Jeśli no-input rośnie po jednym pytaniu, użytkownik może nie rozumieć pytania. Przykład: "Proszę wskazać preferowaną placówkę" może być gorsze niż "W którym mieście chce pani wizytę?".

Na końcu czytamy przykłady rozmów. Bez przykładów łatwo wyciągnąć złą decyzję. Fallback może oznaczać brak danych treningowych, ale może też oznaczać, że bot pyta o zbyt wiele rzeczy naraz.

## 8.7. Perspektywa biznesowa

Biznes potrzebuje interpretacji:

Źle:

"NLU F1 wynosi 0,82."

Lepsze:

"Bot dobrze rozpoznaje status zamówienia, ale myli zmianę adresu z reklamacja dostawy. To powoduje 12% dodatkowych handoffow w tym flow. Rekomendujemy scalenie części intencji i pytanie doprecyzowujace."

## 8.8. Perspektywa użytkownika

Dashboard powinien wykrywać miejsca, gdzie użytkownik cierpi:

- powtarza te sama informacje;
- jest przekierowywany po kilku błędach;
- przerywa botowi;
- milczy po niezrozumiałym pytaniu;
- porzuca rozmowę.

Jakość rozumienia nie jest tylko metryka modelu. To odczuwalna jakość rozmowy.

## 8.9. Perspektywa technologiczna

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

## 8.10. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Pokazuj metryki per intencja i per flow.
- Dodaj trend w czasie.
- Dodaj widok po release.
- Łączy metryki z przykladami transkrypcji.
- Oznaczaj przyczyne problemu po analizie.
- Pokazuj top no-match phrases.
- Pokazuj critical field accuracy dla danych wysokiego ryzyka.
- Dashboard powinien prowadzić do backlogu, nie tylko raportowac.

## 8.11. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Dashboard tylko dla wolumenu | Brak informacji o jakości |
| Jedna accuracy dla całego bota | Ukryte problemy intencji krytycznych |
| Brak prompt_id | Nie wiadomo, które pytanie generuje błąd |
| Brak wersji modelu | Nie wiadomo, co zmienilo wynik |
| Brak przykładów rozmów | Metryki bez interpretacji |
| Brak połączenia z backlogiem | Raport nie prowadzi do działania |

## 8.12. Checklista dashboardu

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy widac metryki per intencja?
- Czy widac metryki per flow?
- Czy widac no-input i no-match per prompt?
- Czy widac ASR critical field accuracy?
- Czy widac handoff reasons?
- Czy widac wersje modelu/flow?
- Czy widac trend przed/po release?
- Czy dashboard pokazuje przykłady rozmów?
- Czy wyniki tworza backlog optymalizacji?

## 8.13. Mini case study

Dashboard voicebota rezerwacyjnego pokazywal stabilny task completion, ale wzrost no-input przy pytaniu o lokalizacje. Analiza prompt_id pokazala, że po zmianie copy bot pytal: "Jaka placowka jest preferowana?", zamiast "W którym miescie chce pani wizyte?". Użytkownicy milczeli, bo pytanie było zbyt formalne. Po zmianie promptu no-input spadl.

## 8.14. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Zaprojektuj dashboard jakości rozumienia dla statusu zamówienia.
2. Wskaż 5 metryk dla ASR.
3. Wskaż 5 metryk dla NLU.
4. Opisz, jak dashboard generuje backlog.

## 8.15. Podsumowanie

Dashboard jakości rozumienia łączy dane techniczne z doświadczeniem użytkownika. Jego celem nie jest dekoracja raportowa, lecz szybkie wykrywanie, gdzie bot nie rozumie ludzi i co trzeba poprawić. Dobry dashboard nie mówi tylko "wynik spadł"; pokazuje, w którym miejscu rozmowy spadł, jak brzmią realne wypowiedzi użytkowników i jaka poprawka ma największy sens.

---

# 9. Zbiorcza checklista po Części VI

Ta checklista zbiera najważniejsze pytania po całej części. Najlepiej przejść ją po zakończeniu projektu rozdziałów i zaznaczyć miejsca, które wymagają decyzji, doprecyzowania albo testów.

- Czy masz reprezentatywne nagrania i transkrypcje?
- Czy dane są zgodne z prywatnoscia i retencja?
- Czy masz metadane rozmów i wynik kontaktu?
- Czy dataset ma realne frazy użytkowników?
- Czy intencje mają przykłady pozytywne i negatywne?
- Czy encje mają słowniki, synonimy i walidacje?
- Czy dane syntetyczne są oznaczone?
- Czy istnieje guideline etykietowania?
- Czy jest gold set?
- Czy testujesz ASR w realnym kanale?
- Czy mierzysz critical field accuracy?
- Czy masz confusion matrix dla NLU?
- Czy raportujesz precision, recall i F1 per intencja?
- Czy masz test set oddzielony od treningu?
- Czy analizujesz no-match i fallbacki regularnie?
- Czy każda optymalizacja ma test regresji?
- Czy dashboard pokazuje jakość per intencja, flow i prompt?

---

# 10. Co będzie w kolejnej części

Kolejna część powinna opracowac **Część VII. LLM, RAG i generatywna AI w voicebotach**:

1. Kiedy używać LLM w voicebocie, a kiedy nie.
2. Voicebot deterministyczny vs generatywny.
3. Hybryda flow-based + LLM.
4. Prompt systemowy voicebota.
5. Ograniczanie odpowiedzi modelu.
6. RAG i przygotowanie bazy wiedzy.
7. Halucynacje, guardrails, prompt injection.
8. Function calling i narzędzia.
9. Latency, koszty i observability dla LLM voicebotów.
10. Przykładowe prompty systemowe dla kilku typów voicebotów.
