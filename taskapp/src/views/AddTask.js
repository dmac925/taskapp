import React, { useState, useEffect } from 'react';
import axios from 'axios';


function AddTask() {
  const initialStatus = ["In Progress", "Compeleted", "Not Started"];
  const [userId, setUserId] = useState(null); 
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem("user"))?.email);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'To Do',
    due: '',
    reminder: '',
    completed: '',
    category: 'Work',
    user_id: '', 
  });
  const [categories, setCategories] = useState([]);

const fetchCats = async () => {
  try {
   const res =  await axios.get('http://localhost:4000/tasks/categories')
    console.log(res)
    // if response is okay - setCategories:
      setCategories(res.data);
  } catch (error) {
    console.log(error)
  }
}

  useEffect(() => {
  fetchCats()
  }, []);


  useEffect(() => {
    const findUserId = () => {
    axios.get(`http://localhost:4000/users/find/${email}`)
      .then(response => {
        console.log(response);
        setUserId(response.data.user_id);
      })
      .catch(error => {
        console.log(error);
      })}
findUserId()
  }, [email]);

  


  const handleSubmit = async (e) => {
    try {
      debugger
      e.preventDefault();
      const dataToSend = { ...formData, user_id: userId };
      console.log(dataToSend)
     const res = await axios.post('http://localhost:4000/tasks/new', dataToSend)
  
  
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
    } catch (error) {
      console.log(error)
    } 
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
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
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            >
            <option value="To Do">To Do</option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Compeleted</option>
          </select>
        </label>
        <label>
        Due Date:
        <input 
            type="date"
            name="due"
            value={formData.due}
            onChange={handleChange}
          />
        </label>
        <label>
        Reminder Date:
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
   <option value="Work">Work</option>
  <option value="Personal">Personal</option>
  <option value="School">School</option>
  </select>
</label>
        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  )
    }
  
export default AddTask
