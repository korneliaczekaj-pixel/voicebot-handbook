# Voicebot Specialist Handbook

## Czesc 3: Architektura voicebota

Wersja robocza: 2026-07-29  
Kontynuacja plikow:

- `Voicebot_Specialist_Handbook_czesc_1.md`
- `Voicebot_Specialist_Handbook_czesc_2.md`

---

# Czesc II. Architektura voicebota

## Cel calej czesci

Ta czesc wyjasnia, jak voicebot dziala "pod maska". Voicebot nie jest jednym modelem ani jednym skryptem dialogowym. Jest lancuchem komponentow pracujacych w czasie rzeczywistym: telefonia, streaming audio, ASR, NLU lub LLM, dialog manager, logika biznesowa, integracje, TTS, monitoring, analityka i human handoff.

Po tej czesci czytelnik powinien umiec:

1. Opisac podstawowy przeplyw audio i danych w voicebocie.
2. Rozumiec role telefonii, SIP, VoIP, gatewaya i contact center.
3. Wyjasnic, co robia ASR, NLU, dialog manager, LLM, RAG i TTS.
4. Wskazac typowe miejsca opoznien i bledow.
5. Rozroznic architekture rule-based, intent-based, generative i hybrid AI.
6. Przygotowac wymagania wysokiego poziomu dla zespolu technicznego.
7. Rozmawiac z architektem, developerem, dostawca platformy i zespołem contact center bez gubienia sensu biznesowego.

Zrodla wspierajace czesc:

- W3C VoiceXML 2.0: historyczny i nadal pouczajacy model dialogow audio, formularzy, gramatyk, zdarzen, promptow i input collection.
- Google Dialogflow CX advanced speech: end-of-speech sensitivity, smart endpointing, no-speech timeout, barge-in, partial response playback.
- AWS Connect i Amazon Lex: streaming ASR, end-of-turn confidence, silence timeout, allow-interrupt, slot-level speech controls.
- LiveKit: pipeline voice agents, VAD, endpointing, turn detection, adaptive interruption handling, aligned transcripts.
- OpenAI Realtime: WebRTC, WebSocket, SIP, VAD, response cancellation, output audio truncation, realtime voice conversations.

---

## Architektura w prostych slowach

Architekture voicebota mozna porownac do dobrze zorganizowanej recepcji telefonicznej. Najpierw ktos odbiera polaczenie i zapewnia, ze dzwiek dociera w dobra strone. Potem ktos zapisuje, co powiedzial klient. Nastepnie ktos interpretuje sens wypowiedzi: czy chodzi o status zamowienia, reklamacje, termin dostawy czy konsultanta. Potem system sprawdza reguly procesu i dane w firmowych systemach. Na koncu uklada odpowiedz, zamienia ja na glos i mowi do uzytkownika.

W prawdziwym voicebocie te "osoby" sa komponentami technicznymi: telefonia, ASR, NLU lub LLM, dialog manager, integracje i TTS. Gdy rozmowa sie psuje, przyczyna moze lezec w dowolnym miejscu. Uzytkownik mowi wyraznie, ale telefonia znieksztalca dzwiek. ASR zapisuje zle slowo. NLU wybiera zla intencje. Integracja nie odpowiada. TTS dziwnie czyta date. Dlatego nie wystarczy powiedziec "AI zle zrozumiala". Trzeba umiec znalezc warstwe, na ktorej powstal blad.

Najprostsza mapa myslenia:

```text
glos -> tekst -> znaczenie -> decyzja -> dane -> odpowiedz -> glos
```

To zdanie jest mala mapa calej architektury. Kazdy rozdzial tej czesci rozwija jeden fragment tej drogi.

---

# Rozdzial 1. Architektura wysokiego poziomu: od glosu uzytkownika do akcji systemu

## 1.1. Cele rozdzialu

Czytelnik nauczy sie:

- opisac pelny przeplyw rozmowy voicebota;
- rozroznic komponenty audio, jezykowe, dialogowe, biznesowe i operacyjne;
- rozumiec, dlaczego blad moze powstac na wielu warstwach;
- przygotowac prosty diagram architektury dla projektu.

## 1.2. Kluczowe pojecia

| Pojecie | Definicja praktyczna |
|---|---|
| Pipeline voicebota | Sekwencja komponentow przetwarzajacych rozmowe od audio do odpowiedzi |
| Audio stream | Strumien dzwieku przesylany w czasie rzeczywistym |
| ASR/STT | Automatic Speech Recognition / Speech-to-Text, zamiana mowy na tekst |
| NLU | Natural Language Understanding, interpretacja intencji i encji |
| Dialog manager | Komponent zarzadzajacy stanem rozmowy i kolejnymi krokami |
| Business logic | Reguly procesu, decyzje, walidacje, obsluga wyjatkow |
| Backend integration | Polaczenie z CRM, ERP, ticketingiem, kalendarzem, platnosciami itd. |
| TTS | Text-to-Speech, zamiana tekstu na mowe |
| Observability | Logi, metryki, tracing, transkrypcje, monitoring jakosci i kosztow |
| Human handoff | Przekazanie rozmowy do konsultanta wraz z kontekstem |

## 1.3. Wyjasnienie eksperckie

Najprostszy przeplyw voicebota wyglada tak:

```text
Uzytkownik mowi
  -> telefonia / kanal audio
  -> streaming audio
  -> VAD / endpointing / turn detection
  -> ASR
  -> NLU lub LLM
  -> dialog manager
  -> logika biznesowa
  -> integracje
  -> odpowiedz tekstowa
  -> TTS
  -> audio do uzytkownika
  -> logi, metryki, transkrypcje, monitoring
```

W praktyce ten przeplyw nie jest liniowy jak fabryczna tasma. Dzieje sie wiele procesow rownolegle:

- system slucha, gdy uzytkownik mowi;
- system moze generowac odpowiedz, zanim ma finalna transkrypcje, jesli architektura wspiera preemptive generation;
- system moze odtwarzac TTS i jednoczesnie nasluchiwac barge-in;
- system moze wywolywac API, a w tym czasie odtwarzac komunikat wypelniajacy cisze;
- monitoring zbiera dane w tle;
- dialog manager aktualizuje stan rozmowy po kazdym kroku.

Uwaga praktyczna:

Voicebot jest tak dobry, jak jego najslabsza warstwa. Swietny LLM nie naprawi zlej telefonii, a dobry ASR nie naprawi scenariusza, ktory pyta o trzy rzeczy naraz.

## 1.4. Perspektywa biznesowa

Architektura decyduje o:

- czasie reakcji;
- koszcie rozmowy;
- mozliwosci skalowania;
- jakosci rozumienia;
- poziomie kontroli nad odpowiedziami;
- latwosci integracji;
- ryzyku compliance;
- latwosci pozniejszej optymalizacji.

Dla biznesu architektura nie jest "tematem IT". To wybor modelu operacyjnego. Inna architektura pasuje do prostego statusu zamowienia, inna do voicebota medycznego, inna do generatywnego helpdesku IT.

## 1.5. Perspektywa uzytkownika

Uzytkownik nie widzi architektury, ale czuje jej konsekwencje:

- czy bot odpowiada szybko;
- czy ucina wypowiedzi;
- czy pozwala przerwac;
- czy poprawnie czyta nazwiska, daty, numery i kwoty;
- czy pamieta kontekst;
- czy sprawa zostaje wykonana, a nie tylko omowiona;
- czy konsultant po przekazaniu wie, co sie dzialo.

## 1.6. Perspektywa technologiczna

Kazdy komponent ma wejscia, wyjscia i ryzyka:

| Komponent | Wejscie | Wyjscie | Typowe ryzyka |
|---|---|---|---|
| Telefonia | Polaczenie glosowe | Strumien audio | Kodeki, jitter, echo, opoznienia |
| VAD | Audio | Informacja: mowa/brak mowy | Szum jako mowa, cicha mowa jako cisza |
| Endpointing | Audio/ASR partials | Decyzja: koniec tury | Ucinanie lub martwa cisza |
| ASR | Audio | Transkrypcja | Akcent, halas, nazwy wlasne, cyfry |
| NLU | Tekst | Intencja, encje | Bledna klasyfikacja, brak danych |
| LLM | Tekst/kontekst | Odpowiedz/decyzja/narzedzie | Halucynacje, latency, koszt |
| Dialog manager | Stan + interpretacja | Nastepny krok | Utrata kontekstu, zly fallback |
| Integracje | Zapytania API | Dane/akcje | Timeouty, bledy, brak spojnosci |
| TTS | Tekst | Audio | Zla wymowa, tempo, nienaturalnosc |
| Monitoring | Zdarzenia/logi | Metryki/alerty | Brak danych do diagnostyki |

## 1.7. Dobre praktyki

- Rysuj architekture jako przeplyw audio, tekstu, decyzji i danych.
- Oznacz miejsca, gdzie powstaje latency.
- Oznacz miejsca, gdzie trzeba logowac decyzje.
- Oddziel stan rozmowy od tekstu generowanej odpowiedzi.
- Projektuj fallback dla kazdego komponentu krytycznego.
- Wymagaj testow end-to-end przez prawdziwy kanal.
- Nie oceniaj voicebota tylko na podstawie demo w przegladarce.

## 1.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Brak diagramu architektury | Interesariusze nie rozumieja zaleznosci i kosztow |
| Traktowanie voicebota jako jednego komponentu | Trudna diagnostyka |
| Brak logowania ASR partials i decyzji dialogowych | Nie wiadomo, czemu bot zle odpowiedzial |
| Brak planu timeoutow integracji | Cisza lub przypadkowe fallbacki |
| Brak osobnej polityki handoff | Konsultant dostaje klienta bez kontekstu |

## 1.9. Checklista architektury wysokiego poziomu

- Czy mamy rozrysowany przeplyw audio?
- Czy wiemy, gdzie konczy sie telefonia, a zaczyna voice platform?
- Czy znamy ASR, NLU/LLM i TTS?
- Czy dialog manager przechowuje stan rozmowy?
- Czy integracje maja retry, timeout i fallback?
- Czy TTS mozna przerwac?
- Czy system loguje transkrypcje, intencje, encje, zdarzenia, metryki?
- Czy handoff przekazuje kontekst do konsultanta?
- Czy mamy plan awarii dla komponentow krytycznych?

