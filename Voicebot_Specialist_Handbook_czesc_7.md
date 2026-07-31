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

Voicebot nie rozumie użytkowników dlatego, że zespół wpisał ładne intencje do dokumentu. Rozumie ich wtedy, gdy ma dobrze zebrane, opisane, przetestowane i stale aktualizowane dane. Dane w voicebotach są trudniejsze niż w chatbotach, bo mowa przechodzi przez ASR, zawiera pauzy, powtórzenia, poprawki, urwane zdania, emocje, akcenty, szum i błędy transkrypcji.

Ta część pokazuje, jak budować i utrzymywać jakość rozumienia w voicebocie.

Po tej części czytelnik powinien umieć:

1. Zbierać i przygotowywać dane z rozmów.
2. Pracować z transkrypcjami i nagraniami.
3. Projektować dane treningowe dla intencji i encji.
4. Tworzyć słowniki, synonimy i dane syntetyczne.
5. Rozpoznawać błędy etykietowania.
6. Analizować jakość ASR i jej wpływ na NLU.
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
- przygotować dane zgodnie z prywatnością i compliance.

## 1.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja praktyczna |
|---|---|
| Nagranie | Audio rozmowy, zwykle najbliższe realnemu doświadczeniu użytkownika |
| Transkrypcja | Tekstowy zapis rozmowy, automatyczny lub manualny |
| Log dialogowy | Zapis zdarzeń systemu: intencje, sloty, fallbacki, handoff, API |
| Metadane | Dane opisujące rozmowę, np. kolejka, data, AHT, wynik, segment klienta |
| Redakcja danych | Usuwanie lub maskowanie danych osobowych/wrażliwych |
| Sampling | Dobór próbki rozmów do analizy |
| Annotation | Oznaczanie fragmentów danych etykietami |

## 1.3. Wyjaśnienie eksperckie

Najlepsze dane do voicebota pochodzą z realnych rozmów. Raporty contact center pokazują wolumeny, ale nie pokazują języka użytkowników. Konsultanci mogą opisać typowe sprawy, ale nie zawsze pamiętają wszystkie warianty. Dopiero nagrania i transkrypcje pokazują, jak ludzie naprawdę mówią:

- chaotycznie;
- z przerwami;
- w niepełnych zdaniach;
- potocznym językiem;
- ze skrótami;
- z emocjami;
- w wielu intencjach naraz;
- z poprawkami;
- z osobami trzecimi w tle.

Minimalny pakiet danych do projektu:

1. Nagrania rozmów.
2. Transkrypcje.
3. Powód kontaktu lub wrap-up code.
4. Wynik rozmowy.
5. AHT.
6. Transfer/handoff.
7. Repeat contact, jeśli dostępny.
8. Segment klienta, jeśli istotny i zgodny z polityką danych.
9. Informacja o zgodach i retencji.

Uwaga praktyczna:

Jeśli nie masz transkrypcji, zacznij od próbki nagrań. Nie projektuj intencji tylko z głów menedżerów i nazw kolejek. To prosta droga do bota, który rozumie organizację, ale nie rozumie klientów.

## 1.4. Perspektywa biznesowa

Dane odpowiadają na pytania:

- które use case'y mają największy wolumen;
- jak ludzie formułują potrzeby;
- jakie są najczęstsze wyjątki;
- gdzie konsultant traci czas;
- gdzie użytkownik się frustruje;
- które sprawy powinny iść do człowieka;
- jakie są luki w procesie.

Bez danych biznes nie ma baseline. Bez baseline nie da się uczciwie powiedzieć, czy voicebot poprawił proces.

## 1.5. Perspektywa użytkownika

Użytkownik nie mówi tak, jak firma nazywa procesy. Firma mówi "dyspozycja zmiany harmonogramu dostawy". Użytkownik mówi:

- "nie będzie mnie jutro";
- "kurier ma przyjechać w zły dzień";
- "przełóżcie paczkę";
- "chcę inną godzinę";
- "nie dam rady odebrać".

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
- powiązanie transkrypcji z metadanymi;
- identyfikator rozmowy;
- wersja modelu lub systemu, jeśli dane są z produkcyjnego bota.

## 1.7. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Zbieraj próbkę z różnych dni, godzin, kolejek i segmentów.
- Nie opieraj się tylko na najlepszych lub najczystszych rozmowach.
- Uwzględnij rozmowy zakończone sukcesem i porażką.
- Zachowaj związek między transkrypcją, audio i wynikiem.
- Maskuj dane osobowe przed szeroką analizą.
- Zapisuj, skąd pochodzą dane i z jakiego okresu.
- Oddziel dane do treningu, walidacji i testów.

## 1.8. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Projektowanie na podstawie 20 ręcznie wybranych rozmów | Dane są niereprezentatywne |
| Brak nagrań, tylko wrap-up codes | Brak realnego języka klientów |
| Pomieszanie danych treningowych i testowych | Wyniki testów są sztucznie wysokie |
| Brak anonimizacji | Ryzyko prywatności |
| Brak danych o wyniku rozmowy | Nie wiadomo, które frazy prowadzą do sukcesu |
| Brak timestampów | Trudno analizować przerwania i timing |

