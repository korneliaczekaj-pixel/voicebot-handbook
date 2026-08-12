# Rozdział 19. Psychologia rozmowy z voicebotem

Rozmowa głosowa jest doświadczeniem sekwencyjnym, społecznym i często emocjonalnym. Użytkownik nie tylko przetwarza treść komunikatów voicebota. Na podstawie tempa, pauz, intonacji, kolejności pytań i reakcji na błędy ocenia kompetencję systemu, własną kontrolę nad rozmową oraz ryzyko dalszego działania. Te oceny wpływają na zaufanie, gotowość do podania danych, cierpliwość i decyzję o kontynuowaniu automatycznej obsługi.

---

## 19.1. Psychologia rozmowy głosowej

Głos jest bardziej bezpośredni niż tekst. Tempo, pauza, intonacja i dobór słów są interpretowane jako sygnały kompetencji, uwagi, uprzejmości lub ignorowania. Voicebot, który odpowiada zbyt wolno, może brzmieć jak uszkodzony. Voicebot, który odpowiada zbyt szybko po złożonej wypowiedzi, może brzmieć jak niesłuchający.

### 19.1.1. Zasady

- Projektuj tempo do sytuacji.
- Nie twórz długich monologów.
- Używaj pauz przy danych.
- Nie udawaj ludzkiej empatii.
- Kompetencja jest ważniejsza niż "ciepły charakter".

---

## 19.2. Modele mentalne użytkownika

Użytkownik może myśleć, że rozmawia z:

- IVR;
- konsultantem;
- chatbotem głosowym;
- asystentem AI;
- filtrem przed konsultantem.

Mental model mismatch powstaje, gdy system obiecuje więcej, niż robi. Jeśli bot brzmi jak człowiek, ale nie rozumie korekty, frustracja rośnie.

### 19.2.1. Dobre komunikowanie możliwości

"Pomoge sprawdzić status, zmienić termin albo połączyć z konsultantem."

To zmniejsza niepewność i ustawia granice.

---

## 19.3. Zaufanie, kontrola i poczucie bezpieczeństwa

Zaufanie do voicebota ma dwa wymiary. Pierwszy to kompetencja: czy system rozumie sprawę, odpowiada trafnie i prowadzi do wyniku. Drugi to integralność: czy system jest uczciwy, przewidywalny i nie ukrywa ograniczeń. Naturalny głos może poprawić pierwsze wrażenie, ale nie zastąpi kompetencji. Jeśli bot brzmi bardzo ludzko, a potem nie rozumie prostej korekty, spadek zaufania jest silniejszy niż przy skromniejszym, ale jasnym systemie.

W praktyce voicebot powinien budować zaufanie przez działanie: szybko rozpoznać temat, jasno powiedzieć, co potrafi, potwierdzić dane krytyczne i bez oporu przekazać rozmowę człowiekowi. To jest bardziej wiarygodne niż rozbudowana persona albo zbyt ciepłe deklaracje.

Zaufanie budują:

- transparentność;
- szybka reakcja;
- potwierdzenia danych krytycznych;
- możliwość poprawy;
- łatwy handoff;
- brak przesadnej pewności;
- konsekwentny ton.

Zaufanie niszczą:

- ignorowanie przerwań;
- pętle fallbacków;
- brak konsultanta;
- udawanie człowieka;
- halucynacje;
- zbyt długie komunikaty;
- powtarzanie pytań.

Przykład skalibrowanego zaufania:

"Mogę sprawdzić status przesyłki i zmienić termin dostawy. Nie podejmę decyzji reklamacyjnej automatycznie; w takiej sprawie połączę z konsultantem."

Taki komunikat nie osłabia bota. Przeciwnie, ustawia uczciwe granice i zmniejsza ryzyko rozczarowania.

---

## 19.4. Obciążenie poznawcze

W głosie użytkownik nie widzi listy opcji. Musi ją utrzymać w pamięci. Dlatego:

- maksymalnie 2-3 opcje;
- jedno pytanie naraz;
- krótkie zdania;
- informacje porcjowane;
- liczby w grupach;
- SMS/e-mail dla długich informacji.

Przykład:

Źle: "Może pan wybrać zmianę adresu, terminu, anulowanie, zwrot, fakturę, reklamację albo konsultanta."  
Lepiej: "W czym mogę pomóc przy zamówieniu?"

---

