const express = require("express");
const app = express()


app.get("/", function(request, response)
{
    console.log(request);
    response.send("hello world");
});

// app.get("/test", function(request, response)
// {
//     console.log(request);
//     response.send("<h1>This is test</h1>");
// });

app.listen(3000, function()
{
    console.log("listning to port 3000");
});