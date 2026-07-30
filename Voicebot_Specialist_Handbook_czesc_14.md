# Voicebot Specialist Handbook

## Czesc 14: Etyka, dostepnosc i odpowiedzialne projektowanie

Wersja robocza: 2026-07-29

---

# Czesc XIII. Etyka, dostepnosc i odpowiedzialne projektowanie

## Cel czesci

Skuteczny voicebot nie powinien tylko automatyzowac kontaktu. Powinien robic to uczciwie, dostepnie i bez przerzucania kosztu automatyzacji na uzytkownika. Etyka w voicebotach oznacza projektowanie systemu, ktory jest transparentny, przewidywalny, nienachalny, odporny na bledy i gotowy oddac rozmowe czlowiekowi, gdy automatyzacja nie jest najlepsza droga.

## Rozdzial 1. Transparentnosc i zaufanie

### Cele rozdzialu

- Zrozumiec, dlaczego voicebot powinien jasno informowac, ze jest systemem automatycznym.
- Projektowac komunikaty budujace zaufanie bez udawania czlowieka.
- Rozpoznawac zachowania niszczace zaufanie.

### Kluczowe pojecia

| Pojecie | Znaczenie |
|---|---|
| Transparentnosc | Uzytkownik wie, ze rozmawia z botem, co bot potrafi i jakie ma ograniczenia |
| Calibrated trust | Zaufanie dopasowane do realnych mozliwosci systemu |
| Overtrust | Nadmierne zaufanie do AI |
| Undertrust | Zbyt niskie zaufanie wynikajace z niejasnosci lub zlych doswiadczen |

### Wyjasnienie eksperckie

Voicebot powinien byc jasny od pierwszych sekund:

"Dzien dobry, jestem automatycznym asystentem firmy X. Pomoge sprawdzic zamowienie albo polacze z konsultantem."

To zdanie robi trzy rzeczy: ujawnia automatyzacje, okresla zakres i daje droge do czlowieka. Nie trzeba udawac konsultanta. Udawanie czlowieka moze chwilowo zwiekszyc zaangazowanie, ale gdy system nie rozumie, rozczarowanie jest wieksze.

### Perspektywa biznesowa

Zaufanie jest aktywem operacyjnym. Jesli klienci naucza sie, ze bot blokuje kontakt, beda szybciej eskalowac, uzywac agresywnych skrotow albo omijac kanal. Transparentnosc zmniejsza opor, bo uzytkownik wie, czego oczekiwac.

### Perspektywa uzytkownika

Uzytkownik chce wiedziec:

- z kim rozmawia;
- co moze zalatwic;
- czy moze poprawic blad;
- czy moze przejsc do czlowieka;
- czy rozmowa jest nagrywana lub analizowana.

### Dobre praktyki

- Informuj, ze to system automatyczny.
- Nie udawaj ludzkich emocji.
- Mow jasno o zakresie.
- Dawaj prosta droge do konsultanta.
- Mow "nie wiem" lub "nie moge tego ocenic", gdy to prawda.

### Typowe bledy

| Blad | Skutek |
|---|---|
| Bot udaje czlowieka | Utrata zaufania po bledzie |
| Brak informacji o zakresie | Nieadekwatne oczekiwania |
| Brak drogi do czlowieka | Poczucie uwiezienia |
| Zbyt pewne odpowiedzi | Overtrust i ryzyko decyzji klienta |

### Checklista

- Czy bot jasno mowi, ze jest automatyczny?
- Czy zakres jest jasny?
- Czy ograniczenia sa komunikowane?
- Czy prosba o konsultanta jest respektowana?
- Czy bot nie udaje empatii?

## Rozdzial 2. Projektowanie bez manipulacji

### Wyjasnienie eksperckie

Voicebot moze latwo wywierac presje, bo glos jest bezposredni, sekwencyjny i trudniej go "przeskanowac" niz tekst. Etyczne projektowanie wymaga, aby bot nie ukrywal opcji, nie utrudnial rezygnacji, nie wykorzystywal stresu i nie projektowal petli majacych zatrzymac klienta za wszelka cene.

### Ryzykowne wzorce

| Wzorzec | Dlaczego jest ryzykowny |
|---|---|
| Ukryty konsultant | Uzytkownik traci kontrole |
| Dlugie monologi sprzedazowe | Presja i brak barge-in |
| Domyslna zgoda | Niejasna autonomia uzytkownika |
| Strach przed strata | Manipulacja emocjonalna |
| Utrudniona rezygnacja | Dark pattern w kanale glosowym |

