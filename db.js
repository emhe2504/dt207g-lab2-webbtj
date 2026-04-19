
//Importera paket
const database = require("better-sqlite3");

//Koppla mot databas
const db = new database("works.db");

//Exportera
module.exports = db;