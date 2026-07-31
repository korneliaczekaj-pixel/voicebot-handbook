# Voicebot Specialist Handbook

## Część 5: Analiza biznesowa i wybór use case'ów

Wersja robocza: 2026-07-29  
Kontynuacja plików:

- `Voicebot_Specialist_Handbook_czesc_1.md`
- `Voicebot_Specialist_Handbook_czesc_2.md`
- `Voicebot_Specialist_Handbook_czesc_3.md`
- `Voicebot_Specialist_Handbook_czesc_4.md`

---

# Część IV. Analiza biznesowa i wybór use case'ów

## Cel całej części

Największe porażki voicebotów rzadko zaczynają się od złego modelu. Często zaczynają się od złego wyboru problemu. Firma chce "wdrożyć AI", ale nie wie, które rozmowy warto automatyzować, gdzie są dane, jaki jest koszt błędu, jakie integracje są potrzebne i co będzie oznaczać sukces.

Ta część pokazuje, jak przeprowadzić analizę biznesową przed projektowaniem dialogów i architektury.

Po tej części czytelnik powinien umieć:

1. Analizować procesy contact center.
2. Rozpoznać dobry i zły use case dla voicebota.
3. Oceniać automatyzowalność procesu.
4. Liczyć potencjalną wartość biznesową i ROI.
5. Zidentyfikować ryzyka operacyjne, prawne, UX i technologiczne.
6. Przygotować brief projektu voicebota.
7. Zebrać wymagania od interesariuszy.
8. Stworzyć business case i matrycę priorytetyzacji use case'ów.

Źródła wspierające część:

- Dokumentacje platform enterprise, szczególnie AWS Connect, Google Dialogflow CX i Amazon Lex, jako źródła dotyczące praktycznych parametrów obsługi, timeoutów, intentów, slotów, integracji i handoff.
- W3C VoiceXML jako źródło historycznego myślenia o formularzach, menu, eventach, no-input/no-match i procesach dialogowych.
- Źródła branżowe i badawcze o przerwaniach oraz psychologii rozmowy jako uzasadnienie, dlaczego biznesowa analiza musi obejmować emocje, poczucie kontroli i ryzyko frustracji.
- Uzupełnienie eksperckie: matryce decyzyjne, ROI, discovery, warsztaty, analiza danych contact center i brief wdrożeniowy.

---

# Rozdział 1. Analiza procesów contact center

## 1.1. Cele rozdziału

Czytelnik nauczy się:

- rozumieć, jak działa contact center jako system operacyjny;
- analizować rozmowy telefoniczne według powodów kontaktu, wolumenów, kosztów i wyników;
- odróżniać problem klienta od struktury kolejek;
- przygotować dane potrzebne do wyboru use case'u.

## 1.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja praktyczna |
|---|---|
| Contact reason | Powód kontaktu klienta, np. status zamówienia, reklamacja, płatność |
| Call driver | Czynnik generujący połączenia, np. opóźnienia dostaw |
| Queue | Kolejka obsługi w contact center |
| AHT | Average Handling Time, średni czas obsługi |
| FCR | First Contact Resolution, rozwiązanie sprawy przy pierwszym kontakcie |
| Repeat contact | Ponowny kontakt w tej samej lub powiązanej sprawie |
| Abandonment | Porzucenie połączenia przed obsługą |
| Wrap-up code | Kod/etykieta nadawana po rozmowie przez konsultanta |
| After-call work | Praca konsultanta po rozmowie, np. notatka, ticket |

## 1.3. Wyjaśnienie eksperckie

Analiza contact center zaczyna się od prostego pytania:

"Dlaczego ludzie dzwonią?"

Ale dobra analiza idzie dalej:

1. Ile jest rozmów danego typu?
2. Jak długo trwają?
3. Ile razy klient dzwoni ponownie?
4. Jakie dane konsultant musi sprawdzić?
5. Jakie akcje konsultant wykonuje?
6. Jakie są wyjątki?
7. Gdzie rozmowa się psuje?
8. Czy klient jest zwykle spokojny, czy zdenerwowany?
9. Czy sprawa wymaga decyzji człowieka?
10. Czy systemy backendowe wspieraja automatyzację?

Ważne: kolejka contact center nie zawsze odpowiada prawdziwemu powodowi kontaktu. Kolejka "obsługa klienta" może zawierać statusy zamówień, zwroty, reklamacje, faktury, pytania o konto i prośby o konsultanta. Voicebot musi być projektowany według powodów kontaktu, nie tylko według kolejek.

## 1.4. Perspektywa biznesowa

Dane contact center pomagają oszacować:

- potencjał automatyzacji;
- wartość kosztową;
- wpływ na SLA;
- wpływ na obciążenie konsultantów;
- sezonowość;
- priorytet wdrożenia;
- ryzyko operacyjne.

Minimalne dane do analizy:

| Dane | Po co są potrzebne |
|---|---|
| Liczba rozmów per powod kontaktu | Priorytetyzacja wolumenu |
| AHT per powod | Szacunek kosztu |
| Transfer rate | Wykrycie złożoności |
| Repeat contact | Ocena realnego rozwiązania sprawy |
| Abandonment | Identyfikacja problemów dostępności |
| CSAT/NPS | Ocena doświadczenia |
| Wrap-up codes | Wstępna klasyfikacja tematów |
| Nagrania/transkrypcje | Realny język klientów |
| After-call work | Potencjał automatyzacji po rozmowie |

## 1.5. Perspektywa użytkownika

Analiza procesu nie może patrzeć tylko oczami firmy. Powód kontaktu w systemie może brzmieć "status zamówienia", ale motyw użytkownika może być:

- "paczka nie przyszła, a miałem ją dostać";
- "nie wiem, czy prezent dotrze na czas";
- "kurier twierdzi, że mnie nie było";
- "chcę zmienić adres, zanim będzie za późno";
- "jestem zdenerwowany, bo to kolejny problem".

Ten sam use case ma różne warianty emocjonalne. Dobry voicebot musi obsługiwać nie tylko informacyjny status, ale też korektę, frustrację i eskalację.

## 1.6. Perspektywa technologiczna

Do analizy automatyzacji trzeba zmapować:

- skąd konsultant bierze dane;
- jakie systemy otwiera;
- czy systemy mają API;
- czy dane są aktualne;
- jakie są błędy i braki danych;
- czy trzeba weryfikować użytkownika;
- jakie akcje są zapisywane;
- czy akcje są odwracalne;
- jakie dane muszą trafić do logów, ticketów i CRM.

## 1.7. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Analizuj nagrania i transkrypcje, nie tylko raporty.
- Weryfikuj wrap-up codes, bo konsultanci często używają ich niespójnie.
- Patrz na repeat contact, nie tylko AHT.
- Oddziel sprawy informacyjne od transakcyjnych.
- Mapuj emocjonalny kontekst kontaktu.
- Rozmawiaj z konsultantami, nie tylko z menedzerami.
- Sprawdź, co konsultant robi po rozmowie.
- Szukaj procesów, gdzie bot może wykonać akcję, nie tylko udzielić informacji.

## 1.8. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Wybieranie use case'u na podstawie opinii sponsora | Automatyzacja nie tego problemu |
| Zaufanie tylko do wrap-up codes | Zły obraz powodów kontaktu |
| Pomijanie repeat contact | Pozorny sukces automatyzacji |
| Brak analizy nagrań | Bot nie zna realnego języka klientów |
| Pomijanie pracy po rozmowie | Niedoszacowanie wartości automatyzacji |
| Analiza kolejek zamiast powodów kontaktu | Zły model intencji |

## 1.9. Checklista analizy contact center

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy mamy dane o wolumenie rozmów?
- Czy znamy AHT per powod kontaktu?
- Czy mamy repeat contact?
- Czy mamy abandonment?
- Czy mamy CSAT lub inną miarę jakości?
- Czy mamy nagrania lub transkrypcje?
- Czy znamy pracę konsultanta po rozmowie?
- Czy znamy systemy, z których korzysta konsultant?
- Czy znamy typowe wyjątki?
- Czy rozmawialiśmy z konsultantami?