### Dobre praktyki

- Dawaj neutralne opcje.
- Szanuj "nie".
- Nie przeciagaj rozmowy sprzedazowej.
- Nie uzywaj presji w windykacji lub medycynie.
- Oddziel informowanie od perswazji.

### Przyklad

Zle:

"Jesli pan teraz nie skorzysta, moze pan stracic wyjatkowa okazje."

Lepiej:

"Moge sprawdzic dostepna oferte. Czy chce pan, zebym to zrobil?"

## Rozdzial 3. Dostepnosc i inkluzywnosc

### Dlaczego dostepnosc w glosie jest trudniejsza niz wyglada

Dostepnosc voicebota nie polega tylko na tym, czy system "slyszy" uzytkownika. W kanale glosowym wiele osob ma mniej czasu, mniej kontroli i mniej podpowiedzi niz na stronie internetowej. Nie widza listy opcji. Nie moga latwo wrocic wzrokiem do poprzedniego zdania. Musza zapamietac pytanie, zrozumiec je i odpowiedziec w rytmie narzuconym przez system. To szczegolnie obciaza osoby starsze, osoby w stresie, osoby neuroatypowe, osoby z problemami pamieci roboczej oraz uzytkownikow rozmawiajacych w halasie.

Dostepny voicebot powinien wiec zmniejszac obciazenie poznawcze. Ma mowic krotko, zadawac jedno pytanie naraz, dawac czas na odpowiedz i pozwalac na powtorzenie. Jesli uzytkownik nie odpowiada, bot nie powinien zakladac zlej woli. Cisza moze oznaczac szukanie dokumentu, niepewnosc, problem ze sluchem albo to, ze pytanie bylo zbyt trudne.

### Grupy wymagajace szczegolnej uwagi

- osoby starsze;
- osoby z wadami mowy;
- osoby z ograniczeniami sluchu;
- osoby neuroatypowe;
- osoby z niskimi kompetencjami cyfrowymi;
- osoby mowiace z akcentem lub gwara;
- osoby w stresie;
- osoby w halasliwym otoczeniu.

### Dostepnosc poznawcza

Dostepnosc poznawcza oznacza projektowanie rozmowy tak, aby uzytkownik nie musial nadmiernie pamietac, zgadywac ani przetwarzac wielu informacji naraz. To nie jest "ulatwianie tylko dla wybranych grup". W praktyce kazdy klient moze miec obnizona uwage: prowadzi samochod, stoi w sklepie, jest zdenerwowany reklamacja, trzyma dokumenty w reku albo rozmawia w drugim jezyku.

Najwazniejsze zasady:

| Problem | Co zrobic |
|---|---|
| Uzytkownik nie widzi opcji | Nie czytaj dlugich menu; pytaj otwarcie albo podaj maksymalnie 2-3 opcje |
| Uzytkownik musi zapamietac numer | Grupuj cyfry i potwierdzaj fragmentami |
| Uzytkownik nie rozumie pytania | Przeformuluj, nie powtarzaj identycznie |
| Uzytkownik potrzebuje czasu | Daj pauze i nie traktuj ciszy od razu jako bledu |
| Uzytkownik gubi sie w procesie | Powiedz, na jakim etapie jest rozmowa |
| Uzytkownik nie ufa automatyzacji | Daj jasna droge do konsultanta |

Przyklad:

Zle: "Prosze podac numer zamowienia, kod pocztowy, date zakupu oraz powod kontaktu."  
Lepiej: "Najpierw znajdziemy zamowienie. Prosze podac numer zamowienia. Moze pan powiedziec go po trzy cyfry."

### Projektowanie dostepne

| Obszar | Praktyka |
|---|---|
| Tempo | Wolniejsze w procesach medycznych, administracyjnych i senioralnych |
| Jezyk | Prosty, bez zargonu |
| Pytania | Jedno pytanie naraz |
| Alternatywy | DTMF, SMS, konsultant |
| Powtorzenia | Mozliwosc "powtorz" |
| Bledy | Bez obwiniania uzytkownika |
| Handoff | Latwy, szczegolnie po kilku niepowodzeniach |

### Instrukcje dla projektanta

Projektuj prompt tak, jakby uzytkownik slyszal go tylko raz, w gorszych warunkach niz w sali testowej. Najpierw powiedz, czego potrzebujesz. Potem podaj format odpowiedzi. Na koncu, jesli trzeba, dodaj alternatywe.

