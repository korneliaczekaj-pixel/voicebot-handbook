# Voicebot Specialist Handbook

## Czesc 4: Conversation Design dla voicebotow

Wersja robocza: 2026-07-29  
Kontynuacja plikow:

- `Voicebot_Specialist_Handbook_czesc_1.md`
- `Voicebot_Specialist_Handbook_czesc_2.md`
- `Voicebot_Specialist_Handbook_czesc_3.md`

---

# Czesc III. Conversation Design dla voicebotow

## Cel calej czesci

Conversation design dla voicebotow to projektowanie przebiegu rozmowy glosowej tak, aby uzytkownik mogl wykonac zadanie szybko, zrozumiale i z poczuciem kontroli. Nie jest to samo pisanie tekstow. To projektowanie tur, pytan, potwierdzen, naprawy bledow, pauz, przerwan, tonu, emocji i eskalacji.

Po tej czesci czytelnik powinien umiec:

1. Rozroznic tekst ekranowy od komunikatu glosowego.
2. Projektowac wypowiedzi krotkie, jednoznaczne i naturalne w TTS.
3. Tworzyc powitania, pytania, potwierdzenia, reprompt'y, fallbacki i zakonczenia.
4. Projektowac flow odporny na cisze, no-match, korekty i przerwania.
5. Zdefiniowac persone i ton voicebota bez udawania czlowieka.
6. Projektowac rozmowy z uwzglednieniem emocji, frustracji i poczucia kontroli.
7. Przygotowywac scenariusze dialogowe uzyteczne dla biznesu, technologii, QA i contact center.

Zrodla wspierajace czesc:

- Skantze, turn-taking w systemach konwersacyjnych: rozumienie tur, pauz, overlap i naturalnosci.
- Zrodla o interruption handling i barge-in: szczegolnie LiveKit, Amazon Lex, Google Dialogflow CX, VoiceXML oraz prace badawcze o przerwaniach.
- W3C VoiceXML: no-input, no-match, prompt'y, formularze, menu, mixed initiative.
- Dokumentacje platform enterprise: konfiguracja speech, barge-in, endpointing, timeouty, slot filling.
- Uzupełnienie eksperckie: praktyczne zasady conversation design, projektowanie komunikatow glosowych, recovery i QA scenariuszy.

---

# Rozdzial 1. Pisanie tekstu a projektowanie rozmowy glosowej

## 1.1. Cele rozdzialu

Czytelnik nauczy sie:

- rozumiec, dlaczego komunikat glosowy nie jest tekstem odczytanym na glos;
- skracac, porcjowac i porzadkowac informacje;
- projektowac wypowiedzi pod pamiec sluchowa;
- rozpoznawac, kiedy ekran, SMS lub e-mail sa lepszym kanalem pomocniczym niz glos.

## 1.2. Kluczowe pojecia

| Pojecie | Definicja praktyczna | Typowe nieporozumienie |
|---|---|---|
| Komunikat glosowy | Wypowiedz zaprojektowana do uslyszenia, nie do przeczytania | "Wystarczy odczytac tekst FAQ" |
| Pamiec sluchowa | Zdolnosc utrzymania uslyszanej informacji przez krotki czas | "Uzytkownik zapamieta liste opcji" |
| Chunking | Dzielenie informacji na male porcje | "Im wiecej powiem naraz, tym szybciej pojdzie" |
| Progressive disclosure | Stopniowe ujawnianie informacji | "Trzeba od razu podac wszystkie mozliwosci" |
| Multichannel support | Wsparcie rozmowy glosowej innym kanalem, np. SMS-em | "Voicebot musi wszystko zalatwic glosem" |

## 1.3. Wyjasnienie eksperckie

Tekst ekranowy moze byc dluzszy, bo uzytkownik widzi go caly czas. Moze do niego wrocic, porownac opcje, przeczytac wolniej, zignorowac fragmenty i skupic wzrok na waznych danych. Glos znika po wypowiedzeniu. Dlatego kazde dodatkowe slowo ma koszt.

W voicebocie informacja musi byc:

- krotka;
- uporzadkowana;
- slyszalna w naturalnym rytmie;
- dopasowana do celu uzytkownika;
- latwa do przerwania;
- latwa do powtorzenia;
- niewymagajaca zapamietania wielu elementow.

Zly wzorzec:

"W naszej firmie moze pan uzyskac informacje o statusie zamowienia, zmienic termin dostawy, zmienic adres, sprawdzic reklamacje, uzyskac fakture, dowiedziec sie o zwrotach, anulowac zamowienie albo porozmawiac z konsultantem."

Lepszy wzorzec:

"W czym moge pomoc przy zamowieniu?"

Reprompt po ciszy:

"Moze pan powiedziec na przykład: status, zmiana adresu albo zwrot."

Uwaga praktyczna:

W glosie lista opcji jest narzedziem awaryjnym, nie podstawowym sposobem projektowania. Jesli system potrafi rozpoznac intencje, zacznij od pytania otwartego w granicach domeny, a przy ciszy podaj 2-3 przyklady.

## 1.4. Perspektywa biznesowa

Dobre komunikaty glosowe zmniejszaja:

- sredni czas rozmowy;
- no-input;
- no-match;
- liczbe powtorzen;
- liczbe przerwan;
- eskalacje spowodowane frustracja.

Zle komunikaty zwiekszaja koszt, nawet jesli technologia dziala poprawnie. Bot moze miec dobry ASR i NLU, ale jesli zada pytania niezrozumiale, uzytkownik nie da mu dobrego inputu.

## 1.5. Perspektywa uzytkownika

Uzytkownik czesto dzwoni w sytuacji zadaniowej: chce zalatwic sprawe, nie uczyc sie systemu. Komunikat glosowy powinien odpowiadac na trzy pytania:

1. Co system robi teraz?
2. Czego ode mnie potrzebuje?
3. Jak moge odpowiedziec?

Przyklad:

"Znalazlem dwa zamowienia. Ktore mam sprawdzic: z poniedzialku czy z wczoraj?"

Ten komunikat jest dobry, bo nie tlumaczy calej logiki systemu. Daje kontekst i jasny wybor.

## 1.6. Perspektywa technologiczna

Tekst dialogowy trafia do TTS, a czasem do LLM jako instrukcja odpowiedzi. Dlatego musi byc zaprojektowany tak, aby:

- TTS poprawnie go odczytal;
- liczby, daty i kody byly jednoznaczne;
- barge-in mogl zatrzymac komunikat bez utraty sensu;
- logi byly czytelne;
- warianty odpowiedzi byly kontrolowane;
- komunikaty byly wersjonowane.

W generatywnych voicebotach warto miec response style guide: zasady dlugosci, tonu, potwierdzen, zakazow i sposobow eskalacji. Model nie powinien sam decydowac, jak dlugi ma byc komunikat w kanale glosowym.

## 1.7. Dobre praktyki

- Pisz do ucha, nie do oka.
- Jedna wypowiedz = jedna mysl.
- Jedno pytanie naraz.
- Maksymalnie 2-3 przyklady w jednym komunikacie.
- Najwazniejsza informacja na poczatku.
- Dlugie dane wysylaj SMS-em lub e-mailem, jesli to lepsze.
- Testuj komunikaty przez odczyt na glos.
- Usuwaj slowa, ktore nie pomagaja uzytkownikowi wykonac kroku.