## 1.9. Checklista danych startowych

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy mamy nagrania?
- Czy mamy transkrypcje?
- Czy mamy metadane rozmów?
- Czy znamy wynik rozmowy?
- Czy mamy dane o transferach i repeat contact?
- Czy dane są z reprezentatywnego okresu?
- Czy dane są zgodne z polityką prywatności?
- Czy dane osobowe są maskowane?
- Czy mamy podział train/validation/test?
- Czy możemy wrócić z transkrypcji do audio przy analizie błędów?

## 1.10. Mini case study

Firma kurierska chciała trenować intencje na podstawie kategorii z CRM. Kategoria "dostawa" obejmowała status, zmianę adresu, zmianę terminu, skargę na kuriera i pytania o odbiór osobisty. Po analizie 500 transkrypcji zespół rozbił temat na cele użytkownika. Model intencji stał się stabilniejszy, a flow przestało wrzucać wszystkie sprawy do jednego worka.

## 1.11. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Zaprojektuj plan próbkowania 1000 rozmów z contact center.
2. Wypisz metadane, które chcesz mieć przy każdej rozmowie.
3. Opisz, jak zamaskujesz dane osobowe.
4. Wskaż, jakie rozmowy muszą wejść do próbki, aby nie była zbyt "ładna".

## 1.12. Podsumowanie

Jakość voicebota zaczyna się od jakości danych. Dobre dane są reprezentatywne, powiązane z wynikiem rozmowy, bezpiecznie przetworzone i zachowują kontakt z realnym audio. Bez tego projektowanie rozumienia jest zgadywaniem.

---

# Rozdział 2. Dane treningowe, frazy użytkowników i klasy intencji

## 2.1. Cele rozdziału

Czytelnik nauczy się:

- budować zestawy fraz treningowych;
- odróżniać frazy realne od sztucznych;
- projektować klasy intencji;
- unikać nierównowagi i zbyt podobnych intencji.

## 2.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Training utterance | Fraza użytkownika używana do trenowania lub konfiguracji rozpoznawania intencji |
| Intent class | Klasa intencji, do której przypisuje się wypowiedzi |
| Positive example | Fraza należąca do intencji |
| Negative example | Fraza nienależąca do intencji, ale podobna lub ryzykowna |
| Class imbalance | Nierówna liczba przykładów między klasami |
| Ambiguous utterance | Wypowiedź możliwa do przypisania do więcej niż jednej intencji |

## 2.3. Wyjaśnienie eksperckie

Dane treningowe powinny odzwierciedlać realny sposób mówienia. Dla intencji `sprawdz_status_zamowienia` przykłady mogą wyglądać tak:

- "gdzie jest moje zamówienie";
- "co z moją paczką";
- "kiedy będzie dostawa";
- "czy zamówienie już wyszło";
- "nie dostałem paczki";
- "kurier miał być wczoraj";
- "chcę sprawdzić status";
- "mam numer zamówienia i chcę wiedzieć, gdzie jest".

Nie wystarczy wpisać:

- "sprawdź status zamówienia";
- "status zamówienia";
- "chcę status".

Takie frazy są zbyt czyste. Prawdziwi użytkownicy mówią kontekstowo i emocjonalnie.

## 2.4. Perspektywa biznesowa

Klasy intencji decydują o:

- raportowaniu powodów kontaktu;
- routingu;
- automatyzacji;
- backlogu optymalizacji;
- priorytetach biznesowych.

Jeśli dane treningowe są złe, dashboard może kłamać. Bot może raportować "status", gdy w rzeczywistości klient składa skargę na opóźnienie.

## 2.5. Perspektywa użytkownika

Użytkownik nie powinien dopasowywać języka do modelu. Model powinien uwzględniać:

- frazy potoczne;
- skróty;
- emocje;
- niedopowiedzenia;
- wypowiedzi z danymi;
- wypowiedzi bez danych;
- prośby pośrednie;
- negacje i korekty.

Przykład:

"No właśnie o to chodzi, że znowu nie przyjechał" może oznaczać problem z dostawą, ale wymaga kontekstu. Bez kontekstu to może być trudne do jednoznacznej klasyfikacji.

## 2.6. Perspektywa technologiczna

Dataset intencji powinien mieć:

- unikalny identyfikator frazy;
- tekst frazy;
- intencje;
- źródło: realna/syntetyczna;
- język;
- kanał;
- data dodania;
- etykietujący;
- confidence/zgoda etykietujących;
- notatki;
- wersja datasetu.

Przydatna tabela:

| utterance_id | text | intent | source | notes |
|---|---|---|---|---|
| u001 | gdzie jest moja paczka | sprawdz_status_zamowienia | real | częsta fraza |
| u002 | kurier nie przyjechał | problem_z_dostawa | real | może mylić się ze statusem |
| u003 | chcę zmienić adres | zmień_adres_dostawy | real | jasna intencja |

