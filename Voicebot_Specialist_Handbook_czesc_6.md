# Voicebot Specialist Handbook

## Część 6: Projektowanie dialogów i scenariuszy

Wersja robocza: 2026-07-29  
Kontynuacja plików:

- `Voicebot_Specialist_Handbook_czesc_1.md`
- `Voicebot_Specialist_Handbook_czesc_2.md`
- `Voicebot_Specialist_Handbook_czesc_3.md`
- `Voicebot_Specialist_Handbook_czesc_4.md`
- `Voicebot_Specialist_Handbook_czesc_5.md`

---

# Część V. Projektowanie dialogów i scenariuszy

## Cel całej części

Ta część pokazuje, jak zamienić use case i wymagania biznesowe w konkretny projekt rozmowy. W praktyce voicebot nie składa się tylko z intencji i ładnych promptów. Składa się z kontrolowanej struktury dialogu: stanów, slotów, kontekstów, walidacji, potwierdzeń, napraw, eskalacji, przerwań i integracji.

Po tej części czytelnik powinien umieć:

1. Projektować intencje, encje, sloty i konteksty.
2. Budować flow rozmowy dla happy path i unhappy paths.
3. Projektować fallback path, escalation path i recovery.
4. Dobierać strategie potwierdzeń do ryzyka.
5. Obsługiwać korekty, zmianę tematu, multi-intent i przerwania.
6. Tworzyć dialogi informacyjne, transakcyjne, sprzedażowe, windykacyjne, medyczne/rezerwacyjne i ankietowe.
7. Analizować dobre i złe dialogi.
8. Dokumentować scenariusz tak, aby mógł być wdrożony, testowany i optymalizowany.

Źródła wspierające część:

- W3C VoiceXML 2.0: formularze, pola, gramatyki, menu, no-input, no-match, event handling, mixed initiative.
- Google Dialogflow CX i Amazon Lex: intencje, sloty/parametry, speech settings, interruption handling.
- LiveKit i OpenAI Realtime: realtime turns, interruption handling, cancellation, turn detection.
- Źródła naukowe o turn-taking i przerwaniach: uzasadnienie projektowania korekt, przerwań, pauz i recovery.
- Uzupełnienie eksperckie: wzorce scenariuszy, strategie repair, matryce potwierdzeń, praktyczne dialogi branżowe.

---

# Rozdział 1. Intencje, encje, sloty i konteksty

## 1.1. Cele rozdziału

Czytelnik nauczy się:

- projektować intencje jako cele użytkownika, nie tematy firmowe;
- definiować encje i sloty potrzebne do wykonania procesu;
- rozumieć role kontekstu w interpretacji wypowiedzi;
- unikać modeli intencji, które są trudne do trenowania i utrzymania.

## 1.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja praktyczna | Typowe nieporozumienie |
|---|---|---|
| Intencja | Cel wypowiedzi użytkownika, np. "zmień_termin_dostawy" | "Intencja to temat, np. dostawa" |
| Encja | Informacja wyodrębniona z wypowiedzi, np. data, numer, miasto | "Encja zawsze jest slotem" |
| Slot | Pole wymagane do wykonania zadania, np. numer zamówienia | "Slot musi być podany w pierwszej wypowiedzi" |
| Kontekst | Stan rozmowy, który zmienia znaczenie wypowiedzi | "Każdą wypowiedź można interpretować niezależnie" |
| Utterance | Przykładowa wypowiedź użytkownika | "Kilka sztucznych przykładów wystarczy" |
| Meta-intencja | Intencja sterująca rozmową, np. "konsultant", "powtórz", "anuluj" | "To nie jest prawdziwy use case, więc nie trzeba jej modelować" |

## 1.3. Wyjaśnienie eksperckie

Intencja powinna odpowiadać temu, co użytkownik chce osiągnąć. Nie powinna być kopią struktury organizacyjnej ani raportu contact center.

Złe intencje:

- `obsługa_klienta`
- `dostawa`
- `reklamację`
- `inne`

Dobre intencje:

- `sprawdz_status_zamowienia`
- `zmień_adres_dostawy`
- `anuluj_zamowienie`
- `zloz_reklamacje_dostawy`
- `popros_o_konsultanta`
- `popraw_dane`
- `powtorz_ostatnia_informacje`

Encje i sloty są powiązane, ale nie identyczne. Encja to coś, co system może wykryć w wypowiedzi. Slot to informacja potrzebna procesowi.

Przykład:

Użytkownik: "Chcę przełożyć dostawę na piątek po południu."

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

Kontekst decyduje, co znaczy krótka wypowiedź. "Tak" po pytaniu o anulowanie ma inny ciężar niż "tak" po pytaniu o wysłanie SMS-a. "Nie" może oznaczać odmowę, korektę, sprzeciw, frustrację albo prośbę o cofnięcie.

## 1.4. Perspektywa biznesowa

Model intencji jest operacyjną mapą procesów. Jeśli intencje są zbyt szerokie, raportowanie nie powie, czego chcą klienci. Jeśli są zbyt wąskie, model będzie się mylił, a utrzymanie stanie się kosztowne.

Dobra struktura intencji pozwala:

- mierzyć powody kontaktu;
- projektować handoff do właściwych kolejek;
- priorytetyzować optymalizację;
- łączyć dialog z procesem;
- rozpoznawać luki produktowe i operacyjne.

## 1.5. Perspektywa użytkownika

Użytkownik nie zna nazw intencji. Mówi potocznie:

- "gdzie jest moja paczka";
- "kurier nie przyjechał";
- "chcę zmienić jutro na piątek";
- "nie, nie ten numer";
- "dajcie człowieka";
- "ja już to podawałem".

Bot powinien rozumieć cel mimo różnych sformułowań, ale nie powinien udawać pewności, gdy intencje są podobne. Przy niepewności lepsze jest doprecyzowanie:

"Czy chce pan sprawdzić status przesyłki, czy zmienić adres dostawy?"

## 1.6. Perspektywa technologiczna

Projekt intencji powinien zawierać:

- nazwę techniczną;
- nazwę biznesową;
- definicje;
- zakres;
- poza zakresem;
- przykłady pozytywne;
- przykłady negatywne;
- wymagane sloty;
- opcjonalne sloty;
- encje;
- progi confidence;
- disambiguation;
- fallback;
- handoff conditions;
- metryki.

## 1.7. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Projektuj intencje wokół akcji użytkownika.
- Dodawaj meta-intencje: konsultant, anuluj, powtórz, stop, popraw, nie rozumiem.
- Nie twórz intencji, których nie da się odróżnić w języku użytkownika.
- Dla podobnych tematów rozważ jedną intencję plus slot typu problemu.
- Dokumentuj "poza zakresem" dla każdej intencji.
- Zbieraj realne wypowiedzi z nagrań i transkrypcji.
- Utrzymuj test set niezależny od training set.

## 1.8. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Intencje według działów firmy | Bot nie rozumie celu użytkownika |
| Jedna intencja "reklamacja" | Brak akcji i słabe raportowanie |
| Zbyt wiele podobnych intencji | Confusion matrix pełna pomyłek |
| Brak intencji korekty | Użytkownik nie może naprawić danych |
| Brak intencji konsultanta | Bot walczy z użytkownikiem |
| Brak negatywnych przykładów | Model łapie wypowiedzi spoza zakresu |

## 1.9. Checklista intencji

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy intencja opisuje cel użytkownika?
- Czy ma jasny zakres i poza zakresem?
- Czy ma przykłady realnych wypowiedzi?
- Czy ma przykłady negatywne?
- Czy wiadomo, jakie sloty są potrzebne?
- Czy intencja jest odróżnialna od innych?
- Czy istnieje strategia niskiego confidence?
- Czy istnieje handoff, jeśli intencja jest poza zakresem?

## 1.10. Mini case study

Telekom miał osobne intencje: `brak_internetu`, `wolny_internet`, `problem_wifi`, `awaria_routera`. W praktyce użytkownicy mówili podobnie: "internet nie działa", "mam problem z netem", "wszystko mi przerywa". Model mylił intencje. Zespół połączył je w `problem_z_internetem`, a typ problemu zbierał jako slot w kolejnym kroku. Rozumienie na starcie wzrosło, a raportowanie nadal było możliwe przez slot `problem_type`.

## 1.11. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Zaprojektuj 12 intencji dla voicebota e-commerce.
2. Dla jednej intencji wpisz zakres i poza zakresem.
3. Wypisz 20 realnych fraz użytkownika dla "zmiana adresu".
4. Zaprojektuj meta-intencje potrzebne w każdym voicebocie.

## 1.12. Podsumowanie

Intencje, encje, sloty i konteksty są fundamentem scenariusza. Dobre intencje są blisko celu użytkownika i procesu biznesowego. Złe intencje są listą tematów, która dobrze wygląda w tabeli, ale źle działa w rozmowie.

---

# Rozdział 2. Flow, happy path, unhappy paths, fallback path i escalation path

## 2.1. Cele rozdziału

Czytelnik nauczy się:

- projektować flow jako strukturę stanów i przejść;
- rozróżnić happy path, unhappy path, fallback path i escalation path;
- dokumentować warunki przejść;
- unikać scenariuszy, które działają tylko dla idealnego użytkownika.

## 2.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Flow | Przebieg rozmowy w procesie |
| State | Stan rozmowy, np. "czekamy na numer zamówienia" |
| Transition | Przejście między stanami |
| Happy path | Idealna ścieżka, gdy wszystko idzie zgodnie z planem |
| Unhappy path | Ścieżka dla problemów przewidywalnych |
| Fallback path | Ścieżka po niezrozumieniu, ciszy lub input poza zakresem |
| Escalation path | Ścieżka przekazania do konsultanta lub innego procesu |

## 2.3. Wyjaśnienie eksperckie

Happy path jest potrzebny, ale nie wystarcza. Realna rozmowa zawiera:

- brak danych;
- dane błędne;
- korekty;
- ciszę;
- odpowiedzi spoza zakresu;
- zmianę celu;
- przerwania;
- timeouty integracji;
- emocje;
- prośbę o konsultanta.

Przykład flow dla zmiany adresu:

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
- wiele zamówień;
- zamówienie już wysłane;
- adres niepełny;
- integracja nie odpowiada;
- użytkownik chce konsultanta.

## 2.4. Perspektywa biznesowa

Flow przekłada proces biznesowy na rozmowę. Jeśli proces ma reguły, voicebot musi je znać:

- kiedy akcja jest dozwolona;
- kiedy potrzebna jest weryfikacja;
- kiedy trzeba potwierdzić;
- kiedy nie wolno automatyzować;
- kiedy sprawa trafia do człowieka.

Brak unhappy paths prowadzi do tego, że bot działa w demo, ale nie na produkcji.

## 2.5. Perspektywa użytkownika