## 1.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Kopiowanie FAQ do TTS | Dlugie, nienaturalne odpowiedzi |
| Zadawanie kilku pytan naraz | Niepelne lub chaotyczne odpowiedzi |
| Wymienianie zbyt wielu opcji | Uzytkownik pamieta tylko fragment listy |
| Brak informacji, co mozna powiedziec | Cisza albo "halo?" |
| Zbyt formalny jezyk | Dystans i wieksze obciazenie poznawcze |
| Ukrywanie celu pytania | Uzytkownik nie rozumie, po co podaje dane |

## 1.9. Checklista

- Czy komunikat da sie zrozumiec po jednokrotnym uslyszeniu?
- Czy zawiera tylko jedno pytanie?
- Czy ma mniej niz 2-3 opcje?
- Czy mozna go przerwac bez utraty sensu?
- Czy TTS dobrze czyta liczby i nazwy?
- Czy uzytkownik wie, co ma powiedziec?
- Czy komunikat jest krotszy niz wersja tekstowa?
- Czy dlugie dane mozna wyslac innym kanalem?

## 1.10. Mini case study

Sklep internetowy wdrozyl voicebota do zwrotow. Pierwsza wersja odczytywala cala polityke zwrotow. Uzytkownicy przerywali i prosili o konsultanta. Druga wersja zaczynala od pytania: "Czy chce pan sprawdzic status zwrotu, czy dowiedziec sie, jak go nadac?". Dopiero po wyborze bot podawal krotka, dopasowana odpowiedz i proponowal SMS z linkiem. Spadly przerwania i czas rozmowy.

## 1.11. Cwiczenia

1. Wez dlugi komunikat z FAQ i przepisz go na wersje glosowa.
2. Skroc liste siedmiu opcji do pytania otwartego i repromptu.
3. Zaprojektuj komunikat, ktory mozna bezpiecznie przerwac.
4. Wskaz informacje, ktore lepiej wyslac SMS-em niz czytac.

## 1.12. Podsumowanie

Projektowanie glosu wymaga dyscypliny. Kazdy komunikat powinien prowadzic uzytkownika do nastepnego kroku, a nie prezentowac wszystko, co firma wie. Voicebot nie jest audiobookiem procedury.

---

# Rozdzial 2. Zasady projektowania wypowiedzi voicebota

## 2.1. Cele rozdzialu

Czytelnik nauczy sie:

- stosowac zasady jasnych wypowiedzi glosowych;
- projektowac komunikaty informacyjne, pytania i potwierdzenia;
- kontrolowac dlugosc, formalnosc, tempo i jednoznacznosc;
- tworzyc standardy copy dla voicebota.

## 2.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Prompt | Wypowiedz bota kierowana do uzytkownika |
| Prompt hierarchy | Priorytet informacji w komunikacie |
| Microcopy glosowe | Krotkie teksty operacyjne w rozmowie |
| Confirmation | Potwierdzenie danych lub decyzji |
| Explicit confirmation | Potwierdzenie wymagajace odpowiedzi uzytkownika |
| Implicit confirmation | Potwierdzenie wplecione w kolejny krok |
| Repair prompt | Komunikat naprawczy po bledzie |

## 2.3. Wyjasnienie eksperckie

Dobra wypowiedz voicebota ma funkcje. Nie "brzmi ladnie", tylko wykonuje zadanie w rozmowie.

Najczestsze funkcje:

1. Ustanowienie kontekstu: "Znalazlem pana zamowienie."
2. Zapytanie o dane: "Jaki adres mam wpisac?"
3. Potwierdzenie: "Adres to Kwiatowa 8, mieszkania 12."
4. Informacja o dzialaniu: "Sprawdzam dostepne terminy."
5. Naprawa: "Nie mam pewnosci, czy dobrze uslyszalem numer."
6. Eskalacja: "Polacze z konsultantem."
7. Zakonczenie: "Gotowe. Potwierdzenie wyslalem SMS-em."

Komunikat powinien miec priorytet:

```text
Najpierw: co sie stalo / czego potrzebuje system
Potem: co uzytkownik ma zrobic
Na koncu: opcjonalne przyklady lub dodatkowe informacje
```

Przyklad:

"Nie znalazlem zamowienia pod tym numerem. Prosze podac numer jeszcze raz, po trzy cyfry."

Komunikat jest lepszy niz:

"Niestety, w wyniku wyszukiwania w naszym systemie nie udalo sie odnalezc zamowienia, ktore odpowiadaloby podanym przez pana danym, dlatego prosze sprobowac ponownie."

## 2.4. Perspektywa biznesowa

Standard wypowiedzi bota jest czescia standardu obslugi klienta. Dobre wypowiedzi:

- zmniejszaja czas szkolenia projektantow;
- ulatwiaja QA;
- zapewniaja spojnosc marki;
- redukuja ryzyka prawne;
- pomagaja utrzymywac jakosc przy wielu use case'ach.

Firma powinna miec voice style guide, czyli dokument zawierajacy:

- ton;
- poziom formalnosci;
- zasady przepraszania;
- zasady potwierdzania danych;
- zasady dlugosci komunikatow;
- slowa zakazane;
- wzorce fallbackow;
- wzorce eskalacji.

## 2.5. Perspektywa uzytkownika

Uzytkownik ceni:

- prostote;
- przewidywalnosc;
- brak upokarzajacych komunikatow;
- jasny kolejny krok;
- potwierdzenie waznych danych;
- mozliwosc poprawy.

Zamiast:

"Niepoprawna odpowiedz."

Lepiej:

"Nie mam pewnosci, czy dobrze zrozumialem. Prosze powiedziec: tak albo nie."

## 2.6. Perspektywa technologiczna

Komunikaty powinny byc zapisane w sposob pozwalajacy:

- wersjonowac tresci;
- laczyc komunikat z etapem flow;
- testowac warianty;
- analizowac, po ktorych promptach rosnie no-input, no-match lub barge-in;
- kontrolowac generacje LLM;
- dostosowywac TTS.

Przyklady pol w dokumentacji promptu:

| Pole | Opis |
|---|---|
| prompt_id | Stabilny identyfikator |
| flow_step | Krok dialogu |
| user_goal | Cel uzytkownika |
| bot_goal | Cel bota |
| text | Tresc do TTS |
| barge_in_policy | Wlaczony/ograniczony/wylaczony |
| expected_user_input | Jakiej odpowiedzi oczekujemy |
| fallback | Co robimy po no-match |
| metrics | Jak mierzymy skutecznosc |

## 2.7. Dobre praktyki

- Zaczynaj od czasownika lub konkretu.
- Unikaj biernej strony.
- Unikaj zargonu i formalizmow.
- Potwierdzaj dane krytyczne.
- Nie przepraszaj bez konca.
- Nie mow "rozumiem", jesli system nie rozumie.
- Dla bledow dawaj instrukcje, nie tylko komunikat bledu.
- Projektuj warianty dla pierwszej i kolejnej proby.

## 2.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| "Przepraszam" w kazdym fallbacku | Bot brzmi bezradnie |
| Brak instrukcji po bledzie | Uzytkownik nie wie, co zmienic |
| Zbyt wiele uprzejmosci | Dluższa rozmowa bez wartosci |
| Potwierdzanie wszystkiego | Spowolnienie procesu |
| Niepotwierdzanie danych krytycznych | Ryzyko blednej akcji |
| "Czy moge jeszcze w czyms pomoc?" po kazdej sprawie | Dodatkowe, czesto niepotrzebne tury |