## 1.10. Mini case study

Firma kurierska wdraza voicebota do statusu przesylek. Pierwsza architektura ma ASR, NLU i odpowiedzi TTS, ale brak integracji z systemem sledzenia. Bot rozpoznaje intencje "status paczki", ale i tak odsyla do strony internetowej. Po zmianie architektury dodano identyfikacje po numerze telefonu, integracje tracking API, potwierdzenie przesylki i handoff dla statusow spornych. Dopiero wtedy bot zaczal realnie rozwiazywac sprawe.

## 1.11. Cwiczenia

1. Narysuj tekstowy diagram architektury voicebota do umawiania wizyt.
2. Wskaz trzy miejsca, gdzie moze powstac latency.
3. Wskaz trzy miejsca, gdzie trzeba logowac decyzje.
4. Opisz fallback, gdy integracja CRM nie odpowiada.

## 1.12. Podsumowanie

Architektura voicebota to lancuch decyzji o dzwieku, jezyku, dialogu, danych i operacjach. Specjalista nie musi byc inzynierem kazdego komponentu, ale musi rozumiec zaleznosci, bo to one decyduja o jakosci rozmowy.

---

# Rozdzial 2. Kanal telefoniczny, SIP, VoIP, contact center i telephony gateway

## 2.1. Cele rozdzialu

Czytelnik nauczy sie:

- rozumiec podstawy kanalu telefonicznego;
- wyjasnic role SIP, VoIP i gatewaya;
- wiedziec, jak voicebot laczy sie z contact center;
- rozpoznawac ograniczenia telefonii w projektowaniu rozmowy.

## 2.2. Kluczowe pojecia

| Pojecie | Definicja praktyczna |
|---|---|
| PSTN | Klasyczna publiczna siec telefoniczna |
| VoIP | Przesylanie glosu przez siec IP |
| SIP | Protokol inicjowania, modyfikowania i konczenia sesji komunikacyjnych |
| RTP | Protokol transportu mediow, np. audio w czasie rzeczywistym |
| Telephony gateway | Warstwa laczaca telefonie z aplikacja voicebota |
| Contact center platform | System obslugi kolejek, konsultantow, routingow, nagran i raportow |
| DTMF | Tonowe sygnaly klawiatury telefonu |
| Call transfer | Przekazanie rozmowy do innej kolejki lub konsultanta |
| ANI/CLI | Numer dzwoniacego, jesli dostepny |

## 2.3. Wyjasnienie eksperckie

Voicebot telefoniczny nie zaczyna sie w modelu AI. Zaczyna sie od polaczenia. Uzytkownik dzwoni, siec telefoniczna zestawia rozmowe, contact center albo gateway odbiera polaczenie, a audio jest przekazywane do systemu voicebota.

Typowy przeplyw:

```text
Telefon uzytkownika
  -> operator / PSTN / VoIP
  -> SIP trunk lub platforma contact center
  -> telephony gateway
  -> voicebot runtime
  -> ASR / dialog / TTS
  -> powrot audio do uzytkownika
```

SIP jest czesto warstwa sygnalizacyjna: kto dzwoni, dokad, kiedy odebrano, kiedy rozlaczono, jak przekazac rozmowe. Audio najczesciej plynie osobnym strumieniem mediow. Dla Voicebot Specialist najwazniejsze nie jest recytowanie szczegolow protokolow, ale rozumienie konsekwencji:

- telefonia dodaje opoznienia;
- kodeki moga ograniczac jakosc audio;
- przekazanie do konsultanta wymaga zachowania kontekstu;
- nagrania i transkrypcje podlegaja zasadom prawnym;
- DTMF moze byc potrzebne dla kodow, wyborow i awaryjnej obslugi;
- caller ID moze pomoc w identyfikacji, ale nie moze byc jedyna weryfikacja w procesach wrazliwych.

## 2.4. Perspektywa biznesowa

Telefonia decyduje o mozliwosci wdrozenia w realnym contact center:

- Czy voicebot moze odbierac czesc ruchu?
- Czy moze oddac rozmowe do odpowiedniej kolejki?
- Czy konsultant zobaczy transkrypcje i podsumowanie?
- Czy da sie mierzyc kolejki, transfery i abandoned calls?
- Czy system dziala w godzinach szczytu?
- Czy koszt minut audio jest przewidywalny?

Dla biznesu wazne jest tez, czy voicebot bedzie warstwa przed contact center, elementem platformy contact center, czy osobna usluga polaczona przez SIP/API.

## 2.5. Perspektywa uzytkownika

Uzytkownik odczuwa telefonie jako:

- jakosc dzwieku;
- opoznienie;
- martwa cisze;
- latwosc lub trudnosc przekazania do konsultanta;
- koniecznosc powtarzania danych po transferze;
- przerwanie rozmowy przy blednym przekazaniu.

Najgorszy handoff to taki, w ktorym uzytkownik po pieciu minutach rozmowy z botem slyszy od konsultanta: "W czym moge pomoc?". To sygnal, ze architektura nie przekazala kontekstu.

## 2.6. Perspektywa technologiczna

Wymagania techniczne dla telefonii:

- obsluga inbound i/lub outbound;
- SIP trunk lub natywna integracja contact center;
- streaming audio do ASR/voice runtime;
- obsluga DTMF;
- transfer blind/attended, zalezne od platformy;
- przekazywanie metadanych rozmowy;
- nagrywanie i/lub eksport audio;
- synchronizacja transkrypcji z audio;
- monitoring jakosci polaczenia;
- mechanizmy awaryjne.

## 2.7. Dobre praktyki

- Testuj voicebota przez ten sam kanal, ktory bedzie na produkcji.
- Nie oceniaj ASR na podstawie studyjnych nagran, jesli produkcja to telefon.
- Zachowaj DTMF jako alternatywe w krytycznych danych.
- Projektuj handoff jako przeplyw danych, nie tylko transfer audio.
- Ustal, kto jest wlascicielem nagran: platforma contact center, voicebot czy klient.
- Uzgodnij retencje i dostepy do nagran oraz transkrypcji.

## 2.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Testowanie tylko w aplikacji webowej | Produkcyjna telefonia zachowuje sie inaczej |
| Brak DTMF fallback | Problemy z numerami, kodami i halasem |
| Brak przekazania kontekstu do konsultanta | Powtarzanie danych i frustracja |
| Nieuzgodnione nagrywanie | Ryzyko prawne |
| Brak monitoringu jakosci polaczenia | Trudno odroznic blad bota od zlego audio |

## 2.9. Checklista telefonii

- Czy znamy kanal: PSTN, VoIP, WebRTC, SIP?
- Czy znamy kodeki i jakosc audio?
- Czy voicebot bedzie przed contact center czy w srodku platformy?
- Czy transfer do konsultanta jest technicznie wspierany?
- Czy przekazujemy kontekst rozmowy?
- Czy obslugujemy DTMF?
- Czy nagrywamy rozmowy?
- Czy informujemy o nagrywaniu i automatyzacji?
- Czy testujemy outbound, jesli dotyczy?
- Czy mamy plan awarii, gdy voicebot nie odpowiada?

## 2.10. Mini case study

Przychodnia wdraza voicebota do potwierdzania wizyt outbound. Technicznie bot dziala dobrze w testach webowych, ale w telefonii czesc pacjentow odpowiada bardzo krotko: "tak", "nie", "przelozyc". ASR w slabej jakosci polaczenia myli "nie" z szumem. Zespol dodaje DTMF jako alternatywe: "Moze pani powiedziec tak lub nacisnac 1". Completion rate rosnie, bo architektura uwzglednia realny kanal.

## 2.11. Cwiczenia

1. Opisz, jak voicebot bedzie polaczony z contact center w twoim projekcie.
2. Wskaz, ktore dane trzeba przekazac konsultantowi.
3. Zaprojektuj fallback DTMF dla kodu SMS.
4. Wypisz ryzyka prawne zwiazane z nagrywaniem.

## 2.12. Podsumowanie

Telefonia nie jest dodatkiem do voicebota. Jest jego srodowiskiem pracy. Jakosc polaczenia, transfery, DTMF, nagrania i kontekst handoff bezposrednio wplywaja na to, czy automatyzacja bedzie dzialac w prawdziwym contact center.

---

# Rozdzial 3. Streaming audio, latency i czas rzeczywisty

## 3.1. Cele rozdzialu

Czytelnik nauczy sie:

- rozumiec, czym jest streaming audio;
- wskazac zrodla opoznien w voicebocie;
- projektowac rozmowe z uwzglednieniem latency;
- rozumiec roznice miedzy WebRTC, WebSocket i SIP na poziomie odpowiedzialnosci projektowej.

## 3.2. Kluczowe pojecia

| Pojecie | Definicja praktyczna |
|---|---|
| Streaming audio | Przesylanie dzwieku na biezaco, w malych fragmentach |
| Frame | Krotki blok audio, np. kilkanascie lub kilkadziesiat ms |
| Latency | Opoznienie od zdarzenia do reakcji systemu |
| Jitter | Zmiennosc opoznienia pakietow |
| Buffer | Bufor przechowujacy fragmenty audio |
| Realtime agent | Agent reagujacy w czasie rozmowy, bez dlugiego oczekiwania na pelne nagranie |
| WebRTC | Technologia realtime audio/wideo, czesto uzywana w aplikacjach webowych |
| WebSocket | Dwukierunkowe polaczenie do przesylania zdarzen i danych, w tym audio |
| SIP | Czesciowo standardowy sposob laczenia z telefonia/contact center |

## 3.3. Wyjasnienie eksperckie

Voicebot nie powinien czekac, az uzytkownik skonczy cala rozmowe i dopiero potem przetwarzac audio. Musi przetwarzac strumien na biezaco:

- VAD wykrywa, czy pojawia sie mowa.
- ASR generuje partial transcripts.
- Endpointing decyduje, czy tura uzytkownika sie skonczyla.
- Dialog manager przygotowuje odpowiedz.
- TTS zaczyna syntezowac audio.
- System monitoruje, czy uzytkownik nie przerywa.

