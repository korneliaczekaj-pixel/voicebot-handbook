# Voicebot Specialist Handbook

## Bibliografia, źródła i mapa wykorzystania

Wersja robocza: 2026-07-29

---

# 1. Zasada uczciwości źródłowej

Podręcznik łączy trzy warstwy:

1. Wiedza bezpośrednio wsparta źródłami naukowymi, dokumentacyjnymi i technicznymi.
2. Synteza ekspercka, czyli łączenie wielu źródeł w praktyczne modele, checklisty i procesy.
3. Uzupełnienia praktyczne wynikające z doświadczenia wdrożeniowego, szczególnie w obszarach briefów, ROI, dokumentacji, QA, metryk, operating model i szablonów.

Checklisty, matryce i szablony są w dużej części autorską syntezą ekspercką. Nie należy ich traktować jako cytatu z jednego źródła, lecz jako praktyczne narzędzia zbudowane na podstawie literatury, dokumentacji platform i standardów wdrożeń enterprise.

---

# 2. Źródła naukowe i badawcze

## Rozmowa, turn-taking, przerwania, interakcja

- ScienceDirect, Computer Speech & Language, artykuł o turn-taking w systemach konwersacyjnych: https://www.sciencedirect.com/science/article/pii/S088523082030111X
- ScienceDirect, Computer Speech & Language, handling user interruptions: https://www.sciencedirect.com/science/article/pii/S0885230810000690
- Social Interaction, "Managing Turn-Taking in Human-Robot Interactions": https://tidsskrift.dk/socialinteraction/article/view/137380
- University of Oxford publication, handling user interruptions in embodied conversational agents: https://www.cs.ox.ac.uk/publications/publication3549-abstract.html
- ACL Anthology, "Pardon the Interruption": https://aclanthology.org/W18-5011/
- Tufts HRILab, Gervits et al. SIGDIAL 2018: https://hrilab.tufts.edu/publications/gervitsetal2018sigdial
- Imperial College London, speech interruptions dataset/news: https://www.imperial.ac.uk/news/257034/analysing-speech-interruptions-help-create-more/
- TPI-VA, third-party interruptions in voice assistants: https://tpi-va.github.io/
- International Journal of Computer, conversational/AI business source: https://ijcjournal.org/InternationalJournalOfComputer/article/view/2494
- AISel ICIS 2021, AI business/customer interaction: https://aisel.aisnet.org/icis2021/ai_business/ai_business/6/
- Utrecht University Repository, CUI/proactive speech agents: https://dspace.library.uu.nl/handle/1874/415058
- UCL Discovery, proactive smart speakers/interruption opinions: https://discovery.ucl.ac.uk/id/eprint/10152524/
- SAGE/FAIA source: https://journals.sagepub.com/doi/abs/10.3233/FAIA220211
- MDPI, review recent advances in turn-taking modelling in conversational systems: https://www.mdpi.com/2227-7080/13/12/591
- CHI/Paper Guild, LLM-powered voice agents supporting interruptions and backchannels with older adults: https://pgl.jp/papers/10.1145/3706598.3714228

Najmocniej wspierane części:

- Część 1: mapa wiedzy i barge-in.
- Część 4: conversation design i turn-taking.
- Część 10: QA barge-in/turn-taking.
- Część 14: etyka i dostępność.
- Część 19: psychologia rozmowy.

## Odbiór użytkownika, UX, zaufanie i ocena systemów mowy

