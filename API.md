# API dokumentace projektu Lítačka

Tato dokumentace popisuje API endpointy dostupné v tomto projektu.

## Základní endpoint

### GET /api

Vrátí jednoduchou uvítací zprávu.

**Odpověď:**
- Status kód: 200
- Obsah: "Hello World!"

## Ověření API klíče

### GET /api/authentication

Zobrazí stránku pro ověření API klíče.

**Odpověď:**
- Status kód: 200
- Obsah: HTML (ejs) stránka s formulářem pro zadání API klíče

### POST /api/authentication

Ověří zadaný API klíč.

**Požadavek:**
- Tělo: JSON objekt s klíčem `apiKey`

**Odpověď:**
- V případě úspěchu: Data získaná z `/api/litacka` endpointu
- V případě chyby: Status kód 500 a zpráva "An error occurred"

## Ověření karty Lítačka

### GET /api/litacka

Endpoint pro ověření karty Lítačka.

**Požadavek:**
- Hlavička: `x-api-key` s platným API klíčem

**Odpověď:**
- V případě úspěchu:
  - Status kód: 200
  - Obsah: Textová informace o kartě ve formátu:
    ```
    Card Number: [číslo karty]
    Validity: [platnost]
    Status: [stav]
    ```
- V případě neplatného API klíče:
  - Obsah: "Unauthorized: Invalid API key"
- V případě chyby:
  - Status kód: 500
  - Obsah: "An error occurred while verifying the card"
