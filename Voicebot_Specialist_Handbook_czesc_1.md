# Voicebot Specialist Handbook

## Wprowadzenie

Wersja robocza: 2026-07-29  
Język: polski

---

## Krótki wstęp

Voicebot jest dobry wtedy, gdy pomaga człowiekowi szybko załatwić sprawę, a organizacji pozwala obsługiwać powtarzalne kontakty bez utraty jakości. Ten podręcznik pokazuje, jak projektować takie systemy: od wyboru dobrego use case'u, przez rozmowę i architekturę, po testy, metryki, compliance i utrzymanie po wdrożeniu.

Nie chodzi o to, żeby bot mówił jak człowiek albo odpowiadał na wszystko. Chodzi o to, żeby miał jasny zakres, dobrze rozumiał typowe sprawy, umiał naprawiać błędy, nie blokował kontaktu z konsultantem i był mierzony po realnym wyniku rozmowy.

## Najważniejsze wątki

W kolejnych częściach wracają cztery główne pytania:

1. Czy ten proces w ogóle nadaje się do automatyzacji głosowej?
2. Jak zaprojektować rozmowę, żeby była krótka, zrozumiała i odporna na błędy?
3. Jak dobrać technologie, dane i integracje, żeby bot mógł faktycznie załatwić sprawę?
4. Jak sprawdzić po wdrożeniu, czy bot pomaga użytkownikom, a nie tylko poprawia statystyki?

Szczegółowe definicje, checklisty, źródła i warianty techniczne są rozwijane dopiero w odpowiednich rozdziałach. Początek ma tylko ustawić sposób myślenia: voicebot to nie skrypt, lecz produkt rozmowny działający na styku klienta, procesu, technologii i odpowiedzialności organizacji.

---

# 1. Barge-in, interruption handling i turn-taking w voicebotach

## 1.1. Cele rozdziału

Po tym rozdziale czytelnik potrafi:

1. Wyjaśnić, czym barge-in różni się od interruption handling i od zwykłego turn-taking.
2. Opisać, jak ludzie naturalnie przejmują turę w rozmowie.
3. Zaprojektować politykę barge-in dla różnych typów komunikatów i procesów.
4. Zidentyfikować techniczne elementy wykrywania przerwań: AEC, VAD, endpointing, ASR partials, turn detection, cancellation.
5. Przygotować checklisty projektowe, techniczne i testowe.
6. Interpretować metryki przerwań i zamieniać je na decyzje optymalizacyjne.

## 1.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja praktyczna | Typowe nieporozumienie |
|---|---|---|
| Turn-taking | Mechanizm organizowania, kto mówi, kiedy kończy i kiedy druga strona może zacząć | Błędne założenie, że wystarczy wykryć ciszę |
| Turn | Wypowiedź lub sekwencja wypowiedzi jednej strony w danym momencie rozmowy | Traktowanie każdego zdania jako osobnej tury |
| TCU | Turn-constructional unit, czyli jednostka wypowiedzi, po której może nastąpić zmiana mówcy | Zakładanie, że TCU zawsze kończy się kropką lub ciszą |
| TRP | Transition-relevant place, miejsce potencjalnego przejęcia tury | Myślenie, że TRP da się wykryć tylko czasem pauzy |
| Overlap | Nakładanie się wypowiedzi dwóch osób | Nie każdy overlap jest konfliktem lub przerwaniem |
| Interruption | Próba przejęcia tury, zwykle powodująca overlap albo zmianę przebiegu rozmowy | Mylenie z każdym dźwiękiem w tle |
| Barge-in | Funkcja pozwalająca użytkownikowi mówić w trakcie wypowiedzi bota i przerwać odtwarzanie | Traktowanie jako checkbox w platformie |
| Interruption handling | Cała strategia obsługi przerwania: wykrycie, klasyfikacja, zatrzymanie, interpretacja, recovery | Sprowadzanie do zatrzymania TTS |
| Backchannel | Krótki sygnał słuchania: "mhm", "okej", "jasne", który zwykle nie przejmuje tury | Błędne zatrzymywanie bota po każdym "mhm" |
| Endpointing | Decyzja, czy użytkownik skończył mówić | Mylenie z VAD |
| VAD | Voice Activity Detection: wykrywanie, czy w sygnale jest mowa | Zakładanie, że VAD rozumie intencje |
| AEC | Acoustic Echo Cancellation: usuwanie z mikrofonu głosu bota odtwarzanego przez głośnik | Pomijanie AEC przy pełnym dupleksie |
| Latency to stop TTS | Czas od początku realnego przerwania do zatrzymania wypowiedzi bota | Mierzenie tylko latency odpowiedzi, bez latency zatrzymania |

