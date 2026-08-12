# Rozdział 9. Integracje i automatyzacja procesów

## 9.1. API, webhooki i architektura integracji

### 9.1.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja praktyczna |
|---|---|
| API | Interfejs pozwalający systemom wymieniać dane lub wykonywać akcje |
| Webhook | Wywołanie systemu w reakcji na zdarzenie, np. zakończenie rozmowy |
| Endpoint | Konkretny adres/funkcja API |
| Request | Zapytanie do systemu |
| Response | Odpowiedź systemu |
| Timeout | Maksymalny czas oczekiwania na odpowiedź |
| Retry | Ponowienie zapytania po błędzie |
| Idempotency | Właściwość lub mechanizm projektowy, dzięki któremu ponowienie tej samej akcji nie powinno utworzyć duplikatu |
| Rate limit | Ograniczenie liczby zapytań w czasie |
| Payload | Dane przesyłane w request lub response |

### 9.1.2. Wyjaśnienie eksperckie

Integracja voicebota jest trudniejsza niż integracja formularza, bo użytkownik czeka w rozmowie. Jeśli API odpowiada po 8 sekundach, w aplikacji webowej można pokazać spinner. W rozmowie telefonicznej pojawia się cisza, niepewność i "halo?".

Podstawowe typy integracji:

1. Odczyt danych: status zamówienia, saldo, termin, lista wizyt.
2. Walidacja danych: czy numer zamówienia istnieje, czy kod SMS jest poprawny.
3. Zapis danych: zmiana adresu, rezerwacja, utworzenie ticketu.
4. Akcja zewnętrzna: wysłanie SMS-a, e-maila, linku, powiadomienia.
5. Handoff: przekazanie kontekstu do contact center.
6. Post-call automation: notatka, tagi, aktualizacja CRM.

Najważniejsze rozróżnienie:

- Odczyt danych może być wykonany przy niższym ryzyku.
- Zapis danych i akcje transakcyjne wymagają walidacji, autoryzacji, potwierdzenia i audytu.

### 9.1.3. Perspektywa biznesowa

Integracje decydują, czy bot tworzy realną wartość. Voicebot, który rozpoznaje intencje, ale nie ma dostępu do systemu źródłowego, będzie kończył rozmowy komunikatem "w tej sprawie proszę skontaktować się z konsultantem". To może być pomocne jako routing, ale nie jest pełną automatyzacją.

Pytania biznesowe:

- Czy bot ma tylko informować, czy wykonywać akcje?
- Które akcje są dozwolone automatycznie?
- Które wymagają człowieka?
- Które dane można odczytać głosem?
- Które dane powinny być wysłane SMS-em lub e-mailem?
- Co oznacza sukces integracji?

### 9.1.4. Perspektywa użytkownika

Użytkownik odczuwa integracje jako sprawczość:

- "Bot znalazł moje zamówienie."
- "Bot zmienił termin."
- "Bot wysłał link."
- "Konsultant wie, o co chodzi."

Nie odczuwa API. Odczuwalny jest tylko wynik i sposób komunikacji przy oczekiwaniu lub błędzie.

### 9.1.5. Perspektywa technologiczna

Każda integracja powinna mieć specyfikację:

| Element | Pytanie |
|---|---|
| Cel | Po co bot wywołuje API? |
| System | Jaki system jest źródłem prawdy? |
| Owner | Kto odpowiada za system? |
| Dane wejściowe | Jakie sloty są wymagane? |
| Dane wyjściowe | Co wraca do bota? |
| Timeout | Ile bot może czekać? |
| Retry | Czy ponawiamy? Ile razy? |
| Idempotency | Czy akcja zapisująca jest bezpieczna przy ponowieniu? |
| Błędy | Jakie są kody błędów i komunikaty? |
| Audyt | Co logujemy? |
| Prywatność | Co maskujemy? |

### 9.1.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Projektuj integracje przed finalnym dialogiem.
- Oddziel odczyt od zapisu.
- Dla zapisów stosuj idempotency.
- Ustal timeouty z perspektywy rozmowy.
- Mapuj błędy techniczne na zrozumiałe komunikaty.
- Nie wypowiadaj danych wrażliwych bez potrzeby.
- Testuj sandbox i produkcyjny kanał.
- Loguj request ID, wynik i czas odpowiedzi.

