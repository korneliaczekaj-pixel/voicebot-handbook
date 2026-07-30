# Voicebot Specialist Handbook

## Czesc 9: Integracje i automatyzacja procesow

Wersja robocza: 2026-07-29  
Kontynuacja plikow:

- `Voicebot_Specialist_Handbook_czesc_1.md`
- `Voicebot_Specialist_Handbook_czesc_2.md`
- `Voicebot_Specialist_Handbook_czesc_3.md`
- `Voicebot_Specialist_Handbook_czesc_4.md`
- `Voicebot_Specialist_Handbook_czesc_5.md`
- `Voicebot_Specialist_Handbook_czesc_6.md`
- `Voicebot_Specialist_Handbook_czesc_7.md`
- `Voicebot_Specialist_Handbook_czesc_8.md`

---

# Czesc VIII. Integracje i automatyzacja procesow

## Cel calej czesci

Voicebot bez integracji moze rozmawiac. Voicebot z dobrze zaprojektowanymi integracjami moze zalatwiac sprawy. Integracje sa tym miejscem, w ktorym conversation design spotyka sie z realnymi systemami organizacji: CRM, ERP, ticketingiem, kalendarzami, systemami platnosci, bazami klientow, systemami rezerwacji, contact center i narzedziami konsultantow.

Ta czesc pokazuje, jak projektowac integracje voicebota tak, aby byly bezpieczne, mierzalne, odporne na bledy i zrozumiale dla uzytkownika.

Po tej czesci czytelnik powinien umiec:

1. Wyjasnic role API, webhookow i integracji backendowych.
2. Projektowac wymagania integracyjne dla CRM, ERP, ticketingu, kalendarzy, platnosci i helpdesku.
3. Rozumiec weryfikacje uzytkownika, autoryzacje i minimalizacje danych.
4. Projektowac retry logic, timeouty, idempotency i fallbacki.
5. Zaprojektowac przekazanie kontekstu do konsultanta.
6. Tworzyc automatyczne notatki i podsumowania rozmow.
7. Okreslac, kiedy bot moze wykonac akcje, a kiedy powinien tylko przygotowac sprawe dla czlowieka.

Zrodla wspierajace czesc:

- Dokumentacje AWS Connect, Amazon Lex, Google Dialogflow CX i OpenAI Realtime jako odniesienie do praktycznych wzorcow voice agents, slotow, narzedzi, transferow, interruption i konfiguracji rozmow.
- W3C VoiceXML 2.0 jako historyczny fundament dialogow transakcyjnych, formularzy, eventow i input collection.
- Uzupelnienie eksperckie: architektura API, idempotency, handoff context, ticket automation, notes automation i enterprise integration governance.

---

# Rozdzial 1. API, webhooki i architektura integracji

## 1.1. Cele rozdzialu

Czytelnik nauczy sie:

- rozumiec podstawowa role API i webhookow w voicebocie;
- projektowac integracje pod rozmowe w czasie rzeczywistym;
- odrozniac odczyt danych od zapisu danych;
- wskazac typowe ryzyka integracyjne.

## 1.2. Kluczowe pojecia

| Pojecie | Definicja praktyczna |
|---|---|
| API | Interfejs pozwalajacy systemom wymieniac dane lub wykonywac akcje |
| Webhook | Wywolanie systemu w reakcji na zdarzenie, np. zakonczenie rozmowy |
| Endpoint | Konkretny adres/funkcja API |
| Request | Zapytanie do systemu |
| Response | Odpowiedz systemu |
| Timeout | Maksymalny czas oczekiwania na odpowiedz |
| Retry | Ponowienie zapytania po bledzie |
| Idempotency | Wlasciwosc lub mechanizm projektowy, dzieki ktoremu ponowienie tej samej akcji nie powinno utworzyc duplikatu |
| Rate limit | Ograniczenie liczby zapytan w czasie |
| Payload | Dane przesylane w request lub response |

## 1.3. Wyjasnienie eksperckie

Integracja voicebota jest trudniejsza niz integracja formularza, bo uzytkownik czeka w rozmowie. Jesli API odpowiada po 8 sekundach, w aplikacji webowej mozna pokazac spinner. W rozmowie telefonicznej pojawia sie cisza, niepewnosc i "halo?".

Podstawowe typy integracji:

1. Odczyt danych: status zamowienia, saldo, termin, lista wizyt.
2. Walidacja danych: czy numer zamowienia istnieje, czy kod SMS jest poprawny.
3. Zapis danych: zmiana adresu, rezerwacja, utworzenie ticketu.
4. Akcja zewnetrzna: wyslanie SMS-a, e-maila, linku, powiadomienia.
5. Handoff: przekazanie kontekstu do contact center.
6. Post-call automation: notatka, tagi, aktualizacja CRM.

Najwazniejsze rozroznienie:

- Odczyt danych moze byc wykonany przy nizszym ryzyku.
- Zapis danych i akcje transakcyjne wymagaja walidacji, autoryzacji, potwierdzenia i audytu.

