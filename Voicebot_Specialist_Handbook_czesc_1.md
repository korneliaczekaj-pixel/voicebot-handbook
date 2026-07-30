# Voicebot Specialist Handbook

## Wprowadzenie

Wersja robocza: 2026-07-29  
Jezyk: polski

---

## Krotki wstep

Voicebot jest dobry wtedy, gdy pomaga czlowiekowi szybko zalatwic sprawe, a organizacji pozwala obslugiwac powtarzalne kontakty bez utraty jakosci. Ten podrecznik pokazuje, jak projektowac takie systemy: od wyboru dobrego use case'u, przez rozmowe i architekture, po testy, metryki, compliance i utrzymanie po wdrozeniu.

Nie chodzi o to, zeby bot mowil jak czlowiek albo odpowiadal na wszystko. Chodzi o to, zeby mial jasny zakres, dobrze rozumial typowe sprawy, umial naprawiac bledy, nie blokowal kontaktu z konsultantem i byl mierzony po realnym wyniku rozmowy.

## Najwazniejsze watki

W kolejnych czesciach wracaja cztery glowne pytania:

1. Czy ten proces w ogole nadaje sie do automatyzacji glosowej?
2. Jak zaprojektowac rozmowe, zeby byla krotka, zrozumiala i odporna na bledy?
3. Jak dobrac technologie, dane i integracje, zeby bot mogl faktycznie zalatwic sprawe?
4. Jak sprawdzic po wdrozeniu, czy bot pomaga uzytkownikom, a nie tylko poprawia statystyki?

Szczegolowe definicje, checklisty, zrodla i warianty techniczne sa rozwijane dopiero w odpowiednich rozdzialach. Poczatek ma tylko ustawic sposob myslenia: voicebot to nie skrypt, lecz produkt rozmowny dzialajacy na styku klienta, procesu, technologii i odpowiedzialnosci organizacji.

---

# 1. Barge-in, interruption handling i turn-taking w voicebotach

## 1.1. Cele rozdzialu

Po tym rozdziale czytelnik potrafi:

1. Wyjasnic, czym barge-in rozni sie od interruption handling i od zwyklego turn-taking.
2. Opisac, jak ludzie naturalnie przejmuja ture w rozmowie.
3. Zaprojektowac polityke barge-in dla roznych typow komunikatow i procesow.
4. Zidentyfikowac techniczne elementy wykrywania przerwan: AEC, VAD, endpointing, ASR partials, turn detection, cancellation.
5. Przygotowac checklisty projektowe, techniczne i testowe.
6. Interpretowac metryki przerwan i zamieniac je na decyzje optymalizacyjne.

## 1.2. Kluczowe pojecia

| Pojecie | Definicja praktyczna | Typowe nieporozumienie |
|---|---|---|
| Turn-taking | Mechanizm organizowania, kto mowi, kiedy konczy i kiedy druga strona moze zaczac | Bledne zalozenie, ze wystarczy wykryc cisze |
| Turn | Wypowiedz lub sekwencja wypowiedzi jednej strony w danym momencie rozmowy | Traktowanie kazdego zdania jako osobnej tury |
| TCU | Turn-constructional unit, czyli jednostka wypowiedzi, po ktorej moze nastapic zmiana mowcy | Zakladanie, ze TCU zawsze konczy sie kropka lub cisza |
| TRP | Transition-relevant place, miejsce potencjalnego przejecia tury | Myslenie, ze TRP da sie wykryc tylko czasem pauzy |
| Overlap | Nakladanie sie wypowiedzi dwoch osob | Nie kazdy overlap jest konfliktem lub przerwaniem |
| Interruption | Proba przejecia tury, zwykle powodujaca overlap albo zmiane przebiegu rozmowy | Mylenie z kazdym dzwiekiem w tle |
| Barge-in | Funkcja pozwalajaca uzytkownikowi mowic w trakcie wypowiedzi bota i przerwac odtwarzanie | Traktowanie jako checkbox w platformie |
| Interruption handling | Cala strategia obslugi przerwania: wykrycie, klasyfikacja, zatrzymanie, interpretacja, recovery | Sprowadzanie do zatrzymania TTS |
| Backchannel | Krotki sygnal sluchania: "mhm", "okej", "jasne", ktory zwykle nie przejmuje tury | Bledne zatrzymywanie bota po kazdym "mhm" |
| Endpointing | Decyzja, czy uzytkownik skonczyl mowic | Mylenie z VAD |
| VAD | Voice Activity Detection: wykrywanie, czy w sygnale jest mowa | Zakladanie, ze VAD rozumie intencje |
| AEC | Acoustic Echo Cancellation: usuwanie z mikrofonu glosu bota odtwarzanego przez glosnik | Pomijanie AEC przy pelnym dupleksie |
| Latency to stop TTS | Czas od poczatku realnego przerwania do zatrzymania wypowiedzi bota | Mierzenie tylko latency odpowiedzi, bez latency zatrzymania |

