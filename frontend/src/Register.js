import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://3.95.32.31:5000/api/register', { username, password });
      setMsg(res.data.msg);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.log('Register error response:', err.response?.data);
      setMsg(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={submitHandler}>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>{msg}</p>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

