# Voicebot Specialist Handbook

## Część 9: Integracje i automatyzacja procesów

Wersja robocza: 2026-07-29  
Kontynuacja plików:

- `Voicebot_Specialist_Handbook_czesc_1.md`
- `Voicebot_Specialist_Handbook_czesc_2.md`
- `Voicebot_Specialist_Handbook_czesc_3.md`
- `Voicebot_Specialist_Handbook_czesc_4.md`
- `Voicebot_Specialist_Handbook_czesc_5.md`
- `Voicebot_Specialist_Handbook_czesc_6.md`
- `Voicebot_Specialist_Handbook_czesc_7.md`
- `Voicebot_Specialist_Handbook_czesc_8.md`

---

# Część VIII. Integracje i automatyzacja procesów

## Cel całej części

Voicebot bez integracji może rozmawiać. Voicebot z dobrze zaprojektowanymi integracjami może zalatwiac sprawy. Integracje są tym miejscem, w którym conversation design spotyka się z realnymi systemami organizacji: CRM, ERP, ticketingiem, kalendarzami, systemami płatności, bazami klientów, systemami rezerwacji, contact center i narzędziami konsultantów.

Ta część pokazuje, jak projektować integracje voicebota tak, aby były bezpieczne, mierzalne, odporne na błędy i zrozumiałe dla użytkownika.

Po tej części czytelnik powinien umieć:

1. Wyjaśnić role API, webhookow i integracji backendowych.
2. Projektować wymagania integracyjne dla CRM, ERP, ticketingu, kalendarzy, płatności i helpdesku.
3. Rozumieć weryfikację użytkownika, autoryzacje i minimalizacje danych.
4. Projektować retry logic, timeouty, idempotency i fallbacki.
5. Zaprojektować przekazanie kontekstu do konsultanta.
6. Tworzyć automatyczne notatki i podsumowania rozmów.
7. Okreslac, kiedy bot może wykonać akcję, a kiedy powinien tylko przygotować sprawę dla człowieka.

Źródła wspierające część:

- Dokumentacje AWS Connect, Amazon Lex, Google Dialogflow CX i OpenAI Realtime jako odniesienie do praktycznych wzorcow voice agents, slotów, narzędzi, transferów, interruption i konfiguracji rozmów.
- W3C VoiceXML 2.0 jako historyczny fundament dialogów transakcyjnych, formularzy, eventow i input collection.
- Uzupełnienie eksperckie: architektura API, idempotency, handoff context, ticket automation, notes automation i enterprise integration governance.

---

# Rozdział 1. API, webhooki i architektura integracji

## 1.1. Cele rozdziału

Czytelnik nauczy się:

- rozumieć podstawowa role API i webhookow w voicebocie;
- projektować integracje pod rozmowę w czasie rzeczywistym;
- odróżniać odczyt danych od zapisu danych;
- wskazac typowe ryzyka integracyjne.

## 1.2. Kluczowe pojęcia

| Pojęcie | Definicja praktyczna |
|---|---|
| API | Interfejs pozwalajacy systemom wymieniać dane lub wykonywac akcję |
| Webhook | Wywolanie systemu w reakcji na zdarzenie, np. zakończenie rozmowy |
| Endpoint | Konkretny adres/funkcja API |
| Request | Zapytanie do systemu |
| Response | Odpowiedź systemu |
| Timeout | Maksymalny czas oczekiwania na odpowiedź |
| Retry | Ponowienie zapytania po błędzie |
| Idempotency | Właściwość lub mechanizm projektowy, dzięki ktoremu ponowienie tej samej akcji nie powinno utworzyc duplikatu |
| Rate limit | Ograniczenie liczby zapytan w czasie |
| Payload | Dane przesylane w request lub response |

## 1.3. Wyjaśnienie eksperckie

Integracja voicebota jest trudniejsza niż integracja formularza, bo użytkownik czeka w rozmowie. Jeśli API odpowiada po 8 sekundach, w aplikacji webowej można pokazać spinner. W rozmowie telefonicznej pojawia się cisza, niepewność i "halo?".

Podstawowe typy integracji:

1. Odczyt danych: status zamówienia, saldo, termin, lista wizyt.
2. Walidacja danych: czy numer zamówienia istnieje, czy kod SMS jest poprawny.
3. Zapis danych: zmiana adresu, rezerwacja, utworzenie ticketu.
4. Akcja zewnętrzna: wyslanie SMS-a, e-maila, linku, powiadomienia.
5. Handoff: przekazanie kontekstu do contact center.
6. Post-call automation: notatka, tagi, aktualizacja CRM.

Najważniejsze rozróżnienie:

- Odczyt danych może być wykonany przy nizszym ryzyku.
- Zapis danych i akcję transakcyjne wymagają walidacji, autoryzacji, potwierdzenia i audytu.

## 1.4. Perspektywa biznesowa

Integracje decydują, czy bot tworzy realną wartość. Voicebot, który rozpoznaje intencje, ale nie ma dostępu do systemu źródłowego, będzie konczyl rozmowy komunikatem "w tej sprawie proszę skontaktowac się z konsultantem". To może być pomocne jako routing, ale nie jest pełną automatyzacją.

Pytania biznesowe:

- Czy bot ma tylko informowac, czy wykonywac akcję?
- Które akcję są dozwolone automatycznie?
- Które wymagają człowieka?
- Które dane można odczytac głosem?
- Które dane powinny być wysłane SMS-em lub e-mailem?
- Co oznacza sukces integracji?

## 1.5. Perspektywa użytkownika

Użytkownik odczuwa integracje jako sprawczosc:

- "Bot znalazl moje zamówienie."
- "Bot zmienil termin."
- "Bot wyslal link."
- "Konsultant wie, o co chodzi."

Nie odczuwa API. Odczuwalny jest tylko wynik i sposób komunikacji przy oczekiwaniu lub błędzie.

## 1.6. Perspektywa technologiczna

Każda integracja powinna mieć specyfikacje:

| Element | Pytanie |
|---|---|
| Cel | Po co bot wywołuje API? |
| System | Jaki system jest źródłem prawdy? |
| Owner | Kto odpowiada za system? |
| Dane wejsciowe | Jakie sloty są wymagane? |
| Dane wyjsciowe | Co wraca do bota? |
| Timeout | Ile bot może czekac? |
| Retry | Czy ponawiamy? Ile razy? |
| Idempotency | Czy akcja zapisujaca jest bezpieczna przy ponowieniu? |
| Błędy | Jakie są kody błędów i komunikaty? |
| Audyt | Co logujemy? |
| Prywatność | Co maskujemy? |

## 1.7. Dobre praktyki

- Projektuj integracje przed finalnym dialogiem.
- Oddziel odczyt od zapisu.
- Dla zapisow stosuj idempotency.
- Ustal timeouty z perspektywy rozmowy.
- Mapuj błędy techniczne na zrozumiałe komunikaty.
- Nie wypowiadaj danych wrażliwych bez potrzeby.
- Testuj sandbox i produkcyjny kanał.
- Loguj request ID, wynik i czas odpowiedzi.

## 1.8. Typowe błędy

| Błąd | Konsekwencja |
|---|---|
| Projekt dialogu bez znajomosci API | Flow obiecuje rzeczy niewykonalne |
| Brak timeoutow | Martwa cisza w rozmowie |
| Brak idempotency | Duplikaty rezerwacji lub ticketow |
| Jeden komunikat dla wszystkich błędów | Użytkownik nie wie, co się stalo |
| Brak właściciela integracji | Problemy utrzymaniowe |
| Brak sandboxa | Testy są ryzykowne |

## 1.9. Checklista integracji API

- Czy system źródłowy jest wskazany?
- Czy API istnieje?
- Czy znamy właściciela?
- Czy mamy sandbox?
- Czy znamy wymagane dane?
- Czy znamy timeout?
- Czy znamy błędy?
- Czy akcję zapisujace są idempotentne?
- Czy dane wrażliwe są maskowane?
- Czy bot ma komunikat na awarie?

## 1.10. Mini case study

Voicebot rezerwacyjny mógł utworzyc wizyte, ale API kalendarza czasem odpowiadalo po utworzeniu wpisu dopiero po kilku sekundach. Bot ponawial request i tworzył duplikaty. Po dodaniu `idempotency_key` opartego na `conversation_id`, pacjencie i terminie, ponowienie zwracalo istniejaca rezerwacje zamiast tworzyć nowa.

## 1.11. Ćwiczenia

1. Przygotuj specyfikacje API dla statusu zamówienia.
2. Wypisz błędy API dla zmiany adresu.
3. Zaprojektuj komunikat po timeout.
4. Wskaż, gdzie potrzebna jest idempotency.

## 1.12. Podsumowanie

API i webhooki są mostem między rozmową a procesem. Dobra integracja jest szybka, bezpieczna, audytowalna i zaprojektowana pod rytm rozmowy głosowej.

---

# Rozdział 2. CRM, ERP, ticketing, helpdesk, kalendarze i systemy rezerwacyjne

## 2.1. Cele rozdziału

Czytelnik nauczy się:

- rozumieć typowe systemy integrowane z voicebotem;
- wskazac, jakie dane i akcję zwykle są potrzebne;
- projektować integracje wedlug typu procesu;
- unikać nadmiernego zakresu integracyjnego.

