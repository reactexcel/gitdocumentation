import React from "react";
 import "./App.css";
import Router from "./routes/Router";

function App() {
  return (
    <div style={{height:"100vh",display:"flex",justifyContent:"center",marginTop:"40px"}}>
      <Router/>
    </div>
  );
}

export default App;
