//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require("mongoose");
// const encrypt = require('mongoose-encryption');
// const md5 = require('md5');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const port = 3000;
 
const app = express();
 
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
 
mongoose.connect("mongodb://127.0.0.1:27017/userDB", {useNewUrlParser : true});

const userSchema = new mongoose.Schema({
    email : String,
    passward : String
});

console.log(process.env.SECRET);
const secret = process.env.SECRET;

// userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['passward'] });

const User = new mongoose.model("User", userSchema);

app.get("/", function(req, res)
{
    res.render("home");
}); 

app.get("/login", function(req, res)
{
    res.render("login");
}); 

app.get("/register", function(req, res)
{
    res.render("register");
}); 

app.post("/register", function(req, res)
{
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser = new User({
            email : req.body.username,
            passward : hash
        });
        newUser.save(function(err)
        {
            if(!err)
            {
                res.render("secrets");
            }
        });
    });



}); 


app.post("/login", function(req, res)
{
    const username = req.body.username;
    const passward = md5(req.body.password);

    User.findOne({email : username}, function(err, found)
    {
        if(!err)
        {
            if(found)
            {
                bcrypt.compare(passward, found.passward, function(err, result) {
                    // result == true
                    if(result === true)
                    {
                        res.render("secrets");
                    }
                });
            }
        }
    });


}); 


 
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


