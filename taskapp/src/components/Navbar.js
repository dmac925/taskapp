import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ isLoggedIn }) => {
  return (
    <div className="nav">
      <NavLink to={"/"}>Home</NavLink>

      {isLoggedIn === false && (
        <>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
        </>
      )}

      {isLoggedIn && (
        <>
          <NavLink to="/myTasks">My Tasks</NavLink>
          <NavLink to="myTasksTable">My Tasks Table</NavLink>
          <NavLink to="addTask">Add Task</NavLink>
          <NavLink to="allTasks">All Tasks</NavLink>
          <NavLink to="allUsers">All Users</NavLink>
          <NavLink to="/SignOut">Sign Out</NavLink>
        </>
      )}
    </div>
  );
};

export default Navbar;
