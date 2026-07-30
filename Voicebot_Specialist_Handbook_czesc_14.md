# Voicebot Specialist Handbook

## Część 14: Etyka, dostępność i odpowiedzialne projektowanie

Wersja robocza: 2026-07-29

---

# Część XIII. Etyka, dostępność i odpowiedzialne projektowanie

## Cel części

Skuteczny voicebot nie powinien tylko automatyzowac kontaktu. Powinien robić to uczciwie, dostepnie i bez przerzucania kosztu automatyzacji na użytkownika. Etyka w voicebotach oznacza projektowanie systemu, który jest transparentny, przewidywalny, nienachalny, odporny na błędy i gotowy oddać rozmowę człowiekowi, gdy automatyzacja nie jest najlepsza droga.

## Rozdział 1. Transparentność i zaufanie

### Cele rozdziału

- Zrozumieć, dlaczego voicebot powinien jasno informowac, że jest systemem automatycznym.
- Projektować komunikaty budujace zaufanie bez udawania człowieka.
- Rozpoznawać zachowania niszczace zaufanie.

### Kluczowe pojęcia

| Pojęcie | Znaczenie |
|---|---|
| Transparentność | Użytkownik wie, że rozmawia z botem, co bot potrafi i jakie ma ograniczenia |
| Calibrated trust | Zaufanie dopasowane do realnych możliwości systemu |
| Overtrust | Nadmierne zaufanie do AI |
| Undertrust | Zbyt niskie zaufanie wynikające z niejasności lub złych doświadczeń |

### Wyjaśnienie eksperckie

Voicebot powinien być jasny od pierwszych sekund:

"Dzień dobry, jestem automatycznym asystentem firmy X. Pomoge sprawdzić zamówienie albo połączę z konsultantem."

To zdanie robi trzy rzeczy: ujawnia automatyzację, okresla zakres i daje droge do człowieka. Nie trzeba udawać konsultanta. Udawanie człowieka może chwilowo zwiększyć zaangazowanie, ale gdy system nie rozumie, rozczarowanie jest większe.

### Perspektywa biznesowa

Zaufanie jest aktywem operacyjnym. Jeśli klienci naucza się, że bot blokuje kontakt, będą szybciej eskalować, używać agresywnych skrotow albo omijac kanał. Transparentność zmniejsza opor, bo użytkownik wie, czego oczekiwac.

### Perspektywa użytkownika

Użytkownik chce wiedzieć:

- z kim rozmawia;
- co może załatwić;
- czy może poprawić błąd;
- czy może przejść do człowieka;
- czy rozmowa jest nagrywana lub analizowana.

### Dobre praktyki

- Informuj, że to system automatyczny.
- Nie udawaj ludzkich emocji.
- Mow jasno o zakresie.
- Dawaj prosta droge do konsultanta.
- Mow "nie wiem" lub "nie mogę tego ocenić", gdy to prawda.

### Typowe błędy

| Błąd | Skutek |
|---|---|
| Bot udaje człowieka | Utratą zaufania po błędzie |
| Brak informacji o zakresie | Nieadekwatne oczekiwania |
| Brak drogi do człowieka | Poczucie uwiezienia |
| Zbyt pewne odpowiedzi | Overtrust i ryzyko decyzji klienta |

### Checklista

- Czy bot jasno mówi, że jest automatyczny?
- Czy zakres jest jasny?
- Czy ograniczenia są komunikowane?
- Czy prośba o konsultanta jest respektowana?
- Czy bot nie udaje empatii?

## Rozdział 2. Projektowanie bez manipulacji

### Wyjaśnienie eksperckie

Voicebot może łatwo wywierac presje, bo głos jest bezposredni, sekwencyjny i trudniej go "przeskanować" niż tekst. Etyczne projektowanie wymaga, aby bot nie ukrywal opcji, nie utrudnial rezygnacji, nie wykorzystywal stresu i nie projektowal petli majacych zatrzymać klienta za wszelka cene.

### Ryzykowne wzorce

| Wzorzec | Dlaczego jest ryzykowny |
|---|---|
| Ukryty konsultant | Użytkownik traci kontrolę |
| Długie monologi sprzedażowe | Presja i brak barge-in |
| Domyslna zgoda | Niejasna autonomia użytkownika |
| Strach przed strata | Manipulacja emocjonalna |
| Utrudniona rezygnacja | Dark pattern w kanale głosowym |

