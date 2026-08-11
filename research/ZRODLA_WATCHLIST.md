# Watchlista źródeł — automatyczny research podręcznika

Ten plik jest wsadem dla cyklicznego agenta researchowego. Agent czyta listę źródeł,
sprawdza nowości od daty ostatniego raportu i zapisuje digest do pliku
`research/RESEARCH_RRRR-MM.md` (osobna gałąź + pull request — nigdy bezpośrednio na main).

Zasady nadrzędne:

1. **Zasada uczciwości źródłowej** (jak w bibliografii podręcznika): każda pozycja w raporcie
   ma link do źródła i datę publikacji. Bez źródła — nie istnieje.
2. Agent **nie edytuje treści podręcznika**. Produktem jest wyłącznie raport z propozycjami.
   Decyzję o zmianie w częściach 1–19 podejmuje człowiek.
3. Filtr istotności: do raportu trafia tylko to, co zmienia praktykę projektowania,
   testowania lub utrzymania voicebotów albo dezaktualizuje istniejący fragment podręcznika.
   Marketing vendorów, rebranding i posty bez treści technicznej — pomijać.
4. Stan ostatniego przebiegu = data najnowszego pliku `RESEARCH_*.md` w tym folderze.
   Jeśli folderu nie ma lub jest pusty — wziąć ostatnie 45 dni.

---

## 1. Platformy i vendorzy (changelogi, dokumentacja, blogi techniczne)

| Źródło | Co śledzić | URL startowy |
|---|---|---|
| OpenAI | Realtime API, speech-to-speech, TTS/STT | https://platform.openai.com/docs/changelog |
| Anthropic | modele, agenty, voice use cases | https://www.anthropic.com/news |
| Google | Gemini Live API, Cloud STT/TTS | https://ai.google.dev/gemini-api/docs/changelog |
| Microsoft | Azure AI Speech — What's new | https://learn.microsoft.com/en-us/azure/ai-services/speech-service/releasenotes |
| ElevenLabs | Agents Platform, TTS, dubbing | https://elevenlabs.io/blog |
| Deepgram | STT, Voice Agent API | https://deepgram.com/changelog |
| Cartesia | TTS niskolatencyjne | https://cartesia.ai/blog |
| Twilio | Voice, ConversationRelay | https://www.twilio.com/en-us/changelog |
| LiveKit | Agents framework | https://blog.livekit.io |
| Pipecat / Daily | framework voice agents | https://www.daily.co/blog |
| Vapi | platforma voice agents | https://vapi.ai/blog |
| Retell AI | platforma voice agents | https://www.retellai.com/blog |
| Rasa | enterprise CAI | https://rasa.com/blog |
| Cognigy | enterprise CAI / contact center | https://www.cognigy.com/blog |
| Parloa | enterprise CAI / contact center | https://www.parloa.com/resources |
| PolyAI | voice assistants dla CX | https://poly.ai/blog |

## 2. Badania naukowe

- arXiv (cs.CL, eess.AS, cs.HC) — zapytania: `full-duplex spoken dialogue`,
  `turn-taking prediction`, `barge-in`, `speech-to-speech model`, `voice agent evaluation`,
  `spoken dialogue benchmark` — nowe prace od ostatniego przebiegu.
- ACL Anthology — nowe proceedings (SIGDIAL, Interspeech, ACL/EMNLP — sesje speech/dialogue).
- Miara istotności: praca wnosi coś do części 1 (barge-in/turn-taking), 7 (dane i NLU),
  8 (LLM/RAG), 10 (QA/ewaluacja), 11 (metryki) lub 19 (psychologia rozmowy).

## 3. Prawo i compliance (część 13)

- EU AI Act — harmonogram stosowania, wytyczne KE, akty wykonawcze
  (transparentność art. 50 dotyczy botów głosowych): https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
- EDPB i UODO — wytyczne dotyczące AI, głosu, biometrii, nagrywania rozmów.
- Zmiany w prawie konsumenckim UE dotyczące automatycznej obsługi klienta.

## 4. Trendy branżowe i benchmarki

- Gartner Newsroom (conversational AI, customer service): https://www.gartner.com/en/newsroom
- Benchmarki latencji/jakości modeli głosowych (np. Artificial Analysis, blogi porównawcze).
- Duże wdrożenia i case studies voicebotów w e-commerce/CX (materiał do części 17).

---

## Mapowanie tematów na części podręcznika

| Temat nowości | Części podręcznika |
|---|---|
| barge-in, turn-taking, full-duplex | 1, 4, 10 |
| architektura, ASR/TTS, telefonia, latencja | 2, 3 |
| conversation design, persona, dialogi | 4, 6 |
| LLM, RAG, prompty, function calling | 8 |
| integracje, automatyzacja | 9 |
| testowanie, QA, ewaluacja | 10 |
| metryki, analityka | 11 |
| wdrożenie, operating model | 12 |
| prawo, AI Act, RODO, bezpieczeństwo | 13 |
| etyka, dostępność, transparentność | 14 |
| rynek pracy, rola specjalisty | 15 |
| narzędzia, szablony | 16 |
| case studies | 17 |
| psychologia rozmowy | 19 |

---

## Format raportu `RESEARCH_RRRR-MM.md`

```
# Research podręcznika — RRRR-MM

Okres: od <data ostatniego raportu> do <data przebiegu>
Przejrzane źródła: <liczba> (w tym niedostępne: <lista, jeśli były>)

## Do wdrożenia (dezaktualizuje treść podręcznika)
### <tytuł nowości>
- Źródło: <link>, <data publikacji>
- Co się zmieniło: <2-4 zdania po polsku>
- Dotyczy: część <nr> — <która sekcja/rozdział>
- Propozycja zmiany: <konkretnie: co dopisać/poprawić/usunąć>

## Warte odnotowania (nie wymaga zmiany, poszerza kontekst)
### <tytuł> — źródło, data, 1-2 zdania, ewentualnie która część

## Obserwowane (za wcześnie na wnioski)
- <jedno zdanie na pozycję, z linkiem>

## Źródła niedostępne lub bez nowości
- <lista — dla uczciwości pokrycia>
```

Limit: maks. 8 pozycji w „Do wdrożenia" i 10 w „Warte odnotowania" na raport —
raport ma być do przeczytania w 15 minut. Nadmiar → sekcja „Obserwowane".
