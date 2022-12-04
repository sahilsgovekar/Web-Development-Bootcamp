import React from "react";
import ReactDOM from "react-dom";

const customStyle = {
  color: "red",
  border: "2px solid green"
};

ReactDOM.render(
  <h1 style={customStyle}>Hello World!</h1>,
  document.getElementById("root")
);
