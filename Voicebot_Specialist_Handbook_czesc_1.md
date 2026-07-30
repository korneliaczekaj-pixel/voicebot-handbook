# Voicebot Specialist Handbook

## Kompletna mapa wiedzy, program nauki i specjalistyczny dział: barge-in, interruption handling i turn-taking

Wersja robocza: 2026-07-29  
Jezyk: polski  
Status: czesc 1 pelnego podrecznika

---

## 0. Jak czytac ten podrecznik

Ten podrecznik jest projektowany jako material zawodowy dla osob, ktore maja realnie projektowac, wdrazac, testowac i optymalizowac voiceboty w organizacjach. Nie jest to przeglad trendow ani material marketingowy. Punkt ciezkosci lezy na decyzjach projektowych: co trzeba wiedziec, zeby system glosowy dzialal w rozmowie telefonicznej, byl zrozumialy dla uzytkownika, mial sens biznesowy, byl mierzalny, bezpieczny i utrzymywalny.

Wiedza w podreczniku ma trzy poziomy:

1. Wiedza potwierdzona badaniami: szczegolnie dotyczaca turn-taking, przerwan, psychologii interakcji i reakcji uzytkownikow na zaklocenia w rozmowie.
2. Wiedza techniczna i dokumentacyjna: wynikajaca z dokumentacji platform, standardow, architektur realtime, telefonii, ASR, TTS, NLU, LLM i narzedzi contact center.
3. Wiedza ekspercka: praktyczne wnioski z projektowania i wdrazania systemow enterprise, uzupelniajace luki w zrodlach.

Wazne rozroznienie: jezeli dana zasada jest bezposrednio wsparta zrodlami, oznaczam to jako "wynika ze zrodel". Jezeli jest synteza praktyczna albo rekomendacja wdrozeniowa, oznaczam to jako "uzupelnienie eksperckie".

---

# 1. Analiza i klasyfikacja zrodel

## 1.1. Grupy tematyczne

| Grupa | Charakter | Najwazniejsza wartosc dla podrecznika |
|---|---|---|
| A. Zrodla naukowe o rozmowie, turn-taking i przerwaniach | Badawcze, czesto recenzowane | Pokazuja, ze naturalna rozmowa nie opiera sie na prostym progu ciszy, lecz na przewidywaniu konca tury, sygnalach multimodalnych, normach interakcyjnych i naprawie zaklocen. |
| B. Zrodla branzowe o barge-in | Produktowe i inzynierskie | Daja praktyczny jezyk problemu: pelny dupleks, AEC, VAD, streaming ASR, odroznianie backchannel od przerwania, opoznienie zatrzymania TTS. |
| C. Dokumentacja techniczna realtime voice agents | Techniczna | Opisuje aktualne wzorce implementacyjne: turn detection, endpointing, adaptive interruption handling, WebRTC, WebSocket, SIP, narzedzia, realtime LLM. |
| D. Platformy enterprise/contact center | Dokumentacyjne | Pokazuja, jak barge-in, endpointing i speech configuration sa konfigurowane w praktyce na poziomie intentow, slotow, flow, fulfillmentow i promptow. |
| E. Modele i zasoby techniczne | Techniczne/modelowe | Pokazuja kierunek: klasyfikatory przerwan, rozroznianie prawdziwego przerwania od dzwieku, backchannelu lub mowy osoby trzeciej. |

## 1.2. Ocena jakosci zrodel

| Zrodlo | Typ | Ocena roli w podreczniku |
|---|---|---|
| Skantze, "Turn-taking in Conversational Systems and Human-Robot Interaction: A Review" | Naukowe, przegladowe | Zrodlo fundamentowe dla rozdzialow o turn-taking, opoznieniach, overlap, end-of-turn detection i modelach konwersacyjnych. |
| Tradycja conversation analysis (Sacks, Schegloff, Jefferson) przywolywana jako kontekst teoretyczny w literaturze o turn-taking | Naukowe, teoretyczne | Kontekst pojec TRP, TCU, self-selection, other-selection, overlap i organizacji tur; nie jest to osobny analizowany link z bibliografii, tylko rama teoretyczna do interpretacji zrodel. |
| Majlesi et al., "Managing Turn-Taking in Human-Robot Interactions" | Naukowe, HRI | Wazne dla interpretacji: ludzie traktuja zaklocenia tury robota jako problem interakcyjny, nawet gdy wiedza, ze rozmawiaja z maszyna. |
| Gervits & Scheutz, "Pardon the Interruption" | Naukowe/techniczne | Wazne dla modelu rozpoznawania overlap i generowania zachowan naprawczych na podstawie czasu, historii dialogu i celow agenta. |
| Crook et al., "Handling User Interruptions in an Embodied Conversational Agent" | Naukowe/techniczne | Wczesny, istotny opis barge-in w agentach prowadzacych dluzsze wypowiedzi i rozmowy o stanie emocjonalnym. |
| Imperial / dataset przerwan | Badawczo-informacyjne | Wazne dla rozroznienia true interruption i false interruption oraz potrzeby danych audio. |
| TPI-VA, third-party interruptions | Badawcze, 2026 | Wazne dla multi-speaker voice assistants: nie kazda wypowiedz w kanale nalezy do glownego uzytkownika. |
| LiveKit docs/blog | Techniczne | Bardzo uzyteczne dla obecnej praktyki: VAD, endpointing, model-based turn detection, adaptive interruption handling, aligned transcripts, metryki przerwan. |
| OpenAI Realtime docs | Techniczne | Wazne dla realtime LLM voice agents, WebRTC/SIP/WebSocket, VAD, response.cancel, output truncation, narzedzia. |
| Google Dialogflow CX advanced speech | Dokumentacyjne enterprise | Wazne dla konfiguracji speech: end-of-speech sensitivity, smart endpointing, no-speech timeout, barge-in i koszty jednoczesnego input/output. |
| AWS Connect / Lex | Dokumentacyjne enterprise | Wazne dla praktyk contact center: allow interrupt per intent/slot, end-of-turn threshold, timeouty, kiedy wylaczac barge-in. |
| VoiceXML 2.0 | Standard | Wazne historycznie i architektonicznie: dialogi audio, formularze, menu, gramatyki, zdarzenia, prompt queueing, bargein jako stary, ale nadal pouczajacy mechanizm. |
| Blogi branzowe o barge-in | Branzowe/produktowe | Pomocnicze. Dobre do listy problemow i wzorcow inzynierskich, ale nie jako jedyny fundament. |

## 1.3. Najwazniejsze wnioski ze zrodel

1. Naturalne przejmowanie tury jest predykcyjne, a nie reaktywne. Ludzie nie czekaja po prostu na dluga cisze. Przewiduja koniec jednostki wypowiedzi na podstawie skladni, prosodii, semantyki, rytmu, kontekstu i celu rozmowy.
2. Proste VAD plus prog ciszy nie wystarcza do rozmowy brzmiacej naturalnie. W systemach glosowych prowadzi to do zbyt dlugich pauz albo do przedwczesnego ucinania uzytkownika.
3. Barge-in nie jest tylko "mozliwoscia przerwania bota". To caly mechanizm pelnego dupleksu: system mowi, slucha, filtruje wlasny glos, rozpoznaje intencje przerwania, zatrzymuje TTS i zachowuje stan dialogu.
4. Nie kazdy overlap jest przerwaniem. "Mhm", "okej", smiech, kaszlniecie, tlo, echo albo mowa osoby trzeciej moga nie wymagac oddania tury.
5. Zle obsluzone przerwania niszcza poczucie kontroli. Uzytkownik moze miec wrazenie, ze system go ignoruje, "przegaduje", blokuje droge do konsultanta albo wymusza scenariusz.
6. Platformy enterprise coraz czesciej traktuja konfiguracje turn-taking jako element zaleznosci od kontekstu: inaczej dla tak/nie, inaczej dla numeru konta, inaczej dla disclaimerow, inaczej dla platnosci.
7. Glos ma wyzsza stawke psychologiczna niz tekst. Opoznienie, ton, tempo, pauzy i naprawa bledow sa odbierane jako sygnaly kompetencji, szacunku albo braku kontroli.

