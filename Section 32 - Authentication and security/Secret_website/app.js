//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require("mongoose");
// const encrypt = require('mongoose-encryption');
// const md5 = require('md5');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');


const port = 3000;
 
const app = express();
 
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://127.0.0.1:27017/userDB", {useNewUrlParser : true});
// mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
    email : String,
    passward : String,
    googleId : String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// console.log(process.env.SECRET);
// const secret = process.env.SECRET;

// userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['passward'] });

const User = new mongoose.model("User", userSchema);

// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// passport.serializeUser(function(user, cb) {
//     process.nextTick(function() { 
//       return cb(null, user.id); 
//     }); 
//   }); 
// passport.deserializeUser(function(id, cb) { 
//     db.get('SELECT * FROM users WHERE id = ?', [ id ], function(err, user) { 
//       if (err) { 
//         return cb(err); } 
//       return cb(null, user); 
//     }); 
//   });


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
  });

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

app.get("/secrets", function(req, res)
{
    if(req.isAuthenticated())
    {
        res.render("secrets");
    }
    else
    {
        res.redirect("/login");
    }
});



app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
  });


app.post("/register", function(req, res)
{
    // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    //     const newUser = new User({
    //         email : req.body.username,
    //         passward : hash
    //     });
    //     newUser.save(function(err)
    //     {
    //         if(!err)
    //         {
    //             res.render("secrets");
    //         }
    //     });
    // });


    User.register({username: req.body.username}, req.body.password, function(err, user){
        if (err) {
          console.log(err);
          res.redirect("/register");
        } else {
          passport.authenticate("local")(req, res, function(){
            res.redirect("/secrets");
          });
        }
      });



}); 


app.post("/login", function(req, res)
{
    // const username = req.body.username;
    // const passward = req.body.password;

    // User.findOne({email : username}, function(err, found)
    // {
    //     if(!err)
    //     {
    //         if(found)
    //         {
    //             bcrypt.compare(passward, found.passward, function(err, result) {
    //                 // result == true
    //                 if(result === true)
    //                 {
    //                     res.render("secrets");
    //                 }
    //             });
    //         }
    //     }
    // });

    const user = new User({
        username: req.body.username,
        password: req.body.password
      });
    
      req.login(user, function(err){
        if (err) {
          console.log(err);
        } else {
          passport.authenticate("local")(req, res, function(){
            res.redirect("/secrets");
          });
        }
      });


}); 


app.get("/submit", function(req, res){
    if (req.isAuthenticated()){
      res.render("submit");
    } else {
      res.redirect("/login");
    }
  });
  
  
app.post("/submit", function(req, res){
    const submittedSecret = req.body.secret;
  
  //Once the user is authenticated and their session gets saved, their user details are saved to req.user.
    // console.log(req.user.id);
  
    User.findById(req.user.id, function(err, foundUser){
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          foundUser.secret = submittedSecret;
          foundUser.save(function(){
            res.redirect("/secrets");
          });
        }
      }
    });
  });
 
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


