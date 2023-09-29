import React, { useState, useEffect } from 'react'
import axios from "axios"


function MyTasks() {

  const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchWord, setSearchWord] = useState('');

  const fetchMyTasks = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/tasks/userTasks",
        { "user_id": "65157fa685dd2424295c3335" }
      );
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyTasks()
  }, [] )

  const categories = [...new Set(tasks.map((task) => task.category))];

  const deleteTask = async (taskId) => {
    try {
      await axios.post('http://localhost:4000/tasks/delete', { data: { taskId: taskId } });
      fetchMyTasks();
    } catch (error) {
      console.log(error);
    }
  };

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
              <p>Due Date: {task.due}</p>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MyTasks;