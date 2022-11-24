
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/personDB");

const personScheme = new mongoose.Schema({
    name : String,
    age : Integer
});

const Person = mongoose.model("Person", personScheme);

const person = new Person({
    name : "Sahil",
    age : 21
});

person.save();