Latency voicebota sklada sie z wielu malych opoznien:

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

Dla uzytkownika liczy sie calosc, nie to, ktory komponent byl szybki. Bot z szybkim LLM, ale wolnym endpointingiem i wolnym TTS, nadal brzmi wolno.

## 3.4. Perspektywa biznesowa

Latency wplywa na:

- AHT;
- abandonment;
- frustracje;
- liczbe powtorzen;
- eskalacje;
- koszt minut rozmowy;
- postrzegana kompetencje bota.

W procesach wysokowolumenowych nawet 1 sekunda dodatkowego czasu na rozmowe moze generowac duzy koszt. Ale zbyt agresywne skracanie latency moze zwiekszyc ucinanie wypowiedzi i bledy. Optymalizacja latency to balans, nie wyscig do najnizszej liczby.

## 3.5. Perspektywa uzytkownika

Uzytkownik interpretuje opoznienia psychologicznie:

- krotka pauza po trudnym pytaniu moze brzmiec naturalnie;
- dluga cisza po prostym "tak" brzmi jak awaria;
- odpowiedz zbyt szybka po zlozonej wypowiedzi moze brzmiec jak brak sluchania;
- bot mowiacy podczas przerwania brzmi jak ignorujacy.

Projektowanie latency musi uwzgledniac typ dialogu. Potwierdzenie "tak/nie" powinno byc szybkie. Analiza reklamacji moze miec krotki filler: "Sprawdzam to".

## 3.6. Perspektywa technologiczna

W nowoczesnych architekturach:

- WebRTC i SIP moga pozwalac serwerowi zarzadzac buforem audio i ucinaniem nieodtworzonego audio przy przerwaniu.
- WebSocket czesto oznacza, ze klient zarzadza playbackiem, wiec musi sam zatrzymywac audio i synchronizowac truncation.
- Realtime modele moga skrocic pipeline, ale wymagaja innych mechanizmow kontroli, monitoringu i testow.

Wazne parametry:

- czas do pierwszego tokenu/fragmentu odpowiedzi;
- czas do pierwszego audio TTS;
- end-of-turn delay;
- latency integracji;
- latency zatrzymania TTS po barge-in;
- jitter i utrata pakietow.

## 3.7. Dobre praktyki

- Mierz latency end-to-end, nie tylko latency modelu.
- Mierz osobno: endpointing, ASR, LLM/NLU, API, TTS, playback.
- Projektuj filler prompts dla dlugich integracji.
- Nie otwieraj mikrofonu na kolejny slot, jesli backend jeszcze nie jest gotowy.
- Testuj w realnej sieci i przez telefonie.
- Ustal budzet latency dla kazdego typu kroku.
- Optymalizuj najpierw miejsca najczesciej wystepujace.

## 3.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Mierzenie tylko czasu odpowiedzi LLM | Pomija ASR, TTS, endpointing i telefonie |
| Brak fillerow przy API | Martwa cisza |
| Za niski endpointing timeout | Ucinanie uzytkownika |
| Za wysoki endpointing timeout | Rozmowa brzmi ospale |
| Brak pomiaru latency barge-in | Bot przegaduje uzytkownika |
| Za dlugie prompt'y | Wysokie AHT i wiecej przerwan |

## 3.9. Checklista latency

- Czy mamy budzet latency dla typowej tury?
- Czy mierzymy end-of-turn delay?
- Czy mierzymy czas ASR?
- Czy mierzymy czas integracji?
- Czy mierzymy czas TTS?
- Czy mierzymy czas zatrzymania TTS po przerwaniu?
- Czy mamy filler dla operacji dluzszych niz ok. 1-2 sekundy?
- Czy bot nie mowi, zanim dane sa gotowe?
- Czy rozne sloty maja rozne ustawienia endpointing?

## 3.10. Mini case study

Voicebot bankowy podczas weryfikacji klienta wywoluje API antyfraudowe, ktore czasem odpowiada po 4 sekundach. Pierwsza wersja bota milczy. Uzytkownicy mowia "halo?" albo przerywaja. Druga wersja odtwarza krotki komunikat: "Chwileczke, sprawdzam dane", ale nie otwiera jeszcze kolejnego pytania. Barge-in pozostaje wlaczony, aby uzytkownik mogl poprosic o konsultanta. Martwa cisza spada, a liczba porzuconych rozmow maleje.

## 3.11. Cwiczenia

1. Rozpisz budzet latency dla procesu statusu zamowienia.
2. Wskaz, ktory krok moze byc najwolniejszy.
3. Zaprojektuj filler prompt dla sprawdzania danych.
4. Okresl, gdzie latency moze byc akceptowalna, a gdzie nie.

## 3.12. Podsumowanie

Realtime w voicebocie to nie tylko szybki model. To zsynchronizowany system audio, decyzji, API i TTS. Naturalna rozmowa wymaga kontroli opoznien, endpointing i przerwan w kazdym kroku.

---

# Rozdzial 4. ASR: od mowy do tekstu

## 4.1. Cele rozdzialu

Czytelnik nauczy sie:

- rozumiec role ASR w voicebocie;
- rozpoznawac czynniki pogarszajace rozpoznawanie;
- projektowac dialogi odporne na bledy ASR;
- wspolpracowac z zespolami technicznymi przy testach ASR.

## 4.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| ASR/STT | Technologia zamiany mowy na tekst |
| Transcript | Transkrypcja wypowiedzi |
| Partial transcript | Czesciowa hipoteza ASR podczas mowienia |
| Final transcript | Ustabilizowana transkrypcja po zakonczeniu tury |
| Confidence | Ocena pewnosci rozpoznania |
| Word error rate | Metryka bledow transkrypcji |
| Custom vocabulary | Slownik nazw, terminow, produktow, skrótow |
| Diarization | Rozroznianie mowcow |
| Noise robustness | Odpornosc na halas |

## 4.3. Wyjasnienie eksperckie

ASR jest pierwsza warstwa interpretacji jezyka. Jesli ASR zle przepisze wypowiedz, kolejne komponenty moga podjac zla decyzje. Ale ASR nie musi byc idealny, aby voicebot dzialal. Musi byc wystarczajaco dobry dla konkretnego procesu i zaprojektowany z mechanizmami naprawy.

Przyklady bledow ASR:

- "Kwiatowa osiem" -> "światowa 8";
- "nie" -> brak rozpoznania;
- "PESEL" -> losowy ciag slow;
- nazwa firmy -> zwykle slowo;
- "chce konsultanta" -> "chce konsultacje";
- numer "15" -> "50".

Dobry projekt zaklada, ze ASR bedzie sie mylil przy:

- nazwach wlasnych;
- cyfrach;
- adresach;
- kodach;
- obcych nazwach;
- mowie w halasie;
- krotkich odpowiedziach;
- emocjach i podniesionym glosie.

## 4.4. Perspektywa biznesowa

Jakosc ASR wplywa na:

- task completion;
- liczbe powtorzen;
- czas rozmowy;
- frustracje;
- bledy transakcyjne;
- koszt obslugi;
- zaufanie do automatyzacji.

Nie kazdy blad ASR ma ten sam koszt. Bledne rozpoznanie pytania FAQ moze skonczyc sie fallbackiem. Bledne rozpoznanie numeru konta, adresu dostawy albo zgody moze miec realne skutki finansowe lub prawne.

## 4.5. Perspektywa uzytkownika

Uzytkownik nie wie, czy zawinil ASR, NLU czy integracja. Slyszy tylko:

- "bot mnie nie rozumie";
- "musze powtarzac";
- "bot przekrecil moje dane";
- "system nie radzi sobie z moim nazwiskiem";
- "lepiej poczekam na czlowieka".

Dlatego komunikaty naprawcze nie powinny obwiniac uzytkownika. Zamiast "Powiedzial pan niepoprawnie" lepiej: "Nie mam pewnosci, czy dobrze uslyszalem. Prosze powtorzyc numer powoli, po trzy cyfry."

## 4.6. Perspektywa technologiczna

Wymagania ASR:

- jezyk i wariant jezyka;
- model telefoniczny lub szerokopasmowy;
- streaming partials;
- timestampy;
- confidence;
- custom vocabulary;
- wsparcie dla cyfr, dat, kwot;
- diarization, jesli potrzebna;
- mozliwosc eksportu audio i transkrypcji;
- zgodnosc z retencja danych.

Ustawienia ASR powinny byc zalezne od kontekstu. Dla "tak/nie" potrzebna jest szybka detekcja. Dla numeru klienta trzeba tolerowac pauzy. Dla opisu reklamacji potrzebne jest dluzsze okno i lepsze przetwarzanie swobodnej mowy.

## 4.7. Dobre praktyki

- Testuj ASR na realnych nagraniach telefonicznych.
- Zbieraj frazy i nazwy charakterystyczne dla domeny.
- Uzywaj custom vocabulary dla produktow, miejsc, marek, skrótow.
- Projektuj potwierdzenia dla danych wysokiego ryzyka.
- Dziel dlugie numery na grupy.
- Daj alternatywe DTMF dla kodow i numerow.
- Analizuj ASR errors osobno od NLU errors.
- Nie oceniaj ASR tylko na podstawie ogolnego WER; oceniaj skutki dla procesu.

## 4.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Brak testow na realnym audio | Produkcja gorsza niz demo |
| Brak slownika domenowego | Bledy nazw produktow i firm |
| Brak potwierdzen dla danych krytycznych | Ryzyko blednej akcji |
| Za szybkie endpointing przy cyfrach | Ucinanie numerow |
| Traktowanie confidence jako prawdy | Bledne decyzje przy pewnych, ale zlych transkrypcjach |
| Brak zapisu audio do diagnostyki | Trudno poprawic system |

## 4.9. Checklista ASR