## 2.2. Kluczowe systemy

| System | Typowe użycie w voicebocie |
|---|---|
| CRM | Dane klienta, historia kontaktu, segment, zgody |
| ERP | Zamówienia, faktury, produkty, operacje biznesowe |
| OMS | Order Management System, status zamówień i dostaw |
| Ticketing | Tworzenie i aktualizacja zgloszen |
| Helpdesk IT | Incydenty, kategorie, priorytety, baza użytkowników |
| Kalendarz/rezerwacje | Wizyty, dostępne terminy, zmiany, odwolania |
| Płatności | Linki do płatności, status płatności, deklaracje |
| Knowledge base | Odpowiedzi informacyjne, procedury, instrukcje |
| Contact center | Kolejki, transfery, agent desktop, nagrania |

## 2.3. Wyjaśnienie eksperckie

Każdy system ma inna role:

- CRM mówi, kim jest klient i jaka ma historie.
- ERP lub OMS mówi, jaki jest stan procesu.
- Ticketing zapisuje sprawę do dalszej obsługi.
- Kalendarz pozwala zarezerwowac termin.
- Contact center przejmuje rozmowę.
- Baza wiedzy wyjaśnia procedury.

Voicebot nie powinien łączyć się że wszystkim naraz tylko dlatego, że to możliwe. Zakres integracji powinien wynikać z use case'u.

Przykład dla statusu zamówienia:

Wymagane:

- identyfikacja klienta;
- OMS/status zamówienia;
- SMS/e-mail confirmation opcjonalnie;
- handoff do contact center.

Niewymagane na start:

- pełny ERP;
- system reklamacji;
- płatności;
- marketing automation.

## 2.4. Perspektywa biznesowa

Integracje są często najdrozszym i najbardziej ryzykownym elementem projektu. Warto odróżniać:

- integracje konieczne do MVP;
- integracje zwiekszajace wartość;
- integracje, które można zastapic ticketem;
- integracje przyszlosciowe.

Dobre pytanie:

"Czy bez tej integracji bot nadal dostarczy wartość w MVP?"

## 2.5. Perspektywa użytkownika

Użytkownik nie chce wiedzieć, z ilu systemów korzysta bot. Chce, aby odpowiedź była spójna. Jeśli CRM mówi co innego niż system zamówień, bot musi mieć regule źródła prawdy albo przekazać sprawę do człowieka.

## 2.6. Perspektywa technologiczna

Typowe dane i akcję:

| Use case | Dane | Akcję |
|---|---|---|
| Status zamówienia | order_id, status, ETA | odczyt statusu, SMS |
| Zmiana wizyty | pacjent, dostępne sloty | rezerwacja, zmiana, anulowanie |
| Helpdesk | user_id, asset, category | ticket, reset, instrukcja |
| Reklamacja | klient, produkt, powod | ticket, załączniki poza kanałem |
| Płatność | saldo, link, status | wyslanie linku, deklaracja |

## 2.7. Dobre praktyki

- Wybierz system źródłowy dla każdego typu danych.
- Nie powielaj logiki biznesowej w wielu miejscach.
- Dla ticketingu okresl minimalne pola wymagane.
- Dla kalendarzy sprawdź konflikt terminow tuz przed zapisem.
- Dla CRM minimalizuj dane wypowiadane głosem.
- Dla helpdesku nie zbieraj haseł.
- Dla płatności unikaj wypowiadania wrażliwych danych.

## 2.8. Typowe błędy

| Błąd | Konsekwencja |
|---|---|
| Integracja ze złym systemem źródłowym | Nieaktualne dane |
| Zbyt szeroki zakres integracji | Opóźnienia projektu |
| Brak minimalnych pol ticketu | Zgłoszenia bezuzyteczne |
| Brak reguły konfliktu kalendarza | Podwojne rezerwacje |
| Odczytywanie nadmiaru danych z CRM | Ryzyko prywatności |

## 2.9. Checklista systemów

- Czy wiemy, który system jest źródłem prawdy?
- Czy dane są aktualne?
- Czy API pozwala na potrzebna akcję?
- Czy akcja ma walidacje?
- Czy system ma sandbox?
- Czy są limity i SLA?
- Czy mamy właściciela systemu?
- Czy błędy są opisane?
- Czy dane są minimalizowane?

## 2.10. Mini case study

Voicebot helpdeskowy tworzył tickety, ale konsultanci musieli je przepisywac, bo brakowalo kategorii, priorytetu i lokalizacji użytkownika. Po analizie ticketingu dodano wymagane sloty i mapowanie kategorii. Bot nie tylko tworzył ticket, ale tworzył ticket użyteczny.

## 2.11. Ćwiczenia

