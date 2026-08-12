# Rozdział 11. Metryki, analityka i optymalizacja

## 11.1. Rodzaje metryk voicebota

### 11.1.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja praktyczna |
|---|---|
| Metric | Liczbowa miara zjawiska |
| KPI | Kluczowy wskaźnik efektywności |
| Leading indicator | Wczesny sygnał problemu lub sukcesu |
| Lagging indicator | Metryka wynikowa widoczna po czasie |
| Baseline | Punkt odniesienia sprzed wdrożenia |
| Cohort | Grupa rozmów lub użytkowników analizowana razem |
| Funnel | Sekwencja kroków i spadków w procesie |

### 11.1.2. Wyjaśnienie eksperckie

Metryki voicebota warto dzielić na pięć grup:

1. Techniczne: uptime, latency, błędy API, jakość audio, koszt modeli.
2. Konwersacyjne: intencje, sloty, no-input, no-match, fallback, barge-in, przerwania.
3. Biznesowe: task completion, automation, cost per contact, ROI, FCR, repeat contact.
4. UX/jakościowe: CSAT, effort, frustration signals, abandonment, prośby o konsultanta.
5. Compliance/security: naruszenia polityk, dane wrażliwe, zgody, audyt, prompt injection.

Zła praktyka:

"Bot obsłużył 50 000 rozmów."

Dobra praktyka:

"Bot obsłużył 50 000 rozmów, z czego 31 000 zakończył skutecznym task completion, 8 000 przekazał z kontekstem, 5 500 zakończył fallbackiem, a 2 300 rozmów miało repeat contact w ciągu 48 godzin."

### 11.1.3. Perspektywa biznesowa

Biznes potrzebuje metryk, które odpowiadają na pytania:

- czy bot zmniejsza koszt;
- czy klient załatwia sprawę;
- czy spada repeat contact;
- czy konsultanci są odciążeni;
- czy SLA się poprawia;
- czy jakość nie spada;
- czy ryzyka są kontrolowane.

Metryki muszą mieć baseline. Bez porównania do stanu sprzed wdrożenia trudno odróżnić realny efekt od sezonowości lub zmiany wolumenu.

### 11.1.4. Perspektywa użytkownika

Metryki powinny chronić użytkownika przed automatyzacją pozorną. Jeśli containment rośnie, ale repeat contact i skargi też rosną, bot zatrzymuje ludzi, ale nie pomaga.

Metryki ochronne:

- repeat contact;
- abandonment;
- prośby o konsultanta;
- liczba powtórzeń;
- fallback po fallbacku;
- CSAT;
- customer effort score;
- czas do rozwiązania sprawy.

### 11.1.5. Perspektywa technologiczna

Metryki wymagają logów:

- conversation_id;
- turn_id;
- prompt_id;
- intent;
- confidence;
- slot status;
- no-input/no-match/fallback;
- API call/result/latency;
- handoff reason;
- barge-in event;
- ASR transcript;
- TTS output;
- outcome;
- version modelu/flow/promptu.

### 11.1.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Definiuj metryki przed produkcją.
- Miej baseline.
- Oddziel wolumen od skuteczności.
- Mierz wynik sprawy, nie tylko rozmowy.
- Łącz metryki techniczne z UX.
- Segmentuj metryki per use case, intencja, prompt i kanał.
- Dodaj metryki ochronne.
- Mierz trendy, nie tylko pojedynczy dzień.

### 11.1.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Jedna metryka "liczba rozmów" | Brak informacji o jakości |
| Containment jako jedyny KPI | Ryzyko blokowania klientów |
| Brak baseline | Nie wiadomo, czy jest poprawa |
| Brak repeat contact | Pozorna automatyzacja |
| Brak podziału per intencja | Problemy ukryte w średniej |
| Brak wersji flow/modelu | Nie wiadomo, co zmieniło wynik |

### 11.1.8. Checklista metryk

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy mamy baseline?
- Czy mamy metryki techniczne?
- Czy mamy metryki konwersacyjne?
- Czy mamy metryki biznesowe?
- Czy mamy metryki UX?
- Czy mamy metryki compliance?
- Czy metryki są per use case?
- Czy mamy repeat contact?
- Czy dashboard pokazuje trendy?
- Czy metryki prowadzą do backlogu optymalizacji?

### 11.1.9. Mini case study

Voicebot statusu zamówień miał containment 78%. Po dodaniu repeat contact okazało się, że 22% klientów dzwoni ponownie w ciągu 24 godzin, bo bot podawał status ogólny, ale nie wyjaśniał opóźnienia. Po integracji z ETA i dodaniu komunikatu o przyczynie opóźnienia repeat contact spadł.

### 11.1.10. Podsumowanie

Metryki voicebota muszą pokazywać nie tylko aktywność systemu, ale wynik rozmowy. Dobry dashboard odpowiada: co działa, co nie działa, dlaczego i co trzeba poprawić.

---

## 11.2. Containment, automation rate i task completion

### 11.2.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Containment rate | Odsetek rozmów nieprzekazanych do konsultanta |
| Automation rate | Odsetek rozmów, w których bot wykonał automatyczną akcję lub proces |
| Task completion rate | Odsetek rozmów, w których cel użytkownika został skutecznie osiągnięty |
| Self-service success | Udane załatwienie sprawy bez człowieka |
| Deflection | Odsunięcie kontaktu od konsultanta, nie zawsze równe sukcesowi |
| Outcome taxonomy | Uporządkowane kategorie wyniku rozmowy |

### 11.2.2. Wyjaśnienie eksperckie

Te trzy metryki są często mylone.

Containment:

- klient nie trafił do konsultanta.
- Nie oznacza automatycznie, że sprawa została rozwiązana.

Automation:

- bot wykonał czynność: sprawdził status, zmienił termin, utworzył ticket.
- Nie oznacza automatycznie, że klient jest zadowolony.

Task completion:

- cel użytkownika został osiągnięty.
- To najbliższa metryka realnego sukcesu.

Przykład:

Użytkownik pyta o status zwrotu. Bot mówi ogólnie "zwrot trwa do 14 dni" i kończy rozmowę.

- Containment: tak.
- Automation: niekoniecznie.
- Task completion: raczej nie, jeśli użytkownik chciał status konkretnego zwrotu.

### 11.2.3. Outcome taxonomy

Przykładowe wyniki:

| Outcome | Znaczenie |
|---|---|
| completed_by_bot | Bot załatwił sprawę end-to-end |
| completed_with_ticket | Bot zebrał dane i utworzył użyteczny ticket |
| handed_off_with_context | Bot przekazał do konsultanta z kontekstem |
| handed_off_no_context | Bot przekazał bez kontekstu |
| abandoned | Użytkownik rozłączył się |
| failed_understanding | Bot nie zrozumiał |
| failed_integration | Integracja zawiodła |
| out_of_scope | Sprawa poza zakresem |
| user_declined_bot | Użytkownik nie chciał automatyzacji |

### 11.2.4. Perspektywa biznesowa

Containment może być metryką pomocniczą, ale nie powinna być jedynym KPI. Firma może sztucznie podnieść containment, utrudniając handoff. To niszczy zaufanie i może zwiększyć repeat contact.

Lepszy zestaw:

- task completion;
- containment;
- repeat contact;
- CSAT;
- handoff quality;
- cost per resolved task.

### 11.2.5. Perspektywa użytkownika

Użytkownik nie mierzy containment. Mierzy:

- czy sprawa została załatwiona;
- czy musiał powtarzać;
- czy dostał człowieka, gdy potrzebowal;
- czy ma potwierdzenie;
- czy nie musi dzwonić drugi raz.

### 11.2.6. Perspektywa technologiczna

Task completion musi być zdefiniowany per use case:

| Use case | Completion event |
|---|---|
| Status zamówienia | Status konkretnego zamówienia podany lub wysłany |
| Zmiana terminu | API potwierdziło zmianę, SMS wysłany |
| Rezerwacja | Termin zapisany w kalendarzu |
| Ticket IT | Ticket utworzony z wymaganymi polami |
| FAQ | Odpowiedź z zatwierdzonego źródła, brak kolejnego fallbacku |

### 11.2.7. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Definiuj completion event per use case.
- Nie licz containment jako sukcesu bez outcome.
- Dodaj repeat contact.
- Oddziel handoff z kontekstem od handoff bez kontekstu.
- Mierz cost per completed task.
- Analizuj failed outcomes.
- Ustal outcome taxonomy przed produkcją.

### 11.2.8. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Containment jako główny cel | Bot blokuje klientów |
| Brak completion event | Nie wiadomo, co jest sukcesem |
| Handoff traktowany jako porażka | Zniechęca do bezpiecznej eskalacji |
| Brak repeat contact | Fałszywy sukces |
| Brak kategorii failed integration | Problemy techniczne ukryte jako fallback |

### 11.2.9. Checklista

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy mamy definicje task completion?
- Czy mamy outcome taxonomy?
- Czy rozróżniono containment i automation?
- Czy mierzony jest repeat contact?
- Czy handoff z kontekstem ma osobną kategorię?
- Czy failed outcomes są klasyfikowane?
- Czy dashboard pokazuje cost per completed task?

### 11.2.10. Mini case study

Voicebot helpdeskowy miał containment tylko 45%, ale tworzył kompletne tickety i skracał pracę konsultanta. Po zmianie KPI z containment na "completed_by_bot + completed_with_ticket + AHT reduction" projekt okazał się wartościowy. Sama metryka containment źle oceniała automatyzację wspierającą.

### 11.2.11. Podsumowanie

Containment jest łatwy do mierzenia, ale łatwy do nadużycia. Task completion i repeat contact lepiej pokazują, czy voicebot pomaga. Automation rate pokazuje, czy bot wykonuje proces, a nie tylko prowadzi rozmowę.

---

## 11.3. Fallback, escalation, no-input, no-match i przerwania

### 11.3.1. Kluczowe metryki

Metryki są użyteczne dopiero wtedy, gdy wiadomo, jaką decyzję pomagają podjąć. Poniższa tabela nie jest listą liczb do raportu, tylko mapą sygnałów: każda metryka powinna prowadzić do pytania, interpretacji i możliwej poprawki.

| Metryka | Definicja | Co może oznaczać wysoki wynik |
|---|---|---|
| Fallback rate | Odsetek rozmów/tur z fallbackiem | Brak intencji, zły prompt, out-of-scope |
| No-input rate | Brak wykrytej odpowiedzi | Niejasne pytanie, audio, użytkownik szuka danych |
| No-match rate | Input nierozpoznany | NLU, ASR, zbyt otwarte pytanie |
| Escalation rate | Przekazania do człowieka | Złożony proces, frustracja, bezpieczny handoff |
| Abandonment after fallback | Rozlaczenia po fallbacku | Frustracja lub brak drogi wyjścia |
| Interruption rate | Przerwania wypowiedzi bota | Za długie prompt'y, korekty, kontrola |
| False barge-in rate | Fałszywe przerwania | Szum, backchannel, echo |
| Missed barge-in rate | Ignorowane przerwania | Brak pełnego dupleksu, źle VAD |

### 11.3.2. Wyjaśnienie eksperckie

Wysoki fallback rate nie ma jednej przyczyny. Może oznaczać:

- brakuje intencji;
- użytkownicy mówią inaczej niż dataset;
- prompt zadaje źle pytanie;
- ASR źle przepisuje;
- zakres bota jest zbyt wąski;
- użytkownik chce człowieka;
- proces ma za dużo wyjątków.

Dlatego metryki dialogowe trzeba analizować z transkrypcjami i prompt_id.

Przykład:

No-input wysoki przy pytaniu "Jaka placówka jest preferowana?" może wynikać z tego, że użytkownik nie rozumie słowa "placówka". Zmiana na "W którym mieście chce pani wizytę?" może zmniejszyć no-input bez zmiany modelu.

### 11.3.3. Perspektywa biznesowa

Fallbacki i eskalacje pokazują koszt niedojrzałości procesu. Są też źródłem pomysłów:

- nowe intencje;
- zmiana promptów;
- poprawa ASR;
- dodanie integracji;
- zmiana zakresu;
- szybszy handoff.

Nie każda eskalacja jest zła. Eskalacja do konsultanta może być poprawną decyzją, jeśli bot trafia poza zakres lub wykrywa ryzyko.

### 11.3.4. Perspektywa użytkownika

Użytkownik odczuwa metryki dialogowe jako:

- "bot mnie nie rozumie";
- "bot pyta niejasno";
- "bot nie słucha";
- "bot mnie przegaduje";
- "nie mogę dojść do człowieka".

Dlatego interpretacja musi uwzględniać emocje i wysiłek.

