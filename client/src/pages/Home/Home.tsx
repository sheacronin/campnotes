import React from 'react';
import { ICampaign } from './components/Campaign/useCampaigns';
import EditCampaign from './components/Campaign/EditCampaign';
import Campaign from './components/Campaign/Campaign';
import useEditForm from '../../useEditForm';
import './components/Campaign/Campaigns.css';

interface HomeProps {
  campaigns: ICampaign[];
  addCampaign: (campaign: ICampaign) => void;
  editCampaign: (id: number, campaign: ICampaign) => void;
}

function Home({ campaigns, addCampaign, editCampaign }: HomeProps) {
  const {
    isEditing: isAddingCampaign,
    onSubmitForm,
    openEditForm,
    closeEditForm,
  } = useEditForm(addCampaign, editCampaign);

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
            onSubmitForm={onSubmitForm}
            closeEditForm={closeEditForm}
          />
        ) : (
          <button onClick={() => openEditForm()}>Add Campaign</button>
        )}
      </section>
    </>
  );
}

export default Home;
