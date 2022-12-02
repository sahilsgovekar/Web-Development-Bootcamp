import React from "react";
import ReactDOM from "react-dom";

const fname = "Sahil";
const lname = "Govekar";
const luckyNumber = 18;

ReactDOM.render(
  <div>
    <h1>Hello {fname + " " + lname}!</h1>
    <p>My Lucky number is {luckyNumber}</p>
  </div>,
  document.getElementById("root")
);
