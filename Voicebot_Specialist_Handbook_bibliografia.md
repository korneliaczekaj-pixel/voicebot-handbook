# Voicebot Specialist Handbook

## Bibliografia, zrodla i mapa wykorzystania

Wersja robocza: 2026-07-29

---

# 1. Zasada uczciwosci zrodlowej

Podrecznik laczy trzy warstwy:

1. Wiedza bezposrednio wsparta zrodlami naukowymi, dokumentacyjnymi i technicznymi.
2. Synteza ekspercka, czyli laczenie wielu zrodel w praktyczne modele, checklisty i procesy.
3. Uzupelnienia praktyczne wynikajace z doswiadczenia wdrozeniowego, szczegolnie w obszarach briefow, ROI, dokumentacji, QA, metryk, operating model i szablonow.

Checklisty, matryce i szablony sa w duzej czesci autorska synteza ekspercka. Nie nalezy ich traktowac jako cytatu z jednego zrodla, lecz jako praktyczne narzedzia zbudowane na podstawie literatury, dokumentacji platform i standardow wdrozen enterprise.

---

# 2. Zrodla naukowe i badawcze

## Rozmowa, turn-taking, przerwania, interakcja

- ScienceDirect, Computer Speech & Language, artykul o turn-taking w systemach konwersacyjnych: https://www.sciencedirect.com/science/article/pii/S088523082030111X
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

Najmocniej wspierane czesci:

- Czesc 1: mapa wiedzy i barge-in.
- Czesc 4: conversation design i turn-taking.
- Czesc 10: QA barge-in/turn-taking.
- Czesc 14: etyka i dostepnosc.
- Czesc 19: psychologia rozmowy.

---

# 3. Zrodla branzowe o barge-in i interruption handling

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

- Zrodla produktowe/branzowe.
- Uzywane pomocniczo do praktycznego jezyka, listy problemow, metryk barge-in i testow.
- Nie powinny byc traktowane jako glowny fundament naukowy.

Najmocniej wspierane czesci:

- Czesc 1: barge-in.
- Czesc 4: przerwania w dialogu.
- Czesc 10: QA barge-in.
- Czesc 11: metryki przerwan.

---

# 4. Dokumentacja techniczna realtime voice agents, turn detection i streaming

- LiveKit adaptive interruption handling: https://docs.livekit.io/agents/logic/turns/adaptive-interruption-handling/
- LiveKit, turn detection and interruption handling: https://livekit.com/blog/turn-detection-and-interruption-handling
- LiveKit, VAD, endpointing and model-based turn detection: https://livekit.com/blog/turn-detection-voice-agents-vad-endpointing-model-based-detection
- LiveKit, sequential pipeline architecture voice agents: https://livekit.com/blog/sequential-pipeline-architecture-voice-agents
- OpenAI Realtime conversations guide: https://platform.openai.com/docs/guides/realtime-conversations
- OpenAI Realtime API reference: https://platform.openai.com/docs/api-reference/realtime

Charakter:

- Zrodla techniczne/dokumentacyjne.
- Wspieraja rozdzialy o architekturze, realtime, turn detection, interruption handling, LLM voice agents, latency i observability.

Najmocniej wspierane czesci:

- Czesc 1: barge-in i turn-taking.
- Czesc 3: architektura voicebota.
- Czesc 8: LLM/RAG/realtime voice.
- Czesc 10: QA realtime i barge-in.
- Czesc 11: metryki techniczne.

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
- Szczegolnie wazna dla konfiguracji speech, barge-in, slotow, timeoutow, dialogow i contact center.

Najmocniej wspierane czesci:

- Czesc 2: fundamenty i historia IVR/VoiceXML.
- Czesc 3: architektura.
- Czesc 4: conversation design.
- Czesc 9: integracje.
- Czesc 10: QA.
- Czesc 12: wdrozenie w organizacji.

---

# 6. Modele, klasyfikatory i zasoby techniczne

- Hugging Face, barge-in classifier: https://huggingface.co/bnovikov/bargein-classifier

Charakter:

- Zrodlo techniczne/modelowe.
- Uzywane jako przyklad kierunku technicznego: klasyfikacja przerwan i rozroznianie prawdziwych/falszywych barge-in.

Najmocniej wspierane czesci:

- Czesc 1: barge-in.
- Czesc 7: dane i jakosc rozumienia.
- Czesc 10: QA przerwan.

---

# 7. Prawo, prywatnosc i AI governance - zrodla oficjalne dodatkowo zweryfikowane

