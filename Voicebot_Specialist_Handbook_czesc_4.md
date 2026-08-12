# Rozdział 4. Conversation Design dla voicebotów

## 4.1. Pisanie tekstu a projektowanie rozmowy głosowej

### 4.1.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja praktyczna | Typowe nieporozumienie |
|---|---|---|
| Komunikat głosowy | Wypowiedź zaprojektowana do usłyszenia, nie do przeczytania | "Wystarczy odczytać tekst FAQ" |
| Pamięć słuchowa | Zdolność utrzymania usłyszanej informacji przez krótki czas | "Użytkownik zapamięta listę opcji" |
| Chunking | Dzielenie informacji na małe porcje | "Im więcej powiem naraz, tym szybciej pójdzie" |
| Progressive disclosure | Stopniowe ujawnianie informacji | "Trzeba od razu podać wszystkie możliwości" |
| Multichannel support | Wsparcie rozmowy głosowej innym kanałem, np. SMS-em | "Voicebot musi wszystko załatwić głosem" |

### 4.1.2. Wyjaśnienie eksperckie

Tekst ekranowy może być dłuższy, bo użytkownik widzi go cały czas. Może do niego wrócić, porównać opcję, przeczytać wolniej, zignorować fragmenty i skupić wzrok na ważnych danych. Głos znika po wypowiedzeniu. Dlatego każde dodatkowe słowo ma koszt.

W voicebocie informacja musi być:

- krótka;
- uporządkowana;
- słyszalna w naturalnym rytmie;
- dopasowana do celu użytkownika;
- łatwa do przerwania;
- łatwa do powtórzenia;
- niewymagająca zapamiętania wielu elementów.

Zły wzorzec:

"W naszej firmie może pan uzyskać informacje o statusie zamówienia, zmienić termin dostawy, zmienić adres, sprawdzić reklamację, uzyskać fakturę, dowiedzieć się o zwrotach, anulować zamówienie albo porozmawiać z konsultantem."

Lepszy wzorzec:

"W czym mogę pomóc przy zamówieniu?"

Reprompt po ciszy:

"Może pan powiedzieć na przykład: status, zmiana adresu albo zwrot."

Uwaga praktyczna:

W głosie lista opcji jest narzędziem awaryjnym, nie podstawowym sposobem projektowania. Jeśli system potrafi rozpoznać intencje, zacznij od pytania otwartego w granicach domeny, a przy ciszy podaj 2-3 przykłady.

### 4.1.3. Perspektywa biznesowa

Dobre komunikaty głosowe zmniejszają:

- średni czas rozmowy;
- no-input;
- no-match;
- liczbę powtórzeń;
- liczbę przerwań;
- eskalacje spowodowane frustracją.

Złe komunikaty zwiększają koszt, nawet jeśli technologia działa poprawnie. Bot może mieć dobry ASR i NLU, ale jeśli zada pytania niezrozumiałe, użytkownik nie da mu dobrego inputu.

### 4.1.4. Perspektywa użytkownika

Użytkownik często dzwoni w sytuacji zadaniowej: chce załatwić sprawę, nie uczyć się systemu. Komunikat głosowy powinien odpowiadać na trzy pytania:

1. Co system robi teraz?
2. Czego ode mnie potrzebuje?
3. Jak mogę odpowiedzieć?

Przykład:

"Znalazłem dwa zamówienia. Które mam sprawdzić: z poniedziałku czy z wczoraj?"

Ten komunikat jest dobry, bo nie tłumaczy całej logiki systemu. Daje kontekst i jasny wybór.

### 4.1.5. Perspektywa technologiczna

Tekst dialogowy trafia do TTS, a czasem do LLM jako instrukcja odpowiedzi. Dlatego musi być zaprojektowany tak, aby:

- TTS poprawnie go odczytał;
- liczby, daty i kody były jednoznaczne;
- barge-in mógł zatrzymać komunikat bez utraty sensu;
- logi były czytelne;
- warianty odpowiedzi były kontrolowane;
- komunikaty były wersjonowane.

W generatywnych voicebotach warto mieć response style guide: zasady długości, tonu, potwierdzeń, zakazów i sposobów eskalacji. Model nie powinien sam decydować, jak długi ma być komunikat w kanale głosowym.

### 4.1.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Pisz do ucha, nie do oka.
- Jedna wypowiedź = jedna myśl.
- Jedno pytanie naraz.
- Maksymalnie 2-3 przykłady w jednym komunikacie.
- Najważniejsza informacja na początku.
- Długie dane wysyłaj SMS-em lub e-mailem, jeśli to lepsze.
- Testuj komunikaty przez odczyt na głos.
- Usuwaj słowa, które nie pomagają użytkownikowi wykonać kroku.

### 4.1.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Kopiowanie FAQ do TTS | Długie, nienaturalne odpowiedzi |
| Zadawanie kilku pytań naraz | Niepełne lub chaotyczne odpowiedzi |
| Wymienianie zbyt wielu opcji | Użytkownik pamięta tylko fragment listy |
| Brak informacji, co można powiedzieć | Cisza albo "halo?" |
| Zbyt formalny język | Dystans i większe obciążenie poznawcze |
| Ukrywanie celu pytania | Użytkownik nie rozumie, po co podaje dane |

### 4.1.8. Checklista

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy komunikat da się zrozumieć po jednokrotnym usłyszeniu?
- Czy zawiera tylko jedno pytanie?
- Czy ma mniej niż 2-3 opcje?
- Czy można go przerwać bez utraty sensu?
- Czy TTS dobrze czyta liczby i nazwy?
- Czy użytkownik wie, co ma powiedzieć?
- Czy komunikat jest krótszy niż wersja tekstowa?
- Czy długie dane można wysłać innym kanałem?