### 9.1.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Projekt dialogu bez znajomości API | Flow obiecuje rzeczy niewykonalne |
| Brak timeoutów | Martwa cisza w rozmowie |
| Brak idempotency | Duplikaty rezerwacji lub ticketów |
| Jeden komunikat dla wszystkich błędów | Użytkownik nie wie, co się stało |
| Brak właściciela integracji | Problemy utrzymaniowe |
| Brak sandboxa | Testy są ryzykowne |

### 9.1.8. Checklista integracji API

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy system źródłowy jest wskazany?
- Czy API istnieje?
- Czy znamy właściciela?
- Czy mamy sandbox?
- Czy znamy wymagane dane?
- Czy znamy timeout?
- Czy znamy błędy?
- Czy akcje zapisujące są idempotentne?
- Czy dane wrażliwe są maskowane?
- Czy bot ma komunikat na awarie?

### 9.1.9. Mini case study

Voicebot rezerwacyjny mógł utworzyć wizytę, ale API kalendarza czasem odpowiadało po utworzeniu wpisu dopiero po kilku sekundach. Bot ponawiał request i tworzył duplikaty. Po dodaniu `idempotency_key` opartego na `conversation_id`, pacjencie i terminie, ponowienie zwracało istniejącą rezerwację zamiast tworzyć nową.

### 9.1.10. Podsumowanie

API i webhooki są mostem między rozmową a procesem. Dobra integracja jest szybka, bezpieczna, audytowalna i zaprojektowana pod rytm rozmowy głosowej.

---

## 9.2. CRM, ERP, ticketing, helpdesk, kalendarze i systemy rezerwacyjne

### 9.2.1. Kluczowe systemy

| System | Typowe użycie w voicebocie |
|---|---|
| CRM | Dane klienta, historia kontaktu, segment, zgody |
| ERP | Zamówienia, faktury, produkty, operacje biznesowe |
| OMS | Order Management System, status zamówień i dostaw |
| Ticketing | Tworzenie i aktualizacja zgłoszeń |
| Helpdesk IT | Incydenty, kategorie, priorytety, baza użytkowników |
| Kalendarz/rezerwacje | Wizyty, dostępne terminy, zmiany, odwołania |
| Płatności | Linki do płatności, status płatności, deklaracje |
| Knowledge base | Odpowiedzi informacyjne, procedury, instrukcje |
| Contact center | Kolejki, transfery, agent desktop, nagrania |

### 9.2.2. Wyjaśnienie eksperckie

Każdy system ma inną rolę:

- CRM mówi, kim jest klient i jaką ma historię.
- ERP lub OMS mówi, jaki jest stan procesu.
- Ticketing zapisuje sprawę do dalszej obsługi.
- Kalendarz pozwala zarezerwować termin.
- Contact center przejmuje rozmowę.
- Baza wiedzy wyjaśnia procedury.

Voicebot nie powinien łączyć się ze wszystkim naraz tylko dlatego, że to możliwe. Zakres integracji powinien wynikać z use case'u.

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

### 9.2.3. Perspektywa biznesowa

Integracje są często najdroższym i najbardziej ryzykownym elementem projektu. Warto odróżniać:

- integracje konieczne do MVP;
- integracje zwiększające wartość;
- integracje, które można zastąpić ticketem;
- integracje przyszłościowe.

Dobre pytanie:

"Czy bez tej integracji bot nadal dostarczy wartość w MVP?"

### 9.2.4. Perspektywa użytkownika

Użytkownik nie chce wiedzieć, z ilu systemów korzysta bot. Chce, aby odpowiedź była spójna. Jeśli CRM mówi co innego niż system zamówień, bot musi mieć regułę źródła prawdy albo przekazać sprawę do człowieka.

### 9.2.5. Perspektywa technologiczna

Typowe dane i akcje:

| Use case | Dane | Akcje |
|---|---|---|
| Status zamówienia | order_id, status, ETA | odczyt statusu, SMS |
| Zmiana wizyty | pacjent, dostępne sloty | rezerwacja, zmiana, anulowanie |
| Helpdesk | user_id, asset, category | ticket, reset, instrukcja |
| Reklamacja | klient, produkt, powód | ticket, załączniki poza kanałem |
| Płatność | saldo, link, status | wysłanie linku, deklaracja |

### 9.2.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Wybierz system źródłowy dla każdego typu danych.
- Nie powielaj logiki biznesowej w wielu miejscach.
- Dla ticketingu określ minimalne pola wymagane.
- Dla kalendarzy sprawdź konflikt terminów tuż przed zapisem.
- Dla CRM minimalizuj dane wypowiadane głosem.
- Dla helpdesku nie zbieraj haseł.
- Dla płatności unikaj wypowiadania wrażliwych danych.

### 9.2.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Integracja ze złym systemem źródłowym | Nieaktualne dane |
| Zbyt szeroki zakres integracji | Opóźnienia projektu |
| Brak minimalnych pól ticketu | Zgłoszenia bezużyteczne |
| Brak reguły konfliktu kalendarza | Podwójne rezerwacje |
| Odczytywanie nadmiaru danych z CRM | Ryzyko prywatności |

### 9.2.8. Checklista systemów

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy wiemy, który system jest źródłem prawdy?
- Czy dane są aktualne?
- Czy API pozwala na potrzebną akcję?
- Czy akcja ma walidację?
- Czy system ma sandbox?
- Czy są limity i SLA?
- Czy mamy właściciela systemu?
- Czy błędy są opisane?
- Czy dane są minimalizowane?

### 9.2.9. Mini case study

Voicebot helpdeskowy tworzył tickety, ale konsultanci musieli je przepisywać, bo brakowało kategorii, priorytetu i lokalizacji użytkownika. Po analizie ticketingu dodano wymagane sloty i mapowanie kategorii. Bot nie tylko tworzył ticket, ale tworzył ticket użyteczny.

### 9.2.10. Podsumowanie

Integracje powinny być projektowane według procesu, nie według ambicji technologicznej. Dobry voicebot korzysta z tylu systemów, ile potrzeba, aby bezpiecznie i skutecznie załatwić sprawę.

---

## 9.3. Weryfikacja użytkownika, autoryzacja i minimalizacja danych

### 9.3.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Identyfikacja | Ustalenie, kim prawdopodobnie jest użytkownik |
| Weryfikacja | Potwierdzenie tożsamości użytkownika |
| Autoryzacja | Sprawdzenie, czy użytkownik może wykonać daną akcję |
| MFA | Multi-factor authentication |
| PII | Dane osobowe |
| Sensitive data | Dane wrażliwe lub szczególnie chronione |
| Data minimization | Zbieranie i ujawnianie tylko potrzebnych danych |

### 9.3.2. Wyjaśnienie eksperckie

Identyfikacja, weryfikacja i autoryzacja to trzy różne kroki.

Przykład:

- Numer telefonu wskazuje prawdopodobnego klienta: identyfikacja.
- Kod SMS potwierdza dostęp do telefonu: weryfikacja.
- System sprawdza, czy klient może zmienić adres zamówienia: autoryzacja.

W voicebocie nie wolno zakładać, że osoba dzwoniąca z numeru klienta jest zawsze klientem. Telefon może być współdzielony, skradziony albo obsługiwany przez osobę trzecią.

### 9.3.3. Perspektywa biznesowa

Poziom weryfikacji zależy od ryzyka:

| Akcja | Poziom weryfikacji |
|---|---|
| Ogólne FAQ | Brak lub minimalny |
| Status niskiego ryzyka | Lekka weryfikacja |
| Zmiana danych kontaktowych | Silniejsza weryfikacja |
| Płatności i finanse | Silna weryfikacja |
| Dane medyczne | Wysoka ostrożność |
| Anulowanie/zmiana umowy | Explicit confirmation + audyt |

### 9.3.4. Perspektywa użytkownika

Weryfikacja jest kosztem UX. Użytkownik zaakceptuje ją, jeśli rozumie po co:

"Dla bezpieczeństwa wyślę kod SMS. Proszę podać kod z wiadomości."

Nie warto prosić o dane, które nie są potrzebne. Każde dodatkowe pytanie zwiększa tarcie i ryzyko.

### 9.3.5. Perspektywa technologiczna

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

### 9.3.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Stosuj risk-based verification.
- Nie wypowiadaj pełnych danych osobowych bez potrzeby.
- Nie proś o hasła.
- Kody jednorazowe traktuj ostrożnie.
- Potwierdzaj tylko fragmenty danych, np. ostatnie 3 cyfry.
- Loguj zdarzenia weryfikacji.
- Po nieudanej weryfikacji nie zdradzaj, które dane były poprawne.
- Eskaluj przy podejrzeniu nadużycia.

### 9.3.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Numer telefonu jako jedyna weryfikacja | Ryzyko nadużyć |
| Prośba o hasło | Poważny błąd bezpieczeństwa |
| Odczytywanie pełnych danych | Ryzyko prywatności |
| Ten sam poziom weryfikacji dla wszystkiego | Nadmierne tarcie lub ryzyko |
| Brak limitu prób | Ryzyko brute force |
| Brak audytu | Trudno wyjaśnić incydent |

### 9.3.8. Checklista weryfikacji

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy akcja wymaga weryfikacji?
- Czy poziom weryfikacji odpowiada ryzyku?
- Czy nie zbieramy nadmiaru danych?
- Czy nie prosimy o hasło?
- Czy kody mają limit prób?
- Czy dane są maskowane?
- Czy logujemy zdarzenia?
- Czy jest procedura nieudanej weryfikacji?
- Czy jest handoff dla sytuacji nietypowych?

### 9.3.9. Mini case study

Voicebot bankowy rozpoznawał klienta po numerze telefonu i odczytywał saldo. Security zatrzymało projekt. Po zmianie bot po numerze telefonu tylko identyfikował rekord, ale przed informacją o saldzie wymagał dodatkowej weryfikacji. Dla ogólnych informacji o placówkach weryfikacja nie była wymagana.

### 9.3.10. Podsumowanie

Weryfikacja i autoryzacja są elementem projektowania rozmowy, nie tylko IT. Dobry voicebot chroni dane i jednocześnie nie utrudnia prostych spraw ponad potrzebę.

---

## 9.4. Obsługa błędów integracji, retry logic, timeouty i graceful degradation

### 9.4.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Timeout | Przekroczenie czasu oczekiwania na system |
| Retry | Ponowienie zapytania |
| Circuit breaker | Tymczasowe odcięcie zawodnej integracji |
| Graceful degradation | Przejście do ograniczonego, ale kontrolowanego trybu |
| Error mapping | Mapowanie błędów technicznych na komunikaty i decyzje |
| Fallback channel | Alternatywny kanał, np. SMS, e-mail, konsultant |

### 9.4.2. Wyjaśnienie eksperckie

Integracje zawodzą. Pytanie nie brzmi "czy", tylko "jak bot się zachowa".

Typy błędów:

- API timeout;
- system niedostępny;
- brak rekordu;
- brak uprawnienia;
- konflikt danych;
- walidacja nie przeszła;
- limit zapytań;
- częściowy sukces;
- błąd zapisu po stronie systemu;
- niejednoznaczny wynik.

Zły komunikat:

"Wystąpił błąd systemu 504."

Dobry:

"Nie mogę teraz sprawdzić tych danych. Mogę połączyć z konsultantem albo wysłać link do samodzielnego sprawdzenia."

### 9.4.3. Perspektywa biznesowa

Błędy integracji wpływają na:

- SLA;
- porzucenia;
- eskalację;
- reputację;
- koszt konsultantów;
- zaufanie do automatyzacji.

Trzeba uzgodnić, które błędy:

- można ponowić;
- wymagają konsultanta;
- wymagają ticketu;
- wymagają komunikatu o niedostępności;
- wymagają zatrzymania całego use case'u.

### 9.4.4. Perspektywa użytkownika

Użytkownik nie musi znać przyczyny technicznej. Potrzebuje:

- krótkiego wyjaśnienia;
- opcji dalszego działania;
- zapewnienia, że dane nie zostały utracone, jeśli to prawda;
- potwierdzenia, czy akcja została wykonana.

Nigdy nie mów "gotowe", jeśli wynik jest niepewny.

### 9.4.5. Perspektywa technologiczna

Retry:

- bezpieczny dla odczytu;
- ostrożny dla zapisu;
- dla zapisu tylko z idempotency;
- z limitem prób;
- z logowaniem.

Timeouty:

- krótsze dla prostych kroków;
- dłuższe dla akcji, gdzie użytkownik dostaje filler;
- ustawiane według UX, nie tylko default API.

### 9.4.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Miej error mapping dla każdej integracji.
- Dla operacji dłuższych niż 1-2 sekundy dawaj krótki filler.
- Nie ponawiaj zapisu bez idempotency.
- Loguj błędy techniczne, ale komunikuj je po ludzku.
- Przy niepewnym wyniku eskaluj lub sprawdź status akcji.
- Przy awarii globalnej wyłączaj dany flow lub kieruj do konsultanta.

### 9.4.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Retry zapisu bez idempotency | Duplikaty |
| Martwa cisza przy API | Użytkownik przerywa |
| "Błąd systemu" w TTS | Brak zrozumiałego następnego kroku |
| Brak rozróżnienia błędów | Złe decyzje dialogowe |
| Bot potwierdza niepewny wynik | Reklamacje |
| Brak monitoringu błędów | Awaria widoczna dopiero w skargach |

### 9.4.8. Checklista error handling

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy każde API ma timeout?
- Czy każde API ma opis błędów?
- Czy retry jest bezpieczny?
- Czy zapisy mają idempotency?
- Czy mamy komunikaty dla błędów?
- Czy mamy filler dla oczekiwania?
- Czy wiemy, kiedy eskalować?
- Czy błędy są logowane?
- Czy dashboard pokazuje awarie integracji?

### 9.4.9. Mini case study

Voicebot ubezpieczeniowy tworzył zgłoszenia szkody. Gdy API ticketingu zwracało timeout, bot mówił "zgłoszenie przyjęte". Czasem ticket nie powstawał. Po poprawie bot sprawdzał status po `idempotency_key`; jeśli wynik nadal był niepewny, mówił: "Nie mam potwierdzenia zapisu. Połączę z konsultantem i przekażę zebrane informacje." Skargi spadły.

### 9.4.10. Podsumowanie

Błędy integracji są normalne. Profesjonalny voicebot nie udaje, że wszystko zawsze działa. Ma kontrolowane komunikaty, alternatywne ścieżki, audyt i jasną granicę między sukcesem a niepewnością.

---

## 9.5. Przekazywanie kontekstu do konsultanta

### 9.5.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Warm handoff | Przekazanie rozmowy z kontekstem |
| Cold handoff | Przekazanie bez kontekstu |
| Context package | Zestaw informacji przekazywanych konsultantowi |
| Agent desktop | Interfejs konsultanta |
| Handoff reason | Powód przekazania |
| Summary | Krótkie podsumowanie dotychczasowej rozmowy |

### 9.5.2. Wyjaśnienie eksperckie

Handoff nie jest tylko transferem połączenia. To transfer odpowiedzialności za sprawę. Konsultant powinien wiedzieć:

- kto dzwoni, jeśli zweryfikowany;
- jaka była intencja;
- jakie dane zebrano;
- co bot próbował zrobić;
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

### 9.5.3. Perspektywa biznesowa

Warm handoff zmniejsza:

- czas konsultanta;
- powtarzanie danych;
- frustrację klienta;
- after-call work;
- ryzyko utraty informacji.

Cold handoff może zniszczyć wartość automatyzacji. Jeśli klient musi wszystko powtórzyć, bot staje się dodatkową przeszkodą.

### 9.5.4. Perspektywa użytkownika

Komunikat powinien ustawić oczekiwanie:

"Połączę z konsultantem i przekażę, że chodzi o zmianę terminu dostawy zamówienia 12345. Proszę zostać na linii."