## 1.4. Luki w materialach zrodlowych

1. Malo zrodel laczy techniczny barge-in z conversation design. Dokumentacje mowia, jak wlaczyc funkcje; rzadziej mowia, jak pisac komunikaty odporne na przerwania.
2. Malo materialow laczy metryki techniczne z metrykami psychologicznymi, np. latency to stop TTS z frustracja i poczuciem kontroli.
3. Brakuje praktycznych matryc decyzyjnych: kiedy barge-in wlaczyc, ograniczyc, opoznic, filtrowac lub wylaczyc.
4. Brakuje spojrzenia branzo-specific: medycyna, windykacja, finanse, reklamacje i sprzedaz maja inne ryzyka przerwan.
5. Zrodla produktowe czesto upraszczaja problem do funkcji platformy. W praktyce jakosc zalezy od calego lancucha: telefonia, AEC, VAD, ASR, TTS, LLM, dialog manager, integracje, monitoring i recovery.

---

# 2. Mapa wiedzy calego podrecznika

## 2.1. Glowne dziedziny

Podrecznik sklada sie z osmiu warstw kompetencji:

1. Warstwa konwersacyjna: rozmowa, tury, intencje uzytkownika, repair, fallback, eskalacja, emocje.
2. Warstwa technologiczna: telefonia, streaming audio, ASR, NLU, LLM, RAG, TTS, integracje, monitoring.
3. Warstwa produktowa: use case, MVP, roadmapa, priorytety, hipotezy, metryki, backlog optymalizacji.
4. Warstwa biznesowa: proces, wolumeny, koszt kontaktu, automatyzowalnosc, ROI, ryzyko operacyjne.
5. Warstwa UX/conversation design: persona, ton, mikrocopy glosowe, obciazenie poznawcze, naturalnosc, kontrola.
6. Warstwa danych: transkrypcje, etykietowanie, trening, jakosc ASR/NLU, analiza nierozpoznanych wypowiedzi.
7. Warstwa governance: bezpieczenstwo, prywatnosc, RODO, retencja, audyt, odpowiedzialnosc, prompt injection.
8. Warstwa operacyjna: wdrozenie, QA, UAT, monitoring, hypercare, utrzymanie, role zespolowe.

## 2.2. Relacje miedzy dziedzinami

Voicebot jest systemem granicznym. Kazdy blad jednej warstwy staje sie doswiadczeniem uzytkownika.

| Decyzja | Warstwa techniczna | Warstwa UX | Warstwa biznesowa | Warstwa prawna/operacyjna |
|---|---|---|---|---|
| Dlugosc komunikatu bota | Wplywa na TTS, barge-in, latency i koszty syntezy | Wplywa na pamiec robocza i frustracje | Wplywa na AHT i completion rate | Moze wplywac na poprawne przekazanie zgody/disclaimerow |
| Wlaczenie barge-in | Wymaga pelnego dupleksu, AEC, VAD, turn detection | Daje kontrole, ale moze powodowac falszywe zatrzymania | Moze skrocic rozmowy i poprawic korekty | W pewnych promptach compliance moze byc ograniczane |
| Uzycie LLM | Wymaga guardrails, narzedzi, observability | Daje elastycznosc jezykowa | Moze poprawic containment, ale zwieksza koszt i ryzyko | Ryzyko halucynacji, data leakage, nieautoryzowanych porad |
| Human handoff | Wymaga integracji z contact center i przekazania kontekstu | Zmniejsza poczucie uwiezienia | Zmniejsza nieudane automatyzacje | Wazny mechanizm bezpieczenstwa i zgodnosci |
| Smart endpointing | Wymaga STT/turn detector i strojenia | Zmniejsza ucinanie wypowiedzi | Poprawia skutecznosc slot filling | W procesach wrazliwych zmniejsza ryzyko blednej decyzji |

## 2.3. Kolejnosc nauki

### Poziom podstawowy

1. Czym jest voicebot i czym rozni sie od IVR/chatbota/asystenta.
2. Jak wyglada podstawowa architektura: telefonia, ASR, dialog manager, integracje, TTS.
3. Jak projektowac proste dialogi: intencje, encje, sloty, fallback, potwierdzenia.
4. Jak rozpoznac dobry use case.
5. Jak testowac najprostszy scenariusz.

### Poziom sredni

1. Jak projektowac wielosciezkowe flow.
2. Jak pracowac z danymi treningowymi i metrykami NLU.
3. Jak integrowac CRM, ticketing, kalendarze, platnosci i systemy klienta.
4. Jak mierzyc containment, task completion, escalation, fallback, CSAT i ROI.
5. Jak prowadzic pilota, UAT i hypercare.

### Poziom zaawansowany

1. Turn-taking, barge-in, interruption handling, endpointing i timing rozmowy.
2. Hybrydowe voiceboty flow-based plus LLM.
3. RAG, narzedzia, function calling, guardrails i observability.
4. Bezpieczenstwo, prywatnosc, compliance, audyt i retencja.
5. Psychologia rozmowy, emocje, antropomorfizacja, zaufanie, projektowanie sytuacji trudnych.

---

# 3. Pelny spis tresci podrecznika

## Czesc I. Fundamenty Conversational AI i voicebotow

Poziom: podstawowy

1. Conversational AI: definicja praktyczna i granice pojecia
2. Voicebot, chatbot, IVR, voice assistant, virtual agent, AI agent: porownanie
3. Dlaczego kanal glosowy jest trudniejszy niz tekstowy
4. Historia automatyzacji rozmow: IVR, VoiceXML, intent-based bots, LLM voice agents
5. Typowe zastosowania voicebotow w firmach
6. Mity, ograniczenia i ryzyka
7. Trendy: realtime AI, multimodalnosc, agentic workflows, hybrydowe architektury

## Czesc II. Architektura voicebota

Poziom: podstawowy-sredni

1. Kanal telefoniczny, SIP, VoIP i contact center
2. Telephony gateway i streaming audio
3. ASR: od audio do tekstu
4. NLU/NLP: intencje, encje, klasyfikacja
5. Dialog manager i business logic
6. Integracje backendowe
7. Bazy wiedzy i RAG
8. LLM w architekturze voicebota
9. TTS i projektowanie wypowiedzi syntezowanych
10. Monitoring, logging i analityka
11. Human handoff
12. Architektury rule-based, intent-based, generative i hybrid AI

## Czesc III. Conversation Design dla voicebotow

Poziom: podstawowy-sredni