## 1.3. Wyjaśnienie eksperckie

### 1.3.1. Czym jest barge-in

Barge-in to zdolność systemu głosowego do przyjmowania mowy użytkownika w czasie, gdy bot sam mówi. W praktyce oznacza to, że voicebot nie działa jak walkie-talkie w trybie "najpierw ja, potem ty", lecz jak uczestnik rozmowy w pełnym dupleksie: mówi i jednocześnie monitoruje, czy użytkownik próbuje przejąć turę.

Wynika ze źródeł: dokumentacja Google Dialogflow CX opisuje barge-in jako możliwość przerwania audio odpowiedzi przez użytkownika, po czym system zatrzymuje wysyłanie audio i przetwarza kolejny input. Amazon Lex opisuje podobną funkcję w strumieniu dwukierunkowym: bot może słuchać, gdy odtwarza prompt, a przerwanie generuje zdarzenie playback interruption. LiveKit idzie dalej i odróżnia prawdziwe przerwania od backchannelingu.

Uzupełnienie eksperckie: w projekcie enterprise barge-in trzeba traktować jako wymaganie systemowe, a nie jako opcję promptu. Jeśli voicebot ma być naturalny, musi umieć:

1. Słuchać podczas mówienia.
2. Nie mylić własnego TTS z głosem użytkownika.
3. Odrzucać szum, kaszlnięcia, echo i backchannele.
4. Rozpoznać, czy użytkownik chce poprawić, przyspieszyć, zmienić temat, eskalować czy wyrazić frustrację.
5. Zatrzymać TTS szybko.
6. Zachować stan rozmowy.
7. Odpowiedzieć w sposób, który pokazuje, że przerwanie zostało zrozumiane.

### 1.3.2. Barge-in a interruption handling

Barge-in jest warunkiem technicznym: użytkownik może wejść w wypowiedź bota. Interruption handling jest zachowaniem konwersacyjnym: system rozumie, co z tym przerwaniem zrobić.

Przykład:

Bot: "Podam teraz szczegóły zamówienia. Pierwsza pozycja to..."  
Użytkownik: "Nie, ja chcę zmienić adres."  

Samo barge-in: bot przestaje mówić.  
Dobre interruption handling: bot rozpoznaje korektę intencji, zatrzymuje poprzedni plan, przechodzi do zmiany adresu, zachowuje koszyk i mówi: "Jasne, zmieńmy adres dostawy. Jaki ma być nowy adres?"

Zły system może zatrzymać TTS, ale potem zapytać od początku: "W czym mogę pomóc?", tracąc kontekst. Technicznie wykonał barge-in, ale konwersacyjnie nie obsłużył przerwania.

### 1.3.3. Interruption a normalne turn-taking

Normalne turn-taking to płynna zmiana mówcy w miejscu, które rozmowcy rozpoznają jako potencjalny koniec tury. Interruption występuje wtedy, gdy druga strona próbuje przejąć turę, zanim pierwsza skończyła albo zanim system uznał, że nastąpił koniec tury.

Wynika ze źródeł: przegląd Skantze pokazuje, że ludzie osiągają bardzo krótkie przerwy i niewielki overlap dzięki przewidywaniu końca tury, a nie samemu czekaniu. Badanie Majlesi et al. pokazuje, że gdy robot kontynuuje mówienie mimo prób przejęcia tury przez człowieka, uczestnicy traktują to jako problem interakcyjny.

Uzupełnienie eksperckie: w voicebotach trzeba projektować oba mechanizmy:

- Turn-taking: kiedy bot ma zacząć mówić po użytkowniku.
- Interruption handling: kiedy bot ma przestać mówić, bo użytkownik zaczął.

To są różne decyzje, choć korzystają z podobnych sygnałów.

## 1.4. Jak ludzie naturalnie przejmują turę

Ludzie przewidują koniec tury na podstawie wielu sygnałów:

1. Składnia: zdanie zbliża się do kompletnej formy.
2. Semantyka: myśl została zakończona.
3. Prosodia: intonacja, obniżenie tonu, wydłużenie sylaby, spadek energii.
4. Tempo: spowolnienie lub przyspieszenie przed końcem.
5. Pauza: cisza, ale zwykle krótka, niekoniecznie długa.
6. Kontekst: pytanie wymaga odpowiedzi, lista ma kolejne elementy, potwierdzenie oczekuje "tak/nie".
7. Relacja celu: rozmowca wie, czego oczekuje dana sekwencja.
8. Sygnały cielesne w rozmowie twarzą w twarz: wzrok, gest, oddech, postawa.

W telefonicznym voicebocie część sygnałów odpada: bot nie widzi wzroku i gestów, a użytkownik nie widzi ciała bota. Dlatego kanały audio i semantyczne stają się krytyczne.

Uwaga praktyczna:

Voicebot, który czeka 1000 ms ciszy po każdej wypowiedzi użytkownika, będzie czuł się ociężale. Voicebot, który odpowiada po 150 ms po każdym chwilowym spadku energii, będzie ucinał ludziom zdania. Naturalność powstaje z dobrania polityki turn-taking do typu inputu.

## 1.5. Pauzy, overlap i sygnały końca tury

Nie każda pauza oznacza koniec. Użytkownik może pauzować, bo:

- dyktuje numer konta partiami;
- szuka dokumentu;
- zastanawia się;
- czyta kod SMS;
- przeżywa emocje;
- nie zrozumiał pytania;
- jest w hałaśliwym otoczeniu;
- mówi w drugim języku;
- ma wadę wymowy lub wolniejsze tempo mówienia.

Nie każdy overlap oznacza przerwanie. Overlap może oznaczać:

- backchannel: "mhm", "jasne";
- wspólne domknięcie oczywistej frazy;
- potwierdzenie przed końcem pytania;
- spontaniczną korektę;
- frustrację;
- próbę eskalacji;
- osobę trzecią w tle;
- przypadkowy dźwięk.

Błąd, który często kosztuje projekt:

Ustawienie jednego globalnego progu ciszy dla wszystkich etapów rozmowy. Ten sam próg nie pasuje do "Czy potwierdza pan zamówienie?", "Proszę podać szesnastocyfrowy numer karty", "Proszę opisać problem" i "Czy chce pan rozmawiać z konsultantem?".

## 1.6. Dlaczego zła obsługa przerwań brzmi nienaturalnie

Voicebot źle obsługujący przerwania ujawnia swoją sztuczność w kilku sekundach:

1. Mówi, mimo że użytkownik zaczął mówić.
2. Zatrzymuje się po "mhm", choć użytkownik tylko słuchał.
3. Ignoruje korektę i kontynuuje poprzedni flow.
4. Przeprasza, ale nie naprawia błędu.
5. Restartuje rozmowę po każdym przerwaniu.
6. Nie rozpoznaje frustracji.
7. Nie pozwala przejść do człowieka.

Perspektywa psychologiczna: gdy człowiek przerywa, często walczy o kontrolę nad rozmową. Jeśli system go ignoruje, rośnie poczucie bezradności i oporu. Źródło AISel dotyczące przerwań w spotkaniu usługowym wskazuje, że zakłócenia wywołane błędami chatbota mogą zwiększać gniew i negatywne oceny kompetencji systemu; w kanale głosowym efekt może być silniejszy, bo użytkownik dosłownie słyszy, że system go przegaduje.

## 1.7. Typy przerwań