## 2.9. Checklista wypowiedzi

- Czy komunikat ma jedna funkcje?
- Czy najwazniejsza informacja jest na poczatku?
- Czy uzytkownik wie, co ma powiedziec?
- Czy usunieto slowa bez funkcji?
- Czy ton pasuje do sytuacji?
- Czy komunikat jest inny przy drugim bledzie?
- Czy dane krytyczne sa potwierdzone?
- Czy prompt ma ID i miejsce w flow?

## 2.10. Mini case study

Voicebot helpdesku IT po nierozpoznaniu problemu mowil: "Przepraszam, nie zrozumialem. Prosze powtorzyc." Po trzech probach uzytkownicy byli sfrustrowani. Nowy wariant: "Nie mam pewnosci, czy chodzi o VPN, haslo czy poczte. Ktore z tych trzech?". Bot nie tylko informuje o bledzie, ale zawęża przestrzen odpowiedzi. No-match spada.

## 2.11. Cwiczenia

1. Napisz trzy warianty promptu po no-match: pierwszy, drugi i trzeci.
2. Zaprojektuj explicit confirmation dla zmiany adresu.
3. Zaprojektuj implicit confirmation dla statusu zamowienia.
4. Wypisz 10 slow, ktorych bot w twojej organizacji nie powinien uzywac.

## 2.12. Podsumowanie

Kazda wypowiedz voicebota powinna miec funkcje dialogowa. Dobre microcopy glosowe prowadzi rozmowe, zmniejsza obciazenie poznawcze i ułatwia systemowi otrzymanie poprawnego inputu.

---

# Rozdzial 3. Turn-taking w praktyce conversation design

## 3.1. Cele rozdzialu

Czytelnik nauczy sie:

- projektowac rozmowe jako wymiane tur;
- rozumiec, kiedy bot powinien mowic, sluchac i czekac;
- uwzgledniac pauzy, overlap, barge-in i endpointing;
- projektowac timing rozmowy razem z zespołem technicznym.

## 3.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Tura | Fragment rozmowy nalezacy do jednego mowcy |
| Turn-taking | Organizacja zmian mowcy |
| TRP | Miejsce potencjalnego przejecia tury |
| Overlap | Nakladanie sie wypowiedzi |
| Barge-in | Uzytkownik wchodzi w wypowiedz bota |
| Endpointing | Decyzja, czy uzytkownik skonczyl mowic |
| Floor | "Prawo glosu" w danym momencie rozmowy |

## 3.3. Wyjasnienie eksperckie

Projektant rozmowy glosowej nie projektuje tylko tekstow. Projektuje rytm:

- jak dluga jest tura bota;
- kiedy bot oddaje glos;
- czy oczekuje krotkiej odpowiedzi;
- czy uzytkownik moze mowic dlugo;
- kiedy bot powinien poczekac;
- kiedy powinien dopytac;
- kiedy powinien przerwac wlasna wypowiedz po barge-in.

Wynika ze zrodel naukowych: naturalne turn-taking opiera sie na przewidywaniu konca tury, nie tylko na pauzie. W systemach glosowych trzeba uwzglednic sygnaly semantyczne i kontekstowe, bo sama cisza jest zbyt prymitywnym sygnalem.

Uzupelnienie eksperckie: conversation designer powinien oznaczac w scenariuszu oczekiwany typ inputu:

| Typ inputu | Projekt timingowy |
|---|---|
| Tak/nie | Krotka odpowiedz, szybkie endpointing, mozliwy barge-in |
| Numer/kod | Tolerancja pauz, potwierdzanie grupami, DTMF fallback |
| Opis problemu | Dluzsze sluchanie, mniej agresywne endpointing |
| Emocjonalna skarga | Dlugie sluchanie, szybka eskalacja po sygnalach frustracji |
| Wybor z 2 opcji | Jasny prompt, szybka interpretacja |
| Swobodna intencja | Pytanie otwarte, disambiguation przy niepewnosci |

## 3.4. Perspektywa biznesowa

Timing wplywa na:

- AHT;
- skutecznosc zbierania danych;
- porzucenia rozmow;
- liczbe powtorzen;
- eskalacje;
- jakosc danych w CRM/ticketingu.

Zbyt szybki bot moze robic bledy. Zbyt wolny bot generuje koszt i frustracje. Dobra decyzja timingowa wynika z wartosci kroku: dla prostego potwierdzenia liczy sie szybkość, dla numeru klienta liczy sie dokladnosc.

## 3.5. Perspektywa uzytkownika

Uzytkownik czuje sie dobrze, gdy:

- bot nie wchodzi mu w slowo;
- bot nie zostawia zbyt dlugich ciszy;
- bot pozwala przerwac;
- bot rozpoznaje, ze wypowiedz jeszcze trwa;
- bot nie wymusza nienaturalnego tempa.

Bot powinien dopasowac tempo do zadania. Starszy uzytkownik dyktujacy numer potrzebuje innego rytmu niz klient e-commerce mowiacy "chce zwrot".

## 3.6. Perspektywa technologiczna

Conversation designer powinien wspolpracowac z technologia przy ustawieniach:

- no-speech timeout;
- end-of-speech sensitivity;
- end-of-turn threshold;
- VAD sensitivity;
- barge-in policy;
- max user turn duration;
- silence handling;
- confirmation threshold.

Te ustawienia nie powinny byc globalne. Powinny zalezec od kroku dialogu.

## 3.7. Dobre praktyki

- Oznaczaj oczekiwany typ odpowiedzi w scenariuszu.
- Dla dlugich slotow dawaj instrukcje mowienia w grupach.
- Dla pytan tak/nie nie dawaj dlugich promptow.
- Dla opisow problemu nie ucinal uzytkownika po krotkiej pauzie.
- Projektuj barge-in dla promptow informacyjnych.
- Mierz przerwania per prompt.
- Projektuj recovery po overlap.

## 3.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Jeden timeout dla calego bota | Ucinanie albo martwa cisza |
| Brak oznaczenia typu inputu | Technologia nie wie, jak stroic krok |
| Za dlugie tury bota | Wiecej barge-in |
| Brak barge-in przy podsumowaniach | Uzytkownik nie moze poprawic bledu |
| Bot odpowiada po kazdej mikropauzie | Wchodzi w slowo |

## 3.9. Checklista turn-taking

- Czy kazdy krok ma oczekiwany typ inputu?
- Czy dlugie odpowiedzi uzytkownika maja dluzsze endpointing?
- Czy krotkie odpowiedzi maja szybka reakcje?
- Czy barge-in jest skonfigurowany per prompt?
- Czy bot zachowuje kontekst po przerwaniu?
- Czy no-input i no-match maja rozne reakcje?
- Czy testujemy rozmowy z pauzami i overlap?

## 3.10. Mini case study

Voicebot medyczny pyta: "Prosze opisac, co sie dzieje." Endpointing byl ustawiony jak dla pytan tak/nie. Pacjenci robili pauze po pierwszym zdaniu, a bot od razu zaczynal diagnozowac kategorie sprawy. Po zmianie ten krok otrzymal dluzsze okno sluchania, krotki backchannel "Rozumiem, prosze mowic dalej" tylko w wybranych sytuacjach oraz eskalacje przy sygnalach pilnosci. Jakosc klasyfikacji wzrosla.

## 3.11. Cwiczenia