1. Pisanie tekstu a projektowanie rozmowy glosowej
2. Zasady projektowania wypowiedzi voicebota
3. Turn-taking, timing i naturalnosc
4. Persona, ton, formalnosc i styl
5. Powitania, pytania, potwierdzenia i zakonczenia
6. Cisza, no-input, no-match i repair
7. Barge-in, reprompt, fallback, escalation
8. Projektowanie dla emocji uzytkownika

## Czesc IV. Analiza biznesowa i wybor use case'ow

Poziom: sredni

1. Analiza procesow contact center
2. Automatyzowalnosc procesu
3. Matryca oceny use case'u
4. Wolumeny, koszt kontaktu, sezonowosc, SLA
5. ROI i business case
6. Kiedy nie wdrazac voicebota
7. Brief, wymagania i praca z interesariuszami

## Czesc V. Projektowanie dialogow i scenariuszy

Poziom: sredni

1. Intencje, encje, sloty i konteksty
2. Flow, happy path, unhappy path, fallback path, escalation path
3. Repair strategies i confirmation strategies
4. Disambiguation, multi-intent handling, interruptions
5. Dialogi transakcyjne, informacyjne, sprzedazowe, windykacyjne, medyczne, rezerwacyjne i ankietowe
6. Analiza dobrych i zlych dialogow

## Czesc VI. Dane, trening i jakosc rozumienia

Poziom: sredni

1. Zbieranie danych i transkrypcje
2. Dane treningowe i frazy uzytkownikow
3. Klasy intencji, encje, slowniki, synonimy
4. Dane syntetyczne i balans danych
5. Bledy etykietowania
6. Jakosc ASR: akcent, halas, tempo, mikrofonia
7. Testowanie NLU: confusion matrix, precision, recall, F1
8. Continuous training i analiza nierozpoznanych wypowiedzi

## Czesc VII. LLM, RAG i generatywna AI w voicebotach

Poziom: zaawansowany

1. Kiedy uzywac LLM, a kiedy nie
2. Deterministyczny voicebot vs generatywny voicebot
3. Hybryda flow plus LLM
4. Prompt systemowy voicebota
5. Ograniczanie odpowiedzi modelu
6. RAG i przygotowanie bazy wiedzy
7. Halucynacje, guardrails, prompt injection
8. Function calling i narzedzia
9. Latency i koszty generatywnej AI
10. Observability dla LLM voicebotow

## Czesc VIII. Integracje i automatyzacja procesow

Poziom: sredni-zaawansowany

1. API, webhooki i architektura zdarzen
2. CRM, ERP, helpdesk, ticketing, kalendarze
3. Systemy rezerwacyjne i platnosci
4. Bazy klientow i weryfikacja uzytkownika
5. Autoryzacja, retry, timeouty, bledy integracji
6. Przekazywanie kontekstu do konsultanta
7. Notatki, podsumowania i aktualizacje danych po rozmowie

## Czesc IX. Testowanie i QA voicebotow

Poziom: sredni

1. Testy scenariuszy i testy konwersacyjne
2. Testy ASR, NLU, TTS
3. Testy integracji i telefonii
4. Testy obciazeniowe i bezpieczenstwa
5. Testy regresji
6. Testy z prawdziwymi uzytkownikami
7. Edge cases, emocje i sytuacje trudne
8. UAT i checklista przed produkcja

## Czesc X. Metryki, analityka i optymalizacja

Poziom: sredni

1. Containment, automation, task completion
2. Fallback, escalation, no-input, no-match
3. ASR/NLU confidence
4. AHT, FCR, CSAT, NPS, cost per contact, ROI
5. Conversion, abandonment, repeat contact
6. Analiza transkrypcji i tagowanie rozmow
7. Dashboard operacyjny, biznesowy i jakosciowy
8. Proces optymalizacji po wdrozeniu

## Czesc XI. Wdrozenie voicebota w organizacji

Poziom: sredni

1. Discovery i audit rozmow
2. Analiza danych i wybor use case'u
3. Projekt, prototyp, MVP, pilot
4. UAT, soft launch, produkcja
5. Monitoring, hypercare, utrzymanie
6. Roadmapa rozwoju
7. Role i odpowiedzialnosci

## Czesc XII. Bezpieczenstwo, prywatnosc, prawo i compliance

Poziom: zaawansowany

1. RODO/GDPR, dane osobowe i dane wrazliwe
2. Zgody, informowanie o bocie, nagrywanie i transkrypcje
3. Retencja, minimalizacja, szyfrowanie, dostep do logow
4. Bezpieczenstwo API
5. Prompt injection, data leakage, halucynacje
6. Audyt i odpowiedzialnosc
7. Branzo-specyficzne ryzyka: finanse, medycyna, ubezpieczenia, telekomunikacja

## Czesc XIII. Etyka, dostepnosc i odpowiedzialne projektowanie

Poziom: sredni-zaawansowany

1. Transparentnosc i zaufanie
2. Projektowanie bez manipulacji
3. Dostepnosc dla osob starszych, z wadami mowy lub sluchu
4. Jezyk prosty i inkluzywnosc
5. Bias i obsluga emocji
6. Sytuacje kryzysowe i natychmiastowa eskalacja

## Czesc XIV. Praca Voicebot Specialist

Poziom: podstawowy-sredni

1. Zakres roli
2. Kompetencje techniczne, biznesowe i UX
3. Narzedzia pracy i dokumentacja
4. Typowy dzien pracy
5. Wspolpraca z zespolami
6. Sciezka junior-mid-senior
7. Portfolio, zadania rekrutacyjne i pytania kwalifikacyjne

## Czesc XV. Szablony, narzedzia i dokumenty projektowe

Poziom: praktyczny

1. Brief projektu voicebota
2. Karta use case'u
3. Matryca oceny automatyzacji
4. Mapa procesu rozmowy
5. Szablon scenariusza dialogowego
6. Szablon intencji
7. Szablon encji
8. Tabela fraz treningowych
9. Dokument persony voicebota
10. Dokument promptu systemowego
11. Specyfikacja integracji
12. Plan testow
13. Checklista QA
14. Checklista przedwdrozeniowa
15. Raport z pilotazu
16. Dashboard metryk
17. Raport z analizy rozmow
18. Backlog optymalizacji
19. Dokument handoff do konsultanta
20. Dokumentacja utrzymaniowa

## Czesc XVI. Case studies

Poziom: praktyczny-sredni

Branze: e-commerce, bankowosc, ubezpieczenia, medycyna, telekomunikacja, energetyka, administracja publiczna, rekrutacja, windykacja, sprzedaz B2B, helpdesk IT.

## Czesc XVII. Egzamin i certyfikacja Voicebot Specialist

Poziom: certyfikacyjny

1. Foundation, Professional, Expert
2. Zakres egzaminu
3. Pytania testowe
4. Zadania praktyczne
5. Projekt koncowy
6. Kryteria oceny i rubryka
7. Wymagania portfolio

## Czesc XVIII. Psychologia rozmowy z voicebotem

Poziom: zaawansowany

1. Psychologia rozmowy glosowej
2. Modele mentalne uzytkownika
3. Zaufanie, kontrola i poczucie bezpieczenstwa
4. Obciazenie poznawcze
5. Emocje uzytkownika
6. Psychologia bledu i naprawy rozmowy
7. Perswazja, decyzje i wplyw spoleczny
8. Antropomorfizacja voicebota
9. Psychologia jezyka
10. Roznice indywidualne uzytkownikow
11. Psychologia zaufania do AI
12. Psychologiczne metryki jakosci rozmowy
13. Narzedzia psychologiczne
14. Mini case studies psychologiczne