## 2.7. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Zaczynaj od realnych fraz.
- Dodawaj sztuczne frazy tylko jako uzupełnienie.
- Zbieraj przykłady negatywne dla podobnych intencji.
- Nie twórz intencji bez wystarczających danych.
- Pilnuj balansu klas.
- Oznaczaj frazy wieloznaczne.
- Regularnie przeglądaj confusion matrix.
- Wersjonuj dataset.

## 2.8. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Same sztuczne frazy | Model nie zna realnego języka |
| Zbyt mało przykładów dla rzadkich intencji | Niski recall |
| Brak negatywnych przykładów | Wysoki false positive |
| Zbyt podobne intencje | Confusion |
| Brak wersjonowania danych | Nie wiadomo, co zmieniło jakość |
| Przepisywanie fraz na ładną polszczyznę | Utrata realnego języka użytkownika |

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

Voicebot bankowy mylił `zastrzez_kartę` z `zamow_nowa_kartę`, bo dataset zawierał sztuczne frazy typu "chcę kartę". Po analizie rozmów dodano realne wypowiedzi: "zgubiłem kartę", "ktoś mi ukradł portfel", "chcę zablokować płatności", "karta nie przyszła". Intencje rozdzielono przez cel: blokada istniejącej karty vs zamówienie/wysyłka nowej. False positive dla zastrzegania spadł.

## 2.11. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Zbierz 30 fraz dla intencji "zmień termin wizyty".
2. Dodaj 10 negatywnych przykładów podobnych, ale nienależących.
3. Wskaż frazy wieloznaczne.
4. Zaprojektuj format tabeli datasetu.

## 2.12. Podsumowanie

Dane treningowe są mapą realnego języka użytkowników. Im bardziej są sztuczne, tym bardziej bot będzie działał tylko w prezentacji. Dobre dane zawierają potoczność, niedoskonałość i kontekst prawdziwych rozmów.

---

# Rozdział 3. Encje, słowniki, synonimy i dane syntetyczne

## 3.1. Cele rozdziału

Czytelnik nauczy się:

- projektować encje domenowe;
- tworzyć słowniki i synonimy;
- rozumieć wartość i ryzyka danych syntetycznych;
- przygotowywać dane dla nazw własnych, produktów, kodów i wariantów językowych.

## 3.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Entity | Fragment wypowiedzi reprezentujący dane, np. data, miasto, produkt |
| System entity | Encja wbudowana, np. data, liczba, waluta |
| Custom entity | Encja domenowa, np. nazwa pakietu, typ awarii |
| Synonym | Alternatywne określenie tej samej wartości |
| Canonical value | Ujednolicona wartość zapisywana w systemie |
| Synthetic data | Dane wygenerowane sztucznie jako uzupełnienie realnych przykładów |
| Gazetteer | Słownik nazw, np. miejsc, produktów, marek |

## 3.3. Wyjaśnienie eksperckie

Encje są potrzebne wtedy, gdy bot musi wyodrębnić dane z wypowiedzi:

- "na piątek" -> data;
- "Kwiatowa osiem" -> adres;
- "VPN" -> usługa IT;
- "pakiet rodzinny" -> produkt;
- "czternasta do szesnastej" -> okno czasowe;
- "Warszawa Mokotów" -> lokalizacja.

Słowniki i synonimy pomagają normalizować język:

| Wypowiedź użytkownika | Wartość kanoniczna |
|---|---|
| net, internet, wifi | internet_service |
| karta, plastik, debetowka | debit_card |
| lekarz rodzinny, internista, POZ | primary_care |
| faktura, rachunek, rozliczenie | invoice |

Uwaga praktyczna:

Nie każdy synonim jest bezpieczny. "Internet" i "Wi-Fi" mogą znaczyć dla użytkownika to samo, ale technologicznie mogą prowadzić do innych diagnoz. Słownik musi być konsultowany z ekspertami domenowymi.

## 3.4. Perspektywa biznesowa

Encje i słowniki wpływają na:

- jakość raportowania;
- poprawny routing;
- integracje;
- wyszukiwanie w CRM;
- segmentację problemów;
- analizę trendów.

Jeśli bot nie normalizuje "net", "wifi" i "internet", raporty będą rozproszone. Jeśli normalizuje zbyt agresywnie, może ukryć różnice ważne dla procesu.

## 3.5. Perspektywa użytkownika

Użytkownik używa własnych słów. Nie mówi "usługa szerokopasmowego dostępu do internetu", tylko "net". Dobry bot powinien rozumieć potoczne synonimy, ale przy ryzyku doprecyzować:

"Czy chodzi o internet domowy, czy o Wi-Fi w telefonie?"

## 3.6. Perspektywa technologiczna

Dobre encje mają:

- nazwę;
- opis;
- typ;
- wartości kanoniczne;
- synonimy;
- przykłady;
- reguły walidacji;
- źródło prawdy;
- ownera;
- strategię aktualizacji.

