# Rozdział 19. Psychologia rozmowy z voicebotem

Rozmowa głosowa jest doświadczeniem sekwencyjnym, społecznym i często emocjonalnym. Użytkownik nie tylko przetwarza treść komunikatów voicebota. Na podstawie tempa, pauz, intonacji, kolejności pytań i reakcji na błędy ocenia kompetencję systemu, własną kontrolę nad rozmową oraz ryzyko dalszego działania.

W tym rozdziale twierdzenia mają trzy rodzaje podstaw i są odpowiednio oznaczone. Tam, gdzie pada nazwisko autora albo tytuł badania, mowa o wyniku ze źródła. **Wniosek dla voicebota** to rozumowanie wyprowadzone z przytoczonych badań. **Z praktyki** oznacza zasadę z doświadczenia wdrożeniowego, za którą nie stoi badanie. Akapity **W czacie** i **W e-mailu** porównują voicebota z kanałami tekstowymi. Lista źródeł ze statusem weryfikacji zamyka rozdział (sekcja 19.16).

---

## 19.1. Psychologia rozmowy głosowej

W badaniu [Liu i in.](https://doi.org/10.1145/3706598.3714228) starsze osoby rozmawiały z agentem głosowym. Gdy agent milczał dłużej, bo przetwarzał wypowiedź, jedna z uczestniczących osób zapytała badaczy, czy system się zepsuł. Nikt jej nie powiedział, że cisza oznacza awarię. Tak po prostu działa rozmowa: cisza coś znaczy.

Ludzie stosują wobec mówiących maszyn te same reguły co wobec ludzi. [Nass i Moon](https://spssi.onlinelibrary.wiley.com/doi/10.1111/0022-4537.00153) w przeglądzie serii eksperymentów opisują, że ludzie bezrefleksyjnie przenoszą na komputery reguły społeczne, między innymi uprzejmość, wzajemność i stereotypy płci. [Lee i See](https://scispace.com/pdf/trust-in-automation-designing-for-appropriate-reliance-2uiy4o89ga.pdf) dodają, że naruszenie zasad etykiety przez system, w tym reguł dobrej komunikacji, może budzić negatywne emocje i podkopywać zaufanie.

Najlepiej zbadaną z tych reguł jest tempo wymiany. [Levinson i Torreira](https://www.frontiersin.org/articles/10.3389/fpsyg.2015.00731/full) podają, że typowa przerwa między wypowiedziami rozmówców wynosi około 200 ms, choć samo zaplanowanie jednego słowa zajmuje ponad 600 ms. Rozmówcy muszą więc przewidywać koniec cudzej wypowiedzi i przygotowywać odpowiedź, zanim on nastąpi. Ci sami autorzy przytaczają analizy korpusowe, w których przerwy od 700 ms wzwyż wiążą się z odpowiedziami niepożądanymi, takimi jak odmowa. Dłuższa cisza zapowiada więc kłopot, zanim padnie jakiekolwiek słowo.

Czy da się odpowiedzieć za szybko? Tu dowody są podzielone. [Templeton i in.](https://www.pnas.org/doi/10.1073/pnas.2116915119) pokazali na rozmowach ludzi, że im szybsze odpowiedzi rozmówcy, tym większe poczucie więzi. W badaniu z robotem [Shiwa i in.](https://www.jstage.jst.go.jp/article/jrsj/27/1/27_1_87/_article/-char/en) stwierdzili natomiast, że użytkownicy najwyżej oceniali odpowiedź po około sekundzie, a nie odpowiedź najszybszą. Wypełniacz zapowiadający odpowiedź łagodził wrażenie długiego czekania. Nie udało się znaleźć badania, które pokazywałoby, że szybka odpowiedź voicebota brzmi jak niesłuchanie.

**Wniosek dla voicebota.** Voicebot nie odpowie w 200 ms, więc jego cisza zawsze będzie coś komunikować. Skoro dłuższa cisza zapowiada w rozmowie kłopot, a wypełniacz łagodził czekanie w badaniu z robotem, przy dłuższym przetwarzaniu warto ją czymś zapowiedzieć ("Już sprawdzam"). Szerzej o ciszy przed odpowiedzią mówi sekcja 19.9.3.

**Z praktyki.**

- Projektuj tempo do sytuacji.
- Nie twórz długich monologów.
- Używaj pauz przy danych.
- Nie udawaj ludzkiej empatii (sekcja 19.5).
- Kompetencja jest ważniejsza niż "ciepły charakter".
- Voicebot, który odpowiada bardzo szybko po złożonej wypowiedzi, może brzmieć, jakby nie słuchał. Badania przytoczone wyżej tego nie rozstrzygają.

---

## 19.2. Modele mentalne użytkownika

[Luger i Sellen](https://www.microsoft.com/en-us/research/publication/like-having-a-really-bad-pa-the-gulf-between-user-expectation-and-experience-of-conversational-agents/) przeprowadziły wywiady z czternastoma stałymi użytkownikami asystentów głosowych w telefonach. Tytuł ich pracy streszcza wynik: "to jak mieć naprawdę kiepskiego asystenta". Oczekiwania badanych rozmijały się z działaniem systemu pod względem inteligencji, możliwości i celów. Połowa z nich przyznała wprost, że nie wie, co ich asystent potrafi.

Z tych wywiadów wynikają trzy obserwacje ważne dla projektanta. Po pierwsze, żartobliwe odpowiedzi asystenta podnosiły oczekiwania: użytkownicy przypisywali systemowi więcej inteligencji społecznej, niż miał. Po drugie, po serii niepowodzeń ludzie upraszczali język, gubili wszystko poza słowami kluczowymi, mówili wolniej i wyraźniej. Po trzecie, osoby bez przygotowania technicznego częściej widziały w błędzie własną winę i mówiły, że czują się głupio. W efekcie badani zostawali przy prostych zadaniach, a przy złożonych wszyscy szukali potwierdzenia na ekranie.

Drugie źródło pokazuje ten sam mechanizm w liczbach, tyle że dla chatbota tekstowego. [Crolic i in.](https://ora.ox.ac.uk/objects/uuid:73d46bba-35d1-465c-be00-aa6f4f4ccb84/download_file?safe_filename=Crolic_et_al_2021_blame_the_bot.pdf&type_of_work=Journal+article) sprawdzili, że chatbot z imieniem, awatarem i mówiący w pierwszej osobie budził przed rozmową wyższe oczekiwania co do skuteczności niż "Automatyczne Centrum Obsługi Klienta". Po rozmowie ocena obu była taka sama. Za tę różnicę płacili klienci rozzłoszczeni: u nich bot uczłowieczony obniżał satysfakcję, ocenę firmy i chęć zakupu. Efekt znikał, gdy bot na początku sam obniżył oczekiwania i uprzedził, że jest tylko botem.

**Wniosek dla voicebota.** Model mentalny użytkownika powstaje w pierwszych sekundach i lepiej ustawić go wprost, niż liczyć, że użytkownik zgadnie. Autorki pierwszego badania zalecają, żeby system pokazywał swoje możliwości w samej interakcji, a nie dopiero przy porażce. Zdanie o zakresie robi to najtaniej.

"Pomogę sprawdzić status, zmienić termin albo połączyć z konsultantem."

Ograniczenia: wywiady dotyczyły asystentów w telefonach z lat 2014-2015 i czternastu osób, głównie z Wielkiej Brytanii. Eksperymenty z gniewem prowadzono na chatbotach tekstowych.

**Z praktyki.** Użytkownik może myśleć, że rozmawia z IVR, z konsultantem, z chatbotem głosowym, z asystentem AI albo z filtrem przed konsultantem. Każde z tych założeń prowadzi do innego sposobu mówienia. Jeśli bot brzmi jak człowiek, ale nie rozumie korekty, frustracja rośnie.

---

## 19.3. Zaufanie, kontrola i poczucie bezpieczeństwa

W sondażu [Armatis Customer Experience Index](https://300gospodarka.pl/news/boty-w-obsludze-klienta-wiecej-kontaktow-mniej-frustracji-ale-zaufania-wciaz-brak), przeprowadzonym przez SW Research w czerwcu 2025 roku na próbie 817 osób, kontakt z botem w obsłudze klienta miało już 75,9% badanych. W pełni ufa botom 8,1%. Najwięcej, bo 39,5%, ufa im tylko w prostych, rutynowych sprawach, a 19,9% nie ufa wcale. Voicebot zaczyna więc rozmowę z kredytem zaufania na sprawy proste i bez kredytu na trudne.

Ramę do myślenia o takim zaufaniu dali [Lee i See](https://scispace.com/pdf/trust-in-automation-designing-for-appropriate-reliance-2uiy4o89ga.pdf). Definiują zaufanie jako postawę, zgodnie z którą drugi podmiot pomoże osiągnąć cel w sytuacji niepewności i podatności na szkodę. Opiera się ono na trzech rodzajach informacji: o działaniu systemu (co robi i jak niezawodnie), o procesie (czy jego sposób działania pasuje do sytuacji) i o celu (czy używa się go zgodnie z zamysłem twórców). Autorzy łączą je odpowiednio z kompetencją, integralnością i życzliwością z modelu zaufania między ludźmi.

Ten sam przegląd opisuje, jak zaufanie reaguje na błędy. Po pojedynczej awarii spada, a potem wraca. Przy awariach przewlekłych spada, dopóki człowiek nie zrozumie usterki. Niska niezawodność na początku ciąży długo, nawet gdy system później działa lepiej. Mała usterka o nieprzewidywalnych skutkach szkodzi zaufaniu bardziej niż duża, ale stała.

**Wniosek dla voicebota.** Dwa wymiary, o których mówi praktyka, czyli kompetencja i uczciwość, odpowiadają informacjom o działaniu i o procesie. Z dynamiki błędów wynika, że pierwsze wymiany liczą się podwójnie, a przewidywalność jest warta więcej niż okazjonalna błyskotliwość. Bot, który zawsze tak samo przyznaje, czego nie potrafi, traci mniej niż bot, który raz zgaduje dobrze, a raz źle.

**Z praktyki.** Zaufanie budują: transparentność, szybka reakcja, potwierdzenia danych krytycznych, możliwość poprawy, łatwy handoff, brak przesadnej pewności i konsekwentny ton. Niszczą je: ignorowanie przerwań, pętle fallbacków, brak konsultanta, udawanie człowieka, halucynacje, zbyt długie komunikaty i powtarzanie pytań.

"Mogę sprawdzić status przesyłki i zmienić termin dostawy. Nie podejmę decyzji reklamacyjnej automatycznie; w takiej sprawie połączę z konsultantem."

Taki komunikat nie osłabia bota. Ustawia uczciwe granice i zmniejsza ryzyko rozczarowania.

---

## 19.4. Obciążenie poznawcze

W głosie użytkownik nie widzi listy opcji. Musi ją utrzymać w pamięci, a to, czego nie utrzyma, przepada.

[Leahy i Sweller](https://researchers.mq.edu.au/en/publications/cognitive-load-theory-modality-of-presentation-and-the-transient-/) nazwali to efektem informacji ulotnej. W ich eksperymentach z uczniami szkoły podstawowej długie objaśnienia mówione wypadały gorzej niż te same objaśnienia na piśmie. Po skróceniu przewagę odzyskiwała wersja mówiona. Problemem nie jest więc sam głos, tylko długość tego, co trzeba zapamiętać naraz.

Drugie badanie podważa popularną regułę. [Commarford i in.](https://doi.org/10.1518/001872008x250665) zauważają, że zalecenie, by menu głosowe miało najwyżej pięć pozycji, powołuje się zwykle na klasyczny artykuł Millera o pojemności pamięci, który go nie uzasadnia. W ich eksperymencie użytkownicy systemu IVR z jednym szerokim menu radzili sobie lepiej i byli bardziej zadowoleni niż użytkownicy menu głębokiego, podzielonego na poziomy. Różnica była największa u osób o małej pojemności pamięci roboczej. Skracanie list przez dokładanie kolejnych pięter obciąża więc pamięć bardziej niż dłuższa, płaska lista.

**Wniosek dla voicebota.** Liczy się długość pojedynczej wypowiedzi, a nie sama liczba opcji. Listy nie warto skracać przez dzielenie rozmowy na kolejne pytania pośrednie. Najlepiej w ogóle jej nie odczytywać i zacząć od pytania otwartego.

Źle: "Do wyboru są: zmiana adresu, zmiana terminu, anulowanie, zwrot, faktura, reklamacja albo konsultant."  
Lepiej: "W czym mogę pomóc przy zamówieniu?"

**Z praktyki.**

- Maksymalnie 2-3 opcje w jednej wypowiedzi. Przytoczone badania nie wyznaczają takiej granicy; to reguła robocza.
- Jedno pytanie naraz.
- Krótkie zdania.
- Informacje porcjowane.
- Liczby w grupach.
- SMS albo e-mail dla długich informacji.

**W czacie.** Wiadomość zostaje na ekranie, więc lista opcji nie obciąża pamięci. Uczestnicy wywiadów Luger i Sellen przy złożonych zadaniach głosowych sami szukali potwierdzenia na ekranie. Voicebot może dać jego odpowiednik, wysyłając potwierdzenie SMS-em.

---

## 19.5. Emocje użytkownika

Dużo rozmów z voicebotem zaczyna się od emocji: pośpiechu, irytacji, niepewności, wstydu, lęku, bezradności albo złości. Naturalnym odruchem projektanta jest kazać botowi tę emocję nazwać i wyrazić współczucie. Badania nad chatbotami pokazują, że ten odruch bywa kosztowny.

[Yin, Han i Zhang](https://www.usf.edu/business/news/2026/04-20-chatbot-empathy-can-worsen-customer-reactions-usf-study.aspx) w trzech eksperymentach, w tym z chatbotem opartym na dużym modelu językowym, stwierdzili, że empatia wyrażana przez bota pogarszała reakcje klientów. Klienci reagowali oporem na to, że system rozpoznaje ich emocje i na nie odpowiada, a bot wydawał się przez to mniej kompetentny. We wcześniejszej, wstępnej pracy [ci sami autorzy](https://aisel.aisnet.org/sighci2022/1/) rozróżnili dwa przypadki, a ich wyniki, jak sami piszą, są tylko sugestią. Empatia wobec złego doświadczenia klienta z produktem podnosiła postrzegane ciepło bota. Empatia wobec własnego błędu bota obniżała jego postrzeganą kompetencję.

Trzecie źródło dotyczy gniewu. W opisanych w sekcji 19.2 badaniach [Crolic i in.](https://ora.ox.ac.uk/objects/uuid:73d46bba-35d1-465c-be00-aa6f4f4ccb84/download_file?safe_filename=Crolic_et_al_2021_blame_the_bot.pdf&type_of_work=Journal+article) uczłowieczony chatbot szkodził tylko wtedy, gdy klient był zły. U klientów spokojnych nie robił różnicy. Autorzy radzą rozpoznawać gniew na początku rozmowy i kierować takich klientów do bota mniej uczłowieczonego albo od razu do człowieka.

Czego klient oczekuje zamiast współczucia? [Dixon, Freeman i Toman](https://hbr.org/2010/07/stop-trying-to-delight-your-customers) na podstawie badania ponad 75 tysięcy osób kontaktujących się z obsługą twierdzą, że ponadprzeciętne starania niewiele zmieniają, a klienci chcą prostego i szybkiego rozwiązania sprawy.

**Wniosek dla voicebota.** Wszystkie te wyniki pochodzą z czatu tekstowego albo z obsługi prowadzonej przez ludzi; badania nad empatią voicebota nie udało się sprawdzić. Kierunek jest jednak spójny z praktyką: najbardziej ryzykowna jest empatia wypowiadana po własnym błędzie bota i wobec klienta, który już jest zły.

**Z praktyki.** Bot powinien reagować przez działanie, nie przez teatralną empatię.

Źle: "Doskonale rozumiem tę frustrację."  
Lepiej: "Skrócę rozmowę. Łączę z konsultantem i przekażę to, co zostało już podane."

---

## 19.6. Psychologia błędu i naprawy rozmowy

Nieporozumienie nie jest w rozmowie wypadkiem, tylko codziennością. [Dingemanse i in.](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0136100) przeanalizowali nagrania swobodnych rozmów w dwunastu językach z pięciu kontynentów. Prośba o naprawę padała średnio raz na 1,4 minuty. Ludzie mają na to sprawny, wspólny dla wszystkich badanych języków system.

Składa się on z trzech rodzajów próśb. Prośba otwarta ("Hę?") sygnalizuje kłopot, ale nie mówi, gdzie leży. Prośba zawężona ("Kto?") wskazuje brakujący element. Propozycja ("Urodziła chłopca?") podaje to, co usłyszano, i prosi tylko o potwierdzenie. Autorzy stwierdzają, że ludzie wybierają najbardziej szczegółową prośbę, na jaką pozwala sytuacja, zgodnie z zasadą najmniejszego wspólnego wysiłku. Im bardziej szczegółowa prośba, tym krótsza odpowiedź, której wymaga: po prośbie otwartej rozmówca zwykle powtarza całość, po propozycji wystarcza potwierdzenie.

Po stronie użytkownika błąd bota ma jeszcze jeden koszt. W wywiadach [Luger i Sellen](https://www.microsoft.com/en-us/research/publication/like-having-a-really-bad-pa-the-gulf-between-user-expectation-and-experience-of-conversational-agents/) osoby bez przygotowania technicznego częściej uznawały niepowodzenie za własną winę.

**Wniosek dla voicebota.** "Nie rozumiem, proszę powtórzyć" to prośba otwarta, czyli najdroższa dla użytkownika forma naprawy. Bot, który wie, czego mu brakuje, powinien pytać tak, jak robią to ludzie: zawężać albo proponować.

"Nie mam pewności, czy ostatnia cyfra to osiem czy dziewięć. Proszę powtórzyć tylko ostatnią cyfrę."

Skoro część użytkowników bierze winę na siebie, komunikat o błędzie powinien mówić o tym, czego bot nie usłyszał, a nie o tym, co użytkownik zrobił źle.

**Z praktyki.** Najbardziej frustrujące nie jest pojedyncze niezrozumienie, ale brak postępu. Powtarzanie tego samego pytania zwiększa poczucie porażki użytkownika.

- Nie obwiniaj.
- Powiedz, czego brakuje.
- Napraw najmniejszy fragment.
- Zmień strategię po drugim błędzie.
- Daj alternatywę.

**W czacie.** [Ashktorab i in.](https://research.ibm.com/publications/resilient-chatbots-repair-strategy-preferences-for-conversational-breakdowns) dali 203 osobom do oceny osiem strategii naprawy w chatbocie tekstowym. Najlepiej wypadały te, w których bot podawał opcje do wyboru albo wyjaśniał, czego nie zrozumiał. W czacie opcje można pokazać. W głosie zostaje pytanie zawężone.

---

## 19.7. Perswazja, decyzje i wpływ społeczny

Voicebot sprzedażowy, windykacyjny albo ankietowy wywiera wpływ samą konstrukcją rozmowy. [Owens i in.](https://www.franziroesner.com/pdf/owens-deceptivevoice-eurousec22.pdf) opisali cechy interfejsów głosowych, które ułatwiają wzorce zwodnicze. Dla voicebota telefonicznego najważniejsze są trzy.

Pierwsza to liniowość. Informacja płynie w ustalonej kolejności, a użytkownik nie może się zatrzymać ani przejrzeć opcji; może tylko przyjąć to, co słyszy, albo zacząć od nowa. Druga to trudność odkrywania: nie wiadomo, co można powiedzieć. Trzecia to sam głos, czyli głośność, tempo, wysokość i akcent, którymi da się wyróżnić opcję korzystną dla firmy, a niechcianą podać ciszej albo szybciej.

Autorzy sprawdzili dwanaście scenariuszy w badaniu z 93 osobami. Tylko 41% uczestników oceniło scenariusze pomyślane jako zwodnicze jako problematyczne. Część takich zabiegów pozostaje więc niezauważona, co jest argumentem za ostrożnością, a nie przeciw niej.

Osobną pokusą jest ukrywanie, że rozmawia bot. [Luo i in.](https://econpapers.repec.org/RePEc:inm:ormksc:v:38:y:2019:i:6:p:937-947) przeprowadzili eksperyment na ponad 6200 klientach, do których z ofertą dzwonił bot albo człowiek. Bot, który się nie przedstawił, sprzedawał tak skutecznie jak doświadczeni sprzedawcy. Ujawnienie, że dzwoni bot, obniżało sprzedaż o ponad 79,7%: klienci byli oschli i kupowali mniej, bo uznawali ujawnionego bota za mniej kompetentnego i mniej empatycznego.

**Wniosek dla voicebota.** Transparentność ma w sprzedaży mierzalny koszt. Decyzja, by mimo to informować, że rozmawia bot, jest wyborem etycznym i prawnym (rozdziały 13 i 14), a nie sposobem na lepszy wynik. Z liniowości wynika z kolei, że kolejność i sposób podania opcji są narzędziem wpływu: odmowa powinna być podana tak samo wyraźnie i tak samo wcześnie jak zgoda.

**Z praktyki.** Etyczna perswazja informuje, pyta o zgodę, daje łatwe "nie", nie ukrywa opcji, nie manipuluje strachem i nie udaje autorytetu człowieka. Ryzykowne są: efekt autorytetu, domyślna opcja, efekt pilności, efekt straty i presja sekwencyjna.

---

## 19.8. Antropomorfizacja voicebota

Ludzie przypisują głosom intencje i emocje, i dzieje się to bez ich decyzji (sekcja 19.1). Pytanie projektowe brzmi więc nie "czy bot będzie odbierany społecznie", tylko "ile obietnicy składa swoim brzmieniem".

Głos tę obietnicę wzmacnia. [Schroeder, Kardas i Epley](https://escholarship.org/uc/item/4bd9d03k) pokazali w trzech eksperymentach, że osoba, z którą oceniający się nie zgadzał, wydawała mu się bardziej myśląca i bardziej ludzka, gdy słyszał jej wypowiedź, niż gdy czytał te same słowa. W czwartym eksperymencie te same wypowiedzi odczytał syntezator. Głos syntetyczny miał mniej zróżnicowaną intonację i mniej pauz niż ludzki, i to właśnie intonacja oraz udział pauz przewidywały oceny. Pod względem cech związanych z uczuciami mówca odczytany przez syntezator wypadł gorzej niż mówca ludzki i gorzej niż sam tekst.

Obietnica ma cenę wtedy, gdy bot jej nie dotrzymuje. Pokazują to badania z sekcji 19.2: żartobliwość asystenta zawyżała oczekiwania, a uczłowieczony chatbot szkodził w rozmowie z rozzłoszczonym klientem. Z kolei w eksperymencie [Luo i in.](https://econpapers.repec.org/RePEc:inm:ormksc:v:38:y:2019:i:6:p:937-947) bota ujawnionego jako bot oceniano jako mniej kompetentnego i mniej empatycznego, choć prowadził tę samą, ściśle ustrukturyzowaną rozmowę.

**Wniosek dla voicebota.** Ludzkie brzmienie nie jest ani zaletą, ani wadą samą w sobie. Podnosi oczekiwania, a koszt pojawia się przy błędzie i przy gniewie. Bezpieczniej jest obiecywać brzmieniem tyle, ile bot naprawdę potrafi.

Ograniczenie: syntezator w badaniu z 2017 roku brzmiał gorzej niż dzisiejsze głosy, a oceniano ludzi wypowiadających opinie, nie boty obsługujące sprawę.

**Z praktyki.** Bot może mieć styl, ale nie powinien mieć fikcyjnego życia. Może być spokojny, uprzejmy i konsekwentny. Nie musi mówić, że "cieszy się", "martwi" albo "doskonale rozumie", jeżeli nie idzie za tym realna zdolność pomocy.

- Persona jako rola, nie fikcyjny człowiek.
- Transparentność.
- Brak udawania uczuć.
- Kompetencja zamiast "osobowości".

### 19.8.1. Backchannel i sygnały słuchania

Backchannel to krótki sygnał, że rozmówca słucha, na przykład "mhm" albo "dobrze". O tym, dlaczego sam taki sygnał nie dowodzi słuchania, mówi sekcja 19.9.1.

W badaniu [Liu i in.](https://doi.org/10.1145/3706598.3714228) szesnaście starszych osób rozmawiało po chińsku z agentem głosowym, który w pauzach wtrącał nagrane wcześniej "mm-hmm" i "tak". Czternaście osób odebrało to dobrze: czuły się wysłuchane i szanowane, a osiem w ogóle nie zauważyło wtrąceń. Dwie osoby mówiły, że wtrącenia wybijały je z toku myśli, i chciały móc dopasować ich głośność, wysokość i treść. Agent prowadził rozmowy towarzyskie, więc autorzy sami zastrzegają, że nie wiadomo, czy wyniki przenoszą się na agentów zadaniowych.

**Z praktyki.** Backchannel sprawdza się przy dłuższym podawaniu danych, gdy użytkownik robi pauzę, ale nie skończył myśli, gdy bot potrzebuje chwili na sprawdzenie informacji oraz w rozmowach opiekuńczych i senioralnych. Ryzykowny jest w procesach transakcyjnych wysokiego ryzyka, podczas odczytywania numerów, dat i kwot, jako zamiennik realnego zrozumienia oraz wtedy, gdy pada zbyt często. Jeśli bot mówi "rozumiem" po każdej wypowiedzi, zaczyna brzmieć mechanicznie.

---

## 19.9. Psychologia języka

**Z praktyki.** Dobry język voicebota jest prosty, konkretny i uprzejmy. Nie ma w nim żargonu ani długich zdań, najważniejsza informacja stoi na początku, a ramowanie jest pozytywne, ale nie manipulacyjne.

Źle: "Niestety niepoprawnie podano dane."  
Lepiej: "Nie mam pewności co do numeru. Proszę podać go jeszcze raz, po trzy cyfry."

### 19.9.1. Dlaczego "tak, jasne" potrafi zabrzmieć niemiło

Ktoś chce się upewnić, że znajoma odbierze go z dworca o ustalonej godzinie. Prosi o potwierdzenie i dostaje odpowiedź: "tak, jasne". Formalnie wszystko się zgadza, a jednak odpowiedź brzmi niemiło, choć nie było ku temu żadnego powodu.

Językoznawstwo ma na takie słowa nazwę. Roman Jakobson pisał o funkcji fatycznej: komunikat służy samemu kontaktowi, czyli sprawdzeniu, że łączność działa. "Jasne", "mhm" i "no tak" robią właśnie to.

Psychologia rozmowy dokłada drugi element. [Bavelas, Coates i Johnson](https://pubmed.ncbi.nlm.nih.gov/11138763) odróżnili reakcje słuchacza ogólne, które pasują do każdej wypowiedzi (kiwnięcie głową, "mhm"), od konkretnych, ściśle związanych z tym, co właśnie padło. W dwóch eksperymentach z 63 parami nieznajomych jedna osoba opowiadała historię, a druga słuchała, w części par rozpraszana dodatkowym zadaniem. Rozproszeni słuchacze nadal wtrącali trochę reakcji ogólnych, ale prawie żadnych konkretnych. Opowiadający radzili sobie wtedy wyraźnie gorzej, zwłaszcza przy zakończeniu historii. Autorzy zastrzegają, że nie mogą statystycznie wykazać, co było przyczyną, a co skutkiem.

**Wniosek dla voicebota.** Samo "słyszę" nie wystarcza rozmówcy, który potrzebuje dowodu, że został zrozumiany. Pytający o potwierdzenie prosi o pewność. Znajoma z dworca potwierdziła, ale nie powtórzyła godziny, więc tej pewności nie dała. Stąd zasada: na pytanie o potwierdzenie bot powtarza to, co potwierdza. Wspiera ją także badanie asystentów głosowych opisane w sekcji 19.9.6.

Źle: "Tak, jasne."  
Lepiej: "Tak, zamówienie zostało dziś wysłane. Kurier doręczy je jutro."

**Z praktyki.** "Jasne" znaczy tyle co "oczywiście", więc podpowiada, że pytanie było zbędne. Podwojone "tak, jasne" ma w polszczyźnie także odczytanie ironiczne. Które odczytanie wygra, rozstrzyga zwykle ton głosu, a gdy go brakuje albo jest mylący, odbiorca dopowiada resztę sam.

**W czacie.** Działa ta sama zasada. Sucha odpowiedź nie przemija jednak, tylko zostaje na ekranie, a szczegół można pokazać tak, żeby dało się go odczytać jednym spojrzeniem: "Tak, zamówienie zostało dziś wysłane. Dostawa kurierem: jutro."

### 19.9.2. Ten sam tekst w czterech kanałach

To samo "tak, jasne" może być ciepłe, zbywające albo ironiczne. Które z nich usłyszy odbiorca, zależy od kanału, bo każdy kanał gubi albo zniekształca inne sygnały.

| Kanał | Co dzieje się z tonem | Główne ryzyko | Co pomaga |
|---|---|---|---|
| Rozmowa ludzi (na żywo, telefon) | Ton i tempo niesie głos mówiącego | Opóźniona lub przeciągnięta odpowiedź brzmi jak niechęć | Szybka reakcja i ciąg dalszy po potwierdzeniu |
| Tekst między ludźmi (SMS, komunikator) | Tonu nie ma; odbiorca dopowiada go sam | Nadawca "słyszy" własny ton i zakłada, że dotarł | Konkret w treści, pełne zdanie |
| Voicebot | Ton wybiera syntezator, a słuchacz bierze go za zamierzony | Błędna lub płaska intonacja, cisza przed odpowiedzią | Dłuższa fraza zamiast jednego słowa, ocena ze słuchu |
| Chatbot | Tonu nie ma; zastępują go interpunkcja, emoji i długość wiadomości | Sucha odpowiedź zostaje na ekranie | Powtórzony szczegół, pełne zdanie |

Że głos przenosi ton lepiej niż tekst, pokazali [Kruger i in.](https://doi.org/10.1037/0022-3514.89.6.925). W jednym z ich eksperymentów nadawcy przekazywali zdania poważne i sarkastyczne mailem albo głosem. W obu grupach spodziewali się, że odbiorca odczyta ton w blisko 90% przypadków. Głosem udawało się to w mniej więcej trzech czwartych przypadków, a mailem na poziomie nieodróżnialnym od zgadywania. Piszący "słyszeli" własny ton i zakładali, że odbiorca też go usłyszy. Autorzy zaznaczają, że zakazali uczestnikom emotikonów, co mogło obniżyć trafność w mailu.

Że nie każdy głos przenosi go równie dobrze, pokazali [Schroeder, Kardas i Epley](https://escholarship.org/uc/item/4bd9d03k) w badaniu opisanym w sekcji 19.8. Mówca odczytany przez syntezator, o mniej zróżnicowanej intonacji i z mniejszą liczbą pauz, wypadł pod względem cech związanych z uczuciami gorzej niż ten sam tekst podany do czytania.

**Wniosek dla voicebota.** W tekście sygnału tonu po prostu nie ma. W voicebocie jest zawsze, tylko że wybiera go syntezator, a słuchacz bierze go za zamierzony. Płaski głos nie jest więc neutralny. Najbardziej narażone są wypowiedzi jednowyrazowe: całe ich znaczenie spoczywa na intonacji, a syntezator ma wtedy najmniej kontekstu, żeby ją dobrać. W dłuższej frazie melodię niesie całe zdanie.

Z badania Krugera wynika jeszcze jedno: autor komunikatu, czytając własny tekst, "słyszy" zamierzony ton. Komunikaty trzeba więc oceniać ze słuchu, w głosie, którym bot naprawdę mówi, a nie ze skryptu.

**Z praktyki.** Dla kilku najczęstszych krótkich potwierdzeń opłaca się rozważyć nagrania albo ręczne ustawienie prozodii.

**W czacie.** Problem jest odwrotny. Komunikat nie zabrzmi źle z winy syntezatora, ale nic też nie złagodzi go tonem. Tekst, który w skrypcie wygląda neutralnie, klient odczyta tak, jak sam go sobie dopowie.

### 19.9.3. Cisza też jest komunikatem

W rozmowie liczy się nie tylko to, co pada, ale też kiedy. [Roberts, Francis i Morgan](https://doi.org/10.1016/j.specom.2006.02.001) przygotowali nagrania udające rozmowy telefoniczne dwóch koleżanek. Jedna o coś prosiła albo wyrażała opinię, druga odpowiadała twierdząco: "Sure" albo "Yeah". Badacze zmieniali długość ciszy przed odpowiedzią (0, 600 i 1200 ms), długość samego słowa oraz jego wysokość i melodię. Im dłuższa cisza, tym mniej chętna wydawała się odpowiadająca. Cisza okazała się sygnałem najsilniejszym. Wydłużenie samego słowa szkodziło wtedy, gdy było duże: słowo rozciągnięte trzykrotnie brzmiało niechętnie nawet bez żadnej ciszy. Wysokość i melodia głosu miały znaczenie mniejsze.

W kolejnym badaniu [Roberts i Francis](https://pubmed.ncbi.nlm.nih.gov/23742442) szukali progu. Dali 380 osobom do oceny dialogi z identyczną, twierdzącą odpowiedzią na prośbę, różniące się tylko długością ciszy, od 200 do 1200 ms. Postrzegana chęć była wysoka do około 500 ms, zaczynała spadać po 600 ms i wyraźnie obniżała się między 700 a 800 ms. Zgadza się to z analizami korpusowymi przytoczonymi w sekcji 19.1, w których przerwy od 700 ms wiążą się z odpowiedziami niepożądanymi.

[Templeton i in.](https://www.pnas.org/doi/10.1073/pnas.2116915119) pokazali drugą stronę tego zjawiska. W 322 dziesięciominutowych rozmowach studentów szybsze odpowiedzi rozmówcy wiązały się z większym poczuciem więzi. Gdy badacze sztucznie skrócili przerwy w nagraniach, 450 postronnych słuchaczy oceniło rozmówców jako bardziej związanych; gdy je wydłużyli, jako mniej. Były to rozmowy zapoznawcze, a autorzy zaznaczają, że nie badali rozmów nastawionych na cel.

**Wniosek dla voicebota.** Krótkie potwierdzenie jest zagrożone podwójnie. Nawet dobrze zaintonowane "Dobrze", które pada po sekundzie ciszy, może zabrzmieć jak zgoda z niechęcią. Krótkie potwierdzenie powinno więc paść szybko albo wcale. Kiedy odpowiedź wymaga czasu, lepiej zacząć od sygnału działania ("Już sprawdzam"), a treść podać chwilę później. Syntezator nie powinien też rozciągać słowa potwierdzenia.

Zastrzeżenie: wszystkie trzy badania dotyczą rozmów między ludźmi i języka angielskiego. Nie wiadomo, czy użytkownicy stosują ten sam próg wobec systemu, o którym wiedzą, że jest botem. Jedyne znalezione badanie z maszyną, opisane w sekcji 19.1, wskazuje na większą tolerancję.

**Z praktyki.** Ciszę przed odpowiedzią warto mierzyć osobno dla potwierdzeń, a nie tylko jako średnią z całej rozmowy.

**W czacie.** Czas znaczy tu co innego. [Gnewuch i in.](https://aisel.aisnet.org/bise/vol64/iss6/5/) porównali u 202 studentów chatbota odpowiadającego niemal natychmiast z chatbotem odpowiadającym po średnio 2,3 sekundy. U nowicjuszy opóźnienie zwiększało poczucie obecności rozmówcy i chęć korzystania z bota. U osób doświadczonych działało odwrotnie. Nie ma podstaw, by przenosić ten wynik na głos, więc budżetu czasu nie da się przejąć z czatu do voicebota.

### 19.9.4. Jakimi słowami potwierdzać

Skoro samo "jasne" nie wystarcza, zostaje pytanie, czego używać. Tej sekcji nie da się oprzeć na badaniach: nie udało się znaleźć pracy o tym, jak użytkownicy polskojęzyczni odbierają poszczególne słowa potwierdzenia. Całość, poza jednym wskazanym miejscem, jest więc zapisem praktyki. Kiedy potwierdzać i jakim typem potwierdzenia, opisują sekcje 4.5 i 6.3. Tutaj chodzi o samo brzmienie.

**Z praktyki.** Dobór słowa zależy od tego, co ma ono zrobić, i od rejestru, w jakim mówi bot.

| Funkcja | Słowa i zwroty | Pułapka |
|---|---|---|
| Przyjęcie danych | "Dziękuję", "Dobrze", "Zapisane" | "Dobrze" po złej wiadomości od klienta brzmi niestosownie |
| Zgoda na prośbę | "Oczywiście", "Dobrze", "Już to robię" | "Oczywiście" w odpowiedzi na pytanie o potwierdzenie sugeruje, że pytanie było zbędne |
| Sygnał działania | "Już sprawdzam", "Chwileczkę", "Sprawdzam status przesyłki" | Sygnał bez dalszego ciągu |
| Potwierdzenie faktu | "Tak", "Zgadza się", "Potwierdzam" | Samo słowo bez szczegółu |
| Zakończenie zadania | "Gotowe", "Zrobione" | Brak informacji, co dokładnie zostało zrobione |

Osobną grupą są słowa oceniające, takie jak "świetnie" czy "super". Nie są potwierdzeniami: po numerze zamówienia brzmią sztucznie, a po opisie problemu niestosownie.

O tym, które słowa w ogóle wchodzą w grę, decyduje rejestr (o personie i formalności mówi sekcja 4.4). Bot mówiący bezosobowo ("proszę podać") dobrze brzmi z "Dziękuję", "Dobrze", "Zgadza się", "Potwierdzam" i "Sprawdzam". Źle brzmi z "jasne", "pewnie" i "super", które są potoczne i zakładają bliższą relację. Przy formie Pan/Pani dochodzi "Oczywiście". Dopiero bot mówiący na "ty" może pozwolić sobie na "jasne", "pewnie" i "OK", zawsze z treścią. Którąkolwiek formę bot wybierze, powinna być jedna w całym kanale.

Forma bezosobowa ma dużą zaletę: nie trzeba zgadywać płci rozmówcy ani wybierać między "Pan/Pani" a "ty" (wybór formy uzasadnia sekcja 19.9.5). Ma też dwie pułapki. Pierwsza to efekt formularza, bo seria poleceń brzmi jak przesłuchanie. Pomaga przeplatanie poleceń pytaniem.

Źle: "Proszę podać numer zamówienia. Proszę podać kod pocztowy."  
Lepiej: "Jaki jest numer zamówienia?" (po odpowiedzi) "Dziękuję. Jeszcze kod pocztowy."

Druga pułapka to strona bierna w odmowie i w błędzie. Brzmi jak ściana, bo nikt się sprawą nie zajmuje.

Źle: "Zamówienie nie może zostać anulowane."  
Lepiej: "Zamówienie jest już spakowane, więc anulowanie wymaga konsultanta. Łączę."

Źle: "Nie znaleziono zamówienia."  
Lepiej: "Nie widzę zamówienia o tym numerze. Proszę podać go jeszcze raz, cyfra po cyfrze."

W obu przypadkach pomaga to samo: bot zwraca się do użytkownika bezosobowo, ale o sobie mówi w pierwszej osobie ("Sprawdzam", "Nie widzę", "Łączę"). Widać wtedy, że ktoś się sprawą zajmuje. Czas teraźniejszy i formy typu "Zapisane" pozwalają przy okazji ominąć formy z rodzajem ("zapisałam", "zapisałem").

Jedno zalecenie ma źródło zewnętrzne, choć nie badawcze. [Wytyczne Google dla projektantów rozmów](https://developers.google.com/assistant/conversation-design/acknowledgements?hl=pl) zalecają różnicowanie potwierdzeń i pomijanie części z nich, żeby rozmowa nie brzmiała monotonnie.

**W czacie.** Próg potoczności leży niżej: "OK" czy "jasne" uchodzą w rozmowie na "ty", o ile idzie za nimi treść. Zmienia się też czasownik, bo w czacie prosi się o wpisanie, a nie o podanie.

### 19.9.5. Pan, ty czy bezosobowo: forma zwracania się

Firma odpisuje klientowi na Twitterze: "Podaj numer usługi". Klient odpowiada: "O, to przeszliśmy na ty?". Firma chciała tylko dostać numer. Klient usłyszał coś jeszcze: decyzję o tym, jaka relacja ich łączy.

Polszczyzna wymusza tę decyzję przy każdym zwrocie do rozmówcy. Do wyboru są "ty", "pan" albo "pani", "państwo" oraz konstrukcja bezosobowa, która wybór omija ("proszę podać"). Językoznawcy nazywają te formy adresatywnymi. Angielskie "you" takiego wyboru nie wymaga, więc wzorce przenoszone z anglojęzycznych botów niczego tu nie rozstrzygają.

Wymianę z Twittera przytacza [Anna Tereszkiewicz](https://uwm.edu.pl/mkks/wp-content/uploads/04_Tereszkiewicz-A.pdf), która przeanalizowała 800 odpowiedzi ośmiu polskich firm na wiadomości klientów. Banki pisały "pan/pani", często z imieniem. Operatorzy telekomunikacyjni, firmy pocztowe i sklepy internetowe pisały głównie na "ty". Formy bywały mieszane w obrębie jednego profilu, a klienci reagowali w obie strony: jedni oburzali się na "ty", inni irytowali się na "pan".

O tym, kto ma prawo skracać dystans, pisze [Patrycja Pałka](https://socjolingwistyka.ijppan.pl/index.php/SOCJO/article/view/215). Na podstawie 1559 minut nagrań rozmów handlowych, materiałów szkoleniowych dla sprzedawców i wypowiedzi klientów z forów stwierdza, że skracanie dystansu przez sprzedawcę, czyli "ty", "pan" z imieniem albo zdrobnienia, jest niezgodne z polskim kodem kulturowym. Prawo do skrócenia dystansu ma ten, kto w rozmowie stoi wyżej, czyli klient. Podobnie radzą poradnie językowe. [Poradnia Uniwersytetu Warszawskiego](https://poradniajezykowa.uw.edu.pl/porady/zwrot-do-klienta/) odradza "ty" w korespondencji z klientem, bo taka forma "bardzo skraca dystans" i może zostać odebrana jako naruszenie prywatności. [Małgorzata Marcjanik](https://sjp.pwn.pl/poradnia/haslo/na-ty-czy-na-pan-pani;8967.html) zauważa, że "ty" rozpowszechnia się w reklamie i biznesie, ale eleganckie firmy zostają przy formach "pan", "pani", "państwo".

Reakcję na formę zmierzono dotąd w innych językach. [Ollier, Nißen i von Wangenheim](https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2021.691595/full) pokazali 284 osobom ze Szwajcarii chatbota ubezpieczyciela, który różnił się wyłącznie formą: "du" albo "Sie" po niemiecku, "tu" albo "vous" po francusku. Ocena zależała od języka, wieku i płci użytkownika. U osób niemieckojęzycznych forma grzecznościowa dawała oceny stabilne niezależnie od płci, a forma "ty" obniżała oceny starszych użytkowników, wyraźniej u mężczyzn. U osób francuskojęzycznych wzór był bardziej złożony i zależał jednocześnie od wieku i płci.

Szerszy obraz daje przegląd [de Hoop i Schoenmakersa](https://www.mdpi.com/2226-471X/10/10/267): wyniki badań nad formami adresatywnymi są mieszane i zależą od kontekstu. W przytaczanych tam badaniach, głównie niderlandzkich, forma "ty" podobała się bardziej w reklamach, a forma grzecznościowa była lepiej oceniana w mailach działu kadr i oczekiwana od marek postrzeganych jako kompetentne. Przegląd nie obejmuje żadnego języka słowiańskiego ani żadnego badania z voicebotem.

**Wniosek dla voicebota.** Za formą bezosobową przemawiają trzy rzeczy. Polska norma odradza firmie "ty" wobec klienta. Forma "pan/pani" wymaga znajomości płci, której voicebot na początku rozmowy zwykle nie zna, a pomyłka pada wtedy w pierwszym zdaniu. Wreszcie w jedynym znalezionym eksperymencie z botem forma grzecznościowa dawała u osób niemieckojęzycznych stabilne oceny, a "ty" obniżało je u starszych. Forma bezosobowa zachowuje dystans i nie wskazuje płci.

Trzeba przy tym pilnować gramatyki. "Podaj" to już forma "ty", podobnie jak "twoje zamówienie" i "wysłaliśmy ci". Bezosobowo jest dopiero "proszę podać", "zamówienie" i "kod został wysłany SMS-em".

| Forma | Przykład | Czego wymaga |
|---|---|---|
| Ty | "Podaj numer zamówienia." | Zgody klienta na skrócenie dystansu |
| Pan, pani | "Czy chce pani zmienić termin?" | Znajomości płci rozmówcy |
| Państwo | "Czy chcą państwo zmienić termin?" | Liczby mnogiej wobec jednej osoby |
| Bezosobowa | "Proszę podać numer zamówienia." | Pilnowania pułapek z sekcji 19.9.4 |

Ograniczenie: nie udało się znaleźć badania, które mierzyłoby reakcję na formę bezosobową, ani żadnego badania form adresatywnych w voicebocie lub po polsku. Wniosek opiera się na opisie normy i na eksperymencie z czatem w innych językach.

**Z praktyki.** Przykłady w tym podręczniku stosują formę bezosobową. Voicebot sklepu internetowego mówi "proszę podać", a o sobie w pierwszej osobie i w czasie teraźniejszym ("Sprawdzam", "Łączę").

**W czacie.** Forma "ty" jest tu częstsza: w badaniu Tereszkiewicz dominowała u firm spoza bankowości. Eksperyment szwajcarski pokazuje jej koszt u starszych użytkowników. Marka, która mimo to wybiera "ty", powinna trzymać się jednej formy w całym kanale, bo mieszanie form samo wywoływało reakcje klientów.

**W e-mailu.** Poradnia Uniwersytetu Warszawskiego zaleca formę "pan/pani", gdy wiadomo, do kogo się pisze, a "Szanowni Państwo" w wiadomościach niespersonalizowanych. W mailu imię i nazwisko adresata są zwykle znane z zamówienia, więc forma "pan/pani" jest dostępna częściej niż w rozmowie telefonicznej.

### 19.9.6. Kiedy krótko wystarczy

Z tego wszystkiego nie wynika, że voicebot ma mówić długo. [Haas i in.](https://dl.acm.org/doi/fullHtml/10.1145/3491102.3517684) w badaniu "Keep it Short" dali 71 osobom przeglądarkowego asystenta głosowego, który na osiem poleceń i pytań odpowiadał w jednym z trzech stylów. Pełnym zdaniem: "Okay, I set a timer to 10 minutes. Starting now." Słowami kluczowymi: "Timer, 10 minutes." Albo minimalnie: "Okay."

Styl słów kluczowych wybierano najczęściej w pięciu z ośmiu zadań. Oceniano go jako podobnie użyteczny i sympatyczny jak pełne zdania, a zajmował około dwóch trzecich ich czasu. Wyraźnego zwycięzcy nie było: przy kilku zadaniach, między innymi przy kalendarzu i przypomnieniu, lepiej oceniano pełne zdania.

Najciekawszy jest los samego "Okay." Przy ustawianiu minutnika i przypomnienia budziło brak zaufania, bo nie dawało informacji zwrotnej. Pięć osób powiedziało wprost, że chce, by asystent powtarzał parametry polecenia, bo wtedy wiadomo, czy dobrze je zrozumiał. Styl słów kluczowych tę informację dawał, i to w trzech słowach.

**Wniosek dla voicebota.** Krótko nie znaczy pusto. Najkrótsza dobra odpowiedź to ta, która zawiera rozpoznany szczegół. Krótkość szkodzi wtedy, gdy komunikat dotyka czegoś ważnego dla użytkownika, a nie mówi, co bot zrozumiał albo zrobił.

Ograniczenia: badanie prowadzono online, po angielsku, na prostych poleceniach domowego asystenta. Autorzy przypuszczają, że na oceny wpływały przyzwyczajenia do asystentów, których uczestnicy używali na co dzień.

**Z praktyki.**

| Typ komunikatu | Czy krótko wystarczy | Co dodać |
|---|---|---|
| Wykonanie polecenia | Tak | Rozpoznany szczegół albo krótki wynik |
| Potwierdzenie danych lub terminu | Nie | Powtórzony szczegół |
| Odmowa | Nie | Powód albo następny krok |
| Błąd rozumienia | Nie | Co dokładnie powtórzyć |
| Oczekiwanie | Nie | Co się dzieje |

Źle: "Nie rozumiem."  
Lepiej: "Nie mam pewności co do końcówki. Proszę powtórzyć trzy ostatnie cyfry."

Źle: "Nie ma takiej opcji."  
Lepiej: "Tego nie zmienię automatycznie. Połączę z konsultantem."

Źle: "Proszę czekać."  
Lepiej: "Sprawdzam, to potrwa chwilę."

### 19.9.7. Voicebot a czat: co się zmienia, gdy rozmowę widać

Czat jest kanałem najbliższym voicebotowi. To też rozmowa prowadzona tura po turze, z tym samym klientem i w tych samych sprawach. Dlatego najłatwiej pomylić jedno z drugim i przenieść teksty z czatu do głosu. Sekcja 2.2 przestrzega przed tym od strony projektu. Tutaj widać, dlaczego nie działa to także od strony odbioru.

Czat nie ma tonu, ale ma własne środki, które go zastępują. Pierwszym jest interpunkcja. Zespół Celii Klin badał jednowyrazowe odpowiedzi w wiadomościach tekstowych, takie jak "yup", z kropką i bez niej. Jak streszczają to [Poirier, Cook i Klin](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1410698/full), kropka sprawiała, że czytelnicy odbierali wiadomość jako mniej szczerą albo bardziej szorstką. Efektu nie było, gdy te same odpowiedzi pokazano jako odręczne notatki.

Drugim środkiem są emoji. [Li, Chan i Kim](https://doi.org/10.1093/jcr/ucy016) stwierdzili, że pracownicy obsługi używający emotikonów są odbierani jako cieplejsi, ale mniej kompetentni. W badaniu ["Emojifying chatbot interactions"](https://dl.acm.org/doi/10.1016/j.tele.2023.102071) emoji podnosiły postrzegane ciepło bota i satysfakcję, lecz nie kompetencję, a efekt był słabszy niż u ludzi.

Trzecia różnica to trwałość. Wiadomość zostaje na ekranie, więc szorstka odpowiedź nie przemija. Użytkownik może jednak do niej wrócić i niczego nie musi pamiętać (sekcja 19.4).

**Wniosek dla voicebota.** Voicebot nie ma żadnego z tych środków. Nie postawi emoji, nie pokaże listy i nie zostawi niczego do ponownego przeczytania. Zostają mu słowa, melodia i czas. To, co w czacie załatwia znak albo układ wiadomości, w głosie musi załatwić sformułowanie: powód, następny krok, powtórzony szczegół.

| Cecha | Voicebot | Czat |
|---|---|---|
| Ton | Jest zawsze; wybiera go syntezator | Nie ma go; klient dopowiada go sam |
| Czas odpowiedzi | Cisza brzmi jak niechęć albo awaria | Krótkie opóźnienie bywa akceptowalne |
| Trwałość | Komunikat przemija | Komunikat zostaje na ekranie |
| Liczba opcji | Ograniczona tym, co da się zapamiętać | Większa, bo opcje można pokazać |
| Co łagodzi krótki komunikat | Sformułowanie i prozodia | Sformułowanie, interpunkcja, emoji |
| Prośba o dane | "Proszę podać" | "Proszę wpisać" |

### 19.9.8. Checklista krótkich komunikatów

- Czy potwierdzenie powtarza szczegół, o który pytał użytkownik?
- Czy odmowa i błąd mają powód albo następny krok?
- Czy bot nie odpowiada samym "jasne", "tak" lub "nie"?
- Czy słowa potwierdzenia pasują do rejestru bota?
- Czy bot trzyma się jednej formy zwracania się i nie wpada w "ty" ("podaj", "twoje zamówienie")?
- Czy krótkie komunikaty oceniono ze słuchu, a nie ze skryptu?
- Czy potwierdzenie pada bez wyraźnej ciszy przed odpowiedzią?
- Czy przy dłuższym przetwarzaniu bot najpierw sygnalizuje działanie?
- Czy żaden komunikat nie trafił z czatu do głosu bez odsłuchania?

---

## 19.10. Różnice indywidualne użytkowników

Przeciętny użytkownik nie istnieje. Poniższe cztery grupy pokazują, gdzie ta sama rozmowa najczęściej się rozjeżdża.

### 19.10.1. Osoby starsze

[Hu i in.](https://arxiv.org/abs/2203.15767) sprawdzili w domach piętnastu osób w wieku od 61 do 86 lat dwie wersje asystenta głosowego z ekranem: grzeczną, z rozbudowanymi formami uprzejmości, i bezpośrednią. Przez dziesięć dni nie znaleźli istotnych różnic w satysfakcji, czasie interakcji ani wykonaniu zadań. Różnili się za to sami użytkownicy. Część chwaliła, że system "nie jest taki robotyczny". Inni nazywali uprzejmość zbędną i dziwną, a jedna osoba omijała komunikaty głosowe ekranem dotykowym, żeby było szybciej. Autorzy wyróżnili cztery typy użytkowników i zwracają uwagę, że na odbiór wpływały także ton i tempo głosu, a nie tylko dobór słów.

Drugie badanie dotyczy tempa rozmowy. [Liu i in.](https://doi.org/10.1145/3706598.3714228) zalecają na podstawie rozmów ze starszymi osobami proste zdania bez wtrąceń i żargonu oraz czas oczekiwania dopasowany do rozmówcy: jeśli ktoś często robi pauzy albo mówi "yyy", bot powinien czekać dłużej, zanim uzna wypowiedź za skończoną.

**Wniosek dla voicebota.** "Osoby starsze" nie są jedną grupą o jednym guście. Bezpieczniej dopasowywać tempo i cierpliwość bota do zachowania rozmówcy, niż zakładać z góry, że starszy rozmówca chce więcej uprzejmości.

**Z praktyki.** Wolniejsze tempo, więcej czasu na odpowiedź, proste słowa, opcja konsultanta.

### 19.10.2. Osoby neuroatypowe

Nie udało się znaleźć badania o rozmowach osób neuroatypowych z voicebotami, które dałoby się tu rzetelnie przytoczyć.

**Z praktyki.** Przewidywalna struktura, brak presji, jednoznaczne pytania, brak ironii.

### 19.10.3. Osoby z wadami mowy i słuchu

[Lea i in.](https://arxiv.org/abs/2302.09044) zapytali 61 osób jąkających się o doświadczenia z rozpoznawaniem mowy. Badani chcieli z niego korzystać, ale mówili, że system często ucina im wypowiedź, źle ich rozumie albo zapisuje coś innego, niż chcieli powiedzieć. Autorzy pokazali też, że da się to poprawić po stronie systemu: po zmianach technicznych system ucinał wypowiedzi o 79,1% rzadziej, a odsetek błędnie rozpoznanych słów spadł z 25,4% do 9,9%.

Błędy rozpoznawania nie rozkładają się równo także między innymi grupami. [Koenecke i in.](https://pmc.ncbi.nlm.nih.gov/articles/PMC7149386) sprawdzili pięć komercyjnych systemów rozpoznawania mowy na nagraniach osób mówiących po angielsku w USA. Średni odsetek błędnych słów wynosił 0,35 dla mówców czarnoskórych i 0,19 dla białych. Dla języka polskiego nie udało się znaleźć podobnego pomiaru.

**Wniosek dla voicebota.** Dla części użytkowników problemem nie jest scenariusz, tylko próg ciszy, po którym bot uznaje, że wypowiedź się skończyła. Próg ustawiony pod płynnie mówiących ucina tych, którzy mówią z przerwami. Jakość rozpoznawania warto mierzyć osobno dla grup rozmówców, a nie tylko jako średnią.

**Z praktyki.** DTMF, SMS, powtórzenie, handoff.

### 19.10.4. Osoby nieufne wobec automatyzacji

Jak pokazuje sondaż z sekcji 19.3, to w Polsce większość: w pełni ufa botom 8,1% badanych, a 19,9% nie ufa im wcale. Z eksperymentu Luo i in. (sekcja 19.7) wiadomo też, że klient, który wie, że rozmawia z botem, bywa oschły i uważa bota za mniej kompetentnego.

**Z praktyki.** Transparentność, szybkie podanie zakresu, konsultant bez walki.

---

## 19.11. Psychologia zaufania do AI

Celem nie jest największe możliwe zaufanie. [Lee i See](https://scispace.com/pdf/trust-in-automation-designing-for-appropriate-reliance-2uiy4o89ga.pdf) nazywają kalibracją zgodność między zaufaniem człowieka a rzeczywistymi możliwościami automatu. Zaufanie większe niż możliwości prowadzi do nadużycia: człowiek polega na systemie tam, gdzie nie powinien. Zaufanie mniejsze niż możliwości prowadzi do zaniechania: człowiek odrzuca system także tam, gdzie ten działa dobrze. Oba błędy kosztują.

**Wniosek dla voicebota.** Nadużycie to klient, który przyjmuje błędną odpowiedź bota za pewną. Zaniechanie to klient, który od pierwszego słowa żąda konsultanta w sprawie, którą bot załatwiłby w pół minuty. Bot kalibruje zaufanie tym, jak mówi o własnych granicach.

**Z praktyki.** Voicebot powinien unikać dwóch skrajności: nadmiernej pewności i zbyt częstego bezradnego fallbacku.

"Nie mam wystarczających danych, żeby to ocenić. Mogę sprawdzić status sprawy albo połączyć z konsultantem."

---

## 19.12. Psychologiczne metryki jakości rozmowy

**Z praktyki.** Poniższe miary uzupełniają metryki techniczne o to, jak rozmowę odebrał człowiek. Szerzej opisuje je sekcja 11.9.

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

Dwie z tych miar mają oparcie w źródłach z tego rozdziału. Wysiłek klienta jako miarę wprowadzili [Dixon, Freeman i Toman](https://hbr.org/2010/07/stop-trying-to-delight-your-customers), którzy twierdzą, że przewiduje on lojalność lepiej niż satysfakcja i wskaźnik NPS. Ocena zaufania ma sens dopiero w zestawieniu z faktyczną skutecznością bota, bo zgodnie z pojęciem kalibracji (sekcja 19.11) wysokie zaufanie do słabego bota jest problemem, a nie sukcesem.

Bibliografia podręcznika wymienia też gotowe kwestionariusze do oceny systemów mowy, między innymi SASSI i skalę SUS zweryfikowaną dla interfejsów głosowych. Nie były one sprawdzane w ramach tego rozdziału.

---

## 19.13. Praktyczne narzędzia psychologiczne

Narzędzia w tej sekcji są zapisem praktyki. Przy każdym wskazano sekcję, która podaje dla niego podstawę.

### 19.13.1. Checklista redukcji frustracji

- Czy bot pyta jednoznacznie? (19.6)
- Czy nie powtarza tego samego? (19.6)
- Czy pozwala poprawić? (19.6)
- Czy pozwala przerwać? (rozdział 4)
- Czy daje człowieka? (19.3)
- Czy nie obwinia użytkownika? (19.6)

### 19.13.2. Matryca emocji i reakcji

| Emocja | Sygnał | Reakcja bota |
|---|---|---|
| Pośpiech | "szybko" | Skróć i przejdź do celu |
| Irytacja | "już mówiłem" | Nie powtarzaj, uznaj i napraw |
| Lęk | pytania o konsekwencje | Wyjaśnij spokojnie, bez przesady |
| Złość | agresja | Skróć i eskaluj |
| Niepewność | cisza, "nie wiem" | Podaj przykład lub alternatywę |

Reakcja na złość ma oparcie w badaniach z sekcji 19.5: przy rozzłoszczonym kliencie uczłowieczanie i empatia bota szkodziły, a autorzy radzą przekazać takiego klienta człowiekowi.

### 19.13.3. Zdania, których bot powinien unikać

- "Doskonale rozumiem, co pan czuje." (19.5)
- "To bardzo proste." (19.6)
- "Musi pan..."
- "Niepoprawna odpowiedź." (19.6)
- "Proszę słuchać uważnie." (19.6)
- "Nie ma potrzeby rozmowy z konsultantem." (19.3)

---

## 19.14. Przykłady projektowe

Poniższe sytuacje są scenariuszami ilustrującymi zasady z rozdziału. Nie są opisami wdrożeń i nie stoją za nimi zmierzone wyniki.

### 19.14.1. Użytkownik nie ufa botowi

Błąd: bot udaje człowieka.  
Poprawa: transparentność i zakres.

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

Bot: "Dobrze. Łączę z konsultantem."

### 19.14.5. Użytkownik z problemem wrażliwym

Błąd: bot próbuje doradzać.  
Poprawa: granica i bezpieczny kanał.

Bot: "Nie mogę ocenić tej sytuacji automatycznie. Połączę z osobą, która może pomóc."

---

## 19.15. Zbiorcza checklista rozdziału

- Czy bot mówi na początku, co potrafi?
- Czy zaufanie do bota odpowiada temu, co bot realnie robi?
- Czy wypowiedzi są na tyle krótkie, żeby dało się je zapamiętać?
- Czy użytkownik wie, jak poprawić, przerwać i przejść do człowieka?
- Czy bot naprawia błędy pytaniem zawężonym i bez obwiniania?
- Czy na złość reaguje działaniem, a nie deklaracją empatii?
- Czy odmowa jest podana tak samo wyraźnie jak zgoda?
- Czy brzmienie bota nie obiecuje więcej, niż bot potrafi?
- Czy próg ciszy i tempo uwzględniają osoby mówiące wolniej i z przerwami?
- Czy sytuacje wrażliwe są eskalowane?

---

## 19.16. Źródła i status weryfikacji

Weryfikacja polegała na przeszukaniu tekstu źródła pod kątem konkretnych twierdzeń i liczb, z żądaniem dosłownych cytatów. Nie zastępuje to redakcyjnego sprawdzenia cytowań przed publikacją, w tym numerów stron. Większość badań dotyczy języka angielskiego, a część rozmów między ludźmi, nie z botem; zaznaczono to w tekście tam, gdzie ogranicza wniosek.

Sprawdzone w pełnym tekście:

- Bavelas, Coates, Johnson, "Listeners as Co-Narrators", Journal of Personality and Social Psychology, 2000: https://pubmed.ncbi.nlm.nih.gov/11138763
- Crolic, Thomaz, Hadi, Stephen, "Blame the Bot: Anthropomorphism and Anger in Customer-Chatbot Interactions", Journal of Marketing, 2022: https://ora.ox.ac.uk/objects/uuid:73d46bba-35d1-465c-be00-aa6f4f4ccb84
- Dingemanse et al., "Universal Principles in the Repair of Communication Problems", PLOS ONE, 2015: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0136100
- Gnewuch, Morana, Adam, Maedche, "Opposing Effects of Response Time in Human-Chatbot Interaction", Business & Information Systems Engineering, 2022: https://aisel.aisnet.org/bise/vol64/iss6/5/
- Haas, Rietzler, Jones, Rukzio, "Keep it Short: A Comparison of Voice Assistants' Response Behavior", CHI 2022: https://dl.acm.org/doi/fullHtml/10.1145/3491102.3517684
- Hu, Qu, Maus, Mutlu, "Polite or Direct? Conversation Design of a Smart Display for Older Adults Based on Politeness Theory", CHI 2022: https://arxiv.org/abs/2203.15767
- Kruger, Epley, Parker, Ng, "Egocentrism Over E-Mail: Can We Communicate as Well as We Think?", Journal of Personality and Social Psychology, 2005: https://doi.org/10.1037/0022-3514.89.6.925
- Lee, See, "Trust in Automation: Designing for Appropriate Reliance", Human Factors, 2004: https://scispace.com/pdf/trust-in-automation-designing-for-appropriate-reliance-2uiy4o89ga.pdf
- Levinson, Torreira, "Timing in turn-taking and its implications for processing models of language", Frontiers in Psychology, 2015: https://www.frontiersin.org/articles/10.3389/fpsyg.2015.00731/full
- Liu et al., "Toward Enabling Natural Conversation with Older Adults via the Design of LLM-Powered Voice Agents that Support Interruptions and Backchannels", CHI 2025: https://doi.org/10.1145/3706598.3714228
- de Hoop, Schoenmakers, "Introduction: Perception and Processing of Address Terms", Languages, 2025 (przegląd badań): https://www.mdpi.com/2226-471X/10/10/267
- Luger, Sellen, "Like Having a Really Bad PA: The Gulf between User Expectation and Experience of Conversational Agents", CHI 2016: https://www.microsoft.com/en-us/research/publication/like-having-a-really-bad-pa-the-gulf-between-user-expectation-and-experience-of-conversational-agents/
- Ollier, Nißen, von Wangenheim, "The Terms of 'You(s)': How the Term of Address Used by Conversational Agents Influences User Evaluations in French and German Linguaculture", Frontiers in Public Health, 2022: https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2021.691595/full
- Owens et al., "Exploring Deceptive Design Patterns in Voice Interfaces", EuroUSEC 2022: https://www.franziroesner.com/pdf/owens-deceptivevoice-eurousec22.pdf
- Pałka, "Polski model kulturowy a komunikacja sprzedawcy z klientem", Socjolingwistyka, 2020: https://socjolingwistyka.ijppan.pl/index.php/SOCJO/article/view/215
- Poirier, Cook, Klin, "Read. This. Slowly: mimicking spoken pauses in text messages", Frontiers in Psychology, 2025 (streszcza wcześniejsze prace zespołu: Gunraj et al. 2016, Houghton et al. 2018): https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1410698/full
- Roberts, Francis, Morgan, "The interaction of inter-turn silence with prosodic cues in listener perceptions of 'trouble' in conversation", Speech Communication, 2006: https://doi.org/10.1016/j.specom.2006.02.001
- Schroeder, Kardas, Epley, "The Humanizing Voice: Speech Reveals, and Text Conceals, a More Thoughtful Mind in the Midst of Disagreement", Psychological Science, 2017: https://escholarship.org/uc/item/4bd9d03k
- Templeton et al., "Fast response times signal social connection in conversation", PNAS, 2022: https://www.pnas.org/doi/10.1073/pnas.2116915119
- Tereszkiewicz, "Zachowania grzecznościowe w interakcji handlowej na Twitterze" (czasopismo i rok do uzupełnienia): https://uwm.edu.pl/mkks/wp-content/uploads/04_Tereszkiewicz-A.pdf

Sprawdzone tylko w abstrakcie lub opisie wydawcy:

- Ashktorab, Jain, Liao, Weisz, "Resilient Chatbots: Repair Strategy Preferences for Conversational Breakdowns", CHI 2019: https://research.ibm.com/publications/resilient-chatbots-repair-strategy-preferences-for-conversational-breakdowns
- Commarford, Lewis, Smither, Gentzler, "A Comparison of Broad Versus Deep Auditory Menu Structures", Human Factors, 2008: https://doi.org/10.1518/001872008x250665
- Dixon, Freeman, Toman, "Stop Trying to Delight Your Customers", Harvard Business Review, 2010 (dostępne tylko streszczenie): https://hbr.org/2010/07/stop-trying-to-delight-your-customers
- "Emojifying chatbot interactions", Telematics and Informatics: https://dl.acm.org/doi/10.1016/j.tele.2023.102071
- Han, Yin, Zhang, "Chatbot Empathy in Customer Service: When It Works and When It Backfires", SIGHCI 2022 Proceedings (praca wstępna): https://aisel.aisnet.org/sighci2022/1/
- Koenecke et al., "Racial disparities in automated speech recognition", PNAS, 2020: https://pmc.ncbi.nlm.nih.gov/articles/PMC7149386
- Lea et al., "From User Perceptions to Technical Improvement: Enabling People Who Stutter to Better Use Speech Recognition", CHI 2023: https://arxiv.org/abs/2302.09044
- Leahy, Sweller, "Cognitive load theory, modality of presentation and the transient information effect", Applied Cognitive Psychology, 2011: https://researchers.mq.edu.au/en/publications/cognitive-load-theory-modality-of-presentation-and-the-transient-/
- Li, Chan, Kim, "Service with Emoticons", Journal of Consumer Research, 2019: https://doi.org/10.1093/jcr/ucy016
- Luo, Tong, Fang, Qu, "Machines vs. Humans: The Impact of Artificial Intelligence Chatbot Disclosure on Customer Purchases", Marketing Science, 2019: https://econpapers.repec.org/RePEc:inm:ormksc:v:38:y:2019:i:6:p:937-947
- Nass, Moon, "Machines and Mindlessness: Social Responses to Computers", Journal of Social Issues, 2000: https://spssi.onlinelibrary.wiley.com/doi/10.1111/0022-4537.00153
- Roberts, Francis, "Identifying a temporal threshold of tolerance for silent gaps after requests", Journal of the Acoustical Society of America, 2013: https://pubmed.ncbi.nlm.nih.gov/23742442
- Shiwa et al., "How Quickly Should Communication Robots Respond?", Journal of the Robotics Society of Japan, 2009 (pełny tekst po japońsku): https://www.jstage.jst.go.jp/article/jrsj/27/1/27_1_87/_article/-char/en

Znane tylko z komunikatu prasowego:

- Yin, Han, Zhang, "Bots with Empathy: Reactance Against Emotion-Aware AI Agents in Customer Service", MIS Quarterly, 2026 (komunikat uczelni; artykuł niesprawdzony): https://www.usf.edu/business/news/2026/04-20-chatbot-empathy-can-worsen-customer-reactions-usf-study.aspx
- Armatis Customer Experience Index, sondaż SW Research, czerwiec 2025, n = 817 (omówienie prasowe): https://300gospodarka.pl/news/boty-w-obsludze-klienta-wiecej-kontaktow-mniej-frustracji-ale-zaufania-wciaz-brak

Wytyczne projektowe, porady językowe i tło teoretyczne:

- Google, Conversation Design, "Acknowledgements": https://developers.google.com/assistant/conversation-design/acknowledgements?hl=pl
- Poradnia Językowa Uniwersytetu Warszawskiego, "Zwrot do klienta" (odp. Agata Hącia, 2021): https://poradniajezykowa.uw.edu.pl/porady/zwrot-do-klienta/
- Poradnia Językowa PWN, "Na ty czy na Pan / Pani?" (odp. Małgorzata Marcjanik, 2008): https://sjp.pwn.pl/poradnia/haslo/na-ty-czy-na-pan-pani;8967.html
- Roman Jakobson, "Linguistics and Poetics", 1960 (pol. "Poetyka w świetle językoznawstwa"); nieweryfikowane w tekście źródłowym.

Luki, których nie udało się wypełnić źródłami:

- odbiór słów potwierdzenia przez użytkowników polskojęzycznych, w głosie i w czacie;
- reakcja na formę bezosobową oraz na formy adresatywne w voicebocie i w języku polskim;
- wpływ empatii wyrażanej przez voicebota (dostępne badania dotyczą chatbotów tekstowych);
- próg tolerancji ciszy wobec bota, o którym użytkownik wie, że jest botem;
- rozmowy osób neuroatypowych z voicebotami;
- jakość rozpoznawania mowy polskiej w różnych grupach użytkowników.
