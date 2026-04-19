
Detta repo innehåller kod för den webbtjänst jag skapat för lab2 i kursen dt207g. API:et presenterar mina tidigare arbetserfarenheter.


Länken till api:

https://dt207g-lab2-webbtj.onrender.com

Ovanstående länk ger redirect till:

https://dt207g-lab2-webbtj.onrender.com/works

API:et använder databasen better-sqlite3. 
Tabellerna i databasen skapas enligt följande:

    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    companyname     TEXT,
    jobtitle        text,
    location        text,
    startdate       date,
    enddate         date,
    description     text


    Här är länkar som kan användas för att nå API:

    GET /works (alla arbeten i API)
    GET /works/id (specifikt arbete utifrån id)
    POST /works (lägger till arbete i API. Arbets-object måste skickas med i body)
    PUT /works/id (uppdaterar redan existerande arbete utifrån id. Arbets-object måste skickas med i body)
    DELETE /works/id (raderar redan existerade arbete utifrån id.)

    Ett arbets-ocject har följande sturktur:

    {
    "id": 43,
    "companyname": "MittUniversitetet",
    "jobtitle": "Studerande",
    "location": "Sundsvall",
    "startdate": "2025-09-01",
    "enddate": "2026-04-19",
    "description": "Studerar för tillfället Webbutveckling på MittUniversitetet i Sundsvall."
  }