Użytkownik nie powinien czuć, że zboczył ze scenariusza. Nawet jeśli nie poda wszystkich danych, bot powinien pomóc:

"Potrzebuję jeszcze numeru domu. Jaki to numer?"

Zamiast:

"Adres niepoprawny. Proszę podać adres."

## 2.6. Perspektywa technologiczna

Flow powinien być zapisany jako:

- stany;
- warunki wejścia;
- oczekiwane intencje;
- sloty;
- walidacje;
- integracje;
- przejścia;
- zdarzenia awaryjne;
- logi;
- metryki;
- test cases.

## 2.7. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Projektuj happy path, ale testuj unhappy paths.
- Każdy stan powinien mieć wyjście.
- Każdy krytyczny slot powinien mieć walidacje.
- Każdy błąd integracji powinien mieć komunikat i plan.
- Escalation path projektuj od początku.
- Nie twórz pętli bez limitu.
- Dokumentuj warunki przejść.

## 2.8. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Projekt tylko happy path | Bot zawodzi przy pierwszym wyjątku |
| Brak limitu fallbacków | Pętle frustracji |
| Brak wyjścia ze stanu | Użytkownik utknie |
| Brak obsługi integracji | Martwa cisza lub zły komunikat |
| Brak flow dla wielu wyników | Bot nie wie, które zamówienie wybrać |
| Brak escalation path | Automatyzacja blokuje sprawę |

## 2.9. Checklista flow

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy flow ma jasno określony start i koniec?
- Czy każdy stan ma expected input?
- Czy każdy stan ma no-input i no-match?
- Czy każdy slot ma walidacje?
- Czy istnieją unhappy paths?
- Czy błędy API są obsługiwane?
- Czy istnieje handoff?
- Czy pętle mają limit?
- Czy flow ma test cases?

## 2.10. Mini case study

Voicebot rezerwacyjny miał happy path: użytkownik podaje datę, system rezerwuje termin. Na produkcji 30% rozmów dotyczyło terminów niedostępnych. Bot mówił tylko "termin niedostępny" i wracał do pytania. Po poprawie flow dodano proponowanie dwóch najbliższych terminów, możliwość zmiany lokalizacji i handoff dla pilnych spraw. Task completion wzrósł.

## 2.11. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Narysuj flow dla statusu reklamacji.
2. Dodaj trzy unhappy paths.
3. Dodaj fallback path po no-match.
4. Dodaj escalation path po prośbie o konsultanta.

## 2.12. Podsumowanie

Flow to nie liniowy skrypt. To system decyzji. Dobry flow prowadzi użytkownika przez proces, ale umie też obsługiwać wyjątki, błędy i emocje bez utraty kontroli.

---

# Rozdział 3. Repair strategies i confirmation strategies

## 3.1. Cele rozdziału

Czytelnik nauczy się:

- projektować naprawę rozmowy po błędzie;
- dobierać potwierdzenia do ryzyka;
- odróżniać explicit i implicit confirmation;
- zmniejszać frustrację bez utraty kontroli procesu.

## 3.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Repair | Naprawa rozmowy po błędzie, nieporozumieniu lub braku danych |
| Self-repair | Użytkownik sam poprawia wypowiedź |
| Other-initiated repair | Bot prosi o doprecyzowanie lub poprawkę |
| Explicit confirmation | Bot pyta o potwierdzenie, np. "Czy się zgadza?" |
| Implicit confirmation | Bot potwierdza i idzie dalej |
| Correction loop | Krótka ścieżka poprawiania konkretnego slotu |
| Confidence threshold | Próg pewności wymagany do decyzji |

## 3.3. Wyjaśnienie eksperckie

W rozmowie błędy są normalne. Problemem nie jest to, że bot czasem nie zrozumie. Problemem jest to, że naprawa jest zła.

Złe repair:

Bot: "Nie zrozumiałem. Proszę powtórzyć."  
Użytkownik: "Już mówiłem, Kwiatowa 8."  
Bot: "Nie zrozumiałem. Proszę powtórzyć."

Dobre repair:

Bot: "Nie mam pewności, czy numer domu to osiem czy osiemnaście. Który numer mam wpisać?"

Naprawa powinna zmniejszać przestrzeń błędu. Zamiast prosić o powtórzenie wszystkiego, bot powinien wskazać, czego brakuje albo co jest niepewne.

## 3.4. Strategie repair

| Sytuacja | Strategia |
|---|---|
| Brak jednego slotu | Dopytaj tylko o brakujący slot |
| Niepewna wartość | Zapytaj o rozróżnienie |
| Źle rozpoznana intencja | Disambiguation |
| Brak inputu | Powtórz krótko i daj przykłady |
| No-match | Zawęź opcję |
| Powtarzający się błąd | Zmień kanał, DTMF lub handoff |
| Frustracja | Skróć, uznaj problem, eskaluj |
| Korekta użytkownika | Popraw konkretny slot i potwierdź |

## 3.5. Strategie potwierdzeń

| Typ danych/akcji | Zalecana strategia |
|---|---|
| Informacja niskiego ryzyka | Brak potwierdzenia |
| Rozpoznanie intencji | Implicit confirmation |
| Data/godzina | Implicit lub explicit zależne od skutku |
| Adres | Explicit przed zapisem |
| Numer sprawy | Potwierdzenie grupami lub powtórzenie |
| Płatność | Explicit, jasne i zapisane |
| Anulowanie | Explicit |
| Zgoda prawna | Explicit lub procedura zgodna z compliance |
| Handoff | Krótkie potwierdzenie celu przekazania |