### 11.3.5. Perspektywa technologiczna

Do analizy potrzebne:

- prompt_id;
- ASR transcript;
- expected input;
- detected intent;
- confidence;
- fallback type;
- turn timestamp;
- barge-in event;
- endpointing decision;
- handoff reason;
- outcome.

### 11.3.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Analizuj fallback per prompt i per intencja.
- Oddziel no-input od no-match.
- Patrz na abandonment po fallbacku.
- Mierz escalation reason.
- Analizuj przerwania w długich promptach.
- Rozróżniaj false barge-in i true interruption.
- Twórz backlog z top problemów.

### 11.3.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Jeden globalny fallback rate | Brak diagnozy |
| Brak prompt_id | Nie wiadomo, które pytanie jest problemem |
| Eskalacje traktowane zawsze jako porażka | Zniechęcenie do bezpiecznego handoff |
| Brak analizy przerwań | Długie prompt'y pozostają ukrytym problemem |
| Brak rozróżnienia no-input/no-match | Złe poprawki |

### 11.3.8. Checklista analizy

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy fallback jest liczony per prompt?
- Czy no-input i no-match są osobno?
- Czy mamy transkrypcje dla no-match?
- Czy mamy handoff reasons?
- Czy mierzymy abandonment po fallbacku?
- Czy mierzymy interruption rate?
- Czy umiemy rozróżnić false i missed barge-in?
- Czy wyniki trafiają do backlogu?

### 11.3.9. Mini case study

Voicebot windykacyjny miał wysoki escalation rate. Biznes uznał to za porażkę. Analiza handoff reasons pokazała, że dużo eskalacji wynika z fraz "nie zgadzam się" i "to nie moja należność". To prawidłowy handoff, bo spory wymagały człowieka. Zmieniono KPI: eskalacje sporne nie były liczone jako porażka, ale jako bezpieczna klasyfikacja.

### 11.3.10. Podsumowanie

Metryki błędów dialogowych są mapą miejsc, gdzie rozmowa traci płynność. Ich interpretacja wymaga kontekstu: promptu, transkrypcji, intencji, stanu i wyniku rozmowy.

---

## 11.4. ASR confidence, NLU confidence i jakość rozumienia

### 11.4.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| ASR confidence | Szacowana pewność transkrypcji lub fragmentu |
| NLU confidence | Szacowana pewność klasyfikacji intencji/encji |
| Threshold | Próg decyzji |
| Calibration | Dopasowanie confidence do realnej poprawności |
| Low-confidence path | Ścieżka dla niepewnych rozpoznań |
| Critical field accuracy | Poprawność danych krytycznych |

### 11.4.2. Wyjaśnienie eksperckie

Confidence nie jest prawdą. Model może być pewny i się mylić albo niepewny i mieć rację. Dlatego confidence trzeba interpretować w kontekście:

- intencji;
- kosztu błędu;
- stanu dialogu;
- danych krytycznych;
- historii rozmowy;
- poprzednich fallbacków;
- ASR quality.

Przykład:

Niska pewność przy FAQ może prowadzić do doprecyzowania. Niska pewność przy prośbie o konsultanta powinna raczej prowadzić do eskalacji niż blokowania użytkownika.

### 11.4.3. Perspektywa biznesowa

Progi confidence powinny być risk-based:

| Intencja | Strategia |
|---|---|
| Konsultant | Niższy próg recall, eskaluj częściej |
| Anulowanie | Wysoki próg + explicit confirmation |
| Status | Średni próg + disambiguation |
| Płatność | Wysoki próg + weryfikacja |
| FAQ | Średni próg + odpowiedź ze źródłem lub odmową |

### 11.4.4. Perspektywa użytkownika

Użytkownik nie powinien słyszeć technicznego "niski confidence". Powinien dostać naprawę:

"Czy chodzi o fakturę, czy o płatność?"

albo:

"Nie mam pewności, czy dobrze usłyszałem numer. Proszę powtórzyć ostatnie trzy cyfry."

### 11.4.5. Perspektywa technologiczna

Metryki:

- confidence distribution per intent;
- accuracy by confidence bucket;
- false positives above threshold;
- false negatives below threshold;
- entity confidence;
- critical field accuracy;
- low-confidence recovery success.

### 11.4.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Nie używaj jednego progu dla wszystkich intencji.
- Kalibruj confidence na realnych danych.
- Dla intencji ryzykownych dodawaj potwierdzenia.
- Dla meta-intencji "konsultant" preferuj recall.
- Mierz skuteczność low-confidence path.
- Analizuj confidence razem z ASR transcript.

### 11.4.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Jeden threshold globalny | Zły balans ryzyka |
| Wiara w confidence jako prawdę | Błędne decyzje |
| Brak kalibracji | Progi nie mają sensu |
| Brak low-confidence path | Bot zgaduje lub fallbackuje za szybko |
| Brak metryk per bucket | Nie wiadomo, gdzie confidence działa |

### 11.4.8. Checklista confidence

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy progi są per intencja?
- Czy są risk-based?
- Czy mierzona jest kalibracja?
- Czy mamy low-confidence path?
- Czy dane krytyczne mają osobne progi?
- Czy confidence jest analizowany z ASR?
- Czy false positives powyzej progu są monitorowane?

### 11.4.9. Mini case study

Voicebot e-commerce miał próg 0,75 dla wszystkich intencji. Prośby o konsultanta z wynikiem 0,68 trafiały do fallbacku. Po obniżeniu progu dla `popros_o_konsultanta` i dodaniu potwierdzenia dla akcji krytycznych system lepiej równoważył UX i ryzyko.

### 11.4.10. Podsumowanie

Confidence jest użyteczne, ale tylko jako sygnał w systemie decyzyjnym. Dobre progi wynikają z ryzyka, danych i testów, nie z domyślnej konfiguracji platformy.

---

## 11.5. AHT, FCR, CSAT, NPS, cost per contact i ROI

### 11.5.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| AHT | Average Handling Time |
| FCR | First Contact Resolution |
| CSAT | Customer Satisfaction |
| NPS | Net Promoter Score |
| Cost per contact | Koszt kontaktu |
| Cost per resolved task | Koszt skutecznie rozwiązanej sprawy |
| ROI | Zwrot z inwestycji |

### 11.5.2. Wyjaśnienie eksperckie

Voicebot może wpływać na metryki na kilka sposobów:

- skraca rozmowy prostych spraw;
- przekazuje trudne sprawy z kontekstem;
- zmniejsza kolejki;
- zwiększa self-service;
- zmniejsza after-call work;
- poprawia tagowanie kontaktów;
- może pogorszyć CSAT, jeśli blokuje handoff;
- może zwiększyć repeat contact, jeśli odpowiedzi są niepełne.

ROI po wdrożeniu powinien uwzględniać:

```text
wartosc = oszczednosc rozmow automatycznych
        + oszczednosc AHT konsultantow po handoff
        + oszczednosc after-call work
        + wartosc zmniejszenia abandonment
        - koszty technologii
        - koszty utrzymania
        - koszty optymalizacji
        - koszty błędów/reklamacji
```

### 11.5.3. Perspektywa biznesowa

Najważniejsze: mierz koszt skutecznie rozwiązanej sprawy, nie tylko koszt rozmowy bota. Tania rozmowa, która powoduje drugi telefon, może być droższa niż droższa rozmowa zakończona skutecznie.

### 11.5.4. Perspektywa użytkownika

CSAT/NPS trzeba interpretować ostrożnie. Użytkownik może nisko ocenić bota, bo:

- nie lubi automatyzacji;
- bot rzeczywiście zawiódł;
- sprawa była negatywna niezaleznie od bota;
- handoff był za późny;
- odpowiedź była poprawna, ale niekorzystna dla użytkownika.

Dlatego oceny trzeba łączyć z outcome i transkrypcją.

### 11.5.5. Perspektywa technologiczna

Potrzebne integracje danych:

- system contact center;
- voicebot logs;
- CRM/ticketing;
- CSAT/NPS system;
- billing/costing;
- repeat contact matching;
- release versions.

### 11.5.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Porównuj do baseline.
- Mierz per use case.
- Oddziel rozmowy zakończone przez bota od handoff.
- Dodaj repeat contact.
- Licz cost per resolved task.
- Łącz CSAT z outcome.
- Uwzględniaj after-call work.
- Raportuj scenariusz pesymistyczny/bazowy/optymistyczny.

### 11.5.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Liczenie tylko kosztu minuty bota | Pomija skuteczność |
| Brak repeat contact | ROI zawyzony |
| Porównywanie innych okresów bez sezonowości | Zła interpretacja |
| CSAT bez segmentacji | Brak diagnozy |
| Brak kosztów utrzymania | ROI zawyzony |

### 11.5.8. Checklista biznesowych metryk

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy mamy AHT baseline?
- Czy mamy FCR baseline?
- Czy mamy koszt kontaktu?
- Czy mamy CSAT/NPS?
- Czy mierzymy repeat contact?
- Czy liczymy cost per resolved task?
- Czy uwzględniamy koszty technologii?
- Czy uwzględniamy after-call work?
- Czy ROI jest per use case?

### 11.5.9. Mini case study

Voicebot w telekomie obsługiwał 40% rozmów o awarie. AHT konsultantów wzrósł, bo zostały trudniejsze sprawy. Początkowo uznano to za porażkę. Po analizie okazało się, że całkowity koszt spadł, a konsultanci dostawali lepszy kontekst. Trzeba było zmienić dashboard: osobno mierzyć sprawy proste, handoff i trudne eskalacje.

### 11.5.10. Podsumowanie

Metryki contact center są potrzebne, ale muszą być interpretowane w kontekście automatyzacji. Voicebot zmienia mix spraw, dlatego proste porównania średnich mogą mylić.

---

## 11.6. Conversion, abandonment i repeat contact

### 11.6.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Conversion rate | Odsetek rozmów zakończonych pożądaną akcją |
| Abandonment rate | Odsetek rozmów porzuconych |
| Drop-off | Miejsce w flow, gdzie użytkownik odpada |
| Repeat contact | Ponowny kontakt w tej samej sprawie |
| Cohort analysis | Analiza grup rozmów/użytkowników w czasie |
| Time window | Okno czasu do pomiaru powtornego kontaktu |

### 11.6.2. Wyjaśnienie eksperckie

Conversion w voicebocie nie musi oznaczać sprzedaży. Może oznaczać:

- umowiona wizyta;
- zmieniony termin;
- utworzony ticket;
- wysłany link;
- zaakceptowana ankieta;
- zebrana deklaracja;
- kwalifikowany lead.

Abandonment trzeba interpretować według momentu:

- porzucenie na powitaniu: brak zaufania, za długi wstęp, zły routing;
- po pytaniu o dane: zbyt trudne pytanie lub brak danych pod reka;
- po fallbacku: frustracja;
- podczas oczekiwania na API: martwa cisza;
- po odmowie: wynik niekorzystny, ale niekoniecznie błąd.

Repeat contact jest jedną z najważniejszych metryk jakości. Pokazuje, czy sprawa została realnie rozwiązana.

### 11.6.3. Perspektywa biznesowa

Repeat contact może ujawnic, że bot zmniejsza obciążenie pierwszego dnia, ale zwiększa obciążenie później. Dla business case trzeba analizować:

- repeat contact 24h;
- repeat contact 48h;
- repeat contact 7 dni;
- kanał powrotu: telefon, chat, e-mail, oddział;
- temat powrotu.

### 11.6.4. Perspektywa użytkownika

Użytkownik wraca, gdy:

- nie dostał odpowiedzi;
- nie ufa odpowiedzi;
- nie ma potwierdzenia;
- bot nie rozwiązał wyjątku;
- sprawa wymaga człowieka;
- komunikat był niezrozumiały.

### 11.6.5. Perspektywa technologiczna

Repeat contact wymaga łączenia danych:

- identyfikator klienta;
- numer telefonu;
- numer sprawy;
- hash danych, jeśli prywatność wymaga;
- temat rozmowy;
- outcome;
- timestamp.

Trzeba zachować zgodność z RODO/GDPR i polityka retencji.

### 11.6.6. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Mierz drop-off per krok.
- Segmentuj abandonment według momentu.
- Mierz repeat contact w kilku oknach.
- Łącz repeat contact z outcome.
- Analizuj kanał powrotu.
- Dla konwersji mierz jakość, nie tylko liczbę.
- Po drop-off analizuj prompt i latency.

### 11.6.7. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Abandonment jako jedna liczba | Brak diagnozy |
| Brak repeat contact | Nie widać niezałatwionych spraw |
| Conversion bez walidacji jakości | Liczba akcji, ale niekoniecznie dobrych |
| Brak okien czasowych | Nie wiadomo, kiedy klient wraca |
| Brak łączenia kanałów | Powroty ukryte w e-mail/chat |