1. Dla pieciu krokow flow oznacz typ inputu i polityke endpointing.
2. Zaprojektuj krok zbierania kodu z pauzami.
3. Zaprojektuj zachowanie bota, gdy uzytkownik zaczyna mowic w trakcie podsumowania.
4. Wypisz metryki turn-taking dla pilota.

## 3.12. Podsumowanie

Turn-taking jest ukrytym szkieletem rozmowy. Jesli jest zle zaprojektowane, nawet dobre teksty i modele beda brzmiec sztucznie. Conversation designer musi projektowac nie tylko co bot mowi, ale kiedy mowi, kiedy slucha i kiedy oddaje kontrole.

---

# Rozdzial 4. Persona voicebota, ton, styl i formalnosc

## 4.1. Cele rozdzialu

Czytelnik nauczy sie:

- definiowac persone voicebota w sposob praktyczny;
- odrozniac osobowosc marki od udawania czlowieka;
- dobierac ton do branzy, sytuacji i emocji;
- tworzyc zasady jezykowe dla zespolu.

## 4.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Persona voicebota | Zestaw zasad okreslajacy, jak bot brzmi i zachowuje sie w rozmowie |
| Ton | Emocjonalne zabarwienie wypowiedzi |
| Styl | Sposob formulowania komunikatow |
| Formalnosc | Poziom oficjalnosci jezyka |
| Brand voice | Jezyk marki |
| Transparency | Jasne informowanie, ze rozmowca jest systemem AI |
| False empathy | Udawanie emocjonalnego rozumienia bez realnej zdolnosci pomocy |

## 4.3. Wyjasnienie eksperckie

Persona voicebota nie polega na wymysleniu imienia i charakteru. To operacyjny dokument, ktory pomaga pisac spójne komunikaty i ograniczac ryzyka.

Dobra persona odpowiada na pytania:

- Kim bot jest w procesie?
- Co moze zrobic?
- Czego nie moze zrobic?
- Jak mowi o sobie?
- Jak reaguje na blad?
- Jak reaguje na frustracje?
- Jak informuje o eskalacji?
- Czy uzywa "pan/pani", czy form neutralnych?
- Jak brzmi w sprawach prawnych, medycznych, finansowych?

Praktyczny profil:

```text
Rola: automatyczny asystent obslugi zamowien
Styl: krotki, konkretny, spokojny
Formalnosc: uprzejme pan/pani
Nie robi: nie udaje konsultanta, nie zartuje w reklamacjach, nie obiecuje decyzji
Mowi o sobie: "jestem automatycznym asystentem"
Priorytet: zalatwic sprawe lub szybko przekazac do konsultanta
```

## 4.4. Perspektywa biznesowa

Persona bota wplywa na:

- zaufanie do marki;
- spojnosc obslugi;
- compliance;
- eskalacje;
- odbior automatyzacji.

W banku, medycynie lub windykacji zbyt swobodny ton moze byc nieprofesjonalny. W e-commerce zbyt urzedowy ton moze zwiekszac dystans. Persona musi wynikac z kontekstu uzycia, nie z gustu zespolu.

## 4.5. Perspektywa uzytkownika

Uzytkownik powinien od poczatku wiedziec:

- ze rozmawia z automatycznym systemem;
- w czym system moze pomoc;
- jak przejsc dalej;
- ze moze poprawic lub poprosic o czlowieka.

Transparentnosc nie musi brzmiec ciezko:

"Dzien dobry, jestem automatycznym asystentem firmy X. Pomoge sprawdzic zamowienie albo polacze z konsultantem. W czym moge pomoc?"

## 4.6. Perspektywa technologiczna

Persona powinna byc zakodowana w:

- promptach systemowych LLM;
- response templates;
- style guide;
- regułach generowania odpowiedzi;
- testach QA;
- kryteriach akceptacji;
- slowniku slow zakazanych;
- fallbackach i eskalacjach.

W voicebotach generatywnych persona musi miec twarde ograniczenia:

- maksymalna dlugosc odpowiedzi;
- zakaz udawania czlowieka;
- zasady "nie wiem";
- zasady przepraszania;
- zasady eskalacji;
- zakaz porad poza domena.

## 4.7. Dobre praktyki

- Projektuj persone jako role obslugi, nie fikcyjna postac.
- Badz transparentny, ze to system.
- Nie udawaj emocji, ktorych bot nie moze realnie miec.
- Dopasuj formalnosc do branzy i sytuacji.
- Ustal jezyk bledow i eskalacji.
- Testuj tone-of-voice na trudnych scenariuszach, nie tylko happy path.
- Unikaj zartow w sytuacjach stresowych.

## 4.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Nadawanie botowi zbyt ludzkiej roli | Rozczarowanie i ryzyko zaufania |
| Brak transparentnosci | Uzytkownik czuje sie oszukany |
| Zbyt marketingowy ton | Brak wiarygodnosci w obsludze problemu |
| Zbyt formalny jezyk | Wiecej obciazenia poznawczego |
| Zarty w reklamacjach | Eskalacja frustracji |
| Brak zasad dla LLM | Niespojny ton |

## 4.9. Checklista persony

- Czy bot jasno mowi, ze jest automatyczny?
- Czy rola bota jest okreslona?
- Czy wiemy, czego bot nie powinien mowic?
- Czy ton pasuje do trudnych sytuacji?
- Czy mamy wzorce przeprosin?
- Czy mamy wzorce eskalacji?
- Czy persona jest wpisana w prompt systemowy?
- Czy QA ocenia ton, nie tylko poprawna intencje?

## 4.10. Mini case study

Firma windykacyjna chciala, aby bot brzmial "przyjaznie i lekko". Pierwsze komunikaty uzywaly sformulowan "spokojnie, zaraz to ogarniemy". Uzytkownicy odbierali to jako lekcewazenie. Persona zostala zmieniona na spokojna, rzeczowa i neutralna: "Wyjasnie dostepne opcje. Jesli kwestionuje pan naleznosc, polacze z konsultantem." Spadla liczba agresywnych reakcji w testach UAT.

## 4.11. Cwiczenia

1. Zdefiniuj persone bota dla przychodni.
2. Napisz trzy rzeczy, ktorych bot nie powinien mowic.
3. Przygotuj powitanie transparentne, ale krotkie.
4. Przepisz zbyt luzny komunikat na wersje profesjonalna.

## 4.12. Podsumowanie

Persona voicebota to narzedzie kontroli jakosci i zaufania. Dobry bot nie musi byc "jak czlowiek". Ma byc jasny, pomocny, przewidywalny i uczciwy co do swoich mozliwosci.

---

# Rozdzial 5. Projektowanie powitan, pytan, potwierdzen i zakonczen

## 5.1. Cele rozdzialu

Czytelnik nauczy sie:

- projektowac pierwsze sekundy rozmowy;
- zadawac pytania, ktore daja dobre dane;
- dobierac typ potwierdzenia do ryzyka;
- konczyc rozmowe bez niepotrzebnych tur.

## 5.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Opening | Powitanie i ustawienie kontekstu rozmowy |
| Capability framing | Krotkie wyjasnienie, w czym bot moze pomoc |
| Question design | Projektowanie pytan pod odpowiedzi uzytkownika |
| Open prompt | Pytanie otwarte w zakresie domeny |
| Directed prompt | Pytanie ukierunkowane |
| Explicit confirmation | Potwierdzenie wymagajace "tak/nie" |
| Implicit confirmation | Potwierdzenie bez zatrzymywania flow |
| Closing | Zakonczenie rozmowy |