Dane syntetyczne są przydatne do:

- uzupełnienia rzadkich wariantów;
- testowania edge case'ów;
- generowania parafraz;
- pokrycia odmian językowych;
- przygotowania testów przed produkcją.

Ryzyka danych syntetycznych:

- brzmią zbyt ładnie;
- powtarzają styl generatora;
- nie oddają szumu ASR;
- wprowadzają nieistniejące frazy;
- zaburzają rozkład klas;
- tworzą fałszywe poczucie pokrycia.

## 3.7. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Używaj realnych danych jako podstawy.
- Twórz synonimy z konsultantami i ekspertami domenowymi.
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
| Brak testów ASR dla encji | Bot nie radzi sobie z wymową |
| Brak walidacji encji | Złe dane trafiają do API |

## 3.9. Checklista encji i słowników

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy encja jest potrzebna do procesu?
- Czy ma wartości kanoniczne?
- Czy ma potoczne synonimy?
- Czy synonimy są zatwierdzone przez domenę?
- Czy encja ma walidację?
- Czy testowano ją na audio/ASR?
- Czy ma ownera?
- Czy dane syntetyczne są oznaczone?
- Czy syntetyki nie trafiły do głównego test setu?

## 3.10. Mini case study

W voicebocie helpdeskowym encja `system` zawierała oficjalne nazwy aplikacji. Użytkownicy mówili jednak "poczta", "maile", "outlook", "skrzynka". Bot nie rozpoznawał problemów z e-mailem. Po dodaniu synonimów i wartości kanonicznej `email_service` poprawiła się klasyfikacja, ale zostawiono doprecyzowanie, gdy użytkownik mówił "konto", bo mogło oznaczać konto pocztowe, bankowe lub systemowe.

## 3.11. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Zbuduj słownik synonimów dla 10 produktów lub spraw.
2. Oznacz, które synonimy są ryzykowne.
3. Wygeneruj 20 syntetycznych fraz i oznacz je jako syntetyczne.
4. Zaprojektuj walidację dla encji "data wizyty".

## 3.12. Podsumowanie

Encje i słowniki są miejscem, gdzie język użytkownika spotyka się z systemami firmy. Dobre słowniki rozumieją potoczność, ale nie gubią precyzji biznesowej.

---

# Rozdział 4. Błędy etykietowania i governance danych

## 4.1. Cele rozdziału

Czytelnik nauczy się:

- rozpoznawać typowe błędy labelingu;
- organizować proces etykietowania;
- mierzyć spójność anotatorów;
- utrzymywać dataset jako aktywo produktu.

## 4.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Labeling | Przypisywanie etykiet, np. intencji, encji, emocji |
| Annotation guideline | Instrukcja etykietowania |
| Inter-annotator agreement | Zgodność między etykietującymi |
| Gold set | Zweryfikowany zestaw referencyjny |
| Data drift | Zmiana języka, tematów lub rozkładu danych w czasie |
| Taxonomy | Uporządkowany system kategorii |

## 4.3. Wyjaśnienie eksperckie

Etykietowanie nie jest mechaniczną pracą administracyjną. To decyzja interpretacyjna. Jeśli dwie osoby inaczej rozumieją intencje, dataset będzie niespójny, a model będzie trenowany na sprzecznych sygnałach.

Typowe problemy:

- etykiety zbyt szerokie;
- etykiety zbyt podobne;
- brak instrukcji "poza zakresem";
- etykietowanie według słów kluczowych, nie celu;
- ignorowanie kontekstu;
- etykietowanie naprawy jako nowej intencji;
- mieszanie intencji z emocją;
- brak drugiej weryfikacji trudnych przypadków.

Przykład:

Użytkownik: "No super, kolejny raz paczka nie doszła."

Możliwe etykiety:

- `problem_z_dostawa`;
- sygnał frustracji;
- potencjalnie `sprawdz_status_zamowienia`.

Dobra anotacja może mieć etykietę główną `problem_z_dostawa` oraz dodatkowy tag `frustration_signal`.

## 4.4. Perspektywa biznesowa

Niespójna taksonomia powoduje:

- słabe modele;
- złe raporty;
- konflikty między działami;
- trudne utrzymanie;
- błędne decyzje o priorytetach.

Dataset powinien mieć ownera, proces zmian i review. To nie jest jednorazowy plik Excel.

## 4.5. Perspektywa użytkownika

Zły labeling powoduje, że bot źle interpretuje cel użytkownika. Jeśli wszystkie negatywne wypowiedzi trafiają do "reklamacji", bot może kierować do procesu reklamacyjnego osoby, które chciały tylko statusu po opóźnieniu.

## 4.6. Perspektywa technologiczna

Proces labeling powinien obejmować:

- annotation guideline;
- przykłady graniczne;
- zasady dla multi-intent;
- zasady dla emocji;
- zasady dla korekt;
- zasady dla "unknown/out of scope";
- review trudnych przypadków;
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
- Twórz gold set.
- Mierz zgodność anotatorów.
- Regularnie przeglądaj taxonomy.

