
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
        if(!work) return res.status(404).json({ error: "Not found"});       //400 = felaktigt input

        res.json(work);
    } catch (error) {
        //Error
        res.status(500).json({ Message: "Could not get work" });
    }

})

router.post("/", (req, res) => {
    
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;

    //För säkerhet, input kontroll (utöver den i frontend)

    if (!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
       return res.status(400).json( {Message: `Alla fält måste vara ifyllda!` });
    }

    const insert = db.prepare(`
        INSERT INTO works (companyname, jobtitle, location, startdate, enddate, description) VALUES (?, ?, ?, ?, ?, ?)`);   //Förhindra sql-injection

        //...req.body (spread operator) - typ.. ta alla värden i req.body, sprid ut här
        try {
            const result = insert.run(companyname, jobtitle, location, startdate, enddate, description);
            res.status(201).json({ id: result.lastInsertRowid, ...req.body});      //201 = created
        }catch (error) {
            res.status(500).json({ message: "Could not insert work"});              //500 = server error
        }
})


//Radera efter id
router.delete("/:id", (req, res) => {
    const result = db.prepare("DELETE FROM works WHERE id = ?").run(req.params.id);
    res.json({ message: "Deleted" });

    //GÖR ÅTERKOPPLING PÅ RADERA
})



module.exports = router;