1. Dla use case'u rezerwacji wypisz potrzebne systemy.
2. Oznacz integracje MVP i integracje pozniejsze.
3. Zaprojektuj minimalny ticket reklamacyjny.
4. Wskaż system źródłowy dla statusu klienta.

## 2.12. Podsumowanie

Integracje powinny być projektowane wedlug procesu, nie wedlug ambicji technologicznej. Dobry voicebot korzysta z tylu systemów, ile potrzeba, aby bezpiecznie i skutecznie załatwić sprawę.

---

# Rozdział 3. Weryfikacja użytkownika, autoryzacja i minimalizacja danych

## 3.1. Cele rozdziału

Czytelnik nauczy się:

- odróżniać identyfikacje, weryfikację i autoryzacje;
- projektować procesy z danymi osobowymi;
- minimalizowac dane wypowiadane i logowane;
- rozumieć ryzyka w kanale głosowym.

## 3.2. Kluczowe pojęcia

| Pojęcie | Definicja |
|---|---|
| Identyfikacja | Ustalenie, kim prawdopodobnie jest użytkownik |
| Weryfikacja | Potwierdzenie tozsamosci użytkownika |
| Autoryzacja | Sprawdzenie, czy użytkownik może wykonać dana akcję |
| MFA | Multi-factor authentication |
| PII | Dane osobowe |
| Sensitive data | Dane wrażliwe lub szczególnie chronione |
| Data minimization | Zbieranie i ujawnianie tylko potrzebnych danych |

## 3.3. Wyjaśnienie eksperckie

Identyfikacja, weryfikacja i autoryzacja to trzy różne kroki.

Przykład:

- Numer telefonu wskazuje prawdopodobnego klienta: identyfikacja.
- Kod SMS potwierdza dostęp do telefonu: weryfikacja.
- System sprawdza, czy klient może zmienić adres zamówienia: autoryzacja.

W voicebocie nie wolno zakładać, że osoba dzwoniaca z numeru klienta jest zawsze klientem. Telefon może być wspoldzielony, skradziony albo obsługiwany przez osobe trzecia.

## 3.4. Perspektywa biznesowa

Poziom weryfikacji zalezy od ryzyka:

| Akcja | Poziom weryfikacji |
|---|---|
| Ogólne FAQ | Brak lub minimalny |
| Status niskiego ryzyka | Lekka weryfikacja |
| Zmiana danych kontaktowych | Silniejsza weryfikacja |
| Płatności i finanse | Silna weryfikacja |
| Dane medyczne | Wysoka ostroznosc |
| Anulowanie/zmiana umowy | Explicit confirmation + audyt |

## 3.5. Perspektywa użytkownika

Weryfikacja jest kosztem UX. Użytkownik zaakceptuje ja, jeśli rozumie po co:

"Dla bezpieczeństwa wysle kod SMS. Proszę podac kod z wiadomosci."

Nie warto prosić o dane, które nie są potrzebne. Każde dodatkowe pytanie zwiększa tarcie i ryzyko.

## 3.6. Perspektywa technologiczna

Wymagania:

- metoda identyfikacji;
- metoda weryfikacji;
- token/session;
- expiry;
- liczba prób;
- lockout;
- audyt;
- maskowanie danych;
- ograniczenia wypowiadania danych;
- fallback do konsultanta.

## 3.7. Dobre praktyki

- Stosuj risk-based verification.
- Nie wypowiadaj pelnych danych osobowych bez potrzeby.
- Nie pros o hasła.
- Kody jednorazowe traktuj ostrożnie.
- Potwierdzaj tylko fragmenty danych, np. ostatnie 3 cyfry.
- Loguj zdarzenia weryfikacji.
- Po nieudanej weryfikacji nie zdradzaj, które dane były poprawne.
- Eskaluj przy podejrzeniu naduzycia.

## 3.8. Typowe błędy

| Błąd | Konsekwencja |
|---|---|
| Numer telefonu jako jedyna weryfikacja | Ryzyko naduzyc |
| Prośba o hasło | Poważny błąd bezpieczeństwa |
| Odczytywanie pelnych danych | Ryzyko prywatności |
| Ten sam poziom weryfikacji dla wszystkiego | Nadmierne tarcie lub ryzyko |
| Brak limitu prób | Ryzyko brute force |
| Brak audytu | Trudno wyjaśnić incydent |

## 3.9. Checklista weryfikacji

- Czy akcja wymaga weryfikacji?
- Czy poziom weryfikacji odpowiada ryzyku?
- Czy nie zbieramy nadmiaru danych?
- Czy nie prosimy o hasło?
- Czy kody mają limit prób?
- Czy dane są maskowane?
- Czy logujemy zdarzenia?
- Czy jest procedura nieudanej weryfikacji?
- Czy jest handoff dla sytuacji nietypowych?