## 1.4. Perspektywa biznesowa

Integracje decyduja, czy bot tworzy realna wartosc. Voicebot, ktory rozpoznaje intencje, ale nie ma dostepu do systemu zrodlowego, bedzie konczyl rozmowy komunikatem "w tej sprawie prosze skontaktowac sie z konsultantem". To moze byc pomocne jako routing, ale nie jest pelna automatyzacja.

Pytania biznesowe:

- Czy bot ma tylko informowac, czy wykonywac akcje?
- Ktore akcje sa dozwolone automatycznie?
- Ktore wymagaja czlowieka?
- Ktore dane mozna odczytac glosem?
- Ktore dane powinny byc wyslane SMS-em lub e-mailem?
- Co oznacza sukces integracji?

## 1.5. Perspektywa uzytkownika

Uzytkownik odczuwa integracje jako sprawczosc:

- "Bot znalazl moje zamowienie."
- "Bot zmienil termin."
- "Bot wyslal link."
- "Konsultant wie, o co chodzi."

Nie odczuwa API. Odczuwalny jest tylko wynik i sposob komunikacji przy oczekiwaniu lub bledzie.

## 1.6. Perspektywa technologiczna

Kazda integracja powinna miec specyfikacje:

| Element | Pytanie |
|---|---|
| Cel | Po co bot wywoluje API? |
| System | Jaki system jest zrodlem prawdy? |
| Owner | Kto odpowiada za system? |
| Dane wejsciowe | Jakie sloty sa wymagane? |
| Dane wyjsciowe | Co wraca do bota? |
| Timeout | Ile bot moze czekac? |
| Retry | Czy ponawiamy? Ile razy? |
| Idempotency | Czy akcja zapisujaca jest bezpieczna przy ponowieniu? |
| Bledy | Jakie sa kody bledow i komunikaty? |
| Audyt | Co logujemy? |
| Prywatnosc | Co maskujemy? |

## 1.7. Dobre praktyki

- Projektuj integracje przed finalnym dialogiem.
- Oddziel odczyt od zapisu.
- Dla zapisow stosuj idempotency.
- Ustal timeouty z perspektywy rozmowy.
- Mapuj bledy techniczne na zrozumiale komunikaty.
- Nie wypowiadaj danych wrazliwych bez potrzeby.
- Testuj sandbox i produkcyjny kanal.
- Loguj request ID, wynik i czas odpowiedzi.

## 1.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Projekt dialogu bez znajomosci API | Flow obiecuje rzeczy niewykonalne |
| Brak timeoutow | Martwa cisza w rozmowie |
| Brak idempotency | Duplikaty rezerwacji lub ticketow |
| Jeden komunikat dla wszystkich bledow | Uzytkownik nie wie, co sie stalo |
| Brak wlasciciela integracji | Problemy utrzymaniowe |
| Brak sandboxa | Testy sa ryzykowne |

## 1.9. Checklista integracji API

- Czy system zrodlowy jest wskazany?
- Czy API istnieje?
- Czy znamy wlasciciela?
- Czy mamy sandbox?
- Czy znamy wymagane dane?
- Czy znamy timeout?
- Czy znamy bledy?
- Czy akcje zapisujace sa idempotentne?
- Czy dane wrazliwe sa maskowane?
- Czy bot ma komunikat na awarie?

## 1.10. Mini case study

Voicebot rezerwacyjny mogl utworzyc wizyte, ale API kalendarza czasem odpowiadalo po utworzeniu wpisu dopiero po kilku sekundach. Bot ponawial request i tworzyl duplikaty. Po dodaniu `idempotency_key` opartego na `conversation_id`, pacjencie i terminie, ponowienie zwracalo istniejaca rezerwacje zamiast tworzyc nowa.

## 1.11. Cwiczenia

1. Przygotuj specyfikacje API dla statusu zamowienia.
2. Wypisz bledy API dla zmiany adresu.
3. Zaprojektuj komunikat po timeout.
4. Wskaz, gdzie potrzebna jest idempotency.

## 1.12. Podsumowanie

API i webhooki sa mostem miedzy rozmowa a procesem. Dobra integracja jest szybka, bezpieczna, audytowalna i zaprojektowana pod rytm rozmowy glosowej.

---

# Rozdzial 2. CRM, ERP, ticketing, helpdesk, kalendarze i systemy rezerwacyjne

## 2.1. Cele rozdzialu

Czytelnik nauczy sie:

- rozumiec typowe systemy integrowane z voicebotem;
- wskazac, jakie dane i akcje zwykle sa potrzebne;
- projektowac integracje wedlug typu procesu;
- unikac nadmiernego zakresu integracyjnego.

## 2.2. Kluczowe systemy