## 1.3. Wyjasnienie eksperckie

### 1.3.1. Czym jest barge-in

Barge-in to zdolnosc systemu glosowego do przyjmowania mowy uzytkownika w czasie, gdy bot sam mowi. W praktyce oznacza to, ze voicebot nie dziala jak walkie-talkie w trybie "najpierw ja, potem ty", lecz jak uczestnik rozmowy w pelnym dupleksie: mowi i jednoczesnie monitoruje, czy uzytkownik probuje przejac ture.

Wynika ze zrodel: dokumentacja Google Dialogflow CX opisuje barge-in jako mozliwosc przerwania audio odpowiedzi przez uzytkownika, po czym system zatrzymuje wysylanie audio i przetwarza kolejny input. Amazon Lex opisuje podobna funkcje w strumieniu dwukierunkowym: bot moze sluchac, gdy odtwarza prompt, a przerwanie generuje zdarzenie playback interruption. LiveKit idzie dalej i odroznia prawdziwe przerwania od backchannelingu.

Uzupelnienie eksperckie: w projekcie enterprise barge-in trzeba traktowac jako wymaganie systemowe, a nie jako opcje promptu. Jesli voicebot ma byc naturalny, musi umiec:

1. Sluchac podczas mowienia.
2. Nie mylic wlasnego TTS z glosem uzytkownika.
3. Odrzucac szum, kaszlniecia, echo i backchannele.
4. Rozpoznac, czy uzytkownik chce poprawic, przyspieszyc, zmienic temat, eskalowac czy wyrazic frustracje.
5. Zatrzymac TTS szybko.
6. Zachowac stan rozmowy.
7. Odpowiedziec w sposob, ktory pokazuje, ze przerwanie zostalo zrozumiane.

### 1.3.2. Barge-in a interruption handling

Barge-in jest warunkiem technicznym: uzytkownik moze wejsc w wypowiedz bota. Interruption handling jest zachowaniem konwersacyjnym: system rozumie, co z tym przerwaniem zrobic.

Przyklad:

Bot: "Podam teraz szczegoly zamowienia. Pierwsza pozycja to..."  
Uzytkownik: "Nie, ja chce zmienic adres."  

Samo barge-in: bot przestaje mowic.  
Dobre interruption handling: bot rozpoznaje korekte intencji, zatrzymuje poprzedni plan, przechodzi do zmiany adresu, zachowuje koszyk i mowi: "Jasne, zmienmy adres dostawy. Jaki ma byc nowy adres?"

Zly system moze zatrzymac TTS, ale potem zapytac od poczatku: "W czym moge pomoc?", tracac kontekst. Technicznie wykonal barge-in, ale konwersacyjnie nie obsluzyl przerwania.

### 1.3.3. Interruption a normalne turn-taking

Normalne turn-taking to plynna zmiana mowcy w miejscu, ktore rozmowcy rozpoznaja jako potencjalny koniec tury. Interruption wystepuje wtedy, gdy druga strona probuje przejac ture zanim pierwsza skonczyla albo zanim system uznal, ze nastapil koniec tury.

Wynika ze zrodel: przeglad Skantze pokazuje, ze ludzie osiagaja bardzo krotkie przerwy i niewielkie overlap dzieki przewidywaniu konca tury, a nie samemu czekaniu. Badanie Majlesi et al. pokazuje, ze gdy robot kontynuuje mowienie mimo prob przejecia tury przez czlowieka, uczestnicy traktuje to jako problem interakcyjny.

Uzupelnienie eksperckie: w voicebotach trzeba projektowac oba mechanizmy:

- Turn-taking: kiedy bot ma zaczac mowic po uzytkowniku.
- Interruption handling: kiedy bot ma przestac mowic, bo uzytkownik zaczal.

To sa rozne decyzje, choc korzystaja z podobnych sygnalow.

