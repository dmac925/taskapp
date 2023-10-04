import React, { useState, useEffect } from 'react'
import axios from "axios"


function MyTasks() {

  const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('')
  const [searchWord, setSearchWord] = useState('');

  const email = JSON.parse(localStorage.getItem("user"))?.email;
  
  const fetchMyTasks = async () => {
    try {
        const response = await axios.post("http://localhost:4000/tasks/userTasksEmail", { email });
        setTasks(response.data);
        console.log(response.data)
    } catch (error) {
        console.log(error);
    }
}

const markComplete = async (taskId) => {
    try {
        await axios.post(`http://localhost:4000/tasks/markComplete`, { taskId });
      fetchMyTasks();
    } catch (error) {
      console.log(error);
    }
  };

const deleteTask = async (taskId) => {
    try {
      await axios.post(`http://localhost:4000/tasks/delete`, { taskId });
      fetchMyTasks();
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
    fetchMyTasks()
  }, [] )

  const categories = [...new Set(tasks.map((task) => task.category))];

  const statuses = [...new Set(tasks.map((task) => task.status))];

  return (

    <div>
      <h3>My Tasks</h3>

      <input
        type="text"
        placeholder="Search by title"
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        <option value="">Status</option>
        {statuses.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>

      <div className="taskContainer"> 
        {tasks.filter((task) => {
              const categoryMatch =
                selectedCategory === '' || task.category === selectedCategory;
              const titleMatch =
                searchWord === '' ||
                task.title.toLowerCase().includes(searchWord.toLowerCase());
  
              return categoryMatch && titleMatch;
            })

          .map((task, index) => (
            <div key={index} className="task-card">
              <h4>{task.title}</h4>
              <p>Description: {task.description}</p>
              <p>Status: {task.status}</p>
              <p>Category: {task.category}</p>
              <p>Due Date: {new Date(task.due).toLocaleDateString()}</p>
              <button onClick={() => markComplete(task._id)}>Mark as Complete</button>
    <button onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MyTasks;