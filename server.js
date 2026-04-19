
//Importera paket
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;

//Läsa in routes
const workRoutes = require("./routes/workRoutes");

//Express-instans
const app = express();

//Middlewares
app.use(cors());    //Tillåt cross-origin
app.use(express.json());    //Parsa JSON-body

//Routes
app.get("/", (req, res) => {
  res.redirect("/works"); //works - startsida
});

app.use("/works", workRoutes);

//Starta servern
app.listen(port, () => {
  console.log("Server running on port " + port);
});