# Job Listing Platform

## Over het project

Dit project is een job listing platform gericht op **Project Managers** die als **ZZP’er/freelancer** op zoek zijn naar opdrachten bij verschillende opdrachtgevers.

Het platform bevat functionaliteiten voor zowel:

### ZZP’ers
- Opdrachten zoeken
- Opdracht details bekijken

### Opdrachtgevers
- Nieuwe opdrachten plaatsen
- Geplaatste opdrachten bekijken

---

# Belangrijke informatie

Deze repository bevat **alleen de functionaliteiten en onderdelen waar ik zelf aan heb gewerkt tijdens mijn stage**.

Het volledige project is groter dan wat in deze repository aanwezig is. Andere onderdelen van het platform zijn ontwikkeld door andere teamleden.

De functionaliteiten in deze repository representeren dus specifiek mijn eigen bijdrage aan het project.

---

# Status van het project

Dit project is gestart op **22 april 2026** en bevindt zich momenteel nog volledig in de **ontwikkelfase**.

We hebben op dit moment net de **eerste sprint** afgerond. Het project wordt iteratief ontwikkeld volgens een sprintplanning en zal in toekomstige sprints verder uitgebreid worden.

---

# Sprint 1

In de eerste sprint heb ik gewerkt aan:

- Zoekfunctionaliteit
- Opdrachten plaatsen
- Overzicht van opdrachten
- Mock data structuur opzetten
- Basis UI bouwen
- Form validatie
- Dynamische opdracht detailpagina's

---

# Veiligheid & Mock Data

In de originele stageomgeving werd gebruik gemaakt van:

- API keys
- Tokens
- Client ID’s
- Auth0 configuraties

Deze gevoelige gegevens zijn bewust verwijderd uit dit project vanwege veiligheidsredenen.

Om de applicatie toch volledig werkend te houden heb ik een mock API opgezet met `json-server`.

Hierdoor kunnen alle functionaliteiten getest worden zonder beveiligingsrisico’s.

Daarnaast is er een `.env.example` bestand toegevoegd met demo Auth0 configuratie waardes. Deze demo waardes maken het mogelijk om in te loggen en de authenticatie functionaliteiten te testen zonder gebruik te maken van de originele stageomgeving of bedrijfsgegevens.

---

# Waarom skills en tools apart zijn opgeslagen

De `skills` en `tools` zijn apart opgeslagen omdat deze in de originele API ook als IDs werden gebruikt.

Voorbeeld:

```json
"skillIds": ["react", "typescript"]
```

Dit bootst een echte backend/API structuur na.

---

# Gebruikte Tech Stack

## Frontend
- Nuxt 4.4.6
- Vue 3.5.34
- Vue Router 5.0.7
- TailwindCSS 4.3.0

## Form validatie
- Vee Validate 4.15.1

## Testing
- Cypress

## Build tooling
- @tailwindcss/vite 4.3.0

## Mock API
- json-server

---

# Functionaliteiten

## ZZP’er
- Opdrachten bekijken
- Opdrachten zoeken/filteren
- Opdracht detailpagina bekijken

## Opdrachtgever
- Nieuwe opdrachten plaatsen
- Overzicht van geplaatste opdrachten bekijken

---

# Authenticatie / Inloggen

Wanneer de applicatie wordt gestart, wordt de gebruiker eerst doorgestuurd naar de Auth0 login pagina.

Voor het testen van de applicatie kan eenvoudig een testaccount worden aangemaakt en gebruikt om in te loggen.

Na het inloggen wordt de gebruiker automatisch doorgestuurd naar de zoekfunctie pagina van het platform.

---

# Zoekfunctionaliteit

De zoekfunctie ondersteunt:

- Zoeken op titel
- Zoeken op beschrijving
- Filteren op remote/on-site

---

# Opdracht detailpagina

Wanneer een gebruiker op een opdracht klikt, wordt deze doorgestuurd naar een aparte detailpagina met:

- Uitgebreide beschrijving
- Salarisindicatie
- Skills
- Tools
- Bedrijfsinformatie
- Remote/on-site status
- Start- en einddatum

---

# Testen

Voor het testen van de applicatie zijn Cypress testen geschreven.

Er zijn onder andere testen gemaakt voor:

- Zoekfunctionaliteit
- Opdrachten plaatsen

## Testbestanden

```txt
opdrachtplaatsen.cy.js
zoekfunctie.cy.js
```

---

# Cypress testen uitvoeren

Start eerst de development server:

```bash
npm run dev
```

Start daarna Cypress:

```bash
npx cypress open
```

## Cypress openen

1. Kies **E2E Testing**
2. Kies een browser naar keuze
3. Klik op **Start E2E Testing**

## Beschikbare testen

- `zoekfunctie.cy.js`
- `opdrachtplaatsen.cy.js`

Klik op een testbestand om de testen automatisch uit te voeren.

---

# Installatie

## 1. Dependencies installeren

```bash
npm install
```

## 2. Environment variables instellen

Maak eerst een `.env` bestand aan op basis van `.env.example`.

Bijvoorbeeld:

```bash
cp .env.example .env
```

Of kopieer handmatig `.env.example` naar `.env`.

Hierdoor worden de demo Auth0 configuraties correct geladen.

---

## 3. Mock server starten

```bash
npm run mock
```

Dit start de mock API met het bestand:

```txt
job.json
```

In dit bestand zitten:
- Jobs
- Skills
- Tools

---

## 4. Development server starten

```bash
npm run dev
```

---

## 5. Applicatie openen

```txt
http://localhost:3000
```

---
