import React, { useEffect, useState } from 'react';
import { ICampaign } from '../types';
import EditCampaign from './EditCampaign';
import Campaign from './Campaign';
import '../styles/Campaigns.css';

function Home() {
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  const [isAddingCampaign, setIsAddingCampaign] = useState(false);

  useEffect(() => {
    getCampaigns();
  }, []);

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

  return (
    <>
      <h2>Campaigns</h2>
      <section className="campaigns-container">
        {campaigns.map((campaign) => (
          <Campaign
            key={campaign.id}
            campaign={campaign}
            setCampaigns={setCampaigns}
          />
        ))}
        {isAddingCampaign ? (
          <EditCampaign
            setIsEditing={setIsAddingCampaign}
            setCampaigns={setCampaigns}
          />
        ) : (
          <button
            onClick={() => setIsAddingCampaign((prevState) => !prevState)}
          >
            Add Campaign
          </button>
        )}
      </section>
    </>
  );
}

export default Home;