Dobry wzorzec:

```text
Cel: "Sprawdze zamowienie."
Prosba: "Prosze podac numer zamowienia."
Format: "Moze pan powiedziec go po trzy cyfry."
Alternatywa: "Jesli nie ma pan numeru, moge polaczyc z konsultantem."
```

Ten wzorzec jest dluzszy na papierze, ale w rozmowie bywa latwiejszy, bo prowadzi uzytkownika krok po kroku.

### Checklista dostepnosci

- Czy komunikaty sa proste?
- Czy bot nie wymaga zapamietania dlugich list?
- Czy jest alternatywa DTMF?
- Czy mozna poprosic o powtorzenie?
- Czy bot toleruje wolniejsza mowe i pauzy?
- Czy testowano osoby starsze lub o roznych sposobach mowienia?

## Rozdzial 4. Bias, jezyk prosty i inkluzywnosc

### Wyjasnienie eksperckie

Bias w voicebotach moze pojawic sie w ASR, NLU, LLM, danych treningowych i procesie. System moze gorzej rozumiec akcenty, osoby starsze, osoby z wadami wymowy albo nietypowe sformulowania. Odpowiedzialny projekt wymaga testow na zroznicowanych probkach, nie tylko na czystych nagraniach.

### Dobre praktyki

- Testuj rozne akcenty, tempo i jakosc audio.
- Nie zakladaj, ze "standardowa" mowa reprezentuje wszystkich.
- Uzywaj jezyka prostego.
- Unikaj zargonu branzowego.
- Monitoruj no-match per segment, jesli zgodne z prywatnoscia.
- Dla grup szczegolnie narazonych dawaj latwiejszy handoff.

## Rozdzial 5. Sytuacje kryzysowe i natychmiastowy handoff

### Kiedy bot powinien natychmiast przekazac rozmowe czlowiekowi

- zagrozenie zdrowia lub zycia;
- sygnaly przemocy, samouszkodzenia lub kryzysu;
- fraud, kradziez, utrata karty;
- sporna reklamacja;
- agresja lub silna frustracja;
- prosba o czlowieka;
- dane wrazliwe poza zakresem;
- ryzyko prawne lub medyczne;
- brak pewnosci przy akcji wysokiego ryzyka.

### Wzorzec komunikatu

"Nie moge bezpiecznie obsluzyc tej sprawy automatycznie. Polacze z konsultantem, ktory pomoze dalej."

### Checklista sytuacji trudnych

- Czy mamy liste sytuacji natychmiastowej eskalacji?
- Czy sa testowane?
- Czy konsultant dostaje kontekst?
- Czy bot nie probuje diagnozowac lub negocjowac poza zakresem?
- Czy istnieje procedura awaryjna dla branzy?

## Mini case studies

### 1. Osoba starsza nie rozumie pytania

Blad: bot powtarza identyczny prompt.  
Poprawa: bot upraszcza pytanie i daje opcje konsultanta.  
Dialog:

Bot: "Prosze podac numer sprawy."  
Uzytkownik: "Nie wiem, gdzie to jest."  
Bot: "Rozumiem. Numer jest w SMS-ie od nas. Mogę poczekac albo polaczyc z konsultantem."

### 2. Uzytkownik agresywny

Blad: bot kontynuuje flow.  
Poprawa: skrocenie i eskalacja.  
Dialog:

Uzytkownik: "Daj mi czlowieka, mam dosc tego bota."  
Bot: "Jasne. Polacze z konsultantem i przekaze dotychczasowe informacje."

### 3. Sprzedaz bez presji

Blad: bot ignoruje "nie".  
Poprawa: akceptuje odmowe.  
Dialog:

Bot: "Moge sprawdzic oferte."  
Uzytkownik: "Nie."  
Bot: "Dobrze, nie bede jej sprawdzac. W czym jeszcze moge pomoc?"

## Zbiorcza checklista po Czesci XIII

- Czy bot jest transparentny?
- Czy nie udaje czlowieka?
- Czy nie stosuje presji?
- Czy szanuje odmowe?
- Czy ma prosta droge do konsultanta?
- Czy jest dostepny dla osob starszych i roznych sposobow mowienia?
- Czy ma alternatywy: DTMF, SMS, konsultant?
- Czy testowano bias ASR/NLU?
- Czy sytuacje kryzysowe maja natychmiastowy handoff?

---

# Co bedzie w kolejnej czesci

Kolejna czesc: **Praca Voicebot Specialist**.

