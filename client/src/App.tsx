import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Header from './components/Header';
import ListCharacters from './components/ListCharacters';
import SubHeader from './components/SubHeader';

function App() {
  const [user, setUser] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCampaignId, setCurrentCampaignId] = useState(null);

  useEffect(() => {
    fetchCurrentUser().then((data) => {
      if (data) {
        setUser(data.user);
        setIsLoading(false);
        getCampaigns();
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

    async function getCampaigns() {
      try {
        const response = await fetch('http://localhost:5000/campaigns', {
          credentials: 'include',
        });
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return (
    <>
      <Header
        user={user}
        setUser={setUser}
        isLoading={isLoading}
        campaigns={campaigns}
        setCurrentCampaignId={setCurrentCampaignId}
      />
      {user && <SubHeader />}
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home campaigns={campaigns} setCampaigns={setCampaigns} />}
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/characters" element={<ListCharacters />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
