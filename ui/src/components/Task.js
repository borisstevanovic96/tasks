import { Button, Checkbox, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, {useState} from 'react'
import UpdateTaskForm from './UpdateTaskForm';
import classnames from 'classnames';
import axios from "axios"
import { API_URL } from '../utils';


const Task = ({ task, fetchTasks }) => {
    const { id, name, completed } = task;
  const [isComplete, setIsComplete] = useState(completed);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdateTaskCompletion = async () => {
    try {
      await axios.put(`${API_URL}/task`, {
        id,
        name,
        completed: !isComplete,
      });
      setIsComplete((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`${API_URL}/task/${task.id}`);

      await fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='task'>
        <div className={classnames('flex',{
            done:isComplete
        })}>
      <Checkbox checked={isComplete} onChange={handleUpdateTaskCompletion}/>
      <Typography variant='h4'>
        {ime}
      </Typography>
        </div>
        <div className='taskButtons'>
      <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
        <EditIcon />
      </Button>
      <Button color="error" variant="contained" onClick={handleDeleteTask}>
        <DeleteIcon />
      </Button>
        </div>
      <UpdateTaskForm 
      fetchTasks={fetchTasks}
      isDialogOpen={isDialogOpen}
       setIsDialogOpen={setIsDialogOpen}
       task={task} />
    </div>
  )
}

export default Task