## 1.4. Jak ludzie naturalnie przejmuja ture

Ludzie przewiduja koniec tury na podstawie wielu sygnalow:

1. Skladnia: zdanie zbliza sie do kompletnej formy.
2. Semantyka: mysl zostala zakonczona.
3. Prosodia: intonacja, obnizenie tonu, wydluzenie sylaby, spadek energii.
4. Tempo: spowolnienie lub przyspieszenie przed koncem.
5. Pauza: cisza, ale zwykle krotka, niekoniecznie dluga.
6. Kontekst: pytanie wymaga odpowiedzi, lista ma kolejne elementy, potwierdzenie oczekuje "tak/nie".
7. Relacja celu: rozmowca wie, czego oczekuje dana sekwencja.
8. Sygnaly cielesne w rozmowie twarza w twarz: wzrok, gest, oddech, postawa.

W telefonicznym voicebocie czesc sygnalow odpada: bot nie widzi wzroku i gestow, a uzytkownik nie widzi ciala bota. Dlatego kanaly audio i semantyczne staja sie krytyczne.

Uwaga praktyczna:

Voicebot, ktory czeka 1000 ms ciszy po kazdej wypowiedzi uzytkownika, bedzie czul sie ociężale. Voicebot, ktory odpowiada po 150 ms po kazdym chwilowym spadku energii, bedzie ucinal ludziom zdania. Naturalnosc powstaje z dobrania polityki turn-taking do typu inputu.

## 1.5. Pauzy, overlap i sygnaly konca tury

Nie kazda pauza oznacza koniec. Uzytkownik moze pauzowac, bo:

- dyktuje numer konta partiami;
- szuka dokumentu;
- zastanawia sie;
- czyta kod SMS;
- przezywa emocje;
- nie zrozumial pytania;
- jest w halasliwym otoczeniu;
- mowi w drugim jezyku;
- ma wade wymowy lub wolniejsze tempo mowienia.

Nie kazdy overlap oznacza przerwanie. Overlap moze oznaczac:

- backchannel: "mhm", "jasne";
- wspolne domkniecie oczywistej frazy;
- potwierdzenie przed koncem pytania;
- spontaniczna korekte;
- frustracje;
- probe eskalacji;
- osobe trzecia w tle;
- przypadkowy dzwiek.

Błąd, ktory czesto kosztuje projekt:

Ustawienie jednego globalnego progu ciszy dla wszystkich etapow rozmowy. Ten sam prog nie pasuje do "Czy potwierdza pan zamowienie?", "Prosze podac szesnastocyfrowy numer karty", "Prosze opisac problem" i "Czy chce pan rozmawiac z konsultantem?".

## 1.6. Dlaczego zla obsluga przerwan brzmi nienaturalnie

Voicebot zle obslugujacy przerwania ujawnia swoja sztucznosc w kilku sekundach:

1. Mowi mimo ze uzytkownik zaczal mowic.
2. Zatrzymuje sie po "mhm", choc uzytkownik tylko sluchal.
3. Ignoruje korekte i kontynuuje poprzedni flow.
4. Przeprasza, ale nie naprawia bledu.
5. Restartuje rozmowe po kazdym przerwaniu.
6. Nie rozpoznaje frustracji.
7. Nie pozwala przejsc do czlowieka.

Perspektywa psychologiczna: gdy czlowiek przerywa, czesto walczy o kontrole nad rozmowa. Jesli system go ignoruje, rosnie poczucie bezradnosci i oporu. Zrodlo AISel dotyczace przerwan w spotkaniu uslugowym wskazuje, ze zaklocenia wywolane bledami chatbota moga zwiekszac gniew i negatywne oceny kompetencji systemu; w kanale glosowym efekt moze byc silniejszy, bo uzytkownik doslownie slyszy, ze system go przegaduje.

## 1.7. Typy przerwan

