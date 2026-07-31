# Voicebot Specialist Handbook

## Część 14: Etyka, dostępność i odpowiedzialne projektowanie

Wersja robocza: 2026-07-29

---

# Część XIII. Etyka, dostępność i odpowiedzialne projektowanie

## Cel części

Skuteczny voicebot nie powinien tylko automatyzować kontaktu. Powinien robić to uczciwie, dostępnie i bez przerzucania kosztu automatyzacji na użytkownika. Etyka w voicebotach oznacza projektowanie systemu, który jest transparentny, przewidywalny, nienachalny, odporny na błędy i gotowy oddać rozmowę człowiekowi, gdy automatyzacja nie jest najlepszą drogą.

## Rozdział 1. Transparentność i zaufanie

### Cele rozdziału

- Zrozumieć, dlaczego voicebot powinien jasno informować, że jest systemem automatycznym.
- Projektować komunikaty budujące zaufanie bez udawania człowieka.
- Rozpoznawać zachowania niszczące zaufanie.

### Kluczowe pojęcia

| Pojęcie | Znaczenie |
|---|---|
| Transparentność | Użytkownik wie, że rozmawia z botem, co bot potrafi i jakie ma ograniczenia |
| Calibrated trust | Zaufanie dopasowane do realnych możliwości systemu |
| Overtrust | Nadmierne zaufanie do AI |
| Undertrust | Zbyt niskie zaufanie wynikające z niejasności lub złych doświadczeń |

### Wyjaśnienie eksperckie

Voicebot powinien być jasny od pierwszych sekund:

"Dzień dobry, jestem automatycznym asystentem firmy X. Pomogę sprawdzić zamówienie albo połączę z konsultantem."

To zdanie robi trzy rzeczy: ujawnia automatyzację, określa zakres i daje drogę do człowieka. Nie trzeba udawać konsultanta. Udawanie człowieka może chwilowo zwiększyć zaangażowanie, ale gdy system nie rozumie, rozczarowanie jest większe.

### Perspektywa biznesowa

Zaufanie jest aktywem operacyjnym. Jeśli klienci nauczą się, że bot blokuje kontakt, będą szybciej eskalować, używać agresywnych skrótów albo omijać kanał. Transparentność zmniejsza opór, bo użytkownik wie, czego oczekiwać.

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
- Mów jasno o zakresie.
- Dawaj prostą drogę do konsultanta.
- Mów "nie wiem" lub "nie mogę tego ocenić", gdy to prawda.

### Typowe błędy

| Błąd | Skutek |
|---|---|
| Bot udaje człowieka | Utrata zaufania po błędzie |
| Brak informacji o zakresie | Nieadekwatne oczekiwania |
| Brak drogi do człowieka | Poczucie uwięzienia |
| Zbyt pewne odpowiedzi | Overtrust i ryzyko decyzji klienta |

### Checklista

- Czy bot jasno mówi, że jest automatyczny?
- Czy zakres jest jasny?
- Czy ograniczenia są komunikowane?
- Czy prośba o konsultanta jest respektowana?
- Czy bot nie udaje empatii?

## Rozdział 2. Projektowanie bez manipulacji

### Wyjaśnienie eksperckie

Voicebot może łatwo wywierać presję, bo głos jest bezpośredni, sekwencyjny i trudniej go "przeskanować" niż tekst. Etyczne projektowanie wymaga, aby bot nie ukrywał opcji, nie utrudniał rezygnacji, nie wykorzystywał stresu i nie projektował pętli mających zatrzymać klienta za wszelką cenę.

### Ryzykowne wzorce

| Wzorzec | Dlaczego jest ryzykowny |
|---|---|
| Ukryty konsultant | Użytkownik traci kontrolę |
| Długie monologi sprzedażowe | Presja i brak barge-in |
| Domyślna zgoda | Niejasna autonomia użytkownika |
| Strach przed stratą | Manipulacja emocjonalna |
| Utrudniona rezygnacja | Dark pattern w kanale głosowym |

### Dobre praktyki

- Dawaj neutralne opcje.
- Szanuj "nie".
- Nie przeciągaj rozmowy sprzedażowej.
- Nie używaj presji w windykacji lub medycynie.
- Oddziel informowanie od perswazji.

### Przykład

Źle:

"Jeśli pan teraz nie skorzysta, może pan stracić wyjątkową okazję."

Lepiej:

"Mogę sprawdzić dostępną ofertę. Czy chce pan, żebym to zrobił?"

## Rozdział 3. Dostępność i inkluzywność

### Dlaczego dostępność w głosie jest trudniejsza niż wygląda

Dostępność voicebota nie polega tylko na tym, czy system "słyszy" użytkownika. W kanale głosowym wiele osób ma mniej czasu, mniej kontroli i mniej podpowiedzi niż na stronie internetowej. Nie widzą listy opcji. Nie mogą łatwo wrócić wzrokiem do poprzedniego zdania. Muszą zapamiętać pytanie, zrozumieć je i odpowiedzieć w rytmie narzuconym przez system. To szczególnie obciąża osoby starsze, osoby w stresie, osoby neuroatypowe, osoby z problemami pamięci roboczej oraz użytkowników rozmawiających w hałasie.

Dostępny voicebot powinien więc zmniejszać obciążenie poznawcze. Ma mówić krótko, zadawać jedno pytanie naraz, dawać czas na odpowiedź i pozwalać na powtórzenie. Jeśli użytkownik nie odpowiada, bot nie powinien zakładać złej woli. Cisza może oznaczać szukanie dokumentu, niepewność, problem ze słuchem albo to, że pytanie było zbyt trudne.

### Grupy wymagające szczególnej uwagi