- Czy ASR jest dobrany do kanalu telefonicznego?
- Czy wspiera jezyk i wariant regionalny?
- Czy mamy custom vocabulary?
- Czy testujemy akcenty, halas, osoby starsze, szybka mowe?
- Czy mamy partials i final transcripts?
- Czy mamy timestampy?
- Czy dane krytyczne sa potwierdzane?
- Czy istnieje DTMF fallback?
- Czy analizujemy bledy ASR w raportach?
- Czy retencja audio/transkrypcji jest zgodna z polityka?

## 4.10. Mini case study

Voicebot ubezpieczeniowy zbiera numer polisy. Uzytkownicy mowia numer w roznych grupach: "AB 123 45", "A B jeden dwa trzy", "a-be sto dwadziescia trzy". ASR myli litery i cyfry. Zespol zmienia projekt: bot prosi o numer w grupach, potwierdza kazda grupe, pozwala uzyc klawiatury telefonu i dodaje slownik prefiksow polis. Spada liczba nieudanych identyfikacji.

## 4.11. Cwiczenia

1. Wypisz 20 slow domenowych, ktore powinny byc w custom vocabulary.
2. Zaprojektuj potwierdzenie dla adresu.
3. Zaprojektuj zbieranie numeru klienta w grupach.
4. Opisz, jak odroznisz blad ASR od bledu NLU.

## 4.12. Podsumowanie

ASR nie jest neutralnym przepisywaczem mowy. Jest zrodlem niepewnosci, ktora trzeba projektowac, testowac i monitorowac. Dobry voicebot nie zaklada idealnej transkrypcji, tylko umie dzialac mimo jej niedoskonalosci.

---

# Rozdzial 5. NLU/NLP: intencje, encje, sloty i rozumienie wypowiedzi

## 5.1. Cele rozdzialu

Czytelnik nauczy sie:

- rozumiec role NLU w voicebocie;
- definiowac intencje, encje i sloty;
- odrozniac klasyfikacje intencji od zarzadzania dialogiem;
- rozpoznawac ograniczenia NLU w kanale glosowym.

## 5.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Intent | Cel wypowiedzi uzytkownika, np. "sprawdz_status" |
| Entity | Informacja wyodrebniona z wypowiedzi, np. data, miasto, numer |
| Slot | Pole wymagane do wykonania zadania, np. numer zamowienia |
| Utterance | Przykladowa wypowiedz uzytkownika |
| Confidence | Pewnosc klasyfikacji |
| Disambiguation | Doprecyzowanie, gdy mozliwych jest kilka interpretacji |
| Multi-intent | Wypowiedz zawierajaca wiecej niz jeden cel |
| Context | Stan rozmowy, ktory zmienia interpretacje wypowiedzi |

## 5.3. Wyjasnienie eksperckie

NLU odpowiada na pytanie: "Co uzytkownik probuje zrobic i jakie informacje juz podal?". Przyklad:

Uzytkownik: "Chce przelozyc dostawe na piatek po poludniu."

Mozliwa interpretacja:

```text
intent: change_delivery_date
entities:
  date: piatek
  time_preference: po poludniu
slots filled:
  desired_date = piatek
  desired_time_window = afternoon
```

NLU nie powinno samo decydowac, czy zmiana jest mozliwa. To nalezy do logiki biznesowej i integracji. NLU rozpoznaje znaczenie wypowiedzi, dialog manager decyduje, co dalej, a backend sprawdza realne mozliwosci.

W kanale glosowym NLU pracuje na transkrypcji ASR, wiec dostaje tekst potencjalnie bledny. Dlatego klasy intencji musza byc projektowane z uwzglednieniem:

- typowych bledow transkrypcji;
- krotkich odpowiedzi;
- przerwan;
- korekt;
- niepelnych zdan;
- emocji;
- wielointencyjnosci.

## 5.4. Perspektywa biznesowa

Model intencji jest mapa procesow firmy. Jesli intencje sa zle zaprojektowane, bot nie tylko zle rozumie jezyk, ale tez zle odzwierciedla biznes.

Zly model:

- jedna intencja "reklamacja" obejmuje fakture, produkt, dostawe, platnosc, zwrot i gwarancje;
- brak oddzielnej intencji "konsultant";
- brak intencji korekty;
- brak intencji "nie wiem";
- brak intencji "anuluj".

Dobry model:

- rozdziela sprawy wedlug akcji, danych i procesu;
- ma intencje obslugowe i meta-intencje;
- przewiduje korekty, eskalacje i zmiane tematu;
- jest powiazany z raportowaniem.

## 5.5. Perspektywa uzytkownika

Uzytkownik mowi po swojemu:

- "gdzie jest paczka";
- "kurier mial byc wczoraj";
- "nie mam przesylki";
- "chce wiedziec, co z moim zamowieniem";
- "zmiencie mi adres, bo tam nikogo nie bedzie";
- "dobra, jednak konsultant".

Bot nie powinien wymagac idealnych komend. Ale nie powinien tez udawac, ze rozumie, gdy pewnosc jest niska. Lepiej dopytac:

"Czy chodzi o sprawdzenie statusu przesylki, czy o zmiane adresu dostawy?"

## 5.6. Perspektywa technologiczna

NLU moze byc:

- klasycznym modelem intencji i encji;
- czescia platformy dialogowej;
- klasyfikatorem LLM;
- hybryda reguł, modeli i LLM;
- osobnym serwisem w architekturze.

Wymagania:

- lista intencji;
- definicje intencji;
- pozytywne i negatywne przyklady;
- encje systemowe i domenowe;
- slowniki;
- threshold confidence;
- strategie disambiguation;
- analiza confusion matrix;
- wersjonowanie modelu;
- test set oddzielony od training set.

## 5.7. Dobre praktyki

- Projektuj intencje wedlug celu uzytkownika, nie struktury organizacyjnej firmy.
- Nie tworz zbyt podobnych intencji bez dobrych danych.
- Dodaj intencje meta: konsultant, powtorz, anuluj, stop, nie rozumiem.
- Oddziel intencje informacyjne od transakcyjnych.
- Testuj multi-intent.
- Regularnie analizuj nierozpoznane wypowiedzi.
- Utrzymuj dataset testowy.
- Nie zmieniaj modelu bez testow regresji.

## 5.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Zbyt szerokie intencje | Bot rozumie ogolny temat, ale nie wie, co zrobic |
| Zbyt waskie intencje | Confusion i trudne utrzymanie |
| Brak negatywnych przykladow | Model myli podobne sprawy |
| Brak intencji korekty | Przerwania psuja flow |
| Brak intencji eskalacji | Uzytkownik walczy z botem |
| Trenowanie na sztucznych frazach bez walidacji | Produkcja rozni sie od testow |

## 5.9. Checklista NLU

- Czy kazda intencja ma jasna definicje?
- Czy intencje odpowiadaja akcjom/procesom?
- Czy mamy przyklady realnych wypowiedzi?
- Czy mamy negatywne przyklady?
- Czy encje sa potrzebne do wykonania zadania?
- Czy sloty maja walidacje?
- Czy jest strategia niskiej pewnosci?
- Czy jest disambiguation?
- Czy analizujemy confusion matrix?
- Czy model ma wersjonowanie i testy regresji?

## 5.10. Mini case study

W telekomie intencje "awaria internetu", "wolny internet" i "brak internetu" myla sie w modelu. Biznes chce trzy osobne raporty, ale uzytkownicy mowia podobnie. Zespol zmienia model: jedna intencja "problem_z_internetem", a typ problemu zbierany jest jako slot po pytaniu doprecyzowujacym. Model staje sie stabilniejszy, a biznes nadal dostaje raport przez slot "problem_type".

## 5.11. Cwiczenia

1. Zaprojektuj 10 intencji dla voicebota e-commerce.
2. Dla trzech intencji napisz po 10 fraz uzytkownika.
3. Wskaz dwie intencje, ktore moga sie mylic.
4. Zaprojektuj pytanie disambiguation.

## 5.12. Podsumowanie

NLU jest mostem miedzy jezykiem uzytkownika a procesem biznesowym. Dobre intencje nie sa lista tematow, lecz mapa tego, co uzytkownik chce osiagnac i jakie dane sa potrzebne, aby system mogl dzialac.

---

# Rozdzial 6. Dialog manager, business logic i zarzadzanie stanem

## 6.1. Cele rozdzialu

Czytelnik nauczy sie:

- rozumiec roznice miedzy NLU a dialog managerem;
- projektowac stan rozmowy;
- rozpoznawac role logiki biznesowej;
- przygotowac wymagania dla flow, slot filling, fallback i recovery.

## 6.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Dialog manager | Komponent decydujacy o nastepnym kroku rozmowy |
| State | Aktualny stan rozmowy i zebrane informacje |
| Slot filling | Proces zbierania brakujacych danych |
| Policy | Regula decydujaca, co bot robi w danej sytuacji |
| Context stack | Pamiec aktywnych tematow i procesow |
| Recovery | Powrot do sensownego miejsca po bledzie lub przerwaniu |
| Business rule | Regula biznesowa, np. "adres mozna zmienic tylko przed wysylka" |
| Transaction boundary | Moment, w ktorym akcja zostaje zatwierdzona |

## 6.3. Wyjasnienie eksperckie

NLU mowi: "uzytkownik chce zmienic adres". Dialog manager pyta: "czy mamy wszystkie dane i co teraz?". Business logic sprawdza: "czy adres mozna jeszcze zmienic dla tego zamowienia?".

Przyklad stanu:

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

- pamietac, co juz zebrano;
- wracac po przerwaniu;
- obslugiwac korekty;
- unikac powtarzania pytan;
- przekazac kontekst konsultantowi;
- logowac proces.

## 6.4. Perspektywa biznesowa

Business logic chroni proces przed blednymi akcjami. Przyklady:

- nie mozna anulowac zamowienia po wysylce;
- nie mozna zmienic adresu po przekazaniu kurierowi;
- nie mozna udzielic informacji o polisie bez weryfikacji;
- nie mozna zarezerwowac terminu, ktory jest juz zajety;
- nie mozna przyjac zgody, jesli uzytkownik przerwal wymagany komunikat.

Dialog manager musi wiedziec, kiedy pytac dalej, kiedy wykonac akcje, kiedy powiedziec "nie moge tego zrobic" i kiedy eskalowac.