| Typ przerwania | Przyklad wypowiedzi uzytkownika | Intencja uzytkownika | Zalecana reakcja voicebota |
|---|---|---|---|
| Poprawienie bota | "Nie, nie Krakow, tylko Katowice" | Korekta danych | Zatrzymaj TTS, potwierdz poprawiona wartosc, nie restartuj flow |
| Odpowiedz przed koncem pytania | "Tak" w trakcie pytania | Przyspieszenie | Przyjmij odpowiedz, jesli kontekst jest jednoznaczny |
| Przyspieszenie rozmowy | "Dalej", "wiem", "pomin" | Skracanie | Przejdz do kolejnego kroku lub daj szybka opcje |
| Zmiana tematu | "A jeszcze chce zapytac o fakture" | Nowa intencja | Zapamietaj aktualny stan, przejdz do nowej intencji albo potwierdz priorytet |
| Frustracja | "No przeciez juz mowilem" | Naprawa i emocja | Skroc, przepros, nie powtarzaj tego samego, rozważ eskalacje |
| Przerwanie z powodu bledu | "To nie jest moj numer" | Krytyczna korekta | Natychmiast zatrzymaj, potwierdz blad, wroc do punktu korekty |
| Wymuszenie czlowieka | "Polacz mnie z konsultantem" | Handoff | Nie walcz. Jesli polityka pozwala, eskaluj lub poinformuj o warunkach |
| Backchannel | "mhm", "okej" | Sluchanie | Kontynuuj, chyba ze kontekst wymaga odpowiedzi |
| Osoba trzecia | "Powiedz mu, zeby zapytal o raty" | Wplyw innej osoby | Ostroznie. Ustal, czy mowi glowny uzytkownik i czy mozna uzyc informacji |

## 1.8. Jak dziala technicznie wykrywanie przerwan

### 1.8.1. Pelny dupleks

System musi sluchac, gdy mowi. Bez tego nie ma prawdziwego barge-in. W half-duplex bot najpierw odtwarza cala wypowiedz, dopiero potem slucha. To moze wystarczyc w prostym IVR, ale nie w naturalnym voicebocie.

### 1.8.2. Acoustic Echo Cancellation

Gdy bot mowi przez glosnik telefonu lub urzadzenia, mikrofon moze "slyszec" jego wlasna synteze. AEC odejmuje znany sygnal odtwarzany przez system od sygnalu z mikrofonu. Najtrudniejszy przypadek to double-talk: bot i uzytkownik mowia jednoczesnie.

Uzupelnienie eksperckie: w call center przez telefon klasyczny problem echa moze byc mniejszy niz w smart speakerze, ale nadal istnieja inne zrodla falszywego inputu: halas, drugi rozmowca, radio, glos konsultanta obok, odtworzone audio, opoznienia sieciowe.

### 1.8.3. VAD

VAD odpowiada na pytanie: "czy w sygnale jest mowa?". Nie odpowiada na pytanie: "czy uzytkownik chce przejac ture?". Dlatego VAD jest bramka, nie decyzja konwersacyjna.

### 1.8.4. Endpointing

Endpointing decyduje, czy uzytkownik skonczyl mowic. Moze korzystac z ciszy, interpunkcji ASR, sygnalow modelu STT, semantycznej kompletnosci lub turn detectora. Google Dialogflow CX opisuje end-of-speech sensitivity i smart endpointing, ktory moze czekac, gdy partial input wyglada na niedokonczony. AWS Connect opisuje end-of-turn confidence threshold i silence timeout jako dwa mechanizmy konca tury.

### 1.8.5. ASR partials

Streaming ASR dostarcza czesciowe hipotezy. Sa one cenne, bo mozna szybciej wykryc "stop", "nie", "konsultant", "czekaj", "zmien". Sa tez ryzykowne, bo partial moze sie zmienic.

Praktyczna zasada:

- Dla komend krytycznych typu "stop", "anuluj", "konsultant" mozna reagowac szybciej.
- Dla danych transakcyjnych trzeba poczekac na stabilizacje, bo blad moze kosztowac wiecej niz 300 ms opoznienia.

### 1.8.6. Model-based turn detection

Model-based turn detection probuje ocenic, czy wypowiedz jest kompletna i czy rozmowca oddaje lub przejmuje ture. LiveKit opisuje roznice miedzy VAD, endpointing i model-based detection oraz adaptive interruption handling, ktore analizuje sygnaly akustyczne, aby odroznic prawdziwe przerwania od backchannelingu.

### 1.8.7. Klasyfikacja intencji przerwania

Po wykryciu przerwania system musi sklasyfikowac jego typ. Minimalny model decyzyjny:

1. Czy to mowa uzytkownika?
2. Czy to prawdziwe przejecie tury?
3. Czy wypowiedz jest backchannelem?
4. Czy to korekta danych?
5. Czy to nowa intencja?
6. Czy to eskalacja?
7. Czy to frustracja?
8. Czy to informacja bezpieczna do uzycia?