---

# 4. Program kursu Voicebot Specialist

## 4.1. Wersja intensywna: 6 tygodni

| Tydzien | Temat | Efekty uczenia sie | Projekt praktyczny |
|---|---|---|---|
| 1 | Fundamenty, architektura, kanal glosowy | Uczestnik rozroznia voiceboty, IVR, chatboty, LLM voice agents; umie opisac podstawowa architekture | Mapa architektury voicebota dla jednego procesu |
| 2 | Analiza biznesowa i use case | Uczestnik ocenia automatyzowalnosc, ryzyka i potencjal ROI | Karta use case'u i matryca oceny |
| 3 | Conversation design i scenariusze | Uczestnik projektuje flow, intencje, encje, fallbacki, eskalacje | Scenariusz dialogowy dla procesu transakcyjnego |
| 4 | Dane, ASR/NLU, testowanie | Uczestnik tworzy frazy treningowe, testy NLU i plan QA | Mini zestaw treningowy plus confusion matrix |
| 5 | LLM, RAG, integracje i compliance | Uczestnik projektuje hybrydowa architekture i identyfikuje ryzyka | Prompt systemowy plus specyfikacja integracji |
| 6 | Metryki, optymalizacja, projekt koncowy | Uczestnik interpretuje metryki i przygotowuje backlog optymalizacji | Prezentacja projektu voicebota end-to-end |

Kryteria zaliczenia:

- 30% projekt use case i business case.
- 25% scenariusz dialogowy i conversation design.
- 20% plan testow i metryki.
- 15% architektura i integracje.
- 10% compliance i handoff.

## 4.2. Wersja standardowa: 12 tygodni

| Tydzien | Modul | Rezultat |
|---|---|---|
| 1 | Fundamenty Conversational AI | Slownik pojec i mapa rynku |
| 2 | Architektura voicebota | Diagram techniczny |
| 3 | Telefonia, ASR, TTS | Analiza ograniczen kanalu |
| 4 | Conversation design | Persona i zasady komunikatow |
| 5 | Flow, intencje, encje, sloty | Model dialogowy |
| 6 | Barge-in, turn-taking, recovery | Specyfikacja przerwan i timingow |
| 7 | Analiza biznesowa | Matryca use case'ow |
| 8 | Dane i jakosc NLU | Dataset treningowy i testowy |
| 9 | LLM/RAG/hybrydy | Projekt architektury generatywnej |
| 10 | Integracje i automatyzacja | Specyfikacja API i bledow |
| 11 | QA, UAT, metryki | Plan testow i dashboard |
| 12 | Wdrozenie, governance, prezentacja | Projekt koncowy |

## 4.3. Wersja akademicka: 2 semestry

Semestr 1: fundamenty, architektura, conversation design, analiza biznesowa, dane, NLU, podstawy QA.  
Semestr 2: LLM/RAG, integracje enterprise, metryki, compliance, psychologia rozmowy, case studies, certyfikacja.

Efekty uczenia sie po 2 semestrach:

1. Absolwent potrafi samodzielnie przeprowadzic discovery i audit rozmow.
2. Absolwent potrafi wybrac i uzasadnic use case voicebota.
3. Absolwent potrafi zaprojektowac architekture wysokiego poziomu.
4. Absolwent potrafi przygotowac scenariusze, intencje, encje, fallbacki i eskalacje.
5. Absolwent potrafi wspolpracowac z zespolami ASR/NLU/LLM/backend/contact center.
6. Absolwent potrafi zaplanowac testy, UAT, pilot i hypercare.
7. Absolwent potrafi interpretowac metryki i prowadzic optymalizacje.
8. Absolwent rozumie ryzyka prawne, etyczne i psychologiczne.

Projekt koncowy:

Pelna dokumentacja voicebota dla wybranego procesu, zawierajaca brief, karte use case'u, mape procesu, scenariusze, dataset treningowy, specyfikacje integracji, prompt systemowy, plan QA, dashboard metryk, ryzyka compliance i plan optymalizacji po wdrozeniu.

---

# 5. Rozdzial specjalny: Barge-in, interruption handling i turn-taking w voicebotach

## 5.1. Cele rozdzialu

Po tym rozdziale czytelnik potrafi:

1. Wyjasnic, czym barge-in rozni sie od interruption handling i od zwyklego turn-taking.
2. Opisac, jak ludzie naturalnie przejmuja ture w rozmowie.
3. Zaprojektowac polityke barge-in dla roznych typow komunikatow i procesow.
4. Zidentyfikowac techniczne elementy wykrywania przerwan: AEC, VAD, endpointing, ASR partials, turn detection, cancellation.
5. Przygotowac checklisty projektowe, techniczne i testowe.
6. Interpretowac metryki przerwan i zamieniac je na decyzje optymalizacyjne.

## 5.2. Kluczowe pojecia

| Pojecie | Definicja praktyczna | Typowe nieporozumienie |
|---|---|---|
| Turn-taking | Mechanizm organizowania, kto mowi, kiedy konczy i kiedy druga strona moze zaczac | Bledne zalozenie, ze wystarczy wykryc cisze |
| Turn | Wypowiedz lub sekwencja wypowiedzi jednej strony w danym momencie rozmowy | Traktowanie kazdego zdania jako osobnej tury |
| TCU | Turn-constructional unit, czyli jednostka wypowiedzi, po ktorej moze nastapic zmiana mowcy | Zakladanie, ze TCU zawsze konczy sie kropka lub cisza |
| TRP | Transition-relevant place, miejsce potencjalnego przejecia tury | Myslenie, ze TRP da sie wykryc tylko czasem pauzy |
| Overlap | Nakladanie sie wypowiedzi dwoch osob | Nie kazdy overlap jest konfliktem lub przerwaniem |
| Interruption | Proba przejecia tury, zwykle powodujaca overlap albo zmiane przebiegu rozmowy | Mylenie z kazdym dzwiekiem w tle |
| Barge-in | Funkcja pozwalajaca uzytkownikowi mowic w trakcie wypowiedzi bota i przerwac odtwarzanie | Traktowanie jako checkbox w platformie |
| Interruption handling | Cala strategia obslugi przerwania: wykrycie, klasyfikacja, zatrzymanie, interpretacja, recovery | Sprowadzanie do zatrzymania TTS |
| Backchannel | Krotki sygnal sluchania: "mhm", "okej", "jasne", ktory zwykle nie przejmuje tury | Bledne zatrzymywanie bota po kazdym "mhm" |
| Endpointing | Decyzja, czy uzytkownik skonczyl mowic | Mylenie z VAD |
| VAD | Voice Activity Detection: wykrywanie, czy w sygnale jest mowa | Zakladanie, ze VAD rozumie intencje |
| AEC | Acoustic Echo Cancellation: usuwanie z mikrofonu glosu bota odtwarzanego przez glosnik | Pomijanie AEC przy pelnym dupleksie |
| Latency to stop TTS | Czas od poczatku realnego przerwania do zatrzymania wypowiedzi bota | Mierzenie tylko latency odpowiedzi, bez latency zatrzymania |

## 5.3. Wyjasnienie eksperckie

### 5.3.1. Czym jest barge-in

Barge-in to zdolnosc systemu glosowego do przyjmowania mowy uzytkownika w czasie, gdy bot sam mowi. W praktyce oznacza to, ze voicebot nie dziala jak walkie-talkie w trybie "najpierw ja, potem ty", lecz jak uczestnik rozmowy w pelnym dupleksie: mowi i jednoczesnie monitoruje, czy uzytkownik probuje przejac ture.

