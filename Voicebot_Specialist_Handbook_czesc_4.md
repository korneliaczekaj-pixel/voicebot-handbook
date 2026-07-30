# Voicebot Specialist Handbook

## Część 4: Conversation Design dla voicebotów

Wersja robocza: 2026-07-29  
Kontynuacja plików:

- `Voicebot_Specialist_Handbook_czesc_1.md`
- `Voicebot_Specialist_Handbook_czesc_2.md`
- `Voicebot_Specialist_Handbook_czesc_3.md`

---

# Część III. Conversation Design dla voicebotów

## Cel całej części

Conversation design dla voicebotów to projektowanie przebiegu rozmowy głosowej tak, aby użytkownik mógł wykonać zadanie szybko, zrozumiale i z poczuciem kontroli. Nie jest to samo pisanie tekstów. To projektowanie tur, pytań, potwierdzeń, naprawy błędów, pauz, przerwań, tonu, emocji i eskalacji.

Po tej części czytelnik powinien umieć:

1. Rozróżnić tekst ekranowy od komunikatu głosowego.
2. Projektować wypowiedzi krótkie, jednoznaczne i naturalne w TTS.
3. Tworzyć powitania, pytania, potwierdzenia, reprompt'y, fallbacki i zakończenia.
4. Projektować flow odporny na ciszę, no-match, korekty i przerwania.
5. Zdefiniowac persone i ton voicebota bez udawania człowieka.
6. Projektować rozmowy z uwzglednieniem emocji, frustracji i poczucia kontroli.
7. Przygotowywac scenariusze dialogowe użyteczne dla biznesu, technologii, QA i contact center.

Źródła wspierające część:

- Skantze, turn-taking w systemach konwersacyjnych: rozumienie tur, pauz, overlap i naturalności.
- Źródła o interruption handling i barge-in: szczególnie LiveKit, Amazon Lex, Google Dialogflow CX, VoiceXML oraz prace badawcze o przerwaniach.
- W3C VoiceXML: no-input, no-match, prompt'y, formularze, menu, mixed initiative.
- Dokumentacje platform enterprise: konfiguracja speech, barge-in, endpointing, timeouty, slot filling.
- Uzupełnienie eksperckie: praktyczne zasady conversation design, projektowanie komunikatów głosowych, recovery i QA scenariuszy.

---

# Rozdział 1. Pisanie tekstu a projektowanie rozmowy głosowej

## 1.1. Cele rozdziału

Czytelnik nauczy się:

- rozumieć, dlaczego komunikat głosowy nie jest tekstem odczytanym na głos;
- skracać, porcjowac i porzadkowac informacje;
- projektować wypowiedzi pod pamięć słuchowa;
- rozpoznawać, kiedy ekran, SMS lub e-mail są lepszym kanałem pomocniczym niż głos.

## 1.2. Kluczowe pojęcia

| Pojęcie | Definicja praktyczna | Typowe nieporozumienie |
|---|---|---|
| Komunikat głosowy | Wypowiedź zaprojektowana do uslyszenia, nie do przeczytania | "Wystarczy odczytac tekst FAQ" |
| Pamięć słuchowa | Zdolność utrzymania usłyszanej informacji przez krótki czas | "Użytkownik zapamięta listę opcji" |
| Chunking | Dzielenie informacji na małe porcje | "Im więcej powiem naraz, tym szybciej pojdzie" |
| Progressive disclosure | Stopniowe ujawnianie informacji | "Trzeba od razu podac wszystkie możliwości" |
| Multichannel support | Wsparcie rozmowy głosowej innym kanałem, np. SMS-em | "Voicebot musi wszystko załatwić głosem" |

## 1.3. Wyjaśnienie eksperckie

Tekst ekranowy może być dłuższy, bo użytkownik widzi go cały czas. Może do niego wrócić, porównać opcję, przeczytać wolniej, zignorowac fragmenty i skupic wzrok na ważnych danych. Głos znika po wypowiedzeniu. Dlatego każde dodatkowe słowo ma koszt.

W voicebocie informacja musi być:

- krótka;
- uporzadkowana;
- slyszalna w naturalnym rytmie;
- dopasowana do celu użytkownika;
- łatwa do przerwania;
- łatwa do powtórzenia;
- niewymagajaca zapamiętania wielu elementów.

Zły wzorzec:

"W naszej firmie może pan uzyskac informacje o statusie zamówienia, zmienić termin dostawy, zmienić adres, sprawdzić reklamację, uzyskac fakture, dowiedziec się o zwrotach, anulowac zamówienie albo porozmawiac z konsultantem."

Lepszy wzorzec:

"W czym mogę pomóc przy zamówieniu?"

Reprompt po ciszy:

"Może pan powiedzieć na przykład: status, zmiana adresu albo zwrot."

Uwaga praktyczna:

W głosie lista opcji jest narzędziem awaryjnym, nie podstawowym sposobem projektowania. Jeśli system potrafi rozpoznać intencje, zacznij od pytania otwartego w granicach domeny, a przy ciszy podaj 2-3 przykłady.

## 1.4. Perspektywa biznesowa

Dobre komunikaty głosowe zmniejszają:

- średni czas rozmowy;
- no-input;
- no-match;
- liczbę powtórzeń;
- liczbę przerwań;
- eskalację spowodowane frustracja.

Źle komunikaty zwiększają koszt, nawet jeśli technologia działa poprawnie. Bot może mieć dobry ASR i NLU, ale jeśli zada pytania niezrozumiałe, użytkownik nie da mu dobrego inputu.

## 1.5. Perspektywa użytkownika

Użytkownik często dzwoni w sytuacji zadaniowej: chce załatwić sprawę, nie uczyc się systemu. Komunikat głosowy powinien odpowiadać na trzy pytania:

1. Co system robi teraz?
2. Czego ode mnie potrzebuje?
3. Jak mogę odpowiedzieć?

Przykład:

"Znalazlem dwa zamówienia. Które mam sprawdzić: z poniedzialku czy z wczoraj?"

Ten komunikat jest dobry, bo nie tlumaczy całej logiki systemu. Daje kontekst i jasny wybór.

## 1.6. Perspektywa technologiczna

Tekst dialogowy trafia do TTS, a czasem do LLM jako instrukcja odpowiedzi. Dlatego musi być zaprojektowany tak, aby:

- TTS poprawnie go odczytal;
- liczby, daty i kody były jednoznaczne;
- barge-in mógł zatrzymać komunikat bez utraty sensu;
- logi były czytelne;
- warianty odpowiedzi były kontrolowane;
- komunikaty były wersjonowane.

W generatywnych voicebotach warto mieć response style guide: zasady długości, tonu, potwierdzeń, zakazow i sposobów eskalacji. Model nie powinien sam decydowac, jak długi ma być komunikat w kanale głosowym.

## 1.7. Dobre praktyki

- Pisz do ucha, nie do oka.
- Jedna wypowiedź = jedna myśl.
- Jedno pytanie naraz.
- Maksymalnie 2-3 przykłady w jednym komunikacie.
- Najwazniejsza informacja na początku.
- Długie dane wysylaj SMS-em lub e-mailem, jeśli to lepsze.
- Testuj komunikaty przez odczyt na głos.
- Usuwaj słowa, które nie pomagają użytkownikowi wykonać kroku.

