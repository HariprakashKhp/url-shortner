const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/urlShortner")
//middleware:
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.listen(process.env.PORT || 5000);