Przykład implicit:

"Sprawdzę status zamówienia. Proszę podać numer."

Przykład explicit:

"Mam zmienić adres na Kwiatowa 8 mieszkania 12. Czy się zgadza?"

## 3.6. Perspektywa biznesowa

Potwierdzenia mają koszt czasu, ale brak potwierdzeń ma koszt błędów. Decyzja zależy od:

- skutku akcji;
- odwracalności;
- ryzyka reklamacji;
- wymogów prawnych;
- pewności ASR/NLU;
- wartości klienta;
- emocjonalnego kontekstu.

## 3.7. Perspektywa użytkownika

Użytkownik chce, aby bot:

- nie kazał powtarzać wszystkiego;
- jasno mówił, czego nie zrozumiał;
- potwierdzał rzeczy ważne;
- nie potwierdzał każdej oczywistości;
- pozwalał poprawić błąd.

Zbyt wiele potwierdzeń brzmi jak brak kompetencji. Za mało potwierdzeń brzmi jak ryzyko.

## 3.8. Perspektywa technologiczna

Repair i confirmation powinny korzystać z:

- ASR confidence;
- NLU confidence;
- slot validation;
- business risk level;
- fallback count;
- user frustration signals;
- transaction boundary;
- audit requirements.

W LLM voicebotach potwierdzenia muszą być kontrolowane przez flow, nie pozostawione stylowi modelu. Model może sformułować tekst, ale decyzja "czy potwierdzać" powinna być deterministyczna.

## 3.9. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Naprawiaj najmniejszy możliwy fragment.
- Nie resetuj całego flow po błędzie jednego slotu.
- Potwierdzaj dane krytyczne.
- Nie potwierdzaj nadmiarowo danych niskiego ryzyka.
- Przy drugim błędzie zmień strategię.
- Przy trzecim błędzie rozważ handoff.
- Daj możliwość "popraw".
- Projektuj potwierdzenia pod TTS, szczególnie liczby i adresy.

## 3.10. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| "Proszę powtórzyć" bez wskazania problemu | Frustracja |
| Potwierdzanie wszystkiego | Długie rozmowy |
| Brak potwierdzenia anulowania | Ryzyko reklamacji |
| Reset flow po korekcie | Użytkownik traci cierpliwość |
| Brak walidacji slotu | Bot potwierdza złe dane |
| LLM improwizuje potwierdzenia | Brak audytu i niespójność |

## 3.11. Checklista repair i confirmation

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy każdy krytyczny slot ma strategię repair?
- Czy bot wskazuje, czego nie zrozumiał?
- Czy potwierdzamy dane wysokiego ryzyka?
- Czy nie potwierdzamy niepotrzebnie danych niskiego ryzyka?
- Czy korekta dotyczy pojedynczego slotu?
- Czy jest limit prób?
- Czy po wielu błędach jest handoff?
- Czy potwierdzenia są logowane?

## 3.12. Mini case study

Voicebot przyjmujący reklamację pytał o numer faktury. Gdy ASR nie rozpoznawał jednej cyfry, bot prosił o cały numer od nowa. Użytkownicy się irytowali. Po poprawie bot powtarzał numer grupami: "Mam FV 247, potem nie mam pewności, czy 8 czy 9. Proszę powtórzyć ostatnią cyfrę." Czas zbierania danych spadł.

## 3.13. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Zaprojektuj repair dla niepewnego adresu.
2. Wybierz strategie potwierdzenia dla pięciu typów danych.
3. Napisz komunikat po drugiej nieudanej próbie.
4. Zaprojektuj korektę jednego slotu bez resetu flow.

## 3.14. Podsumowanie

Naprawa rozmowy jest jednym z najważniejszych testów jakości voicebota. Dobry bot nie musi rozumieć wszystkiego od razu. Musi umieć naprawiać szybko, konkretnie i bez obwiniania użytkownika.

---

# Rozdział 4. Disambiguation, multi-intent handling, interruptions i zmiana tematu

## 4.1. Cele rozdziału

Czytelnik nauczy się:

- projektować doprecyzowanie przy niejednoznaczności;
- obsługiwać wypowiedzi z wieloma intencjami;
- reagować na zmianę tematu;
- projektować przerwania w kontekście aktywnego flow.

## 4.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Disambiguation | Doprecyzowanie, gdy system ma kilka możliwych interpretacji |
| Multi-intent | Wypowiedź z więcej niż jednym celem |
| Topic shift | Zmiana tematu rozmowy |
| Interruption | Przerwanie aktualnej tury lub flow |
| Context stack | Stos aktywnych tematów/procesów |
| Resume | Powrót do przerwanego procesu |

## 4.3. Wyjaśnienie eksperckie

Użytkownicy nie mówią według jednego flow. Mogą powiedzieć:

"Chcę zmienić adres, ale najpierw sprawdźcie, czy paczka już wyszła."

To są dwie intencje:

1. sprawdź status;
2. zmień adres.

Dobre multi-intent handling:

Bot: "Najpierw sprawdzę status. Jeśli paczka jeszcze nie wyszła, przejdziemy do adresu."

Źle:

Bot rozpoznaje tylko pierwszą intencję i ignoruje drugą.

Disambiguation powinno być krótkie i konkretne. Nie pytaj:

"Nie jestem pewien, o co chodzi."

Pytaj:

"Czy chce pan sprawdzić status przesyłki, czy zmienić adres?"

## 4.4. Typy niejednoznaczności