## 5.3. Wyjasnienie eksperckie

### Powitanie

Powitanie ma trzy funkcje:

1. Poinformowac, z kim uzytkownik rozmawia.
2. Ustawic zakres.
3. Zaprosic do celu.

Dobre:

"Dzien dobry, jestem automatycznym asystentem firmy X. Pomoge w sprawach zamowien. W czym moge pomoc?"

Zle:

"Witamy serdecznie w najnowoczesniejszym systemie automatycznej obslugi klienta firmy X, ktory zostal zaprojektowany, aby zapewnic panstwu najwyzsza jakosc kontaktu..."

### Pytania

Dobre pytanie:

- pyta o jedna rzecz;
- daje jasna forme odpowiedzi;
- nie sugeruje zbyt wielu opcji;
- jest dopasowane do danych, ktore system potrafi przetworzyc.

Przyklady:

- "Jaki jest numer zamowienia?"
- "Na jaki dzien chce pan przelozyc dostawe?"
- "Czy chodzi o fakture, dostawe czy zwrot?"

### Potwierdzenia

Nie wszystko trzeba potwierdzac. Potwierdzenia maja koszt czasowy. Dobieraj je do ryzyka.

| Dane | Typ potwierdzenia |
|---|---|
| Intencja niskiego ryzyka | Implicit |
| Adres, data, godzina | Explicit lub implicit zalezne od skutku |
| Platnosc, zgoda, anulowanie | Explicit |
| Pytanie FAQ | Brak lub implicit |
| Dane osobowe | Ostrozne, minimalne |

### Zakonczenie

Dobre zakonczenie:

- mowi, co zostalo zrobione;
- informuje o nastepnym kroku;
- nie przeciaga rozmowy;
- daje kanal potwierdzenia.

"Gotowe. Termin zmieniony na czwartek, 15:30. Potwierdzenie wyslalem SMS-em. Dziekuje za rozmowe."

## 5.4. Perspektywa biznesowa

Powitanie wplywa na opt-in do automatyzacji. Pytania wplywaja na jakosc danych. Potwierdzenia wplywaja na koszt bledow. Zakonczenie wplywa na repeat contact.

Jesli bot nie powie, co zostalo zrobione, uzytkownik moze zadzwonic ponownie. Jesli bot zada zle pytanie, integracja moze dostac zle dane. Jesli bot nie potwierdzi anulowania, firma moze miec reklamacje.

## 5.5. Perspektywa uzytkownika

Uzytkownik potrzebuje przewidywalnosci:

- "wiem, z kim rozmawiam";
- "wiem, co moge powiedziec";
- "wiem, ze dobrze mnie zrozumiano";
- "wiem, co sie stalo na koncu".

Najbardziej frustrujace sa pytania, ktore wygladaja prosto, ale sa niejasne:

"Prosze podac dane."

Jakie dane? Numer zamowienia, PESEL, nazwisko, telefon?

## 5.6. Perspektywa technologiczna

Pytania musza byc powiazane ze slotami. Kazde pytanie powinno miec:

- slot docelowy;
- typ danych;
- walidacje;
- przyklady odpowiedzi;
- prompt naprawczy;
- polityke potwierdzenia;
- polityke endpointing;
- barge-in policy.

## 5.7. Dobre praktyki

- W powitaniu powiedz, ze bot jest automatyczny.
- Nie wymieniaj zbyt wielu mozliwosci.
- Zadawaj jedno pytanie naraz.
- Projektuj pytania tak, aby uzytkownik mogl odpowiedziec naturalnie.
- Potwierdzaj tylko tam, gdzie ma to wartosc.
- W zakonczeniu nazwij wykonana akcje.
- Przy waznych sprawach wysylaj potwierdzenie poza kanalem glosowym.

## 5.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Powitanie jako monolog | Przerwania od pierwszych sekund |
| Brak informacji, ze to bot | Utrata zaufania |
| Pytanie o kilka danych naraz | Niepelne odpowiedzi |
| Potwierdzanie kazdej drobnostki | Dlugie rozmowy |
| Brak potwierdzenia akcji krytycznej | Ryzyko reklamacji |
| Otwarte zakonczenie bez wyniku | Repeat contact |

## 5.9. Checklista

- Czy powitanie jest krotsze niz 10-15 sekund?
- Czy bot informuje, ze jest automatyczny?
- Czy pierwsze pytanie zaprasza do celu?
- Czy kazde pytanie zbiera jeden slot?
- Czy dane krytyczne sa potwierdzane?
- Czy potwierdzenia nie spowalniaja niepotrzebnie?
- Czy zakonczenie mowi, co zostalo zrobione?
- Czy uzytkownik dostaje potwierdzenie SMS/e-mail, jesli potrzebne?

## 5.10. Mini case study

Voicebot rezerwacyjny konczyl rozmowe slowami: "Czy moge jeszcze w czyms pomoc?". Wielu uzytkownikow odpowiadalo "nie wiem" albo zadawalo pytania poza zakresem, co wydluzalo rozmowy. Zmieniono zakonczenie: "Wizyta jest umowiona na srode o 11:00. Potwierdzenie wyslalem SMS-em. Dziekuje za rozmowe." Dodatkowe tury spadly, a repeat contact nie wzrosl.

## 5.11. Cwiczenia

1. Napisz powitanie dla bota bankowego.
2. Zaprojektuj pytanie o termin wizyty.
3. Wybierz typ potwierdzenia dla zmiany adresu.
4. Napisz zakonczenie po utworzeniu reklamacji.

## 5.12. Podsumowanie

Powitania, pytania, potwierdzenia i zakonczenia sa podstawowymi narzedziami kontroli rozmowy. Dobrze zaprojektowane pozwalaja uzytkownikowi mowic naturalnie, a systemowi zbierac dane bez chaosu.

---

# Rozdzial 6. Cisza, no-input, no-match, fallback i reprompt

## 6.1. Cele rozdzialu

Czytelnik nauczy sie:

- odrozniac cisze od niezrozumienia;
- projektowac no-input i no-match jako rozne sytuacje;
- tworzyc reprompt'y, ktore pomagaja, a nie powtarzaja blad;
- projektowac fallback jako naprawe rozmowy, nie porazke.

## 6.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| No-input | Uzytkownik nic nie powiedzial lub system nie wykryl mowy |
| No-match | System wykryl input, ale nie dopasowal go do oczekiwan |
| Fallback | Sciezka po niezrozumieniu lub nieobslugiwanej sytuacji |
| Reprompt | Kolejny komunikat zadajacy pytanie ponownie lub inaczej |
| Escalation threshold | Moment, w ktorym trzeba przekazac do czlowieka |
| Repair strategy | Strategia naprawy rozmowy |

## 6.3. Wyjasnienie eksperckie

No-input i no-match wymagaja innych reakcji.

No-input moze oznaczac:

- uzytkownik nie uslyszal;
- zastanawia sie;
- szuka danych;
- jest zaskoczony;
- mikrofon/telefonia zawiodla;
- pytanie bylo za trudne;
- uzytkownik odszedl od telefonu.

No-match oznacza:

- uzytkownik powiedzial cos poza zakresem;
- ASR zle przepisal;
- NLU zle sklasyfikowalo;
- pytanie bylo niejasne;
- uzytkownik ma inny cel;
- uzytkownik odpowiedzial zbyt szeroko.

Zly fallback:

"Nie zrozumialem. Prosze powtorzyc."

Lepszy pierwszy no-match:

"Nie mam pewnosci, czy chodzi o dostawe, zwrot czy fakture. Ktora sprawa?"

Lepszy drugi no-match:

"Zeby nie przedluzac, polacze z konsultantem, ktory pomoze w tej sprawie."

## 6.4. Perspektywa biznesowa

Fallbacki to jedno z najwazniejszych miejsc optymalizacji. Wysoki fallback rate pokazuje:

- zly use case;
- brak intencji;
- zle pytania;
- slaby ASR;
- zbyt szeroki zakres uzytkownikow;
- niedobre dane treningowe.

Nie nalezy ukrywac fallbackow. Trzeba je analizowac jako glos rynku: ludzie mowia, czego system nie obsluguje.

## 6.5. Perspektywa uzytkownika

Uzytkownik akceptuje naprawe, jesli czuje postep. Nie akceptuje petli.

Zasada psychologiczna:

Nie powtarzaj identycznie tego samego pytania trzy razy. Jesli pierwsza forma nie zadzialala, druga powinna zawęzić opcje, uproscic zadanie albo dac przyklad. Trzecia powinna oferowac alternatywe lub handoff.

## 6.6. Perspektywa technologiczna

Fallback powinien byc logowany z kontekstem:

- prompt_id;
- ASR transcript;
- confidence;
- expected input;
- actual input;
- dialog state;
- fallback count;
- outcome;
- handoff reason.

W LLM voicebotach fallback moze byc bardziej subtelny: model zawsze cos odpowie. Dlatego trzeba wykrywac odpowiedzi niskiej jakosci, nie tylko klasyczne no-match.

## 6.7. Dobre praktyki

- Projektuj osobne komunikaty dla no-input i no-match.
- Pierwszy reprompt moze byc delikatny.
- Drugi reprompt powinien zawęzić opcje.
- Po kilku niepowodzeniach eskaluj albo zmien kanal.
- Nie obwiniaj uzytkownika.
- Loguj, co uzytkownik powiedzial.
- Analizuj fallbacki co tydzien po wdrozeniu.
- Projektuj fallbacki per krok, nie tylko globalne.

## 6.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Jeden globalny fallback | Brak dopasowania do sytuacji |
| Identyczne powtorzenia | Frustracja |
| Brak eskalacji | Uzytkownik utknal |
| Brak analizy transkrypcji fallbackow | Brak optymalizacji |
| Bot przeprasza, ale nie pomaga | Poczucie bezradnosci systemu |
| LLM improwizuje poza zakresem zamiast fallbacku | Ryzyko halucynacji |

## 6.9. Checklista fallbackow

- Czy kazdy krytyczny krok ma no-input?
- Czy kazdy krytyczny krok ma no-match?
- Czy drugi reprompt jest inny niz pierwszy?
- Czy fallback zawęża odpowiedz?
- Czy jest prog eskalacji?
- Czy fallbacki sa logowane?
- Czy analizujemy najczestsze frazy z fallbackow?
- Czy bot nie obwinia uzytkownika?

## 6.10. Mini case study

Voicebot przyjmujacy zgloszenia IT mial globalny fallback. Gdy uzytkownik mowil "nie dziala mi token", bot odpowiadal "Prosze powtorzyc". Po analizie okazalo sie, ze wiele fallbackow dotyczy MFA, ale intencja nie istniala. Dodano intencje "problem_mfa", przyklady fraz i reprompt: "Czy chodzi o kod SMS, aplikacje autoryzacyjna czy token?". Fallback rate spadl.

## 6.11. Cwiczenia

1. Zaprojektuj no-input i no-match dla pytania o numer zamowienia.
2. Napisz trzy poziomy repromptu dla wyboru terminu.
3. Wskaz, kiedy bot powinien eskalowac.
4. Zaprojektuj raport analizy fallbackow.

## 6.12. Podsumowanie

Fallback to nie smietnik na bledy. To zaprojektowana strategia naprawy rozmowy. Dobre fallbacki pomagaja uzytkownikowi odpowiedziec inaczej, ujawniaja luki systemu i chronia przed frustracja.

---

# Rozdzial 7. Projektowanie barge-in, przerwan i korekt w dialogu

## 7.1. Cele rozdzialu

Czytelnik nauczy sie:

- projektowac przerwania jako normalna czesc rozmowy;
- rozroznic korekte, zmiane tematu, przyspieszenie i eskalacje;
- dokumentowac polityke barge-in w scenariuszu;
- projektowac recovery po przerwaniu.

## 7.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Barge-in | Przerwanie wypowiedzi bota przez uzytkownika |
| Correction | Poprawienie danych lub interpretacji |
| Topic shift | Zmiana tematu lub intencji |
| Acceleration | Proba przyspieszenia rozmowy |
| Escalation request | Prosba o czlowieka |
| Recovery after interruption | Kontynuacja rozmowy po przerwaniu z zachowaniem kontekstu |

## 7.3. Wyjasnienie eksperckie

Przerwania sa naturalne. Uzytkownik przerywa, gdy:

- zna odpowiedz przed koncem pytania;
- bot zle zrozumial;
- bot mowi za dlugo;
- uzytkownik chce zmienic cel;
- uzytkownik jest sfrustrowany;
- uzytkownik chce czlowieka;
- pojawia sie pilna informacja.

Conversation designer powinien dla kazdego waznego promptu okreslic:

| Element | Pytanie |
|---|---|
| Czy barge-in wlaczony? | Czy uzytkownik moze bezpiecznie przerwac? |
| Co moze oznaczac przerwanie? | Korekta, zgoda, sprzeciw, eskalacja, backchannel? |
| Jak zatrzymujemy bot response? | Czy TTS i generacja sa anulowane? |
| Co robimy z kontekstem? | Wracamy do slotu, zmieniamy intencje, eskalujemy? |
| Jak odpowiadamy? | Krotkie uznanie i kolejny krok |

## 7.4. Perspektywa biznesowa

Barge-in poprawia:

- poczucie kontroli;
- AHT;
- korekte bledow;
- completion rate.

Ale zle zaprojektowany moze pogorszyc:

- stabilnosc flow;
- dokladnosc danych;
- compliance przy promptach prawnych;
- analityke, jesli przerwania nie sa logowane.

## 7.5. Perspektywa uzytkownika

Uzytkownik, ktory przerywa, czesto komunikuje: "system idzie w zla strone". Dobra reakcja pokazuje, ze bot slucha:

Uzytkownik: "Nie, nie ten adres."  
Bot: "Dobrze, poprawmy adres. Jaki ma byc?"

Zla reakcja:

Bot kontynuuje odczyt albo wraca do poczatku.

## 7.6. Perspektywa technologiczna

Scenariusz powinien zawierac wymagania:

- barge-in enabled/disabled/limited;
- allowed interruption intents;
- backchannel handling;
- false barge-in tolerance;
- slot correction mapping;
- state preservation;
- TTS cancellation;
- LLM response cancellation;
- logging interruption event.

## 7.7. Dobre praktyki

- Wlacz barge-in przy dlugich informacjach i podsumowaniach.
- Projektuj korekte pojedynczego slotu.
- Nie restartuj flow po przerwaniu.
- Rozpoznawaj "konsultant" jako wysoki priorytet.
- Ignoruj backchannele, gdy nie wymagaja przejecia tury.
- Przy frustracji skroc rozmowe.
- Przy drugim nieudanym recovery eskaluj.