Wynika ze zrodel: dokumentacja Google Dialogflow CX opisuje barge-in jako mozliwosc przerwania audio odpowiedzi przez uzytkownika, po czym system zatrzymuje wysylanie audio i przetwarza kolejny input. Amazon Lex opisuje podobna funkcje w strumieniu dwukierunkowym: bot moze sluchac, gdy odtwarza prompt, a przerwanie generuje zdarzenie playback interruption. LiveKit idzie dalej i odroznia prawdziwe przerwania od backchannelingu.

Uzupelnienie eksperckie: w projekcie enterprise barge-in trzeba traktowac jako wymaganie systemowe, a nie jako opcje promptu. Jesli voicebot ma byc naturalny, musi umiec:

1. Sluchac podczas mowienia.
2. Nie mylic wlasnego TTS z glosem uzytkownika.
3. Odrzucac szum, kaszlniecia, echo i backchannele.
4. Rozpoznac, czy uzytkownik chce poprawic, przyspieszyc, zmienic temat, eskalowac czy wyrazic frustracje.
5. Zatrzymac TTS szybko.
6. Zachowac stan rozmowy.
7. Odpowiedziec w sposob, ktory pokazuje, ze przerwanie zostalo zrozumiane.

### 5.3.2. Barge-in a interruption handling

Barge-in jest warunkiem technicznym: uzytkownik moze wejsc w wypowiedz bota. Interruption handling jest zachowaniem konwersacyjnym: system rozumie, co z tym przerwaniem zrobic.

Przyklad:

Bot: "Podam teraz szczegoly zamowienia. Pierwsza pozycja to..."  
Uzytkownik: "Nie, ja chce zmienic adres."  

Samo barge-in: bot przestaje mowic.  
Dobre interruption handling: bot rozpoznaje korekte intencji, zatrzymuje poprzedni plan, przechodzi do zmiany adresu, zachowuje koszyk i mowi: "Jasne, zmienmy adres dostawy. Jaki ma byc nowy adres?"

Zly system moze zatrzymac TTS, ale potem zapytac od poczatku: "W czym moge pomoc?", tracac kontekst. Technicznie wykonal barge-in, ale konwersacyjnie nie obsluzyl przerwania.

### 5.3.3. Interruption a normalne turn-taking

Normalne turn-taking to plynna zmiana mowcy w miejscu, ktore rozmowcy rozpoznaja jako potencjalny koniec tury. Interruption wystepuje wtedy, gdy druga strona probuje przejac ture zanim pierwsza skonczyla albo zanim system uznal, ze nastapil koniec tury.

Wynika ze zrodel: przeglad Skantze pokazuje, ze ludzie osiagaja bardzo krotkie przerwy i niewielkie overlap dzieki przewidywaniu konca tury, a nie samemu czekaniu. Badanie Majlesi et al. pokazuje, ze gdy robot kontynuuje mowienie mimo prob przejecia tury przez czlowieka, uczestnicy traktuje to jako problem interakcyjny.

Uzupelnienie eksperckie: w voicebotach trzeba projektowac oba mechanizmy:

- Turn-taking: kiedy bot ma zaczac mowic po uzytkowniku.
- Interruption handling: kiedy bot ma przestac mowic, bo uzytkownik zaczal.

To sa rozne decyzje, choc korzystaja z podobnych sygnalow.

## 5.4. Jak ludzie naturalnie przejmuja ture

Ludzie przewiduja koniec tury na podstawie wielu sygnalow:

1. Skladnia: zdanie zbliza sie do kompletnej formy.
2. Semantyka: mysl zostala zakonczona.
3. Prosodia: intonacja, obnizenie tonu, wydluzenie sylaby, spadek energii.
4. Tempo: spowolnienie lub przyspieszenie przed koncem.
5. Pauza: cisza, ale zwykle krotka, niekoniecznie dluga.
6. Kontekst: pytanie wymaga odpowiedzi, lista ma kolejne elementy, potwierdzenie oczekuje "tak/nie".
7. Relacja celu: rozmowca wie, czego oczekuje dana sekwencja.
8. Sygnaly cielesne w rozmowie twarza w twarz: wzrok, gest, oddech, postawa.

W telefonicznym voicebocie czesc sygnalow odpada: bot nie widzi wzroku i gestow, a uzytkownik nie widzi ciala bota. Dlatego kanaly audio i semantyczne staja sie krytyczne.

Uwaga praktyczna:

Voicebot, ktory czeka 1000 ms ciszy po kazdej wypowiedzi uzytkownika, bedzie czul sie ociężale. Voicebot, ktory odpowiada po 150 ms po kazdym chwilowym spadku energii, bedzie ucinal ludziom zdania. Naturalnosc powstaje z dobrania polityki turn-taking do typu inputu.

## 5.5. Pauzy, overlap i sygnaly konca tury

Nie kazda pauza oznacza koniec. Uzytkownik moze pauzowac, bo:

- dyktuje numer konta partiami;
- szuka dokumentu;
- zastanawia sie;
- czyta kod SMS;
- przezywa emocje;
- nie zrozumial pytania;
- jest w halasliwym otoczeniu;
- mowi w drugim jezyku;
- ma wade wymowy lub wolniejsze tempo mowienia.

Nie kazdy overlap oznacza przerwanie. Overlap moze oznaczac:

- backchannel: "mhm", "jasne";
- wspolne domkniecie oczywistej frazy;
- potwierdzenie przed koncem pytania;
- spontaniczna korekte;
- frustracje;
- probe eskalacji;
- osobe trzecia w tle;
- przypadkowy dzwiek.

Błąd, ktory czesto kosztuje projekt:

Ustawienie jednego globalnego progu ciszy dla wszystkich etapow rozmowy. Ten sam prog nie pasuje do "Czy potwierdza pan zamowienie?", "Prosze podac szesnastocyfrowy numer karty", "Prosze opisac problem" i "Czy chce pan rozmawiac z konsultantem?".

## 5.6. Dlaczego zla obsluga przerwan brzmi nienaturalnie

Voicebot zle obslugujacy przerwania ujawnia swoja sztucznosc w kilku sekundach:

1. Mowi mimo ze uzytkownik zaczal mowic.
2. Zatrzymuje sie po "mhm", choc uzytkownik tylko sluchal.
3. Ignoruje korekte i kontynuuje poprzedni flow.
4. Przeprasza, ale nie naprawia bledu.
5. Restartuje rozmowe po kazdym przerwaniu.
6. Nie rozpoznaje frustracji.
7. Nie pozwala przejsc do czlowieka.

Perspektywa psychologiczna: gdy czlowiek przerywa, czesto walczy o kontrole nad rozmowa. Jesli system go ignoruje, rosnie poczucie bezradnosci i oporu. Zrodlo AISel dotyczace przerwan w spotkaniu uslugowym wskazuje, ze zaklocenia wywolane bledami chatbota moga zwiekszac gniew i negatywne oceny kompetencji systemu; w kanale glosowym efekt moze byc silniejszy, bo uzytkownik doslownie slyszy, ze system go przegaduje.

## 5.7. Typy przerwan