### Dobre praktyki

- Dawaj neutralne opcję.
- Szanuj "nie".
- Nie przeciągaj rozmowy sprzedazowej.
- Nie używaj presji w windykacji lub medycynie.
- Oddziel informowanie od perswazji.

### Przykład

Źle:

"Jeśli pan teraz nie skorzysta, może pan stracić wyjatkowa okazje."

Lepiej:

"Mogę sprawdzić dostępna oferte. Czy chce pan, zebym to zrobił?"

## Rozdział 3. Dostępność i inkluzywnosc

### Dlaczego dostępność w głosie jest trudniejsza niż wygląda

Dostępność voicebota nie polega tylko na tym, czy system "słyszy" użytkownika. W kanale głosowym wiele osób ma mniej czasu, mniej kontroli i mniej podpowiedzi niż na stronie internetowej. Nie widzą listy opcji. Nie mogą łatwo wrócić wzrokiem do poprzedniego zdania. Muszą zapamiętać pytanie, zrozumieć je i odpowiedzieć w rytmie narzuconym przez system. To szczególnie obciąża osoby starsze, osoby w stresie, osoby neuroatypowe, osoby z problemami pamięci roboczej oraz użytkowników rozmawiających w hałasie.

Dostępny voicebot powinien więc zmniejszać obciążenie poznawcze. Ma mówić krótko, zadawać jedno pytanie naraz, dawać czas na odpowiedź i pozwalać na powtórzenie. Jeśli użytkownik nie odpowiada, bot nie powinien zakładać złej woli. Cisza może oznaczać szukanie dokumentu, niepewność, problem że słuchem albo to, że pytanie było zbyt trudne.

### Grupy wymagające szczególnej uwagi

- osoby starsze;
- osoby z wadami mowy;
- osoby z ograniczeniami słuchu;
- osoby neuroatypowe;
- osoby z niskimi kompetencjami cyfrowymi;
- osoby mowiace z akcentem lub gwara;
- osoby w stresie;
- osoby w halasliwym otoczeniu.

### Dostępność poznawcza

Dostępność poznawcza oznacza projektowanie rozmowy tak, aby użytkownik nie musiał nadmiernie pamiętać, zgadywac ani przetwarzac wielu informacji naraz. To nie jest "ulatwianie tylko dla wybranych grup". W praktyce każdy klient może mieć obnizona uwagę: prowadzi samochod, stoi w sklepie, jest zdenerwowany reklamacja, trzyma dokumenty w reku albo rozmawia w drugim języku.

Najważniejsze zasady:

| Problem | Co zrobić |
|---|---|
| Użytkownik nie widzi opcji | Nie czytaj długich menu; pytaj otwarcie albo podaj maksymalnie 2-3 opcję |
| Użytkownik musi zapamiętać numer | Grupuj cyfry i potwierdzaj fragmentami |
| Użytkownik nie rozumie pytania | Przeformuluj, nie powtarzaj identycznie |
| Użytkownik potrzebuje czasu | Daj pauze i nie traktuj ciszy od razu jako błędu |
| Użytkownik gubi się w procesie | Powiedz, na jakim etapie jest rozmową |
| Użytkownik nie ufa automatyzacji | Daj jasna droge do konsultanta |

Przykład:

Źle: "Proszę podac numer zamówienia, kod pocztowy, datę zakupu oraz powod kontaktu."  
Lepiej: "Najpierw znajdziemy zamówienie. Proszę podac numer zamówienia. Może pan powiedzieć go po trzy cyfry."

### Projektowanie dostępne

| Obszar | Praktyka |
|---|---|
| Tempo | Wolniejsze w procesach medycznych, administracyjnych i senioralnych |
| Język | Prosty, bez żargonu |
| Pytania | Jedno pytanie naraz |
| Alternatywy | DTMF, SMS, konsultant |
| Powtórzenia | Możliwość "powtórz" |
| Błędy | Bez obwiniania użytkownika |
| Handoff | Łatwy, szczególnie po kilku niepowodzeniach |

### Instrukcje dla projektanta

Projektuj prompt tak, jakby użytkownik słyszał go tylko raz, w gorszych warunkach niż w sali testowej. Najpierw powiedz, czego potrzebujesz. Potem podaj format odpowiedzi. Na koncu, jeśli trzeba, dodaj alternatywe.

