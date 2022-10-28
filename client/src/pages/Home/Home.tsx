import React, { useState } from 'react';
import { ICampaign } from './components/Campaign/useCampaigns';
import EditCampaign from './components/Campaign/EditCampaign';
import Campaign from './components/Campaign/Campaign';
import './components/Campaign/Campaigns.css';

interface HomeProps {
  campaigns: ICampaign[];
  addCampaign: Function;
  editCampaign: Function;
}

function Home({ campaigns, addCampaign, editCampaign }: HomeProps) {
  const [isAddingCampaign, setIsAddingCampaign] = useState(false);

  return (
    <>
      <h2 className="page-heading">Campaigns</h2>
      <section className="campaigns-container">
        {campaigns.map((campaign) => (
          <Campaign
            key={campaign.id}
            campaign={campaign}
            addCampaign={addCampaign}
            editCampaign={editCampaign}
          />
        ))}
        {isAddingCampaign ? (
          <EditCampaign
            setIsEditing={setIsAddingCampaign}
            addCampaign={addCampaign}
            editCampaign={editCampaign}
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
