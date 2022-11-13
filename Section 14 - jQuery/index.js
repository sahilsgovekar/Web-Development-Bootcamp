// $("h1").css("color", "red")

$("h1").addClass("manupulateH1");


$("button").text("Dont click me");


// $(document).keypress(function(event)
// {
//     console.log(event.key);
// });


$("button").click(function()
{
    $("h1").css("color", "purple");
});