## 3.10. Mini case study

Voicebot bankowy rozpoznawal klienta po numerze telefonu i odczytywal saldo. Security zatrzymało projekt. Po zmianie bot po numerze telefonu tylko identyfikowal rekord, ale przed informacja o saldzie wymagal dodatkowej weryfikacji. Dla ogólnych informacji o placowkach weryfikacja nie była wymagana.

## 3.11. Ćwiczenia

1. Podziel akcję voicebota na poziomy ryzyka.
2. Zaprojektuj weryfikację dla zmiany adresu.
3. Wypisz dane, których bot nie powinien wypowiadać.
4. Zaprojektuj komunikat po nieudanej weryfikacji.

## 3.12. Podsumowanie

Weryfikacja i autoryzacja są elementem projektowania rozmowy, nie tylko IT. Dobry voicebot chroni dane i jednocześnie nie utrudnia prostych spraw ponad potrzebe.

---

# Rozdział 4. Obsługa błędów integracji, retry logic, timeouty i graceful degradation

## 4.1. Cele rozdziału

Czytelnik nauczy się:

- projektować zachowanie bota przy awariach systemów;
- rozumieć timeout, retry i idempotency;
- tworzyć komunikaty awaryjne bez martwej ciszy;
- decydowac, kiedy kontynuowac, a kiedy eskalować.

## 4.2. Kluczowe pojęcia

| Pojęcie | Definicja |
|---|---|
| Timeout | Przekroczenie czasu oczekiwania na system |
| Retry | Ponowienie zapytania |
| Circuit breaker | Tymczasowe odciecie zawodnej integracji |
| Graceful degradation | Przejście do ograniczonego, ale kontrolowanego trybu |
| Error mapping | Mapowanie błędów technicznych na komunikaty i decyzję |
| Fallback channel | Alternatywny kanał, np. SMS, e-mail, konsultant |

## 4.3. Wyjaśnienie eksperckie

Integracje zawodzą. Pytanie nie brzmi "czy", tylko "jak bot się zachowa".

Typy błędów:

- API timeout;
- system niedostepny;
- brak rekordu;
- brak uprawnieńia;
- konflikt danych;
- walidacja nie przeszla;
- limit zapytan;
- czesciowy sukces;
- błąd zapisu po stronie systemu;
- niejednoznaczny wynik.

Zły komunikat:

"Wystapil błąd systemu 504."

Dobry:

"Nie mogę teraz sprawdzić tych danych. Mogę połączyć z konsultantem albo wysłać link do samodzielnego sprawdzenia."

## 4.4. Perspektywa biznesowa

Błędy integracji wpływają na:

- SLA;
- porzucenia;
- eskalację;
- reputacje;
- koszt konsultantów;
- zaufanie do automatyzacji.

Trzeba uzgodnic, które błędy:

- można ponowic;
- wymagają konsultanta;
- wymagają ticketu;
- wymagają komunikatu o niedostepnosci;
- wymagają zatrzymania całego use case'u.

## 4.5. Perspektywa użytkownika

Użytkownik nie musi znac przyczyny technicznej. Potrzebuje:

- krotkiego wyjaśnienia;
- opcji dalszego działania;
- zapewnienia, że dane nie zostały utracone, jeśli to prawda;
- potwierdzenia, czy akcja została wykonana.

Nigdy nie mow "gotowe", jeśli wynik jest niepewny.

## 4.6. Perspektywa technologiczna

Retry:

- bezpieczny dla odczytu;
- ostrożny dla zapisu;
- dla zapisu tylko z idempotency;
- z limitem prób;
- z logowaniem.

Timeouty:

- krotsze dla prostych krokow;
- dłuższe dla akcji, gdzie użytkownik dostaje filler;
- ustawiane wedlug UX, nie tylko default API.

## 4.7. Dobre praktyki

- Miej error mapping dla każdej integracji.
- Dla operacji dłuższych niż 1-2 sekundy dawaj krótki filler.
- Nie ponawiaj zapisu bez idempotency.
- Loguj błędy techniczne, ale komunikuj je po ludzku.
- Przy niepewnym wyniku eskaluj lub sprawdź status akcji.
- Przy awarii globalnej wylaczaj dany flow lub kieruj do konsultanta.

## 4.8. Typowe błędy

| Błąd | Konsekwencja |
|---|---|
| Retry zapisu bez idempotency | Duplikaty |
| Martwa cisza przy API | Użytkownik przerywa |
| "Błąd systemu" w TTS | Brak zrozumiałego następnego kroku |
| Brak rozroznienia błędów | Źle decyzję dialogowe |
| Bot potwierdza niepewny wynik | Reklamację |
| Brak monitoringu błędów | Awaria widoczna dopiero w skargach |

