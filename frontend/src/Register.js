import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [msgColor, setMsgColor] = useState('red');
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    console.log("API_URL (from env):", API_URL);
  }, [API_URL]);

  const submitHandler = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMsg('Passwords do not match');
      setMsgColor('red');
      setTimeout(() => setMsg(''), 3000);
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/register`, { username, password });
      setMsg(res.data.msg);
      setMsgColor('green');
      setTimeout(() => {
        setMsg('');
        navigate('/login');
      }, 1500);
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Error';
      setMsg(errorMsg);
      setMsgColor('red');
      setTimeout(() => setMsg(''), 3000);
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '3rem auto',
      padding: '2rem',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Register</h2>
      <form onSubmit={submitHandler}>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={e => e.target.style.backgroundColor = '#0056b3'}
          onMouseLeave={e => e.target.style.backgroundColor = '#007bff'}
        >
          Register
        </button>
      </form>

      {msg && (
        <p style={{ color: msgColor, marginTop: '1rem', textAlign: 'center' }}>{msg}</p>
      )}

      <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

const inputStyle = {
  display: 'block',
  width: '100%',
  marginBottom: '1rem',
  padding: '10px',
  fontSize: '1rem',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  fontSize: '1rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease'
};

