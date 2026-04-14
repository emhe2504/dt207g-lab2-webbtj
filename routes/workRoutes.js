
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
        res.status(500).json({ message: "Could not get works" });
    }
})

router.get("/:id", (req, res) => {

    try {

        //Hämta specifikt arbete (efter id)
        const work = db.prepare("SELECT * FROM works WHERE id = ?").get(req.params.id);
        if(!work) return res.status(404).json({ error: "Not found"});
    } catch (error) {
        //Error
        res.status(500).json({ message: "Could not get work" });
    }

})







module.exports = router;