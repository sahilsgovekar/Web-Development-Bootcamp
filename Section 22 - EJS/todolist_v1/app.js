
const express = require("express");
const bodyParser = require('body-parser');
const date = require(__dirname+"/date.js");
 

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var items = [];

app.get("/", function(req, res)
{
    let day = date();
    res.render("list", {kindOfDay : day, task:items});
});

// app.get("/new", function(req, res)
// {
//     res.render("new");
// });

app.post("/", function(req, res)
{
    var item = req.body.task;
    items.push(item);
    res.redirect("/");
});



app.listen(3000, function()
{
    console.log("running on 3000")
});