### 4.1.9. Mini case study

Sklep internetowy wdrożył voicebota do zwrotów. Pierwsza wersja odczytywała całą politykę zwrotów. Użytkownicy przerywali i prosili o konsultanta. Druga wersja zaczynała od pytania: "Czy chce pan sprawdzić status zwrotu, czy dowiedzieć się, jak go nadać?". Dopiero po wyborze bot podawał krótką, dopasowaną odpowiedź i proponował SMS z linkiem. Spadły przerwania i czas rozmowy.

### 4.1.10. Podsumowanie

Projektowanie głosu wymaga dyscypliny. Każdy komunikat powinien prowadzić użytkownika do następnego kroku, a nie prezentować wszystko, co firma wie. Voicebot nie jest audiobookiem procedury.

---

## 4.2. Zasady projektowania wypowiedzi voicebota

### 4.2.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Prompt | Wypowiedź bota kierowana do użytkownika |
| Prompt hierarchy | Priorytet informacji w komunikacie |
| Microcopy głosowe | Krótkie teksty operacyjne w rozmowie |
| Confirmation | Potwierdzenie danych lub decyzji |
| Explicit confirmation | Potwierdzenie wymagające odpowiedzi użytkownika |
| Implicit confirmation | Potwierdzenie wplecione w kolejny krok |
| Repair prompt | Komunikat naprawczy po błędzie |

### 4.2.2. Wyjaśnienie eksperckie

Dobra wypowiedź voicebota ma funkcję. Nie "brzmi ładnie", tylko wykonuje zadanie w rozmowie.

Najczęstsze funkcje:

1. Ustanowienie kontekstu: "Znalazłem pana zamówienie."
2. Zapytanie o dane: "Jaki adres mam wpisać?"
3. Potwierdzenie: "Adres to Kwiatowa 8, mieszkanie 12."
4. Informacja o działaniu: "Sprawdzam dostępne terminy."
5. Naprawa: "Nie mam pewności, czy dobrze usłyszałem numer."
6. Eskalacja: "Połączę z konsultantem."
7. Zakończenie: "Gotowe. Potwierdzenie wysłałem SMS-em."

Komunikat powinien mieć priorytet:

```text
Najpierw: co sie stalo / czego potrzebuje system
Potem: co uzytkownik ma zrobić
Na koncu: opcjonalne przyklady lub dodatkowe informacje
```

Przykład:

"Nie znalazłem zamówienia pod tym numerem. Proszę podać numer jeszcze raz, po trzy cyfry."

Komunikat jest lepszy niż:

"Niestety, w wyniku wyszukiwania w naszym systemie nie udało się odnaleźć zamówienia, które odpowiadałoby podanym przez pana danym, dlatego proszę spróbować ponownie."

### 4.2.3. Perspektywa biznesowa

Standard wypowiedzi bota jest częścią standardu obsługi klienta. Dobre wypowiedzi:

- zmniejszają czas szkolenia projektantów;
- ułatwiają QA;
- zapewniają spójność marki;
- redukują ryzyka prawne;
- pomagają utrzymywać jakość przy wielu use case'ach.

Firma powinna mieć voice style guide, czyli dokument zawierający:

- ton;
- poziom formalności;
- zasady przepraszania;
- zasady potwierdzania danych;
- zasady długości komunikatów;
- słowa zakazane;
- wzorce fallbacków;
- wzorce eskalacji.

### 4.2.4. Perspektywa użytkownika

Użytkownik ceni:

- prostotę;
- przewidywalność;
- brak upokarzających komunikatów;
- jasny kolejny krok;
- potwierdzenie ważnych danych;
- możliwość poprawy.

Zamiast:

"Niepoprawna odpowiedź."

Lepiej:

"Nie mam pewności, czy dobrze zrozumiałem. Proszę powiedzieć: tak albo nie."

### 4.2.5. Perspektywa technologiczna

Komunikaty powinny być zapisane w sposób pozwalający:

- wersjonować treści;
- łączyć komunikat z etapem flow;
- testować warianty;
- analizować, po których promptach rośnie no-input, no-match lub barge-in;
- kontrolować generacje LLM;
- dostosowywać TTS.

Przykłady pól w dokumentacji promptu:

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

### 4.2.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Zaczynaj od czasownika lub konkretu.
- Unikaj biernej strony.
- Unikaj żargonu i formalizmów.
- Potwierdzaj dane krytyczne.
- Nie przepraszaj bez końca.
- Nie mów "rozumiem", jeśli system nie rozumie.
- Dla błędów dawaj instrukcje, nie tylko komunikat błędu.
- Projektuj warianty dla pierwszej i kolejnej próby.

### 4.2.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| "Przepraszam" w każdym fallbacku | Bot brzmi bezradnie |
| Brak instrukcji po błędzie | Użytkownik nie wie, co zmienić |
| Zbyt wiele uprzejmości | Dłuższa rozmowa bez wartości |
| Potwierdzanie wszystkiego | Spowolnienie procesu |
| Niepotwierdzanie danych krytycznych | Ryzyko błędnej akcji |
| "Czy mogę jeszcze w czymś pomóc?" po każdej sprawie | Dodatkowe, często niepotrzebne tury |

### 4.2.8. Checklista wypowiedzi

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy komunikat ma jedną funkcję?
- Czy najważniejsza informacja jest na początku?
- Czy użytkownik wie, co ma powiedzieć?
- Czy usunięto słowa bez funkcji?
- Czy ton pasuje do sytuacji?
- Czy komunikat jest inny przy drugim błędzie?
- Czy dane krytyczne są potwierdzone?
- Czy prompt ma ID i miejsce w flow?