## 4.8. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Brak guideline | Każdy etykietuje inaczej |
| Etykietowanie po słowach kluczowych | Złe intencje |
| Brak out-of-scope | Model łapie wszystko |
| Brak gold setu | Nie ma punktu odniesienia |
| Brak review trudnych przypadków | Sprzeczne dane |
| Zmienianie taksonomii bez migracji danych | Chaos wersji |

## 4.9. Checklista labelingu

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy istnieje guideline?
- Czy każda intencja ma zakres i poza zakresem?
- Czy są przykłady graniczne?
- Czy mamy etykietę out-of-scope?
- Czy emocje są tagowane osobno?
- Czy multi-intent ma zasady?
- Czy jest gold set?
- Czy mierzymy agreement?
- Czy dataset jest wersjonowany?

## 4.10. Mini case study

W projekcie ubezpieczeniowym anotatorzy etykietowali "chcę wiedzieć, czy dostanę odszkodowanie" raz jako FAQ, raz jako status szkody, raz jako decyzję. Po warsztacie ustalono guideline: pytania o indywidualną decyzję trafiają do `ocena_indywidualna_poza_zakresem`, a bot może tylko sprawdzić status lub przekazać do konsultanta. Zmniejszyło to ryzyko, że bot zacznie udzielać interpretacji poza zakresem.

## 4.11. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Napisz guideline dla trzech intencji.
2. Oznacz 10 fraz granicznych.
3. Zaprojektuj zasadę dla multi-intent.
4. Opisz, jak mierzysz zgodność anotatorów.

## 4.12. Podsumowanie

Labeling jest fundamentem jakości rozumienia. Bez jasnych zasad dataset staje się zbiorem opinii. Z jasnymi zasadami staje się aktywem, które można rozwijać, testować i audytować.

---

# Rozdział 5. Jakość ASR: akcenty, hałas, tempo i sposób mówienia

## 5.1. Cele rozdziału

Czytelnik nauczy się:

- rozumieć czynniki wpływające na ASR;
- odróżniać błąd ASR od błędu NLU;
- projektować testy ASR dla realnych warunków;
- przygotowywać dialog odporny na niedoskonałą transkrypcję.

## 5.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| ASR error | Błąd rozpoznawania mowy |
| WER | Word Error Rate, błąd na poziomie słów |
| Entity error | Błąd rozpoznania ważnej encji, np. numeru lub daty |
| Partial transcript | Częściowa transkrypcja w trakcie wypowiedzi |
| Final transcript | Ostateczna transkrypcja tury |
| Acoustic condition | Warunki audio: hałas, echo, jakość połączenia |
| Accent robustness | Odporność na akcenty i warianty wymowy |

## 5.3. Wyjaśnienie eksperckie

ASR może zrobić błąd nawet wtedy, gdy użytkownik mówi poprawnie. Powody:

- hałas ulicy;
- głośnomówiący telefon;
- słaby zasięg;
- szybka mowa;
- cicha mowa;
- akcent regionalny;
- wada wymowy;
- obcy język w nazwach;
- cyfry i litery;
- nazwy własne;
- emocje;
- barge-in i overlap.

Nie każdy błąd ASR ma ten sam koszt. WER może być umiarkowanie wysoki, ale bot nadal działa, jeśli najważniejsza intencja i encje są poprawne. Odwrotnie: transkrypcja może być prawie idealna, ale jedna źle rozpoznana cyfra może zepsuć proces.

## 5.4. Perspektywa biznesowa

Jakość ASR wpływa na:

- udane identyfikacje;
- błędy transakcyjne;
- czas rozmowy;
- frustrację;
- koszt konsultantów;
- wiarygodność automatyzacji.

W procesach wysokiego ryzyka trzeba mierzyć nie tylko WER, ale też critical field accuracy: poprawność danych krytycznych.

## 5.5. Perspektywa użytkownika

Użytkownik nie powinien płacić za błąd ASR wysiłkiem i poczuciem winy. Komunikaty powinny brzmieć:

"Nie mam pewności, czy dobrze usłyszałem. Proszę powtórzyć ostatnie trzy cyfry."

Nie:

"Podał pan niepoprawny numer."

## 5.6. Perspektywa technologiczna

Test ASR powinien obejmować:

- realne rozmowy telefoniczne;
- różne urządzenia;
- różne poziomy hałasu;
- osoby starsze;
- akcenty i gwary;
- szybką i wolną mowę;
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
- Twórz custom vocabulary.
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
| Brak DTMF dla kodów | Duża frustracja |
| Brak słownika nazw | Bot myli produkty i miejscowości |
| Brak analizy endpointing | ASR wydaje się winny, ale problemem jest ucinanie |
| Brak testów osób starszych lub akcentów | System działa nierówno dla grup użytkowników |