### 11.6.8. Checklista

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy mamy conversion event?
- Czy mierzymy drop-off per step?
- Czy abandonment ma moment w flow?
- Czy mierzymy repeat contact 24/48h/7 dni?
- Czy łączymy kanał powrotu?
- Czy mamy zgodność prywatności przy laczeniu danych?
- Czy analizujemy powody powrotu?

### 11.6.9. Mini case study

Voicebot zwrotowy miał wysokie conversion: wysyłał link do formularza. Jednak 30% klientów dzwoniło ponownie, bo link wygasał po godzinie. Metryka "link sent" wyglądała dobrze, ale repeat contact ujawnił problem. Po wydłużeniu ważności linku i jasnym komunikacie repeat contact spadł.

### 11.6.10. Podsumowanie

Conversion, abandonment i repeat contact pokazują, co dzieje się po drodze i po rozmowie. Bez nich łatwo pomylić wykonanie kroku z rozwiązaniem sprawy.

---

## 11.7. Analiza transkrypcji, tagowanie rozmów i dashboardy

### 11.7.1. Czym jest dashboard voicebota

Dashboard to ekran lub zestaw ekranów, które pokazują najważniejsze informacje o działaniu voicebota. Nie jest to tylko "ładna tabelka" ani raport robiony dla samego raportowania. Dobry dashboard ma pomóc szybko odpowiedzieć na pytania:

- czy voicebot działa technicznie;
- czy użytkownicy załatwiają sprawy;
- gdzie rozmowy się psują;
- co trzeba poprawić jako pierwsze;
- czy ostatnia zmiana pomogła czy zaszkodziła.

Można myśleć o dashboardzie jak o tablicy kontrolnej projektu. W samochodzie nie patrzymy tylko na jedną liczbę. Potrzebujemy prędkości, paliwa, kontrolek awarii i czasem nawigacji. W voicebocie jest podobnie: sama liczba rozmów nie wystarczy. Trzeba widzieć wynik rozmów, błędy, eskalacje, powroty klientów, jakość rozumienia i zachowanie po zmianach.

Dashboard powinien być zrozumiały dla osoby, która nie jest analitykiem danych. Jeśli specjalista voicebotowy patrzy na ekran i nadal nie wie, czy bot działa dobrze, dashboard nie spełnia swojej funkcji.

### 11.7.2. Jak powinien wyglądać dobry dashboard

Dobry dashboard powinien mieć kilka prostych warstw.

Pierwsza warstwa to szybki widok stanu, czyli odpowiedź na pytanie "czy jest dobrze?". Tutaj zwykle są duże liczby i proste wskaźniki:

- liczba rozmów;
- task completion;
- handoff;
- fallback;
- no-input i no-match;
- awarie integracji;
- średni czas rozmowy;
- CSAT lub inna ocena po rozmowie.

Druga warstwa pokazuje trendy. Sama liczba "fallback 8%" niewiele mówi, jeśli nie wiemy, czy tydzień temu było 4%, 8% czy 15%. Dlatego dashboard powinien pokazywać zmiany w czasie: dzień po dniu, tydzień po tygodniu, przed i po release.

Trzecia warstwa pozwala zejść głębiej. Jeśli fallback rośnie, specjalista musi zobaczyć, w którym flow, przy którym promptcie, dla jakiej intencji i na jakich przykładowych wypowiedziach. Bez tego dashboard pokazuje problem, ale nie daje drogi do naprawy.

Czwarta warstwa łączy dane z decyzją. Dobry dashboard powinien prowadzić do backlogu: "skrócić prompt X", "dodać frazy treningowe do intencji Y", "sprawdzić API statusu zamówienia", "poprawić komunikat handoff".

Praktycznie dashboard voicebota może wyglądać tak:

1. U góry: pięć najważniejszych wskaźników za wybrany okres.
2. Pod nimi: wykres trendu dla task completion, fallback, handoff i repeat contact.
3. Niżej: tabela problematycznych intencji, promptów i integracji.
4. Obok lub pod tabelą: przykładowe transkrypcje rozmów.
5. Na końcu: lista rekomendowanych działań albo link do backlogu.

### 11.7.3. Analiza transkrypcji

Analizuj:

- top intencje;
- top no-match phrases;
- powody handoff;
- frazy frustracji;
- przerwania;
- powtórzenia;
- pytania poza zakresem;
- nowe tematy;
- problemy z promptami;
- błędy ASR.

Transkrypcje powinny być czytane w próbkach, nie tylko agregowane. Liczby mówią "gdzie", transkrypcje mówią "dlaczego".

### 11.7.4. Tagowanie rozmów

Typy tagów:

| Tag | Przykład |
|---|---|
| Contact reason | status_zamowienia |
| Outcome | completed_by_bot |
| Failure reason | api_timeout |
| Emotion signal | frustration |
| Handoff reason | user_requested_agent |
| Compliance flag | sensitive_data |
| Optimization tag | unclear_prompt |
| ASR issue | digit_error |

Tagowanie jest potrzebne, bo surowa transkrypcja jest trudna do analizowania w skali. Tag zamienia rozmowę w informację, którą można policzyć. Jeśli 300 rozmów ma tag `unclear_prompt`, wiadomo, że problem nie jest pojedynczym przypadkiem, tylko wzorcem do poprawy.

### 11.7.5. Dashboard operacyjny

Dashboard operacyjny odpowiada na pytanie: "czy system działa dzisiaj i czy coś się nie psuje?". Korzysta z niego zespół utrzymania, IT, osoba odpowiedzialna za produkcję i czasem lider contact center.

To jest widok bardziej techniczny niż biznesowy. Nie chodzi w nim o pełny obraz wartości projektu, tylko o szybkie wykrywanie awarii, spadków jakości i anomalii.

Dla zespołu utrzymania:

- wolumen;
- uptime;
- latency;
- API errors;
- fallback/no-match;
- handoff;
- abandonment;
- concurrent calls;
- alerts;
- release version.

Przykład interpretacji:

Jeśli task completion jest stabilny, ale nagle rośnie API error rate, problem prawdopodobnie leży w integracji, a nie w conversation designie. Jeśli po release rośnie latency, trzeba sprawdzić nową wersję flow, modelu lub integracji.

