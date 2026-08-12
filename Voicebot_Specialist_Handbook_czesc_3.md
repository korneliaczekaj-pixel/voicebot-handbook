# Rozdział 3. Architektura voicebota

## 3.1. Architektura wysokiego poziomu: od głosu użytkownika do akcji systemu

### 3.1.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja praktyczna |
|---|---|
| Pipeline voicebota | Sekwencja komponentów przetwarzających rozmowę od audio do odpowiedzi |
| Audio stream | Strumień dźwięku przesyłany w czasie rzeczywistym |
| ASR/STT | Automatic Speech Recognition / Speech-to-Text, zamiana mowy na tekst |
| NLU | Natural Language Understanding, interpretacja intencji i encji |
| Dialog manager | Komponent zarządzający stanem rozmowy i kolejnymi krokami |
| Business logic | Reguły procesu, decyzje, walidacje, obsługa wyjątków |
| Backend integration | Połączenie z CRM, ERP, ticketingiem, kalendarzem, płatnościami itd. |
| TTS | Text-to-Speech, zamiana tekstu na mowę |
| Observability | Logi, metryki, tracing, transkrypcje, monitoring jakości i kosztów |
| Human handoff | Przekazanie rozmowy do konsultanta wraz z kontekstem |

### 3.1.2. Wyjaśnienie eksperckie

Najprostszy przepływ voicebota wygląda tak:

```text
Uzytkownik mowi
  -> telefonia / kanał audio
  -> streaming audio
  -> VAD / endpointing / turn detection
  -> ASR
  -> NLU lub LLM
  -> dialog manager
  -> logika biznesowa
  -> integracje
  -> odpowiedz tekstowa
  -> TTS
  -> audio do użytkownika
  -> logi, metryki, transkrypcje, monitoring
```

W praktyce ten przepływ nie jest liniowy jak fabryczna taśma. Dzieje się wiele procesów równolegle:

- system słucha, gdy użytkownik mówi;
- system może generować odpowiedź, zanim ma finalną transkrypcję, jeśli architektura wspiera preemptive generation;
- system może odtwarzać TTS i jednocześnie nasłuchiwać barge-in;
- system może wywoływać API, a w tym czasie odtwarzać komunikat wypełniający ciszę;
- monitoring zbiera dane w tle;
- dialog manager aktualizuje stan rozmowy po każdym kroku.

Uwaga praktyczna:

Voicebot jest tak dobry, jak jego najsłabsza warstwa. Świetny LLM nie naprawi złej telefonii, a dobry ASR nie naprawi scenariusza, który pyta o trzy rzeczy naraz.

### 3.1.3. Perspektywa biznesowa

Architektura decyduje o:

- czasie reakcji;
- koszcie rozmowy;
- możliwości skalowania;
- jakości rozumienia;
- poziomie kontroli nad odpowiedziami;
- łatwości integracji;
- ryzyku compliance;
- łatwości późniejszej optymalizacji.

Dla biznesu architektura nie jest "tematem IT". To wybór modelu operacyjnego. Inna architektura pasuje do prostego statusu zamówienia, inna do voicebota medycznego, inna do generatywnego helpdesku IT.

### 3.1.4. Perspektywa użytkownika

Użytkownik nie widzi architektury, ale czuje jej konsekwencje:

- czy bot odpowiada szybko;
- czy ucina wypowiedzi;
- czy pozwala przerwać;
- czy poprawnie czyta nazwiska, daty, numery i kwoty;
- czy pamięta kontekst;
- czy sprawa zostaje wykonana, a nie tylko omówiona;
- czy konsultant po przekazaniu wie, co się działo.

### 3.1.5. Perspektywa technologiczna

Każdy komponent ma wejścia, wyjścia i ryzyka:

| Komponent | Wejście | Wyjście | Typowe ryzyka |
|---|---|---|---|
| Telefonia | Połączenie głosowe | Strumień audio | Kodeki, jitter, echo, opóźnienia |
| VAD | Audio | Informacja: mowa/brak mowy | Szum jako mowa, cicha mowa jako cisza |
| Endpointing | Audio/ASR partials | Decyzja: koniec tury | Ucinanie lub martwa cisza |
| ASR | Audio | Transkrypcja | Akcent, hałas, nazwy własne, cyfry |
| NLU | Tekst | Intencja, encje | Błędna klasyfikacja, brak danych |
| LLM | Tekst/kontekst | Odpowiedź/decyzja/narzędzie | Halucynacje, latency, koszt |
| Dialog manager | Stan + interpretacja | Następny krok | Utrata kontekstu, zły fallback |
| Integracje | Zapytania API | Dane/akcje | Timeouty, błędy, brak spójności |
| TTS | Tekst | Audio | Zła wymowa, tempo, nienaturalność |
| Monitoring | Zdarzenia/logi | Metryki/alerty | Brak danych do diagnostyki |

### 3.1.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Rysuj architekturę jako przepływ audio, tekstu, decyzji i danych.
- Oznacz miejsca, gdzie powstaje latency.
- Oznacz miejsca, gdzie trzeba logować decyzję.
- Oddziel stan rozmowy od tekstu generowanej odpowiedzi.
- Projektuj fallback dla każdego komponentu krytycznego.
- Wymagaj testów end-to-end przez prawdziwy kanał.
- Nie oceniaj voicebota tylko na podstawie demo w przeglądarce.

### 3.1.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Brak diagramu architektury | Interesariusze nie rozumieją zależności i kosztów |
| Traktowanie voicebota jako jednego komponentu | Trudna diagnostyka |
| Brak logowania ASR partials i decyzji dialogowych | Nie wiadomo, czemu bot źle odpowiedział |
| Brak planu timeoutów integracji | Cisza lub przypadkowe fallbacki |
| Brak osobnej polityki handoff | Konsultant dostaje klienta bez kontekstu |

### 3.1.8. Checklista architektury wysokiego poziomu

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy mamy rozrysowany przepływ audio?
- Czy wiemy, gdzie kończy się telefonia, a zaczyna voice platform?
- Czy znamy ASR, NLU/LLM i TTS?
- Czy dialog manager przechowuje stan rozmowy?
- Czy integracje mają retry, timeout i fallback?
- Czy TTS można przerwać?
- Czy system loguje transkrypcje, intencje, encje, zdarzenia, metryki?
- Czy handoff przekazuje kontekst do konsultanta?
- Czy mamy plan awarii dla komponentów krytycznych?

### 3.1.9. Mini case study

Firma kurierska wdraża voicebota do statusu przesyłek. Pierwsza architektura ma ASR, NLU i odpowiedzi TTS, ale brak integracji z systemem śledzenia. Bot rozpoznaje intencję "status paczki", ale i tak odsyła do strony internetowej. Po zmianie architektury dodano identyfikację po numerze telefonu, integrację tracking API, potwierdzenie przesyłki i handoff dla statusów spornych. Dopiero wtedy bot zaczął realnie rozwiązywać sprawę.

### 3.1.10. Podsumowanie

Architektura voicebota to łańcuch decyzji o dźwięku, języku, dialogu, danych i operacjach. Specjalista nie musi być inżynierem każdego komponentu, ale musi rozumieć zależności, bo to one decydują o jakości rozmowy.

---

## 3.2. Kanał telefoniczny, SIP, VoIP, contact center i telephony gateway

### 3.2.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja praktyczna |
|---|---|
| PSTN | Klasyczna publiczna sieć telefoniczna |
| VoIP | Przesyłanie głosu przez sieć IP |
| SIP | Protokół inicjowania, modyfikowania i kończenia sesji komunikacyjnych |
| RTP | Protokół transportu mediów, np. audio w czasie rzeczywistym |
| Telephony gateway | Warstwa łącząca telefonię z aplikacją voicebota |
| Contact center platform | System obsługi kolejek, konsultantów, routingów, nagrań i raportów |
| DTMF | Tonowe sygnały klawiatury telefonu |
| Call transfer | Przekazanie rozmowy do innej kolejki lub konsultanta |
| ANI/CLI | Numer dzwoniącego, jeśli dostępny |

### 3.2.2. Wyjaśnienie eksperckie

Voicebot telefoniczny nie zaczyna się w modelu AI. Zaczyna się od połączenia. Użytkownik dzwoni, sieć telefoniczna zestawia rozmowę, contact center albo gateway odbiera połączenie, a audio jest przekazywane do systemu voicebota.

Typowy przepływ:

```text
Telefon użytkownika
  -> operator / PSTN / VoIP
  -> SIP trunk lub platforma contact center
  -> telephony gateway
  -> voicebot runtime
  -> ASR / dialog / TTS
  -> powrot audio do użytkownika
```

SIP jest często warstwą sygnalizacyjną: kto dzwoni, dokąd, kiedy odebrano, kiedy rozłączono, jak przekazać rozmowę. Audio najczęściej płynie osobnym strumieniem mediów. Dla Voicebot Specialist najważniejsze nie jest recytowanie szczegółów protokołów, ale rozumienie konsekwencji:

- telefonia dodaje opóźnienia;
- kodeki mogą ograniczac jakość audio;
- przekazanie do konsultanta wymaga zachowania kontekstu;
- nagrania i transkrypcje podlegaja zasadom prawnym;
- DTMF może być potrzebne dla kodów, wyborów i awaryjnej obsługi;
- caller ID może pomóc w identyfikacji, ale nie może być jedyna weryfikacja w procesach wrażliwych.

### 3.2.3. Perspektywa biznesowa

Telefonia decyduje o możliwości wdrożenia w realnym contact center:

- Czy voicebot może odbierac część ruchu?
- Czy może oddać rozmowę do odpowiedniej kolejki?
- Czy konsultant zobaczy transkrypcje i podsumowanie?
- Czy da się mierzyć kolejki, transfery i abandoned calls?
- Czy system działa w godzinach szczytu?
- Czy koszt minut audio jest przewidywalny?

Dla biznesu ważne jest też, czy voicebot będzie warstwa przed contact center, elementem platformy contact center, czy osobna usługa połączona przez SIP/API.

### 3.2.4. Perspektywa użytkownika

Użytkownik odczuwa telefonię jako:

- jakość dźwięku;
- opóźnienie;
- martwa ciszę;
- łatwość lub trudnosc przekazania do konsultanta;
- konieczność powtarzania danych po transferze;
- przerwanie rozmowy przy blednym przekazaniu.

Najgorszy handoff to taki, w którym użytkownik po pieciu minutach rozmowy z botem słyszy od konsultanta: "W czym mogę pomóc?". To sygnał, że architektura nie przekazala kontekstu.

### 3.2.5. Perspektywa technologiczna

Wymagania techniczne dla telefonii:

- obsługa inbound i/lub outbound;
- SIP trunk lub natywna integracja contact center;
- streaming audio do ASR/voice runtime;
- obsługa DTMF;
- transfer blind/attended, zalezne od platformy;
- przekazywanie metadanych rozmowy;
- nagrywanie i/lub eksport audio;
- synchronizacja transkrypcji z audio;
- monitoring jakości połączenia;
- mechanizmy awaryjne.

### 3.2.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Testuj voicebota przez ten sam kanał, który będzie na produkcji.
- Nie oceniaj ASR na podstawie studyjnych nagrań, jeśli produkcja to telefon.
- Zachowaj DTMF jako alternatywe w krytycznych danych.
- Projektuj handoff jako przepływ danych, nie tylko transfer audio.
- Ustal, kto jest właścicielem nagrań: platforma contact center, voicebot czy klient.
- Uzgodnij retencję i dostepy do nagrań oraz transkrypcji.

### 3.2.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Testowanie tylko w aplikacji webowej | Produkcyjna telefonia zachowuje się inaczej |
| Brak DTMF fallback | Problemy z numerami, kodami i halasem |
| Brak przekazania kontekstu do konsultanta | Powtarzanie danych i frustracja |
| Nieuzgodnione nagrywanie | Ryzyko prawne |
| Brak monitoringu jakości połączenia | Trudno odróżnić błąd bota od złego audio |

### 3.2.8. Checklista telefonii

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy znamy kanał: PSTN, VoIP, WebRTC, SIP?
- Czy znamy kodeki i jakość audio?
- Czy voicebot będzie przed contact center czy w środku platformy?
- Czy transfer do konsultanta jest technicznie wspierany?
- Czy przekazujemy kontekst rozmowy?
- Czy obslugujemy DTMF?
- Czy nagrywamy rozmowy?
- Czy informujemy o nagrywaniu i automatyzacji?
- Czy testujemy outbound, jeśli dotyczy?
- Czy mamy plan awarii, gdy voicebot nie odpowiada?

### 3.2.9. Mini case study

Przychodnia wdraza voicebota do potwierdzania wizyt outbound. Technicznie bot działa dobrze w testach webowych, ale w telefonii część pacjentow odpowiada bardzo krótko: "tak", "nie", "przelozyc". ASR w slabej jakości połączenia myli "nie" z szumem. Zespół dodaje DTMF jako alternatywe: "Może pani powiedzieć tak lub nacisnac 1". Completion rate rośnie, bo architektura uwzględnia realny kanał.

### 3.2.10. Podsumowanie

Telefonia nie jest dodatkiem do voicebota. Jest jego srodowiskiem pracy. Jakość połączenia, transfery, DTMF, nagrania i kontekst handoff bezpośrednio wpływają na to, czy automatyzacja będzie działać w prawdziwym contact center.

---

## 3.3. Streaming audio, latency i czas rzeczywisty

### 3.3.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja praktyczna |
|---|---|
| Streaming audio | Przesylanie dźwięku na biezaco, w malych fragmentach |
| Frame | Krótki blok audio, np. kilkanascie lub kilkadziesiat ms |
| Latency | Opóźnienie od zdarzenia do reakcji systemu |
| Jitter | Zmiennosc opóźnienia pakietow |
| Buffer | Bufor przechowujacy fragmenty audio |
| Realtime agent | Agent reagujacy w czasie rozmowy, bez dlugiego oczekiwania na pełne nagranie |
| WebRTC | Technologia realtime audio/wideo, często używana w aplikacjach webowych |
| WebSocket | Dwukierunkowe połączenie do przesylania zdarzeń i danych, w tym audio |
| SIP | Czesciowo standardowy sposób łączenia z telefonia/contact center |

### 3.3.2. Wyjaśnienie eksperckie

Voicebot nie powinien czekac, az użytkownik skonczy cała rozmowę i dopiero potem przetwarzac audio. Musi przetwarzac strumien na biezaco:

- VAD wykrywa, czy pojawia się mowa.
- ASR generuje partial transcripts.
- Endpointing decyduje, czy tura użytkownika się skończyła.
- Dialog manager przygotowuje odpowiedź.
- TTS zaczyna syntezowac audio.
- System monitoruje, czy użytkownik nie przerywa.

Latency voicebota składa się z wielu malych opóźnień:

```text
latency telefonii
+ bufor audio
+ VAD/endpointing
+ ASR
+ NLU/LLM
+ integracje/API
+ generowanie odpowiedzi
+ TTS
+ playback buffer
= odczuwalna zwloka
```

Dla użytkownika liczy się całość, nie to, który komponent był szybki. Bot z szybkim LLM, ale wolnym endpointingiem i wolnym TTS, nadal brzmi wolno.

### 3.3.3. Perspektywa biznesowa

Latency wpływa na:

- AHT;
- abandonment;
- frustrację;
- liczbę powtórzeń;
- eskalację;
- koszt minut rozmowy;
- postrzegana kompetencje bota.

W procesach wysokowolumenowych nawet 1 sekunda dodatkowego czasu na rozmowę może generowac duzy koszt. Ale zbyt agresywne skracanie latency może zwiększyć ucinanie wypowiedzi i błędy. Optymalizacja latency to balans, nie wyscig do najnizszej liczby.

### 3.3.4. Perspektywa użytkownika

Użytkownik interpretuje opóźnienia psychologicznie:

- krótka pauza po trudnym pytaniu może brzmieć naturalnie;
- długa cisza po prostym "tak" brzmi jak awaria;
- odpowiedź zbyt szybka po zlozonej wypowiedzi może brzmieć jak brak słuchania;
- bot mowiacy podczas przerwania brzmi jak ignorujacy.

Projektowanie latency musi uwzględniać typ dialogu. Potwierdzenie "tak/nie" powinno być szybkie. Analiza reklamacji może mieć krótki filler: "Sprawdzam to".

### 3.3.5. Perspektywa technologiczna

W nowoczesnych architekturach:

- WebRTC i SIP mogą pozwalać serwerowi zarzadzac buforem audio i ucinaniem nieodtworzonego audio przy przerwaniu.
- WebSocket często oznacza, że klient zarzadza playbackiem, więc musi sam zatrzymywac audio i synchronizowac truncation.
- Realtime modele mogą skrócić pipeline, ale wymagają innych mechanizmow kontroli, monitoringu i testów.

Ważne parametry:

- czas do pierwszego tokenu/fragmentu odpowiedzi;
- czas do pierwszego audio TTS;
- end-of-turn delay;
- latency integracji;
- latency zatrzymania TTS po barge-in;
- jitter i utrata pakietow.

### 3.3.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Mierz latency end-to-end, nie tylko latency modelu.
- Mierz osobno: endpointing, ASR, LLM/NLU, API, TTS, playback.
- Projektuj filler prompts dla długich integracji.
- Nie otwieraj mikrofonu na kolejny slot, jeśli backend jeszcze nie jest gotowy.
- Testuj w realnej sieci i przez telefonię.
- Ustal budzet latency dla każdego typu kroku.
- Optymalizuj najpierw miejsca najczesciej wystepujace.