| Typ przerwania | Przykład wypowiedzi użytkownika | Intencja użytkownika | Zalecana reakcja voicebota |
|---|---|---|---|
| Poprawienie bota | "Nie, nie Kraków, tylko Katowice" | Korekta danych | Zatrzymaj TTS, potwierdź poprawioną wartość, nie restartuj flow |
| Odpowiedź przed końcem pytania | "Tak" w trakcie pytania | Przyspieszenie | Przyjmij odpowiedź, jeśli kontekst jest jednoznaczny |
| Przyspieszenie rozmowy | "Dalej", "wiem", "pomiń" | Skracanie | Przejdź do kolejnego kroku lub daj szybką opcję |
| Zmiana tematu | "A jeszcze chcę zapytać o fakturę" | Nowa intencja | Zapamiętaj aktualny stan, przejdź do nowej intencji albo potwierdź priorytet |
| Frustracja | "No przecież już mówiłem" | Naprawa i emocja | Skróć, przeproś, nie powtarzaj tego samego, rozważ eskalację |
| Przerwanie z powodu błędu | "To nie jest mój numer" | Krytyczna korekta | Natychmiast zatrzymaj, potwierdź błąd, wróć do punktu korekty |
| Wymuszenie człowieka | "Połącz mnie z konsultantem" | Handoff | Nie walcz. Jeśli polityka pozwala, eskaluj lub poinformuj o warunkach |
| Backchannel | "mhm", "okej" | Słuchanie | Kontynuuj, chyba że kontekst wymaga odpowiedzi |
| Osoba trzecia | "Powiedz mu, żeby zapytał o raty" | Wpływ innej osoby | Ostrożnie. Ustal, czy mówi główny użytkownik i czy można użyć informacji |

## 1.8. Jak działa technicznie wykrywanie przerwań

### 1.8.1. Pełny dupleks

System musi słuchać, gdy mówi. Bez tego nie ma prawdziwego barge-in. W half-duplex bot najpierw odtwarza całą wypowiedź, dopiero potem słucha. To może wystarczyć w prostym IVR, ale nie w naturalnym voicebocie.

### 1.8.2. Acoustic Echo Cancellation

Gdy bot mówi przez głośnik telefonu lub urządzenia, mikrofon może "słyszeć" jego własną syntezę. AEC odejmuje znany sygnał odtwarzany przez system od sygnału z mikrofonu. Najtrudniejszy przypadek to double-talk: bot i użytkownik mówią jednocześnie.

Uzupełnienie eksperckie: w call center przez telefon klasyczny problem echa może być mniejszy niż w smart speakerze, ale nadal istnieją inne źródła fałszywego inputu: hałas, drugi rozmówca, radio, głos konsultanta obok, odtworzone audio, opóźnienia sieciowe.

### 1.8.3. VAD

VAD odpowiada na pytanie: "czy w sygnale jest mowa?". Nie odpowiada na pytanie: "czy użytkownik chce przejąć turę?". Dlatego VAD jest bramką, nie decyzją konwersacyjną.

### 1.8.4. Endpointing

Endpointing decyduje, czy użytkownik skończył mówić. Może korzystać z ciszy, interpunkcji ASR, sygnałów modelu STT, semantycznej kompletności lub turn detectora. Google Dialogflow CX opisuje end-of-speech sensitivity i smart endpointing, który może czekać, gdy partial input wygląda na niedokończony. AWS Connect opisuje end-of-turn confidence threshold i silence timeout jako dwa mechanizmy końca tury.

### 1.8.5. ASR partials

Streaming ASR dostarcza częściowe hipotezy. Są one cenne, bo można szybciej wykryć "stop", "nie", "konsultant", "czekaj", "zmień". Są też ryzykowne, bo partial może się zmienić.

Praktyczna zasada:

- Dla komend krytycznych typu "stop", "anuluj", "konsultant" można reagować szybciej.
- Dla danych transakcyjnych trzeba poczekać na stabilizację, bo błąd może kosztować więcej niż 300 ms opóźnienia.

### 1.8.6. Model-based turn detection

Model-based turn detection próbuje ocenić, czy wypowiedź jest kompletną i czy rozmowca oddaje lub przejmuje turę. LiveKit opisuje różnice między VAD, endpointing i model-based detection oraz adaptive interruption handling, które analizuje sygnały akustyczne, aby odróżnić prawdziwe przerwania od backchannelingu.

### 1.8.7. Klasyfikacja intencji przerwania

Po wykryciu przerwania system musi sklasyfikować jego typ. Minimalny model decyzyjny:

1. Czy to mowa użytkownika?
2. Czy to prawdziwe przejęcie tury?
3. Czy wypowiedź jest backchannelem?
4. Czy to korekta danych?
5. Czy to nowa intencja?
6. Czy to eskalacja?
7. Czy to frustracja?
8. Czy to informacja bezpieczna do użycia?

### 1.8.8. Anulowanie TTS i generacji

