import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios"
import { API_URL } from '../utils';
const AddTaskForm = ({fetchTasks}) => {
  const [newTask, setNewTask] = useState("");

  const addNewTask = async () => {
    const userId = localStorage.getItem('userId')?.trim();
    try {
      await axios.post(`${API_URL}/task`, {
        name: newTask,
        completed: false,
        userId: userId
      });

      await fetchTasks();

      setNewTask("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Typography align='center' variant='h2' paddingTop={2} paddingBottom={2}>
        Lista zadataka
      </Typography>
      <div className='addTaskForm'>
      <TextField 
       size="small"
       label="Zadatak"
       variant="outlined"
       value={newTask}
       onChange={(e) => setNewTask(e.target.value)} />
      <Button disabled={!newTask.length} variant='outlined' onClick={addNewTask}>
        <AddIcon />
      </Button>
      </div>
    </div>
  )
}

export default AddTaskForm