| System | Typowe uzycie w voicebocie |
|---|---|
| CRM | Dane klienta, historia kontaktu, segment, zgody |
| ERP | Zamowienia, faktury, produkty, operacje biznesowe |
| OMS | Order Management System, status zamowien i dostaw |
| Ticketing | Tworzenie i aktualizacja zgloszen |
| Helpdesk IT | Incydenty, kategorie, priorytety, baza uzytkownikow |
| Kalendarz/rezerwacje | Wizyty, dostepne terminy, zmiany, odwolania |
| Platnosci | Linki do platnosci, status platnosci, deklaracje |
| Knowledge base | Odpowiedzi informacyjne, procedury, instrukcje |
| Contact center | Kolejki, transfery, agent desktop, nagrania |

## 2.3. Wyjasnienie eksperckie

Kazdy system ma inna role:

- CRM mowi, kim jest klient i jaka ma historie.
- ERP lub OMS mowi, jaki jest stan procesu.
- Ticketing zapisuje sprawe do dalszej obslugi.
- Kalendarz pozwala zarezerwowac termin.
- Contact center przejmuje rozmowe.
- Baza wiedzy wyjasnia procedury.

Voicebot nie powinien laczyc sie ze wszystkim naraz tylko dlatego, ze to mozliwe. Zakres integracji powinien wynikac z use case'u.

Przyklad dla statusu zamowienia:

Wymagane:

- identyfikacja klienta;
- OMS/status zamowienia;
- SMS/e-mail confirmation opcjonalnie;
- handoff do contact center.

Niewymagane na start:

- pelny ERP;
- system reklamacji;
- platnosci;
- marketing automation.

## 2.4. Perspektywa biznesowa

Integracje sa czesto najdrozszym i najbardziej ryzykownym elementem projektu. Warto odrozniac:

- integracje konieczne do MVP;
- integracje zwiekszajace wartosc;
- integracje, ktore mozna zastapic ticketem;
- integracje przyszlosciowe.

Dobre pytanie:

"Czy bez tej integracji bot nadal dostarczy wartosc w MVP?"

## 2.5. Perspektywa uzytkownika

Uzytkownik nie chce wiedziec, z ilu systemow korzysta bot. Chce, aby odpowiedz byla spojna. Jesli CRM mowi co innego niz system zamowien, bot musi miec regule zrodla prawdy albo przekazac sprawe do czlowieka.

## 2.6. Perspektywa technologiczna

Typowe dane i akcje:

| Use case | Dane | Akcje |
|---|---|---|
| Status zamowienia | order_id, status, ETA | odczyt statusu, SMS |
| Zmiana wizyty | pacjent, dostepne sloty | rezerwacja, zmiana, anulowanie |
| Helpdesk | user_id, asset, category | ticket, reset, instrukcja |
| Reklamacja | klient, produkt, powod | ticket, zalaczniki poza kanalem |
| Platnosc | saldo, link, status | wyslanie linku, deklaracja |

## 2.7. Dobre praktyki

- Wybierz system zrodlowy dla kazdego typu danych.
- Nie powielaj logiki biznesowej w wielu miejscach.
- Dla ticketingu okresl minimalne pola wymagane.
- Dla kalendarzy sprawdz konflikt terminow tuz przed zapisem.
- Dla CRM minimalizuj dane wypowiadane glosem.
- Dla helpdesku nie zbieraj hasel.
- Dla platnosci unikaj wypowiadania wrazliwych danych.

## 2.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Integracja ze zlym systemem zrodlowym | Nieaktualne dane |
| Zbyt szeroki zakres integracji | Opoznienia projektu |
| Brak minimalnych pol ticketu | Zgloszenia bezuzyteczne |
| Brak reguly konfliktu kalendarza | Podwojne rezerwacje |
| Odczytywanie nadmiaru danych z CRM | Ryzyko prywatnosci |

## 2.9. Checklista systemow

- Czy wiemy, ktory system jest zrodlem prawdy?
- Czy dane sa aktualne?
- Czy API pozwala na potrzebna akcje?
- Czy akcja ma walidacje?
- Czy system ma sandbox?
- Czy sa limity i SLA?
- Czy mamy wlasciciela systemu?
- Czy bledy sa opisane?
- Czy dane sa minimalizowane?

## 2.10. Mini case study

Voicebot helpdeskowy tworzyl tickety, ale konsultanci musieli je przepisywac, bo brakowalo kategorii, priorytetu i lokalizacji uzytkownika. Po analizie ticketingu dodano wymagane sloty i mapowanie kategorii. Bot nie tylko tworzyl ticket, ale tworzyl ticket uzyteczny.

## 2.11. Cwiczenia

1. Dla use case'u rezerwacji wypisz potrzebne systemy.
2. Oznacz integracje MVP i integracje pozniejsze.
3. Zaprojektuj minimalny ticket reklamacyjny.
4. Wskaz system zrodlowy dla statusu klienta.

## 2.12. Podsumowanie

Integracje powinny byc projektowane wedlug procesu, nie wedlug ambicji technologicznej. Dobry voicebot korzysta z tylu systemow, ile potrzeba, aby bezpiecznie i skutecznie zalatwic sprawe.

