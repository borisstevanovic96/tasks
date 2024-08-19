import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AddTaskForm from './AddTaskForm';
import Task from './Task';
import axios from "axios";
import { API_URL } from "../utils";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/task`);
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
    navigate('/register');
  };

  const handleOpen = (taskId) => {
    setSelectedTaskId(taskId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setComment('');
  };

  const handleCommentSubmit = async () => {
    if (!comment) return;

    try {
      await axios.post(`${API_URL}/task/${selectedTaskId}/comment`, { selectedTaskId, comment });
      setComment('');
      setOpen(false);
      fetchTasks(); // Refresh tasks to show the new comment
    } catch (err) {
      console.log(err);
    }
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
          Logout
        </Button>
        <AddTaskForm fetchTasks={fetchTasks} />
        {tasks.map((task) => (
          <div key={task.id}>
            <Task task={task} fetchTasks={fetchTasks} />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => handleOpen(task.id)}
              style={{ marginTop: '10px' }}
            >
              Add Comment
            </Button>
          </div>
        ))}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <h2 id="modal-title">Add Comment</h2>
          <TextField
            id="comment-input"
            label="Comment"
            variant="outlined"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            multiline
            rows={4}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleCommentSubmit}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
