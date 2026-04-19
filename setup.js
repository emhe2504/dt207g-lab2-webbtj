const database = require("better-sqlite3");

const db = new database("works.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS works (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    companyname     TEXT NOT NULL,
    jobtitle        text NOT NULL,
    location        text,
    startdate       date,
    enddate         date,
    description     text)`);

    console.log("Database and table created!")