---

# Rozdzial 3. Weryfikacja uzytkownika, autoryzacja i minimalizacja danych

## 3.1. Cele rozdzialu

Czytelnik nauczy sie:

- odrozniac identyfikacje, weryfikacje i autoryzacje;
- projektowac procesy z danymi osobowymi;
- minimalizowac dane wypowiadane i logowane;
- rozumiec ryzyka w kanale glosowym.

## 3.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Identyfikacja | Ustalenie, kim prawdopodobnie jest uzytkownik |
| Weryfikacja | Potwierdzenie tozsamosci uzytkownika |
| Autoryzacja | Sprawdzenie, czy uzytkownik moze wykonac dana akcje |
| MFA | Multi-factor authentication |
| PII | Dane osobowe |
| Sensitive data | Dane wrazliwe lub szczegolnie chronione |
| Data minimization | Zbieranie i ujawnianie tylko potrzebnych danych |

## 3.3. Wyjasnienie eksperckie

Identyfikacja, weryfikacja i autoryzacja to trzy rozne kroki.

Przyklad:

- Numer telefonu wskazuje prawdopodobnego klienta: identyfikacja.
- Kod SMS potwierdza dostep do telefonu: weryfikacja.
- System sprawdza, czy klient moze zmienic adres zamowienia: autoryzacja.

W voicebocie nie wolno zakladac, ze osoba dzwoniaca z numeru klienta jest zawsze klientem. Telefon moze byc wspoldzielony, skradziony albo obslugiwany przez osobe trzecia.

## 3.4. Perspektywa biznesowa

Poziom weryfikacji zalezy od ryzyka:

| Akcja | Poziom weryfikacji |
|---|---|
| Ogolne FAQ | Brak lub minimalny |
| Status niskiego ryzyka | Lekka weryfikacja |
| Zmiana danych kontaktowych | Silniejsza weryfikacja |
| Platnosci i finanse | Silna weryfikacja |
| Dane medyczne | Wysoka ostroznosc |
| Anulowanie/zmiana umowy | Explicit confirmation + audyt |

## 3.5. Perspektywa uzytkownika

Weryfikacja jest kosztem UX. Uzytkownik zaakceptuje ja, jesli rozumie po co:

"Dla bezpieczenstwa wysle kod SMS. Prosze podac kod z wiadomosci."

Nie warto prosic o dane, ktore nie sa potrzebne. Kazde dodatkowe pytanie zwieksza tarcie i ryzyko.

## 3.6. Perspektywa technologiczna

Wymagania:

- metoda identyfikacji;
- metoda weryfikacji;
- token/session;
- expiry;
- liczba prob;
- lockout;
- audyt;
- maskowanie danych;
- ograniczenia wypowiadania danych;
- fallback do konsultanta.

## 3.7. Dobre praktyki

- Stosuj risk-based verification.
- Nie wypowiadaj pelnych danych osobowych bez potrzeby.
- Nie pros o hasla.
- Kody jednorazowe traktuj ostroznie.
- Potwierdzaj tylko fragmenty danych, np. ostatnie 3 cyfry.
- Loguj zdarzenia weryfikacji.
- Po nieudanej weryfikacji nie zdradzaj, ktore dane byly poprawne.
- Eskaluj przy podejrzeniu naduzycia.

## 3.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Numer telefonu jako jedyna weryfikacja | Ryzyko naduzyc |
| Prosba o haslo | Poważny blad bezpieczenstwa |
| Odczytywanie pelnych danych | Ryzyko prywatnosci |
| Ten sam poziom weryfikacji dla wszystkiego | Nadmierne tarcie lub ryzyko |
| Brak limitu prob | Ryzyko brute force |
| Brak audytu | Trudno wyjasnic incydent |

## 3.9. Checklista weryfikacji

- Czy akcja wymaga weryfikacji?
- Czy poziom weryfikacji odpowiada ryzyku?
- Czy nie zbieramy nadmiaru danych?
- Czy nie prosimy o haslo?
- Czy kody maja limit prob?
- Czy dane sa maskowane?
- Czy logujemy zdarzenia?
- Czy jest procedura nieudanej weryfikacji?
- Czy jest handoff dla sytuacji nietypowych?

## 3.10. Mini case study

Voicebot bankowy rozpoznawal klienta po numerze telefonu i odczytywal saldo. Security zatrzymalo projekt. Po zmianie bot po numerze telefonu tylko identyfikowal rekord, ale przed informacja o saldzie wymagal dodatkowej weryfikacji. Dla ogolnych informacji o placowkach weryfikacja nie byla wymagana.

## 3.11. Cwiczenia

1. Podziel akcje voicebota na poziomy ryzyka.
2. Zaprojektuj weryfikacje dla zmiany adresu.
3. Wypisz dane, ktorych bot nie powinien wypowiadac.
4. Zaprojektuj komunikat po nieudanej weryfikacji.

