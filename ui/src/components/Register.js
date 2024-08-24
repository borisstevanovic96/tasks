import React, { useState } from 'react';
import axios from "axios"
import { API_URL } from '../utils'; 
import '../register.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.username) {
      formErrors.username = 'Korisnicko ime je neophodno';
    }
    if (!formData.email) {
      formErrors.email = 'Email je neophodan';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email je neispravan';
    }
    if (!formData.password) {
      formErrors.password = 'Sifra je neophodna';
    } else if (formData.password.length < 6) {
      formErrors.password = 'Sifra mora biti bar 6 karaktera duga';
    }
    

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      setServerError('');

      try {
        console.log('Form Data:', formData);
        const response = await axios.post(`${API_URL}/register`, formData);
        console.log(response);
        if (response.data.statusCode !== 200) {
  throw new Error(response.data.message || 'Korisnik sa tim emailom vec postoji');
}

        setSubmitted(true);
        
        navigate("/login");
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
    setServerError(error.response.data.message);
  } else {
    setServerError(error.message);
  }
  setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(formErrors);
      console.log('register errors');
    }
  };

  return (
    <div className="register-container">
      <h2>Registruj se</h2>
      {submitted ? (
        <div className="success-message">Registration successful!</div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="username">Korisnicko ime</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              autocomplete="username"
              className={errors.username ? 'error' : ''}
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autocomplete="email" 
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Sifra</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autocomplete="new-password" 
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          {serverError && <div className="server-error">{serverError}</div>}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Prijavljuje se...' : 'Prijavi se'}
          </button>
        </form>
      )}
         <div className="register-info">
        <p>Kreiraj svoju to-do listu na jednostavan način, imaj uvid u zadatke koji su već odrađeni, ažuriraj već postojeće zadatke ili ih obriši.</p>
      </div>
    </div>
  );
}

export default Register;