### 1.8.8. Anulowanie TTS i generacji

Dobre barge-in zatrzymuje nie tylko dzwiek. Jesli system generuje wypowiedz token po tokenie i wysyla ja do TTS, trzeba zatrzymac:

1. Odtwarzanie audio.
2. Bufor TTS.
3. Trwajaca generacje LLM.
4. Plan odpowiedzi, ktory stal sie nieaktualny.

OpenAI Realtime docs wskazuja, ze przy WebRTC i SIP serwer zarzadza buforem audio i moze automatycznie ucinac nieodtworzone audio przy przerwaniu, natomiast przy WebSocket klient musi sam zatrzymac playback i obsluzyc truncation. To jest praktycznie wazne: architektura polaczenia zmienia odpowiedzialnosc za przerwanie.

## 1.9. Projektowanie barge-in dla roznych typow wypowiedzi

| Typ wypowiedzi bota | Polityka barge-in | Uzasadnienie |
|---|---|---|
| Informacyjna | Wlaczony, z filtrem backchannel | Uzytkownik moze znac odpowiedz lub chciec skrocic |
| Transakcyjna | Wlaczony, ale zalezne od kroku | Korekty sa czeste i cenne; przy finalnym potwierdzeniu ostrozniej |
| Sprzedazowa | Wlaczony | Brak mozliwosci przerwania brzmi jak presja |
| Windykacyjna | Wlaczony plus szybka eskalacja w emocjach | Wysokie ryzyko frustracji, sporu i compliance |
| Reklamacyjna | Wlaczony | Uzytkownik czesto chce doprecyzowac lub skorygowac |
| Medyczna | Wlaczony ostroznie, z priorytetem bezpieczenstwa | Przerwania moga sygnalizowac pilnosc lub blad |
| Awaryjna | Wlaczony dla krytycznych slow; krotkie tury | System nie moze monologowac |
| Disclaimer prawny | Ograniczony lub wylaczony, zalezne od wymogu | Czasem pelny komunikat musi byc odtworzony, ale warto projektowac go krotko |
| Platnosc/autoryzacja | Selektywny | Trzeba unikac falszywych przerwan i utraty danych |

## 1.10. Kiedy barge-in wlaczyc, ograniczyc lub wylaczyc

### Wlacz, gdy:

- uzytkownik moze znac odpowiedz przed koncem pytania;
- bot odczytuje dluzsza informacje;
- uzytkownik moze poprawic dane;
- rozmowa dotyczy reklamacji, wsparcia, rezerwacji, statusu sprawy;
- uzytkownik moze poprosic o czlowieka;
- komunikat ma charakter operacyjny, a nie prawnie wymagany.

### Ogranicz, gdy:

- zbierasz dlugie numery lub kody;
- etap wymaga wysokiej dokladnosci;
- mowia osoby trzecie w tle;
- user input moze byc przypadkowym dzwiekiem;
- uzytkownik jest w halasliwym otoczeniu;
- wypowiedz bota zawiera krytyczne ostrzezenie, ale nie musi byc formalnie odtworzone w calosci.

### Wylacz albo zaprojektuj jako nieprzerywalne, gdy:

- przepis wymaga odtworzenia calego disclaimeru;
- trwa finalne odczytanie regulaminowo wymaganej informacji;
- system musi przekazac ostrzezenie bezpieczenstwa;
- wylaczenie jest uzasadnione i udokumentowane.

Uwaga praktyczna:

Nie wylaczaj barge-in globalnie, zeby ukryc problemy VAD. To poprawia demo, ale pogarsza prawdziwe rozmowy. AWS Connect wprost wskazuje jako blad globalne wylaczanie barge-in, zamiast ograniczania go tylko w konkretnych promptach.

## 1.11. Projektowanie komunikatow odpornych na przerwania

Komunikat odporny na przerwania:

1. Ma najwazniejsza informacje na poczatku.
2. Jest krotki.
3. Zawiera jedno pytanie naraz.
4. Nie laczy instrukcji, informacji i pytania w jednym dlugim bloku.
5. Pozwala uzytkownikowi odpowiedziec wczesnie.
6. Ma sens, nawet jesli zostanie przerwany po pierwszej frazie.
7. Nie wymaga od uzytkownika zapamietania listy pieciu opcji.

Zly komunikat:

"Za chwile przedstawie dostepne mozliwosci dotyczace pana zamowienia, w tym zmiane terminu, zmiane adresu, anulowanie, kontakt z kurierem albo rozmowe z konsultantem, dlatego prosze wysluchac wszystkich opcji i powiedziec, ktora z nich pana interesuje."

Lepszy komunikat:

"Moge pomoc ze zmiana terminu, adresem albo anulowaniem. Co chce pan zrobic?"

## 1.12. Jak zmniejszac potrzebe przerywania

Uzytkownicy przerywaja czesto dlatego, ze system:

- mowi za dlugo;
- pyta o rzecz, ktora uzytkownik juz podal;
- idzie nie ta sciezka;
- nie daje opcji "czlowiek";
- brzmi jak IVR;
- nie potwierdza zrozumienia;
- ukrywa ograniczenia;
- zmusza do wysluchania listy.

Zmniejszanie przerwan to nie tylko lepsze wykrywanie przerwan. To lepsze projektowanie rozmowy.

## 1.13. Metryki barge-in i turn-taking

| Metryka | Definicja | Jak interpretowac |
|---|---|---|
| Interruption rate | Odsetek tur bota przerwanych przez uzytkownika | Wysoki wynik moze oznaczac skuteczna kontrole albo zbyt dlugie prompt'y |
| False barge-in rate | Przerwania wywolane szumem/backchannel/echo | Wysoki wynik sugeruje problem VAD/AEC/adaptive handling |
| Missed barge-in rate | Realne przerwania, ktorych bot nie obsluzyl | Wysoki wynik niszczy zaufanie i zwieksza eskalacje |
| Barge-in recovery success | Odsetek przerwan zakonczonych poprawna kontynuacja | Najwazniejsza metryka konwersacyjna |
| Latency to stop TTS | Czas od startu przerwania do zatrzymania audio | Powyzej kilkuset ms system zaczyna brzmiec jak ignorujacy |
| Turn detection accuracy | Jak czesto system poprawnie rozpoznaje koniec tury | Wplywa na ucinanie i martwa cisze |
| User repeat rate | Jak czesto uzytkownik powtarza po przerwaniu | Wysoki wynik oznacza utrate inputu albo brak potwierdzenia |
| Frustration escalation rate | Eskalacje po przerwaniach lub no-match | Wskazuje, czy przerwania sa problemem UX |
| Backchannel suppression accuracy | Jak dobrze system ignoruje "mhm", "okej" | Wazne w dluzszych odpowiedziach |
| Context preservation after interruption | Czy system zachowal stan po przerwaniu | Kluczowe w procesach transakcyjnych |

## 1.14. Checklista projektowa barge-in

- Czy wiemy, w ktorych promptach barge-in jest wlaczony, ograniczony lub wylaczony?
- Czy kazdy dlugi komunikat zostal skrocony albo podzielony?
- Czy komunikat ma najwazniejsza informacje na poczatku?
- Czy system umie obsluzyc "nie", "czekaj", "stop", "konsultant", "zmien", "to nie tak"?
- Czy backchannele nie zatrzymuja bota bez potrzeby?
- Czy przerwanie korekcyjne wraca do konkretnego slotu, a nie do poczatku flow?
- Czy przerwanie emocjonalne moze uruchomic skrocenie rozmowy lub eskalacje?
- Czy prompt prawny ma uzasadniona polityke nieprzerywalnosci?
- Czy przerwania sa opisane w scenariuszu dialogowym?
- Czy handoff przekazuje informacje, ze uzytkownik probowal przerwac lub eskalowac?

## 1.15. Checklista techniczna

- Czy kanal wspiera pelny dupleks?
- Czy mikrofon/sluchawka/telefonia nie generuja falszywego echa?
- Czy jest AEC lub rownowazny mechanizm dla danego kanalu?
- Czy VAD jest strojony na realne warunki akustyczne?
- Czy ASR dostarcza partials i timestampy?
- Czy system ma endpointing zalezne od kontekstu?
- Czy turn detector rozroznia krotkie odpowiedzi, dlugie dyktowanie i otwarte opisy?
- Czy TTS mozna zatrzymac natychmiast?
- Czy generacje LLM mozna anulowac?
- Czy stan dialogu jest stabilny po anulowaniu odpowiedzi?
- Czy logujemy moment startu przerwania, moment zatrzymania TTS i wynik recovery?
- Czy mamy oznaczenia true interruption, false interruption, backchannel, noise, third-party speech?