## 5.9. Checklista ASR QA

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy testujemy realny kanał telefoniczny?
- Czy mamy próbki z hałasem?
- Czy mamy różne akcenty i tempo mowy?
- Czy testujemy cyfry i kody?
- Czy testujemy nazwy własne?
- Czy mierzymy entity accuracy?
- Czy mierzymy digit accuracy?
- Czy analizujemy endpointing?
- Czy mamy alternatywę DTMF?
- Czy komunikaty repair są przyjazne?

## 5.10. Mini case study

Voicebot medyczny źle rozpoznawał nazwiska pacjentów i nazwy miejscowości. Zespół przestał próbować "idealnie rozpoznawać nazwisko" jako główny sposób identyfikacji. Wprowadzono identyfikację po numerze telefonu i dacie urodzenia, potwierdzenie tylko fragmentów danych oraz możliwość DTMF dla kodu SMS. ASR nadal nie był idealny, ale proces stał się odporniejszy.

## 5.11. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Zaprojektuj test ASR dla numeru polisy.
2. Wypisz 20 nazw wymagających custom vocabulary.
3. Zaprojektuj repair dla źle rozpoznanej daty.
4. Określ metrykę "critical field accuracy" dla wybranego procesu.

## 5.12. Podsumowanie

ASR nigdy nie jest neutralny. Jego błędy trzeba rozumieć, mierzyć i kompensować projektem dialogu. Dobra jakość voicebota nie wymaga perfekcyjnego ASR, ale wymaga świadomej pracy z jego ograniczeniami.

---

# Rozdział 6. Testowanie NLU: confusion matrix, precision, recall i F1

## 6.1. Cele rozdziału

Czytelnik nauczy się:

- oceniać jakość rozpoznawania intencji;
- interpretować confusion matrix;
- rozumieć precision, recall i F1;
- zamieniać wyniki testów na decyzje projektowe.

## 6.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Test set | Zestaw danych do niezależnej oceny modelu |
| Confusion matrix | Tabela pokazująca, które klasy model myli ze sobą |
| Precision | Jaki odsetek przewidywań danej intencji był poprawny |
| Recall | Jaki odsetek prawdziwych przypadków danej intencji został znaleziony |
| F1 | Średnia harmoniczna precision i recall |
| False positive | Model wykrył intencję, której nie było |
| False negative | Model nie wykrył intencji, która była |
| Threshold | Próg pewności decyzji |

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

- `status` i `zmiana_adresu` czasem się mylą, warto dodać disambiguation.
- `konsultant` ma false negatives, trzeba poprawić, bo użytkownik może utknąć.
- `anulowanie` ma wysoką stawkę, nawet małe błędy wymagają potwierdzeń.

## 6.4. Precision i recall praktycznie

Precision odpowiada: gdy model mówi "to jest intencja X", jak często ma rację?

Recall odpowiada: z wszystkich prawdziwych przypadków intencji X, ile model znalazł?

Przykład:

Intencja `popros_o_konsultanta`:

- Wysoki recall jest krytyczny, bo nie chcemy ignorować próśb o człowieka.
- Precision też ważne, ale false positive może co najwyżej częściej eskalować.

Intencja `anuluj_zamowienie`:

- Precision jest krytyczne, bo nie chcemy błędnie rozpoznać anulowania.
- Recall też ważne, ale można dopytać i potwierdzić.

## 6.5. Perspektywa biznesowa

Metryki NLU trzeba interpretować przez koszt błędu. Nie wszystkie intencje potrzebują takiego samego progu.

| Intencja | Priorytet |
|---|---|
| Konsultant | Wysoki recall |
| Anulowanie | Wysoki precision + explicit confirmation |
| Status | Balans precision/recall |
| FAQ | Możliwie wysoki recall, z bezpiecznym fallbackiem |
| Płatność | Wysoki precision, compliance |

## 6.6. Perspektywa użytkownika

Użytkownik odczuwa błędy NLU jako:

- bot idzie złą ścieżką;
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
- progów confidence per intencja;
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
| Brak testów meta-intencji | Użytkownik nie może sterować rozmową |
| Ten sam threshold dla wszystkich intencji | Zły balans precision/recall |
| Brak testów regresji | Poprawa jednej intencji psuje inną |

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

Voicebot e-commerce miał 91% accuracy, ale użytkownicy skarżyli się, że trudno przejść do konsultanta. Analiza per intencja pokazała, że `popros_o_konsultanta` miała recall 62%, bo frazy typu "daj kogoś normalnego", "operator", "człowiek", "nie chcę bota" nie były w datasecie. Po dodaniu fraz i obniżeniu progu dla tej intencji eskalacja zaczęła działać lepiej.

## 6.12. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Zinterpretuj przykładową confusion matrix.
2. Wybierz intencję, dla której ważniejszy jest precision.
3. Wybierz intencję, dla której ważniejszy jest recall.
4. Zaprojektuj test set z out-of-scope.

## 6.13. Podsumowanie

Testowanie NLU to nie ranking modelu. To analiza ryzyka błędów. Najważniejsze pytanie brzmi: które pomyłki są akceptowalne, które wymagają doprecyzowania, a które muszą prowadzić do potwierdzenia lub człowieka.

