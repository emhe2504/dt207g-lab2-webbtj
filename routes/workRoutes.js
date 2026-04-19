
//Importera paket/fil
const express = require("express");
const db = require("../db");

//Router variabel
const router = express.Router();

//Routes
router.get("/", (req, res) => {
    try {

        //Hämta alla works
        const works = db.prepare("SELECT * FROM works").all();
        res.json(works);
    } catch (error) {
        //Error
        res.status(500).json({ Message: "Could not get works" });
    }
})

router.get("/:id", (req, res) => {

    try {

        //Hämta specifikt arbete (efter id)
        const work = db.prepare("SELECT * FROM works WHERE id = ?").get(req.params.id);
        if (!work) return res.status(404).json({ error: "Not found" });       //400 = felaktigt input

        res.json(work);
    } catch (error) {
        //Error
        res.status(500).json({ Message: "Could not get work" });
    }

})

router.post("/", (req, res) => {

    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;
    const errors = [];

    //För säkerhet, input kontroll (utöver den i frontend)

    if (!companyname) { errors.push(`Fyll i Företagsnamn`); }
    if (!jobtitle) { errors.push(`Fyll i Arbetstitel`); }
    if (!location) { errors.push(`Fyll i Arbetets plats`); }
    if (!startdate) { errors.push(`Fyll i Startdatum`); }
    if (!enddate) { errors.push(`Fyll i Slutdatum`); }
    if (!description) { errors.push(`Fyll i Beskrivning`); }

    if (errors.length > 0) {
        return res.status(400).json({ Message: errors });
    }

    const insert = db.prepare(`
        INSERT INTO works (companyname, jobtitle, location, startdate, enddate, description) VALUES (?, ?, ?, ?, ?, ?)`);   //Förhindra sql-injection

    //...req.body (spread operator) - typ.. ta alla värden i req.body, sprid ut här
    try {
        const result = insert.run(companyname, jobtitle, location, startdate, enddate, description);
        res.status(201).json({ id: result.lastInsertRowid, ...req.body });      //201 = created
    } catch (error) {
        res.status(500).json({ message: "Could not insert work" });              //500 = server error
    }
})

router.put("/:id", (req, res) => {

    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;
    const errors = [];

    //Input kontroller även i put

    if (!companyname) { errors.push(`Fyll i Företagsnamn`); }
    if (!jobtitle) { errors.push(`Fyll i Arbetstitel`); }
    if (!location) { errors.push(`Fyll i Arbetets plats`); }
    if (!startdate) { errors.push(`Fyll i Startdatum`); }
    if (!enddate) { errors.push(`Fyll i Slutdatum`); }
    if (!description) { errors.push(`Fyll i Beskrivning`); }

    if (errors.length > 0) {
        return res.status(400).json({ Message: errors });
    }

    const update = db.prepare(`
        UPDATE works set companyname = ?, jobtitle = ?, location = ?, startdate = ?, enddate = ?, description = ? where id = ?`);   //Update query

    update.run(companyname, jobtitle, location, startdate, enddate, description, req.params.id); //req.params.id = parameter i sökväg, t ex. "10"
    res.status(200).json({ message: "Updated work successfully!" });
})


//Radera efter id
router.delete("/:id", (req, res) => {
    try {
        //Result returnerar object med changes, om angivet id inte finns, changes === 0
        const result = db.prepare("DELETE FROM works WHERE id = ?").run(req.params.id);
        
        if (result.changes === 0) {
            return res.status(404).json({ error: "Could not find id" });    //id finns inte
        } else {
            res.json({ message: "Deleted work with id: " + req.params.id });    //om id finns
        }
    } catch (error) {
        res.status(500).json({ message: "Could not delete work" });
    }
})



module.exports = router;