Dobre barge-in zatrzymuje nie tylko dźwięk. Jeśli system generuje wypowiedź token po tokenie i wysyła ją do TTS, trzeba zatrzymać:

1. Odtwarzanie audio.
2. Bufor TTS.
3. Trwającą generację LLM.
4. Plan odpowiedzi, który stał się nieaktualny.

OpenAI Realtime docs wskazują, że przy WebRTC i SIP serwer zarządza buforem audio i może automatycznie ucinać nieodtworzone audio przy przerwaniu, natomiast przy WebSocket klient musi sam zatrzymać playback i obsłużyć truncation. To jest praktycznie ważne: architektura połączenia zmienia odpowiedzialność za przerwanie.

## 1.9. Projektowanie barge-in dla różnych typów wypowiedzi

| Typ wypowiedzi bota | Polityka barge-in | Uzasadnienie |
|---|---|---|
| Informacyjna | Włączony, z filtrem backchannel | Użytkownik może znać odpowiedź lub chcieć skrócić |
| Transakcyjna | Włączony, ale zależne od kroku | Korekty są częste i cenne; przy finalnym potwierdzeniu ostrożniej |
| Sprzedażowa | Włączony | Brak możliwości przerwania brzmi jak presja |
| Windykacyjna | Włączony plus szybka eskalacja w emocjach | Wysokie ryzyko frustracji, sporu i compliance |
| Reklamacyjna | Włączony | Użytkownik często chce doprecyzować lub skorygować |
| Medyczna | Włączony ostrożnie, z priorytetem bezpieczeństwa | Przerwania mogą sygnalizować pilność lub błąd |
| Awaryjna | Włączony dla krytycznych słów; krótkie tury | System nie może monologować |
| Disclaimer prawny | Ograniczony lub wyłączony, zależne od wymogu | Czasem pełny komunikat musi być odtworzony, ale warto projektować go krótko |
| Płatność/autoryzacja | Selektywny | Trzeba unikać fałszywych przerwań i utraty danych |

## 1.10. Kiedy barge-in włączyć, ograniczyć lub wyłączyć

### Włącz, gdy:

- użytkownik może znać odpowiedź przed końcem pytania;
- bot odczytuje dłuższą informację;
- użytkownik może poprawić dane;
- rozmowa dotyczy reklamacji, wsparcia, rezerwacji, statusu sprawy;
- użytkownik może poprosić o człowieka;
- komunikat ma charakter operacyjny, a nie prawnie wymagany.

### Ogranicz, gdy:

- zbierasz długie numery lub kody;
- etap wymaga wysokiej dokładności;
- mówią osoby trzecie w tle;
- user input może być przypadkowym dźwiękiem;
- użytkownik jest w hałaśliwym otoczeniu;
- wypowiedź bota zawiera krytyczne ostrzeżenie, ale nie musi być formalnie odtworzone w całości.

### Wyłącz albo zaprojektuj jako nieprzerywalne, gdy:

- przepis wymaga odtworzenia całego disclaimeru;
- trwa finalne odczytanie regulaminowo wymaganej informacji;
- system musi przekazać ostrzeżenie bezpieczeństwa;
- wyłączenie jest uzasadnione i udokumentowane.

Uwaga praktyczna:

Nie wyłączaj barge-in globalnie, żeby ukryć problemy VAD. To poprawia demo, ale pogarsza prawdziwe rozmowy. AWS Connect wprost wskazuje jako błąd globalne wyłączanie barge-in, zamiast ograniczania go tylko w konkretnych promptach.

## 1.11. Projektowanie komunikatów odpornych na przerwania

Komunikat odporny na przerwania:

1. Ma najważniejszą informację na początku.
2. Jest krótki.
3. Zawiera jedno pytanie naraz.
4. Nie łączy instrukcji, informacji i pytania w jednym długim bloku.
5. Pozwala użytkownikowi odpowiedzieć wcześnie.
6. Ma sens, nawet jeśli zostanie przerwany po pierwszej frazie.
7. Nie wymaga od użytkownika zapamiętania listy pięciu opcji.

Zły komunikat:

"Za chwilę przedstawię dostępne możliwości dotyczące pana zamówienia, w tym zmianę terminu, zmianę adresu, anulowanie, kontakt z kurierem albo rozmowę z konsultantem, dlatego proszę wysłuchać wszystkich opcji i powiedzieć, która z nich pana interesuje."

