import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Header from './components/Header';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCurrentUser().then((data) => {
      if (data) {
        setUser(data.user);
        setIsLoading(false);
      }
    });

    async function fetchCurrentUser() {
      const res = await fetch('http://localhost:5000/users/current-user', {
        method: 'GET',
        credentials: 'include',
      });
      if (res.status === 401) {
        setIsLoading(false);
        return;
      }
      const data = await res.json();
      return data;
    }
  }, []);

  return (
    <div>
      <Header user={user} setUser={setUser} isLoading={isLoading} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