## 3.12. Podsumowanie

Weryfikacja i autoryzacja sa elementem projektowania rozmowy, nie tylko IT. Dobry voicebot chroni dane i jednoczesnie nie utrudnia prostych spraw ponad potrzebe.

---

# Rozdzial 4. Obsluga bledow integracji, retry logic, timeouty i graceful degradation

## 4.1. Cele rozdzialu

Czytelnik nauczy sie:

- projektowac zachowanie bota przy awariach systemow;
- rozumiec timeout, retry i idempotency;
- tworzyc komunikaty awaryjne bez martwej ciszy;
- decydowac, kiedy kontynuowac, a kiedy eskalowac.

## 4.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Timeout | Przekroczenie czasu oczekiwania na system |
| Retry | Ponowienie zapytania |
| Circuit breaker | Tymczasowe odciecie zawodnej integracji |
| Graceful degradation | Przejscie do ograniczonego, ale kontrolowanego trybu |
| Error mapping | Mapowanie bledow technicznych na komunikaty i decyzje |
| Fallback channel | Alternatywny kanal, np. SMS, e-mail, konsultant |

## 4.3. Wyjasnienie eksperckie

Integracje zawodza. Pytanie nie brzmi "czy", tylko "jak bot sie zachowa".

Typy bledow:

- API timeout;
- system niedostepny;
- brak rekordu;
- brak uprawnienia;
- konflikt danych;
- walidacja nie przeszla;
- limit zapytan;
- czesciowy sukces;
- blad zapisu po stronie systemu;
- niejednoznaczny wynik.

Zly komunikat:

"Wystapil blad systemu 504."

Dobry:

"Nie moge teraz sprawdzic tych danych. Moge polaczyc z konsultantem albo wyslac link do samodzielnego sprawdzenia."

## 4.4. Perspektywa biznesowa

Bledy integracji wplywaja na:

- SLA;
- porzucenia;
- eskalacje;
- reputacje;
- koszt konsultantow;
- zaufanie do automatyzacji.

Trzeba uzgodnic, ktore bledy:

- mozna ponowic;
- wymagaja konsultanta;
- wymagaja ticketu;
- wymagaja komunikatu o niedostepnosci;
- wymagaja zatrzymania calego use case'u.

## 4.5. Perspektywa uzytkownika

Uzytkownik nie musi znac przyczyny technicznej. Potrzebuje:

- krotkiego wyjasnienia;
- opcji dalszego dzialania;
- zapewnienia, ze dane nie zostaly utracone, jesli to prawda;
- potwierdzenia, czy akcja zostala wykonana.

Nigdy nie mow "gotowe", jesli wynik jest niepewny.

## 4.6. Perspektywa technologiczna

Retry:

- bezpieczny dla odczytu;
- ostrozny dla zapisu;
- dla zapisu tylko z idempotency;
- z limitem prob;
- z logowaniem.

Timeouty:

- krotsze dla prostych krokow;
- dluzsze dla akcji, gdzie uzytkownik dostaje filler;
- ustawiane wedlug UX, nie tylko default API.

## 4.7. Dobre praktyki

- Miej error mapping dla kazdej integracji.
- Dla operacji dluzszych niz 1-2 sekundy dawaj krotki filler.
- Nie ponawiaj zapisu bez idempotency.
- Loguj bledy techniczne, ale komunikuj je po ludzku.
- Przy niepewnym wyniku eskaluj lub sprawdz status akcji.
- Przy awarii globalnej wylaczaj dany flow lub kieruj do konsultanta.

## 4.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Retry zapisu bez idempotency | Duplikaty |
| Martwa cisza przy API | Uzytkownik przerywa |
| "Blad systemu" w TTS | Brak zrozumialego nastepnego kroku |
| Brak rozroznienia bledow | Zle decyzje dialogowe |
| Bot potwierdza niepewny wynik | Reklamacje |
| Brak monitoringu bledow | Awaria widoczna dopiero w skargach |

## 4.9. Checklista error handling

- Czy kazde API ma timeout?
- Czy kazde API ma opis bledow?
- Czy retry jest bezpieczny?
- Czy zapisy maja idempotency?
- Czy mamy komunikaty dla bledow?
- Czy mamy filler dla oczekiwania?
- Czy wiemy, kiedy eskalowac?
- Czy bledy sa logowane?
- Czy dashboard pokazuje awarie integracji?

## 4.10. Mini case study

Voicebot ubezpieczeniowy tworzyl zgloszenia szkody. Gdy API ticketingu zwracalo timeout, bot mowil "zgloszenie przyjete". Czasem ticket nie powstawal. Po poprawie bot sprawdzal status po `idempotency_key`; jesli wynik nadal byl niepewny, mowil: "Nie mam potwierdzenia zapisu. Polacze z konsultantem i przekaze zebrane informacje." Skargi spadly.

## 4.11. Cwiczenia