### 4.2.9. Mini case study

Voicebot helpdesku IT po nierozpoznaniu problemu mówił: "Przepraszam, nie zrozumiałem. Proszę powtórzyć." Po trzech próbach użytkownicy byli sfrustrowani. Nowy wariant: "Nie mam pewności, czy chodzi o VPN, hasło czy pocztę. Które z tych trzech?". Bot nie tylko informuje o błędzie, ale zawęża przestrzeń odpowiedzi. No-match spada.

### 4.2.10. Podsumowanie

Każda wypowiedź voicebota powinna mieć funkcję dialogową. Dobre microcopy głosowe prowadzi rozmowę, zmniejsza obciążenie poznawcze i ułatwia systemowi otrzymanie poprawnego inputu.

---

## 4.3. Turn-taking w praktyce conversation design

### 4.3.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Tura | Fragment rozmowy należący do jednego mówcy |
| Turn-taking | Organizacja zmian mówcy |
| TRP | Miejsce potencjalnego przejęcia tury |
| Overlap | Nakładanie się wypowiedzi |
| Barge-in | Użytkownik wchodzi w wypowiedź bota |
| Endpointing | Decyzja, czy użytkownik skończył mówić |
| Floor | "Prawo głosu" w danym momencie rozmowy |

### 4.3.2. Wyjaśnienie eksperckie

Projektant rozmowy głosowej nie projektuje tylko tekstów. Projektuje rytm:

- jak długa jest tura bota;
- kiedy bot oddaje głos;
- czy oczekuje krótkiej odpowiedzi;
- czy użytkownik może mówić długo;
- kiedy bot powinien poczekać;
- kiedy powinien dopytać;
- kiedy powinien przerwać własną wypowiedź po barge-in.

Wynika ze źródeł naukowych: naturalne turn-taking opiera się na przewidywaniu końca tury, nie tylko na pauzie. W systemach głosowych trzeba uwzględnić sygnały semantyczne i kontekstowe, bo sama cisza jest zbyt prymitywnym sygnałem.

Uzupełnienie eksperckie: conversation designer powinien oznaczać w scenariuszu oczekiwany typ inputu:

| Typ inputu | Projekt timingowy |
|---|---|
| Tak/nie | Krótka odpowiedź, szybkie endpointing, możliwy barge-in |
| Numer/kod | Tolerancja pauz, potwierdzanie grupami, DTMF fallback |
| Opis problemu | Dłuższe słuchanie, mniej agresywne endpointing |
| Emocjonalna skarga | Długie słuchanie, szybka eskalacja po sygnałach frustracji |
| Wybór z 2 opcji | Jasny prompt, szybka interpretacja |
| Swobodna intencja | Pytanie otwarte, disambiguation przy niepewności |

### 4.3.3. Perspektywa biznesowa

Timing wpływa na:

- AHT;
- skuteczność zbierania danych;
- porzucenia rozmów;
- liczbę powtórzeń;
- eskalację;
- jakość danych w CRM/ticketingu.

Zbyt szybki bot może robić błędy. Zbyt wolny bot generuje koszt i frustrację. Dobra decyzja timingowa wynika z wartości kroku: dla prostego potwierdzenia liczy się szybkość, dla numeru klienta liczy się dokładność.

### 4.3.4. Perspektywa użytkownika

Użytkownik czuje się dobrze, gdy:

- bot nie wchodzi mu w słowo;
- bot nie zostawia zbyt długich ciszy;
- bot pozwala przerwać;
- bot rozpoznaje, że wypowiedź jeszcze trwa;
- bot nie wymusza nienaturalnego tempa.

Bot powinien dopasować tempo do zadania. Starszy użytkownik dyktujący numer potrzebuje innego rytmu niż klient e-commerce mówiący "chce zwrot".

### 4.3.5. Perspektywa technologiczna

Conversation designer powinien współpracować z technologią przy ustawieniach:

- no-speech timeout;
- end-of-speech sensitivity;
- end-of-turn threshold;
- VAD sensitivity;
- barge-in policy;
- max user turn duration;
- silence handling;
- confirmation threshold.

Te ustawienia nie powinny być globalne. Powinny zależeć od kroku dialogu.

### 4.3.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Oznaczaj oczekiwany typ odpowiedzi w scenariuszu.
- Dla długich slotów dawaj instrukcje mówienia w grupach.
- Dla pytań tak/nie nie dawaj długich promptów.
- Dla opisów problemu nie ucinaj użytkownika po krótkiej pauzie.
- Projektuj barge-in dla promptów informacyjnych.
- Mierz przerwania per prompt.
- Projektuj recovery po overlap.

### 4.3.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Jeden timeout dla całego bota | Ucinanie albo martwa cisza |
| Brak oznaczenia typu inputu | Technologia nie wie, jak stroić krok |
| Za długie tury bota | Więcej barge-in |
| Brak barge-in przy podsumowaniach | Użytkownik nie może poprawić błędu |
| Bot odpowiada po każdej mikropauzie | Wchodzi w słowo |

### 4.3.8. Checklista turn-taking

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy każdy krok ma oczekiwany typ inputu?
- Czy długie odpowiedzi użytkownika mają dłuższe endpointing?
- Czy krótkie odpowiedzi mają szybką reakcję?
- Czy barge-in jest skonfigurowany per prompt?
- Czy bot zachowuje kontekst po przerwaniu?
- Czy no-input i no-match mają różne reakcje?
- Czy testujemy rozmowy z pauzami i overlap?

### 4.3.9. Mini case study

