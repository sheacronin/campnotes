import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Header from './components/Header';
import ListCharacters from './pages/Characters/ListCharacters';
import SubHeader from './components/SubHeader';
import useCampaigns from './pages/Home/components/Campaign/useCampaigns';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCampaignId, setCurrentCampaignId] = useState(null);
  const { campaigns, addCampaign, editCampaign } = useCampaigns();

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
            element={
              <Home
                campaigns={campaigns}
                addCampaign={addCampaign}
                editCampaign={editCampaign}
              />
            }
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
