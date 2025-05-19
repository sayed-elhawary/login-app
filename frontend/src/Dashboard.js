import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard({ token, logout }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://3.95.32.31:5000/api/dashboard', {
      headers: { 'x-auth-token': token }
    }).then(res => setMessage(res.data.msg))
      .catch(() => {
        setMessage('Failed to authenticate');
        logout();
      });
  }, [token, logout]);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