## 1.10. Mini case study

Firma e-commerce wskazała "reklamacje" jako największy obszar automatyzacji, bo miał najdłuższy AHT. Analiza nagrań pokazała jednak, że "status zamówienia" miał cztery razy większy wolumen i wysoki repeat contact, bo klienci nie ufali informacjom e-mail. Wdrożenie voicebota do statusu i zmiany adresu dało szybszy efekt niż automatyzacja reklamacji. Reklamacje pozostały w planie, ale jako drugi etap z częściowym wsparciem konsultanta.

## 1.11. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Przygotuj listę danych potrzebnych od contact center.
2. Wybierz jedną kolejkę i rozbij ją na powody kontaktu.
3. Wskaż trzy miejsca, gdzie wrap-up codes mogą kłamać.
4. Opisz, co konsultant robi po rozmowie i czy bot może to zautomatyzować.

## 1.12. Podsumowanie

Analiza contact center to podstawa dobrego wyboru use case'u. Bez niej projekt voicebota opiera się na intuicji, a intuicja często prowadzi do automatyzacji procesu, który jest głośny politycznie, ale nie najważniejszy operacyjnie.

---

# Rozdział 2. Jak rozpoznać dobry use case dla voicebota

## 2.1. Cele rozdziału

Czytelnik nauczy się:

- rozpoznawać cechy dobrego use case'u;
- odróżniać use case łatwy, średni i ryzykowny;
- oceniać dopasowanie kanału głosowego;
- unikać automatyzacji procesów, które powinny pozostać u człowieka lub w innym kanale.

## 2.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Use case | Konkretny przypadek użycia voicebota w określonym procesie |
| Candidate use case | Kandydat do automatyzacji |
| MVP use case | Zakres pierwszej wersji wdrożenia |
| Automation fit | Dopasowanie procesu do automatyzacji |
| Voice fit | Dopasowanie procesu do kanału głosowego |
| Risk profile | Profil ryzyka biznesowego, prawnego, technicznego i UX |

## 2.3. Wyjaśnienie eksperckie

Dobry use case dla pierwszego voicebota ma zwykle cechy:

1. Wysoki wolumen.
2. Powtarzalny przebieg.
3. Jasny cel użytkownika.
4. Niewielka liczba wymaganych danych.
5. Dostępne integracje lub możliwość bezpiecznego ticketu.
6. Niski lub kontrolowalny koszt błędu.
7. Możliwy szybki handoff.
8. Dane historyczne do projektowania i testów.
9. Mierzalny wynik.
10. Akceptowalny poziom emocji.

Nie oznacza to, że voicebot nie może kiedyś obsługiwać trudnych procesów. Oznacza to, że pierwszy use case powinien budować zaufanie i dane, nie testować granice organizacji.

## 2.4. Klasy use case'ow

| Klasa | Charakterystyka | Przykłady | Rekomendacja |
|---|---|---|---|
| Łatwy | Informacyjny, powtarzalny, niski koszt błędu | Status zamówienia, godziny otwarcia, status zgłoszenia | Dobry na start |
| Średni | Transakcyjny, wymaga integracji i walidacji | Zmiana terminu, rezerwacja, reset hasła | Dobry po discovery |
| Trudny | Wiele wyjątków, emocje, compliance | Reklamacje, windykacja, decyzje finansowe | Ostrożnie, często hybrydowo |
| Bardzo ryzykowny | Dane wrażliwe, decyzje medyczne/prawne, kryzys | Porady medyczne, decyzje kredytowe, sytuacje zagrożenia | Zwykle nie jako automatyzacja end-to-end |

## 2.5. Perspektywa biznesowa

Dobry use case ma nie tylko potencjal oszczednosci. Ma:

- jasnego właściciela;
- zdefiniowany wynik;
- dane do pomiaru przed i po;
- gotowość operacyjną;
- akceptację contact center;
- dostępne systemy;
- plan utrzymania.

Use case bez właściciela biznesowego szybko zostaje "projektem AI", który nikt nie utrzymuje.

## 2.6. Perspektywa użytkownika

Dla użytkownika dobry use case to taki, w którym voicebot:

- skraca drogę;
- nie wymaga czytania ekranu;
- nie zmusza do słuchania wielu opcji;
- nie odbiera kontroli;
- pozwala szybko poprawić;
- daje człowieka, gdy sprawa jest nietypowa.

Proces może być atrakcyjny dla firmy, ale zły dla użytkownika. Przykład: długie odczytywanie regulaminu głosem, które firma chce automatyzować, ale użytkownik wolałby dostać link.

## 2.7. Perspektywa technologiczna

Technologicznie dobry use case:

- ma jasne intencje;
- ma encje możliwe do zebrania głosem;
- ma system źródłowy;
- ma API lub obejscie procesowe;
- ma jasne błędy integracji;
- ma niezbyt dużo wariantów wyjątkowych;
- ma możliwy tryb testowy;
- nie wymaga od ASR perfekcyjnego rozpoznania trudnych danych bez fallbacku.

## 2.8. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Zaczynaj od use case'u, który ma mierzalny wynik.
- Unikaj na start procesów z wysoką emocjonalnością.
- Upewnij się, że bot może realnie wykonać akcję.
- Sprawdź, czy kanał głosowy pomaga użytkownikowi.
- Uwzględnij handoff od początku.
- Wybierz MVP z ograniczonym, ale wartosciowym zakresem.
- Zdefiniuj "poza zakresem".

## 2.9. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| "Najpierw zróbmy najtrudniejszy proces" | Długie wdrożenie i duże ryzyko porażki |
| Brak definicji wyniku | Nie wiadomo, czy bot działa |
| Use case bez integracji | Bot tylko odsyła |
| Proces z wieloma wyjątkami jako MVP | Chaos scenariuszy |
| Brak handoff | Użytkownik utknie |
| Automatyzacja procesu, który lepiej działa w formularzu | Gorsze UX |

## 2.10. Checklista dobrego use case'u

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy problem występuje często?
- Czy użytkownik ma jasny cel?
- Czy rozmowa głosowa jest dobrym kanałem?
- Czy proces jest powtarzalny?
- Czy mamy dane historyczne?
- Czy mamy integracje?
- Czy koszt błędu jest akceptowalny?
- Czy jest szybki handoff?
- Czy sukces da się zmierzyć?
- Czy zakres MVP jest ograniczony?

## 2.11. Mini case study

Sieć klinik rozważa voicebota do "obsługi pacjentów". Po analizie wybrano MVP: potwierdzanie i przekładanie wizyt. Proces ma wysoki wolumen, jasne intencje, integracje z kalendarzem i niski koszt błędu, jeśli bot potwierdza termin SMS-em. Pytania medyczne zostały poza zakresem i trafiają do człowieka. To dobry use case, bo łączy wartość biznesową i bezpieczny zakres.

## 2.12. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Wybierz trzy kandydaty use case'ów i oznacz je jako łatwe/średnie/trudne.
2. Wskaż, który najlepiej nadaje się na MVP.
3. Dla wybranego use case'u opisz zakres i poza zakresem.
4. Wypisz warunki, które automatycznie prowadzą do konsultanta.

## 2.13. Podsumowanie

Dobry use case nie jest najbardziej efektowny. Jest wystarczająco wartościowy, powtarzalny, mierzalny i bezpieczny, aby organizacja mogła nauczyć się automatyzacji bez niszczenia zaufania klientów.

---

# Rozdział 3. Ocena automatyzowalności procesu

## 3.1. Cele rozdziału

Czytelnik nauczy się:

- oceniać, czy proces nadaje się do automatyzacji;
- rozkładać proces na kroki i decyzje;
- identyfikować miejsca wymagające człowieka;
- używać matrycy automatyzowalności.