### 3.3.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Mierzenie tylko czasu odpowiedzi LLM | Pomija ASR, TTS, endpointing i telefonię |
| Brak fillerow przy API | Martwa cisza |
| Za niski endpointing timeout | Ucinanie użytkownika |
| Za wysoki endpointing timeout | Rozmowa brzmi ospale |
| Brak pomiaru latency barge-in | Bot przegaduje użytkownika |
| Za długie prompt'y | Wysokie AHT i więcej przerwań |

### 3.3.8. Checklista latency

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy mamy budzet latency dla typowej tury?
- Czy mierzymy end-of-turn delay?
- Czy mierzymy czas ASR?
- Czy mierzymy czas integracji?
- Czy mierzymy czas TTS?
- Czy mierzymy czas zatrzymania TTS po przerwaniu?
- Czy mamy filler dla operacji dłuższych niż ok. 1-2 sekundy?
- Czy bot nie mówi, zanim dane są gotowe?
- Czy różne sloty mają różne ustawienia endpointing?

### 3.3.9. Mini case study

Voicebot bankowy podczas weryfikacji klienta wywołuje API antyfraudowe, które czasem odpowiada po 4 sekundach. Pierwsza wersja bota milczy. Użytkownicy mówią "halo?" albo przerywają. Druga wersja odtwarza krótki komunikat: "Chwileczkę, sprawdzam dane", ale nie otwiera jeszcze kolejnego pytania. Barge-in pozostaje włączony, aby użytkownik mógł poprosić o konsultanta. Martwa cisza spada, a liczba porzuconych rozmów maleje.

### 3.3.10. Podsumowanie

Realtime w voicebocie to nie tylko szybki model. To zsynchronizowany system audio, decyzji, API i TTS. Naturalna rozmową wymaga kontroli opóźnień, endpointing i przerwań w każdym kroku.

---

## 3.4. ASR: od mowy do tekstu

### 3.4.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| ASR/STT | Technologia zamiany mowy na tekst |
| Transcript | Transkrypcją wypowiedzi |
| Partial transcript | Czesciowa hipoteza ASR podczas mówienia |
| Final transcript | Ustabilizowana transkrypcją po zakonczeniu tury |
| Confidence | Ocena pewności rozpoznania |
| Word error rate | Metryka błędów transkrypcji |
| Custom vocabulary | Słownik nazw, terminow, produktow, skrótów |
| Diarization | Rozróżnianie mowcow |
| Noise robustness | Odpornosc na hałas |

### 3.4.2. Wyjaśnienie eksperckie

ASR jest pierwsza warstwa interpretacji języka. Jeśli ASR źle przepisze wypowiedź, kolejne komponenty mogą podjac zła decyzję. Ale ASR nie musi być idealny, aby voicebot działał. Musi być wystarczajaco dobry dla konkretnego procesu i zaprojektowany z mechanizmami naprawy.

Przykłady błędów ASR:

- "Kwiatowa osiem" -> "światowa 8";
- "nie" -> brak rozpoznania;
- "PESEL" -> losowy ciąg słów;
- nazwa firmy -> zwykle słowo;
- "chce konsultanta" -> "chce konsultacje";
- numer "15" -> "50".

Dobry projekt zakłada, że ASR będzie się mylil przy:

- nazwach własnych;
- cyfrach;
- adresach;
- kodach;
- obcych nazwach;
- mówię w hałasie;
- krotkich odpowiedziach;
- emocjach i podniesionym głosie.

### 3.4.3. Perspektywa biznesowa

Jakość ASR wpływa na:

- task completion;
- liczbę powtórzeń;
- czas rozmowy;
- frustrację;
- błędy transakcyjne;
- koszt obsługi;
- zaufanie do automatyzacji.

Nie każdy błąd ASR ma ten sam koszt. Błędne rozpoznanie pytania FAQ może skończyć się fallbackiem. Błędne rozpoznanie numeru konta, adresu dostawy albo zgody może mieć realne skutki finansowe lub prawne.

### 3.4.4. Perspektywa użytkownika

Użytkownik nie wie, czy zawinil ASR, NLU czy integracja. Słyszy tylko:

- "bot mnie nie rozumie";
- "musze powtarzać";
- "bot przekrecil moje dane";
- "system nie radzi sobie z moim nazwiskiem";
- "lepiej poczekam na człowieka".

Dlatego komunikaty naprawcze nie powinny obwiniac użytkownika. Zamiast "Powiedział pan niepoprawnie" lepiej: "Nie mam pewności, czy dobrze uslyszalem. Proszę powtórzyć numer powoli, po trzy cyfry."

### 3.4.5. Perspektywa technologiczna

Wymagania ASR:

- język i wariant języka;
- model telefoniczny lub szerokopasmowy;
- streaming partials;
- timestampy;
- confidence;
- custom vocabulary;
- wsparcie dla cyfr, dat, kwot;
- diarization, jeśli potrzebna;
- możliwość eksportu audio i transkrypcji;
- zgodność z retencja danych.

Ustawienia ASR powinny być zalezne od kontekstu. Dla "tak/nie" potrzebna jest szybka detekcja. Dla numeru klienta trzeba tolerowac pauzy. Dla opisu reklamacji potrzebne jest dłuższe okno i lepsze przetwarzanie swobodnej mowy.

### 3.4.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Testuj ASR na realnych nagraniach telefonicznych.
- Zbieraj frazy i nazwy charakterystyczne dla domeny.
- Używaj custom vocabulary dla produktow, miejsc, marek, skrótów.
- Projektuj potwierdzenia dla danych wysokiego ryzyka.
- Dziel długie numery na grupy.
- Daj alternatywe DTMF dla kodów i numerow.
- Analizuj ASR errors osobno od NLU errors.
- Nie oceniaj ASR tylko na podstawie ogólnego WER; oceniaj skutki dla procesu.

### 3.4.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Brak testów na realnym audio | Produkcja gorsza niż demo |
| Brak słownika domenowego | Błędy nazw produktow i firm |
| Brak potwierdzeń dla danych krytycznych | Ryzyko błędnej akcji |
| Za szybkie endpointing przy cyfrach | Ucinanie numerow |
| Traktowanie confidence jako prawdy | Błędne decyzję przy pewnych, ale złych transkrypcjach |
| Brak zapisu audio do diagnostyki | Trudno poprawić system |

### 3.4.8. Checklista ASR

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy ASR jest dobrany do kanału telefonicznego?
- Czy wspiera język i wariant regionalny?
- Czy mamy custom vocabulary?
- Czy testujemy akcenty, hałas, osoby starsze, szybka mowę?
- Czy mamy partials i final transcripts?
- Czy mamy timestampy?
- Czy dane krytyczne są potwierdzane?
- Czy istnieje DTMF fallback?
- Czy analizujemy błędy ASR w raportach?
- Czy retencja audio/transkrypcji jest zgodna z polityka?

### 3.4.9. Mini case study

Voicebot ubezpieczeniowy zbiera numer polisy. Użytkownicy mówią numer w różnych grupach: "AB 123 45", "A B jeden dwa trzy", "a-be sto dwadziescia trzy". ASR myli litery i cyfry. Zespół zmienia projekt: bot prosi o numer w grupach, potwierdza każda grupe, pozwala użyć klawiatury telefonu i dodaje słownik prefiksow polis. Spada liczba nieudanych identyfikacji.

### 3.4.10. Podsumowanie

ASR nie jest neutralnym przepisywaczem mowy. Jest źródłem niepewności, która trzeba projektować, testować i monitorowac. Dobry voicebot nie zakłada idealnej transkrypcji, tylko umie działać mimo jej niedoskonalosci.

---

## 3.5. NLU/NLP: intencje, encje, sloty i rozumienie wypowiedzi

### 3.5.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Intent | Cel wypowiedzi użytkownika, np. "sprawdz_status" |
| Entity | Informacja wyodrebniona z wypowiedzi, np. data, miasto, numer |
| Slot | Pole wymagane do wykonania zadania, np. numer zamówienia |
| Utterance | Przykładowa wypowiedź użytkownika |
| Confidence | Pewność klasyfikacji |
| Disambiguation | Doprecyzowanie, gdy mozliwych jest kilka interpretacji |
| Multi-intent | Wypowiedź zawierajaca więcej niż jeden cel |
| Context | Stan rozmowy, który zmienia interpretacje wypowiedzi |

### 3.5.2. Wyjaśnienie eksperckie

NLU odpowiada na pytanie: "Co użytkownik próbuje zrobić i jakie informacje już podal?". Przykład:

Użytkownik: "Chce przelozyc dostawe na piatek po poludniu."

Możliwa interpretacja:

```text
intent: change_delivery_date
entities:
  date: piatek
  time_preference: po poludniu
slots filled:
  desired_date = piatek
  desired_time_window = afternoon
```