- Regulation (EU) 2016/679, GDPR/RODO, EUR-Lex: https://eur-lex.europa.eu/eli/reg/2016/679/oj
- European Commission, EU data protection legal framework: https://commission.europa.eu/law/law-topic/data-protection/legal-framework-eu-data-protection_en
- EDPB Guidelines 02/2021 on Virtual Voice Assistants: https://www.edpb.europa.eu/documents/guideline/guidelines-022021-on-virtual-voice-assistants_en
- Regulation (EU) 2024/1689, Artificial Intelligence Act, EUR-Lex: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ%3AL_202401689
- European Commission, AI Act policy page: https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
- European Commission, AI Act enters into force: https://commission.europa.eu/news-and-media/news/ai-act-enters-force-2024-08-01_en
- AI Act Explorer, official EU service desk: https://ai-act-service-desk.ec.europa.eu/en/ai-act-explorer

Charakter:

- Oficjalne zrodla prawne i regulacyjne.
- Wykorzystane przede wszystkim w czesci o privacy, security, compliance i odpowiedzialnym AI.

Najmocniej wspierane czesci:

- Czesc 13: Bezpieczenstwo, prywatnosc, prawo i compliance.
- Czesc 14: Etyka, dostepnosc i odpowiedzialne projektowanie.
- Czesc 18: Certyfikacja.

---

# 8. Mapa czesci podrecznika do zrodel

| Plik | Czesc | Glowne zrodla |
|---|---|---|
| czesc_1 | Mapa wiedzy, spis tresci, barge-in | Zrodla A, B, C, D, E |
| czesc_2 | Fundamenty | VoiceXML, platformy enterprise, LiveKit/OpenAI |
| czesc_3 | Architektura | LiveKit, OpenAI Realtime, Dialogflow, AWS, Lex, VoiceXML |
| czesc_4 | Conversation design | Skantze, VoiceXML, LiveKit, platformy enterprise |
| czesc_5 | Analiza biznesowa/use case | Synteza ekspercka + dokumentacje enterprise |
| czesc_6 | Dialogi i scenariusze | VoiceXML, Dialogflow, Lex, synteza ekspercka |
| czesc_7 | Dane/trening/jakosc | Dialogflow/Lex, ASR/NLU praktyki, synteza ekspercka |
| czesc_8 | LLM/RAG | OpenAI Realtime, LiveKit, synteza ekspercka LLM/RAG |
| czesc_9 | Integracje | AWS/Google/OpenAI, synteza enterprise API |
| czesc_10 | QA | VoiceXML, LiveKit, OpenAI, platformy enterprise, zrodla barge-in |
| czesc_11 | Metryki/analityka | Dokumentacje zdarzen + synteza ekspercka contact center |
| czesc_12 | Wdrozenie | Synteza ekspercka enterprise delivery |
| czesc_13 | Prawo/compliance | GDPR, EDPB, AI Act, synteza privacy/security |
| czesc_14 | Etyka/dostepnosc | EDPB, AI Act, badania interakcji, synteza UX |
| czesc_15 | Rola zawodowa | Synteza ekspercka |
| czesc_16 | Szablony | Synteza ekspercka |
| czesc_17 | Case studies | Synteza ekspercka + wnioski z poprzednich czesci |
| czesc_18 | Certyfikacja | Synteza ekspercka programu kompetencji |
| czesc_19 | Psychologia | Zrodla interakcji, turn-taking, przerwania + synteza psychologiczna UX |

---

# 9. Obszary wymagajace szczegolnej weryfikacji przed publikacja komercyjna

Przed traktowaniem podrecznika jako finalnego materialu akademickiego lub certyfikacyjnego warto wykonac:

1. Review prawne czesci XII-XIII przez prawnika/DPO.
2. Review techniczne czesci architektonicznych przez solution architecta voice/contact center.
3. Review ASR/NLU/LLM przez AI engineer lub ML specialist.
4. Review accessibility przez eksperta dostepnosci.
5. Review case studies przez ekspertow branzowych.
6. Dodanie przypisow per rozdzial, jesli material ma miec standard akademicki.
7. Ujednolicenie terminologii polskiej i angielskiej.
8. Decyzje, czy zachowac ASCII czy przejsc na pelne polskie znaki.

---

# 10. Koniec bibliografii

Ten plik zbiera linki przekazane w briefie oraz dodatkowe oficjalne zrodla prawne zweryfikowane podczas pracy nad czescia compliance.