## 3.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Automatyzowalność | Stopień, w jakim proces może być wykonany przez system |
| Deterministyczność | Czy decyzje są oparte na jasnych regułach |
| Exception rate | Odsetek spraw nietypowych |
| Human judgment | Ocena wymagająca doświadczenia, empatii lub odpowiedzialności |
| Data availability | Dostępność danych potrzebnych do procesu |
| Reversibility | Możliwość cofniecia akcji |

## 3.3. Wyjaśnienie eksperckie

Proces nadaje się do automatyzacji, gdy:

- ma powtarzalne kroki;
- decyzje są oparte na danych i regułach;
- wymagane informacje da się zebrać głosem;
- dane są dostępne;
- błędy można wykryć lub odwrócić;
- wyjątki można przekazać do człowieka;
- wynik można mierzyć.

Proces słabo nadaje się do automatyzacji, gdy:

- wymaga negocjacji;
- wymaga oceny moralnej/prawnej/medycznej;
- ma dużo wyjątków;
- dane są niespójnie zapisane;
- koszt błędu jest wysoki;
- użytkownik jest zwykle w silnych emocjach;
- proces zmienia się często i nie ma właściciela.

## 3.4. Matryca automatyzowalności procesu

Skala 1-5, gdzie 5 oznacza najlepsze dopasowanie do automatyzacji.

| Kryterium | 1 punkt | 3 punkty | 5 punktów |
|---|---|---|---|
| Powtarzalność | Każda sprawa inna | Kilka typowych wariantów | Bardzo podobne rozmowy |
| Jasność celu | Użytkownicy nie wiedzą, czego chcą | Cel częściowo jasny | Cel łatwy do rozpoznania |
| Dane | Brak danych/systemów | Dane są, ale niespójnie | Dane są dostępne przez API |
| Reguły | Decyzje uznaniowe | Częściowo regułowe | Jasne reguły |
| Wyjątki | Wiele wyjątków | Umiarkowanie | Niewiele |
| Koszt błędu | Wysoki | Średni | Niski lub odwracalny |
| Kanał głosowy | Głos przeszkadza | Głos wystarcza | Głos jest wygodny |
| Emocje | Wysokie | Średnie | Niskie |
| Handoff | Trudny | Możliwy | Łatwy i szybki |
| Pomiar sukcesu | Niejasny | Częściowy | Jasny i mierzalny |

Interpretacja:

- 42-50: bardzo dobry kandydat.
- 34-41: dobry kandydat po doprecyzowaniu.
- 25-33: możliwy pilot, ale z ryzykami.
- 15-24: raczej nie jako MVP.
- Poniżej 15: nie automatyzować end-to-end.

## 3.5. Perspektywa biznesowa

Automatyzowalność nie oznacza, że 100% spraw obsłuży bot. Dojrzała automatyzacja często zakłada:

- 60-80% prostych przypadków automatycznie;
- 10-30% przypadków z częściową automatyzacją i handoff;
- kilka procent przypadków od razu do człowieka.

Pytanie nie brzmi: "Czy bot obsłuży wszystko?". Brzmi: "Którą część procesu można bezpiecznie i sensownie przenieść do automatyzacji?".

## 3.6. Perspektywa użytkownika

Automatyzacja powinna zmniejszać wysiłek użytkownika. Jeśli bot wymaga więcej kroków niż konsultant lub formularz, use case jest źle zaprojektowany.

Dobry test:

"Czy użytkownik po rozmowie z botem powie: to było szybkie, czy: firma nie chciała ze mną rozmawiać?"

## 3.7. Perspektywa technologiczna

Technologia ocenia automatyzowalność przez:

- jak trudne są dane do rozpoznania przez ASR;
- czy intencje są rozróżnialne;
- czy sloty są walidowalne;
- czy API wspiera proces;
- czy można zachować stan;
- czy można wykonać akcję idempotentnie;
- czy jest sandbox;
- czy monitoring wykryje błędy.

## 3.8. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Oceniaj proces krok po kroku.
- Nie automatyzuj decyzji, jeśli można automatyzować przygotowanie danych dla człowieka.
- Dla ryzykownych procesów stosuj human-in-the-loop.
- Oddziel automatyzację rozmowy od automatyzacji decyzji.
- Wybieraj zakres MVP jako podzbiór procesu.
- Ustal progi confidence i handoff.

## 3.9. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Ocena procesu jako całości | Pomija części, które da się automatyzować |
| Automatyzacja decyzji uznaniowych | Ryzyko skarg i compliance |
| Brak oceny kosztu błędu | Zbyt ryzykowny zakres |
| Brak handoff dla wyjątków | Bot blokuje sprawę |
| Zakładanie idealnych danych | Produkcja zaskakuje |

## 3.10. Checklista automatyzowalności

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy proces ma powtarzalne kroki?
- Czy decyzje są regułowe?
- Czy potrzebne dane są dostępne?
- Czy dane można zebrać głosem?
- Czy wyjątki są znane?
- Czy błąd jest odwracalny?
- Czy handoff jest możliwy?
- Czy sukces jest mierzalny?
- Czy istnieje właściciel procesu?
- Czy zakres MVP można ograniczyć?

## 3.11. Mini case study

Firma leasingowa chce automatyzować zmianę danych umowy. Pełny proces jest ryzykowny, bo niektóre zmiany wymagają aneksu i oceny prawnej. Analiza automatyzowalności dzieli proces: bot może zebrać typ zmiany, zweryfikować klienta, sprawdzić wymagane dokumenty i utworzyć ticket. Sama decyzja i aneks pozostają u konsultanta. Automatyzacja częściowa daje wartość bez ryzyka pełnej automatycznej decyzji.

## 3.12. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Oceń jeden proces matrycą automatyzowalności.
2. Podziel proces na kroki automatyczne i ludzkie.
3. Wskaż koszt błędu dla każdego kroku.
4. Zaprojektuj human-in-the-loop dla decyzji ryzykownej.

## 3.13. Podsumowanie

Automatyzowalność to nie zero-jedynkowa cecha procesu. Najczęściej automatyzuje się fragmenty: identyfikację, klasyfikację, zebranie danych, sprawdzenie statusu, utworzenie ticketu, podsumowanie. Dobra analiza znajduje bezpieczny zakres, nie forsuje pełnej automatyzacji.

---

# Rozdział 4. Wartość biznesowa, metryki i ROI

## 4.1. Cele rozdziału

Czytelnik nauczy się:

- liczyć potencjalną wartość voicebota;
- rozumieć metryki biznesowe przed wdrożeniem;
- unikać naiwnych kalkulacji ROI;
- łączyć metryki kosztowe z jakościowymi.

## 4.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| ROI | Return on Investment, zwrot z inwestycji |
| Cost per contact | Koszt pojedynczego kontaktu |
| Deflection | Przeniesienie kontaktu z konsultanta do automatyzacji |
| Containment | Rozmowa zakończona bez konsultanta |
| Task completion | Sprawa zakończona sukcesem |
| Assisted automation | Bot wspiera człowieka, ale nie obsługuje end-to-end |
| Opportunity cost | Koszt utraconych możliwości lub czasu konsultantów |


## 4.3. Wyjaśnienie eksperckie

Prosty model ROI:

```text
Wartosc miesieczna =
  liczba rozmow kwalifikujacych sie do automatyzacji
  x oczekiwany task completion
  x koszt rozmowy konsultanta
  - koszt rozmow bota
  - koszt utrzymania
```

Ale ten model jest za prosty, jeśli nie uwzględnia:

- repeat contact;
- kosztów wdrożenia;
- kosztów integracji;
- kosztów utrzymania bazy wiedzy;
- kosztów optymalizacji;
- kosztów licencji/minut/tokenów;
- kosztów QA;
- wpływu na CSAT;
- wpływu na konsultantów;
- kosztu błędów i reklamacji.