## 6.5. Perspektywa uzytkownika

Dobry stan rozmowy sprawia, ze uzytkownik czuje:

- "bot pamieta, co powiedzialem";
- "nie musze zaczynac od nowa";
- "mogę poprawic jeden element";
- "system wie, gdzie jestesmy w procesie".

Zly stan rozmowy objawia sie jako:

- powtarzanie tych samych pytan;
- reset po przerwaniu;
- utrata danych po fallbacku;
- przekazanie konsultantowi bez kontekstu.

## 6.6. Perspektywa technologiczna

State management musi byc:

- jawny;
- wersjonowany;
- odporny na przerwania;
- zgodny z retencja danych;
- ograniczony do danych potrzebnych;
- dostepny dla handoff;
- logowany w sposob bezpieczny.

W voicebotach LLM wazne jest oddzielenie:

- stabilnego stanu procesu;
- historii rozmowy;
- aktualnego planu odpowiedzi;
- generowanego tekstu;
- wyniku narzedzi/API.

Jesli LLM generuje odpowiedz, ale uzytkownik przerywa, stan nie powinien slepo przejsc dalej. Trzeba wiedziec, czy akcja zostala wykonana, czy tylko zapowiedziana.

## 6.7. Dobre praktyki

- Zapisuj stan jako jawne pola, nie tylko historie czatu.
- Oddziel dane potwierdzone od niepotwierdzonych.
- Projektuj korekte slotu.
- Projektuj anulowanie akcji.
- Projektuj recovery po przerwaniu.
- Projektuj licznik fallbackow.
- Ustal granice transakcji.
- Przekazuj stan do konsultanta w czytelnym podsumowaniu.

## 6.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Trzymanie stanu tylko w promptcie LLM | Nieprzewidywalnosc i utrata kontroli |
| Brak rozroznienia danych potwierdzonych | Bledne akcje |
| Brak korekty slotu | Uzytkownik musi zaczynac od nowa |
| Brak transaction boundary | Bot moze sugerowac wykonanie akcji, ktora sie nie wykonala |
| Brak context handoff | Konsultant nie wie, co sie dzialo |

## 6.9. Checklista dialog managera

- Czy kazdy proces ma jasno opisane stany?
- Czy wiemy, jakie sloty sa wymagane?
- Czy kazdy slot ma walidacje?
- Czy dane krytyczne sa potwierdzane?
- Czy mozna poprawic pojedynczy slot?
- Czy jest licznik fallbackow?
- Czy jest polityka eskalacji?
- Czy stan jest przekazywany do konsultanta?
- Czy LLM nie jest jedynym miejscem przechowywania stanu?
- Czy wiemy, kiedy akcja jest formalnie zatwierdzona?

## 6.10. Mini case study

Voicebot rezerwacyjny zbiera date i godzine wizyty. Uzytkownik mowi: "Nie, jednak czwartek". W pierwszej wersji bot interpretuje to jako nowa rozmowe i pyta od poczatku o specjalizacje. Po poprawie stan rozmowy przechowuje specjalizacje, lokalizacje i lekarza, a korekta dotyczy tylko slotu `appointment_date`. Bot mowi: "Zmieniam date na czwartek. Godzina 15:30 nadal pasuje?"

## 6.11. Cwiczenia

1. Zdefiniuj stan dla procesu zmiany adresu dostawy.
2. Oznacz dane potwierdzone i niepotwierdzone.
3. Zaprojektuj korekte jednego slotu.
4. Opisz, co przekazesz konsultantowi po handoff.

## 6.12. Podsumowanie

Dialog manager jest sercem voicebota procesowego. To on sprawia, ze rozmowa nie jest seria losowych odpowiedzi, lecz kontrolowana droga do wyniku. W voicebotach generatywnych jawny stan jest jeszcze wazniejszy, bo chroni proces przed nieprzewidywalnoscia modelu.

---

# Rozdzial 7. Integracje backendowe i logika procesow

## 7.1. Cele rozdzialu

Czytelnik nauczy sie:

- rozumiec, po co voicebotowi integracje;
- projektowac wymagania API dla procesow glosowych;
- przewidywac timeouty, bledy i retry;
- rozumiec, jak integracje wplywaja na UX rozmowy.

## 7.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| API | Interfejs pozwalajacy systemom wymieniac dane |
| Webhook | Wywolanie HTTP do zewnetrznego systemu w reakcji na zdarzenie |
| CRM | System zarzadzania relacjami z klientami |
| ERP | System zarzadzania zasobami firmy |
| Ticketing | System obslugi zgloszen |
| Timeout | Maksymalny czas oczekiwania na odpowiedz systemu |
| Retry | Ponowienie zapytania po bledzie |
| Idempotency | Wlasciwosc, dzieki ktorej ponowienie akcji nie powoduje duplikatu |
| PII | Dane osobowe |

## 7.3. Wyjasnienie eksperckie

Voicebot bez integracji moze informowac. Voicebot z integracjami moze dzialac.

Przyklady:

- status zamowienia: integracja z order management;
- wizyta: integracja z kalendarzem;
- reklamacja: ticketing;
- windykacja: system platnosci i saldo;
- helpdesk IT: system zgloszen, katalog uslug, baza uzytkownikow;
- bank: system autoryzacji, karty, transakcje.

Integracje musza byc projektowane pod rozmowe glosowa. Uzytkownik czeka na linii. Timeout, ktory w aplikacji webowej jest drobnym opoznieniem, w rozmowie telefonicznej staje sie cisza i frustracja.

## 7.4. Perspektywa biznesowa

Integracje decyduja, czy bot:

- realnie rozwiazuje sprawe;
- tylko zbiera dane dla konsultanta;
- tworzy ticket;
- wykonuje transakcje;
- redukuje koszt;
- poprawia jakosc danych.

Najwazniejsze pytania biznesowe:

- Jakie akcje bot moze wykonywac sam?
- Jakie akcje wymagaja potwierdzenia?
- Jakie akcje wymagaja czlowieka?
- Jakie dane bot moze odczytac?
- Jakie dane bot moze zapisac?
- Co robimy, gdy integracja nie odpowiada?

## 7.5. Perspektywa uzytkownika

Uzytkownik odczuwa dobra integracje jako sprawczosc:

"Bot sprawdzil, zmienil, potwierdzil, wyslal."

Zla integracja brzmi jak:

"Nie mam teraz dostepu do tych danych", "prosze zadzwonic pozniej", "polacze z konsultantem" po kilku minutach zbierania informacji.

Jesli bot zbiera dane, a potem integracja pada, komunikat musi byc uczciwy:

"Mam juz potrzebne informacje, ale system rezerwacji teraz nie odpowiada. Moge utworzyc zgloszenie dla konsultanta albo wyslac link do samodzielnej zmiany terminu."

## 7.6. Perspektywa technologiczna

Specyfikacja integracji powinna zawierac:

- nazwe systemu;
- wlasciciela systemu;
- endpointy/API;
- autoryzacje;
- dane wejsciowe;
- dane wyjsciowe;
- bledy i kody odpowiedzi;
- timeout;
- retry;
- idempotency key dla akcji zapisujacych;
- ograniczenia rate limit;
- logowanie;
- maskowanie danych;
- tryb testowy/sandbox;
- SLA.

## 7.7. Dobre praktyki

- Projektuj timeouty z perspektywy rozmowy.
- Nie wykonuj akcji krytycznych bez potwierdzenia.
- Uzywaj idempotency dla zapisow, np. rezerwacji lub platnosci.
- Oddziel odczyt danych od modyfikacji danych.
- Daj fallback, gdy integracja nie odpowiada.
- Loguj request ID i wynik akcji.
- Nie wypowiadaj danych wrazliwych bez potrzeby.
- Przekazuj konsultantowi, ktore API zawiodlo i co bot juz zebral.

## 7.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Integracja dopiero po projekcie dialogu | Flow nie pasuje do realnych danych |
| Brak timeoutow | Martwa cisza |
| Brak idempotency | Duplikaty rezerwacji lub zgloszen |
| Brak rozroznienia bledow | Bot daje zly komunikat |
| Brak sandboxa | Testy sa ryzykowne |
| Nadmierne odczytywanie danych | Ryzyko prywatnosci |

## 7.9. Checklista integracji

- Czy wiemy, ktore systemy sa potrzebne?
- Czy API istnieje i jest dostepne?
- Czy mamy wlasciciela systemu?
- Czy mamy dokumentacje endpointow?
- Czy znamy timeout i SLA?
- Czy mamy retry?
- Czy akcje zapisujace sa idempotentne?
- Czy mamy sandbox?
- Czy bledy sa mapowane na komunikaty uzytkownika?
- Czy dane wrazliwe sa maskowane w logach?

## 7.10. Mini case study

Voicebot umawia wizyty serwisowe. API kalendarza czasem tworzy rezerwacje, ale odpowiedz wraca z opoznieniem i bot ponawia request. Powstaja duplikaty. Po poprawce dodano idempotency key oparty o identyfikator rozmowy i proponowany slot wizyty. Ponowienie requestu zwraca te sama rezerwacje zamiast tworzyc nowa.

## 7.11. Cwiczenia

1. Przygotuj specyfikacje integracji dla statusu zamowienia.
2. Zaprojektuj komunikat dla timeoutu API.
3. Wskaz akcje wymagajaca idempotency.
4. Wypisz dane, ktorych nie powinno byc w logach.

## 7.12. Podsumowanie

Integracje zamieniaja voicebota z rozmowcy w wykonawce procesu. Musza byc projektowane z uwzglednieniem czasu rozmowy, ryzyka bledow, prywatnosci i handoff. Dobra integracja jest niewidoczna dla uzytkownika, bo sprawa po prostu idzie do przodu.

---

# Rozdzial 8. Bazy wiedzy, RAG i odpowiedzi informacyjne

## 8.1. Cele rozdzialu

Czytelnik nauczy sie:

- rozumiec role bazy wiedzy w voicebocie;
- wyjasnic, czym jest RAG;
- przygotowac wymagania dla tresci informacyjnych;
- rozpoznawac ryzyka nieaktualnych lub zbyt dlugich odpowiedzi.