---

# Rozdział 7. Analiza nierozpoznanych wypowiedzi i continuous training

## 7.1. Cele rozdziału

Czytelnik nauczy się:

- prowadzić analizę no-match i fallbacków;
- wykrywać luki w intencjach;
- budować backlog optymalizacji;
- utrzymywać voicebota po wdrożeniu.

## 7.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Unrecognized utterance | Wypowiedź nierozpoznana lub źle rozpoznana |
| No-match analysis | Analiza wypowiedzi, których system nie dopasowal |
| Drift | Zmiana języka lub tematów w czasie |
| Continuous training | Cykliczne doskonalenie danych i modeli |
| Regression test | Test sprawdzający, czy zmiana nie popsuła poprzednich zachowań |
| Optimization backlog | Lista zmian oparta na danych produkcyjnych |

## 7.3. Wyjaśnienie eksperckie

Po wdrożeniu zaczyna się prawdziwa nauka. Produkcja ujawnia:

- nowe frazy;
- nowe problemy;
- sezonowość;
- błędy ASR;
- nieznane intencje;
- złe fallbacki;
- przerwania w konkretnych promptach;
- miejsca, gdzie użytkownicy chcą człowieka;
- zmiany produktowe, których bot nie zna.

Proces continuous training:

```text
1. Zbierz logi i transkrypcje.
2. Wyfiltruj no-match, fallback, handoff, niskie confidence, negatywne feedbacki.
3. Grupuj wypowiedzi tematycznie.
4. Oznacz przyczynę: brak intencji, błąd ASR, zły prompt, brak integracji, out-of-scope.
5. Zaproponuj zmianę: dane, flow, prompt, integracja, handoff.
6. Dodaj testy regresji.
7. Wdróż zmianę.
8. Monitoruj efekt.
```

## 7.4. Perspektywa biznesowa

Continuous training jest kosztem utrzymania, ale też źródłem wartości. Pokazuje:

- czego klienci zaczęli pytać;
- które procesy generują nowe kontakty;
- gdzie firma ma problem operacyjny;
- jakie nowe use case'y warto dodać;
- które obietnice bota nie pokrywają się z rzeczywistością.

Bot bez utrzymania starzeje się. Produkty, procedury, ceny, regulaminy i język użytkowników się zmieniają.

## 7.5. Perspektywa użytkownika

Użytkownik oczekuje, że bot będzie znał aktualne sprawy. Jeśli firma zmieniła procedurę zwrotów, a bot nadal odpowiada starą wersją, traci zaufanie. Jeśli sezonowo pojawia się nowy temat, np. opóźnienia dostaw przed świętami, bot powinien zostać szybko zaktualizowany.

## 7.6. Perspektywa technologiczna

Continuous training wymaga:

- pipeline eksportu danych;
- anonimizacji;
- narzędzia do anotacji;
- wersjonowania datasetów;
- testów automatycznych;
- procesu review;
- release management;
- rollback;
- dashboardu metryk przed/po.

Zmiany nie powinny być wrzucane bez testów. Dodanie fraz do jednej intencji może pogorszyć inną.

## 7.7. Kategorie przyczyn no-match

| Przyczyna | Co zrobić |
|---|---|
| Brak intencji | Dodaj intencje lub rozszerz zakres |
| Zbyt podobne intencje | Scal intencje lub dodaj disambiguation |
| Błąd ASR | Popraw słownik, dialog, DTMF, ASR config |
| Zły prompt | Przepisz pytanie, podaj przykłady |
| Brak danych/integracji | Dodaj integracje lub handoff |
| Out-of-scope | Dodaj elegancką odmowę i routing |
| Frustracja | Skróć flow, dodaj handoff |
| Zmiana biznesowa | Zaktualizuj bazę wiedzy/flow |

## 7.8. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Analizuj no-match regularnie, szczególnie po starcie.
- Grupuj wypowiedzi, nie poprawiaj pojedynczych przypadków impulsywnie.
- Dla istotnych lub powtarzalnych błędów dodawaj test regresji.
- Mierz efekt po zmianie.
- Oddziel zmiany danych od zmian flow.
- Utrzymuj changelog modelu i datasetu.
- Włącz konsultantów w interpretację trudnych fraz.
- Ustal rytm release, np. tygodniowy lub dwutygodniowy.

## 7.9. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Brak opiekuna po wdrożeniu | Bot przestaje pasować do rzeczywistości |
| Dodawanie fraz bez analizy confusion | Poprawa jednego psuje drugie |
| Brak testów regresji | Niespodziewane regresje |
| Poprawianie wszystkiego naraz | Nie wiadomo, co zadziałało |
| Ignorowanie out-of-scope | Bot próbuje odpowiadać na wszystko |
| Brak monitoringu sezonowości | Bot nie reaguje na zmiany |