## 7.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Brak barge-in | Bot przegaduje uzytkownika |
| Globalny barge-in bez filtrowania | Bot zatrzymuje sie po szumie |
| Brak korekty slotu | Reset rozmowy |
| Ignorowanie "konsultant" | Silna frustracja |
| Brak logow przerwan | Nie wiadomo, co poprawiac |
| Nieodroznianie backchannel od przerwania | Nienaturalna rozmowa |

## 7.9. Checklista przerwan

- Czy prompt jest przerywalny?
- Czy mamy intencje korekty?
- Czy mamy intencje eskalacji?
- Czy mamy obsluge "stop", "czekaj", "nie", "inaczej"?
- Czy bot zachowuje zebrane dane?
- Czy przerwanie jest logowane?
- Czy QA testuje przerwania w tym kroku?
- Czy komunikat recovery jest krotki?

## 7.10. Mini case study

Voicebot bankowy odczytywal oferte limitu i nie pozwalal przerwac. Uzytkownicy mowili "nie chce", ale bot konczyl caly komunikat. Po zmianie barge-in wlaczono dla czesci sprzedazowej, a "nie chce" kierowalo do neutralnego zamkniecia: "Rozumiem, nie bede kontynuowac oferty. Czy chce pan zalatwic cos jeszcze z karta?". Spadly skargi na nachalnosc.

## 7.11. Cwiczenia

1. Dla podsumowania zamowienia zaprojektuj trzy typy przerwan i recovery.
2. Napisz dialog z korekta adresu.
3. Zaprojektuj reakcje na "konsultant" w trakcie promptu.
4. Wskaz prompt, gdzie barge-in powinien byc ograniczony.

## 7.12. Podsumowanie

Przerwania nie sa wyjatkiem od rozmowy. Sa czescia naturalnej kontroli dialogu. Dobry voicebot nie tylko pozwala przerwac, ale wie, co przerwanie znaczy i jak wrocic do sensownego miejsca.

---

# Rozdzial 8. Projektowanie dla emocji uzytkownika

## 8.1. Cele rozdzialu

Czytelnik nauczy sie:

- rozpoznawac emocjonalne konteksty rozmow;
- projektowac komunikaty dla frustracji, niepewnosci i stresu;
- odrozniac empatie od fałszywej empatii;
- tworzyc warunki szybkiej eskalacji w sytuacjach trudnych.

## 8.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Emotional context | Emocjonalne tlo rozmowy |
| Frustration signal | Sygnal irytacji, np. powtarzanie, podniesiony glos, przeklenstwa |
| De-escalation | Obnizanie napiecia |
| False empathy | Udawanie emocji bez realnej pomocy |
| Sensitive domain | Obszar o wysokim ryzyku emocjonalnym lub prawnym |
| Crisis escalation | Natychmiastowe przekazanie do czlowieka lub odpowiedniej procedury |

## 8.3. Wyjasnienie eksperckie

Voicebot czesto rozmawia z ludzmi, ktorzy:

- spiesza sie;
- sa zdenerwowani;
- nie rozumieja procedury;
- boja sie kosztow;
- czuja niesprawiedliwosc;
- sa chorzy lub opiekuja sie kims chorym;
- maja problem finansowy;
- probuja odzyskac kontrole.

Projektowanie dla emocji nie oznacza, ze bot ma mowic "doskonale pana rozumiem". Bot nie rozumie jak czlowiek. Lepiej projektowac konkretna pomoc:

Zamiast:

"Rozumiem pana frustracje."

Lepiej:

"Widze, ze to nie dziala tak, jak powinno. Skroce rozmowe i polacze z konsultantem."

## 8.4. Perspektywa biznesowa

Emocje wplywaja na:

- CSAT;
- eskalacje;
- skargi;
- compliance;
- rotacje konsultantow, ktorzy przejmuja trudne rozmowy;
- reputacje marki.

Automatyzacja trudnych emocjonalnie procesow bez dobrego handoff moze obnizyc koszt pierwszej linii, ale zwiekszyc koszt drugiej linii i reklamacji.

## 8.5. Perspektywa uzytkownika

Uzytkownik w emocjach potrzebuje:

- krotszych komunikatow;
- mniej opcji;
- potwierdzenia problemu;
- jasnego nastepnego kroku;
- mozliwosci rozmowy z czlowiekiem;
- braku moralizowania;
- braku powtarzania tego samego.

## 8.6. Perspektywa technologiczna

System moze wykrywac emocje przez:

- slowa kluczowe;
- intencje frustracji;
- powtorzenia;
- barge-in rate;
- wzrost glosnosci lub tempo, jesli przetwarzanie audio to wspiera;
- szybkie prosby o konsultanta;
- wiele no-match pod rzad.

Uwaga: klasyfikacja emocji jest niepewna. Nie nalezy traktowac jej jako diagnozy. Lepiej mowic o "sygnalach frustracji" niz "uzytkownik jest zly".

## 8.7. Dobre praktyki

- Skracaj rozmowe po sygnalach frustracji.
- Nie powtarzaj identycznego fallbacku.
- Daj alternatywe: konsultant, SMS, ticket, callback.
- Nie uzywaj fałszywej empatii.
- W sprawach wrazliwych eskaluj szybciej.
- Nie pros uzytkownika o powtarzanie danych, jesli masz je w stanie.
- Projektuj komunikaty neutralne i rzeczowe.

## 8.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Bot mowi "rozumiem", ale nic nie zmienia | Wieksza frustracja |
| Zbyt wiele przeprosin | Bot brzmi bezradnie |
| Brak eskalacji po agresji | Ryzyko skargi |
| Zbyt marketingowy ton w reklamacji | Wrazenie lekcewazenia |
| Automatyzacja sytuacji kryzysowej | Ryzyko etyczne i prawne |

## 8.9. Checklista emocji

- Czy znamy emocjonalny kontekst use case'u?
- Czy bot ma skrocone sciezki dla frustracji?
- Czy istnieje intencja "konsultant"?
- Czy po drugim fallbacku bot zmienia strategie?
- Czy komunikaty unikaja fałszywej empatii?
- Czy sytuacje krytyczne sa eskalowane natychmiast?
- Czy konsultant dostaje informacje o trudnosciach w rozmowie?

## 8.10. Mini case study

Voicebot reklamacyjny po nierozpoznaniu dokumentu prosil trzy razy o numer sprawy. Uzytkownicy mowili: "juz podawalem". Dodano pamiec ostatnich prob, komunikat: "Mam podany numer, ale nie moge go znalezc w systemie. Polacze z konsultantem i przekaze ten numer." Bot przestal zmuszac uzytkownika do powtarzania, a konsultant dostawal kontekst.

## 8.11. Cwiczenia

1. Napisz komunikat dla uzytkownika, ktory mowi "juz to podawalem".
2. Zaprojektuj reakcje na agresywna prosbe o konsultanta.
3. Wskaz trzy sygnaly frustracji w logach.
4. Zaprojektuj eskalacje dla sytuacji medycznie pilnej.

## 8.12. Podsumowanie

Emocje nie sa dodatkiem do conversation design. Sa czescia realnego srodowiska rozmowy. Dobry voicebot nie udaje terapeuty ani konsultanta, ale potrafi skrocic droge, dac kontrole i oddac rozmowe czlowiekowi, gdy to najlepsze dla uzytkownika.

---

