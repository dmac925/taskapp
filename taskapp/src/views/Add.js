import React, { useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Add() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    category: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/tasks/new', formData)
      .catch(error => {
        console.log(error);
      });


    setFormData({
      title: '',
      description: '',
      status: '',
      category: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input 
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <input 
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Status:
          <input 
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
        </label>
        <label>
          Category:
          <input 
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Add;