| Typ przerwania | Przyklad wypowiedzi uzytkownika | Intencja uzytkownika | Zalecana reakcja voicebota |
|---|---|---|---|
| Poprawienie bota | "Nie, nie Krakow, tylko Katowice" | Korekta danych | Zatrzymaj TTS, potwierdz poprawiona wartosc, nie restartuj flow |
| Odpowiedz przed koncem pytania | "Tak" w trakcie pytania | Przyspieszenie | Przyjmij odpowiedz, jesli kontekst jest jednoznaczny |
| Przyspieszenie rozmowy | "Dalej", "wiem", "pomin" | Skracanie | Przejdz do kolejnego kroku lub daj szybka opcje |
| Zmiana tematu | "A jeszcze chce zapytac o fakture" | Nowa intencja | Zapamietaj aktualny stan, przejdz do nowej intencji albo potwierdz priorytet |
| Frustracja | "No przeciez juz mowilem" | Naprawa i emocja | Skroc, przepros, nie powtarzaj tego samego, rozważ eskalacje |
| Przerwanie z powodu bledu | "To nie jest moj numer" | Krytyczna korekta | Natychmiast zatrzymaj, potwierdz blad, wroc do punktu korekty |
| Wymuszenie czlowieka | "Polacz mnie z konsultantem" | Handoff | Nie walcz. Jesli polityka pozwala, eskaluj lub poinformuj o warunkach |
| Backchannel | "mhm", "okej" | Sluchanie | Kontynuuj, chyba ze kontekst wymaga odpowiedzi |
| Osoba trzecia | "Powiedz mu, zeby zapytal o raty" | Wplyw innej osoby | Ostroznie. Ustal, czy mowi glowny uzytkownik i czy mozna uzyc informacji |

## 5.8. Jak dziala technicznie wykrywanie przerwan

### 5.8.1. Pelny dupleks

System musi sluchac, gdy mowi. Bez tego nie ma prawdziwego barge-in. W half-duplex bot najpierw odtwarza cala wypowiedz, dopiero potem slucha. To moze wystarczyc w prostym IVR, ale nie w naturalnym voicebocie.

### 5.8.2. Acoustic Echo Cancellation

Gdy bot mowi przez glosnik telefonu lub urzadzenia, mikrofon moze "slyszec" jego wlasna synteze. AEC odejmuje znany sygnal odtwarzany przez system od sygnalu z mikrofonu. Najtrudniejszy przypadek to double-talk: bot i uzytkownik mowia jednoczesnie.

Uzupelnienie eksperckie: w call center przez telefon klasyczny problem echa moze byc mniejszy niz w smart speakerze, ale nadal istnieja inne zrodla falszywego inputu: halas, drugi rozmowca, radio, glos konsultanta obok, odtworzone audio, opoznienia sieciowe.

### 5.8.3. VAD

VAD odpowiada na pytanie: "czy w sygnale jest mowa?". Nie odpowiada na pytanie: "czy uzytkownik chce przejac ture?". Dlatego VAD jest bramka, nie decyzja konwersacyjna.

### 5.8.4. Endpointing

Endpointing decyduje, czy uzytkownik skonczyl mowic. Moze korzystac z ciszy, interpunkcji ASR, sygnalow modelu STT, semantycznej kompletnosci lub turn detectora. Google Dialogflow CX opisuje end-of-speech sensitivity i smart endpointing, ktory moze czekac, gdy partial input wyglada na niedokonczony. AWS Connect opisuje end-of-turn confidence threshold i silence timeout jako dwa mechanizmy konca tury.

### 5.8.5. ASR partials

Streaming ASR dostarcza czesciowe hipotezy. Sa one cenne, bo mozna szybciej wykryc "stop", "nie", "konsultant", "czekaj", "zmien". Sa tez ryzykowne, bo partial moze sie zmienic.

Praktyczna zasada:

- Dla komend krytycznych typu "stop", "anuluj", "konsultant" mozna reagowac szybciej.
- Dla danych transakcyjnych trzeba poczekac na stabilizacje, bo blad moze kosztowac wiecej niz 300 ms opoznienia.

### 5.8.6. Model-based turn detection

Model-based turn detection probuje ocenic, czy wypowiedz jest kompletna i czy rozmowca oddaje lub przejmuje ture. LiveKit opisuje roznice miedzy VAD, endpointing i model-based detection oraz adaptive interruption handling, ktore analizuje sygnaly akustyczne, aby odroznic prawdziwe przerwania od backchannelingu.

### 5.8.7. Klasyfikacja intencji przerwania

Po wykryciu przerwania system musi sklasyfikowac jego typ. Minimalny model decyzyjny:

1. Czy to mowa uzytkownika?
2. Czy to prawdziwe przejecie tury?
3. Czy wypowiedz jest backchannelem?
4. Czy to korekta danych?
5. Czy to nowa intencja?
6. Czy to eskalacja?
7. Czy to frustracja?
8. Czy to informacja bezpieczna do uzycia?

### 5.8.8. Anulowanie TTS i generacji

Dobre barge-in zatrzymuje nie tylko dzwiek. Jesli system generuje wypowiedz token po tokenie i wysyla ja do TTS, trzeba zatrzymac:

1. Odtwarzanie audio.
2. Bufor TTS.
3. Trwajaca generacje LLM.
4. Plan odpowiedzi, ktory stal sie nieaktualny.

OpenAI Realtime docs wskazuja, ze przy WebRTC i SIP serwer zarzadza buforem audio i moze automatycznie ucinac nieodtworzone audio przy przerwaniu, natomiast przy WebSocket klient musi sam zatrzymac playback i obsluzyc truncation. To jest praktycznie wazne: architektura polaczenia zmienia odpowiedzialnosc za przerwanie.

## 5.9. Projektowanie barge-in dla roznych typow wypowiedzi

| Typ wypowiedzi bota | Polityka barge-in | Uzasadnienie |
|---|---|---|
| Informacyjna | Wlaczony, z filtrem backchannel | Uzytkownik moze znac odpowiedz lub chciec skrocic |
| Transakcyjna | Wlaczony, ale zalezne od kroku | Korekty sa czeste i cenne; przy finalnym potwierdzeniu ostrozniej |
| Sprzedazowa | Wlaczony | Brak mozliwosci przerwania brzmi jak presja |
| Windykacyjna | Wlaczony plus szybka eskalacja w emocjach | Wysokie ryzyko frustracji, sporu i compliance |
| Reklamacyjna | Wlaczony | Uzytkownik czesto chce doprecyzowac lub skorygowac |
| Medyczna | Wlaczony ostroznie, z priorytetem bezpieczenstwa | Przerwania moga sygnalizowac pilnosc lub blad |
| Awaryjna | Wlaczony dla krytycznych slow; krotkie tury | System nie moze monologowac |
| Disclaimer prawny | Ograniczony lub wylaczony, zalezne od wymogu | Czasem pelny komunikat musi byc odtworzony, ale warto projektowac go krotko |
| Platnosc/autoryzacja | Selektywny | Trzeba unikac falszywych przerwan i utraty danych |

## 5.10. Kiedy barge-in wlaczyc, ograniczyc lub wylaczyc

### Wlacz, gdy:

- uzytkownik moze znac odpowiedz przed koncem pytania;
- bot odczytuje dluzsza informacje;
- uzytkownik moze poprawic dane;
- rozmowa dotyczy reklamacji, wsparcia, rezerwacji, statusu sprawy;
- uzytkownik moze poprosic o czlowieka;
- komunikat ma charakter operacyjny, a nie prawnie wymagany.