### 11.7.6. Dashboard biznesowy

Dashboard biznesowy odpowiada na pytanie: "czy voicebot daje wartość organizacji i użytkownikom?". Korzysta z niego sponsor projektu, operations, contact center, właściciel procesu i osoby decydujące o budżecie.

Ten dashboard powinien mówić językiem wyniku, a nie językiem logów. Zamiast pokazywać tylko "liczbę sesji", powinien pokazać, ile spraw zostało skutecznie załatwionych, ile wróciło do konsultanta, ile kosztuje skuteczna rozmowa i czy klienci nie dzwonią ponownie.

Dla sponsora i operations:

- task completion;
- automation rate;
- containment;
- cost per resolved task;
- repeat contact;
- AHT impact;
- SLA impact;
- CSAT;
- top use cases;
- ROI.

Przykład interpretacji:

Containment może rosnąć, ale jeśli jednocześnie rośnie repeat contact, to bot prawdopodobnie zatrzymuje klientów w automatyzacji, lecz nie rozwiązuje ich spraw. Taki dashboard powinien ostrzec przed pozornym sukcesem.

### 11.7.7. Dashboard jakościowy

Dashboard jakościowy odpowiada na pytanie: "dlaczego rozmowy są dobre albo złe?". Korzysta z niego conversation designer, Voicebot Specialist, QA, analityk danych, AI/NLU specialist i osoby poprawiające scenariusze.

To najważniejszy dashboard do codziennej optymalizacji. Pokazuje nie tylko ile było błędów, ale gdzie one wystąpiły i jak brzmiały realne wypowiedzi użytkowników.

Dla conversation design, AI i QA:

- no-input/no-match per prompt;
- confusion matrix;
- top fallback utterances;
- interruption rate per prompt;
- barge-in recovery success;
- TTS repeat requests;
- handoff reasons;
- sample transcripts;
- regression failures.

Przykład interpretacji:

Jeśli no-input rośnie przy jednym pytaniu, użytkownicy mogą nie rozumieć, czego bot od nich chce. Jeśli interruption rate rośnie przy jednym komunikacie, bot może mówić za długo albo podawać zbyt oczywiste informacje. Jeśli top fallback utterances zawierają podobne frazy, trzeba dodać intencję, poprawić prompt lub zmienić zakres bota.

### 11.7.8. Jak czytać dashboard krok po kroku

Osoba pracująca z voicebotem może czytać dashboard w prostym rytmie:

1. Sprawdź, czy nie ma awarii: uptime, API errors, latency, nagły spadek wolumenu.
2. Sprawdź wynik rozmów: task completion, automation, handoff, abandonment, repeat contact.
3. Sprawdź jakość rozmowy: fallback, no-input, no-match, przerwania, prośby o konsultanta.
4. Zobacz trendy: czy problem pojawił się po konkretnej zmianie, kampanii, sezonie albo awarii.
5. Zejdź do szczegółu: intencja, flow, prompt, transkrypcja, nagranie.
6. Zapisz decyzję: co poprawiamy, kto to robi, jak zmierzymy efekt.

Najważniejsza zasada: dashboard nie kończy pracy. Dashboard zaczyna rozmowę o tym, co poprawić.

### 11.7.9. Perspektywa biznesowa

Dashboard powinien prowadzić do decyzji:

- co poprawiamy w tym tygodniu;
- który use case rozszerzamy;
- który flow ograniczamy;
- która integracja wymaga naprawy;
- gdzie potrzebna jest zmiana procesu.

### 11.7.10. Perspektywa użytkownika

Analiza transkrypcji ujawnia język użytkownika i miejsca frustracji. Nie powinna służyć tylko do trenowania modelu, ale też do poprawy procesu i komunikacji.

Dobry dashboard powinien bronić użytkownika przed złą automatyzacją. Jeśli bot formalnie "obsłużył" rozmowę, ale klient dzwoni ponownie, przerywa, prosi o konsultanta albo porzuca połączenie, dashboard powinien to pokazać.

### 11.7.11. Perspektywa technologiczna

Wymagania:

- pipeline danych;
- anonimizacja;
- tag taxonomy;
- wersjonowanie tagów;
- integracja z BI;
- dostępy rolami;
- możliwość drill-down do rozmowy;
- eksport do backlogu.

### 11.7.12. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Twórz trzy dashboardy: operacyjny, biznesowy, jakościowy.
- Taguj outcome i failure reason.
- Używaj próbek transkrypcji do interpretacji liczb.
- Aktualizuj taxonomy.
- Łącz dashboard z backlogiem.
- Ogranicz dostęp do danych wrażliwych.
- Raportuj przed/po release.

### 11.7.13. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Jeden dashboard dla wszystkich | Nikt nie dostaje potrzebnych informacji |
| Brak failure reason | Nie wiadomo, co poprawiać |
| Brak transkrypcji próbkowych | Metryki bez kontekstu |
| Brak anonimizacji | Ryzyko danych |
| Brak tag governance | Chaos kategorii |
| Brak powiązania z backlogiem | Raportowanie bez działania |

### 11.7.14. Checklista dashboardów

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy mamy dashboard operacyjny?
- Czy mamy dashboard biznesowy?
- Czy mamy dashboard jakościowy?
- Czy mamy tagi outcome?
- Czy mamy failure reasons?
- Czy widac wersje release?
- Czy można zejść do próbki rozmów?
- Czy dane są anonimizowane?
- Czy dashboard tworzy backlog?

### 11.7.15. Mini case study

Dashboard biznesowy pokazywał stabilny task completion. Dashboard jakościowy pokazał jednak wzrost interruption rate przy jednym promptcie. Po odsłuchaniu rozmów okazało się, że nowy komunikat był zbyt długi i użytkownicy przerywali, bo znali odpowiedź. Skrócenie promptu zmniejszyło AHT.

### 11.7.16. Podsumowanie

Dashboardy powinny być narzędziami działania, nie dekoracją. Dobre dashboardy pokazują, co się stało, dlaczego mogło się stać i gdzie zacząć optymalizację. Dla Voicebot Specialist dashboard jest codziennym narzędziem pracy: pomaga zobaczyć, czy bot realnie pomaga ludziom, czy tylko generuje ładne liczby.

---

## 11.8. Proces optymalizacji po wdrożeniu

### 11.8.1. Kluczowe pojęcia

