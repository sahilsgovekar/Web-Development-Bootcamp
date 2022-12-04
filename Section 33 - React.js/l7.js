//Create a React app from scratch.
import React from "react";
import ReactDOM from "react-dom";
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.

let greet;
const style = {
  color: ""
};

const curTime = new Date().getHours();
if (curTime > 0 && curTime <= 12) {
  greet = "Good Morning";
  style.color = "red";
} else if (curTime > 12 && curTime <= 6) {
  greet = "Good Afternoon";
  style.color = "green";
} else {
  greet = "Good Evening";
  style.color = "blue";
}

const wish = "Good" + greet;
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.

ReactDOM.render(<h1 style = {style}>{greet}</h1>, document.getElementById("root"));