## 19.5. Emocje użytkownika

Typowe emocje:

- pośpiech;
- irytacja;
- niepewność;
- wstyd;
- lęk;
- bezradność;
- złość.

Bot powinien reagować przez działanie, nie przez teatralną empatię.

Źle: "Doskonale rozumiem pana frustrację."  
Lepiej: "Skrócę rozmowę. Połączę z konsultantem i przekażę, co już pan podał."

---

## 19.6. Psychologia błędu i naprawy rozmowy

Najbardziej frustrujące nie jest pojedyncze niezrozumienie, ale brak postępu. Powtarzanie tego samego pytania zwiększa poczucie porażki użytkownika.

### 19.6.1. Zasady repair

- Nie obwiniaj.
- Powiedz, czego brakuje.
- Napraw najmniejszy fragment.
- Zmień strategię po drugim błędzie.
- Daj alternatywę.

Przykład:

"Nie mam pewności, czy ostatnia cyfra to osiem czy dziewięć. Proszę powtórzyć tylko ostatnią cyfrę."

---

## 19.7. Perswazja, decyzje i wpływ społeczny

Voicebot sprzedażowy, windykacyjny lub ankietowy może wywierać presję. Etyczna perswazja:

- informuje;
- pyta o zgodę;
- daje łatwe "nie";
- nie ukrywa opcji;
- nie manipuluje strachem;
- nie udaje autorytetu człowieka.

Ryzykowne efekty:

- efekt autorytetu;
- domyslna opcja;
- efekt pilności;
- efekt straty;
- presja sekwencyjna.

---

## 19.8. Antropomorfizacja voicebota

Ludzie przypisują głosom intencje i emocje. Antropomorfizacja może pomagać w płynnej interakcji, ale szkodzi, gdy bot udaje człowieka, obiecuje zrozumienie lub tworzy fałszywą empatię.

Najbezpieczniejsza zasada brzmi: bot może mieć styl, ale nie powinien mieć fikcyjnego życia. Może być spokojny, uprzejmy i konsekwentny. Nie musi mówić, że "cieszy się", "martwi" albo "doskonale rozumie", jeżeli za tym nie idzie realna zdolność pomocy. W obsłudze klienta nadmierna ludzkość często podnosi oczekiwania wobec systemu. Użytkownik zaczyna zakładać, że bot rozumie kontekst tak jak konsultant, a potem szybciej się irytuje.

### 19.8.1. Dobre zasady

- Persona jako rola, nie fikcyjny człowiek.
- Transparentność.
- Brak udawania uczuć.
- Kompetencja zamiast "osobowości".

### 19.8.2. Backchannel i sygnały słuchania

Backchannel to krótki sygnał, że rozmówca słucha, np. "mhm", "rozumiem", "dobrze". W voicebotach LLM backchannel może zwiększać naturalność rozmowy, ale trzeba używać go ostrożnie. Jeśli bot mówi "rozumiem" po każdej wypowiedzi, zaczyna brzmieć mechanicznie. Jeśli używa backchannelu w chwili, gdy użytkownik nadal mówi, może wejść w słowo.

Dobre użycie:

- przy dłuższym podawaniu danych;
- gdy użytkownik robi pauzę, ale nie zakończył myśli;
- gdy bot potrzebuje chwili na sprawdzenie informacji;
- w rozmowach opiekuńczych lub senioralnych, gdzie ważne jest poczucie bycia wysłuchanym.

Ryzykowne użycie:

- w procesach transakcyjnych wysokiego ryzyka;
- podczas odczytywania numerów, dat i kwot;
- jako zamiennik realnego zrozumienia;
- zbyt często, bez związku z treścią wypowiedzi.

---

## 19.9. Psychologia języka

Dobry język voicebota:

- prosty;
- konkretny;
- uprzejmy;
- bez żargonu;
- bez długich zdań;
- z najważniejszą informacją na początku;
- z pozytywnym, ale nie manipulacyjnym ramowaniem.

Źle: "Niestety niepoprawnie podano dane."  
Lepiej: "Nie mam pewności, czy dobrze usłyszałem. Proszę podać numer jeszcze raz, po trzy cyfry."

---

## 19.10. Różnice indywidualne użytkowników

### 19.10.1. Osoby starsze

- wolniejsze tempo;
- więcej czasu na odpowiedź;
- proste słowa;
- opcja konsultanta.