- osoby starsze;
- osoby z wadami mowy;
- osoby z ograniczeniami słuchu;
- osoby neuroatypowe;
- osoby z niskimi kompetencjami cyfrowymi;
- osoby mówiące z akcentem lub gwarą;
- osoby w stresie;
- osoby w hałaśliwym otoczeniu.

### Dostępność poznawcza

Dostępność poznawcza oznacza projektowanie rozmowy tak, aby użytkownik nie musiał nadmiernie pamiętać, zgadywać ani przetwarzać wielu informacji naraz. To nie jest "ułatwianie tylko dla wybranych grup". W praktyce każdy klient może mieć obniżoną uwagę: prowadzi samochód, stoi w sklepie, jest zdenerwowany reklamacją, trzyma dokumenty w ręku albo rozmawia w drugim języku.

Najważniejsze zasady:

| Problem | Co zrobić |
|---|---|
| Użytkownik nie widzi opcji | Nie czytaj długich menu; pytaj otwarcie albo podaj maksymalnie 2-3 opcje |
| Użytkownik musi zapamiętać numer | Grupuj cyfry i potwierdzaj fragmentami |
| Użytkownik nie rozumie pytania | Przeformułuj, nie powtarzaj identycznie |
| Użytkownik potrzebuje czasu | Daj pauzę i nie traktuj ciszy od razu jako błędu |
| Użytkownik gubi się w procesie | Powiedz, na jakim etapie jest rozmowa |
| Użytkownik nie ufa automatyzacji | Daj jasną drogę do konsultanta |

Przykład:

Źle: "Proszę podać numer zamówienia, kod pocztowy, datę zakupu oraz powód kontaktu."  
Lepiej: "Najpierw znajdziemy zamówienie. Proszę podać numer zamówienia. Może pan powiedzieć go po trzy cyfry."

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

Projektuj prompt tak, jakby użytkownik słyszał go tylko raz, w gorszych warunkach niż w sali testowej. Najpierw powiedz, czego potrzebujesz. Potem podaj format odpowiedzi. Na końcu, jeśli trzeba, dodaj alternatywę.

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
- Czy bot toleruje wolniejszą mowę i pauzy?
- Czy testowano osoby starsze lub o różnych sposobach mówienia?

## Rozdział 4. Bias, język prosty i inkluzywność

### Wyjaśnienie eksperckie

Bias w voicebotach może pojawić się w ASR, NLU, LLM, danych treningowych i procesie. System może gorzej rozumieć akcenty, osoby starsze, osoby z wadami wymowy albo nietypowe sformułowania. Odpowiedzialny projekt wymaga testów na zróżnicowanych próbkach, nie tylko na czystych nagraniach.

### Dobre praktyki

- Testuj różne akcenty, tempo i jakość audio.
- Nie zakładaj, że "standardowa" mowa reprezentuje wszystkich.
- Używaj języka prostego.
- Unikaj żargonu branżowego.
- Monitoruj no-match per segment, jeśli zgodne z prywatnością.
- Dla grup szczególnie narażonych dawaj łatwiejszy handoff.

## Rozdział 5. Sytuacje kryzysowe i natychmiastowy handoff

### Kiedy bot powinien natychmiast przekazać rozmowę człowiekowi

- zagrożenie zdrowia lub życia;
- sygnały przemocy, samouszkodzenia lub kryzysu;
- fraud, kradzież, utrata karty;
- sporna reklamacja;
- agresja lub silna frustracja;
- prośba o człowieka;
- dane wrażliwe poza zakresem;
- ryzyko prawne lub medyczne;
- brak pewności przy akcji wysokiego ryzyka.

### Wzorzec komunikatu

"Nie mogę bezpiecznie obsłużyć tej sprawy automatycznie. Połączę z konsultantem, który pomoże dalej."

### Checklista sytuacji trudnych

- Czy mamy listę sytuacji natychmiastowej eskalacji?
- Czy są testowane?
- Czy konsultant dostaje kontekst?
- Czy bot nie próbuje diagnozować lub negocjować poza zakresem?
- Czy istnieje procedura awaryjna dla branży?

## Mini case studies

### 1. Osoba starsza nie rozumie pytania

Błąd: bot powtarza identyczny prompt.  
Poprawa: bot upraszcza pytanie i daje opcję konsultanta.  
Dialog:

Bot: "Proszę podać numer sprawy."  
Użytkownik: "Nie wiem, gdzie to jest."  
Bot: "Rozumiem. Numer jest w SMS-ie od nas. Mogę poczekać albo połączyć z konsultantem."

### 2. Użytkownik agresywny

Błąd: bot kontynuuje flow.  
Poprawa: skrócenie i eskalacja.  
Dialog:

Użytkownik: "Daj mi człowieka, mam dość tego bota."  
Bot: "Jasne. Połączę z konsultantem i przekażę dotychczasowe informacje."

### 3. Sprzedaż bez presji

Błąd: bot ignoruje "nie".  
Poprawa: akceptuje odmowę.  
Dialog:

Bot: "Mogę sprawdzić ofertę."  
Użytkownik: "Nie."  
Bot: "Dobrze, nie będę jej sprawdzać. W czym jeszcze mogę pomóc?"

## Zbiorcza checklista po Części XIII

- Czy bot jest transparentny?
- Czy nie udaje człowieka?
- Czy nie stosuje presji?
- Czy szanuje odmowę?
- Czy ma prostą drogę do konsultanta?
- Czy jest dostępny dla osób starszych i różnych sposobów mówienia?
- Czy ma alternatywy: DTMF, SMS, konsultant?
- Czy testowano bias ASR/NLU?
- Czy sytuacje kryzysowe mają natychmiastowy handoff?

---

# Co będzie w kolejnej części

Kolejna część: **Praca Voicebot Specialist**.

