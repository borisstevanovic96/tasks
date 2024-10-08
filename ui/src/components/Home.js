import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AddTaskForm from './AddTaskForm';
import Task from './Task';
import axios from "axios";
import { API_URL } from "../utils";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const fetchTasks = async () => {
    const userId = localStorage.getItem('userId')?.trim();
    console.log(userId);
  try {
    const { data } = await axios.get(`${API_URL}/task/${userId}`);
    setTasks(data);
  } catch (err) {
    console.log(err);
  }
};


  useEffect(() => {
    fetchTasks();
  }, []);

  const handleLogout = () => {
    // Perform any logout actions here, like clearing user data or tokens

    // Redirect to the register page
    navigate('/login');
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        {/* Add the Logout Button */}
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleLogout}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000, // Ensures the button is on top
          }}
        >
          Izloguj se
        </Button>
        <AddTaskForm fetchTasks={fetchTasks} />
        {tasks.map((task) => (
          <Task task={task} key={task.id} fetchTasks={fetchTasks} />
        ))}
      </div>
    </ThemeProvider>
  );
}