Voicebot medyczny pyta: "Proszę opisać, co się dzieje." Endpointing był ustawiony jak dla pytań tak/nie. Pacjenci robili pauzę po pierwszym zdaniu, a bot od razu zaczynał diagnozować kategorie sprawy. Po zmianie ten krok otrzymał dłuższe okno słuchania, krótki backchannel "Rozumiem, proszę mówić dalej" tylko w wybranych sytuacjach oraz eskalację przy sygnałach pilności. Jakość klasyfikacji wzrosła.

### 4.3.10. Podsumowanie

Turn-taking jest ukrytym szkieletem rozmowy. Jeśli jest źle zaprojektowane, nawet dobre teksty i modele będą brzmieć sztucznie. Conversation designer musi projektować nie tylko co bot mówi, ale kiedy mówi, kiedy słucha i kiedy oddaje kontrolę.

---

## 4.4. Persona voicebota, ton, styl i formalność

### 4.4.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Persona voicebota | Zestaw zasad określający, jak bot brzmi i zachowuje się w rozmowie |
| Ton | Emocjonalne zabarwienie wypowiedzi |
| Styl | Sposób formułowania komunikatów |
| Formalność | Poziom oficjalności języka |
| Brand voice | Język marki |
| Transparency | Jasne informowanie, że rozmowca jest systemem AI |
| False empathy | Udawanie emocjonalnego rozumienia bez realnej zdolności pomocy |

### 4.4.2. Wyjaśnienie eksperckie

Persona voicebota nie polega na wymyśleniu imienia i charakteru. To operacyjny dokument, który pomaga pisać spójne komunikaty i ograniczać ryzyka.

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

### 4.4.3. Perspektywa biznesowa

Persona bota wpływa na:

- zaufanie do marki;
- spójność obsługi;
- compliance;
- eskalację;
- odbiór automatyzacji.

W banku, medycynie lub windykacji zbyt swobodny ton może być nieprofesjonalny. W e-commerce zbyt urzędowy ton może zwiększać dystans. Persona musi wynikać z kontekstu użycia, nie z gustu zespołu.

### 4.4.4. Perspektywa użytkownika

Użytkownik powinien od początku wiedzieć:

- że rozmawia z automatycznym systemem;
- w czym system może pomóc;
- jak przejść dalej;
- że może poprawić lub poprosić o człowieka.

Transparentność nie musi brzmieć ciężko:

"Dzień dobry, jestem automatycznym asystentem firmy X. Pomogę sprawdzić zamówienie albo połączę z konsultantem. W czym mogę pomóc?"

### 4.4.5. Perspektywa technologiczna

Persona powinna być zakodowana w:

- promptach systemowych LLM;
- response templates;
- style guide;
- regułach generowania odpowiedzi;
- testach QA;
- kryteriach akceptacji;
- słowniku słów zakazanych;
- fallbackach i eskalacjach.

W voicebotach generatywnych persona musi mieć twarde ograniczenia:

- maksymalna długość odpowiedzi;
- zakaz udawania człowieka;
- zasady "nie wiem";
- zasady przepraszania;
- zasady eskalacji;
- zakaz porad poza domeną.

### 4.4.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Projektuj personę jako rolę obsługi, nie fikcyjną postać.
- Bądź transparentny, że to system.
- Nie udawaj emocji, których bot nie może realnie mieć.
- Dopasuj formalność do branży i sytuacji.
- Ustal język błędów i eskalacji.
- Testuj tone-of-voice na trudnych scenariuszach, nie tylko happy path.
- Unikaj żartów w sytuacjach stresowych.

### 4.4.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Nadawanie botowi zbyt ludzkiej roli | Rozczarowanie i ryzyko zaufania |
| Brak transparentności | Użytkownik czuje się oszukany |
| Zbyt marketingowy ton | Brak wiarygodności w obsłudze problemu |
| Zbyt formalny język | Więcej obciążenia poznawczego |
| Żarty w reklamacjach | Eskalacja frustracji |
| Brak zasad dla LLM | Niespójny ton |

### 4.4.8. Checklista persony

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy bot jasno mówi, że jest automatyczny?
- Czy rola bota jest określona?
- Czy wiemy, czego bot nie powinien mówić?
- Czy ton pasuje do trudnych sytuacji?
- Czy mamy wzorce przeprosin?
- Czy mamy wzorce eskalacji?
- Czy persona jest wpisana w prompt systemowy?
- Czy QA ocenia ton, nie tylko poprawną intencję?

### 4.4.9. Mini case study

Firma windykacyjna chciała, aby bot brzmiał "przyjaźnie i lekko". Pierwsze komunikaty używały sformułowań "spokojnie, zaraz to ogarniemy". Użytkownicy odbierali to jako lekceważenie. Persona została zmieniona na spokojną, rzeczową i neutralną: "Wyjaśnię dostępne opcje. Jeśli kwestionuje pan należność, połączę z konsultantem." Spadła liczba agresywnych reakcji w testach UAT.

### 4.4.10. Podsumowanie

Persona voicebota to narzędzie kontroli jakości i zaufania. Dobry bot nie musi być "jak człowiek". Ma być jasny, pomocny, przewidywalny i uczciwy co do swoich możliwości.

---

## 4.5. Projektowanie powitań, pytań, potwierdzeń i zakończeń

### 4.5.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

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

### 4.5.2. Wyjaśnienie eksperckie

#### Powitanie

Powitanie ma trzy funkcje:

1. Poinformować, z kim użytkownik rozmawia.
2. Ustawić zakres.
3. Zaprosić do celu.

Dobre:

"Dzień dobry, jestem automatycznym asystentem firmy X. Pomogę w sprawach zamówień. W czym mogę pomóc?"

Źle:

"Witamy serdecznie w najnowocześniejszym systemie automatycznej obsługi klienta firmy X, który został zaprojektowany, aby zapewnić państwu najwyższą jakość kontaktu..."

