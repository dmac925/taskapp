import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddTask() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    due: '',
    reminder: '',
    completed: '',
    category: ''
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/tasks/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


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
      due: '',
    reminder: '',
    completed: '',
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

    <div>
        <h1>Add Task</h1>

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
        <input 
            type="date"
            name="due"
            value={formData.due}
            onChange={handleChange}
          />
        </label>
        <label>
        <input 
            type="date"
            name="reminder"
            value={formData.due}
            onChange={handleChange}
          />
        </label>
        <label>
  Category:
  <select 
    name="category"
    value={formData.category}
    onChange={handleChange}
  >
    {categories.map((category, index) => (
      <option key={index} value={category}>
        {category}
      </option>
    ))}
  </select>
</label>
        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  )
}

export default AddTask;