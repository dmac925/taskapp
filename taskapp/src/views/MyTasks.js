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

const taskStatus = async (taskId, currentStatus) => {
  const newStatus = currentStatus === 'Complete' ? 'In Progress' : 'Complete';
  try {
    await axios.post(`http://localhost:4000/tasks/taskStatus`, { taskId, newStatus });
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

      <div>
  <span>Status: </span>
  <a href="#" onClick={() => setSelectedStatus('')}>
    All
  </a>
  {' '}
  {statuses.map((status, index) => (
    <span key={index}>
      <a href="#" onClick={() => setSelectedStatus(status)}>
        {status}
      </a>
      {' '}
    </span>
  ))}
</div>

      <div className="taskContainer"> 
        {tasks.filter((task) => {
              const categoryMatch =
                selectedCategory === '' || task.category === selectedCategory;
              const titleMatch =
                searchWord === '' ||
                task.title.toLowerCase().includes(searchWord.toLowerCase());
                const statusMatch =
                selectedStatus === "" || task.status === selectedStatus;
  
              return categoryMatch && statusMatch && titleMatch;
            })

          .map((task, index) => (
            <div key={index} className="task-card">
              <h4>{task.title}</h4>
              <p>Description: {task.description}</p>
              <p>Status: {task.status}</p>
              <p>Category: {task.category}</p>
              <p>Due Date: {new Date(task.due).toLocaleDateString()}</p>
              <button onClick={() => taskStatus(task._id, task.status)}>
      {task.status === 'Complete' ? 'Mark as In Progress' : 'Mark as Complete'}
    </button>
<button onClick={() => deleteTask(task._id)}>Delete</button>

            </div>
          ))}
      </div>
    </div>
  );
}

export default MyTasks;