NLU nie powinno samo decydowac, czy zmiana jest możliwa. To należy do logiki biznesowej i integracji. NLU rozpoznaje znaczenie wypowiedzi, dialog manager decyduje, co dalej, a backend sprawdza realne możliwości.

W kanale głosowym NLU pracuje na transkrypcji ASR, więc dostaje tekst potencjalnie błędny. Dlatego klasy intencji muszą być projektowane z uwzglednieniem:

- typowych błędów transkrypcji;
- krotkich odpowiedzi;
- przerwań;
- korekt;
- niepełnych zdań;
- emocji;
- wielointencyjnosci.

### 3.5.3. Perspektywa biznesowa

Model intencji jest mapa procesów firmy. Jeśli intencje są źle zaprojektowane, bot nie tylko źle rozumie język, ale też źle odzwierciedla biznes.

Zły model:

- jedna intencja "reklamacja" obejmuje fakture, produkt, dostawe, płatność, zwrot i gwarancje;
- brak oddzielnej intencji "konsultant";
- brak intencji korekty;
- brak intencji "nie wiem";
- brak intencji "anuluj".

Dobry model:

- rozdziela sprawy wedlug akcji, danych i procesu;
- ma intencje obslugowe i meta-intencje;
- przewiduje korekty, eskalację i zmianę tematu;
- jest powiazany z raportowaniem.

### 3.5.4. Perspektywa użytkownika

Użytkownik mówi po swojemu:

- "gdzie jest paczka";
- "kurier miał być wczoraj";
- "nie mam przesyłki";
- "chce wiedzieć, co z moim zamówieniem";
- "zmiencie mi adres, bo tam nikogo nie będzie";
- "dobra, jednak konsultant".

Bot nie powinien wymagać idealnych komend. Ale nie powinien też udawać, że rozumie, gdy pewność jest niska. Lepiej dopytać:

"Czy chodzi o sprawdzenie statusu przesyłki, czy o zmianę adresu dostawy?"

### 3.5.5. Perspektywa technologiczna

NLU może być:

- klasycznym modelem intencji i encji;
- częścią platformy dialogowej;
- klasyfikatorem LLM;
- hybryda reguł, modeli i LLM;
- osobnym serwisem w architekturze.

Wymagania:

- lista intencji;
- definicje intencji;
- pozytywne i negatywne przykłady;
- encje systemowe i domenowe;
- słowniki;
- threshold confidence;
- strategie disambiguation;
- analiza confusion matrix;
- wersjonowanie modelu;
- test set oddzielony od training set.

### 3.5.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Projektuj intencje wedlug celu użytkownika, nie struktury organizacyjnej firmy.
- Nie tworz zbyt podobnych intencji bez dobrych danych.
- Dodaj intencje meta: konsultant, powtórz, anuluj, stop, nie rozumiem.
- Oddziel intencje informacyjne od transakcyjnych.
- Testuj multi-intent.
- Regularnie analizuj nierozpoznane wypowiedzi.
- Utrzymuj dataset testowy.
- Nie zmieniaj modelu bez testów regresji.

### 3.5.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Zbyt szerokie intencje | Bot rozumie ogólny temat, ale nie wie, co zrobić |
| Zbyt waskie intencje | Confusion i trudne utrzymanie |
| Brak negatywnych przykładów | Model myli podobne sprawy |
| Brak intencji korekty | Przerwania psuja flow |
| Brak intencji eskalacji | Użytkownik walczy z botem |
| Trenowanie na sztucznych frazach bez walidacji | Produkcja różni się od testów |

### 3.5.8. Checklista NLU

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy każda intencja ma jasna definicje?
- Czy intencje odpowiadają akcjom/procesom?
- Czy mamy przykłady realnych wypowiedzi?
- Czy mamy negatywne przykłady?
- Czy encje są potrzebne do wykonania zadania?
- Czy sloty mają walidacje?
- Czy jest strategia niskiej pewności?
- Czy jest disambiguation?
- Czy analizujemy confusion matrix?
- Czy model ma wersjonowanie i testy regresji?

### 3.5.9. Mini case study

W telekomie intencje "awaria internetu", "wolny internet" i "brak internetu" myla się w modelu. Biznes chce trzy osobne raporty, ale użytkownicy mówią podobnie. Zespół zmienia model: jedna intencja "problem_z_internetem", a typ problemu zbierany jest jako slot po pytaniu doprecyzowujacym. Model staje się stabilniejszy, a biznes nadal dostaje raport przez slot "problem_type".

### 3.5.10. Podsumowanie

NLU jest mostem między językiem użytkownika a procesem biznesowym. Dobre intencje nie są lista tematow, lecz mapa tego, co użytkownik chce osiągnąć i jakie dane są potrzebne, aby system mógł działać.

---

## 3.6. Menedżer dialogu, logika biznesowa i zarządzanie stanem

### 3.6.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Dialog manager | Komponent decydujacy o następnym kroku rozmowy |
| State | Aktualny stan rozmowy i zebrane informacje |
| Slot filling | Proces zbierania brakujacych danych |
| Policy | Regula decydujaca, co bot robi w danej sytuacji |
| Context stack | Pamięć aktywnych tematow i procesów |
| Recovery | Powrót do sensownego miejsca po błędzie lub przerwaniu |
| Business rule | Regula biznesowa, np. "adres można zmienić tylko przed wysyłka" |
| Transaction boundary | Moment, w którym akcja zostaje zatwierdzona |

### 3.6.2. Wyjaśnienie eksperckie

NLU mówi: "użytkownik chce zmienić adres". Dialog manager pyta: "czy mamy wszystkie dane i co teraz?". Business logic sprawdza: "czy adres można jeszcze zmienić dla tego zamówienia?".

Przykład stanu:

```text
current_intent: change_delivery_address
customer_verified: true
order_id: 12345
order_status: packed_not_shipped
current_address: Lesna 14
new_address: null
last_bot_question: ask_new_address
fallback_count: 0
handoff_requested: false
```

Bez stanu bot nie prowadzi rozmowy, tylko reaguje na pojedyncze wypowiedzi. Stan pozwala:

- pamiętać, co już zebrano;
- wracać po przerwaniu;
- obsługiwać korekty;
- unikać powtarzania pytań;
- przekazać kontekst konsultantowi;
- logować proces.

### 3.6.3. Perspektywa biznesowa

Business logic chroni proces przed blednymi akcjami. Przykłady:

- nie można anulowac zamówienia po wysylce;
- nie można zmienić adresu po przekazaniu kurierowi;
- nie można udzielić informacji o polisie bez weryfikacji;
- nie można zarezerwowac terminu, który jest już zajety;
- nie można przyjac zgody, jeśli użytkownik przerwal wymagany komunikat.

Dialog manager musi wiedzieć, kiedy pytać dalej, kiedy wykonać akcję, kiedy powiedzieć "nie mogę tego zrobić" i kiedy eskalować.

### 3.6.4. Perspektywa użytkownika

Dobry stan rozmowy sprawia, że użytkownik czuje:

- "bot pamięta, co powiedzialem";
- "nie musze zaczynać od nowa";
- "mogę poprawić jeden element";
- "system wie, gdzie jestesmy w procesie".

Zły stan rozmowy objawia się jako:

- powtarzanie tych samych pytań;
- reset po przerwaniu;
- utrata danych po fallbacku;
- przekazanie konsultantowi bez kontekstu.

### 3.6.5. Perspektywa technologiczna

State management musi być:

- jawny;
- wersjonowany;
- odporny na przerwania;
- zgodny z retencja danych;
- ograniczony do danych potrzebnych;
- dostępny dla handoff;
- logowany w sposób bezpieczny.

W voicebotach LLM ważne jest oddzielenie:

- stabilnego stanu procesu;
- historii rozmowy;
- aktualnego planu odpowiedzi;
- generowanego tekstu;
- wyniku narzędzi/API.

Jeśli LLM generuje odpowiedź, ale użytkownik przerywa, stan nie powinien slepo przejść dalej. Trzeba wiedzieć, czy akcja została wykonana, czy tylko zapowiedziana.

### 3.6.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Zapisuj stan jako jawne pola, nie tylko historie czatu.
- Oddziel dane potwierdzone od niepotwierdzonych.
- Projektuj korektę slotu.
- Projektuj anulowanie akcji.
- Projektuj recovery po przerwaniu.
- Projektuj licznik fallbackow.
- Ustal granice transakcji.
- Przekazuj stan do konsultanta w czytelnym podsumowaniu.

### 3.6.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Trzymanie stanu tylko w promptcie LLM | Nieprzewidywalnosc i utrata kontroli |
| Brak rozroznienia danych potwierdzonych | Błędne akcję |
| Brak korekty slotu | Użytkownik musi zaczynać od nowa |
| Brak transaction boundary | Bot może sugerowac wykonanie akcji, która się nie wykonala |
| Brak context handoff | Konsultant nie wie, co się działo |