## 1.8. Typowe błędy

| Błąd | Konsekwencja |
|---|---|
| Kopiowanie FAQ do TTS | Długie, nienaturalne odpowiedzi |
| Zadawanie kilku pytań naraz | Niepelne lub chaotyczne odpowiedzi |
| Wymienianie zbyt wielu opcji | Użytkownik pamięta tylko fragment listy |
| Brak informacji, co można powiedzieć | Cisza albo "halo?" |
| Zbyt formalny język | Dystans i większe obciążenie poznawcze |
| Ukrywanie celu pytania | Użytkownik nie rozumie, po co podaje dane |

## 1.9. Checklista

- Czy komunikat da się zrozumieć po jednokrotnym uslyszeniu?
- Czy zawiera tylko jedno pytanie?
- Czy ma mniej niż 2-3 opcję?
- Czy można go przerwać bez utraty sensu?
- Czy TTS dobrze czyta liczby i nazwy?
- Czy użytkownik wie, co ma powiedzieć?
- Czy komunikat jest krótszy niż wersja tekstowa?
- Czy długie dane można wysłać innym kanałem?

## 1.10. Mini case study

Sklep internetowy wdrożył voicebota do zwrotow. Pierwsza wersja odczytywala cała politykę zwrotow. Użytkownicy przerywali i prosili o konsultanta. Druga wersja zaczynała od pytania: "Czy chce pan sprawdzić status zwrotu, czy dowiedziec się, jak go nadac?". Dopiero po wyborze bot podawal krótka, dopasowana odpowiedź i proponowal SMS z linkiem. Spadły przerwania i czas rozmowy.

## 1.11. Ćwiczenia

1. Wez długi komunikat z FAQ i przepisz go na wersję głosową.
2. Skroc listę siedmiu opcji do pytania otwartego i repromptu.
3. Zaprojektuj komunikat, który można bezpiecznie przerwać.
4. Wskaż informacje, które lepiej wysłać SMS-em niż czytac.

## 1.12. Podsumowanie

Projektowanie głosu wymaga dyscypliny. Każdy komunikat powinien prowadzić użytkownika do następnego kroku, a nie prezentowac wszystko, co firma wie. Voicebot nie jest audiobookiem procedury.

---

# Rozdział 2. Zasady projektowania wypowiedzi voicebota

## 2.1. Cele rozdziału

Czytelnik nauczy się:

- stosować zasady jasnych wypowiedzi głosowych;
- projektować komunikaty informacyjne, pytania i potwierdzenia;
- kontrolować długość, formalnosc, tempo i jednoznacznosc;
- tworzyć standardy copy dla voicebota.

## 2.2. Kluczowe pojęcia

| Pojęcie | Definicja |
|---|---|
| Prompt | Wypowiedź bota kierowana do użytkownika |
| Prompt hierarchy | Priorytet informacji w komunikacie |
| Microcopy głosowe | Krótkie teksty operacyjne w rozmowie |
| Confirmation | Potwierdzenie danych lub decyzji |
| Explicit confirmation | Potwierdzenie wymagające odpowiedzi użytkownika |
| Implicit confirmation | Potwierdzenie wplecione w kolejny krok |
| Repair prompt | Komunikat naprawczy po błędzie |

## 2.3. Wyjaśnienie eksperckie

Dobra wypowiedź voicebota ma funkcję. Nie "brzmi ladnie", tylko wykonuje zadanie w rozmowie.

Najczestsze funkcję:

1. Ustanowienie kontekstu: "Znalazlem pana zamówienie."
2. Zapytanie o dane: "Jaki adres mam wpisac?"
3. Potwierdzenie: "Adres to Kwiatowa 8, mieszkania 12."
4. Informacja o dzialaniu: "Sprawdzam dostępne terminy."
5. Naprawa: "Nie mam pewności, czy dobrze uslyszalem numer."
6. Eskalacja: "Połączę z konsultantem."
7. Zakończenie: "Gotowe. Potwierdzenie wyslalem SMS-em."

Komunikat powinien mieć priorytet:

```text
Najpierw: co sie stalo / czego potrzebuje system
Potem: co uzytkownik ma zrobić
Na koncu: opcjonalne przyklady lub dodatkowe informacje
```

Przykład:

"Nie znalazlem zamówienia pod tym numerem. Proszę podac numer jeszcze raz, po trzy cyfry."

Komunikat jest lepszy niż:

"Niestety, w wyniku wyszukiwania w naszym systemie nie udalo się odnalezc zamówienia, które odpowiadaloby podanym przez pana danym, dlatego proszę spróbować ponownie."

## 2.4. Perspektywa biznesowa

Standard wypowiedzi bota jest częścią standardu obsługi klienta. Dobre wypowiedzi:

- zmniejszają czas szkolenia projektantow;
- ulatwiaja QA;
- zapewniaja spójność marki;
- redukuja ryzyka prawne;
- pomagają utrzymywać jakość przy wielu use case'ach.

Firma powinna mieć voice style guide, czyli dokument zawierajacy:

- ton;
- poziom formalnosci;
- zasady przepraszania;
- zasady potwierdzania danych;
- zasady długości komunikatów;
- słowa zakazane;
- wzorce fallbackow;
- wzorce eskalacji.

## 2.5. Perspektywa użytkownika

Użytkownik ceni:

- prostote;
- przewidywalność;
- brak upokarzajacych komunikatów;
- jasny kolejny krok;
- potwierdzenie ważnych danych;
- możliwość poprawy.

Zamiast:

"Niepoprawna odpowiedź."

Lepiej:

"Nie mam pewności, czy dobrze zrozumiałem. Proszę powiedzieć: tak albo nie."

## 2.6. Perspektywa technologiczna

Komunikaty powinny być zapisane w sposób pozwalajacy:

- wersjonowac treści;
- łączyć komunikat z etapem flow;
- testować warianty;
- analizować, po których promptach rośnie no-input, no-match lub barge-in;
- kontrolować generacje LLM;
- dostosowywac TTS.

Przykłady pol w dokumentacji promptu:

| Pole | Opis |
|---|---|
| prompt_id | Stabilny identyfikator |
| flow_step | Krok dialogu |
| user_goal | Cel użytkownika |
| bot_goal | Cel bota |
| text | Treść do TTS |
| barge_in_policy | Włączony/ograniczony/wyłączony |
| expected_user_input | Jakiej odpowiedzi oczekujemy |
| fallback | Co robimy po no-match |
| metrics | Jak mierzymy skuteczność |

## 2.7. Dobre praktyki

- Zaczynaj od czasownika lub konkretu.
- Unikaj biernej strony.
- Unikaj żargonu i formalizmow.
- Potwierdzaj dane krytyczne.
- Nie przepraszaj bez końca.
- Nie mow "rozumiem", jeśli system nie rozumie.
- Dla błędów dawaj instrukcje, nie tylko komunikat błędu.
- Projektuj warianty dla pierwszej i kolejnej próby.

## 2.8. Typowe błędy