| Typ | Przykład | Reakcja |
|---|---|---|
| Podobne intencje | "problem z fakturą" | Zapytaj o korektę, płatność, duplikat albo reklamację |
| Niepełne dane | "w piątek" | Dopytaj, czy chodzi o termin wizyty czy dostawy |
| Wielu kandydatów | dwa zamówienia | Poproś o wybór: "z poniedziałku czy z wczoraj?" |
| Sprzeczne dane | "jutro w zeszły piątek" | Poproś o jedną datę |
| Zmiana tematu | "a faktura?" | Zapytaj, czy zapisać obecną sprawę i przejść do faktury |
| Przerwanie korekcyjne | "nie, inny adres" | Popraw slot i wróć do flow |

## 4.5. Perspektywa biznesowa

Multi-intent może zwiększyć skuteczność, ale też złożoność. Warto określić:

- które intencje można łączyć;
- które muszą być realizowane po kolei;
- które przerywają aktualny flow;
- które wymagają handoff;
- które są zabronione w danym stanie.

Przykład: w banku pytanie o saldo i zmiana limitu mogą być w jednej rozmowie, ale zmiana limitu wymaga weryfikacji i explicit confirmation. Nie należy wykonywać obu akcji jednym krokiem.

## 4.6. Perspektywa użytkownika

Użytkownik chce, aby bot rozumiał naturalne łączenie spraw, ale potrzebuje kontroli:

"Mogę najpierw sprawdzić status, a potem przejść do faktury. Zaczynam od statusu."

Taki komunikat informuje o planie i zmniejsza niepewność.

## 4.7. Perspektywa technologiczna

Potrzebne mechanizmy:

- ranking intencji;
- confidence per intent;
- reguły priorytetu;
- context stack;
- partial completion;
- resume after interruption;
- state preservation;
- disambiguation prompts;
- logging unresolved ambiguity.

W LLM voicebotach model może dobrze rozpoznać wiele intencji, ale flow nadal musi decydować o kolejności i bezpieczeństwie.

## 4.8. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Dopytuj wyborami binarnymi lub 2-3 opcjami.
- Nie wypisuj długiej listy możliwych interpretacji.
- Informuj, co zrobisz najpierw.
- Zachowuj stan przerwanego procesu.
- Nie wykonuj wielu akcji krytycznych bez osobnych potwierdzeń.
- Loguj zmiany tematu.
- Projektuj resume: "Wróćmy do zmiany adresu."

## 4.9. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Ignorowanie drugiej intencji | Użytkownik powtarza |
| Wykonywanie wielu akcji bez planu | Ryzyko błędów |
| Długie pytania doprecyzowujące | Obciążenie poznawcze |
| Brak context stack | Bot gubi poprzedni cel |
| Brak resume | Użytkownik musi zacząć od nowa |
| LLM decyduje o kolejności bez reguł | Nieprzewidywalność |

## 4.10. Checklista

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy system może wykryć więcej niż jedną intencję?
- Czy wiemy, które intencje mają priorytet?
- Czy mamy disambiguation dla podobnych intencji?
- Czy bot potrafi zapamiętać przerwany flow?
- Czy bot potrafi wrócić do poprzedniego flow?
- Czy akcje krytyczne mają osobne potwierdzenia?
- Czy zmiana tematu jest logowana?

## 4.11. Mini case study

Klient dzwoni do operatora: "Nie działa mi internet i chcę sprawdzić ostatnią fakturę." Pierwsza wersja bota obsługiwała tylko internet i ignorowała fakturę. Klienci po diagnozie musieli zaczynać od nowa. Druga wersja tworzyła context stack: najpierw awaria, potem faktura. Bot mówił: "Zajmę się najpierw internetem. Potem mogę sprawdzić fakturę." Completion dla drugiej sprawy wzrósł.

## 4.12. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Zaprojektuj disambiguation dla "problem z płatnością".
2. Napisz dialog multi-intent: status zamówienia i faktura.
3. Zaprojektuj resume po przerwaniu flow.
4. Określ priorytet intencji "konsultant".

## 4.13. Podsumowanie

Prawdziwi użytkownicy nie trzymają się idealnego scenariusza. Dobre dialogi potrafią doprecyzować, uporządkować kilka celów i wrócić do przerwanego procesu bez chaosu.

---

# Rozdział 5. Dialogi transakcyjne

## 5.1. Cele rozdziału

Czytelnik nauczy się:

- projektować dialogi, które wykonują akcję;
- odróżniać zbieranie danych od zatwierdzania transakcji;
- stosować walidacje, potwierdzenia i granice transakcji;
- minimalizować ryzyko błędów.

## 5.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Dialog transakcyjny | Rozmowa prowadząca do wykonania akcji w systemie |
| Transaction boundary | Moment formalnego zatwierdzenia akcji |
| Validation | Sprawdzenie poprawności danych |
| Authorization | Sprawdzenie, czy użytkownik może wykonać akcję |
| Confirmation | Potwierdzenie przed wykonaniem lub po wykonaniu |
| Rollback | Cofnięcie akcji, jeśli możliwe |

## 5.3. Wyjaśnienie eksperckie

Dialog transakcyjny ma wysoką stawkę, bo bot nie tylko informuje, ale zmienia stan systemu:

- rezerwuje termin;
- zmienia adres;
- anuluje zamówienie;
- tworzy reklamację;
- resetuje hasło;
- zmienia limit;
- tworzy ticket.

Minimalna struktura:

```text
1. Rozpoznaj intencje.
2. Zweryfikuj uprawnieńie.
3. Zbierz wymagane sloty.
4. Zweryfikuj dane.
5. Sprawdz reguły biznesowe.
6. Potwierdz akcje, jesli ryzyko tego wymaga.
7. Wykonaj akcje.
8. Potwierdz wynik.
9. Zapisz log/audyt.
10. Zakoncz lub zaproponuj kolejny krok.
```

## 5.4. Perspektywa biznesowa

Transakcje dają dużą wartość, bo realnie odciążają konsultantów. Jednocześnie wymagają:

- jasnych reguł;
- odpowiedzialności za błąd;
- audytu;
- bezpiecznej integracji;
- idempotency;
- potwierdzeń;
- procedury awarii.

## 5.5. Perspektywa użytkownika

Użytkownik powinien wiedzieć:

- co bot zamierza zrobić;
- czy akcja jest odwracalna;
- kiedy zostanie wykonana;
- jak dostanie potwierdzenie;
- co zrobić, jeśli wynik jest zły.

Przykład:

"Mogę anulować to zamówienie. Po anulowaniu nie będzie można go przywrócić. Czy mam anulować?"

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

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Oddziel intencje od wykonania akcji.
- Potwierdzaj akcje nieodwracalne.
- Dziel dane długie na mniejsze sloty.
- Nie wykonuj akcji na podstawie niepewnej transkrypcji.
- Używaj idempotency.
- Po wykonaniu wyślij potwierdzenie SMS/e-mail, jeśli potrzebne.
- Loguj kto, kiedy i co zatwierdził.

## 5.8. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Brak granicy transakcji | Nie wiadomo, czy akcja była tylko omawiana czy wykonana |
| Brak explicit confirmation | Błędne anulowania/zmiany |
| Brak idempotency | Duplikaty |
| Brak mapowania błędów API | Zły komunikat do użytkownika |
| Zbyt dużo danych naraz | Błędy ASR i frustracja |

## 5.9. Checklista dialogu transakcyjnego

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy użytkownik jest zweryfikowany?
- Czy bot ma uprawnienie do akcji?
- Czy wszystkie sloty są zebrane?
- Czy dane są walidowane?
- Czy akcja wymaga explicit confirmation?
- Czy wiadomo, kiedy akcja jest wykonana?
- Czy API jest idempotentne?
- Czy jest potwierdzenie po wykonaniu?
- Czy jest audyt?
- Czy jest fallback dla błędu API?

## 5.10. Dobry i zły dialog

### Zły

Bot: "Podaj nowy adres."  
Użytkownik: "Kwiatowa 8."  
Bot: "Adres zmieniony."

Problemy: brak pełnego adresu, brak walidacji, brak potwierdzenia, brak informacji o zamówieniu.

### Dobry

Bot: "Mogę zmienić adres dla zamówienia 12345, bo nie zostało jeszcze wysłane. Jaki ma być nowy adres?"  
Użytkownik: "Kwiatowa 8 mieszkania 12, Warszawa."  
Bot: "Mam Kwiatowa 8 mieszkania 12, Warszawa. Czy zmienić adres na ten?"  
Użytkownik: "Tak."  
Bot: "Gotowe. Adres został zmieniony. Potwierdzenie wysłałem SMS-em."

## 5.11. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Zaprojektuj dialog zmiany terminu wizyty.
2. Wskaż transaction boundary.
3. Dodaj explicit confirmation.
4. Dodaj błąd API i recovery.

## 5.12. Podsumowanie

Dialog transakcyjny wymaga dyscypliny. Nie wystarczy zrozumieć intencje. Trzeba zweryfikować, zebrać dane, potwierdzić ryzykowne akcje, wykonać je bezpiecznie i jasno poinformować o wyniku.

---

# Rozdział 6. Dialogi informacyjne, sprzedażowe, windykacyjne, medyczne/rezerwacyjne i ankietowe

## 6.1. Cele rozdziału

Czytelnik nauczy się:

- dopasowywać strukturę dialogu do typu sprawy;
- rozpoznawać specyficzne ryzyka branżowe;
- projektować komunikaty dla różnych emocji i regulacji;
- tworzyć wzorce dialogowe dla kilku klas use case'ow.

## 6.2. Dialogi informacyjne

Cel: udzielić odpowiedzi lub wskazać dalszy krok.

Dobre dla:

- statusów;
- FAQ;
- godzin otwarcia;
- informacji o procedurze;
- dokumentów wymaganych do sprawy.

Zasady:

- odpowiadaj krótko;
- nie czytaj całej procedury;
- zaproponuj sprawdzenie indywidualnej sprawy, jeśli możliwe;
- wyślij link, jeśli informacja jest długa;
- jasno mów, gdy bot nie może rozstrzygnąć indywidualnej decyzji.

Przykład:

Bot: "Zwrot zwykle trwa do 14 dni od przyjęcia paczki. Mogę też sprawdzić status konkretnego zwrotu. Czy mam to zrobić?"

## 6.3. Dialogi sprzedażowe

Cel: zakwalifikować potrzebę, udzielić informacji, umówić kontakt lub doprowadzić do bezpiecznej konwersji.

Ryzyka:

- presja;
- manipulacja;
- zbyt długie monologi;
- brak zgody na kontakt;
- obietnice poza zakresem;
- ignorowanie "nie".

Zasady:

- barge-in włączony;
- łatwa rezygnacja;
- jasne warunki;
- brak udawania człowieka;
- potwierdzenie zgody na kontakt;
- handoff dla złożonych potrzeb.