### 3.6.8. Checklista dialog managera

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy każdy proces ma jasno opisane stany?
- Czy wiemy, jakie sloty są wymagane?
- Czy każdy slot ma walidacje?
- Czy dane krytyczne są potwierdzane?
- Czy można poprawić pojedynczy slot?
- Czy jest licznik fallbackow?
- Czy jest polityka eskalacji?
- Czy stan jest przekazywany do konsultanta?
- Czy LLM nie jest jedynym miejscem przechowywania stanu?
- Czy wiemy, kiedy akcja jest formalnie zatwierdzona?

### 3.6.9. Mini case study

Voicebot rezerwacyjny zbiera datę i godzinę wizyty. Użytkownik mówi: "Nie, jednak czwartek". W pierwszej wersji bot interpretuje to jako nowa rozmowę i pyta od początku o specjalizacje. Po poprawie stan rozmowy przechowuje specjalizacje, lokalizacje i lekarza, a korekta dotyczy tylko slotu `appointment_datę`. Bot mówi: "Zmieniam datę na czwartek. Godzina 15:30 nadal pasuje?"

### 3.6.10. Podsumowanie

Dialog manager jest sercem voicebota procesowego. To on sprawia, że rozmową nie jest seria losowych odpowiedzi, lecz kontrolowana droga do wyniku. W voicebotach generatywnych jawny stan jest jeszcze ważniejszy, bo chroni proces przed nieprzewidywalnoscia modelu.

---

## 3.7. Integracje backendowe i logika procesów

### 3.7.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| API | Interfejs pozwalajacy systemom wymieniać dane |
| Webhook | Wywolanie HTTP do zewnetrznego systemu w reakcji na zdarzenie |
| CRM | System zarzadzania relacjami z klientami |
| ERP | System zarzadzania zasobami firmy |
| Ticketing | System obsługi zgloszen |
| Timeout | Maksymalny czas oczekiwania na odpowiedź systemu |
| Retry | Ponowienie zapytania po błędzie |
| Idempotency | Właściwość, dzięki której ponowienie akcji nie powoduje duplikatu |
| PII | Dane osobowe |

### 3.7.2. Wyjaśnienie eksperckie

Voicebot bez integracji może informowac. Voicebot z integracjami może działać.

Przykłady:

- status zamówienia: integracja z order management;
- wizyta: integracja z kalendarzem;
- reklamacja: ticketing;
- windykacja: system płatności i saldo;
- helpdesk IT: system zgloszen, katalog usług, baza użytkowników;
- bank: system autoryzacji, karty, transakcje.

Integracje muszą być projektowane pod rozmowę głosowa. Użytkownik czeka na linii. Timeout, który w aplikacji webowej jest drobnym opoznieniem, w rozmowie telefonicznej staje się cisza i frustracja.

### 3.7.3. Perspektywa biznesowa

Integracje decydują, czy bot:

- realnie rozwiązuje sprawę;
- tylko zbiera dane dla konsultanta;
- tworzy ticket;
- wykonuje transakcje;
- redukuje koszt;
- poprawia jakość danych.

Najważniejsze pytania biznesowe:

- Jakie akcję bot może wykonywac sam?
- Jakie akcję wymagają potwierdzenia?
- Jakie akcję wymagają człowieka?
- Jakie dane bot może odczytac?
- Jakie dane bot może zapisać?
- Co robimy, gdy integracja nie odpowiada?

### 3.7.4. Perspektywa użytkownika

Użytkownik odczuwa dobra integracje jako sprawczosc:

"Bot sprawdzil, zmienil, potwierdzil, wyslal."

Zła integracja brzmi jak:

"Nie mam teraz dostępu do tych danych", "proszę zadzwonic później", "połączę z konsultantem" po kilku minutach zbierania informacji.

Jeśli bot zbiera dane, a potem integracja pada, komunikat musi być uczciwy:

"Mam już potrzebne informacje, ale system rezerwacji teraz nie odpowiada. Mogę utworzyc zgłoszenie dla konsultanta albo wysłać link do samodzielnej zmiany terminu."

### 3.7.5. Perspektywa technologiczna

Specyfikacja integracji powinna zawierac:

- nazwe systemu;
- właściciela systemu;
- endpointy/API;
- autoryzacje;
- dane wejsciowe;
- dane wyjsciowe;
- błędy i kody odpowiedzi;
- timeout;
- retry;
- idempotency key dla akcji zapisujacych;
- ograniczenia rate limit;
- logowanie;
- maskowanie danych;
- tryb testowy/sandbox;
- SLA.

### 3.7.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Projektuj timeouty z perspektywy rozmowy.
- Nie wykonuj akcji krytycznych bez potwierdzenia.
- Używaj idempotency dla zapisow, np. rezerwacji lub płatności.
- Oddziel odczyt danych od modyfikacji danych.
- Daj fallback, gdy integracja nie odpowiada.
- Loguj request ID i wynik akcji.
- Nie wypowiadaj danych wrażliwych bez potrzeby.
- Przekazuj konsultantowi, które API zawiodlo i co bot już zebral.

### 3.7.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Integracja dopiero po projekcie dialogu | Flow nie pasuje do realnych danych |
| Brak timeoutów | Martwa cisza |
| Brak idempotency | Duplikaty rezerwacji lub zgloszen |
| Brak rozroznienia błędów | Bot daje zły komunikat |
| Brak sandboxa | Testy są ryzykowne |
| Nadmierne odczytywanie danych | Ryzyko prywatności |

### 3.7.8. Checklista integracji

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy wiemy, które systemy są potrzebne?
- Czy API istnieje i jest dostępne?
- Czy mamy właściciela systemu?
- Czy mamy dokumentacje endpointow?
- Czy znamy timeout i SLA?
- Czy mamy retry?
- Czy akcję zapisujace są idempotentne?
- Czy mamy sandbox?
- Czy błędy są mapowane na komunikaty użytkownika?
- Czy dane wrażliwe są maskowane w logach?

### 3.7.9. Mini case study

Voicebot umawia wizyty serwisowe. API kalendarza czasem tworzy rezerwacje, ale odpowiedź wraca z opoznieniem i bot ponawia request. Powstają duplikaty. Po poprawce dodano idempotency key oparty o identyfikator rozmowy i proponowany slot wizyty. Ponowienie requestu zwraca te sama rezerwacje zamiast tworzyć nowa.

### 3.7.10. Podsumowanie

Integracje zamieniają voicebota z rozmowcy w wykonawce procesu. Muszą być projektowane z uwzglednieniem czasu rozmowy, ryzyka błędów, prywatności i handoff. Dobra integracja jest niewidoczna dla użytkownika, bo sprawa po prostu idzie do przodu.

---

## 3.8. Bazy wiedzy, RAG i odpowiedzi informacyjne

### 3.8.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Knowledge base | Zbior zweryfikowanych informacji dla bota |
| RAG | Pobieranie informacji że źródeł i generowanie odpowiedzi na ich podstawie |
| Chunk | Fragment dokumentu indeksowany w bazie wiedzy |
| Retrieval | Wyszukanie pasujacych fragmentow |
| Grounding | Oparcie odpowiedzi modelu na źródłach |
| Citation | Wskazanie źródła odpowiedzi, w rozmowie głosowej zwykle jako log lub podsumowanie |
| Freshness | Aktualność wiedzy |
| Policy answer | Odpowiedź zgodna z polityka firmy, nawet jeśli użytkownik pyta szerzej |

### 3.8.2. Wyjaśnienie eksperckie

Baza wiedzy dla voicebota nie może być zrzutem całego intranetu. Musi być przygotowana pod rozmowę:

- aktualna;
- jednoznaczna;
- bez sprzecznych wersji;
- podzielona na sensowne fragmenty;
- oznaczona metadanymi;
- zawierajaca zakres obowiazywania;
- przetestowana na pytaniach użytkowników;
- przepisana do formatu głosowego tam, gdzie trzeba.

RAG działa w uproszczeniu tak:

```text
Pytanie użytkownika
  -> wyszukanie pasujacych fragmentow bazy
  -> przekazanie fragmentow do modelu
  -> wygenerowanie odpowiedzi
  -> opcjonalna walidacja politykami
  -> odpowiedź głosowa
```

Największe ryzyko: model odpowiada płynnie, ale źle. W kanale głosowym użytkownik ma mniej możliwości samodzielnego sprawdzenia odpowiedzi, więc trzeba ograniczac zakres i projektować niepewność.

### 3.8.3. Perspektywa biznesowa

Baza wiedzy jest produktem operacyjnym. Ktos musi być właścicielem:

- treści;
- aktualizacji;
- zatwierdzania;
- wersji;
- wycofywania nieaktualnych informacji;
- odpowiedzialności za błędy.