1. Zaprojektuj error mapping dla API rezerwacji.
2. Napisz komunikat dla timeoutu.
3. Wskaz operacje, gdzie retry jest zakazany bez idempotency.
4. Zaprojektuj graceful degradation dla awarii CRM.

## 4.12. Podsumowanie

Bledy integracji sa normalne. Profesjonalny voicebot nie udaje, ze wszystko zawsze dziala. Ma kontrolowane komunikaty, alternatywne sciezki, audyt i jasna granice miedzy sukcesem a niepewnoscia.

---

# Rozdzial 5. Przekazywanie kontekstu do konsultanta

## 5.1. Cele rozdzialu

Czytelnik nauczy sie:

- projektowac warm handoff;
- okreslac pakiet kontekstu dla konsultanta;
- laczyc transfer audio z danymi w agent desktop;
- mierzyc jakosc przekazania.

## 5.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Warm handoff | Przekazanie rozmowy z kontekstem |
| Cold handoff | Przekazanie bez kontekstu |
| Context package | Zestaw informacji przekazywanych konsultantowi |
| Agent desktop | Interfejs konsultanta |
| Handoff reason | Powod przekazania |
| Summary | Krotkie podsumowanie dotychczasowej rozmowy |

## 5.3. Wyjasnienie eksperckie

Handoff nie jest tylko transferem polaczenia. To transfer odpowiedzialnosci za sprawe. Konsultant powinien wiedziec:

- kto dzwoni, jesli zweryfikowany;
- jaka byla intencja;
- jakie dane zebrano;
- co bot probowal zrobic;
- dlaczego przekazuje;
- jakie API zwrocilo wynik;
- czy uzytkownik jest sfrustrowany;
- jaki jest nastepny krok.

Minimalny context package:

```text
conversation_id:
customer_verified:
intent:
collected_slots:
last_bot_question:
handoff_reason:
api_results:
summary:
transcript_link:
priority:
```

## 5.4. Perspektywa biznesowa

Warm handoff zmniejsza:

- czas konsultanta;
- powtarzanie danych;
- frustracje klienta;
- after-call work;
- ryzyko utraty informacji.

Cold handoff moze zniszczyc wartosc automatyzacji. Jesli klient musi wszystko powtorzyc, bot staje sie dodatkowa przeszkoda.

## 5.5. Perspektywa uzytkownika

Komunikat powinien ustawic oczekiwanie:

"Polacze z konsultantem i przekaze, ze chodzi o zmiane terminu dostawy zamowienia 12345. Prosze zostac na linii."

Po stronie konsultanta pierwsze zdanie powinno pokazywac kontekst:

"Widze, ze chodzi o zmiane terminu dostawy. Bot nie mogl znalezc wolnego terminu w piatek."

## 5.6. Perspektywa technologiczna

Wymagania:

- transfer call;
- push context do agent desktop;
- synchronizacja conversation_id;
- transcript link;
- summary generation;
- masking PII;
- handoff reason taxonomy;
- queue routing;
- priority flag;
- fallback, gdy context push sie nie uda.

## 5.7. Dobre praktyki

- Przekazuj tylko potrzebny kontekst.
- Streszczenie powinno byc krotkie.
- Oznacz powod handoff.
- Nie przekazuj niezweryfikowanych danych jako pewnych.
- Dodaj link do transkrypcji, jesli zgodne z polityka.
- Konsultant powinien widziec ostatnie pytanie bota.
- Mierz, czy konsultant uzywa kontekstu.

## 5.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Transfer bez kontekstu | Klient powtarza wszystko |
| Za dlugie podsumowanie | Konsultant nie czyta |
| Brak powodu handoff | Brak optymalizacji |
| Przekazanie niepotwierdzonych danych jako faktow | Ryzyko bledow |
| Brak fallbacku dla context push | Konsultant dostaje pusta sprawe |

## 5.9. Checklista handoff context

- Czy przekazujemy intencje?
- Czy przekazujemy zebrane sloty?
- Czy oznaczamy dane potwierdzone?
- Czy przekazujemy powod handoff?
- Czy przekazujemy wynik API?
- Czy jest krotkie podsumowanie?
- Czy konsultant widzi transkrypcje?
- Czy dane sa maskowane?
- Czy mierzymy jakosc handoff?

## 5.10. Mini case study

Voicebot reklamacyjny przekazywal rozmowy do konsultanta bez powodow. Contact center widzialo tylko "transfer from bot". Po wdrozeniu taxonomy handoff reason okazalo sie, ze 38% przekazan dotyczylo braku dokumentu, ktory mozna bylo wyslac linkiem SMS. Dodano nowy flow i liczba transferow spadla.

## 5.11. Cwiczenia

1. Zaprojektuj context package dla reklamacji.
2. Napisz komunikat transferu.
3. Zaprojektuj widok podsumowania dla konsultanta.
4. Wypisz taxonomy handoff reasons.

## 5.12. Podsumowanie