Dobry wzorzec:

```text
Cel: "Sprawdze zamowienie."
Prosba: "Prosze podac numer zamowienia."
Format: "Moze pan powiedziec go po trzy cyfry."
Alternatywa: "Jesli nie ma pan numeru, moge polaczyc z konsultantem."
```

Ten wzorzec jest dłuższy na papierze, ale w rozmowie bywa łatwiejszy, bo prowadzi użytkownika krok po kroku.

### Checklista dostępności

- Czy komunikaty są proste?
- Czy bot nie wymaga zapamiętania długich list?
- Czy jest alternatywa DTMF?
- Czy można poprosić o powtórzenie?
- Czy bot toleruje wolniejsza mowę i pauzy?
- Czy testowano osoby starsze lub o różnych sposobach mówienia?

## Rozdział 4. Bias, język prosty i inkluzywnosc

### Wyjaśnienie eksperckie

Bias w voicebotach może pojawic się w ASR, NLU, LLM, danych treningowych i procesie. System może gorzej rozumieć akcenty, osoby starsze, osoby z wadami wymowy albo nietypowe sformulowania. Odpowiedzialny projekt wymaga testów na zroznicowanych probkach, nie tylko na czystych nagraniach.

### Dobre praktyki

- Testuj różne akcenty, tempo i jakość audio.
- Nie zakladaj, że "standardowa" mowa reprezentuje wszystkich.
- Używaj języka prostego.
- Unikaj żargonu branżowego.
- Monitoruj no-match per segment, jeśli zgodne z prywatnoscia.
- Dla grup szczególnie narazonych dawaj łatwiejszy handoff.

## Rozdział 5. Sytuację kryzysowe i natychmiastowy handoff

### Kiedy bot powinien natychmiast przekazać rozmowę człowiekowi

- zagrozenie zdrowia lub życia;
- sygnały przemocy, samouszkodzenia lub kryzysu;
- fraud, kradziez, utratą karty;
- sporna reklamacja;
- agresja lub silna frustracja;
- prośba o człowieka;
- dane wrażliwe poza zakresem;
- ryzyko prawne lub medyczne;
- brak pewności przy akcji wysokiego ryzyka.

### Wzorzec komunikatu

"Nie mogę bezpiecznie obsłużyć tej sprawy automatycznie. Połączę z konsultantem, który pomoze dalej."

### Checklista sytuacji trudnych

- Czy mamy listę sytuacji natychmiastowej eskalacji?
- Czy są testowane?
- Czy konsultant dostaje kontekst?
- Czy bot nie próbuje diagnozowac lub negocjowac poza zakresem?
- Czy istnieje procedura awaryjna dla branży?

## Mini case studies

### 1. Osoba starsza nie rozumie pytania

Błąd: bot powtarza identyczny prompt.  
Poprawa: bot upraszcza pytanie i daje opcję konsultanta.  
Dialog:

Bot: "Proszę podac numer sprawy."  
Użytkownik: "Nie wiem, gdzie to jest."  
Bot: "Rozumiem. Numer jest w SMS-ie od nas. Mogę poczekac albo połączyć z konsultantem."

### 2. Użytkownik agresywny

Błąd: bot kontynuuje flow.  
Poprawa: skrócenie i eskalacja.  
Dialog:

Użytkownik: "Daj mi człowieka, mam dosc tego bota."  
Bot: "Jasne. Połączę z konsultantem i przekaze dotychczasowe informacje."

### 3. Sprzedaż bez presji

Błąd: bot ignoruje "nie".  
Poprawa: akceptuje odmowe.  
Dialog:

Bot: "Mogę sprawdzić oferte."  
Użytkownik: "Nie."  
Bot: "Dobrze, nie będę jej sprawdzać. W czym jeszcze mogę pomóc?"

## Zbiorcza checklista po Części XIII

- Czy bot jest transparentny?
- Czy nie udaje człowieka?
- Czy nie stosuje presji?
- Czy szanuje odmowe?
- Czy ma prosta droge do konsultanta?
- Czy jest dostępny dla osób starszych i różnych sposobów mówienia?
- Czy ma alternatywy: DTMF, SMS, konsultant?
- Czy testowano bias ASR/NLU?
- Czy sytuację kryzysowe mają natychmiastowy handoff?

---

# Co będzie w kolejnej części

Kolejna część: **Praca Voicebot Specialist**.

