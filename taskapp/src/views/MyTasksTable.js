import React, { useState, useEffect } from 'react'
import { Table, Column, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
import axios from "axios"


function MyTasksTable() {

  const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('')
  const [searchWord, setSearchWord] = useState('');
  const [sortDirection, setSortDirection] = useState('ASC');
const [sortBy, setSortBy] = useState('title');

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

  const sortedTasks = tasks.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortDirection === 'ASC' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortDirection === 'ASC' ? 1 : -1;
    return 0;
  });

  return (

    <div>

        <Table
              width={1000}
              height={400}
              headerHeight={40}
              rowHeight={40}
              rowCount={sortedTasks.length}
              rowGetter={({ index }) => sortedTasks[index]}
              sortDirection={sortDirection}
              sortBy={sortBy}
              sort={({ sortBy, sortDirection }) => {
                setSortBy(sortBy);
                setSortDirection(sortDirection);
              }}
          >
          <Column label="Title" dataKey="title" width={200} />
          <Column label="Description" dataKey="description" width={300} />
          <Column label="Status" dataKey="status" width={100} />
          <Column label="Category" dataKey="category" width={100} />
          <Column label="Due Date" dataKey="due" width={100} cellRenderer={({ cellData }) => new Date(cellData).toLocaleDateString()} />
          <Column label="Actions" width={200} cellRenderer={({ rowData }) => (
            <>
              <button onClick={() => markComplete(rowData._id)}>Mark as Complete</button>
              <button onClick={() => deleteTask(rowData._id)}>Delete</button>
            </>
          )} />
        </Table>
  </div>
);
          }

export default MyTasksTable;