Lepsza kalkulacja rozróżnia:

1. Oszczędność bezpośrednia: mniej rozmów u konsultantów.
2. Oszczędność pośrednia: krótsze rozmowy dzięki prekwalifikacji i podsumowaniom.
3. Wartość jakościowa: lepsza dostępność, mniej porzuconych połączeń.
4. Wartość danych: lepsze tagowanie powodów kontaktu.
5. Koszty stałe i zmienne.
6. Ryzyka i koszt niepowodzenia.

## 4.4. Perspektywa biznesowa

Metryki przed wdrożeniem:

- wolumen rozmów;
- AHT;
- koszt minuty/kontaktu;
- FCR;
- repeat contact;
- abandonment;
- SLA;
- transfer rate;
- CSAT;
- after-call work;
- sezonowość;
- koszt nadgodzin lub outsourcingu.

Metryki po wdrożeniu:

- task completion rate;
- automation rate;
- containment rate;
- escalation rate;
- fallback rate;
- repeat contact po rozmowie z botem;
- CSAT dla bota;
- koszt rozmowy bota;
- koszt utrzymania;
- liczba ticketów poprawnie utworzonych;
- jakość handoff.

## 4.5. Perspektywa użytkownika

ROI nie może być osiagany przez pogorszenie doświadczenia. Jeśli bot zatrzymuje klienta, ale nie rozwiązuje sprawy, firma przenosi koszt na użytkownika.

Dlatego w business case trzeba dodać metryki ochronne:

- repeat contact;
- abandonment po rozmowie z botem;
- prośby o konsultanta;
- negatywne feedbacki;
- skargi;
- czas do rozwiązania sprawy;
- customer effort score.

## 4.6. Perspektywa technologiczna

Koszty technologiczne:

- platforma voicebotowa;
- telefonia/minuty;
- ASR;
- TTS;
- LLM tokeny/audio;
- RAG/hosting bazy wiedzy;
- integracje;
- monitoring;
- storage nagrań/transkrypcji;
- QA i testy regresji;
- development i utrzymanie.

W generatywnych voicebotach koszt może rosnąć z długością wypowiedzi. Conversation design wpływa więc bezpośrednio na koszt.

## 4.7. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Licz ROI konserwatywnie.
- Używaj task completion, nie samego containment.
- Uwzględniaj repeat contact.
- Oddziel deflection od skutecznej automatyzacji.
- Licz koszt utrzymania po wdrożeniu.
- Uwzględniaj koszty tokenów/minut.
- Dodaj metryki ochronne UX i compliance.
- Porównuj wyniki z baseline sprzed wdrożenia.

## 4.8. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| ROI oparty na 100% automatyzacji | Nierealne oczekiwania |
| Brak kosztów utrzymania | Niedoszacowanie budżetu |
| Brak repeat contact | Pozorna oszczędność |
| Brak kosztu integracji | Projekt drozszy niż plan |
| Mierzenie tylko wolumenu bota | Brak informacji o skuteczności |
| Brak metryk UX | Oszczędność kosztem klienta |

## 4.9. Praktyczny model business case

| Element | Przykład |
|---|---|
| Wolumen miesięczny use case'u | 50 000 rozmów |
| Średni koszt rozmowy konsultanta | 12 zł |
| Realistyczny udział rozmów kwalifikujących się do bota | 70% |
| Oczekiwany task completion bota po optymalizacji | 60% |
| Rozmowy skutecznie zautomatyzowane | 21 000 |
| Potencjał brutto | 252 000 zł |
| Koszt technologii i utrzymania | 80 000 zł |
| Szacowana wartość netto | 172 000 zł miesięcznie |

Uwaga: to przykład struktury, nie uniwersalna obietnica. Każdy projekt wymaga własnych danych.

## 4.10. Checklista ROI

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy mamy wolumen per use case?
- Czy znamy koszt kontaktu?
- Czy znamy AHT?
- Czy znamy baseline FCR/repeat contact?
- Czy założenia task completion są realistyczne?
- Czy uwzględniono koszty technologii?
- Czy uwzględniono koszty utrzymania?
- Czy uwzględniono koszty integracji?
- Czy mamy metryki ochronne UX?
- Czy business case ma scenariusz pesymistyczny, bazowy i optymistyczny?

## 4.11. Mini case study

Operator telekomunikacyjny zakładał ROI na podstawie 80% containment dla awarii internetu. Pilot pokazał containment 55%, ale konsultanci otrzymywali lepsze podsumowania i mieli krótszy AHT o 90 sekund. Po doliczeniu assisted automation projekt nadal miał dodatni efekt, choć inny niż pierwotnie zakładano. Wniosek: business case powinien uwzględniać zarówno automatyzację end-to-end, jak i wsparcie konsultanta.

## 4.12. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Policz prosty ROI dla use case'u statusu zamówienia.
2. Dodaj do kalkulacji repeat contact.
3. Przygotuj trzy scenariusze: pesymistyczny, bazowy, optymistyczny.
4. Wskaż metryki ochronne UX.

## 4.13. Podsumowanie

ROI voicebota nie polega na mnożeniu wolumenu przez koszt konsultanta i wpisaniu wysokiego containment. Dojrzały business case uwzględnia skuteczność, jakość, repeat contact, koszty utrzymania, integracje i ryzyka.

---

# Rozdział 5. Kiedy nie wdrażać voicebota

## 5.1. Cele rozdziału

Czytelnik nauczy się:

- rozpoznawać sytuacje, w których voicebot jest złym rozwiązaniem;
- argumentować przeciwko wdrożeniu w sposób profesjonalny;
- proponować alternatywy: IVR, chatbot, formularz, agent assist, analityka rozmów;
- chronić organizacje przed kosztowną automatyzacją bez wartości.

## 5.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Poor fit | Słabe dopasowanie procesu do voicebota |
| Premature automation | Automatyzacja przed uporządkowaniem procesu |
| Process debt | Dług procesowy: chaos procedur, danych i odpowiedzialności |
| Human-in-the-loop | Człowiek pozostaje w kluczowej decyzji |
| Agent assist | AI wspiera konsultanta zamiast zastapienia rozmowy |

## 5.3. Wyjaśnienie eksperckie

Nie należy wdrażać voicebota, gdy:

1. Proces nie jest zrozumiany.
2. Nie ma danych o powodach kontaktu.
3. Nie ma właściciela procesu.
4. Systemy backendowe są niedostępne lub niespójne.
5. Klienci dzwonią w silnym kryzysie.
6. Błędy mają wysoki koszt i brak możliwości odwołania.
7. Zakres jest politycznie narzucony, ale niemierzalny.
8. Organizacja nie ma zasobów na utrzymanie.
9. Bot ma ukryć problem operacyjny zamiast go rozwiązać.
10. Inny kanał jest wyraźnie lepszy.

Przykład:

Jeśli 40% kontaktów dotyczy błędnych faktur spowodowanych problemem w systemie billingowym, voicebot może tylko taniej obsługiwać skutek. Lepszym projektem może być naprawa billingu albo proaktywna komunikacja.

## 5.4. Perspektywa biznesowa

Decyzja "nie wdrażamy voicebota teraz" może być bardzo profesjonalna. Może oznaczać:

- najpierw porządkujemy dane;
- najpierw wdrażamy tagowanie rozmów;
- najpierw budujemy API;
- najpierw zmniejszamy call drivers;
- najpierw uruchamiamy agent assist;
- najpierw robimy pilota analitycznego.

Voicebot nie powinien być plasterkiem na zły proces, jeśli proces wymaga naprawy.

## 5.5. Perspektywa użytkownika

Użytkownik odczuwa zły moment wdrożenia jako:

- "firma zasłania się botem";
- "bot nic nie wie";
- "muszę powtarzać dane";
- "nie mogę dojść do człowieka";
- "system nie rozumie mojej sytuacji".