### Ogranicz, gdy:

- zbierasz dlugie numery lub kody;
- etap wymaga wysokiej dokladnosci;
- mowia osoby trzecie w tle;
- user input moze byc przypadkowym dzwiekiem;
- uzytkownik jest w halasliwym otoczeniu;
- wypowiedz bota zawiera krytyczne ostrzezenie, ale nie musi byc formalnie odtworzone w calosci.

### Wylacz albo zaprojektuj jako nieprzerywalne, gdy:

- przepis wymaga odtworzenia calego disclaimeru;
- trwa finalne odczytanie regulaminowo wymaganej informacji;
- system musi przekazac ostrzezenie bezpieczenstwa;
- wylaczenie jest uzasadnione i udokumentowane.

Uwaga praktyczna:

Nie wylaczaj barge-in globalnie, zeby ukryc problemy VAD. To poprawia demo, ale pogarsza prawdziwe rozmowy. AWS Connect wprost wskazuje jako blad globalne wylaczanie barge-in, zamiast ograniczania go tylko w konkretnych promptach.

## 5.11. Projektowanie komunikatow odpornych na przerwania

Komunikat odporny na przerwania:

1. Ma najwazniejsza informacje na poczatku.
2. Jest krotki.
3. Zawiera jedno pytanie naraz.
4. Nie laczy instrukcji, informacji i pytania w jednym dlugim bloku.
5. Pozwala uzytkownikowi odpowiedziec wczesnie.
6. Ma sens, nawet jesli zostanie przerwany po pierwszej frazie.
7. Nie wymaga od uzytkownika zapamietania listy pieciu opcji.

Zly komunikat:

"Za chwile przedstawie dostepne mozliwosci dotyczace pana zamowienia, w tym zmiane terminu, zmiane adresu, anulowanie, kontakt z kurierem albo rozmowe z konsultantem, dlatego prosze wysluchac wszystkich opcji i powiedziec, ktora z nich pana interesuje."

Lepszy komunikat:

"Moge pomoc ze zmiana terminu, adresem albo anulowaniem. Co chce pan zrobic?"

## 5.12. Jak zmniejszac potrzebe przerywania

Uzytkownicy przerywaja czesto dlatego, ze system:

- mowi za dlugo;
- pyta o rzecz, ktora uzytkownik juz podal;
- idzie nie ta sciezka;
- nie daje opcji "czlowiek";
- brzmi jak IVR;
- nie potwierdza zrozumienia;
- ukrywa ograniczenia;
- zmusza do wysluchania listy.

Zmniejszanie przerwan to nie tylko lepsze wykrywanie przerwan. To lepsze projektowanie rozmowy.

## 5.13. Metryki barge-in i turn-taking

| Metryka | Definicja | Jak interpretowac |
|---|---|---|
| Interruption rate | Odsetek tur bota przerwanych przez uzytkownika | Wysoki wynik moze oznaczac skuteczna kontrole albo zbyt dlugie prompt'y |
| False barge-in rate | Przerwania wywolane szumem/backchannel/echo | Wysoki wynik sugeruje problem VAD/AEC/adaptive handling |
| Missed barge-in rate | Realne przerwania, ktorych bot nie obsluzyl | Wysoki wynik niszczy zaufanie i zwieksza eskalacje |
| Barge-in recovery success | Odsetek przerwan zakonczonych poprawna kontynuacja | Najwazniejsza metryka konwersacyjna |
| Latency to stop TTS | Czas od startu przerwania do zatrzymania audio | Powyzej kilkuset ms system zaczyna brzmiec jak ignorujacy |
| Turn detection accuracy | Jak czesto system poprawnie rozpoznaje koniec tury | Wplywa na ucinanie i martwa cisze |
| User repeat rate | Jak czesto uzytkownik powtarza po przerwaniu | Wysoki wynik oznacza utrate inputu albo brak potwierdzenia |
| Frustration escalation rate | Eskalacje po przerwaniach lub no-match | Wskazuje, czy przerwania sa problemem UX |
| Backchannel suppression accuracy | Jak dobrze system ignoruje "mhm", "okej" | Wazne w dluzszych odpowiedziach |
| Context preservation after interruption | Czy system zachowal stan po przerwaniu | Kluczowe w procesach transakcyjnych |

## 5.14. Checklista projektowa barge-in

- Czy wiemy, w ktorych promptach barge-in jest wlaczony, ograniczony lub wylaczony?
- Czy kazdy dlugi komunikat zostal skrocony albo podzielony?
- Czy komunikat ma najwazniejsza informacje na poczatku?
- Czy system umie obsluzyc "nie", "czekaj", "stop", "konsultant", "zmien", "to nie tak"?
- Czy backchannele nie zatrzymuja bota bez potrzeby?
- Czy przerwanie korekcyjne wraca do konkretnego slotu, a nie do poczatku flow?
- Czy przerwanie emocjonalne moze uruchomic skrocenie rozmowy lub eskalacje?
- Czy prompt prawny ma uzasadniona polityke nieprzerywalnosci?
- Czy przerwania sa opisane w scenariuszu dialogowym?
- Czy handoff przekazuje informacje, ze uzytkownik probowal przerwac lub eskalowac?

## 5.15. Checklista techniczna

- Czy kanal wspiera pelny dupleks?
- Czy mikrofon/sluchawka/telefonia nie generuja falszywego echa?
- Czy jest AEC lub rownowazny mechanizm dla danego kanalu?
- Czy VAD jest strojony na realne warunki akustyczne?
- Czy ASR dostarcza partials i timestampy?
- Czy system ma endpointing zalezne od kontekstu?
- Czy turn detector rozroznia krotkie odpowiedzi, dlugie dyktowanie i otwarte opisy?
- Czy TTS mozna zatrzymac natychmiast?
- Czy generacje LLM mozna anulowac?
- Czy stan dialogu jest stabilny po anulowaniu odpowiedzi?
- Czy logujemy moment startu przerwania, moment zatrzymania TTS i wynik recovery?
- Czy mamy oznaczenia true interruption, false interruption, backchannel, noise, third-party speech?

## 5.16. Checklista testowa

Testy musza obejmowac:

- Uzytkownik odpowiada "tak" przed koncem pytania.
- Uzytkownik mowi "nie, inaczej" w trakcie podsumowania.
- Uzytkownik mowi "konsultant" w trakcie monologu.
- Uzytkownik mowi "mhm" w trakcie informacji.
- Uzytkownik kaszle w trakcie TTS.
- W tle slychac druga osobe.
- Uzytkownik dyktuje numer z pauzami.
- Uzytkownik poprawia jedna cyfre.
- Uzytkownik zmienia temat.
- Uzytkownik reaguje zloscia.
- Uzytkownik przerywa disclaimer.
- Uzytkownik przerywa finalne potwierdzenie platnosci.
- Uzytkownik przerywa po polsku z akcentem/regionalizmem.
- Uzytkownik mowi bardzo cicho.
- Uzytkownik mowi w halasie.

## 5.17. Przyklady dialogow

### Zle obsluzone przerwanie

Bot: "Podsumuje zamowienie. Wybral pan dostawę na piatek, adres ulica Lesna 14, platnosc karta..."  
Uzytkownik: "Nie, adres jest inny."  
Bot: "...oraz dostawe miedzy 12:00 a 14:00. Czy potwierdza pan zamowienie?"  
Uzytkownik: "Nie, mowie, ze adres jest inny!"  

