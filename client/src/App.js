import React, { useState } from "react";
import "./styles/App.css";
import Formulario from "./components/Formulario";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="App">
        <Formulario />
      </div>
    </div>
  );
}

export default App;
