// logic
// var rn1 = (Math.random())*6 + 1;
// console.log(Math.floor(rn1));

var randomnumber1 = Math.floor((Math.random())*6 + 1);
var randomnumber2 = Math.floor((Math.random())*6 + 1);

const img1 = document.getElementsByClassName('img1')[0];
img1.setAttribute("src", "images/dice"+ randomnumber1 +".png")

const img2 = document.getElementsByClassName("img2")[0];
img2.setAttribute("src", "images/dice"+ randomnumber2 +".png")


h1 = document.querySelector("h1")
if (randomnumber1 > randomnumber2)
{
    h1.innerHTML = "Player 1 Wins";
    // document.querySelector("h1").innerHTML = "Player 1 Wins"; 
}
else if (randomnumber1 < randomnumber2)
{
    h1.innerHTML = "Player 2 Wins";
}
else
{
    h1.innerHTML = "Its a DRAW";
}

