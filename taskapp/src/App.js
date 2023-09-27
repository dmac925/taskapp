import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AllTasks from './views/AllTasks';
import AllUsers from './views/AllUsers';
import AddTask from './views/AddTask';
import AddUser from './views/AddUser';


function App() {

  return (
    <div className="App">
      <Router>
        <div className="nav">
          <Link to={"addTask"}>Add Task</Link>
          <Link to={"addUser"}>Add User</Link>
          <Link to={"allTasks"}>All Tasks</Link>
          <Link to={"allUsers"}>All Users</Link>
     
        </div>

        <Routes>
          <Route path ="/addTask" element={<AddTask />} />
          <Route path ="/allTasks" element={<AllTasks />} />
          <Route path ="/addUser" element={<AddUser />} />
          <Route path ="/allUsers" element={<AllUsers />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
