# 19/12
Standup 
Dagens plan: Dela ut arbetsuppgifter
- Valentin och Ludde tar sig an frågelådan
- Tea, Olivia och Moa tar sig an timern i progressbar och lägger in logga i headern.


#### 18/12
Heldagsmöte
- Vi träffas och fortsätter med sprintplanering, lägger upp första sprinten. 

- Vi stöter på problem med github commits och branches, och lyckas lösa det tillsammans!!

- Vi överger fibonaci-skalan och gör en egen skala. Estelle-skalan:
1p = halv dag
2p = 1 heldag
4p = 2 heldagar

- Vi börjar med och slutför HTML-strukturen  vi vill ha i projektet, skapar en ny branch för html-base-skeleton och commitar grunden där. Vi diskuterar hur vi tänker/ tidigare erfarenheter och kommer överens om bästa tillvägagångssätt tex för containers i html som ska användas i typescript. 

- Vi gör scss-setup med olika filer för variables, mobile, desktop, normalize etc och länkar in media queries för rätt skärmstorlek. 

- vi färdigställer vårt gruppkontrakt och skriver under 

- Vi gör quiz array i egen modul och importerar den i main.ts 

- Vi välkomar Lenita in i gruppen!! och går igenom vårt projekt tillsammans. 

Imorgon:
- Kl 14:00 info om Jaqueline
- Vi sitter till 15.45 
- 

### 17/12
- Vi fortsätter med planering av quizet.
- Vi skapar vår backlogg, lägger upp tasks med subtasks i Jira och lägger ut storypoint
-Vi bokar handledning med Jenny för att fråga om slumpade frågor. Hon förklarar att det är bäst att ha en array med quiz-frågor och att dessa har en boolean som true/false om den har visats under spelets omgång.
- Vi bestämmer att vi ska ha en funktion för att starta spelet som anropar andra funktioner i spelet, för att ha tydligare organisering i koden. 
- Vi kollar fonter
-Vi kollar om det är möjligt att bestämma tid för demo 30:e december eftersom Tea jobbar

Att göra imorrn: 
- Lägga upp en första sprintplanering
- Färdigställ kontrakt
- Html struktur
- Array för quizfrågor

## 16/12
Andra mötet
-Vi installerar dev dependencies, eslint, prettier etc.
-Vi bestämmer ledighet över jul, vi är lediga 23-26december. Vi träffas 27 december
30 december som vanligt (tea är borta)
31 december morgonmöte 
2-3januari som vanligt igen

- Vi gör wireframe/mindmap via Miro, flödesschema, kom-ihåg-anteckningar, grafisk profil och wireframe för mobil och desktop
- Vi tar fram 20 quizfrågor- tema film
- Vi skapar array för quizet, i js än sålänge
- Vi tittar på typescript till vårt möte tisdag 17/12

# 13/12

Första mötet tillsammans!

- Vi gör gruppkontrakt
- Vi skapar projekt i Jira.
  Länk till Jira: https://grupp-estelle.atlassian.net/jira/software/projects/GEQ/boards/1

-Vi pratar om saker som behövs göras
Att göra:

- Wireframe & pseudokod: 16/12 fm (förered: tema)
- Typescriptmoduler: tittat på tills 19/12
- Dokumentera arbetsgång: kontinuerligt
- Göra quizet--> array med objekt för frågorna, stylea i css, html-struktur, funktioner för start av quiz, responsiv design
- Tillgänglighetsanalys, validering
- Readme
- Presentationer
- Enskild reflektion och inlämning
-

Till måndag 16/12:

- Tänkt ut olika teman till quiz
- Kolla vilka dagar vi vill vara jullediga

## Hjälp med commit

Types:
API relevant changes
feat Commits, that adds or remove a new feature
fix Commits, that fixes a bug
refactor Commits, that rewrite/restructure your code, however does not change any API behaviour
perf Commits are special refactor commits, that improve performance
style Commits, that do not affect the meaning (white-space, formatting, missing semi-colons, etc)
test Commits, that add missing tests or correcting existing tests
docs Commits, that affect documentation only
build Commits, that affect build components like build tool, ci pipeline, dependencies, project version, ...
ops Commits, that affect operational components like infrastructure, deployment, backup, recovery, ...
chore Miscellaneous commits e.g. modifying .gitignore

- Exempel på commit: "feat(shopping cart): add the amazing button"

## skapa branches

Använd passande prefix och beskriv branchens funktion

exempel--> "feature/add-user-authentication"

feature/: För nya funktioner eller förbättringar.
bugfix/: För att fixa buggar.
hotfix/: För akuta ändringar i produktion.
experiment/: För att testa idéer eller nya tekniker.
chore/: För underhåll eller ändringar som inte påverkar funktionaliteten, som uppdateringar av dependencies eller dokumentation.
release/: För att förbereda en release.
