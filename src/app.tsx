import React from "react";

import "./app.css";

import image from "./assets/images/image.png";

function App() {
  return (
    <div className="app">
      <div>
        <h1>Hey React</h1>
      </div>
      <div className="image-container">
        <img src={image} />
        <img src={image} />
        <img src={image} />
        <img src={image} />
      </div>
    </div>
  );
}

export default App;