## 1.16. Checklista testowa

Testy musza obejmowac:

- Uzytkownik odpowiada "tak" przed koncem pytania.
- Uzytkownik mowi "nie, inaczej" w trakcie podsumowania.
- Uzytkownik mowi "konsultant" w trakcie monologu.
- Uzytkownik mowi "mhm" w trakcie informacji.
- Uzytkownik kaszle w trakcie TTS.
- W tle slychac druga osobe.
- Uzytkownik dyktuje numer z pauzami.
- Uzytkownik poprawia jedna cyfre.
- Uzytkownik zmienia temat.
- Uzytkownik reaguje zloscia.
- Uzytkownik przerywa disclaimer.
- Uzytkownik przerywa finalne potwierdzenie platnosci.
- Uzytkownik przerywa po polsku z akcentem/regionalizmem.
- Uzytkownik mowi bardzo cicho.
- Uzytkownik mowi w halasie.

## 1.17. Przyklady dialogow

### Zle obsluzone przerwanie

Bot: "Podsumuje zamowienie. Wybral pan dostawę na piatek, adres ulica Lesna 14, platnosc karta..."  
Uzytkownik: "Nie, adres jest inny."  
Bot: "...oraz dostawe miedzy 12:00 a 14:00. Czy potwierdza pan zamowienie?"  
Uzytkownik: "Nie, mowie, ze adres jest inny!"  

Analiza: bot ignoruje korekte, kontynuuje TTS i doprowadza do frustracji. Problem moze byc techniczny (brak barge-in), projektowy (dlugi prompt), albo dialogowy (brak recovery).

### Dobrze obsluzone przerwanie

Bot: "Podsumuje zamowienie. Dostawa na piatek, adres ulica Lesna..."  
Uzytkownik: "Nie, adres jest inny."  
Bot: "Dobrze, poprawmy adres. Jaki adres mam wpisac?"  
Uzytkownik: "Kwiatowa 8 mieszkania 12."  
Bot: "Zmieniam na Kwiatowa 8 mieszkania 12. Czy sie zgadza?"  

Analiza: bot zatrzymal wypowiedz, rozpoznal korekte, zachowal kontekst zamowienia i wrocil do konkretnego slotu.

### Backchannel, ktory nie powinien zatrzymac bota

Bot: "Reklamacje mozna zlozyc telefonicznie albo przez formularz..."  
Uzytkownik: "Mhm."  
Bot: "...telefonicznie przyjme ja teraz, a formularz wyslemy SMS-em. Ktora opcje pan wybiera?"  

Analiza: "mhm" nie przejmuje tury. Dobre adaptive interruption handling powinno pozwolic botowi kontynuowac.

### Przerwanie eskalacyjne

Bot: "Moge pomoc sprawdzic status sprawy albo przyjac dodatkowe informacje..."  
Uzytkownik: "Chce rozmawiac z czlowiekiem."  
Bot: "Rozumiem. Polacze z konsultantem i przekaze, ze chodzi o status sprawy. Prosze zostac na linii."  

Analiza: w sytuacji jasnej eskalacji bot nie powinien probowac na sile zatrzymac uzytkownika w automatyzacji.

## 1.18. Mini case studies

### Case 1: E-commerce, zmiana adresu

Problem: uzytkownicy przerywaja podsumowanie zamowienia, bo chca poprawic adres.  
Blad: system nie zachowuje stanu po przerwaniu i wraca do poczatku.  
Rozwiazanie: barge-in wlaczony dla podsumowania, klasyfikacja "correction", recovery do slotu "delivery_address".  
Metryki: interruption rate w podsumowaniu, recovery success, repeat rate, completion rate.

### Case 2: Bank, dyktowanie numeru

Problem: bot ucina uzytkownika podczas podawania numeru klienta partiami.  
Blad: zbyt agresywny endpointing i za niski prog konca tury.  
Rozwiazanie: konserwatywne end-of-turn dla slotu numeru, potwierdzanie grupami, mozliwosc korekty ostatniej grupy.  
Metryki: digit correction rate, ASR confidence, failed verification rate.

### Case 3: Reklamacja, frustracja

Problem: uzytkownik mowi "juz to podawalem", bot powtarza to samo pytanie.  
Blad: fallback bez pamieci i bez reakcji emocjonalnej.  
Rozwiazanie: wykrywanie przerwania frustracyjnego, skrocona naprawa, eskalacja po drugim nieudanym kroku.  
Metryki: frustration escalation rate, no-match after interruption, CSAT after handoff.