Wrażliwe use case'y, jak zdrowie, finanse, windykacja czy reklamacje, wymagają szczególnej ostrożności.

## 5.6. Perspektywa technologiczna

Czerwone flagi technologiczne:

- brak API;
- brak stabilnego identyfikatora klienta/sprawy;
- brak transkrypcji;
- brak sandboxa;
- brak możliwości handoff;
- brak logów;
- brak zgody na przechowywanie danych;
- brak testów telefonii;
- brak kontroli nad bazą wiedzy;
- brak mechanizmów bezpieczeństwa LLM.

## 5.7. Alternatywy dla voicebota

| Problem | Alternatywa |
|---|---|
| Duży wolumen prostych pytań tekstowych | Chatbot lub lepsze FAQ |
| Klienci szukają dokumentów | Portal self-service |
| Trzeba zebrać wiele pól | Formularz |
| Konsultanci tracą czas na notatki | Agent assist i automatyczne podsumowania |
| Brak wiedzy o powodach kontaktu | Analityka rozmów |
| Zły routing | Nowy IVR lub routing intent-based |
| Problem wynika z awarii procesu | Naprawa procesu i komunikacja proaktywna |

## 5.8. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Miej odwagę odradzić voicebota, gdy nie ma dopasowania.
- Proponuj alternatywę, nie samo "nie".
- Oddziel potrzebę automatyzacji od potrzeby analityki.
- Najpierw napraw call drivers, jeśli to one generują ruch.
- Wrażliwe procesy zaczynaj od agent assist lub prekwalifikacji.
- Warunkuj wdrożenie wymaganiami: API, dane, handoff, monitoring.

## 5.9. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Wdrożenie mimo braku danych | Bot projektowany na domysłach |
| Automatyzacja chaosu | Chaos staje się szybszy |
| Brak alternatywy dla klienta | Frustracja |
| Automatyzacja tylko dla redukcji kosztu | Utrata zaufania |
| Ignorowanie procesu podstawowego | Voicebot obsługuje objawy |

## 5.10. Checklista "nie wdrażać jeszcze"

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy brakuje danych o powodach kontaktu?
- Czy proces jest niespójny?
- Czy nie ma API?
- Czy nie ma właściciela biznesowego?
- Czy nie ma handoff?
- Czy koszt błędu jest wysoki?
- Czy sprawy są silnie emocjonalne?
- Czy sukces jest niemierzalny?
- Czy bot ma ukryć problem procesu?
- Czy lepszy byłby inny kanał?

## 5.11. Mini case study

Firma energetyczna chciała voicebota do reklamacji wysokich rachunków. Analiza pokazała, że główna przyczyna kontaktów to nie brak automatyzacji, lecz nieczytelne faktury i opóźnione odczyty. Zamiast voicebota end-to-end wdrożono: proaktywne SMS-y, lepszą stronę wyjaśniającą fakturę, agent assist dla konsultantów i voicebota tylko do statusu zgłoszenia. Wolumen reklamacji spadł bez ryzykownej automatyzacji sporów.

## 5.12. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Wybierz proces i znajdź argumenty przeciwko voicebotowi.
2. Zaproponuj alternatywę dla voicebota.
3. Zdefiniuj warunki, po których proces będzie gotowy.
4. Przygotuj komunikat do sponsora, dlaczego warto zacząć od analityki.

## 5.13. Podsumowanie

Dobry Voicebot Specialist nie jest osobą, która zawsze rekomenduje voicebota. Jest osobą, która potrafi wskazać, gdzie automatyzacja głosowa ma sens, a gdzie najpierw trzeba uporządkować proces, dane lub kanał.

---

# Rozdział 6. Brief projektu voicebota

## 6.1. Cele rozdziału

Czytelnik nauczy się:

- przygotować profesjonalny brief projektu;
- zebrać minimalny zestaw informacji przed discovery;
- uporządkować oczekiwania biznesu, IT, contact center i compliance;
- stworzyć dokument, który może być punktem startu wyceny, warsztatów i projektu.

## 6.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Brief | Dokument startowy opisujący problem, cele, zakres i ograniczenia projektu |
| Scope | Zakres projektu |
| Out of scope | Obszary poza zakresem |
| Stakeholder | Interesariusz projektu |
| Success criteria | Kryteria sukcesu |
| Constraint | Ograniczenie, np. prawne, technologiczne, czasowe |

## 6.3. Wyjaśnienie eksperckie

Brief nie jest pełną specyfikacją. Jest narzędziem do rozpoczęcia rozmowy i wykrycia luk. Dobry brief odpowiada:

- jaki problem biznesowy rozwiązujemy;
- dla kogo;
- w jakim kanale;
- jakich rozmów dotyczy;
- jakie są wolumeny;
- jakie systemy są potrzebne;
- jakie są ograniczenia prawne;
- jak zmierzymy sukces;
- kto podejmuje decyzję;
- jaki jest plan wdrożenia.

## 6.4. Szablon briefu projektu voicebota

```text
1. Informacje podstawowe
- Nazwa projektu:
- Organizacja/jednostka:
- Sponsor biznesowy:
- Product owner:
- Contact center owner:
- IT owner:
- Legal/compliance contact:
- Data/analytics owner:

2. Problem biznesowy
- Jaki problem chcemy rozwiazac?
- Dlaczego teraz?
- Jakie sa obecne skutki problemu?
- Jakie sa alternatywy rozwiazania?

3. Zakres rozmow
- Jakie powody kontaktu obejmuje projekt?
- Jakie powody kontaktu sa poza zakresem?
- Inbound/outbound?
- Jezyki:
- Godziny dzialania:
- Segmenty klientow:

4. Dane i wolumeny
- Miesieczny wolumen rozmow:
- AHT:
- FCR:
- Repeat contact:
- Abandonment:
- CSAT/NPS:
- Dostepne nagrania/transkrypcje:
- Wrap-up codes:

5. Proces
- Obecny przebieg rozmowy:
- Systemy uzywane przez konsultanta:
- Decyzje biznesowe:
- Wyjatki:
- Praca po rozmowie:

6. Technologia
- Platforma contact center:
- Telefonia/SIP/VoIP:
- CRM/ERP/ticketing:
- API dostepne:
- Wymagania ASR/TTS:
- Wymagania LLM/RAG:
- Monitoring/logging:

7. Ryzyka i compliance
- Dane osobowe:
- Dane wrazliwe:
- Nagrywanie:
- Zgody:
- Retencja:
- Branżowe regulacje:
- Ryzyka odpowiedzi AI:

8. Handoff
- Kiedy bot przekazuje do człowieka?
- Do jakiej kolejki?
- Jakie dane przekazuje?
- Czy konsultant widzi podsumowanie?

9. Kryteria sukcesu
- Metryki biznesowe:
- Metryki UX:
- Metryki techniczne:
- Metryki compliance:
- Minimalne kryteria pilota:

10. Harmonogram i decyzje
- Oczekiwany termin MVP:
- Oczekiwany termin pilota:
- Oczekiwany termin produkcji:
- Zaleznosci:
- Decydenci:
```

## 6.5. Perspektywa biznesowa

Brief zmusza organizacje do konkretu. Zdanie "chcemy automatyzować obsługę klienta" staje się:

"Chcemy zautomatyzować 30% rozmów o status zamówienia i zmianę adresu, które mają miesięcznie 40 000 połączeń i średni AHT 4 minuty, przy zachowaniu repeat contact poniżej baseline."

To jest różnica między hasłem a projektem.

## 6.6. Perspektywa użytkownika

Brief powinien zawierać opis użytkownika:

- kim jest;
- w jakiej sytuacji dzwoni;
- co już wie;
- jakie ma emocje;
- jakie ma ograniczenia;
- co będzie dla niego sukcesem;
- kiedy będzie chciał człowieka.

Bez tego projekt łatwo staje się automatyzacją dla firmy, nie dla klienta.