Poniższe pojęcia są podstawą rozumienia rozdziału. Nie trzeba uczyć się ich jak słownika na pamięć; ważniejsze jest zobaczenie, do czego służą w projekcie voicebota i jakie nieporozumienia najczęściej powodują.

| Pojęcie | Definicja |
|---|---|
| Optimization backlog | Lista usprawnień oparta na danych |
| Release cycle | Rytm wdrażania zmian |
| Experiment | Kontrolowana zmiana sprawdzająca hipotezę |
| A/B test | Porównanie wariantów |
| Regression suite | Zestaw testów chroniący przed popsuciem |
| Hypercare | Intensywny monitoring po starcie |

### 11.8.2. Cykl optymalizacji

```text
1. Monitoruj metryki.
2. Wybierz problem.
3. Zejdz do transkrypcji i logow.
4. Okresl przyczyne.
5. Zdefiniuj hipoteze.
6. Zaprojektuj zmiane.
7. Dodaj test regresji.
8. Wdroż release.
9. Porownaj przed/po.
10. Zdecyduj: utrzymac, cofnac, iterowac.
```

Przykład hipotezy:

"No-input przy pytaniu o lokalizację wzrósł, bo prompt jest zbyt formalny. Zmiana pytania na prostsze zmniejszy no-input o 20%."

### 11.8.3. Perspektywa biznesowa

Optymalizacja powinna mieć priorytety:

1. Błędy krytyczne i compliance.
2. Problemy z task completion.
3. Problemy powodujące duży wolumen handoff.
4. Problemy UX/frustracji.
5. Koszt i latency.
6. Rozszerzenia zakresu.

Nie warto poprawiać rzadkiego promptu, gdy top integracja ma 15% timeoutow.

### 11.8.4. Perspektywa użytkownika

Optymalizacja powinna zmniejszać wysiłek:

- mniej powtórzeń;
- krótsze komunikaty;
- mniej fallbacków;
- lepsze potwierdzenia;
- szybszy handoff;
- jaśniejsze zakończenia.

### 11.8.5. Perspektywa technologiczna

Każda zmiana powinna mieć:

- ticket/backlog item;
- opis problemu;
- dane potwierdzające;
- hipotezę;
- zakres zmiany;
- testy;
- ownera;
- release version;
- metryki przed/po.

### 11.8.6. Szablon backlog item

```text
ID:
Tytul:
Obszar: prompt / NLU / ASR / TTS / integracja / flow / handoff / LLM / RAG
Problem:
Dane potwierdzające:
Przyklad rozmowy:
Hipoteza:
Proponowana zmiana:
Ryzyko:
Testy regresji:
Metryka sukcesu:
Owner:
Priorytet:
Status:
```

### 11.8.7. Dobre praktyki

Dobre praktyki warto czytać jako zasady projektowe, a nie sztywną listę zakazów i nakazów. Ich celem jest zmniejszenie ryzyka, że bot będzie działał poprawnie technicznie, ale źle dla użytkownika albo operacji.

- Priorytetyzuj według wpływu i ryzyka.
- Nie zmieniaj zbyt wielu rzeczy naraz.
- Mierz przed/po.
- Dodawaj testy regresji.
- Włącz konsultantów w interpretację.
- Utrzymuj changelog.
- Po dużych zmianach rób mini-hypercare.

### 11.8.8. Typowe błędy

Ta sekcja pokazuje błędy, które często nie wyglądają groźnie na etapie projektu, ale później psują rozmowy, metryki albo zaufanie do automatyzacji. Przy każdym błędzie warto pytać: jak użytkownik to odczuje i jak wcześnie możemy to wykryć.

| Błąd | Konsekwencja |
|---|---|
| Poprawki bez hipotezy | Nie wiadomo, co działa |
| Zbyt wiele zmian w jednym release | Brak interpretacji efektu |
| Brak testów regresji | Nowe błędy |
| Backlog z opinii, nie danych | Słabe priorytety |
| Brak ownera | Optymalizacja staje |
| Brak metryk przed/po | Brak dowodu efektu |

### 11.8.9. Checklista optymalizacji

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy problem ma dane?
- Czy mamy przykłady rozmów?
- Czy jest hipoteza?
- Czy zmiana ma ownera?
- Czy są testy regresji?
- Czy jest metryka sukcesu?
- Czy znamy ryzyko?
- Czy porownamy przed/po?
- Czy changelog jest aktualny?

### 11.8.10. Mini case study

Po starcie voicebota rezerwacyjnego no-match przy pytaniu o termin wynosil 28%. Analiza transkrypcji pokazala, że ludzie mowili "jak najszybciej", a bot oczekiwal konkretnej daty. Dodano obsługę intencji `najblizszy_mozliwy_termin` i zmieniono prompt: "Może pani podac datę albo powiedzieć: najblizszy termin." No-match spadl do 13%.

### 11.8.11. Podsumowanie

Optymalizacja voicebota jest ciąglym procesem produktowym. Najlepsze zespoly nie pytają "czy bot jest gotowy?", tylko "co pokazały rozmowy i co poprawiamy w kolejnym cyklu?".

---

## 11.9. Metryki odbioru, wysiłku i zaufania

Metryki operacyjne pokazują, co wydarzyło się w systemie. Metryki odbioru pokazują, jak rozmowę przeżył człowiek. To rozróżnienie jest ważne, bo voicebot może mieć dobre liczby techniczne i jednocześnie być męczący. Przykład: niski fallback rate nie oznacza jeszcze, że użytkownik rozumiał odpowiedzi. Niski handoff nie oznacza, że sprawa została załatwiona. Krótki czas rozmowy nie zawsze oznacza dobrą rozmowę; czasem oznacza szybkie rozłączenie.

Dlatego dashboard dojrzalego voicebota powinien mieć warstwę "human experience". Nie musi być skomplikowana. Ważne, aby regularnie łączyć dane z systemu, transkrypcje, ankiety po rozmowie i feedback konsultantów.

### 11.9.1. Trzy poziomy oceny rozmowy

Pierwszy poziom to wynik zadania: czy użytkownik osiągnął cel. Drugi poziom to koszt dojścia do celu: ile było tur, powtórzeń, ciszy, korekt i eskalacji. Trzeci poziom to odbiór: czy użytkownik czuł, że rozmawia z kompetentnym, przewidywalnym systemem, czy z przeszkodą na drodze do konsultanta.

Praktyczny model:

| Poziom | Pytanie | Przykładowe dane |
|---|---|---|
| Task success | Czy sprawa została załatwiona? | outcome, integracja, potwierdzenie, repeat contact |
| Dialogue cost | Ile wysiłku kosztowala rozmową? | liczba tur, powtórzenia, no-input, no-match, repair |
| Perceived experience | Jak użytkownik odebrał rozmowę? | ankieta, komentarz, sygnały frustracji, prośba o człowieka |

### 11.9.2. Customer effort w kanale głosowym

Customer effort w voicebocie to nie tylko liczba kliknięć, bo użytkownik niczego nie klika. Wysiłek pojawia się jako konieczność pamiętania długich opcji, czekania na koniec monologu, powtarzania danych, zgadywania komendy albo tlumaczenia się systemowi. W kanale głosowym nawet mała niejasność może być meczaca, bo użytkownik nie widzi ekranu i nie może spokojnie przeskanować opcji.

Sygnały wysokiego wysiłku:

- użytkownik pyta "co mam powiedzieć?";
- powtarza te same dane;
- przerywa botowi w tych samych miejscach;
- milczy po pytaniu;
- prosi o konsultanta po jednym lub dwóch błędach;
- kończy rozmowę bez rozwiązania;
- dzwoni ponownie w tej samej sprawie.

### 11.9.3. Metryki zaufania

Zaufanie do voicebota powinno być skalibrowane. Użytkownik ma ufac botowi w sprawach, które bot rzeczywiście potrafi obsłużyć, ale nie powinien zakładać, że bot może podejmowac decyzję poza zakresem. W praktyce oznacza to, że bot powinien brzmieć kompetentnie, ale nie absolutnie. Powinien umieć powiedzieć "nie mam pewności", "to wymaga konsultanta" albo "mogę sprawdzić tylko status".

Metryki i sygnały zaufania:

| Sygnał | Interpretacja |
|---|---|
| Użytkownik akceptuje wynik i nie dzwoni ponownie | Prawdopodobne zaufanie do rozwiązania |
| Użytkownik prosi o potwierdzenie wiele razy | Niska pewność lub niejasny komunikat |
| Użytkownik pyta "czy rozmawiam z człowiekiem?" | Brak transparentności lub zbyt ludzka persona |
| Użytkownik przekazuje dane wrażliwe bez pytania | Ryzyko overtrust i potrzeba lepszych granic |
| Użytkownik szybko wybiera konsultanta | Możliwy undertrust, zły onboarding lub źle doświadczenia |

### 11.9.4. Prosta ankieta po rozmowie

Ankieta po rozmowie powinna być krótka. Jeśli jest za długa, zniecheci użytkownika i da mało odpowiedzi. Dobrze sprawdza się zestaw 3-5 pytań, rotowany w czasie.

Przykład:

```text
1. Czy udalo sie zalatwic sprawe? Tak/Nie
2. Jak latwa byla rozmową? 1-5
3. Czy pytania bota byly zrozumiałe? 1-5
4. Czy mial(a) Pan/Pani poczucie kontroli nad rozmową? 1-5
5. Co mozemy poprawic? [opcjonalnie]
```

Dla procesów wysokiego ryzyka warto dodac pytanie: "Czy było jasne, kiedy bot może pomóc, a kiedy potrzebny jest konsultant?". To pozwala wykrywać niebezpieczne nadmierne zaufanie.

### 11.9.5. Jak interpretować metryki odbioru

Metryki odbioru nie powinny być traktowane jak plebiscyt popularności. Niska ocena może wynikać z problemu poza botem, np. klient jest zły na decyzję firmy. Dlatego ankietę trzeba łączyć z outcome, transkrypcją i powodem kontaktu. Jeśli użytkownicy nisko oceniają rozmowy z odmową reklamacji, problemem może być polityka biznesowa, ale bot nadal powinien być oceniony pod kątem jasności, tonu i handoffu.

Najlepsza praktyka to analizować metryki w segmentach:

- per use case;
- per prompt lub krok dialogu;
- per powod handoff;
- per kanał i godzina;
- per nowy/stały użytkownik;
- per wersja scenariusza.

### 11.9.6. Checklista metryk odbioru

Checklista służy do praktycznego sprawdzenia gotowości. Nie zastępuje myślenia projektowego; pomaga upewnić się, że najważniejsze decyzje, ryzyka i zależności nie zostały pominięte.

- Czy mierzymy task success i wysiłek, nie tylko containment?
- Czy mamy pytanie o zrozumiałość?
- Czy mamy pytanie o poczucie kontroli?
- Czy monitorujemy sygnały frustracji?
- Czy repeat contact jest laczony z pierwotna rozmową?
- Czy analizujemy prośby o konsultanta jako sygnał odbioru?
- Czy wiemy, w którym kroku użytkownicy traca zaufanie?
- Czy rozdzielamy problem bota od problemu polityki biznesowej?

### 11.9.7. Podsumowanie

Voicebot jest oceniany przez użytkownika nie tylko po tym, czy "technicznie zadziałał". Liczy się także wysiłek, przewidywalność, możliwość poprawy, jasna droga do człowieka i poczucie, że system nie ukrywa swoich ograniczeń. Metryki odbioru są potrzebne, bo bez nich zespół może optymalizować liczby, które nie przekładają się na dobrą rozmowę.

---

## 11.10. Zbiorcza checklista po Części X

Ta checklista zbiera najważniejsze pytania po całej części. Najlepiej przejść ją po zakończeniu projektu rozdziałów i zaznaczyć miejsca, które wymagają decyzji, doprecyzowania albo testów.

- Czy metryki są zdefiniowane przed produkcją?
- Czy masz baseline?
- Czy mierzysz task completion, nie tylko containment?
- Czy masz outcome taxonomy?
- Czy mierzysz repeat contact?
- Czy mierzysz no-input i no-match osobno?
- Czy fallback jest analizowany per prompt?
- Czy handoff ma powody?
- Czy mierzysz ASR/NLU confidence z kalibracja?
- Czy mierzysz cost per resolved task?
- Czy abandonment jest analizowany per krok?
- Czy dashboardy są operacyjne, biznesowe i jakościowe?
- Czy transkrypcje są analizowane w probkach?
- Czy dashboard prowadzi do backlogu?
- Czy każda zmiana ma hipoteze i test regresji?
- Czy mierzysz odbiór, wysiłek i poczucie kontroli?
- Czy zaufanie użytkownika jest skalibrowane do realnych możliwości bota?

---