Lepszy komunikat:

"Mogę pomóc ze zmianą terminu, adresem albo anulowaniem. Co chce pan zrobić?"

## 1.12. Jak zmniejszać potrzebę przerywania

Użytkownicy przerywają często dlatego, że system:

- mówi za długo;
- pyta o rzecz, którą użytkownik już podał;
- idzie nie tą ścieżką;
- nie daje opcji "człowiek";
- brzmi jak IVR;
- nie potwierdza zrozumienia;
- ukrywa ograniczenia;
- zmusza do wysłuchania listy.

Żeby użytkownicy rzadziej przerywali botowi, nie wystarczy lepiej wykrywać przerwania — przede wszystkim trzeba tak zaprojektować rozmowę, żeby klient nie miał powodu przerywać.

## 1.13. Metryki barge-in i turn-taking

| Metryka | Definicja | Jak interpretować |
|---|---|---|
| Interruption rate | Odsetek tur bota przerwanych przez użytkownika | Wysoki wynik może oznaczać skuteczną kontrolę albo zbyt długie prompt'y |
| False barge-in rate | Przerwania wywołane szumem/backchannel/echo | Wysoki wynik sugeruje problem VAD/AEC/adaptive handling |
| Missed barge-in rate | Realne przerwania, których bot nie obsłużył | Wysoki wynik niszczy zaufanie i zwiększa eskalację |
| Barge-in recovery success | Odsetek przerwań zakończonych poprawną kontynuacją | Najważniejsza metryka konwersacyjna |
| Latency to stop TTS | Czas od startu przerwania do zatrzymania audio | Powyżej kilkuset ms system zaczyna brzmieć jak ignorujący |
| Turn detection accuracy | Jak często system poprawnie rozpoznaje koniec tury | Wpływa na ucinanie i martwą ciszę |
| User repeat rate | Jak często użytkownik powtarza po przerwaniu | Wysoki wynik oznacza utratę inputu albo brak potwierdzenia |
| Frustration escalation rate | Eskalacje po przerwaniach lub no-match | Wskazuje, czy przerwania są problemem UX |
| Backchannel suppression accuracy | Jak dobrze system ignoruje "mhm", "okej" | Ważne w dłuższych odpowiedziach |
| Context preservation after interruption | Czy system zachował stan po przerwaniu | Kluczowe w procesach transakcyjnych |

## 1.14. Checklista projektowa barge-in

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy wiemy, w których promptach barge-in jest włączony, ograniczony lub wyłączony?
- Czy każdy długi komunikat został skrócony albo podzielony?
- Czy komunikat ma najważniejszą informację na początku?
- Czy system umie obsłużyć "nie", "czekaj", "stop", "konsultant", "zmień", "to nie tak"?
- Czy backchannele nie zatrzymują bota bez potrzeby?
- Czy przerwanie korekcyjne wraca do konkretnego slotu, a nie do początku flow?
- Czy przerwanie emocjonalne może uruchomić skrócenie rozmowy lub eskalację?
- Czy prompt prawny ma uzasadnioną politykę nieprzerywalności?
- Czy przerwania są opisane w scenariuszu dialogowym?
- Czy handoff przekazuje informacje, że użytkownik próbował przerwać lub eskalować?

## 1.15. Checklista techniczna

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy kanał wspiera pełny dupleks?
- Czy mikrofon/słuchawka/telefonia nie generują fałszywego echa?
- Czy jest AEC lub równoważny mechanizm dla danego kanału?
- Czy VAD jest strojony na realne warunki akustyczne?
- Czy ASR dostarcza partials i timestampy?
- Czy system ma endpointing zależny od kontekstu?
- Czy turn detector rozróżnia krótkie odpowiedzi, długie dyktowanie i otwarte opisy?
- Czy TTS można zatrzymać natychmiast?
- Czy generację LLM można anulować?
- Czy stan dialogu jest stabilny po anulowaniu odpowiedzi?
- Czy logujemy moment startu przerwania, moment zatrzymania TTS i wynik recovery?
- Czy mamy oznaczenia true interruption, false interruption, backchannel, noise, third-party speech?

## 1.16. Checklista testowa

Testy muszą obejmować:

- Użytkownik odpowiada "tak" przed końcem pytania.
- Użytkownik mówi "nie, inaczej" w trakcie podsumowania.
- Użytkownik mówi "konsultant" w trakcie monologu.
- Użytkownik mówi "mhm" w trakcie informacji.
- Użytkownik kaszle w trakcie TTS.
- W tle słychać drugą osobę.
- Użytkownik dyktuje numer z pauzami.
- Użytkownik poprawia jedną cyfrę.
- Użytkownik zmienia temat.
- Użytkownik reaguje złością.
- Użytkownik przerywa disclaimer.
- Użytkownik przerywa finalne potwierdzenie płatności.
- Użytkownik przerywa po polsku z akcentem/regionalizmem.
- Użytkownik mówi bardzo cicho.
- Użytkownik mówi w hałasie.

## 1.17. Przykłady dialogów

### Źle obsłużone przerwanie

Bot: "Podsumuję zamówienie. Wybrał pan dostawę na piątek, adres ulica Leśna 14, płatność kartą..."  
Użytkownik: "Nie, adres jest inny."  
Bot: "...oraz dostawę między 12:00 a 14:00. Czy potwierdza pan zamówienie?"  
Użytkownik: "Nie, mówię, że adres jest inny!"  

Analiza: bot ignoruje korektę, kontynuuje TTS i doprowadza do frustracji. Problem może być techniczny (brak barge-in), projektowy (długi prompt), albo dialogowy (brak recovery).

### Dobrze obsłużone przerwanie

Bot: "Podsumuję zamówienie. Dostawa na piątek, adres ulica Leśna..."  
Użytkownik: "Nie, adres jest inny."  
Bot: "Dobrze, poprawmy adres. Jaki adres mam wpisać?"  
Użytkownik: "Kwiatowa 8 mieszkania 12."  
Bot: "Zmieniam na Kwiatowa 8 mieszkania 12. Czy się zgadza?"  

Analiza: bot zatrzymał wypowiedź, rozpoznał korektę, zachował kontekst zamówienia i wrócił do konkretnego slotu.

### Backchannel, który nie powinien zatrzymać bota

Bot: "Reklamację można złożyć telefonicznie albo przez formularz..."  
Użytkownik: "Mhm."  
Bot: "...telefonicznie przyjmę ją teraz, a formularz wyślemy SMS-em. Którą opcję pan wybiera?"  

Analiza: "mhm" nie przejmuje tury. Dobre adaptive interruption handling powinno pozwolić botowi kontynuować.

### Przerwanie eskalacyjne

Bot: "Mogę pomóc sprawdzić status sprawy albo przyjąć dodatkowe informacje..."  
Użytkownik: "Chcę rozmawiać z człowiekiem."  
Bot: "Rozumiem. Połączę z konsultantem i przekażę, że chodzi o status sprawy. Proszę zostać na linii."  

Analiza: w sytuacji jasnej eskalacji bot nie powinien próbować na siłę zatrzymać użytkownika w automatyzacji.

## 1.18. Mini case studies

### Case 1: E-commerce, zmiana adresu

Problem: użytkownicy przerywają podsumowanie zamówienia, bo chcą poprawić adres.  
Błąd: system nie zachowuje stanu po przerwaniu i wraca do początku.  
Rozwiązanie: barge-in włączony dla podsumowania, klasyfikacja "correction", recovery do slotu "delivery_address".  
Metryki: interruption rate w podsumowaniu, recovery success, repeat rate, completion rate.

### Case 2: Bank, dyktowanie numeru

Problem: bot ucina użytkownika podczas podawania numeru klienta partiami.  
Błąd: zbyt agresywny endpointing i za niski próg końca tury.  
Rozwiązanie: konserwatywne end-of-turn dla slotu numeru, potwierdzanie grupami, możliwość korekty ostatniej grupy.  
Metryki: digit correction rate, ASR confidence, failed verification rate.

### Case 3: Reklamacja, frustracja

Problem: użytkownik mówi "już to podawałem", bot powtarza to samo pytanie.  
Błąd: fallback bez pamięci i bez reakcji emocjonalnej.  
Rozwiązanie: wykrywanie przerwania frustracyjnego, skrócona naprawa, eskalacja po drugim nieudanym kroku.  
Metryki: frustration escalation rate, no-match after interruption, CSAT after handoff.