## 4.9. Checklista error handling

- Czy każde API ma timeout?
- Czy każde API ma opis błędów?
- Czy retry jest bezpieczny?
- Czy zapisy mają idempotency?
- Czy mamy komunikaty dla błędów?
- Czy mamy filler dla oczekiwania?
- Czy wiemy, kiedy eskalować?
- Czy błędy są logowane?
- Czy dashboard pokazuje awarie integracji?

## 4.10. Mini case study

Voicebot ubezpieczeniowy tworzył zgłoszenia szkody. Gdy API ticketingu zwracalo timeout, bot mówił "zgłoszenie przyjęte". Czasem ticket nie powstawal. Po poprawie bot sprawdzal status po `idempotency_key`; jeśli wynik nadal był niepewny, mówił: "Nie mam potwierdzenia zapisu. Połączę z konsultantem i przekaze zebrane informacje." Skargi spadły.

## 4.11. Ćwiczenia

1. Zaprojektuj error mapping dla API rezerwacji.
2. Napisz komunikat dla timeoutu.
3. Wskaż operacje, gdzie retry jest zakazany bez idempotency.
4. Zaprojektuj graceful degradation dla awarii CRM.

## 4.12. Podsumowanie

Błędy integracji są normalne. Profesjonalny voicebot nie udaje, że wszystko zawsze działa. Ma kontrolowane komunikaty, alternatywne ścieżki, audyt i jasna granice między sukcesem a niepewnościa.

---

# Rozdział 5. Przekazywanie kontekstu do konsultanta

## 5.1. Cele rozdziału

Czytelnik nauczy się:

- projektować warm handoff;
- okreslac pakiet kontekstu dla konsultanta;
- łączyć transfer audio z danymi w agent desktop;
- mierzyć jakość przekazania.

## 5.2. Kluczowe pojęcia

| Pojęcie | Definicja |
|---|---|
| Warm handoff | Przekazanie rozmowy z kontekstem |
| Cold handoff | Przekazanie bez kontekstu |
| Context package | Zestaw informacji przekazywanych konsultantowi |
| Agent desktop | Interfejs konsultanta |
| Handoff reason | Powod przekazania |
| Summary | Krótkie podsumowanie dotychczasowej rozmowy |

## 5.3. Wyjaśnienie eksperckie

Handoff nie jest tylko transferem połączenia. To transfer odpowiedzialności za sprawę. Konsultant powinien wiedzieć:

- kto dzwoni, jeśli zweryfikowany;
- jaka była intencja;
- jakie dane zebrano;
- co bot probowal zrobić;
- dlaczego przekazuje;
- jakie API zwróciło wynik;
- czy użytkownik jest sfrustrowany;
- jaki jest następny krok.

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
- frustrację klienta;
- after-call work;
- ryzyko utraty informacji.

Cold handoff może zniszczyc wartość automatyzacji. Jeśli klient musi wszystko powtórzyć, bot staje się dodatkowa przeszkodą.

## 5.5. Perspektywa użytkownika

Komunikat powinien ustawić oczekiwanie:

"Połączę z konsultantem i przekaze, że chodzi o zmianę terminu dostawy zamówienia 12345. Proszę zostać na linii."

Po stronie konsultanta pierwsze zdanie powinno pokazywac kontekst:

"Widze, że chodzi o zmianę terminu dostawy. Bot nie mógł znaleźć wolnego terminu w piatek."

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
- fallback, gdy context push się nie uda.

## 5.7. Dobre praktyki

- Przekazuj tylko potrzebny kontekst.
- Streszczenie powinno być krótkie.
- Oznacz powod handoff.
- Nie przekazuj niezweryfikowanych danych jako pewnych.
- Dodaj link do transkrypcji, jeśli zgodne z polityka.
- Konsultant powinien widziec ostatnie pytanie bota.
- Mierz, czy konsultant używa kontekstu.

## 5.8. Typowe błędy

| Błąd | Konsekwencja |
|---|---|
| Transfer bez kontekstu | Klient powtarza wszystko |
| Za długie podsumowanie | Konsultant nie czyta |
| Brak powodu handoff | Brak optymalizacji |
| Przekazanie niepotwierdzonych danych jako faktow | Ryzyko błędów |
| Brak fallbacku dla context push | Konsultant dostaje pusta sprawę |

## 5.9. Checklista handoff context

- Czy przekazujemy intencje?
- Czy przekazujemy zebrane sloty?
- Czy oznaczamy dane potwierdzone?
- Czy przekazujemy powod handoff?
- Czy przekazujemy wynik API?
- Czy jest krótkie podsumowanie?
- Czy konsultant widzi transkrypcje?
- Czy dane są maskowane?
- Czy mierzymy jakość handoff?