- Cambridge Core, SASSI - Subjective Assessment of Speech System Interfaces: https://www.cambridge.org/core/services/aop-cambridge-core/content/view/29E49E8449B9E96CDEE2581D0000BA98/S1351324900002497a.pdf/towards-a-tool-for-the-subjective-assessment-of-speech-system-interfaces-sassi.pdf
- CMU summary, PARADISE framework for evaluating spoken dialogue agents: https://www.cs.cmu.edu/~aliceo/dialogdiscussions.html
- DFKI/Springer, design principles for task-oriented speech dialog systems in customer service: https://www.dfki.de/web/forschung/projekte-publikationen/publikation/14810
- Computers in Human Behavior, privacy, security and trust perceptions in conversational AI - systematic review: https://www.sciencedirect.com/science/article/pii/S0747563224002127
- Telematics and Informatics Reports, voice-based personal assistant trust: https://www.sciencedirect.com/science/article/pii/S2772503024000264
- ACL Anthology, user perspective on anonymity in voice assistants: https://aclanthology.org/2024.legal-1.11/
- AI & Society, disclosed vs undisclosed customer service chatbots: https://publications.cuni.cz/handle/20.500.14178/2758?locale-attribute=en
- ACM TOCHI, Partner Modelling Questionnaire for perceptions toward machines as dialogue partners: https://doi.org/10.1145/3729170
- PMC, validation of System Usability Scale for voice user interfaces: https://pmc.ncbi.nlm.nih.gov/articles/PMC10909179/

Charakter:

- Źródła badawcze i metodyczne.
- Wspierają rozdziały o badaniu odbioru, satysfakcji, wysiłku użytkownika, zaufaniu, transparentności i akceptacji voicebotów.
- Są szczególnie ważne przy przejściu od metryk technicznych do oceny "czy rozmowa była dobra dla człowieka".

Najmocniej wspierane części:

- Część 10: testy z użytkownikami i badanie odbioru.
- Część 11: metryki odbioru, wysiłku, zaufania i satysfakcji.
- Część 14: transparentność, etyka i dostępność.
- Część 19: psychologia rozmowy z voicebotem.

---

# 3. Źródła branżowe o barge-in i interruption handling

- RunEdge, barge-in interruption handling on-device voice: https://www.runedge.ai/blog/barge-in-interruption-handling-on-device-voice
- Telli, what is barge-in: https://www.telli.com/ai-voice-agents/article/what-is-barge-in
- Quantum Automations, barge-in handling: https://quantumautomations.ai/blog/voice-agent-barge-in-handling.html
- Roark AI, testing voice agent barge-in: https://roark.ai/blog/test-voice-agent-barge-in-interruption-handling
- Evalgent, barge-in voice agents guide: https://www.evalgent.com/resources/guides/barge-in-voice-agents
- Waboom, AI voice agent interruptions: https://www.waboom.ai/blog/ai-voice-agent-interruptions-barge-in
- Famulor, enterprise guide to barge-in: https://www.famulor.io/es/blog/ai-voice-agent-barge-in-interruptions-enterprise-guide
- Jahanzaib AI glossary, interruption handling: https://www.jahanzaib.ai/glossary/interruption-handling
- Mintlify/rubber duck interruptions feature: https://www.mintlify.com/mblode/rubber-duck/features/interruptions

Charakter:

- Źródła produktowe/branżowe.
- Używane pomocniczo do praktycznego języka, listy problemów, metryk barge-in i testów.
- Nie powinny być traktowane jako główny fundament naukowy.

Najmocniej wspierane części:

- Część 1: barge-in.
- Część 4: przerwania w dialogu.
- Część 10: QA barge-in.
- Część 11: metryki przerwań.

---

# 4. Dokumentacja techniczna realtime voice agents, turn detection i streaming

- LiveKit adaptive interruption handling: https://docs.livekit.io/agents/logic/turns/adaptive-interruption-handling/
- LiveKit, turn detection and interruption handling: https://livekit.com/blog/turn-detection-and-interruption-handling
- LiveKit, VAD, endpointing and model-based turn detection: https://livekit.com/blog/turn-detection-voice-agents-vad-endpointing-model-based-detection
- LiveKit, sequential pipeline architecture voice agents: https://livekit.com/blog/sequential-pipeline-architecture-voice-agents
- OpenAI Realtime conversations guide: https://platform.openai.com/docs/guides/realtime-conversations
- OpenAI Realtime API reference: https://platform.openai.com/docs/api-reference/realtime

