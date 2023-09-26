import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './views/Home';
import Add from './views/Add';


function App() {

  return (
    <div className="App">
      <Router>
        <div className="nav">
          <Link to={"/"}>Home</Link>
          <Link to={"add"}>Add Task</Link>
     
        </div>

        <Routes>
          <Route path ="/" element={<Home />} />
          <Route path ="/add" element={<Add />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