Po stronie konsultanta pierwsze zdanie powinno pokazywać kontekst:

"Widzę, że chodzi o zmianę terminu dostawy. Bot nie mógł znaleźć wolnego terminu w piątek."

### 9.5.5. Perspektywa technologiczna

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

### 9.5.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Przekazuj tylko potrzebny kontekst.
- Streszczenie powinno być krótkie.
- Oznacz powód handoff.
- Nie przekazuj niezweryfikowanych danych jako pewnych.
- Dodaj link do transkrypcji, jeśli zgodne z polityką.
- Konsultant powinien widzieć ostatnie pytanie bota.
- Mierz, czy konsultant używa kontekstu.

### 9.5.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Transfer bez kontekstu | Klient powtarza wszystko |
| Za długie podsumowanie | Konsultant nie czyta |
| Brak powodu handoff | Brak optymalizacji |
| Przekazanie niepotwierdzonych danych jako faktów | Ryzyko błędów |
| Brak fallbacku dla context push | Konsultant dostaje pustą sprawę |

### 9.5.8. Checklista handoff context

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy przekazujemy intencje?
- Czy przekazujemy zebrane sloty?
- Czy oznaczamy dane potwierdzone?
- Czy przekazujemy powód handoff?
- Czy przekazujemy wynik API?
- Czy jest krótkie podsumowanie?
- Czy konsultant widzi transkrypcję?
- Czy dane są maskowane?
- Czy mierzymy jakość handoff?

### 9.5.9. Mini case study

Voicebot reklamacyjny przekazywał rozmowy do konsultanta bez powodów. Contact center widziało tylko "transfer from bot". Po wdrożeniu taxonomy handoff reason okazało się, że 38% przekazań dotyczyło braku dokumentu, który można było wysłać linkiem SMS. Dodano nowy flow i liczba transferów spadła.

### 9.5.10. Podsumowanie

Dobry handoff to kontynuacja rozmowy, nie restart. Integracja z contact center musi przenosić sens sprawy, nie tylko dźwięk połączenia.

---

## 9.6. Automatyczne notatki, podsumowania i aktualizacja danych po rozmowie

### 9.6.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Post-call automation | Automatyzacja po rozmowie |
| Call summary | Podsumowanie rozmowy |
| Disposition | Wynik rozmowy lub kategoria zakończenia |
| Auto-tagging | Automatyczne tagowanie tematów |
| After-call work reduction | Zmniejszenie pracy po rozmowie |
| Human review | Przegląd przez człowieka przed zapisem lub decyzja |

### 9.6.2. Wyjaśnienie eksperckie

Voicebot może automatyzować nie tylko samą rozmowę. Może też:

- tworzyć notatkę;
- tagować powód kontaktu;
- aktualizować status sprawy;
- tworzyć ticket;
- wysyłać SMS/e-mail;
- przygotować follow-up;
- streszczać rozmowę konsultantowi;
- oznaczać ryzyka i emocje;
- zasugerować kolejny krok.

Notatka dobra:

```text
Klient chcial zmienic termin dostawy zamowienia 12345.
Zweryfikowany po kodzie SMS.
Wybrany termin: piatek 14-16.
API delivery_slots zwrocilo slot_unavailable.
Klient poprosil o konsultanta.
```

Notatka zła:

"Klient dzwonił w sprawie zamówienia. Bot pomagał. Rozmowa zakończona transferem."

### 9.6.3. Perspektywa biznesowa

Automatyczne notatki mogą oszczędzać dużo czasu konsultantów, nawet jeśli bot nie zamyka sprawy end-to-end. To często niedoceniany element ROI.

Metryki:

- reduction in after-call work;
- note acceptance rate;
- correction rate;
- ticket completeness;
- tag accuracy;
- time to resolution;
- consultant satisfaction.

### 9.6.4. Perspektywa użytkownika

Użytkownik zyskuje, gdy nie musi powtarzać i gdy follow-up jest poprawny. Traci, gdy notatka zawiera błąd i konsultant zaczyna od złego założenia. Dlatego dane niepewne muszą być oznaczone.