## 8.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Knowledge base | Zbior zweryfikowanych informacji dla bota |
| RAG | Pobieranie informacji ze zrodel i generowanie odpowiedzi na ich podstawie |
| Chunk | Fragment dokumentu indeksowany w bazie wiedzy |
| Retrieval | Wyszukanie pasujacych fragmentow |
| Grounding | Oparcie odpowiedzi modelu na zrodlach |
| Citation | Wskazanie zrodla odpowiedzi, w rozmowie glosowej zwykle jako log lub podsumowanie |
| Freshness | Aktualnosc wiedzy |
| Policy answer | Odpowiedz zgodna z polityka firmy, nawet jesli uzytkownik pyta szerzej |

## 8.3. Wyjasnienie eksperckie

Baza wiedzy dla voicebota nie moze byc zrzutem calego intranetu. Musi byc przygotowana pod rozmowe:

- aktualna;
- jednoznaczna;
- bez sprzecznych wersji;
- podzielona na sensowne fragmenty;
- oznaczona metadanymi;
- zawierajaca zakres obowiazywania;
- przetestowana na pytaniach uzytkownikow;
- przepisana do formatu glosowego tam, gdzie trzeba.

RAG dziala w uproszczeniu tak:

```text
Pytanie uzytkownika
  -> wyszukanie pasujacych fragmentow bazy
  -> przekazanie fragmentow do modelu
  -> wygenerowanie odpowiedzi
  -> opcjonalna walidacja politykami
  -> odpowiedz glosowa
```

Najwieksze ryzyko: model odpowiada plynnie, ale zle. W kanale glosowym uzytkownik ma mniej mozliwosci samodzielnego sprawdzenia odpowiedzi, wiec trzeba ograniczac zakres i projektowac niepewnosc.

## 8.4. Perspektywa biznesowa

Baza wiedzy jest produktem operacyjnym. Ktos musi byc wlascicielem:

- tresci;
- aktualizacji;
- zatwierdzania;
- wersji;
- wycofywania nieaktualnych informacji;
- odpowiedzialnosci za bledy.

Bez wlasciciela baza szybko staje sie smietnikiem dokumentow. RAG nie naprawi sprzecznych procedur.

## 8.5. Perspektywa uzytkownika

Uzytkownik chce odpowiedzi:

- krotkiej;
- konkretnej;
- dopasowanej do pytania;
- bez zargonu;
- z opcja doprecyzowania;
- z jasnym sygnalem, gdy bot nie moze rozstrzygnac indywidualnej sprawy.

Przyklad:

Zle:

"Zgodnie z regulaminem uslug dodatkowych w paragrafie 14 punkt 3..."

Lepsze:

"Zwrot zwykle trwa do 14 dni od przyjecia przesylki. Jesli chce pan, moge sprawdzic status konkretnego zwrotu."

## 8.6. Perspektywa technologiczna

Wymagania RAG:

- zrodla dokumentow;
- pipeline indeksowania;
- chunking;
- embedding/search;
- metadane: wersja, data, produkt, kraj, jezyk, segment klienta;
- filtrowanie dostepu;
- ocena trafnosci retrieval;
- test set pytan;
- monitoring odpowiedzi;
- mechanizm usuwania/aktualizacji zrodel;
- polityka odpowiedzi "nie wiem".

## 8.7. Dobre praktyki

- Nie indeksuj wszystkiego.
- Usuwaj sprzeczne i nieaktualne dokumenty.
- Tworz wersje "voice-ready" dla najczestszych odpowiedzi.
- Ograniczaj odpowiedz do 1-3 zdan.
- Dodawaj opcje: "Moge sprawdzic konkretna sprawe".
- Testuj pytania potoczne, nie tylko formalne.
- Loguj, z ktorych zrodel skorzystano.
- Oddziel odpowiedzi ogolne od decyzji indywidualnych.

## 8.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Indeksowanie calego SharePointa bez kuracji | Sprzeczne odpowiedzi |
| Brak dat waznosci | Odpowiedzi nieaktualne |
| Za dlugie odpowiedzi RAG | Uzytkownik przerywa |
| Brak testow retrieval | Model dostaje zle fragmenty |
| Brak polityki "nie wiem" | Halucynacje |
| Brak wlasciciela tresci | Baza degraduje sie po wdrozeniu |

## 8.9. Checklista RAG

- Czy wiemy, z jakich zrodel bot moze korzystac?
- Czy zrodla sa zatwierdzone?
- Czy dokumenty sa aktualne?
- Czy istnieja metadane?
- Czy odpowiedzi sa dopasowane do glosu?
- Czy mamy test set pytan?
- Czy mierzymy retrieval accuracy?
- Czy bot moze odmowic odpowiedzi?
- Czy logujemy zrodla?
- Czy jest proces aktualizacji bazy?

## 8.10. Mini case study

Firma ubezpieczeniowa indeksuje OWU, FAQ i procedury likwidacji szkody. Bot zaczyna odpowiadac zbyt prawniczo. Zespol tworzy warstwe "voice answers": zatwierdzone, krotkie interpretacje ogolnych zasad, powiazane z dokumentami zrodlowymi. LLM moze uzywac ich do odpowiedzi glosowej, ale przy pytaniu o indywidualna decyzje tworzy zgloszenie albo laczy z konsultantem.

## 8.11. Cwiczenia

1. Wybierz dokument FAQ i przepisz 5 odpowiedzi do formatu glosowego.
2. Zaprojektuj metadane dla bazy wiedzy bankowej.
3. Wypisz trzy pytania, na ktore bot powinien odpowiedziec "nie moge tego rozstrzygnac".
4. Przygotuj test retrieval dla 10 pytan.

## 8.12. Podsumowanie

RAG moze zwiekszyc uzytecznosc voicebota, ale tylko wtedy, gdy baza wiedzy jest kuratorowana, aktualna i przygotowana pod rozmowe. W przeciwnym razie generatywna plynność ukryje chaos zrodel.

---

# Rozdzial 9. TTS: synteza mowy i projektowanie wypowiedzi audio

## 9.1. Cele rozdzialu

Czytelnik nauczy sie:

- rozumiec role TTS w doswiadczeniu voicebota;
- projektowac tekst, ktory dobrze brzmi po odczytaniu;
- rozpoznawac problemy wymowy, tempa i intonacji;
- testowac TTS w kontekscie rozmowy.

## 9.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| TTS | Text-to-Speech, synteza mowy |
| Voice persona | Charakter glosu i stylu bota |
| Prosody | Tempo, rytm, akcent, intonacja |
| SSML | Znaczniki sterujace synteza mowy, jesli platforma wspiera |
| Pronunciation lexicon | Slownik wymowy |
| Speech output formatting | Formatowanie tekstu pod odczyt |
| Earcons | Krotkie sygnaly audio wspierajace interakcje |

## 9.3. Wyjasnienie eksperckie

TTS nie powinien po prostu odczytywac tekstu napisanego dla ekranu. Tekst glosowy musi byc:

- krotszy;
- bardziej linearny;
- latwiejszy do zapamietania;
- bez nawiasow i zlozonych struktur;
- z jasnymi potwierdzeniami;
- z naturalnym rytmem.

Przyklad:

Tekst ekranowy:

"Twoja reklamacja nr R/2026/07/18273 zostala przyjeta do rozpatrzenia, a przewidywany termin udzielenia odpowiedzi wynosi 14 dni roboczych od daty otrzymania kompletu dokumentow."

Tekst glosowy:

"Przyjelismy reklamacje. Numer sprawy to R 18 273. Odpowiedz powinna byc w ciagu 14 dni roboczych od otrzymania dokumentow."

## 9.4. Perspektywa biznesowa

TTS wplywa na:

- wizerunek marki;
- zrozumialosc;
- czas rozmowy;
- liczbe powtorzen;
- skutecznosc potwierdzen;
- zaufanie;
- dostepnosc.

Zbyt ekspresyjny glos moze byc nieodpowiedni dla banku lub windykacji. Zbyt mechaniczny moze obnizac zaufanie w opiece medycznej. Glos musi pasowac do kontekstu, a nie tylko brzmiec efektownie.

## 9.5. Perspektywa uzytkownika

Uzytkownik reaguje na:

- tempo;
- ton;
- pauzy;
- sposob przepraszania;
- czytelnosc liczb;
- latwosc przerwania;
- brak nadmiernej "ludzkosci".

Voicebot powinien brzmiec kompetentnie, spokojnie i transparentnie. Nie musi udawac konsultanta.

## 9.6. Perspektywa technologiczna

Wymagania TTS:

- jezyk i lokalizacja;
- stabilnosc glosu;
- wymowa liczb, dat, kwot, skrótow;
- mozliwosc slownika wymowy;
- mozliwosc sterowania pauzami;
- latency syntezy;
- streaming TTS;
- mozliwosc przerwania playbacku;
- licencje i zgody dla glosu;
- zgodnosc z kanalem telefonicznym.

## 9.7. Dobre praktyki

- Testuj kazdy wazny komunikat na glos.
- Projektuj liczby w grupach.
- Unikaj dlugich zdan podrzednych.
- Nie uzywaj zargonu.
- Dodawaj pauzy tam, gdzie uzytkownik musi zapamietac dane.
- Tworz slownik wymowy dla marek i nazw.
- Uzywaj spokojnego tonu w bledach.
- Skracaj odpowiedzi generatywne przed TTS.

## 9.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Odczytywanie tekstow z FAQ bez adaptacji | Dlugie, trudne wypowiedzi |
| Brak testow liczb i dat | Nieczytelne dane |
| Zbyt szybkie tempo | Powtorzenia |
| Zbyt emocjonalny glos | Niedopasowanie do branzy |
| Brak mozliwosci przerwania TTS | Frustracja |
| Brak slownika wymowy | Smieszne lub mylace odczyty nazw |

## 9.9. Checklista TTS

- Czy teksty sa pisane pod glos?
- Czy TTS poprawnie czyta liczby, daty, kwoty, kody?
- Czy mamy slownik wymowy?
- Czy tempo jest odpowiednie dla grupy uzytkownikow?
- Czy komunikaty sa krotkie?
- Czy glos pasuje do marki i kontekstu?
- Czy TTS jest streamowany?
- Czy mozna go zatrzymac przy barge-in?
- Czy testowalismy przez telefon?

