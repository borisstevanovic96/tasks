import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils';
import '../login.css'

 // Replace with your actual backend URL

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate hook for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/login`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
     console.log(response);
      if (response.data.statusCode === 200) {
       console.log('tacna sifra');
       const userId = response.data.body.user; // Extract userId from the response
       console.log(userId)
       // navigate(`/tasks/${userId}`); 


      } else if(response.data.statusCode === 400) {
        setError('Neuspjesno prijavljivanje. Netacan email ili sifra');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Uloguj se</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={error ? 'error' : ''}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Sifra</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={error ? 'error' : ''}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Loguje se' : 'Uloguj se'}
        </button>
      </form>
    </div>
  );
}

export default Login;