| Błąd | Konsekwencja |
|---|---|
| "Przepraszam" w każdym fallbacku | Bot brzmi bezradnie |
| Brak instrukcji po błędzie | Użytkownik nie wie, co zmienić |
| Zbyt wiele uprzejmosci | Dluższa rozmową bez wartości |
| Potwierdzanie wszystkiego | Spowolnienie procesu |
| Niepotwierdzanie danych krytycznych | Ryzyko błędnej akcji |
| "Czy mogę jeszcze w czyms pomóc?" po każdej sprawie | Dodatkowe, często niepotrzebne tury |

## 2.9. Checklista wypowiedzi

- Czy komunikat ma jedna funkcję?
- Czy najwazniejsza informacja jest na początku?
- Czy użytkownik wie, co ma powiedzieć?
- Czy usunieto słowa bez funkcji?
- Czy ton pasuje do sytuacji?
- Czy komunikat jest inny przy drugim błędzie?
- Czy dane krytyczne są potwierdzone?
- Czy prompt ma ID i miejsce w flow?

## 2.10. Mini case study

Voicebot helpdesku IT po nierozpoznaniu problemu mówił: "Przepraszam, nie zrozumiałem. Proszę powtórzyć." Po trzech probach użytkownicy byli sfrustrowani. Nowy wariant: "Nie mam pewności, czy chodzi o VPN, hasło czy poczte. Które z tych trzech?". Bot nie tylko informuje o błędzie, ale zawęża przestrzen odpowiedzi. No-match spada.

## 2.11. Ćwiczenia

1. Napisz trzy warianty promptu po no-match: pierwszy, drugi i trzeci.
2. Zaprojektuj explicit confirmation dla zmiany adresu.
3. Zaprojektuj implicit confirmation dla statusu zamówienia.
4. Wypisz 10 słów, których bot w twojej organizacji nie powinien używać.

## 2.12. Podsumowanie

Każda wypowiedź voicebota powinna mieć funkcję dialogowa. Dobre microcopy głosowe prowadzi rozmowę, zmniejsza obciążenie poznawcze i ułatwia systemowi otrzymanie poprawnego inputu.

---

# Rozdział 3. Turn-taking w praktyce conversation design

## 3.1. Cele rozdziału

Czytelnik nauczy się:

- projektować rozmowę jako wymiane tur;
- rozumieć, kiedy bot powinien mówić, słuchać i czekac;
- uwzględniać pauzy, overlap, barge-in i endpointing;
- projektować timing rozmowy razem z zespołem technicznym.

## 3.2. Kluczowe pojęcia

| Pojęcie | Definicja |
|---|---|
| Tura | Fragment rozmowy nalezacy do jednego mówcy |
| Turn-taking | Organizacja zmian mówcy |
| TRP | Miejsce potencjalnego przejęcia tury |
| Overlap | Nakładanie się wypowiedzi |
| Barge-in | Użytkownik wchodzi w wypowiedź bota |
| Endpointing | Decyzja, czy użytkownik skończył mówić |
| Floor | "Prawo głosu" w danym momencie rozmowy |

## 3.3. Wyjaśnienie eksperckie

Projektant rozmowy głosowej nie projektuje tylko tekstów. Projektuje rytm:

- jak długa jest tura bota;
- kiedy bot oddaje głos;
- czy oczekuje krótkiej odpowiedzi;
- czy użytkownik może mówić długo;
- kiedy bot powinien poczekac;
- kiedy powinien dopytać;
- kiedy powinien przerwać własna wypowiedź po barge-in.

Wynika ze źródeł naukowych: naturalne turn-taking opiera się na przewidywaniu końca tury, nie tylko na pauzie. W systemach głosowych trzeba uwzględnić sygnały semantyczne i kontekstowe, bo sama cisza jest zbyt prymitywnym sygnalem.

Uzupełnienie eksperckie: conversation designer powinien oznaczać w scenariuszu oczekiwany typ inputu:

| Typ inputu | Projekt timingowy |
|---|---|
| Tak/nie | Krótka odpowiedź, szybkie endpointing, możliwy barge-in |
| Numer/kod | Tolerancja pauz, potwierdzanie grupami, DTMF fallback |
| Opis problemu | Dłuższe słuchanie, mniej agresywne endpointing |
| Emocjonalna skarga | Długie słuchanie, szybka eskalacja po sygnalach frustracji |
| Wybór z 2 opcji | Jasny prompt, szybka interpretacja |
| Swobodna intencja | Pytanie otwarte, disambiguation przy niepewności |

## 3.4. Perspektywa biznesowa

Timing wpływa na:

- AHT;
- skuteczność zbierania danych;
- porzucenia rozmów;
- liczbę powtórzeń;
- eskalację;
- jakość danych w CRM/ticketingu.

Zbyt szybki bot może robić błędy. Zbyt wolny bot generuje koszt i frustrację. Dobra decyzja timingowa wynika z wartości kroku: dla prostego potwierdzenia liczy się szybkość, dla numeru klienta liczy się dokładność.

## 3.5. Perspektywa użytkownika

Użytkownik czuje się dobrze, gdy:

- bot nie wchodzi mu w słowo;
- bot nie zostawia zbyt długich ciszy;
- bot pozwala przerwać;
- bot rozpoznaje, że wypowiedź jeszcze trwa;
- bot nie wymusza nienaturalnego tempa.

Bot powinien dopasować tempo do zadania. Starszy użytkownik dyktujacy numer potrzebuje innego rytmu niż klient e-commerce mowiacy "chce zwrot".

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

Te ustawienia nie powinny być globalne. Powinny zależeć od kroku dialogu.

## 3.7. Dobre praktyki

- Oznaczaj oczekiwany typ odpowiedzi w scenariuszu.
- Dla długich slotów dawaj instrukcje mówienia w grupach.
- Dla pytań tak/nie nie dawaj długich promptów.
- Dla opisow problemu nie ucinal użytkownika po krótkiej pauzie.
- Projektuj barge-in dla promptów informacyjnych.
- Mierz przerwania per prompt.
- Projektuj recovery po overlap.

## 3.8. Typowe błędy

| Błąd | Konsekwencja |
|---|---|
| Jeden timeout dla całego bota | Ucinanie albo martwa cisza |
| Brak oznaczenia typu inputu | Technologia nie wie, jak stroic krok |
| Za długie tury bota | Więcej barge-in |
| Brak barge-in przy podsumowaniach | Użytkownik nie może poprawić błędu |
| Bot odpowiada po każdej mikropauzie | Wchodzi w słowo |

## 3.9. Checklista turn-taking

- Czy każdy krok ma oczekiwany typ inputu?
- Czy długie odpowiedzi użytkownika mają dłuższe endpointing?
- Czy krótkie odpowiedzi mają szybka reakcje?
- Czy barge-in jest skonfigurowany per prompt?
- Czy bot zachowuje kontekst po przerwaniu?
- Czy no-input i no-match mają różne reakcje?
- Czy testujemy rozmowy z pauzami i overlap?

## 3.10. Mini case study