## 9.10. Mini case study

Voicebot energetyczny odczytuje numer punktu poboru energii jako jeden dlugi ciag. Uzytkownicy prosza o powtorzenie. Zespol zmienia format: bot czyta numer w grupach po trzy znaki, robi krotkie pauzy i pyta, czy wyslac numer SMS-em. Liczba powtorzen spada.

## 9.11. Cwiczenia

1. Przepisz formalny komunikat prawny na wersje glosowa.
2. Zaprojektuj sposob odczytu numeru sprawy.
3. Wypisz 10 slow wymagajacych slownika wymowy.
4. Zaproponuj ton glosu dla banku, przychodni i e-commerce.

## 9.12. Podsumowanie

TTS jest twarza voicebota w kanale audio. Nawet najlepsza logika moze zostac odebrana jako zla, jesli bot mowi za dlugo, zle wymawia dane albo nie daje sie przerwac.

---

# Rozdzial 10. Monitoring, logging, analityka i observability

## 10.1. Cele rozdzialu

Czytelnik nauczy sie:

- rozumiec, jakie dane trzeba zbierac z rozmow;
- odrozniac logi techniczne od analityki biznesowej;
- projektowac dashboardy operacyjne i jakosciowe;
- przygotowac wymagania observability dla voicebota.

## 10.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Logging | Zapisywanie zdarzen systemowych i dialogowych |
| Monitoring | Biezace sledzenie stanu systemu |
| Analytics | Analiza wynikow rozmow i trendow |
| Trace | Sciezka pojedynczej rozmowy przez komponenty |
| Transcript | Tekstowy zapis rozmowy |
| Event | Zdarzenie, np. fallback, handoff, API timeout |
| Dashboard | Widok metryk |
| Alert | Powiadomienie o problemie |

## 10.3. Wyjasnienie eksperckie

Nie da sie optymalizowac voicebota, ktorego nie widac. Observability musi pokazac:

- co uzytkownik powiedzial;
- co ASR rozpoznal;
- jaka intencja zostala wykryta;
- jakie sloty zebrano;
- jakie API wywolano;
- jaka odpowiedz wygenerowano;
- kiedy byl fallback;
- kiedy byl barge-in;
- kiedy byl handoff;
- jaki byl wynik rozmowy;
- ile trwala kazda faza.

Trzy poziomy danych:

1. Techniczne: latency, bledy API, status ASR/TTS, uptime.
2. Konwersacyjne: intencje, fallbacki, no-input, przerwania, powtorzenia.
3. Biznesowe: task completion, containment, koszt, konwersja, CSAT, repeat contact.

## 10.4. Perspektywa biznesowa

Dashboard biznesowy powinien odpowiadac:

- Ile spraw bot zakonczyl skutecznie?
- Jakie procesy dzialaja najlepiej?
- Gdzie rosna eskalacje?
- Ile kosztuje rozmowa?
- Czy spada liczba kontaktow powtornych?
- Czy poprawia sie dostepnosc?
- Czy bot tworzy realna wartosc?

Sama liczba rozmow obsluzonych przez bota nie jest sukcesem. Sukces to wynik sprawy.

## 10.5. Perspektywa uzytkownika

Monitoring powinien wykrywac sygnaly zlego doswiadczenia:

- wiele powtorzen;
- wiele no-match;
- przerwania w tych samych promptach;
- nagle eskalacje po konkretnym komunikacie;
- długie cisze;
- rozlaczenia po fallbacku;
- prosby o konsultanta po bledzie.

Te sygnaly mowia, gdzie uzytkownik traci cierpliwosc.

## 10.6. Perspektywa technologiczna

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

Wymagania prywatnosci:

- maskowanie danych osobowych;
- kontrola dostepu do transkrypcji;
- retencja;
- audyt dostepu;
- anonimizacja do analiz, jesli mozliwe.

## 10.7. Dobre praktyki

- Projektuj logowanie przed produkcja.
- Ustal slownik zdarzen.
- Loguj powody handoff, nie tylko fakt handoff.
- Oddziel metryki systemowe od biznesowych.
- Przegladaj transkrypcje regularnie.
- Tworz backlog optymalizacji na podstawie danych.
- Monitoruj zmiany po kazdym release.
- Dbaj o prywatnosc i minimalizacje danych.

## 10.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Brak logow ASR | Nie wiadomo, czy zawinil ASR czy NLU |
| Brak powodow handoff | Eskalacje sa nieinterpretowalne |
| Dashboard tylko wolumenowy | Brak wgladu w jakosc |
| Brak anonimizacji | Ryzyko prywatnosci |
| Brak wersjonowania zmian | Nie wiadomo, co pogorszylo metryki |
| Brak alertow | Problemy trwaja godzinami lub dniami |

## 10.9. Checklista observability

- Czy mamy conversation_id?
- Czy logujemy transkrypcje ASR?
- Czy logujemy intencje i confidence?
- Czy logujemy stan dialogu?
- Czy logujemy API i timeouty?
- Czy logujemy barge-in i no-input?
- Czy logujemy powod handoff?
- Czy mierzymy latency komponentow?
- Czy dane wrazliwe sa maskowane?
- Czy mamy dashboard biznesowy, operacyjny i jakosciowy?

## 10.10. Mini case study

Voicebot e-commerce ma containment 72%, ale CSAT spada. Analiza logow pokazuje, ze wiele rozmow zakonczonych "contained" dotyczy informacji o zwrocie, ale uzytkownicy dzwonia ponownie po 24 godzinach. Bot informowal ogolnie, ale nie sprawdzal statusu konkretnego zwrotu. Po dodaniu integracji i metryki repeat contact okazuje sie, ze realna skutecznosc byla nizsza niz dashboard containment.

## 10.11. Cwiczenia

1. Zaprojektuj slownik zdarzen dla voicebota rezerwacyjnego.
2. Wskaz dane, ktore trzeba maskowac.
3. Zaproponuj dashboard jakosciowy.
4. Opisz, jak zdiagnozujesz wzrost fallback rate.

## 10.12. Podsumowanie

Observability jest warunkiem utrzymania voicebota. Bez logow i metryk projekt konczy sie w dniu wdrozenia. Z observability voicebot staje sie produktem, ktory mozna rozwijac.

---

# Rozdzial 11. Human handoff: przekazanie rozmowy do konsultanta

## 11.1. Cele rozdzialu

Czytelnik nauczy sie:

- rozumiec, kiedy voicebot powinien przekazac rozmowe;
- projektowac handoff jako element UX i architektury;
- okreslac dane przekazywane konsultantowi;
- mierzyc jakosc handoff.

## 11.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Handoff | Przekazanie sprawy do czlowieka |
| Escalation reason | Powod eskalacji |
| Context package | Pakiet danych przekazywany konsultantowi |
| Warm transfer | Przekazanie z kontekstem |
| Cold transfer | Przekazanie bez kontekstu |
| Deflection | Proba zatrzymania uzytkownika w automatyzacji |
| Agent assist | Wsparcie konsultanta przez AI |

## 11.3. Wyjasnienie eksperckie

Handoff nie jest porazka voicebota. Jest mechanizmem bezpieczenstwa i jakosci. Dobry bot wie, kiedy nie powinien kontynuowac.

Powody handoff:

- uzytkownik prosi o czlowieka;
- niski confidence po kilku probach;
- wysokie ryzyko compliance;
- emocje lub agresja;
- sytuacja medyczna/finansowa/wrazliwa;
- brak danych w systemie;
- blad integracji;
- proces poza zakresem;
- VIP lub szczegolny segment klienta;
- warunek biznesowy, np. reklamacja sporna.

## 11.4. Perspektywa biznesowa

Dobry handoff:

- chroni CSAT;
- zmniejsza eskalacje emocjonalne;
- poprawia produktywnosc konsultanta;
- daje dane o lukach automatyzacji;
- pozwala stopniowo rozszerzac zakres bota.

Zly handoff:

- marnuje czas klienta;
- przerzuca frustracje na konsultanta;
- ukrywa problemy bota;
- obniza zaufanie do automatyzacji.

## 11.5. Perspektywa uzytkownika

Uzytkownik chce wiedziec:

- czy zostanie polaczony;
- ile moze czekac;
- czy musi powtarzac dane;
- czy konsultant bedzie wiedzial, o co chodzi.

Dobre sformulowanie:

"Polacze z konsultantem i przekaze, ze chodzi o zmiane adresu w zamowieniu 12345. Prosze zostac na linii."

## 11.6. Perspektywa technologiczna

Context package powinien zawierac:

- identyfikator rozmowy;
- zweryfikowanego klienta, jesli dotyczy;
- intencje;
- zebrane sloty;
- ostatnie pytanie bota;
- powod handoff;
- wynik API;
- streszczenie rozmowy;
- transkrypcje lub link do niej;
- poziom pilnosci;
- informacje o emocjach/frustracji, ostroznie i jako sygnal, nie diagnoza.

## 11.7. Dobre praktyki

- Pozwol uzytkownikowi poprosic o czlowieka.
- Nie ukrywaj handoff.
- Przekazuj kontekst.
- Nie zmuszaj do powtarzania danych.
- Mierz powod handoff.
- Daj konsultantowi krotkie podsumowanie, nie sciane tekstu.
- W procesach wrazliwych eskaluj szybciej.
- Po handoff nie kasuj danych diagnostycznych.

## 11.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Handoff tylko po trzech fallbackach | Uzytkownik za pozno trafia do czlowieka |
| Brak powodu eskalacji | Nie wiadomo, co poprawiac |
| Brak kontekstu dla konsultanta | Klient powtarza sprawe |
| Bot walczy z prosba o konsultanta | Frustracja i utrata zaufania |
| Brak metryki handoff success | Nie wiadomo, czy przekazanie pomaga |

## 11.9. Checklista handoff

