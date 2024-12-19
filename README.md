# Express.js aplikace v Node.js

Tento projekt je Express.js aplikace napsaná v TypeScriptu. Slouží k autorizaci a k ověřování a zpracování informací o kartách Lítačka.

## Požadavky

Node.js (doporučená verze 14 nebo novější)
npm (Node Package Manager)

## Závislosti projektu

express
axios
dotenv
typescript (devDependency)
@types/express (devDependency)
@types/node (devDependency)

## Instalace

1. Naklonujte tento repozitář:
```
git clone https://github.com/jirkha/oict_test.git
cd oict_test
```

2. Nainstalujte závislosti:
`npm install`

## Spuštění aplikace

Pro spuštění vývojového serveru s automatickým restartem použijte příkaz
`npm run dev`

Aplikace by měla být nyní dostupná na http://localhost:3000.

### Základní endpoint
GET /api: Vrátí "Hello World!"

### Ověření API klíče
GET /api/authentication: Zobrazí stránku pro ověření API klíče
POST /api/authentication: Ověří zadaný API klíč

### Ověření karty Lítačka
GET /api/litacka: Endpoint pro ověření karty Lítačka (vyžaduje platný API klíč v hlavičce x-api-key)


**Poznámka:** VALID_API_KEY je pro zjednodušení součástí kódu a je dostuoný v souboru .env. V reálné aplikaci by soubor .env byl součástí .gitignor a byl k dispozici v proměnné prostředí.