Charakter:

- Źródła techniczne/dokumentacyjne.
- Wspierają rozdziały o architekturze, realtime, turn detection, interruption handling, LLM voice agents, latency i observability.

Najmocniej wspierane części:

- Część 1: barge-in i turn-taking.
- Część 3: architektura voicebota.
- Część 8: LLM/RAG/realtime voice.
- Część 10: QA realtime i barge-in.
- Część 11: metryki techniczne.

---

# 5. Platformy enterprise i contact center

- Google Dialogflow CX advanced speech: https://docs.cloud.google.com/dialogflow/cx/docs/concept/advanced-speech
- Google Dialogflow CX ConversationTurn REST reference: https://docs.cloud.google.com/dialogflow/cx/docs/reference/rest/v3/ConversationTurn
- AWS Connect agentic voice best practices: https://docs.aws.amazon.com/connect/latest/adminguide/agentic-voice-best-practices.html
- Amazon Lex V2 interrupt bot: https://docs.aws.amazon.com/lexv2/latest/dg/interrupt-bot.html
- W3C VoiceXML 2.0: https://www.w3.org/TR/voicexml20/
- Microsoft Copilot Studio voice configuration: https://learn.microsoft.com/pl-pl/microsoft-copilot-studio/voice-configuration
- Genesys Cloud barge-in options: https://help.genesys.cloud/articles/about-barge-in-options/
- Nuance barge-in configuration: https://docs.nuance.com/nvp-for-speech-suite/appdev/rc-bargin.html
- Nuance proactive engagement barge-in: https://docs.nuance.com/proactive-engagement/project-editor/gizmo-editor/barge-in.html
- Talkdesk Autopilot Barge-in Intent-Based: https://support.talkdesk.com/hc/en-us/articles/11382650167963-Autopilot-Barge-in-Intent-Based
- Jambonz voice agents: https://docs.jambonz.org/guides/features/voice-agents
- Intellibuddies barge-in configuration: https://docs.intellibuddies.com/docs/conversational_agents/barge-in-configuration/

Charakter:

- Dokumentacja techniczna i produktowa platform.
- Szczególnie ważna dla konfiguracji speech, barge-in, slotów, timeoutow, dialogów i contact center.

Najmocniej wspierane części:

- Część 2: fundamenty i historia IVR/VoiceXML.
- Część 3: architektura.
- Część 4: conversation design.
- Część 9: integracje.
- Część 10: QA.
- Część 12: wdrożenie w organizacji.

---

# 6. Modele, klasyfikatory i zasoby techniczne

- Hugging Face, barge-in classifier: https://huggingface.co/bnovikov/bargein-classifier

Charakter:

- Źródło techniczne/modelowe.
- Używane jako przykład kierunku technicznego: klasyfikacja przerwań i rozróżnianie prawdziwych/fałszywych barge-in.

Najmocniej wspierane części:

- Część 1: barge-in.
- Część 7: dane i jakość rozumienia.
- Część 10: QA przerwań.

---

# 7. Prawo, prywatność i AI governance - źródła oficjalne dodatkowo zweryfikowane

- Regulation (EU) 2016/679, GDPR/RODO, EUR-Lex: https://eur-lex.europa.eu/eli/reg/2016/679/oj
- European Commission, EU data protection legal framework: https://commission.europa.eu/law/law-topic/data-protection/legal-framework-eu-data-protection_en
- EDPB Guidelines 02/2021 on Virtual Voice Assistants: https://www.edpb.europa.eu/documents/guideline/guidelines-022021-on-virtual-voice-assistants_en
- Regulation (EU) 2024/1689, Artificial Intelligence Act, EUR-Lex: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ%3AL_202401689
- European Commission, AI Act policy page: https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
- European Commission, AI Act enters into force: https://commission.europa.eu/news-and-media/news/ai-act-enters-force-2024-08-01_en
- AI Act Explorer, official EU service desk: https://ai-act-service-desk.ec.europa.eu/en/ai-act-explorer
- NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework
- NIST AI Resource Center: https://airc.nist.gov/
- ISO/IEC 42001:2023 AI management system: https://www.iso.org/standard/42001
- W3C Cognitive Accessibility Research Module - Voice Systems and Conversational Interfaces: https://www.w3.org/TR/coga-voice/

