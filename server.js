
//Importera paket
const express = require("express");
const cors = require("cors");

//Läsa in routes
const workRoutes = require("./routes/workRoutes");

//Express-instans
const app = express();

//Middlewares
app.use(cors());    //Tillåt cross-origin
app.use(express.json());    //Parsa JSON-body

//Routes
app.use("/works", workRoutes);

//Starta servern
app.listen(5000, () => console.log("Server started at port 5000"));