Dobry handoff to kontynuacja rozmowy, nie restart. Integracja z contact center musi przenosic sens sprawy, nie tylko dzwiek polaczenia.

---

# Rozdzial 6. Automatyczne notatki, podsumowania i aktualizacja danych po rozmowie

## 6.1. Cele rozdzialu

Czytelnik nauczy sie:

- projektowac automatyzacje po rozmowie;
- tworzyc notatki i podsumowania przydatne dla konsultantow;
- aktualizowac CRM/ticketing bez nadmiernego ryzyka;
- mierzyc jakosc post-call automation.

## 6.2. Kluczowe pojecia

| Pojecie | Definicja |
|---|---|
| Post-call automation | Automatyzacja po rozmowie |
| Call summary | Podsumowanie rozmowy |
| Disposition | Wynik rozmowy lub kategoria zakonczenia |
| Auto-tagging | Automatyczne tagowanie tematow |
| After-call work reduction | Zmniejszenie pracy po rozmowie |
| Human review | Przeglad przez czlowieka przed zapisem lub decyzja |

## 6.3. Wyjasnienie eksperckie

Voicebot moze automatyzowac nie tylko sama rozmowe. Moze tez:

- tworzyc notatke;
- tagowac powod kontaktu;
- aktualizowac status sprawy;
- tworzyc ticket;
- wysylac SMS/e-mail;
- przygotowac follow-up;
- streszczac rozmowe konsultantowi;
- oznaczac ryzyka i emocje;
- zasugerowac kolejny krok.

Notatka dobra:

```text
Klient chcial zmienic termin dostawy zamowienia 12345.
Zweryfikowany po kodzie SMS.
Wybrany termin: piatek 14-16.
API delivery_slots zwrocilo slot_unavailable.
Klient poprosil o konsultanta.
```

Notatka zla:

"Klient dzwonil w sprawie zamowienia. Bot pomagal. Rozmowa zakonczona transferem."

## 6.4. Perspektywa biznesowa

Automatyczne notatki moga oszczedzac duzo czasu konsultantow, nawet jesli bot nie zamyka sprawy end-to-end. To czesto niedoceniany element ROI.

Metryki:

- reduction in after-call work;
- note acceptance rate;
- correction rate;
- ticket completeness;
- tag accuracy;
- time to resolution;
- consultant satisfaction.

## 6.5. Perspektywa uzytkownika

Uzytkownik zyskuje, gdy nie musi powtarzac i gdy follow-up jest poprawny. Traci, gdy notatka zawiera blad i konsultant zaczyna od zlego zalozenia. Dlatego dane niepewne musza byc oznaczone.

## 6.6. Perspektywa technologiczna

Podsumowania moga byc:

- template-based;
- LLM-generated;
- hybrydowe: struktura szablonowa + LLM do streszczenia swobodnej czesci.

Bezpieczny model:

- pola strukturalne z flow i API;
- LLM tylko do krotkiego streszczenia;
- oznaczenie confidence;
- human review dla ryzykownych spraw;
- log wersji promptu;
- maskowanie danych.

## 6.7. Dobre praktyki

- Notatka powinna byc krotka i operacyjna.
- Oddziel fakty potwierdzone od niepewnych.
- Nie wpisuj do CRM halucynacji.
- Dla spraw ryzykownych dawaj human review.
- Taguj powod kontaktu i wynik rozmowy.
- Przechowuj link do transkrypcji, jesli wolno.
- Mierz, ile notatek konsultanci poprawiaja.

## 6.8. Typowe bledy

| Blad | Konsekwencja |
|---|---|
| Zbyt dlugie podsumowania | Konsultanci ich nie czytaja |
| Brak oznaczenia niepewnosci | Bledne zalozenia |
| LLM zapisuje bez walidacji | Ryzyko nieprawdziwych danych |
| Brak tagow wynikow | Slaba analityka |
| Brak review dla wysokiego ryzyka | Ryzyko compliance |

## 6.9. Checklista post-call automation

- Czy notatka ma strukture?
- Czy zawiera cel rozmowy?
- Czy zawiera zebrane dane?
- Czy oznacza dane potwierdzone?
- Czy zawiera wynik API?
- Czy zawiera powod handoff?
- Czy jest krotka?
- Czy dane wrazliwe sa maskowane?
- Czy konsultant moze poprawic notatke?
- Czy mierzymy correction rate?

## 6.10. Mini case study

Helpdesk IT wdrozyl voicebota, ktory nie rozwiazywal wszystkich spraw, ale tworzyl kompletne tickety z kategoria, opisem, systemem, priorytetem i lokalizacja. Konsultanci skrocili after-call work i szybciej kierowali zgloszenia do wlasciwych zespolow. Automatyzacja czesciowa dala wiekszy efekt niz oczekiwano.

## 6.11. Cwiczenia

1. Napisz dobra notatke po rozmowie reklamacyjnej.
2. Zaprojektuj strukture ticketu.
3. Wskaz pola, ktore powinny wymagac review.
4. Zaprojektuj metryki jakosci notatek.

