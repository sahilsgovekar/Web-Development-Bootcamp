const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));













// const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost/personDB", {useNewUrlParser: true}, () =>
// {
//     console.log("connected");
// });




// const personScheme = new mongoose.Schema({
//     name : String,
//     age : Number
// });

// const Person = mongoose.model("Person", personScheme);



// const person = new Person({
//     name : "sahil",
//     age : 21
// });

// person.save();

// Person.find(function(err, persons)
// {
//     if(err)
//     {    console.log(err);
//     }
//     else{
//         mongoose.connection.close();
//         console.log(fruits);
//     }
// });