## 5.10. Mini case study

Voicebot reklamacyjny przekazywal rozmowy do konsultanta bez powodów. Contact center widzialo tylko "transfer from bot". Po wdrożeniu taxonomy handoff reason okazalo się, że 38% przekazan dotyczylo braku dokumentu, który można było wysłać linkiem SMS. Dodano nowy flow i liczba transferów spadla.

## 5.11. Ćwiczenia

1. Zaprojektuj context package dla reklamacji.
2. Napisz komunikat transferu.
3. Zaprojektuj widok podsumowania dla konsultanta.
4. Wypisz taxonomy handoff reasons.

## 5.12. Podsumowanie

Dobry handoff to kontynuacja rozmowy, nie restart. Integracja z contact center musi przenosic sens sprawy, nie tylko dźwięk połączenia.

---

# Rozdział 6. Automatyczne notatki, podsumowania i aktualizacja danych po rozmowie

## 6.1. Cele rozdziału

Czytelnik nauczy się:

- projektować automatyzację po rozmowie;
- tworzyć notatki i podsumowania przydatne dla konsultantów;
- aktualizować CRM/ticketing bez nadmiernego ryzyka;
- mierzyć jakość post-call automation.

## 6.2. Kluczowe pojęcia

| Pojęcie | Definicja |
|---|---|
| Post-call automation | Automatyzacja po rozmowie |
| Call summary | Podsumowanie rozmowy |
| Disposition | Wynik rozmowy lub kategorią zakończenia |
| Auto-tagging | Automatyczne tagowanie tematow |
| After-call work reduction | Zmniejszenie pracy po rozmowie |
| Human review | Przegląd przez człowieka przed zapisem lub decyzja |

## 6.3. Wyjaśnienie eksperckie

Voicebot może automatyzowac nie tylko sama rozmowę. Może też:

- tworzyć notatke;
- tagowac powod kontaktu;
- aktualizować status sprawy;
- tworzyć ticket;
- wysyłać SMS/e-mail;
- przygotować follow-up;
- streszczać rozmowę konsultantowi;
- oznaczać ryzyka i emocje;
- zasugerowac kolejny krok.

Notatka dobra:

```text
Klient chcial zmienic termin dostawy zamowienia 12345.
Zweryfikowany po kodzie SMS.
Wybrany termin: piatek 14-16.
API delivery_slots zwrocilo slot_unavailable.
Klient poprosil o konsultanta.
```

Notatka zła:

"Klient dzwonil w sprawie zamówienia. Bot pomagal. Rozmowa zakończona transferem."

## 6.4. Perspektywa biznesowa

Automatyczne notatki mogą oszczedzac dużo czasu konsultantów, nawet jeśli bot nie zamyka sprawy end-to-end. To często niedoceniany element ROI.

Metryki:

- reduction in after-call work;
- note acceptance rate;
- correction rate;
- ticket completeness;
- tag accuracy;
- time to resolution;
- consultant satisfaction.

## 6.5. Perspektywa użytkownika

Użytkownik zyskuje, gdy nie musi powtarzać i gdy follow-up jest poprawny. Traci, gdy notatka zawiera błąd i konsultant zaczyna od złego założenia. Dlatego dane niepewne muszą być oznaczone.

## 6.6. Perspektywa technologiczna

Podsumowania mogą być:

- template-based;
- LLM-generated;
- hybrydowe: struktura szablonowa + LLM do streszczenia swobodnej części.

Bezpieczny model:

- pola strukturalne z flow i API;
- LLM tylko do krotkiego streszczenia;
- oznaczenie confidence;
- human review dla ryzykownych spraw;
- log wersji promptu;
- maskowanie danych.

## 6.7. Dobre praktyki

- Notatka powinna być krótka i operacyjną.
- Oddziel fakty potwierdzone od niepewnych.
- Nie wpisuj do CRM halucynacji.
- Dla spraw ryzykownych dawaj human review.
- Taguj powod kontaktu i wynik rozmowy.
- Przechowuj link do transkrypcji, jeśli wolno.
- Mierz, ile notatek konsultanci poprawiaja.

## 6.8. Typowe błędy

| Błąd | Konsekwencja |
|---|---|
| Zbyt długie podsumowania | Konsultanci ich nie czytaja |
| Brak oznaczenia niepewności | Błędne założenia |
| LLM zapisuje bez walidacji | Ryzyko nieprawdziwych danych |
| Brak tagów wynikow | Slaba analityka |
| Brak review dla wysokiego ryzyka | Ryzyko compliance |

## 6.9. Checklista post-call automation

