import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { URL } from "./config";
import * as jose from "jose";
import Navbar from "./components/Navbar.js";
import AllTasks from './views/AllTasks';
import AddTask from './views/AddTask';
import AllUsers from './views/AllUsers';
import Register from './views/Register';
import Login from './views/Login';
import MyTasks from './views/MyTasks';
import MyTasksTable from './views/MyTasksTable';
import SignOut from './views/SignOut';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  useEffect(() => {
    const verify_token = async () => {
      try {
        if (!token) {
          setIsLoggedIn(false);
        } else {
          axios.defaults.headers.common["Authorization"] = token;
          const response = await axios.post(`${URL}/users/verify_token`);
          return response.data.ok ? login(token) : logout();
        }
      } catch (error) {
        console.log(error);
      }
    };
    verify_token();
  }, [token]);

  const login = (token) => {
    let decodedToken = jose.decodeJwt(token);
    // composing a user object based on what data we included in our token (login controller - jwt.sign() first argument)
    let user = {
      email: decodedToken.userEmail,
    };
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">

<Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/addTask" element={<AddTask />} />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/myTasks" />
            ) : (
              <Login login={login} />
            )
          }
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/myTasks" /> : <Register />}
        />

        <Route path ="/addTask" element={<AddTask />} />
          <Route path ="/allTasks" element={<AllTasks />} />
          <Route path ="/myTasks" element={<MyTasks />} />
          <Route path ="/myTasksTable" element={<MyTasksTable />} />
          <Route path ="/allUsers" element={<AllUsers />} />
          <Route path ="/register" element={<Register />} />
          <Route path ="/login" element={<Login />} />
        
        <Route
          path="/signOut"
          element={
            !isLoggedIn ? (
              <Navigate to="/" /> 
            ) : (
              <SignOut logout={logout} user={user} />
            )
          }
        />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