Bez właściciela baza szybko staje się smietnikiem dokumentów. RAG nie naprawi sprzecznych procedur.

### 3.8.4. Perspektywa użytkownika

Użytkownik chce odpowiedzi:

- krótkiej;
- konkretnej;
- dopasowanej do pytania;
- bez żargonu;
- z opcja doprecyzowania;
- z jasnym sygnalem, gdy bot nie może rozstrzygnąć indywidualnej sprawy.

Przykład:

Źle:

"Zgodnie z regulaminem usług dodatkowych w paragrafie 14 punkt 3..."

Lepsze:

"Zwrot zwykle trwa do 14 dni od przyjęcia przesyłki. Jeśli chce pan, mogę sprawdzić status konkretnego zwrotu."

### 3.8.5. Perspektywa technologiczna

Wymagania RAG:

- źródła dokumentów;
- pipeline indeksowania;
- chunking;
- embedding/search;
- metadane: wersja, data, produkt, kraj, język, segment klienta;
- filtrowanie dostępu;
- ocena trafności retrieval;
- test set pytań;
- monitoring odpowiedzi;
- mechanizm usuwania/aktualizacji źródeł;
- polityka odpowiedzi "nie wiem".

### 3.8.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Nie indeksuj wszystkiego.
- Usuwaj sprzeczne i nieaktualne dokumenty.
- Twórz wersje "voice-ready" dla najczęstszych odpowiedzi.
- Ograniczaj odpowiedź do 1-3 zdań.
- Dodawaj opcję: "Mogę sprawdzić konkretną sprawę".
- Testuj pytania potoczne, nie tylko formalne.
- Loguj, z których źródeł skorzystano.
- Oddziel odpowiedzi ogólne od decyzji indywidualnych.

### 3.8.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Indeksowanie całego SharePointa bez kuracji | Sprzeczne odpowiedzi |
| Brak dat waznosci | Odpowiedzi nieaktualne |
| Za długie odpowiedzi RAG | Użytkownik przerywa |
| Brak testów retrieval | Model dostaje źle fragmenty |
| Brak polityki "nie wiem" | Halucynacje |
| Brak właściciela treści | Baza degraduje się po wdrożeniu |

### 3.8.8. Checklista RAG

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy wiemy, z jakich źródeł bot może korzystać?
- Czy źródła są zatwierdzone?
- Czy dokumenty są aktualne?
- Czy istnieja metadane?
- Czy odpowiedzi są dopasowane do głosu?
- Czy mamy test set pytań?
- Czy mierzymy retrieval accuracy?
- Czy bot może odmówić odpowiedzi?
- Czy logujemy źródła?
- Czy jest proces aktualizacji bazy?

### 3.8.9. Mini case study

Firma ubezpieczeniowa indeksuje OWU, FAQ i procedury likwidacji szkody. Bot zaczyna odpowiadać zbyt prawniczo. Zespół tworzy warstwę "voice answers": zatwierdzone, krótkie interpretacje ogólnych zasad, powiązane z dokumentami źródłowymi. LLM może używać ich do odpowiedzi głosowej, ale przy pytaniu o indywidualną decyzję tworzy zgłoszenie albo łączy z konsultantem.

### 3.8.10. Podsumowanie

RAG może zwiększyć użyteczność voicebota, ale tylko wtedy, gdy baza wiedzy jest kuratorowana, aktualna i przygotowana pod rozmowę. W przeciwnym razie generatywna płynność ukryje chaos źródeł.

---

## 3.9. TTS: synteza mowy i projektowanie wypowiedzi audio

### 3.9.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| TTS | Text-to-Speech, synteza mowy |
| Voice persona | Charakter głosu i stylu bota |
| Prosody | Tempo, rytm, akcent, intonacja |
| SSML | Znaczniki sterujące synteza mowy, jeśli platforma wspiera |
| Pronunciation lexicon | Słownik wymowy |
| Speech output formatting | Formatowanie tekstu pod odczyt |
| Earcons | Krótkie sygnały audio wspierające interakcje |

### 3.9.2. Wyjaśnienie eksperckie

TTS nie powinien po prostu odczytywać tekstu napisanego dla ekranu. Tekst głosowy musi być:

- krótszy;
- bardziej linearny;
- łatwiejszy do zapamiętania;
- bez nawiasów i złożonych struktur;
- z jasnymi potwierdzeniami;
- z naturalnym rytmem.

Przykład:

Tekst ekranowy:

"Twoja reklamacja nr R/2026/07/18273 została przyjęta do rozpatrzenia, a przewidywany termin udzielenia odpowiedzi wynosi 14 dni roboczych od daty otrzymania kompletu dokumentów."

Tekst głosowy:

"Przyjęliśmy reklamację. Numer sprawy to R 18 273. Odpowiedź powinna być w ciągu 14 dni roboczych od otrzymania dokumentów."

### 3.9.3. Perspektywa biznesowa

TTS wpływa na:

- wizerunek marki;
- zrozumiałość;
- czas rozmowy;
- liczbę powtórzeń;
- skuteczność potwierdzeń;
- zaufanie;
- dostępność.

Zbyt ekspresyjny głos może być nieodpowiedni dla banku lub windykacji. Zbyt mechaniczny może obniżać zaufanie w opiece medycznej. Głos musi pasować do kontekstu, a nie tylko brzmieć efektownie.

### 3.9.4. Perspektywa użytkownika

Użytkownik reaguje na:

- tempo;
- ton;
- pauzy;
- sposób przepraszania;
- czytelność liczb;
- łatwość przerwania;
- brak nadmiernej "ludzkości".

Voicebot powinien brzmieć kompetentnie, spokojnie i transparentnie. Nie musi udawać konsultanta.

### 3.9.5. Perspektywa technologiczna

Wymagania TTS:

- język i lokalizacja;
- stabilność głosu;
- wymowa liczb, dat, kwot, skrótów;
- możliwość słownika wymowy;
- możliwość sterowania pauzami;
- latency syntezy;
- streaming TTS;
- możliwość przerwania playbacku;
- licencje i zgody dla głosu;
- zgodność z kanałem telefonicznym.

### 3.9.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Testuj każdy ważny komunikat na głos.
- Projektuj liczby w grupach.
- Unikaj długich zdań podrzędnych.
- Nie używaj żargonu.
- Dodawaj pauzy tam, gdzie użytkownik musi zapamiętać dane.
- Tworz słownik wymowy dla marek i nazw.
- Używaj spokojnego tonu w błędach.
- Skracaj odpowiedzi generatywne przed TTS.

### 3.9.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Odczytywanie tekstów z FAQ bez adaptacji | Długie, trudne wypowiedzi |
| Brak testów liczb i dat | Nieczytelne dane |
| Zbyt szybkie tempo | Powtórzenia |
| Zbyt emocjonalny głos | Niedopasowanie do branży |
| Brak możliwości przerwania TTS | Frustracja |
| Brak słownika wymowy | Śmieszne lub mylące odczyty nazw |

### 3.9.8. Checklista TTS

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy teksty są pisane pod głos?
- Czy TTS poprawnie czyta liczby, daty, kwoty, kody?
- Czy mamy słownik wymowy?
- Czy tempo jest odpowiednie dla grupy użytkowników?
- Czy komunikaty są krótkie?
- Czy głos pasuje do marki i kontekstu?
- Czy TTS jest streamowany?
- Czy można go zatrzymać przy barge-in?
- Czy testowaliśmy przez telefon?

### 3.9.9. Mini case study

Voicebot energetyczny odczytuje numer punktu poboru energii jako jeden długi ciąg. Użytkownicy proszą o powtórzenie. Zespół zmienia format: bot czyta numer w grupach po trzy znaki, robi krótkie pauzy i pyta, czy wysłać numer SMS-em. Liczba powtórzeń spada.

### 3.9.10. Podsumowanie

TTS jest twarzą voicebota w kanale audio. Nawet najlepsza logika może zostać odebrana jako zła, jeśli bot mówi za długo, źle wymawia dane albo nie daje się przerwać.

---

## 3.10. Monitoring, logging, analityka i observability

### 3.10.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Logging | Zapisywanie zdarzeń systemowych i dialogowych |
| Monitoring | Bieżące sledzenie stanu systemu |
| Analytics | Analiza wynikow rozmów i trendow |
| Trace | Ścieżka pojedynczej rozmowy przez komponenty |
| Transcript | Tekstowy zapis rozmowy |
| Event | Zdarzenie, np. fallback, handoff, API timeout |
| Dashboard | Widok metryk |
| Alert | Powiadomienie o problemie |

### 3.10.2. Wyjaśnienie eksperckie

Nie da się optymalizować voicebota, którego nie widac. Observability musi pokazać:

- co użytkownik powiedział;
- co ASR rozpoznal;
- jaka intencja została wykryta;
- jakie sloty zebrano;
- jakie API wywolano;
- jaka odpowiedź wygenerowano;
- kiedy był fallback;
- kiedy był barge-in;
- kiedy był handoff;
- jaki był wynik rozmowy;
- ile trwala każda faza.

