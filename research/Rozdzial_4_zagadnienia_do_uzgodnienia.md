# Rozdział 4: zagadnienia do uzgodnienia

Notatka robocza przed przepisaniem rozdziału 4 (Conversation Design) według wzoru z rozdziału 19. Każdy punkt wymaga decyzji autorki.

Stan: 2026-10-07. Rozstrzygnięty jest punkt 4; pozostałe czekają na decyzję.

## Decyzje

1. **Podział ról z rozdziałem 19.** Sekcje 4.4, 4.6 i 4.8 powtarzają 19.8, 19.6 i 19.5. Propozycja: rozdział 4 mówi, jak projektować, a po uzasadnienie odsyła do rozdziału 19.

2. **Mini case studies.** Jest ich dziewięć i każde kończy się wynikiem ("no-match spada", "spadły skargi na nachalność", "repeat contact nie wzrósł"). Które pochodzą z rzeczywistych wdrożeń? Te zostaną oznaczone "Z praktyki". Pozostałym trzeba usunąć zdania o wynikach i opisać je jako scenariusze.

3. **Perspektywy biznesowa i technologiczna.** Listy efektów bez danych ("dobre komunikaty zmniejszają AHT, no-input, eskalacje") proponuję usunąć. Treść techniczną (pola dokumentacji promptu, ustawienia timingowe) proponuję zostawić w skróconej formie.

4. **Forma w przykładach. Rozstrzygnięte 2026-10-07:** w całym podręczniku przykłady voicebota stosują formę bezosobową ("proszę podać"), a bot mówi o sobie w pierwszej osobie i w czasie teraźniejszym. Uzasadnienie jest w sekcji 19.9.5. Rozdział 4 mówi dziś "pan" i używa form z rodzajem ("wysłałem", "znalazłem"), więc przykłady trzeba przepisać.

5. **Liczby bez źródła.** "Maksymalnie 2-3 opcje" (4.1) i "powitanie krótsze niż 10-15 sekund" (4.5.8): czy to praktyka autorki? Badanie menu głosowych przytoczone w 19.4 nie wyznacza granicy 2-3 opcji. Dodatkowo checklista 4.1.8 mówi "mniej niż 2-3 opcje", co jest niespójne z resztą.

6. **Transparentność.** Stanowisko zostaje. Uzasadnienie "brak informacji, że to bot = utrata zaufania" (4.4.7, 4.5.7) trzeba zastąpić etycznym i prawnym, bo w eksperymencie przytoczonym w 19.7 ujawnienie bota obniżało sprzedaż.

7. **"Rozumiem".** Sekcja 4.2.6 zakazuje mówić "rozumiem", jeśli system nie rozumie. Przykłady w 4.3.9 ("Rozumiem, proszę mówić dalej") i 4.7.9 ("Rozumiem, nie będę kontynuować oferty") go używają. Która wersja obowiązuje?

8. **Zaplecze teoretyczne.** Propozycja do sprawdzenia w tekstach źródłowych (podane z pamięci, niezweryfikowane):
   - Grice, zasada kooperacji;
   - Clark i Brennan, uzgadnianie wspólnej wiedzy (grounding), jako podstawa potwierdzeń;
   - Sacks, Schegloff i Jefferson, organizacja zmian mówcy;
   - polska grzeczność językowa (Marcjanik), jako podstawa form zwracania się.

9. **Porównanie z czatem.** Propozycja: dodać akapity "W czacie" w 4.1, 4.2, 4.5 i 4.6. Pominąć w 4.3, 4.7 i 4.9, bo dotyczą samego głosu albo dokumentacji.

## Twierdzenia wymagające źródła albo oznaczenia "Z praktyki"

- "Zbyt formalny język zwiększa obciążenie poznawcze" (4.1.7, 4.4.7).
- "Wynika ze źródeł naukowych: naturalne turn-taking opiera się na przewidywaniu końca tury" (4.3.2). Da się podeprzeć pracą Levinsona i Torreiry sprawdzoną w rozdziale 19.
- "Barge-in poprawia poczucie kontroli, AHT, korektę błędów i completion rate" (4.7.2).
- Wykrywanie emocji po głośności i tempie mowy (4.8).
- "Czy mogę jeszcze w czymś pomóc?" jako błąd zakończenia (4.2.7, 4.5.9).

## Do poprawienia bez decyzji

- Brak polskich znaków w blokach kodu ("Formalnosc", "co sie stalo") i pojedyncze literówki ("zalezne", "Ostrozne", "rozmowca", "analityke").
- Tytuł 4.10 "Zbiorcza checklista po Części III" (pozostałość po dawnej numeracji).
- Zdania-wypełniacze powtarzane w każdej sekcji.