## 1.19. Jak myśli ekspert projektujący barge-in

Ekspert nie pyta najpierw: "Czy platforma ma barge-in?". Pyta:

1. W których momentach użytkownik będzie chciał przerwać?
2. Czy przerwanie oznacza korektę, przyspieszenie, sprzeciw, frustrację, zmianę celu czy eskalację?
3. Czy prompt jest tak długi, że sam prowokuje przerwania?
4. Czy system ma techniczną możliwość zatrzymania TTS i generacji?
5. Czy po przerwaniu zachowujemy stan procesu?
6. Czy umiemy odróżnić "mhm" od "nie"?
7. Czy w danym kroku bardziej ryzykujemy fałszywe przerwanie, czy ignorowanie użytkownika?
8. Czy mamy metryki pokazujące, jak działają przerwania w produkcji?
9. Czy konsultant po handoff widzi, co użytkownik próbował zrobić?
10. Czy barge-in poprawia poczucie kontroli, czy tylko dodaje losowość?

## 1.20. Źródła wspierające rozdział

Najmocniejsze źródła naukowe:

- Gabriel Skantze, "Turn-taking in Conversational Systems and Human-Robot Interaction: A Review", Computer Speech & Language, 2021: https://www.sciencedirect.com/science/article/pii/S088523082030111X
- Majlesi et al., "Managing Turn-Taking in Human-Robot Interactions", Social Interaction, 2023: https://tidsskrift.dk/socialinteraction/article/view/137380
- Gervits & Scheutz, "Pardon the Interruption", SIGDIAL 2018: https://aclanthology.org/W18-5011/
- Crook et al., "Handling User Interruptions in an Embodied Conversational Agent", 2010: https://www.cs.ox.ac.uk/publications/publication3549-abstract.html
- Edwards et al., "Eliciting Spoken Interruptions to Inform Proactive Speech Agent Design", CUI 2021: https://dspace.library.uu.nl/handle/1874/415058
- Reicherts et al., "May I Interrupt? Diverging Opinions on Proactive Smart Speakers", CUI 2021: https://discovery.ucl.ac.uk/id/eprint/10152524/
- Imperial College London, dataset i klasyfikacja true/false interruptions, 2024: https://www.imperial.ac.uk/news/257034/analysing-speech-interruptions-help-create-more/
- TPI-VA, "Still Between Us?", ACL 2026: https://tpi-va.github.io/

Najważniejsze źródła techniczne i dokumentacyjne:

- LiveKit adaptive interruption handling: https://docs.livekit.io/agents/logic/turns/adaptive-interruption-handling/
- LiveKit turn detection and interruption configuration: https://livekit.com/blog/turn-detection-and-interruption-handling
- LiveKit VAD, endpointing and model-based turn detection: https://livekit.com/blog/turn-detection-voice-agents-vad-endpointing-model-based-detection
- OpenAI Realtime conversations: https://platform.openai.com/docs/guides/realtime-conversations
- Google Dialogflow CX advanced speech settings: https://docs.cloud.google.com/dialogflow/cx/docs/concept/advanced-speech
- AWS Connect agentic voice best practices: https://docs.aws.amazon.com/connect/latest/adminguide/agentic-voice-best-practices.html
- Amazon Lex V2 interruption docs: https://docs.aws.amazon.com/lexv2/latest/dg/interrupt-bot.html
- W3C VoiceXML 2.0: https://www.w3.org/TR/voicexml20/

---

# 6. Co powinno znaleźć się w kolejnej części

Kolejna część powinna rozpocząć pełne opracowanie rozdziałów podręcznika według stałej struktury: cele rozdziału, kluczowe pojęcia, wyjaśnienie eksperckie, perspektywa biznesowa, perspektywa użytkownika, perspektywa technologiczna, dobre praktyki, typowe błędy, checklisty, mini case study, ćwiczenia i podsumowanie.

Rekomendowana kolejność kolejnej części:

1. Część I, rozdziały 1-7: Fundamenty Conversational AI i voicebotów.
2. Część II, rozdziały 1-4: Telefonia, streaming audio, ASR i NLU.
3. Pierwsze szablony: brief projektu voicebota, karta use case'u i mapa procesu rozmowy.