Trzy poziomy danych:

1. Techniczne: latency, błędy API, status ASR/TTS, uptime.
2. Konwersacyjne: intencje, fallbacki, no-input, przerwania, powtórzenia.
3. Biznesowe: task completion, containment, koszt, konwersja, CSAT, repeat contact.

### 3.10.3. Perspektywa biznesowa

Dashboard biznesowy powinien odpowiadać:

- Ile spraw bot zakonczyl skutecznie?
- Jakie procesy działają najlepiej?
- Gdzie rosna eskalację?
- Ile kosztuje rozmową?
- Czy spada liczba kontaktów powtornych?
- Czy poprawia się dostępność?
- Czy bot tworzy realną wartość?

Sama liczba rozmów obsluzonych przez bota nie jest sukcesem. Sukces to wynik sprawy.

### 3.10.4. Perspektywa użytkownika

Monitoring powinien wykrywać sygnały złego doświadczenia:

- wiele powtórzeń;
- wiele no-match;
- przerwania w tych samych promptach;
- nagle eskalację po konkretnym komunikacie;
- długie ciszę;
- rozłączenia po fallbacku;
- prośby o konsultanta po błędzie.

Te sygnały mówią, gdzie użytkownik traci cierpliwosc.

### 3.10.5. Perspektywa technologiczna

Minimalny zestaw logow:

- conversation_id;
- timestampy tur;
- ASR partial i final;
- confidence;
- detected intent;
- entities/slots;
- dialog state;
- bot response text;
- TTS event;
- barge-in event;
- endpointing decision;
- API request ID i wynik;
- fallback/no-input/no-match;
- handoff reason;
- outcome;
- latency per component.

Wymagania prywatności:

- maskowanie danych osobowych;
- kontrola dostępu do transkrypcji;
- retencja;
- audyt dostępu;
- anonimizacja do analiz, jeśli możliwe.

### 3.10.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Projektuj logowanie przed produkcją.
- Ustal słownik zdarzeń.
- Loguj powody handoff, nie tylko fakt handoff.
- Oddziel metryki systemowe od biznesowych.
- Przegladaj transkrypcje regularnie.
- Tworz backlog optymalizacji na podstawie danych.
- Monitoruj zmiany po każdym release.
- Dbaj o prywatność i minimalizacje danych.

### 3.10.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Brak logow ASR | Nie wiadomo, czy zawinil ASR czy NLU |
| Brak powodów handoff | Eskalację są nieinterpretowalne |
| Dashboard tylko wolumenowy | Brak wgladu w jakość |
| Brak anonimizacji | Ryzyko prywatności |
| Brak wersjonowania zmian | Nie wiadomo, co pogorszylo metryki |
| Brak alertow | Problemy trwaja godzinami lub dniami |

### 3.10.8. Checklista observability

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy mamy conversation_id?
- Czy logujemy transkrypcje ASR?
- Czy logujemy intencje i confidence?
- Czy logujemy stan dialogu?
- Czy logujemy API i timeouty?
- Czy logujemy barge-in i no-input?
- Czy logujemy powod handoff?
- Czy mierzymy latency komponentów?
- Czy dane wrażliwe są maskowane?
- Czy mamy dashboard biznesowy, operacyjny i jakościowy?

### 3.10.9. Mini case study

Voicebot e-commerce ma containment 72%, ale CSAT spada. Analiza logow pokazuje, że wiele rozmów zakonczonych "contained" dotyczy informacji o zwrocie, ale użytkownicy dzwonia ponownie po 24 godzinach. Bot informowal ogólnie, ale nie sprawdzal statusu konkretnego zwrotu. Po dodaniu integracji i metryki repeat contact okazuje się, że realna skuteczność była nizsza niż dashboard containment.

### 3.10.10. Podsumowanie

Observability jest warunkiem utrzymania voicebota. Bez logow i metryk projekt kończy się w dniu wdrożenia. Z observability voicebot staje się produktem, który można rozwijac.

---

## 3.11. Human handoff: przekazanie rozmowy do konsultanta

### 3.11.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Handoff | Przekazanie sprawy do człowieka |
| Escalation reason | Powod eskalacji |
| Context package | Pakiet danych przekazywany konsultantowi |
| Warm transfer | Przekazanie z kontekstem |
| Cold transfer | Przekazanie bez kontekstu |
| Deflection | Próba zatrzymania użytkownika w automatyzacji |
| Agent assist | Wsparcie konsultanta przez AI |

### 3.11.2. Wyjaśnienie eksperckie

Handoff nie jest porażka voicebota. Jest mechanizmem bezpieczeństwa i jakości. Dobry bot wie, kiedy nie powinien kontynuowac.

Powody handoff:

- użytkownik prosi o człowieka;
- niski confidence po kilku probach;
- wysokie ryzyko compliance;
- emocje lub agresja;
- sytuacja medyczna/finansowa/wrażliwa;
- brak danych w systemie;
- błąd integracji;
- proces poza zakresem;
- VIP lub szczególny segment klienta;
- warunek biznesowy, np. reklamacja sporna.

### 3.11.3. Perspektywa biznesowa

Dobry handoff:

- chroni CSAT;
- zmniejsza eskalację emocjonalne;
- poprawia produktywnosc konsultanta;
- daje dane o lukach automatyzacji;
- pozwala stopniowo rozszerzac zakres bota.

Zły handoff:

- marnuje czas klienta;
- przerzuca frustrację na konsultanta;
- ukrywa problemy bota;
- obniza zaufanie do automatyzacji.

### 3.11.4. Perspektywa użytkownika

Użytkownik chce wiedzieć:

- czy zostanie połączony;
- ile może czekac;
- czy musi powtarzać dane;
- czy konsultant będzie wiedział, o co chodzi.

Dobre sformulowanie:

"Połączę z konsultantem i przekaze, że chodzi o zmianę adresu w zamówieniu 12345. Proszę zostać na linii."

### 3.11.5. Perspektywa technologiczna

Context package powinien zawierac:

- identyfikator rozmowy;
- zweryfikowanego klienta, jeśli dotyczy;
- intencje;
- zebrane sloty;
- ostatnie pytanie bota;
- powod handoff;
- wynik API;
- streszczenie rozmowy;
- transkrypcje lub link do niej;
- poziom pilnosci;
- informacje o emocjach/frustracji, ostrożnie i jako sygnał, nie diagnoza.

### 3.11.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Pozwol użytkownikowi poprosić o człowieka.
- Nie ukrywaj handoff.
- Przekazuj kontekst.
- Nie zmuszaj do powtarzania danych.
- Mierz powod handoff.
- Daj konsultantowi krótkie podsumowanie, nie sciane tekstu.
- W procesach wrażliwych eskaluj szybciej.
- Po handoff nie kasuj danych diagnostycznych.

### 3.11.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Handoff tylko po trzech fallbackach | Użytkownik za późno trafia do człowieka |
| Brak powodu eskalacji | Nie wiadomo, co poprawiać |
| Brak kontekstu dla konsultanta | Klient powtarza sprawę |
| Bot walczy z prośba o konsultanta | Frustracja i utrata zaufania |
| Brak metryki handoff success | Nie wiadomo, czy przekazanie pomaga |

### 3.11.8. Checklista handoff

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy użytkownik może poprosić o konsultanta?
- Czy bot zna warunki automatycznej eskalacji?
- Czy przekazujemy intencje i sloty?
- Czy przekazujemy powod handoff?
- Czy konsultant widzi podsumowanie?
- Czy klient nie musi powtarzać danych?
- Czy mierzymy czas do połączenia?
- Czy mierzymy wynik po handoff?
- Czy analizujemy handoff jako źródło optymalizacji?

### 3.11.9. Mini case study

Voicebot windykacyjny ma wysoki containment, ale konsultanci zgłaszaja bardzo trudne rozmowy po przekazaniu. Analiza pokazuje, że bot probowal kontynuowac automatyzację mimo fraz "nie zgadzam się", "to pomylka", "chce złożyć skargę". Dodano intencje sporu i szybszy handoff z podsumowaniem. Containment spadl, ale CSAT i compliance risk poprawily się.

### 3.11.10. Podsumowanie

Handoff to nie awaryjne wyjscie ukryte na koncu. To integralny element architektury i doświadczenia. Dobry voicebot wie, kiedy pomaga automatyzacja, a kiedy najlepsza obsługa to człowiek z dobrym kontekstem.

---

## 3.12. Porównanie architektur: rule-based, intent-based, generative i hybrid AI