## 7.10. Checklista continuous training

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy mamy regularny eksport no-match?
- Czy mamy proces anonimizacji?
- Czy mamy narzędzie anotacji?
- Czy mamy review trudnych przypadków?
- Czy mamy backlog optymalizacji?
- Czy każda zmiana ma test regresji?
- Czy dataset jest wersjonowany?
- Czy model/flow ma changelog?
- Czy mierzymy efekt po wdrożeniu?
- Czy jest owner utrzymania?

## 7.11. Mini case study

Po wdrożeniu voicebota zwrotowego w e-commerce pojawiły się setki fraz "paczkomat", "kod nadania", "etykieta nie działa". Bot miał intencję "jak zrobić zwrot", ale nie rozumiał problemów z etykietą. Analiza no-match pokazała nowy use case: problemy z nadaniem zwrotu. Zespół dodał intencję, krótki flow diagnostyczny i SMS z nowym linkiem do etykiety. Fallback rate spadł, a konsultanci dostawali mniej prostych spraw.

## 7.12. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Zaprojektuj tygodniowy proces analizy no-match.
2. Stwórz kategorie przyczyn fallbacków dla swojego use case'u.
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
- raportować jakość w sposób zrozumiały dla biznesu i technologii.

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
| Precision per intent | Trafność przewidywań intencji | Ryzyko false positive |
| Recall per intent | Wykrywanie prawdziwych przypadków | Ryzyko false negative |
| Fallback rate | Odsetek nierozpoznanych sytuacji | Luki danych/flow |
| No-input rate | Brak mowy/inputu | Prompt, audio, UX |
| No-match rate | Input poza oczekiwaniem | NLU, prompt, zakres |
| ASR critical field accuracy | Poprawność danych krytycznych | Ryzyko transakcyjne |
| Entity accuracy | Poprawność encji | Jakość slot filling |
| Disambiguation success | Skuteczność doprecyzowania | Czy bot naprawia niepewność |
| Repeat after bot question | Powtórzenia użytkownika | Słaby prompt lub ASR |
| Handoff after misunderstanding | Eskalacja po niezrozumieniu | Frustracja i ryzyko UX |

## 8.5. Wyjaśnienie eksperckie

Dashboard jakości rozumienia powinien odpowiadać na pytania:

1. Czy bot rozpoznaje główne intencje?
2. Które intencje myli?
3. Które sloty są najtrudniejsze?
4. Gdzie pojawia się no-input?
5. Gdzie pojawia się no-match?
6. Czy problemy wynikają z ASR, NLU, promptu czy procesu?
7. Czy ostatnia zmiana poprawiła wynik?
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

"Bot dobrze rozpoznaje status zamówienia, ale myli zmianę adresu z reklamacją dostawy. To powoduje 12% dodatkowych handoffów w tym flow. Rekomendujemy scalenie części intencji i pytanie doprecyzowujące."

## 8.8. Perspektywa użytkownika

Dashboard powinien wykrywać miejsca, gdzie użytkownik cierpi:

- powtarza tę samą informację;
- jest przekierowywany po kilku błędach;
- przerywa botowi;
- milczy po niezrozumiałym pytaniu;
- porzuca rozmowę.

Jakość rozumienia nie jest tylko metryką modelu. To odczuwalna jakość rozmowy.

## 8.9. Perspektywa technologiczna

Dashboard wymaga dobrych logów:

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
- Łącz metryki z przykładami transkrypcji.
- Oznaczaj przyczynę problemu po analizie.
- Pokazuj top no-match phrases.
- Pokazuj critical field accuracy dla danych wysokiego ryzyka.
- Dashboard powinien prowadzić do backlogu, nie tylko raportować.

## 8.11. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Dashboard tylko dla wolumenu | Brak informacji o jakości |
| Jedna accuracy dla całego bota | Ukryte problemy intencji krytycznych |
| Brak prompt_id | Nie wiadomo, które pytanie generuje błąd |
| Brak wersji modelu | Nie wiadomo, co zmieniło wynik |
| Brak przykładów rozmów | Metryki bez interpretacji |
| Brak połączenia z backlogiem | Raport nie prowadzi do działania |

## 8.12. Checklista dashboardu

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy widać metryki per intencja?
- Czy widać metryki per flow?
- Czy widać no-input i no-match per prompt?
- Czy widać ASR critical field accuracy?
- Czy widać handoff reasons?
- Czy widać wersje modelu/flow?
- Czy widać trend przed/po release?
- Czy dashboard pokazuje przykłady rozmów?
- Czy wyniki tworzą backlog optymalizacji?

## 8.13. Mini case study

Dashboard voicebota rezerwacyjnego pokazywał stabilny task completion, ale wzrost no-input przy pytaniu o lokalizację. Analiza prompt_id pokazała, że po zmianie copy bot pytał: "Jaka placówka jest preferowana?", zamiast "W którym mieście chce pani wizytę?". Użytkownicy milczeli, bo pytanie było zbyt formalne. Po zmianie promptu no-input spadł.

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
- Czy dane są zgodne z prywatnością i retencją?
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

Kolejna część powinna opracować **Część VII. LLM, RAG i generatywna AI w voicebotach**:

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