- Czy uzytkownik moze poprosic o konsultanta?
- Czy bot zna warunki automatycznej eskalacji?
- Czy przekazujemy intencje i sloty?
- Czy przekazujemy powod handoff?
- Czy konsultant widzi podsumowanie?
- Czy klient nie musi powtarzac danych?
- Czy mierzymy czas do polaczenia?
- Czy mierzymy wynik po handoff?
- Czy analizujemy handoff jako zrodlo optymalizacji?

## 11.10. Mini case study

Voicebot windykacyjny ma wysoki containment, ale konsultanci zglaszaja bardzo trudne rozmowy po przekazaniu. Analiza pokazuje, ze bot probowal kontynuowac automatyzacje mimo fraz "nie zgadzam sie", "to pomylka", "chce zlozyc skarge". Dodano intencje sporu i szybszy handoff z podsumowaniem. Containment spadl, ale CSAT i compliance risk poprawily sie.

## 11.11. Cwiczenia

1. Zaprojektuj context package dla reklamacji.
2. Wypisz 10 powodow handoff.
3. Napisz komunikat przekazania do konsultanta.
4. Zaproponuj metryke jakosci handoff.

## 11.12. Podsumowanie

Handoff to nie awaryjne wyjscie ukryte na koncu. To integralny element architektury i doswiadczenia. Dobry voicebot wie, kiedy pomaga automatyzacja, a kiedy najlepsza obsluga to czlowiek z dobrym kontekstem.

---

# Rozdzial 12. Porownanie architektur: rule-based, intent-based, generative i hybrid AI

## 12.1. Cele rozdzialu

Czytelnik nauczy sie:

- rozrozniac glowne style architektury voicebotow;
- dobrac architekture do use case'u;
- ocenic kompromisy miedzy kontrola, elastycznoscia, kosztem i ryzykiem;
- projektowac architekture hybrydowa.

## 12.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Rule-based | System oparty na regułach, menu i deterministycznych warunkach |
| Intent-based | System rozpoznajacy intencje i encje, prowadzony przez flow |
| Generative AI | System wykorzystujacy model generatywny do rozumienia i/lub odpowiedzi |
| Hybrid AI | Polaczenie flow, reguł, NLU, LLM i narzedzi |
| Determinism | Przewidywalnosc zachowania |
| Flexibility | Zdolnosc obslugi zroznicowanych wypowiedzi |
| Control surface | Miejsca, w ktorych mozna ograniczyc lub nadzorowac zachowanie systemu |

## 12.3. Tabela porownawcza

| Kryterium | Rule-based | Intent-based | Generative | Hybrid |
|---|---|---|---|---|
| Kontrola | Bardzo wysoka | Wysoka | Nizsza bez guardrails | Wysoka w krytycznych krokach |
| Elastycznosc jezykowa | Niska | Srednia | Wysoka | Wysoka tam, gdzie potrzebna |
| Koszt utrzymania | Rosnie z liczba reguł | Rosnie z liczba intencji | Rosnie przez testy i monitoring | Sredni-wysoki, ale kontrolowany |
| Ryzyko compliance | Niskie-srednie | Srednie | Wysokie bez ograniczen | Kontrolowane |
| Najlepsze dla | Menu, proste procesy | Contact center task-oriented | Informacje, swobodny opis, asysta | Enterprise voiceboty |
| Slabosc | Sztywnosc | Dane treningowe i confusion | Halucynacje, latency | Zlozonosc architektury |

## 12.4. Wyjasnienie eksperckie

### Rule-based

Dobre dla prostych, przewidywalnych procesow:

- routing;
- proste menu;
- disclaimer;
- DTMF;
- proste potwierdzenia.

Nie nadaje sie do naturalnego opisu problemu i wielu parafraz.

### Intent-based

Najczestszy model voicebotow contact center. Uzytkownik mowi naturalnie w ramach domeny, NLU rozpoznaje intencje, a flow prowadzi proces.

Dobre dla:

- statusow;
- rezerwacji;
- reklamacji w okreslonym zakresie;
- helpdesku;
- powtarzalnych procesow.

### Generative

LLM daje elastycznosc w rozumieniu i odpowiedziach, szczegolnie dla:

- FAQ z bazy wiedzy;
- streszczen;
- klasyfikacji otwartego opisu;
- agent assist;
- wielointencyjnych wypowiedzi.

Ryzyko: brak kontroli, jesli LLM sam decyduje o wszystkim.

### Hybrid

Najbardziej praktyczna architektura enterprise:

- flow kontroluje proces;
- LLM rozumie jezyk i wspiera odpowiedzi;
- RAG dostarcza wiedze;
- narzedzia wykonują akcje;
- guardrails ograniczaja zakres;
- observability monitoruje jakosc.

## 12.5. Perspektywa biznesowa

Dobor architektury powinien wynikac z:

- ryzyka procesu;
- potrzeby elastycznosci;
- dojrzalosci danych;
- wymagan compliance;
- kosztu latency;
- dostepnosci integracji;
- kompetencji zespolu utrzymaniowego.

Nie kazdy projekt potrzebuje generatywnej AI. Ale coraz wiecej projektow skorzysta z LLM jako komponentu, nie jako calosci systemu.

## 12.6. Perspektywa uzytkownika

Uzytkownik chce kombinacji:

- przewidywalnosci przy decyzjach;
- elastycznosci przy mowieniu;
- krotkich odpowiedzi;
- mozliwosci poprawienia;
- braku halucynacji;
- szybkiej eskalacji.

Architektura hybrydowa najlepiej odpowiada temu napieciu: uzytkownik moze mowic naturalnie, ale krytyczne akcje pozostaja kontrolowane.

## 12.7. Perspektywa technologiczna

Przykladowa architektura hybrydowa:

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

Wazne: LLM nie powinien byc jedynym arbitrem stanu i akcji w procesach wysokiego ryzyka. Powinien byc otoczony walidacja, narzedziami i politykami.

## 12.8. Dobre praktyki

- Uzywaj najprostszej architektury, ktora spelnia wymagania.
- Dla procesow krytycznych utrzymuj deterministyczne kroki.
- Uzywaj LLM do elastycznosci jezykowej, nie do niekontrolowanej decyzyjnosci.
- Wersjonuj flow, prompty i bazy wiedzy.
- Testuj architekture na przypadkach granicznych.
- Miej plan degradacji: LLM niedostepny, RAG niedostepny, API niedostepne.

## 12.9. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Rule-based dla zbyt otwartej rozmowy | Frustracja i no-match |
| Generative dla procesu wymagajacego scislej kontroli | Ryzyko compliance |
| Intent-based z setkami podobnych intencji | Confusion i utrzymaniowy chaos |
| Brak fallbacku, gdy LLM nie dziala | Awaria calego procesu |
| Brak guardrails | Odpowiedzi poza domena |
| Brak testow kosztow | Nieprzewidziany koszt produkcji |

## 12.10. Checklista wyboru architektury

- Czy proces jest prosty czy zlozony?
- Czy wymaga naturalnego opisu problemu?
- Czy wymaga decyzji regulowanych?
- Czy potrzebuje bazy wiedzy?
- Czy potrzebuje integracji?
- Czy odpowiedzi musza byc deterministyczne?
- Czy mamy dane treningowe?
- Czy mamy kompetencje utrzymania LLM/RAG?
- Czy latency generatywna jest akceptowalna?
- Czy mamy guardrails i observability?

## 12.11. Mini case study

Administracja publiczna chce voicebota do informacji o wnioskach. Wybrano architekture hybrydowa. Proste statusy ida przez flow i integracje z systemem spraw. Odpowiedzi informacyjne o dokumentach ida przez RAG, ale bot nie interpretuje indywidualnej sytuacji prawnej. Gdy uzytkownik pyta "czy w moim przypadku dostane decyzje pozytywna?", bot wyjasnia, ze nie moze tego ocenic i moze sprawdzic status albo polaczyc z urzednikiem.

## 12.12. Cwiczenia

1. Dla trzech use case'ow wybierz architekture i uzasadnij.
2. Wskaz, ktore kroki musza byc deterministyczne.
3. Wskaz, gdzie LLM daje wartosc.
4. Zaprojektuj graceful degradation dla awarii RAG.

## 12.13. Podsumowanie

Nie istnieje jedna najlepsza architektura voicebota. Dobre rozwiazanie wynika z procesu, ryzyka, danych i oczekiwan uzytkownika. W enterprise najczesciej wygrywa hybryda: kontrolowany proces plus elastycznosc AI tam, gdzie naprawde pomaga.

---

# 13. Diagramy tekstowe architektury

## 13.1. Klasyczny voicebot intent-based

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

## 13.2. Voicebot hybrydowy flow + LLM + RAG

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

## 13.3. Handoff z przekazaniem kontekstu

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

# 14. Zbiorcza checklista po Czesci II

- Czy potrafisz narysowac architekture voicebota end-to-end?
- Czy rozumiesz role telefonii, SIP/VoIP i contact center?
- Czy potrafisz wskazac zrodla latency?
- Czy rozumiesz roznice miedzy VAD, endpointing i ASR?
- Czy potrafisz wyjasnic role NLU i dialog managera?
- Czy wiesz, jak integracje zmieniaja voicebota z informacyjnego w transakcyjnego?
- Czy rozumiesz ryzyka RAG?
- Czy potrafisz projektowac tekst pod TTS?
- Czy wiesz, jakie logi sa potrzebne do optymalizacji?
- Czy rozumiesz, ze handoff jest czescia architektury?
- Czy potrafisz dobrac architekture rule-based, intent-based, generative lub hybrid?

---

# 15. Co bedzie w kolejnej czesci

Kolejna czesc powinna opracowac **Czesc III. Conversation Design dla voicebotow**:

1. Roznice miedzy pisaniem tekstu a projektowaniem rozmowy glosowej.
2. Zasady projektowania wypowiedzi voicebota.
3. Turn-taking w praktyce conversation design.
4. Persona, ton, styl i formalnosc.
5. Powitania, pytania, potwierdzenia, reprompt, fallback i zakonczenia.
6. Projektowanie ciszy, przerwan, barge-in i eskalacji.
7. Mikrocopy glosowe i projektowanie dla emocji.