### 9.6.5. Perspektywa technologiczna

Podsumowania mogą być:

- template-based;
- LLM-generated;
- hybrydowe: struktura szablonowa + LLM do streszczenia swobodnej części.

Bezpieczny model:

- pola strukturalne z flow i API;
- LLM tylko do krótkiego streszczenia;
- oznaczenie confidence;
- human review dla ryzykownych spraw;
- log wersji promptu;
- maskowanie danych.

### 9.6.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Notatka powinna być krótka i operacyjna.
- Oddziel fakty potwierdzone od niepewnych.
- Nie wpisuj do CRM halucynacji.
- Dla spraw ryzykownych dawaj human review.
- Taguj powód kontaktu i wynik rozmowy.
- Przechowuj link do transkrypcji, jeśli wolno.
- Mierz, ile notatek konsultanci poprawiają.

### 9.6.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Zbyt długie podsumowania | Konsultanci ich nie czytają |
| Brak oznaczenia niepewności | Błędne założenia |
| LLM zapisuje bez walidacji | Ryzyko nieprawdziwych danych |
| Brak tagów wyników | Słaba analityka |
| Brak review dla wysokiego ryzyka | Ryzyko compliance |

### 9.6.8. Checklista post-call automation

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy notatka ma strukturę?
- Czy zawiera cel rozmowy?
- Czy zawiera zebrane dane?
- Czy oznacza dane potwierdzone?
- Czy zawiera wynik API?
- Czy zawiera powód handoff?
- Czy jest krótka?
- Czy dane wrażliwe są maskowane?
- Czy konsultant może poprawić notatkę?
- Czy mierzymy correction rate?

### 9.6.9. Mini case study

Helpdesk IT wdrożył voicebota, który nie rozwiązywał wszystkich spraw, ale tworzył kompletne tickety z kategorią, opisem, systemem, priorytetem i lokalizacją. Konsultanci skrócili after-call work i szybciej kierowali zgłoszenia do właściwych zespołów. Automatyzacja częściowa dała większy efekt niż oczekiwano.

### 9.6.10. Podsumowanie

Automatyzacja po rozmowie jest często równie cenna jak automatyzacja rozmowy. Dobre notatki, tagi i aktualizacje systemów zmniejszają koszt operacyjny i poprawiają jakość handoff.

---

## 9.7. Specyfikacja integracji - szablon praktyczny

### 9.7.1. Szablon specyfikacji integracji

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

### 9.7.2. Dobre praktyki użycia szablonu

- Wypełniaj szablon przed implementacją.
- Przeglądaj go z biznesem, IT, security i QA.
- Nie akceptuj odpowiedzi "błąd ogólny" bez mapowania.
- Dodaj przykłady request/response w dokumentacji technicznej.
- Powiąż specyfikację z test cases.
- Aktualizuj po zmianach API.

### 9.7.3. Mini case study

W projekcie rezerwacyjnym brakowało decyzji, co robić, gdy API zwraca `slot_conflict`. Developerzy potraktowali to jak ogólny błąd. Bot przekazywał do konsultanta, mimo że mógł zaproponować kolejny termin. Po uzupełnieniu specyfikacji `slot_conflict` dostał osobną ścieżkę dialogową: "Ten termin został już zajęty. Najbliższy wolny to...".

### 9.7.4. Podsumowanie

Specyfikacja integracji jest narzędziem zapobiegania chaosowi. Im bardziej szczegółowo opiszesz dane, błędy, timeouty i decyzje, tym mniej niespodzianek pojawi się w rozmowie z użytkownikiem.

---

## 9.8. Zbiorcza checklista po Części VIII

Ta checklista zbiera najważniejsze pytania po całej części. Najlepiej przejść ją po zakończeniu projektu rozdziałów i zaznaczyć miejsca, które wymagają decyzji, doprecyzowania albo testów.

- Czy voicebot ma integracje potrzebne do realnego wykonania sprawy?
- Czy odróżniono odczyt, walidację, zapis i akcje?
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
- Czy automatyczne notatki odróżniają fakty od niepewności?
- Czy integracje mają dashboard i alerty?

---