Voicebot medyczny pyta: "Proszę opisać, co się dzieje." Endpointing był ustawiony jak dla pytań tak/nie. Pacjenci robili pauze po pierwszym zdańiu, a bot od razu zaczynał diagnozowac kategorie sprawy. Po zmianie ten krok otrzymal dłuższe okno słuchania, krótki backchannel "Rozumiem, proszę mówić dalej" tylko w wybranych sytuacjach oraz eskalację przy sygnalach pilnosci. Jakość klasyfikacji wzrosła.

## 3.11. Ćwiczenia

1. Dla pieciu krokow flow oznacz typ inputu i politykę endpointing.
2. Zaprojektuj krok zbierania kodu z pauzami.
3. Zaprojektuj zachowanie bota, gdy użytkownik zaczyna mówić w trakcie podsumowania.
4. Wypisz metryki turn-taking dla pilota.

## 3.12. Podsumowanie

Turn-taking jest ukrytym szkieletem rozmowy. Jeśli jest źle zaprojektowane, nawet dobre teksty i modele będą brzmieć sztucznie. Conversation designer musi projektować nie tylko co bot mówi, ale kiedy mówi, kiedy słucha i kiedy oddaje kontrolę.

---

# Rozdział 4. Persona voicebota, ton, styl i formalnosc

## 4.1. Cele rozdziału

Czytelnik nauczy się:

- definiowac persone voicebota w sposób praktyczny;
- odróżniać osobowosc marki od udawania człowieka;
- dobierac ton do branży, sytuacji i emocji;
- tworzyć zasady językowe dla zespolu.

## 4.2. Kluczowe pojęcia

| Pojęcie | Definicja |
|---|---|
| Persona voicebota | Zestaw zasad okreslajacy, jak bot brzmi i zachowuje się w rozmowie |
| Ton | Emocjonalne zabarwienie wypowiedzi |
| Styl | Sposób formulowania komunikatów |
| Formalnosc | Poziom oficjalnosci języka |
| Brand voice | Język marki |
| Transparency | Jasne informowanie, że rozmowca jest systemem AI |
| False empathy | Udawanie emocjonalnego rozumienia bez realnej zdolności pomocy |

## 4.3. Wyjaśnienie eksperckie

Persona voicebota nie polega na wymysleniu imienia i charakteru. To operacyjny dokument, który pomaga pisac spójne komunikaty i ograniczac ryzyka.

Dobra persona odpowiada na pytania:

- Kim bot jest w procesie?
- Co może zrobić?
- Czego nie może zrobić?
- Jak mówi o sobie?
- Jak reaguje na błąd?
- Jak reaguje na frustrację?
- Jak informuje o eskalacji?
- Czy używa "pan/pani", czy form neutralnych?
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

Persona bota wpływa na:

- zaufanie do marki;
- spójność obsługi;
- compliance;
- eskalację;
- odbiór automatyzacji.

W banku, medycynie lub windykacji zbyt swobodny ton może być nieprofesjonalny. W e-commerce zbyt urzedowy ton może zwiększać dystans. Persona musi wynikać z kontekstu użycia, nie z gustu zespolu.

## 4.5. Perspektywa użytkownika

Użytkownik powinien od początku wiedzieć:

- że rozmawia z automatycznym systemem;
- w czym system może pomóc;
- jak przejść dalej;
- że może poprawić lub poprosić o człowieka.

Transparentność nie musi brzmieć ciezko:

"Dzień dobry, jestem automatycznym asystentem firmy X. Pomoge sprawdzić zamówienie albo połączę z konsultantem. W czym mogę pomóc?"

## 4.6. Perspektywa technologiczna

Persona powinna być zakodowana w:

- promptach systemowych LLM;
- response templates;
- style guide;
- regułach generowania odpowiedzi;
- testach QA;
- kryteriach akceptacji;
- slowniku słów zakazanych;
- fallbackach i eskalacjach.

W voicebotach generatywnych persona musi mieć twarde ograniczenia:

- maksymalna długość odpowiedzi;
- zakaz udawania człowieka;
- zasady "nie wiem";
- zasady przepraszania;
- zasady eskalacji;
- zakaz porad poza domena.

## 4.7. Dobre praktyki

- Projektuj persone jako role obsługi, nie fikcyjna postac.
- Bądź transparentny, że to system.
- Nie udawaj emocji, których bot nie może realnie mieć.
- Dopasuj formalnosc do branży i sytuacji.
- Ustal język błędów i eskalacji.
- Testuj tone-of-voice na trudnych scenariuszach, nie tylko happy path.
- Unikaj zartow w sytuacjach stresowych.

## 4.8. Typowe błędy

| Błąd | Konsekwencja |
|---|---|
| Nadawanie botowi zbyt ludzkiej roli | Rozczarowanie i ryzyko zaufania |
| Brak transparentności | Użytkownik czuje się oszukany |
| Zbyt marketingowy ton | Brak wiarygodnosci w obsłudze problemu |
| Zbyt formalny język | Więcej obciążenia poznawczego |
| Zarty w reklamacjach | Eskalacja frustracji |
| Brak zasad dla LLM | Niespojny ton |

## 4.9. Checklista persony

- Czy bot jasno mówi, że jest automatyczny?
- Czy rola bota jest okreslona?
- Czy wiemy, czego bot nie powinien mówić?
- Czy ton pasuje do trudnych sytuacji?
- Czy mamy wzorce przeprosin?
- Czy mamy wzorce eskalacji?
- Czy persona jest wpisana w prompt systemowy?
- Czy QA ocenia ton, nie tylko poprawna intencje?

## 4.10. Mini case study

Firma windykacyjna chciała, aby bot brzmial "przyjaznie i lekko". Pierwsze komunikaty uzywaly sformulowan "spokojnie, zaraz to ogarniemy". Użytkownicy odbierali to jako lekcewazenie. Persona została zmieniona na spokojna, rzeczowa i neutralna: "Wyjasnie dostępne opcję. Jeśli kwestionuje pan naleznosc, połączę z konsultantem." Spadła liczba agresywnych reakcji w testach UAT.

## 4.11. Ćwiczenia

1. Zdefiniuj persone bota dla przychodni.
2. Napisz trzy rzeczy, których bot nie powinien mówić.
3. Przygotuj powitanie transparentne, ale krótkie.
4. Przepisz zbyt luzny komunikat na wersje profesjonalna.

## 4.12. Podsumowanie

Persona voicebota to narzędzie kontroli jakości i zaufania. Dobry bot nie musi być "jak człowiek". Ma być jasny, pomocny, przewidywalny i uczciwy co do swoich możliwości.

---

# Rozdział 5. Projektowanie powitan, pytań, potwierdzeń i zakonczen

## 5.1. Cele rozdziału

Czytelnik nauczy się:

- projektować pierwsze sekundy rozmowy;
- zadawać pytania, które dają dobre dane;
- dobierac typ potwierdzenia do ryzyka;
- kończyć rozmowę bez niepotrzebnych tur.

## 5.2. Kluczowe pojęcia

| Pojęcie | Definicja |
|---|---|
| Opening | Powitanie i ustawienie kontekstu rozmowy |
| Capability framing | Krótkie wyjaśnienie, w czym bot może pomóc |
| Question design | Projektowanie pytań pod odpowiedzi użytkownika |
| Open prompt | Pytanie otwarte w zakresie domeny |
| Directed prompt | Pytanie ukierunkowane |
| Explicit confirmation | Potwierdzenie wymagające "tak/nie" |
| Implicit confirmation | Potwierdzenie bez zatrzymywania flow |
| Closing | Zakończenie rozmowy |