#### Pytania

Dobre pytanie:

- pyta o jedną rzecz;
- daje jasną formę odpowiedzi;
- nie sugeruje zbyt wielu opcji;
- jest dopasowane do danych, które system potrafi przetworzyć.

Przykłady:

- "Jaki jest numer zamówienia?"
- "Na jaki dzień chce pan przełożyć dostawę?"
- "Czy chodzi o fakturę, dostawę czy zwrot?"

#### Potwierdzenia

Nie wszystko trzeba potwierdzać. Potwierdzenia mają koszt czasowy. Dobieraj je do ryzyka.

| Dane | Typ potwierdzenia |
|---|---|
| Intencja niskiego ryzyka | Implicit |
| Adres, data, godzina | Explicit lub implicit zalezne od skutku |
| Płatność, zgoda, anulowanie | Explicit |
| Pytanie FAQ | Brak lub implicit |
| Dane osobowe | Ostrozne, minimalne |

#### Zakończenie

Dobre zakończenie:

- mówi, co zostało zrobione;
- informuje o następnym kroku;
- nie przeciąga rozmowy;
- daje kanał potwierdzenia.

"Gotowe. Termin zmieniony na czwartek, 15:30. Potwierdzenie wysłałem SMS-em. Dziękuję za rozmowę."

### 4.5.3. Perspektywa biznesowa

Powitanie wpływa na opt-in do automatyzacji. Pytania wpływają na jakość danych. Potwierdzenia wpływają na koszt błędów. Zakończenie wpływa na repeat contact.

Jeśli bot nie powie, co zostało zrobione, użytkownik może zadzwonić ponownie. Jeśli bot zada źle pytanie, integracja może dostać złe dane. Jeśli bot nie potwierdzi anulowania, firma może mieć reklamację.

### 4.5.4. Perspektywa użytkownika

Użytkownik potrzebuje przewidywalności:

- "wiem, z kim rozmawiam";
- "wiem, co mogę powiedzieć";
- "wiem, że dobrze mnie zrozumiano";
- "wiem, co się stało na końcu".

Najbardziej frustrujące są pytania, które wyglądają prosto, ale są niejasne:

"Proszę podać dane."

Jakie dane? Numer zamówienia, PESEL, nazwisko, telefon?

### 4.5.5. Perspektywa technologiczna

Pytania muszą być powiązane ze slotami. Każde pytanie powinno mieć:

- slot docelowy;
- typ danych;
- walidacje;
- przykłady odpowiedzi;
- prompt naprawczy;
- politykę potwierdzenia;
- politykę endpointing;
- barge-in policy.

### 4.5.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- W powitaniu powiedz, że bot jest automatyczny.
- Nie wymieniaj zbyt wielu możliwości.
- Zadawaj jedno pytanie naraz.
- Projektuj pytania tak, aby użytkownik mógł odpowiedzieć naturalnie.
- Potwierdzaj tylko tam, gdzie ma to wartość.
- W zakończeniu nazwij wykonaną akcję.
- Przy ważnych sprawach wysyłaj potwierdzenie poza kanałem głosowym.

### 4.5.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Powitanie jako monolog | Przerwania od pierwszych sekund |
| Brak informacji, że to bot | Utrata zaufania |
| Pytanie o kilka danych naraz | Niepełne odpowiedzi |
| Potwierdzanie każdej drobnostki | Długie rozmowy |
| Brak potwierdzenia akcji krytycznej | Ryzyko reklamacji |
| Otwarte zakończenie bez wyniku | Repeat contact |

### 4.5.8. Checklista

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy powitanie jest krótsze niż 10-15 sekund?
- Czy bot informuje, że jest automatyczny?
- Czy pierwsze pytanie zaprasza do celu?
- Czy każde pytanie zbiera jeden slot?
- Czy dane krytyczne są potwierdzane?
- Czy potwierdzenia nie spowalniają niepotrzebnie?
- Czy zakończenie mówi, co zostało zrobione?
- Czy użytkownik dostaje potwierdzenie SMS/e-mail, jeśli potrzebne?

### 4.5.9. Mini case study

Voicebot rezerwacyjny kończył rozmowę słowami: "Czy mogę jeszcze w czymś pomóc?". Wielu użytkowników odpowiadało "nie wiem" albo zadawało pytania poza zakresem, co wydłużało rozmowy. Zmieniono zakończenie: "Wizyta jest umówiona na środę o 11:00. Potwierdzenie wysłałem SMS-em. Dziękuję za rozmowę." Dodatkowe tury spadły, a repeat contact nie wzrósł.

### 4.5.10. Podsumowanie

Powitania, pytania, potwierdzenia i zakończenia są podstawowymi narzędziami kontroli rozmowy. Dobrze zaprojektowane pozwalają użytkownikowi mówić naturalnie, a systemowi zbierać dane bez chaosu.

---

## 4.6. Cisza, no-input, no-match, fallback i reprompt

### 4.6.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| No-input | Użytkownik nic nie powiedział lub system nie wykrył mowy |
| No-match | System wykrył input, ale nie dopasował go do oczekiwań |
| Fallback | Ścieżka po niezrozumieniu lub nieobsługiwanej sytuacji |
| Reprompt | Kolejny komunikat zadający pytanie ponownie lub inaczej |
| Escalation threshold | Moment, w którym trzeba przekazać do człowieka |
| Repair strategy | Strategia naprawy rozmowy |

### 4.6.2. Wyjaśnienie eksperckie

No-input i no-match wymagają innych reakcji.

No-input może oznaczać:

- użytkownik nie usłyszał;
- zastanawia się;
- szuka danych;
- jest zaskoczony;
- mikrofon/telefonia zawiodła;
- pytanie było za trudne;
- użytkownik odszedł od telefonu.