Zły dialog:

Bot: "Zanim pan zrezygnuje, proszę wysłuchać naszej wyjątkowej oferty..."

Dobry:

Bot: "Mogę sprawdzić, czy jest dostępna lepsza oferta. Czy chce pan, żebym to zrobił?"

## 6.4. Dialogi windykacyjne

Cel: poinformować o sprawie, zebrać deklaracje, wyjaśnić opcje lub przekazać do człowieka.

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

Przykład:

Bot: "Mogę podać dostępne opcje płatności albo połączyć z konsultantem, jeśli kwestionuje pan należność. Co wybiera pan teraz?"

## 6.5. Dialogi medyczne i rezerwacyjne

Cel: umówić, przełożyć, potwierdzić wizytę, zebrać administracyjne informacje.

Ryzyka:

- użytkownik może traktować bota jak doradcę medycznego;
- sytuacje pilne;
- dane wrażliwe;
- osoby starsze;
- stres.

Zasady:

- nie diagnozuj;
- nie udzielaj porad medycznych poza zatwierdzonym zakresem;
- eskaluj pilne objawy zgodnie z procedurą;
- potwierdzaj termin i lokalizację;
- wysyłaj SMS z potwierdzeniem;
- dawaj wolniejsze tempo i proste pytania.

Przykład:

Bot: "Mogę pomóc umówić lub przełożyć wizytę. Jeśli to nagła sytuacja zdrowotna, proszę zadzwonić pod numer alarmowy albo skontaktować się z dyżurną pomocą medyczną."

## 6.6. Dialogi ankietowe

Cel: zebrać odpowiedzi po kontakcie, zakupie, wizycie lub usłudze.

Ryzyka:

- zbyt długa ankieta;
- brak zgody;
- skale trudne do zapamiętania;
- użytkownik nie wie, ile pytań zostało;
- niska jakość danych.

Zasady:

- informuj o liczbie pytań;
- używaj prostych skal;
- jedno pytanie naraz;
- pozwól przerwać;
- nie przeciągaj;
- nie łącz ankiety z nachalną sprzedażą.

Przykład:

Bot: "Mam trzy krótkie pytania po wizycie. Pierwsze: w skali od 1 do 5, jak ocenia pani łatwość umówienia terminu?"

## 6.7. Tabela porownawcza typów dialogów

| Typ dialogu | Priorytet | Główne ryzyko | Kluczowa praktyka |
|---|---|---|---|
| Informacyjny | Zrozumiałość | Zbyt długa odpowiedź | Krótko + SMS/link |
| Transakcyjny | Poprawność akcji | Błędna zmiana | Walidacja + potwierdzenie |
| Sprzedażowy | Zgoda i kontrola | Presja | Łatwe "nie" |
| Windykacyjny | Neutralność i compliance | Frustracja/spór | Szybki handoff |
| Medyczny/rezerwacyjny | Bezpieczeństwo | Porada poza zakresem | Jasne granice |
| Ankietowy | Jakość danych | Zmęczenie | Krótka ankieta |

## 6.8. Checklista branżowa

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy typ dialogu ma zdefiniowany cel?
- Czy znamy emocjonalny kontekst?
- Czy znamy ryzyka prawne?
- Czy bot ma granice odpowiedzi?
- Czy handoff jest zaprojektowany?
- Czy komunikaty są krótsze niż w kanale tekstowym?
- Czy akcje krytyczne są potwierdzane?
- Czy bot może bezpiecznie odmówić odpowiedzi?

## 6.9. Mini case study

Firma medyczna chciała dodać do bota rezerwacyjnego odpowiedzi na pytania o objawy. Zespół ograniczył zakres: bot może umawiać wizyty, przekładać terminy i informować o przygotowaniu do badania na podstawie zatwierdzonych instrukcji. Nie interpretuje objawów. Dla fraz typu "silny ból w klatce" uruchamia komunikat awaryjny i eskalację zgodnie z procedurą. Zakres jest mniej efektowny, ale bezpieczny.

## 6.10. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Napisz dialog informacyjny o zwrocie.
2. Napisz dialog sprzedażowy bez presji.
3. Zaprojektuj windykacyjny handoff przy sporze.
4. Zaprojektuj trzy pytania ankietowe w kanale głosowym.

## 6.11. Podsumowanie

Nie istnieje jeden styl dialogu dla wszystkich procesów. Dialog informacyjny, transakcyjny, sprzedażowy, windykacyjny, medyczny i ankietowy mają inne ryzyka, emocje i reguły. Voicebot Specialist musi projektować pod kontekst, nie pod uniwersalny skrypt.

---

# Rozdział 7. Kompletny przykład scenariusza: zmiana terminu dostawy

## 7.1. Cele rozdziału

Czytelnik zobaczy, jak połączyć intencje, sloty, flow, potwierdzenia, fallbacki, przerwania, integracje i metryki w jednym scenariuszu.

## 7.2. Specyfikacja wysokiego poziomu

```text
Flow: zmiana_terminu_dostawy
Cel użytkownika: przelozyc dostawe zamowienia
Cel biznesowy: automatycznie obsluzyc proste zmiany terminu przed wysylka
Zakres: zamowienia niewyslane, klient zweryfikowany, dostepne terminy w API
Poza zakresem: zamowienia wyslane, reklamacje, zmiana produktu, sporne statusy
Integracje: order API, delivery slots API, SMS confirmation
Handoff: zamowienie wyslane, API error, frustracja, prosba o konsultanta
```