## 6.7. Perspektywa technologiczna

Brief musi ujawnić zależności:

- API, których nie ma;
- dane, których nie wolno przechowywać;
- systemy, które nie mają sandboxa;
- contact center, które nie wspiera przekazania kontekstu;
- TTS, który nie radzi sobie z nazwami;
- brak transkrypcji do treningu.

## 6.8. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Brief wypełniaj z interesariuszami, nie samodzielnie.
- Nie ukrywaj braków danych.
- Oddziel cele od założeń.
- Wpisz poza zakresem.
- Wpisz ryzyka.
- Wpisz warunki handoff.
- Wpisz minimalne kryteria pilota.
- Aktualizuj brief po discovery.

## 6.9. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Brief jako prezentacja marketingowa | Brak konkretu do projektu |
| Brak out of scope | Zakres rośnie bez kontroli |
| Brak danych baseline | Nie da się mierzyć efektu |
| Brak interesariuszy IT/legal | Problemy wychodzą za późno |
| Brak kryteriów sukcesu | Pilot nie ma jasnej oceny |
| Brak ryzyk | Fałszywe poczucie gotowości |

## 6.10. Checklista briefu

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy problem jest konkretny?
- Czy zakres jest jasno opisany?
- Czy out of scope jest opisany?
- Czy mamy baseline danych?
- Czy znamy systemy i integracje?
- Czy znamy ryzyka prawne?
- Czy znamy warunki handoff?
- Czy sukces jest mierzalny?
- Czy jest właściciel biznesowy?
- Czy brief został zatwierdzony przez kluczowych interesariuszy?

## 6.11. Mini case study

Firma B2B rozpoczęła projekt od hasła "voicebot do leadów". Brief ujawnił, że połączenia przychodzą z trzech źródeł, leady mają różną wartość, a zespół sprzedaży nie chce automatycznej kwalifikacji dla największych kont. Zakres MVP zmieniono: bot kwalifikuje małe zapytania, umawia rozmowę i tworzy rekord CRM, ale konta strategiczne idą bezpośrednio do handlowca. Brief uratował projekt przed konfliktem z sales.

## 6.12. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Wypełnij brief dla use case'u statusu zamówienia.
2. Wpisz 5 elementów poza zakresem.
3. Wpisz 5 kryteriów sukcesu pilota.
4. Wskaż interesariuszy, którzy muszą zatwierdzić brief.

## 6.13. Podsumowanie

Brief jest pierwszym filtrem dojrzałości projektu. Dobry brief nie rozwiązuje wszystkiego, ale pokazuje, czy organizacja wie, co chce automatyzować, dlaczego, dla kogo i jak pozna, że się udało.

---

# Rozdział 7. Zbieranie wymagań i praca z interesariuszami

## 7.1. Cele rozdziału

Czytelnik nauczy się:

- identyfikować interesariuszy projektu voicebota;
- prowadzić warsztaty discovery;
- zbierać wymagania funkcjonalne, niefunkcjonalne i compliance;
- radzić sobie ze sprzecznymi oczekiwaniami.

## 7.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Stakeholder mapping | Mapa interesariuszy |
| Functional requirements | Co system ma robić |
| Non-functional requirements | Jak system ma działać, np. latency, bezpieczeństwo |
| Compliance requirements | Wymagania prawne i regulacyjne |
| Acceptance criteria | Warunki akceptacji |
| RACI | Podział odpowiedzialności: Responsible, Accountable, Consulted, Informed |

## 7.3. Wyjaśnienie eksperckie

Projekt voicebota dotyka wielu zespołów:

- sponsor biznesowy;
- product owner;
- contact center manager;
- liderzy zespołów konsultantów;
- konsultanci;
- IT;
- solution architect;
- security;
- legal/compliance;
- data protection officer;
- marketing/brand;
- analytics;
- QA;
- operations;
- vendor/platform owner.

Każdy ma inny punkt widzenia. Sponsor chce efektu. Contact center chce odciążenia. Konsultanci boją się trudniejszych rozmów po bocie. Legal chce kontroli. IT chce bezpiecznych integracji. UX chce naturalności. Voicebot Specialist musi zrobić z tego jeden wykonalny zakres.

## 7.4. Typy wymagań

| Typ | Przykłady |
|---|---|
| Funkcjonalne | Bot sprawdza status, zmienia termin, tworzy ticket |
| Konwersacyjne | Bot obsługuje korektę, no-input, no-match, barge-in |
| Integracyjne | Bot łączy się z CRM i kalendarzem |
| Bezpieczeństwa | Szyfrowanie, autoryzacja API, maskowanie danych |
| Compliance | Zgody, informacja o bocie, retencja nagrań |
| Operacyjne | Godziny działania, kolejki handoff, SLA |
| Analityczne | Metryki, dashboardy, eksport danych |
| Jakościowe | Testy ASR, UAT, testy regresji |
| UX | Ton, persona, dostępność, eskalacja |

## 7.5. Perspektywa biznesowa

Największe ryzyko interesariuszy to sprzeczne cele:

- biznes chce wysoki containment;
- CX chce szybki handoff;
- legal chce długie komunikaty;
- UX chce krótkie komunikaty;
- IT chce minimalny zakres integracji;
- contact center chce pełny kontekst;
- marketing chce brand voice;
- operations chce stabilność.

Rola Voicebot Specialist polega na zamianie sporów w decyzje projektowe z konsekwencjami.

Przykład:

Legal chce odczytać długi disclaimer. UX wskazuje, że użytkownicy będą przerywać. Decyzja: skrócić disclaimer do prawnie wymaganego minimum, wysłać pełną treść SMS/e-mail, ograniczyć barge-in tylko w krytycznej frazie i logować odtworzenie.

## 7.6. Perspektywa użytkownika

Wymagania nie mogą pochodzić tylko z organizacji. Trzeba uwzględnić:

- realne frazy z rozmów;
- typowe emocje;
- poziom kompetencji cyfrowych;
- dostępność;
- potrzebę człowieka;
- sytuacje, w których użytkownik nie ma danych pod ręką.

## 7.7. Perspektywa technologiczna

Wymagania powinny być testowalne.

Źle:

"Bot ma szybko odpowiadać."

Lepsze:

"Dla 95% tur bez integracji pierwsze audio odpowiedzi powinno pojawić się poniżej 1,2 s od końca tury użytkownika."

Źle:

"Bot ma dobrze rozumieć klientów."

Lepsze:

"Dla intencji status_zamowienia recall na zestawie testowym minimum 90%, a false positive do anulowania zamówienia poniżej 1%."

## 7.8. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Mapuj interesariuszy przed warsztatami.
- Rozmawiaj z konsultantami i słuchaj nagrań.
- Zapisuj wymagania jako testowalne zdania.
- Oddziel "must have" od "nice to have".
- Dokumentuj decyzje i kompromisy.
- Ustal właściciela każdego wymagania.
- Używaj RACI.
- Wciągnij legal/security wcześnie.

## 7.9. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Warsztaty tylko z managementem | Brak realnego obrazu rozmów |
| Brak legal/security na starcie | Blokady pod koniec |
| Wymagania nietestowalne | Spory przy odbiorze |
| Brak RACI | Decyzje się rozmywają |
| Pomijanie konsultantów | Handoff i realne wyjątki są źle zaprojektowane |
| Brak dokumentacji kompromisów | Powracające spory |

## 7.10. Checklista wymagań

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy mamy mapę interesariuszy?
- Czy mamy właściciela biznesowego?
- Czy mamy wymagania funkcjonalne?
- Czy mamy wymagania niefunkcjonalne?
- Czy mamy wymagania compliance?
- Czy wymagania są testowalne?
- Czy mamy priorytety must/should/could?
- Czy mamy RACI?
- Czy decyzje są zapisane?
- Czy konsultanci byli zaangażowani?

## 7.11. Mini case study