### 19.10.2. Osoby neuroatypowe

- przewidywalna struktura;
- brak presji;
- jednoznaczne pytania;
- brak ironii.

### 19.10.3. Osoby z wadami mowy/słuchu

- DTMF;
- SMS;
- powtórzenie;
- handoff.

### 19.10.4. Osoby nieufne wobec automatyzacji

- transparentność;
- szybki zakres;
- konsultant bez walki.

---

## 19.11. Psychologia zaufania do AI

Calibrated trust oznacza, że użytkownik ufa botowi w tym, co bot realnie potrafi. Voicebot powinien unikać dwóch skrajności:

- nadmiernej pewności;
- zbyt częstego bezradnego fallbacku.

### 19.11.1. Jak mówić "nie wiem"

"Nie mam wystarczających danych, żeby to ocenić. Mogę sprawdzić status sprawy albo połączyć z konsultantem."

---

## 19.12. Psychologiczne metryki jakości rozmowy

| Metryka | Znaczenie |
|---|---|
| Frustration signal rate | Sygnały irytacji |
| Perceived control | Poczucie kontroli |
| Customer effort | Wysiłek użytkownika |
| Repeat rate | Powtarzanie informacji |
| Interruption rate | Przerywanie bota |
| Emotional escalation | Wzrost napięcia |
| Trust score | Ocena zaufania |
| Helpful resolution | Subiektywna pomocność |

---

## 19.13. Praktyczne narzędzia psychologiczne

### 19.13.1. Checklista redukcji frustracji

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy bot pyta jednoznacznie?
- Czy nie powtarza tego samego?
- Czy pozwala poprawić?
- Czy pozwala przerwać?
- Czy daje człowieka?
- Czy nie obwinia użytkownika?

### 19.13.2. Matryca emocji i reakcji

| Emocja | Sygnał | Reakcja bota |
|---|---|---|
| Pośpiech | "szybko" | Skróć i przejdź do celu |
| Irytacja | "już mówiłem" | Nie powtarzaj, uznaj i napraw |
| Lęk | pytania o konsekwencje | Wyjaśnij spokojnie, bez przesady |
| Złość | agresja | Skróć i eskaluj |
| Niepewność | cisza, "nie wiem" | Podaj przykład lub alternatywę |

### 19.13.3. Zdania, których bot powinien unikać

- "Doskonale rozumiem, co pan czuje."
- "To bardzo proste."
- "Musi pan..."
- "Niepoprawna odpowiedź."
- "Proszę słuchać uważnie."
- "Nie ma potrzeby rozmowy z konsultantem."

---

## 19.14. Mini case studies psychologiczne

### 19.14.1. Użytkownik nie ufa botowi

Błąd: bot udaje człowieka.  
Poprawa: transparentność i zakres.  
Dialog:

Bot: "Jestem automatycznym asystentem. Mogę sprawdzić status albo połączyć z konsultantem."

### 19.14.2. Użytkownik zdenerwowany reklamacją

Błąd: bot pyta po raz trzeci o numer.  
Poprawa: wykorzystuje dane i eskaluje.

Bot: "Mam już numer, ale system nie znajduje sprawy. Połączę z konsultantem i przekażę ten numer."

### 19.14.3. Użytkownik starszy

Błąd: szybkie listy opcji.  
Poprawa: wolniejsze tempo, jedno pytanie.

Bot: "W czym pomóc: wizyta czy recepta?"

### 19.14.4. Użytkownik wymusza człowieka

Błąd: bot próbuje zatrzymać.  
Poprawa: handoff.

Bot: "Jasne. Połączę z konsultantem."

### 19.14.5. Użytkownik z problemem wrażliwym

Błąd: bot próbuje doradzać.  
Poprawa: granica i bezpieczny kanał.

Bot: "Nie mogę ocenić tej sytuacji automatycznie. Połączę z osobą, która może pomóc."

---

## 19.15. Zbiorcza checklista po Części XVIII

- Czy bot buduje calibrated trust?
- Czy zmniejsza cognitive load?
- Czy daje poczucie kontroli?
- Czy naprawia błędy bez obwiniania?
- Czy reaguje na frustrację?
- Czy unika fałszywej empatii?
- Czy nie manipuluje?
- Czy projekt uwzględnia różnice indywidualne?
- Czy sytuacje wrażliwe są eskalowane?

---