No-match oznacza:

- użytkownik powiedział coś poza zakresem;
- ASR źle przepisał;
- NLU źle sklasyfikowało;
- pytanie było niejasne;
- użytkownik ma inny cel;
- użytkownik odpowiedział zbyt szeroko.

Zły fallback:

"Nie zrozumiałem. Proszę powtórzyć."

Lepszy pierwszy no-match:

"Nie mam pewności, czy chodzi o dostawę, zwrot czy fakturę. Która sprawa?"

Lepszy drugi no-match:

"Żeby nie przedłużać, połączę z konsultantem, który pomoże w tej sprawie."

### 4.6.3. Perspektywa biznesowa

Fallbacki to jedno z najważniejszych miejsc optymalizacji. Wysoki fallback rate pokazuje:

- zły use case;
- brak intencji;
- złe pytania;
- słaby ASR;
- zbyt szeroki zakres użytkowników;
- niedobre dane treningowe.

Nie należy ukrywać fallbacków. Trzeba je analizować jako głos rynku: ludzie mówią, czego system nie obsługuje.

### 4.6.4. Perspektywa użytkownika

Użytkownik akceptuje naprawę, jeśli czuje postęp. Nie akceptuje pętli.

Zasada psychologiczna:

Nie powtarzaj identycznie tego samego pytania trzy razy. Jeśli pierwsza forma nie zadziałała, druga powinna zawęzić opcję, uprościć zadanie albo dać przykład. Trzecia powinna oferować alternatywę lub handoff.

### 4.6.5. Perspektywa technologiczna

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

W LLM voicebotach fallback może być bardziej subtelny: model zawsze coś odpowie. Dlatego trzeba wykrywać odpowiedzi niskiej jakości, nie tylko klasyczne no-match.

### 4.6.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Projektuj osobne komunikaty dla no-input i no-match.
- Pierwszy reprompt może być delikatny.
- Drugi reprompt powinien zawęzić opcję.
- Po kilku niepowodzeniach eskaluj albo zmień kanał.
- Nie obwiniaj użytkownika.
- Loguj, co użytkownik powiedział.
- Analizuj fallbacki co tydzień po wdrożeniu.
- Projektuj fallbacki per krok, nie tylko globalne.

### 4.6.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Jeden globalny fallback | Brak dopasowania do sytuacji |
| Identyczne powtórzenia | Frustracja |
| Brak eskalacji | Użytkownik utknął |
| Brak analizy transkrypcji fallbacków | Brak optymalizacji |
| Bot przeprasza, ale nie pomaga | Poczucie bezradności systemu |
| LLM improwizuje poza zakresem zamiast fallbacku | Ryzyko halucynacji |

### 4.6.8. Checklista fallbacków

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy każdy krytyczny krok ma no-input?
- Czy każdy krytyczny krok ma no-match?
- Czy drugi reprompt jest inny niż pierwszy?
- Czy fallback zawęża odpowiedź?
- Czy jest próg eskalacji?
- Czy fallbacki są logowane?
- Czy analizujemy najczęstsze frazy z fallbacków?
- Czy bot nie obwinia użytkownika?

### 4.6.9. Mini case study

Voicebot przyjmujący zgłoszenia IT miał globalny fallback. Gdy użytkownik mówił "nie działa mi token", bot odpowiadał "Proszę powtórzyć". Po analizie okazało się, że wiele fallbacków dotyczy MFA, ale intencja nie istniała. Dodano intencje "problem_mfa", przykłady fraz i reprompt: "Czy chodzi o kod SMS, aplikację autoryzacyjną czy token?". Fallback rate spadł.

### 4.6.10. Podsumowanie

Fallback to nie śmietnik na błędy. To zaprojektowana strategia naprawy rozmowy. Dobre fallbacki pomagają użytkownikowi odpowiedzieć inaczej, ujawniają luki systemu i chronią przed frustracją.

---

## 4.7. Projektowanie barge-in, przerwań i korekt w dialogu

### 4.7.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Barge-in | Przerwanie wypowiedzi bota przez użytkownika |
| Correction | Poprawienie danych lub interpretacji |
| Topic shift | Zmiana tematu lub intencji |
| Acceleration | Próba przyspieszenia rozmowy |
| Escalation request | Prośba o człowieka |
| Recovery after interruption | Kontynuacja rozmowy po przerwaniu z zachowaniem kontekstu |

### 4.7.2. Wyjaśnienie eksperckie

Przerwania są naturalne. Użytkownik przerywa, gdy:

- zna odpowiedź przed końcem pytania;
- bot źle zrozumiał;
- bot mówi za długo;
- użytkownik chce zmienić cel;
- użytkownik jest sfrustrowany;
- użytkownik chce człowieka;
- pojawia się pilna informacja.

Conversation designer powinien dla każdego ważnego promptu określić:

| Element | Pytanie |
|---|---|
| Czy barge-in włączony? | Czy użytkownik może bezpiecznie przerwać? |
| Co może oznaczać przerwanie? | Korekta, zgoda, sprzeciw, eskalacja, backchannel? |
| Jak zatrzymujemy bot response? | Czy TTS i generacja są anulowane? |
| Co robimy z kontekstem? | Wracamy do slotu, zmieniamy intencje, eskalujemy? |
| Jak odpowiadamy? | Krótkie uznanie i kolejny krok |

### 4.7.3. Perspektywa biznesowa

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

### 4.7.4. Perspektywa użytkownika

Użytkownik, który przerywa, często komunikuje: "system idzie w złą stronę". Dobra reakcja pokazuje, że bot słucha:

Użytkownik: "Nie, nie ten adres."  
Bot: "Dobrze, poprawmy adres. Jaki ma być?"

Zła reakcja:

Bot kontynuuje odczyt albo wraca do początku.

### 4.7.5. Perspektywa technologiczna

Scenariusz powinien zawierać wymagania:

- barge-in enabled/disabled/limited;
- allowed interruption intents;
- backchannel handling;
- false barge-in tolerance;
- slot correction mapping;
- state preservation;
- TTS cancellation;
- LLM response cancellation;
- logging interruption event.

### 4.7.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Włącz barge-in przy długich informacjach i podsumowaniach.
- Projektuj korektę pojedynczego slotu.
- Nie restartuj flow po przerwaniu.
- Rozpoznawaj "konsultant" jako wysoki priorytet.
- Ignoruj backchannele, gdy nie wymagają przejęcia tury.
- Przy frustracji skróć rozmowę.
- Przy drugim nieudanym recovery eskaluj.

### 4.7.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Brak barge-in | Bot przegaduje użytkownika |
| Globalny barge-in bez filtrowania | Bot zatrzymuje się po szumie |
| Brak korekty slotu | Reset rozmowy |
| Ignorowanie "konsultant" | Silna frustracja |
| Brak logów przerwań | Nie wiadomo, co poprawiać |
| Nieodróżnianie backchannel od przerwania | Nienaturalna rozmowa |

### 4.7.8. Checklista przerwań

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy prompt jest przerywalny?
- Czy mamy intencje korekty?
- Czy mamy intencje eskalacji?
- Czy mamy obsługę "stop", "czekaj", "nie", "inaczej"?
- Czy bot zachowuje zebrane dane?
- Czy przerwanie jest logowane?
- Czy QA testuje przerwania w tym kroku?
- Czy komunikat recovery jest krótki?

### 4.7.9. Mini case study

Voicebot bankowy odczytywał ofertę limitu i nie pozwalał przerwać. Użytkownicy mówili "nie chcę", ale bot kończył cały komunikat. Po zmianie barge-in włączono dla części sprzedażowej, a "nie chcę" kierowało do neutralnego zamknięcia: "Rozumiem, nie będę kontynuować oferty. Czy chce pan załatwić coś jeszcze z kartą?". Spadły skargi na nachalność.

### 4.7.10. Podsumowanie

Przerwania nie są wyjątkiem od rozmowy. Są częścią naturalnej kontroli dialogu. Dobry voicebot nie tylko pozwala przerwać, ale wie, co przerwanie znaczy i jak wrócić do sensownego miejsca.

---

## 4.8. Projektowanie dla emocji użytkownika

### 4.8.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Emotional context | Emocjonalne tło rozmowy |
| Frustration signal | Sygnał irytacji, np. powtarzanie, podniesiony głos, przekleństwa |
| De-escalation | Obniżanie napięcia |
| False empathy | Udawanie emocji bez realnej pomocy |
| Sensitive domain | Obszar o wysokim ryzyku emocjonalnym lub prawnym |
| Crisis escalation | Natychmiastowe przekazanie do człowieka lub odpowiedniej procedury |

### 4.8.2. Wyjaśnienie eksperckie

Voicebot często rozmawia z ludźmi, którzy:

- spieszą się;
- są zdenerwowani;
- nie rozumieją procedury;
- boją się kosztów;
- czują niesprawiedliwość;
- są chorzy lub opiekują się kimś chorym;
- mają problem finansowy;
- próbują odzyskać kontrolę.

Projektowanie dla emocji nie oznacza, że bot ma mówić "doskonale pana rozumiem". Bot nie rozumie jak człowiek. Lepiej projektować konkretną pomoc:

Zamiast:

"Rozumiem pana frustrację."

Lepiej:

"Widzę, że to nie działa tak, jak powinno. Skrócę rozmowę i połączę z konsultantem."

### 4.8.3. Perspektywa biznesowa

Emocje wpływają na:

- CSAT;
- eskalację;
- skargi;
- compliance;
- rotacje konsultantów, którzy przejmują trudne rozmowy;
- reputację marki.

Automatyzacja trudnych emocjonalnie procesów bez dobrego handoff może obniżyć koszt pierwszej linii, ale zwiększyć koszt drugiej linii i reklamacji.

### 4.8.4. Perspektywa użytkownika

Użytkownik w emocjach potrzebuje:

- krótszych komunikatów;
- mniej opcji;
- potwierdzenia problemu;
- jasnego następnego kroku;
- możliwości rozmowy z człowiekiem;
- braku moralizowania;
- braku powtarzania tego samego.

### 4.8.5. Perspektywa technologiczna

System może wykrywać emocje przez:

- słowa kluczowe;
- intencje frustracji;
- powtórzenia;
- barge-in rate;
- wzrost głośności lub tempa, jeśli przetwarzanie audio to wspiera;
- szybkie prośby o konsultanta;
- wiele no-match pod rząd.

Uwaga: klasyfikacja emocji jest niepewna. Nie należy traktować jej jako diagnozy. Lepiej mówić o "sygnałach frustracji" niż "użytkownik jest zły".

### 4.8.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Skracaj rozmowę po sygnałach frustracji.
- Nie powtarzaj identycznego fallbacku.
- Daj alternatywę: konsultant, SMS, ticket, callback.
- Nie używaj fałszywej empatii.
- W sprawach wrażliwych eskaluj szybciej.
- Nie proś użytkownika o powtarzanie danych, jeśli masz je w stanie.
- Projektuj komunikaty neutralne i rzeczowe.