W projekcie bankowym biznes chciał, aby bot automatycznie odpowiadał na pytania o karty. Legal wskazał, że część pytań dotyczy indywidualnej sytuacji klienta i regulacji. IT wskazało brak API do niektórych limitów. Po warsztatach zakres podzielono: ogólne informacje przez RAG, indywidualne dane po weryfikacji przez API, a sporne lub regulowane interpretacje do konsultanta. Wymagania stały się jasne i testowalne.

## 7.12. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Zrób mapę interesariuszy dla voicebota medycznego.
2. Napisz 5 wymagań testowalnych.
3. Przygotuj RACI dla decyzji o handoff.
4. Opisz konflikt UX vs legal i zaproponuj kompromis.

## 7.13. Podsumowanie

Voicebot jest projektem przekrojowym. Wymagania muszą łączyć biznes, UX, technologie, operacje i compliance. Im wcześniej ujawnione zostana konflikty, tym taniej można je rozwiązać.

---

# Rozdział 8. Business case i decyzja o MVP

## 8.1. Cele rozdziału

Czytelnik nauczy się:

- przygotować business case dla voicebota;
- zdecydować, co powinno wejść do MVP;
- oddzielić wizję docelową od pierwszego zakresu;
- zdefiniować kryteria przejścia z pilota na produkcję.

## 8.2. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Business case | Uzasadnienie biznesowe inwestycji |
| MVP | Minimum Viable Product, pierwsza wersja dająca wartość i dane |
| Pilot | Ograniczone wdrożenie testujące założenia |
| Soft launch | Stopniowe udostępnianie produkcyjne |
| Go/no-go criteria | Kryteria decyzji, czy przejść dalej |
| Roadmap | Plan rozwoju po MVP |

## 8.3. Wyjaśnienie eksperckie

Business case powinien zawierać:

1. Problem.
2. Dane baseline.
3. Wybrany use case.
4. Alternatywy.
5. Zakres MVP.
6. Architekturę wysokiego poziomu.
7. Wymagane integracje.
8. Ryzyka.
9. Koszty.
10. Spodziewane efekty.
11. Metryki sukcesu.
12. Kryteria pilota i go/no-go.
13. Plan utrzymania.

MVP voicebota nie oznacza "najmniejszy bot". Oznacza najmniejszy zakres, który:

- daje realną wartość;
- może być bezpiecznie wdrożony;
- pozwala zebrać dane;
- ma jasny handoff;
- można zmierzyć.

## 8.4. Perspektywa biznesowa

MVP powinien być wybrany tak, aby:

- sponsor widział efekt;
- contact center odczuło pomoc;
- użytkownicy mieli dobrą ścieżkę;
- IT mogło dostarczyć integracje;
- legal mógł zatwierdzić ryzyko;
- zespół mógł optymalizować po wdrożeniu.

Nie warto wkładać do MVP wszystkiego, co możliwe. Nadmierny zakres opóźnia uczenie się.

## 8.5. Perspektywa użytkownika

MVP nie może być wymówką dla słabego UX. Użytkownik nie wie, że to MVP. W pierwszej wersji można ograniczyć zakres, ale nie można ograniczyć podstaw:

- jasne powitanie;
- dobry fallback;
- handoff;
- potwierdzenia danych;
- brak pętli;
- monitoring.

## 8.6. Perspektywa technologiczna

MVP powinno minimalizować złożoność:

- 1-3 główne intencje;
- ograniczona liczba integracji;
- kontrolowany flow;
- proste, mierzalne metryki;
- jasna architektura fallback;
- sandbox i testy;
- logi gotowe od pierwszego dnia.

## 8.7. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Wybieraj MVP z najwyższym stosunkiem wartości do ryzyka.
- Ogranicz zakres domeny.
- Nie ograniczaj mechanizmów bezpieczeństwa i handoff.
- Zdefiniuj go/no-go przed pilotem.
- Ustal baseline przed wdrożeniem.
- Przygotuj plan optymalizacji po 2, 4 i 8 tygodniach.
- Komunikuj MVP jako kontrolowany etap, nie ostateczną jakość.

## 8.8. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| MVP bez integracji | Brak realnej wartości |
| MVP bez handoff | Ryzyko UX |
| MVP ze zbyt szerokim zakresem | Opóźnienie i chaos |
| Brak go/no-go | Pilot trwa bez decyzji |
| Brak baseline | Nie da się udowodnić efektu |
| Brak planu utrzymania | Bot starzeje się po wdrożeniu |

## 8.9. Szablon business case

```text
1. Executive summary
- Co wdrazamy?
- Jaki problem rozwiazujemy?
- Jaki jest oczekiwany efekt?

2. Baseline
- Wolumen:
- AHT:
- Koszt kontaktu:
- FCR:
- Repeat contact:
- CSAT:
- Abandonment:

3. Wybrany use case
- Zakres:
- Poza zakresem:
- Uzytkownicy:
- Powody kontaktu:
- Handoff:

4. Rozwiazanie
- Architektura wysokiego poziomu:
- Integracje:
- Dane:
- ASR/TTS/NLU/LLM:
- Monitoring:

5. Wartosc
- Oszczednosc bezposrednia:
- Oszczednosc posrednia:
- Wplyw na SLA:
- Wplyw na jakosc:
- Wplyw na konsultantow:

6. Koszty
- Wdrozenie:
- Licencje:
- Minuty/audio/tokeny:
- Integracje:
- Utrzymanie:
- QA:

7. Ryzyka
- Techniczne:
- UX:
- Operacyjne:
- Compliance:
- Reputacyjne:

8. MVP i pilot
- Zakres MVP:
- Zakres pilota:
- Grupa uzytkownikow:
- Czas trwania:
- Kryteria sukcesu:
- Kryteria zatrzymania:

9. Roadmapa
- Etap 1:
- Etap 2:
- Etap 3:

10. Decyzje
- Decydenci:
- Budzet:
- Termin:
- Zaleznosci:
```

## 8.10. Kryteria go/no-go dla pilota

Przykładowe kryteria:

| Obszar | Go | No-go |
|---|---|---|
| Task completion | >= 60% dla MVP | < 40% bez jasnej przyczyny |
| Fallback rate | <= 15-20% | > 30% w kluczowym flow |
| Handoff quality | Konsultant dostaje kontekst | Brak kontekstu lub złe przekazania |
| ASR critical data | Dane krytyczne potwierdzane poprawnie | Częste błędy bez recovery |
| CSAT | Nie gorszy niż baseline lub w ustalonym progu | Znaczny spadek i skargi |
| Compliance | Brak krytycznych naruszeń | Naruszenie polityk lub danych |
| Stability | Brak powtarzalnych awarii | Częste timeouty/rozłączenia |

## 8.11. Mini case study

Firma ubezpieczeniowa planowała MVP z pięcioma use case'ami. Po business case ograniczono zakres do statusu szkody i dosłania dokumentów. To miało dostępne API, jasny wynik i duży wolumen. Sprzedaż nowych polis i interpretacje OWU zostały w roadmapie. Pilot miał jasne kryteria: task completion 55%, poprawne utworzenie linku do dosłania dokumentów, handoff z kontekstem i brak krytycznych naruszeń compliance.

## 8.12. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Przygotuj business case dla jednego use case'u.
2. Określ zakres MVP i out of scope.
3. Zdefiniuj 5 kryteriów go/no-go.
4. Przygotuj roadmapę na 3 etapy.

## 8.13. Podsumowanie

Business case zamienia pomysł na decyzję inwestycyjną. MVP zamienia dużą wizję w kontrolowany eksperyment operacyjny. Dobrze zaprojektowany pilot nie ma udowodnić, że AI jest modne. Ma sprawdzić, czy konkretny proces można automatyzować bezpiecznie i z wartością.

---

# Rozdział 9. Pełna matryca oceny use case'u

## 9.1. Cele rozdziału