## 6.12. Podsumowanie

Automatyzacja po rozmowie jest czesto rownie cenna jak automatyzacja rozmowy. Dobre notatki, tagi i aktualizacje systemow zmniejszaja koszt operacyjny i poprawiaja jakosc handoff.

---

# Rozdzial 7. Specyfikacja integracji - szablon praktyczny

## 7.1. Cele rozdzialu

Czytelnik otrzymuje gotowy szablon specyfikacji integracji do wykorzystania w projekcie voicebota.

## 7.2. Szablon specyfikacji integracji

```text
1. Informacje podstawowe
- Nazwa integracji:
- Use case:
- System zrodlowy:
- Wlasciciel biznesowy:
- Wlasciciel techniczny:
- Srodowiska: dev/test/prod:

2. Cel integracji
- Po co voicebot uzywa tej integracji?
- Czy jest to odczyt, walidacja, zapis, akcja, handoff czy post-call automation?

3. Warunki uzycia
- W jakim stanie dialogu integracja jest wywolywana?
- Jakie sloty sa wymagane?
- Czy wymagana jest weryfikacja uzytkownika?
- Czy wymagana jest explicit confirmation?

4. Dane wejsciowe
- Nazwa pola:
- Typ:
- Zrodlo:
- Wymagane/opcjonalne:
- Walidacja:
- Czy zawiera dane osobowe:

5. Dane wyjsciowe
- Nazwa pola:
- Typ:
- Znaczenie:
- Czy mozna wypowiedziec glosem:
- Czy trzeba maskowac:

6. Bledy
- Kod bledu:
- Znaczenie:
- Czy retry:
- Komunikat dla uzytkownika:
- Handoff:
- Logowanie:

7. Timeout i retry
- Timeout:
- Liczba retry:
- Backoff:
- Czy operacja jest idempotentna:
- Idempotency key:

8. Bezpieczenstwo
- Autoryzacja:
- Szyfrowanie:
- Sekrety:
- Rate limits:
- Audyt:
- Retencja logow:

9. Observability
- Request ID:
- Metryki latency:
- Metryki sukcesu:
- Alerty:
- Dashboard:

10. QA
- Happy path:
- Bledne dane:
- Brak danych:
- Timeout:
- System unavailable:
- Duplicate request:
- Unauthorized:
- Handoff:

11. Decyzje otwarte
- Pytanie:
- Owner:
- Termin:
```

## 7.3. Dobre praktyki uzycia szablonu

- Wypelniaj szablon przed implementacja.
- Przegladaj go z biznesem, IT, security i QA.
- Nie akceptuj odpowiedzi "blad ogolny" bez mapowania.
- Dodaj przyklady request/response w dokumentacji technicznej.
- Powiaz specyfikacje z test cases.
- Aktualizuj po zmianach API.

## 7.4. Mini case study

W projekcie rezerwacyjnym brakowalo decyzji, co robic, gdy API zwraca `slot_conflict`. Developerzy potraktowali to jak ogolny blad. Bot przekazywal do konsultanta, mimo ze mogl zaproponowac kolejny termin. Po uzupelnieniu specyfikacji `slot_conflict` dostal osobna sciezke dialogowa: "Ten termin zostal juz zajety. Najblizszy wolny to...".

## 7.5. Podsumowanie

Specyfikacja integracji jest narzedziem zapobiegania chaosowi. Im bardziej szczegolowo opiszesz dane, bledy, timeouty i decyzje, tym mniej niespodzianek pojawi sie w rozmowie z uzytkownikiem.

---

# 8. Zbiorcza checklista po Czesci VIII

- Czy voicebot ma integracje potrzebne do realnego wykonania sprawy?
- Czy odrozniono odczyt, walidacje, zapis i akcje?
- Czy kazda integracja ma wlasciciela?
- Czy znamy system zrodlowy dla danych?
- Czy mamy sandbox?
- Czy znamy timeouty i bledy?
- Czy zapisy sa idempotentne?
- Czy retry jest bezpieczny?
- Czy komunikaty awarii sa zrozumiale?
- Czy weryfikacja odpowiada ryzyku akcji?
- Czy dane osobowe sa minimalizowane?
- Czy handoff przekazuje kontekst?
- Czy konsultant widzi podsumowanie?
- Czy automatyczne notatki odrozniaja fakty od niepewnosci?
- Czy integracje maja dashboard i alerty?

---

# 9. Co bedzie w kolejnej czesci

Kolejna czesc powinna opracowac **Czesc IX. Testowanie i QA voicebotow**:

1. Testy scenariuszy i testy konwersacyjne.
2. Testy ASR, NLU, TTS.
3. Testy integracji, telefonii i obciazeniowe.
4. Testy bezpieczenstwa i regresji.
5. Testy z prawdziwymi uzytkownikami.
6. Edge cases, emocje i sytuacje trudne.
7. UAT i kompletna checklista przed produkcja.