### 3.12.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Rule-based | System oparty na regułach, menu i deterministycznych warunkach |
| Intent-based | System rozpoznajacy intencje i encje, prowadzony przez flow |
| Generative AI | System wykorzystujacy model generatywny do rozumienia i/lub odpowiedzi |
| Hybrid AI | Połączenie flow, reguł, NLU, LLM i narzędzi |
| Determinism | Przewidywalność zachowania |
| Flexibility | Zdolność obsługi zroznicowanych wypowiedzi |
| Control surface | Miejsca, w których można ograniczyc lub nadzorowac zachowanie systemu |

### 3.12.2. Tabela porownawcza

| Kryterium | Rule-based | Intent-based | Generative | Hybrid |
|---|---|---|---|---|
| Kontrola | Bardzo wysoka | Wysoka | Nizsza bez guardrails | Wysoka w krytycznych krokach |
| Elastycznosc językowa | Niska | Średnia | Wysoka | Wysoka tam, gdzie potrzebna |
| Koszt utrzymania | Rosnie z liczba reguł | Rosnie z liczba intencji | Rosnie przez testy i monitoring | Średni-wysoki, ale kontrolowany |
| Ryzyko compliance | Niskie-średnie | Średnie | Wysokie bez ograniczeń | Kontrolowane |
| Najlepsze dla | Menu, proste procesy | Contact center task-oriented | Informacje, swobodny opis, asysta | Enterprise voiceboty |
| Slabosc | Sztywnosc | Dane treningowe i confusion | Halucynacje, latency | Zlozonosc architektury |

### 3.12.3. Wyjaśnienie eksperckie

#### Rule-based

Dobre dla prostych, przewidywalnych procesów:

- routing;
- proste menu;
- disclaimer;
- DTMF;
- proste potwierdzenia.

Nie nadaje się do naturalnego opisu problemu i wielu parafraz.

#### Intent-based

Najczestszy model voicebotów contact center. Użytkownik mówi naturalnie w ramach domeny, NLU rozpoznaje intencje, a flow prowadzi proces.

Dobre dla:

- statusow;
- rezerwacji;
- reklamacji w okreslonym zakresie;
- helpdesku;
- powtarzalnych procesów.

#### Generative

LLM daje elastycznosc w rozumieniu i odpowiedziach, szczególnie dla:

- FAQ z bazy wiedzy;
- streszczen;
- klasyfikacji otwartego opisu;
- agent assist;
- wielointencyjnych wypowiedzi.

Ryzyko: brak kontroli, jeśli LLM sam decyduje o wszystkim.

#### Hybrid

Najbardziej praktyczna architektura enterprise:

- flow kontroluje proces;
- LLM rozumie język i wspiera odpowiedzi;
- RAG dostarcza wiedzę;
- narzędzia wykonują akcję;
- guardrails ograniczaja zakres;
- observability monitoruje jakość.

### 3.12.4. Perspektywa biznesowa

Dobor architektury powinien wynikać z:

- ryzyka procesu;
- potrzeby elastyczności;
- dojrzalosci danych;
- wymagań compliance;
- kosztu latency;
- dostępności integracji;
- kompetencji zespolu utrzymaniowego.

Nie każdy projekt potrzebuje generatywnej AI. Ale coraz więcej projektow skorzysta z LLM jako komponentu, nie jako całości systemu.

### 3.12.5. Perspektywa użytkownika

Użytkownik chce kombinacji:

- przewidywalnosci przy decyzjach;
- elastyczności przy mowieniu;
- krotkich odpowiedzi;
- możliwości poprawienia;
- braku halucynacji;
- szybkiej eskalacji.

Architektura hybrydowa najlepiej odpowiada temu napieciu: użytkownik może mówić naturalnie, ale krytyczne akcję pozostają kontrolowane.

### 3.12.6. Perspektywa technologiczna

Przykładowa architektura hybrydowa:

```text
Audio
  -> ASR
  -> LLM/NLU intent classifier
  -> Dialog manager
      -> controlled flow
      -> business rules
      -> RAG for informational answers
      -> tools/API for actions
      -> guardrails
  -> response planner
  -> TTS
  -> monitoring + analytics
```

Ważne: LLM nie powinien być jedynym arbitrem stanu i akcji w procesach wysokiego ryzyka. Powinien być otoczony walidacja, narzędziami i politykami.

### 3.12.7. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Używaj najprostszej architektury, która spelnia wymagania.
- Dla procesów krytycznych utrzymuj deterministyczne kroki.
- Używaj LLM do elastyczności językowej, nie do niekontrolowanej decyzyjnosci.
- Wersjonuj flow, prompty i bazy wiedzy.
- Testuj architekturę na przypadkach granicznych.
- Miej plan degradacji: LLM niedostepny, RAG niedostepny, API niedostepne.

### 3.12.8. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Rule-based dla zbyt otwartej rozmowy | Frustracja i no-match |
| Generative dla procesu wymagajacego scislej kontroli | Ryzyko compliance |
| Intent-based z setkami podobnych intencji | Confusion i utrzymaniowy chaos |
| Brak fallbacku, gdy LLM nie działa | Awaria całego procesu |
| Brak guardrails | Odpowiedzi poza domena |
| Brak testów kosztów | Nieprzewidziany koszt produkcji |

### 3.12.9. Checklista wyboru architektury

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy proces jest prosty czy złożony?
- Czy wymaga naturalnego opisu problemu?
- Czy wymaga decyzji regulowanych?
- Czy potrzebuje bazy wiedzy?
- Czy potrzebuje integracji?
- Czy odpowiedzi muszą być deterministyczne?
- Czy mamy dane treningowe?
- Czy mamy kompetencje utrzymania LLM/RAG?
- Czy latency generatywna jest akceptowalna?
- Czy mamy guardrails i observability?

### 3.12.10. Mini case study

Administracja publiczna chce voicebota do informacji o wnioskach. Wybrano architekturę hybrydowa. Proste statusy ida przez flow i integracje z systemem spraw. Odpowiedzi informacyjne o dokumentach ida przez RAG, ale bot nie interpretuje indywidualnej sytuacji prawnej. Gdy użytkownik pyta "czy w moim przypadku dostane decyzję pozytywna?", bot wyjaśnia, że nie może tego ocenić i może sprawdzić status albo połączyć z urzednikiem.

### 3.12.11. Podsumowanie

Nie istnieje jedna najlepsza architektura voicebota. Dobre rozwiązanie wynika z procesu, ryzyka, danych i oczekiwan użytkownika. W enterprise najczesciej wygrywa hybryda: kontrolowany proces plus elastycznosc AI tam, gdzie naprawde pomaga.

---

## 3.13. Diagramy tekstowe architektury

### 3.13.1. Klasyczny voicebot intent-based

```text
Telefon
  -> Contact Center / SIP Gateway
  -> Audio Stream
  -> ASR
  -> NLU
  -> Dialog Flow
  -> Backend API
  -> Response Template
  -> TTS
  -> Telefon

Rownolegle:
  -> Logs
  -> Metrics
  -> Transcripts
  -> QA Review
```

### 3.13.2. Voicebot hybrydowy flow + LLM + RAG

```text
Telefon/WebRTC
  -> Realtime Audio Runtime
  -> VAD / Endpointing / Turn Detection
  -> ASR
  -> Intent Classifier / LLM Understanding
  -> Dialog Manager
      -> Deterministic Flow
      -> Business Rules
      -> Tool Calling / APIs
      -> RAG Knowledge Retrieval
      -> Guardrails
  -> Response Planner
  -> TTS
  -> Barge-in Monitor
  -> User

Observability:
  -> ASR logs
  -> LLM traces
  -> API traces
  -> latency metrics
  -> handoff reasons
  -> quality dashboard
```

### 3.13.3. Handoff z przekazaniem kontekstu

```text
Voicebot detects handoff condition
  -> Freeze current dialog state
  -> Generate short summary
  -> Attach slots and API results
  -> Set escalation reason
  -> Transfer call to queue
  -> Push context to agent desktop
  -> Consultant continues with context
```

---

## 3.14. Zbiorcza checklista po Części II

Ta checklista zbiera najważniejsze pytania po całej części. Najlepiej przejść ją po zakończeniu projektu rozdziałów i zaznaczyć miejsca, które wymagają decyzji, doprecyzowania albo testów.

- Czy potrafisz narysowac architekturę voicebota end-to-end?
- Czy rozumiesz role telefonii, SIP/VoIP i contact center?
- Czy potrafisz wskazac źródła latency?
- Czy rozumiesz różnice między VAD, endpointing i ASR?
- Czy potrafisz wyjaśnić role NLU i dialog managera?
- Czy wiesz, jak integracje zmieniaja voicebota z informacyjnego w transakcyjnego?
- Czy rozumiesz ryzyka RAG?
- Czy potrafisz projektować tekst pod TTS?
- Czy wiesz, jakie logi są potrzebne do optymalizacji?
- Czy rozumiesz, że handoff jest częścią architektury?
- Czy potrafisz dobrać architekturę rule-based, intent-based, generative lub hybrid?

---