## 5.3. Wyjaśnienie eksperckie

### Powitanie

Powitanie ma trzy funkcję:

1. Poinformowac, z kim użytkownik rozmawia.
2. Ustawić zakres.
3. Zaprosic do celu.

Dobre:

"Dzień dobry, jestem automatycznym asystentem firmy X. Pomoge w sprawach zamówień. W czym mogę pomóc?"

Źle:

"Witamy serdecznie w najnowoczesniejszym systemie automatycznej obsługi klienta firmy X, który został zaprojektowany, aby zapewnic panstwu najwyzsza jakość kontaktu..."

### Pytania

Dobre pytanie:

- pyta o jedna rzecz;
- daje jasna forme odpowiedzi;
- nie sugeruje zbyt wielu opcji;
- jest dopasowane do danych, które system potrafi przetworzyć.

Przykłady:

- "Jaki jest numer zamówienia?"
- "Na jaki dzien chce pan przelozyc dostawe?"
- "Czy chodzi o fakture, dostawe czy zwrot?"

### Potwierdzenia

Nie wszystko trzeba potwierdzać. Potwierdzenia mają koszt czasowy. Dobieraj je do ryzyka.

| Dane | Typ potwierdzenia |
|---|---|
| Intencja niskiego ryzyka | Implicit |
| Adres, data, godzina | Explicit lub implicit zalezne od skutku |
| Płatność, zgoda, anulowanie | Explicit |
| Pytanie FAQ | Brak lub implicit |
| Dane osobowe | Ostrozne, minimalne |

### Zakończenie

Dobre zakończenie:

- mówi, co zostało zrobione;
- informuje o następnym kroku;
- nie przeciąga rozmowy;
- daje kanał potwierdzenia.

"Gotowe. Termin zmieniony na czwartek, 15:30. Potwierdzenie wyslalem SMS-em. Dziekuje za rozmowę."

## 5.4. Perspektywa biznesowa

Powitanie wpływa na opt-in do automatyzacji. Pytania wpływają na jakość danych. Potwierdzenia wpływają na koszt błędów. Zakończenie wpływa na repeat contact.

Jeśli bot nie powie, co zostało zrobione, użytkownik może zadzwonic ponownie. Jeśli bot zada źle pytanie, integracja może dostać źle dane. Jeśli bot nie potwierdzi anulowania, firma może mieć reklamację.

## 5.5. Perspektywa użytkownika

Użytkownik potrzebuje przewidywalnosci:

- "wiem, z kim rozmawiam";
- "wiem, co mogę powiedzieć";
- "wiem, że dobrze mnie zrozumiano";
- "wiem, co się stalo na koncu".

Najbardziej frustrujące są pytania, które wyglądaja prosto, ale są niejasne:

"Proszę podac dane."

Jakie dane? Numer zamówienia, PESEL, nazwisko, telefon?

## 5.6. Perspektywa technologiczna

Pytania muszą być powiązane że slotami. Każde pytanie powinno mieć:

- slot docelowy;
- typ danych;
- walidacje;
- przykłady odpowiedzi;
- prompt naprawczy;
- politykę potwierdzenia;
- politykę endpointing;
- barge-in policy.

## 5.7. Dobre praktyki

- W powitaniu powiedz, że bot jest automatyczny.
- Nie wymieniaj zbyt wielu możliwości.
- Zadawaj jedno pytanie naraz.
- Projektuj pytania tak, aby użytkownik mógł odpowiedzieć naturalnie.
- Potwierdzaj tylko tam, gdzie ma to wartość.
- W zakonczeniu nazwij wykonana akcję.
- Przy ważnych sprawach wysylaj potwierdzenie poza kanałem głosowym.

## 5.8. Typowe błędy

| Błąd | Konsekwencja |
|---|---|
| Powitanie jako monolog | Przerwania od pierwszych sekund |
| Brak informacji, że to bot | Utrata zaufania |
| Pytanie o kilka danych naraz | Niepelne odpowiedzi |
| Potwierdzanie każdej drobnostki | Długie rozmowy |
| Brak potwierdzenia akcji krytycznej | Ryzyko reklamacji |
| Otwarte zakończenie bez wyniku | Repeat contact |

## 5.9. Checklista

- Czy powitanie jest krotsze niż 10-15 sekund?
- Czy bot informuje, że jest automatyczny?
- Czy pierwsze pytanie zaprasza do celu?
- Czy każde pytanie zbiera jeden slot?
- Czy dane krytyczne są potwierdzane?
- Czy potwierdzenia nie spowalniaja niepotrzebnie?
- Czy zakończenie mówi, co zostało zrobione?
- Czy użytkownik dostaje potwierdzenie SMS/e-mail, jeśli potrzebne?

## 5.10. Mini case study

Voicebot rezerwacyjny konczyl rozmowę slowami: "Czy mogę jeszcze w czyms pomóc?". Wielu użytkowników odpowiadalo "nie wiem" albo zadawalo pytania poza zakresem, co wydluzalo rozmowy. Zmieniono zakończenie: "Wizyta jest umowiona na srode o 11:00. Potwierdzenie wyslalem SMS-em. Dziekuje za rozmowę." Dodatkowe tury spadły, a repeat contact nie wzrósł.

## 5.11. Ćwiczenia

1. Napisz powitanie dla bota bankowego.
2. Zaprojektuj pytanie o termin wizyty.
3. Wybierz typ potwierdzenia dla zmiany adresu.
4. Napisz zakończenie po utworzeniu reklamacji.

## 5.12. Podsumowanie

Powitania, pytania, potwierdzenia i zakończenia są podstawowymi narzędziami kontroli rozmowy. Dobrze zaprojektowane pozwalają użytkownikowi mówić naturalnie, a systemowi zbierać dane bez chaosu.

---

# Rozdział 6. Cisza, no-input, no-match, fallback i reprompt

## 6.1. Cele rozdziału

Czytelnik nauczy się:

- odróżniać ciszę od niezrozumienia;
- projektować no-input i no-match jako różne sytuację;
- tworzyć reprompt'y, które pomagają, a nie powtarzają błąd;
- projektować fallback jako naprawe rozmowy, nie porażkę.

## 6.2. Kluczowe pojęcia

| Pojęcie | Definicja |
|---|---|
| No-input | Użytkownik nic nie powiedział lub system nie wykryl mowy |
| No-match | System wykryl input, ale nie dopasowal go do oczekiwan |
| Fallback | Ścieżka po niezrozumieniu lub nieobslugiwanej sytuacji |
| Reprompt | Kolejny komunikat zadajacy pytanie ponownie lub inaczej |
| Escalation threshold | Moment, w którym trzeba przekazać do człowieka |
| Repair strategy | Strategia naprawy rozmowy |

## 6.3. Wyjaśnienie eksperckie

No-input i no-match wymagają innych reakcji.

No-input może oznaczać:

- użytkownik nie usłyszał;
- zastanawia się;
- szuka danych;
- jest zaskoczony;
- mikrofon/telefonia zawiodla;
- pytanie było za trudne;
- użytkownik odszedl od telefonu.

No-match oznacza:

- użytkownik powiedział cos poza zakresem;
- ASR źle przepisal;
- NLU źle sklasyfikowalo;
- pytanie było niejasne;
- użytkownik ma inny cel;
- użytkownik odpowiedział zbyt szeroko.

Zły fallback:

"Nie zrozumiałem. Proszę powtórzyć."

Lepszy pierwszy no-match:

"Nie mam pewności, czy chodzi o dostawe, zwrot czy fakture. Która sprawa?"

Lepszy drugi no-match:

"Żeby nie przedłużać, połączę z konsultantem, który pomoze w tej sprawie."

## 6.4. Perspektywa biznesowa

Fallbacki to jedno z najważniejszych miejsc optymalizacji. Wysoki fallback rate pokazuje:

- zły use case;
- brak intencji;
- źle pytania;
- slaby ASR;
- zbyt szeroki zakres użytkowników;
- niedobre dane treningowe.

Nie należy ukrywać fallbackow. Trzeba je analizować jako głos rynku: ludzie mówią, czego system nie obsługuje.

## 6.5. Perspektywa użytkownika

Użytkownik akceptuje naprawe, jeśli czuje postep. Nie akceptuje petli.

Zasada psychologiczna:

Nie powtarzaj identycznie tego samego pytania trzy razy. Jeśli pierwsza forma nie zadzialala, druga powinna zawęzić opcję, uproscic zadanie albo dac przykład. Trzecia powinna oferowac alternatywe lub handoff.

## 6.6. Perspektywa technologiczna

Fallback powinien być logowany z kontekstem:

- prompt_id;
- ASR transcript;
- confidence;
- expected input;
- actual input;
- dialog state;
- fallback count;
- outcome;
- handoff reason.

W LLM voicebotach fallback może być bardziej subtelny: model zawsze cos odpowie. Dlatego trzeba wykrywać odpowiedzi niskiej jakości, nie tylko klasyczne no-match.

## 6.7. Dobre praktyki

- Projektuj osobne komunikaty dla no-input i no-match.
- Pierwszy reprompt może być delikatny.
- Drugi reprompt powinien zawęzić opcję.
- Po kilku niepowodzeniach eskaluj albo zmień kanał.
- Nie obwiniaj użytkownika.
- Loguj, co użytkownik powiedział.
- Analizuj fallbacki co tydzien po wdrożeniu.
- Projektuj fallbacki per krok, nie tylko globalne.

## 6.8. Typowe błędy

| Błąd | Konsekwencja |
|---|---|
| Jeden globalny fallback | Brak dopasowania do sytuacji |
| Identyczne powtórzenia | Frustracja |
| Brak eskalacji | Użytkownik utknal |
| Brak analizy transkrypcji fallbackow | Brak optymalizacji |
| Bot przeprasza, ale nie pomaga | Poczucie bezradności systemu |
| LLM improwizuje poza zakresem zamiast fallbacku | Ryzyko halucynacji |

## 6.9. Checklista fallbackow

- Czy każdy krytyczny krok ma no-input?
- Czy każdy krytyczny krok ma no-match?
- Czy drugi reprompt jest inny niż pierwszy?
- Czy fallback zawęża odpowiedź?
- Czy jest prog eskalacji?
- Czy fallbacki są logowane?
- Czy analizujemy najczestsze frazy z fallbackow?
- Czy bot nie obwinia użytkownika?

## 6.10. Mini case study

Voicebot przyjmujacy zgłoszenia IT miał globalny fallback. Gdy użytkownik mówił "nie działa mi token", bot odpowiadał "Proszę powtórzyć". Po analizie okazalo się, że wiele fallbackow dotyczy MFA, ale intencja nie istniala. Dodano intencje "problem_mfa", przykłady fraz i reprompt: "Czy chodzi o kod SMS, aplikacje autoryzacyjna czy token?". Fallback rate spadl.

## 6.11. Ćwiczenia

1. Zaprojektuj no-input i no-match dla pytania o numer zamówienia.
2. Napisz trzy poziomy repromptu dla wyboru terminu.
3. Wskaż, kiedy bot powinien eskalować.
4. Zaprojektuj raport analizy fallbackow.

## 6.12. Podsumowanie

Fallback to nie smietnik na błędy. To zaprojektowana strategia naprawy rozmowy. Dobre fallbacki pomagają użytkownikowi odpowiedzieć inaczej, ujawniaja luki systemu i chronią przed frustracja.

---

# Rozdział 7. Projektowanie barge-in, przerwań i korekt w dialogu

## 7.1. Cele rozdziału

Czytelnik nauczy się:

- projektować przerwania jako normalna część rozmowy;
- rozróżnić korektę, zmianę tematu, przyspieszenie i eskalację;
- dokumentowac politykę barge-in w scenariuszu;
- projektować recovery po przerwaniu.

## 7.2. Kluczowe pojęcia

| Pojęcie | Definicja |
|---|---|
| Barge-in | Przerwanie wypowiedzi bota przez użytkownika |
| Correction | Poprawienie danych lub interpretacji |
| Topic shift | Zmiana tematu lub intencji |
| Acceleration | Próba przyspieszenia rozmowy |
| Escalation request | Prośba o człowieka |
| Recovery after interruption | Kontynuacja rozmowy po przerwaniu z zachowaniem kontekstu |

## 7.3. Wyjaśnienie eksperckie

Przerwania są naturalne. Użytkownik przerywa, gdy:

- zna odpowiedź przed końcem pytania;
- bot źle zrozumiał;
- bot mówi za długo;
- użytkownik chce zmienić cel;
- użytkownik jest sfrustrowany;
- użytkownik chce człowieka;
- pojawia się pilna informacja.

Conversation designer powinien dla każdego waznego promptu określić:

| Element | Pytanie |
|---|---|
| Czy barge-in włączony? | Czy użytkownik może bezpiecznie przerwać? |
| Co może oznaczać przerwanie? | Korekta, zgoda, sprzeciw, eskalacja, backchannel? |
| Jak zatrzymujemy bot response? | Czy TTS i generacja są anulowane? |
| Co robimy z kontekstem? | Wracamy do slotu, zmieniamy intencje, eskalujemy? |
| Jak odpowiadamy? | Krótkie uznanie i kolejny krok |

## 7.4. Perspektywa biznesowa

Barge-in poprawia:

- poczucie kontroli;
- AHT;
- korektę błędów;
- completion rate.

Ale źle zaprojektowany może pogorszyć:

- stabilność flow;
- dokładność danych;
- compliance przy promptach prawnych;
- analityke, jeśli przerwania nie są logowane.

## 7.5. Perspektywa użytkownika

Użytkownik, który przerywa, często komunikuje: "system idzie w zła strone". Dobra reakcja pokazuje, że bot słucha:

Użytkownik: "Nie, nie ten adres."  
Bot: "Dobrze, poprawmy adres. Jaki ma być?"

Zła reakcja:

Bot kontynuuje odczyt albo wraca do początku.

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