## 7.3. Intencje

| Intencja | Definicja |
|---|---|
| `zmień_termin_dostawy` | Użytkownik chce przełożyć dostawę |
| `sprawdz_status_zamowienia` | Użytkownik chce wiedzieć, gdzie jest zamówienie |
| `popraw_dane` | Użytkownik poprawia datę, numer, adres |
| `popros_o_konsultanta` | Użytkownik chce człowieka |
| `anuluj` | Użytkownik rezygnuje z procesu |

## 7.4. Sloty

| Slot | Wymagany | Walidacja | Potwierdzenie |
|---|---|---|---|
| `customer_id` | Tak | Weryfikacja po telefonie/innym czynniku | Nie wypowiadać pełnych danych |
| `order_id` | Tak | Order API | Implicit |
| `desired_date` | Tak | Delivery slots API | Explicit przy zapisie |
| `desired_time_window` | Opcjonalny | Dostępność | Explicit przy zapisie |

## 7.5. Happy path

```text
Bot: Dzień dobry, jestem automatycznym asystentem firmy X. W czym moge pomoc przy zamowieniu?
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

### Zamówienie wysłane

Bot: "To zamówienie jest już u kuriera, dlatego nie mogę zmienić terminu w systemie. Mogę podać kontakt do kuriera albo połączyć z konsultantem."

### Brak dostępnego terminu

Bot: "W piątek nie ma już wolnych okien dostawy. Najbliższe terminy to sobota 10-12 albo poniedziałek 14-16. Który wybiera pan?"

### API timeout

Bot: "Nie mogę teraz sprawdzić dostępnych terminów. Mogę utworzyć zgłoszenie dla konsultanta albo wysłać link do samodzielnej zmiany."

### Korekta

User: "Nie, chodziło mi o sobotę."  
Bot: "Dobrze, sprawdzam sobotę."

### Konsultant

User: "Połącz z człowiekiem."  
Bot: "Jasne. Połączę z konsultantem i przekażę, że chodzi o zmianę terminu dostawy zamówienia 12345."

## 7.7. Fallbacki

Pierwszy no-match przy dacie:

"Nie mam pewności, jaki dzień pan wybrał. Proszę powiedzieć na przykład: piątek albo poniedziałek."

Drugi no-match:

"Żeby nie przedłużać, mogę połączyć z konsultantem albo wysłać link do zmiany terminu SMS-em."

No-input:

"Proszę powiedzieć, na jaki dzień chce pan przełożyć dostawę."

## 7.8. Polityka barge-in

| Prompt | Barge-in | Uzasadnienie |
|---|---|---|
| Powitanie | Tak | Użytkownik może od razu powiedzieć cel |
| Odczyt dostępnych terminów | Tak | Użytkownik może wybrać przed końcem |
| Potwierdzenie finalne | Tak, ale wymaga jasnego "tak/nie" | Użytkownik może poprawić datę |
| Komunikat po wykonaniu | Tak | Użytkownik może zapytać o coś jeszcze |

## 7.9. Metryki

- task completion rate;
- fallback rate przy dacie;
- no-input rate;
- API timeout rate;
- correction rate;
- barge-in recovery success;
- handoff rate;
- repeat contact w ciągu 48h;
- CSAT po zmianie terminu.

## 7.10. QA cases

- happy path;
- data niedostępna;
- zamówienie wysłane;
- wiele zamówień;
- korekta daty;
- przerwanie podczas listy terminów;
- brak inputu;
- no-match;
- prośba o konsultanta;
- API timeout;
- użytkownik sfrustrowany.

## 7.11. Podsumowanie

Kompletny scenariusz łączy treść rozmowy z logiką biznesową, integracjami, barge-in, fallbackami, handoff i metrykami. Dopiero taki dokument jest gotowy do wdrożenia.

---

# 8. Zbiorcza checklista po Części V

Ta checklista zbiera najważniejsze pytania po całej części. Najlepiej przejść ją po zakończeniu projektu rozdziałów i zaznaczyć miejsca, które wymagają decyzji, doprecyzowania albo testów.

- Czy intencje opisują cele użytkownika?
- Czy każda intencja ma zakres i poza zakresem?
- Czy sloty są powiązane z realnym procesem?
- Czy kontekst zmienia interpretację krótkich odpowiedzi?
- Czy flow zawiera happy path i unhappy paths?
- Czy każdy stan ma wyjście?
- Czy fallbacki są specyficzne dla kroku?
- Czy eskalacja jest zaprojektowana od początku?
- Czy repair naprawia najmniejszy możliwy fragment?
- Czy potwierdzenia są dobrane do ryzyka?
- Czy system obsługuje multi-intent i zmianę tematu?
- Czy przerwania nie resetują całego flow?
- Czy dialog transakcyjny ma transaction boundary?
- Czy scenariusz zawiera metryki i QA cases?

---

# 9. Co będzie w kolejnej części

Kolejna część powinna opracować **Część VI. Dane, trening i jakość rozumienia**:

1. Zbieranie danych i transkrypcje.
2. Dane treningowe, frazy użytkowników, klasy intencji i encje.
3. Słowniki, synonimy, dane syntetyczne i balans danych.
4. Błędy etykietowania.
5. Jakość ASR: akcenty, hałas, tempo, osoby starsze, wady wymowy.
6. Testowanie NLU: confusion matrix, precision, recall, F1.
7. Continuous training i analiza nierozpoznanych wypowiedzi.

