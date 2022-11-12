prompt("Enter your name")
prompt("Enter their name")

var n = Math.random();
n = n*100;
n = Math.floor(n)+1;

// console.log(n);

if (n>30 && n<50) {
    alert("Relationship is average, your score is "+n);
}
else if (n>50 && n<80) {
    alert("Relationship is good, your score is "+n);
}
else if (n>80 && n<99) {
    alert("Relationship is greate, your score is "+n);
}
if (n === 100 || n === 99) {
    alert("Relationship is Perfect, your score is "+n);
}
else
{
    alert("Time to change the partner, your score is "+n);
}


