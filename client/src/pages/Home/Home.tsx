import React, { useState } from 'react';
import { ICampaign } from '../../types';
import EditCampaign from './components/Campaign/EditCampaign';
import Campaign from './components/Campaign/Campaign';
import './components/Campaign/Campaigns.css';

interface HomeProps {
  campaigns: ICampaign[];
  setCampaigns: Function;
}

function Home({ campaigns, setCampaigns }: HomeProps) {
  const [isAddingCampaign, setIsAddingCampaign] = useState(false);

  return (
    <>
      <h2 className="page-heading">Campaigns</h2>
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
