const express = require("express");
const mongoose = require("mongoose");
const app = express();
const shortUrl = require("./models/shortUrl");

mongoose.connect("mongodb://127.0.0.1:27017/urlShortner");

//middleware:
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
    const data = await shortUrl.find();
    res.render("index.ejs", {data});
})

app.post("/short", (req, res) => {
    console.log("imhit")
    shortUrl.create({full:req.body.url});
    res.redirect("/");
})

app.get("/redirect/:id", async (req, res) => {
    let data = await shortUrl.findOne({short: req.params.id});
    if(data === null) res.sendStatus(404);
    data.clicks++;
    data.save();

    res.redirect(data.full);
})

app.listen(process.env.PORT || 5000);