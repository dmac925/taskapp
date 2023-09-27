import React, { useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function AddUser() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    admin: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/users/register', formData)
      .catch(error => {
        console.log(error);
      });

    setFormData({
      email: '',
      password: '',
      admin: false,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (

    <div>
        <h1>Add User</h1>

    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <label>
          Email Address:
          <input 
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Password:
          <input 
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <label>
  <span>Admin</span><input 
  type="checkbox"
  name="admin"
  checked={formData.admin}
            onChange={handleChange}/>
  <span class="slider round"></span>
</label>
        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  )
}

export default AddUser;