Czytelnik nauczy się:

- stosować pełną matrycę priorytetyzacji use case'ów;
- porównywać kandydatów w sposób przejrzysty;
- oddzielać wartość od wykonalności i ryzyka;
- przygotować rekomendacje dla sponsora.

## 9.2. Matryca główna

Skala 1-5. Wagi można dostosować do organizacji. Wersja poniżej jest rekomendowana dla pierwszych wdrożeń enterprise.

| Obszar | Kryterium | Waga | Pytanie |
|---|---|---:|---|
| Wartość | Wolumen | 3 | Czy sprawa występuje często? |
| Wartość | Koszt kontaktu/AHT | 2 | Czy rozmowy są kosztowne lub długie? |
| Wartość | Wpływ na SLA/abandonment | 2 | Czy automatyzacja poprawi dostępność? |
| Wartość | Wpływ na konsultantów | 2 | Czy odciąża powtarzalną pracę? |
| Wartość | Wartość danych | 1 | Czy bot poprawi tagowanie i wiedzę o klientach? |
| Wykonalność | Powtarzalność procesu | 3 | Czy rozmowy są podobne? |
| Wykonalność | Jasność celu użytkownika | 2 | Czy intencje są łatwe do rozpoznania? |
| Wykonalność | Dostępność danych | 2 | Czy mamy nagrania/transkrypcje? |
| Wykonalność | Dostępność API | 3 | Czy systemy wspierają automatyzację? |
| Wykonalność | Łatwość testowania | 1 | Czy można zbudować test set i sandbox? |
| UX | Dopasowanie do głosu | 2 | Czy głos jest wygodnym kanałem? |
| UX | Niskie obciążenie poznawcze | 2 | Czy użytkownik nie musi pamiętać zbyt wiele? |
| UX | Emocje | 2 | Czy sprawa zwykle nie jest silnie konfliktowa? |
| UX | Łatwość handoff | 3 | Czy można szybko przejść do człowieka? |
| Ryzyko | Koszt błędu | 3 | Czy błąd ma ograniczone skutki? |
| Ryzyko | Compliance | 3 | Czy ryzyka prawne są kontrolowalne? |
| Ryzyko | Dane wrażliwe | 2 | Czy nie przetwarzamy nadmiarowo danych wrażliwych? |
| Ryzyko | Zmienność procesu | 1 | Czy proces jest stabilny? |
| Operacje | Właściciel biznesowy | 2 | Czy jest osoba decyzyjna? |
| Operacje | Gotowość contact center | 2 | Czy operacje są gotowe na handoff i zmiany? |

## 9.3. Sposób liczenia

Dla każdego kryterium:

```text
wynik_kryterium = ocena 1-5 x waga
```

Maksymalny wynik w zaproponowanej matrycy: 215 punktów.

Interpretacja:

- 170-215: bardzo dobry kandydat na MVP lub szybki pilot.
- 135-169: dobry kandydat, wymaga doprecyzowania ryzyk.
- 100-134: kandydat na późniejszy etap lub ograniczony pilot.
- 70-99: raczej wspierać konsultanta, nie automatyzować end-to-end.
- Poniżej 70: nie rekomendować jako voicebot w obecnym stanie.

## 9.4. Progi blokujące

Niezależnie od wyniku punktowego, use case wymaga zatrzymania lub zmiany zakresu, jeśli:

- brak właściciela biznesowego;
- brak możliwości handoff;
- wysokie ryzyko prawne bez akceptacji compliance;
- brak danych i brak możliwości pilota;
- proces wymaga decyzji medycznej/prawnej/finansowej bez człowieka;
- brak zgody na monitoring i analizę rozmów;
- brak stabilnego systemu źródłowego dla danych krytycznych.

## 9.5. Przykładowa ocena

| Use case | Wynik | Interpretacja |
|---|---:|---|
| Status zamówienia | 186 | Bardzo dobry MVP |
| Zmiana terminu wizyty | 164 | Dobry kandydat po sprawdzeniu integracji |
| Reklamacja faktury | 112 | Raczej etap późniejszy, częściowa automatyzacja |
| Porada medyczna | 58 | Nie automatyzować end-to-end |
| Agent assist dla konsultanta reklamacji | 152 | Dobra alternatywa dla pełnego voicebota |

## 9.6. Jak przedstawić rekomendacje

Dobra rekomendacja dla sponsora powinna mieć strukturę:

1. Rekomendowany use case.
2. Dlaczego ten.
3. Co jest poza zakresem.
4. Jakie są wymagane integracje.
5. Jakie są ryzyka.
6. Jak mierzymy sukces.
7. Co robimy w pilocie.
8. Co zostawiamy na roadmapie.

Przykład:

"Rekomendujemy MVP dla statusu zamówienia i zmiany adresu przed wysyłką. Use case ma wysoki wolumen, powtarzalny przebieg, dostępne API i niski koszt błędu przy potwierdzeniu SMS. Poza zakresem MVP zostają reklamacje i anulowania po wysyłce. Sukces mierzymy przez task completion, repeat contact, fallback rate, handoff quality i CSAT."

## 9.7. Checklista matrycy

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy oceniono wszystkie kandydaty tą samą metodą?
- Czy są dane, czy tylko opinie?
- Czy uwzględniono ryzyko UX?
- Czy uwzględniono compliance?
- Czy są progi blokujące?
- Czy wynik pokazano razem z uzasadnieniem?
- Czy rekomendacja zawiera out of scope?
- Czy jest plan pilota?

## 9.8. Ćwiczenia

Ćwiczenia mają przełożyć teorię na pracę projektową. Najlepiej wykonywać je na jednym wybranym use case, ponieważ wtedy widać, jak decyzje z rozdziału zmieniają realny scenariusz voicebota.

1. Oceń trzy use case'y pełną matrycą.
2. Wskaż progi blokujące.
3. Przygotuj rekomendacje dla sponsora.
4. Zaproponuj alternatywę dla use case'u z niskim wynikiem.

## 9.9. Podsumowanie

Matryca nie podejmuje decyzji za zespół. Pomaga prowadzić rozmowę na podstawie kryteriów, a nie głośności interesariuszy. Najlepsza decyzja łączy wartość, wykonalność, UX, ryzyko i gotowość operacyjną.


---

# 10. Zbiorcza checklista po Części IV

Ta checklista zbiera najważniejsze pytania po całej części. Najlepiej przejść ją po zakończeniu projektu rozdziałów i zaznaczyć miejsca, które wymagają decyzji, doprecyzowania albo testów.

- Czy znasz główne powody kontaktu?
- Czy masz dane baseline: wolumen, AHT, FCR, repeat contact, CSAT?
- Czy analizowałeś nagrania lub transkrypcje?
- Czy rozmawiałeś z konsultantami?
- Czy wybrany use case ma jasny cel użytkownika?
- Czy proces jest powtarzalny?
- Czy kanał głosowy jest dobrym wyborem?
- Czy potrzebne integracje są dostępne?
- Czy koszt błędu jest kontrolowalny?
- Czy handoff jest możliwy?
- Czy business case uwzględnia koszty utrzymania?
- Czy ROI uwzględnia repeat contact?
- Czy brief zawiera out of scope?
- Czy wymagania są testowalne?
- Czy MVP ma jasne kryteria go/no-go?
- Czy use case przeszedł matrycę oceny?

---

# 11. Co będzie w kolejnej części

Kolejna część powinna opracować **Część V. Projektowanie dialogów i scenariuszy**:

1. Intencje, encje, sloty i konteksty.
2. Flow, happy path, unhappy paths, fallback path i escalation path.
3. Repair strategies i confirmation strategies.
4. Disambiguation, multi-intent handling i interruptions.
5. Dialogi transakcyjne, informacyjne, sprzedażowe, windykacyjne, medyczne/rezerwacyjne i ankietowe.
6. Przykłady dobrych i złych dialogów z analizą.

