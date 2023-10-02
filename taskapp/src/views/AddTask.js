import React, { useState, useEffect } from 'react';
import axios from 'axios';



function AddTask() {
  const [userId, setUserId] = useState(null); 
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem("email")));
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    due: '',
    reminder: '',
    completed: '',
    category: '',
    user_id: '', 
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


  useEffect(() => {
    axios.get(`http://localhost:4000/users/find/${email}`)
      .then(response => {
        setUserId(response.data.user_id);
      })
      .catch(error => {
        console.log(error);
      });
  }, [email]);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = { ...formData, user_id: userId };
    axios.post('http://localhost:4000/tasks/new', dataToSend)
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
      category: '',
      user_id: ''
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
            value={formData.reminder}
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