
const express = require("express");
const https = require('node:https');
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res)
{
    res.sendFile(__dirname+"/index.html");
});




app.post("/", function(req, res)
{
    var cityName = req.body.city;
    console.log(cityName);

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=6553de24eec2f3b09c80938b8965ab9b#&units=metric";

    https.get(url, function(response)
    {
        console.log(response.statusCode);

        response.on("data", function(data)
        {
            var weatherData = JSON.parse(data);
            var temp = weatherData.main.temp;
            var weatherDisc = weatherData.weather[0].description;
            res.write("Temp is "+temp);
            res.write("It seems "+weatherDisc);
            res.send();
        });

    });
    

    // res.send("test");
});


app.listen(3000, function()
{
    console.log("listning at port 3000, all good");
});