## 1.19. Jak mysli ekspert projektujacy barge-in

Ekspert nie pyta najpierw: "Czy platforma ma barge-in?". Pyta:

1. W ktorych momentach uzytkownik bedzie chcial przerwac?
2. Czy przerwanie oznacza korekte, przyspieszenie, sprzeciw, frustracje, zmiane celu czy eskalacje?
3. Czy prompt jest tak dlugi, ze sam prowokuje przerwania?
4. Czy system ma techniczna mozliwosc zatrzymania TTS i generacji?
5. Czy po przerwaniu zachowujemy stan procesu?
6. Czy umiemy odroznic "mhm" od "nie"?
7. Czy w danym kroku bardziej ryzykujemy falszywe przerwanie, czy ignorowanie uzytkownika?
8. Czy mamy metryki pokazujace, jak dzialaja przerwania w produkcji?
9. Czy konsultant po handoff widzi, co uzytkownik probowal zrobic?
10. Czy barge-in poprawia poczucie kontroli, czy tylko dodaje losowosc?

## 1.20. Zrodla wspierajace rozdzial

Najmocniejsze zrodla naukowe:

- Gabriel Skantze, "Turn-taking in Conversational Systems and Human-Robot Interaction: A Review", Computer Speech & Language, 2021: https://www.sciencedirect.com/science/article/pii/S088523082030111X
- Majlesi et al., "Managing Turn-Taking in Human-Robot Interactions", Social Interaction, 2023: https://tidsskrift.dk/socialinteraction/article/view/137380
- Gervits & Scheutz, "Pardon the Interruption", SIGDIAL 2018: https://aclanthology.org/W18-5011/
- Crook et al., "Handling User Interruptions in an Embodied Conversational Agent", 2010: https://www.cs.ox.ac.uk/publications/publication3549-abstract.html
- Edwards et al., "Eliciting Spoken Interruptions to Inform Proactive Speech Agent Design", CUI 2021: https://dspace.library.uu.nl/handle/1874/415058
- Reicherts et al., "May I Interrupt? Diverging Opinions on Proactive Smart Speakers", CUI 2021: https://discovery.ucl.ac.uk/id/eprint/10152524/
- Imperial College London, dataset i klasyfikacja true/false interruptions, 2024: https://www.imperial.ac.uk/news/257034/analysing-speech-interruptions-help-create-more/
- TPI-VA, "Still Between Us?", ACL 2026: https://tpi-va.github.io/

Najwazniejsze zrodla techniczne i dokumentacyjne:

- LiveKit adaptive interruption handling: https://docs.livekit.io/agents/logic/turns/adaptive-interruption-handling/
- LiveKit turn detection and interruption configuration: https://livekit.com/blog/turn-detection-and-interruption-handling
- LiveKit VAD, endpointing and model-based turn detection: https://livekit.com/blog/turn-detection-voice-agents-vad-endpointing-model-based-detection
- OpenAI Realtime conversations: https://platform.openai.com/docs/guides/realtime-conversations
- Google Dialogflow CX advanced speech settings: https://docs.cloud.google.com/dialogflow/cx/docs/concept/advanced-speech
- AWS Connect agentic voice best practices: https://docs.aws.amazon.com/connect/latest/adminguide/agentic-voice-best-practices.html
- Amazon Lex V2 interruption docs: https://docs.aws.amazon.com/lexv2/latest/dg/interrupt-bot.html
- W3C VoiceXML 2.0: https://www.w3.org/TR/voicexml20/

---

# 6. Co powinno znalezc sie w kolejnej czesci

Kolejna czesc powinna rozpoczac pelne opracowanie rozdzialow podrecznika wedlug stalej struktury: cele rozdzialu, kluczowe pojecia, wyjasnienie eksperckie, perspektywa biznesowa, perspektywa uzytkownika, perspektywa technologiczna, dobre praktyki, typowe bledy, checklisty, mini case study, cwiczenia i podsumowanie.

Rekomendowana kolejnosc kolejnej czesci:

1. Czesc I, rozdzialy 1-7: Fundamenty Conversational AI i voicebotow.
2. Czesc II, rozdzialy 1-4: Telefonia, streaming audio, ASR i NLU.
3. Pierwsze szablony: brief projektu voicebota, karta use case'u i mapa procesu rozmowy.