### 4.8.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Bot mówi "rozumiem", ale nic nie zmienia | Większa frustracja |
| Zbyt wiele przeprosin | Bot brzmi bezradnie |
| Brak eskalacji po agresji | Ryzyko skargi |
| Zbyt marketingowy ton w reklamacji | Wrażenie lekceważenia |
| Automatyzacja sytuacji kryzysowej | Ryzyko etyczne i prawne |

### 4.8.8. Checklista emocji

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy znamy emocjonalny kontekst use case'u?
- Czy bot ma skrócone ścieżki dla frustracji?
- Czy istnieje intencja "konsultant"?
- Czy po drugim fallbacku bot zmienia strategie?
- Czy komunikaty unikają fałszywej empatii?
- Czy sytuacje krytyczne są eskalowane natychmiast?
- Czy konsultant dostaje informacje o trudnościach w rozmowie?

### 4.8.9. Mini case study

Voicebot reklamacyjny po nierozpoznaniu dokumentu prosił trzy razy o numer sprawy. Użytkownicy mówili: "już podawałem". Dodano pamięć ostatnich prób, komunikat: "Mam podany numer, ale nie mogę go znaleźć w systemie. Połączę z konsultantem i przekażę ten numer." Bot przestał zmuszać użytkownika do powtarzania, a konsultant dostawał kontekst.

### 4.8.10. Podsumowanie

Emocje nie są dodatkiem do conversation design. Są częścią realnego środowiska rozmowy. Dobry voicebot nie udaje terapeuty ani konsultanta, ale potrafi skrócić drogę, dać kontrolę i oddać rozmowę człowiekowi, gdy to najlepsze dla użytkownika.

---

## 4.9. Dokumentacja scenariusza dialogowego

### 4.9.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Dialog scenario | Dokument opisujący przebieg rozmowy |
| Flow | Struktura kroków i przejść |
| Prompt library | Biblioteka komunikatów |
| State table | Tabela stanów dialogu |
| Test path | Ścieżka testowa |
| Acceptance criteria | Kryteria akceptacji zachowania |
| Conversation spec | Pełna specyfikacja rozmowy |

### 4.9.2. Wyjaśnienie eksperckie

Scenariusz dialogowy powinien być pomostem między:

- biznesem;
- conversation design;
- AI/NLU/LLM;
- backendem;
- QA;
- contact center;
- compliance;
- analityką.

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

### 4.9.3. Perspektywa biznesowa

Dobra dokumentacja:

- pozwala zatwierdzić zakres;
- ogranicza nieporozumienia;
- ułatwia wycenę;
- pomaga w compliance review;
- staje się podstawą testów;
- przyspiesza utrzymanie.

Zła dokumentacja to zwykle lista tekstów bota bez stanów, integracji i warunków. Taki dokument wygląda dobrze na warsztacie, ale nie wystarcza do wdrożenia.

### 4.9.4. Perspektywa użytkownika

Dokumentacja powinna zawierać nie tylko happy path, ale też naturalne zachowania użytkownika:

- milczenie;
- poprawki;
- przerywanie;
- zmiana tematu;
- prośba o konsultanta;
- odpowiedź niepełna;
- odpowiedź emocjonalna;
- odpowiedź poza zakresem.

Jeśli scenariusz opisuje tylko idealnego użytkownika, nie opisuje prawdziwej rozmowy.

### 4.9.5. Perspektywa technologiczna

Technologia potrzebuje:

- identyfikatorów promptów;
- identyfikatorów intencji;
- typów encji;
- walidacji slotów;
- stanów;
- eventów;
- timeoutów;
- integracji;
- mapowania błędów API;
- reguł handoff;
- wymagań logowania.

### 4.9.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Dokumentuj flow jako stany i przejścia, nie tylko dialog tekstowy.
- Oznacz happy path, unhappy path, fallback path i escalation path.
- Dodaj przykłady wypowiedzi użytkownika.
- Dla każdego promptu określ expected input.
- Dla każdego kroku określ metryki.
- Utrzymuj wersje dokumentu.
- Powiąż dokumentację z testami QA.

### 4.9.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Scenariusz tylko jako dialog | Brak danych dla dev/QA |
| Brak unhappy paths | Bot psuje się poza demo |
| Brak polityki handoff | Eskalacje są przypadkowe |
| Brak mapowania integracji | Dialog nie pasuje do systemów |
| Brak wersjonowania | Nie wiadomo, co jest na produkcji |
| Brak metryk per krok | Trudno optymalizować |

### 4.9.8. Szablon scenariusza dialogowego

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

### 4.9.9. Mini case study

Zespół projektował voicebota do zmiany terminu dostawy. Pierwszy dokument zawierał tylko dialog: bot pyta o numer zamówienia, potem o datę. Developerzy nie wiedzieli, co robić, gdy zamówienie jest już wysłane, a QA nie miało testów dla korekty daty. Druga wersja dokumentacji dodała statusy zamówienia, walidacje dat, błędy API, politykę korekty i handoff. Wdrożenie przyspieszyło, bo scenariusz stał się specyfikacją, nie tekstem.

### 4.9.10. Podsumowanie

Scenariusz dialogowy jest dokumentem produktowo-technicznym. Dobry scenariusz opisuje rozmowę, dane, decyzje, integracje, błędy i metryki. To narzędzie wdrożenia i utrzymania, nie tylko ładny zapis rozmowy.

---

## 4.10. Zbiorcza checklista po Części III

Ta checklista zbiera najważniejsze pytania po całej części. Najlepiej przejść ją po zakończeniu projektu rozdziałów i zaznaczyć miejsca, które wymagają decyzji, doprecyzowania albo testów.

- Czy komunikaty są projektowane pod ucho, nie pod ekran?
- Czy każda wypowiedź ma jedną funkcję?
- Czy każde pytanie zbiera jedną rzecz?
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