Analiza: bot ignoruje korekte, kontynuuje TTS i doprowadza do frustracji. Problem moze byc techniczny (brak barge-in), projektowy (dlugi prompt), albo dialogowy (brak recovery).

### Dobrze obsluzone przerwanie

Bot: "Podsumuje zamowienie. Dostawa na piatek, adres ulica Lesna..."  
Uzytkownik: "Nie, adres jest inny."  
Bot: "Dobrze, poprawmy adres. Jaki adres mam wpisac?"  
Uzytkownik: "Kwiatowa 8 mieszkania 12."  
Bot: "Zmieniam na Kwiatowa 8 mieszkania 12. Czy sie zgadza?"  

Analiza: bot zatrzymal wypowiedz, rozpoznal korekte, zachowal kontekst zamowienia i wrocil do konkretnego slotu.

### Backchannel, ktory nie powinien zatrzymac bota

Bot: "Reklamacje mozna zlozyc telefonicznie albo przez formularz..."  
Uzytkownik: "Mhm."  
Bot: "...telefonicznie przyjme ja teraz, a formularz wyslemy SMS-em. Ktora opcje pan wybiera?"  

Analiza: "mhm" nie przejmuje tury. Dobre adaptive interruption handling powinno pozwolic botowi kontynuowac.

### Przerwanie eskalacyjne

Bot: "Moge pomoc sprawdzic status sprawy albo przyjac dodatkowe informacje..."  
Uzytkownik: "Chce rozmawiac z czlowiekiem."  
Bot: "Rozumiem. Polacze z konsultantem i przekaze, ze chodzi o status sprawy. Prosze zostac na linii."  

Analiza: w sytuacji jasnej eskalacji bot nie powinien probowac na sile zatrzymac uzytkownika w automatyzacji.

## 5.18. Mini case studies

### Case 1: E-commerce, zmiana adresu

Problem: uzytkownicy przerywaja podsumowanie zamowienia, bo chca poprawic adres.  
Blad: system nie zachowuje stanu po przerwaniu i wraca do poczatku.  
Rozwiazanie: barge-in wlaczony dla podsumowania, klasyfikacja "correction", recovery do slotu "delivery_address".  
Metryki: interruption rate w podsumowaniu, recovery success, repeat rate, completion rate.

### Case 2: Bank, dyktowanie numeru

Problem: bot ucina uzytkownika podczas podawania numeru klienta partiami.  
Blad: zbyt agresywny endpointing i za niski prog konca tury.  
Rozwiazanie: konserwatywne end-of-turn dla slotu numeru, potwierdzanie grupami, mozliwosc korekty ostatniej grupy.  
Metryki: digit correction rate, ASR confidence, failed verification rate.

### Case 3: Reklamacja, frustracja

Problem: uzytkownik mowi "juz to podawalem", bot powtarza to samo pytanie.  
Blad: fallback bez pamieci i bez reakcji emocjonalnej.  
Rozwiazanie: wykrywanie przerwania frustracyjnego, skrocona naprawa, eskalacja po drugim nieudanym kroku.  
Metryki: frustration escalation rate, no-match after interruption, CSAT after handoff.

## 5.19. Jak mysli ekspert projektujacy barge-in

Ekspert nie pyta najpierw: "Czy platforma ma barge-in?". Pyta:

1. W ktorych momentach uzytkownik bedzie chcial przerwac?
2. Czy przerwanie oznacza korekte, przyspieszenie, sprzeciw, frustracje, zmiane celu czy eskalacje?
3. Czy prompt jest tak dlugi, ze sam prowokuje przerwania?
4. Czy system ma techniczna mozliwosc zatrzymania TTS i generacji?
5. Czy po przerwaniu zachowujemy stan procesu?
6. Czy umiemy odroznic "mhm" od "nie"?
7. Czy w danym kroku bardziej ryzykujemy falszywe przerwanie, czy ignorowanie uzytkownika?
8. Czy mamy metryki pokazujace, jak dzialaja przerwania w produkcji?
9. Czy konsultant po handoff widzi, co uzytkownik probowal zrobic?
10. Czy barge-in poprawia poczucie kontroli, czy tylko dodaje losowosc?

## 5.20. Zrodla wspierajace rozdzial

Najmocniejsze zrodla naukowe:

- Gabriel Skantze, "Turn-taking in Conversational Systems and Human-Robot Interaction: A Review", Computer Speech & Language, 2021: https://www.sciencedirect.com/science/article/pii/S088523082030111X
- Majlesi et al., "Managing Turn-Taking in Human-Robot Interactions", Social Interaction, 2023: https://tidsskrift.dk/socialinteraction/article/view/137380
- Gervits & Scheutz, "Pardon the Interruption", SIGDIAL 2018: https://aclanthology.org/W18-5011/
- Crook et al., "Handling User Interruptions in an Embodied Conversational Agent", 2010: https://www.cs.ox.ac.uk/publications/publication3549-abstract.html
- Edwards et al., "Eliciting Spoken Interruptions to Inform Proactive Speech Agent Design", CUI 2021: https://dspace.library.uu.nl/handle/1874/415058
- Reicherts et al., "May I Interrupt? Diverging Opinions on Proactive Smart Speakers", CUI 2021: https://discovery.ucl.ac.uk/id/eprint/10152524/
- Imperial College London, dataset i klasyfikacja true/false interruptions, 2024: https://www.imperial.ac.uk/news/257034/analysing-speech-interruptions-help-create-more/
- TPI-VA, "Still Between Us?", ACL 2026: https://tpi-va.github.io/

Najwazniejsze zrodla techniczne i dokumentacyjne:

- LiveKit adaptive interruption handling: https://docs.livekit.io/agents/logic/turns/adaptive-interruption-handling/
- LiveKit turn detection and interruption configuration: https://livekit.com/blog/turn-detection-and-interruption-handling
- LiveKit VAD, endpointing and model-based turn detection: https://livekit.com/blog/turn-detection-voice-agents-vad-endpointing-model-based-detection
- OpenAI Realtime conversations: https://platform.openai.com/docs/guides/realtime-conversations
- Google Dialogflow CX advanced speech settings: https://docs.cloud.google.com/dialogflow/cx/docs/concept/advanced-speech
- AWS Connect agentic voice best practices: https://docs.aws.amazon.com/connect/latest/adminguide/agentic-voice-best-practices.html
- Amazon Lex V2 interruption docs: https://docs.aws.amazon.com/lexv2/latest/dg/interrupt-bot.html
- W3C VoiceXML 2.0: https://www.w3.org/TR/voicexml20/

---

# 6. Co powinno znalezc sie w kolejnej czesci

Kolejna czesc powinna rozpoczac pelne opracowanie rozdzialow podrecznika wedlug stalej struktury: cele rozdzialu, kluczowe pojecia, wyjasnienie eksperckie, perspektywa biznesowa, perspektywa uzytkownika, perspektywa technologiczna, dobre praktyki, typowe bledy, checklisty, mini case study, cwiczenia i podsumowanie.

Rekomendowana kolejnosc kolejnej czesci:

1. Czesc I, rozdzialy 1-7: Fundamenty Conversational AI i voicebotow.
2. Czesc II, rozdzialy 1-4: Telefonia, streaming audio, ASR i NLU.
3. Pierwsze szablony: brief projektu voicebota, karta use case'u i mapa procesu rozmowy.
