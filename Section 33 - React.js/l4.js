//Create a react app from scratch.
import React from "react";
import ReactDOM from "react-dom";

//It should display 2 paragraph HTML elements.
//The paragraphs should say:
//Created by YOURNAME.
//Copyright CURRENTYEAR.
//E.g.
//Created by Angela Yu.
//Copyright 2019.

const myName = "sahilsgovekar";
const currentYear = new Date().getFullYear();

ReactDOM.render(
  <div>
    <p>created by {myName}</p>
    <p>copyright {currentYear}</p>
  </div>,
  document.getElementById("root")
);