- Wlacz barge-in przy długich informacjach i podsumowaniach.
- Projektuj korektę pojedynczego slotu.
- Nie restartuj flow po przerwaniu.
- Rozpoznawaj "konsultant" jako wysoki priorytet.
- Ignoruj backchannele, gdy nie wymagają przejęcia tury.
- Przy frustracji skroc rozmowę.
- Przy drugim nieudanym recovery eskaluj.

## 7.8. Typowe błędy

| Błąd | Konsekwencja |
|---|---|
| Brak barge-in | Bot przegaduje użytkownika |
| Globalny barge-in bez filtrowania | Bot zatrzymuje się po szumie |
| Brak korekty slotu | Reset rozmowy |
| Ignorowanie "konsultant" | Silna frustracja |
| Brak logow przerwań | Nie wiadomo, co poprawiać |
| Nieodroznianie backchannel od przerwania | Nienaturalna rozmową |

## 7.9. Checklista przerwań

- Czy prompt jest przerywalny?
- Czy mamy intencje korekty?
- Czy mamy intencje eskalacji?
- Czy mamy obsługę "stop", "czekaj", "nie", "inaczej"?
- Czy bot zachowuje zebrane dane?
- Czy przerwanie jest logowane?
- Czy QA testuje przerwania w tym kroku?
- Czy komunikat recovery jest krótki?

## 7.10. Mini case study

Voicebot bankowy odczytywal oferte limitu i nie pozwalal przerwać. Użytkownicy mowili "nie chce", ale bot konczyl cały komunikat. Po zmianie barge-in włączono dla części sprzedazowej, a "nie chce" kierowalo do neutralnego zamkniecia: "Rozumiem, nie będę kontynuowac oferty. Czy chce pan załatwić cos jeszcze z karta?". Spadły skargi na nachalnosc.

## 7.11. Ćwiczenia

1. Dla podsumowania zamówienia zaprojektuj trzy typy przerwań i recovery.
2. Napisz dialog z korekta adresu.
3. Zaprojektuj reakcje na "konsultant" w trakcie promptu.
4. Wskaż prompt, gdzie barge-in powinien być ograniczony.

## 7.12. Podsumowanie

Przerwania nie są wyjatkiem od rozmowy. Są częścią naturalnej kontroli dialogu. Dobry voicebot nie tylko pozwala przerwać, ale wie, co przerwanie znaczy i jak wrócić do sensownego miejsca.

---

# Rozdział 8. Projektowanie dla emocji użytkownika

## 8.1. Cele rozdziału

Czytelnik nauczy się:

- rozpoznawać emocjonalne konteksty rozmów;
- projektować komunikaty dla frustracji, niepewności i stresu;
- odróżniać empatię od fałszywej empatii;
- tworzyć warunki szybkiej eskalacji w sytuacjach trudnych.

## 8.2. Kluczowe pojęcia

| Pojęcie | Definicja |
|---|---|
| Emotional context | Emocjonalne tlo rozmowy |
| Frustration signal | Sygnał irytacji, np. powtarzanie, podniesiony głos, przeklenstwa |
| De-escalation | Obnizanie napiecia |
| False empathy | Udawanie emocji bez realnej pomocy |
| Sensitive domain | Obszar o wysokim ryzyku emocjonalnym lub prawnym |
| Crisis escalation | Natychmiastowe przekazanie do człowieka lub odpowiedniej procedury |

## 8.3. Wyjaśnienie eksperckie

Voicebot często rozmawia z ludźmi, którzy:

- spiesza się;
- są zdenerwowani;
- nie rozumieja procedury;
- boja się kosztów;
- czuja niesprawiedliwosc;
- są chorzy lub opiekuja się kims chorym;
- mają problem finansowy;
- próbują odzyskac kontrolę.

Projektowanie dla emocji nie oznacza, że bot ma mówić "doskonale pana rozumiem". Bot nie rozumie jak człowiek. Lepiej projektować konkretna pomóc:

Zamiast:

"Rozumiem pana frustrację."

Lepiej:

"Widze, że to nie działa tak, jak powinno. Skroce rozmowę i połączę z konsultantem."

## 8.4. Perspektywa biznesowa

Emocje wpływają na:

- CSAT;
- eskalację;
- skargi;
- compliance;
- rotacje konsultantów, którzy przejmują trudne rozmowy;
- reputacje marki.

Automatyzacja trudnych emocjonalnie procesów bez dobrego handoff może obnizyc koszt pierwszej linii, ale zwiększyć koszt drugiej linii i reklamacji.

## 8.5. Perspektywa użytkownika

Użytkownik w emocjach potrzebuje:

- krótszych komunikatów;
- mniej opcji;
- potwierdzenia problemu;
- jasnego następnego kroku;
- możliwości rozmowy z człowiekiem;
- braku moralizowania;
- braku powtarzania tego samego.

## 8.6. Perspektywa technologiczna

System może wykrywać emocje przez:

- słowa kluczowe;
- intencje frustracji;
- powtórzenia;
- barge-in rate;
- wzrost głośności lub tempo, jeśli przetwarzanie audio to wspiera;
- szybkie prośby o konsultanta;
- wiele no-match pod rzad.

Uwaga: klasyfikacja emocji jest niepewna. Nie należy traktować jej jako diagnozy. Lepiej mówić o "sygnalach frustracji" niż "użytkownik jest zły".

## 8.7. Dobre praktyki

- Skracaj rozmowę po sygnalach frustracji.
- Nie powtarzaj identycznego fallbacku.
- Daj alternatywe: konsultant, SMS, ticket, callback.
- Nie używaj fałszywej empatii.
- W sprawach wrażliwych eskaluj szybciej.
- Nie pros użytkownika o powtarzanie danych, jeśli masz je w stanie.
- Projektuj komunikaty neutralne i rzeczowe.

## 8.8. Typowe błędy

| Błąd | Konsekwencja |
|---|---|
| Bot mówi "rozumiem", ale nic nie zmienia | Większa frustracja |
| Zbyt wiele przeprosin | Bot brzmi bezradnie |
| Brak eskalacji po agresji | Ryzyko skargi |
| Zbyt marketingowy ton w reklamacji | Wrazenie lekcewazenia |
| Automatyzacja sytuacji kryzysowej | Ryzyko etyczne i prawne |

## 8.9. Checklista emocji

- Czy znamy emocjonalny kontekst use case'u?
- Czy bot ma skrócone ścieżki dla frustracji?
- Czy istnieje intencja "konsultant"?
- Czy po drugim fallbacku bot zmienia strategie?
- Czy komunikaty unikaja fałszywej empatii?
- Czy sytuację krytyczne są eskalowane natychmiast?
- Czy konsultant dostaje informacje o trudnosciach w rozmowie?

## 8.10. Mini case study

Voicebot reklamacyjny po nierozpoznaniu dokumentu prosił trzy razy o numer sprawy. Użytkownicy mowili: "już podawalem". Dodano pamięć ostatnich prób, komunikat: "Mam podany numer, ale nie mogę go znaleźć w systemie. Połączę z konsultantem i przekaze ten numer." Bot przestal zmuszac użytkownika do powtarzania, a konsultant dostawal kontekst.