Charakter:

- Oficjalne źródła prawne i regulacyjne.
- Wykorzystane przede wszystkim w części o privacy, security, compliance, odpowiedzialnym AI, governance i dostępności poznawczej.

Najmocniej wspierane części:

- Część 13: Bezpieczeństwo, prywatność, prawo i compliance.
- Część 14: Etyka, dostępność i odpowiedzialne projektowanie.
- Część 18: Certyfikacja.

---

# 8. Mapa części podręcznika do źródeł

| Plik | Część | Główne źródła |
|---|---|---|
| czesc_1 | Mapa wiedzy, spis treści, barge-in | Źródła A, B, C, D, E |
| czesc_2 | Fundamenty | VoiceXML, platformy enterprise, LiveKit/OpenAI |
| czesc_3 | Architektura | LiveKit, OpenAI Realtime, Dialogflow, AWS, Lex, VoiceXML |
| czesc_4 | Conversation design | Skantze, VoiceXML, LiveKit, platformy enterprise |
| czesc_5 | Analiza biznesowa/use case | Synteza ekspercka + dokumentacje enterprise |
| czesc_6 | Dialogi i scenariusze | VoiceXML, Dialogflow, Lex, synteza ekspercka |
| czesc_7 | Dane/trening/jakość | Dialogflow/Lex, ASR/NLU praktyki, synteza ekspercka |
| czesc_8 | LLM/RAG | OpenAI Realtime, LiveKit, synteza ekspercka LLM/RAG |
| czesc_9 | Integracje | AWS/Google/OpenAI, synteza enterprise API |
| czesc_10 | QA | VoiceXML, LiveKit, OpenAI, platformy enterprise, źródła barge-in |
| czesc_11 | Metryki/analityka | Dokumentacje zdarzeń + synteza ekspercka contact center |
| czesc_12 | Wdrożenie | Synteza ekspercka enterprise delivery |
| czesc_13 | Prawo/compliance | GDPR, EDPB, AI Act, synteza privacy/security |
| czesc_14 | Etyka/dostępność | EDPB, AI Act, badania interakcji, synteza UX |
| czesc_15 | Rola zawodowa | Synteza ekspercka |
| czesc_16 | Szablony | Synteza ekspercka |
| czesc_17 | Case studies | Synteza ekspercka + wnioski z poprzednich części |
| czesc_18 | Certyfikacja | Synteza ekspercka programu kompetencji |
| czesc_19 | Psychologia | Źródła interakcji, turn-taking, przerwania + synteza psychologiczna UX |

---

# 9. Obszary wymagające szczególnej weryfikacji przed publikacją komercyjną

Przed traktowaniem podręcznika jako finalnego materiału akademickiego lub certyfikacyjnego warto wykonać:

1. Review prawne części XII-XIII przez prawnika/DPO.
2. Review techniczne części architektonicznych przez solution architecta voice/contact center.
3. Review ASR/NLU/LLM przez AI engineer lub ML specialist.
4. Review accessibility przez eksperta dostępności.
5. Review case studies przez ekspertów branżowych.
6. Dodanie przypisów per rozdział, jeśli materiał ma mieć standard akademicki.
7. Ujednolicenie terminologii polskiej i angielskiej.
8. Decyzja, czy zachować ASCII czy przejść na pełne polskie znaki.

---

# 10. Koniec bibliografii

Ten plik zbiera linki przekazane w briefie oraz dodatkowe oficjalne źródła prawne zweryfikowane podczas pracy nad częścią compliance.