- Czy notatka ma strukture?
- Czy zawiera cel rozmowy?
- Czy zawiera zebrane dane?
- Czy oznacza dane potwierdzone?
- Czy zawiera wynik API?
- Czy zawiera powod handoff?
- Czy jest krótka?
- Czy dane wrażliwe są maskowane?
- Czy konsultant może poprawić notatke?
- Czy mierzymy correction rate?

## 6.10. Mini case study

Helpdesk IT wdrożył voicebota, który nie rozwiązywał wszystkich spraw, ale tworzył kompletne tickety z kategorią, opisem, systemem, priorytetem i lokalizacją. Konsultanci skrócili after-call work i szybciej kierowali zgłoszenia do właściwych zespołów. Automatyzacja częściowa dała większy efekt niż oczekiwano.

## 6.11. Ćwiczenia

1. Napisz dobra notatke po rozmowie reklamacyjnej.
2. Zaprojektuj strukture ticketu.
3. Wskaż pola, które powinny wymagać review.
4. Zaprojektuj metryki jakości notatek.

## 6.12. Podsumowanie

Automatyzacja po rozmowie jest często równie cenna jak automatyzacja rozmowy. Dobre notatki, tagi i aktualizacje systemów zmniejszają koszt operacyjny i poprawiaja jakość handoff.

---

# Rozdział 7. Specyfikacja integracji - szablon praktyczny

## 7.1. Cele rozdziału

Czytelnik otrzymuje gotowy szablon specyfikacji integracji do wykorzystania w projekcie voicebota.

## 7.2. Szablon specyfikacji integracji

```text
1. Informacje podstawowe
- Nazwa integracji:
- Use case:
- System źródłowy:
- Wlasciciel biznesowy:
- Wlasciciel techniczny:
- Srodowiska: dev/test/prod:

2. Cel integracji
- Po co voicebot uzywa tej integracji?
- Czy jest to odczyt, walidacja, zapis, akcja, handoff czy post-call automation?

3. Warunki uzycia
- W jakim stanie dialogu integracja jest wywolywana?
- Jakie sloty sa wymagane?
- Czy wymagana jest weryfikacja użytkownika?
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
- Czy można wypowiedzieć głosem:
- Czy trzeba maskowac:

6. Bledy
- Kod błędu:
- Znaczenie:
- Czy retry:
- Komunikat dla użytkownika:
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

## 7.3. Dobre praktyki użycia szablonu

- Wypelniaj szablon przed implementacja.
- Przegladaj go z biznesem, IT, security i QA.
- Nie akceptuj odpowiedzi "błąd ogólny" bez mapowania.
- Dodaj przykłady request/response w dokumentacji technicznej.
- Powiaz specyfikacje z test cases.
- Aktualizuj po zmianach API.

## 7.4. Mini case study

W projekcie rezerwacyjnym brakowalo decyzji, co robić, gdy API zwraca `slot_conflict`. Developerzy potraktowali to jak ogólny błąd. Bot przekazywal do konsultanta, mimo że mógł zaproponowac kolejny termin. Po uzupelnieniu specyfikacji `slot_conflict` dostał osobna ścieżkę dialogowa: "Ten termin został już zajety. Najblizszy wolny to...".

## 7.5. Podsumowanie

Specyfikacja integracji jest narzędziem zapobiegania chaosowi. Im bardziej szczegółowo opiszesz dane, błędy, timeouty i decyzję, tym mniej niespodzianek pojawi się w rozmowie z użytkownikiem.

---

# 8. Zbiorcza checklista po Części VIII

- Czy voicebot ma integracje potrzebne do realnego wykonania sprawy?
- Czy odrozniono odczyt, walidacje, zapis i akcję?
- Czy każda integracja ma właściciela?
- Czy znamy system źródłowy dla danych?
- Czy mamy sandbox?
- Czy znamy timeouty i błędy?
- Czy zapisy są idempotentne?
- Czy retry jest bezpieczny?
- Czy komunikaty awarii są zrozumiałe?
- Czy weryfikacja odpowiada ryzyku akcji?
- Czy dane osobowe są minimalizowane?
- Czy handoff przekazuje kontekst?
- Czy konsultant widzi podsumowanie?
- Czy automatyczne notatki odrozniaja fakty od niepewności?
- Czy integracje mają dashboard i alerty?

---

# 9. Co będzie w kolejnej części

Kolejna część powinna opracowac **Część IX. Testowanie i QA voicebotów**:

1. Testy scenariuszy i testy konwersacyjne.
2. Testy ASR, NLU, TTS.
3. Testy integracji, telefonii i obciążeniowe.
4. Testy bezpieczeństwa i regresji.
5. Testy z prawdziwymi użytkownikami.
6. Edge cases, emocje i sytuacje trudne.
7. UAT i kompletną checklista przed produkcją.