## 8.11. Ćwiczenia

1. Napisz komunikat dla użytkownika, który mówi "już to podawalem".
2. Zaprojektuj reakcje na agresywna prośbę o konsultanta.
3. Wskaż trzy sygnały frustracji w logach.
4. Zaprojektuj eskalację dla sytuacji medycznie pilnej.

## 8.12. Podsumowanie

Emocje nie są dodatkiem do conversation design. Są częścią realnego środowiska rozmowy. Dobry voicebot nie udaje terapeuty ani konsultanta, ale potrafi skrócić droge, dac kontrolę i oddać rozmowę człowiekowi, gdy to najlepsze dla użytkownika.

---

# Rozdział 9. Dokumentacja scenariusza dialogowego

## 9.1. Cele rozdziału

Czytelnik nauczy się:

- dokumentowac scenariusz w sposób użyteczny dla zespolu;
- łączyć dialog z intencjami, slotami, integracjami, metrykami i QA;
- przygotować materiał, który nie jest tylko "skryptem tekstów";
- tworzyć dokumentacje gotowa do wdrożenia i utrzymania.

## 9.2. Kluczowe pojęcia

| Pojęcie | Definicja |
|---|---|
| Dialog scenario | Dokument opisujacy przebieg rozmowy |
| Flow | Struktura krokow i przejść |
| Prompt library | Biblioteka komunikatów |
| State table | Tabela stanow dialogu |
| Test path | Ścieżka testowa |
| Acceptance criteria | Kryteria akceptacji zachowania |
| Conversation spec | Pełna specyfikacja rozmowy |

## 9.3. Wyjaśnienie eksperckie

Scenariusz dialogowy powinien być pomostem między:

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
| User goal | Cel użytkownika |
| Business goal | Cel firmy |
| Entry conditions | Kiedy flow się uruchamia |
| Exit conditions | Kiedy flow się kończy |
| Required slots | Dane wymagane |
| Optional slots | Dane opcjonalne |
| Integrations | Systemy/API |
| Prompts | Komunikaty bota |
| Expected inputs | Oczekiwane odpowiedzi |
| Fallbacks | No-input, no-match, repair |
| Barge-in policy | Polityka przerwań |
| Handoff rules | Warunki eskalacji |
| Metrics | Jak mierzymy sukces |
| QA cases | Ścieżki testowe |

## 9.4. Perspektywa biznesowa

Dobra dokumentacja:

- pozwala zatwierdzic zakres;
- ogranicza nieporozumienia;
- ułatwia wycene;
- pomaga w compliance review;
- staje się podstawa testów;
- przyspiesza utrzymanie.

Zła dokumentacja to zwykle lista tekstów bota bez stanow, integracji i warunków. Taki dokument wygląda dobrze na warsztacie, ale nie wystarcza do wdrożenia.

## 9.5. Perspektywa użytkownika

Dokumentacja powinna zawierac nie tylko happy path, ale też naturalne zachowania użytkownika:

- milczenie;
- poprawki;
- przerywanie;
- zmiana tematu;
- prośba o konsultanta;
- odpowiedź niepełna;
- odpowiedź emocjonalna;
- odpowiedź poza zakresem.

Jeśli scenariusz opisuje tylko idealnego użytkownika, nie opisuje prawdziwej rozmowy.

## 9.6. Perspektywa technologiczna

Technologia potrzebuje:

- identyfikatorow promptów;
- identyfikatorow intencji;
- typów encji;
- walidacji slotów;
- stanow;
- eventow;
- timeoutow;
- integracji;
- mapowania błędów API;
- reguł handoff;
- wymagań logowania.

## 9.7. Dobre praktyki

- Dokumentuj flow jako stany i przejścia, nie tylko dialog tekstowy.
- Oznacz happy path, unhappy path, fallback path i escalation path.
- Dodaj przykłady wypowiedzi użytkownika.
- Dla każdego promptu okresl expected input.
- Dla każdego kroku okresl metryki.
- Utrzymuj wersje dokumentu.
- Powiaz dokumentacje z testami QA.

## 9.8. Typowe błędy

| Błąd | Konsekwencja |
|---|---|
| Scenariusz tylko jako dialog | Brak danych dla dev/QA |
| Brak unhappy paths | Bot psuje się poza demo |
| Brak polityki handoff | Eskalację są przypadkowe |
| Brak mapowania integracji | Dialog nie pasuje do systemów |
| Brak wersjonowania | Nie wiadomo, co jest na produkcji |
| Brak metryk per krok | Trudno optymalizować |

## 9.9. Szablon scenariusza dialogowego

```text
Nazwa flow:
Wersja:
Wlasciciel biznesowy:
Wlasciciel conversation design:
Data:

1. Cel użytkownika:
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

Zespół projektowal voicebota do zmiany terminu dostawy. Pierwszy dokument zawieral tylko dialog: bot pyta o numer zamówienia, potem o datę. Developerzy nie wiedzieli, co robić, gdy zamówienie jest już wysłane, a QA nie miało testów dla korekty daty. Druga wersja dokumentacji dodała statusy zamówienia, walidacje dat, błędy API, politykę korekty i handoff. Wdrożenie przyspieszylo, bo scenariusz stał się specyfikacja, nie tekstem.

## 9.11. Ćwiczenia

1. Uzupelnij szablon scenariusza dla statusu zamówienia.
2. Dodaj trzy unhappy paths.
3. Dodaj warunki handoff.
4. Dodaj metryki per krok.

## 9.12. Podsumowanie

Scenariusz dialogowy jest dokumentem produktowo-technicznym. Dobry scenariusz opisuje rozmowę, dane, decyzję, integracje, błędy i metryki. To narzędzie wdrożenia i utrzymania, nie tylko ładny zapis rozmowy.

---

# 10. Zbiorcza checklista po Części III

- Czy komunikaty są projektowane pod ucho, nie pod ekran?
- Czy każda wypowiedź ma jedna funkcję?
- Czy każde pytanie zbiera jedna rzecz?
- Czy prompt'y mają ID i miejsce w flow?
- Czy każdy krok ma expected input?
- Czy projekt uwzględnia no-input i no-match?
- Czy reprompt'y nie powtarzają identycznie tego samego?
- Czy barge-in jest opisany per prompt?
- Czy bot potrafi obsłużyć korektę?
- Czy prośba o konsultanta jest rozpoznawana?
- Czy persona jest transparentna i nie udaje człowieka?
- Czy ton jest dopasowany do emocjonalnego kontekstu?
- Czy scenariusz zawiera happy path, unhappy path, fallback i escalation path?
- Czy dokumentacja nadaje się dla biznesu, dev, QA i contact center?

---

# 11. Co będzie w kolejnej części

Kolejna część powinna opracowac **Część IV. Analiza biznesowa i wybór use case'ow**:

1. Jak analizować procesy contact center.
2. Jak rozpoznać dobry use case dla voicebota.
3. Jak ocenić automatyzowalnosc procesu.
4. Jak mierzyć wartość biznesowa i ROI.
5. Kiedy nie wdrażać voicebota.
6. Jak przygotować brief, wymagania i business case.
7. Pełna matryca oceny use case'u.