# Rozdzial 9. Dokumentacja scenariusza dialogowego

## 9.1. Cele rozdzialu

Czytelnik nauczy sie:

- dokumentowac scenariusz w sposob uzyteczny dla zespolu;
- laczyc dialog z intencjami, slotami, integracjami, metrykami i QA;
- przygotowac material, ktory nie jest tylko "skryptem tekstow";
- tworzyc dokumentacje gotowa do wdrozenia i utrzymania.

## 9.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Dialog scenario | Dokument opisujacy przebieg rozmowy |
| Flow | Struktura krokow i przejsc |
| Prompt library | Biblioteka komunikatow |
| State table | Tabela stanow dialogu |
| Test path | Sciezka testowa |
| Acceptance criteria | Kryteria akceptacji zachowania |
| Conversation spec | Pelna specyfikacja rozmowy |

## 9.3. Wyjasnienie eksperckie

Scenariusz dialogowy powinien byc pomostem miedzy:

- biznesem;
- conversation design;
- AI/NLU/LLM;
- backendem;
- QA;
- contact center;
- compliance;
- analityka.

Minimalna struktura scenariusza:

| Pole | Opis |
|---|---|
| Flow name | Nazwa procesu |
| User goal | Cel uzytkownika |
| Business goal | Cel firmy |
| Entry conditions | Kiedy flow sie uruchamia |
| Exit conditions | Kiedy flow sie konczy |
| Required slots | Dane wymagane |
| Optional slots | Dane opcjonalne |
| Integrations | Systemy/API |
| Prompts | Komunikaty bota |
| Expected inputs | Oczekiwane odpowiedzi |
| Fallbacks | No-input, no-match, repair |
| Barge-in policy | Polityka przerwan |
| Handoff rules | Warunki eskalacji |
| Metrics | Jak mierzymy sukces |
| QA cases | Sciezki testowe |

## 9.4. Perspektywa biznesowa

Dobra dokumentacja:

- pozwala zatwierdzic zakres;
- ogranicza nieporozumienia;
- ułatwia wycene;
- pomaga w compliance review;
- staje sie podstawa testow;
- przyspiesza utrzymanie.

Zla dokumentacja to zwykle lista tekstow bota bez stanow, integracji i warunkow. Taki dokument wyglada dobrze na warsztacie, ale nie wystarcza do wdrozenia.

## 9.5. Perspektywa uzytkownika

Dokumentacja powinna zawierac nie tylko happy path, ale tez naturalne zachowania uzytkownika:

- milczenie;
- poprawki;
- przerywanie;
- zmiana tematu;
- prosba o konsultanta;
- odpowiedz niepelna;
- odpowiedz emocjonalna;
- odpowiedz poza zakresem.

Jesli scenariusz opisuje tylko idealnego uzytkownika, nie opisuje prawdziwej rozmowy.

## 9.6. Perspektywa technologiczna

Technologia potrzebuje:

- identyfikatorow promptow;
- identyfikatorow intencji;
- typow encji;
- walidacji slotow;
- stanow;
- eventow;
- timeoutow;
- integracji;
- mapowania bledow API;
- reguł handoff;
- wymagan logowania.

## 9.7. Dobre praktyki

- Dokumentuj flow jako stany i przejscia, nie tylko dialog tekstowy.
- Oznacz happy path, unhappy path, fallback path i escalation path.
- Dodaj przykłady wypowiedzi uzytkownika.
- Dla kazdego promptu okresl expected input.
- Dla kazdego kroku okresl metryki.
- Utrzymuj wersje dokumentu.
- Powiaz dokumentacje z testami QA.

## 9.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Scenariusz tylko jako dialog | Brak danych dla dev/QA |
| Brak unhappy paths | Bot psuje sie poza demo |
| Brak polityki handoff | Eskalacje sa przypadkowe |
| Brak mapowania integracji | Dialog nie pasuje do systemow |
| Brak wersjonowania | Nie wiadomo, co jest na produkcji |
| Brak metryk per krok | Trudno optymalizowac |

## 9.9. Szablon scenariusza dialogowego

```text
Nazwa flow:
Wersja:
Wlasciciel biznesowy:
Wlasciciel conversation design:
Data:

1. Cel uzytkownika:
2. Cel biznesowy:
3. Zakres:
4. Poza zakresem:
5. Warunki wejscia:
6. Warunki zakonczenia:
7. Wymagane sloty:
8. Integracje:
9. Reguly biznesowe:
10. Polityka identyfikacji/weryfikacji:
11. Polityka barge-in:
12. Polityka fallback:
13. Polityka handoff:
14. Metryki sukcesu:

Tabela krokow:
- step_id
- state
- bot prompt
- expected user input
- intent/entity/slot
- validation
- next step
- no-input
- no-match
- barge-in handling
- handoff condition
- logs/metrics

Sciezki testowe:
- happy path
- missing data
- correction
- no-input
- no-match
- interruption
- integration error
- handoff
- edge cases
```

## 9.10. Mini case study

Zespol projektowal voicebota do zmiany terminu dostawy. Pierwszy dokument zawieral tylko dialog: bot pyta o numer zamowienia, potem o date. Developerzy nie wiedzieli, co robic, gdy zamowienie jest juz wyslane, a QA nie mialo testow dla korekty daty. Druga wersja dokumentacji dodala statusy zamowienia, walidacje dat, bledy API, polityke korekty i handoff. Wdrozenie przyspieszylo, bo scenariusz stal sie specyfikacja, nie tekstem.

## 9.11. Cwiczenia

1. Uzupelnij szablon scenariusza dla statusu zamowienia.
2. Dodaj trzy unhappy paths.
3. Dodaj warunki handoff.
4. Dodaj metryki per krok.

## 9.12. Podsumowanie

Scenariusz dialogowy jest dokumentem produktowo-technicznym. Dobry scenariusz opisuje rozmowe, dane, decyzje, integracje, bledy i metryki. To narzedzie wdrozenia i utrzymania, nie tylko ladny zapis rozmowy.

---

# 10. Zbiorcza checklista po Czesci III

- Czy komunikaty sa projektowane pod ucho, nie pod ekran?
- Czy kazda wypowiedz ma jedna funkcje?
- Czy kazde pytanie zbiera jedna rzecz?
- Czy prompt'y maja ID i miejsce w flow?
- Czy kazdy krok ma expected input?
- Czy projekt uwzglednia no-input i no-match?
- Czy reprompt'y nie powtarzaja identycznie tego samego?
- Czy barge-in jest opisany per prompt?
- Czy bot potrafi obsluzyc korekte?
- Czy prosba o konsultanta jest rozpoznawana?
- Czy persona jest transparentna i nie udaje czlowieka?
- Czy ton jest dopasowany do emocjonalnego kontekstu?
- Czy scenariusz zawiera happy path, unhappy path, fallback i escalation path?
- Czy dokumentacja nadaje sie dla biznesu, dev, QA i contact center?

---

# 11. Co bedzie w kolejnej czesci

Kolejna czesc powinna opracowac **Czesc IV. Analiza biznesowa i wybor use case'ow**:

1. Jak analizowac procesy contact center.
2. Jak rozpoznac dobry use case dla voicebota.
3. Jak ocenic automatyzowalnosc procesu.
4. Jak mierzyc wartosc biznesowa i ROI.
5. Kiedy nie wdrazac voicebota.
6. Jak przygotowac brief, wymagania i business case.
7. Pelna matryca oceny use case'u.

